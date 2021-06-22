import pymongo
import calendar
from pymongo import MongoClient
from pprint import pprint
import urllib.parse
from sort_dataframeby_monthorweek import*
import pandas as pd
import numpy as np
from pandas import DataFrame
from bson.objectid import ObjectId
import datetime
import json
from flask import Flask,json
from flask_cors import CORS
app = Flask(__name__)
CORS(app)
@app.route('/pfeedbackcards')
def familyfeedbackcards():
    username = urllib.parse.quote_plus('admin')
    password = urllib.parse.quote_plus('A_dM!n|#!_2o20')
    client = MongoClient("mongodb://%s:%s@44.234.36.103:27017/" % (username, password))
    db=client.compass
    collection = db.audio_track_master
    collection2=db.audio_feedback
    query=[{"$match":{'USER_ID.ROLE_ID.ROLE_ID':3,
         'USER_ID.USER_NAME':{"$not":{"$regex":"/test/i"}},
        'USER_ID.USER_ID.EMAIL_ID':{"$not":{"$regex":"/test/i"}},
        'USER_ID.EMAIL_ID':{"$not":{"$regex":"/1gen/i"}},
          'USER_ID.IS_BLOCKED':{"$ne":'Y'},
          'USER_ID.INCOMPLETE_SIGNUP':{"$ne":'Y'},
          'USER_ID.IS_DISABLED':{"$ne":'Y'},
        'USER_ID.EMAIL_ID':{'$ne':None},

          "USER_ID.CREATED_DATE":{"$gt": datetime.datetime(2020,3,17)}
            }},
         {"$project":{"_id":0, "USER_ID":'$USER_ID.USER_ID','MODIFIED_DATE':1}}]
    query2=[
     {"$match":{'USER.ROLE_ID.ROLE_ID' :3,                  
                         "USER.IS_DISTABLED":{"$ne":"Y"},
                         "USER.INCOMPLETE_SIGNUP":{"$ne":"Y"},
                         "USER.EMAIL_ID":{"$not":{"$regex" : 'test/i'}},
                         "USER.EMAIL_ID":{"$ne": None},
                         "USER.EMAIL_ID":{"$not":{"$regex" : '1gen/i'}},
                         "RATING":{'$ne':0},
                         "USER.USER_NAME":{"$not":{"$regex" : 'test/i'}},
                         "USER.CREATED_DATE":{"$gt": datetime.datetime(2020,3,17)}}},
            {"$project":{'RATING':1,'COMMENT':1,'USER_ID':'$USER.USER','USER_NAME':'$USER.USER_NAME','EMAIL':'$USER.EMAIL_ID'}}]
    practice=list(collection.aggregate(query))
    practice_df=pd.DataFrame(practice)
    feedback=list(collection2.aggregate(query2))
    feedback_df=pd.DataFrame(feedback)
    card_df=pd.DataFrame({'Feedback_Percentage':(len(feedback_df[feedback_df['RATING']!=0])/len(practice_df))*100,
                 'Comment_per_feedback':len(feedback_df[(feedback_df['COMMENT'].notnull()) & (feedback_df['COMMENT']!='') ])/
                 len(feedback_df[feedback_df['RATING']!=0])*100,
                  'Total_Playbacks':len(practice_df),'Average_Rating':feedback_df[feedback_df['RATING']!=0]['RATING'].mean()},
                  index=[0])
    data=[]
    for i,j in zip(card_df.columns.tolist(),card_df.iloc[0].tolist()):
        data.append([i,j])
    temp={"data":data}
    return json.dumps(temp)
    #print(temp)

