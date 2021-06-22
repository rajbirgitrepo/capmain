from flask import (
    Flask,
    g,
    redirect,
    render_template,
    flash,
    request,
    session,
    url_for
)
from nltk import FreqDist
from bson.regex import Regex
import pandas as pd
from flask import Flask,json
from datetime import datetime
from pandas.io.json import json_normalize
import pandas as pd
import pycountry
# import mysql.connector
from nltk.tokenize import word_tokenize
import numpy as np
from flask_cors import CORS
from geolite2 import geolite2
import time
from datetime import timedelta
import pymongo
from pymongo import MongoClient
from pprint import pprint
import urllib.parse
from pandas import DataFrame
from bson.objectid import ObjectId
import datetime
import dateutil.parser
from datetime import date
import calendar
import re
import json
from urllib.request import urlopen
from sort_dataframeby_monthorweek import *
from pytz import timezone
from six.moves import urllib
from numpyencoder import NumpyEncoder
from flask import Flask, make_response
import pyexcel as pe
from flask import Response
import io
import nltk
from textblob import TextBlob
from nltk.corpus import stopwords
stop = stopwords.words('english')

app = Flask(__name__)
CORS(app)



@app.route('/word_cloud_chart/<product>/<rating>/<startdate>/<enddate>')
def word_freq(product,rating,startdate,enddate):
    clean_list=[]
    news_headlines_senti = []
    news_headlines_dict = {}
    pnews_headlines=0
    nnews_headlines=0
    nenews_headlines = 0
    date1=startdate
    date2=enddate
    today = date.today()
    d1 = today.strftime("%Y-%m-%d")
    if product == "all": 
        product=["IE Home App","Community","Explorer","Cloud","IE School App"]
    else : 
        product=[product]
    if date1 == "all": 
        date1='2020-07-01'
    else : 
        date1=date1
    if date2 == "all":
        date2=d1
    else : 
        date2=date2
    if rating == "all":
        rating=[0,1,2,3,4,5]
    else : 
        rating=[int(rating)]
    myDatetimestrt = dateutil.parser.parse(date1)
    myDatetimeend = dateutil.parser.parse(date2)
    client = MongoClient('mongodb://IE-tech:I#^m0NgO_2o20!@44.234.88.150:27017/')
    db=client.compass
    collection = db.audio_feedback
    user=[
    {"$match":{'$and':[ {"USER.USER_NAME": { "$not": { "$regex": "test",'$options':'i'}}},
                {"USER.USER_NAME":{ "$ne": ""}},
                {"USER.EMAIL_ID":{ "$not": { "$regex": "test",'$options':'i'}}},
                {"USER.EMAIL_ID":{ "$not": { "$regex": "1gen",'$options':'i'}}},
                {"USER.EMAIL_ID":{ "$ne": ""}},  
                {'USER.IS_BLOCKED':{"$ne":'Y'}}, 
                {'USER.IS_DISABLED':{"$ne":'Y'}},
                {'MODIFIED_DATE':{'$gte': myDatetimestrt, '$lt':myDatetimeend}},
                  {'RATING':{'$in':rating}},     
                {'USER.INCOMPLETE_SIGNUP':{"$ne":'Y'}},
    #                   {"COMMENT":{"$exists":1 }} 
                        ]}},
    { "$project": { "USER_ID": "$USER._id", "USER_NAME": "$USER.USER_NAME","_id":0, "EMAIL": "$USER.EMAIL_ID", "RATING":1,
    "LAST_COMMENT_DATE": "$MODIFIED_DATE", "AUDIO_NAME": "$AUDIO_ID.AUDIO_NAME", "NARRATOR_NAME": "$AUDIO_ID.NARRATEDBY",
    "COMMENT":1, "PROGRAM_NAME": "$AUDIO_ID.PROGRAM_ID.PROGRAM_NAME"}}
    ]
    update=list(collection.aggregate(user))
    df=pd.DataFrame(update).fillna("no info")
    list_of_names=df["USER_ID"].to_list()
    print(1)
    collection = db.user_master
    user=[
    {"$match":{'$and':[ {"USER_NAME": { "$not": { "$regex": "test",'$options':'i'}}},
                {"USER_NAME":{ "$ne": ""}},
                {"EMAIL_ID":{ "$not": { "$regex": "test",'$options':'i'}}},
                {"EMAIL_ID":{ "$not": { "$regex": "1gen",'$options':'i'}}},
                {"EMAIL_ID":{ "$ne": ""}},  
                {'IS_BLOCKED':{"$ne":'Y'}}, 
                {'IS_DISABLED':{"$ne":'Y'}}, 
                {'schoolId.NAME':{'$not':{'$regex':'test', '$options':'i'}}},
                {'INCOMPLETE_SIGNUP':{"$ne":'Y'}},
                {"_id":{"$in":list_of_names}}   
                        ]}},
    { "$project": {"SCHOOL_NAME":"$schoolId.NAME", "CITY":"$schoolId.CITY","STATE":"$schoolId.STATE",
          "USER_ID":"$_id","_id":0}}
    ]
    update=list(collection.aggregate(user))
    df1=pd.DataFrame(update).fillna("no info")
    print(2)
    df01=pd.merge(df,df1,on="USER_ID",how="left")
    collection = db.subscription_master
    user=[
    {"$match":{'$and':[{"USER_ID.USER_NAME": { "$not": { "$regex": "test",'$options':'i'}}},
                {"USER_ID.USER_NAME":{ "$ne": ""}},
                {"USER_ID.EMAIL_ID":{ "$not": { "$regex": "test",'$options':'i'}}},
                {"USER_ID.EMAIL_ID":{ "$not": { "$regex": "1gen",'$options':'i'}}},
                {"USER_ID.EMAIL_ID":{ "$ne": ""}},  
                {'USER_ID.IS_BLOCKED':{"$ne":'Y'}}, 
                {'USER_ID.IS_DISABLED':{"$ne":'Y'}}, 
                {'USER_ID.schoolId.NAME':{'$not':{'$regex':'test', '$options':'i'}}},
                {'USER_ID.INCOMPLETE_SIGNUP':{"$ne":'Y'}},
                {'PLAN_ID.PLAN_NAME':{"$in":product}},
                {"USER_ID._id":{"$in":list_of_names}}
                  ]}},
    { "$project": {"RENEWAL_DATE":"$SUBSCRIPTION_EXPIRE_DATE","PLAN_NAME":"$PLAN_ID.PLAN_NAME",  
           "USER_ID":"$USER_ID._id","_id":0}}
    ]
    update=list(collection.aggregate(user))
    df2=pd.DataFrame(update).fillna("no info")
    print(3)
    df12=pd.merge(df01,df2,on="USER_ID",how="left")
    collection = db.audio_track_master
    user=[
    {"$match":{'$and':[ {"USER_ID.USER_NAME": { "$not": { "$regex": "test",'$options':'i'}}},
                {"USER_ID.USER_NAME":{ "$ne": ""}},
                {"USER_ID.EMAIL_ID":{ "$not": { "$regex": "test",'$options':'i'}}},
                {"USER_ID.EMAIL_ID":{ "$not": { "$regex": "1gen",'$options':'i'}}},
                {"USER_ID.EMAIL_ID":{ "$ne": ""}},  
                {'USER_ID.IS_BLOCKED':{"$ne":'Y'}}, 
                {'USER_ID.IS_DISABLED':{"$ne":'Y'}}, 
                {'USER_ID.schoolId.NAME':{'$not':{'$regex':'test', '$options':'i'}}},
                {'USER_ID.INCOMPLETE_SIGNUP':{"$ne":'Y'}},
                { "USER_ID._id":{"$in":list_of_names}},
    ]}},
    {"$group":{"_id": "$USER_ID._id","PRACTICE_COUNT":{"$sum":1}, 
        "LAST_PRACTICE_DATE": {"$last": "$MODIFIED_DATE"},
                    }},
    { "$project": {"PRACTICE_COUNT":1,"_id":0,"USER_ID":"$_id","LAST_PRACTICE_DATE":1}}
    ]
    update=list(collection.aggregate(user))
    df3=pd.DataFrame(update)
    print(4)
    df123=pd.merge(df12,df3,on="USER_ID",how="left")
    xxt=df123[df123.PLAN_NAME.isin(product)]
    df123=xxt
    def Average(lst):
        return sum(lst) / len(lst)

    # Driver Code
    lst =df123["RATING"].to_list()
    average = Average(lst)


    #     print(df123["COMMENT"],"lola")
    xx=df123[df123["COMMENT"]!="no info"]
    xxc=xx[xx["COMMENT"]!=""]

    comment_list=xxc["COMMENT"].to_list()

    newtexttoken=[]
    for i in comment_list:
        text_tokens = word_tokenize(i)
        newtexttoken.append(text_tokens)
    newlist=[]
    for i in newtexttoken:
        for z in i:
            newlist.append(z.lower())
    st_word=stopwords.words('english')
    tokens_without_sw= [word for word in newlist if not word in st_word]
    token5=[]
    for sentence in tokens_without_sw:
    #     print(sentence)
        text3 = sentence.split('ing')
    #     print(text3,"text3")
        for i in text3:
    #         print(i)
            token5.append(i)
    words = [w.replace('liked', 'like') for w in token5]
    words2 = [w.replace('relaxed', 'relax') for w in words]
    words3 = [w.replace('relaxing', 'relax') for w in words2]
    words4 = [w.replace('excitinging', 'excited') for w in words3]
    #     print(words4)
    zxc=""
    name=""
    count=""
    try:
        xcvv=[x for x in words4 if len(x)>3]
        fdist=FreqDist(xcvv)
        df_fdist = pd.DataFrame.from_dict(fdist, orient='index')
    #         print(df_fdist)
        df_fdist.columns = ['Frequency']
        df_fdist.index.name = 'Term'
        xc=df_fdist.sort_values(by='Frequency', ascending=False, na_position='first')
        #     tt=xc.drop(["i","it","we","made","us","the","feeling","some","students"])
        cc=xc[0:10]
        name=cc.index.to_list()
        count=cc["Frequency"].to_list()
        zxc=' '.join(word for word in xcvv)
    except:
        pass
    for item in comment_list:
        # trim
        item = item.strip()
        # Removing RT
        item = item.replace('RT', '')
        # Removing new line character
        item = item.replace('\\n', '')
        # Replace #word with word
        news_headlines = re.sub(r'#([^\s]+)', r'\1', item)
        # Convert @username to username
        news_headlines = re.sub(r'@([^\s]+)', r'\1', item)
        item = " ".join(re.findall("[a-zA-Z]+", item))
        tmp_var = re.sub(r'^\S*\s', '', item)
        clean_list.append(tmp_var)
    for item in clean_list:
            #print(item)
            # create TextBlob object of passed news_headlines text
            analysis = TextBlob(item)
            # set sentiment
            if analysis.sentiment.polarity > 0:
                # saving sentiment of news_headlines
                news_headlines_score = 'positive'
                pnews_headlines = pnews_headlines + 1
                news_headlines_dict[item] = news_headlines_score
            elif analysis.sentiment.polarity == 0:
                # saving sentiment of news_headlines
                news_headlines_score = 'neutral'
                nenews_headlines = nenews_headlines + 1
                news_headlines_dict[item] = news_headlines_score
            else:
                # saving sentiment of news_headlines
                news_headlines_score = 'negative'
                nnews_headlines = nnews_headlines + 1
                news_headlines_dict[item] = news_headlines_score
    # print(clean_list)
    newssentiment=[]
    # for k, v in news_headlines_dict.items():
    #     print(k,':',v)
    for k, v in news_headlines_dict.items():

        if v == "positive":
            newssentiment.append({"sentiment":int(1),"text":k})
        elif v == "negative":
            newssentiment.append({"sentiment":int(-1),"text":k})
        else:
            newssentiment.append({"sentiment":int(0),"text":k})

    #print(newssentiment)
    newssentiment_dataframe=pd.DataFrame.from_dict(newssentiment)
    # newssentiment_dataframe.to_csv("news_headlines_sentiment.csv", encoding='utf-8', index=False)
    neg = 100 * (nnews_headlines) / ((nnews_headlines) + (pnews_headlines))
    pos = 100 * (pnews_headlines) / ((nnews_headlines) + (pnews_headlines))
    # print(len(clean_list))
    # print("\nNegative news_headliness percentage: {} %".format(neg))
    # print("Positive news_headliness percentage: {} %".format(pos))
    df123["SCORE"]=""

    for i in range(len(df123)):
        try:
            analysis = TextBlob(df123["COMMENT"][i])
            if analysis.sentiment.polarity > 0:

                df123.at[i,"SCORE"]= 1
    #             

            elif analysis.sentiment.polarity == 0:

                df123.at[i,"SCORE"]= 0

            else:

                df123.at[i,"SCORE"]= -1
        except:
            df123.at[i,"SCORE"]= 0

    df123['just_date'] = df123['LAST_COMMENT_DATE'].dt.date
    xccx=df123.sort_values(by='just_date')
    xccx=df123.dropna()
    negdf=xccx[xccx["SCORE"]==-1]
    posdf=xccx[xccx["SCORE"]==1]
    
    df123['LAST_COMMENT_DATE']=pd.to_datetime(df123["LAST_COMMENT_DATE"]).dt.strftime('%Y-%m-%d')
    positivep=df123[df123["SCORE"]==1]
    df1234=positivep.groupby(["LAST_COMMENT_DATE"])["SCORE"].count().reset_index()
    df14i=df1234[["LAST_COMMENT_DATE","SCORE"]]
    df14i['LAST_COMMENT_DATE'] = pd.to_datetime(df14i['LAST_COMMENT_DATE'])
    df15i=df14i.sort_values(by='LAST_COMMENT_DATE')
    df15i['LAST_COMMENT_DATE']=df15i['LAST_COMMENT_DATE'].astype(np.int64)/int(1e6)
    shp1=df15i[["LAST_COMMENT_DATE","SCORE"]].values.tolist()
    negativen=df123[df123["SCORE"]==-1]
    df12345=negativen.groupby(["LAST_COMMENT_DATE"])["SCORE"].count().reset_index()
    df14ii=df12345[["LAST_COMMENT_DATE","SCORE"]]
    df14ii['LAST_COMMENT_DATE'] = pd.to_datetime(df14ii['LAST_COMMENT_DATE'])
    df15ii=df14ii.sort_values(by='LAST_COMMENT_DATE')
    df15ii['LAST_COMMENT_DATE']=df15ii['LAST_COMMENT_DATE'].astype(np.int64)/int(1e6)
    shp2=df15ii[["LAST_COMMENT_DATE","SCORE"]].values.tolist()
    df123['LAST_COMMENT_DATE']=pd.to_datetime(df123["LAST_COMMENT_DATE"]).dt.strftime('%Y-%m-%d')
    negtable=negativen[["SCHOOL_NAME","STATE","CITY","USER_NAME","EMAIL","COMMENT","AUDIO_NAME","NARRATOR_NAME","PROGRAM_NAME","just_date","LAST_PRACTICE_DATE","PRACTICE_COUNT"]]   
    negtable["just_date"]=negtable["just_date"].apply(lambda x: x.strftime('%d %b %Y'))
    negtable["LAST_PRACTICE_DATE"]=negtable["LAST_PRACTICE_DATE"].dt.strftime('%d %b %Y')
    negtable1=negtable.fillna(" ")
    negtablef=pd.DataFrame(negtable1)
    postable=positivep[["SCHOOL_NAME","STATE","CITY","USER_NAME","EMAIL","COMMENT","AUDIO_NAME","NARRATOR_NAME","PROGRAM_NAME","just_date","LAST_PRACTICE_DATE","PRACTICE_COUNT"]]   
    postable["just_date"]=postable["just_date"].apply(lambda x: x.strftime('%d %b %Y'))
    postable["LAST_PRACTICE_DATE"]=postable["LAST_PRACTICE_DATE"].dt.strftime('%d %b %Y')
    postable1=postable.fillna(" ")
    postablef=pd.DataFrame(postable1)
    overalltable=df123[["SCHOOL_NAME","STATE","CITY","USER_NAME","EMAIL","COMMENT","AUDIO_NAME","NARRATOR_NAME","PROGRAM_NAME","just_date","LAST_PRACTICE_DATE","PRACTICE_COUNT"]]
    overalltable1=overalltable.dropna()
    overalltable1["just_date"]=overalltable1["just_date"].apply(lambda x: x.strftime('%d %b %Y'))
    overalltable1["LAST_PRACTICE_DATE"]=overalltable1["LAST_PRACTICE_DATE"].dt.strftime('%d %b %Y')
    overalltable11=overalltable1.fillna(" ")
    overalltable1f=pd.DataFrame(overalltable1)
    word_chart={'positivetable':postablef.values.tolist(),'negtable':negtablef.values.tolist(),'overalltable':overalltable1f.values.tolist(),'positive':shp1,'negative':shp2,"word_cloud":zxc,"label":name,"count":count,"avg_rating":round(average, 2),"donut":{"pos":round(pos, 2),"neg":round(neg, 2)}}

    return json.dumps(word_chart)


@app.route('/user_stats/<email>/<cemail>')
def com_user_stat(email,cemail):
    mongo_uri = "mongodb://admin:" + urllib.parse.quote("I#L@teST^m0NGO_2o20!") + "@34.214.24.229:27017/"
    client = pymongo.MongoClient(mongo_uri)
    db = client.compass
    collection = db.audio_track_master
    dateStr = "2020-08-01T00:00:00.000Z"
    myDatetime = dateutil.parser.parse(dateStr)
    ID=ObjectId(email)
    CID=ObjectId(cemail)
#     print(ID)
    ######################  SCHOOL PRACTICE CSY ############################################
    df1 = DataFrame(list(collection.aggregate([{
            '$match':{"$and" :[{'USER_ID.IS_DISABLED':{'$ne':'Y'}},
                   { 'USER_ID.IS_BLOCKED':{"$ne":'Y'}},
                   { 'USER_ID.INCOMPLETE_SIGNUP':{"$ne":'Y'}}, 
                   { 'USER_ID.EMAIL_ID':{'$ne':""}},
                   { 'USER_ID._id':{"$in":[ID]}},
                   { 'CLASS_ID._id':{"$in":[CID]}},
                    {'MODIFIED_DATE':{"$gte":myDatetime}}
                              ]}},

            {"$match":
            {"$and" :[{'USER_ID.USER_NAME':{"$not": {'$regex' : 'test', '$options' : 'i'}}},
                    {'USER_ID.EMAIL_ID':{"$not": {'$regex' : 'test', '$options' : 'i'}}},
                    {'USER_ID.EMAIL_ID':{"$not": {'$regex' : '1gen', '$options' : 'i'}}},
                    {'USER_ID.schoolId.NAME':{"$not":{"$regex":'blocked', '$options':'i'}}}]}},
            {'$group':{'_id':{'day':{'$dayOfMonth':'$MODIFIED_DATE'}, 
                            'month':{'$month':'$MODIFIED_DATE'}},
                    'date':{'$first':'$MODIFIED_DATE'}, 
                    'Users_Practice_CSY':{'$sum':1},
                      'Mindful_Minutes':{'$sum':{'$round':
                      [{'$divide':[{'$subtract':
                          ['$CURSOR_END','$cursorStart']},60]},0]}}
                      }},
            {'$project':{'_id':0, 'Practice_date':{"$dateToString":{"format":"%Y-%m-%d","date":'$date'}}, 
                        'Users_Practice_CSY':'$Users_Practice_CSY','Mindful_Minutes':'$Mindful_Minutes'}}, 
            {"$sort":{'Practice_date':1}}])))
    
    #school_practice_history
    shp =0
    shhp2=0
    avg=0
    totalprac=0
    totalmm=0
    current_streak=0
    avg_sch_prac="0"
    max_streak=0
    daily_freq=0
    if df1.empty:
        shp =0
        shhp2=0
        avg=0
        totalprac=0
        totalmm=0
    else:
        
        df1['Practice_date'] = pd.to_datetime(df1['Practice_date'], format='%Y-%m-%d')
        r = pd.date_range(start=pd.Timestamp('2020-08-01'), end=pd.Timestamp.now())
        df22=df1.set_index('Practice_date').reindex(r).fillna(0.0).rename_axis('Practice_date').reset_index()
        df22['stt'] = np.where(df22['Users_Practice_CSY']!= 0.0,"win","loss")
        df22['Streak'] = df22['stt'].groupby((df22['stt'] != df22['stt'].shift()).cumsum()).cumcount() + 1
        xcvb=df22[df22["stt"]!="loss"]
        max_streak=max(xcvb["Streak"])
        last=df22.iloc[-1,:]
        current_streak=0
        avg_sch_prac="0"
        if last["stt"]=="loss" :
            current_streak=0
        else :
            current_streak=last["Streak"]
        daily_freq=last["Users_Practice_CSY"]
        
        df22['Practice_date'] = pd.to_datetime(df22['Practice_date'])
        df5=df22.sort_values(by='Practice_date')
        df5['Practice_date']=df5['Practice_date'].astype(np.int64)/int(1e6)
        shp=df5[["Practice_date","Users_Practice_CSY"]].values.tolist()
        shhp2=df5[["Practice_date","Mindful_Minutes"]].values.tolist()
        avg=str(round(df1["Mindful_Minutes"].mean()))
        totalmm=str(sum(df1["Mindful_Minutes"]))
        totalprac=str(sum(df1["Users_Practice_CSY"]))
    temp={'data':{"current_streak":str(current_streak),"max_streak":str(max_streak),"avg_sch_prac":str(avg_sch_prac),"daily_freq":str(daily_freq),'prac_chart':shp,"mm_chart":shhp2,"average_daily_min":avg,"total_prac":totalprac,"total_mm":totalmm}}
    return json.dumps(temp)




@app.route('/bubble_dataframe.csv')
def buble_district12():
    username = urllib.parse.quote_plus('admin')
    password = urllib.parse.quote_plus('A_dM!n|#!_2o20')
    client = MongoClient("mongodb://%s:%s@44.234.88.150:27017/" % (username, password))
    db=client.compass
    dateStr = "2020-01-01T00:00:00.000Z"
    myDatetime = dateutil.parser.parse(dateStr)
    collection = db.user_master
    qraaa=[
        {"$match":{'$and':[
        {'USER_NAME':{"$not":{"$regex":"test",'$options':'i'}}},
        {'EMAIL_ID':{"$not":{"$regex":"test",'$options':'i'}}},
        {'EMAIL_ID':{"$not":{"$regex":"1gen",'$options':'i'}}},
        {'USER_NAME':{'$not':{'$regex':'1gen', '$options':'i'}}},
        {'DISTRICT_ID.DISTRICT_NAME':{'$not':{'$regex':'test', '$options':'i'}}},
        {"schoolId._id":{"$in":db.school_master.distinct( "_id", { "IS_PORTAL": "Y" } )}},
        {'DISTRICT_ID':{'$exists':1}},
        {'INCOMPLETE_SIGNUP':{"$ne":'Y'}}, 
        {'CREATED_DATE':{"$gte":myDatetime}},
        {'ROLE_ID._id':{'$ne':ObjectId("5f155b8a3b6800007900da2b")}},
        {'IS_BLOCKED':{"$ne":'Y'}}, 
        {'IS_DISABLED':{"$ne":'Y'}}, {'schoolId.NAME':{'$not':{'$regex':'test', '$options':'i'}}},
        ]}},
        {'$group':{'_id':{"district":'$DISTRICT_ID._id',"month":{"$month": "$CREATED_DATE"}},
        'NAME_DISTRICT':{'$first':'$DISTRICT_ID.DISTRICT_NAME'},
        'usercount':{'$sum':1}}},
            {"$project":{"_id":0,"DISTRICT_ID":"$_id.district","MONTH":"$_id.month","NAME_DISTRICT":1,"usercount":1,
                        }}]
    merge11=list(collection.aggregate(qraaa))
    df1=pd.DataFrame(merge11)
    #######################################################
    db=client.compass
    dateStr = "2020-01-01T00:00:00.000Z"
    myDatetime = dateutil.parser.parse(dateStr)
    collection = db.user_master
    qra=[
        {"$match":{'$and':[
        {'USER_NAME':{"$not":{"$regex":"test",'$options':'i'}}},
        {'EMAIL_ID':{"$not":{"$regex":"test",'$options':'i'}}},
        {'EMAIL_ID':{"$not":{"$regex":"1gen",'$options':'i'}}},
        {'USER_NAME':{'$not':{'$regex':'1gen', '$options':'i'}}},
        {'DISTRICT_ID.DISTRICT_NAME':{'$not':{'$regex':'test', '$options':'i'}}},
        {"schoolId._id":{"$in":db.school_master.distinct( "_id", { "IS_PORTAL": "Y" } )}},
        {'DISTRICT_ID':{'$exists':1}},
        {'INCOMPLETE_SIGNUP':{"$ne":'Y'}}, 
        {'CREATED_DATE':{"$lt":myDatetime}},
        {'ROLE_ID._id':{'$ne':ObjectId("5f155b8a3b6800007900da2b")}},
        {'IS_BLOCKED':{"$ne":'Y'}}, 
        {'IS_DISABLED':{"$ne":'Y'}}, {'schoolId.NAME':{'$not':{'$regex':'test', '$options':'i'}}},
        ]}},
        {'$group':{'_id':{"district":'$DISTRICT_ID._id'},
        'NAME_DISTRICT':{'$first':'$DISTRICT_ID.DISTRICT_NAME'},
        'usercount':{'$sum':1}}},
            {"$project":{"_id":0,"DISTRICT_ID":"$_id.district","NAME_DISTRICT":1,"usercount":1,
                        }}]
    merge11233=list(collection.aggregate(qra))
    dfCV=pd.DataFrame(merge11233)
    #########################################################################
    df1=df1.sort_values(by=['NAME_DISTRICT'], ascending=True)
    x=df1[df1['NAME_DISTRICT']=="Belleville School District"]
    x["usercount"].sum()
    dislist=list(set(df1["NAME_DISTRICT"]))
    df2=df1[["NAME_DISTRICT","MONTH","usercount"]]
    overall=pd.DataFrame(columns=["NAME_DISTRICT","MONTH","usercount"])
    # dislist
    result=[]
    for k in dislist:
    #     print(k)
        df45=df2[df2["NAME_DISTRICT"]==k]
        df45.reset_index()
        for i in range(1,13):
            if i in list(df45["MONTH"]):
                pass
    #              print("month_present",i)
            else:
                df45.loc[i+len(df45)] = [k] +[i]+[0]
    #     df46=df45.groupby(['NAME_DISTRICT', 'MONTH']).reset_index()
        df46=df45.groupby(['NAME_DISTRICT', 'MONTH']).sum().groupby(level=0).cumsum().reset_index()
    #     print(df46)
        sorted_df =df46.sort_values(by=['MONTH'], ascending=True)
        sorted_df1=sorted_df.reset_index()
        result.append(sorted_df)
    buubleusercount = pd.concat(result)
    ######family ########
    username = urllib.parse.quote_plus('admin')
    password = urllib.parse.quote_plus('A_dM!n|#!_2o20')
    client = MongoClient("mongodb://%s:%s@44.234.88.150:27017/" % (username, password))
    db=client.compass
    dateStr = "2020-01-01T00:00:00.000Z"
    myDatetime = dateutil.parser.parse(dateStr)
    collection = db.user_master
    qraaa=[
        {"$match":{'$and':[
        {'USER_NAME':{"$not":{"$regex":"test",'$options':'i'}}},
        {'EMAIL_ID':{"$not":{"$regex":"test",'$options':'i'}}},
        {'EMAIL_ID':{"$not":{"$regex":"1gen",'$options':'i'}}},
        {'USER_NAME':{'$not':{'$regex':'1gen', '$options':'i'}}},
        {'DISTRICT_ID.DISTRICT_NAME':{'$not':{'$regex':'test', '$options':'i'}}},
        {"schoolId._id":{"$in":db.school_master.distinct( "_id", { "IS_PORTAL": "Y" } )}},
        {'DISTRICT_ID':{'$exists':1}},
        {'INCOMPLETE_SIGNUP':{"$ne":'Y'}}, 
        {'CREATED_DATE':{"$gte":myDatetime}},
        {'ROLE_ID._id':{'$eq':ObjectId("5f155b8a3b6800007900da2b")}},
        {'IS_BLOCKED':{"$ne":'Y'}}, 
        {'IS_DISABLED':{"$ne":'Y'}}, {'schoolId.NAME':{'$not':{'$regex':'test', '$options':'i'}}},
        ]}},
        {'$group':{'_id':{"district":'$DISTRICT_ID._id',"month":{"$month": "$CREATED_DATE"}},
        'NAME_DISTRICT':{'$first':'$DISTRICT_ID.DISTRICT_NAME'},
        'famcount':{'$sum':1}}},
            {"$project":{"_id":0,"DISTRICT_ID":"$_id.district","MONTH":"$_id.month","NAME_DISTRICT":1,"famcount":1,
                        }}]
    merge11=list(collection.aggregate(qraaa))
    df1=pd.DataFrame(merge11)
    #######################################################
    db=client.compass
    dateStr = "2020-01-01T00:00:00.000Z"
    myDatetime = dateutil.parser.parse(dateStr)
    collection = db.user_master
    qra=[
        {"$match":{'$and':[
        {'USER_NAME':{"$not":{"$regex":"test",'$options':'i'}}},
        {'EMAIL_ID':{"$not":{"$regex":"test",'$options':'i'}}},
        {'EMAIL_ID':{"$not":{"$regex":"1gen",'$options':'i'}}},
        {'USER_NAME':{'$not':{'$regex':'1gen', '$options':'i'}}},
        {'DISTRICT_ID.DISTRICT_NAME':{'$not':{'$regex':'test', '$options':'i'}}},
        {"schoolId._id":{"$in":db.school_master.distinct( "_id", { "IS_PORTAL": "Y" } )}},
        {'DISTRICT_ID':{'$exists':1}},
        {'INCOMPLETE_SIGNUP':{"$ne":'Y'}}, 
        {'CREATED_DATE':{"$lt":myDatetime}},
        {'ROLE_ID._id':{'$ne':ObjectId("5f155b8a3b6800007900da2b")}},
        {'IS_BLOCKED':{"$ne":'Y'}}, 
        {'IS_DISABLED':{"$ne":'Y'}}, {'schoolId.NAME':{'$not':{'$regex':'test', '$options':'i'}}},
        ]}},
        {'$group':{'_id':{"district":'$DISTRICT_ID._id'},
        'NAME_DISTRICT':{'$first':'$DISTRICT_ID.DISTRICT_NAME'},
        'usercount19':{'$sum':1}}},
            {"$project":{"_id":0,"DISTRICT_ID":"$_id.district","NAME_DISTRICT":1,"usercount19":1,
                        }}]
    merge11233=list(collection.aggregate(qra))
    dfCV=pd.DataFrame(merge11233)
    #########################################################################
    df1=df1.sort_values(by=['NAME_DISTRICT'], ascending=True)
    x=df1[df1['NAME_DISTRICT']=="Belleville School District"]
    x["famcount"].sum()
    dislist=list(set(df1["NAME_DISTRICT"]))
    df2=df1[["NAME_DISTRICT","MONTH","famcount"]]
    overall=pd.DataFrame(columns=["NAME_DISTRICT","MONTH","famcount"])
    # dislist
    result=[]
    for k in dislist:
    #     print(k)
        df45=df2[df2["NAME_DISTRICT"]==k]
        df45.reset_index()
        for i in range(1,13):
            if i in list(df45["MONTH"]):
                pass
    #              print("month_present",i)
            else:
                df45.loc[i+len(df45)] = [k] +[i]+[0]
    #     df46=df45.groupby(['NAME_DISTRICT', 'MONTH']).reset_index()
        df46=df45.groupby(['NAME_DISTRICT', 'MONTH']).sum().groupby(level=0).cumsum().reset_index()
    #     print(df46)
        sorted_df =df46.sort_values(by=['MONTH'], ascending=True)
        sorted_df1=sorted_df.reset_index()
        result.append(sorted_df)
    buublefamily = pd.concat(result)
    buubleusercount["idu"]=buubleusercount["NAME_DISTRICT"]+buubleusercount["MONTH"].map(str)
    buublefamily["idf"]=buublefamily["NAME_DISTRICT"]+buublefamily["MONTH"].map(str)
    mergeucfc=pd.merge(buubleusercount, buublefamily, how='left', left_on='idu', right_on='idf')
    mergeucfc=mergeucfc.fillna(0)
    mergeucfc1=pd.merge(mergeucfc, dfCV, how='left', left_on='NAME_DISTRICT_x', right_on='NAME_DISTRICT')
    mergeucfc12=mergeucfc1.fillna(0)
    mergeucfc12["totaluser"]=mergeucfc12["usercount"]+mergeucfc12["usercount19"]
    finmerge=mergeucfc12[["NAME_DISTRICT_x","MONTH_x","idu","totaluser","famcount"]]
    ###ACTIVE USER
    username = urllib.parse.quote_plus('admin')
    password = urllib.parse.quote_plus('A_dM!n|#!_2o20')
    client = MongoClient("mongodb://%s:%s@44.234.88.150:27017/" % (username, password))
    db=client.compass
    dateStr = "2020-01-01T00:00:00.000Z"
    myDatetime = dateutil.parser.parse(dateStr)
    collection = db.audio_track_master
    qra12=[
        {"$match":{'$and':[{'USER_ID.USER_NAME':{"$not":{"$regex":"test",'$options':'i'}}},
        {'USER_ID.EMAIL_ID':{"$not":{"$regex":"test",'$options':'i'}}},
        {'USER_ID.EMAIL_ID':{"$not":{"$regex":"1gen",'$options':'i'}}},
        {'USER_ID.USER_NAME':{'$not':{'$regex':'1gen', '$options':'i'}}},
        {'USER_ID.DISTRICT_ID.DISTRICT_NAME':{'$not':{'$regex':'test', '$options':'i'}}},
        {"USER_ID.schoolId._id":{"$in":db.school_master.distinct( "_id", { "IS_PORTAL": "Y" } )}},
        {'USER_ID.DISTRICT_ID':{'$exists':1}},
        {'USER_ID.INCOMPLETE_SIGNUP':{"$ne":'Y'}}, 
        {'MODIFIED_DATE':{"$gte":myDatetime}},
        {'USER_ID.ROLE_ID._id':{'$ne':ObjectId("5f155b8a3b6800007900da2b")}},
        {'USER_ID.IS_BLOCKED':{"$ne":'Y'}}, 
        {'USER_ID.IS_DISABLED':{"$ne":'Y'}}, {'USER_ID.schoolId.NAME':{'$not':{'$regex':'test', '$options':'i'}}},
        ]}},
        {'$group':{'_id':{"district":'$USER_ID.DISTRICT_ID._id',"year":{"$year": "$MODIFIED_DATE"},"month":{"$month": "$MODIFIED_DATE"}},
        'NAME_DISTRICT':{'$first':'$USER_ID.DISTRICT_ID.DISTRICT_NAME'},
        'PRACTICE':{'$sum':1},
        "ACTIVE_USER":{'$addToSet':"$USER_ID._id"},
        'Mindful_Minutes':{"$sum":{"$round":[{"$divide":[{"$subtract":['$CURSOR_END','$cursorStart']}, 60]},2]}}}},
            {"$project":{"_id":0,"DISTRICT_ID":"$_id.district","MONTH":"$_id.month","YEAR":"$_id.year","NAME_DISTRICT":1,"PRACTICE":1,"ACTIVE_USER":{"$size":"$ACTIVE_USER"},
                       "Mindful_Minutes":1 }}]
    merge121=list(collection.aggregate(qra12))
    df1=pd.DataFrame(merge121)
    df1=df1.sort_values(by=['NAME_DISTRICT'], ascending=True)
    # print(df1)
    # x=df1[df1['NAME_DISTRICT']=="Belleville School District"]
    dislist=list(set(df1["NAME_DISTRICT"]))
    df2=df1[["NAME_DISTRICT","MONTH","ACTIVE_USER"]]
    overall=pd.DataFrame(columns=["NAME_DISTRICT","MONTH","ACTIVE_USER"])
    result=[]
    for k in dislist:
    #     print(k)
        df45=df2[df2["NAME_DISTRICT"]==k]
        df45.reset_index()
        for i in range(1,13):
            if i in list(df45["MONTH"]):
                pass
    #              print("month_present",i)
            else:
                df45.loc[i+len(df45)] = [k] +[i]+[0]
    #     df46=df45.groupby(['NAME_DISTRICT', 'MONTH']).reset_index()
    #     df46=df45.groupby(['NAME_DISTRICT', 'MONTH']).sum().groupby(level=0).cumsum().reset_index()
    #     print(df46)
        sorted_df =df45.sort_values(by=['MONTH'], ascending=True)
        sorted_df1=sorted_df.reset_index()
        result.append(sorted_df)
    buubleactuser = pd.concat(result)
    buubleactuser["acuid"]=buubleactuser["NAME_DISTRICT"]+buubleactuser["MONTH"].map(str)
    # buubleactuser
    finmergeu=pd.merge(finmerge, buubleactuser, how='left', left_on='idu', right_on='acuid')
    ###ACTIVE FAMILY
    username = urllib.parse.quote_plus('admin')
    password = urllib.parse.quote_plus('A_dM!n|#!_2o20')
    client = MongoClient("mongodb://%s:%s@44.234.88.150:27017/" % (username, password))
    db=client.compass
    dateStr = "2020-01-01T00:00:00.000Z"
    myDatetime = dateutil.parser.parse(dateStr)
    collection = db.audio_track_master
    qra12=[
        {"$match":{'$and':[{'USER_ID.USER_NAME':{"$not":{"$regex":"test",'$options':'i'}}},
        {'USER_ID.EMAIL_ID':{"$not":{"$regex":"test",'$options':'i'}}},
        {'USER_ID.EMAIL_ID':{"$not":{"$regex":"1gen",'$options':'i'}}},
        {'USER_ID.USER_NAME':{'$not':{'$regex':'1gen', '$options':'i'}}},
        {'USER_ID.DISTRICT_ID.DISTRICT_NAME':{'$not':{'$regex':'test', '$options':'i'}}},
        {"USER_ID.schoolId._id":{"$in":db.school_master.distinct( "_id", { "IS_PORTAL": "Y" } )}},
        {'USER_ID.DISTRICT_ID':{'$exists':1}},
        {'USER_ID.INCOMPLETE_SIGNUP':{"$ne":'Y'}}, 
        {'MODIFIED_DATE':{"$gte":myDatetime}},
        {'USER_ID.ROLE_ID._id':ObjectId("5f155b8a3b6800007900da2b")},
        {'USER_ID.IS_BLOCKED':{"$ne":'Y'}}, 
        {'USER_ID.IS_DISABLED':{"$ne":'Y'}}, {'USER_ID.schoolId.NAME':{'$not':{'$regex':'test', '$options':'i'}}},
        ]}},
        {'$group':{'_id':{"district":'$USER_ID.DISTRICT_ID._id',"year":{"$year": "$MODIFIED_DATE"},"month":{"$month": "$MODIFIED_DATE"}},
        'NAME_DISTRICT':{'$first':'$USER_ID.DISTRICT_ID.DISTRICT_NAME'},
        'PRACTICE':{'$sum':1},
        "ACTIVE_FAM":{'$addToSet':"$USER_ID._id"},
        'Mindful_Minutes':{"$sum":{"$round":[{"$divide":[{"$subtract":['$CURSOR_END','$cursorStart']}, 60]},2]}}}},
            {"$project":{"_id":0,"DISTRICT_ID":"$_id.district","MONTH":"$_id.month","YEAR":"$_id.year","NAME_DISTRICT":1,"PRACTICE":1,"ACTIVE_FAM":{"$size":"$ACTIVE_FAM"},
                       "Mindful_Minutes":1 }}]
    merge121=list(collection.aggregate(qra12))
    df1=pd.DataFrame(merge121)
    df1=df1.sort_values(by=['NAME_DISTRICT'], ascending=True)
    # x=df1[df1['NAME_DISTRICT']=="Belleville School District"]
    dislist=list(set(df1["NAME_DISTRICT"]))
    df2=df1[["NAME_DISTRICT","MONTH","ACTIVE_FAM"]]
    overall=pd.DataFrame(columns=["NAME_DISTRICT","MONTH","ACTIVE_FAM"])
    result=[]
    for k in dislist:
    #     print(k)
        df45=df2[df2["NAME_DISTRICT"]==k]
        df45.reset_index()
        for i in range(1,13):
            if i in list(df45["MONTH"]):
                pass
    #              print("month_present",i)
            else:
                df45.loc[i+len(df45)] = [k] +[i]+[0]
    #     df46=df45.groupby(['NAME_DISTRICT', 'MONTH']).reset_index()
    #     df46=df45.groupby(['NAME_DISTRICT', 'MONTH']).sum().groupby(level=0).cumsum().reset_index()
    #     print(df46)
        sorted_df =df45.sort_values(by=['MONTH'], ascending=True)
        sorted_df1=sorted_df.reset_index()
        result.append(sorted_df)
    buubleactfam = pd.concat(result)
    buubleactfam["acuidf"]=buubleactfam["NAME_DISTRICT"]+buubleactfam["MONTH"].map(str)
    finmergeuf=pd.merge(finmergeu, buubleactfam, how='left', left_on='idu', right_on='acuidf')
    finmergeuf["USER ENGAGEMENT"]=round((finmergeuf["ACTIVE_USER"]/finmergeuf["totaluser"])*100)
    finmergeuf["FAMILY ENGAGEMENT"]=round((finmergeuf["ACTIVE_FAM"]/finmergeuf["famcount"])*100)
    finmergeufo=finmergeuf[["NAME_DISTRICT_x","MONTH_x","USER ENGAGEMENT","FAMILY ENGAGEMENT"]]
    finmergeufo=finmergeufo.fillna(0)
    finmergeufo=finmergeufo.loc[:,~finmergeufo.columns.duplicated()]
    username = urllib.parse.quote_plus('admin')
    password = urllib.parse.quote_plus('A_dM!n|#!_2o20')
    client = MongoClient("mongodb://%s:%s@44.234.88.150:27017/" % (username, password))
    db=client.compass
    # dateStr = "2020-01-01T00:00:00.000Z"
    myDatetime = dateutil.parser.parse(dateStr)
    collection = db.audio_track_master
    qra12=[
        {"$match":{'$and':[{'USER_ID.USER_NAME':{"$not":{"$regex":"test",'$options':'i'}}},
        {'USER_ID.EMAIL_ID':{"$not":{"$regex":"test",'$options':'i'}}},
        {'USER_ID.EMAIL_ID':{"$not":{"$regex":"1gen",'$options':'i'}}},
        {'USER_ID.USER_NAME':{'$not':{'$regex':'1gen', '$options':'i'}}},
        {'USER_ID.DISTRICT_ID.DISTRICT_NAME':{'$not':{'$regex':'test', '$options':'i'}}},
        {"USER_ID.schoolId._id":{"$in":db.school_master.distinct( "_id", { "IS_PORTAL": "Y" } )}},
        {'USER_ID.DISTRICT_ID':{'$exists':1}},
        {'USER_ID.INCOMPLETE_SIGNUP':{"$ne":'Y'}}, 
    #     {'MODIFIED_DATE':{"$gte":myDatetime}},
    #     {'USER_ID.ROLE_ID._id':ObjectId("5f155b8a3b6800007900da2b")},
        {'USER_ID.IS_BLOCKED':{"$ne":'Y'}}, 
        {'USER_ID.IS_DISABLED':{"$ne":'Y'}}, {'USER_ID.schoolId.NAME':{'$not':{'$regex':'test', '$options':'i'}}},
        ]}},
        {'$group':{'_id':{"district":'$USER_ID.DISTRICT_ID._id'},
        'NAME_DISTRICT':{'$first':'$USER_ID.DISTRICT_ID.DISTRICT_NAME'},
        'PRACTICE':{'$sum':1},
                  }},
            {"$project":{"_id":0,"DISTRICT_ID":"$_id.district","NAME_DISTRICT":1,"PRACTICE":1 }}]
    merge1211=list(collection.aggregate(qra12))
    df1111=pd.DataFrame(merge1211)
    df1111=df1111.sort_values(by=['NAME_DISTRICT'], ascending=True)
    DISPRACTO=df1111[["NAME_DISTRICT","PRACTICE"]]
    username = urllib.parse.quote_plus('admin')
    password = urllib.parse.quote_plus('A_dM!n|#!_2o20')
    client = MongoClient("mongodb://%s:%s@44.234.88.150:27017/" % (username, password))
    db=client.compass
    # dateStr = "2020-01-01T00:00:00.000Z"
    myDatetime = dateutil.parser.parse(dateStr)
    collection = db.user_master
    qra12=[
        {"$match":{'$and':[{'USER_NAME':{"$not":{"$regex":"test",'$options':'i'}}},
        {'EMAIL_ID':{"$not":{"$regex":"test",'$options':'i'}}},
        {'EMAIL_ID':{"$not":{"$regex":"1gen",'$options':'i'}}},
        {'USER_NAME':{'$not':{'$regex':'1gen', '$options':'i'}}},
        {'DISTRICT_ID.DISTRICT_NAME':{'$not':{'$regex':'test', '$options':'i'}}},
        {"schoolId._id":{"$in":db.school_master.distinct( "_id", { "IS_PORTAL": "Y" } )}},
        {'DISTRICT_ID':{'$exists':1}},
        {'INCOMPLETE_SIGNUP':{"$ne":'Y'}}, 
    #     {'MODIFIED_DATE':{"$gte":myDatetime}},
    #     {'ROLE_ID._id':ObjectId("5f155b8a3b6800007900da2b")},
        {'IS_BLOCKED':{"$ne":'Y'}}, 
        {'IS_DISABLED':{"$ne":'Y'}}, {'schoolId.NAME':{'$not':{'$regex':'test', '$options':'i'}}},
        ]}},
        {'$group':{'_id':{"district":'$DISTRICT_ID._id'},
        'NAME_DISTRICT':{'$first':'$DISTRICT_ID.DISTRICT_NAME'},
        "SCHOOL COUNT":{'$addToSet':"$schoolId._id"},
                  }},
            {"$project":{"_id":0,"DISTRICT_ID":"$_id.district","NAME_DISTRICT":1,"SCHOOL COUNT":{"$size":"$SCHOOL COUNT"} }}]
    merge1211=list(collection.aggregate(qra12))
    df1111=pd.DataFrame(merge1211)
    df1111=df1111.sort_values(by=['NAME_DISTRICT'], ascending=True)
    DISSCHOOL=df1111[["NAME_DISTRICT","SCHOOL COUNT"]]
    finmergeufosch=pd.merge(finmergeufo, DISSCHOOL, how='left', left_on='NAME_DISTRICT_x', right_on='NAME_DISTRICT')
    finmergeufoschprac=pd.merge(finmergeufosch, DISPRACTO, how='left', left_on='NAME_DISTRICT_x', right_on='NAME_DISTRICT')
    final_buuble_data=finmergeufoschprac[["NAME_DISTRICT_x","MONTH_x","USER ENGAGEMENT","FAMILY ENGAGEMENT","SCHOOL COUNT","PRACTICE"]]
    finaldata=final_buuble_data.rename(columns={"NAME_DISTRICT_x": "DISTRICT_NAME","USER ENGAGEMENT":"USER_ENGAGEMENT","SCHOOL COUNT":"SCHOOL_COUNT", "FAMILY ENGAGEMENT":"FAMILY_ENGAGEMENT","MONTH_x": "MONTH"})
    finaldata=finaldata.loc[:,~finaldata.columns.duplicated()]
    # findict=finaldata.T.to_dict().values()
    # response = make_response(finaldata.to_csv())
    # response.headers['Content-Type'] = 'text/csv'
    li = [finaldata.columns.values.tolist()] + finaldata.values.tolist() 
    sheet = pe.Sheet(li)
    print(sheet,"sheet")
    print(type(sheet),"sheet type")
    ioO = io.StringIO()
    sheet.save_to_memory("csv", ioO)
    output = make_response(ioO.getvalue())
    # output.headers["Content-Disposition"] = "attachment; filename=export.csv"
    output.headers["Content-type"] = "text/csv"
    return output

@app.route('/campaignstatapi')
def campaignapi():
    username = urllib.parse.quote_plus('admin')
    password = urllib.parse.quote_plus('A_dM!n|#!_2o20')
    client = MongoClient("mongodb://%s:%s@44.234.88.150:27017/" % (username, password))
    db=client.compass
    collection = db.campaign_data
    query=[{'$match':{'$and':[
    # //     { 'FIRST_NAME':{"$not":{"$regex":"test",'$options':'i'}}},
    # //                    {'EMAIL':{"$not":{"$regex":"test",'$options':'i'}}},
    # //                      {'EMAIL':{"$not":{"$regex":"1gen",'$options':'i'}}},
    # //                      {'CAMPAIGN_ID.CAMPAIGN_DESC':{"$not":{"$regex":"1gen",'$options':'i'}}},
                         {'CAMPAIGN_ID.CAMPAIGN_DESC':{"$not":{"$regex":"test",'$options':'i'}}},
                         {'IS_PAYMENT_SUCCESS':'Y'}        
          ]}},
          {'$group':{
              '_id':'$CAMPAIGN_ID._id',
              'CAMPAIGN_NAME':{'$first':'$CAMPAIGN_ID.H_TEXT'},
              'CREATED_DATE':{'$first':'$CAMPAIGN_ID.CREATED_DATE'},
                  'RAISED_AMOUNT':{'$sum':'$AMOUNT'},
                  'TARGET_AMOUNT':{'$first':'$CAMPAIGN_ID.TOTAL_TARGET_AMOUNT'},
              }}]
    campaign_data=list(collection.aggregate(query))
    campaign_data_df=pd.DataFrame(campaign_data)
    collection2 = db.campaign_detail
    query2=[{"$match":{
             '$and':[{ 'USER_ID.USER_NAME':{"$not":{"$regex":"test",'$options':'i'}}},
                       {'USER_ID.EMAIL_ID':{"$not":{"$regex":"test",'$options':'i'}}},
                         {'USER_ID.EMAIL_ID':{"$not":{"$regex":"1gen",'$options':'i'}}},
              {'USER_ID.INCOMPLETE_SIGNUP':{"$ne":'Y'}},
              {'USER_ID.IS_DISABLED':{"$ne":'Y'}},
              {'USER_ID.IS_BLOCKED':{"$ne":'Y'}},
              {'USER_ID.ROLE_ID._id':{'$ne':ObjectId("5f155b8a3b6800007900da2b")}},
              {'USER_ID.DEVICE_USED':{"$regex":'webapp','$options':'i'}},
              {'USER_ID.schoolId.NAME':{'$not':{"$regex":'Blocked','$options':'i'}}},
              {'USER_ID.schoolId.BLOCKED_BY_CAP':{'$exists':0}},
              {'CAMPAIGN_DESC':{"$not":{"$regex":"test",'$options':'i'}}},
              {'CAMPAIGN_DESC':{"$not":{"$regex":"test",'$options':'i'}}}
              ]}},
              {'$project':{
                  'RAISED_AMOUNT':'$RAISED_AMOUNT',
                  'SCHOOL_ID':'$SCHOOL_ID._id',
                  'SCHOOL_NAME':'$SCHOOL_ID.NAME',
                  'CITY':'$SCHOOL_ID.CITY',
                  'STATE':'$SCHOOL_ID.STATE',
                  'USER_ID':'$USER_ID._id',
                  'USER_NAME':'$USER_ID.USER_NAME',
                  'USER_EMAIL':'$USER_ID.EMAIL_ID',
                  "IMAGE_NAME":"$IMAGE_NAME"
                  }
                  }]
    campaign_detail=list(collection2.aggregate(query2))
    campaign_detail_df=pd.DataFrame(campaign_detail)
    collection3 = db.subscription_master
    query3=[{"$match":{
             '$and':[{ 'USER_ID.USER_NAME':{"$not":{"$regex":"test",'$options':'i'}}},
                       {'USER_ID.EMAIL_ID':{"$not":{"$regex":"test",'$options':'i'}}},
                         {'USER_ID.EMAIL_ID':{"$not":{"$regex":"1gen",'$options':'i'}}},
              {'USER_ID.INCOMPLETE_SIGNUP':{"$ne":'Y'}},
              {'USER_ID.IS_DISABLED':{"$ne":'Y'}},
              {'USER_ID.IS_BLOCKED':{"$ne":'Y'}},
              {'USER_ID.ROLE_ID._id':{'$ne':ObjectId("5f155b8a3b6800007900da2b")}},
              {'USER_ID.DEVICE_USED':{"$regex":'webapp','$options':'i'}},
              {'USER_ID.schoolId.NAME':{'$not':{"$regex":'Blocked','$options':'i'}}},
              {'USER_ID.schoolId.BLOCKED_BY_CAP':{'$exists':0}},
              {'IS_PAYMENT_SUCCESS':'Y'},
              {'USER_ID._id':{
                  '$in':
                  db.campaign_detail.distinct('USER_ID._id')
                  }}
              ]}},
              {'$project':{
                  '_id':0,
                  'SCHOOL_ID':'$USER_ID.schoolId._id',
                  'LAST_PAYMENT_AMOUNT':'$LAST_PAYMENT_AMOUNT',
                  "LOGO":"$USER_ID.schoolId.LOGO"
                 }}]
    already_paid=list(collection3.aggregate(query3))
    already_paid_amount_df=pd.DataFrame(already_paid)
    #     print(already_paid_amount_df)

    table1=campaign_data_df.merge(campaign_detail_df,on='_id',how='inner')
    table2=table1.merge(already_paid_amount_df,how='left',on='SCHOOL_ID')
    table2['TOTAL_RAISED_AMOUNT']=table2.RAISED_AMOUNT_x+table2.LAST_PAYMENT_AMOUNT
    table2['LEFT_AMOUNT']=table2.TARGET_AMOUNT-table2.TOTAL_RAISED_AMOUNT
    final_table=table2.copy()
    final_table['_id']=final_table['_id'].astype('str')
    final_table2=final_table[["_id","CAMPAIGN_NAME","TOTAL_RAISED_AMOUNT","SCHOOL_NAME","LEFT_AMOUNT","TARGET_AMOUNT","IMAGE_NAME","LOGO"]]
    final_table3=final_table2.fillna("no info available")
    asd=[]
    for i in range(len(final_table3)):
        asd.append({"CAMPAIGN_ID":[final_table3["_id"][i]],
                    "CAMPAIGN_NAME":[final_table3["CAMPAIGN_NAME"][i]],
                     "RAISED_AMOUNT":[final_table3["TOTAL_RAISED_AMOUNT"][i]],
                     "LEFT_AMOUNT":[final_table3["LEFT_AMOUNT"][i]],
                     "TARGET_AMOUNT":[final_table3["TARGET_AMOUNT"][i]],
                     "IMAGE_NAME":[final_table3["IMAGE_NAME"][i]],
                     "LOGO":[final_table3["LOGO"][i]],
                   "SCHOOL_NAME":[final_table3["SCHOOL_NAME"][i]]})
    return json.dumps({'data':asd})



@app.route('/school_search_id')

def school_search_id():
    username = urllib.parse.quote_plus('admin')
    password = urllib.parse.quote_plus('A_dM!n|#!_2o20')
    client = MongoClient("mongodb://%s:%s@44.234.88.150:27017/" % (username, password))
    db=client.compass
    collection = db.user_master
    query=[
    {"$match":{
             '$and':[{ 'USER_NAME':{"$not":{"$regex":"test",'$options':'i'}}},
                       {'EMAIL_ID':{"$not":{"$regex":"test",'$options':'i'}}},
                         {'EMAIL_ID':{"$not":{"$regex":"1gen",'$options':'i'}}},
              {'INCOMPLETE_SIGNUP':{"$ne":'Y'}},
              {'IS_DISABLED':{"$ne":'Y'}},
              {'IS_BLOCKED':{"$ne":'Y'}},
              {'IS_ADMIN':'Y'},
    # //           {'ROLE_ID._id':{'$ne':ObjectId("5f155b8a3b6800007900da2b")}},
    # //           {'DEVICE_USED':{"$regex":'webapp','$options':'i'}},
              {'schoolId.NAME':{'$not':{"$regex":'Blocked','$options':'i'}}},
              {'schoolId.BLOCKED_BY_CAP':{'$exists':0}}]}},
     {'$group':{
         '_id':'$schoolId._id',
         'NAME':{'$first':'$schoolId.NAME'},
         'CITY':{'$first':'$schoolId.CITY'},
         'STATE':{'$first':'$schoolId.STATE'},
         'COUNTRY':{'$first':'$schoolId.COUNTRY'}
         }}]
    schools=list(collection.aggregate(query))
    schools_info=pd.DataFrame(schools)
    dffinalnew=schools_info.copy()
    dffinalnew['CITY']=dffinalnew['CITY'].str.upper()
    dffinalnew['STATE']=dffinalnew['STATE'].str.upper()
    dffinalnew['concatenate']=dffinalnew['NAME'].map(str)+' , '+dffinalnew['CITY'].map(str)+' , '+dffinalnew['STATE'].map(str)
    dffinalnew['_id']=dffinalnew['_id'].astype('str')
    d=[]  
    for i in range(len(dffinalnew['_id'])):

        x={ "value":dffinalnew['concatenate'][i],"label":dffinalnew['concatenate'][i],"desc":dffinalnew['_id'][i]}
#        print(x,"hello")
        d.append(x)
    
    return json.dumps({'data':d})


@app.route('/school_search_name/')
def school_search_():
    username = urllib.parse.quote_plus('admin')
    password = urllib.parse.quote_plus('A_dM!n|#!_2o20')
    client = MongoClient("mongodb://%s:%s@44.234.88.150:27017/" % (username, password))
    db=client.compass
    collection = db.user_master
    query=[
    {"$match":{
             '$and':[{ 'USER_NAME':{"$not":{"$regex":"test",'$options':'i'}}},
                       {'EMAIL_ID':{"$not":{"$regex":"test",'$options':'i'}}},
                         {'EMAIL_ID':{"$not":{"$regex":"1gen",'$options':'i'}}},
              {'INCOMPLETE_SIGNUP':{"$ne":'Y'}},
              {'IS_DISABLED':{"$ne":'Y'}},
              {'IS_BLOCKED':{"$ne":'Y'}},
              {'IS_ADMIN':'Y'},
    # //           {'ROLE_ID._id':{'$ne':ObjectId("5f155b8a3b6800007900da2b")}},
    # //           {'DEVICE_USED':{"$regex":'webapp','$options':'i'}},
              {'schoolId.NAME':{'$not':{"$regex":'Blocked','$options':'i'}}},
              {'schoolId.BLOCKED_BY_CAP':{'$exists':0}}]}},
     {'$group':{
         '_id':'$schoolId._id',
         'NAME':{'$first':'$schoolId.NAME'},
         'CITY':{'$first':'$schoolId.CITY'},
         'STATE':{'$first':'$schoolId.STATE'},
         'COUNTRY':{'$first':'$schoolId.COUNTRY'},
         }}]
    schools=list(collection.aggregate(query))
    schools_info=pd.DataFrame(schools)
    dffinalnew=schools_info.copy()
    dffinalnew['concatenate']=dffinalnew['NAME'].map(str)+','+dffinalnew['CITY'].map(str)+','+dffinalnew['STATE'].map(str)
    dffinalnew['_id']=dffinalnew['_id'].astype('str')
    d={}    
    for i, j in zip(dffinalnew['concatenate'].tolist(), dffinalnew['_id'].tolist()):
        d.setdefault(i,j)
        
    return json.dumps({'data':d})

@app.route('/_executive_dashbaord_')
def _excecutivecount_():
    username = urllib.parse.quote_plus('admin')
    password = urllib.parse.quote_plus('A_dM!n|#!_2o20')
    client = MongoClient("mongodb://%s:%s@44.234.88.150:27017/" % (username, password))
    db=client.compass
    collection = db["school_master"]
    query = {}
    query["CATEGORY"] = Regex(u".*LAUSD.*", "i")
    query["_id"]={"$in":db.user_master.distinct('schoolId._id')}
    projection = {}
    projection["_id"] = 1.0
    cursor = collection.find(query, projection = projection)
    dfum=(list(cursor))
    dfum1=pd.DataFrame(dfum)
    comadd=1299-len(dfum1)
    username = urllib.parse.quote_plus('admin')
    password = urllib.parse.quote_plus('A_dM!n|#!_2o20')
    client = MongoClient("mongodb://%s:%s@44.234.88.150:27017/" % (username, password))

    database = client["compass"]

    collection1 = database["user_master"]


    df1=DataFrame(list(collection1.aggregate([{"$match":
         {'$and': [

                {"IS_DISABLED":{"$ne":"Y"}},
                  {"IS_BLOCKED":{"$ne":"Y"}},
                 {"INCOMPLETE_SIGNUP":{"$ne":"Y"}},
                { 'USER_NAME':{"$not":{"$regex":"test",'$options':'i'}}},
                { 'USER_NAME':{"$not":{"$regex":"1gen",'$options':'i'}}},

    # //               {'IS_ADMIN':'Y'},
                 {'EMAIL_ID':{'$ne':''}},
                 {'schoolId.NAME':{"$not":{"$regex":"test",'$options':'i'}}},
             {'schoolId.BLOCKED_BY_CAP':{'$exists':False}},
                           {'EMAIL_ID':{"$not":{"$regex":"test",'$options':'i'}}},
                             {'EMAIL_ID':{"$not":{"$regex":"1gen",'$options':'i'}}}]}},

            {'$group':{'_id':{},'ID':{'$addToSet':'$schoolId._id'}}},
                  {'$project':{'_id':0,'schools':{'$size':'$ID'}}},

                  ])))
    total_school=df1['schools'][0]+comadd
    df = DataFrame(list(collection1.aggregate([{"$match":
    {'$and':[{"IS_DISABLED":{"$ne":"Y"}},
                  {"IS_BLOCKED":{"$ne":"Y"}},
                 {"INCOMPLETE_SIGNUP":{"$ne":"Y"}},
                { 'USER_NAME':{"$not":{"$regex":"test",'$options':'i'}}},
                { 'USER_NAME':{"$not":{"$regex":"1gen",'$options':'i'}}},

    # //               {'IS_ADMIN':'Y'},
                 {'EMAIL_ID':{'$ne':''}},
                 {'schoolId.NAME':{"$not":{"$regex":"test",'$options':'i'}}},
             {'schoolId.BLOCKED_BY_CAP':{'$exists':False}},
                           {'EMAIL_ID':{"$not":{"$regex":"test",'$options':'i'}}},
                             {'EMAIL_ID':{"$not":{"$regex":"1gen",'$options':'i'}}}]}},



     {"$group":{'_id':{},'distincts': {'$addToSet': "$_id"}}},
        {"$project":{'_id':0,'Total_user':{'$size':'$distincts'}}}])))

    Total_user=df['Total_user'][0]

    # print(Total_user)

    Total_classroom=Total_user+total_school
    # print(Total_classroom)
    Total_students=Total_classroom*26
    # print(Total_students)
    Total_mindful_minutes=Total_students*8
    # print(Total_mindful_minutes)


    df2 = DataFrame(list(collection1.aggregate([{"$match":
        {'$and':[ {"IS_DISABLED":{"$ne":"Y"}},
                  {"IS_BLOCKED":{"$ne":"Y"}},
                 {"INCOMPLETE_SIGNUP":{"$ne":"Y"}},
                { 'USER_NAME':{"$not":{"$regex":"test",'$options':'i'}}},
                { 'USER_NAME':{"$not":{"$regex":"1gen",'$options':'i'}}},

    # //               {'IS_ADMIN':'Y'},
                 {'EMAIL_ID':{'$ne':''}},
                 {'schoolId.NAME':{"$not":{"$regex":"test",'$options':'i'}}},
             {'schoolId.BLOCKED_BY_CAP':{'$exists':False}},
                           {'EMAIL_ID':{"$not":{"$regex":"test",'$options':'i'}}},
                             {'EMAIL_ID':{"$not":{"$regex":"1gen",'$options':'i'}}},
    {"_id":{"$nin":database.audio_track_master.distinct("USER_ID._id")}}                       
                                 ]}},
    {"$group":{'_id':{},'distincts': {'$addToSet': "$_id"}}},
    {"$project":{'_id':0,'never_loggedin':{'$size':'$distincts'}}}])))

    Never_logged_in=df2['never_loggedin'][0]
    # print(Never_logged_in)

    collection2 = database["audio_track_master"]


    df3 = DataFrame(list(collection2.aggregate([
    {"$match":
     {
        '$and':[
            {'USER_ID.ROLE_ID._id' :{'$ne':ObjectId("5f155b8a3b6800007900da2b")}},
         {"USER_ID.IS_DISABLED":{"$ne":"Y"}},
          {"USER_ID.IS_BLOCKED":{"$ne":"Y"}},
         {"USER_ID.INCOMPLETE_SIGNUP":{"$ne":"Y"}},
            {'USER_ID.schoolId.BLOCKED_BY_CAP':{'$exists':False}},
            {'EMAIL_ID':{'$ne':''}},
             {'schoolId.NAME':{"$not":{"$regex":"test",'$options':'i'}}},
         { 'USER_NAME':{"$not":{"$regex":"1gen",'$options':'i'}}},
     { 'USER_ID.USER_NAME':{"$not":{"$regex":"test",'$options':'i'}}},
                       {'USER_ID.EMAIL_ID':{"$not":{"$regex":"test",'$options':'i'}}},
                         {'USER_ID.EMAIL_ID':{"$not":{"$regex":"1gen",'$options':'i'}}}]

     }},
    {'$group':{'_id':{},'auc':{'$addToSet':'$USER_ID.schoolId._id'}}},
    {'$project':{'_id':0, 'active_schools':{'$size':'$auc'}}}

    ])))

    active_school=df3['active_schools'][0]
    # print(active_school)




    temp={"total_school":str(total_school),
         "user_count":str(Total_user),
        "total_classrooms":str(Total_classroom),
          "total_students":str(Total_students),
          "mindful_minutes":str(Total_mindful_minutes),
          "active_school":str(active_school),
         "never_logged_in":str(Never_logged_in)}

    # print(temp)
    return json.dumps(temp)



# =====================districtreport===========================
@app.route('/schoolwisefamilycount/<districtid>')
def schpuc(districtid):
    disdic={'5f2609807a1c0000950bb465':'Middleton - Cross Plains Area School District',
    '5f2609807a1c0000950bb475':'Agawam School district',
    '5f2609807a1c0000950bb481':'Alameda Unified School District',
    '5f2609807a1c0000950bb47a':'Alpine School District',
    '5f2609807a1c0000950bb47b':'Ann Arbor Public Schools',
    '5f2609807a1c0000950bb463':'Austin Independent School District',
    '5f59e4836451a9089d7d4007':'Belleville School District',
    '5f2609807a1c0000950bb46d':'Broward County Public Schools',
    '5f2609807a1c0000950bb46c':'Chico Unified School District',
    '5f2609807a1c0000950bb460':'Clarksville-Montgomery County School System',
    '5f2609807a1c0000950bb47f':'Community Consolidated School District 89',
    '5f2609807a1c0000950bb45c':'Comox Valley School District(sd71)',
    '5f2609807a1c0000950bb480':'Dell Texas',
    '5f7413ef9387fd71ce6387cb':'Douglas County School District',
    '5f895191609e08b76029f641':'Early learning Sarasota',
    '5f2609807a1c0000950bb462':'Englewood Cliffs Public Schools',
    '5f2609807a1c0000950bb461':'Englewood Public School District',
    '5f2609807a1c0000950bb45e':'Fairfield-Suisun Unified School District',
    '5f2609807a1c0000950bb47d':'Flint Public Schools',
    '5f2609807a1c0000950bb46b':'FundaciÃ³n La Puerta',
    '5f2609807a1c0000950bb450':'Goleta District',
    '5f2609807a1c0000950bb474':'Greenburgh-North Castle (GNC) Union Free School District',
    '5f2609807a1c0000950bb45f':'Griffin-Spalding County School System',
    '5f2609807a1c0000950bb476':'Hillsborough County',
    '5f2609807a1c0000950bb455':'Krum Independent School District',
    '5f2609807a1c0000950bb47e':'La Joya School District',
    '5f2609807a1c0000950bb467':'Lincolnshire Schools',
    '5f2609807a1c0000950bb45a':'LAUSD',
    '5f2609807a1c0000950bb482':'Massachusetts Institute of Technology',
    '5fb4efce4139b9d4c5a86a69':'Mt. Lebanon School District',
    '5fbcdf0ba84e48a64412a798':'Needham School District',
    '5f7c01fa9387fd71ce6387cc':'NYC - Queens South',
    '5f6994386451a9089d7d4009':'Ogden school district',
    '5f2609807a1c0000950bb472':'Oroville City Elementary School District',
    '5fd704da04a848e368de5dc6':'Oakland Unified School District',
    '5f8fcd33609e08b76029f644':'Paradise Unified School District',
    '5f2609807a1c0000950bb466':'Pinellas County Schools',
    '5f2609807a1c0000950bb471':'Racine Unified Schools',
    '5f6d7cbce6452eb06384db20':'Salt Lake City School District',
    '5f2609807a1c0000950bb478':'San Diego Unified School District',
    '5f2609807a1c0000950bb470':'San Leandro Unified School District',
    '5f2609807a1c0000950bb477':'Sarasota County',
    '5f2609807a1c0000950bb473':'Skillman Foundation',
    '5f2609807a1c0000950bb46a':'Springfield Public Schools',
    '5f2609807a1c0000950bb468':'Utah Board of Education',
    '5f698b826451a9089d7d4008':'Wayne Metro',
    '5f2609807a1c0000950bb45b':'Westfield Public School District',
    '5f2609807a1c0000950bb368':'Wichita Falls Independent School District',
    '5f2609807a1c0000950bb45d':'Youngstown',
    '5f2609807a1c0000950bb464':'Equity Education',
    '5f2609807a1c0000950bb469':'LSF -  Head Start',
    '5f2609807a1c0000950bb46e':'District 25 New York Schools',
    '5f2609807a1c0000950bb46f':'Paradise Schools',
    '5f2609807a1c0000950bb479':'Panorama Education',
    '5f2609807a1c0000950bb47c':'Hawaii Public Schools',
    '5f9aa5e526edbed399d56c92':'Hamilton-Wenham Regional School District',
    '5fe2e1ee4d0ca68d7baf889c':'LSF-Head Start',
    '5fe2e25d4d0ca68d7baf889d':'BGCA',
    '5fe318b14d0ca68d7baf889e':'BLUE',
    '5ffd8176469a86e28635f512':'Chula Vista Elementary School District',
    '6017ab3043ca9c39151838d4':'Oswego School District',
    '60239a84e57dc27613699d57':'Austin Independent School District',
    '6023a6d79e8e623753fc305c':'Boulder Valley School District',
    '6023a7019e8e623753fc305d':'Miami-Dade County Public Schools',
    '6023a7269e8e623753fc305e':'Fulton County School System',
    '6023a7499e8e623753fc305f':'Manatee County School District',
    '6023a76f9e8e623753fc3060':'San Jose Unified School District',
    '6023a7949e8e623753fc3061':'Wasatch County School District',
    '60473f8823e88e242074ebd2':'Champlain Valley School District' }
    username = urllib.parse.quote_plus('admin')
    password = urllib.parse.quote_plus('I#L@teST^m0NGO_2o20!')
    client = MongoClient("mongodb://%s:%s@34.214.24.229:27017/" % (username, password))
    db=client.compass 
    collection = db.user_master
    district=disdic[districtid]
    df = DataFrame(list(collection.aggregate([
    {"$match":
         {'$and': [
             {'ROLE_ID._id' :{'$eq':ObjectId("5f155b8a3b6800007900da2b")}},
                {"IS_DISABLED":{"$ne":"Y"}},
                  {"IS_BLOCKED":{"$ne":"Y"}},
                 {"INCOMPLETE_SIGNUP":{"$ne":"Y"}},
                { 'USER_NAME':{"$not":{"$regex":"test",'$options':'i'}}},
                { 'USER_NAME':{"$not":{"$regex":"1gen",'$options':'i'}}},
    # //               {'IS_ADMIN':'Y'},
#                 {'IS_PORTAL':'Y'},
                      {"schoolId._id":{"$in":db.school_master.distinct( "_id", { "IS_PORTAL": "Y" ,"CATEGORY":{'$regex':district, '$options':'i'}})}},
                 {'EMAIL_ID':{'$ne':''}},
#                    {'DISTRICT_ID._id':{'$eq':ObjectId(""+districtid+"")}},
#                  {'DISTRICT_ID.DISTRICT_NAME':'Broward County Public Schools'},
    # //              {'EMAIL_ID':{'$regex':'broward','$options':'i'}},
                 {'schoolId.NAME':{"$not":{"$regex":"test",'$options':'i'}}},
             {'schoolId.BLOCKED_BY_CAP':{'$exists':False}},
                           {'EMAIL_ID':{"$not":{"$regex":"test",'$options':'i'}}},
                             {'EMAIL_ID':{"$not":{"$regex":"1gen",'$options':'i'}}}]}},
            {'$group':{'_id':'$schoolId._id','ID':{'$addToSet':'$_id'},'NAME':{'$first':'$schoolId.NAME'},'district':{'$first':'$DISTRICT_ID.DISTRICT_NAME'}}},
                  {'$project':{'_id':1,'user_count':{'$size':'$ID'},'name':'$NAME','district':'$district'}},
                   { '$sort' : { 'user_count' : -1}}
    # //               {'$count':'count'}
                  ])))

    # df['SCH_CREATED_DATE']=pd.to_datetime(df['SCH_CREATED_DATE'])

#     df=df.nlargest(20,'user_count')
#     df= df.groupby(df['district'])
#     df= df.get_group(''+district+'')


    if df.empty == True:
        
        schname=[]
        uc=[]
      
    else:
        schname=df['name'].tolist()
        uc=df['user_count'].tolist()
    
    

    data={'schname':schname[0:20],'Familycount':uc[0:20]}
    
    return json.dumps(data)


@app.route('/schoolwisefamilypracticecount/<districtid>')
def schppcfamily(districtid):
    disdic={'5f2609807a1c0000950bb465':'Middleton - Cross Plains Area School District',
    '5f2609807a1c0000950bb475':'Agawam School district',
    '5f2609807a1c0000950bb481':'Alameda Unified School District',
    '5f2609807a1c0000950bb47a':'Alpine School District',
    '5f2609807a1c0000950bb47b':'Ann Arbor Public Schools',
    '5f2609807a1c0000950bb463':'Austin Independent School District',
    '5f59e4836451a9089d7d4007':'Belleville School District',
    '5f2609807a1c0000950bb46d':'Broward County Public Schools',
    '5f2609807a1c0000950bb46c':'Chico Unified School District',
    '5f2609807a1c0000950bb460':'Clarksville-Montgomery County School System',
    '5f2609807a1c0000950bb47f':'Community Consolidated School District 89',
    '5f2609807a1c0000950bb45c':'Comox Valley School District(sd71)',
    '5f2609807a1c0000950bb480':'Dell Texas',
    '5f7413ef9387fd71ce6387cb':'Douglas County School District',
    '5f895191609e08b76029f641':'Early learning Sarasota',
    '5f2609807a1c0000950bb462':'Englewood Cliffs Public Schools',
    '5f2609807a1c0000950bb461':'Englewood Public School District',
    '5f2609807a1c0000950bb45e':'Fairfield-Suisun Unified School District',
    '5f2609807a1c0000950bb47d':'Flint Public Schools',
    '5f2609807a1c0000950bb46b':'FundaciÃ³n La Puerta',
    '5f2609807a1c0000950bb450':'Goleta District',
    '5f2609807a1c0000950bb474':'Greenburgh-North Castle (GNC) Union Free School District',
    '5f2609807a1c0000950bb45f':'Griffin-Spalding County School System',
    '5f2609807a1c0000950bb476':'Hillsborough County',
    '5f2609807a1c0000950bb455':'Krum Independent School District',
    '5f2609807a1c0000950bb47e':'La Joya School District',
    '5f2609807a1c0000950bb467':'Lincolnshire Schools',
    '5f2609807a1c0000950bb45a':'LAUSD',
    '5f2609807a1c0000950bb482':'Massachusetts Institute of Technology',
    '5fb4efce4139b9d4c5a86a69':'Mt. Lebanon School District',
    '5fbcdf0ba84e48a64412a798':'Needham School District',
    '5f7c01fa9387fd71ce6387cc':'NYC - Queens South',
    '5f6994386451a9089d7d4009':'Ogden school district',
    '5f2609807a1c0000950bb472':'Oroville City Elementary School District',
    '5fd704da04a848e368de5dc6':'Oakland Unified School District',
    '5f8fcd33609e08b76029f644':'Paradise Unified School District',
    '5f2609807a1c0000950bb466':'Pinellas County Schools',
    '5f2609807a1c0000950bb471':'Racine Unified Schools',
    '5f6d7cbce6452eb06384db20':'Salt Lake City School District',
    '5f2609807a1c0000950bb478':'San Diego Unified School District',
    '5f2609807a1c0000950bb470':'San Leandro Unified School District',
    '5f2609807a1c0000950bb477':'Sarasota County',
    '5f2609807a1c0000950bb473':'Skillman Foundation',
    '5f2609807a1c0000950bb46a':'Springfield Public Schools',
    '5f2609807a1c0000950bb468':'Utah Board of Education',
    '5f698b826451a9089d7d4008':'Wayne Metro',
    '5f2609807a1c0000950bb45b':'Westfield Public School District',
    '5f2609807a1c0000950bb368':'Wichita Falls Independent School District',
    '5f2609807a1c0000950bb45d':'Youngstown',
    '5f2609807a1c0000950bb464':'Equity Education',
    '5f2609807a1c0000950bb469':'LSF -  Head Start',
    '5f2609807a1c0000950bb46e':'District 25 New York Schools',
    '5f2609807a1c0000950bb46f':'Paradise Schools',
    '5f2609807a1c0000950bb479':'Panorama Education',
    '5f2609807a1c0000950bb47c':'Hawaii Public Schools',
    '5f9aa5e526edbed399d56c92':'Hamilton-Wenham Regional School District',
    '5fe2e1ee4d0ca68d7baf889c':'LSF-Head Start',
    '5fe2e25d4d0ca68d7baf889d':'BGCA',
    '5fe318b14d0ca68d7baf889e':'BLUE',
    '5ffd8176469a86e28635f512':'Chula Vista Elementary School District',
    '6017ab3043ca9c39151838d4':'Oswego School District',
    '60239a84e57dc27613699d57':'Austin Independent School District',
    '6023a6d79e8e623753fc305c':'Boulder Valley School District',
    '6023a7019e8e623753fc305d':'Miami-Dade County Public Schools',
    '6023a7269e8e623753fc305e':'Fulton County School System',
    '6023a7499e8e623753fc305f':'Manatee County School District',
    '6023a76f9e8e623753fc3060':'San Jose Unified School District',
    '6023a7949e8e623753fc3061':'Wasatch County School District',
    '60473f8823e88e242074ebd2':'Champlain Valley School District'}
    username = urllib.parse.quote_plus('admin')
    password = urllib.parse.quote_plus('I#L@teST^m0NGO_2o20!')
    client = MongoClient("mongodb://%s:%s@34.214.24.229:27017/" % (username, password))
    db=client.compass 
    collection = db.audio_track_master
    collection1 = db.user_master
    district=disdic[districtid]
    df1 = DataFrame(list(collection.aggregate([
    {"$match":
         {'$and': [
              {'USER_ID.ROLE_ID._id' :{'$eq':ObjectId("5f155b8a3b6800007900da2b")}},
                {"USER_ID.IS_DISABLED":{"$ne":"Y"}},
                  {"USER_ID.IS_BLOCKED":{"$ne":"Y"}},
                 {"USER_ID.INCOMPLETE_SIGNUP":{"$ne":"Y"}},
                { 'USER_ID.USER_NAME':{"$not":{"$regex":"test",'$options':'i'}}},
                { 'USER_ID.USER_NAME':{"$not":{"$regex":"1gen",'$options':'i'}}},
                {'USER_ID.schoolId._id':{'$ne':None}},
                      {"USER_ID.schoolId._id":{"$in":db.school_master.distinct( "_id", { "IS_PORTAL": "Y" ,"CATEGORY":{'$regex':district, '$options':'i'}})}},
    # //               {'IS_ADMIN':'Y'},
    # //             {'USER_ID.IS_PORTAL':'Y'},
                 {'USER_ID.EMAIL_ID':{'$ne':''}},
#               {'USER_ID.DISTRICT_ID._id':{'$eq':ObjectId(""+districtid+"")}},
#                  {'USER_ID.DISTRICT_ID.DISTRICT_NAME':'Broward County Public Schools'},

    # //              {'EMAIL_ID':{'$regex':'broward','$options':'i'}},
                 {'USER_ID.schoolId.NAME':{"$not":{"$regex":"test",'$options':'i'}}},
             {'USER_ID.schoolId.BLOCKED_BY_CAP':{'$exists':False}},
                           {'USER_ID.EMAIL_ID':{"$not":{"$regex":"test",'$options':'i'}}},
                             {'USER_ID.EMAIL_ID':{"$not":{"$regex":"1gen",'$options':'i'}}}]}},
            {'$group':{'_id':'$USER_ID.schoolId._id','pc':{'$sum':1},'NAME':{'$first':'$USER_ID.schoolId.NAME'},'district':{'$first':'$USER_ID.DISTRICT_ID.DISTRICT_NAME'}}},
                  {'$project':{'_id':1,'practice_count':'$pc'}},
            { '$sort' : { 'practice_count' : -1}}
    # //               {'$count':'count'}
                  ])))
    df2=DataFrame(list(collection1.aggregate([{"$match":
     {'$and': [
           {'ROLE_ID._id' :{'$eq':ObjectId("5f155b8a3b6800007900da2b")}},
            {"IS_DISABLED":{"$ne":"Y"}},
              {"IS_BLOCKED":{"$ne":"Y"}},
             {"INCOMPLETE_SIGNUP":{"$ne":"Y"}},
            { 'USER_NAME':{"$not":{"$regex":"test",'$options':'i'}}},
            { 'USER_NAME':{"$not":{"$regex":"1gen",'$options':'i'}}},
    #                  {'_id':{'$in':user}},
    # //               {'IS_ADMIN':'Y'},

             {'EMAIL_ID':{'$ne':''}},
             {'schoolId.NAME':{"$not":{"$regex":"test",'$options':'i'}}},
         {'schoolId.BLOCKED_BY_CAP':{'$exists':False}},
                       {'EMAIL_ID':{"$not":{"$regex":"test",'$options':'i'}}},
                         {'EMAIL_ID':{"$not":{"$regex":"1gen",'$options':'i'}}}]}},

        {'$group':{'_id':'$schoolId._id','ID':{'$addToSet':'$schoolId._id'},'name':{'$first':'$schoolId.NAME'},'user_name':{'$first':'$USER_NAME'}
                  }},


        {'$project':{'_id':1,'name':1}},])))

    df=pd.merge(df1,df2, how='left', on='_id')
    
    if df.empty == True:
        
        schname=[]
        pc=[]
      
    else:
        schname=df['name'].tolist()
        pc=df['practice_count'].tolist()
    data={'schname':schname[0:20],'Familypracticecount':pc[0:20]}
    
    return json.dumps(data)


@app.route('/schoolwisepracticecounttop20/<districtid>')
def schwisepc(districtid):
    disdic={'5f2609807a1c0000950bb465':'Middleton - Cross Plains Area School District',
    '5f2609807a1c0000950bb475':'Agawam School district',
    '5f2609807a1c0000950bb481':'Alameda Unified School District',
    '5f2609807a1c0000950bb47a':'Alpine School District',
    '5f2609807a1c0000950bb47b':'Ann Arbor Public Schools',
    '5f2609807a1c0000950bb463':'Austin Independent School District',
    '5f59e4836451a9089d7d4007':'Belleville School District',
    '5f2609807a1c0000950bb46d':'Broward County Public Schools',
    '5f2609807a1c0000950bb46c':'Chico Unified School District',
    '5f2609807a1c0000950bb460':'Clarksville-Montgomery County School System',
    '5f2609807a1c0000950bb47f':'Community Consolidated School District 89',
    '5f2609807a1c0000950bb45c':'Comox Valley School District(sd71)',
    '5f2609807a1c0000950bb480':'Dell Texas',
    '5f7413ef9387fd71ce6387cb':'Douglas County School District',
    '5f895191609e08b76029f641':'Early learning Sarasota',
    '5f2609807a1c0000950bb462':'Englewood Cliffs Public Schools',
    '5f2609807a1c0000950bb461':'Englewood Public School District',
    '5f2609807a1c0000950bb45e':'Fairfield-Suisun Unified School District',
    '5f2609807a1c0000950bb47d':'Flint Public Schools',
    '5f2609807a1c0000950bb46b':'FundaciÃ³n La Puerta',
    '5f2609807a1c0000950bb450':'Goleta District',
    '5f2609807a1c0000950bb474':'Greenburgh-North Castle (GNC) Union Free School District',
    '5f2609807a1c0000950bb45f':'Griffin-Spalding County School System',
    '5f2609807a1c0000950bb476':'Hillsborough County',
    '5f2609807a1c0000950bb455':'Krum Independent School District',
    '5f2609807a1c0000950bb47e':'La Joya School District',
    '5f2609807a1c0000950bb467':'Lincolnshire Schools',
    '5f2609807a1c0000950bb45a':'LAUSD',
    '5f2609807a1c0000950bb482':'Massachusetts Institute of Technology',
    '5fb4efce4139b9d4c5a86a69':'Mt. Lebanon School District',
    '5fbcdf0ba84e48a64412a798':'Needham School District',
    '5f7c01fa9387fd71ce6387cc':'NYC - Queens South',
    '5f6994386451a9089d7d4009':'Ogden school district',
    '5f2609807a1c0000950bb472':'Oroville City Elementary School District',
    '5fd704da04a848e368de5dc6':'Oakland Unified School District',
    '5f8fcd33609e08b76029f644':'Paradise Unified School District',
    '5f2609807a1c0000950bb466':'Pinellas County Schools',
    '5f2609807a1c0000950bb471':'Racine Unified Schools',
    '5f6d7cbce6452eb06384db20':'Salt Lake City School District',
    '5f2609807a1c0000950bb478':'San Diego Unified School District',
    '5f2609807a1c0000950bb470':'San Leandro Unified School District',
    '5f2609807a1c0000950bb477':'Sarasota County',
    '5f2609807a1c0000950bb473':'Skillman Foundation',
    '5f2609807a1c0000950bb46a':'Springfield Public Schools',
    '5f2609807a1c0000950bb468':'Utah Board of Education',
    '5f698b826451a9089d7d4008':'Wayne Metro',
    '5f2609807a1c0000950bb45b':'Westfield Public School District',
    '5f2609807a1c0000950bb368':'Wichita Falls Independent School District',
    '5f2609807a1c0000950bb45d':'Youngstown',
    '5f2609807a1c0000950bb464':'Equity Education',
    '5f2609807a1c0000950bb469':'LSF -  Head Start',
    '5f2609807a1c0000950bb46e':'District 25 New York Schools',
    '5f2609807a1c0000950bb46f':'Paradise Schools',
    '5f2609807a1c0000950bb479':'Panorama Education',
    '5f2609807a1c0000950bb47c':'Hawaii Public Schools',
    '5f9aa5e526edbed399d56c92':'Hamilton-Wenham Regional School District',
    '5fe2e1ee4d0ca68d7baf889c':'LSF-Head Start',
    '5fe2e25d4d0ca68d7baf889d':'BGCA',
    '5fe318b14d0ca68d7baf889e':'BLUE',
    '5ffd8176469a86e28635f512':'Chula Vista Elementary School District',
    '6017ab3043ca9c39151838d4':'Oswego School District',
    '60239a84e57dc27613699d57':'Austin Independent School District',
    '6023a6d79e8e623753fc305c':'Boulder Valley School District',
    '6023a7019e8e623753fc305d':'Miami-Dade County Public Schools',
    '6023a7269e8e623753fc305e':'Fulton County School System',
    '6023a7499e8e623753fc305f':'Manatee County School District',
    '6023a76f9e8e623753fc3060':'San Jose Unified School District',
    '6023a7949e8e623753fc3061':'Wasatch County School District',
    '60473f8823e88e242074ebd2':'Champlain Valley School District'}
    username = urllib.parse.quote_plus('admin')
    password = urllib.parse.quote_plus('I#L@teST^m0NGO_2o20!')
    client = MongoClient("mongodb://%s:%s@34.214.24.229:27017/" % (username, password))
    db=client.compass 
    collection = db.audio_track_master
    collection1 = db.user_master
    district=disdic[districtid]
    df1 = DataFrame(list(collection.aggregate([
    {"$match":
         {'$and': [
              {'USER_ID.ROLE_ID._id' :{'$ne':ObjectId("5f155b8a3b6800007900da2b")}},
                {"USER_ID.IS_DISABLED":{"$ne":"Y"}},
                  {"USER_ID.IS_BLOCKED":{"$ne":"Y"}},
                 {"USER_ID.INCOMPLETE_SIGNUP":{"$ne":"Y"}},
                { 'USER_ID.USER_NAME':{"$not":{"$regex":"test",'$options':'i'}}},
                { 'USER_ID.USER_NAME':{"$not":{"$regex":"1gen",'$options':'i'}}},
                {'USER_ID.schoolId._id':{'$ne':None}},
                      {"USER_ID.schoolId._id":{"$in":db.school_master.distinct( "_id", { "IS_PORTAL": "Y" ,"CATEGORY":{'$regex':district, '$options':'i'}})}},
    # //               {'IS_ADMIN':'Y'},
    # //             {'USER_ID.IS_PORTAL':'Y'},
                 {'USER_ID.EMAIL_ID':{'$ne':''}},
#               {'USER_ID.DISTRICT_ID._id':{'$eq':ObjectId(""+districtid+"")}},
#                  {'USER_ID.DISTRICT_ID.DISTRICT_NAME':'Broward County Public Schools'},

    # //              {'EMAIL_ID':{'$regex':'broward','$options':'i'}},
                 {'USER_ID.schoolId.NAME':{"$not":{"$regex":"test",'$options':'i'}}},
             {'USER_ID.schoolId.BLOCKED_BY_CAP':{'$exists':False}},
                           {'USER_ID.EMAIL_ID':{"$not":{"$regex":"test",'$options':'i'}}},
                             {'USER_ID.EMAIL_ID':{"$not":{"$regex":"1gen",'$options':'i'}}}]}},
            {'$group':{'_id':'$USER_ID.schoolId._id','pc':{'$sum':1},'NAME':{'$first':'$USER_ID.schoolId.NAME'},'district':{'$first':'$USER_ID.DISTRICT_ID.DISTRICT_NAME'}}},
                  {'$project':{'_id':1,'practice_count':'$pc'}},
            { '$sort' : { 'practice_count' : -1}}
    # //               {'$count':'count'}
                  ])))
    df2=DataFrame(list(collection1.aggregate([{"$match":
     {'$and': [
           {'ROLE_ID._id' :{'$ne':ObjectId("5f155b8a3b6800007900da2b")}},
            {"IS_DISABLED":{"$ne":"Y"}},
              {"IS_BLOCKED":{"$ne":"Y"}},
             {"INCOMPLETE_SIGNUP":{"$ne":"Y"}},
            { 'USER_NAME':{"$not":{"$regex":"test",'$options':'i'}}},
            { 'USER_NAME':{"$not":{"$regex":"1gen",'$options':'i'}}},
    #                  {'_id':{'$in':user}},
    # //               {'IS_ADMIN':'Y'},

             {'EMAIL_ID':{'$ne':''}},
             {'schoolId.NAME':{"$not":{"$regex":"test",'$options':'i'}}},
         {'schoolId.BLOCKED_BY_CAP':{'$exists':False}},
                       {'EMAIL_ID':{"$not":{"$regex":"test",'$options':'i'}}},
                         {'EMAIL_ID':{"$not":{"$regex":"1gen",'$options':'i'}}}]}},

        {'$group':{'_id':'$schoolId._id','ID':{'$addToSet':'$schoolId._id'},'name':{'$first':'$schoolId.NAME'},'user_name':{'$first':'$USER_NAME'}
                  }},


        {'$project':{'_id':1,'name':1}},])))

    df=pd.merge(df1,df2, how='left', on='_id')
#     print(df)
    if df.empty == True:
        
        schname=[]
        pc=[]
      
    else:
        schname=df['name'].tolist()
        pc=df['practice_count'].tolist()
    data={'schname':schname[0:20],'top20practicecount':pc[0:20]}
    
    return json.dumps(data)




@app.route('/schoolwiseusercounttop20/<districtid>')
def schwiseuc(districtid):
    disdic={'5f2609807a1c0000950bb465':'Middleton - Cross Plains Area School District',
    '5f2609807a1c0000950bb475':'Agawam School district',
    '5f2609807a1c0000950bb481':'Alameda Unified School District',
    '5f2609807a1c0000950bb47a':'Alpine School District',
    '5f2609807a1c0000950bb47b':'Ann Arbor Public Schools',
    '5f2609807a1c0000950bb463':'Austin Independent School District',
    '5f59e4836451a9089d7d4007':'Belleville School District',
    '5f2609807a1c0000950bb46d':'Broward County Public Schools',
    '5f2609807a1c0000950bb46c':'Chico Unified School District',
    '5f2609807a1c0000950bb460':'Clarksville-Montgomery County School System',
    '5f2609807a1c0000950bb47f':'Community Consolidated School District 89',
    '5f2609807a1c0000950bb45c':'Comox Valley School District(sd71)',
    '5f2609807a1c0000950bb480':'Dell Texas',
    '5f7413ef9387fd71ce6387cb':'Douglas County School District',
    '5f895191609e08b76029f641':'Early learning Sarasota',
    '5f2609807a1c0000950bb462':'Englewood Cliffs Public Schools',
    '5f2609807a1c0000950bb461':'Englewood Public School District',
    '5f2609807a1c0000950bb45e':'Fairfield-Suisun Unified School District',
    '5f2609807a1c0000950bb47d':'Flint Public Schools',
    '5f2609807a1c0000950bb46b':'FundaciÃ³n La Puerta',
    '5f2609807a1c0000950bb450':'Goleta District',
    '5f2609807a1c0000950bb474':'Greenburgh-North Castle (GNC) Union Free School District',
    '5f2609807a1c0000950bb45f':'Griffin-Spalding County School System',
    '5f2609807a1c0000950bb476':'Hillsborough County',
    '5f2609807a1c0000950bb455':'Krum Independent School District',
    '5f2609807a1c0000950bb47e':'La Joya School District',
    '5f2609807a1c0000950bb467':'Lincolnshire Schools',
    '5f2609807a1c0000950bb45a':'LAUSD',
    '5f2609807a1c0000950bb482':'Massachusetts Institute of Technology',
    '5fb4efce4139b9d4c5a86a69':'Mt. Lebanon School District',
    '5fbcdf0ba84e48a64412a798':'Needham School District',
    '5f7c01fa9387fd71ce6387cc':'NYC - Queens South',
    '5f6994386451a9089d7d4009':'Ogden school district',
    '5f2609807a1c0000950bb472':'Oroville City Elementary School District',
    '5fd704da04a848e368de5dc6':'Oakland Unified School District',
    '5f8fcd33609e08b76029f644':'Paradise Unified School District',
    '5f2609807a1c0000950bb466':'Pinellas County Schools',
    '5f2609807a1c0000950bb471':'Racine Unified Schools',
    '5f6d7cbce6452eb06384db20':'Salt Lake City School District',
    '5f2609807a1c0000950bb478':'San Diego Unified School District',
    '5f2609807a1c0000950bb470':'San Leandro Unified School District',
    '5f2609807a1c0000950bb477':'Sarasota County',
    '5f2609807a1c0000950bb473':'Skillman Foundation',
    '5f2609807a1c0000950bb46a':'Springfield Public Schools',
    '5f2609807a1c0000950bb468':'Utah Board of Education',
    '5f698b826451a9089d7d4008':'Wayne Metro',
    '5f2609807a1c0000950bb45b':'Westfield Public School District',
    '5f2609807a1c0000950bb368':'Wichita Falls Independent School District',
    '5f2609807a1c0000950bb45d':'Youngstown',
    '5f2609807a1c0000950bb464':'Equity Education',
    '5f2609807a1c0000950bb469':'LSF -  Head Start',
    '5f2609807a1c0000950bb46e':'District 25 New York Schools',
    '5f2609807a1c0000950bb46f':'Paradise Schools',
    '5f2609807a1c0000950bb479':'Panorama Education',
    '5f2609807a1c0000950bb47c':'Hawaii Public Schools',
    '5f9aa5e526edbed399d56c92':'Hamilton-Wenham Regional School District',
    '5fe2e1ee4d0ca68d7baf889c':'LSF-Head Start',
    '5fe2e25d4d0ca68d7baf889d':'BGCA',
    '5fe318b14d0ca68d7baf889e':'BLUE',
    '5ffd8176469a86e28635f512':'Chula Vista Elementary School District',
    '6017ab3043ca9c39151838d4':'Oswego School District',
    '60239a84e57dc27613699d57':'Austin Independent School District',
    '6023a6d79e8e623753fc305c':'Boulder Valley School District',
    '6023a7019e8e623753fc305d':'Miami-Dade County Public Schools',
    '6023a7269e8e623753fc305e':'Fulton County School System',
    '6023a7499e8e623753fc305f':'Manatee County School District',
    '6023a76f9e8e623753fc3060':'San Jose Unified School District',
    '6023a7949e8e623753fc3061':'Wasatch County School District',
    '60473f8823e88e242074ebd2':'Champlain Valley School District'}
    username = urllib.parse.quote_plus('admin')
    password = urllib.parse.quote_plus('I#L@teST^m0NGO_2o20!')
    client = MongoClient("mongodb://%s:%s@34.214.24.229:27017/" % (username, password))
    db=client.compass 
    collection = db.user_master
    district=disdic[districtid]
    df = DataFrame(list(collection.aggregate([
    {"$match":
         {'$and': [
             {'ROLE_ID._id' :{'$ne':ObjectId("5f155b8a3b6800007900da2b")}},
                {"IS_DISABLED":{"$ne":"Y"}},
                  {"IS_BLOCKED":{"$ne":"Y"}},
                 {"INCOMPLETE_SIGNUP":{"$ne":"Y"}},
                { 'USER_NAME':{"$not":{"$regex":"test",'$options':'i'}}},
                { 'USER_NAME':{"$not":{"$regex":"1gen",'$options':'i'}}},
    # //               {'IS_ADMIN':'Y'},
#                 {'IS_PORTAL':'Y'},
                 {'EMAIL_ID':{'$ne':''}},
                      {"schoolId._id":{"$in":db.school_master.distinct( "_id", { "IS_PORTAL": "Y" ,"CATEGORY":{'$regex':district, '$options':'i'}})}},
#                    {'DISTRICT_ID._id':{'$eq':ObjectId(""+districtid+"")}},
#                  {'DISTRICT_ID.DISTRICT_NAME':'Broward County Public Schools'},
    # //              {'EMAIL_ID':{'$regex':'broward','$options':'i'}},
                 {'schoolId.NAME':{"$not":{"$regex":"test",'$options':'i'}}},
             {'schoolId.BLOCKED_BY_CAP':{'$exists':False}},
                           {'EMAIL_ID':{"$not":{"$regex":"test",'$options':'i'}}},
                             {'EMAIL_ID':{"$not":{"$regex":"1gen",'$options':'i'}}}]}},
            {'$group':{'_id':'$schoolId._id','ID':{'$addToSet':'$_id'},'NAME':{'$first':'$schoolId.NAME'},'district':{'$first':'$DISTRICT_ID.DISTRICT_NAME'}}},
                  {'$project':{'_id':1,'user_count':{'$size':'$ID'},'name':'$NAME','district':'$district'}},
                   { '$sort' : { 'user_count' : -1}}
    # //               {'$count':'count'}
                  ])))

    # df['SCH_CREATED_DATE']=pd.to_datetime(df['SCH_CREATED_DATE'])

#     df=df.nlargest(20,'user_count')
#     df= df.groupby(df['district'])
#     df= df.get_group(''+district+'')

    if df.empty == True:
        
        schname=[]
        pc=[]
      
    else:
        schname=df['name'].tolist()
        uc=df['user_count'].tolist()
   
    data={'schname':schname[0:20],'usercount':uc[0:20]}
    
    return json.dumps(data)


@app.route('/monthwisepracticedistrict/<districtid>')
def monthwisepc(districtid):
    disdic={'5f2609807a1c0000950bb465':'Middleton - Cross Plains Area School District',
    '5f2609807a1c0000950bb475':'Agawam School district',
    '5f2609807a1c0000950bb481':'Alameda Unified School District',
    '5f2609807a1c0000950bb47a':'Alpine School District',
    '5f2609807a1c0000950bb47b':'Ann Arbor Public Schools',
    '5f2609807a1c0000950bb463':'Austin Independent School District',
    '5f59e4836451a9089d7d4007':'Belleville School District',
    '5f2609807a1c0000950bb46d':'Broward County Public Schools',
    '5f2609807a1c0000950bb46c':'Chico Unified School District',
    '5f2609807a1c0000950bb460':'Clarksville-Montgomery County School System',
    '5f2609807a1c0000950bb47f':'Community Consolidated School District 89',
    '5f2609807a1c0000950bb45c':'Comox Valley School District(sd71)',
    '5f2609807a1c0000950bb480':'Dell Texas',
    '5f7413ef9387fd71ce6387cb':'Douglas County School District',
    '5f895191609e08b76029f641':'Early learning Sarasota',
    '5f2609807a1c0000950bb462':'Englewood Cliffs Public Schools',
    '5f2609807a1c0000950bb461':'Englewood Public School District',
    '5f2609807a1c0000950bb45e':'Fairfield-Suisun Unified School District',
    '5f2609807a1c0000950bb47d':'Flint Public Schools',
    '5f2609807a1c0000950bb46b':'FundaciÃ³n La Puerta',
    '5f2609807a1c0000950bb450':'Goleta District',
    '5f2609807a1c0000950bb474':'Greenburgh-North Castle (GNC) Union Free School District',
    '5f2609807a1c0000950bb45f':'Griffin-Spalding County School System',
    '5f2609807a1c0000950bb476':'Hillsborough County',
    '5f2609807a1c0000950bb455':'Krum Independent School District',
    '5f2609807a1c0000950bb47e':'La Joya School District',
    '5f2609807a1c0000950bb467':'Lincolnshire Schools',
    '5f2609807a1c0000950bb45a':'LAUSD',
    '5f2609807a1c0000950bb482':'Massachusetts Institute of Technology',
    '5fb4efce4139b9d4c5a86a69':'Mt. Lebanon School District',
    '5fbcdf0ba84e48a64412a798':'Needham School District',
    '5f7c01fa9387fd71ce6387cc':'NYC - Queens South',
    '5f6994386451a9089d7d4009':'Ogden school district',
    '5f2609807a1c0000950bb472':'Oroville City Elementary School District',
    '5fd704da04a848e368de5dc6':'Oakland Unified School District',
    '5f8fcd33609e08b76029f644':'Paradise Unified School District',
    '5f2609807a1c0000950bb466':'Pinellas County Schools',
    '5f2609807a1c0000950bb471':'Racine Unified Schools',
    '5f6d7cbce6452eb06384db20':'Salt Lake City School District',
    '5f2609807a1c0000950bb478':'San Diego Unified School District',
    '5f2609807a1c0000950bb470':'San Leandro Unified School District',
    '5f2609807a1c0000950bb477':'Sarasota County',
    '5f2609807a1c0000950bb473':'Skillman Foundation',
    '5f2609807a1c0000950bb46a':'Springfield Public Schools',
    '5f2609807a1c0000950bb468':'Utah Board of Education',
    '5f698b826451a9089d7d4008':'Wayne Metro',
    '5f2609807a1c0000950bb45b':'Westfield Public School District',
    '5f2609807a1c0000950bb368':'Wichita Falls Independent School District',
    '5f2609807a1c0000950bb45d':'Youngstown',
    '5f2609807a1c0000950bb464':'Equity Education',
    '5f2609807a1c0000950bb469':'LSF -  Head Start',
    '5f2609807a1c0000950bb46e':'District 25 New York Schools',
    '5f2609807a1c0000950bb46f':'Paradise Schools',
    '5f2609807a1c0000950bb479':'Panorama Education',
    '5f2609807a1c0000950bb47c':'Hawaii Public Schools',
    '5f9aa5e526edbed399d56c92':'Hamilton-Wenham Regional School District',
    '5fe2e1ee4d0ca68d7baf889c':'LSF-Head Start',
    '5fe2e25d4d0ca68d7baf889d':'BGCA',
    '5fe318b14d0ca68d7baf889e':'BLUE',
    '5ffd8176469a86e28635f512':'Chula Vista Elementary School District',
    '6017ab3043ca9c39151838d4':'Oswego School District',
    '60239a84e57dc27613699d57':'Austin Independent School District',
    '6023a6d79e8e623753fc305c':'Boulder Valley School District',
    '6023a7019e8e623753fc305d':'Miami-Dade County Public Schools',
    '6023a7269e8e623753fc305e':'Fulton County School System',
    '6023a7499e8e623753fc305f':'Manatee County School District',
    '6023a76f9e8e623753fc3060':'San Jose Unified School District',
    '6023a7949e8e623753fc3061':'Wasatch County School District',
    '60473f8823e88e242074ebd2':'Champlain Valley School District'}
    username = urllib.parse.quote_plus('admin')
    password = urllib.parse.quote_plus('I#L@teST^m0NGO_2o20!')
    client = MongoClient("mongodb://%s:%s@34.214.24.229:27017/" % (username, password))
    db=client.compass 
    collection = db.audio_track_master
    district=disdic[districtid]
    df = DataFrame(list(collection.aggregate([
    {"$match":
    {'$and': [
    #           {'USER_ID.ROLE_ID._id' :{'$eq':ObjectId("5f155b8a3b6800007900da2b")}},
        {"USER_ID.IS_DISABLED":{"$ne":"Y"}},
          {"USER_ID.IS_BLOCKED":{"$ne":"Y"}},
         {"USER_ID.INCOMPLETE_SIGNUP":{"$ne":"Y"}},
        { 'USER_ID.USER_NAME':{"$not":{"$regex":"test",'$options':'i'}}},
        { 'USER_ID.USER_NAME':{"$not":{"$regex":"1gen",'$options':'i'}}},
        {'USER_ID.schoolId._id':{'$ne':None}},
    # //               {'IS_ADMIN':'Y'},
    # //             {'USER_ID.IS_PORTAL':'Y'},
         {'USER_ID.EMAIL_ID':{'$ne':''}},
                 {"USER_ID.schoolId._id":{"$in":db.school_master.distinct( "_id", { "IS_PORTAL": "Y" ,"CATEGORY":{'$regex':district, '$options':'i'}})}},
#                {'USER_ID.DISTRICT_ID._id':{'$eq':ObjectId(""+districtid+"")}},
#              {'USER_ID.DISTRICT_ID.DISTRICT_NAME':'Broward County Public Schools'},
         {'MODIFIED_DATE':{'$gte':datetime.datetime(2020,8,1)}},
    # //              {'EMAIL_ID':{'$regex':'broward','$options':'i'}},
         {'USER_ID.schoolId.NAME':{"$not":{"$regex":"test",'$options':'i'}}},
     {'USER_ID.schoolId.BLOCKED_BY_CAP':{'$exists':False}},
                   {'USER_ID.EMAIL_ID':{"$not":{"$regex":"test",'$options':'i'}}},
                     {'USER_ID.EMAIL_ID':{"$not":{"$regex":"1gen",'$options':'i'}}}]}},
    {'$group':{'_id':{'$month':'$MODIFIED_DATE'},'pc':{'$sum':1},'district':{'$first':'$USER_ID.DISTRICT_ID.DISTRICT_NAME'}}},
          {'$project':{'_id':1,'practice_count':'$pc'}},
    { '$sort' : { '_id' : 1} }
              ])))


    df.rename(columns = { '_id': 'Month'}, inplace = True)

    data = [['Aug', 8], ['Sep', 9], ['Oct', 10],['Nov', 11], ['Dec', 12], ['Jan', 1],['Feb', 2], ['Mar', 3], ['Apr', 4],['May', 5], ['Jun', 6], ['Jul', 7]] 


# Create the pandas DataFrame 
    df1 = pd.DataFrame(data, columns = ['Monthname', 'Month']) 

    DF=pd.merge(df1,df, on='Month',how='left')
    DF=DF.fillna(0)

#         d = dict(enumerate(calendar.month_abbr))    # to convert monthnumber of dataframe into monthname

#         try:
#             df['Month'] = df['Month'].map(d)
#         except:
#             pass

#         if df.empty == True:
#             Month=['Aug','Sep','Oct','Nov','Dec','Jan','Feb','Mar','Apr','May','Jun','Jul',]

#             pc=[0,0,0,0,0,0,0,0,0,0,0,0]
#         else:
    Month=DF['Monthname'].tolist()

    pc=DF['practice_count'].tolist()


    data={'monthname':Month,'practice_count':pc}
    return json.dumps(data)

@app.route('/90daysuserpractising/<districtid>')
def user_practice_90days(districtid):
    disdic={'5f2609807a1c0000950bb465':'Middleton - Cross Plains Area School District',
    '5f2609807a1c0000950bb475':'Agawam School district',
    '5f2609807a1c0000950bb481':'Alameda Unified School District',
    '5f2609807a1c0000950bb47a':'Alpine School District',
    '5f2609807a1c0000950bb47b':'Ann Arbor Public Schools',
    '5f2609807a1c0000950bb463':'Austin Independent School District',
    '5f59e4836451a9089d7d4007':'Belleville School District',
    '5f2609807a1c0000950bb46d':'Broward County Public Schools',
    '5f2609807a1c0000950bb46c':'Chico Unified School District',
    '5f2609807a1c0000950bb460':'Clarksville-Montgomery County School System',
    '5f2609807a1c0000950bb47f':'Community Consolidated School District 89',
    '5f2609807a1c0000950bb45c':'Comox Valley School District(sd71)',
    '5f2609807a1c0000950bb480':'Dell Texas',
    '5f7413ef9387fd71ce6387cb':'Douglas County School District',
    '5f895191609e08b76029f641':'Early learning Sarasota',
    '5f2609807a1c0000950bb462':'Englewood Cliffs Public Schools',
    '5f2609807a1c0000950bb461':'Englewood Public School District',
    '5f2609807a1c0000950bb45e':'Fairfield-Suisun Unified School District',
    '5f2609807a1c0000950bb47d':'Flint Public Schools',
    '5f2609807a1c0000950bb46b':'FundaciÃ³n La Puerta',
    '5f2609807a1c0000950bb450':'Goleta District',
    '5f2609807a1c0000950bb474':'Greenburgh-North Castle (GNC) Union Free School District',
    '5f2609807a1c0000950bb45f':'Griffin-Spalding County School System',
    '5f2609807a1c0000950bb476':'Hillsborough County',
    '5f2609807a1c0000950bb455':'Krum Independent School District',
    '5f2609807a1c0000950bb47e':'La Joya School District',
    '5f2609807a1c0000950bb467':'Lincolnshire Schools',
    '5f2609807a1c0000950bb45a':'LAUSD',
    '5f2609807a1c0000950bb482':'Massachusetts Institute of Technology',
    '5fb4efce4139b9d4c5a86a69':'Mt. Lebanon School District',
    '5fbcdf0ba84e48a64412a798':'Needham School District',
    '5f7c01fa9387fd71ce6387cc':'NYC - Queens South',
    '5f6994386451a9089d7d4009':'Ogden school district',
    '5f2609807a1c0000950bb472':'Oroville City Elementary School District',
    '5fd704da04a848e368de5dc6':'Oakland Unified School District',
    '5f8fcd33609e08b76029f644':'Paradise Unified School District',
    '5f2609807a1c0000950bb466':'Pinellas County Schools',
    '5f2609807a1c0000950bb471':'Racine Unified Schools',
    '5f6d7cbce6452eb06384db20':'Salt Lake City School District',
    '5f2609807a1c0000950bb478':'San Diego Unified School District',
    '5f2609807a1c0000950bb470':'San Leandro Unified School District',
    '5f2609807a1c0000950bb477':'Sarasota County',
    '5f2609807a1c0000950bb473':'Skillman Foundation',
    '5f2609807a1c0000950bb46a':'Springfield Public Schools',
    '5f2609807a1c0000950bb468':'Utah Board of Education',
    '5f698b826451a9089d7d4008':'Wayne Metro',
    '5f2609807a1c0000950bb45b':'Westfield Public School District',
    '5f2609807a1c0000950bb368':'Wichita Falls Independent School District',
    '5f2609807a1c0000950bb45d':'Youngstown',
    '5f2609807a1c0000950bb464':'Equity Education',
    '5f2609807a1c0000950bb469':'LSF -  Head Start',
    '5f2609807a1c0000950bb46e':'District 25 New York Schools',
    '5f2609807a1c0000950bb46f':'Paradise Schools',
    '5f2609807a1c0000950bb479':'Panorama Education',
    '5f2609807a1c0000950bb47c':'Hawaii Public Schools',
    '5f9aa5e526edbed399d56c92':'Hamilton-Wenham Regional School District',
    '5fe2e1ee4d0ca68d7baf889c':'LSF-Head Start',
    '5fe2e25d4d0ca68d7baf889d':'BGCA',
    '5fe318b14d0ca68d7baf889e':'BLUE',
    '5ffd8176469a86e28635f512':'Chula Vista Elementary School District',
    '6017ab3043ca9c39151838d4':'Oswego School District',
    '60239a84e57dc27613699d57':'Austin Independent School District',
    '6023a6d79e8e623753fc305c':'Boulder Valley School District',
    '6023a7019e8e623753fc305d':'Miami-Dade County Public Schools',
    '6023a7269e8e623753fc305e':'Fulton County School System',
    '6023a7499e8e623753fc305f':'Manatee County School District',
    '6023a76f9e8e623753fc3060':'San Jose Unified School District',
    '6023a7949e8e623753fc3061':'Wasatch County School District',
    '60473f8823e88e242074ebd2':'Champlain Valley School District'}
    from datetime import datetime
    from datetime import timedelta
    
    today1= datetime.utcnow()
    tod1= today1+ timedelta(hours=4)
    start1= tod1-timedelta(days=90)
    
    username = urllib.parse.quote_plus('admin')
    password = urllib.parse.quote_plus('I#L@teST^m0NGO_2o20!')
    client = MongoClient("mongodb://%s:%s@34.214.24.229:27017/" % (username, password))
    db=client.compass 
    collection = db.audio_track_master
    district=disdic[districtid]
    df = DataFrame(list(collection.aggregate([
    {"$match":
     {'$and': [
#           {'USER_ID.ROLE_ID._id' :{'$eq':ObjectId("5f155b8a3b6800007900da2b")}},
            {"USER_ID.IS_DISABLED":{"$ne":"Y"}},
              {"USER_ID.IS_BLOCKED":{"$ne":"Y"}},
             {"USER_ID.INCOMPLETE_SIGNUP":{"$ne":"Y"}},
            { 'USER_ID.USER_NAME':{"$not":{"$regex":"test",'$options':'i'}}},
            { 'USER_ID.USER_NAME':{"$not":{"$regex":"1gen",'$options':'i'}}},
            {'USER_ID.schoolId._id':{'$ne':None}},
# //               {'IS_ADMIN':'Y'},
# //             {'USER_ID.IS_PORTAL':'Y'},
             {'USER_ID.EMAIL_ID':{'$ne':''}},
                  {"USER_ID.schoolId._id":{"$in":db.school_master.distinct( "_id", { "IS_PORTAL": "Y" ,"CATEGORY":{'$regex':district, '$options':'i'}})}},
#              {'USER_ID.DISTRICT_ID._id':{'$eq':ObjectId(""+districtid+"")}},
#              {'USER_ID.DISTRICT_ID.DISTRICT_NAME':'Broward County Public Schools'},
             {'MODIFIED_DATE':{'$gte':start1}},
# //              {'EMAIL_ID':{'$regex':'broward','$options':'i'}},
             {'USER_ID.schoolId.NAME':{"$not":{"$regex":"test",'$options':'i'}}},
         {'USER_ID.schoolId.BLOCKED_BY_CAP':{'$exists':False}},
                       {'USER_ID.EMAIL_ID':{"$not":{"$regex":"test",'$options':'i'}}},
                         {'USER_ID.EMAIL_ID':{"$not":{"$regex":"1gen",'$options':'i'}}}]}},
        {'$group':{'_id':{"$dateToString": { "format": "%Y-%m-%d", "date": "$MODIFIED_DATE"}},'pc':{'$sum':1},'district':{'$first':'$USER_ID.DISTRICT_ID.DISTRICT_NAME'}}},
              {'$project':{'_id':1,'user_count':'$pc','district':'$district'}},
    { '$sort' : { '_id' : 1} }
    

# //               {'$count':'count'}
              ])))
    # df['SCH_CREATED_DATE']=pd.to_datetime(df['SCH_CREATED_DATE'])
    df.rename(columns = { '_id': 'date'}, inplace = True)
    
    if df.empty == True:
        
        date=[]
        uc=[]
      
    else:
        date=df['date'].tolist()
        uc=df['user_count'].tolist()
#     df=df.nlargest(20,'user_count')
#     df= df.groupby(df['district'])
#     df= df.get_group(''+district+'')

    
#     data=[]    
#     for i,k in zip(schname,uc):

#         data.append([i,k])
    
#     for i in range(len(schname)):
#             schname[i] = schname[i]
    data={'date':date,'daysuserpractising':uc}
    
    return json.dumps(data)



@app.route('/90daysuserloggedindetail/<districtid>')
def user_logins_90days(districtid):
    disdic={'5f2609807a1c0000950bb465':'Middleton - Cross Plains Area School District',
    '5f2609807a1c0000950bb475':'Agawam School district',
    '5f2609807a1c0000950bb481':'Alameda Unified School District',
    '5f2609807a1c0000950bb47a':'Alpine School District',
    '5f2609807a1c0000950bb47b':'Ann Arbor Public Schools',
    '5f2609807a1c0000950bb463':'Austin Independent School District',
    '5f59e4836451a9089d7d4007':'Belleville School District',
    '5f2609807a1c0000950bb46d':'Broward County Public Schools',
    '5f2609807a1c0000950bb46c':'Chico Unified School District',
    '5f2609807a1c0000950bb460':'Clarksville-Montgomery County School System',
    '5f2609807a1c0000950bb47f':'Community Consolidated School District 89',
    '5f2609807a1c0000950bb45c':'Comox Valley School District(sd71)',
    '5f2609807a1c0000950bb480':'Dell Texas',
    '5f7413ef9387fd71ce6387cb':'Douglas County School District',
    '5f895191609e08b76029f641':'Early learning Sarasota',
    '5f2609807a1c0000950bb462':'Englewood Cliffs Public Schools',
    '5f2609807a1c0000950bb461':'Englewood Public School District',
    '5f2609807a1c0000950bb45e':'Fairfield-Suisun Unified School District',
    '5f2609807a1c0000950bb47d':'Flint Public Schools',
    '5f2609807a1c0000950bb46b':'FundaciÃ³n La Puerta',
    '5f2609807a1c0000950bb450':'Goleta District',
    '5f2609807a1c0000950bb474':'Greenburgh-North Castle (GNC) Union Free School District',
    '5f2609807a1c0000950bb45f':'Griffin-Spalding County School System',
    '5f2609807a1c0000950bb476':'Hillsborough County',
    '5f2609807a1c0000950bb455':'Krum Independent School District',
    '5f2609807a1c0000950bb47e':'La Joya School District',
    '5f2609807a1c0000950bb467':'Lincolnshire Schools',
    '5f2609807a1c0000950bb45a':'LAUSD',
    '5f2609807a1c0000950bb482':'Massachusetts Institute of Technology',
    '5fb4efce4139b9d4c5a86a69':'Mt. Lebanon School District',
    '5fbcdf0ba84e48a64412a798':'Needham School District',
    '5f7c01fa9387fd71ce6387cc':'NYC - Queens South',
    '5f6994386451a9089d7d4009':'Ogden school district',
    '5f2609807a1c0000950bb472':'Oroville City Elementary School District',
    '5fd704da04a848e368de5dc6':'Oakland Unified School District',
    '5f8fcd33609e08b76029f644':'Paradise Unified School District',
    '5f2609807a1c0000950bb466':'Pinellas County Schools',
    '5f2609807a1c0000950bb471':'Racine Unified Schools',
    '5f6d7cbce6452eb06384db20':'Salt Lake City School District',
    '5f2609807a1c0000950bb478':'San Diego Unified School District',
    '5f2609807a1c0000950bb470':'San Leandro Unified School District',
    '5f2609807a1c0000950bb477':'Sarasota County',
    '5f2609807a1c0000950bb473':'Skillman Foundation',
    '5f2609807a1c0000950bb46a':'Springfield Public Schools',
    '5f2609807a1c0000950bb468':'Utah Board of Education',
    '5f698b826451a9089d7d4008':'Wayne Metro',
    '5f2609807a1c0000950bb45b':'Westfield Public School District',
    '5f2609807a1c0000950bb368':'Wichita Falls Independent School District',
    '5f2609807a1c0000950bb45d':'Youngstown',
    '5f2609807a1c0000950bb464':'Equity Education',
    '5f2609807a1c0000950bb469':'LSF -  Head Start',
    '5f2609807a1c0000950bb46e':'District 25 New York Schools',
    '5f2609807a1c0000950bb46f':'Paradise Schools',
    '5f2609807a1c0000950bb479':'Panorama Education',
    '5f2609807a1c0000950bb47c':'Hawaii Public Schools',
    '5f9aa5e526edbed399d56c92':'Hamilton-Wenham Regional School District',
    '5fe2e1ee4d0ca68d7baf889c':'LSF-Head Start',
    '5fe2e25d4d0ca68d7baf889d':'BGCA',
    '5fe318b14d0ca68d7baf889e':'BLUE',
    '5ffd8176469a86e28635f512':'Chula Vista Elementary School District',
    '6017ab3043ca9c39151838d4':'Oswego School District',
    '60239a84e57dc27613699d57':'Austin Independent School District',
    '6023a6d79e8e623753fc305c':'Boulder Valley School District',
    '6023a7019e8e623753fc305d':'Miami-Dade County Public Schools',
    '6023a7269e8e623753fc305e':'Fulton County School System',
    '6023a7499e8e623753fc305f':'Manatee County School District',
    '6023a76f9e8e623753fc3060':'San Jose Unified School District',
    '6023a7949e8e623753fc3061':'Wasatch County School District',
    '60473f8823e88e242074ebd2':'Champlain Valley School District'}
    from datetime import datetime
    from datetime import timedelta
    today1= datetime.utcnow()
    tod1= today1+ timedelta(hours=4)
    start1= tod1-timedelta(days=90)
    
    username = urllib.parse.quote_plus('admin')
    password = urllib.parse.quote_plus('I#L@teST^m0NGO_2o20!')
    client = MongoClient("mongodb://%s:%s@34.214.24.229:27017/" % (username, password))
    db=client.compass 
    collection = db.login_logs
    district=disdic[districtid]
    df = DataFrame(list(collection.aggregate([
    {"$match":
     {'$and': [
#           {'USER_ID.ROLE_ID._id' :{'$eq':ObjectId("5f155b8a3b6800007900da2b")}},
            {"USER_ID.IS_DISABLED":{"$ne":"Y"}},
              {"USER_ID.IS_BLOCKED":{"$ne":"Y"}},
             {"USER_ID.INCOMPLETE_SIGNUP":{"$ne":"Y"}},
            { 'USER_ID.USER_NAME':{"$not":{"$regex":"test",'$options':'i'}}},
            { 'USER_ID.USER_NAME':{"$not":{"$regex":"1gen",'$options':'i'}}},
            {'USER_ID.schoolId._id':{'$ne':None}},
# //               {'IS_ADMIN':'Y'},
# //             {'USER_ID.IS_PORTAL':'Y'},
             {'USER_ID.EMAIL_ID':{'$ne':''}},
                  {"USER_ID.schoolId._id":{"$in":db.school_master.distinct( "_id", { "IS_PORTAL": "Y" ,"CATEGORY":{'$regex':district, '$options':'i'}})}},
#              {'USER_ID.DISTRICT_ID._id':{'$eq':ObjectId(""+districtid+"")}},
#              {'USER_ID.DISTRICT_ID.DISTRICT_NAME':'Broward County Public Schools'},
             {'LAST_LOGGED_IN':{'$gte':start1}},
# //              {'EMAIL_ID':{'$regex':'broward','$options':'i'}},
             {'USER_ID.schoolId.NAME':{"$not":{"$regex":"test",'$options':'i'}}},
         {'USER_ID.schoolId.BLOCKED_BY_CAP':{'$exists':False}},
                       {'USER_ID.EMAIL_ID':{"$not":{"$regex":"test",'$options':'i'}}},
                         {'USER_ID.EMAIL_ID':{"$not":{"$regex":"1gen",'$options':'i'}}}]}},
        {'$group':{'_id':{"$dateToString": { "format": "%Y-%m-%d", "date": "$LAST_LOGGED_IN"}},'pc':{'$addToSet':'$USER_ID._id'},'NAME':{'$first':'$USER_ID.schoolId.NAME'},'un':{'$first':'$USER_ID.USER_NAME'}}},
              {'$project':{'_id':1,'user_count':{'$size':'$pc'}}},
    { '$sort' : { '_id' : 1} }
    

# //               {'$count':'count'}
              ])))
    # df['SCH_CREATED_DATE']=pd.to_datetime(df['SCH_CREATED_DATE'])
    df.rename(columns = { '_id': 'date'}, inplace = True)
#     df=df.nlargest(20,'user_count')
#     df= df.groupby(df['district'])
#     df= df.get_group(''+district+'')



    if df.empty == True:
        
        date=[]
        uc=[]
      
    else:
        date=df['date'].tolist()
        uc=df['user_count'].tolist()
    
  
    
#     data=[]    
#     for i,k in zip(schname,uc):

#         data.append([i,k])
    
#     for i in range(len(schname)):
#             schname[i] = schname[i]
    data={'date':date,'daysuserlogins':uc}
    
    return json.dumps(data)


@app.route('/top20userspractisinginfo/<districtid>')
def topusers_practice(districtid):
    disdic={'5f2609807a1c0000950bb465':'Middleton - Cross Plains Area School District',
    '5f2609807a1c0000950bb475':'Agawam School district',
    "602e60e567d3e6c0a4eb4d99":"School District of Palm Beach County",
    '5f2609807a1c0000950bb481':'Alameda Unified School District',
    '5f2609807a1c0000950bb47a':'Alpine School District',
    '5f2609807a1c0000950bb47b':'Ann Arbor Public Schools',
    '5f2609807a1c0000950bb463':'Austin Independent School District',
    '5f59e4836451a9089d7d4007':'Belleville School District',
    '5f2609807a1c0000950bb46d':'Broward County Public Schools',
    '5f2609807a1c0000950bb46c':'Chico Unified School District',
    '5f2609807a1c0000950bb460':'Clarksville-Montgomery County School System',
    '5f2609807a1c0000950bb47f':'Community Consolidated School District 89',
    '5f2609807a1c0000950bb45c':'Comox Valley School District(sd71)',
    '5f2609807a1c0000950bb480':'Dell Texas',
    '5f7413ef9387fd71ce6387cb':'Douglas County School District',
    '5f895191609e08b76029f641':'Early learning Sarasota',
    '5f2609807a1c0000950bb462':'Englewood Cliffs Public Schools',
    '5f2609807a1c0000950bb461':'Englewood Public School District',
    '5f2609807a1c0000950bb45e':'Fairfield-Suisun Unified School District',
    '5f2609807a1c0000950bb47d':'Flint Public Schools',
    '5f2609807a1c0000950bb46b':'FundaciÃ³n La Puerta',
    '5f2609807a1c0000950bb450':'Goleta District',
    '5f2609807a1c0000950bb474':'Greenburgh-North Castle (GNC) Union Free School District',
    '5f2609807a1c0000950bb45f':'Griffin-Spalding County School System',
    '5f2609807a1c0000950bb476':'Hillsborough County',
    '5f2609807a1c0000950bb455':'Krum Independent School District',
    '5f2609807a1c0000950bb47e':'La Joya School District',
    '5f2609807a1c0000950bb467':'Lincolnshire Schools',
    '5f2609807a1c0000950bb45a':'LAUSD',
    '5f2609807a1c0000950bb482':'Massachusetts Institute of Technology',
    '5fb4efce4139b9d4c5a86a69':'Mt. Lebanon School District',
    '5fbcdf0ba84e48a64412a798':'Needham School District',
    '5f7c01fa9387fd71ce6387cc':'NYC - Queens South',
    '5f6994386451a9089d7d4009':'Ogden school district',
    '5f2609807a1c0000950bb472':'Oroville City Elementary School District',
    '5fd704da04a848e368de5dc6':'Oakland Unified School District',
    '5f8fcd33609e08b76029f644':'Paradise Unified School District',
    '5f2609807a1c0000950bb466':'Pinellas County Schools',
    '5f2609807a1c0000950bb471':'Racine Unified Schools',
    '5f6d7cbce6452eb06384db20':'Salt Lake City School District',
    '5f2609807a1c0000950bb478':'San Diego Unified School District',
    '5f2609807a1c0000950bb470':'San Leandro Unified School District',
    '5f2609807a1c0000950bb477':'Sarasota County',
    '5f2609807a1c0000950bb473':'Skillman Foundation',
    '5f2609807a1c0000950bb46a':'Springfield Public Schools',
    '5f2609807a1c0000950bb468':'Utah Board of Education',
    '5f698b826451a9089d7d4008':'Wayne Metro',
    '5f2609807a1c0000950bb45b':'Westfield Public School District',
    '5f2609807a1c0000950bb368':'Wichita Falls Independent School District',
    '5f2609807a1c0000950bb45d':'Youngstown',
    '5f2609807a1c0000950bb464':'Equity Education',
    '5f2609807a1c0000950bb469':'LSF -  Head Start',
    '5f2609807a1c0000950bb46e':'District 25 New York Schools',
    '5f2609807a1c0000950bb46f':'Paradise Schools',
    '5f2609807a1c0000950bb479':'Panorama Education',
    '5f2609807a1c0000950bb47c':'Hawaii Public Schools',
    '5f9aa5e526edbed399d56c92':'Hamilton-Wenham Regional School District',
    '5fe2e1ee4d0ca68d7baf889c':'LSF-Head Start',
    '5fe2e25d4d0ca68d7baf889d':'BGCA',
    '5fe318b14d0ca68d7baf889e':'BLUE',
    '5ffd8176469a86e28635f512':'Chula Vista Elementary School District',
    '6017ab3043ca9c39151838d4':'Oswego School District',
    '60239a84e57dc27613699d57':'Austin Independent School District',
    '6023a6d79e8e623753fc305c':'Boulder Valley School District',
    '6023a7019e8e623753fc305d':'Miami-Dade County Public Schools',
    '6023a7269e8e623753fc305e':'Fulton County School System',
    '6023a7499e8e623753fc305f':'Manatee County School District',
    '6023a76f9e8e623753fc3060':'San Jose Unified School District',
    '6023a7949e8e623753fc3061':'Wasatch County School District',
    '60473f8823e88e242074ebd2':'Champlain Valley School District'}
    username = urllib.parse.quote_plus('admin')
    password = urllib.parse.quote_plus('I#L@teST^m0NGO_2o20!')
    client = MongoClient("mongodb://%s:%s@34.214.24.229:27017/" % (username, password))
    db=client.compass 
    collection = db.audio_track_master
    district=disdic[districtid]


    collection1 = db.user_master
    df1 = DataFrame(list(collection.aggregate([
    {"$match":
    {'$and': [
    #           {'USER_ID.ROLE_ID._id' :{'$eq':ObjectId("5f155b8a3b6800007900da2b")}},
            {"USER_ID.IS_DISABLED":{"$ne":"Y"}},
              {"USER_ID.IS_BLOCKED":{"$ne":"Y"}},
             {"USER_ID.INCOMPLETE_SIGNUP":{"$ne":"Y"}},
            { 'USER_ID.USER_NAME':{"$not":{"$regex":"test",'$options':'i'}}},
            { 'USER_ID.USER_NAME':{"$not":{"$regex":"1gen",'$options':'i'}}},
            {'USER_ID.schoolId._id':{'$ne':None}},
    # //               {'IS_ADMIN':'Y'},
    # //             {'USER_ID.IS_PORTAL':'Y'},
             {'USER_ID.EMAIL_ID':{'$ne':''}},
             {"USER_ID.schoolId._id":{"$in":db.school_master.distinct( "_id", { "IS_PORTAL": "Y" ,"CATEGORY":{'$regex':district, '$options':'i'}})}},

             {'USER_ID.schoolId.NAME':{"$not":{"$regex":"test",'$options':'i'}}},
         {'USER_ID.schoolId.BLOCKED_BY_CAP':{'$exists':False}},
                       {'USER_ID.EMAIL_ID':{"$not":{"$regex":"test",'$options':'i'}}},
                         {'USER_ID.EMAIL_ID':{"$not":{"$regex":"1gen",'$options':'i'}}}]}},
        {'$group':{'_id':'$USER_ID._id','pc':{'$sum':1}}},
              {'$project':{'_id':1,'practice_count':'$pc'}},
    { '$sort' : { 'practice_count' : -1} }



    # //               {'$count':'count'}
              ])))
    df1

    df2=DataFrame(list(collection1.aggregate([{"$match":
     {'$and': [
    #         {'ROLE_ID._id' :{'$ne':ObjectId("5f155b8a3b6800007900da2b")}},
            {"IS_DISABLED":{"$ne":"Y"}},
              {"IS_BLOCKED":{"$ne":"Y"}},
             {"INCOMPLETE_SIGNUP":{"$ne":"Y"}},
            { 'USER_NAME':{"$not":{"$regex":"test",'$options':'i'}}},
            { 'USER_NAME':{"$not":{"$regex":"1gen",'$options':'i'}}},
    #                  {'_id':{'$in':user}},
    # //               {'IS_ADMIN':'Y'},

             {'EMAIL_ID':{'$ne':''}},
             {'schoolId.NAME':{"$not":{"$regex":"test",'$options':'i'}}},
         {'schoolId.BLOCKED_BY_CAP':{'$exists':False}},
                       {'EMAIL_ID':{"$not":{"$regex":"test",'$options':'i'}}},
                         {'EMAIL_ID':{"$not":{"$regex":"1gen",'$options':'i'}}}]}},

        {'$group':{'_id':'$_id','ID':{'$addToSet':'$_id'},'school_name':{'$first':'$schoolId.NAME'},'user_name':{'$first':'$USER_NAME'}
                  }},


        {'$project':{'_id':1,'user_name':1,'school_name':1}},])))

    df=pd.merge(df1,df2, how='left', on='_id')
    df
    if df.empty == True:

        schname=[]
        pc=[]

    else:
        df["users"] = df["user_name"] +','+' ' + df["school_name"]
        schname=df['users'].tolist()
        pc=df['practice_count'].tolist()



    #     data=[]    
    #     for i,k in zip(schname,uc):

    #         data.append([i,k])

    #     for i in range(len(schname)):
    #             schname[i] = schname[i]
    data={'schname':schname[0:20],'practicecount':pc[0:20]}

    return json.dumps(data)

@app.route('/districtcardsinfo/<districtid>')
def district_count_cards(districtid):
    disdic={'5f2609807a1c0000950bb465':'Middleton - Cross Plains Area School District',
    '5f2609807a1c0000950bb475':'Agawam School district',
    '5f2609807a1c0000950bb481':'Alameda Unified School District',
    '5f2609807a1c0000950bb47a':'Alpine School District',
    '5f2609807a1c0000950bb47b':'Ann Arbor Public Schools',
    '5f2609807a1c0000950bb463':'Austin Independent School District',
    '5f59e4836451a9089d7d4007':'Belleville School District',
    '5f2609807a1c0000950bb46d':'Broward County Public Schools',
    '5f2609807a1c0000950bb46c':'Chico Unified School District',
    '5f2609807a1c0000950bb460':'Clarksville-Montgomery County School System',
    '5f2609807a1c0000950bb47f':'Community Consolidated School District 89',
    '5f2609807a1c0000950bb45c':'Comox Valley School District(sd71)',
    '5f2609807a1c0000950bb480':'Dell Texas',
    '5f7413ef9387fd71ce6387cb':'Douglas County School District',
    '5f895191609e08b76029f641':'Early learning Sarasota',
    '5f2609807a1c0000950bb462':'Englewood Cliffs Public Schools',
    '5f2609807a1c0000950bb461':'Englewood Public School District',
    '5f2609807a1c0000950bb45e':'Fairfield-Suisun Unified School District',
    '5f2609807a1c0000950bb47d':'Flint Public Schools',
    '5f2609807a1c0000950bb46b':'FundaciÃ³n La Puerta',
    '5f2609807a1c0000950bb450':'Goleta District',
    '5f2609807a1c0000950bb474':'Greenburgh-North Castle (GNC) Union Free School District',
    '5f2609807a1c0000950bb45f':'Griffin-Spalding County School System',
    '5f2609807a1c0000950bb476':'Hillsborough County',
    '5f2609807a1c0000950bb455':'Krum Independent School District',
    '5f2609807a1c0000950bb47e':'La Joya School District',
    '5f2609807a1c0000950bb467':'Lincolnshire Schools',
    '5f2609807a1c0000950bb45a':'LAUSD',
    '5f2609807a1c0000950bb482':'Massachusetts Institute of Technology',
    '5fb4efce4139b9d4c5a86a69':'Mt. Lebanon School District',
    '5fbcdf0ba84e48a64412a798':'Needham School District',
    '5f7c01fa9387fd71ce6387cc':'NYC - Queens South',
    '5f6994386451a9089d7d4009':'Ogden school district',
    '5f2609807a1c0000950bb472':'Oroville City Elementary School District',
    '5fd704da04a848e368de5dc6':'Oakland Unified School District',
    '5f8fcd33609e08b76029f644':'Paradise Unified School District',
    '5f2609807a1c0000950bb466':'Pinellas County Schools',
    '5f2609807a1c0000950bb471':'Racine Unified Schools',
    '5f6d7cbce6452eb06384db20':'Salt Lake City School District',
    '5f2609807a1c0000950bb478':'San Diego Unified School District',
    '5f2609807a1c0000950bb470':'San Leandro Unified School District',
    '5f2609807a1c0000950bb477':'Sarasota County',
    '5f2609807a1c0000950bb473':'Skillman Foundation',
    '5f2609807a1c0000950bb46a':'Springfield Public Schools',
    '5f2609807a1c0000950bb468':'Utah Board of Education',
    '5f698b826451a9089d7d4008':'Wayne Metro',
    '5f2609807a1c0000950bb45b':'Westfield Public School District',
    '5f2609807a1c0000950bb368':'Wichita Falls Independent School District',
    '5f2609807a1c0000950bb45d':'Youngstown',
    '5f2609807a1c0000950bb464':'Equity Education',
    '5f2609807a1c0000950bb469':'LSF -  Head Start',
    '5f2609807a1c0000950bb46e':'District 25 New York Schools',
    '5f2609807a1c0000950bb46f':'Paradise Schools',
    '5f2609807a1c0000950bb479':'Panorama Education',
    '5f2609807a1c0000950bb47c':'Hawaii Public Schools',
    '5f9aa5e526edbed399d56c92':'Hamilton-Wenham Regional School District',
    '5fe2e1ee4d0ca68d7baf889c':'LSF-Head Start',
    '5fe2e25d4d0ca68d7baf889d':'BGCA',
    '5fe318b14d0ca68d7baf889e':'BLUE',
    '5ffd8176469a86e28635f512':'Chula Vista Elementary School District',
    '6017ab3043ca9c39151838d4':'Oswego School District',
    '60239a84e57dc27613699d57':'Austin Independent School District',
    '6023a6d79e8e623753fc305c':'Boulder Valley School District',
    '6023a7019e8e623753fc305d':'Miami-Dade County Public Schools',
    '6023a7269e8e623753fc305e':'Fulton County School System',
    '6023a7499e8e623753fc305f':'Manatee County School District',
    '6023a76f9e8e623753fc3060':'San Jose Unified School District',
    '6023a7949e8e623753fc3061':'Wasatch County School District',
    "602e60e567d3e6c0a4eb4d99":"School District of Palm Beach County",
    '60473f8823e88e242074ebd2':'Champlain Valley School District'}
    from datetime import datetime
    from datetime import timedelta
    
    username = urllib.parse.quote_plus('admin')
    password = urllib.parse.quote_plus('I#L@teST^m0NGO_2o20!')
    client = MongoClient("mongodb://%s:%s@34.214.24.229:27017/" % (username, password))
    db=client.compass 
    collection1 = db.user_master
    collection2=db.audio_track_master
    collection3=db.login_logs
    district=disdic[districtid]
    print(district)
    df1 = DataFrame(list(collection1.aggregate([
     {"$match":
         {'$and': [
                {"IS_DISABLED":{"$ne":"Y"}},
                  {"IS_BLOCKED":{"$ne":"Y"}},
                 {"INCOMPLETE_SIGNUP":{"$ne":"Y"}},
                { 'USER_NAME':{"$not":{"$regex":"test",'$options':'i'}}},
                { 'USER_NAME':{"$not":{"$regex":"1gen",'$options':'i'}}},
#                  {'IS_PORTAL':'Y'},
                 {'EMAIL_ID':{'$ne':''}},
#                  {'DISTRICT_ID._id':{'$eq':ObjectId(""+districtid+"")}},
             {"schoolId._id":{"$in":db.school_master.distinct( "_id", { "IS_PORTAL": "Y" ,"CATEGORY":{'$regex':district, '$options':'i'}})}},
    #              {'DISTRICT_ID.DISTRICT_NAME':'Sarasota County'},
    # //              {'EMAIL_ID':{'$regex':'broward','$options':'i'}},
                 {'schoolId.NAME':{"$not":{"$regex":"test",'$options':'i'}}},
             {'schoolId.BLOCKED_BY_CAP':{'$exists':False}},
                           {'EMAIL_ID':{"$not":{"$regex":"test",'$options':'i'}}},
                             {'EMAIL_ID':{"$not":{"$regex":"1gen",'$options':'i'}}}]}},
            {'$group':{'_id':'','ID':{'$addToSet':'$schoolId._id'},'dn':{'$first':'$DISTRICT_ID.DISTRICT_NAME'}}},
                  {'$project':{'_id':1,'school_count':{'$size':'$ID'},'district':'$dn'}}
                  ])))
    df2 = DataFrame(list(collection1.aggregate([ {"$match":
         {'$and': [
              {'ROLE_ID._id' :{'$eq':ObjectId("5f155b8a3b6800007900da2a")}},
                {"IS_DISABLED":{"$ne":"Y"}},
                  {"IS_BLOCKED":{"$ne":"Y"}},
                 {"INCOMPLETE_SIGNUP":{"$ne":"Y"}},
                { 'USER_NAME':{"$not":{"$regex":"test",'$options':'i'}}},
                { 'USER_NAME':{"$not":{"$regex":"1gen",'$options':'i'}}},
#                  {'IS_PORTAL':'Y'},
                 {'EMAIL_ID':{'$ne':''}},
                {"schoolId._id":{"$in":db.school_master.distinct( "_id", { "IS_PORTAL": "Y" ,"CATEGORY":{'$regex':district, '$options':'i'}})}},
#                  {'DISTRICT_ID._id':{'$eq':ObjectId(""+districtid+"")}},
                 {'schoolId.NAME':{"$not":{"$regex":"test",'$options':'i'}}},
             {'schoolId.BLOCKED_BY_CAP':{'$exists':False}},
                           {'EMAIL_ID':{"$not":{"$regex":"test",'$options':'i'}}},
                             {'EMAIL_ID':{"$not":{"$regex":"1gen",'$options':'i'}}}]}},
            {'$group':{'_id':'','ID':{'$addToSet':'$_id'}}},
                  {'$project':{'_id':1,'teacher_count':{'$size':'$ID'}}}
                  ])))
    df5 = DataFrame(list(collection1.aggregate([ {"$match":
         {'$and': [
              {'ROLE_ID._id' :{'$eq':ObjectId("5f155b8a3b6800007900da2b")}},
                {"IS_DISABLED":{"$ne":"Y"}},
                  {"IS_BLOCKED":{"$ne":"Y"}},
                 {"INCOMPLETE_SIGNUP":{"$ne":"Y"}},
                { 'USER_NAME':{"$not":{"$regex":"test",'$options':'i'}}},
                { 'USER_NAME':{"$not":{"$regex":"1gen",'$options':'i'}}},
#                  {'IS_PORTAL':'Y'},
                  {"schoolId._id":{"$in":db.school_master.distinct( "_id", { "IS_PORTAL": "Y" ,"CATEGORY":{'$regex':district, '$options':'i'}})}},
                 {'EMAIL_ID':{'$ne':''}},
#                  {'DISTRICT_ID._id':{'$eq':ObjectId(""+districtid+"")}},
                 {'schoolId.NAME':{"$not":{"$regex":"test",'$options':'i'}}},
             {'schoolId.BLOCKED_BY_CAP':{'$exists':False}},
                           {'EMAIL_ID':{"$not":{"$regex":"test",'$options':'i'}}},
                             {'EMAIL_ID':{"$not":{"$regex":"1gen",'$options':'i'}}}]}},
            {'$group':{'_id':'','ID':{'$addToSet':'$_id'}}},
                  {'$project':{'_id':1,'family_count':{'$size':'$ID'}}}
                  ])))
    today1= datetime.utcnow()
    tod1= today1+ timedelta(hours=4)
    start1= tod1-timedelta(days=30)
    df3=DataFrame(list(collection2.aggregate([
     {"$match":
         {'$and': [
    # //          {'ROLE_ID._id' :{'$':ObjectId("5f155b8a3b6800007900da2b")}},
                {"USER_ID.IS_DISABLED":{"$ne":"Y"}},
                  {"USER_ID.IS_BLOCKED":{"$ne":"Y"}},
                 {"USER_ID.INCOMPLETE_SIGNUP":{"$ne":"Y"}},
                { 'USER_ID.USER_NAME':{"$not":{"$regex":"test",'$options':'i'}}},
                { 'USER_ID.USER_NAME':{"$not":{"$regex":"1gen",'$options':'i'}}},
    # //             {'USER_ID.IS_PORTAL':'Y'},
                 {'USER_ID.EMAIL_ID':{'$ne':''}},
#                  {'USER_ID.DISTRICT_ID._id':{'$eq':ObjectId(""+districtid+"")}},
                               {"USER_ID.schoolId._id":{"$in":db.school_master.distinct( "_id", { "IS_PORTAL": "Y" ,"CATEGORY":{'$regex':district, '$options':'i'}})}},
    #              {'USER_ID.DISTRICT_ID.DISTRICT_NAME':'Sarasota County'},
                 {'MODIFIED_DATE':{'$gte':datetime(2020,8,1)}},
    # //              {'EMAIL_ID':{'$regex':'broward','$options':'i'}},
                 {'USER_ID.schoolId.NAME':{"$not":{"$regex":"test",'$options':'i'}}},
             {'USER_ID.schoolId.BLOCKED_BY_CAP':{'$exists':False}},
                           {'USER_ID.EMAIL_ID':{"$not":{"$regex":"test",'$options':'i'}}},
                             {'USER_ID.EMAIL_ID':{"$not":{"$regex":"1gen",'$options':'i'}}}]}},
            {'$group':{'_id':'','pc':{'$sum':1},'MINDFUL_MINUTES':{'$sum':{'$round':[{'$divide':[{'$subtract':['$CURSOR_END','$cursorStart']}, 60]},2]}}}},
                  {'$project':{'_id':1,'practice_sessions':'$pc','MINDFUL_MINUTES':'$MINDFUL_MINUTES'}}])))
   

    df4=DataFrame(list(collection3.aggregate([{"$match":
         {'$and': [
    #           {'USER_ID.ROLE_ID._id' :{'$eq':ObjectId("5f155b8a3b6800007900da2b")}},
                {"USER_ID.IS_DISABLED":{"$ne":"Y"}},
                  {"USER_ID.IS_BLOCKED":{"$ne":"Y"}},
                 {"USER_ID.INCOMPLETE_SIGNUP":{"$ne":"Y"}},
                { 'USER_ID.USER_NAME':{"$not":{"$regex":"test",'$options':'i'}}},
                { 'USER_ID.USER_NAME':{"$not":{"$regex":"1gen",'$options':'i'}}},
                {'USER_ID.schoolId._id':{'$ne':None}},
    # //               {'IS_ADMIN':'Y'},
                  {"USER_ID.schoolId._id":{"$in":db.school_master.distinct( "_id", { "IS_PORTAL": "Y" ,"CATEGORY":{'$regex':district, '$options':'i'}})}},
    # //             {'USER_ID.IS_PORTAL':'Y'},
                 {'USER_ID.EMAIL_ID':{'$ne':''}},
#                  {'USER_ID.DISTRICT_ID._id':{'$eq':ObjectId(""+districtid+"")}},
    #              {'USER_ID.DISTRICT_ID.DISTRICT_NAME':'Broward County Public Schools'},
                 {'LAST_LOGGED_IN':{'$gte':start1}},
    # //              {'EMAIL_ID':{'$regex':'broward','$options':'i'}},
                 {'USER_ID.schoolId.NAME':{"$not":{"$regex":"test",'$options':'i'}}},
             {'USER_ID.schoolId.BLOCKED_BY_CAP':{'$exists':False}},
                           {'USER_ID.EMAIL_ID':{"$not":{"$regex":"test",'$options':'i'}}},
                             {'USER_ID.EMAIL_ID':{"$not":{"$regex":"1gen",'$options':'i'}}}]}},
            {'$group':{'_id':'','pc':{'$sum':1}}},
                  {'$project':{'_id':1,'logins':'$pc'}}])))
    df6=DataFrame(list(collection2.aggregate([
     {"$match":
         {'$and': [
             {'USER_ID.ROLE_ID._id' :{'$ne':ObjectId("5f155b8a3b6800007900da2b")}},
                {"USER_ID.IS_DISABLED":{"$ne":"Y"}},
                  {"USER_ID.IS_BLOCKED":{"$ne":"Y"}},
                 {"USER_ID.INCOMPLETE_SIGNUP":{"$ne":"Y"}},
                { 'USER_ID.USER_NAME':{"$not":{"$regex":"test",'$options':'i'}}},
                { 'USER_ID.USER_NAME':{"$not":{"$regex":"1gen",'$options':'i'}}},
    # //             {'USER_ID.IS_PORTAL':'Y'},
                 {'USER_ID.EMAIL_ID':{'$ne':''}},
#                  {'USER_ID.DISTRICT_ID._id':{'$eq':ObjectId(""+districtid+"")}},
                               {"USER_ID.schoolId._id":{"$in":db.school_master.distinct( "_id", { "IS_PORTAL": "Y" ,"CATEGORY":{'$regex':district, '$options':'i'}})}},
    #              {'USER_ID.DISTRICT_ID.DISTRICT_NAME':'Sarasota County'},
                 {'MODIFIED_DATE':{'$gte':datetime(2020,8,1)}},
    # //              {'EMAIL_ID':{'$regex':'broward','$options':'i'}},
                 {'USER_ID.schoolId.NAME':{"$not":{"$regex":"test",'$options':'i'}}},
             {'USER_ID.schoolId.BLOCKED_BY_CAP':{'$exists':False}},
                           {'USER_ID.EMAIL_ID':{"$not":{"$regex":"test",'$options':'i'}}},
                             {'USER_ID.EMAIL_ID':{"$not":{"$regex":"1gen",'$options':'i'}}}]}},
            {'$group':{'_id':'','pc':{'$sum':1},'MINDFUL_MINUTES':{'$sum':{'$round':[{'$divide':[{'$subtract':['$CURSOR_END','$cursorStart']}, 60]},2]}}}},
                  {'$project':{'_id':1,'practice_sessions_t':'$pc'}}])))
   
    df7=DataFrame(list(collection2.aggregate([
     {"$match":
         {'$and': [
             {'USER_ID.ROLE_ID._id' :{'$eq':ObjectId("5f155b8a3b6800007900da2b")}},
                {"USER_ID.IS_DISABLED":{"$ne":"Y"}},
                  {"USER_ID.IS_BLOCKED":{"$ne":"Y"}},
                 {"USER_ID.INCOMPLETE_SIGNUP":{"$ne":"Y"}},
                { 'USER_ID.USER_NAME':{"$not":{"$regex":"test",'$options':'i'}}},
                { 'USER_ID.USER_NAME':{"$not":{"$regex":"1gen",'$options':'i'}}},
    # //             {'USER_ID.IS_PORTAL':'Y'},
                 {'USER_ID.EMAIL_ID':{'$ne':''}},
#                  {'USER_ID.DISTRICT_ID._id':{'$eq':ObjectId(""+districtid+"")}},
                               {"USER_ID.schoolId._id":{"$in":db.school_master.distinct( "_id", { "IS_PORTAL": "Y" ,"CATEGORY":{'$regex':district, '$options':'i'}})}},
    #              {'USER_ID.DISTRICT_ID.DISTRICT_NAME':'Sarasota County'},
                 {'MODIFIED_DATE':{'$gte':datetime(2020,8,1)}},
    # //              {'EMAIL_ID':{'$regex':'broward','$options':'i'}},
                 {'USER_ID.schoolId.NAME':{"$not":{"$regex":"test",'$options':'i'}}},
             {'USER_ID.schoolId.BLOCKED_BY_CAP':{'$exists':False}},
                           {'USER_ID.EMAIL_ID':{"$not":{"$regex":"test",'$options':'i'}}},
                             {'USER_ID.EMAIL_ID':{"$not":{"$regex":"1gen",'$options':'i'}}}]}},
            {'$group':{'_id':'','pc':{'$sum':1},'MINDFUL_MINUTES':{'$sum':{'$round':[{'$divide':[{'$subtract':['$CURSOR_END','$cursorStart']}, 60]},2]}}}},
                  {'$project':{'_id':1,'practice_sessions_p':'$pc'}}])))
   

    sc=[0]
    try:
        sc=df1['school_count']
    except:
        sc=[0]
        
    tc=[0]
    try:
        tc=df2['teacher_count']
    except:
        tc=[0]
    
    pct=[0]
    try:
        pct=df6['practice_sessions_t']
    except:
        pct=[0]
    pcp=[0]
    try:
        pcp=df7['practice_sessions_p']
    except:
        pcp=[0]
    mm=[0]
    try:
        mm=df3['MINDFUL_MINUTES']
    except:
        mm=[0]
    
    lc=[0]
    try:
        lc=df4['logins']
    except:
        lc=[0]
        
    fc=[0]
    try:
        fc=df5['family_count']
    except:
        fc=[0]
    
    
    
    
    dn=[0]
    try:
        dn=df1['district']
    except:
        dn=[0]
    
    
#     print(lc)
    
    data={"schoolcount":str(sc[0]),"teachercount":str(tc[0]),"familycount":str(fc[0]),"teacherpracticecount":str(pct[0]),"parentspracticecount":str(pcp[0]),"logincount":str(lc[0]),
          'MINDFUL_MINUTES':str(mm[0]),'district':str(dn[0])}
    return json.dumps(data)




@app.route('/districtusertableteacher/<districtid>')
def district_user_table_teacher(districtid):
    disdic={'5f2609807a1c0000950bb465':'Middleton - Cross Plains Area School District',
    '5f2609807a1c0000950bb475':'Agawam School district',
    '5f2609807a1c0000950bb481':'Alameda Unified School District',
    '5f2609807a1c0000950bb47a':'Alpine School District',
    '5f2609807a1c0000950bb47b':'Ann Arbor Public Schools',
    '5f2609807a1c0000950bb463':'Austin Independent School District',
    '5f59e4836451a9089d7d4007':'Belleville School District',
    '5f2609807a1c0000950bb46d':'Broward County Public Schools',
    '5f2609807a1c0000950bb46c':'Chico Unified School District',
    '5f2609807a1c0000950bb460':'Clarksville-Montgomery County School System',
    '5f2609807a1c0000950bb47f':'Community Consolidated School District 89',
    '5f2609807a1c0000950bb45c':'Comox Valley School District(sd71)',
    '5f2609807a1c0000950bb480':'Dell Texas',
    '5f7413ef9387fd71ce6387cb':'Douglas County School District',
    '5f895191609e08b76029f641':'Early learning Sarasota',
    '5f2609807a1c0000950bb462':'Englewood Cliffs Public Schools',
    '5f2609807a1c0000950bb461':'Englewood Public School District',
    '5f2609807a1c0000950bb45e':'Fairfield-Suisun Unified School District',
    '5f2609807a1c0000950bb47d':'Flint Public Schools',
    '5f2609807a1c0000950bb46b':'FundaciÃ³n La Puerta',
    '5f2609807a1c0000950bb450':'Goleta District',
    '5f2609807a1c0000950bb474':'Greenburgh-North Castle (GNC) Union Free School District',
    '5f2609807a1c0000950bb45f':'Griffin-Spalding County School System',
    '5f2609807a1c0000950bb476':'Hillsborough County',
    '5f2609807a1c0000950bb455':'Krum Independent School District',
    '5f2609807a1c0000950bb47e':'La Joya School District',
    '5f2609807a1c0000950bb467':'Lincolnshire Schools',
    '5f2609807a1c0000950bb45a':'LAUSD',
    '5f2609807a1c0000950bb482':'Massachusetts Institute of Technology',
    '5fb4efce4139b9d4c5a86a69':'Mt. Lebanon School District',
    '5fbcdf0ba84e48a64412a798':'Needham School District',
    '5f7c01fa9387fd71ce6387cc':'NYC - Queens South',
    '5f6994386451a9089d7d4009':'Ogden school district',
    '5f2609807a1c0000950bb472':'Oroville City Elementary School District',
    '5fd704da04a848e368de5dc6':'Oakland Unified School District',
    '5f8fcd33609e08b76029f644':'Paradise Unified School District',
    '5f2609807a1c0000950bb466':'Pinellas County Schools',
    '5f2609807a1c0000950bb471':'Racine Unified Schools',
    '5f6d7cbce6452eb06384db20':'Salt Lake City School District',
    '5f2609807a1c0000950bb478':'San Diego Unified School District',
    '5f2609807a1c0000950bb470':'San Leandro Unified School District',
    '5f2609807a1c0000950bb477':'Sarasota County',
    '5f2609807a1c0000950bb473':'Skillman Foundation',
    '5f2609807a1c0000950bb46a':'Springfield Public Schools',
    '5f2609807a1c0000950bb468':'Utah Board of Education',
    '5f698b826451a9089d7d4008':'Wayne Metro',
    '5f2609807a1c0000950bb45b':'Westfield Public School District',
    '5f2609807a1c0000950bb368':'Wichita Falls Independent School District',
    '5f2609807a1c0000950bb45d':'Youngstown',
    '5f2609807a1c0000950bb464':'Equity Education',
    '5f2609807a1c0000950bb469':'LSF -  Head Start',
    '5f2609807a1c0000950bb46e':'District 25 New York Schools',
    '5f2609807a1c0000950bb46f':'Paradise Schools',
    '5f2609807a1c0000950bb479':'Panorama Education',
    '5f2609807a1c0000950bb47c':'Hawaii Public Schools',
    '5f9aa5e526edbed399d56c92':'Hamilton-Wenham Regional School District',
    '5fe2e1ee4d0ca68d7baf889c':'LSF-Head Start',
    '5fe2e25d4d0ca68d7baf889d':'BGCA',
    '5fe318b14d0ca68d7baf889e':'BLUE',
    '5ffd8176469a86e28635f512':'Chula Vista Elementary School District',
    '6017ab3043ca9c39151838d4':'Oswego School District',
    '60239a84e57dc27613699d57':'Austin Independent School District',
    '6023a6d79e8e623753fc305c':'Boulder Valley School District',
    '6023a7019e8e623753fc305d':'Miami-Dade County Public Schools',
    '6023a7269e8e623753fc305e':'Fulton County School System',
    '6023a7499e8e623753fc305f':'Manatee County School District',
    '6023a76f9e8e623753fc3060':'San Jose Unified School District',
    '6023a7949e8e623753fc3061':'Wasatch County School District',
    '60473f8823e88e242074ebd2':'Champlain Valley School District'}
    
    username = urllib.parse.quote_plus('admin')
    password = urllib.parse.quote_plus('I#L@teST^m0NGO_2o20!')
    client = MongoClient("mongodb://%s:%s@34.214.24.229:27017/" % (username, password))
    db=client.compass 

    
    collection2=db.school_master
    collection=db.user_master
    collection1=db.audio_track_master
    collection3=db.subscription_master
    district=disdic[districtid]

    from datetime import datetime


    df3=DataFrame(list(collection1.aggregate([
     {"$match":
         {'$and': [
              {'USER_ID.ROLE_ID._id' :{'$ne':ObjectId("5f155b8a3b6800007900da2b")}},
                {"USER_ID.IS_DISABLED":{"$ne":"Y"}},
                  {"USER_ID.IS_BLOCKED":{"$ne":"Y"}},
                 {"USER_ID.INCOMPLETE_SIGNUP":{"$ne":"Y"}},
                { 'USER_ID.USER_NAME':{"$not":{"$regex":"test",'$options':'i'}}},
                { 'USER_ID.USER_NAME':{"$not":{"$regex":"1gen",'$options':'i'}}},
    # //             {'USER_ID.IS_PORTAL':'Y'},
                 {'USER_ID.EMAIL_ID':{'$ne':''}},
    #                  {'USER_ID.DISTRICT_ID._id':{'$eq':ObjectId(""+districtid+"")}},
                               {"USER_ID.schoolId._id":{"$in":db.school_master.distinct( "_id", { "IS_PORTAL": "Y" ,"CATEGORY":{'$regex':district, '$options':'i'}})}},
    #              {'USER_ID.DISTRICT_ID.DISTRICT_NAME':'Sarasota County'},
                 {'MODIFIED_DATE':{'$gte':datetime(2020,8,1)}},
    # //              {'EMAIL_ID':{'$regex':'broward','$options':'i'}},
                 {'USER_ID.schoolId.NAME':{"$not":{"$regex":"test",'$options':'i'}}},
             {'USER_ID.schoolId.BLOCKED_BY_CAP':{'$exists':False}},
                           {'USER_ID.EMAIL_ID':{"$not":{"$regex":"test",'$options':'i'}}},
                             {'USER_ID.EMAIL_ID':{"$not":{"$regex":"1gen",'$options':'i'}}}]}},
            {'$group':{'_id':'$USER_ID._id','user':{'$addToSet':'$USER_ID._id'},'pc':{'$sum':1},'last_practice_date':{'$max':{"$dateToString": { "format": "%Y-%m-%d", "date":'$MODIFIED_DATE'}}}}},
                  {'$project':{'_id':1,'user_id':'$user','Practice_Count':'$pc','last_practice_date':1}}])))




    df2=DataFrame(list(collection.aggregate([{"$match":
         {'$and': [
            {'ROLE_ID._id' :{'$ne':ObjectId("5f155b8a3b6800007900da2b")}},
                {"IS_DISABLED":{"$ne":"Y"}},
                  {"IS_BLOCKED":{"$ne":"Y"}},
                 {"INCOMPLETE_SIGNUP":{"$ne":"Y"}},
                { 'USER_NAME':{"$not":{"$regex":"test",'$options':'i'}}},
                { 'USER_NAME':{"$not":{"$regex":"1gen",'$options':'i'}}},
    #                 {'_id':{'$in':user}},
    # //               {'IS_ADMIN':'Y'},

                 {'EMAIL_ID':{'$ne':''}},
                 {'schoolId.NAME':{"$not":{"$regex":"test",'$options':'i'}}},
             {'schoolId.BLOCKED_BY_CAP':{'$exists':False}},
                           {'EMAIL_ID':{"$not":{"$regex":"test",'$options':'i'}}},
                             {'EMAIL_ID':{"$not":{"$regex":"1gen",'$options':'i'}}}]}},

            {'$group':{'_id':'$_id','ID':{'$addToSet':'$_id'},'school_name':{'$first':'$schoolId.NAME'},'user_name':{'$first':'$USER_NAME'},'EMAIL':{'$first':'$EMAIL_ID'},'date':{'$first':{"$dateToString": { "format": "%Y-%m-%d", "date":'$CREATED_DATE'}}},'country':{'$first':'$schoolId.COUNTRY'},
                      'State':{'$first':'$schoolId.STATE'},'city':{'$first':'$schoolId.CITY'}}},


            {'$project':{'_id':1,'Created_date':'$date','country':1,'State':1,'user_name':1,'EMAIL':1,'school_name':1,'city':1}},])))




    df4 = DataFrame(list(collection3.aggregate([
    {"$match":
         {'$and': [
                 {'USER_ID.ROLE_ID._id' :{'$ne':ObjectId("5f155b8a3b6800007900da2b")}},
                {"USER_ID.IS_DISABLED":{"$ne":"Y"}},
                  {"USER_ID.IS_BLOCKED":{"$ne":"Y"}},
                 {"USER_ID.INCOMPLETE_SIGNUP":{"$ne":"Y"}},
                { 'USER_ID.USER_NAME':{"$not":{"$regex":"test",'$options':'i'}}},
                { 'USER_ID.USER_NAME':{"$not":{"$regex":"1gen",'$options':'i'}}},
    #             {'USER_ID._id':{'$in':user}},
                 {'USER_ID.EMAIL_ID':{'$ne':''}},
    #                  
                 {'USER_ID.schoolId.NAME':{"$not":{"$regex":"test",'$options':'i'}}},
             {'USER_ID.schoolId.BLOCKED_BY_CAP':{'$exists':False}},
                           {'USER_ID.EMAIL_ID':{"$not":{"$regex":"test",'$options':'i'}}},
                             {'USER_ID.EMAIL_ID':{"$not":{"$regex":"1gen",'$options':'i'}}}]}},
            {'$group':{'_id':'$USER_ID._id','subsdate':{'$max':{"$dateToString": { "format": "%Y-%m-%d", "date":'$SUBSCRIPTION_EXPIRE_DATE'}}}}},
                  {'$project':{'_id':1,'Subscription_expire_date':'$subsdate'}},
                   ])))

    df5=pd.merge(df3,df2, how='left', on='_id')
    df=pd.merge(df5,df4, how='left', on='_id')
    df


    df['country'].fillna("NO INFO", inplace=True)
    df.Practice_Count=df.Practice_Count.fillna(0)
    df.Practice_Count=df.Practice_Count.astype('int64')

    df['school_name'].replace("",'NO INFO', inplace=True)
    df['city'].replace("",'NO INFO', inplace=True)
    df['State'].replace("",'NO INFO', inplace=True)
    df['country'].replace("",'NO INFO', inplace=True)
    df['user_name'].replace("",'NO INFO', inplace=True)
    df['city'].fillna("NO INFO", inplace=True)
    df['city'].replace("NULL","NO INFO", inplace=True)
    df['State'].fillna("NO INFO", inplace=True)
    df['State'].replace("NULL","NO INFO", inplace=True)



    df['Created_date']=df['Created_date'].fillna(0)
    df['last_practice_date']=df['last_practice_date'].fillna('NO PRACTICE')
    df['Subscription_expire_date']=df['Subscription_expire_date'].fillna('No Info')

    data=[]
    for i,j,k,l,m,n,o,p,r,s in zip(df['user_name'].tolist(),df['EMAIL'].tolist(),df['school_name'].tolist(),df['country'].tolist(),df['State'].tolist(),df['city'].tolist(),df['Practice_Count'].tolist(),df['Created_date'].tolist(),df['last_practice_date'].tolist(),df['Subscription_expire_date'].tolist()):
        data.append([i,j,k,l,m,n,o,p,r,s])
    temp={"data":data}
    return json.dumps(temp)

   
@app.route('/districtusertableparent/<districtid>')
def district_user_table_parents(districtid):
    disdic={'5f2609807a1c0000950bb465':'Middleton - Cross Plains Area School District',
    '5f2609807a1c0000950bb475':'Agawam School district',
    '5f2609807a1c0000950bb481':'Alameda Unified School District',
    '5f2609807a1c0000950bb47a':'Alpine School District',
    '5f2609807a1c0000950bb47b':'Ann Arbor Public Schools',
    '5f2609807a1c0000950bb463':'Austin Independent School District',
    '5f59e4836451a9089d7d4007':'Belleville School District',
    '5f2609807a1c0000950bb46d':'Broward County Public Schools',
    '5f2609807a1c0000950bb46c':'Chico Unified School District',
    '5f2609807a1c0000950bb460':'Clarksville-Montgomery County School System',
    '5f2609807a1c0000950bb47f':'Community Consolidated School District 89',
    '5f2609807a1c0000950bb45c':'Comox Valley School District(sd71)',
    '5f2609807a1c0000950bb480':'Dell Texas',
    '5f7413ef9387fd71ce6387cb':'Douglas County School District',
    '5f895191609e08b76029f641':'Early learning Sarasota',
    '5f2609807a1c0000950bb462':'Englewood Cliffs Public Schools',
    '5f2609807a1c0000950bb461':'Englewood Public School District',
    '5f2609807a1c0000950bb45e':'Fairfield-Suisun Unified School District',
    '5f2609807a1c0000950bb47d':'Flint Public Schools',
    '5f2609807a1c0000950bb46b':'FundaciÃ³n La Puerta',
    '5f2609807a1c0000950bb450':'Goleta District',
    '5f2609807a1c0000950bb474':'Greenburgh-North Castle (GNC) Union Free School District',
    '5f2609807a1c0000950bb45f':'Griffin-Spalding County School System',
    '5f2609807a1c0000950bb476':'Hillsborough County',
    '5f2609807a1c0000950bb455':'Krum Independent School District',
    '5f2609807a1c0000950bb47e':'La Joya School District',
    '5f2609807a1c0000950bb467':'Lincolnshire Schools',
    '5f2609807a1c0000950bb45a':'LAUSD',
    '5f2609807a1c0000950bb482':'Massachusetts Institute of Technology',
    '5fb4efce4139b9d4c5a86a69':'Mt. Lebanon School District',
    '5fbcdf0ba84e48a64412a798':'Needham School District',
    '5f7c01fa9387fd71ce6387cc':'NYC - Queens South',
    '5f6994386451a9089d7d4009':'Ogden school district',
    '5f2609807a1c0000950bb472':'Oroville City Elementary School District',
    '5fd704da04a848e368de5dc6':'Oakland Unified School District',
    '5f8fcd33609e08b76029f644':'Paradise Unified School District',
    '5f2609807a1c0000950bb466':'Pinellas County Schools',
    '5f2609807a1c0000950bb471':'Racine Unified Schools',
    '5f6d7cbce6452eb06384db20':'Salt Lake City School District',
    '5f2609807a1c0000950bb478':'San Diego Unified School District',
    '5f2609807a1c0000950bb470':'San Leandro Unified School District',
    '5f2609807a1c0000950bb477':'Sarasota County',
    '5f2609807a1c0000950bb473':'Skillman Foundation',
    '5f2609807a1c0000950bb46a':'Springfield Public Schools',
    '5f2609807a1c0000950bb468':'Utah Board of Education',
    '5f698b826451a9089d7d4008':'Wayne Metro',
    '5f2609807a1c0000950bb45b':'Westfield Public School District',
    '5f2609807a1c0000950bb368':'Wichita Falls Independent School District',
    '5f2609807a1c0000950bb45d':'Youngstown',
    '5f2609807a1c0000950bb464':'Equity Education',
    '5f2609807a1c0000950bb469':'LSF -  Head Start',
    '5f2609807a1c0000950bb46e':'District 25 New York Schools',
    '5f2609807a1c0000950bb46f':'Paradise Schools',
    '5f2609807a1c0000950bb479':'Panorama Education',
    '5f2609807a1c0000950bb47c':'Hawaii Public Schools',
    '5f9aa5e526edbed399d56c92':'Hamilton-Wenham Regional School District',
    '5fe2e1ee4d0ca68d7baf889c':'LSF-Head Start',
    '5fe2e25d4d0ca68d7baf889d':'BGCA',
    '5fe318b14d0ca68d7baf889e':'BLUE',
    '5ffd8176469a86e28635f512':'Chula Vista Elementary School District',
    '6017ab3043ca9c39151838d4':'Oswego School District',
    '60239a84e57dc27613699d57':'Austin Independent School District',
    '6023a6d79e8e623753fc305c':'Boulder Valley School District',
    '6023a7019e8e623753fc305d':'Miami-Dade County Public Schools',
    '6023a7269e8e623753fc305e':'Fulton County School System',
    '6023a7499e8e623753fc305f':'Manatee County School District',
    '6023a76f9e8e623753fc3060':'San Jose Unified School District',
    '6023a7949e8e623753fc3061':'Wasatch County School District',
    '60473f8823e88e242074ebd2':'Champlain Valley School District'}
    
    username = urllib.parse.quote_plus('admin')
    password = urllib.parse.quote_plus('I#L@teST^m0NGO_2o20!')
    client = MongoClient("mongodb://%s:%s@34.214.24.229:27017/" % (username, password))
    db=client.compass 
    from datetime import datetime
    
    collection2=db.school_master
    collection=db.user_master
    collection1=db.audio_track_master
    collection3=db.subscription_master
    district=disdic[districtid]




    df3=DataFrame(list(collection1.aggregate([
     {"$match":
         {'$and': [
              {'USER_ID.ROLE_ID._id' :{'$eq':ObjectId("5f155b8a3b6800007900da2b")}},
                {"USER_ID.IS_DISABLED":{"$ne":"Y"}},
                  {"USER_ID.IS_BLOCKED":{"$ne":"Y"}},
                 {"USER_ID.INCOMPLETE_SIGNUP":{"$ne":"Y"}},
                { 'USER_ID.USER_NAME':{"$not":{"$regex":"test",'$options':'i'}}},
                { 'USER_ID.USER_NAME':{"$not":{"$regex":"1gen",'$options':'i'}}},
    # //             {'USER_ID.IS_PORTAL':'Y'},
                 {'USER_ID.EMAIL_ID':{'$ne':''}},
    #                  {'USER_ID.DISTRICT_ID._id':{'$eq':ObjectId(""+districtid+"")}},
                               {"USER_ID.schoolId._id":{"$in":db.school_master.distinct( "_id", { "IS_PORTAL": "Y" ,"CATEGORY":{'$regex':district, '$options':'i'}})}},
    #              {'USER_ID.DISTRICT_ID.DISTRICT_NAME':'Sarasota County'},
                 {'MODIFIED_DATE':{'$gte':datetime(2020,8,1)}},
    # //              {'EMAIL_ID':{'$regex':'broward','$options':'i'}},
                 {'USER_ID.schoolId.NAME':{"$not":{"$regex":"test",'$options':'i'}}},
             {'USER_ID.schoolId.BLOCKED_BY_CAP':{'$exists':False}},
                           {'USER_ID.EMAIL_ID':{"$not":{"$regex":"test",'$options':'i'}}},
                             {'USER_ID.EMAIL_ID':{"$not":{"$regex":"1gen",'$options':'i'}}}]}},
            {'$group':{'_id':'$USER_ID._id','user':{'$addToSet':'$USER_ID._id'},'pc':{'$sum':1},'last_practice_date':{'$max':{"$dateToString": { "format": "%Y-%m-%d", "date":'$MODIFIED_DATE'}}}}},
                  {'$project':{'_id':1,'user_id':'$user','Practice_Count':'$pc','last_practice_date':1}}])))




    df2=DataFrame(list(collection.aggregate([{"$match":
         {'$and': [
            {'ROLE_ID._id' :{'$eq':ObjectId("5f155b8a3b6800007900da2b")}},
                {"IS_DISABLED":{"$ne":"Y"}},
                  {"IS_BLOCKED":{"$ne":"Y"}},
                 {"INCOMPLETE_SIGNUP":{"$ne":"Y"}},
                { 'USER_NAME':{"$not":{"$regex":"test",'$options':'i'}}},
                { 'USER_NAME':{"$not":{"$regex":"1gen",'$options':'i'}}},
    #                 {'_id':{'$in':user}},
    # //               {'IS_ADMIN':'Y'},

                 {'EMAIL_ID':{'$ne':''}},
                 {'schoolId.NAME':{"$not":{"$regex":"test",'$options':'i'}}},
             {'schoolId.BLOCKED_BY_CAP':{'$exists':False}},
                           {'EMAIL_ID':{"$not":{"$regex":"test",'$options':'i'}}},
                             {'EMAIL_ID':{"$not":{"$regex":"1gen",'$options':'i'}}}]}},

            {'$group':{'_id':'$_id','ID':{'$addToSet':'$_id'},'school_name':{'$first':'$schoolId.NAME'},'user_name':{'$first':'$USER_NAME'},'EMAIL':{'$first':'$EMAIL_ID'},'date':{'$first':{"$dateToString": { "format": "%Y-%m-%d", "date":'$CREATED_DATE'}}},'country':{'$first':'$schoolId.COUNTRY'},
                      'State':{'$first':'$schoolId.STATE'},'city':{'$first':'$schoolId.CITY'}}},


            {'$project':{'_id':1,'Created_date':'$date','country':1,'State':1,'user_name':1,'EMAIL':1,'school_name':1,'city':1}},])))




    df4 = DataFrame(list(collection3.aggregate([
    {"$match":
         {'$and': [
                 {'USER_ID.ROLE_ID._id' :{'$eq':ObjectId("5f155b8a3b6800007900da2b")}},
                {"USER_ID.IS_DISABLED":{"$ne":"Y"}},
                  {"USER_ID.IS_BLOCKED":{"$ne":"Y"}},
                 {"USER_ID.INCOMPLETE_SIGNUP":{"$ne":"Y"}},
                { 'USER_ID.USER_NAME':{"$not":{"$regex":"test",'$options':'i'}}},
                { 'USER_ID.USER_NAME':{"$not":{"$regex":"1gen",'$options':'i'}}},
    #             {'USER_ID._id':{'$in':user}},
                 {'USER_ID.EMAIL_ID':{'$ne':''}},
    #                  
                 {'USER_ID.schoolId.NAME':{"$not":{"$regex":"test",'$options':'i'}}},
             {'USER_ID.schoolId.BLOCKED_BY_CAP':{'$exists':False}},
                           {'USER_ID.EMAIL_ID':{"$not":{"$regex":"test",'$options':'i'}}},
                             {'USER_ID.EMAIL_ID':{"$not":{"$regex":"1gen",'$options':'i'}}}]}},
            {'$group':{'_id':'$USER_ID._id','subsdate':{'$max':{"$dateToString": { "format": "%Y-%m-%d", "date":'$SUBSCRIPTION_EXPIRE_DATE'}}}}},
                  {'$project':{'_id':1,'Subscription_expire_date':'$subsdate'}},
                   ])))

    df5=pd.merge(df3,df2, how='left', on='_id')
    df=pd.merge(df5,df4, how='left', on='_id')
    df


    df['country'].fillna("NO INFO", inplace=True)
    df.Practice_Count=df.Practice_Count.fillna(0)
    df.Practice_Count=df.Practice_Count.astype('int64')

    df['school_name'].replace("",'NO INFO', inplace=True)
    df['city'].replace("",'NO INFO', inplace=True)
    df['State'].replace("",'NO INFO', inplace=True)
    df['country'].replace("",'NO INFO', inplace=True)
    df['user_name'].replace("",'NO INFO', inplace=True)
    df['city'].fillna("NO INFO", inplace=True)
    df['city'].replace("NULL","NO INFO", inplace=True)
    df['State'].fillna("NO INFO", inplace=True)
    df['State'].replace("NULL","NO INFO", inplace=True)



    df['Created_date']=df['Created_date'].fillna(0)
    df['last_practice_date']=df['last_practice_date'].fillna('NO PRACTICE')
    df['Subscription_expire_date']=df['Subscription_expire_date'].fillna('No Info')

    data=[]
    for i,j,k,l,m,n,o,p,r,s in zip(df['user_name'].tolist(),df['EMAIL'].tolist(),df['school_name'].tolist(),df['country'].tolist(),df['State'].tolist(),df['city'].tolist(),df['Practice_Count'].tolist(),df['Created_date'].tolist(),df['last_practice_date'].tolist(),df['Subscription_expire_date'].tolist()):
        data.append([i,j,k,l,m,n,o,p,r,s])
    temp={"data":data}
    return json.dumps(temp)

    
    
    
    
@app.route('/districtschooltable/<districtid>')
def district_school_table(districtid):
    disdic={'5f2609807a1c0000950bb465':'Middleton - Cross Plains Area School District',
    '5f2609807a1c0000950bb475':'Agawam School district',
    '5f2609807a1c0000950bb481':'Alameda Unified School District',
    '5f2609807a1c0000950bb47a':'Alpine School District',
    '5f2609807a1c0000950bb47b':'Ann Arbor Public Schools',
    '5f2609807a1c0000950bb463':'Austin Independent School District',
    '5f59e4836451a9089d7d4007':'Belleville School District',
    '5f2609807a1c0000950bb46d':'Broward County Public Schools',
    '5f2609807a1c0000950bb46c':'Chico Unified School District',
    '5f2609807a1c0000950bb460':'Clarksville-Montgomery County School System',
    '5f2609807a1c0000950bb47f':'Community Consolidated School District 89',
    '5f2609807a1c0000950bb45c':'Comox Valley School District(sd71)',
    '5f2609807a1c0000950bb480':'Dell Texas',
    '5f7413ef9387fd71ce6387cb':'Douglas County School District',
    '5f895191609e08b76029f641':'Early learning Sarasota',
    '5f2609807a1c0000950bb462':'Englewood Cliffs Public Schools',
    '5f2609807a1c0000950bb461':'Englewood Public School District',
    '5f2609807a1c0000950bb45e':'Fairfield-Suisun Unified School District',
    '5f2609807a1c0000950bb47d':'Flint Public Schools',
    '5f2609807a1c0000950bb46b':'FundaciÃ³n La Puerta',
    '5f2609807a1c0000950bb450':'Goleta District',
    '5f2609807a1c0000950bb474':'Greenburgh-North Castle (GNC) Union Free School District',
    '5f2609807a1c0000950bb45f':'Griffin-Spalding County School System',
    '5f2609807a1c0000950bb476':'Hillsborough County',
    '5f2609807a1c0000950bb455':'Krum Independent School District',
    '5f2609807a1c0000950bb47e':'La Joya School District',
    '5f2609807a1c0000950bb467':'Lincolnshire Schools',
    '5f2609807a1c0000950bb45a':'LAUSD',
    '5f2609807a1c0000950bb482':'Massachusetts Institute of Technology',
    '5fb4efce4139b9d4c5a86a69':'Mt. Lebanon School District',
    '5fbcdf0ba84e48a64412a798':'Needham School District',
    '5f7c01fa9387fd71ce6387cc':'NYC - Queens South',
    '5f6994386451a9089d7d4009':'Ogden school district',
    '5f2609807a1c0000950bb472':'Oroville City Elementary School District',
    '5fd704da04a848e368de5dc6':'Oakland Unified School District',
    '5f8fcd33609e08b76029f644':'Paradise Unified School District',
    '5f2609807a1c0000950bb466':'Pinellas County Schools',
    '5f2609807a1c0000950bb471':'Racine Unified Schools',
    '5f6d7cbce6452eb06384db20':'Salt Lake City School District',
    '5f2609807a1c0000950bb478':'San Diego Unified School District',
    '5f2609807a1c0000950bb470':'San Leandro Unified School District',
    '5f2609807a1c0000950bb477':'Sarasota County',
    '5f2609807a1c0000950bb473':'Skillman Foundation',
    '5f2609807a1c0000950bb46a':'Springfield Public Schools',
    '5f2609807a1c0000950bb468':'Utah Board of Education',
    '5f698b826451a9089d7d4008':'Wayne Metro',
    '5f2609807a1c0000950bb45b':'Westfield Public School District',
    '5f2609807a1c0000950bb368':'Wichita Falls Independent School District',
    '5f2609807a1c0000950bb45d':'Youngstown',
    '5f2609807a1c0000950bb464':'Equity Education',
    '5f2609807a1c0000950bb469':'LSF -  Head Start',
    '5f2609807a1c0000950bb46e':'District 25 New York Schools',
    '5f2609807a1c0000950bb46f':'Paradise Schools',
    '5f2609807a1c0000950bb479':'Panorama Education',
    '5f2609807a1c0000950bb47c':'Hawaii Public Schools',
    '5f9aa5e526edbed399d56c92':'Hamilton-Wenham Regional School District',
    '5fe2e1ee4d0ca68d7baf889c':'LSF-Head Start',
    '5fe2e25d4d0ca68d7baf889d':'BGCA',
    '5fe318b14d0ca68d7baf889e':'BLUE',
    '5ffd8176469a86e28635f512':'Chula Vista Elementary School District',
    '6017ab3043ca9c39151838d4':'Oswego School District',
    '60239a84e57dc27613699d57':'Austin Independent School District',
    '6023a6d79e8e623753fc305c':'Boulder Valley School District',
    '6023a7019e8e623753fc305d':'Miami-Dade County Public Schools',
    '6023a7269e8e623753fc305e':'Fulton County School System',
    '6023a7499e8e623753fc305f':'Manatee County School District',
    '6023a76f9e8e623753fc3060':'San Jose Unified School District',
    '6023a7949e8e623753fc3061':'Wasatch County School District',
    '60473f8823e88e242074ebd2':'Champlain Valley School District'}
    
    username = urllib.parse.quote_plus('admin')
    password = urllib.parse.quote_plus('I#L@teST^m0NGO_2o20!')
    client = MongoClient("mongodb://%s:%s@34.214.24.229:27017/" % (username, password))
    db=client.compass 

    
    collection2=db.school_master
    collection=db.user_master
    collection1=db.audio_track_master
    collection3=db.subscription_master
    district=disdic[districtid]

    

    df2=DataFrame(list(collection.aggregate([{"$match":
         {'$and': [
#         {'ROLE_ID._id' :{'$ne':ObjectId("5f155b8a3b6800007900da2b")}},
                {"IS_DISABLED":{"$ne":"Y"}},
                  {"IS_BLOCKED":{"$ne":"Y"}},
                 {"INCOMPLETE_SIGNUP":{"$ne":"Y"}},
                { 'USER_NAME':{"$not":{"$regex":"test",'$options':'i'}}},
                { 'USER_NAME':{"$not":{"$regex":"1gen",'$options':'i'}}},
            {"schoolId._id":{"$in":db.school_master.distinct( "_id", { "IS_PORTAL": "Y" ,"CATEGORY":{'$regex':district, '$options':'i'}})}},


    # //               {'IS_ADMIN':'Y'},

                 {'EMAIL_ID':{'$ne':''}},
                 {'schoolId.NAME':{"$not":{"$regex":"test",'$options':'i'}}},
             {'schoolId.BLOCKED_BY_CAP':{'$exists':False}},
                           {'EMAIL_ID':{"$not":{"$regex":"test",'$options':'i'}}},
                             {'EMAIL_ID':{"$not":{"$regex":"1gen",'$options':'i'}}}]}},

            {'$group':{'_id':'$schoolId._id','ID':{'$addToSet':'$_id'},'school_name':{'$first':'$schoolId.NAME'},'date':{'$min':{"$dateToString": { "format": "%Y-%m-%d", "date":'$CREATED_DATE'}}},'country':{'$first':'$schoolId.COUNTRY'},
                      'State':{'$first':'$schoolId.STATE'},'city':{'$first':'$schoolId.CITY'}}},



            {'$project':{'_id':1,'usercount':{'$size':'$ID'},'Created_date':'$date','country':1,'State':1,'school_name':1,'city':1}},



  
                                            ])))


    df3 = DataFrame(list(collection1.aggregate([
    {"$match":
         {'$and': [
#              {'USER_ID.ROLE_ID._id' :{'$ne':ObjectId("5f155b8a3b6800007900da2b")}},
                {"USER_ID.IS_DISABLED":{"$ne":"Y"}},
                  {"USER_ID.IS_BLOCKED":{"$ne":"Y"}},
                 {"USER_ID.INCOMPLETE_SIGNUP":{"$ne":"Y"}},
                { 'USER_ID.USER_NAME':{"$not":{"$regex":"test",'$options':'i'}}},
                { 'USER_ID.USER_NAME':{"$not":{"$regex":"1gen",'$options':'i'}}},
    # //        
                 {'USER_ID.EMAIL_ID':{'$ne':''}},
    #                  
                 {'USER_ID.schoolId.NAME':{"$not":{"$regex":"test",'$options':'i'}}},
             {'USER_ID.schoolId.BLOCKED_BY_CAP':{'$exists':False}},
                           {'USER_ID.EMAIL_ID':{"$not":{"$regex":"test",'$options':'i'}}},
                             {'USER_ID.EMAIL_ID':{"$not":{"$regex":"1gen",'$options':'i'}}}]}},
            {'$group':{'_id':'$USER_ID.schoolId._id','ID':{'$sum':1},'NAME':{'$first':'$USER_ID.schoolId.NAME'},'last_practice_date':{'$max':{"$dateToString": { "format": "%Y-%m-%d", "date":'$MODIFIED_DATE'}}},'prog':{'$first':'$PROGRAM_AUDIO_ID.PROGRAM_ID.PROGRAM_NAME'}}},
                  {'$project':{'_id':1,'Practice_Count':'$ID','program':1,'last_practice_date':'$last_practice_date'}},
                   ])))
    df4 = DataFrame(list(collection3.aggregate([
    {"$match":
         {'$and': [
#              {'USER_ID.ROLE_ID._id' :{'$ne':ObjectId("5f155b8a3b6800007900da2b")}},
                {"USER_ID.IS_DISABLED":{"$ne":"Y"}},
                  {"USER_ID.IS_BLOCKED":{"$ne":"Y"}},
                 {"USER_ID.INCOMPLETE_SIGNUP":{"$ne":"Y"}},
                { 'USER_ID.USER_NAME':{"$not":{"$regex":"test",'$options':'i'}}},
                { 'USER_ID.USER_NAME':{"$not":{"$regex":"1gen",'$options':'i'}}},
    # //        
                 {'USER_ID.EMAIL_ID':{'$ne':''}},
    #                  
                 {'USER_ID.schoolId.NAME':{"$not":{"$regex":"test",'$options':'i'}}},
             {'USER_ID.schoolId.BLOCKED_BY_CAP':{'$exists':False}},
                           {'USER_ID.EMAIL_ID':{"$not":{"$regex":"test",'$options':'i'}}},
                             {'USER_ID.EMAIL_ID':{"$not":{"$regex":"1gen",'$options':'i'}}}]}},
            {'$group':{'_id':'$USER_ID.schoolId._id','subsdate':{'$max':{"$dateToString": { "format": "%Y-%m-%d", "date":'$SUBSCRIPTION_EXPIRE_DATE'}}}}},
                  {'$project':{'_id':1,'Practice_Count':'$ID','program':1,'Subscription_expire_date':'$subsdate'}},
                   ])))
    

    df5=pd.merge(df2,df3, how='left', on='_id')
    df=pd.merge(df5,df4, how='left', on='_id')
#     df=pd.merge(df6,df4, how='left', on='_id')
    df.rename(columns = { '_id': 'schoolid_'}, inplace = True)
#     df[["schoolid_", "schoolid"]]=df[["schoolid_", "schoolid"]].astype(str) 

    # df4.fillna(0)
#     print(df)
    df['school_name'].fillna("NO INFO", inplace=True)
    df['country'].fillna("NO INFO", inplace=True)
    df.Practice_Count=df.Practice_Count.fillna(0)
    df.Practice_Count=df.Practice_Count.astype('int64')
    df.usercount=df.usercount.fillna(0)
    df.usercount=df.usercount.astype('int64')   
    df['school_name'].replace("",'NO INFO', inplace=True)
    df['city'].replace("",'NO INFO', inplace=True)
    df['State'].replace("",'NO INFO', inplace=True)
    df['country'].replace("",'NO INFO', inplace=True)
    
    df['city'].fillna("NO INFO", inplace=True)
    df['city'].replace("NULL","NO INFO", inplace=True)
    df['State'].fillna("NO INFO", inplace=True)
    df['State'].replace("NULL","NO INFO", inplace=True)
   


    df['Created_date']=df['Created_date'].fillna(0)
    df['last_practice_date']=df['last_practice_date'].fillna('NO PRACTICE')
    df['Subscription_expire_date']=df['Subscription_expire_date'].fillna('No Info')

    data=[]
    for i,j,k,l,m,n,o,p,r in zip(df['school_name'].tolist(),df['country'].tolist(),df['State'].tolist(),df['city'].tolist(),df['Practice_Count'].tolist(),df['usercount'].tolist(),df['Created_date'].tolist(),df['last_practice_date'].tolist(),df['Subscription_expire_date'].tolist()):
        data.append([i,j,k,l,m,n,o,p,r])
    temp={"data":data}
    
    return json.dumps(temp)





@app.route('/districtheatmap/<districtid>')

def heat_district(districtid):
    disdic={'5f2609807a1c0000950bb465':'Middleton - Cross Plains Area School District',
    '5f2609807a1c0000950bb475':'Agawam School district',
    '5f2609807a1c0000950bb481':'Alameda Unified School District',
    '5f2609807a1c0000950bb47a':'Alpine School District',
    '5f2609807a1c0000950bb47b':'Ann Arbor Public Schools',
    '5f2609807a1c0000950bb463':'Austin Independent School District',
    '5f59e4836451a9089d7d4007':'Belleville School District',
    '5f2609807a1c0000950bb46d':'Broward County Public Schools',
    '5f2609807a1c0000950bb46c':'Chico Unified School District',
    '5f2609807a1c0000950bb460':'Clarksville-Montgomery County School System',
    '5f2609807a1c0000950bb47f':'Community Consolidated School District 89',
    '5f2609807a1c0000950bb45c':'Comox Valley School District(sd71)',
    '5f2609807a1c0000950bb480':'Dell Texas',
    '5f7413ef9387fd71ce6387cb':'Douglas County School District',
    '5f895191609e08b76029f641':'Early learning Sarasota',
    '5f2609807a1c0000950bb462':'Englewood Cliffs Public Schools',
    '5f2609807a1c0000950bb461':'Englewood Public School District',
    '5f2609807a1c0000950bb45e':'Fairfield-Suisun Unified School District',
    '5f2609807a1c0000950bb47d':'Flint Public Schools',
    '5f2609807a1c0000950bb46b':'FundaciÃ³n La Puerta',
    '5f2609807a1c0000950bb450':'Goleta District',
    '5f2609807a1c0000950bb474':'Greenburgh-North Castle (GNC) Union Free School District',
    '5f2609807a1c0000950bb45f':'Griffin-Spalding County School System',
    '5f2609807a1c0000950bb476':'Hillsborough County',
    '5f2609807a1c0000950bb455':'Krum Independent School District',
    '5f2609807a1c0000950bb47e':'La Joya School District',
    '5f2609807a1c0000950bb467':'Lincolnshire Schools',
    '5f2609807a1c0000950bb45a':'LAUSD',
    '5f2609807a1c0000950bb482':'Massachusetts Institute of Technology',
    '5fb4efce4139b9d4c5a86a69':'Mt. Lebanon School District',
    '5fbcdf0ba84e48a64412a798':'Needham School District',
    '5f7c01fa9387fd71ce6387cc':'NYC - Queens South',
    '5f6994386451a9089d7d4009':'Ogden school district',
    '5f2609807a1c0000950bb472':'Oroville City Elementary School District',
    '5fd704da04a848e368de5dc6':'Oakland Unified School District',
    '5f8fcd33609e08b76029f644':'Paradise Unified School District',
    '5f2609807a1c0000950bb466':'Pinellas County Schools',
    '5f2609807a1c0000950bb471':'Racine Unified Schools',
    '5f6d7cbce6452eb06384db20':'Salt Lake City School District',
    '5f2609807a1c0000950bb478':'San Diego Unified School District',
    '5f2609807a1c0000950bb470':'San Leandro Unified School District',
    '5f2609807a1c0000950bb477':'Sarasota County',
    '5f2609807a1c0000950bb473':'Skillman Foundation',
    '5f2609807a1c0000950bb46a':'Springfield Public Schools',
    '5f2609807a1c0000950bb468':'Utah Board of Education',
    '5f698b826451a9089d7d4008':'Wayne Metro',
    '5f2609807a1c0000950bb45b':'Westfield Public School District',
    '5f2609807a1c0000950bb368':'Wichita Falls Independent School District',
    '5f2609807a1c0000950bb45d':'Youngstown',
    '5f2609807a1c0000950bb464':'Equity Education',
    '5f2609807a1c0000950bb469':'LSF -  Head Start',
    '5f2609807a1c0000950bb46e':'District 25 New York Schools',
    '5f2609807a1c0000950bb46f':'Paradise Schools',
    '5f2609807a1c0000950bb479':'Panorama Education',
    '5f2609807a1c0000950bb47c':'Hawaii Public Schools',
    '5f9aa5e526edbed399d56c92':'Hamilton-Wenham Regional School District',
    '5fe2e1ee4d0ca68d7baf889c':'LSF-Head Start',
    '5fe2e25d4d0ca68d7baf889d':'BGCA',
    '5fe318b14d0ca68d7baf889e':'BLUE',
    '5ffd8176469a86e28635f512':'Chula Vista Elementary School District',
    '6017ab3043ca9c39151838d4':'Oswego School District',
    '60239a84e57dc27613699d57':'Austin Independent School District',
    '6023a6d79e8e623753fc305c':'Boulder Valley School District',
    '6023a7019e8e623753fc305d':'Miami-Dade County Public Schools',
    '6023a7269e8e623753fc305e':'Fulton County School System',
    '6023a7499e8e623753fc305f':'Manatee County School District',
    '6023a76f9e8e623753fc3060':'San Jose Unified School District',
    '6023a7949e8e623753fc3061':'Wasatch County School District',
    '60473f8823e88e242074ebd2':'Champlain Valley School District'}
    import collections
    username = urllib.parse.quote_plus('admin')
    password = urllib.parse.quote_plus('A_dM!n|#!_2o20')
    client = MongoClient("mongodb://%s:%s@44.234.88.150:27017/" % (username, password))
    db=client.compass 
    collection = db.audio_track_master
    collection2=db.user_master
    district=disdic[districtid]
    

    df=DataFrame(list(collection2.aggregate([{"$match":
             {'$and': [
                

                    {"IS_DISABLED":{"$ne":"Y"}},
                      {"IS_BLOCKED":{"$ne":"Y"}},
                     {"INCOMPLETE_SIGNUP":{"$ne":"Y"}},
                    { 'USER_NAME':{"$not":{"$regex":"test",'$options':'i'}}},
                    { 'USER_NAME':{"$not":{"$regex":"1gen",'$options':'i'}}},
                 
#                             {'DISTRICT_ID._id':{'$eq':ObjectId(""+districtid+"")}},

        # //               {'IS_ADMIN':'Y'},
    #                      {'DISTRICT_ID._id':{'$ne':None}},
                    {'schoolId._id':{'$ne':None}},
                     {'EMAIL_ID':{'$ne':''}},
                   {"schoolId._id":{"$in":db.school_master.distinct( "_id", { "IS_PORTAL": "Y" , "CATEGORY":{'$regex':district, '$options':'i'}})}},

#                   {'DISTRICT_ID.DISTRICT_NAME':'Broward County Public Schools'},
                     {'schoolId.NAME':{"$not":{"$regex":"test",'$options':'i'}}},
                 {'schoolId.BLOCKED_BY_CAP':{'$exists':False}},
                               {'EMAIL_ID':{"$not":{"$regex":"test",'$options':'i'}}},
                                 {'EMAIL_ID':{"$not":{"$regex":"1gen",'$options':'i'}}}]}},

                {'$group':{'_id':'$schoolId._id','ID':{'$addToSet':'$schoolId._id'}}},
                      {'$project':{'_id':1,'schools':'$ID'}},

                      ])))

    ids=list(df['_id'])
    
    
    df3=DataFrame(list(collection.aggregate([
{"$match":
    {'$and': [

#          {'USER_ID.ROLE_ID._id' :{'$eq':ObjectId("5f155b8a3b6800007900da2b")}},
        {"USER_ID.INCOMPLETE_SIGNUP":{"$ne":"Y"}},
{'USER_ID.schoolId._id':{'$in':ids}},
        


 {'MODIFIED_DATE':{'$gte':datetime.datetime(2020,1,1)}},]}},


        {'$group':{'_id':'$USER_ID.schoolId._id','uc':{'$addToSet':'$USER_ID._id'},'pc':{'$sum':1},'NAME':{'$first':'$USER_ID.schoolId.NAME'}}},
              {'$project':{'_id':1,'active_user_count':{'$size':'$uc'},'name':'$NAME','practice_count':'$pc'}},
    { '$sort' : { 'active_user_count' : -1} },
    {'$limit':30}])))
    top=list(df3['_id'])
#     print(df3)
#     df3.to_csv('file1.csv')
    df2=DataFrame(list(collection.aggregate([
    {"$match":
        {'$and': [
            
#              {'USER_ID.ROLE_ID._id' :{'$ne':ObjectId("5f155b8a3b6800007900da2b")}},
            {"USER_ID.INCOMPLETE_SIGNUP":{"$ne":"Y"}},
    {'USER_ID.schoolId._id':{'$in':top}},
    # {'USER_ID.ROLE_ID._id' :{'$eq':ObjectId("5f155b8a3b6800007900da2b")}},
  
     {'MODIFIED_DATE':{'$gte':datetime.datetime(2020,1,1)}},]}},


            {'$group':{'_id':{'school':'$USER_ID.schoolId._id','month':{'$month':'$MODIFIED_DATE'}},'uc':{'$addToSet':'$USER_ID._id'},'pc':{'$sum':1},'NAME':{'$first':'$USER_ID.schoolId.NAME'}}},
                  {'$project':{'_id':0,'school':'$_id.school','month':'$_id.month','active_user_count':{'$size':'$uc'},'name':'$NAME','practice_count':'$pc'}},
        { '$sort' : { 'name' : 1,'month'  :1} },


    # //               {'$count':'count'}
                  ])))
    # df2

    df1=df2
    df1=df1.sort_values(by=['name'], ascending=True)
    # x=df1[df1['NAME_DISTRICT']=="Belleville School District"]
    dislist=list(set(df1["name"]))
    # print(len(dislist))
    df2=df1[["name","month","active_user_count","practice_count"]]
    # print(df2)
    overall=pd.DataFrame(columns=["name","month","active_user_count","practice_count"])
    # overall
    result=[]
    for k in dislist:
    #     print(k)
        df45=df2[df2["name"]==k]
        df45.reset_index()
    #     print(df45)
        for i in range(1,13):
            if i in list(df45["month"]):
                pass
            else:
                a=max(list(df45.index))
                df45.loc[a+i] = [k] +[i]+[0]+[0]

  
        sorted_df =df45.sort_values(by=['month'], ascending=True)
    #     sorted_df1=sorted_df.reset_index()
        result.append(sorted_df)
        finaldf = pd.concat(result)
    #     finaldf=finaldf.sort_values(by=['name'])


    data={}
    for i in dislist:


        schoolname= finaldf[(finaldf.name ==i)].reset_index(drop = True)
        active_user_count = schoolname['active_user_count'].tolist()
        practice_count = schoolname['practice_count'].tolist()


        data[i] =active_user_count
    data=collections.OrderedDict(sorted(data.items()))
    data={'meanTemp':data}

    
    return json.dumps(data)

# --------
@app.route('/familydistrictheatmap/<districtid>')

def heat_district_family_active(districtid):
    disdic={'5f2609807a1c0000950bb465':'Middleton - Cross Plains Area School District',
    '5f2609807a1c0000950bb475':'Agawam School district',
    '5f2609807a1c0000950bb481':'Alameda Unified School District',
    '5f2609807a1c0000950bb47a':'Alpine School District',
    '5f2609807a1c0000950bb47b':'Ann Arbor Public Schools',
    '5f2609807a1c0000950bb463':'Austin Independent School District',
    '5f59e4836451a9089d7d4007':'Belleville School District',
    '5f2609807a1c0000950bb46d':'Broward County Public Schools',
    '5f2609807a1c0000950bb46c':'Chico Unified School District',
    '5f2609807a1c0000950bb460':'Clarksville-Montgomery County School System',
    '5f2609807a1c0000950bb47f':'Community Consolidated School District 89',
    '5f2609807a1c0000950bb45c':'Comox Valley School District(sd71)',
    '5f2609807a1c0000950bb480':'Dell Texas',
    '5f7413ef9387fd71ce6387cb':'Douglas County School District',
    '5f895191609e08b76029f641':'Early learning Sarasota',
    '5f2609807a1c0000950bb462':'Englewood Cliffs Public Schools',
    '5f2609807a1c0000950bb461':'Englewood Public School District',
    '5f2609807a1c0000950bb45e':'Fairfield-Suisun Unified School District',
    '5f2609807a1c0000950bb47d':'Flint Public Schools',
    '5f2609807a1c0000950bb46b':'FundaciÃ³n La Puerta',
    '5f2609807a1c0000950bb450':'Goleta District',
    '5f2609807a1c0000950bb474':'Greenburgh-North Castle (GNC) Union Free School District',
    '5f2609807a1c0000950bb45f':'Griffin-Spalding County School System',
    '5f2609807a1c0000950bb476':'Hillsborough County',
    '5f2609807a1c0000950bb455':'Krum Independent School District',
    '5f2609807a1c0000950bb47e':'La Joya School District',
    '5f2609807a1c0000950bb467':'Lincolnshire Schools',
    '5f2609807a1c0000950bb45a':'LAUSD',
    '5f2609807a1c0000950bb482':'Massachusetts Institute of Technology',
    '5fb4efce4139b9d4c5a86a69':'Mt. Lebanon School District',
    '5fbcdf0ba84e48a64412a798':'Needham School District',
    '5f7c01fa9387fd71ce6387cc':'NYC - Queens South',
    '5f6994386451a9089d7d4009':'Ogden school district',
    '5f2609807a1c0000950bb472':'Oroville City Elementary School District',
    '5fd704da04a848e368de5dc6':'Oakland Unified School District',
    '5f8fcd33609e08b76029f644':'Paradise Unified School District',
    '5f2609807a1c0000950bb466':'Pinellas County Schools',
    '5f2609807a1c0000950bb471':'Racine Unified Schools',
    '5f6d7cbce6452eb06384db20':'Salt Lake City School District',
    '5f2609807a1c0000950bb478':'San Diego Unified School District',
    '5f2609807a1c0000950bb470':'San Leandro Unified School District',
    '5f2609807a1c0000950bb477':'Sarasota County',
    '5f2609807a1c0000950bb473':'Skillman Foundation',
    '5f2609807a1c0000950bb46a':'Springfield Public Schools',
    '5f2609807a1c0000950bb468':'Utah Board of Education',
    '5f698b826451a9089d7d4008':'Wayne Metro',
    '5f2609807a1c0000950bb45b':'Westfield Public School District',
    '5f2609807a1c0000950bb368':'Wichita Falls Independent School District',
    '5f2609807a1c0000950bb45d':'Youngstown',
    '5f2609807a1c0000950bb464':'Equity Education',
    '5f2609807a1c0000950bb469':'LSF -  Head Start',
    '5f2609807a1c0000950bb46e':'District 25 New York Schools',
    '5f2609807a1c0000950bb46f':'Paradise Schools',
    '5f2609807a1c0000950bb479':'Panorama Education',
    '5f2609807a1c0000950bb47c':'Hawaii Public Schools',
    '5f9aa5e526edbed399d56c92':'Hamilton-Wenham Regional School District',
    '5fe2e1ee4d0ca68d7baf889c':'LSF-Head Start',
    '5fe2e25d4d0ca68d7baf889d':'BGCA',
    '5fe318b14d0ca68d7baf889e':'BLUE',
    '5ffd8176469a86e28635f512':'Chula Vista Elementary School District',
    '6017ab3043ca9c39151838d4':'Oswego School District',
    '60239a84e57dc27613699d57':'Austin Independent School District',
    '6023a6d79e8e623753fc305c':'Boulder Valley School District',
    '6023a7019e8e623753fc305d':'Miami-Dade County Public Schools',
    '6023a7269e8e623753fc305e':'Fulton County School System',
    '6023a7499e8e623753fc305f':'Manatee County School District',
    '6023a76f9e8e623753fc3060':'San Jose Unified School District',
    '6023a7949e8e623753fc3061':'Wasatch County School District',
    '60473f8823e88e242074ebd2':'Champlain Valley School District'}
    import collections
    username = urllib.parse.quote_plus('admin')
    password = urllib.parse.quote_plus('A_dM!n|#!_2o20')
    client = MongoClient("mongodb://%s:%s@44.234.88.150:27017/" % (username, password))
    db=client.compass 
    collection = db.audio_track_master
    collection2=db.user_master
    district=disdic[districtid]

    
    df=DataFrame(list(collection2.aggregate([{"$match":
             {'$and': [
                

                    {"IS_DISABLED":{"$ne":"Y"}},
                      {"IS_BLOCKED":{"$ne":"Y"}},
                     {"INCOMPLETE_SIGNUP":{"$ne":"Y"}},
                    { 'USER_NAME':{"$not":{"$regex":"test",'$options':'i'}}},
                    { 'USER_NAME':{"$not":{"$regex":"1gen",'$options':'i'}}},
#                             {'DISTRICT_ID._id':{'$eq':ObjectId(""+districtid+"")}},

        # //               {'IS_ADMIN':'Y'},
    #                      {'DISTRICT_ID._id':{'$ne':None}},
                    {'schoolId._id':{'$ne':None}},
                 {"schoolId._id":{"$in":db.school_master.distinct( "_id", { "IS_PORTAL": "Y" , "CATEGORY":{'$regex':district, '$options':'i'}})}},
                     {'EMAIL_ID':{'$ne':''}},

#                   {'DISTRICT_ID.DISTRICT_NAME':'Broward County Public Schools'},
                     {'schoolId.NAME':{"$not":{"$regex":"test",'$options':'i'}}},
                 {'schoolId.BLOCKED_BY_CAP':{'$exists':False}},
                               {'EMAIL_ID':{"$not":{"$regex":"test",'$options':'i'}}},
                                 {'EMAIL_ID':{"$not":{"$regex":"1gen",'$options':'i'}}}]}},

                {'$group':{'_id':'$schoolId._id','ID':{'$addToSet':'$schoolId._id'}}},
                      {'$project':{'_id':1,'schools':'$ID'}},

                      ])))

    ids=list(df['_id'])
    
    
    df3=DataFrame(list(collection.aggregate([
{"$match":
    {'$and': [


        {"USER_ID.INCOMPLETE_SIGNUP":{"$ne":"Y"}},
{'USER_ID.schoolId._id':{'$in':ids}},


 {'MODIFIED_DATE':{'$gte':datetime.datetime(2020,1,1)}},]}},


        {'$group':{'_id':'$USER_ID.schoolId._id','uc':{'$addToSet':'$USER_ID._id'},'pc':{'$sum':1},'NAME':{'$first':'$USER_ID.schoolId.NAME'}}},
              {'$project':{'_id':1,'active_user_count':{'$size':'$uc'},'name':'$NAME','practice_count':'$pc'}},
    { '$sort' : { 'active_user_count' : -1} },
    {'$limit':30}])))
    top=list(df3['_id'])
#     print(df3)
#     df3.to_csv('file1.csv')
    df2=DataFrame(list(collection.aggregate([
    {"$match":
        {'$and': [
            
             {'USER_ID.ROLE_ID._id' :{'$eq':ObjectId("5f155b8a3b6800007900da2b")}},
            {"USER_ID.INCOMPLETE_SIGNUP":{"$ne":"Y"}},
    {'USER_ID.schoolId._id':{'$in':top}},
    # {'USER_ID.ROLE_ID._id' :{'$eq':ObjectId("5f155b8a3b6800007900da2b")}},
  
     {'MODIFIED_DATE':{'$gte':datetime.datetime(2020,3,17)}},]}},


            {'$group':{'_id':{'school':'$USER_ID.schoolId._id','month':{'$month':'$MODIFIED_DATE'}},'uc':{'$addToSet':'$USER_ID._id'},'pc':{'$sum':1},'NAME':{'$first':'$USER_ID.schoolId.NAME'}}},
                  {'$project':{'_id':0,'school':'$_id.school','month':'$_id.month','active_user_count':{'$size':'$uc'},'name':'$NAME','practice_count':'$pc'}},
        { '$sort' : { 'name' : 1,'month'  :1} },


    # //               {'$count':'count'}
                  ])))
    # df2

    df1=df2
    df1=df1.sort_values(by=['name'], ascending=True)
    # x=df1[df1['NAME_DISTRICT']=="Belleville School District"]
    dislist=list(set(df1["name"]))
    # print(len(dislist))
    df2=df1[["name","month","active_user_count","practice_count"]]
    # print(df2)
    overall=pd.DataFrame(columns=["name","month","active_user_count","practice_count"])
    # overall
    result=[]
    for k in dislist:
    #     print(k)
        df45=df2[df2["name"]==k]
        df45.reset_index()
    #     print(df45)
        for i in range(1,13):
            if i in list(df45["month"]):
                pass
            else:
                a=max(list(df45.index))
                df45.loc[a+i] = [k] +[i]+[0]+[0]
  
        sorted_df =df45.sort_values(by=['month'], ascending=True)
    #     sorted_df1=sorted_df.reset_index()
        result.append(sorted_df)
        finaldf = pd.concat(result)
    #     finaldf=finaldf.sort_values(by=['name'])


    data={}
    for i in dislist:


        schoolname= finaldf[(finaldf.name ==i)].reset_index(drop = True)
        active_user_count = schoolname['active_user_count'].tolist()
        practice_count = schoolname['practice_count'].tolist()


        data[i] =active_user_count
    data=collections.OrderedDict(sorted(data.items()))
    data={'meanTemp':data}

    
    return json.dumps(data)


#---
@app.route('/teachersdistrictheatmap/<districtid>')

def heat_district_teachers_active(districtid):
    disdic={'5f2609807a1c0000950bb465':'Middleton - Cross Plains Area School District',
    '5f2609807a1c0000950bb475':'Agawam School district',
    '5f2609807a1c0000950bb481':'Alameda Unified School District',
    '5f2609807a1c0000950bb47a':'Alpine School District',
    '5f2609807a1c0000950bb47b':'Ann Arbor Public Schools',
    '5f2609807a1c0000950bb463':'Austin Independent School District',
    '5f59e4836451a9089d7d4007':'Belleville School District',
    '5f2609807a1c0000950bb46d':'Broward County Public Schools',
    '5f2609807a1c0000950bb46c':'Chico Unified School District',
    '5f2609807a1c0000950bb460':'Clarksville-Montgomery County School System',
    '5f2609807a1c0000950bb47f':'Community Consolidated School District 89',
    '5f2609807a1c0000950bb45c':'Comox Valley School District(sd71)',
    '5f2609807a1c0000950bb480':'Dell Texas',
    '5f7413ef9387fd71ce6387cb':'Douglas County School District',
    '5f895191609e08b76029f641':'Early learning Sarasota',
    '5f2609807a1c0000950bb462':'Englewood Cliffs Public Schools',
    '5f2609807a1c0000950bb461':'Englewood Public School District',
    '5f2609807a1c0000950bb45e':'Fairfield-Suisun Unified School District',
    '5f2609807a1c0000950bb47d':'Flint Public Schools',
    '5f2609807a1c0000950bb46b':'FundaciÃ³n La Puerta',
    '5f2609807a1c0000950bb450':'Goleta District',
    '5f2609807a1c0000950bb474':'Greenburgh-North Castle (GNC) Union Free School District',
    '5f2609807a1c0000950bb45f':'Griffin-Spalding County School System',
    '5f2609807a1c0000950bb476':'Hillsborough County',
    '5f2609807a1c0000950bb455':'Krum Independent School District',
    '5f2609807a1c0000950bb47e':'La Joya School District',
    '5f2609807a1c0000950bb467':'Lincolnshire Schools',
    '5f2609807a1c0000950bb45a':'LAUSD',
    '5f2609807a1c0000950bb482':'Massachusetts Institute of Technology',
    '5fb4efce4139b9d4c5a86a69':'Mt. Lebanon School District',
    '5fbcdf0ba84e48a64412a798':'Needham School District',
    '5f7c01fa9387fd71ce6387cc':'NYC - Queens South',
    '5f6994386451a9089d7d4009':'Ogden school district',
    '5f2609807a1c0000950bb472':'Oroville City Elementary School District',
    '5fd704da04a848e368de5dc6':'Oakland Unified School District',
    '5f8fcd33609e08b76029f644':'Paradise Unified School District',
    '5f2609807a1c0000950bb466':'Pinellas County Schools',
    '5f2609807a1c0000950bb471':'Racine Unified Schools',
    '5f6d7cbce6452eb06384db20':'Salt Lake City School District',
    '5f2609807a1c0000950bb478':'San Diego Unified School District',
    '5f2609807a1c0000950bb470':'San Leandro Unified School District',
    '5f2609807a1c0000950bb477':'Sarasota County',
    '5f2609807a1c0000950bb473':'Skillman Foundation',
    '5f2609807a1c0000950bb46a':'Springfield Public Schools',
    '5f2609807a1c0000950bb468':'Utah Board of Education',
    '5f698b826451a9089d7d4008':'Wayne Metro',
    '5f2609807a1c0000950bb45b':'Westfield Public School District',
    '5f2609807a1c0000950bb368':'Wichita Falls Independent School District',
    '5f2609807a1c0000950bb45d':'Youngstown',
    '5f2609807a1c0000950bb464':'Equity Education',
    '5f2609807a1c0000950bb469':'LSF -  Head Start',
    '5f2609807a1c0000950bb46e':'District 25 New York Schools',
    '5f2609807a1c0000950bb46f':'Paradise Schools',
    '5f2609807a1c0000950bb479':'Panorama Education',
    '5f2609807a1c0000950bb47c':'Hawaii Public Schools',
    '5f9aa5e526edbed399d56c92':'Hamilton-Wenham Regional School District',
    '5fe2e1ee4d0ca68d7baf889c':'LSF-Head Start',
    '5fe2e25d4d0ca68d7baf889d':'BGCA',
    '5fe318b14d0ca68d7baf889e':'BLUE',
    '5ffd8176469a86e28635f512':'Chula Vista Elementary School District',
    '6017ab3043ca9c39151838d4':'Oswego School District',
    '60239a84e57dc27613699d57':'Austin Independent School District',
    '6023a6d79e8e623753fc305c':'Boulder Valley School District',
    '6023a7019e8e623753fc305d':'Miami-Dade County Public Schools',
    '6023a7269e8e623753fc305e':'Fulton County School System',
    '6023a7499e8e623753fc305f':'Manatee County School District',
    '6023a76f9e8e623753fc3060':'San Jose Unified School District',
    '6023a7949e8e623753fc3061':'Wasatch County School District',
    '60473f8823e88e242074ebd2':'Champlain Valley School District'}
    import collections
    username = urllib.parse.quote_plus('admin')
    password = urllib.parse.quote_plus('A_dM!n|#!_2o20')
    client = MongoClient("mongodb://%s:%s@44.234.88.150:27017/" % (username, password))
    db=client.compass 
    collection = db.audio_track_master
    collection2=db.user_master
    district=disdic[districtid]



    df=DataFrame(list(collection2.aggregate([{"$match":
             {'$and': [
                

                    {"IS_DISABLED":{"$ne":"Y"}},
                      {"IS_BLOCKED":{"$ne":"Y"}},
                     {"INCOMPLETE_SIGNUP":{"$ne":"Y"}},
                    { 'USER_NAME':{"$not":{"$regex":"test",'$options':'i'}}},
                    { 'USER_NAME':{"$not":{"$regex":"1gen",'$options':'i'}}},
#                             {'DISTRICT_ID._id':{'$eq':ObjectId(""+districtid+"")}},
                     {"schoolId._id":{"$in":db.school_master.distinct( "_id", { "IS_PORTAL": "Y" , "CATEGORY":{'$regex':district, '$options':'i'}})}},

        # //               {'IS_ADMIN':'Y'},
    #                      {'DISTRICT_ID._id':{'$ne':None}},
                    {'schoolId._id':{'$ne':None}},
                     {'EMAIL_ID':{'$ne':''}},

#                   {'DISTRICT_ID.DISTRICT_NAME':'Broward County Public Schools'},
                     {'schoolId.NAME':{"$not":{"$regex":"test",'$options':'i'}}},
                 {'schoolId.BLOCKED_BY_CAP':{'$exists':False}},
                               {'EMAIL_ID':{"$not":{"$regex":"test",'$options':'i'}}},
                                 {'EMAIL_ID':{"$not":{"$regex":"1gen",'$options':'i'}}}]}},

                {'$group':{'_id':'$schoolId._id','ID':{'$addToSet':'$schoolId._id'}}},
                      {'$project':{'_id':1,'schools':'$ID'}},

                      ])))

    ids=list(df['_id'])
    
    
    df3=DataFrame(list(collection.aggregate([
{"$match":
    {'$and': [

     
        {"USER_ID.INCOMPLETE_SIGNUP":{"$ne":"Y"}},
{'USER_ID.schoolId._id':{'$in':ids}},


 {'MODIFIED_DATE':{'$gte':datetime.datetime(2020,1,1)}},]}},


        {'$group':{'_id':'$USER_ID.schoolId._id','uc':{'$addToSet':'$USER_ID._id'},'pc':{'$sum':1},'NAME':{'$first':'$USER_ID.schoolId.NAME'}}},
              {'$project':{'_id':1,'active_user_count':{'$size':'$uc'},'name':'$NAME','practice_count':'$pc'}},
    { '$sort' : { 'active_user_count' : -1} },
    {'$limit':30}])))
    top=list(df3['_id'])
#     print(df3)
#     df3.to_csv('file1.csv')
    df2=DataFrame(list(collection.aggregate([
    {"$match":
        {'$and': [
            
                 {'USER_ID.ROLE_ID._id' :{'$ne':ObjectId("5f155b8a3b6800007900da2b")}},
            {"USER_ID.INCOMPLETE_SIGNUP":{"$ne":"Y"}},
    {'USER_ID.schoolId._id':{'$in':top}},
    # {'USER_ID.ROLE_ID._id' :{'$eq':ObjectId("5f155b8a3b6800007900da2b")}},
  
     {'MODIFIED_DATE':{'$gte':datetime.datetime(2020,1,1)}},]}},


            {'$group':{'_id':{'school':'$USER_ID.schoolId._id','month':{'$month':'$MODIFIED_DATE'}},'uc':{'$addToSet':'$USER_ID._id'},'pc':{'$sum':1},'NAME':{'$first':'$USER_ID.schoolId.NAME'}}},
                  {'$project':{'_id':0,'school':'$_id.school','month':'$_id.month','active_user_count':{'$size':'$uc'},'name':'$NAME','practice_count':'$pc'}},
        { '$sort' : { 'name' : 1,'month'  :1} },


    # //               {'$count':'count'}
                  ])))
    # df2

    df1=df2
    df1=df1.sort_values(by=['name'], ascending=True)
    # x=df1[df1['NAME_DISTRICT']=="Belleville School District"]
    dislist=list(set(df1["name"]))
    # print(len(dislist))
    df2=df1[["name","month","active_user_count","practice_count"]]
    # print(df2)
    overall=pd.DataFrame(columns=["name","month","active_user_count","practice_count"])
    # overall
    result=[]
    for k in dislist:
    #     print(k)
        df45=df2[df2["name"]==k]
        df45.reset_index()
    #     print(df45)
        for i in range(1,13):
            if i in list(df45["month"]):
                pass
            else:
                a=max(list(df45.index))
                df45.loc[a+i] = [k] +[i]+[0]+[0]

  
        sorted_df =df45.sort_values(by=['month'], ascending=True)
    #     sorted_df1=sorted_df.reset_index()
        result.append(sorted_df)
        finaldf = pd.concat(result)
    #     finaldf=finaldf.sort_values(by=['name'])


    data={}
    for i in dislist:


        schoolname= finaldf[(finaldf.name ==i)].reset_index(drop = True)
        active_user_count = schoolname['active_user_count'].tolist()
        practice_count = schoolname['practice_count'].tolist()


        data[i] =active_user_count
    data=collections.OrderedDict(sorted(data.items()))
    data={'meanTemp':data}

    
    return json.dumps(data)



@app.route('/districtheatmappracteacher/<districtid>')
def heat_district_teachers_prac(districtid):
    disdic={'5f2609807a1c0000950bb465':'Middleton - Cross Plains Area School District',
    '5f2609807a1c0000950bb475':'Agawam School district',
    '5f2609807a1c0000950bb481':'Alameda Unified School District',
    '5f2609807a1c0000950bb47a':'Alpine School District',
    '5f2609807a1c0000950bb47b':'Ann Arbor Public Schools',
    '5f2609807a1c0000950bb463':'Austin Independent School District',
    '5f59e4836451a9089d7d4007':'Belleville School District',
    '5f2609807a1c0000950bb46d':'Broward County Public Schools',
    '5f2609807a1c0000950bb46c':'Chico Unified School District',
    '5f2609807a1c0000950bb460':'Clarksville-Montgomery County School System',
    '5f2609807a1c0000950bb47f':'Community Consolidated School District 89',
    '5f2609807a1c0000950bb45c':'Comox Valley School District(sd71)',
    '5f2609807a1c0000950bb480':'Dell Texas',
    '5f7413ef9387fd71ce6387cb':'Douglas County School District',
    '5f895191609e08b76029f641':'Early learning Sarasota',
    '5f2609807a1c0000950bb462':'Englewood Cliffs Public Schools',
    '5f2609807a1c0000950bb461':'Englewood Public School District',
    '5f2609807a1c0000950bb45e':'Fairfield-Suisun Unified School District',
    '5f2609807a1c0000950bb47d':'Flint Public Schools',
    '5f2609807a1c0000950bb46b':'FundaciÃ³n La Puerta',
    '5f2609807a1c0000950bb450':'Goleta District',
    '5f2609807a1c0000950bb474':'Greenburgh-North Castle (GNC) Union Free School District',
    '5f2609807a1c0000950bb45f':'Griffin-Spalding County School System',
    '5f2609807a1c0000950bb476':'Hillsborough County',
    '5f2609807a1c0000950bb455':'Krum Independent School District',
    '5f2609807a1c0000950bb47e':'La Joya School District',
    '5f2609807a1c0000950bb467':'Lincolnshire Schools',
    '5f2609807a1c0000950bb45a':'LAUSD',
    '5f2609807a1c0000950bb482':'Massachusetts Institute of Technology',
    '5fb4efce4139b9d4c5a86a69':'Mt. Lebanon School District',
    '5fbcdf0ba84e48a64412a798':'Needham School District',
    '5f7c01fa9387fd71ce6387cc':'NYC - Queens South',
    '5f6994386451a9089d7d4009':'Ogden school district',
    '5f2609807a1c0000950bb472':'Oroville City Elementary School District',
    '5fd704da04a848e368de5dc6':'Oakland Unified School District',
    '5f8fcd33609e08b76029f644':'Paradise Unified School District',
    '5f2609807a1c0000950bb466':'Pinellas County Schools',
    '5f2609807a1c0000950bb471':'Racine Unified Schools',
    '5f6d7cbce6452eb06384db20':'Salt Lake City School District',
    '5f2609807a1c0000950bb478':'San Diego Unified School District',
    '5f2609807a1c0000950bb470':'San Leandro Unified School District',
    '5f2609807a1c0000950bb477':'Sarasota County',
    '5f2609807a1c0000950bb473':'Skillman Foundation',
    '5f2609807a1c0000950bb46a':'Springfield Public Schools',
    '5f2609807a1c0000950bb468':'Utah Board of Education',
    '5f698b826451a9089d7d4008':'Wayne Metro',
    '5f2609807a1c0000950bb45b':'Westfield Public School District',
    '5f2609807a1c0000950bb368':'Wichita Falls Independent School District',
    '5f2609807a1c0000950bb45d':'Youngstown',
    '5f2609807a1c0000950bb464':'Equity Education',
    '5f2609807a1c0000950bb469':'LSF -  Head Start',
    '5f2609807a1c0000950bb46e':'District 25 New York Schools',
    '5f2609807a1c0000950bb46f':'Paradise Schools',
    '5f2609807a1c0000950bb479':'Panorama Education',
    '5f2609807a1c0000950bb47c':'Hawaii Public Schools',
    '5f9aa5e526edbed399d56c92':'Hamilton-Wenham Regional School District',
    '5fe2e1ee4d0ca68d7baf889c':'LSF-Head Start',
    '5fe2e25d4d0ca68d7baf889d':'BGCA',
    '5fe318b14d0ca68d7baf889e':'BLUE',
    '5ffd8176469a86e28635f512':'Chula Vista Elementary School District',
    '6017ab3043ca9c39151838d4':'Oswego School District',
    '60239a84e57dc27613699d57':'Austin Independent School District',
    '6023a6d79e8e623753fc305c':'Boulder Valley School District',
    '6023a7019e8e623753fc305d':'Miami-Dade County Public Schools',
    '6023a7269e8e623753fc305e':'Fulton County School System',
    '6023a7499e8e623753fc305f':'Manatee County School District',
    '6023a76f9e8e623753fc3060':'San Jose Unified School District',
    '6023a7949e8e623753fc3061':'Wasatch County School District',
    '60473f8823e88e242074ebd2':'Champlain Valley School District'}
    import collections
    username = urllib.parse.quote_plus('admin')
    password = urllib.parse.quote_plus('A_dM!n|#!_2o20')
    client = MongoClient("mongodb://%s:%s@44.234.88.150:27017/" % (username, password))
    db=client.compass 
    collection = db.audio_track_master
    collection2=db.user_master
    district=disdic[districtid]


    df=DataFrame(list(collection2.aggregate([{"$match":
             {'$and': [
                

                    {"IS_DISABLED":{"$ne":"Y"}},
                      {"IS_BLOCKED":{"$ne":"Y"}},
                     {"INCOMPLETE_SIGNUP":{"$ne":"Y"}},
                    { 'USER_NAME':{"$not":{"$regex":"test",'$options':'i'}}},
                    { 'USER_NAME':{"$not":{"$regex":"1gen",'$options':'i'}}},
#                             {'DISTRICT_ID._id':{'$eq':ObjectId(""+districtid+"")}},
                     {"schoolId._id":{"$in":db.school_master.distinct( "_id", { "IS_PORTAL": "Y" , "CATEGORY":{'$regex':district, '$options':'i'}})}},

        # //               {'IS_ADMIN':'Y'},
    #                      {'DISTRICT_ID._id':{'$ne':None}},
                    {'schoolId._id':{'$ne':None}},
                     {'EMAIL_ID':{'$ne':''}},

#                   {'DISTRICT_ID.DISTRICT_NAME':'Broward County Public Schools'},
                     {'schoolId.NAME':{"$not":{"$regex":"test",'$options':'i'}}},
                 {'schoolId.BLOCKED_BY_CAP':{'$exists':False}},
                               {'EMAIL_ID':{"$not":{"$regex":"test",'$options':'i'}}},
                                 {'EMAIL_ID':{"$not":{"$regex":"1gen",'$options':'i'}}}]}},

                {'$group':{'_id':'$schoolId._id','ID':{'$addToSet':'$schoolId._id'}}},
                      {'$project':{'_id':1,'schools':'$ID'}},

                      ])))

    ids=list(df['_id'])
    
    
    df3=DataFrame(list(collection.aggregate([
{"$match":
    {'$and': [

         
        {"USER_ID.INCOMPLETE_SIGNUP":{"$ne":"Y"}},
{'USER_ID.schoolId._id':{'$in':ids}},


 {'MODIFIED_DATE':{'$gte':datetime.datetime(2020,1,1)}},]}},


        {'$group':{'_id':'$USER_ID.schoolId._id','uc':{'$addToSet':'$USER_ID._id'},'pc':{'$sum':1},'NAME':{'$first':'$USER_ID.schoolId.NAME'}}},
              {'$project':{'_id':1,'active_user_count':{'$size':'$uc'},'name':'$NAME','practice_count':'$pc'}},
    { '$sort' : { 'active_user_count' : -1} },
    {'$limit':30}])))
    top=list(df3['_id'])
#     print(df3)
#     df3.to_csv('file1.csv')
    df2=DataFrame(list(collection.aggregate([
    {"$match":
        {'$and': [
            
             {'USER_ID.ROLE_ID._id' :{'$ne':ObjectId("5f155b8a3b6800007900da2b")}},
            {"USER_ID.INCOMPLETE_SIGNUP":{"$ne":"Y"}},
    {'USER_ID.schoolId._id':{'$in':top}},
    # {'USER_ID.ROLE_ID._id' :{'$eq':ObjectId("5f155b8a3b6800007900da2b")}},
  
     {'MODIFIED_DATE':{'$gte':datetime.datetime(2020,1,1)}},]}},


            {'$group':{'_id':{'school':'$USER_ID.schoolId._id','month':{'$month':'$MODIFIED_DATE'}},'uc':{'$addToSet':'$USER_ID._id'},'pc':{'$sum':1},'NAME':{'$first':'$USER_ID.schoolId.NAME'}}},
                  {'$project':{'_id':0,'school':'$_id.school','month':'$_id.month','active_user_count':{'$size':'$uc'},'name':'$NAME','practice_count':'$pc'}},
        { '$sort' : { 'name' : 1,'month'  :1} },


    # //               {'$count':'count'}
                  ])))
    # df2

    df1=df2
    df1=df1.sort_values(by=['name'], ascending=True)
    # x=df1[df1['NAME_DISTRICT']=="Belleville School District"]
    dislist=list(set(df1["name"]))
    # print(len(dislist))
    df2=df1[["name","month","active_user_count","practice_count"]]
    # print(df2)
    overall=pd.DataFrame(columns=["name","month","active_user_count","practice_count"])
    # overall
    result=[]
    for k in dislist:
    #     print(k)
        df45=df2[df2["name"]==k]
        df45.reset_index()
    #     print(df45)
        for i in range(1,13):
            if i in list(df45["month"]):
                pass
            else:
                a=max(list(df45.index))
                df45.loc[a+i] = [k] +[i]+[0]+[0]
  
        sorted_df =df45.sort_values(by=['month'], ascending=True)
    #     sorted_df1=sorted_df.reset_index()
        result.append(sorted_df)
        finaldf = pd.concat(result)
    #     finaldf=finaldf.sort_values(by=['name'])


    data={}
    for i in dislist:


        schoolname= finaldf[(finaldf.name ==i)].reset_index(drop = True)
        active_user_count = schoolname['active_user_count'].tolist()
        practice_count = schoolname['practice_count'].tolist()


        data[i] =practice_count
    data=collections.OrderedDict(sorted(data.items()))
    data={'meanTemp':data}

    
    return json.dumps(data)
# 


@app.route('/districtheatmappracfamily/<districtid>')
def heat_district_family_prac(districtid):
    disdic={'5f2609807a1c0000950bb465':'Middleton - Cross Plains Area School District',
    '5f2609807a1c0000950bb475':'Agawam School district',
    '5f2609807a1c0000950bb481':'Alameda Unified School District',
    '5f2609807a1c0000950bb47a':'Alpine School District',
    '5f2609807a1c0000950bb47b':'Ann Arbor Public Schools',
    '5f2609807a1c0000950bb463':'Austin Independent School District',
    '5f59e4836451a9089d7d4007':'Belleville School District',
    '5f2609807a1c0000950bb46d':'Broward County Public Schools',
    '5f2609807a1c0000950bb46c':'Chico Unified School District',
    '5f2609807a1c0000950bb460':'Clarksville-Montgomery County School System',
    '5f2609807a1c0000950bb47f':'Community Consolidated School District 89',
    '5f2609807a1c0000950bb45c':'Comox Valley School District(sd71)',
    '5f2609807a1c0000950bb480':'Dell Texas',
    '5f7413ef9387fd71ce6387cb':'Douglas County School District',
    '5f895191609e08b76029f641':'Early learning Sarasota',
    '5f2609807a1c0000950bb462':'Englewood Cliffs Public Schools',
    '5f2609807a1c0000950bb461':'Englewood Public School District',
    '5f2609807a1c0000950bb45e':'Fairfield-Suisun Unified School District',
    '5f2609807a1c0000950bb47d':'Flint Public Schools',
    '5f2609807a1c0000950bb46b':'FundaciÃ³n La Puerta',
    '5f2609807a1c0000950bb450':'Goleta District',
    '5f2609807a1c0000950bb474':'Greenburgh-North Castle (GNC) Union Free School District',
    '5f2609807a1c0000950bb45f':'Griffin-Spalding County School System',
    '5f2609807a1c0000950bb476':'Hillsborough County',
    '5f2609807a1c0000950bb455':'Krum Independent School District',
    '5f2609807a1c0000950bb47e':'La Joya School District',
    '5f2609807a1c0000950bb467':'Lincolnshire Schools',
    '5f2609807a1c0000950bb45a':'LAUSD',
    '5f2609807a1c0000950bb482':'Massachusetts Institute of Technology',
    '5fb4efce4139b9d4c5a86a69':'Mt. Lebanon School District',
    '5fbcdf0ba84e48a64412a798':'Needham School District',
    '5f7c01fa9387fd71ce6387cc':'NYC - Queens South',
    '5f6994386451a9089d7d4009':'Ogden school district',
    '5f2609807a1c0000950bb472':'Oroville City Elementary School District',
    '5fd704da04a848e368de5dc6':'Oakland Unified School District',
    '5f8fcd33609e08b76029f644':'Paradise Unified School District',
    '5f2609807a1c0000950bb466':'Pinellas County Schools',
    '5f2609807a1c0000950bb471':'Racine Unified Schools',
    '5f6d7cbce6452eb06384db20':'Salt Lake City School District',
    '5f2609807a1c0000950bb478':'San Diego Unified School District',
    '5f2609807a1c0000950bb470':'San Leandro Unified School District',
    '5f2609807a1c0000950bb477':'Sarasota County',
    '5f2609807a1c0000950bb473':'Skillman Foundation',
    '5f2609807a1c0000950bb46a':'Springfield Public Schools',
    '5f2609807a1c0000950bb468':'Utah Board of Education',
    '5f698b826451a9089d7d4008':'Wayne Metro',
    '5f2609807a1c0000950bb45b':'Westfield Public School District',
    '5f2609807a1c0000950bb368':'Wichita Falls Independent School District',
    '5f2609807a1c0000950bb45d':'Youngstown',
    '5f2609807a1c0000950bb464':'Equity Education',
    '5f2609807a1c0000950bb469':'LSF -  Head Start',
    '5f2609807a1c0000950bb46e':'District 25 New York Schools',
    '5f2609807a1c0000950bb46f':'Paradise Schools',
    '5f2609807a1c0000950bb479':'Panorama Education',
    '5f2609807a1c0000950bb47c':'Hawaii Public Schools',
    '5f9aa5e526edbed399d56c92':'Hamilton-Wenham Regional School District',
    '5fe2e1ee4d0ca68d7baf889c':'LSF-Head Start',
    '5fe2e25d4d0ca68d7baf889d':'BGCA',
    '5fe318b14d0ca68d7baf889e':'BLUE',
    '5ffd8176469a86e28635f512':'Chula Vista Elementary School District',
    '6017ab3043ca9c39151838d4':'Oswego School District',
    '60239a84e57dc27613699d57':'Austin Independent School District',
    '6023a6d79e8e623753fc305c':'Boulder Valley School District',
    '6023a7019e8e623753fc305d':'Miami-Dade County Public Schools',
    '6023a7269e8e623753fc305e':'Fulton County School System',
    '6023a7499e8e623753fc305f':'Manatee County School District',
    '6023a76f9e8e623753fc3060':'San Jose Unified School District',
    '6023a7949e8e623753fc3061':'Wasatch County School District',
    '60473f8823e88e242074ebd2':'Champlain Valley School District'}
    import collections
    username = urllib.parse.quote_plus('admin')
    password = urllib.parse.quote_plus('A_dM!n|#!_2o20')
    client = MongoClient("mongodb://%s:%s@44.234.88.150:27017/" % (username, password))
    db=client.compass 
    collection = db.audio_track_master
    collection2=db.user_master
    district=disdic[districtid]

   

    df=DataFrame(list(collection2.aggregate([{"$match":
             {'$and': [
                

                    {"IS_DISABLED":{"$ne":"Y"}},
                      {"IS_BLOCKED":{"$ne":"Y"}},
                     {"INCOMPLETE_SIGNUP":{"$ne":"Y"}},
                    { 'USER_NAME':{"$not":{"$regex":"test",'$options':'i'}}},
                    { 'USER_NAME':{"$not":{"$regex":"1gen",'$options':'i'}}},
#                             {'DISTRICT_ID._id':{'$eq':ObjectId(""+districtid+"")}},
                    {"schoolId._id":{"$in":db.school_master.distinct( "_id", { "IS_PORTAL": "Y" , "CATEGORY":{'$regex':district, '$options':'i'}})}},
        # //               {'IS_ADMIN':'Y'},
    #                      {'DISTRICT_ID._id':{'$ne':None}},
                    {'schoolId._id':{'$ne':None}},
                     {'EMAIL_ID':{'$ne':''}},

#                   {'DISTRICT_ID.DISTRICT_NAME':'Broward County Public Schools'},
                     {'schoolId.NAME':{"$not":{"$regex":"test",'$options':'i'}}},
                 {'schoolId.BLOCKED_BY_CAP':{'$exists':False}},
                               {'EMAIL_ID':{"$not":{"$regex":"test",'$options':'i'}}},
                                 {'EMAIL_ID':{"$not":{"$regex":"1gen",'$options':'i'}}}]}},

                {'$group':{'_id':'$schoolId._id','ID':{'$addToSet':'$schoolId._id'}}},
                      {'$project':{'_id':1,'schools':'$ID'}},

                      ])))

    ids=list(df['_id'])
    
    
    df3=DataFrame(list(collection.aggregate([
{"$match":
    {'$and': [

         
        {"USER_ID.INCOMPLETE_SIGNUP":{"$ne":"Y"}},
{'USER_ID.schoolId._id':{'$in':ids}},


 {'MODIFIED_DATE':{'$gte':datetime.datetime(2020,1,1)}},]}},


        {'$group':{'_id':'$USER_ID.schoolId._id','uc':{'$addToSet':'$USER_ID._id'},'pc':{'$sum':1},'NAME':{'$first':'$USER_ID.schoolId.NAME'}}},
              {'$project':{'_id':1,'active_user_count':{'$size':'$uc'},'name':'$NAME','practice_count':'$pc'}},
    { '$sort' : { 'active_user_count' : -1} },
    {'$limit':30}])))
    top=list(df3['_id'])
#     print(df3)
#     df3.to_csv('file1.csv')
    df2=DataFrame(list(collection.aggregate([
    {"$match":
        {'$and': [
            
             {'USER_ID.ROLE_ID._id' :{'$eq':ObjectId("5f155b8a3b6800007900da2b")}},
            {"USER_ID.INCOMPLETE_SIGNUP":{"$ne":"Y"}},
    {'USER_ID.schoolId._id':{'$in':top}},
    # {'USER_ID.ROLE_ID._id' :{'$eq':ObjectId("5f155b8a3b6800007900da2b")}},
  
     {'MODIFIED_DATE':{'$gte':datetime.datetime(2020,3,17)}},]}},


            {'$group':{'_id':{'school':'$USER_ID.schoolId._id','month':{'$month':'$MODIFIED_DATE'}},'uc':{'$addToSet':'$USER_ID._id'},'pc':{'$sum':1},'NAME':{'$first':'$USER_ID.schoolId.NAME'}}},
                  {'$project':{'_id':0,'school':'$_id.school','month':'$_id.month','active_user_count':{'$size':'$uc'},'name':'$NAME','practice_count':'$pc'}},
        { '$sort' : { 'name' : 1,'month'  :1} },


    # //               {'$count':'count'}
                  ])))
    # df2

    df1=df2
    df1=df1.sort_values(by=['name'], ascending=True)
    # x=df1[df1['NAME_DISTRICT']=="Belleville School District"]
    dislist=list(set(df1["name"]))
    # print(len(dislist))
    df2=df1[["name","month","active_user_count","practice_count"]]
    # print(df2)
    overall=pd.DataFrame(columns=["name","month","active_user_count","practice_count"])
    # overall
    result=[]
    for k in dislist:
    #     print(k)
        df45=df2[df2["name"]==k]
        df45.reset_index()
    #     print(df45)
        for i in range(1,13):
            if i in list(df45["month"]):
                pass
            else:
                a=max(list(df45.index))
                df45.loc[a+i] = [k] +[i]+[0]+[0]
  
        sorted_df =df45.sort_values(by=['month'], ascending=True)
    #     sorted_df1=sorted_df.reset_index()
        result.append(sorted_df)
        finaldf = pd.concat(result)
    #     finaldf=finaldf.sort_values(by=['name'])


    data={}
    for i in dislist:


        schoolname= finaldf[(finaldf.name ==i)].reset_index(drop = True)
        active_user_count = schoolname['active_user_count'].tolist()
        practice_count = schoolname['practice_count'].tolist()


        data[i] =practice_count
    data=collections.OrderedDict(sorted(data.items()))
    data={'meanTemp':data}

    
    return json.dumps(data)
#     


@app.route('/districtheatmappractice/<districtid>')

def heatmap_prac_district(districtid):
    disdic={'5f2609807a1c0000950bb465':'Middleton - Cross Plains Area School District',
    '5f2609807a1c0000950bb475':'Agawam School district',
    '5f2609807a1c0000950bb481':'Alameda Unified School District',
    '5f2609807a1c0000950bb47a':'Alpine School District',
    '5f2609807a1c0000950bb47b':'Ann Arbor Public Schools',
    '5f2609807a1c0000950bb463':'Austin Independent School District',
    '5f59e4836451a9089d7d4007':'Belleville School District',
    '5f2609807a1c0000950bb46d':'Broward County Public Schools',
    '5f2609807a1c0000950bb46c':'Chico Unified School District',
    '5f2609807a1c0000950bb460':'Clarksville-Montgomery County School System',
    '5f2609807a1c0000950bb47f':'Community Consolidated School District 89',
    '5f2609807a1c0000950bb45c':'Comox Valley School District(sd71)',
    '5f2609807a1c0000950bb480':'Dell Texas',
    '5f7413ef9387fd71ce6387cb':'Douglas County School District',
    '5f895191609e08b76029f641':'Early learning Sarasota',
    '5f2609807a1c0000950bb462':'Englewood Cliffs Public Schools',
    '5f2609807a1c0000950bb461':'Englewood Public School District',
    '5f2609807a1c0000950bb45e':'Fairfield-Suisun Unified School District',
    '5f2609807a1c0000950bb47d':'Flint Public Schools',
    '5f2609807a1c0000950bb46b':'FundaciÃ³n La Puerta',
    '5f2609807a1c0000950bb450':'Goleta District',
    '5f2609807a1c0000950bb474':'Greenburgh-North Castle (GNC) Union Free School District',
    '5f2609807a1c0000950bb45f':'Griffin-Spalding County School System',
    '5f2609807a1c0000950bb476':'Hillsborough County',
    '5f2609807a1c0000950bb455':'Krum Independent School District',
    '5f2609807a1c0000950bb47e':'La Joya School District',
    '5f2609807a1c0000950bb467':'Lincolnshire Schools',
    '5f2609807a1c0000950bb45a':'LAUSD',
    '5f2609807a1c0000950bb482':'Massachusetts Institute of Technology',
    '5fb4efce4139b9d4c5a86a69':'Mt. Lebanon School District',
    '5fbcdf0ba84e48a64412a798':'Needham School District',
    '5f7c01fa9387fd71ce6387cc':'NYC - Queens South',
    '5f6994386451a9089d7d4009':'Ogden school district',
    '5f2609807a1c0000950bb472':'Oroville City Elementary School District',
    '5fd704da04a848e368de5dc6':'Oakland Unified School District',
    '5f8fcd33609e08b76029f644':'Paradise Unified School District',
    '5f2609807a1c0000950bb466':'Pinellas County Schools',
    '5f2609807a1c0000950bb471':'Racine Unified Schools',
    '5f6d7cbce6452eb06384db20':'Salt Lake City School District',
    '5f2609807a1c0000950bb478':'San Diego Unified School District',
    '5f2609807a1c0000950bb470':'San Leandro Unified School District',
    '5f2609807a1c0000950bb477':'Sarasota County',
    '5f2609807a1c0000950bb473':'Skillman Foundation',
    '5f2609807a1c0000950bb46a':'Springfield Public Schools',
    '5f2609807a1c0000950bb468':'Utah Board of Education',
    '5f698b826451a9089d7d4008':'Wayne Metro',
    '5f2609807a1c0000950bb45b':'Westfield Public School District',
    '5f2609807a1c0000950bb368':'Wichita Falls Independent School District',
    '5f2609807a1c0000950bb45d':'Youngstown',
    '5f2609807a1c0000950bb464':'Equity Education',
    '5f2609807a1c0000950bb469':'LSF -  Head Start',
    '5f2609807a1c0000950bb46e':'District 25 New York Schools',
    '5f2609807a1c0000950bb46f':'Paradise Schools',
    '5f2609807a1c0000950bb479':'Panorama Education',
    '5f2609807a1c0000950bb47c':'Hawaii Public Schools',
    '5f9aa5e526edbed399d56c92':'Hamilton-Wenham Regional School District',
    '5fe2e1ee4d0ca68d7baf889c':'LSF-Head Start',
    '5fe2e25d4d0ca68d7baf889d':'BGCA',
    '5fe318b14d0ca68d7baf889e':'BLUE',
    '5ffd8176469a86e28635f512':'Chula Vista Elementary School District',
    '6017ab3043ca9c39151838d4':'Oswego School District',
    '60239a84e57dc27613699d57':'Austin Independent School District',
    '6023a6d79e8e623753fc305c':'Boulder Valley School District',
    '6023a7019e8e623753fc305d':'Miami-Dade County Public Schools',
    '6023a7269e8e623753fc305e':'Fulton County School System',
    '6023a7499e8e623753fc305f':'Manatee County School District',
    '6023a76f9e8e623753fc3060':'San Jose Unified School District',
    '6023a7949e8e623753fc3061':'Wasatch County School District',
    '60473f8823e88e242074ebd2':'Champlain Valley School District'}
    import collections
    username = urllib.parse.quote_plus('admin')
    password = urllib.parse.quote_plus('A_dM!n|#!_2o20')
    client = MongoClient("mongodb://%s:%s@44.234.88.150:27017/" % (username, password))
    db=client.compass 
    collection = db.audio_track_master
    collection2=db.user_master
    district=disdic[districtid]



    df=DataFrame(list(collection2.aggregate([{"$match":
             {'$and': [
                

                    {"IS_DISABLED":{"$ne":"Y"}},
                      {"IS_BLOCKED":{"$ne":"Y"}},
                     {"INCOMPLETE_SIGNUP":{"$ne":"Y"}},
                    { 'USER_NAME':{"$not":{"$regex":"test",'$options':'i'}}},
                    { 'USER_NAME':{"$not":{"$regex":"1gen",'$options':'i'}}},
#                             {'DISTRICT_ID._id':{'$eq':ObjectId(""+districtid+"")}},
                     {"schoolId._id":{"$in":db.school_master.distinct( "_id", { "IS_PORTAL": "Y" , "CATEGORY":{'$regex':district, '$options':'i'}})}},

        # //               {'IS_ADMIN':'Y'},
    #                      {'DISTRICT_ID._id':{'$ne':None}},
                    {'schoolId._id':{'$ne':None}},
                     {'EMAIL_ID':{'$ne':''}},

#                   {'DISTRICT_ID.DISTRICT_NAME':'Broward County Public Schools'},
                     {'schoolId.NAME':{"$not":{"$regex":"test",'$options':'i'}}},
                 {'schoolId.BLOCKED_BY_CAP':{'$exists':False}},
                               {'EMAIL_ID':{"$not":{"$regex":"test",'$options':'i'}}},
                                 {'EMAIL_ID':{"$not":{"$regex":"1gen",'$options':'i'}}}]}},

                {'$group':{'_id':'$schoolId._id','ID':{'$addToSet':'$schoolId._id'}}},
                      {'$project':{'_id':1,'schools':'$ID'}},

                      ])))

    ids=list(df['_id'])
    
    
    df3=DataFrame(list(collection.aggregate([
{"$match":
    {'$and': [

         
        {"USER_ID.INCOMPLETE_SIGNUP":{"$ne":"Y"}},
{'USER_ID.schoolId._id':{'$in':ids}},


 {'MODIFIED_DATE':{'$gte':datetime.datetime(2020,1,1)}},]}},


        {'$group':{'_id':'$USER_ID.schoolId._id','uc':{'$addToSet':'$USER_ID._id'},'pc':{'$sum':1},'NAME':{'$first':'$USER_ID.schoolId.NAME'}}},
              {'$project':{'_id':1,'active_user_count':{'$size':'$uc'},'name':'$NAME','practice_count':'$pc'}},
    { '$sort' : { 'active_user_count' : -1} },
    {'$limit':30}])))
    top=list(df3['_id'])
#     print(df3)
#     df3.to_csv('file1.csv')
    df2=DataFrame(list(collection.aggregate([
    {"$match":
        {'$and': [
            
#              {'USER_ID.ROLE_ID._id' :{'$eq':ObjectId("5f155b8a3b6800007900da2b")}},
            {"USER_ID.INCOMPLETE_SIGNUP":{"$ne":"Y"}},
    {'USER_ID.schoolId._id':{'$in':top}},
    # {'USER_ID.ROLE_ID._id' :{'$eq':ObjectId("5f155b8a3b6800007900da2b")}},
  
     {'MODIFIED_DATE':{'$gte':datetime.datetime(2020,1,1)}},]}},


            {'$group':{'_id':{'school':'$USER_ID.schoolId._id','month':{'$month':'$MODIFIED_DATE'}},'uc':{'$addToSet':'$USER_ID._id'},'pc':{'$sum':1},'NAME':{'$first':'$USER_ID.schoolId.NAME'}}},
                  {'$project':{'_id':0,'school':'$_id.school','month':'$_id.month','active_user_count':{'$size':'$uc'},'name':'$NAME','practice_count':'$pc'}},
        { '$sort' : { 'name' : 1,'month'  :1} },


    # //               {'$count':'count'}
                  ])))
    # df2

    df1=df2
    df1=df1.sort_values(by=['name'], ascending=True)
    # x=df1[df1['NAME_DISTRICT']=="Belleville School District"]
    dislist=list(set(df1["name"]))
    # print(len(dislist))
    df2=df1[["name","month","active_user_count","practice_count"]]
    # print(df2)
    overall=pd.DataFrame(columns=["name","month","active_user_count","practice_count"])
    # overall
    result=[]
    for k in dislist:
    #     print(k)
        df45=df2[df2["name"]==k]
        df45.reset_index()
    #     print(df45)
        for i in range(1,13):
            if i in list(df45["month"]):
                pass
            else:
                a=max(list(df45.index))
                df45.loc[a+i] = [k] +[i]+[0]+[0]
  
        sorted_df =df45.sort_values(by=['month'], ascending=True)
    #     sorted_df1=sorted_df.reset_index()
        result.append(sorted_df)
        finaldf = pd.concat(result)
    #     finaldf=finaldf.sort_values(by=['name'])


    data={}
    for i in dislist:


        schoolname= finaldf[(finaldf.name ==i)].reset_index(drop = True)
        active_user_count = schoolname['active_user_count'].tolist()
        practice_count = schoolname['practice_count'].tolist()


        data[i] =practice_count
    data=collections.OrderedDict(sorted(data.items()))
    data={'meanTemp':data}

    
    return json.dumps(data)    












# ===============================================================














@app.route('/portal_new_api/<smcategory>')
def portal_new_api(smcategory):    
    username = urllib.parse.quote_plus('admin')
    password = urllib.parse.quote_plus('A_dM!n|#!_2o20')
    client = MongoClient("mongodb://%s:%s@44.234.88.150:27017/" % (username, password))
    db=client.compass
    collection = db.school_master
    from bson.objectid import ObjectId
#     smcategory="Agawam School district"
    query=[{'$match':{'$and':[
    { 'CATEGORY':{"$regex":""+smcategory+"",'$options':'i'}},]
    }},
    {"$project":{"_id":0,
    "UMSCHOOLID":'$_id',
    "UMSCHOOLNAME":'$NAME',
    "is_paid":"$FULL_EXPERIENCE",
                }},
    ]
    merge11=list(collection.aggregate(query))

    overallum11=pd.DataFrame(merge11)
    collection = db.district_master
    queryt=[{'$match':{'$and':[
    { 'DISTRICT_NAME':{"$regex":""+smcategory+"",'$options':'i'}},]
    }},
    {"$project":{"_id":0,
    "to_school":'$TOTAL_SCHOOLS',
    
                }},
    ]
    merget=list(collection.aggregate(queryt))

    overallumt=pd.DataFrame(merget)
    discount=0
    try:
        discount=overallumt["to_school"][0]
    except:
        discount=0
#     print(overallum11,"helloooooooooooo1achsdkjcbsdkjcbsdku")
    # print(len(set(list(overallum11["UMSCHOOLID"]))),"school_count")
    lifetimelist=list(set(overallum11["UMSCHOOLID"]))
    total_school=len(lifetimelist)
    collection = db.user_master
    query=[{'$match':{'$and':[{
    "schoolId._id": {
    "$in":lifetimelist
    }   
    },
    { 'USER_NAME':{"$not":{"$regex":"test",'$options':'i'}}},
    {'EMAIL_ID':{"$not":{"$regex":"test",'$options':'i'}}},
    {'EMAIL_ID':{"$not":{"$regex":"1gen",'$options':'i'}}},
    {'INCOMPLETE_SIGNUP':{"$ne":'Y'}},
    {'IS_DISABLED':{"$ne":'Y'}},
    {'IS_BLOCKED':{"$ne":'Y'}},
    {'schoolId.BLOCKED_BY_CAP':{'$exists':0}},
    ]
    }},
    {"$project":{"_id":0,
    'ROLE':'$ROLE_ID.ROLE_NAME',
    'UMUSER_ID':'$_id',"USER_NAME":'$USER_NAME',
    "UMSCHOOLID":'$schoolId._id',
    "DISTRICT_NAME":"$DISTRICT_ID.DISTRICT_NAME",
                 "UMSCHOOLNAME":'$schoolId.NAME',
                }},
    ]
    merge1=list(collection.aggregate(query))
    overallum=pd.DataFrame(merge1)
#     print(overallum,"overallum")
    email=""
    schoolid=[]
    try:
        email=list(overallum["UMUSER_ID"])
        schoolid=list(overallum["UMSCHOOLID"])
    except:
        pass
    ################################sub_master################################
    collection = db.subscription_master
    qr=[
    {"$match":{"$and":[{'USER_ID._id':{"$in":email}},]}},
    {"$project":{"_id":0,
    'SMUSER_ID':'$USER_ID._id',
    "RENEWAL_DATE":"$SUBSCRIPTION_EXPIRE_DATE",
    }},]
    merge=[]
    overall=[]
    mergeddf=[]
    try:
        merge=list(collection.aggregate(qr))
        overall=pd.DataFrame(merge)
        mergeddf=pd.merge(overallum, overall, how='left', left_on='UMUSER_ID', right_on='SMUSER_ID')
    except:
        pass
    db=client.compass
    collection = db.audio_track_master
    qra=[
    {"$match":{'$and':[
        {'USER_ID.USER_NAME':{"$not":{"$regex":"test",'$options':'i'}}},
    {'USER_ID.EMAIL_ID':{"$not":{"$regex":"test",'$options':'i'}}},
    {'USER_ID.EMAIL_ID':{"$not":{"$regex":"1gen",'$options':'i'}}},
    {'USER_ID.USER_NAME':{'$not':{'$regex':'1gen', '$options':'i'}}},
    {'USER_ID.INCOMPLETE_SIGNUP':{"$ne":'Y'}}, 
    {'USER_ID.IS_BLOCKED':{"$ne":'Y'}}, 
    {'USER_ID.IS_DISABLED':{"$ne":'Y'}}, {'USER_ID.schoolId.NAME':{'$not':{'$regex':'test', '$options':'i'}}},
    {'USER_ID.schoolId._id':{'$in':schoolid}},
    ]}},
    {'$group':{'_id':'$USER_ID.schoolId._id', 
    'atdLastpractice':{'$max':'$MODIFIED_DATE'},
    'atdPracticecount':{'$sum':1},
    'atdTotal_Mindful_Minutes':{"$sum":{"$round":[{"$divide":[{"$subtract":['$CURSOR_END','$cursorStart']}, 60]},2]}}}}]
    merge110=[]
    atd=[]
    mmm=0
    try:
        merge110=list(collection.aggregate(qra))
        atd=pd.DataFrame(merge110)
        mmm=str(round(sum(atd["atdTotal_Mindful_Minutes"])))
        finalmerge=pd.merge(mergeddf, atd, how='left', left_on='UMSCHOOLID', right_on='_id')
        finaldata=finalmerge[["DISTRICT_NAME","UMSCHOOLID","UMSCHOOLNAME","UMUSER_ID","ROLE","atdLastpractice","RENEWAL_DATE","atdPracticecount"]]
        finaldata["atdPracticecount"] = finaldata['atdPracticecount'].fillna(0)
        finaldata["atdPracticecount"] = finaldata['atdPracticecount'].astype('int')
        finaldata["atdPracticecount"] = finaldata['atdPracticecount'].astype('str')
    except:
        pass
#     print(finaldata)
    usercount=0
    try:
        usercount=len(finaldata[finaldata["ROLE"]=='user'])
    except:
        pass
    familycount=0
    try:
        familycount=len(finaldata[finaldata["ROLE"]=='PRESENT'])
    except:
        pass

    data2=[]
    totschnew=0
    try:
        totschnew=len(overallum11[overallum11["is_paid"]=="Y"])
        
    except:
        pass
    try:
        overallum11["is_paid"].fillna("N",inplace=True)
    except:
        overallum11["is_paid"]="N"
    overallum11["UMSCHOOLID"] = overallum11["UMSCHOOLID"].astype('str')
    overallum11=overallum11.sort_values(by=['UMSCHOOLNAME'], ascending=True)
    overallum11=overallum11.reset_index()
    
    
    # print(overallum11)
    for i in range(len(overallum11)):
        data2.append({"school_id":overallum11["UMSCHOOLID"][i],"school_name":overallum11["UMSCHOOLNAME"][i],"is_paid":overallum11["is_paid"][i]})
    finaldata={"data":data2,"total_school_district":discount,"total_school":totschnew,"user_count":usercount,"family_count":familycount,"mindful_minutes":mmm}
    return json.dumps(finaldata)

@app.route('/bubbleoverall')
def buble_district():
    username = urllib.parse.quote_plus('admin')
    password = urllib.parse.quote_plus('A_dM!n|#!_2o20')
    client = MongoClient("mongodb://%s:%s@44.234.88.150:27017/" % (username, password))
    db=client.compass
    dateStr = "2020-01-01T00:00:00.000Z"
    myDatetime = dateutil.parser.parse(dateStr)
    collection = db.user_master
    qraaa=[
        {"$match":{'$and':[
        {'USER_NAME':{"$not":{"$regex":"test",'$options':'i'}}},
        {'EMAIL_ID':{"$not":{"$regex":"test",'$options':'i'}}},
        {'EMAIL_ID':{"$not":{"$regex":"1gen",'$options':'i'}}},
        {'USER_NAME':{'$not':{'$regex':'1gen', '$options':'i'}}},
        {'DISTRICT_ID.DISTRICT_NAME':{'$not':{'$regex':'test', '$options':'i'}}},
        {"schoolId._id":{"$in":db.school_master.distinct( "_id", { "IS_PORTAL": "Y" } )}},
        {'DISTRICT_ID':{'$exists':1}},
        {'INCOMPLETE_SIGNUP':{"$ne":'Y'}}, 
        {'CREATED_DATE':{"$gte":myDatetime}},
        {'ROLE_ID._id':{'$ne':ObjectId("5f155b8a3b6800007900da2b")}},
        {'IS_BLOCKED':{"$ne":'Y'}}, 
        {'IS_DISABLED':{"$ne":'Y'}}, {'schoolId.NAME':{'$not':{'$regex':'test', '$options':'i'}}},
        ]}},
        {'$group':{'_id':{"district":'$DISTRICT_ID._id',"month":{"$month": "$CREATED_DATE"}},
        'NAME_DISTRICT':{'$first':'$DISTRICT_ID.DISTRICT_NAME'},
        'usercount':{'$sum':1}}},
            {"$project":{"_id":0,"DISTRICT_ID":"$_id.district","MONTH":"$_id.month","NAME_DISTRICT":1,"usercount":1,
                        }}]
    merge11=list(collection.aggregate(qraaa))
    df1=pd.DataFrame(merge11)
    #######################################################
    db=client.compass
    dateStr = "2020-01-01T00:00:00.000Z"
    myDatetime = dateutil.parser.parse(dateStr)
    collection = db.user_master
    qra=[
        {"$match":{'$and':[
        {'USER_NAME':{"$not":{"$regex":"test",'$options':'i'}}},
        {'EMAIL_ID':{"$not":{"$regex":"test",'$options':'i'}}},
        {'EMAIL_ID':{"$not":{"$regex":"1gen",'$options':'i'}}},
        {'USER_NAME':{'$not':{'$regex':'1gen', '$options':'i'}}},
        {'DISTRICT_ID.DISTRICT_NAME':{'$not':{'$regex':'test', '$options':'i'}}},
        {"schoolId._id":{"$in":db.school_master.distinct( "_id", { "IS_PORTAL": "Y" } )}},
        {'DISTRICT_ID':{'$exists':1}},
        {'INCOMPLETE_SIGNUP':{"$ne":'Y'}}, 
        {'CREATED_DATE':{"$lt":myDatetime}},
        {'ROLE_ID._id':{'$ne':ObjectId("5f155b8a3b6800007900da2b")}},
        {'IS_BLOCKED':{"$ne":'Y'}}, 
        {'IS_DISABLED':{"$ne":'Y'}}, {'schoolId.NAME':{'$not':{'$regex':'test', '$options':'i'}}},
        ]}},
        {'$group':{'_id':{"district":'$DISTRICT_ID._id'},
        'NAME_DISTRICT':{'$first':'$DISTRICT_ID.DISTRICT_NAME'},
        'usercount':{'$sum':1}}},
            {"$project":{"_id":0,"DISTRICT_ID":"$_id.district","NAME_DISTRICT":1,"usercount":1,
                        }}]
    merge11233=list(collection.aggregate(qra))
    dfCV=pd.DataFrame(merge11233)
    #########################################################################
    df1=df1.sort_values(by=['NAME_DISTRICT'], ascending=True)
    x=df1[df1['NAME_DISTRICT']=="Belleville School District"]
    x["usercount"].sum()
    dislist=list(set(df1["NAME_DISTRICT"]))
    df2=df1[["NAME_DISTRICT","MONTH","usercount"]]
    overall=pd.DataFrame(columns=["NAME_DISTRICT","MONTH","usercount"])
    # dislist
    result=[]
    for k in dislist:
    #     print(k)
        df45=df2[df2["NAME_DISTRICT"]==k]
        df45.reset_index()
        for i in range(1,13):
            if i in list(df45["MONTH"]):
                pass
    #              print("month_present",i)
            else:
                df45.loc[i+len(df45)] = [k] +[i]+[0]
    #     df46=df45.groupby(['NAME_DISTRICT', 'MONTH']).reset_index()
        df46=df45.groupby(['NAME_DISTRICT', 'MONTH']).sum().groupby(level=0).cumsum().reset_index()
    #     print(df46)
        sorted_df =df46.sort_values(by=['MONTH'], ascending=True)
        sorted_df1=sorted_df.reset_index()
        result.append(sorted_df)
    buubleusercount = pd.concat(result)
    ######family ########
    username = urllib.parse.quote_plus('admin')
    password = urllib.parse.quote_plus('A_dM!n|#!_2o20')
    client = MongoClient("mongodb://%s:%s@44.234.88.150:27017/" % (username, password))
    db=client.compass
    dateStr = "2020-01-01T00:00:00.000Z"
    myDatetime = dateutil.parser.parse(dateStr)
    collection = db.user_master
    qraaa=[
        {"$match":{'$and':[
        {'USER_NAME':{"$not":{"$regex":"test",'$options':'i'}}},
        {'EMAIL_ID':{"$not":{"$regex":"test",'$options':'i'}}},
        {'EMAIL_ID':{"$not":{"$regex":"1gen",'$options':'i'}}},
        {'USER_NAME':{'$not':{'$regex':'1gen', '$options':'i'}}},
        {'DISTRICT_ID.DISTRICT_NAME':{'$not':{'$regex':'test', '$options':'i'}}},
        {"schoolId._id":{"$in":db.school_master.distinct( "_id", { "IS_PORTAL": "Y" } )}},
        {'DISTRICT_ID':{'$exists':1}},
        {'INCOMPLETE_SIGNUP':{"$ne":'Y'}}, 
        {'CREATED_DATE':{"$gte":myDatetime}},
        {'ROLE_ID._id':{'$eq':ObjectId("5f155b8a3b6800007900da2b")}},
        {'IS_BLOCKED':{"$ne":'Y'}}, 
        {'IS_DISABLED':{"$ne":'Y'}}, {'schoolId.NAME':{'$not':{'$regex':'test', '$options':'i'}}},
        ]}},
        {'$group':{'_id':{"district":'$DISTRICT_ID._id',"month":{"$month": "$CREATED_DATE"}},
        'NAME_DISTRICT':{'$first':'$DISTRICT_ID.DISTRICT_NAME'},
        'famcount':{'$sum':1}}},
            {"$project":{"_id":0,"DISTRICT_ID":"$_id.district","MONTH":"$_id.month","NAME_DISTRICT":1,"famcount":1,
                        }}]
    merge11=list(collection.aggregate(qraaa))
    df1=pd.DataFrame(merge11)
    #######################################################
    db=client.compass
    dateStr = "2020-01-01T00:00:00.000Z"
    myDatetime = dateutil.parser.parse(dateStr)
    collection = db.user_master
    qra=[
        {"$match":{'$and':[
        {'USER_NAME':{"$not":{"$regex":"test",'$options':'i'}}},
        {'EMAIL_ID':{"$not":{"$regex":"test",'$options':'i'}}},
        {'EMAIL_ID':{"$not":{"$regex":"1gen",'$options':'i'}}},
        {'USER_NAME':{'$not':{'$regex':'1gen', '$options':'i'}}},
        {'DISTRICT_ID.DISTRICT_NAME':{'$not':{'$regex':'test', '$options':'i'}}},
        {"schoolId._id":{"$in":db.school_master.distinct( "_id", { "IS_PORTAL": "Y" } )}},
        {'DISTRICT_ID':{'$exists':1}},
        {'INCOMPLETE_SIGNUP':{"$ne":'Y'}}, 
        {'CREATED_DATE':{"$lt":myDatetime}},
        {'ROLE_ID._id':{'$ne':ObjectId("5f155b8a3b6800007900da2b")}},
        {'IS_BLOCKED':{"$ne":'Y'}}, 
        {'IS_DISABLED':{"$ne":'Y'}}, {'schoolId.NAME':{'$not':{'$regex':'test', '$options':'i'}}},
        ]}},
        {'$group':{'_id':{"district":'$DISTRICT_ID._id'},
        'NAME_DISTRICT':{'$first':'$DISTRICT_ID.DISTRICT_NAME'},
        'usercount19':{'$sum':1}}},
            {"$project":{"_id":0,"DISTRICT_ID":"$_id.district","NAME_DISTRICT":1,"usercount19":1,
                        }}]
    merge11233=list(collection.aggregate(qra))
    dfCV=pd.DataFrame(merge11233)
    #########################################################################
    df1=df1.sort_values(by=['NAME_DISTRICT'], ascending=True)
    x=df1[df1['NAME_DISTRICT']=="Belleville School District"]
    x["famcount"].sum()
    dislist=list(set(df1["NAME_DISTRICT"]))
    df2=df1[["NAME_DISTRICT","MONTH","famcount"]]
    overall=pd.DataFrame(columns=["NAME_DISTRICT","MONTH","famcount"])
    # dislist
    result=[]
    for k in dislist:
    #     print(k)
        df45=df2[df2["NAME_DISTRICT"]==k]
        df45.reset_index()
        for i in range(1,13):
            if i in list(df45["MONTH"]):
                pass
    #              print("month_present",i)
            else:
                df45.loc[i+len(df45)] = [k] +[i]+[0]
    #     df46=df45.groupby(['NAME_DISTRICT', 'MONTH']).reset_index()
        df46=df45.groupby(['NAME_DISTRICT', 'MONTH']).sum().groupby(level=0).cumsum().reset_index()
    #     print(df46)
        sorted_df =df46.sort_values(by=['MONTH'], ascending=True)
        sorted_df1=sorted_df.reset_index()
        result.append(sorted_df)
    buublefamily = pd.concat(result)
    buubleusercount["idu"]=buubleusercount["NAME_DISTRICT"]+buubleusercount["MONTH"].map(str)
    buublefamily["idf"]=buublefamily["NAME_DISTRICT"]+buublefamily["MONTH"].map(str)
    mergeucfc=pd.merge(buubleusercount, buublefamily, how='left', left_on='idu', right_on='idf')
    mergeucfc=mergeucfc.fillna(0)
    mergeucfc1=pd.merge(mergeucfc, dfCV, how='left', left_on='NAME_DISTRICT_x', right_on='NAME_DISTRICT')
    mergeucfc12=mergeucfc1.fillna(0)
    mergeucfc12["totaluser"]=mergeucfc12["usercount"]+mergeucfc12["usercount19"]
    finmerge=mergeucfc12[["NAME_DISTRICT_x","MONTH_x","idu","totaluser","famcount"]]
    ###ACTIVE USER
    username = urllib.parse.quote_plus('admin')
    password = urllib.parse.quote_plus('A_dM!n|#!_2o20')
    client = MongoClient("mongodb://%s:%s@44.234.88.150:27017/" % (username, password))
    db=client.compass
    dateStr = "2020-01-01T00:00:00.000Z"
    myDatetime = dateutil.parser.parse(dateStr)
    collection = db.audio_track_master
    qra12=[
        {"$match":{'$and':[{'USER_ID.USER_NAME':{"$not":{"$regex":"test",'$options':'i'}}},
        {'USER_ID.EMAIL_ID':{"$not":{"$regex":"test",'$options':'i'}}},
        {'USER_ID.EMAIL_ID':{"$not":{"$regex":"1gen",'$options':'i'}}},
        {'USER_ID.USER_NAME':{'$not':{'$regex':'1gen', '$options':'i'}}},
        {'USER_ID.DISTRICT_ID.DISTRICT_NAME':{'$not':{'$regex':'test', '$options':'i'}}},
        {"USER_ID.schoolId._id":{"$in":db.school_master.distinct( "_id", { "IS_PORTAL": "Y" } )}},
        {'USER_ID.DISTRICT_ID':{'$exists':1}},
        {'USER_ID.INCOMPLETE_SIGNUP':{"$ne":'Y'}}, 
        {'MODIFIED_DATE':{"$gte":myDatetime}},
        {'USER_ID.ROLE_ID._id':{'$ne':ObjectId("5f155b8a3b6800007900da2b")}},
        {'USER_ID.IS_BLOCKED':{"$ne":'Y'}}, 
        {'USER_ID.IS_DISABLED':{"$ne":'Y'}}, {'USER_ID.schoolId.NAME':{'$not':{'$regex':'test', '$options':'i'}}},
        ]}},
        {'$group':{'_id':{"district":'$USER_ID.DISTRICT_ID._id',"year":{"$year": "$MODIFIED_DATE"},"month":{"$month": "$MODIFIED_DATE"}},
        'NAME_DISTRICT':{'$first':'$USER_ID.DISTRICT_ID.DISTRICT_NAME'},
        'PRACTICE':{'$sum':1},
        "ACTIVE_USER":{'$addToSet':"$USER_ID._id"},
        'Mindful_Minutes':{"$sum":{"$round":[{"$divide":[{"$subtract":['$CURSOR_END','$cursorStart']}, 60]},2]}}}},
            {"$project":{"_id":0,"DISTRICT_ID":"$_id.district","MONTH":"$_id.month","YEAR":"$_id.year","NAME_DISTRICT":1,"PRACTICE":1,"ACTIVE_USER":{"$size":"$ACTIVE_USER"},
                       "Mindful_Minutes":1 }}]
    merge121=list(collection.aggregate(qra12))
    df1=pd.DataFrame(merge121)
    df1=df1.sort_values(by=['NAME_DISTRICT'], ascending=True)
    # print(df1)
    # x=df1[df1['NAME_DISTRICT']=="Belleville School District"]
    dislist=list(set(df1["NAME_DISTRICT"]))
    df2=df1[["NAME_DISTRICT","MONTH","ACTIVE_USER"]]
    overall=pd.DataFrame(columns=["NAME_DISTRICT","MONTH","ACTIVE_USER"])
    result=[]
    for k in dislist:
    #     print(k)
        df45=df2[df2["NAME_DISTRICT"]==k]
        df45.reset_index()
        for i in range(1,13):
            if i in list(df45["MONTH"]):
                pass
    #              print("month_present",i)
            else:
                df45.loc[i+len(df45)] = [k] +[i]+[0]
    #     df46=df45.groupby(['NAME_DISTRICT', 'MONTH']).reset_index()
    #     df46=df45.groupby(['NAME_DISTRICT', 'MONTH']).sum().groupby(level=0).cumsum().reset_index()
    #     print(df46)
        sorted_df =df45.sort_values(by=['MONTH'], ascending=True)
        sorted_df1=sorted_df.reset_index()
        result.append(sorted_df)
    buubleactuser = pd.concat(result)
    buubleactuser["acuid"]=buubleactuser["NAME_DISTRICT"]+buubleactuser["MONTH"].map(str)
    # buubleactuser
    finmergeu=pd.merge(finmerge, buubleactuser, how='left', left_on='idu', right_on='acuid')
    ###ACTIVE FAMILY
    username = urllib.parse.quote_plus('admin')
    password = urllib.parse.quote_plus('A_dM!n|#!_2o20')
    client = MongoClient("mongodb://%s:%s@44.234.88.150:27017/" % (username, password))
    db=client.compass
    dateStr = "2020-01-01T00:00:00.000Z"
    myDatetime = dateutil.parser.parse(dateStr)
    collection = db.audio_track_master
    qra12=[
        {"$match":{'$and':[{'USER_ID.USER_NAME':{"$not":{"$regex":"test",'$options':'i'}}},
        {'USER_ID.EMAIL_ID':{"$not":{"$regex":"test",'$options':'i'}}},
        {'USER_ID.EMAIL_ID':{"$not":{"$regex":"1gen",'$options':'i'}}},
        {'USER_ID.USER_NAME':{'$not':{'$regex':'1gen', '$options':'i'}}},
        {'USER_ID.DISTRICT_ID.DISTRICT_NAME':{'$not':{'$regex':'test', '$options':'i'}}},
        {"USER_ID.schoolId._id":{"$in":db.school_master.distinct( "_id", { "IS_PORTAL": "Y" } )}},
        {'USER_ID.DISTRICT_ID':{'$exists':1}},
        {'USER_ID.INCOMPLETE_SIGNUP':{"$ne":'Y'}}, 
        {'MODIFIED_DATE':{"$gte":myDatetime}},
        {'USER_ID.ROLE_ID._id':ObjectId("5f155b8a3b6800007900da2b")},
        {'USER_ID.IS_BLOCKED':{"$ne":'Y'}}, 
        {'USER_ID.IS_DISABLED':{"$ne":'Y'}}, {'USER_ID.schoolId.NAME':{'$not':{'$regex':'test', '$options':'i'}}},
        ]}},
        {'$group':{'_id':{"district":'$USER_ID.DISTRICT_ID._id',"year":{"$year": "$MODIFIED_DATE"},"month":{"$month": "$MODIFIED_DATE"}},
        'NAME_DISTRICT':{'$first':'$USER_ID.DISTRICT_ID.DISTRICT_NAME'},
        'PRACTICE':{'$sum':1},
        "ACTIVE_FAM":{'$addToSet':"$USER_ID._id"},
        'Mindful_Minutes':{"$sum":{"$round":[{"$divide":[{"$subtract":['$CURSOR_END','$cursorStart']}, 60]},2]}}}},
            {"$project":{"_id":0,"DISTRICT_ID":"$_id.district","MONTH":"$_id.month","YEAR":"$_id.year","NAME_DISTRICT":1,"PRACTICE":1,"ACTIVE_FAM":{"$size":"$ACTIVE_FAM"},
                       "Mindful_Minutes":1 }}]
    merge121=list(collection.aggregate(qra12))
    df1=pd.DataFrame(merge121)
    df1=df1.sort_values(by=['NAME_DISTRICT'], ascending=True)
    # x=df1[df1['NAME_DISTRICT']=="Belleville School District"]
    dislist=list(set(df1["NAME_DISTRICT"]))
    df2=df1[["NAME_DISTRICT","MONTH","ACTIVE_FAM"]]
    overall=pd.DataFrame(columns=["NAME_DISTRICT","MONTH","ACTIVE_FAM"])
    result=[]
    for k in dislist:
    #     print(k)
        df45=df2[df2["NAME_DISTRICT"]==k]
        df45.reset_index()
        for i in range(1,13):
            if i in list(df45["MONTH"]):
                pass
    #              print("month_present",i)
            else:
                df45.loc[i+len(df45)] = [k] +[i]+[0]
    #     df46=df45.groupby(['NAME_DISTRICT', 'MONTH']).reset_index()
    #     df46=df45.groupby(['NAME_DISTRICT', 'MONTH']).sum().groupby(level=0).cumsum().reset_index()
    #     print(df46)
        sorted_df =df45.sort_values(by=['MONTH'], ascending=True)
        sorted_df1=sorted_df.reset_index()
        result.append(sorted_df)
    buubleactfam = pd.concat(result)
    buubleactfam["acuidf"]=buubleactfam["NAME_DISTRICT"]+buubleactfam["MONTH"].map(str)
    finmergeuf=pd.merge(finmergeu, buubleactfam, how='left', left_on='idu', right_on='acuidf')
    finmergeuf["USER ENGAGEMENT"]=round((finmergeuf["ACTIVE_USER"]/finmergeuf["totaluser"])*100)
    finmergeuf["FAMILY ENGAGEMENT"]=round((finmergeuf["ACTIVE_FAM"]/finmergeuf["famcount"])*100)
    finmergeufo=finmergeuf[["NAME_DISTRICT_x","MONTH_x","USER ENGAGEMENT","FAMILY ENGAGEMENT"]]
    finmergeufo=finmergeufo.fillna(0)
    finmergeufo=finmergeufo.loc[:,~finmergeufo.columns.duplicated()]
    username = urllib.parse.quote_plus('admin')
    password = urllib.parse.quote_plus('A_dM!n|#!_2o20')
    client = MongoClient("mongodb://%s:%s@44.234.88.150:27017/" % (username, password))
    db=client.compass
    # dateStr = "2020-01-01T00:00:00.000Z"
    myDatetime = dateutil.parser.parse(dateStr)
    collection = db.audio_track_master
    qra12=[
        {"$match":{'$and':[{'USER_ID.USER_NAME':{"$not":{"$regex":"test",'$options':'i'}}},
        {'USER_ID.EMAIL_ID':{"$not":{"$regex":"test",'$options':'i'}}},
        {'USER_ID.EMAIL_ID':{"$not":{"$regex":"1gen",'$options':'i'}}},
        {'USER_ID.USER_NAME':{'$not':{'$regex':'1gen', '$options':'i'}}},
        {'USER_ID.DISTRICT_ID.DISTRICT_NAME':{'$not':{'$regex':'test', '$options':'i'}}},
        {"USER_ID.schoolId._id":{"$in":db.school_master.distinct( "_id", { "IS_PORTAL": "Y" } )}},
        {'USER_ID.DISTRICT_ID':{'$exists':1}},
        {'USER_ID.INCOMPLETE_SIGNUP':{"$ne":'Y'}}, 
    #     {'MODIFIED_DATE':{"$gte":myDatetime}},
    #     {'USER_ID.ROLE_ID._id':ObjectId("5f155b8a3b6800007900da2b")},
        {'USER_ID.IS_BLOCKED':{"$ne":'Y'}}, 
        {'USER_ID.IS_DISABLED':{"$ne":'Y'}}, {'USER_ID.schoolId.NAME':{'$not':{'$regex':'test', '$options':'i'}}},
        ]}},
        {'$group':{'_id':{"district":'$USER_ID.DISTRICT_ID._id'},
        'NAME_DISTRICT':{'$first':'$USER_ID.DISTRICT_ID.DISTRICT_NAME'},
        'PRACTICE':{'$sum':1},
                  }},
            {"$project":{"_id":0,"DISTRICT_ID":"$_id.district","NAME_DISTRICT":1,"PRACTICE":1 }}]
    merge1211=list(collection.aggregate(qra12))
    df1111=pd.DataFrame(merge1211)
    df1111=df1111.sort_values(by=['NAME_DISTRICT'], ascending=True)
    DISPRACTO=df1111[["NAME_DISTRICT","PRACTICE"]]
    username = urllib.parse.quote_plus('admin')
    password = urllib.parse.quote_plus('A_dM!n|#!_2o20')
    client = MongoClient("mongodb://%s:%s@44.234.88.150:27017/" % (username, password))
    db=client.compass
    # dateStr = "2020-01-01T00:00:00.000Z"
    myDatetime = dateutil.parser.parse(dateStr)
    collection = db.user_master
    qra12=[
        {"$match":{'$and':[{'USER_NAME':{"$not":{"$regex":"test",'$options':'i'}}},
        {'EMAIL_ID':{"$not":{"$regex":"test",'$options':'i'}}},
        {'EMAIL_ID':{"$not":{"$regex":"1gen",'$options':'i'}}},
        {'USER_NAME':{'$not':{'$regex':'1gen', '$options':'i'}}},
        {'DISTRICT_ID.DISTRICT_NAME':{'$not':{'$regex':'test', '$options':'i'}}},
        {"schoolId._id":{"$in":db.school_master.distinct( "_id", { "IS_PORTAL": "Y" } )}},
        {'DISTRICT_ID':{'$exists':1}},
        {'INCOMPLETE_SIGNUP':{"$ne":'Y'}}, 
    #     {'MODIFIED_DATE':{"$gte":myDatetime}},
    #     {'ROLE_ID._id':ObjectId("5f155b8a3b6800007900da2b")},
        {'IS_BLOCKED':{"$ne":'Y'}}, 
        {'IS_DISABLED':{"$ne":'Y'}}, {'schoolId.NAME':{'$not':{'$regex':'test', '$options':'i'}}},
        ]}},
        {'$group':{'_id':{"district":'$DISTRICT_ID._id'},
        'NAME_DISTRICT':{'$first':'$DISTRICT_ID.DISTRICT_NAME'},
        "SCHOOL COUNT":{'$addToSet':"$schoolId._id"},
                  }},
            {"$project":{"_id":0,"DISTRICT_ID":"$_id.district","NAME_DISTRICT":1,"SCHOOL COUNT":{"$size":"$SCHOOL COUNT"} }}]
    merge1211=list(collection.aggregate(qra12))
    df1111=pd.DataFrame(merge1211)
    df1111=df1111.sort_values(by=['NAME_DISTRICT'], ascending=True)
    DISSCHOOL=df1111[["NAME_DISTRICT","SCHOOL COUNT"]]
    finmergeufosch=pd.merge(finmergeufo, DISSCHOOL, how='left', left_on='NAME_DISTRICT_x', right_on='NAME_DISTRICT')
    finmergeufoschprac=pd.merge(finmergeufosch, DISPRACTO, how='left', left_on='NAME_DISTRICT_x', right_on='NAME_DISTRICT')
    final_buuble_data=finmergeufoschprac[["NAME_DISTRICT_x","MONTH_x","USER ENGAGEMENT","FAMILY ENGAGEMENT","SCHOOL COUNT","PRACTICE"]]
    finaldata=final_buuble_data.rename(columns={"NAME_DISTRICT_x": "DISTRICT NAME", "MONTH_x": "MONTH"})
    finaldata=finaldata.loc[:,~finaldata.columns.duplicated()]
    finaldata.to_csv("bubblesuper.csv")
    import plotly.express as px
#     import pandas as pd
    df=pd.read_csv("bubblesuper.csv")
    df1=df.fillna(0)
    fig=px.scatter(df1, x="USER ENGAGEMENT", y="FAMILY ENGAGEMENT", animation_frame="MONTH", animation_group="DISTRICT NAME",
               size="PRACTICE", color="SCHOOL COUNT", hover_name="DISTRICT NAME",
    #            log_x = True,
               size_max=40, width=1000, height=700,range_x=[-25,105],range_y=[-25,105])
    fig=fig.update_yaxes(tick0=5, dtick=10)
    fig=fig.update_xaxes(tick0=5, dtick=10)
    fig_json = fig.to_json()
    return (fig_json)

    erge11233=list(collection.aggregate(qra))
    dfCV=pd.DataFrame(merge11233)
    #########################################################################
    df1=df1.sort_values(by=['NAME_DISTRICT'], ascending=True)
    x=df1[df1['NAME_DISTRICT']=="Belleville School District"]
    x["famcount"].sum()
    dislist=list(set(df1["NAME_DISTRICT"]))
    df2=df1[["NAME_DISTRICT","MONTH","famcount"]]
    overall=pd.DataFrame(columns=["NAME_DISTRICT","MONTH","famcount"])
    # dislist
    result=[]
    for k in dislist:
    #     print(k)
        df45=df2[df2["NAME_DISTRICT"]==k]
        df45.reset_index()
        for i in range(1,13):
            if i in list(df45["MONTH"]):
                pass
    #              print("month_present",i)
            else:
                df45.loc[i+len(df45)] = [k] +[i]+[0]
    #     df46=df45.groupby(['NAME_DISTRICT', 'MONTH']).reset_index()
        df46=df45.groupby(['NAME_DISTRICT', 'MONTH']).sum().groupby(level=0).cumsum().reset_index()
    #     print(df46)
        sorted_df =df46.sort_values(by=['MONTH'], ascending=True)
        sorted_df1=sorted_df.reset_index()
        result.append(sorted_df)
    buublefamily = pd.concat(result)
    buubleusercount["idu"]=buubleusercount["NAME_DISTRICT"]+buubleusercount["MONTH"].map(str)
    buublefamily["idf"]=buublefamily["NAME_DISTRICT"]+buublefamily["MONTH"].map(str)
    mergeucfc=pd.merge(buubleusercount, buublefamily, how='left', left_on='idu', right_on='idf')
    mergeucfc=mergeucfc.fillna(0)
    mergeucfc1=pd.merge(mergeucfc, dfCV, how='left', left_on='NAME_DISTRICT_x', right_on='NAME_DISTRICT')
    mergeucfc12=mergeucfc1.fillna(0)
    mergeucfc12["totaluser"]=mergeucfc12["usercount"]+mergeucfc12["usercount19"]
    finmerge=mergeucfc12[["NAME_DISTRICT_x","MONTH_x","idu","totaluser","famcount"]]
    ###ACTIVE USER
    username = urllib.parse.quote_plus('admin')
    password = urllib.parse.quote_plus('A_dM!n|#!_2o20')
    client = MongoClient("mongodb://%s:%s@44.234.88.150:27017/" % (username, password))
    db=client.compass
    dateStr = "2020-01-01T00:00:00.000Z"
    myDatetime = dateutil.parser.parse(dateStr)
    collection = db.audio_track_master
    qra12=[
        {"$match":{'$and':[{'USER_ID.USER_NAME':{"$not":{"$regex":"test",'$options':'i'}}},
        {'USER_ID.EMAIL_ID':{"$not":{"$regex":"test",'$options':'i'}}},
        {'USER_ID.EMAIL_ID':{"$not":{"$regex":"1gen",'$options':'i'}}},
        {'USER_ID.USER_NAME':{'$not':{'$regex':'1gen', '$options':'i'}}},
        {'USER_ID.DISTRICT_ID.DISTRICT_NAME':{'$not':{'$regex':'test', '$options':'i'}}},
        {"USER_ID.schoolId._id":{"$in":db.school_master.distinct( "_id", { "IS_PORTAL": "Y" } )}},
        {'USER_ID.DISTRICT_ID':{'$exists':1}},
        {'USER_ID.INCOMPLETE_SIGNUP':{"$ne":'Y'}}, 
        {'MODIFIED_DATE':{"$gte":myDatetime}},
        {'USER_ID.ROLE_ID._id':{'$ne':ObjectId("5f155b8a3b6800007900da2b")}},
        {'USER_ID.IS_BLOCKED':{"$ne":'Y'}}, 
        {'USER_ID.IS_DISABLED':{"$ne":'Y'}}, {'USER_ID.schoolId.NAME':{'$not':{'$regex':'test', '$options':'i'}}},
        ]}},
        {'$group':{'_id':{"district":'$USER_ID.DISTRICT_ID._id',"year":{"$year": "$MODIFIED_DATE"},"month":{"$month": "$MODIFIED_DATE"}},
        'NAME_DISTRICT':{'$first':'$USER_ID.DISTRICT_ID.DISTRICT_NAME'},
        'PRACTICE':{'$sum':1},
        "ACTIVE_USER":{'$addToSet':"$USER_ID._id"},
        'Mindful_Minutes':{"$sum":{"$round":[{"$divide":[{"$subtract":['$CURSOR_END','$cursorStart']}, 60]},2]}}}},
            {"$project":{"_id":0,"DISTRICT_ID":"$_id.district","MONTH":"$_id.month","YEAR":"$_id.year","NAME_DISTRICT":1,"PRACTICE":1,"ACTIVE_USER":{"$size":"$ACTIVE_USER"},
                       "Mindful_Minutes":1 }}]
    merge121=list(collection.aggregate(qra12))
    df1=pd.DataFrame(merge121)
    df1=df1.sort_values(by=['NAME_DISTRICT'], ascending=True)
    # print(df1)
    # x=df1[df1['NAME_DISTRICT']=="Belleville School District"]
    dislist=list(set(df1["NAME_DISTRICT"]))
    df2=df1[["NAME_DISTRICT","MONTH","ACTIVE_USER"]]
    overall=pd.DataFrame(columns=["NAME_DISTRICT","MONTH","ACTIVE_USER"])
    result=[]
    for k in dislist:
    #     print(k)
        df45=df2[df2["NAME_DISTRICT"]==k]
        df45.reset_index()
        for i in range(1,13):
            if i in list(df45["MONTH"]):
                pass
    #              print("month_present",i)
            else:
                df45.loc[i+len(df45)] = [k] +[i]+[0]
    #     df46=df45.groupby(['NAME_DISTRICT', 'MONTH']).reset_index()
    #     df46=df45.groupby(['NAME_DISTRICT', 'MONTH']).sum().groupby(level=0).cumsum().reset_index()
    #     print(df46)
        sorted_df =df45.sort_values(by=['MONTH'], ascending=True)
        sorted_df1=sorted_df.reset_index()
        result.append(sorted_df)
    buubleactuser = pd.concat(result)
    buubleactuser["acuid"]=buubleactuser["NAME_DISTRICT"]+buubleactuser["MONTH"].map(str)
    # buubleactuser
    finmergeu=pd.merge(finmerge, buubleactuser, how='left', left_on='idu', right_on='acuid')
    ###ACTIVE FAMILY
    username = urllib.parse.quote_plus('admin')
    password = urllib.parse.quote_plus('A_dM!n|#!_2o20')
    client = MongoClient("mongodb://%s:%s@44.234.88.150:27017/" % (username, password))
    db=client.compass
    dateStr = "2020-01-01T00:00:00.000Z"
    myDatetime = dateutil.parser.parse(dateStr)
    collection = db.audio_track_master
    qra12=[
        {"$match":{'$and':[{'USER_ID.USER_NAME':{"$not":{"$regex":"test",'$options':'i'}}},
        {'USER_ID.EMAIL_ID':{"$not":{"$regex":"test",'$options':'i'}}},
        {'USER_ID.EMAIL_ID':{"$not":{"$regex":"1gen",'$options':'i'}}},
        {'USER_ID.USER_NAME':{'$not':{'$regex':'1gen', '$options':'i'}}},
        {'USER_ID.DISTRICT_ID.DISTRICT_NAME':{'$not':{'$regex':'test', '$options':'i'}}},
        {"USER_ID.schoolId._id":{"$in":db.school_master.distinct( "_id", { "IS_PORTAL": "Y" } )}},
        {'USER_ID.DISTRICT_ID':{'$exists':1}},
        {'USER_ID.INCOMPLETE_SIGNUP':{"$ne":'Y'}}, 
        {'MODIFIED_DATE':{"$gte":myDatetime}},
        {'USER_ID.ROLE_ID._id':ObjectId("5f155b8a3b6800007900da2b")},
        {'USER_ID.IS_BLOCKED':{"$ne":'Y'}}, 
        {'USER_ID.IS_DISABLED':{"$ne":'Y'}}, {'USER_ID.schoolId.NAME':{'$not':{'$regex':'test', '$options':'i'}}},
        ]}},
        {'$group':{'_id':{"district":'$USER_ID.DISTRICT_ID._id',"year":{"$year": "$MODIFIED_DATE"},"month":{"$month": "$MODIFIED_DATE"}},
        'NAME_DISTRICT':{'$first':'$USER_ID.DISTRICT_ID.DISTRICT_NAME'},
        'PRACTICE':{'$sum':1},
        "ACTIVE_FAM":{'$addToSet':"$USER_ID._id"},
        'Mindful_Minutes':{"$sum":{"$round":[{"$divide":[{"$subtract":['$CURSOR_END','$cursorStart']}, 60]},2]}}}},
            {"$project":{"_id":0,"DISTRICT_ID":"$_id.district","MONTH":"$_id.month","YEAR":"$_id.year","NAME_DISTRICT":1,"PRACTICE":1,"ACTIVE_FAM":{"$size":"$ACTIVE_FAM"},
                       "Mindful_Minutes":1 }}]
    merge121=list(collection.aggregate(qra12))
    df1=pd.DataFrame(merge121)
    df1=df1.sort_values(by=['NAME_DISTRICT'], ascending=True)
    # x=df1[df1['NAME_DISTRICT']=="Belleville School District"]
    dislist=list(set(df1["NAME_DISTRICT"]))
    df2=df1[["NAME_DISTRICT","MONTH","ACTIVE_FAM"]]
    overall=pd.DataFrame(columns=["NAME_DISTRICT","MONTH","ACTIVE_FAM"])
    result=[]
    for k in dislist:
    #     print(k)
        df45=df2[df2["NAME_DISTRICT"]==k]
        df45.reset_index()
        for i in range(1,13):
            if i in list(df45["MONTH"]):
                pass
    #              print("month_present",i)
            else:
                df45.loc[i+len(df45)] = [k] +[i]+[0]
    #     df46=df45.groupby(['NAME_DISTRICT', 'MONTH']).reset_index()
    #     df46=df45.groupby(['NAME_DISTRICT', 'MONTH']).sum().groupby(level=0).cumsum().reset_index()
    #     print(df46)
        sorted_df =df45.sort_values(by=['MONTH'], ascending=True)
        sorted_df1=sorted_df.reset_index()
        result.append(sorted_df)
    buubleactfam = pd.concat(result)
    buubleactfam["acuidf"]=buubleactfam["NAME_DISTRICT"]+buubleactfam["MONTH"].map(str)
    finmergeuf=pd.merge(finmergeu, buubleactfam, how='left', left_on='idu', right_on='acuidf')
    finmergeuf["USER ENGAGEMENT"]=round((finmergeuf["ACTIVE_USER"]/finmergeuf["totaluser"])*100)
    finmergeuf["FAMILY ENGAGEMENT"]=round((finmergeuf["ACTIVE_FAM"]/finmergeuf["famcount"])*100)
    finmergeufo=finmergeuf[["NAME_DISTRICT_x","MONTH_x","USER ENGAGEMENT","FAMILY ENGAGEMENT"]]
    finmergeufo=finmergeufo.fillna(0)
    finmergeufo=finmergeufo.loc[:,~finmergeufo.columns.duplicated()]
    username = urllib.parse.quote_plus('admin')
    password = urllib.parse.quote_plus('A_dM!n|#!_2o20')
    client = MongoClient("mongodb://%s:%s@44.234.88.150:27017/" % (username, password))
    db=client.compass
    # dateStr = "2020-01-01T00:00:00.000Z"
    myDatetime = dateutil.parser.parse(dateStr)
    collection = db.audio_track_master
    qra12=[
        {"$match":{'$and':[{'USER_ID.USER_NAME':{"$not":{"$regex":"test",'$options':'i'}}},
        {'USER_ID.EMAIL_ID':{"$not":{"$regex":"test",'$options':'i'}}},
        {'USER_ID.EMAIL_ID':{"$not":{"$regex":"1gen",'$options':'i'}}},
        {'USER_ID.USER_NAME':{'$not':{'$regex':'1gen', '$options':'i'}}},
        {'USER_ID.DISTRICT_ID.DISTRICT_NAME':{'$not':{'$regex':'test', '$options':'i'}}},
        {"USER_ID.schoolId._id":{"$in":db.school_master.distinct( "_id", { "IS_PORTAL": "Y" } )}},
        {'USER_ID.DISTRICT_ID':{'$exists':1}},
        {'USER_ID.INCOMPLETE_SIGNUP':{"$ne":'Y'}}, 
    #     {'MODIFIED_DATE':{"$gte":myDatetime}},
    #     {'USER_ID.ROLE_ID._id':ObjectId("5f155b8a3b6800007900da2b")},
        {'USER_ID.IS_BLOCKED':{"$ne":'Y'}}, 
        {'USER_ID.IS_DISABLED':{"$ne":'Y'}}, {'USER_ID.schoolId.NAME':{'$not':{'$regex':'test', '$options':'i'}}},
        ]}},
        {'$group':{'_id':{"district":'$USER_ID.DISTRICT_ID._id'},
        'NAME_DISTRICT':{'$first':'$USER_ID.DISTRICT_ID.DISTRICT_NAME'},
        'PRACTICE':{'$sum':1},
                  }},
            {"$project":{"_id":0,"DISTRICT_ID":"$_id.district","NAME_DISTRICT":1,"PRACTICE":1 }}]
    merge1211=list(collection.aggregate(qra12))
    df1111=pd.DataFrame(merge1211)
    df1111=df1111.sort_values(by=['NAME_DISTRICT'], ascending=True)
    DISPRACTO=df1111[["NAME_DISTRICT","PRACTICE"]]
    username = urllib.parse.quote_plus('admin')
    password = urllib.parse.quote_plus('A_dM!n|#!_2o20')
    client = MongoClient("mongodb://%s:%s@44.234.88.150:27017/" % (username, password))
    db=client.compass
    # dateStr = "2020-01-01T00:00:00.000Z"
    myDatetime = dateutil.parser.parse(dateStr)
    collection = db.user_master
    qra12=[
        {"$match":{'$and':[{'USER_NAME':{"$not":{"$regex":"test",'$options':'i'}}},
        {'EMAIL_ID':{"$not":{"$regex":"test",'$options':'i'}}},
        {'EMAIL_ID':{"$not":{"$regex":"1gen",'$options':'i'}}},
        {'USER_NAME':{'$not':{'$regex':'1gen', '$options':'i'}}},
        {'DISTRICT_ID.DISTRICT_NAME':{'$not':{'$regex':'test', '$options':'i'}}},
        {"schoolId._id":{"$in":db.school_master.distinct( "_id", { "IS_PORTAL": "Y" } )}},
        {'DISTRICT_ID':{'$exists':1}},
        {'INCOMPLETE_SIGNUP':{"$ne":'Y'}}, 
    #     {'MODIFIED_DATE':{"$gte":myDatetime}},
    #     {'ROLE_ID._id':ObjectId("5f155b8a3b6800007900da2b")},
        {'IS_BLOCKED':{"$ne":'Y'}}, 
        {'IS_DISABLED':{"$ne":'Y'}}, {'schoolId.NAME':{'$not':{'$regex':'test', '$options':'i'}}},
        ]}},
        {'$group':{'_id':{"district":'$DISTRICT_ID._id'},
        'NAME_DISTRICT':{'$first':'$DISTRICT_ID.DISTRICT_NAME'},
        "SCHOOL COUNT":{'$addToSet':"$schoolId._id"},
                  }},
            {"$project":{"_id":0,"DISTRICT_ID":"$_id.district","NAME_DISTRICT":1,"SCHOOL COUNT":{"$size":"$SCHOOL COUNT"} }}]
    merge1211=list(collection.aggregate(qra12))
    df1111=pd.DataFrame(merge1211)
    df1111=df1111.sort_values(by=['NAME_DISTRICT'], ascending=True)
    DISSCHOOL=df1111[["NAME_DISTRICT","SCHOOL COUNT"]]
    finmergeufosch=pd.merge(finmergeufo, DISSCHOOL, how='left', left_on='NAME_DISTRICT_x', right_on='NAME_DISTRICT')
    finmergeufoschprac=pd.merge(finmergeufosch, DISPRACTO, how='left', left_on='NAME_DISTRICT_x', right_on='NAME_DISTRICT')
    final_buuble_data=finmergeufoschprac[["NAME_DISTRICT_x","MONTH_x","USER ENGAGEMENT","FAMILY ENGAGEMENT","SCHOOL COUNT","PRACTICE"]]
    finaldata=final_buuble_data.rename(columns={"NAME_DISTRICT_x": "DISTRICT_NAME","USER ENGAGEMENT":"USER_ENGAGEMENT","SCHOOL COUNT":"SCHOOL_COUNT", "FAMILY ENGAGEMENT":"FAMILY_ENGAGEMENT","MONTH_x": "MONTH"})
    finaldata=finaldata.loc[:,~finaldata.columns.duplicated()]
    # findict=finaldata.T.to_dict().values()
    # response = make_response(finaldata.to_csv())
    # response.headers['Content-Type'] = 'text/csv'
    li = [finaldata.columns.values.tolist()] + finaldata.values.tolist() 
    sheet = pe.Sheet(li)
    print(sheet,"sheet")
    print(type(sheet),"sheet type")
    ioO = io.StringIO()
    sheet.save_to_memory("csv", ioO)
    output = make_response(ioO.getvalue())
    # output.headers["Content-Disposition"] = "attachment; filename=export.csv"
    output.headers["Content-type"] = "text/csv"
    return output
    # return Response(finaldata.to_csv())
# py2.7, for python3, please use import io

# app = Flask(__name__)
@app.route('/bubble/<disid>/csv')
def schdistrict(disid):  
    disdic={'5f2609807a1c0000950bb465':'Middleton - Cross Plains Area School District',
    '5f2609807a1c0000950bb475':'Agawam School district',
    '5f2609807a1c0000950bb481':'Alameda Unified School District',
    '5f2609807a1c0000950bb47a':'Alpine School District',
    '5f2609807a1c0000950bb47b':'Ann Arbor Public Schools',
    '5f2609807a1c0000950bb463':'Austin Independent School District',
    '5f59e4836451a9089d7d4007':'Belleville School District',
    '5f2609807a1c0000950bb46d':'Broward County Public Schools',
    '5f2609807a1c0000950bb46c':'Chico Unified School District',
    '5f2609807a1c0000950bb460':'Clarksville-Montgomery County School System',
    '5f2609807a1c0000950bb47f':'Community Consolidated School District 89',
    '5f2609807a1c0000950bb45c':'Comox Valley School District(sd71)',
    '5f2609807a1c0000950bb480':'Dell Texas',
    '5f7413ef9387fd71ce6387cb':'Douglas County School District',
    '5f895191609e08b76029f641':'Early learning Sarasota',
    '5f2609807a1c0000950bb462':'Englewood Cliffs Public Schools',
    '5f2609807a1c0000950bb461':'Englewood Public School District',
    '5f2609807a1c0000950bb45e':'Fairfield-Suisun Unified School District',
    '5f2609807a1c0000950bb47d':'Flint Public Schools',
    '5f2609807a1c0000950bb46b':'FundaciÃ³n La Puerta',
    '5f2609807a1c0000950bb450':'Goleta District',
    '5f2609807a1c0000950bb474':'Greenburgh-North Castle (GNC) Union Free School District',
    '5f2609807a1c0000950bb45f':'Griffin-Spalding County School System',
    '5f2609807a1c0000950bb476':'Hillsborough County',
    '5f2609807a1c0000950bb455':'Krum Independent School District',
    '5f2609807a1c0000950bb47e':'La Joya School District',
    '5f2609807a1c0000950bb467':'Lincolnshire Schools',
    '5f2609807a1c0000950bb45a':'LAUSD',
    '5f2609807a1c0000950bb482':'Massachusetts Institute of Technology',
    '5fb4efce4139b9d4c5a86a69':'Mt. Lebanon School District',
    '5fbcdf0ba84e48a64412a798':'Needham School District',
    '5f7c01fa9387fd71ce6387cc':'NYC - Queens South',
    '5f6994386451a9089d7d4009':'Ogden school district',
    '5f2609807a1c0000950bb472':'Oroville City Elementary School District',
    '5fd704da04a848e368de5dc6':'Oakland Unified School District',
    '5f8fcd33609e08b76029f644':'Paradise Unified School District',
    '5f2609807a1c0000950bb466':'Pinellas County Schools',
    '5f2609807a1c0000950bb471':'Racine Unified Schools',
    '5f6d7cbce6452eb06384db20':'Salt Lake City School District',
    '5f2609807a1c0000950bb478':'San Diego Unified School District',
    '5f2609807a1c0000950bb470':'San Leandro Unified School District',
    '5f2609807a1c0000950bb477':'Sarasota County',
    '5f2609807a1c0000950bb473':'Skillman Foundation',
    '5f2609807a1c0000950bb46a':'Springfield Public Schools',
    '5f2609807a1c0000950bb468':'Utah Board of Education',
    '5f698b826451a9089d7d4008':'Wayne Metro',
    '5f2609807a1c0000950bb45b':'Westfield Public School District',
    '5f2609807a1c0000950bb368':'Wichita Falls Independent School District',
    '5ffd8176469a86e28635f512':'Chula Vista Elementary School District',
    '5f2609807a1c0000950bb45d':'Youngstown'}

    username = urllib.parse.quote_plus('admin')
    password = urllib.parse.quote_plus('A_dM!n|#!_2o20')
    client = MongoClient("mongodb://%s:%s@44.234.88.150:27017/" % (username, password))
    db=client.compass
    dateStr = "2020-01-01T00:00:00.000Z"
    myDatetime = dateutil.parser.parse(dateStr)
    collection = db.user_master
    district=disdic[disid]
    qraaa=[
        {"$match":{'$and':[
        {'USER_NAME':{"$not":{"$regex":"test",'$options':'i'}}},
        {'EMAIL_ID':{"$not":{"$regex":"test",'$options':'i'}}},
        {'EMAIL_ID':{"$not":{"$regex":"1gen",'$options':'i'}}},
        {'USER_NAME':{'$not':{'$regex':'1gen', '$options':'i'}}},
        {'DISTRICT_ID.DISTRICT_NAME':{'$not':{'$regex':'test', '$options':'i'}}},
        {"schoolId._id":{"$in":db.school_master.distinct( "_id", { "IS_PORTAL": "Y","CATEGORY":{'$regex':district, '$options':'i'} } )}},
        {'DISTRICT_ID':{'$exists':1}},
        {'INCOMPLETE_SIGNUP':{"$ne":'Y'}}, 
        {'CREATED_DATE':{"$gte":myDatetime}},
        {'ROLE_ID._id':{'$ne':ObjectId("5f155b8a3b6800007900da2b")}},
        {'IS_BLOCKED':{"$ne":'Y'}}, 
        {'IS_DISABLED':{"$ne":'Y'}}, {'schoolId.NAME':{'$not':{'$regex':'test', '$options':'i'}}},
        ]}},
        {'$group':{'_id':{"district":'$schoolId._id',"month":{"$month": "$CREATED_DATE"}},
        'NAME_DISTRICT':{'$first':'$schoolId.NAME'},
        'usercount':{'$sum':1}}},
            {"$project":{"_id":0,"DISTRICT_ID":"$_id.district","MONTH":"$_id.month","NAME_DISTRICT":1,"usercount":1,
                        }}]
    merge11=list(collection.aggregate(qraaa))
    df1=pd.DataFrame(merge11)
    # df1
    #######################################################
    db=client.compass
    dateStr = "2020-01-01T00:00:00.000Z"
    myDatetime = dateutil.parser.parse(dateStr)
    collection = db.user_master
    qra=[
        {"$match":{'$and':[
        {'USER_NAME':{"$not":{"$regex":"test",'$options':'i'}}},
        {'EMAIL_ID':{"$not":{"$regex":"test",'$options':'i'}}},
        {'EMAIL_ID':{"$not":{"$regex":"1gen",'$options':'i'}}},
        {'USER_NAME':{'$not':{'$regex':'1gen', '$options':'i'}}},
        {'DISTRICT_ID.DISTRICT_NAME':{'$not':{'$regex':'test', '$options':'i'}}},
        {"schoolId._id":{"$in":db.school_master.distinct( "_id", { "IS_PORTAL": "Y","CATEGORY":{'$regex':district, '$options':'i'} } )}},
        {'DISTRICT_ID':{'$exists':1}},
        {'INCOMPLETE_SIGNUP':{"$ne":'Y'}}, 
        {'CREATED_DATE':{"$lt":myDatetime}},
        {'ROLE_ID._id':{'$ne':ObjectId("5f155b8a3b6800007900da2b")}},
        {'IS_BLOCKED':{"$ne":'Y'}}, 
        {'IS_DISABLED':{"$ne":'Y'}}, {'schoolId.NAME':{'$not':{'$regex':'test', '$options':'i'}}},
        ]}},
        {'$group':{'_id':{"district":'$schoolId._id'},
        'NAME_DISTRICT':{'$first':'$schoolId.NAME'},
        'usercount':{'$sum':1}}},
            {"$project":{"_id":0,"DISTRICT_ID":"$_id.district","NAME_DISTRICT":1,"usercount":1,
                        }}]
    merge11233=list(collection.aggregate(qra))
    dfCV=pd.DataFrame(merge11233)
    if dfCV.empty == True:
        data = [[district,0,disid]]
        column_names1 = ["NAME_DISTRICT","usercount","DISTRICT_ID"]
        dfCV = pd.DataFrame(data,columns = column_names1)
    # print(dfCV)
    #########################################################################
    df1=df1.sort_values(by=['NAME_DISTRICT'], ascending=True)
    x=df1[df1['NAME_DISTRICT']=="Belleville School District"]
    x["usercount"].sum()
    dislist=list(set(df1["NAME_DISTRICT"]))
    df2=df1[["NAME_DISTRICT","MONTH","usercount"]]
    overall=pd.DataFrame(columns=["NAME_DISTRICT","MONTH","usercount"])
    # dislist
    result=[]
    for k in dislist:
    #     print(k)
        df45=df2[df2["NAME_DISTRICT"]==k]
        df45.reset_index()
        for i in range(1,13):
            if i in list(df45["MONTH"]):
                pass
    #              print("month_present",i)
            else:
                df45.loc[i+len(df45)] = [k] +[i]+[0]
    #     df46=df45.groupby(['NAME_DISTRICT', 'MONTH']).reset_index()
        df46=df45.groupby(['NAME_DISTRICT', 'MONTH']).sum().groupby(level=0).cumsum().reset_index()
    #     print(df46)
        sorted_df =df46.sort_values(by=['MONTH'], ascending=True)
        sorted_df1=sorted_df.reset_index()
        result.append(sorted_df)
    buubleusercount = pd.concat(result)
    # buubleusercount
    ######family ########
    # username = urllib.parse.quote_plus('admin')
    # password = urllib.parse.quote_plus('A_dM!n|#!_2o20')
    # client = MongoClient("mongodb://%s:%s@44.234.88.150:27017/" % (username, password))
    db=client.compass
    dateStr = "2020-01-01T00:00:00.000Z"
    myDatetime = dateutil.parser.parse(dateStr)
    collection = db.user_master
    qraaa=[
        {"$match":{'$and':[
        {'USER_NAME':{"$not":{"$regex":"test",'$options':'i'}}},
        {'EMAIL_ID':{"$not":{"$regex":"test",'$options':'i'}}},
        {'EMAIL_ID':{"$not":{"$regex":"1gen",'$options':'i'}}},
        {'USER_NAME':{'$not':{'$regex':'1gen', '$options':'i'}}},
        {'DISTRICT_ID.DISTRICT_NAME':{'$not':{'$regex':'test', '$options':'i'}}},
        {"schoolId._id":{"$in":db.school_master.distinct( "_id", { "IS_PORTAL": "Y","CATEGORY":{'$regex':district, '$options':'i'} } )}},
        {'DISTRICT_ID':{'$exists':1}},
        {'INCOMPLETE_SIGNUP':{"$ne":'Y'}}, 
        {'CREATED_DATE':{"$gte":myDatetime}},
        {'ROLE_ID._id':{'$eq':ObjectId("5f155b8a3b6800007900da2b")}},
        {'IS_BLOCKED':{"$ne":'Y'}}, 
        {'IS_DISABLED':{"$ne":'Y'}}, {'schoolId.NAME':{'$not':{'$regex':'test', '$options':'i'}}},
        ]}},
        {'$group':{'_id':{"district":'$schoolId._id',"month":{"$month": "$CREATED_DATE"}},
        'NAME_DISTRICT':{'$first':'$schoolId.NAME'},
        'famcount':{'$sum':1}}},
            {"$project":{"_id":0,"DISTRICT_ID":"$_id.district","MONTH":"$_id.month","NAME_DISTRICT":1,"famcount":1,
                        }}]
    merge11=list(collection.aggregate(qraaa))
    df1=pd.DataFrame(merge11)
    # print(df1)
    #######################################################
    db=client.compass
    dateStr = "2020-01-01T00:00:00.000Z"
    myDatetime = dateutil.parser.parse(dateStr)
    collection = db.user_master
    qra=[
        {"$match":{'$and':[
        {'USER_NAME':{"$not":{"$regex":"test",'$options':'i'}}},
        {'EMAIL_ID':{"$not":{"$regex":"test",'$options':'i'}}},
        {'EMAIL_ID':{"$not":{"$regex":"1gen",'$options':'i'}}},
        {'USER_NAME':{'$not':{'$regex':'1gen', '$options':'i'}}},
        {'DISTRICT_ID.DISTRICT_NAME':{'$not':{'$regex':'test', '$options':'i'}}},
        {"schoolId._id":{"$in":db.school_master.distinct( "_id", { "IS_PORTAL": "Y","CATEGORY":{'$regex':district, '$options':'i'} } )}},
        {'DISTRICT_ID':{'$exists':1}},
        {'INCOMPLETE_SIGNUP':{"$ne":'Y'}}, 
        {'CREATED_DATE':{"$lt":myDatetime}},
        {'ROLE_ID._id':{'$ne':ObjectId("5f155b8a3b6800007900da2b")}},
        {'IS_BLOCKED':{"$ne":'Y'}}, 
        {'IS_DISABLED':{"$ne":'Y'}}, {'schoolId.NAME':{'$not':{'$regex':'test', '$options':'i'}}},
        ]}},
        {'$group':{'_id':{"district":'$schoolId._id'},
        'NAME_DISTRICT':{'$first':'$schoolId.NAME'},
        'usercount19':{'$sum':1}}},
            {"$project":{"_id":0,"DISTRICT_ID":"$_id.district","NAME_DISTRICT":1,"usercount19":1,
                        }}]
    merge11233=list(collection.aggregate(qra))
    dfCV=pd.DataFrame(merge11233)
    if dfCV.empty == True:
        data = [[district,0,disid]]
        column_names1 = ["NAME_DISTRICT","usercount19","DISTRICT_ID"]
        dfCV = pd.DataFrame(data,columns = column_names1)
    # dfCV
    # #########################################################################
    df1=df1.sort_values(by=['NAME_DISTRICT'], ascending=True)
    x=df1[df1['NAME_DISTRICT']=="Belleville School District"]
    x["famcount"].sum()
    dislist=list(set(df1["NAME_DISTRICT"]))
    df2=df1[["NAME_DISTRICT","MONTH","famcount"]]
    overall=pd.DataFrame(columns=["NAME_DISTRICT","MONTH","famcount"])
    # dislist
    result=[]
    for k in dislist:
    #     print(k)
        df45=df2[df2["NAME_DISTRICT"]==k]
        df45.reset_index()
        for i in range(1,13):
            if i in list(df45["MONTH"]):
                pass
    #              print("month_present",i)
            else:
                df45.loc[i+len(df45)] = [k] +[i]+[0]
    #     df46=df45.groupby(['NAME_DISTRICT', 'MONTH']).reset_index()
        df46=df45.groupby(['NAME_DISTRICT', 'MONTH']).sum().groupby(level=0).cumsum().reset_index()
    #     print(df46)
        sorted_df =df46.sort_values(by=['MONTH'], ascending=True)
        sorted_df1=sorted_df.reset_index()
        result.append(sorted_df)
    buublefamily = pd.concat(result)
    buubleusercount["idu"]=buubleusercount["NAME_DISTRICT"]+buubleusercount["MONTH"].map(str)
    buublefamily["idf"]=buublefamily["NAME_DISTRICT"]+buublefamily["MONTH"].map(str)
    mergeucfc=pd.merge(buubleusercount, buublefamily, how='left', left_on='idu', right_on='idf')
    mergeucfc=mergeucfc.fillna(0)
    mergeucfc1=pd.merge(mergeucfc, dfCV, how='left', left_on='NAME_DISTRICT_x', right_on='NAME_DISTRICT')
    mergeucfc12=mergeucfc1.fillna(0)
    mergeucfc12["totaluser"]=mergeucfc12["usercount"]+mergeucfc12["usercount19"]
    finmerge=mergeucfc12[["NAME_DISTRICT_x","MONTH_x","idu","totaluser","famcount"]]
    # finmerge
    ###ACTIVE USER
    username = urllib.parse.quote_plus('admin')
    password = urllib.parse.quote_plus('A_dM!n|#!_2o20')
    client = MongoClient("mongodb://%s:%s@44.234.88.150:27017/" % (username, password))
    db=client.compass
    dateStr = "2020-01-01T00:00:00.000Z"
    myDatetime = dateutil.parser.parse(dateStr)
    collection = db.audio_track_master
    qra12=[
        {"$match":{'$and':[{'USER_ID.USER_NAME':{"$not":{"$regex":"test",'$options':'i'}}},
        {'USER_ID.EMAIL_ID':{"$not":{"$regex":"test",'$options':'i'}}},
        {'USER_ID.EMAIL_ID':{"$not":{"$regex":"1gen",'$options':'i'}}},
        {'USER_ID.USER_NAME':{'$not':{'$regex':'1gen', '$options':'i'}}},
        {'USER_ID.DISTRICT_ID.DISTRICT_NAME':{'$not':{'$regex':'test', '$options':'i'}}},
        {"USER_ID.schoolId._id":{"$in":db.school_master.distinct( "_id", { "IS_PORTAL": "Y","CATEGORY":{'$regex':district, '$options':'i'} } )}},
        {'USER_ID.DISTRICT_ID':{'$exists':1}},
        {'USER_ID.INCOMPLETE_SIGNUP':{"$ne":'Y'}}, 
        {'MODIFIED_DATE':{"$gte":myDatetime}},
        {'USER_ID.ROLE_ID._id':{'$ne':ObjectId("5f155b8a3b6800007900da2b")}},
        {'USER_ID.IS_BLOCKED':{"$ne":'Y'}}, 
        {'USER_ID.IS_DISABLED':{"$ne":'Y'}}, {'USER_ID.schoolId.NAME':{'$not':{'$regex':'test', '$options':'i'}}},
        ]}},
        {'$group':{'_id':{"district":'$USER_ID.schoolId._id',"month":{"$month": "$MODIFIED_DATE"}},
        'NAME_DISTRICT':{'$first':'$USER_ID.schoolId.NAME'},
        "ACTIVE_USER":{'$addToSet':"$USER_ID._id"},}},
            {"$project":{"_id":0,"DISTRICT_ID":"$_id.district","MONTH":"$_id.month","NAME_DISTRICT":1,"ACTIVE_USER":{"$size":"$ACTIVE_USER"}}}]
    merge121=list(collection.aggregate(qra12))
    df1=pd.DataFrame(merge121)
    # print(df1)
    df1=df1.sort_values(by=['NAME_DISTRICT'], ascending=True)
    # df1
    # x=df1[df1['NAME_DISTRICT']=="Belleville School District"]
    dislist=list(set(df1["NAME_DISTRICT"]))
    df2=df1[["NAME_DISTRICT","MONTH","ACTIVE_USER"]]
    overall=pd.DataFrame(columns=["NAME_DISTRICT","MONTH","ACTIVE_USER"])
    result=[]
    for k in dislist:
    #     print(k)
        df45=df2[df2["NAME_DISTRICT"]==k]
        df45.reset_index()
        for i in range(1,13):
            if i in list(df45["MONTH"]):
                pass
    #              print("month_present",i)
            else:
                df45.loc[i+len(df45)] = [k] +[i]+[0]
    #     df46=df45.groupby(['NAME_DISTRICT', 'MONTH']).reset_index()
    #     df46=df45.groupby(['NAME_DISTRICT', 'MONTH']).sum().groupby(level=0).cumsum().reset_index()
    #     print(df46)
        sorted_df =df45.sort_values(by=['MONTH'], ascending=True)
        sorted_df1=sorted_df.reset_index()
        result.append(sorted_df)
    buubleactuser = pd.concat(result)
    buubleactuser["acuid"]=buubleactuser["NAME_DISTRICT"]+buubleactuser["MONTH"].map(str)
    # buubleactuser
    finmergeu=pd.merge(finmerge, buubleactuser, how='left', left_on='idu', right_on='acuid')
    ###ACTIVE FAMILY
    username = urllib.parse.quote_plus('admin')
    password = urllib.parse.quote_plus('A_dM!n|#!_2o20')
    client = MongoClient("mongodb://%s:%s@44.234.88.150:27017/" % (username, password))
    db=client.compass
    dateStr = "2020-01-01T00:00:00.000Z"
    myDatetime = dateutil.parser.parse(dateStr)
    collection = db.audio_track_master
    qra12=[
        {"$match":{'$and':[{'USER_ID.USER_NAME':{"$not":{"$regex":"test",'$options':'i'}}},
        {'USER_ID.EMAIL_ID':{"$not":{"$regex":"test",'$options':'i'}}},
        {'USER_ID.EMAIL_ID':{"$not":{"$regex":"1gen",'$options':'i'}}},
        {'USER_ID.USER_NAME':{'$not':{'$regex':'1gen', '$options':'i'}}},
        {'USER_ID.DISTRICT_ID.DISTRICT_NAME':{'$not':{'$regex':'test', '$options':'i'}}},
        {"USER_ID.schoolId._id":{"$in":db.school_master.distinct( "_id", { "IS_PORTAL": "Y","CATEGORY":{'$regex':district, '$options':'i'} } )}},
        {'USER_ID.DISTRICT_ID':{'$exists':1}},
        {'USER_ID.INCOMPLETE_SIGNUP':{"$ne":'Y'}}, 
        {'MODIFIED_DATE':{"$gte":myDatetime}},
        {'USER_ID.ROLE_ID._id':ObjectId("5f155b8a3b6800007900da2b")},
        {'USER_ID.IS_BLOCKED':{"$ne":'Y'}}, 
        {'USER_ID.IS_DISABLED':{"$ne":'Y'}}, {'USER_ID.schoolId.NAME':{'$not':{'$regex':'test', '$options':'i'}}},
        ]}},
        {'$group':{'_id':{"district":'$USER_ID.schoolId._id',"year":{"$year": "$MODIFIED_DATE"},"month":{"$month": "$MODIFIED_DATE"}},
        'NAME_DISTRICT':{'$first':'$USER_ID.schoolId.NAME'},
        'PRACTICE':{'$sum':1},
        "ACTIVE_FAM":{'$addToSet':"$USER_ID._id"},
        'Mindful_Minutes':{"$sum":{"$round":[{"$divide":[{"$subtract":['$CURSOR_END','$cursorStart']}, 60]},2]}}}},
            {"$project":{"_id":0,"DISTRICT_ID":"$_id.district","MONTH":"$_id.month","YEAR":"$_id.year","NAME_DISTRICT":1,"PRACTICE":1,"ACTIVE_FAM":{"$size":"$ACTIVE_FAM"},
                       "Mindful_Minutes":1 }}]
    merge121=list(collection.aggregate(qra12))
    df1=pd.DataFrame(merge121)
    df1=pd.DataFrame(merge121)
    if df1.empty == True:
            data = [[district,0,0,0,disid,0,0]]
            column_names1 = ["NAME_DISTRICT","PRACTICE","ACTIVE_FAM","YEAR","DISTRICT_ID","MONTH","Mindful_Minutes"]
            df1 = pd.DataFrame(data,columns = column_names1)
    df1=df1.sort_values(by=['NAME_DISTRICT'], ascending=True)

    # x=df1[df1['NAME_DISTRICT']=="Belleville School District"]
    dislist=list(set(df1["NAME_DISTRICT"]))
    df2=df1[["NAME_DISTRICT","MONTH","ACTIVE_FAM"]]
    overall=pd.DataFrame(columns=["NAME_DISTRICT","MONTH","ACTIVE_FAM"])
    result=[]
    for k in dislist:
    #     print(k)
        df45=df2[df2["NAME_DISTRICT"]==k]
        df45.reset_index()
        for i in range(1,13):
            if i in list(df45["MONTH"]):
                pass
    #              print("month_present",i)
            else:
                df45.loc[i+len(df45)] = [k] +[i]+[0]
    #     df46=df45.groupby(['NAME_DISTRICT', 'MONTH']).reset_index()
    #     df46=df45.groupby(['NAME_DISTRICT', 'MONTH']).sum().groupby(level=0).cumsum().reset_index()
    #     print(df46)
        sorted_df =df45.sort_values(by=['MONTH'], ascending=True)
        sorted_df1=sorted_df.reset_index()
        result.append(sorted_df)
    buubleactfam = pd.concat(result)
    buubleactfam["acuidf"]=buubleactfam["NAME_DISTRICT"]+buubleactfam["MONTH"].map(str)
    finmergeuf=pd.merge(finmergeu, buubleactfam, how='left', left_on='idu', right_on='acuidf')
    finmergeuf["USER ENGAGEMENT"]=round((finmergeuf["ACTIVE_USER"]/finmergeuf["totaluser"])*100)
    finmergeuf["FAMILY ENGAGEMENT"]=round((finmergeuf["ACTIVE_FAM"]/finmergeuf["famcount"])*100)
    finmergeufo=finmergeuf[["NAME_DISTRICT_x","MONTH_x","USER ENGAGEMENT","FAMILY ENGAGEMENT"]]
    finmergeufo=finmergeufo.fillna(0)
    finmergeufo=finmergeufo.loc[:,~finmergeufo.columns.duplicated()]
    username = urllib.parse.quote_plus('admin')
    password = urllib.parse.quote_plus('A_dM!n|#!_2o20')
    client = MongoClient("mongodb://%s:%s@44.234.88.150:27017/" % (username, password))
    db=client.compass
    # dateStr = "2020-01-01T00:00:00.000Z"
    myDatetime = dateutil.parser.parse(dateStr)
    collection = db.audio_track_master
    qra12=[
        {"$match":{'$and':[{'USER_ID.USER_NAME':{"$not":{"$regex":"test",'$options':'i'}}},
        {'USER_ID.EMAIL_ID':{"$not":{"$regex":"test",'$options':'i'}}},
        {'USER_ID.EMAIL_ID':{"$not":{"$regex":"1gen",'$options':'i'}}},
        {'USER_ID.USER_NAME':{'$not':{'$regex':'1gen', '$options':'i'}}},
        {'USER_ID.DISTRICT_ID.DISTRICT_NAME':{'$not':{'$regex':'test', '$options':'i'}}},
        {"USER_ID.schoolId._id":{"$in":db.school_master.distinct( "_id", { "IS_PORTAL": "Y","CATEGORY":{'$regex':district, '$options':'i'} } )}},
        {'USER_ID.DISTRICT_ID':{'$exists':1}},
        {'USER_ID.INCOMPLETE_SIGNUP':{"$ne":'Y'}}, 
    #     {'MODIFIED_DATE':{"$gte":myDatetime}},
    #     {'USER_ID.ROLE_ID._id':ObjectId("5f155b8a3b6800007900da2b")},
        {'USER_ID.IS_BLOCKED':{"$ne":'Y'}}, 
        {'USER_ID.IS_DISABLED':{"$ne":'Y'}}, {'USER_ID.schoolId.NAME':{'$not':{'$regex':'test', '$options':'i'}}},
        ]}},
        {'$group':{'_id':{"district":'$USER_ID.schoolId._id'},
        'NAME_DISTRICT':{'$first':'$USER_ID.schoolId.NAME'},
        'PRACTICE':{'$sum':1},
                  }},
            {"$project":{"_id":0,"DISTRICT_ID":"$_id.district","NAME_DISTRICT":1,"PRACTICE":1 }}]
    merge1211=list(collection.aggregate(qra12))
    df1111=pd.DataFrame(merge1211)
    # print("check1")
    df1111=df1111.sort_values(by=['NAME_DISTRICT'], ascending=True)
    DISPRACTO=df1111[["NAME_DISTRICT","PRACTICE"]]
    username = urllib.parse.quote_plus('admin')
    password = urllib.parse.quote_plus('A_dM!n|#!_2o20')
    client = MongoClient("mongodb://%s:%s@44.234.88.150:27017/" % (username, password))
    db=client.compass
    # dateStr = "2020-01-01T00:00:00.000Z"
    myDatetime = dateutil.parser.parse(dateStr)
    collection = db.user_master
    qra12=[
        {"$match":{'$and':[{'USER_NAME':{"$not":{"$regex":"test",'$options':'i'}}},
        {'EMAIL_ID':{"$not":{"$regex":"test",'$options':'i'}}},
        {'EMAIL_ID':{"$not":{"$regex":"1gen",'$options':'i'}}},
        {'USER_NAME':{'$not':{'$regex':'1gen', '$options':'i'}}},
        {'DISTRICT_ID.DISTRICT_NAME':{'$not':{'$regex':'test', '$options':'i'}}},
        {"schoolId._id":{"$in":db.school_master.distinct( "_id", { "IS_PORTAL": "Y","CATEGORY":{'$regex':district, '$options':'i'} } )}},
        {'DISTRICT_ID':{'$exists':1}},
        {'INCOMPLETE_SIGNUP':{"$ne":'Y'}}, 
    #     {'MODIFIED_DATE':{"$gte":myDatetime}},
    #     {'ROLE_ID._id':ObjectId("5f155b8a3b6800007900da2b")},
        {'IS_BLOCKED':{"$ne":'Y'}}, 
        {'IS_DISABLED':{"$ne":'Y'}}, {'schoolId.NAME':{'$not':{'$regex':'test', '$options':'i'}}},
        ]}},
        {'$group':{'_id':{"district":'$schoolId._id'},
        'NAME_DISTRICT':{'$first':'$schoolId.NAME'},
        "USER COUNT":{'$addToSet':"$_id"},
                  }},
            {"$project":{"_id":0,"DISTRICT_ID":"$_id.district","NAME_DISTRICT":1,"USER COUNT":{"$size":"$USER COUNT"} }}]
    merge1211=list(collection.aggregate(qra12))
    df1111=pd.DataFrame(merge1211)
    df1111=df1111.sort_values(by=['NAME_DISTRICT'], ascending=True)
    DISSCHOOL=df1111[["NAME_DISTRICT","USER COUNT"]]
    finmergeufosch=pd.merge(finmergeufo, DISSCHOOL, how='left', left_on='NAME_DISTRICT_x', right_on='NAME_DISTRICT')
    finmergeufoschprac=pd.merge(finmergeufosch, DISPRACTO, how='left', left_on='NAME_DISTRICT_x', right_on='NAME_DISTRICT')
    finmergeufoschprac=finmergeufoschprac.fillna(0)
    final_buuble_data=finmergeufoschprac[["NAME_DISTRICT_x","MONTH_x","USER ENGAGEMENT","FAMILY ENGAGEMENT","USER COUNT","PRACTICE"]]
    finaldata=final_buuble_data.rename(columns={"NAME_DISTRICT_x": "DISTRICT_NAME","USER ENGAGEMENT":"USER_ENGAGEMENT","USER COUNT":"USER_COUNT", "FAMILY ENGAGEMENT":"FAMILY_ENGAGEMENT","MONTH_x": "MONTH"})
    finaldata=finaldata.loc[:,~finaldata.columns.duplicated()]
    li = [finaldata.columns.values.tolist()] + finaldata.values.tolist() 
    sheet = pe.Sheet(li)
    print(sheet,"sheet")
    print(type(sheet),"sheet type")
    ioO = io.StringIO()
    sheet.save_to_memory("csv", ioO)
    output = make_response(ioO.getvalue())
    # output.headers["Content-Disposition"] = "attachment; filename=export.csv"
    output.headers["Content-type"] = "text/csv"
    return output



@app.route('/rtusercount')
def realtimeusercount():
    username = urllib.parse.quote_plus('admin')
    password = urllib.parse.quote_plus('A_dM!n|#!_2o20')
    client = MongoClient("mongodb://%s:%s@44.234.88.150:27017/" % (username, password))
    db=client.compass
    collection = db.audio_track_master
    query4=[{"$match":{
             '$and':[{ 'USER_ID.USER_NAME':{"$not":{"$regex":"test",'$options':'i'}}},
                       {'USER_ID.EMAIL_ID':{"$not":{"$regex":"test",'$options':'i'}}},
                         {'USER_ID.EMAIL_ID':{"$not":{"$regex":"1gen",'$options':'i'}}},
              {'USER_ID.INCOMPLETE_SIGNUP':{"$ne":'Y'}},
              {'USER_ID.IS_DISABLED':{"$ne":'Y'}},
              {'USER_ID.IS_BLOCKED':{"$ne":'Y'}},
              {'USER_ID.ROLE_ID._id':{'$ne':ObjectId("5f155b8a3b6800007900da2b")}},
              {'USER_ID.DEVICE_USED':{"$regex":'webapp','$options':'i'}},
              {'USER_ID.schoolId.NAME':{'$not':{"$regex":'Blocked','$options':'i'}}},
              {'USER_ID.schoolId.BLOCKED_BY_CAP':{'$exists':0}},
              {'MODIFIED_DATE': {'$gte': datetime.datetime.utcnow()-datetime.timedelta(seconds=60)}}
              ]}},
           {'$group':
           {'_id':'$USER_ID._id',
               'State':{'$first':'$USER_ID.schoolId.STATE'},
               'Country':{'$first':'$USER_ID.schoolId.COUNTRY'}
               }}
           ]
    realtime=list(collection.aggregate(query4))
    realtimeuserpractising=pd.DataFrame(realtime)
    #####################family######################
    query=[{"$match":{
             '$and':[{ 'USER_ID.USER_NAME':{"$not":{"$regex":"test",'$options':'i'}}},
                       {'USER_ID.EMAIL_ID':{"$not":{"$regex":"test",'$options':'i'}}},
                         {'USER_ID.EMAIL_ID':{"$not":{"$regex":"1gen",'$options':'i'}}},
              {'USER_ID.INCOMPLETE_SIGNUP':{"$ne":'Y'}},
              {'USER_ID.IS_DISABLED':{"$ne":'Y'}},
#               {'USER_ID.IS_BLOCKED':{"$ne":'Y'}},
              {'USER_ID.ROLE_ID._id':{'$eq':ObjectId("5f155b8a3b6800007900da2b")}},
              {'USER_ID.DEVICE_USED':{"$regex":'webapp','$options':'i'}},
              {'USER_ID.schoolId.NAME':{'$not':{"$regex":'Blocked','$options':'i'}}},
              {'USER_ID.schoolId.BLOCKED_BY_CAP':{'$exists':0}},
              {'MODIFIED_DATE': {'$gte': datetime.datetime.utcnow()-datetime.timedelta(seconds=60)}}
              ]}},
           {'$group':
           {'_id':'$USER_ID._id',
               'State':{'$first':'$USER_ID.schoolId.STATE'},
               'Country':{'$first':'$USER_ID.schoolId.COUNTRY'}
               }}
           ]
    realtimeparent=list(collection.aggregate(query))
    realtimeparentpractising=pd.DataFrame(realtimeparent)
    temp={'userpracticing':len(realtimeuserpractising),'parentrpracticing':len(realtimeparentpractising)}
    return json.dumps(temp)

@app.route('/rtmapcount')
def realtimemaprcount():
    username = urllib.parse.quote_plus('admin')
    password = urllib.parse.quote_plus('A_dM!n|#!_2o20')
    client = MongoClient("mongodb://%s:%s@44.234.88.150:27017/" % (username, password))
    db=client.compass
    collection = db.audio_track_master
    query4=[{"$match":{
             '$and':[{ 'USER_ID.USER_NAME':{"$not":{"$regex":"test",'$options':'i'}}},
                       {'USER_ID.EMAIL_ID':{"$not":{"$regex":"test",'$options':'i'}}},
                         {'USER_ID.EMAIL_ID':{"$not":{"$regex":"1gen",'$options':'i'}}},
              {'USER_ID.INCOMPLETE_SIGNUP':{"$ne":'Y'}},
              {'USER_ID.IS_DISABLED':{"$ne":'Y'}},
              {'USER_ID.IS_BLOCKED':{"$ne":'Y'}},
              {'USER_ID.ROLE_ID._id':{'$ne':ObjectId("5f155b8a3b6800007900da2b")}},
              {'USER_ID.DEVICE_USED':{"$regex":'webapp','$options':'i'}},
              {'USER_ID.schoolId.NAME':{'$not':{"$regex":'Blocked','$options':'i'}}},
              {'USER_ID.schoolId.BLOCKED_BY_CAP':{'$exists':0}},
              {'MODIFIED_DATE': {'$gte': datetime.datetime.utcnow()-datetime.timedelta(seconds=60)}}
              ]}},
           {'$group':
           {'_id':'$USER_ID._id',
               'State':{'$first':'$USER_ID.schoolId.STATE'},
               'Country':{'$first':'$USER_ID.schoolId.COUNTRY'}
               }}
           ]
    realtime=list(collection.aggregate(query4))
    realtimeuserpractising=pd.DataFrame(realtime)
    if realtimeuserpractising.empty:
        df = pd.DataFrame(columns=['State', 'STATE_SHOT','text','_id'])
        for i in range(1):
            df.loc[i] = ['none'] +['none'] +['NO USER PRACTICING RIGHT NOW']+ [0]
            df1=df[["State","_id","STATE_SHOT",'text']]
            links0 =df1.rename(columns={'STATE_SHOT' : 'code', '_id' : 'value','State':'name','text':'text'}).to_dict('r')
    else:
        us_state_shot = {
            'Alabama': 'AL',
            'Alaska': 'AK',
            'American Samoa': 'AS',
            'Arizona': 'AZ',
            'Arkansas': 'AR',
            'California': 'CA',
            'Colorado': 'CO',
            'Connecticut': 'CT',
            'Delaware': 'DE',
            'District of Columbia': 'DC',
            'Florida': 'FL',
            'Georgia': 'GA',
            'Guam': 'GU',
            'Hawaii': 'HI',
            'Idaho': 'ID',
            'Illinois': 'IL',
            'Indiana': 'IN',
            'Iowa': 'IA',
            'Kansas': 'KS',
            'Kentucky': 'KY',
            'Louisiana': 'LA',
            'Maine': 'ME',
            'Maryland': 'MD',
            'Massachusetts': 'MA',
            'Michigan': 'MI',
            'Minnesota': 'MN',
            'Mississippi': 'MS',
            'Missouri': 'MO',
            'Montana': 'MT',
            'Nebraska': 'NE',
            'Nevada': 'NV',
            'New Hampshire': 'NH',
            'New Jersey': 'NJ',
            'New Mexico': 'NM',
            'New York': 'NY',
            'North Carolina': 'NC',
            'North Dakota': 'ND',
            'Northern Mariana Islands':'MP',
            'Ohio': 'OH',
            'Oklahoma': 'OK',
            'Oregon': 'OR',
            'Pennsylvania': 'PA',
            'Puerto Rico': 'PR',
            'Rhode Island': 'RI',
            'South Carolina': 'SC',
            'South Dakota': 'SD',
            'Tennessee': 'TN',
            'Texas': 'TX',
            'Utah': 'UT',
            'Vermont': 'VT',
            'Virgin Islands': 'VI',
            'Virginia': 'VA',
            'Washington': 'WA',
            'West Virginia': 'WV',
            'Wisconsin': 'WI',
            'Wyoming': 'WY'
        }
        realtimeuserpractising["STATE_SHOT"] = realtimeuserpractising["State"].map(us_state_shot) 
        df1=realtimeuserpractising.groupby(["State","STATE_SHOT"]).count().reset_index()
        df2=df1[["State","_id","STATE_SHOT"]]
        links0 =df2.rename(columns={'STATE_SHOT' : 'code', '_id' : 'value','State':'name'}).to_dict('r')
    return json.dumps(links0)



# ==========================

# ========================UWBA==============
@app.route('/uwbaheatmappractices/')

def UWBA_heatmap_prac():

    import collections
    username = urllib.parse.quote_plus('admin')
    password = urllib.parse.quote_plus('A_dM!n|#!_2o20')
    client = MongoClient("mongodb://%s:%s@44.234.88.150:27017/" % (username, password))
    db=client.compass 
    collection = db.audio_track_master
    collection2=db.user_master

    df=DataFrame(list(collection2.aggregate([{"$match":
             {'$and': [
                

                    {"IS_DISABLED":{"$ne":"Y"}},
                      {"IS_BLOCKED":{"$ne":"Y"}},
                     {"INCOMPLETE_SIGNUP":{"$ne":"Y"}},
                    { 'USER_NAME':{"$not":{"$regex":"test",'$options':'i'}}},
                    { 'USER_NAME':{"$not":{"$regex":"1gen",'$options':'i'}}},
                     {"schoolId._id":{"$in":db.school_master.distinct( "_id", { "IS_PORTAL": "Y" ,"CATEGORY":{'$regex':'UWBA', '$options':'i'}})}},

                    {'schoolId._id':{'$ne':None}},
                     {'EMAIL_ID':{'$ne':''}},

                     {'schoolId.NAME':{"$not":{"$regex":"test",'$options':'i'}}},
                 {'schoolId.BLOCKED_BY_CAP':{'$exists':False}},
                               {'EMAIL_ID':{"$not":{"$regex":"test",'$options':'i'}}},
                                 {'EMAIL_ID':{"$not":{"$regex":"1gen",'$options':'i'}}}]}},

                {'$group':{'_id':'$schoolId._id','ID':{'$addToSet':'$schoolId._id'}}},
                      {'$project':{'_id':1,'schools':'$ID'}},

                      ])))

    ids=list(df['_id'])
    
    
    df3=DataFrame(list(collection.aggregate([
{"$match":
    {'$and': [

         
        {"USER_ID.INCOMPLETE_SIGNUP":{"$ne":"Y"}},
{'USER_ID.schoolId._id':{'$in':ids}},


 {'MODIFIED_DATE':{'$gte':datetime.datetime(2020,1,1)}},]}},


        {'$group':{'_id':'$USER_ID.schoolId._id','uc':{'$addToSet':'$USER_ID._id'},'pc':{'$sum':1},'NAME':{'$first':'$USER_ID.schoolId.NAME'}}},
              {'$project':{'_id':1,'active_user_count':{'$size':'$uc'},'name':'$NAME','practice_count':'$pc'}},
    { '$sort' : { 'active_user_count' : -1} },
    {'$limit':30}])))
    top=list(df3['_id'])
#     print(df3)
#     df3.to_csv('file1.csv')
    df2=DataFrame(list(collection.aggregate([
    {"$match":
        {'$and': [
            
#              {'USER_ID.ROLE_ID._id' :{'$eq':ObjectId("5f155b8a3b6800007900da2b")}},
            {"USER_ID.INCOMPLETE_SIGNUP":{"$ne":"Y"}},
    {'USER_ID.schoolId._id':{'$in':top}},
    # {'USER_ID.ROLE_ID._id' :{'$eq':ObjectId("5f155b8a3b6800007900da2b")}},
  
     {'MODIFIED_DATE':{'$gte':datetime.datetime(2020,1,1)}},]}},


            {'$group':{'_id':{'school':'$USER_ID.schoolId._id','month':{'$month':'$MODIFIED_DATE'}},'uc':{'$addToSet':'$USER_ID._id'},'pc':{'$sum':1},'NAME':{'$first':'$USER_ID.schoolId.NAME'}}},
                  {'$project':{'_id':0,'school':'$_id.school','month':'$_id.month','active_user_count':{'$size':'$uc'},'name':'$NAME','practice_count':'$pc'}},
        { '$sort' : { 'name' : 1,'month'  :1} },


    # //               {'$count':'count'}
                  ])))
    # df2

    df1=df2
    df1=df1.sort_values(by=['name'], ascending=True)
    # x=df1[df1['NAME_DISTRICT']=="Belleville School District"]
    dislist=list(set(df1["name"]))
    # print(len(dislist))
    df2=df1[["name","month","active_user_count","practice_count"]]
    # print(df2)
    overall=pd.DataFrame(columns=["name","month","active_user_count","practice_count"])
    # overall
    result=[]
    for k in dislist:
    #     print(k)
        df45=df2[df2["name"]==k]
        df45.reset_index()
    #     print(df45)
        for i in range(1,13):
            if i in list(df45["month"]):
                pass
            else:
                a=max(list(df45.index))
                df45.loc[a+i] = [k] +[i]+[0]+[0]
  
        sorted_df =df45.sort_values(by=['month'], ascending=True)
    #     sorted_df1=sorted_df.reset_index()
        result.append(sorted_df)
        finaldf = pd.concat(result)
    #     finaldf=finaldf.sort_values(by=['name'])


    data={}
    for i in dislist:


        schoolname= finaldf[(finaldf.name ==i)].reset_index(drop = True)
        active_user_count = schoolname['active_user_count'].tolist()
        practice_count = schoolname['practice_count'].tolist()


        data[i] =practice_count
    data=collections.OrderedDict(sorted(data.items()))
    data={'meanTemp':data}

    
    return json.dumps(data)    

@app.route('/uwba_schoolwisefamilypracticecount_/')
def UWBA_schppcfamily():

    username = urllib.parse.quote_plus('admin')
    password = urllib.parse.quote_plus('A_dM!n|#!_2o20')
    client = MongoClient("mongodb://%s:%s@44.234.88.150:27017/" % (username, password))
    db=client.compass  
    collection = db.audio_track_master
    collection1 = db.user_master
#     district=disdic[districtid]
    df1 = DataFrame(list(collection.aggregate([
    {"$match":
         {'$and': [
              {'USER_ID.ROLE_ID._id' :{'$eq':ObjectId("5f155b8a3b6800007900da2b")}},
                {"USER_ID.IS_DISABLED":{"$ne":"Y"}},
                  {"USER_ID.IS_BLOCKED":{"$ne":"Y"}},
                 {"USER_ID.INCOMPLETE_SIGNUP":{"$ne":"Y"}},
                { 'USER_ID.USER_NAME':{"$not":{"$regex":"test",'$options':'i'}}},
                { 'USER_ID.USER_NAME':{"$not":{"$regex":"1gen",'$options':'i'}}},
                {'USER_ID.schoolId._id':{'$ne':None}},
                      {"USER_ID.schoolId._id":{"$in":db.school_master.distinct( "_id", { "IS_PORTAL": "Y" ,"CATEGORY":{'$regex':'UWBA', '$options':'i'}})}},
    # //               {'IS_ADMIN':'Y'},
    # //             {'USER_ID.IS_PORTAL':'Y'},
                 {'USER_ID.EMAIL_ID':{'$ne':''}},
#               {'USER_ID.DISTRICT_ID._id':{'$eq':ObjectId(""+districtid+"")}},
#                  {'USER_ID.DISTRICT_ID.DISTRICT_NAME':'Broward County Public Schools'},

    # //              {'EMAIL_ID':{'$regex':'broward','$options':'i'}},
                 {'USER_ID.schoolId.NAME':{"$not":{"$regex":"test",'$options':'i'}}},
             {'USER_ID.schoolId.BLOCKED_BY_CAP':{'$exists':False}},
                           {'USER_ID.EMAIL_ID':{"$not":{"$regex":"test",'$options':'i'}}},
                             {'USER_ID.EMAIL_ID':{"$not":{"$regex":"1gen",'$options':'i'}}}]}},
            {'$group':{'_id':'$USER_ID.schoolId._id','pc':{'$sum':1},'NAME':{'$first':'$USER_ID.schoolId.NAME'},'district':{'$first':'$USER_ID.DISTRICT_ID.DISTRICT_NAME'}}},
                  {'$project':{'_id':1,'practice_count':'$pc'}},
            { '$sort' : { 'practice_count' : -1}}
    # //               {'$count':'count'}
                  ])))
    df2=DataFrame(list(collection1.aggregate([{"$match":
     {'$and': [
           {'ROLE_ID._id' :{'$eq':ObjectId("5f155b8a3b6800007900da2b")}},
            {"IS_DISABLED":{"$ne":"Y"}},
              {"IS_BLOCKED":{"$ne":"Y"}},
             {"INCOMPLETE_SIGNUP":{"$ne":"Y"}},
            { 'USER_NAME':{"$not":{"$regex":"test",'$options':'i'}}},
            { 'USER_NAME':{"$not":{"$regex":"1gen",'$options':'i'}}},
    #                  {'_id':{'$in':user}},
    # //               {'IS_ADMIN':'Y'},

             {'EMAIL_ID':{'$ne':''}},
             {'schoolId.NAME':{"$not":{"$regex":"test",'$options':'i'}}},
         {'schoolId.BLOCKED_BY_CAP':{'$exists':False}},
                       {'EMAIL_ID':{"$not":{"$regex":"test",'$options':'i'}}},
                         {'EMAIL_ID':{"$not":{"$regex":"1gen",'$options':'i'}}}]}},

        {'$group':{'_id':'$schoolId._id','ID':{'$addToSet':'$schoolId._id'},'name':{'$first':'$schoolId.NAME'},'user_name':{'$first':'$USER_NAME'}
                  }},


        {'$project':{'_id':1,'name':1}},])))

    df=pd.merge(df1,df2, how='left', on='_id')
    
    if df.empty == True:
        
        schname=[]
        pc=[]
      
    else:
        schname=df['name'].tolist()
        pc=df['practice_count'].tolist()
    data={'schname':schname[0:20],'Familypracticecount':pc[0:20]}
    
    return json.dumps(data)

@app.route('/uwba_schoolwisefamilycount_/')
def uwba__schpuc():
   
    username = urllib.parse.quote_plus('admin')
    password = urllib.parse.quote_plus('A_dM!n|#!_2o20')
    client = MongoClient("mongodb://%s:%s@44.234.88.150:27017/" % (username, password))
    db=client.compass 
    collection= db.user_master
#     district=disdic[districtid]
    df = DataFrame(list(collection.aggregate([
    {"$match":
         {'$and': [
             {'ROLE_ID._id' :{'$eq':ObjectId("5f155b8a3b6800007900da2b")}},
                {"IS_DISABLED":{"$ne":"Y"}},
                  {"IS_BLOCKED":{"$ne":"Y"}},
                 {"INCOMPLETE_SIGNUP":{"$ne":"Y"}},
                { 'USER_NAME':{"$not":{"$regex":"test",'$options':'i'}}},
                { 'USER_NAME':{"$not":{"$regex":"1gen",'$options':'i'}}},
    # //               {'IS_ADMIN':'Y'},
#                 {'IS_PORTAL':'Y'},
                      {"schoolId._id":{"$in":db.school_master.distinct( "_id", { "IS_PORTAL": "Y" ,"CATEGORY":{'$regex':'UWBA', '$options':'i'}})}},
                 {'EMAIL_ID':{'$ne':''}},
#                    {'DISTRICT_ID._id':{'$eq':ObjectId(""+districtid+"")}},
#                  {'DISTRICT_ID.DISTRICT_NAME':'Broward County Public Schools'},
    # //              {'EMAIL_ID':{'$regex':'broward','$options':'i'}},
                 {'schoolId.NAME':{"$not":{"$regex":"test",'$options':'i'}}},
             {'schoolId.BLOCKED_BY_CAP':{'$exists':False}},
                           {'EMAIL_ID':{"$not":{"$regex":"test",'$options':'i'}}},
                             {'EMAIL_ID':{"$not":{"$regex":"1gen",'$options':'i'}}}]}},
            {'$group':{'_id':'$schoolId._id','ID':{'$addToSet':'$_id'},'NAME':{'$first':'$schoolId.NAME'},'district':{'$first':'$DISTRICT_ID.DISTRICT_NAME'}}},
                  {'$project':{'_id':1,'user_count':{'$size':'$ID'},'name':'$NAME','district':'$district'}},
                   { '$sort' : { 'user_count' : -1}}
    # //               {'$count':'count'}
                  ])))

    # df['SCH_CREATED_DATE']=pd.to_datetime(df['SCH_CREATED_DATE'])

#     df=df.nlargest(20,'user_count')
#     df= df.groupby(df['district'])
#     df= df.get_group(''+district+'')


    if df.empty == True:
        
        schname=[]
        uc=[]
      
    else:
        schname=df['name'].tolist()
        uc=df['user_count'].tolist()
    
    

    data={'schname':schname[0:20],'Familycount':uc[0:20]}
    
    return json.dumps(data)


@app.route('/uwba_schoolwisepracticecounttop20_/')
def uwbachwisepc():
    
    username = urllib.parse.quote_plus('admin')
    password = urllib.parse.quote_plus('A_dM!n|#!_2o20')
    client = MongoClient("mongodb://%s:%s@44.234.88.150:27017/" % (username, password))
    db=client.compass 
    collection = db.audio_track_master
    collection1 = db.user_master
#     district=disdic[districtid]
    df1 = DataFrame(list(collection.aggregate([
    {"$match":
         {'$and': [
              {'USER_ID.ROLE_ID._id' :{'$ne':ObjectId("5f155b8a3b6800007900da2b")}},
                {"USER_ID.IS_DISABLED":{"$ne":"Y"}},
                  {"USER_ID.IS_BLOCKED":{"$ne":"Y"}},
                 {"USER_ID.INCOMPLETE_SIGNUP":{"$ne":"Y"}},
                { 'USER_ID.USER_NAME':{"$not":{"$regex":"test",'$options':'i'}}},
                { 'USER_ID.USER_NAME':{"$not":{"$regex":"1gen",'$options':'i'}}},
                {'USER_ID.schoolId._id':{'$ne':None}},
                      {"USER_ID.schoolId._id":{"$in":db.school_master.distinct( "_id", { "IS_PORTAL": "Y" ,"CATEGORY":{'$regex':'UWBA', '$options':'i'}})}},
    # //               {'IS_ADMIN':'Y'},
    # //             {'USER_ID.IS_PORTAL':'Y'},
                 {'USER_ID.EMAIL_ID':{'$ne':''}},
#               {'USER_ID.DISTRICT_ID._id':{'$eq':ObjectId(""+districtid+"")}},
#                  {'USER_ID.DISTRICT_ID.DISTRICT_NAME':'Broward County Public Schools'},

    # //              {'EMAIL_ID':{'$regex':'broward','$options':'i'}},
                 {'USER_ID.schoolId.NAME':{"$not":{"$regex":"test",'$options':'i'}}},
             {'USER_ID.schoolId.BLOCKED_BY_CAP':{'$exists':False}},
                           {'USER_ID.EMAIL_ID':{"$not":{"$regex":"test",'$options':'i'}}},
                             {'USER_ID.EMAIL_ID':{"$not":{"$regex":"1gen",'$options':'i'}}}]}},
            {'$group':{'_id':'$USER_ID.schoolId._id','pc':{'$sum':1},'NAME':{'$first':'$USER_ID.schoolId.NAME'},'district':{'$first':'$USER_ID.DISTRICT_ID.DISTRICT_NAME'}}},
                  {'$project':{'_id':1,'practice_count':'$pc'}},
            { '$sort' : { 'practice_count' : -1}}
    # //               {'$count':'count'}
                  ])))
    df2=DataFrame(list(collection1.aggregate([{"$match":
     {'$and': [
           {'ROLE_ID._id' :{'$ne':ObjectId("5f155b8a3b6800007900da2b")}},
            {"IS_DISABLED":{"$ne":"Y"}},
              {"IS_BLOCKED":{"$ne":"Y"}},
             {"INCOMPLETE_SIGNUP":{"$ne":"Y"}},
            { 'USER_NAME':{"$not":{"$regex":"test",'$options':'i'}}},
            { 'USER_NAME':{"$not":{"$regex":"1gen",'$options':'i'}}},
    #                  {'_id':{'$in':user}},
    # //               {'IS_ADMIN':'Y'},

             {'EMAIL_ID':{'$ne':''}},
             {'schoolId.NAME':{"$not":{"$regex":"test",'$options':'i'}}},
         {'schoolId.BLOCKED_BY_CAP':{'$exists':False}},
                       {'EMAIL_ID':{"$not":{"$regex":"test",'$options':'i'}}},
                         {'EMAIL_ID':{"$not":{"$regex":"1gen",'$options':'i'}}}]}},

        {'$group':{'_id':'$schoolId._id','ID':{'$addToSet':'$schoolId._id'},'name':{'$first':'$schoolId.NAME'},'user_name':{'$first':'$USER_NAME'}
                  }},


        {'$project':{'_id':1,'name':1}},])))

    df=pd.merge(df1,df2, how='left', on='_id')
#     print(df)
    if df.empty == True:
        
        schname=[]
        pc=[]
      
    else:
        schname=df['name'].tolist()
        pc=df['practice_count'].tolist()
    data={'schname':schname[0:20],'Familypracticecount':pc[0:20]}
    
    return json.dumps(data)

@app.route('/uwba_top20userspractisinginfo_/')
def uwba__topusers_practice():
    
    username = urllib.parse.quote_plus('admin')
    password = urllib.parse.quote_plus('A_dM!n|#!_2o20')
    client = MongoClient("mongodb://%s:%s@44.234.88.150:27017/" % (username, password))
    db=client.compass 
    collection = db.audio_track_master
#     district=disdic[districtid]


    collection1 = db.user_master
    df1 = DataFrame(list(collection.aggregate([
    {"$match":
    {'$and': [
    #           {'USER_ID.ROLE_ID._id' :{'$eq':ObjectId("5f155b8a3b6800007900da2b")}},
            {"USER_ID.IS_DISABLED":{"$ne":"Y"}},
              {"USER_ID.IS_BLOCKED":{"$ne":"Y"}},
             {"USER_ID.INCOMPLETE_SIGNUP":{"$ne":"Y"}},
            { 'USER_ID.USER_NAME':{"$not":{"$regex":"test",'$options':'i'}}},
            { 'USER_ID.USER_NAME':{"$not":{"$regex":"1gen",'$options':'i'}}},
            {'USER_ID.schoolId._id':{'$ne':None}},
    # //               {'IS_ADMIN':'Y'},
    # //             {'USER_ID.IS_PORTAL':'Y'},
             {'USER_ID.EMAIL_ID':{'$ne':''}},
             {"USER_ID.schoolId._id":{"$in":db.school_master.distinct( "_id", { "IS_PORTAL": "Y" ,"CATEGORY":{'$regex':'UWBA', '$options':'i'}})}},

             {'USER_ID.schoolId.NAME':{"$not":{"$regex":"test",'$options':'i'}}},
         {'USER_ID.schoolId.BLOCKED_BY_CAP':{'$exists':False}},
                       {'USER_ID.EMAIL_ID':{"$not":{"$regex":"test",'$options':'i'}}},
                         {'USER_ID.EMAIL_ID':{"$not":{"$regex":"1gen",'$options':'i'}}}]}},
        {'$group':{'_id':'$USER_ID._id','pc':{'$sum':1}}},
              {'$project':{'_id':1,'practice_count':'$pc'}},
    { '$sort' : { 'practice_count' : -1} }



    # //               {'$count':'count'}
              ])))
    df1

    df2=DataFrame(list(collection1.aggregate([{"$match":
     {'$and': [
    #         {'ROLE_ID._id' :{'$ne':ObjectId("5f155b8a3b6800007900da2b")}},
            {"IS_DISABLED":{"$ne":"Y"}},
              {"IS_BLOCKED":{"$ne":"Y"}},
             {"INCOMPLETE_SIGNUP":{"$ne":"Y"}},
            { 'USER_NAME':{"$not":{"$regex":"test",'$options':'i'}}},
            { 'USER_NAME':{"$not":{"$regex":"1gen",'$options':'i'}}},
    #                  {'_id':{'$in':user}},
    # //               {'IS_ADMIN':'Y'},

             {'EMAIL_ID':{'$ne':''}},
             {'schoolId.NAME':{"$not":{"$regex":"test",'$options':'i'}}},
         {'schoolId.BLOCKED_BY_CAP':{'$exists':False}},
                       {'EMAIL_ID':{"$not":{"$regex":"test",'$options':'i'}}},
                         {'EMAIL_ID':{"$not":{"$regex":"1gen",'$options':'i'}}}]}},

        {'$group':{'_id':'$_id','ID':{'$addToSet':'$_id'},'school_name':{'$first':'$schoolId.NAME'},'user_name':{'$first':'$USER_NAME'}
                  }},


        {'$project':{'_id':1,'user_name':1,'school_name':1}},])))

    df=pd.merge(df1,df2, how='left', on='_id')
    df
    if df.empty == True:

        schname=[]
        pc=[]

    else:
        df["users"] = df["user_name"] +','+' ' + df["school_name"]
        schname=df['users'].tolist()
        pc=df['practice_count'].tolist()



    #     data=[]    
    #     for i,k in zip(schname,uc):

    #         data.append([i,k])

    #     for i in range(len(schname)):
    #             schname[i] = schname[i]
    data={'schname':schname[0:20],'practicecount':pc[0:20]}

    return json.dumps(data)

@app.route('/uwba_schoolwiseusercounttop20_/')
def uwba__schwiseuc():
   
    username = urllib.parse.quote_plus('admin')
    password = urllib.parse.quote_plus('A_dM!n|#!_2o20')
    client = MongoClient("mongodb://%s:%s@44.234.88.150:27017/" % (username, password))
    db=client.compass  
    collection = db.user_master
#     district=disdic[districtid]
    df = DataFrame(list(collection.aggregate([
    {"$match":
         {'$and': [
             {'ROLE_ID._id' :{'$ne':ObjectId("5f155b8a3b6800007900da2b")}},
                {"IS_DISABLED":{"$ne":"Y"}},
                  {"IS_BLOCKED":{"$ne":"Y"}},
                 {"INCOMPLETE_SIGNUP":{"$ne":"Y"}},
                { 'USER_NAME':{"$not":{"$regex":"test",'$options':'i'}}},
                { 'USER_NAME':{"$not":{"$regex":"1gen",'$options':'i'}}},
    # //               {'IS_ADMIN':'Y'},
#                 {'IS_PORTAL':'Y'},
                 {'EMAIL_ID':{'$ne':''}},
                      {"schoolId._id":{"$in":db.school_master.distinct( "_id", { "IS_PORTAL": "Y" ,"CATEGORY":{'$regex':'UWBA', '$options':'i'}})}},
#                    {'DISTRICT_ID._id':{'$eq':ObjectId(""+districtid+"")}},
#                  {'DISTRICT_ID.DISTRICT_NAME':'Broward County Public Schools'},
    # //              {'EMAIL_ID':{'$regex':'broward','$options':'i'}},
                 {'schoolId.NAME':{"$not":{"$regex":"test",'$options':'i'}}},
             {'schoolId.BLOCKED_BY_CAP':{'$exists':False}},
                           {'EMAIL_ID':{"$not":{"$regex":"test",'$options':'i'}}},
                             {'EMAIL_ID':{"$not":{"$regex":"1gen",'$options':'i'}}}]}},
            {'$group':{'_id':'$schoolId._id','ID':{'$addToSet':'$_id'},'NAME':{'$first':'$schoolId.NAME'},'district':{'$first':'$DISTRICT_ID.DISTRICT_NAME'}}},
                  {'$project':{'_id':1,'user_count':{'$size':'$ID'},'name':'$NAME','district':'$district'}},
                   { '$sort' : { 'user_count' : -1}}
    # //               {'$count':'count'}
                  ])))

    # df['SCH_CREATED_DATE']=pd.to_datetime(df['SCH_CREATED_DATE'])

#     df=df.nlargest(20,'user_count')
#     df= df.groupby(df['district'])
#     df= df.get_group(''+district+'')

    if df.empty == True:
        
        schname=[]
        pc=[]
      
    else:
        schname=df['name'].tolist()
        uc=df['user_count'].tolist()
   
    data={'schname':schname[0:20],'usercount':uc[0:20]}
    
    return json.dumps(data)

@app.route('/monthwisepracticeuwba')
def uwba__monthwisepc():
    
    username = urllib.parse.quote_plus('admin')
    password = urllib.parse.quote_plus('A_dM!n|#!_2o20')
    client = MongoClient("mongodb://%s:%s@44.234.88.150:27017/" % (username, password))
    db=client.compass 
    collection = db.audio_track_master
#     district=disdic[districtid]
    df = DataFrame(list(collection.aggregate([
    {"$match":
    {'$and': [
    #           {'USER_ID.ROLE_ID._id' :{'$eq':ObjectId("5f155b8a3b6800007900da2b")}},
        {"USER_ID.IS_DISABLED":{"$ne":"Y"}},
          {"USER_ID.IS_BLOCKED":{"$ne":"Y"}},
         {"USER_ID.INCOMPLETE_SIGNUP":{"$ne":"Y"}},
        { 'USER_ID.USER_NAME':{"$not":{"$regex":"test",'$options':'i'}}},
        { 'USER_ID.USER_NAME':{"$not":{"$regex":"1gen",'$options':'i'}}},
        {'USER_ID.schoolId._id':{'$ne':None}},
    # //               {'IS_ADMIN':'Y'},
    # //             {'USER_ID.IS_PORTAL':'Y'},
         {'USER_ID.EMAIL_ID':{'$ne':''}},
                 {"USER_ID.schoolId._id":{"$in":db.school_master.distinct( "_id", { "IS_PORTAL": "Y" ,"CATEGORY":{'$regex':'UWBA', '$options':'i'}})}},
#                {'USER_ID.DISTRICT_ID._id':{'$eq':ObjectId(""+districtid+"")}},
#              {'USER_ID.DISTRICT_ID.DISTRICT_NAME':'Broward County Public Schools'},
         {'MODIFIED_DATE':{'$gte':datetime.datetime(2020,8,1)}},
    # //              {'EMAIL_ID':{'$regex':'broward','$options':'i'}},
         {'USER_ID.schoolId.NAME':{"$not":{"$regex":"test",'$options':'i'}}},
     {'USER_ID.schoolId.BLOCKED_BY_CAP':{'$exists':False}},
                   {'USER_ID.EMAIL_ID':{"$not":{"$regex":"test",'$options':'i'}}},
                     {'USER_ID.EMAIL_ID':{"$not":{"$regex":"1gen",'$options':'i'}}}]}},
    {'$group':{'_id':{'$month':'$MODIFIED_DATE'},'pc':{'$sum':1},'district':{'$first':'$USER_ID.DISTRICT_ID.DISTRICT_NAME'}}},
          {'$project':{'_id':1,'practice_count':'$pc'}},
    { '$sort' : { '_id' : 1} }
              ])))


    df.rename(columns = { '_id': 'Month'}, inplace = True)

    data = [['Aug', 8], ['Sep', 9], ['Oct', 10],['Nov', 11], ['Dec', 12], ['Jan', 1],['Feb', 2], ['Mar', 3], ['Apr', 4],['May', 5], ['Jun', 6], ['Jul', 7]] 


# Create the pandas DataFrame 
    df1 = pd.DataFrame(data, columns = ['Monthname', 'Month']) 

    DF=pd.merge(df1,df, on='Month',how='left')
    DF=DF.fillna(0)

#         d = dict(enumerate(calendar.month_abbr))    # to convert monthnumber of dataframe into monthname

#         try:
#             df['Month'] = df['Month'].map(d)
#         except:
#             pass

#         if df.empty == True:
#             Month=['Aug','Sep','Oct','Nov','Dec','Jan','Feb','Mar','Apr','May','Jun','Jul',]

#             pc=[0,0,0,0,0,0,0,0,0,0,0,0]
#         else:
    Month=DF['Monthname'].tolist()

    pc=DF['practice_count'].tolist()


    data={'monthname':Month,'practice_count':pc}
    return json.dumps(data)



@app.route('/uwbapartnercardsinfo_/')
def uwba_count_cards():
    from datetime import datetime
    from datetime import timedelta
    
    username = urllib.parse.quote_plus('admin')
    password = urllib.parse.quote_plus('A_dM!n|#!_2o20')
    client = MongoClient("mongodb://%s:%s@44.234.88.150:27017/" % (username, password))
    db=client.compass 
    collection1 = db.user_master
    collection2=db.audio_track_master
    collection3=db.login_logs
#     district=disdic[districtid]
#     print(district)
    df1 = DataFrame(list(collection1.aggregate([
     {"$match":
         {'$and': [
                {"IS_DISABLED":{"$ne":"Y"}},
                  {"IS_BLOCKED":{"$ne":"Y"}},
                 {"INCOMPLETE_SIGNUP":{"$ne":"Y"}},
                { 'USER_NAME':{"$not":{"$regex":"test",'$options':'i'}}},
                { 'USER_NAME':{"$not":{"$regex":"1gen",'$options':'i'}}},
#                  {'IS_PORTAL':'Y'},
                 {'EMAIL_ID':{'$ne':''}},
#                  {'DISTRICT_ID._id':{'$eq':ObjectId(""+districtid+"")}},
             {"schoolId._id":{"$in":db.school_master.distinct( "_id", { "IS_PORTAL": "Y" ,"CATEGORY":{'$regex':'UWBA', '$options':'i'}})}},
    #              {'DISTRICT_ID.DISTRICT_NAME':'Sarasota County'},
    # //              {'EMAIL_ID':{'$regex':'broward','$options':'i'}},
                 {'schoolId.NAME':{"$not":{"$regex":"test",'$options':'i'}}},
             {'schoolId.BLOCKED_BY_CAP':{'$exists':False}},
                           {'EMAIL_ID':{"$not":{"$regex":"test",'$options':'i'}}},
                             {'EMAIL_ID':{"$not":{"$regex":"1gen",'$options':'i'}}}]}},
            {'$group':{'_id':'','ID':{'$addToSet':'$schoolId._id'},'dn':{'$first':'$DISTRICT_ID.DISTRICT_NAME'}}},
                  {'$project':{'_id':1,'school_count':{'$size':'$ID'},'district':'$dn'}}
                  ])))
    df2 = DataFrame(list(collection1.aggregate([ {"$match":
         {'$and': [
              {'ROLE_ID._id' :{'$eq':ObjectId("5f155b8a3b6800007900da2a")}},
                {"IS_DISABLED":{"$ne":"Y"}},
                  {"IS_BLOCKED":{"$ne":"Y"}},
                 {"INCOMPLETE_SIGNUP":{"$ne":"Y"}},
                { 'USER_NAME':{"$not":{"$regex":"test",'$options':'i'}}},
                { 'USER_NAME':{"$not":{"$regex":"1gen",'$options':'i'}}},
#                  {'IS_PORTAL':'Y'},
                 {'EMAIL_ID':{'$ne':''}},
                {"schoolId._id":{"$in":db.school_master.distinct( "_id", { "IS_PORTAL": "Y" ,"CATEGORY":{'$regex':'UWBA', '$options':'i'}})}},
#                  {'DISTRICT_ID._id':{'$eq':ObjectId(""+districtid+"")}},
                 {'schoolId.NAME':{"$not":{"$regex":"test",'$options':'i'}}},
             {'schoolId.BLOCKED_BY_CAP':{'$exists':False}},
                           {'EMAIL_ID':{"$not":{"$regex":"test",'$options':'i'}}},
                             {'EMAIL_ID':{"$not":{"$regex":"1gen",'$options':'i'}}}]}},
            {'$group':{'_id':'','ID':{'$addToSet':'$_id'}}},
                  {'$project':{'_id':1,'teacher_count':{'$size':'$ID'}}}
                  ])))
    df5 = DataFrame(list(collection1.aggregate([ {"$match":
         {'$and': [
              {'ROLE_ID._id' :{'$eq':ObjectId("5f155b8a3b6800007900da2b")}},
                {"IS_DISABLED":{"$ne":"Y"}},
                  {"IS_BLOCKED":{"$ne":"Y"}},
                 {"INCOMPLETE_SIGNUP":{"$ne":"Y"}},
                { 'USER_NAME':{"$not":{"$regex":"test",'$options':'i'}}},
                { 'USER_NAME':{"$not":{"$regex":"1gen",'$options':'i'}}},
#                  {'IS_PORTAL':'Y'},
                  {"schoolId._id":{"$in":db.school_master.distinct( "_id", { "IS_PORTAL": "Y" ,"CATEGORY":{'$regex':'UWBA', '$options':'i'}})}},
                 {'EMAIL_ID':{'$ne':''}},
#                  {'DISTRICT_ID._id':{'$eq':ObjectId(""+districtid+"")}},
                 {'schoolId.NAME':{"$not":{"$regex":"test",'$options':'i'}}},
             {'schoolId.BLOCKED_BY_CAP':{'$exists':False}},
                           {'EMAIL_ID':{"$not":{"$regex":"test",'$options':'i'}}},
                             {'EMAIL_ID':{"$not":{"$regex":"1gen",'$options':'i'}}}]}},
            {'$group':{'_id':'','ID':{'$addToSet':'$_id'}}},
                  {'$project':{'_id':1,'family_count':{'$size':'$ID'}}}
                  ])))
    today1= datetime.utcnow()
    tod1= today1+ timedelta(hours=4)
    start1= tod1-timedelta(days=30)
    df3=DataFrame(list(collection2.aggregate([
     {"$match":
         {'$and': [
    # //          {'ROLE_ID._id' :{'$':ObjectId("5f155b8a3b6800007900da2b")}},
                {"USER_ID.IS_DISABLED":{"$ne":"Y"}},
                  {"USER_ID.IS_BLOCKED":{"$ne":"Y"}},
                 {"USER_ID.INCOMPLETE_SIGNUP":{"$ne":"Y"}},
                { 'USER_ID.USER_NAME':{"$not":{"$regex":"test",'$options':'i'}}},
                { 'USER_ID.USER_NAME':{"$not":{"$regex":"1gen",'$options':'i'}}},
    # //             {'USER_ID.IS_PORTAL':'Y'},
                 {'USER_ID.EMAIL_ID':{'$ne':''}},
#                  {'USER_ID.DISTRICT_ID._id':{'$eq':ObjectId(""+districtid+"")}},
                               {"USER_ID.schoolId._id":{"$in":db.school_master.distinct( "_id", { "IS_PORTAL": "Y" ,"CATEGORY":{'$regex':'UWBA', '$options':'i'}})}},
    #              {'USER_ID.DISTRICT_ID.DISTRICT_NAME':'Sarasota County'},
                 {'MODIFIED_DATE':{'$gte':datetime(2020,8,1)}},
    # //              {'EMAIL_ID':{'$regex':'broward','$options':'i'}},
                 {'USER_ID.schoolId.NAME':{"$not":{"$regex":"test",'$options':'i'}}},
             {'USER_ID.schoolId.BLOCKED_BY_CAP':{'$exists':False}},
                           {'USER_ID.EMAIL_ID':{"$not":{"$regex":"test",'$options':'i'}}},
                             {'USER_ID.EMAIL_ID':{"$not":{"$regex":"1gen",'$options':'i'}}}]}},
            {'$group':{'_id':'','pc':{'$sum':1},'MINDFUL_MINUTES':{'$sum':{'$round':[{'$divide':[{'$subtract':['$CURSOR_END','$cursorStart']}, 60]},2]}}}},
                  {'$project':{'_id':1,'practice_sessions':'$pc','MINDFUL_MINUTES':'$MINDFUL_MINUTES'}}])))
   

    df4=DataFrame(list(collection3.aggregate([{"$match":
         {'$and': [
    #           {'USER_ID.ROLE_ID._id' :{'$eq':ObjectId("5f155b8a3b6800007900da2b")}},
                {"USER_ID.IS_DISABLED":{"$ne":"Y"}},
                  {"USER_ID.IS_BLOCKED":{"$ne":"Y"}},
                 {"USER_ID.INCOMPLETE_SIGNUP":{"$ne":"Y"}},
                { 'USER_ID.USER_NAME':{"$not":{"$regex":"test",'$options':'i'}}},
                { 'USER_ID.USER_NAME':{"$not":{"$regex":"1gen",'$options':'i'}}},
                {'USER_ID.schoolId._id':{'$ne':None}},
    # //               {'IS_ADMIN':'Y'},
                  {"USER_ID.schoolId._id":{"$in":db.school_master.distinct( "_id", { "IS_PORTAL": "Y" ,"CATEGORY":{'$regex':'UWBA', '$options':'i'}})}},
    # //             {'USER_ID.IS_PORTAL':'Y'},
                 {'USER_ID.EMAIL_ID':{'$ne':''}},
#                  {'USER_ID.DISTRICT_ID._id':{'$eq':ObjectId(""+districtid+"")}},
    #              {'USER_ID.DISTRICT_ID.DISTRICT_NAME':'Broward County Public Schools'},
                 {'LAST_LOGGED_IN':{'$gte':start1}},
    # //              {'EMAIL_ID':{'$regex':'broward','$options':'i'}},
                 {'USER_ID.schoolId.NAME':{"$not":{"$regex":"test",'$options':'i'}}},
             {'USER_ID.schoolId.BLOCKED_BY_CAP':{'$exists':False}},
                           {'USER_ID.EMAIL_ID':{"$not":{"$regex":"test",'$options':'i'}}},
                             {'USER_ID.EMAIL_ID':{"$not":{"$regex":"1gen",'$options':'i'}}}]}},
            {'$group':{'_id':'','pc':{'$sum':1}}},
                  {'$project':{'_id':1,'logins':'$pc'}}])))
    df6=DataFrame(list(collection2.aggregate([
     {"$match":
         {'$and': [
             {'USER_ID.ROLE_ID._id' :{'$ne':ObjectId("5f155b8a3b6800007900da2b")}},
                {"USER_ID.IS_DISABLED":{"$ne":"Y"}},
                  {"USER_ID.IS_BLOCKED":{"$ne":"Y"}},
                 {"USER_ID.INCOMPLETE_SIGNUP":{"$ne":"Y"}},
                { 'USER_ID.USER_NAME':{"$not":{"$regex":"test",'$options':'i'}}},
                { 'USER_ID.USER_NAME':{"$not":{"$regex":"1gen",'$options':'i'}}},
    # //             {'USER_ID.IS_PORTAL':'Y'},
                 {'USER_ID.EMAIL_ID':{'$ne':''}},
#                  {'USER_ID.DISTRICT_ID._id':{'$eq':ObjectId(""+districtid+"")}},
                               {"USER_ID.schoolId._id":{"$in":db.school_master.distinct( "_id", { "IS_PORTAL": "Y" ,"CATEGORY":{'$regex':'UWBA', '$options':'i'}})}},
    #              {'USER_ID.DISTRICT_ID.DISTRICT_NAME':'Sarasota County'},
                 {'MODIFIED_DATE':{'$gte':datetime(2020,8,1)}},
    # //              {'EMAIL_ID':{'$regex':'broward','$options':'i'}},
                 {'USER_ID.schoolId.NAME':{"$not":{"$regex":"test",'$options':'i'}}},
             {'USER_ID.schoolId.BLOCKED_BY_CAP':{'$exists':False}},
                           {'USER_ID.EMAIL_ID':{"$not":{"$regex":"test",'$options':'i'}}},
                             {'USER_ID.EMAIL_ID':{"$not":{"$regex":"1gen",'$options':'i'}}}]}},
            {'$group':{'_id':'','pc':{'$sum':1},'MINDFUL_MINUTES':{'$sum':{'$round':[{'$divide':[{'$subtract':['$CURSOR_END','$cursorStart']}, 60]},2]}}}},
                  {'$project':{'_id':1,'practice_sessions_t':'$pc'}}])))
   
    df7=DataFrame(list(collection2.aggregate([
     {"$match":
         {'$and': [
             {'USER_ID.ROLE_ID._id' :{'$eq':ObjectId("5f155b8a3b6800007900da2b")}},
                {"USER_ID.IS_DISABLED":{"$ne":"Y"}},
                  {"USER_ID.IS_BLOCKED":{"$ne":"Y"}},
                 {"USER_ID.INCOMPLETE_SIGNUP":{"$ne":"Y"}},
                { 'USER_ID.USER_NAME':{"$not":{"$regex":"test",'$options':'i'}}},
                { 'USER_ID.USER_NAME':{"$not":{"$regex":"1gen",'$options':'i'}}},
    # //             {'USER_ID.IS_PORTAL':'Y'},
                 {'USER_ID.EMAIL_ID':{'$ne':''}},
#                  {'USER_ID.DISTRICT_ID._id':{'$eq':ObjectId(""+districtid+"")}},
                               {"USER_ID.schoolId._id":{"$in":db.school_master.distinct( "_id", { "IS_PORTAL": "Y" ,"CATEGORY":{'$regex':'UWBA', '$options':'i'}})}},
    #              {'USER_ID.DISTRICT_ID.DISTRICT_NAME':'Sarasota County'},
                 {'MODIFIED_DATE':{'$gte':datetime(2020,8,1)}},
    # //              {'EMAIL_ID':{'$regex':'broward','$options':'i'}},
                 {'USER_ID.schoolId.NAME':{"$not":{"$regex":"test",'$options':'i'}}},
             {'USER_ID.schoolId.BLOCKED_BY_CAP':{'$exists':False}},
                           {'USER_ID.EMAIL_ID':{"$not":{"$regex":"test",'$options':'i'}}},
                             {'USER_ID.EMAIL_ID':{"$not":{"$regex":"1gen",'$options':'i'}}}]}},
            {'$group':{'_id':'','pc':{'$sum':1},'MINDFUL_MINUTES':{'$sum':{'$round':[{'$divide':[{'$subtract':['$CURSOR_END','$cursorStart']}, 60]},2]}}}},
                  {'$project':{'_id':1,'practice_sessions_p':'$pc'}}])))
   

    sc=[0]
    try:
        sc=df1['school_count']
    except:
        sc=[0]
        
    tc=[0]
    try:
        tc=df2['teacher_count']
    except:
        tc=[0]
    
    pct=[0]
    try:
        pct=df6['practice_sessions_t']
    except:
        pct=[0]
    pcp=[0]
    try:
        pcp=df7['practice_sessions_p']
    except:
        pcp=[0]
    mm=[0]
    try:
        mm=df3['MINDFUL_MINUTES']
    except:
        mm=[0]
    
    lc=[0]
    try:
        lc=df4['logins']
    except:
        lc=[0]
        
    fc=[0]
    try:
        fc=df5['family_count']
    except:
        fc=[0]
    
    
    
    
    dn=[0]
    try:
        dn=df1['district']
    except:
        dn=[0]
    
    
#     print(lc)
    
    data={"schoolcount":str(sc[0]),"teachercount":str(tc[0]),"familycount":str(fc[0]),"teacherpracticecount":str(pct[0]),"parentspracticecount":str(pcp[0]),"logincount":str(lc[0]),
          'MINDFUL_MINUTES':str(mm[0]),'district':'UWBA Works'}
    return json.dumps(data)







# =======================


@app.route('/portal_newd2_test_api/<smcategory>')
def portal_newd2_test_api(smcategory):   
    from flask import request
    username123 = request.args.get('name')
    username = urllib.parse.quote_plus('admin')
    password = urllib.parse.quote_plus('test!_2o20')
    client = MongoClient("mongodb://%s:%s@52.37.152.224:27017/" % (username, password))
    db=client.compass
    collection = db.school_master
    print(smcategory,"uadhauisdhaiusdasu") 
    from bson.objectid import ObjectId
    smcategory1=smcategory.replace("%20"," ")
    
    import re
    smcategory12=smcategory1.replace("?"," hello ")

    smc=re.split(" hello ", smcategory12)
    smcategory=smc[0]
    print(smcategory,"school name")
    print(smc,"list")
    newd=username123
    print(newd,"hola")
    query=[{'$match':{'$and':[
    { 'CATEGORY':{"$regex":""+smcategory+"",'$options':'i'}},
    { 'NAME':{"$regex":""+newd+"",'$options':'i'}},
    
    ]
    }},
    {"$project":{"_id":0,
    "UMSCHOOLID":'$_id',
    "UMSCHOOLNAME":'$NAME',
    "is_paid":"$FULL_EXPERIENCE",
                }},
    ]
    merge11=list(collection.aggregate(query))

    overallum11=pd.DataFrame(merge11)
    collection = db.district_master
    queryt=[{'$match':{'$and':[
    { 'DISTRICT_NAME':{"$regex":""+smcategory+"",'$options':'i'}},]
    }},
    {"$project":{"_id":0,
    "to_school":'$TOTAL_SCHOOLS',
    
                }},
    ]
    merget=list(collection.aggregate(queryt))

    overallumt=pd.DataFrame(merget)
    discount=0
    try:
        discount=overallumt["to_school"][0]
    except:
        discount=0
#     print(overallum11,"helloooooooooooo1achsdkjcbsdkjcbsdku")
    # print(len(set(list(overallum11["UMSCHOOLID"]))),"school_count")
    lifetimelist=list(set(overallum11["UMSCHOOLID"]))
    total_school=len(lifetimelist)
    collection = db.user_master
    query=[{'$match':{'$and':[{
    "schoolId._id": {
    "$in":lifetimelist
    }   
    },
    { 'USER_NAME':{"$not":{"$regex":"test",'$options':'i'}}},
    {'EMAIL_ID':{"$not":{"$regex":"test",'$options':'i'}}},
    {'EMAIL_ID':{"$not":{"$regex":"1gen",'$options':'i'}}},
    {'INCOMPLETE_SIGNUP':{"$ne":'Y'}},
    {'IS_DISABLED':{"$ne":'Y'}},
    {'IS_BLOCKED':{"$ne":'Y'}},
    {'schoolId.BLOCKED_BY_CAP':{'$exists':0}},
    ]
    }},
    {"$project":{"_id":0,
    'ROLE':'$ROLE_ID.ROLE_NAME',
    'UMUSER_ID':'$_id',"USER_NAME":'$USER_NAME',
    "UMSCHOOLID":'$schoolId._id',
    "DISTRICT_NAME":"$DISTRICT_ID.DISTRICT_NAME",
                 "UMSCHOOLNAME":'$schoolId.NAME',
                }},
    ]
    merge1=list(collection.aggregate(query))
    overallum=pd.DataFrame(merge1)
#     print(overallum,"overallum")
    email=""
    schoolid=[]
    try:
        email=list(overallum["UMUSER_ID"])
        schoolid=list(overallum["UMSCHOOLID"])
    except:
        pass
    ################################sub_master################################
    collection = db.subscription_master
    qr=[
    {"$match":{"$and":[{'USER_ID._id':{"$in":email}},]}},
    {"$project":{"_id":0,
    'SMUSER_ID':'$USER_ID._id',
    "RENEWAL_DATE":"$SUBSCRIPTION_EXPIRE_DATE",
    }},]
    merge=[]
    overall=[]
    mergeddf=[]
    try:
        merge=list(collection.aggregate(qr))
        overall=pd.DataFrame(merge)
        mergeddf=pd.merge(overallum, overall, how='left', left_on='UMUSER_ID', right_on='SMUSER_ID')
    except:
        pass
    db=client.compass
    collection = db.audio_track_master
    qra=[
    {"$match":{'$and':[
        {'USER_ID.USER_NAME':{"$not":{"$regex":"test",'$options':'i'}}},
    {'USER_ID.EMAIL_ID':{"$not":{"$regex":"test",'$options':'i'}}},
    {'USER_ID.EMAIL_ID':{"$not":{"$regex":"1gen",'$options':'i'}}},
    {'USER_ID.USER_NAME':{'$not':{'$regex':'1gen', '$options':'i'}}},
    {'USER_ID.INCOMPLETE_SIGNUP':{"$ne":'Y'}}, 
    {'USER_ID.IS_BLOCKED':{"$ne":'Y'}}, 
    {'USER_ID.IS_DISABLED':{"$ne":'Y'}}, {'USER_ID.schoolId.NAME':{'$not':{'$regex':'test', '$options':'i'}}},
    {'USER_ID.schoolId._id':{'$in':schoolid}},
    ]}},
    {'$group':{'_id':'$USER_ID.schoolId._id', 
    'atdLastpractice':{'$max':'$MODIFIED_DATE'},
    'atdPracticecount':{'$sum':1},
    'atdTotal_Mindful_Minutes':{"$sum":{"$round":[{"$divide":[{"$subtract":['$CURSOR_END','$cursorStart']}, 60]},2]}}}}]
    merge110=[]
    atd=[]
    mmm=0
    try:
        merge110=list(collection.aggregate(qra))
        atd=pd.DataFrame(merge110)
        mmm=str(round(sum(atd["atdTotal_Mindful_Minutes"])))
        finalmerge=pd.merge(mergeddf, atd, how='left', left_on='UMSCHOOLID', right_on='_id')
        finaldata=finalmerge[["DISTRICT_NAME","UMSCHOOLID","UMSCHOOLNAME","UMUSER_ID","ROLE","atdLastpractice","RENEWAL_DATE","atdPracticecount"]]
        finaldata["atdPracticecount"] = finaldata['atdPracticecount'].fillna(0)
        finaldata["atdPracticecount"] = finaldata['atdPracticecount'].astype('int')
        finaldata["atdPracticecount"] = finaldata['atdPracticecount'].astype('str')
    except:
        pass
#     print(finaldata)
    usercount=0
    try:
        usercount=len(finaldata[finaldata["ROLE"]=='user'])
    except:
        pass
    familycount=0
    try:
        familycount=len(finaldata[finaldata["ROLE"]=='PRESENT'])
    except:
        pass

    data2=[]
    totschnew=0
    try:
        totschnew=len(overallum11[overallum11["is_paid"]=="Y"])
        
    except:
        pass
    try:
        overallum11["is_paid"].fillna("N",inplace=True)
    except:
        overallum11["is_paid"]="N"
    overallum11["UMSCHOOLID"] = overallum11["UMSCHOOLID"].astype('str')
    overallum11=overallum11.sort_values(by=['UMSCHOOLNAME'], ascending=True)
    overallum11=overallum11.reset_index()
    
    
    # print(overallum11)
    for i in range(len(overallum11)):
        data2.append({"school_id":overallum11["UMSCHOOLID"][i],"school_name":overallum11["UMSCHOOLNAME"][i],"is_paid":overallum11["is_paid"][i]})
    finaldata={"data":data2,"total_school_district":discount,"total_school":totschnew,"user_count":usercount,"family_count":familycount,"mindful_minutes":mmm}
    return json.dumps(finaldata)


@app.route('/portal_newd2_api/<smcategory>')
def portal_newd2_api(smcategory):   
    from flask import request
    username123 = request.args.get('name')
    username = urllib.parse.quote_plus('admin')
    password = urllib.parse.quote_plus('A_dM!n|#!_2o20')
    client = MongoClient("mongodb://%s:%s@44.234.88.150:27017/" % (username, password))
    db=client.compass
    collection = db.school_master
    print(smcategory,"uadhauisdhaiusdasu") 
    from bson.objectid import ObjectId
    smcategory1=smcategory.replace("%20"," ")
    
    import re
    smcategory12=smcategory1.replace("?"," hello ")

    smc=re.split(" hello ", smcategory12)
    smcategory=smc[0]
    print(smcategory,"school name")
    print(smc,"list")
    newd=username123
    print(newd,"hola")
    query=[{'$match':{'$and':[
    { 'CATEGORY':{"$regex":""+smcategory+"",'$options':'i'}},
    { 'NAME':{"$regex":""+newd+"",'$options':'i'}},
    
    ]
    }},
    {"$project":{"_id":0,
    "UMSCHOOLID":'$_id',
    "UMSCHOOLNAME":'$NAME',
    "is_paid":"$FULL_EXPERIENCE",
                }},
    ]
    merge11=list(collection.aggregate(query))

    overallum11=pd.DataFrame(merge11)
    collection = db.district_master
    queryt=[{'$match':{'$and':[
    { 'DISTRICT_NAME':{"$regex":""+smcategory+"",'$options':'i'}},]
    }},
    {"$project":{"_id":0,
    "to_school":'$TOTAL_SCHOOLS',
    
                }},
    ]
    merget=list(collection.aggregate(queryt))

    overallumt=pd.DataFrame(merget)
    discount=0
    try:
        discount=overallumt["to_school"][0]
    except:
        discount=0
#     print(overallum11,"helloooooooooooo1achsdkjcbsdkjcbsdku")
    # print(len(set(list(overallum11["UMSCHOOLID"]))),"school_count")
    lifetimelist=list(set(overallum11["UMSCHOOLID"]))
    total_school=len(lifetimelist)
    collection = db.user_master
    query=[{'$match':{'$and':[{
    "schoolId._id": {
    "$in":lifetimelist
    }   
    },
    { 'USER_NAME':{"$not":{"$regex":"test",'$options':'i'}}},
    {'EMAIL_ID':{"$not":{"$regex":"test",'$options':'i'}}},
    {'EMAIL_ID':{"$not":{"$regex":"1gen",'$options':'i'}}},
    {'INCOMPLETE_SIGNUP':{"$ne":'Y'}},
    {'IS_DISABLED':{"$ne":'Y'}},
    {'IS_BLOCKED':{"$ne":'Y'}},
    {'schoolId.BLOCKED_BY_CAP':{'$exists':0}},
    ]
    }},
    {"$project":{"_id":0,
    'ROLE':'$ROLE_ID.ROLE_NAME',
    'UMUSER_ID':'$_id',"USER_NAME":'$USER_NAME',
    "UMSCHOOLID":'$schoolId._id',
    "DISTRICT_NAME":"$DISTRICT_ID.DISTRICT_NAME",
                 "UMSCHOOLNAME":'$schoolId.NAME',
                }},
    ]
    merge1=list(collection.aggregate(query))
    overallum=pd.DataFrame(merge1)
#     print(overallum,"overallum")
    email=""
    schoolid=[]
    try:
        email=list(overallum["UMUSER_ID"])
        schoolid=list(overallum["UMSCHOOLID"])
    except:
        pass
    ################################sub_master################################
    collection = db.subscription_master
    qr=[
    {"$match":{"$and":[{'USER_ID._id':{"$in":email}},]}},
    {"$project":{"_id":0,
    'SMUSER_ID':'$USER_ID._id',
    "RENEWAL_DATE":"$SUBSCRIPTION_EXPIRE_DATE",
    }},]
    merge=[]
    overall=[]
    mergeddf=[]
    try:
        merge=list(collection.aggregate(qr))
        overall=pd.DataFrame(merge)
        mergeddf=pd.merge(overallum, overall, how='left', left_on='UMUSER_ID', right_on='SMUSER_ID')
    except:
        pass
    db=client.compass
    collection = db.audio_track_master
    qra=[
    {"$match":{'$and':[
        {'USER_ID.USER_NAME':{"$not":{"$regex":"test",'$options':'i'}}},
    {'USER_ID.EMAIL_ID':{"$not":{"$regex":"test",'$options':'i'}}},
    {'USER_ID.EMAIL_ID':{"$not":{"$regex":"1gen",'$options':'i'}}},
    {'USER_ID.USER_NAME':{'$not':{'$regex':'1gen', '$options':'i'}}},
    {'USER_ID.INCOMPLETE_SIGNUP':{"$ne":'Y'}}, 
    {'USER_ID.IS_BLOCKED':{"$ne":'Y'}}, 
    {'USER_ID.IS_DISABLED':{"$ne":'Y'}}, {'USER_ID.schoolId.NAME':{'$not':{'$regex':'test', '$options':'i'}}},
    {'USER_ID.schoolId._id':{'$in':schoolid}},
    ]}},
    {'$group':{'_id':'$USER_ID.schoolId._id', 
    'atdLastpractice':{'$max':'$MODIFIED_DATE'},
    'atdPracticecount':{'$sum':1},
    'atdTotal_Mindful_Minutes':{"$sum":{"$round":[{"$divide":[{"$subtract":['$CURSOR_END','$cursorStart']}, 60]},2]}}}}]
    merge110=[]
    atd=[]
    mmm=0
    try:
        merge110=list(collection.aggregate(qra))
        atd=pd.DataFrame(merge110)
        mmm=str(round(sum(atd["atdTotal_Mindful_Minutes"])))
        finalmerge=pd.merge(mergeddf, atd, how='left', left_on='UMSCHOOLID', right_on='_id')
        finaldata=finalmerge[["DISTRICT_NAME","UMSCHOOLID","UMSCHOOLNAME","UMUSER_ID","ROLE","atdLastpractice","RENEWAL_DATE","atdPracticecount"]]
        finaldata["atdPracticecount"] = finaldata['atdPracticecount'].fillna(0)
        finaldata["atdPracticecount"] = finaldata['atdPracticecount'].astype('int')
        finaldata["atdPracticecount"] = finaldata['atdPracticecount'].astype('str')
    except:
        pass
#     print(finaldata)
    usercount=0
    try:
        usercount=len(finaldata[finaldata["ROLE"]=='user'])
    except:
        pass
    familycount=0
    try:
        familycount=len(finaldata[finaldata["ROLE"]=='PRESENT'])
    except:
        pass

    data2=[]
    totschnew=0
    try:
        totschnew=len(overallum11[overallum11["is_paid"]=="Y"])
        
    except:
        pass
    try:
        overallum11["is_paid"].fillna("N",inplace=True)
    except:
        overallum11["is_paid"]="N"
    overallum11["UMSCHOOLID"] = overallum11["UMSCHOOLID"].astype('str')
    overallum11=overallum11.sort_values(by=['UMSCHOOLNAME'], ascending=True)
    overallum11=overallum11.reset_index()
    
    
    # print(overallum11)
    for i in range(len(overallum11)):
        data2.append({"school_id":overallum11["UMSCHOOLID"][i],"school_name":overallum11["UMSCHOOLNAME"][i],"is_paid":overallum11["is_paid"][i]})
    finaldata={"data":data2,"total_school_district":discount,"total_school":totschnew,"user_count":usercount,"family_count":familycount,"mindful_minutes":mmm}
    return json.dumps(finaldata)




@app.route('/portal_test_new_api/<smcategory>')
def portal_testing_new_api(smcategory):    
    username = urllib.parse.quote_plus('admin')
    password = urllib.parse.quote_plus('test!_2o20')
    client = MongoClient("mongodb://%s:%s@52.37.152.224:27017/" % (username, password))
    db=client.compass
    collection = db.school_master
    from bson.objectid import ObjectId
#     smcategory="Agawam School district"
    query=[{'$match':{'$and':[
    { 'CATEGORY':{"$regex":""+smcategory+"",'$options':'i'}},]
    }},
    {"$project":{"_id":0,
    "UMSCHOOLID":'$_id',
    "UMSCHOOLNAME":'$NAME',
    "is_paid":"$FULL_EXPERIENCE",
                }},
    ]
    merge11=list(collection.aggregate(query))

    overallum11=pd.DataFrame(merge11)
    
    ###################
    collection = db.district_master
    queryt=[{'$match':{'$and':[
    { 'DISTRICT_NAME':{"$regex":""+smcategory+"",'$options':'i'}},]
    }},
    {"$project":{"_id":0,
    "to_school":'$TOTAL_SCHOOLS',
    
                }},
    ]
    merget=list(collection.aggregate(queryt))

    overallumt=pd.DataFrame(merget)
    discount=0
    try:
        discount=overallumt["to_school"][0]
    except:
        discount=0
#     print(overallum11,"helloooooooooooo1achsdkjcbsdkjcbsdku")
    # print(len(set(list(overallum11["UMSCHOOLID"]))),"school_count")
    lifetimelist=[]
    try:
        
        lifetimelist=list(set(overallum11["UMSCHOOLID"]))
    except:
        pass
    total_school=len(lifetimelist)
    collection = db.user_master
    query=[{'$match':{'$and':[{
    "schoolId._id": {
    "$in":lifetimelist
    }   
    },
    
    {'INCOMPLETE_SIGNUP':{"$ne":'Y'}},
    {'IS_DISABLED':{"$ne":'Y'}},
    {'IS_BLOCKED':{"$ne":'Y'}},
    {'schoolId.BLOCKED_BY_CAP':{'$exists':0}},
    ]
    }},
    {"$project":{"_id":0,
    'ROLE':'$ROLE_ID.ROLE_NAME',
    'UMUSER_ID':'$_id',"USER_NAME":'$USER_NAME',
    "UMSCHOOLID":'$schoolId._id',
    "DISTRICT_NAME":"$DISTRICT_ID.DISTRICT_NAME",
                 "UMSCHOOLNAME":'$schoolId.NAME',
                }},
    ]
    merge1=list(collection.aggregate(query))
    overallum=pd.DataFrame(merge1)
#     print(overallum,"overallum")
    email=""
    schoolid=[]
    try:
        email=list(overallum["UMUSER_ID"])
        schoolid=list(overallum["UMSCHOOLID"])
    except:
        pass
    ################################sub_master################################
    collection = db.subscription_master
    qr=[
    {"$match":{"$and":[{'USER_ID._id':{"$in":email}},]}},
    {"$project":{"_id":0,
    'SMUSER_ID':'$USER_ID._id',
    "RENEWAL_DATE":"$SUBSCRIPTION_EXPIRE_DATE",
    }},]
    merge=[]
    overall=[]
    mergeddf=[]
    try:
        merge=list(collection.aggregate(qr))
        overall=pd.DataFrame(merge)
        mergeddf=pd.merge(overallum, overall, how='left', left_on='UMUSER_ID', right_on='SMUSER_ID')
    except:
        pass
    db=client.compass
    collection = db.audio_track_master
    qra=[
    {"$match":{'$and':[
    {'USER_ID.INCOMPLETE_SIGNUP':{"$ne":'Y'}}, 
    {'USER_ID.IS_BLOCKED':{"$ne":'Y'}}, 
    {'USER_ID.IS_DISABLED':{"$ne":'Y'}},
    {'USER_ID.schoolId._id':{'$in':schoolid}},
    ]}},
    {'$group':{'_id':'$USER_ID.schoolId._id', 
    'atdLastpractice':{'$max':'$MODIFIED_DATE'},
    'atdPracticecount':{'$sum':1},
    'atdTotal_Mindful_Minutes':{"$sum":{"$round":[{"$divide":[{"$subtract":['$CURSOR_END','$cursorStart']}, 60]},2]}}}}]
    merge110=[]
    atd=[]
    mmm=0
    try:
        merge110=list(collection.aggregate(qra))
        atd=pd.DataFrame(merge110)
        mmm=str(round(sum(atd["atdTotal_Mindful_Minutes"])))
        finalmerge=pd.merge(mergeddf, atd, how='left', left_on='UMSCHOOLID', right_on='_id')
        finaldata=finalmerge[["DISTRICT_NAME","UMSCHOOLID","UMSCHOOLNAME","UMUSER_ID","ROLE","atdLastpractice","RENEWAL_DATE","atdPracticecount"]]
        finaldata["atdPracticecount"] = finaldata['atdPracticecount'].fillna(0)
        finaldata["atdPracticecount"] = finaldata['atdPracticecount'].astype('int')
        finaldata["atdPracticecount"] = finaldata['atdPracticecount'].astype('str')
    except:
        pass
#     print(finaldata)
    usercount=0
    try:
        usercount=len(finaldata[finaldata["ROLE"]=='user'])
    except:
        pass
    familycount=0
    try:
        familycount=len(finaldata[finaldata["ROLE"]=='PRESENT'])
    except:
        pass

    data2=[]
    totschnew=0
    try:
        totschnew=len(overallum11[overallum11["is_paid"]=="Y"])
        
    except:
        pass
    try:
        overallum11["is_paid"].fillna("N",inplace=True)
    except:
        overallum11["is_paid"]="N"
    overallum11["UMSCHOOLID"] = overallum11["UMSCHOOLID"].astype('str')
    overallum11=overallum11.sort_values(by=['UMSCHOOLNAME'], ascending=True)
    overallum11=overallum11.reset_index()
    for i in range(len(overallum11)):
        data2.append({"school_id":overallum11["UMSCHOOLID"][i],"school_name":overallum11["UMSCHOOLNAME"][i],"is_paid":overallum11["is_paid"][i]})
    finaldata={"data":data2,"total_school_district":discount,"total_school":totschnew,"user_count":usercount,"family_count":familycount,"mindful_minutes":mmm}
    return json.dumps(finaldata)





@app.route('/bubblecum/<disid>/csv')
def schdistrictCUM(disid):  
    disdic={'5f2609807a1c0000950bb465':'Middleton - Cross Plains Area School District',
    '5f2609807a1c0000950bb475':'Agawam School district',
    '5f2609807a1c0000950bb481':'Alameda Unified School District',
    '5f2609807a1c0000950bb47a':'Alpine School District',
    '5f2609807a1c0000950bb47b':'Ann Arbor Public Schools',
    '5f2609807a1c0000950bb463':'Austin Independent School District',
    '5f59e4836451a9089d7d4007':'Belleville School District',
    '5f2609807a1c0000950bb46d':'Broward County Public Schools',
    '5f2609807a1c0000950bb46c':'Chico Unified School District',
    '5f2609807a1c0000950bb460':'Clarksville-Montgomery County School System',
    '5f2609807a1c0000950bb47f':'Community Consolidated School District 89',
    '5f2609807a1c0000950bb45c':'Comox Valley School District(sd71)',
    '5f2609807a1c0000950bb480':'Dell Texas',
    '5f7413ef9387fd71ce6387cb':'Douglas County School District',
    '5f895191609e08b76029f641':'Early learning Sarasota',
    '5f2609807a1c0000950bb462':'Englewood Cliffs Public Schools',
    '5f2609807a1c0000950bb461':'Englewood Public School District',
    '5f2609807a1c0000950bb45e':'Fairfield-Suisun Unified School District',
    '5f2609807a1c0000950bb47d':'Flint Public Schools',
    '5f2609807a1c0000950bb46b':'FundaciÃ³n La Puerta',
    '5f2609807a1c0000950bb450':'Goleta District',
    '5f2609807a1c0000950bb474':'Greenburgh-North Castle (GNC) Union Free School District',
    '5f2609807a1c0000950bb45f':'Griffin-Spalding County School System',
    '5f2609807a1c0000950bb476':'Hillsborough County',
    '5f2609807a1c0000950bb455':'Krum Independent School District',
    '5f2609807a1c0000950bb47e':'La Joya School District',
    '5f2609807a1c0000950bb467':'Lincolnshire Schools',
    '5f2609807a1c0000950bb45a':'LAUSD',
    '5f2609807a1c0000950bb482':'Massachusetts Institute of Technology',
    '5fb4efce4139b9d4c5a86a69':'Mt. Lebanon School District',
    '5fbcdf0ba84e48a64412a798':'Needham School District',
    '5f7c01fa9387fd71ce6387cc':'NYC - Queens South',
    '5f6994386451a9089d7d4009':'Ogden school district',
    '5f2609807a1c0000950bb472':'Oroville City Elementary School District',
    '5fd704da04a848e368de5dc6':'Oakland Unified School District',
    '5f8fcd33609e08b76029f644':'Paradise Unified School District',
    '5f2609807a1c0000950bb466':'Pinellas County Schools',
    '5f2609807a1c0000950bb471':'Racine Unified Schools',
    '5f6d7cbce6452eb06384db20':'Salt Lake City School District',
    '5f2609807a1c0000950bb478':'San Diego Unified School District',
    '5f2609807a1c0000950bb470':'San Leandro Unified School District',
    '5f2609807a1c0000950bb477':'Sarasota County',
    '5f2609807a1c0000950bb473':'Skillman Foundation',
    '5f2609807a1c0000950bb46a':'Springfield Public Schools',
    '5f2609807a1c0000950bb468':'Utah Board of Education',
    '5f698b826451a9089d7d4008':'Wayne Metro',
    '5f2609807a1c0000950bb45b':'Westfield Public School District',
    '5f2609807a1c0000950bb368':'Wichita Falls Independent School District',
    '5f2609807a1c0000950bb45d':'Youngstown',
    '5f2609807a1c0000950bb464':'Equity Education',
    '5f2609807a1c0000950bb469':'LSF -  Head Start',
    '5f2609807a1c0000950bb46e':'District 25 New York Schools',
    '5f2609807a1c0000950bb46f':'Paradise Schools',
    '5f2609807a1c0000950bb479':'Panorama Education',
    '5f2609807a1c0000950bb47c':'Hawaii Public Schools',
    '5f9aa5e526edbed399d56c92':'Hamilton-Wenham Regional School District',
    '5fe2e1ee4d0ca68d7baf889c':'LSF-Head Start',
    '5fe2e25d4d0ca68d7baf889d':'BGCA',
    '5fe318b14d0ca68d7baf889e':'BLUE',
    '5ffd8176469a86e28635f512':'Chula Vista Elementary School District',
    '6017ab3043ca9c39151838d4':'Oswego School District',
    '60239a84e57dc27613699d57':'Austin Independent School District',
    '6023a6d79e8e623753fc305c':'Boulder Valley School District',
    '6023a7019e8e623753fc305d':'Miami-Dade County Public Schools',
    '6023a7269e8e623753fc305e':'Fulton County School System',
    '6023a7499e8e623753fc305f':'Manatee County School District',
    '6023a76f9e8e623753fc3060':'San Jose Unified School District',
    '6023a7949e8e623753fc3061':'Wasatch County School District'}

    username = urllib.parse.quote_plus('admin')
    password = urllib.parse.quote_plus('A_dM!n|#!_2o20')
    client = MongoClient("mongodb://%s:%s@44.234.88.150:27017/" % (username, password))
    db=client.compass
    dateStr = "2020-01-01T00:00:00.000Z"
    myDatetime = dateutil.parser.parse(dateStr)
    collection = db.user_master
    district=disdic[disid]
    qraaa=[
        {"$match":{'$and':[
        {'USER_NAME':{"$not":{"$regex":"test",'$options':'i'}}},
        {'EMAIL_ID':{"$not":{"$regex":"test",'$options':'i'}}},
        {'EMAIL_ID':{"$not":{"$regex":"1gen",'$options':'i'}}},
        {'USER_NAME':{'$not':{'$regex':'1gen', '$options':'i'}}},
        {'DISTRICT_ID.DISTRICT_NAME':{'$not':{'$regex':'test', '$options':'i'}}},
        {"schoolId._id":{"$in":db.school_master.distinct( "_id", { "IS_PORTAL": "Y","CATEGORY":{'$regex':district, '$options':'i'} } )}},
        {'DISTRICT_ID':{'$exists':1}},
        {'INCOMPLETE_SIGNUP':{"$ne":'Y'}}, 
        {'CREATED_DATE':{"$gte":myDatetime}},
        {'ROLE_ID._id':{'$ne':ObjectId("5f155b8a3b6800007900da2b")}},
        {'IS_BLOCKED':{"$ne":'Y'}}, 
        {'IS_DISABLED':{"$ne":'Y'}}, {'schoolId.NAME':{'$not':{'$regex':'test', '$options':'i'}}},
        ]}},
        {'$group':{'_id':{"district":'$schoolId._id',"month":{"$month": "$CREATED_DATE"}},
        'NAME_DISTRICT':{'$first':'$schoolId.NAME'},
        'usercount':{'$sum':1}}},
            {"$project":{"_id":0,"DISTRICT_ID":"$_id.district","MONTH":"$_id.month","NAME_DISTRICT":1,"usercount":1,
                        }}]
    merge11=list(collection.aggregate(qraaa))
    df1=pd.DataFrame(merge11)
    if df1.empty == True:
        data = [[district,0,disid,0]]
        column_names1 = ["NAME_DISTRICT","usercount","DISTRICT_ID","MONTH"]
        df1 = pd.DataFrame(data,columns = column_names1)
    # df1
    #######################################################
    db=client.compass
    dateStr = "2020-01-01T00:00:00.000Z"
    myDatetime = dateutil.parser.parse(dateStr)
    collection = db.user_master
    qra=[
        {"$match":{'$and':[
        {'USER_NAME':{"$not":{"$regex":"test",'$options':'i'}}},
        {'EMAIL_ID':{"$not":{"$regex":"test",'$options':'i'}}},
        {'EMAIL_ID':{"$not":{"$regex":"1gen",'$options':'i'}}},
        {'USER_NAME':{'$not':{'$regex':'1gen', '$options':'i'}}},
        {'DISTRICT_ID.DISTRICT_NAME':{'$not':{'$regex':'test', '$options':'i'}}},
        {"schoolId._id":{"$in":db.school_master.distinct( "_id", { "IS_PORTAL": "Y","CATEGORY":{'$regex':district, '$options':'i'} } )}},
        {'DISTRICT_ID':{'$exists':1}},
        {'INCOMPLETE_SIGNUP':{"$ne":'Y'}}, 
        {'CREATED_DATE':{"$lt":myDatetime}},
        {'ROLE_ID._id':{'$ne':ObjectId("5f155b8a3b6800007900da2b")}},
        {'IS_BLOCKED':{"$ne":'Y'}}, 
        {'IS_DISABLED':{"$ne":'Y'}}, {'schoolId.NAME':{'$not':{'$regex':'test', '$options':'i'}}},
        ]}},
        {'$group':{'_id':{"district":'$schoolId._id'},
        'NAME_DISTRICT':{'$first':'$schoolId.NAME'},
        'usercount':{'$sum':1}}},
            {"$project":{"_id":0,"DISTRICT_ID":"$_id.district","NAME_DISTRICT":1,"usercount":1,
                        }}]
    merge11233=list(collection.aggregate(qra))
    dfCV=pd.DataFrame(merge11233)
    if dfCV.empty == True:
        data = [[district,0,disid]]
        column_names1 = ["NAME_DISTRICT","usercount","DISTRICT_ID"]
        dfCV = pd.DataFrame(data,columns = column_names1)
    # print(dfCV)
    #########################################################################
    df1=df1.sort_values(by=['NAME_DISTRICT'], ascending=True)
    x=df1[df1['NAME_DISTRICT']=="Belleville School District"]
    x["usercount"].sum()
    dislist=list(set(df1["NAME_DISTRICT"]))
    df2=df1[["NAME_DISTRICT","MONTH","usercount"]]
    overall=pd.DataFrame(columns=["NAME_DISTRICT","MONTH","usercount"])
    # dislist
    result=[]
    for k in dislist:
    #     print(k)
        df45=df2[df2["NAME_DISTRICT"]==k]
        df45.reset_index()
        for i in range(1,13):
            if i in list(df45["MONTH"]):
                pass
    #              print("month_present",i)
            else:
                a=max(list(df45.index))
                df45.loc[a+i] = [k] +[i]+[0]
                # df45.loc[i+len(df45)] = [k] +[i]+[0]
    #     df46=df45.groupby(['NAME_DISTRICT', 'MONTH']).reset_index()
        df46=df45.groupby(['NAME_DISTRICT', 'MONTH']).sum().groupby(level=0).cumsum().reset_index()
    #     print(df46)
        sorted_df =df46.sort_values(by=['MONTH'], ascending=True)
        sorted_df1=sorted_df.reset_index()
        result.append(sorted_df)
    buubleusercount = pd.concat(result)
    # buubleusercount
    ######family ########
    # username = urllib.parse.quote_plus('admin')
    # password = urllib.parse.quote_plus('A_dM!n|#!_2o20')
    # client = MongoClient("mongodb://%s:%s@44.234.88.150:27017/" % (username, password))
    db=client.compass
    dateStr = "2020-01-01T00:00:00.000Z"
    myDatetime = dateutil.parser.parse(dateStr)
    collection = db.user_master
    qraaa=[
        {"$match":{'$and':[
        {'USER_NAME':{"$not":{"$regex":"test",'$options':'i'}}},
        {'EMAIL_ID':{"$not":{"$regex":"test",'$options':'i'}}},
        {'EMAIL_ID':{"$not":{"$regex":"1gen",'$options':'i'}}},
        {'USER_NAME':{'$not':{'$regex':'1gen', '$options':'i'}}},
        {'DISTRICT_ID.DISTRICT_NAME':{'$not':{'$regex':'test', '$options':'i'}}},
        {"schoolId._id":{"$in":db.school_master.distinct( "_id", { "IS_PORTAL": "Y","CATEGORY":{'$regex':district, '$options':'i'} } )}},
        {'DISTRICT_ID':{'$exists':1}},
        {'INCOMPLETE_SIGNUP':{"$ne":'Y'}}, 
        {'CREATED_DATE':{"$gte":myDatetime}},
        {'ROLE_ID._id':{'$eq':ObjectId("5f155b8a3b6800007900da2b")}},
        {'IS_BLOCKED':{"$ne":'Y'}}, 
        {'IS_DISABLED':{"$ne":'Y'}}, {'schoolId.NAME':{'$not':{'$regex':'test', '$options':'i'}}},
        ]}},
        {'$group':{'_id':{"district":'$schoolId._id',"month":{"$month": "$CREATED_DATE"}},
        'NAME_DISTRICT':{'$first':'$schoolId.NAME'},
        'famcount':{'$sum':1}}},
            {"$project":{"_id":0,"DISTRICT_ID":"$_id.district","MONTH":"$_id.month","NAME_DISTRICT":1,"famcount":1,
                        }}]
    merge11=list(collection.aggregate(qraaa))
    df1=pd.DataFrame(merge11)
    if df1.empty == True:
        data = [[district,0,disid,0]]
        column_names1 = ["NAME_DISTRICT","famcount","DISTRICT_ID","MONTH"]
        df1 = pd.DataFrame(data,columns = column_names1)
    # print(df1)
    #######################################################
    db=client.compass
    dateStr = "2020-01-01T00:00:00.000Z"
    myDatetime = dateutil.parser.parse(dateStr)
    collection = db.user_master
    qra=[
        {"$match":{'$and':[
        {'USER_NAME':{"$not":{"$regex":"test",'$options':'i'}}},
        {'EMAIL_ID':{"$not":{"$regex":"test",'$options':'i'}}},
        {'EMAIL_ID':{"$not":{"$regex":"1gen",'$options':'i'}}},
        {'USER_NAME':{'$not':{'$regex':'1gen', '$options':'i'}}},
        {'DISTRICT_ID.DISTRICT_NAME':{'$not':{'$regex':'test', '$options':'i'}}},
        {"schoolId._id":{"$in":db.school_master.distinct( "_id", { "IS_PORTAL": "Y","CATEGORY":{'$regex':district, '$options':'i'} } )}},
        {'DISTRICT_ID':{'$exists':1}},
        {'INCOMPLETE_SIGNUP':{"$ne":'Y'}}, 
        {'CREATED_DATE':{"$lt":myDatetime}},
        {'ROLE_ID._id':{'$ne':ObjectId("5f155b8a3b6800007900da2b")}},
        {'IS_BLOCKED':{"$ne":'Y'}}, 
        {'IS_DISABLED':{"$ne":'Y'}}, {'schoolId.NAME':{'$not':{'$regex':'test', '$options':'i'}}},
        ]}},
        {'$group':{'_id':{"district":'$schoolId._id'},
        'NAME_DISTRICT':{'$first':'$schoolId.NAME'},
        'usercount19':{'$sum':1}}},
            {"$project":{"_id":0,"DISTRICT_ID":"$_id.district","NAME_DISTRICT":1,"usercount19":1,
                        }}]
    merge11233=list(collection.aggregate(qra))
    dfCV=pd.DataFrame(merge11233)
    if dfCV.empty == True:
        data = [[district,0,disid]]
        column_names1 = ["NAME_DISTRICT","usercount19","DISTRICT_ID"]
        dfCV = pd.DataFrame(data,columns = column_names1)
    # dfCV
    # #########################################################################
    df1=df1.sort_values(by=['NAME_DISTRICT'], ascending=True)
    x=df1[df1['NAME_DISTRICT']=="Belleville School District"]
    x["famcount"].sum()
    dislist=list(set(df1["NAME_DISTRICT"]))
    df2=df1[["NAME_DISTRICT","MONTH","famcount"]]
    overall=pd.DataFrame(columns=["NAME_DISTRICT","MONTH","famcount"])
    # dislist
    result=[]
    for k in dislist:
    #     print(k)
        df45=df2[df2["NAME_DISTRICT"]==k]
        df45.reset_index()
        for i in range(1,13):
            if i in list(df45["MONTH"]):
                pass
    #              print("month_present",i)
            else:
                a=max(list(df45.index))
                df45.loc[a+i] = [k] +[i]+[0]
                # df45.loc[i+len(df45)] = [k] +[i]+[0]
    #     df46=df45.groupby(['NAME_DISTRICT', 'MONTH']).reset_index()
        df46=df45.groupby(['NAME_DISTRICT', 'MONTH']).sum().groupby(level=0).cumsum().reset_index()
    #     print(df46)
        sorted_df =df46.sort_values(by=['MONTH'], ascending=True)
        sorted_df1=sorted_df.reset_index()
        result.append(sorted_df)
    buublefamily = pd.concat(result)
    buubleusercount["idu"]=buubleusercount["NAME_DISTRICT"]+buubleusercount["MONTH"].map(str)
    buublefamily["idf"]=buublefamily["NAME_DISTRICT"]+buublefamily["MONTH"].map(str)
    mergeucfc=pd.merge(buubleusercount, buublefamily, how='left', left_on='idu', right_on='idf')
    mergeucfc=mergeucfc.fillna(0)
    mergeucfc1=pd.merge(mergeucfc, dfCV, how='left', left_on='NAME_DISTRICT_x', right_on='NAME_DISTRICT')
    mergeucfc12=mergeucfc1.fillna(0)
    mergeucfc12["totaluser"]=mergeucfc12["usercount"]+mergeucfc12["usercount19"]
    finmerge=mergeucfc12[["NAME_DISTRICT_x","MONTH_x","idu","totaluser","famcount"]]
    # finmerge


    # In[8]:


    ###ACTIVE USER
    username = urllib.parse.quote_plus('admin')
    password = urllib.parse.quote_plus('A_dM!n|#!_2o20')
    client = MongoClient("mongodb://%s:%s@44.234.88.150:27017/" % (username, password))
    db=client.compass
    dateStr = "2020-02-01T00:00:00.000Z"
    myDatetime = dateutil.parser.parse(dateStr)
    collection = db.audio_track_master
    qra12=[
        {"$match":{'$and':[{'USER_ID.USER_NAME':{"$not":{"$regex":"test",'$options':'i'}}},
        {'USER_ID.EMAIL_ID':{"$not":{"$regex":"test",'$options':'i'}}},
        {'USER_ID.EMAIL_ID':{"$not":{"$regex":"1gen",'$options':'i'}}},
        {'USER_ID.USER_NAME':{'$not':{'$regex':'1gen', '$options':'i'}}},
        {'USER_ID.DISTRICT_ID.DISTRICT_NAME':{'$not':{'$regex':'test', '$options':'i'}}},
        {"USER_ID.schoolId._id":{"$in":db.school_master.distinct( "_id", { "IS_PORTAL": "Y","CATEGORY":{'$regex':district, '$options':'i'} } )}},
        {'USER_ID.DISTRICT_ID':{'$exists':1}},
        {'USER_ID.INCOMPLETE_SIGNUP':{"$ne":'Y'}}, 
        {'MODIFIED_DATE':{"$lt":myDatetime}},
        {'USER_ID.ROLE_ID._id':{'$ne':ObjectId("5f155b8a3b6800007900da2b")}},
        {'USER_ID.IS_BLOCKED':{"$ne":'Y'}}, 
        {'USER_ID.IS_DISABLED':{"$ne":'Y'}}, {'USER_ID.schoolId.NAME':{'$not':{'$regex':'test', '$options':'i'}}},
        ]}},
        {'$group':{'_id':{"district":'$USER_ID.schoolId._id'},
        'NAME_DISTRICT':{'$first':'$USER_ID.schoolId.NAME'},
        "ACTIVE_USER":{'$addToSet':"$USER_ID._id"},}},
            {"$project":{"_id":0,"DISTRICT_ID":"$_id.district","NAME_DISTRICT":1,"ACTIVE_USER":{"$size":"$ACTIVE_USER"}}}]
    merge121=list(collection.aggregate(qra12))
    a=pd.DataFrame(merge121)
    if a.empty == True:
        data = [[district,0,disid]]
        column_names1 = ["NAME_DISTRICT","ACTIVE_USER","DISTRICT_ID"]
        a = pd.DataFrame(data,columns = column_names1)
    a["MONTH"]=1
    # print(a)


    # In[9]:


    ###ACTIVE USER
    username = urllib.parse.quote_plus('admin')
    password = urllib.parse.quote_plus('A_dM!n|#!_2o20')
    client = MongoClient("mongodb://%s:%s@44.234.88.150:27017/" % (username, password))
    db=client.compass
    dateStr = "2020-03-01T00:00:00.000Z"
    myDatetime = dateutil.parser.parse(dateStr)
    collection = db.audio_track_master
    qra12=[
        {"$match":{'$and':[{'USER_ID.USER_NAME':{"$not":{"$regex":"test",'$options':'i'}}},
        {'USER_ID.EMAIL_ID':{"$not":{"$regex":"test",'$options':'i'}}},
        {'USER_ID.EMAIL_ID':{"$not":{"$regex":"1gen",'$options':'i'}}},
        {'USER_ID.USER_NAME':{'$not':{'$regex':'1gen', '$options':'i'}}},
        {'USER_ID.DISTRICT_ID.DISTRICT_NAME':{'$not':{'$regex':'test', '$options':'i'}}},
        {"USER_ID.schoolId._id":{"$in":db.school_master.distinct( "_id", { "IS_PORTAL": "Y","CATEGORY":{'$regex':district, '$options':'i'} } )}},
        {'USER_ID.DISTRICT_ID':{'$exists':1}},
        {'USER_ID.INCOMPLETE_SIGNUP':{"$ne":'Y'}}, 
        {'MODIFIED_DATE':{"$lt":myDatetime}},
        {'USER_ID.ROLE_ID._id':{'$ne':ObjectId("5f155b8a3b6800007900da2b")}},
        {'USER_ID.IS_BLOCKED':{"$ne":'Y'}}, 
        {'USER_ID.IS_DISABLED':{"$ne":'Y'}}, {'USER_ID.schoolId.NAME':{'$not':{'$regex':'test', '$options':'i'}}},
        ]}},
        {'$group':{'_id':{"district":'$USER_ID.schoolId._id'},
        'NAME_DISTRICT':{'$first':'$USER_ID.schoolId.NAME'},
        "ACTIVE_USER":{'$addToSet':"$USER_ID._id"},}},
            {"$project":{"_id":0,"DISTRICT_ID":"$_id.district","NAME_DISTRICT":1,"ACTIVE_USER":{"$size":"$ACTIVE_USER"}}}]
    merge121=list(collection.aggregate(qra12))
    b=pd.DataFrame(merge121)
    if b.empty == True:
        data = [[district,0,disid]]
        column_names1 = ["NAME_DISTRICT","ACTIVE_USER","DISTRICT_ID"]
        b = pd.DataFrame(data,columns = column_names1)
    b["MONTH"]=2
    # print(a)


    # In[10]:


    ###ACTIVE USER
    username = urllib.parse.quote_plus('admin')
    password = urllib.parse.quote_plus('A_dM!n|#!_2o20')
    client = MongoClient("mongodb://%s:%s@44.234.88.150:27017/" % (username, password))
    db=client.compass
    dateStr = "2020-04-01T00:00:00.000Z"
    myDatetime = dateutil.parser.parse(dateStr)
    collection = db.audio_track_master
    qra12=[
        {"$match":{'$and':[{'USER_ID.USER_NAME':{"$not":{"$regex":"test",'$options':'i'}}},
        {'USER_ID.EMAIL_ID':{"$not":{"$regex":"test",'$options':'i'}}},
        {'USER_ID.EMAIL_ID':{"$not":{"$regex":"1gen",'$options':'i'}}},
        {'USER_ID.USER_NAME':{'$not':{'$regex':'1gen', '$options':'i'}}},
        {'USER_ID.DISTRICT_ID.DISTRICT_NAME':{'$not':{'$regex':'test', '$options':'i'}}},
        {"USER_ID.schoolId._id":{"$in":db.school_master.distinct( "_id", { "IS_PORTAL": "Y","CATEGORY":{'$regex':district, '$options':'i'} } )}},
        {'USER_ID.DISTRICT_ID':{'$exists':1}},
        {'USER_ID.INCOMPLETE_SIGNUP':{"$ne":'Y'}}, 
        {'MODIFIED_DATE':{"$lt":myDatetime}},
        {'USER_ID.ROLE_ID._id':{'$ne':ObjectId("5f155b8a3b6800007900da2b")}},
        {'USER_ID.IS_BLOCKED':{"$ne":'Y'}}, 
        {'USER_ID.IS_DISABLED':{"$ne":'Y'}}, {'USER_ID.schoolId.NAME':{'$not':{'$regex':'test', '$options':'i'}}},
        ]}},
        {'$group':{'_id':{"district":'$USER_ID.schoolId._id'},
        'NAME_DISTRICT':{'$first':'$USER_ID.schoolId.NAME'},
        "ACTIVE_USER":{'$addToSet':"$USER_ID._id"},}},
            {"$project":{"_id":0,"DISTRICT_ID":"$_id.district","NAME_DISTRICT":1,"ACTIVE_USER":{"$size":"$ACTIVE_USER"}}}]
    merge121=list(collection.aggregate(qra12))
    c=pd.DataFrame(merge121)
    if c.empty == True:
        data = [[district,0,disid]]
        column_names1 = ["NAME_DISTRICT","ACTIVE_USER","DISTRICT_ID"]
        c = pd.DataFrame(data,columns = column_names1)
    c["MONTH"]=3
    # print(a)


    # In[11]:


    ###ACTIVE USER
    username = urllib.parse.quote_plus('admin')
    password = urllib.parse.quote_plus('A_dM!n|#!_2o20')
    client = MongoClient("mongodb://%s:%s@44.234.88.150:27017/" % (username, password))
    db=client.compass
    dateStr = "2020-05-01T00:00:00.000Z"
    myDatetime = dateutil.parser.parse(dateStr)
    collection = db.audio_track_master
    qra12=[
        {"$match":{'$and':[{'USER_ID.USER_NAME':{"$not":{"$regex":"test",'$options':'i'}}},
        {'USER_ID.EMAIL_ID':{"$not":{"$regex":"test",'$options':'i'}}},
        {'USER_ID.EMAIL_ID':{"$not":{"$regex":"1gen",'$options':'i'}}},
        {'USER_ID.USER_NAME':{'$not':{'$regex':'1gen', '$options':'i'}}},
        {'USER_ID.DISTRICT_ID.DISTRICT_NAME':{'$not':{'$regex':'test', '$options':'i'}}},
        {"USER_ID.schoolId._id":{"$in":db.school_master.distinct( "_id", { "IS_PORTAL": "Y","CATEGORY":{'$regex':district, '$options':'i'} } )}},
        {'USER_ID.DISTRICT_ID':{'$exists':1}},
        {'USER_ID.INCOMPLETE_SIGNUP':{"$ne":'Y'}}, 
        {'MODIFIED_DATE':{"$lt":myDatetime}},
        {'USER_ID.ROLE_ID._id':{'$ne':ObjectId("5f155b8a3b6800007900da2b")}},
        {'USER_ID.IS_BLOCKED':{"$ne":'Y'}}, 
        {'USER_ID.IS_DISABLED':{"$ne":'Y'}}, {'USER_ID.schoolId.NAME':{'$not':{'$regex':'test', '$options':'i'}}},
        ]}},
        {'$group':{'_id':{"district":'$USER_ID.schoolId._id'},
        'NAME_DISTRICT':{'$first':'$USER_ID.schoolId.NAME'},
        "ACTIVE_USER":{'$addToSet':"$USER_ID._id"},}},
            {"$project":{"_id":0,"DISTRICT_ID":"$_id.district","NAME_DISTRICT":1,"ACTIVE_USER":{"$size":"$ACTIVE_USER"}}}]
    merge121=list(collection.aggregate(qra12))
    d=pd.DataFrame(merge121)
    if d.empty == True:
        data = [[district,0,disid]]
        column_names1 = ["NAME_DISTRICT","ACTIVE_USER","DISTRICT_ID"]
        d = pd.DataFrame(data,columns = column_names1)
    d["MONTH"]=4
    # print(a)


    # In[12]:


    ###ACTIVE USER
    username = urllib.parse.quote_plus('admin')
    password = urllib.parse.quote_plus('A_dM!n|#!_2o20')
    client = MongoClient("mongodb://%s:%s@44.234.88.150:27017/" % (username, password))
    db=client.compass
    dateStr = "2020-06-01T00:00:00.000Z"
    myDatetime = dateutil.parser.parse(dateStr)
    collection = db.audio_track_master
    qra12=[
        {"$match":{'$and':[{'USER_ID.USER_NAME':{"$not":{"$regex":"test",'$options':'i'}}},
        {'USER_ID.EMAIL_ID':{"$not":{"$regex":"test",'$options':'i'}}},
        {'USER_ID.EMAIL_ID':{"$not":{"$regex":"1gen",'$options':'i'}}},
        {'USER_ID.USER_NAME':{'$not':{'$regex':'1gen', '$options':'i'}}},
        {'USER_ID.DISTRICT_ID.DISTRICT_NAME':{'$not':{'$regex':'test', '$options':'i'}}},
        {"USER_ID.schoolId._id":{"$in":db.school_master.distinct( "_id", { "IS_PORTAL": "Y","CATEGORY":{'$regex':district, '$options':'i'} } )}},
        {'USER_ID.DISTRICT_ID':{'$exists':1}},
        {'USER_ID.INCOMPLETE_SIGNUP':{"$ne":'Y'}}, 
        {'MODIFIED_DATE':{"$lt":myDatetime}},
        {'USER_ID.ROLE_ID._id':{'$ne':ObjectId("5f155b8a3b6800007900da2b")}},
        {'USER_ID.IS_BLOCKED':{"$ne":'Y'}}, 
        {'USER_ID.IS_DISABLED':{"$ne":'Y'}}, {'USER_ID.schoolId.NAME':{'$not':{'$regex':'test', '$options':'i'}}},
        ]}},
        {'$group':{'_id':{"district":'$USER_ID.schoolId._id'},
        'NAME_DISTRICT':{'$first':'$USER_ID.schoolId.NAME'},
        "ACTIVE_USER":{'$addToSet':"$USER_ID._id"},}},
            {"$project":{"_id":0,"DISTRICT_ID":"$_id.district","NAME_DISTRICT":1,"ACTIVE_USER":{"$size":"$ACTIVE_USER"}}}]
    merge121=list(collection.aggregate(qra12))
    e=pd.DataFrame(merge121)
    if e.empty == True:
        data = [[district,0,disid]]
        column_names1 = ["NAME_DISTRICT","ACTIVE_USER","DISTRICT_ID"]
        e = pd.DataFrame(data,columns = column_names1)
    e["MONTH"]=5
    # print(a)


    # In[13]:


    ###ACTIVE USER
    username = urllib.parse.quote_plus('admin')
    password = urllib.parse.quote_plus('A_dM!n|#!_2o20')
    client = MongoClient("mongodb://%s:%s@44.234.88.150:27017/" % (username, password))
    db=client.compass
    dateStr = "2020-07-01T00:00:00.000Z"
    myDatetime = dateutil.parser.parse(dateStr)
    collection = db.audio_track_master
    qra12=[
        {"$match":{'$and':[{'USER_ID.USER_NAME':{"$not":{"$regex":"test",'$options':'i'}}},
        {'USER_ID.EMAIL_ID':{"$not":{"$regex":"test",'$options':'i'}}},
        {'USER_ID.EMAIL_ID':{"$not":{"$regex":"1gen",'$options':'i'}}},
        {'USER_ID.USER_NAME':{'$not':{'$regex':'1gen', '$options':'i'}}},
        {'USER_ID.DISTRICT_ID.DISTRICT_NAME':{'$not':{'$regex':'test', '$options':'i'}}},
        {"USER_ID.schoolId._id":{"$in":db.school_master.distinct( "_id", { "IS_PORTAL": "Y","CATEGORY":{'$regex':district, '$options':'i'} } )}},
        {'USER_ID.DISTRICT_ID':{'$exists':1}},
        {'USER_ID.INCOMPLETE_SIGNUP':{"$ne":'Y'}}, 
        {'MODIFIED_DATE':{"$lt":myDatetime}},
        {'USER_ID.ROLE_ID._id':{'$ne':ObjectId("5f155b8a3b6800007900da2b")}},
        {'USER_ID.IS_BLOCKED':{"$ne":'Y'}}, 
        {'USER_ID.IS_DISABLED':{"$ne":'Y'}}, {'USER_ID.schoolId.NAME':{'$not':{'$regex':'test', '$options':'i'}}},
        ]}},
        {'$group':{'_id':{"district":'$USER_ID.schoolId._id'},
        'NAME_DISTRICT':{'$first':'$USER_ID.schoolId.NAME'},
        "ACTIVE_USER":{'$addToSet':"$USER_ID._id"},}},
            {"$project":{"_id":0,"DISTRICT_ID":"$_id.district","NAME_DISTRICT":1,"ACTIVE_USER":{"$size":"$ACTIVE_USER"}}}]
    merge121=list(collection.aggregate(qra12))
    f=pd.DataFrame(merge121)
    if f.empty == True:
        data = [[district,0,disid]]
        column_names1 = ["NAME_DISTRICT","ACTIVE_USER","DISTRICT_ID"]
        f = pd.DataFrame(data,columns = column_names1)
    f["MONTH"]=6
    # print(a)


    # In[14]:


    ###ACTIVE USER
    username = urllib.parse.quote_plus('admin')
    password = urllib.parse.quote_plus('A_dM!n|#!_2o20')
    client = MongoClient("mongodb://%s:%s@44.234.88.150:27017/" % (username, password))
    db=client.compass
    dateStr = "2020-08-01T00:00:00.000Z"
    myDatetime = dateutil.parser.parse(dateStr)
    collection = db.audio_track_master
    qra12=[
        {"$match":{'$and':[{'USER_ID.USER_NAME':{"$not":{"$regex":"test",'$options':'i'}}},
        {'USER_ID.EMAIL_ID':{"$not":{"$regex":"test",'$options':'i'}}},
        {'USER_ID.EMAIL_ID':{"$not":{"$regex":"1gen",'$options':'i'}}},
        {'USER_ID.USER_NAME':{'$not':{'$regex':'1gen', '$options':'i'}}},
        {'USER_ID.DISTRICT_ID.DISTRICT_NAME':{'$not':{'$regex':'test', '$options':'i'}}},
        {"USER_ID.schoolId._id":{"$in":db.school_master.distinct( "_id", { "IS_PORTAL": "Y","CATEGORY":{'$regex':district, '$options':'i'} } )}},
        {'USER_ID.DISTRICT_ID':{'$exists':1}},
        {'USER_ID.INCOMPLETE_SIGNUP':{"$ne":'Y'}}, 
        {'MODIFIED_DATE':{"$lt":myDatetime}},
        {'USER_ID.ROLE_ID._id':{'$ne':ObjectId("5f155b8a3b6800007900da2b")}},
        {'USER_ID.IS_BLOCKED':{"$ne":'Y'}}, 
        {'USER_ID.IS_DISABLED':{"$ne":'Y'}}, {'USER_ID.schoolId.NAME':{'$not':{'$regex':'test', '$options':'i'}}},
        ]}},
        {'$group':{'_id':{"district":'$USER_ID.schoolId._id'},
        'NAME_DISTRICT':{'$first':'$USER_ID.schoolId.NAME'},
        "ACTIVE_USER":{'$addToSet':"$USER_ID._id"},}},
            {"$project":{"_id":0,"DISTRICT_ID":"$_id.district","NAME_DISTRICT":1,"ACTIVE_USER":{"$size":"$ACTIVE_USER"}}}]
    merge121=list(collection.aggregate(qra12))
    g=pd.DataFrame(merge121)
    if g.empty == True:
        data = [[district,0,disid]]
        column_names1 = ["NAME_DISTRICT","ACTIVE_USER","DISTRICT_ID"]
        g = pd.DataFrame(data,columns = column_names1)
    g["MONTH"]=7
    # print(a)


    # In[15]:


    ###ACTIVE USER
    username = urllib.parse.quote_plus('admin')
    password = urllib.parse.quote_plus('A_dM!n|#!_2o20')
    client = MongoClient("mongodb://%s:%s@44.234.88.150:27017/" % (username, password))
    db=client.compass
    dateStr = "2020-09-01T00:00:00.000Z"
    myDatetime = dateutil.parser.parse(dateStr)
    collection = db.audio_track_master
    qra12=[
        {"$match":{'$and':[{'USER_ID.USER_NAME':{"$not":{"$regex":"test",'$options':'i'}}},
        {'USER_ID.EMAIL_ID':{"$not":{"$regex":"test",'$options':'i'}}},
        {'USER_ID.EMAIL_ID':{"$not":{"$regex":"1gen",'$options':'i'}}},
        {'USER_ID.USER_NAME':{'$not':{'$regex':'1gen', '$options':'i'}}},
        {'USER_ID.DISTRICT_ID.DISTRICT_NAME':{'$not':{'$regex':'test', '$options':'i'}}},
        {"USER_ID.schoolId._id":{"$in":db.school_master.distinct( "_id", { "IS_PORTAL": "Y","CATEGORY":{'$regex':district, '$options':'i'} } )}},
        {'USER_ID.DISTRICT_ID':{'$exists':1}},
        {'USER_ID.INCOMPLETE_SIGNUP':{"$ne":'Y'}}, 
        {'MODIFIED_DATE':{"$lt":myDatetime}},
        {'USER_ID.ROLE_ID._id':{'$ne':ObjectId("5f155b8a3b6800007900da2b")}},
        {'USER_ID.IS_BLOCKED':{"$ne":'Y'}}, 
        {'USER_ID.IS_DISABLED':{"$ne":'Y'}}, {'USER_ID.schoolId.NAME':{'$not':{'$regex':'test', '$options':'i'}}},
        ]}},
        {'$group':{'_id':{"district":'$USER_ID.schoolId._id'},
        'NAME_DISTRICT':{'$first':'$USER_ID.schoolId.NAME'},
        "ACTIVE_USER":{'$addToSet':"$USER_ID._id"},}},
            {"$project":{"_id":0,"DISTRICT_ID":"$_id.district","NAME_DISTRICT":1,"ACTIVE_USER":{"$size":"$ACTIVE_USER"}}}]
    merge121=list(collection.aggregate(qra12))
    h=pd.DataFrame(merge121)
    if h.empty == True:
        data = [[district,0,disid]]
        column_names1 = ["NAME_DISTRICT","ACTIVE_USER","DISTRICT_ID"]
        h = pd.DataFrame(data,columns = column_names1)
    h["MONTH"]=8
    # print(a)


    # In[16]:


    ###ACTIVE USER
    username = urllib.parse.quote_plus('admin')
    password = urllib.parse.quote_plus('A_dM!n|#!_2o20')
    client = MongoClient("mongodb://%s:%s@44.234.88.150:27017/" % (username, password))
    db=client.compass
    dateStr = "2020-10-01T00:00:00.000Z"
    myDatetime = dateutil.parser.parse(dateStr)
    collection = db.audio_track_master
    qra12=[
        {"$match":{'$and':[{'USER_ID.USER_NAME':{"$not":{"$regex":"test",'$options':'i'}}},
        {'USER_ID.EMAIL_ID':{"$not":{"$regex":"test",'$options':'i'}}},
        {'USER_ID.EMAIL_ID':{"$not":{"$regex":"1gen",'$options':'i'}}},
        {'USER_ID.USER_NAME':{'$not':{'$regex':'1gen', '$options':'i'}}},
        {'USER_ID.DISTRICT_ID.DISTRICT_NAME':{'$not':{'$regex':'test', '$options':'i'}}},
        {"USER_ID.schoolId._id":{"$in":db.school_master.distinct( "_id", { "IS_PORTAL": "Y","CATEGORY":{'$regex':district, '$options':'i'} } )}},
        {'USER_ID.DISTRICT_ID':{'$exists':1}},
        {'USER_ID.INCOMPLETE_SIGNUP':{"$ne":'Y'}}, 
        {'MODIFIED_DATE':{"$lt":myDatetime}},
        {'USER_ID.ROLE_ID._id':{'$ne':ObjectId("5f155b8a3b6800007900da2b")}},
        {'USER_ID.IS_BLOCKED':{"$ne":'Y'}}, 
        {'USER_ID.IS_DISABLED':{"$ne":'Y'}}, {'USER_ID.schoolId.NAME':{'$not':{'$regex':'test', '$options':'i'}}},
        ]}},
        {'$group':{'_id':{"district":'$USER_ID.schoolId._id'},
        'NAME_DISTRICT':{'$first':'$USER_ID.schoolId.NAME'},
        "ACTIVE_USER":{'$addToSet':"$USER_ID._id"},}},
            {"$project":{"_id":0,"DISTRICT_ID":"$_id.district","NAME_DISTRICT":1,"ACTIVE_USER":{"$size":"$ACTIVE_USER"}}}]
    merge121=list(collection.aggregate(qra12))
    i=pd.DataFrame(merge121)
    if i.empty == True:
        data = [[district,0,disid]]
        column_names1 = ["NAME_DISTRICT","ACTIVE_USER","DISTRICT_ID"]
        i = pd.DataFrame(data,columns = column_names1)
    i["MONTH"]=9
    # print(a)


    # In[17]:


    ###ACTIVE USER
    username = urllib.parse.quote_plus('admin')
    password = urllib.parse.quote_plus('A_dM!n|#!_2o20')
    client = MongoClient("mongodb://%s:%s@44.234.88.150:27017/" % (username, password))
    db=client.compass
    dateStr = "2020-11-01T00:00:00.000Z"
    myDatetime = dateutil.parser.parse(dateStr)
    collection = db.audio_track_master
    qra12=[
        {"$match":{'$and':[{'USER_ID.USER_NAME':{"$not":{"$regex":"test",'$options':'i'}}},
        {'USER_ID.EMAIL_ID':{"$not":{"$regex":"test",'$options':'i'}}},
        {'USER_ID.EMAIL_ID':{"$not":{"$regex":"1gen",'$options':'i'}}},
        {'USER_ID.USER_NAME':{'$not':{'$regex':'1gen', '$options':'i'}}},
        {'USER_ID.DISTRICT_ID.DISTRICT_NAME':{'$not':{'$regex':'test', '$options':'i'}}},
        {"USER_ID.schoolId._id":{"$in":db.school_master.distinct( "_id", { "IS_PORTAL": "Y","CATEGORY":{'$regex':district, '$options':'i'} } )}},
        {'USER_ID.DISTRICT_ID':{'$exists':1}},
        {'USER_ID.INCOMPLETE_SIGNUP':{"$ne":'Y'}}, 
        {'MODIFIED_DATE':{"$lt":myDatetime}},
        {'USER_ID.ROLE_ID._id':{'$ne':ObjectId("5f155b8a3b6800007900da2b")}},
        {'USER_ID.IS_BLOCKED':{"$ne":'Y'}}, 
        {'USER_ID.IS_DISABLED':{"$ne":'Y'}}, {'USER_ID.schoolId.NAME':{'$not':{'$regex':'test', '$options':'i'}}},
        ]}},
        {'$group':{'_id':{"district":'$USER_ID.schoolId._id'},
        'NAME_DISTRICT':{'$first':'$USER_ID.schoolId.NAME'},
        "ACTIVE_USER":{'$addToSet':"$USER_ID._id"},}},
            {"$project":{"_id":0,"DISTRICT_ID":"$_id.district","NAME_DISTRICT":1,"ACTIVE_USER":{"$size":"$ACTIVE_USER"}}}]
    merge121=list(collection.aggregate(qra12))
    j=pd.DataFrame(merge121)
    if j.empty == True:
        data = [[district,0,disid]]
        column_names1 = ["NAME_DISTRICT","ACTIVE_USER","DISTRICT_ID"]
        j = pd.DataFrame(data,columns = column_names1)
    j["MONTH"]=10
    # print(a)


    # In[18]:


    ###ACTIVE USER
    username = urllib.parse.quote_plus('admin')
    password = urllib.parse.quote_plus('A_dM!n|#!_2o20')
    client = MongoClient("mongodb://%s:%s@44.234.88.150:27017/" % (username, password))
    db=client.compass
    dateStr = "2020-12-01T00:00:00.000Z"
    myDatetime = dateutil.parser.parse(dateStr)
    collection = db.audio_track_master
    qra12=[
        {"$match":{'$and':[{'USER_ID.USER_NAME':{"$not":{"$regex":"test",'$options':'i'}}},
        {'USER_ID.EMAIL_ID':{"$not":{"$regex":"test",'$options':'i'}}},
        {'USER_ID.EMAIL_ID':{"$not":{"$regex":"1gen",'$options':'i'}}},
        {'USER_ID.USER_NAME':{'$not':{'$regex':'1gen', '$options':'i'}}},
        {'USER_ID.DISTRICT_ID.DISTRICT_NAME':{'$not':{'$regex':'test', '$options':'i'}}},
        {"USER_ID.schoolId._id":{"$in":db.school_master.distinct( "_id", { "IS_PORTAL": "Y","CATEGORY":{'$regex':district, '$options':'i'} } )}},
        {'USER_ID.DISTRICT_ID':{'$exists':1}},
        {'USER_ID.INCOMPLETE_SIGNUP':{"$ne":'Y'}}, 
        {'MODIFIED_DATE':{"$lt":myDatetime}},
        {'USER_ID.ROLE_ID._id':{'$ne':ObjectId("5f155b8a3b6800007900da2b")}},
        {'USER_ID.IS_BLOCKED':{"$ne":'Y'}}, 
        {'USER_ID.IS_DISABLED':{"$ne":'Y'}}, {'USER_ID.schoolId.NAME':{'$not':{'$regex':'test', '$options':'i'}}},
        ]}},
        {'$group':{'_id':{"district":'$USER_ID.schoolId._id'},
        'NAME_DISTRICT':{'$first':'$USER_ID.schoolId.NAME'},
        "ACTIVE_USER":{'$addToSet':"$USER_ID._id"},}},
            {"$project":{"_id":0,"DISTRICT_ID":"$_id.district","NAME_DISTRICT":1,"ACTIVE_USER":{"$size":"$ACTIVE_USER"}}}]
    merge121=list(collection.aggregate(qra12))
    k=pd.DataFrame(merge121)
    if k.empty == True:
        data = [[district,0,disid]]
        column_names1 = ["NAME_DISTRICT","ACTIVE_USER","DISTRICT_ID"]
        k = pd.DataFrame(data,columns = column_names1)
    k["MONTH"]=11
    # print(a)


    # In[19]:


    ###ACTIVE USER
    username = urllib.parse.quote_plus('admin')
    password = urllib.parse.quote_plus('A_dM!n|#!_2o20')
    client = MongoClient("mongodb://%s:%s@44.234.88.150:27017/" % (username, password))
    db=client.compass
    dateStr = "2021-01-01T00:00:00.000Z"
    myDatetime = dateutil.parser.parse(dateStr)
    collection = db.audio_track_master
    qra12=[
        {"$match":{'$and':[{'USER_ID.USER_NAME':{"$not":{"$regex":"test",'$options':'i'}}},
        {'USER_ID.EMAIL_ID':{"$not":{"$regex":"test",'$options':'i'}}},
        {'USER_ID.EMAIL_ID':{"$not":{"$regex":"1gen",'$options':'i'}}},
        {'USER_ID.USER_NAME':{'$not':{'$regex':'1gen', '$options':'i'}}},
        {'USER_ID.DISTRICT_ID.DISTRICT_NAME':{'$not':{'$regex':'test', '$options':'i'}}},
        {"USER_ID.schoolId._id":{"$in":db.school_master.distinct( "_id", { "IS_PORTAL": "Y","CATEGORY":{'$regex':district, '$options':'i'} } )}},
        {'USER_ID.DISTRICT_ID':{'$exists':1}},
        {'USER_ID.INCOMPLETE_SIGNUP':{"$ne":'Y'}}, 
        {'MODIFIED_DATE':{"$lt":myDatetime}},
        {'USER_ID.ROLE_ID._id':{'$ne':ObjectId("5f155b8a3b6800007900da2b")}},
        {'USER_ID.IS_BLOCKED':{"$ne":'Y'}}, 
        {'USER_ID.IS_DISABLED':{"$ne":'Y'}}, {'USER_ID.schoolId.NAME':{'$not':{'$regex':'test', '$options':'i'}}},
        ]}},
        {'$group':{'_id':{"district":'$USER_ID.schoolId._id'},
        'NAME_DISTRICT':{'$first':'$USER_ID.schoolId.NAME'},
        "ACTIVE_USER":{'$addToSet':"$USER_ID._id"},}},
            {"$project":{"_id":0,"DISTRICT_ID":"$_id.district","NAME_DISTRICT":1,"ACTIVE_USER":{"$size":"$ACTIVE_USER"}}}]
    merge121=list(collection.aggregate(qra12))
    l=pd.DataFrame(merge121)
    if l.empty == True:
        data = [[district,0,disid]]
        column_names1 = ["NAME_DISTRICT","ACTIVE_USER","DISTRICT_ID"]
        l = pd.DataFrame(data,columns = column_names1)
    l["MONTH"]=12
    # print(a)


    # In[29]:


    df1=pd.concat([a,b,c,d,e,f,g,h,i,j,k,l])
    # print(a,b,c,d,e,f,g,h,i,j,k,l)


    # In[30]:

    print(df1)
    df1=df1.sort_values(by=['NAME_DISTRICT'], ascending=True)
    dislist=list(set(df1["NAME_DISTRICT"]))
    df2=df1[["NAME_DISTRICT","MONTH","ACTIVE_USER"]]
    overall=pd.DataFrame(columns=["NAME_DISTRICT","MONTH","ACTIVE_USER"])
    result=[]
    for k in dislist:
    #     print(k)
        df45=df2[df2["NAME_DISTRICT"]==k]
        df45.reset_index()
        for i in range(1,13):
            if i in list(df45["MONTH"]):
                pass
    #              print("month_present",i)
            else:
                df45.loc[i+len(df45)] = [k] +[i]+[0]
    #     df46=df45.groupby(['NAME_DISTRICT', 'MONTH']).reset_index()
    #     df46=df45.groupby(['NAME_DISTRICT', 'MONTH']).sum().groupby(level=0).cumsum().reset_index()
    #     print(df46)
        sorted_df =df45.sort_values(by=['MONTH'], ascending=True)
        sorted_df1=sorted_df.reset_index()
        result.append(sorted_df)
    buubleactuser = pd.concat(result)
    buubleactuser["acuid"]=buubleactuser["NAME_DISTRICT"]+buubleactuser["MONTH"].map(str)
    # buubleactuser
    finmergeu=pd.merge(finmerge, buubleactuser, how='left', left_on='idu', right_on='acuid')


    # In[31]:


    username = urllib.parse.quote_plus('admin')
    password = urllib.parse.quote_plus('A_dM!n|#!_2o20')
    client = MongoClient("mongodb://%s:%s@44.234.88.150:27017/" % (username, password))
    db=client.compass
    dateStr = "2020-02-01T00:00:00.000Z"
    myDatetime = dateutil.parser.parse(dateStr)
    collection = db.audio_track_master
    qra12=[
        {"$match":{'$and':[{'USER_ID.USER_NAME':{"$not":{"$regex":"test",'$options':'i'}}},
        {'USER_ID.EMAIL_ID':{"$not":{"$regex":"test",'$options':'i'}}},
        {'USER_ID.EMAIL_ID':{"$not":{"$regex":"1gen",'$options':'i'}}},
        {'USER_ID.USER_NAME':{'$not':{'$regex':'1gen', '$options':'i'}}},
        {'USER_ID.DISTRICT_ID.DISTRICT_NAME':{'$not':{'$regex':'test', '$options':'i'}}},
        {"USER_ID.schoolId._id":{"$in":db.school_master.distinct( "_id", { "IS_PORTAL": "Y","CATEGORY":{'$regex':district, '$options':'i'} } )}},
        {'USER_ID.DISTRICT_ID':{'$exists':1}},
        {'USER_ID.INCOMPLETE_SIGNUP':{"$ne":'Y'}}, 
        {'MODIFIED_DATE':{"$lt":myDatetime}},
        {'USER_ID.ROLE_ID._id':ObjectId("5f155b8a3b6800007900da2b")},
        {'USER_ID.IS_BLOCKED':{"$ne":'Y'}}, 
        {'USER_ID.IS_DISABLED':{"$ne":'Y'}}, {'USER_ID.schoolId.NAME':{'$not':{'$regex':'test', '$options':'i'}}},
        ]}},
        {'$group':{'_id':{"district":'$USER_ID.schoolId._id'},
        'NAME_DISTRICT':{'$first':'$USER_ID.schoolId.NAME'},
        "ACTIVE_USER":{'$addToSet':"$USER_ID._id"},}},
            {"$project":{"_id":0,"DISTRICT_ID":"$_id.district","NAME_DISTRICT":1,"ACTIVE_USER":{"$size":"$ACTIVE_USER"}}}]
    merge121=list(collection.aggregate(qra12))
    a=pd.DataFrame(merge121)
    if a.empty == True:
        data = [[district,0,disid]]
        column_names1 = ["NAME_DISTRICT","ACTIVE_USER","DISTRICT_ID"]
        a = pd.DataFrame(data,columns = column_names1)
    a["MONTH"]=1
    # print(a)


    # In[9]:


    ###ACTIVE USER
    username = urllib.parse.quote_plus('admin')
    password = urllib.parse.quote_plus('A_dM!n|#!_2o20')
    client = MongoClient("mongodb://%s:%s@44.234.88.150:27017/" % (username, password))
    db=client.compass
    dateStr = "2020-03-01T00:00:00.000Z"
    myDatetime = dateutil.parser.parse(dateStr)
    collection = db.audio_track_master
    qra12=[
        {"$match":{'$and':[{'USER_ID.USER_NAME':{"$not":{"$regex":"test",'$options':'i'}}},
        {'USER_ID.EMAIL_ID':{"$not":{"$regex":"test",'$options':'i'}}},
        {'USER_ID.EMAIL_ID':{"$not":{"$regex":"1gen",'$options':'i'}}},
        {'USER_ID.USER_NAME':{'$not':{'$regex':'1gen', '$options':'i'}}},
        {'USER_ID.DISTRICT_ID.DISTRICT_NAME':{'$not':{'$regex':'test', '$options':'i'}}},
        {"USER_ID.schoolId._id":{"$in":db.school_master.distinct( "_id", { "IS_PORTAL": "Y","CATEGORY":{'$regex':district, '$options':'i'} } )}},
        {'USER_ID.DISTRICT_ID':{'$exists':1}},
        {'USER_ID.INCOMPLETE_SIGNUP':{"$ne":'Y'}}, 
        {'MODIFIED_DATE':{"$lt":myDatetime}},
        {'USER_ID.ROLE_ID._id':ObjectId("5f155b8a3b6800007900da2b")},
        {'USER_ID.IS_BLOCKED':{"$ne":'Y'}}, 
        {'USER_ID.IS_DISABLED':{"$ne":'Y'}}, {'USER_ID.schoolId.NAME':{'$not':{'$regex':'test', '$options':'i'}}},
        ]}},
        {'$group':{'_id':{"district":'$USER_ID.schoolId._id'},
        'NAME_DISTRICT':{'$first':'$USER_ID.schoolId.NAME'},
        "ACTIVE_USER":{'$addToSet':"$USER_ID._id"},}},
            {"$project":{"_id":0,"DISTRICT_ID":"$_id.district","NAME_DISTRICT":1,"ACTIVE_USER":{"$size":"$ACTIVE_USER"}}}]
    merge121=list(collection.aggregate(qra12))
    b=pd.DataFrame(merge121)
    if b.empty == True:
        data = [[district,0,disid]]
        column_names1 = ["NAME_DISTRICT","ACTIVE_USER","DISTRICT_ID"]
        b = pd.DataFrame(data,columns = column_names1)
    b["MONTH"]=2
    # print(a)


    # In[10]:


    ###ACTIVE USER
    username = urllib.parse.quote_plus('admin')
    password = urllib.parse.quote_plus('A_dM!n|#!_2o20')
    client = MongoClient("mongodb://%s:%s@44.234.88.150:27017/" % (username, password))
    db=client.compass
    dateStr = "2020-04-01T00:00:00.000Z"
    myDatetime = dateutil.parser.parse(dateStr)
    collection = db.audio_track_master
    qra12=[
        {"$match":{'$and':[{'USER_ID.USER_NAME':{"$not":{"$regex":"test",'$options':'i'}}},
        {'USER_ID.EMAIL_ID':{"$not":{"$regex":"test",'$options':'i'}}},
        {'USER_ID.EMAIL_ID':{"$not":{"$regex":"1gen",'$options':'i'}}},
        {'USER_ID.USER_NAME':{'$not':{'$regex':'1gen', '$options':'i'}}},
        {'USER_ID.DISTRICT_ID.DISTRICT_NAME':{'$not':{'$regex':'test', '$options':'i'}}},
        {"USER_ID.schoolId._id":{"$in":db.school_master.distinct( "_id", { "IS_PORTAL": "Y","CATEGORY":{'$regex':district, '$options':'i'} } )}},
        {'USER_ID.DISTRICT_ID':{'$exists':1}},
        {'USER_ID.INCOMPLETE_SIGNUP':{"$ne":'Y'}}, 
        {'MODIFIED_DATE':{"$lt":myDatetime}},
        {'USER_ID.ROLE_ID._id':ObjectId("5f155b8a3b6800007900da2b")},
        {'USER_ID.IS_BLOCKED':{"$ne":'Y'}}, 
        {'USER_ID.IS_DISABLED':{"$ne":'Y'}}, {'USER_ID.schoolId.NAME':{'$not':{'$regex':'test', '$options':'i'}}},
        ]}},
        {'$group':{'_id':{"district":'$USER_ID.schoolId._id'},
        'NAME_DISTRICT':{'$first':'$USER_ID.schoolId.NAME'},
        "ACTIVE_USER":{'$addToSet':"$USER_ID._id"},}},
            {"$project":{"_id":0,"DISTRICT_ID":"$_id.district","NAME_DISTRICT":1,"ACTIVE_USER":{"$size":"$ACTIVE_USER"}}}]
    merge121=list(collection.aggregate(qra12))
    c=pd.DataFrame(merge121)
    if c.empty == True:
        data = [[district,0,disid]]
        column_names1 = ["NAME_DISTRICT","ACTIVE_USER","DISTRICT_ID"]
        c = pd.DataFrame(data,columns = column_names1)
    c["MONTH"]=3
    # print(a)


    # In[11]:


    ###ACTIVE USER
    username = urllib.parse.quote_plus('admin')
    password = urllib.parse.quote_plus('A_dM!n|#!_2o20')
    client = MongoClient("mongodb://%s:%s@44.234.88.150:27017/" % (username, password))
    db=client.compass
    dateStr = "2020-05-01T00:00:00.000Z"
    myDatetime = dateutil.parser.parse(dateStr)
    collection = db.audio_track_master
    qra12=[
        {"$match":{'$and':[{'USER_ID.USER_NAME':{"$not":{"$regex":"test",'$options':'i'}}},
        {'USER_ID.EMAIL_ID':{"$not":{"$regex":"test",'$options':'i'}}},
        {'USER_ID.EMAIL_ID':{"$not":{"$regex":"1gen",'$options':'i'}}},
        {'USER_ID.USER_NAME':{'$not':{'$regex':'1gen', '$options':'i'}}},
        {'USER_ID.DISTRICT_ID.DISTRICT_NAME':{'$not':{'$regex':'test', '$options':'i'}}},
        {"USER_ID.schoolId._id":{"$in":db.school_master.distinct( "_id", { "IS_PORTAL": "Y","CATEGORY":{'$regex':district, '$options':'i'} } )}},
        {'USER_ID.DISTRICT_ID':{'$exists':1}},
        {'USER_ID.INCOMPLETE_SIGNUP':{"$ne":'Y'}}, 
        {'MODIFIED_DATE':{"$lt":myDatetime}},
        {'USER_ID.ROLE_ID._id':ObjectId("5f155b8a3b6800007900da2b")},
        {'USER_ID.IS_BLOCKED':{"$ne":'Y'}}, 
        {'USER_ID.IS_DISABLED':{"$ne":'Y'}}, {'USER_ID.schoolId.NAME':{'$not':{'$regex':'test', '$options':'i'}}},
        ]}},
        {'$group':{'_id':{"district":'$USER_ID.schoolId._id'},
        'NAME_DISTRICT':{'$first':'$USER_ID.schoolId.NAME'},
        "ACTIVE_USER":{'$addToSet':"$USER_ID._id"},}},
            {"$project":{"_id":0,"DISTRICT_ID":"$_id.district","NAME_DISTRICT":1,"ACTIVE_USER":{"$size":"$ACTIVE_USER"}}}]
    merge121=list(collection.aggregate(qra12))
    d=pd.DataFrame(merge121)
    if d.empty == True:
        data = [[district,0,disid]]
        column_names1 = ["NAME_DISTRICT","ACTIVE_USER","DISTRICT_ID"]
        d = pd.DataFrame(data,columns = column_names1)
    d["MONTH"]=4
    # print(a)


    # In[12]:


    ###ACTIVE USER
    username = urllib.parse.quote_plus('admin')
    password = urllib.parse.quote_plus('A_dM!n|#!_2o20')
    client = MongoClient("mongodb://%s:%s@44.234.88.150:27017/" % (username, password))
    db=client.compass
    dateStr = "2020-06-01T00:00:00.000Z"
    myDatetime = dateutil.parser.parse(dateStr)
    collection = db.audio_track_master
    qra12=[
        {"$match":{'$and':[{'USER_ID.USER_NAME':{"$not":{"$regex":"test",'$options':'i'}}},
        {'USER_ID.EMAIL_ID':{"$not":{"$regex":"test",'$options':'i'}}},
        {'USER_ID.EMAIL_ID':{"$not":{"$regex":"1gen",'$options':'i'}}},
        {'USER_ID.USER_NAME':{'$not':{'$regex':'1gen', '$options':'i'}}},
        {'USER_ID.DISTRICT_ID.DISTRICT_NAME':{'$not':{'$regex':'test', '$options':'i'}}},
        {"USER_ID.schoolId._id":{"$in":db.school_master.distinct( "_id", { "IS_PORTAL": "Y","CATEGORY":{'$regex':district, '$options':'i'} } )}},
        {'USER_ID.DISTRICT_ID':{'$exists':1}},
        {'USER_ID.INCOMPLETE_SIGNUP':{"$ne":'Y'}}, 
        {'MODIFIED_DATE':{"$lt":myDatetime}},
        {'USER_ID.ROLE_ID._id':ObjectId("5f155b8a3b6800007900da2b")},
        {'USER_ID.IS_BLOCKED':{"$ne":'Y'}}, 
        {'USER_ID.IS_DISABLED':{"$ne":'Y'}}, {'USER_ID.schoolId.NAME':{'$not':{'$regex':'test', '$options':'i'}}},
        ]}},
        {'$group':{'_id':{"district":'$USER_ID.schoolId._id'},
        'NAME_DISTRICT':{'$first':'$USER_ID.schoolId.NAME'},
        "ACTIVE_USER":{'$addToSet':"$USER_ID._id"},}},
            {"$project":{"_id":0,"DISTRICT_ID":"$_id.district","NAME_DISTRICT":1,"ACTIVE_USER":{"$size":"$ACTIVE_USER"}}}]
    merge121=list(collection.aggregate(qra12))
    e=pd.DataFrame(merge121)
    if e.empty == True:
        data = [[district,0,disid]]
        column_names1 = ["NAME_DISTRICT","ACTIVE_USER","DISTRICT_ID"]
        e = pd.DataFrame(data,columns = column_names1)
    e["MONTH"]=5
    # print(a)


    # In[13]:


    ###ACTIVE USER
    username = urllib.parse.quote_plus('admin')
    password = urllib.parse.quote_plus('A_dM!n|#!_2o20')
    client = MongoClient("mongodb://%s:%s@44.234.88.150:27017/" % (username, password))
    db=client.compass
    dateStr = "2020-07-01T00:00:00.000Z"
    myDatetime = dateutil.parser.parse(dateStr)
    collection = db.audio_track_master
    qra12=[
        {"$match":{'$and':[{'USER_ID.USER_NAME':{"$not":{"$regex":"test",'$options':'i'}}},
        {'USER_ID.EMAIL_ID':{"$not":{"$regex":"test",'$options':'i'}}},
        {'USER_ID.EMAIL_ID':{"$not":{"$regex":"1gen",'$options':'i'}}},
        {'USER_ID.USER_NAME':{'$not':{'$regex':'1gen', '$options':'i'}}},
        {'USER_ID.DISTRICT_ID.DISTRICT_NAME':{'$not':{'$regex':'test', '$options':'i'}}},
        {"USER_ID.schoolId._id":{"$in":db.school_master.distinct( "_id", { "IS_PORTAL": "Y","CATEGORY":{'$regex':district, '$options':'i'} } )}},
        {'USER_ID.DISTRICT_ID':{'$exists':1}},
        {'USER_ID.INCOMPLETE_SIGNUP':{"$ne":'Y'}}, 
        {'MODIFIED_DATE':{"$lt":myDatetime}},
        {'USER_ID.ROLE_ID._id':ObjectId("5f155b8a3b6800007900da2b")},
        {'USER_ID.IS_BLOCKED':{"$ne":'Y'}}, 
        {'USER_ID.IS_DISABLED':{"$ne":'Y'}}, {'USER_ID.schoolId.NAME':{'$not':{'$regex':'test', '$options':'i'}}},
        ]}},
        {'$group':{'_id':{"district":'$USER_ID.schoolId._id'},
        'NAME_DISTRICT':{'$first':'$USER_ID.schoolId.NAME'},
        "ACTIVE_USER":{'$addToSet':"$USER_ID._id"},}},
            {"$project":{"_id":0,"DISTRICT_ID":"$_id.district","NAME_DISTRICT":1,"ACTIVE_USER":{"$size":"$ACTIVE_USER"}}}]
    merge121=list(collection.aggregate(qra12))
    f=pd.DataFrame(merge121)
    if f.empty == True:
        data = [[district,0,disid]]
        column_names1 = ["NAME_DISTRICT","ACTIVE_USER","DISTRICT_ID"]
        f = pd.DataFrame(data,columns = column_names1)
    f["MONTH"]=6
    # print(a)


    # In[14]:


    ###ACTIVE USER
    username = urllib.parse.quote_plus('admin')
    password = urllib.parse.quote_plus('A_dM!n|#!_2o20')
    client = MongoClient("mongodb://%s:%s@44.234.88.150:27017/" % (username, password))
    db=client.compass
    dateStr = "2020-08-01T00:00:00.000Z"
    myDatetime = dateutil.parser.parse(dateStr)
    collection = db.audio_track_master
    qra12=[
        {"$match":{'$and':[{'USER_ID.USER_NAME':{"$not":{"$regex":"test",'$options':'i'}}},
        {'USER_ID.EMAIL_ID':{"$not":{"$regex":"test",'$options':'i'}}},
        {'USER_ID.EMAIL_ID':{"$not":{"$regex":"1gen",'$options':'i'}}},
        {'USER_ID.USER_NAME':{'$not':{'$regex':'1gen', '$options':'i'}}},
        {'USER_ID.DISTRICT_ID.DISTRICT_NAME':{'$not':{'$regex':'test', '$options':'i'}}},
        {"USER_ID.schoolId._id":{"$in":db.school_master.distinct( "_id", { "IS_PORTAL": "Y","CATEGORY":{'$regex':district, '$options':'i'} } )}},
        {'USER_ID.DISTRICT_ID':{'$exists':1}},
        {'USER_ID.INCOMPLETE_SIGNUP':{"$ne":'Y'}}, 
        {'MODIFIED_DATE':{"$lt":myDatetime}},
        {'USER_ID.ROLE_ID._id':ObjectId("5f155b8a3b6800007900da2b")},
        {'USER_ID.IS_BLOCKED':{"$ne":'Y'}}, 
        {'USER_ID.IS_DISABLED':{"$ne":'Y'}}, {'USER_ID.schoolId.NAME':{'$not':{'$regex':'test', '$options':'i'}}},
        ]}},
        {'$group':{'_id':{"district":'$USER_ID.schoolId._id'},
        'NAME_DISTRICT':{'$first':'$USER_ID.schoolId.NAME'},
        "ACTIVE_USER":{'$addToSet':"$USER_ID._id"},}},
            {"$project":{"_id":0,"DISTRICT_ID":"$_id.district","NAME_DISTRICT":1,"ACTIVE_USER":{"$size":"$ACTIVE_USER"}}}]
    merge121=list(collection.aggregate(qra12))
    g=pd.DataFrame(merge121)
    if g.empty == True:
        data = [[district,0,disid]]
        column_names1 = ["NAME_DISTRICT","ACTIVE_USER","DISTRICT_ID"]
        g = pd.DataFrame(data,columns = column_names1)
    g["MONTH"]=7
    # print(a)


    # In[15]:


    ###ACTIVE USER
    username = urllib.parse.quote_plus('admin')
    password = urllib.parse.quote_plus('A_dM!n|#!_2o20')
    client = MongoClient("mongodb://%s:%s@44.234.88.150:27017/" % (username, password))
    db=client.compass
    dateStr = "2020-09-01T00:00:00.000Z"
    myDatetime = dateutil.parser.parse(dateStr)
    collection = db.audio_track_master
    qra12=[
        {"$match":{'$and':[{'USER_ID.USER_NAME':{"$not":{"$regex":"test",'$options':'i'}}},
        {'USER_ID.EMAIL_ID':{"$not":{"$regex":"test",'$options':'i'}}},
        {'USER_ID.EMAIL_ID':{"$not":{"$regex":"1gen",'$options':'i'}}},
        {'USER_ID.USER_NAME':{'$not':{'$regex':'1gen', '$options':'i'}}},
        {'USER_ID.DISTRICT_ID.DISTRICT_NAME':{'$not':{'$regex':'test', '$options':'i'}}},
        {"USER_ID.schoolId._id":{"$in":db.school_master.distinct( "_id", { "IS_PORTAL": "Y","CATEGORY":{'$regex':district, '$options':'i'} } )}},
        {'USER_ID.DISTRICT_ID':{'$exists':1}},
        {'USER_ID.INCOMPLETE_SIGNUP':{"$ne":'Y'}}, 
        {'MODIFIED_DATE':{"$lt":myDatetime}},
        {'USER_ID.ROLE_ID._id':ObjectId("5f155b8a3b6800007900da2b")},
        {'USER_ID.IS_BLOCKED':{"$ne":'Y'}}, 
        {'USER_ID.IS_DISABLED':{"$ne":'Y'}}, {'USER_ID.schoolId.NAME':{'$not':{'$regex':'test', '$options':'i'}}},
        ]}},
        {'$group':{'_id':{"district":'$USER_ID.schoolId._id'},
        'NAME_DISTRICT':{'$first':'$USER_ID.schoolId.NAME'},
        "ACTIVE_USER":{'$addToSet':"$USER_ID._id"},}},
            {"$project":{"_id":0,"DISTRICT_ID":"$_id.district","NAME_DISTRICT":1,"ACTIVE_USER":{"$size":"$ACTIVE_USER"}}}]
    merge121=list(collection.aggregate(qra12))
    h=pd.DataFrame(merge121)
    if h.empty == True:
        data = [[district,0,disid]]
        column_names1 = ["NAME_DISTRICT","ACTIVE_USER","DISTRICT_ID"]
        h = pd.DataFrame(data,columns = column_names1)
    h["MONTH"]=8
    # print(a)


    # In[16]:


    ###ACTIVE USER
    username = urllib.parse.quote_plus('admin')
    password = urllib.parse.quote_plus('A_dM!n|#!_2o20')
    client = MongoClient("mongodb://%s:%s@44.234.88.150:27017/" % (username, password))
    db=client.compass
    dateStr = "2020-10-01T00:00:00.000Z"
    myDatetime = dateutil.parser.parse(dateStr)
    collection = db.audio_track_master
    qra12=[
        {"$match":{'$and':[{'USER_ID.USER_NAME':{"$not":{"$regex":"test",'$options':'i'}}},
        {'USER_ID.EMAIL_ID':{"$not":{"$regex":"test",'$options':'i'}}},
        {'USER_ID.EMAIL_ID':{"$not":{"$regex":"1gen",'$options':'i'}}},
        {'USER_ID.USER_NAME':{'$not':{'$regex':'1gen', '$options':'i'}}},
        {'USER_ID.DISTRICT_ID.DISTRICT_NAME':{'$not':{'$regex':'test', '$options':'i'}}},
        {"USER_ID.schoolId._id":{"$in":db.school_master.distinct( "_id", { "IS_PORTAL": "Y","CATEGORY":{'$regex':district, '$options':'i'} } )}},
        {'USER_ID.DISTRICT_ID':{'$exists':1}},
        {'USER_ID.INCOMPLETE_SIGNUP':{"$ne":'Y'}}, 
        {'MODIFIED_DATE':{"$lt":myDatetime}},
        {'USER_ID.ROLE_ID._id':ObjectId("5f155b8a3b6800007900da2b")},
        {'USER_ID.IS_BLOCKED':{"$ne":'Y'}}, 
        {'USER_ID.IS_DISABLED':{"$ne":'Y'}}, {'USER_ID.schoolId.NAME':{'$not':{'$regex':'test', '$options':'i'}}},
        ]}},
        {'$group':{'_id':{"district":'$USER_ID.schoolId._id'},
        'NAME_DISTRICT':{'$first':'$USER_ID.schoolId.NAME'},
        "ACTIVE_USER":{'$addToSet':"$USER_ID._id"},}},
            {"$project":{"_id":0,"DISTRICT_ID":"$_id.district","NAME_DISTRICT":1,"ACTIVE_USER":{"$size":"$ACTIVE_USER"}}}]
    merge121=list(collection.aggregate(qra12))
    i=pd.DataFrame(merge121)
    if i.empty == True:
        data = [[district,0,disid]]
        column_names1 = ["NAME_DISTRICT","ACTIVE_USER","DISTRICT_ID"]
        i = pd.DataFrame(data,columns = column_names1)
    i["MONTH"]=9
    # print(a)


    # In[17]:


    ###ACTIVE USER
    username = urllib.parse.quote_plus('admin')
    password = urllib.parse.quote_plus('A_dM!n|#!_2o20')
    client = MongoClient("mongodb://%s:%s@44.234.88.150:27017/" % (username, password))
    db=client.compass
    dateStr = "2020-11-01T00:00:00.000Z"
    myDatetime = dateutil.parser.parse(dateStr)
    collection = db.audio_track_master
    qra12=[
        {"$match":{'$and':[{'USER_ID.USER_NAME':{"$not":{"$regex":"test",'$options':'i'}}},
        {'USER_ID.EMAIL_ID':{"$not":{"$regex":"test",'$options':'i'}}},
        {'USER_ID.EMAIL_ID':{"$not":{"$regex":"1gen",'$options':'i'}}},
        {'USER_ID.USER_NAME':{'$not':{'$regex':'1gen', '$options':'i'}}},
        {'USER_ID.DISTRICT_ID.DISTRICT_NAME':{'$not':{'$regex':'test', '$options':'i'}}},
        {"USER_ID.schoolId._id":{"$in":db.school_master.distinct( "_id", { "IS_PORTAL": "Y","CATEGORY":{'$regex':district, '$options':'i'} } )}},
        {'USER_ID.DISTRICT_ID':{'$exists':1}},
        {'USER_ID.INCOMPLETE_SIGNUP':{"$ne":'Y'}}, 
        {'MODIFIED_DATE':{"$lt":myDatetime}},
        {'USER_ID.ROLE_ID._id':ObjectId("5f155b8a3b6800007900da2b")},
        {'USER_ID.IS_BLOCKED':{"$ne":'Y'}}, 
        {'USER_ID.IS_DISABLED':{"$ne":'Y'}}, {'USER_ID.schoolId.NAME':{'$not':{'$regex':'test', '$options':'i'}}},
        ]}},
        {'$group':{'_id':{"district":'$USER_ID.schoolId._id'},
        'NAME_DISTRICT':{'$first':'$USER_ID.schoolId.NAME'},
        "ACTIVE_USER":{'$addToSet':"$USER_ID._id"},}},
            {"$project":{"_id":0,"DISTRICT_ID":"$_id.district","NAME_DISTRICT":1,"ACTIVE_USER":{"$size":"$ACTIVE_USER"}}}]
    merge121=list(collection.aggregate(qra12))
    j=pd.DataFrame(merge121)
    if j.empty == True:
        data = [[district,0,disid]]
        column_names1 = ["NAME_DISTRICT","ACTIVE_USER","DISTRICT_ID"]
        j = pd.DataFrame(data,columns = column_names1)
    j["MONTH"]=10
    # print(a)


    # In[18]:


    ###ACTIVE USER
    username = urllib.parse.quote_plus('admin')
    password = urllib.parse.quote_plus('A_dM!n|#!_2o20')
    client = MongoClient("mongodb://%s:%s@44.234.88.150:27017/" % (username, password))
    db=client.compass
    dateStr = "2020-12-01T00:00:00.000Z"
    myDatetime = dateutil.parser.parse(dateStr)
    collection = db.audio_track_master
    qra12=[
        {"$match":{'$and':[{'USER_ID.USER_NAME':{"$not":{"$regex":"test",'$options':'i'}}},
        {'USER_ID.EMAIL_ID':{"$not":{"$regex":"test",'$options':'i'}}},
        {'USER_ID.EMAIL_ID':{"$not":{"$regex":"1gen",'$options':'i'}}},
        {'USER_ID.USER_NAME':{'$not':{'$regex':'1gen', '$options':'i'}}},
        {'USER_ID.DISTRICT_ID.DISTRICT_NAME':{'$not':{'$regex':'test', '$options':'i'}}},
        {"USER_ID.schoolId._id":{"$in":db.school_master.distinct( "_id", { "IS_PORTAL": "Y","CATEGORY":{'$regex':district, '$options':'i'} } )}},
        {'USER_ID.DISTRICT_ID':{'$exists':1}},
        {'USER_ID.INCOMPLETE_SIGNUP':{"$ne":'Y'}}, 
        {'MODIFIED_DATE':{"$lt":myDatetime}},
        {'USER_ID.ROLE_ID._id':ObjectId("5f155b8a3b6800007900da2b")},
        {'USER_ID.IS_BLOCKED':{"$ne":'Y'}}, 
        {'USER_ID.IS_DISABLED':{"$ne":'Y'}}, {'USER_ID.schoolId.NAME':{'$not':{'$regex':'test', '$options':'i'}}},
        ]}},
        {'$group':{'_id':{"district":'$USER_ID.schoolId._id'},
        'NAME_DISTRICT':{'$first':'$USER_ID.schoolId.NAME'},
        "ACTIVE_USER":{'$addToSet':"$USER_ID._id"},}},
            {"$project":{"_id":0,"DISTRICT_ID":"$_id.district","NAME_DISTRICT":1,"ACTIVE_USER":{"$size":"$ACTIVE_USER"}}}]
    merge121=list(collection.aggregate(qra12))
    k=pd.DataFrame(merge121)
    if k.empty == True:
        data = [[district,0,disid]]
        column_names1 = ["NAME_DISTRICT","ACTIVE_USER","DISTRICT_ID"]
        k = pd.DataFrame(data,columns = column_names1)
    k["MONTH"]=11
    # print(a)


    # In[19]:


    ###ACTIVE USER
    username = urllib.parse.quote_plus('admin')
    password = urllib.parse.quote_plus('A_dM!n|#!_2o20')
    client = MongoClient("mongodb://%s:%s@44.234.88.150:27017/" % (username, password))
    db=client.compass
    dateStr = "2021-01-01T00:00:00.000Z"
    myDatetime = dateutil.parser.parse(dateStr)
    collection = db.audio_track_master
    qra12=[
        {"$match":{'$and':[{'USER_ID.USER_NAME':{"$not":{"$regex":"test",'$options':'i'}}},
        {'USER_ID.EMAIL_ID':{"$not":{"$regex":"test",'$options':'i'}}},
        {'USER_ID.EMAIL_ID':{"$not":{"$regex":"1gen",'$options':'i'}}},
        {'USER_ID.USER_NAME':{'$not':{'$regex':'1gen', '$options':'i'}}},
        {'USER_ID.DISTRICT_ID.DISTRICT_NAME':{'$not':{'$regex':'test', '$options':'i'}}},
        {"USER_ID.schoolId._id":{"$in":db.school_master.distinct( "_id", { "IS_PORTAL": "Y","CATEGORY":{'$regex':district, '$options':'i'} } )}},
        {'USER_ID.DISTRICT_ID':{'$exists':1}},
        {'USER_ID.INCOMPLETE_SIGNUP':{"$ne":'Y'}}, 
        {'MODIFIED_DATE':{"$lt":myDatetime}},
        {'USER_ID.ROLE_ID._id':ObjectId("5f155b8a3b6800007900da2b")},
        {'USER_ID.IS_BLOCKED':{"$ne":'Y'}}, 
        {'USER_ID.IS_DISABLED':{"$ne":'Y'}}, {'USER_ID.schoolId.NAME':{'$not':{'$regex':'test', '$options':'i'}}},
        ]}},
        {'$group':{'_id':{"district":'$USER_ID.schoolId._id'},
        'NAME_DISTRICT':{'$first':'$USER_ID.schoolId.NAME'},
        "ACTIVE_USER":{'$addToSet':"$USER_ID._id"},}},
            {"$project":{"_id":0,"DISTRICT_ID":"$_id.district","NAME_DISTRICT":1,"ACTIVE_USER":{"$size":"$ACTIVE_USER"}}}]
    merge121=list(collection.aggregate(qra12))
    l=pd.DataFrame(merge121)
    if l.empty == True:
        data = [[district,0,disid]]
        column_names1 = ["NAME_DISTRICT","ACTIVE_USER","DISTRICT_ID"]
        l = pd.DataFrame(data,columns = column_names1)
    l["MONTH"]=12
    # print(a)


    # In[29]:


    df1=pd.concat([a,b,c,d,e,f,g,h,i,j,k,l])


    # In[ ]:


    # ###ACTIVE FAMILY
    # username = urllib.parse.quote_plus('admin')
    # password = urllib.parse.quote_plus('A_dM!n|#!_2o20')
    # client = MongoClient("mongodb://%s:%s@44.234.88.150:27017/" % (username, password))
    # db=client.compass
    # dateStr = "2020-01-01T00:00:00.000Z"
    # myDatetime = dateutil.parser.parse(dateStr)
    # collection = db.audio_track_master
    # qra12=[
    #     {"$match":{'$and':[{'USER_ID.USER_NAME':{"$not":{"$regex":"test",'$options':'i'}}},
    #     {'USER_ID.EMAIL_ID':{"$not":{"$regex":"test",'$options':'i'}}},
    #     {'USER_ID.EMAIL_ID':{"$not":{"$regex":"1gen",'$options':'i'}}},
    #     {'USER_ID.USER_NAME':{'$not':{'$regex':'1gen', '$options':'i'}}},
    #     {'USER_ID.DISTRICT_ID.DISTRICT_NAME':{'$not':{'$regex':'test', '$options':'i'}}},
    #     {"USER_ID.schoolId._id":{"$in":db.school_master.distinct( "_id", { "IS_PORTAL": "Y","CATEGORY":{'$regex':district, '$options':'i'} } )}},
    #     {'USER_ID.DISTRICT_ID':{'$exists':1}},
    #     {'USER_ID.INCOMPLETE_SIGNUP':{"$ne":'Y'}}, 
    #     {'MODIFIED_DATE':{"$gte":myDatetime}},
    #     {'USER_ID.ROLE_ID._id':ObjectId("5f155b8a3b6800007900da2b")},
    #     {'USER_ID.IS_BLOCKED':{"$ne":'Y'}}, 
    #     {'USER_ID.IS_DISABLED':{"$ne":'Y'}}, {'USER_ID.schoolId.NAME':{'$not':{'$regex':'test', '$options':'i'}}},
    #     ]}},
    #     {'$group':{'_id':{"district":'$USER_ID.schoolId._id',"year":{"$year": "$MODIFIED_DATE"},"month":{"$month": "$MODIFIED_DATE"}},
    #     'NAME_DISTRICT':{'$first':'$USER_ID.schoolId.NAME'},
    #     'PRACTICE':{'$sum':1},
    #     "ACTIVE_FAM":{'$addToSet':"$USER_ID._id"},
    #     'Mindful_Minutes':{"$sum":{"$round":[{"$divide":[{"$subtract":['$CURSOR_END','$cursorStart']}, 60]},2]}}}},
    #         {"$project":{"_id":0,"DISTRICT_ID":"$_id.district","MONTH":"$_id.month","YEAR":"$_id.year","NAME_DISTRICT":1,"PRACTICE":1,"ACTIVE_FAM":{"$size":"$ACTIVE_FAM"},
    #                    "Mindful_Minutes":1 }}]
    # merge121=list(collection.aggregate(qra12))
    # df1=pd.DataFrame(merge121)


    # In[33]:


    df1=df1.rename(columns={"ACTIVE_USER": "ACTIVE_FAM"})


    # In[34]:


    df1=df1.sort_values(by=['NAME_DISTRICT'], ascending=True)
    df1
    # x=df1[df1['NAME_DISTRICT']=="Belleville School District"]
    dislist=list(set(df1["NAME_DISTRICT"]))
    df2=df1[["NAME_DISTRICT","MONTH","ACTIVE_FAM"]]
    overall=pd.DataFrame(columns=["NAME_DISTRICT","MONTH","ACTIVE_FAM"])
    result=[]
    for k in dislist:
    #     print(k)
        df45=df2[df2["NAME_DISTRICT"]==k]
        df45.reset_index()
        for i in range(1,13):
            if i in list(df45["MONTH"]):
                pass
    #              print("month_present",i)
            else:
                df45.loc[i+len(df45)] = [k] +[i]+[0]
    #     df46=df45.groupby(['NAME_DISTRICT', 'MONTH']).reset_index()
    #     df46=df45.groupby(['NAME_DISTRICT', 'MONTH']).sum().groupby(level=0).cumsum().reset_index()
    #     print(df46)
        sorted_df =df45.sort_values(by=['MONTH'], ascending=True)
        sorted_df1=sorted_df.reset_index()
        result.append(sorted_df)
    buubleactfam = pd.concat(result)
    buubleactfam["acuidf"]=buubleactfam["NAME_DISTRICT"]+buubleactfam["MONTH"].map(str)
    finmergeuf=pd.merge(finmergeu, buubleactfam, how='left', left_on='idu', right_on='acuidf')
    finmergeuf["USER ENGAGEMENT"]=round((finmergeuf["ACTIVE_USER"]/finmergeuf["totaluser"])*100)
    finmergeuf["FAMILY ENGAGEMENT"]=round((finmergeuf["ACTIVE_FAM"]/finmergeuf["famcount"])*100)
    finmergeufo=finmergeuf[["NAME_DISTRICT_x","MONTH_x","USER ENGAGEMENT","FAMILY ENGAGEMENT"]]
    finmergeufo=finmergeufo.fillna(0)
    finmergeufo=finmergeufo.loc[:,~finmergeufo.columns.duplicated()]
    username = urllib.parse.quote_plus('admin')
    password = urllib.parse.quote_plus('A_dM!n|#!_2o20')
    client = MongoClient("mongodb://%s:%s@44.234.88.150:27017/" % (username, password))
    db=client.compass
    # dateStr = "2020-01-01T00:00:00.000Z"
    myDatetime = dateutil.parser.parse(dateStr)
    collection = db.audio_track_master
    qra12=[
        {"$match":{'$and':[{'USER_ID.USER_NAME':{"$not":{"$regex":"test",'$options':'i'}}},
        {'USER_ID.EMAIL_ID':{"$not":{"$regex":"test",'$options':'i'}}},
        {'USER_ID.EMAIL_ID':{"$not":{"$regex":"1gen",'$options':'i'}}},
        {'USER_ID.USER_NAME':{'$not':{'$regex':'1gen', '$options':'i'}}},
        {'USER_ID.DISTRICT_ID.DISTRICT_NAME':{'$not':{'$regex':'test', '$options':'i'}}},
        {"USER_ID.schoolId._id":{"$in":db.school_master.distinct( "_id", { "IS_PORTAL": "Y","CATEGORY":{'$regex':district, '$options':'i'} } )}},
        {'USER_ID.DISTRICT_ID':{'$exists':1}},
        {'USER_ID.INCOMPLETE_SIGNUP':{"$ne":'Y'}}, 
    #     {'MODIFIED_DATE':{"$gte":myDatetime}},
    #     {'USER_ID.ROLE_ID._id':ObjectId("5f155b8a3b6800007900da2b")},
        {'USER_ID.IS_BLOCKED':{"$ne":'Y'}}, 
        {'USER_ID.IS_DISABLED':{"$ne":'Y'}}, {'USER_ID.schoolId.NAME':{'$not':{'$regex':'test', '$options':'i'}}},
        ]}},
        {'$group':{'_id':{"district":'$USER_ID.schoolId._id'},
        'NAME_DISTRICT':{'$first':'$USER_ID.schoolId.NAME'},
        'PRACTICE':{'$sum':1},
                  }},
            {"$project":{"_id":0,"DISTRICT_ID":"$_id.district","NAME_DISTRICT":1,"PRACTICE":1 }}]
    merge1211=list(collection.aggregate(qra12))
    df1111=pd.DataFrame(merge1211)
    # print("check1")
    df1111=df1111.sort_values(by=['NAME_DISTRICT'], ascending=True)
    DISPRACTO=df1111[["NAME_DISTRICT","PRACTICE"]]
    username = urllib.parse.quote_plus('admin')
    password = urllib.parse.quote_plus('A_dM!n|#!_2o20')
    client = MongoClient("mongodb://%s:%s@44.234.88.150:27017/" % (username, password))
    db=client.compass
    # dateStr = "2020-01-01T00:00:00.000Z"
    myDatetime = dateutil.parser.parse(dateStr)
    collection = db.user_master
    qra12=[
        {"$match":{'$and':[{'USER_NAME':{"$not":{"$regex":"test",'$options':'i'}}},
        {'EMAIL_ID':{"$not":{"$regex":"test",'$options':'i'}}},
        {'EMAIL_ID':{"$not":{"$regex":"1gen",'$options':'i'}}},
        {'USER_NAME':{'$not':{'$regex':'1gen', '$options':'i'}}},
        {'DISTRICT_ID.DISTRICT_NAME':{'$not':{'$regex':'test', '$options':'i'}}},
        {"schoolId._id":{"$in":db.school_master.distinct( "_id", { "IS_PORTAL": "Y","CATEGORY":{'$regex':district, '$options':'i'} } )}},
        {'DISTRICT_ID':{'$exists':1}},
        {'INCOMPLETE_SIGNUP':{"$ne":'Y'}}, 
    #     {'MODIFIED_DATE':{"$gte":myDatetime}},
    #     {'ROLE_ID._id':ObjectId("5f155b8a3b6800007900da2b")},
        {'IS_BLOCKED':{"$ne":'Y'}}, 
        {'IS_DISABLED':{"$ne":'Y'}}, {'schoolId.NAME':{'$not':{'$regex':'test', '$options':'i'}}},
        ]}},
        {'$group':{'_id':{"district":'$schoolId._id'},
        'NAME_DISTRICT':{'$first':'$schoolId.NAME'},
        "USER COUNT":{'$addToSet':"$_id"},
                  }},
            {"$project":{"_id":0,"DISTRICT_ID":"$_id.district","NAME_DISTRICT":1,"USER COUNT":{"$size":"$USER COUNT"} }}]
    merge1211=list(collection.aggregate(qra12))
    df1111=pd.DataFrame(merge1211)
    df1111=df1111.sort_values(by=['NAME_DISTRICT'], ascending=True)
    DISSCHOOL=df1111[["NAME_DISTRICT","USER COUNT"]]
    finmergeufosch=pd.merge(finmergeufo, DISSCHOOL, how='left', left_on='NAME_DISTRICT_x', right_on='NAME_DISTRICT')
    finmergeufoschprac=pd.merge(finmergeufosch, DISPRACTO, how='left', left_on='NAME_DISTRICT_x', right_on='NAME_DISTRICT')
    finmergeufoschprac=finmergeufoschprac.fillna(0)
    final_buuble_data=finmergeufoschprac[["NAME_DISTRICT_x","MONTH_x","USER ENGAGEMENT","FAMILY ENGAGEMENT","USER COUNT","PRACTICE"]]
    finaldata=final_buuble_data.rename(columns={"NAME_DISTRICT_x": "DISTRICT_NAME","USER ENGAGEMENT":"USER_ENGAGEMENT","USER COUNT":"USER_COUNT", "FAMILY ENGAGEMENT":"FAMILY_ENGAGEMENT","MONTH_x": "MONTH"})
    finaldata=finaldata.loc[:,~finaldata.columns.duplicated()]
    li = [finaldata.columns.values.tolist()] + finaldata.values.tolist() 
    sheet = pe.Sheet(li)
    print(sheet,"sheet")
    print(type(sheet),"sheet type")
    ioO = io.StringIO()
    sheet.save_to_memory("csv", ioO)
    output = make_response(ioO.getvalue())
    # output.headers["Content-Disposition"] = "attachment; filename=export.csv"
    output.headers["Content-type"] = "text/csv"
    return output


@app.route('/rtlausdmapcount')
def realtimelausdmaprcount():
    username = urllib.parse.quote_plus('admin')
    password = urllib.parse.quote_plus('A_dM!n|#!_2o20')
    client = MongoClient("mongodb://%s:%s@44.234.88.150:27017/" % (username, password))
    db=client.compass
    collection = db.audio_track_master
    query4=[{"$match":{
             '$and':[{ 'USER_ID.USER_NAME':{"$not":{"$regex":"test",'$options':'i'}}},
                       {'USER_ID.EMAIL_ID':{"$not":{"$regex":"test",'$options':'i'}}},
                         {'USER_ID.EMAIL_ID':{"$not":{"$regex":"1gen",'$options':'i'}}},
              {'USER_ID.INCOMPLETE_SIGNUP':{"$ne":'Y'}},
              {'USER_ID.IS_DISABLED':{"$ne":'Y'}},
              {'USER_ID.IS_BLOCKED':{"$ne":'Y'}},
              {'USER_ID.schoolId.STATE':"California"},
              {'USER_ID.ROLE_ID._id':{'$ne':ObjectId("5f155b8a3b6800007900da2b")}},
              {'USER_ID.DEVICE_USED':{"$regex":'webapp','$options':'i'}},
              {'USER_ID.schoolId.NAME':{'$not':{"$regex":'Blocked','$options':'i'}}},
              {'USER_ID.schoolId.BLOCKED_BY_CAP':{'$exists':0}},
              {'MODIFIED_DATE': {'$gte': datetime.datetime.utcnow()-datetime.timedelta(seconds=60)}}
              ]}},
           {'$group':
           {'_id':'$USER_ID._id',
               'State':{'$first':'$USER_ID.schoolId.CITY'},
               'Country':{'$first':'$USER_ID.schoolId.COUNTRY'}
               }}
           ]
    realtime=list(collection.aggregate(query4))
    realtimeuserpractising=pd.DataFrame(realtime)
    if realtimeuserpractising.empty:
        df = pd.DataFrame(columns=['State', 'STATE_SHOT','text','_id'])
        for i in range(1):
            df.loc[i] = ['none'] +['none'] +['NO USER PRACTICING RIGHT NOW']+ [0]
            df1=df[["State","_id","STATE_SHOT",'text']]
            links0 =df1.rename(columns={'STATE_SHOT' : 'code', '_id' : 'z','State':'name','text':'text'}).to_dict('r')
    else:
        us_state_shot = {
           'Santa Barbara':'us-ca-083',
        'Ventura':'us-ca-111',
        'San Bernardino':'us-ca-071',
        'Yuba':'us-ca-115',
        'Sutter':'us-ca-101',
        'Kings':'us-ca-031',
        'Monterey':'us-ca-053',
        'Nevada':'us-ca-057',
        'Orange':'us-ca-059',
        'Riverside':'us-ca-065',
        'San Diego':'us-ca-073',
        'Marin':'us-ca-041',
        'San Francisco':'us-ca-075',
        'Solano':'us-ca-095',
        'Sonoma':'us-ca-097',
        'Napa':'us-ca-055',
        'Contra Costa':'us-ca-013',
        'Calaveras':'us-ca-009',
        'San Joaquin':'us-ca-077',
        'Lassen':'us-ca-035',
        'Sierra':'us-ca-091',
        'Sacramento':'us-ca-067',
        'El Dorado':'us-ca-017',
        'Stanislaus':'us-ca-099',
        'Placer':'us-ca-061',
        'Mariposa':'us-ca-043',
        'Plumas':'us-ca-063',
        'Modoc':'us-ca-049',
        'Shasta':'us-ca-089',
        'Tuolumne':'us-ca-109',
        'Madera':'us-ca-039',
        'Alpine':'us-ca-003',
        'San Benito':'us-ca-069',
        'Merced':'us-ca-047',
        'San Luis Obispo':'us-ca-079',
        'Colusa':'us-ca-011',
        'Butte':'us-ca-007',
        'San Mateo':'us-ca-081',
        'Santa Cruz':'us-ca-087',
        'Santa Clara':'us-ca-085',
        'Kern':'us-ca-029',
        'Amador':'us-ca-005',
        'Yolo':'us-ca-113',
        'Lake':'us-ca-033',
        'Mendocino':'us-ca-045',
        'Tehama':'us-ca-103',
        'Humboldt':'us-ca-023',
        'Siskiyou':'us-ca-093',
        'Inyo':'us-ca-027',
        'Alameda':'us-ca-001',
        'Los Angeles':'us-ca-037',
        'Imperial':'us-ca-025',
        'Glenn':'us-ca-021',
        'Tulare':'us-ca-107',
        'Fresno':'us-ca-019',
        'Del Norte':'us-ca-015',
        'Trinity':'us-ca-105',
        'Mono':'us-ca-051',

        }
        realtimeuserpractising["STATE_SHOT"] = realtimeuserpractising["State"].map(us_state_shot) 
        df1=realtimeuserpractising.groupby(["State","STATE_SHOT"]).count().reset_index()
        df2=df1[["State","_id","STATE_SHOT"]]
        links0 =df2.rename(columns={'STATE_SHOT' : 'code', '_id' : 'z','State':'name'}).to_dict('r')
    return json.dumps(links0)

@app.route('/schoolsearchtunein/<name>')
def school_search_tunein(name):
    name1=name.replace("%20"," ")
    print(name1,"hola")
    from bson.regex import Regex
    from pymongo import MongoClient
    from flask import Flask,json

    import urllib 
    import pandas as pd
    mongo_uri = "mongodb://admin:" + urllib.parse.quote("I#L@teST^m0NGO_2o20!") + "@34.214.24.229:27017/"
    client = MongoClient(mongo_uri)
    # client = MongoClient("mongodb://host:port/")
    database = client["compass"]
    collection = database["user_master"]

    # Created with Studio 3T, the IDE for MongoDB - https://studio3t.com
    query = {}
#     query["schoolId.NAME"] = name1
    query["schoolId._id"] = ObjectId(name)
    #     query["EMAIL_ID"] = Regex(u".*amorgan@methacton\\.org.*", "i")
    query["USER_NAME"] = {
        u"$not": Regex(u".*TEST.*", "i")
    }

    query["IS_BLOCKED"] = {
        u"$ne": u"Y"
    }

    query["ROLE_ID.ROLE_NAME"] = {
        u"$not": Regex(u".*PRESENT.*", "i")
    }

    query["IS_DISABLED"] = {
        u"$ne": u"Y"
    }

    query["INCOMPLETE_SIGNUP"] = {
        u"$ne": u"Y"
    }

    # query["DEVICE_USED"] = Regex(u".*webapp.*", "i")

    projection = {}
    projection["USER_ID.USER_ID"] = 1.0
    projection["EMAIL_ID"] = 1.0
    projection["CREATED_DATE"] = 1.0

    projection["USER_NAME"] = 1.0
    projection["IS_ADMIN"] = 1.0
    projection["schoolId.ADDRESS"] = 1.0
    projection["schoolId.CITY"] = 1.0
    projection["schoolId.STATE"] = 1.0
    projection["schoolId.COUNTRY"] = 1.0
    projection["schoolId.NAME"] = 1.0
    projection["schoolId.LONGITUDE"]=1.0
    projection["schoolId.LATITUDE"]=1.0
    projection["DISTRICT_ID._id"]=1.0

    cursor = collection.find(query, projection = projection)
    dfum=(list(cursor))
    dfum=pd.json_normalize(dfum, max_level=1).fillna(0)
    if dfum.empty == True:
        temp={"data":"NO INFO FOR THIS SCHOOL"}
    else:    
        schoolname=dfum["schoolId.NAME"][0]
        country=dfum["schoolId.COUNTRY"][0]
        city=dfum["schoolId.CITY"][0]
        state=dfum["schoolId.STATE"][0]
        address=dfum["schoolId.ADDRESS"][0]
        if "schoolId.LATITUDE" in dfum.columns:
            Latitude=dfum["schoolId.LATITUDE"][0]       
        else:
            Latitude=int(0)
        if "schoolId.LONGITUDE" in dfum.columns:
            longitude=dfum["schoolId.LONGITUDE"][0]       
        else:
            longitude=int(0)
        if "DISTRICT_ID._id" in dfum.columns:
            disid=dfum["DISTRICT_ID._id"][0]      
        else:
            disid=int(0)

        admin1=dfum[dfum['IS_ADMIN']=='Y']

        admin2=admin1['USER_NAME']
        admin3=list(admin2)
        admin=admin3[0]
        adminemail1=admin1['EMAIL_ID']
        admine=list(adminemail1)
        # adminemail=[dfum['EMAIL_ID'][dfum['IS_ADMIN']=='Y']][0]
        adminemail=admine[0]
        #     print(adminemail)
        email=list(dfum['EMAIL_ID'])
        #     print(email)
        totaluser=len(email)
        collection = database["audio_track_master"]

        #     Created with Studio 3T, the IDE for MongoDB - https://studio3t.com/

        pipeline = [
            {
                u"$match": {
                    u"USER_ID.EMAIL_ID": {
                        u"$in": email
                    }
                }

            }, 
            {
                u"$group": {
                    u"_id": {
                        u"USER_ID\u1390_id": u"$USER_ID._id"
                    },
                    u"MAX(MODIFIED_DATE)": {
                        u"$max": u"$MODIFIED_DATE"
                    },
                    u"COUNT(USER_ID\u1390_id)": {
                        u"$sum": 1
                    }
                }
            }, 
            {
                u"$project": {
                    u"USER_ID._id": u"$_id.USER_ID\u1390_id",
                    u"MAX(MODIFIED_DATE)": u"$MAX(MODIFIED_DATE)",
                    u"COUNT(USER_ID\u1390_id)": u"$COUNT(USER_ID\u1390_id)",
                    u"_id": 0
                }
            }
        ]

        cursor = collection.aggregate(
            pipeline, 
            allowDiskUse = True
        )
        dfatd=list(cursor)
        collection = database["district_master"]

        # Created with Studio 3T, the IDE for MongoDB - https://studio3t.com
        query = {}
        query["_id"] = ObjectId(disid)

        projection = {}
        projection["DISTRICT_LINK"] = 1.0
        projection["COUNTY_CODE"] = 1.0
        cursor = collection.find(query, projection = projection)
        dfdm=(list(cursor))
        dfdm=pd.json_normalize(dfdm, max_level=1)
        if "DISTRICT_LINK" in dfdm.columns:
            dlink=dfdm["DISTRICT_LINK"][0]       
        else:
            dlink=int(0)
        if "COUNTY_CODE" in dfdm.columns:
            ccode=dfdm["COUNTY_CODE"][0]       
        else:
            ccode=int(0)
        dfatd=pd.json_normalize(dfatd, max_level=1)
        #     print(dfatd)
        collection = database["subscription_master"]

        # Created with Studio 3T, the IDE for MongoDB - https://studio3t.com/

        pipeline = [
            {
                u"$match": {
                    u"USER_ID.EMAIL_ID": {
                        u"$in": email
                    }
                }
            }, 
            {
                u"$group": {
                    u"_id": {
                        u"USER_ID\u1390_id": u"$USER_ID._id"
                    },
                    u"MAX(SUBSCRIPTION_EXPIRE_DATE)": {
                        u"$max": u"$SUBSCRIPTION_EXPIRE_DATE"
                    }
                }
            }, 
            {
                u"$project": {
                    u"MAX(SUBSCRIPTION_EXPIRE_DATE)": u"$MAX(SUBSCRIPTION_EXPIRE_DATE)",
                    u"USER_ID._id": u"$_id.USER_ID\u1390_id",
                    u"_id": 0
                }
            }
        ]

        cursor = collection.aggregate(
            pipeline, 
            allowDiskUse = True
        )
        dfsbm=list(cursor)
        dfsbm=pd.json_normalize(dfsbm, max_level=1)
        #     print(dfatd,"atd")

        try:
            dffinal=pd.merge(dfum,dfatd,left_on='_id',right_on='USER_ID._id',how='left',suffixes=('_',''))
            dffinalnew=pd.merge(dffinal,dfsbm,left_on='_id',right_on='USER_ID._id',how='left',suffixes=('_',''))
        except:
            dfum['MAX(MODIFIED_DATE)']='NO PRACTICE'
            dfum['COUNT(USER_ID᎐_id)']=0
            dffinal=dfum
            dffinalnew=pd.merge(dffinal,dfsbm,left_on='_id',right_on='USER_ID._id',how='left',suffixes=('_',''))


        #     schoolname=dfum["schoolId.NAME"][0]
        country=dfum["schoolId.COUNTRY"][0]
        city=dfum["schoolId.CITY"][0]
        state=dfum["schoolId.STATE"][0]
        address=dfum["schoolId.ADDRESS"][0]
        #     admin=[dfum['USER_NAME'][dfum['IS_ADMIN']=='Y']][0]
        #     admin=admin[0]
        #     adminemail=[dfum['EMAIL_ID'][dfum['IS_ADMIN']=='Y']][0]
        #     adminemail=adminemail[0]
        email=list(dfum['EMAIL_ID'])
        totaluser=len(email)
        dffinalnew['MAX(MODIFIED_DATE)'].fillna("NO PRACTICE", inplace=True)
        dffinalnew['MAX(SUBSCRIPTION_EXPIRE_DATE)'].fillna(" ", inplace=True)
        dffinalnew['COUNT(USER_ID᎐_id)'].fillna(0, inplace=True)
        pracsum=sum(list(dffinalnew['COUNT(USER_ID᎐_id)']))
        dffinalnew.fillna(value=pd.np.nan, inplace=True)

        MAX=[]
        for i in dffinalnew['MAX(MODIFIED_DATE)']:
            if  i != 'NO PRACTICE' :
                MAX.append(i.strftime("%d %b %Y "))
            else:
                MAX.append("NO PRACTICE")
        SUBSCRIPTION_EXPIRE_DATE=[]
        for i in dffinalnew['MAX(SUBSCRIPTION_EXPIRE_DATE)']:
            if  i != ' ' :
                SUBSCRIPTION_EXPIRE_DATE.append(i.strftime("%d %b %Y "))
            else:
                SUBSCRIPTION_EXPIRE_DATE.append(" ")        
        CREATED_DATE=[]
        for i in dffinalnew['CREATED_DATE']:
            if  i != ' ' :
                CREATED_DATE.append(i.strftime("%d %b %Y "))
            else: 
                CREATED_DATE.append(" ")
        data=[]
        today = date.today()
        d4 = today
        if d4 > dffinalnew['MAX(SUBSCRIPTION_EXPIRE_DATE)'][0]:
            EXPIRE="EXPIRED"
        else:
            EXPIRE="NOT EXPIRED"
        for T,k,l,m,o,p in zip(dffinalnew['USER_NAME'].tolist(),dffinalnew['EMAIL_ID'].tolist(),CREATED_DATE,MAX,SUBSCRIPTION_EXPIRE_DATE,dffinalnew['COUNT(USER_ID᎐_id)'].tolist()):
            #print(p,q,r)
            data.append([T,k,l,m,o,p])

        temp={"data":data,"lat":Latitude,"long":longitude,"school_practice_count":str(pracsum),"school_name":schoolname,"country":country,"state":state,"city":city,"address":address,"admin_name":admin,"admin_email":adminemail,"user_count":totaluser,"EXPIRE_STATUS":EXPIRE,"dis": dlink,
             "Country_code": ccode}

    return json.dumps(temp)

@app.route('/sub_detail_table/<dates>/<type>')
def SUBSCRIPTION_DETAIL_TABLE(dates,type):
    mongo_uri = "mongodb://admin:" + urllib.parse.quote("A_dM!n|#!_2o20") + "@44.234.88.150:27017/"
    client = pymongo.MongoClient(mongo_uri)
    db = client.compass
    mydoc = db.subscription_master.aggregate([
    {"$match":{"$and":[{"USER_ID.USER_NAME":{"$not":{ "$regex":"Test",'$options':'i'}}},
        {"USER_ID.USER_NAME":{"$not":{ "$regex":"test",'$options':'i'}}},
            {"USER_ID.EMAIL_ID":{"$not":{ "$regex":"1gen",'$options':'i'}}},
            {"USER_ID.EMAIL_ID":{"$not":{ "$regex":"test",'$options':'i'}}},
            {"IS_PAYMENT_SUCCESS" : "Y"},
            {"LAST_PAYMENT_AMOUNT":{"$ne":0}}]
    }},
    {"$project":{"_id":1,"USER_ID":"$USER_ID._id","USER_NAME":"$USER_ID.USER_NAME","EMAIL_ID":"$USER_ID.EMAIL_ID","DEVICE_USED":"$USER_ID.DEVICE_USED","CREATED_DATE": { "$dateToString": { "format": "%Y-%m-%d", "date": "$USER_ID.CREATED_DATE"}},
    "MODE_OF_PAYMENT":"$MODE_OF_PAYMENT","Last_Payment_Date": { "$dateToString": { "format": "%Y-%m-%d", "date": "$LAST_PAYMENT_DATE"}},"Payment_Amount":"$LAST_PAYMENT_AMOUNT","CUSTOMER_CARD_ID":"$CUSTOMER_CARD_ID",
                 "APPLE_PAY_ID":"$APPLE_PAY_ID","GOOGLE_PAY_ID":"$GOOGLE_PAY_ID","PAYER_ID":"$PAYER_ID",
    "EXPIRATION_DATE": { "$dateToString": { "format": "%Y-%m-%d", "date": "$SUBSCRIPTION_EXPIRE_DATE"}}}}
    ,{"$unwind":"$Last_Payment_Date"}
    ])
    payment_df1= DataFrame(list(mydoc)).fillna("OTHERS")
    payment_df1["Transaction ID"]=payment_df1["CUSTOMER_CARD_ID"]+payment_df1["PAYER_ID"]+payment_df1["APPLE_PAY_ID"]+payment_df1["GOOGLE_PAY_ID"]
    spec_chars = ["OTHERS"]
    for char in spec_chars:
        payment_df1["Transaction ID"] = payment_df1["Transaction ID"].str.replace(char, '')
    payment_df1["Transaction ID"].replace('', np.nan, inplace=True)
    payment_df1["Transaction ID"].fillna(value="NO INFO",inplace=True)
    payment_df1= payment_df1[payment_df1['MODE_OF_PAYMENT']!='payLater']
    payment_df1= payment_df1[payment_df1['DEVICE_USED']!='OTHERS']
    payment_df1['DEVICE_USED'] = payment_df1['DEVICE_USED'].str.upper()
    payment_df1['DEVICE_USED'] = payment_df1['DEVICE_USED'].str.upper() 
    payment_df1['MODE_OF_PAYMENT'] = payment_df1['MODE_OF_PAYMENT'].str.upper()
    payment_df1['DEVICE_USED'] = payment_df1['DEVICE_USED'].str.upper()
    payment_df1['MODE_OF_PAYMENT'] = payment_df1['MODE_OF_PAYMENT'].str.replace("POMOCODE", "PROMOCODE")
    payment_df1['MODE_OF_PAYMENT'] = payment_df1['MODE_OF_PAYMENT'].str.replace("SQUAREPAYMENT", "SQUARE PAYMENT")
    payment_df1['MODE_OF_PAYMENT'] = payment_df1['MODE_OF_PAYMENT'].str.replace("INVITED_USER", "INVITED USER")
    payment_df1['MODE_OF_PAYMENT'] = payment_df1['MODE_OF_PAYMENT'].str.replace("INVITEDUSER", "INVITED USER")
    payment_df1['Last_Payment_Date'] =  pd.to_datetime(payment_df1['Last_Payment_Date'])
    today = date.today()
    d1 = today.strftime("%Y-%m-%d")
    d1 =  pd.to_datetime(d1)
    d2=d1.strftime("%Y-%m-%d")
    date1=dates
    if date1=="All" and type=="All":
        date3="2017-01-01"
        newdf1=payment_df1[(payment_df1.Last_Payment_Date <= d2)]
        temp=newdf1[["MODE_OF_PAYMENT","Last_Payment_Date","Payment_Amount","Transaction ID","USER_NAME","EMAIL_ID","CREATED_DATE","EXPIRATION_DATE","_id","USER_ID"]].astype(str)
        return json.dumps(temp.values.tolist())
    elif date1=="30"and type=="All":
        date2=d1- timedelta(days=30)
        date3=date2.strftime("%Y-%m-%d")
        newdf1=payment_df1[(payment_df1.Last_Payment_Date >= date3) & (payment_df1.Last_Payment_Date <= d2)]
        temp=newdf1[["MODE_OF_PAYMENT","Last_Payment_Date","Payment_Amount","Transaction ID","USER_NAME","EMAIL_ID","CREATED_DATE","EXPIRATION_DATE","_id","USER_ID"]].astype(str)
        return json.dumps(temp.values.tolist())
    elif date1=="60" and type=="All":
        date2=d1- timedelta(days=60)
        date3=date2.strftime("%Y-%m-%d")
        newdf1=payment_df1[(payment_df1.Last_Payment_Date >= date3) & (payment_df1.Last_Payment_Date <= d2)]
        temp=newdf1[["MODE_OF_PAYMENT","Last_Payment_Date","Payment_Amount","Transaction ID","USER_NAME","EMAIL_ID","CREATED_DATE","EXPIRATION_DATE","_id","USER_ID"]].astype(str)
        return json.dumps(temp.values.tolist())
    elif date1=="90" and type=="All":
        date2=d1- timedelta(days=90)
        date3=date2.strftime("%Y-%m-%d")
        newdf1=payment_df1[(payment_df1.Last_Payment_Date >= date3) & (payment_df1.Last_Payment_Date <= d2)]
        temp=newdf1[["MODE_OF_PAYMENT","Last_Payment_Date","Payment_Amount","Transaction ID","USER_NAME","EMAIL_ID","CREATED_DATE","EXPIRATION_DATE","_id","USER_ID"]].astype(str)
        return json.dumps(temp.values.tolist())
    elif date1=="All":
        date3="2017-01-01"
        newdf1=payment_df1[(payment_df1.Last_Payment_Date >= date3) & (payment_df1.Last_Payment_Date <= d2)& (payment_df1.MODE_OF_PAYMENT == type)]
        temp=newdf1[["MODE_OF_PAYMENT","Last_Payment_Date","Payment_Amount","Transaction ID","USER_NAME","EMAIL_ID","CREATED_DATE","EXPIRATION_DATE","_id","USER_ID"]].astype(str)
        return json.dumps(temp.values.tolist())
    elif date1=="30":
        date2=d1- timedelta(days=30)
        date3=date2.strftime("%Y-%m-%d")
        newdf1=payment_df1[(payment_df1.Last_Payment_Date >= date3) & (payment_df1.Last_Payment_Date <= d2)& (payment_df1.MODE_OF_PAYMENT == type)]
        temp=newdf1[["MODE_OF_PAYMENT","Last_Payment_Date","Payment_Amount","Transaction ID","USER_NAME","EMAIL_ID","CREATED_DATE","EXPIRATION_DATE","_id","USER_ID"]].astype(str)
        return json.dumps(temp.values.tolist())
    elif date1=="60":
        date2=d1- timedelta(days=60)
        date3=date2.strftime("%Y-%m-%d")
        newdf1=payment_df1[(payment_df1.Last_Payment_Date >= date3) & (payment_df1.Last_Payment_Date <= d2)& (payment_df1.MODE_OF_PAYMENT == type)]
        temp=newdf1[["MODE_OF_PAYMENT","Last_Payment_Date","Payment_Amount","Transaction ID","USER_NAME","EMAIL_ID","CREATED_DATE","EXPIRATION_DATE","_id","USER_ID"]].astype(str)
        return json.dumps(temp.values.tolist())
    elif date1=="90":
        date2=d1- timedelta(days=90)
        date3=date2.strftime("%Y-%m-%d")
        newdf1=payment_df1[(payment_df1.Last_Payment_Date >= date3) & (payment_df1.Last_Payment_Date <= d2)& (payment_df1.MODE_OF_PAYMENT == type)]
        temp=newdf1[["MODE_OF_PAYMENT","Last_Payment_Date","Payment_Amount","Transaction ID","USER_NAME","EMAIL_ID","CREATED_DATE","EXPIRATION_DATE","_id","USER_ID"]].astype(str)
        return json.dumps(temp.values.tolist())

@app.route('/Tran_detail_table/<dates>/<type>')
def TRANSACTION_DETAIL_TABLE(dates,type):
    mongo_uri = "mongodb://admin:" + urllib.parse.quote("I#L@teST^m0NGO_2o20!") + "@34.214.24.229:27017/"
    client = pymongo.MongoClient(mongo_uri)
    db = client.compass
    dfdb = DataFrame(list(db.subscription_master.aggregate([
        {"$match":{
            "USER_ID.IS_BLOCKED" :{"$ne": "Y"},
            "USER_ID.IS_DISABLED" :{"$ne": "Y"},
            "USER_ID.INCOMPLETE_SIGNUP" : {"$ne": "Y"},
    #         "USER_ID.DEVICE_USED" : {'$regex' : 'Webapp', '$options' : 'i'},
            "MODE_OF_PAYMENT" :{'$regex' : 'later', '$options' : 'i'},
    #         "LAST_PAYMENT_AMOUNT" :{'$gt' :100},
            "$and":[
            {"USER_ID.EMAIL_ID" :{"$not": {'$regex' : 'test', '$options' : 'i'}}},
            {"USER_ID.EMAIL_ID" :{"$not": {'$regex' : '1gen', '$options' : 'i'}}},
            {"USER_ID.USER_NAME" :{"$not": {'$regex' : 'test', '$options' : 'i'}}},
                {"USER_ID.USER_NAME" :{"$not": {'$regex' : '1gen', '$options' : 'i'}}}
            ]}},
        {"$project":{"_id":1,"USER_ID":"$USER_ID._id","EMAIL_ID":"$USER_ID.EMAIL_ID","NAME":"$USER_ID.USER_NAME","CREATED_DATE": { "$dateToString": { "format": "%Y-%m-%d", "date": "$USER_ID.CREATED_DATE"}},
            "SUBSCRIPTION_EXPIRE_DATE" : { "$dateToString": { "format": "%Y-%m-%d", "date": "$SUBSCRIPTION_EXPIRE_DATE" } },
            "MODE_OF_PAYMENT" :1,"LAST_PAYMENT_AMOUNT":1,"Last_Payment_Date": { "$dateToString": { "format": "%Y-%m-%d", "date": "$LAST_PAYMENT_DATE"}}}},
        ]))).fillna("NO INFO")
    payment_df1= dfdb[["MODE_OF_PAYMENT","Last_Payment_Date","LAST_PAYMENT_AMOUNT","NAME","EMAIL_ID","CREATED_DATE","SUBSCRIPTION_EXPIRE_DATE","_id","USER_ID"]]
    today = date.today()
    d1 = today.strftime("%Y-%m-%d")
    d1 =  pd.to_datetime(d1)
    d2=d1.strftime("%Y-%m-%d")
    date1=dates
    if date1=="All" and type=="All":
        date3="2017-01-01"
        newdf1=payment_df1[(payment_df1.Last_Payment_Date <= d2)]
        temp=newdf1[["MODE_OF_PAYMENT","Last_Payment_Date","LAST_PAYMENT_AMOUNT","NAME","EMAIL_ID","CREATED_DATE","SUBSCRIPTION_EXPIRE_DATE","_id","USER_ID"]].astype(str)
        return json.dumps(temp.values.tolist())
    elif date1=="30"and type=="All":
        date2=d1- timedelta(days=30)
        date3=date2.strftime("%Y-%m-%d")
        newdf1=payment_df1[(payment_df1.Last_Payment_Date >= date3) & (payment_df1.Last_Payment_Date <= d2)]
        temp=newdf1[["MODE_OF_PAYMENT","Last_Payment_Date","LAST_PAYMENT_AMOUNT","NAME","EMAIL_ID","CREATED_DATE","SUBSCRIPTION_EXPIRE_DATE","_id","USER_ID"]].astype(str)
        return json.dumps(temp.values.tolist())
    elif date1=="60" and type=="All":
        date2=d1- timedelta(days=60)
        date3=date2.strftime("%Y-%m-%d")
        newdf1=payment_df1[(payment_df1.Last_Payment_Date >= date3) & (payment_df1.Last_Payment_Date <= d2)]
        temp=newdf1[["MODE_OF_PAYMENT","Last_Payment_Date","LAST_PAYMENT_AMOUNT","NAME","EMAIL_ID","CREATED_DATE","SUBSCRIPTION_EXPIRE_DATE","_id","USER_ID"]].astype(str)
        return json.dumps(temp.values.tolist())
    elif date1=="90" and type=="All":
        date2=d1- timedelta(days=90)
        date3=date2.strftime("%Y-%m-%d")
        newdf1=payment_df1[(payment_df1.Last_Payment_Date >= date3) & (payment_df1.Last_Payment_Date <= d2)]
        temp=newdf1[["MODE_OF_PAYMENT","Last_Payment_Date","LAST_PAYMENT_AMOUNT","NAME","EMAIL_ID","CREATED_DATE","SUBSCRIPTION_EXPIRE_DATE","_id","USER_ID"]].astype(str)
        return json.dumps(temp.values.tolist())
    elif date1=="All":
        date3="2017-01-01"
        newdf1=payment_df1[(payment_df1.Last_Payment_Date >= date3) & (payment_df1.Last_Payment_Date <= d2)& (payment_df1.MODE_OF_PAYMENT == type)]
        temp=newdf1[["MODE_OF_PAYMENT","Last_Payment_Date","LAST_PAYMENT_AMOUNT","NAME","EMAIL_ID","CREATED_DATE","SUBSCRIPTION_EXPIRE_DATE","_id","USER_ID"]].astype(str)
        return json.dumps(temp.values.tolist())
    elif date1=="30":
        date2=d1- timedelta(days=30)
        date3=date2.strftime("%Y-%m-%d")
        newdf1=payment_df1[(payment_df1.Last_Payment_Date >= date3) & (payment_df1.Last_Payment_Date <= d2)& (payment_df1.MODE_OF_PAYMENT == type)]
        temp=newdf1[["MODE_OF_PAYMENT","Last_Payment_Date","LAST_PAYMENT_AMOUNT","NAME","EMAIL_ID","CREATED_DATE","SUBSCRIPTION_EXPIRE_DATE","_id","USER_ID"]].astype(str)
        return json.dumps(temp.values.tolist())
    elif date1=="60":
        date2=d1- timedelta(days=60)
        date3=date2.strftime("%Y-%m-%d")
        newdf1=payment_df1[(payment_df1.Last_Payment_Date >= date3) & (payment_df1.Last_Payment_Date <= d2)& (payment_df1.MODE_OF_PAYMENT == type)]
        temp=newdf1[["MODE_OF_PAYMENT","Last_Payment_Date","LAST_PAYMENT_AMOUNT","NAME","EMAIL_ID","CREATED_DATE","SUBSCRIPTION_EXPIRE_DATE","_id","USER_ID"]].astype(str)
        return json.dumps(temp.values.tolist())
    elif date1=="90":
        date2=d1- timedelta(days=90)
        date3=date2.strftime("%Y-%m-%d")
        newdf1=payment_df1[(payment_df1.Last_Payment_Date >= date3) & (payment_df1.Last_Payment_Date <= d2)& (payment_df1.MODE_OF_PAYMENT == type)]
        temp=newdf1[["MODE_OF_PAYMENT","Last_Payment_Date","LAST_PAYMENT_AMOUNT","NAME","EMAIL_ID","CREATED_DATE","SUBSCRIPTION_EXPIRE_DATE","_id","USER_ID"]].astype(str)
        return json.dumps(temp.values.tolist())

@app.route('/Don_detail_table/<dates>/<type>')
def DONATION_DETAIL_TABLE(dates,type):
    mongo_uri = "mongodb://admin:" + urllib.parse.quote("I#L@teST^m0NGO_2o20!") + "@34.214.24.229:27017/"
    client = pymongo.MongoClient(mongo_uri)
    db = client.compass
    payment_df1 = DataFrame(list(db.campaign_payment.aggregate([
        {"$match":{
            "USER_ID.IS_BLOCKED" :{"$ne": "Y"},
            "USER_ID.IS_DISABLED" :{"$ne": "Y"},
            "USER_ID.INCOMPLETE_SIGNUP" : {"$ne": "Y"},
            "IS_PAYMENT_COMPLETED" : "Y",
            "$and":[
            {"USER_ID.EMAIL_ID" :{"$not": {'$regex' : 'test', '$options' : 'i'}}},
            {"USER_ID.EMAIL_ID" :{"$not": {'$regex' : '1gen', '$options' : 'i'}}},
            {"USER_ID.USER_NAME" :{"$not": {'$regex' : 'test', '$options' : 'i'}}},
                {"USER_ID.USER_NAME" :{"$not": {'$regex' : '1gen', '$options' : 'i'}}}
            ]}},
        {"$project":{"_id":1,"USER_ID":"$CONTRIBUTION_ID._id","EMAIL_ID":"$CONTRIBUTION_ID.EMAIL","NAME":"$CONTRIBUTION_ID.FIRST_NAME"
                     ,"SQUARE":"$SQUARE_TRX_ID",
                     "APPLE":"$APPLE_TRX_ID","GOOGLE":"$GOOGLE_TRX_ID","PAYPAL":"$PAYPAL_TRX_ID",
            "MODE_OF_PAYMENT" :"$PAYMENT_TYPE","Payment_Amount":"$CONTRIBUTION_ID.AMOUNT","Last_Payment_Date": { "$dateToString": { "format": "%Y-%m-%d", "date": "$CREATED_DATE"}}}},
        ]))).fillna("NO INFO")
    if 'APPLE' not in payment_df1.columns:
        payment_df1["APPLE"]="NO INFO"
    if 'GOOGLE' not in payment_df1.columns:
        payment_df1["GOOGLE"]="NO INFO"


    payment_df1['MODE_OF_PAYMENT'] = payment_df1['MODE_OF_PAYMENT'].str.upper()
    payment_df1['MODE_OF_PAYMENT'] = payment_df1['MODE_OF_PAYMENT'].str.replace("SQUAREPAYMENT", "SQUARE PAYMENT")
    payment_df1["Transaction ID"]=payment_df1["SQUARE"]+payment_df1["APPLE"]+payment_df1["GOOGLE"]+payment_df1["PAYPAL"]
    spec_chars = ["NO INFO"]
    for char in spec_chars:
        payment_df1["Transaction ID"] = payment_df1["Transaction ID"].str.replace(char, '')
    payment_df1["Transaction ID"].replace('', np.nan, inplace=True)
    payment_df1["Transaction ID"].fillna(value="NO INFO",inplace=True)
    today = date.today()
    d1 = today.strftime("%Y-%m-%d")
    d1 =  pd.to_datetime(d1)
    d2=d1.strftime("%Y-%m-%d")
    date1=dates
    if date1=="All" and type=="All":
        date3="2017-01-01"
        newdf1=payment_df1[(payment_df1.Last_Payment_Date <= d2)]
        temp=newdf1[["MODE_OF_PAYMENT","Last_Payment_Date","Payment_Amount","Transaction ID","NAME","EMAIL_ID","_id","USER_ID"]].astype(str)
        return json.dumps(temp.values.tolist())
    elif date1=="30"and type=="All":
        date2=d1- timedelta(days=30)
        date3=date2.strftime("%Y-%m-%d")
        newdf1=payment_df1[(payment_df1.Last_Payment_Date >= date3) & (payment_df1.Last_Payment_Date <= d2)]
        temp=newdf1[["MODE_OF_PAYMENT","Last_Payment_Date","Payment_Amount","Transaction ID","NAME","EMAIL_ID","_id","USER_ID"]].astype(str)
        return json.dumps(temp.values.tolist())
    elif date1=="60" and type=="All":
        date2=d1- timedelta(days=60)
        date3=date2.strftime("%Y-%m-%d")
        newdf1=payment_df1[(payment_df1.Last_Payment_Date >= date3) & (payment_df1.Last_Payment_Date <= d2)]
        temp=newdf1[["MODE_OF_PAYMENT","Last_Payment_Date","Payment_Amount","Transaction ID","NAME","EMAIL_ID","_id","USER_ID"]].astype(str)
        return json.dumps(temp.values.tolist())
    elif date1=="90" and type=="All":
        date2=d1- timedelta(days=90)
        date3=date2.strftime("%Y-%m-%d")
        newdf1=payment_df1[(payment_df1.Last_Payment_Date >= date3) & (payment_df1.Last_Payment_Date <= d2)]
        temp=newdf1[["MODE_OF_PAYMENT","Last_Payment_Date","Payment_Amount","Transaction ID","NAME","EMAIL_ID","_id","USER_ID"]].astype(str)
        return json.dumps(temp.values.tolist())
    elif date1=="All":
        date3="2017-01-01"
        newdf1=payment_df1[(payment_df1.Last_Payment_Date >= date3) & (payment_df1.Last_Payment_Date <= d2)& (payment_df1.MODE_OF_PAYMENT == type)]
        temp=newdf1[["MODE_OF_PAYMENT","Last_Payment_Date","Payment_Amount","Transaction ID","NAME","EMAIL_ID","_id","USER_ID"]].astype(str)
        return json.dumps(temp.values.tolist())
    elif date1=="30":
        date2=d1- timedelta(days=30)
        date3=date2.strftime("%Y-%m-%d")
        newdf1=payment_df1[(payment_df1.Last_Payment_Date >= date3) & (payment_df1.Last_Payment_Date <= d2)& (payment_df1.MODE_OF_PAYMENT == type)]
        temp=newdf1[["MODE_OF_PAYMENT","Last_Payment_Date","Payment_Amount","Transaction ID","NAME","EMAIL_ID","_id","USER_ID"]].astype(str)
        return json.dumps(temp.values.tolist())
    elif date1=="60":
        date2=d1- timedelta(days=60)
        date3=date2.strftime("%Y-%m-%d")
        newdf1=payment_df1[(payment_df1.Last_Payment_Date >= date3) & (payment_df1.Last_Payment_Date <= d2)& (payment_df1.MODE_OF_PAYMENT == type)]
        temp=newdf1[["MODE_OF_PAYMENT","Last_Payment_Date","Payment_Amount","Transaction ID","NAME","EMAIL_ID","_id","USER_ID"]].astype(str)
        return json.dumps(temp.values.tolist())
    elif date1=="90":
        date2=d1- timedelta(days=90)
        date3=date2.strftime("%Y-%m-%d")
        newdf1=payment_df1[(payment_df1.Last_Payment_Date >= date3) & (payment_df1.Last_Payment_Date <= d2)& (payment_df1.MODE_OF_PAYMENT == type)]
        temp=newdf1[["MODE_OF_PAYMENT","Last_Payment_Date","Payment_Amount","Transaction ID","NAME","EMAIL_ID","_id","USER_ID"]].astype(str)
        return json.dumps(temp.values.tolist())

@app.route('/School_Search')
def Practice_streak():
    return render_template('School_Search.html')

if __name__ == '__main__':
   app.run()