@app.route('/familyfeedback')
def feedback():
#     import calendar
#     import pymongo
#     from pymongo import MongoClient
#     from pprint import pprint
#     import urllib.parse
#     import pandas as pd
#     from sort_dataframeby_monthorweek import*
#     import numpy as np
#     from pandas import DataFrame
#     from bson.objectid import ObjectId
#     import datetime

    username = urllib.parse.quote_plus('admin')
    password = urllib.parse.quote_plus('A_dM!n|#!_2o20')
    client = MongoClient("mongodb://%s:%s@44.234.36.103:27017/" % (username, password))
    db=client.compass
    collection = db.audio_feedback
    df = DataFrame(list(collection.aggregate([
    {"$match":{
         'USER.ROLE_ID.ROLE_ID' :3,
        "USER.IS_DISTABLED":{"$ne":"Y"},
         "USER.INCOMPLETE_SIGNUP":{"$ne":"Y"},
        "USER.EMAIL_ID":{"$not":{"$regex" : 'test'}},
        "USER.EMAIL_ID":{"$not":{"$regex" : '1gen'}},
       "USER.EMAIL_ID":{"$ne": None},

        "USER.USER_NAME":{"$not":{"$regex" : 'test'}},
        'RATING':{'$ne':0},
        "USER.CREATED_DATE":{"$gt": datetime.datetime(2020,3,17)}
     }},
    {'$group':{'_id':{'$month':'$MODIFIED_DATE'}, 'count':{'$sum':'$USER._id'},
    'rating_5':{'$sum':{'$cond':[{'$eq':['$RATING', 5]},1,0]}},
    'rating_4':{'$sum':{'$cond':[{'$eq':['$RATING', 4]},1,0]}},
    'rating_3':{'$sum':{'$cond':[{'$eq':['$RATING', 3]},1,0]}},
    'rating_2':{'$sum':{'$cond':[{'$eq':['$RATING', 2]},1,0]}},
    'rating_1':{'$sum':{'$cond':[{'$eq':['$RATING', 1]},1,0]}}
    }},
    {'$project':{'_id':1, 'rating_5':'$rating_5','rating_4':'$rating_4', 'rating_3':'$rating_3', 'rating_2':'$rating_2','rating_1':'$rating_1' }}
    ])))

    df.rename(columns = { '_id': 'Month'}, inplace = True)

    d = dict(enumerate(calendar.month_abbr))    # to convert monthnumber of dataframe into monthname
    df['Month'] = df['Month'].map(d)


    df1=Sort_Dataframeby_MonthandNumeric_cols(df = df, monthcolumn='Month',numericcolumn='rating_5')

    df1['Month'] = df1['Month'].astype(str).str[:3]
    # df2f=df1.rename(columns={"_id": "Month"})
    Month= ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec']
    df2t = pd.DataFrame(Month,columns =['Month'])

    df2 = pd.merge(df2t, df1, on="Month", how='left').fillna(0)

    df3=df2.agg({'rating_5': 'sum', 'rating_4': 'sum','rating_3': 'sum','rating_2': 'sum','rating_1': 'sum'})

    df4 = pd.DataFrame()
    df5=df4.append(df3, ignore_index = True) 

    df6=df5[['rating_5','rating_4','rating_3','rating_2','rating_1']] #arranging rating5 to rating1

    df7=df2[['Month','rating_1']]

    df8=df2[['Month','rating_2']]
    df9=df2[['Month','rating_3']]
    df10=df2[['Month','rating_4']]
    df11=df2[['Month','rating_5']]

    D_1= df7.values.tolist()
    D_2= df8.values.tolist()
    D_3= df9.values.tolist()
    D_4= df10.values.tolist()
    D_5= df11.values.tolist()
    links = df6.rename(columns={'rating_5' : '5S', 'rating_4' : '4S','rating_3' : '3S', 'rating_2' : '2S', 'rating_1' : '1S'}).to_dict('r')
    temp={'Total':links,'D5':D_5,'D4':D_4,'D3':D_3,'D2':D_2,'D1':D_1}
    return json.dumps(temp)
#     print(temp)




if __name__ == '__main__':
    app.run(host='172.31.0.77',port=5005)
