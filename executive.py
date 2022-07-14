
from dependency import *




def executive_count_productwise_refresh():
    collection1 = db.school_master
    qr=[
    {"$match":{"$and":[
    {'CATEGORY':{"$regex":'LAUSD','$options':'i'}},
     {'_id':{'$in':db.user_master.distinct('schoolId._id',{'schoolId._id':{'$exists':1}})}
                    }]}},
    {"$project":{"_id":1}},]
    merge1=list(collection1.aggregate(qr))
    dfum1=pd.DataFrame(merge1)
    
    qr2=[
    {"$match":{"$and":[
    {'CATEGORY':{"$regex":'LAUSD','$options':'i'}},
     ]}},
    {"$project":{"_id":1}},]
    merge11=list(collection1.aggregate(qr2))
    lausd=pd.DataFrame(merge11)
    comadd=len(lausd)-len(dfum1)
    print(comadd)
    
    
    collection2 = db.user_master
    qr=[
    {"$match":{"$and":testcommon_cond()['usermaster_cond']+[
    {'schoolId._id':{'$exists':1}}]
    }},

    {"$project":{"_id":0,
    'UMUSER_ID':'$_id',
    "UMEMAIL":'$EMAIL_ID',        
    "UMSCHOOL":'$schoolId._id',
    }},]
    merge1=list(collection2.aggregate(qr))
    overallum=pd.DataFrame(merge1)
    umem=list(overallum["UMUSER_ID"])

    ################################sub_master################################
 
    collection = db.subscription_master
    qr=[
    {"$match":{"$and":[{'USER_ID._id':{"$in":umem}},]
    }},
    {"$project":{"_id":0,
    'SMUSER_ID':'$USER_ID._id',
    "SMEMAIL":'$USER_ID.EMAIL_ID',        
    "SMSCHOOL":'$USER_ID.schoolId._id',
    "PLANID":"$PLAN_ID.PLAN_NAME",
     "comment":"$COMMENT_BY_DS_TEAM",
    }},
    ]
    merge=list(collection.aggregate(qr))
    overall=pd.DataFrame(merge)
#     mergeddf=pd.merge(overall, overallum, how='left', left_on='SMEMAIL', right_on='UMEMAIL')
    mergeddf=pd.merge(overallum, overall, how='left', left_on='UMUSER_ID', right_on='SMUSER_ID')
    mergeddf.to_csv("checkpoint.csv")
    cloud=mergeddf[mergeddf["PLANID"]=="Cloud"]
    cloud1=list(set(list(cloud["UMSCHOOL"])))
    lifetime=cloud[cloud["comment"]=="CONVERTED TO ACTUAL LIFETIME ON 30TH OCT CLEANUP"]
    lifetime1=list(set(list(lifetime["UMSCHOOL"])))
    final_lifetime_count=len(lifetime1)               #lifetime count
    final_cloud = np.setdiff1d(cloud1,lifetime1)
    final_cloud_count=len(final_cloud)                   #cloud count
    com=mergeddf[mergeddf["PLANID"]=="Community"]
    com1=list(set(list(com["UMSCHOOL"])))
    final_com = np.setdiff1d(com1,cloud1)
#     final_comm=pd.concat(final_com,)
    final_com_count=len(final_com)+comadd                #community count
    exp=mergeddf[mergeddf["PLANID"]=="Explorer"]
    exp1=list(set(list(exp["UMSCHOOL"])))
    final_exp1 = np.setdiff1d(exp1,cloud1)
    final_exp2 = np.setdiff1d(final_exp1,final_com)
    final_exp_count=len(final_exp2)                       #explorer count
    #IE School App
    sch=mergeddf[mergeddf["PLANID"]=="IE School App"]
    sch1=list(set(list(sch["UMSCHOOL"])))
    final_sch1 = np.setdiff1d(sch1,cloud1)
    final_sch2 = np.setdiff1d(final_sch1,final_com)
    final_sch3 = np.setdiff1d(final_sch2,final_exp2)
    final_sch_count=len(final_sch3)                      #school app count
    #IE Home App
    home=mergeddf[mergeddf["PLANID"]=="IE Home App"]
    home1=list(set(list(home["UMSCHOOL"])))
    final_home1 = np.setdiff1d(home1,cloud1)
    final_home2 = np.setdiff1d(final_home1,final_com)
    final_home3 = np.setdiff1d(final_home2,final_exp2)
    final_home4 = np.setdiff1d(final_home3,final_sch3)
    final_home_count=len(final_home4)                     #home app count
    tot_sch=set(list(mergeddf["UMSCHOOL"]))
    tot_sch2=final_home_count+final_sch_count+final_exp_count+final_com_count+final_cloud_count+final_lifetime_count
    execount={"totalschool":str(tot_sch2),"clound":str(final_cloud_count),"lifetime":str(final_lifetime_count),"community":str(final_com_count),"explorer":str(final_exp_count),
    "schoolapp":str(final_sch_count),"homeapp":str(final_home_count)}

    
    #################. FOR TABLE PURPOSE ########################
    DFL=pd.DataFrame(lifetime1)
    DFL.to_csv("lifetime_exec1.csv")
    DFC=pd.DataFrame(final_cloud)
    DFC.to_csv("cloud_exec1.csv")
    DFE=pd.DataFrame(final_exp2)
    DFE.to_csv("exp_exec1.csv")
    DFcco=pd.DataFrame(final_com)
    DFcco.to_csv("com_exec1.csv")
    DFsch=pd.DataFrame(final_sch3)
    DFsch.to_csv("sch_exec1.csv")
    DFhom=pd.DataFrame(final_home4)
    DFhom.to_csv("hom_exec1.csv")
    client = MongoClient('mongodb://admin:test!_2o20@52.37.152.224:27017/')
    import timeago, datetime
    now = datetime.datetime.now()# + datetime.timedelta(seconds = 60 * 3.4)
    x=now.strftime("%Y-%m-%d %H:%M:%S")
    update_date={"date":x}
    execount["update_date"]=update_date['date']
    
    mydb = client["compass"]
    mycol = mydb["cap_pipeline"]
    
    myquery = {"dashboard":"executive"}
    newvalues = { "$set": { "executive_count_productwise_refresh":execount} }

    mycol.update_one(myquery, newvalues)
    
    
    
    
    return json.dumps({"success":"ok","updated":"true"})





def executive_count_productwise():
    client_test = MongoClient('mongodb://admin:test!_2o20@52.37.152.224:27017/')
    db_test=client_test.compass
#     db_test.cap_pipeline('schoolId._id',{'$and':testcommon_cond()['usermaster_cond']+    
#     [{ "schoolId._id":{'$exists': True}}]})
    
    data=list(db_test.cap_pipeline.aggregate([
    {"$match":
     {'$and':[
            {'dashboard':"executive"},
                      ]}},
    {'$project':{'_id':0, 'executive_count_productwise_refresh':1}}

    ]))
    now = datetime.datetime.now() + datetime.timedelta(seconds = 60 * 3.4)
    x=now.strftime("%Y-%m-%d %H:%M:%S")
    print(x)
    
    dd=timeago.format(data[0]['executive_count_productwise_refresh']['update_date'],x)
    data[0]['executive_count_productwise_refresh']['update']="Updated "+dd
    return json.dumps(data[0]['executive_count_productwise_refresh'])
    

def excecutivecount_refresh():
    school_um=db.user_master.distinct('schoolId._id',{'$and':testcommon_cond()['usermaster_cond']+    
    [{ "schoolId._id":{'$exists': True}}]})

    total_school=len(set(school_um+db.school_master.distinct('_id',{'CATEGORY':{'$regex':'LAUSD','$options':'i'}})))


    users=db.user_master.distinct('_id',{'$and':testcommon_cond()['usermaster_cond']})

    Total_user=len(users)


    Total_classroom=Total_user+total_school

    # print(Total_classroom)
    df_cap=pd.DataFrame(list(db.school_master.aggregate([{"$group":{"_id":"$CAP_PROGRAM","TOTAL_SCHOOLS":{"$sum":1}}},
    {"$project":{"_id":0,"CAP_PROGRAM":"$_id","SCHOOL_COUNT":"$TOTAL_SCHOOLS"}}])))
    data={"CAP_PROGRAM":['PRE-K','ELEMENTARY','MIDDLE','HIGH','OTHER'],"IE_REACH":[99,297,396,594,264]}
    df_students = pd.DataFrame(data)
    df_cap['STUDENTS_PER_CLASS'] = df_cap['CAP_PROGRAM'].map(df_students.set_index('CAP_PROGRAM')['IE_REACH'])
    df_cap['STUDENTS_PER_CLASS'].fillna(0,inplace=True)
    df_cap["TOTAL_STUDENTS"] = df_cap["SCHOOL_COUNT"]*df_cap["STUDENTS_PER_CLASS"]
    # df_cap
    total=df_cap["TOTAL_STUDENTS"].to_list()
    total1 = int(sum(total))

    Total_students=total1

    Never_logged_in=Total_user-len(db.login_logs.distinct('USER_ID._id',{'$and':[{'USER_ID._id':{'$in':users}}]}))

    practice_count=db.audio_track_master.find({
        'USER_ID._id':{'$in':users},'MODIFIED_DATE':{'$gte':csy_first_date()}                  
                        }).count()
    Total_mindful_minutes=int(practice_count*7.5)


    active_user_ever=db.audio_track_master.distinct('USER_ID._id',{'$and':[
        {'USER_ID._id':{'$in':users}}]})

    active_school=len(db.user_master.distinct('schoolId._id',{'_id':{'$in':active_user_ever}}))


    Teachers=len(db.user_master.distinct('_id',{'ROLE_ID._id':{'$ne':ObjectId("5f155b8a3b6800007900da2b")},
                                                           '_id':{'$in':users}}))


    Parents=len(db.user_master.distinct('_id',{'ROLE_ID._id':{'$eq':ObjectId("5f155b8a3b6800007900da2b")},
                                                           '_id':{'$in':users}}))

    df44 = DataFrame(list(db.audio_feedback.aggregate([
    {"$match":
     {'$and':[
            {'MODIFIED_DATE':{'$gte':csy_first_date()}},
            {'USER._id':{'$in':users}},
         {'RATING':{'$nin':[0]}}

                      ]

     }},
    {'$group':{'_id':{},'rating':{'$avg':'$RATING'}}},
    {'$project':{'_id':0, 'rating':'$rating'}}

    ])))

    avg_rating=df44['rating'][0]

    excecutivecount___temp={"total_school":str(total_school),
             "user_count":str(Total_user),
            "total_classrooms":str(Total_classroom),
              "total_students":str(Total_students),
              "mindful_minutes":str(Total_mindful_minutes),
              "active_school":str(active_school),
             "never_logged_in":str(Never_logged_in),
             "practice_count":str(practice_count),
             'Techers':str(Teachers),
              'avg_rating':str(round(avg_rating)),
              'Homeappusers':str(Parents)}
    
    
    client = MongoClient('mongodb://admin:test!_2o20@52.37.152.224:27017/')
    
    now = datetime.datetime.now() + datetime.timedelta(seconds = 60 * 3.4)
    x=now.strftime("%Y-%m-%d %H:%M:%S")
    update_date={"date":x}
    excecutivecount___temp["update_date"]=update_date['date']
    mydb = client["compass"]
    mycol = mydb["cap_pipeline"]
    
    myquery = {"dashboard":"executive"}
    newvalues = { "$set": { "excecutivecount_refresh":excecutivecount___temp} }

    mycol.update_one(myquery, newvalues)
    

    return json.dumps({"success":"True","Updated":"True"})



def excecutivecount___():
    client_test = MongoClient('mongodb://admin:test!_2o20@52.37.152.224:27017/')
    db_test=client_test.compass
#     db_test.cap_pipeline('schoolId._id',{'$and':testcommon_cond()['usermaster_cond']+    
#     [{ "schoolId._id":{'$exists': True}}]})
    
    data=list(db_test.cap_pipeline.aggregate([
    {"$match":
     {'$and':[
            {'dashboard':"executive"},
                      ]}},
    {'$project':{'_id':0, 'excecutivecount_refresh':1}}

    ]))
    now = datetime.datetime.now() + datetime.timedelta(seconds = 60 * 3.4)
    x=now.strftime("%Y-%m-%d %H:%M:%S")
    dd=timeago.format(data[0]['excecutivecount_refresh']['update_date'],x)
    data[0]['excecutivecount_refresh']['update']=dd
    return json.dumps(data[0]['excecutivecount_refresh'])

def practice_trendnew_(charttype):
    collection = db.audio_track_master
    from datetime import datetime
    charttype=str(charttype).title()
    if charttype=='Practice':
    #     threshold=int(threshold)/100
        threshold=.5    
        
        threshcond=[{'$match':{'Completion_Percentage':{'$gte':threshold}}}]
        df0 = DataFrame(list(collection.aggregate([
            {"$match":{
         '$and':
             testcommon_cond()['sub_master_cond']+[{"MODIFIED_DATE":{"$gte": LSYTOLSY_Date(),"$lt":LSY_Date()}}]
         }},
            practice_cond_dictonary_list[0],
            practice_cond_dictonary_list[1],
             threshcond[0],      

           {'$group':{'_id':{'$month':'$MODIFIED_DATE'},'pc':{'$sum':1}}},
           {'$project':{'_id':1,'TOTAL_LSYTOLSY':'$pc'}}])))
        df0.rename(columns = { '_id': 'Month'}, inplace = True)
        d = dict(enumerate(calendar.month_abbr))    # to convert monthnumber of dataframe into monthname
        print(df0)
        df0['Month'] = df0['Month'].map(d)


        df1 = DataFrame(list(collection.aggregate([
            {"$match":{
         '$and':testcommon_cond()['sub_master_cond']+[{"MODIFIED_DATE":{"$gte": LSY_Date(),"$lt":csy_first_date()}}]}},
            practice_cond_dictonary_list[0],
            practice_cond_dictonary_list[1],
             threshcond[0],      

           {'$group':{'_id':{'$month':'$MODIFIED_DATE'},'pc':{'$sum':1}}},
           {'$project':{'_id':1,'TOTAL_LSY':'$pc'}}])))
        df1.rename(columns = { '_id': 'Month'}, inplace = True)
        d = dict(enumerate(calendar.month_abbr))    # to convert monthnumber of dataframe into monthname
        df1['Month'] = df1['Month'].map(d)

        df2 = DataFrame(list(collection.aggregate([
            {"$match":{
         '$and':testcommon_cond()['sub_master_cond']+[{'USER_ID.ROLE_ID._id' :{'$ne':ObjectId("5f155b8a3b6800007900da2b")}},
                 {"USER_ID._id":{"$nin":db.user_master.distinct("_id",{"UTM_MEDIUM":{'$regex':'clever', '$options':'i'}})}},
                 {"USER_ID._id":{"$nin":db.user_master.distinct("_id",{"UTM_MEDIUM":{'$regex':'schoology', '$options':'i'}})}},
                {"USER_ID._id":{"$nin":db.user_master.distinct("_id",{"UTM_MEDIUM":{'$regex':'canvas', '$options':'i'}})}},
                {"USER_ID._id":{"$nin":db.user_master.distinct("_id",{"UTM_MEDIUM":{'$regex':'google', '$options':'i'}})}},
            {"MODIFIED_DATE":{"$gte": csy_first_date()}}]}},
            practice_cond_dictonary_list[0],
            practice_cond_dictonary_list[1],
             threshcond[0],
           {'$group':{'_id':{'$month':'$MODIFIED_DATE'},'pc':{'$sum':1}}},
           {'$project':{'_id':1,'teacher_CSY':'$pc'}}])))
        if df2.empty == True:
            df2=pd.DataFrame({'_id':[1,2,3,4,5,6,7,8,9,10,11,12],'parents_CSY':[0,0,0,0,0,0,0,0,0,0,0,0]})
        else:
            df2
        df2.rename(columns = { '_id': 'Month'}, inplace = True)
        d = dict(enumerate(calendar.month_abbr))    # to convert monthnumber of dataframe into monthname
        df2['Month'] = df2['Month'].map(d)

        practice_left= pd.merge(df1, df2,on='Month', how='outer')
        practice_left=practice_left.fillna(0)    

        dfschoology = DataFrame(list(collection.aggregate([
            {"$match":{
         '$and':testcommon_cond()['sub_master_cond']+[{"USER_ID._id":{"$nin":db.user_master.distinct("_id",{"UTM_MEDIUM":{'$regex':'clever', '$options':'i'}})}},
                 {"USER_ID._id":{"$in":db.user_master.distinct("_id",{"UTM_MEDIUM":{'$regex':'schoology', '$options':'i'}})}},
            {"MODIFIED_DATE":{"$gte": csy_first_date()}}]}},
            practice_cond_dictonary_list[0],
            practice_cond_dictonary_list[1],
             threshcond[0],
           {'$group':{'_id':{'$month':'$MODIFIED_DATE'},'pc':{'$sum':1}}},
           {'$project':{'_id':1,'schoology_CSY':'$pc'}}])))

        if dfschoology.empty == True:
            dfschoology=pd.DataFrame({'_id':[1,2,3,4,5,6,7,8,9,10,11,12],'schoology_CSY':[0,0,0,0,0,0,0,0,0,0,0,0]})
        else:
            dfschoology
        dfschoology.rename(columns = { '_id': 'Month'}, inplace = True)
        d = dict(enumerate(calendar.month_abbr))    # to convert monthnumber of dataframe into monthname
        dfschoology['Month'] = dfschoology['Month'].map(d)
        dfschoology=dfschoology.fillna(0)


        dfclever = DataFrame(list(collection.aggregate([
            {"$match":{
         '$and':testcommon_cond()['sub_master_cond']+[
             {"USER_ID._id":{"$in":db.user_master.distinct("_id",{"UTM_MEDIUM":{'$regex':'clever', '$options':'i'}})}},
         {"USER_ID._id":{"$nin":db.user_master.distinct("_id",{"UTM_MEDIUM":{'$regex':'schoology', '$options':'i'}})}},
            {"MODIFIED_DATE":{"$gte": csy_first_date()}}]}},
            practice_cond_dictonary_list[0],
            practice_cond_dictonary_list[1],
             threshcond[0],
           {'$group':{'_id':{'$month':'$MODIFIED_DATE'},'pc':{'$sum':1}}},
           {'$project':{'_id':1,'clever_CSY':'$pc'}}])))
        if dfclever.empty == True:
            dfclever=pd.DataFrame({'_id':[1,2,3,4,5,6,7,8,9,10,11,12],'clever_CSY':[0,0,0,0,0,0,0,0,0,0,0,0]})
        else:
            dfclever
        dfclever.rename(columns = { '_id': 'Month'}, inplace = True)
        d = dict(enumerate(calendar.month_abbr))    # to convert monthnumber of dataframe into monthname
        dfclever['Month'] = dfclever['Month'].map(d)
        dfclever=dfclever.fillna(0)
        
        dfcanvas = DataFrame(list(collection.aggregate([
            {"$match":{
         '$and':testcommon_cond()['sub_master_cond']+[
        {"USER_ID._id":{"$in":db.user_master.distinct("_id",{"UTM_MEDIUM":{'$regex':'canvas', '$options':'i'}})}},
        {"USER_ID._id":{"$nin":db.user_master.distinct("_id",{"UTM_MEDIUM":{'$regex':'clever', '$options':'i'}})}},
         {"USER_ID._id":{"$nin":db.user_master.distinct("_id",{"UTM_MEDIUM":{'$regex':'schoology', '$options':'i'}})}},
        {'USER_ID.EMAIL_ID':{'$ne':''}},  
         {"MODIFIED_DATE":{"$gte": csy_first_date()}}]}},
            practice_cond_dictonary_list[0],
            practice_cond_dictonary_list[1],
             threshcond[0],
           {'$group':{'_id':{'$month':'$MODIFIED_DATE'},'pc':{'$sum':1}}},
           {'$project':{'_id':1,'canvas_CSY':'$pc'}}])))
        if dfcanvas.empty == True:
            dfcanvas=pd.DataFrame({'_id':[1,2,3,4,5,6,7,8,9,10,11,12],'canvas_CSY':[0,0,0,0,0,0,0,0,0,0,0,0]})
        else:
            dfcanvas
        dfcanvas.rename(columns = { '_id': 'Month'}, inplace = True)
        d = dict(enumerate(calendar.month_abbr))    # to convert monthnumber of dataframe into monthname
        dfcanvas['Month'] = dfcanvas['Month'].map(d)
        dfcanvas=dfcanvas.fillna(0)
        
        
        
        dfgoogle = DataFrame(list(collection.aggregate([
            {"$match":{
         '$and':testcommon_cond()['sub_master_cond']+[
        {"USER_ID._id":{"$in":db.user_master.distinct("_id",{"UTM_MEDIUM":{'$regex':'google', '$options':'i'}})}},
        {"USER_ID._id":{"$nin":db.user_master.distinct("_id",{"UTM_MEDIUM":{'$regex':'canvas', '$options':'i'}})}},
        {"USER_ID._id":{"$nin":db.user_master.distinct("_id",{"UTM_MEDIUM":{'$regex':'clever', '$options':'i'}})}},
         {"USER_ID._id":{"$nin":db.user_master.distinct("_id",{"UTM_MEDIUM":{'$regex':'schoology', '$options':'i'}})}},
        {'USER_ID.EMAIL_ID':{'$ne':''}},  
         {"MODIFIED_DATE":{"$gte": csy_first_date()}}]}},
            practice_cond_dictonary_list[0],
            practice_cond_dictonary_list[1],
             threshcond[0],
           {'$group':{'_id':{'$month':'$MODIFIED_DATE'},'pc':{'$sum':1}}},
           {'$project':{'_id':1,'google_CSY':'$pc'}}])))
        if dfgoogle.empty == True:
            dfgoogle=pd.DataFrame({'_id':[1,2,3,4,5,6,7,8,9,10,11,12],'google_CSY':[0,0,0,0,0,0,0,0,0,0,0,0]})
        else:
            dfgoogle
        dfgoogle.rename(columns = { '_id': 'Month'}, inplace = True)
        d = dict(enumerate(calendar.month_abbr))    # to convert monthnumber of dataframe into monthname
        dfgoogle['Month'] = dfgoogle['Month'].map(d)
        dfgoogle=dfgoogle.fillna(0)
        
        

        df4 = DataFrame(list(collection.aggregate([
            {"$match":{
         '$and':testcommon_cond()['sub_master_cond']+[{'USER_ID.ROLE_ID._id':ObjectId("5f155b8a3b6800007900da2b")},
                 {"USER_ID._id":{"$nin":db.user_master.distinct("_id",{"UTM_MEDIUM":{'$regex':'clever', '$options':'i'}})}},
         {"USER_ID._id":{"$nin":db.user_master.distinct("_id",{"UTM_MEDIUM":{'$regex':'schoology', '$options':'i'}})}},
                 {"USER_ID._id":{"$nin":db.user_master.distinct("_id",{"UTM_MEDIUM":{'$regex':'canvas', '$options':'i'}})}},
                 {"USER_ID._id":{"$nin":db.user_master.distinct("_id",{"UTM_MEDIUM":{'$regex':'google', '$options':'i'}})}},
                  {"USER_ID.CREATED_DATE":{"$gte": datetime(2020,3,17)}},
            {"MODIFIED_DATE":{"$gte": csy_first_date()}}]}},
            practice_cond_dictonary_list[0],
            practice_cond_dictonary_list[1],
             threshcond[0],
           {'$group':{'_id':{'$month':'$MODIFIED_DATE'},'pc':{'$sum':1}}},
           {'$project':{'_id':1,'parents_CSY':'$pc'}}])))
        if df4.empty == True:
            df4=pd.DataFrame({'_id':[1,2,3,4,5,6,7,8,9,10,11,12],'parents_CSY':[0,0,0,0,0,0,0,0,0,0,0,0]})
        else:
            df4
        df4.rename(columns = { '_id': 'Month'}, inplace = True)
        d = dict(enumerate(calendar.month_abbr))    # to convert monthnumber of dataframe into monthname
        df4['Month'] = df4['Month'].map(d)
        # df2
        practice_LSY_lsy= pd.merge(df1, df0,on='Month', how='left')
        practice_LSY= pd.merge(practice_LSY_lsy, df2,on='Month', how='left')
        practice_CSY =pd.merge(practice_LSY, dfschoology, on='Month', how='left')
        practice_CSY =pd.merge(practice_CSY, dfclever, on='Month', how='left')
        practice_CSY =pd.merge(practice_CSY, dfcanvas, on='Month', how='left')
        practice_CSY =pd.merge(practice_CSY, dfgoogle, on='Month', how='left')
        practice_CSY =pd.merge(practice_CSY, df4, on='Month', how='left').fillna(0)

        mon=pd.DataFrame({'Month':[8,9,10,11,12,1,2,3,4,5,6,7]})
        d = dict(enumerate(calendar.month_abbr))
        mon['Month'] = mon['Month'].map(d)

        data=pd.merge(mon,practice_CSY,on='Month',how='left')
        Month=data['Month'].tolist()
        TOTAL_LSYTOLSY=data['TOTAL_LSYTOLSY'].tolist()
        TOTAL_LSY=data['TOTAL_LSY'].tolist()
        teacher_CSY=data['teacher_CSY'].tolist()
        parents_CSY=data['parents_CSY'].tolist()
        schoology_CSY=data['schoology_CSY'].tolist()
        clever_CSY=data['clever_CSY'].tolist()
        canvas_CSY=data['canvas_CSY'].tolist()
        google_CSY=data['google_CSY'].tolist()
        temp=[{'Month':Month,'curve':TOTAL_LSY,'curve_LYTOLY':TOTAL_LSYTOLSY,'bar':teacher_CSY},{'bar2':parents_CSY},
              {'bars':schoology_CSY},{'barc': clever_CSY},{'barcan': canvas_CSY},{'bargoogle':google_CSY}]

        return json.dumps(temp)
    
    else:
        df0 = DataFrame(list(collection.aggregate([
            {"$match":{
         '$and':testcommon_cond()['sub_master_cond']+[
            {'USER_ID.EMAIL_ID':{'$ne':''}},  
            {"MODIFIED_DATE":{"$gte": LSYTOLSY_Date(),"$lt":LSY_Date()}}]}},
           {'$group':{'_id':{'$month':'$MODIFIED_DATE'},'pc':{'$sum':1}}},
           {'$project':{'_id':1,'TOTAL_LSYTOLSY':'$pc'}}])))
        df0.rename(columns = { '_id': 'Month'}, inplace = True)
        d = dict(enumerate(calendar.month_abbr))    # to convert monthnumber of dataframe into monthname
        print(df0)
        df0['Month'] = df0['Month'].map(d)


        df1 = DataFrame(list(collection.aggregate([
            {"$match":{
         '$and':testcommon_cond()['sub_master_cond']+[         
            {'USER_ID.EMAIL_ID':{'$ne':''}},  
                    {"MODIFIED_DATE":{"$gte": LSY_Date(),
                                            "$lt":csy_first_date()}}]}},
           {'$group':{'_id':{'$month':'$MODIFIED_DATE'},'pc':{'$sum':1}}},
           {'$project':{'_id':1,'TOTAL_LSY':'$pc'}}])))
        df1.rename(columns = { '_id': 'Month'}, inplace = True)
        d = dict(enumerate(calendar.month_abbr))    # to convert monthnumber of dataframe into monthname
        df1['Month'] = df1['Month'].map(d)

        df2 = DataFrame(list(collection.aggregate([
            {"$match":{
         '$and':testcommon_cond()['sub_master_cond']+[{'USER_ID.ROLE_ID._id' :{'$ne':ObjectId("5f155b8a3b6800007900da2b")}},
                 {"USER_ID._id":{"$nin":db.user_master.distinct("_id",{"UTM_MEDIUM":{'$regex':'clever', '$options':'i'}})}},
                 {"USER_ID._id":{"$nin":db.user_master.distinct("_id",{"UTM_MEDIUM":{'$regex':'schoology', '$options':'i'}})}},
                {"USER_ID._id":{"$nin":db.user_master.distinct("_id",{"UTM_MEDIUM":{'$regex':'canvas', '$options':'i'}})}},
                {"USER_ID._id":{"$nin":db.user_master.distinct("_id",{"UTM_MEDIUM":{'$regex':'google', '$options':'i'}})}},
            {'USER_ID.EMAIL_ID':{'$ne':''}},  
            {"MODIFIED_DATE":{"$gte": csy_first_date()}}]}},
#             practice_cond_dictonary_list[0],
#             practice_cond_dictonary_list[1],
#              threshcond[0],
           {'$group':{'_id':{'$month':'$MODIFIED_DATE'},'pc':{'$sum':1}}},
           {'$project':{'_id':1,'teacher_CSY':'$pc'}}])))
        if df2.empty == True:
            df2=pd.DataFrame({'_id':[1,2,3,4,5,6,7,8,9,10,11,12],'parents_CSY':[0,0,0,0,0,0,0,0,0,0,0,0]})
        else:
            df2
        df2.rename(columns = { '_id': 'Month'}, inplace = True)
        d = dict(enumerate(calendar.month_abbr))    # to convert monthnumber of dataframe into monthname
        df2['Month'] = df2['Month'].map(d)

        practice_left= pd.merge(df1, df2,on='Month', how='outer')
        practice_left=practice_left.fillna(0)    

        dfschoology = DataFrame(list(collection.aggregate([
            {"$match":{
         '$and':[

                 {"USER_ID._id":{"$nin":db.user_master.distinct("_id",{"UTM_MEDIUM":{'$regex':'clever', '$options':'i'}})}},
                 {"USER_ID._id":{"$in":db.user_master.distinct("_id",{"UTM_MEDIUM":{'$regex':'schoology', '$options':'i'}})}},
            {'USER_ID.EMAIL_ID':{'$ne':''}},  
            {"MODIFIED_DATE":{"$gte": csy_first_date()}}]}},
           {'$group':{'_id':{'$month':'$MODIFIED_DATE'},'pc':{'$sum':1}}},
           {'$project':{'_id':1,'schoology_CSY':'$pc'}}])))

        if dfschoology.empty == True:
            dfschoology=pd.DataFrame({'_id':[1,2,3,4,5,6,7,8,9,10,11,12],'schoology_CSY':[0,0,0,0,0,0,0,0,0,0,0,0]})
        else:
            dfschoology
        dfschoology.rename(columns = { '_id': 'Month'}, inplace = True)
        d = dict(enumerate(calendar.month_abbr))    # to convert monthnumber of dataframe into monthname
        dfschoology['Month'] = dfschoology['Month'].map(d)
        dfschoology=dfschoology.fillna(0)


        dfclever = DataFrame(list(collection.aggregate([
            {"$match":{
         '$and':testcommon_cond()['sub_master_cond']+[
             {"USER_ID._id":{"$in":db.user_master.distinct("_id",{"UTM_MEDIUM":{'$regex':'clever', '$options':'i'}})}},
         {"USER_ID._id":{"$nin":db.user_master.distinct("_id",{"UTM_MEDIUM":{'$regex':'schoology', '$options':'i'}})}},
            {'USER_ID.EMAIL_ID':{'$ne':''}},  
             {"MODIFIED_DATE":{"$gte": csy_first_date()}}]}},
           {'$group':{'_id':{'$month':'$MODIFIED_DATE'},'pc':{'$sum':1}}},
           {'$project':{'_id':1,'clever_CSY':'$pc'}}])))
        if dfclever.empty == True:
            dfclever=pd.DataFrame({'_id':[1,2,3,4,5,6,7,8,9,10,11,12],'clever_CSY':[0,0,0,0,0,0,0,0,0,0,0,0]})
        else:
            dfclever
        dfclever.rename(columns = { '_id': 'Month'}, inplace = True)
        d = dict(enumerate(calendar.month_abbr))    # to convert monthnumber of dataframe into monthname
        dfclever['Month'] = dfclever['Month'].map(d)
        dfclever=dfclever.fillna(0)
        
        dfcanvas = DataFrame(list(collection.aggregate([
            {"$match":{
         '$and':testcommon_cond()['sub_master_cond']+[
        {"USER_ID._id":{"$in":db.user_master.distinct("_id",{"UTM_MEDIUM":{'$regex':'canvas', '$options':'i'}})}},
        {"USER_ID._id":{"$nin":db.user_master.distinct("_id",{"UTM_MEDIUM":{'$regex':'clever', '$options':'i'}})}},
         {"USER_ID._id":{"$nin":db.user_master.distinct("_id",{"UTM_MEDIUM":{'$regex':'schoology', '$options':'i'}})}},
        {'USER_ID.EMAIL_ID':{'$ne':''}},  
         {"MODIFIED_DATE":{"$gte": csy_first_date()}}]}},
           {'$group':{'_id':{'$month':'$MODIFIED_DATE'},'pc':{'$sum':1}}},
           {'$project':{'_id':1,'canvas_CSY':'$pc'}}])))
        if dfcanvas.empty == True:
            dfcanvas=pd.DataFrame({'_id':[1,2,3,4,5,6,7,8,9,10,11,12],'canvas_CSY':[0,0,0,0,0,0,0,0,0,0,0,0]})
        else:
            dfcanvas
        dfcanvas.rename(columns = { '_id': 'Month'}, inplace = True)
        d = dict(enumerate(calendar.month_abbr))    # to convert monthnumber of dataframe into monthname
        dfcanvas['Month'] = dfcanvas['Month'].map(d)
        dfcanvas=dfcanvas.fillna(0)
        
        
        
        
        dfgoogle = DataFrame(list(collection.aggregate([
            {"$match":{
         '$and':testcommon_cond()['sub_master_cond']+[
        {"USER_ID._id":{"$in":db.user_master.distinct("_id",{"UTM_MEDIUM":{'$regex':'google', '$options':'i'}})}},
       {"USER_ID._id":{"$nin":db.user_master.distinct("_id",{"UTM_MEDIUM":{'$regex':'canvas', '$options':'i'}})}},
        {"USER_ID._id":{"$nin":db.user_master.distinct("_id",{"UTM_MEDIUM":{'$regex':'clever', '$options':'i'}})}},
         {"USER_ID._id":{"$nin":db.user_master.distinct("_id",{"UTM_MEDIUM":{'$regex':'schoology', '$options':'i'}})}},
        {'USER_ID.EMAIL_ID':{'$ne':''}},  
         {"MODIFIED_DATE":{"$gte": csy_first_date()}}]}},
           {'$group':{'_id':{'$month':'$MODIFIED_DATE'},'pc':{'$sum':1}}},
           {'$project':{'_id':1,'google_CSY':'$pc'}}])))
        if dfgoogle.empty == True:
            dfgoogle=pd.DataFrame({'_id':[1,2,3,4,5,6,7,8,9,10,11,12],'google_CSY':[0,0,0,0,0,0,0,0,0,0,0,0]})
        else:
            dfgoogle
        dfgoogle.rename(columns = { '_id': 'Month'}, inplace = True)
        d = dict(enumerate(calendar.month_abbr))    # to convert monthnumber of dataframe into monthname
        dfgoogle['Month'] = dfgoogle['Month'].map(d)
        dfgoogle=dfgoogle.fillna(0)
        

        df4 = DataFrame(list(collection.aggregate([
            {"$match":{
         '$and':testcommon_cond()['sub_master_cond']+[{'USER_ID.ROLE_ID._id':ObjectId("5f155b8a3b6800007900da2b")},
                 {"USER_ID._id":{"$nin":db.user_master.distinct("_id",{"UTM_MEDIUM":{'$regex':'clever', '$options':'i'}})}},
         {"USER_ID._id":{"$nin":db.user_master.distinct("_id",{"UTM_MEDIUM":{'$regex':'schoology', '$options':'i'}})}},
                 {"USER_ID._id":{"$nin":db.user_master.distinct("_id",{"UTM_MEDIUM":{'$regex':'canvas', '$options':'i'}})}},
                 {"USER_ID._id":{"$nin":db.user_master.distinct("_id",{"UTM_MEDIUM":{'$regex':'google', '$options':'i'}})}},
            {'USER_ID.EMAIL_ID':{'$ne':''}},  
                  {"USER_ID.CREATED_DATE":{"$gte": datetime(2020,3,17)}},
            {"MODIFIED_DATE":{"$gte": csy_first_date()}}]}},
           {'$group':{'_id':{'$month':'$MODIFIED_DATE'},'pc':{'$sum':1}}},
           {'$project':{'_id':1,'parents_CSY':'$pc'}}])))
        if df4.empty == True:
            df4=pd.DataFrame({'_id':[1,2,3,4,5,6,7,8,9,10,11,12],'parents_CSY':[0,0,0,0,0,0,0,0,0,0,0,0]})
        else:
            df4
        df4.rename(columns = { '_id': 'Month'}, inplace = True)
        d = dict(enumerate(calendar.month_abbr))    # to convert monthnumber of dataframe into monthname
        df4['Month'] = df4['Month'].map(d)
        # df2
        practice_LSY_lsy= pd.merge(df1, df0,on='Month', how='left')
        practice_LSY= pd.merge(practice_LSY_lsy, df2,on='Month', how='left')
        practice_CSY =pd.merge(practice_LSY, dfschoology, on='Month', how='left')
        practice_CSY =pd.merge(practice_CSY, dfclever, on='Month', how='left')
        practice_CSY =pd.merge(practice_CSY, dfcanvas, on='Month', how='left')
        practice_CSY =pd.merge(practice_CSY, dfgoogle, on='Month', how='left')
        practice_CSY =pd.merge(practice_CSY, df4, on='Month', how='left').fillna(0)

        mon=pd.DataFrame({'Month':[8,9,10,11,12,1,2,3,4,5,6,7]})
        d = dict(enumerate(calendar.month_abbr))
        mon['Month'] = mon['Month'].map(d)

        data=pd.merge(mon,practice_CSY,on='Month',how='left')
        Month=data['Month'].tolist()
        TOTAL_LSYTOLSY=data['TOTAL_LSYTOLSY'].tolist()
        TOTAL_LSY=data['TOTAL_LSY'].tolist()
        teacher_CSY=data['teacher_CSY'].tolist()
        parents_CSY=data['parents_CSY'].tolist()
        schoology_CSY=data['schoology_CSY'].tolist()
        clever_CSY=data['clever_CSY'].tolist()
        canvas_CSY=data['canvas_CSY'].tolist()
        google_CSY=data['google_CSY'].tolist()
        temp=[{'Month':Month,'curve':TOTAL_LSY,'curve_LYTOLY':TOTAL_LSYTOLSY,'bar':teacher_CSY},{'bar2':parents_CSY},
              {'bars':schoology_CSY},{'barc': clever_CSY},{'barcan': canvas_CSY},{'bargoogle':google_CSY}]

        return json.dumps(temp)


# practice_trendnew_("Playback")

def active_trend_new_(charttype):
    collection = db.audio_track_master
    from datetime import datetime
    
    if charttype=='Practice':
    #     threshold=int(threshold)/100
        threshold= 0.5
        threshcond=[{'$match':{'Completion_Percentage':{'$gte':threshold}}}]
        df0 = DataFrame(list(collection.aggregate([
            {"$match":{
         '$and':testcommon_cond()['sub_master_cond']+[{'USER_ID.EMAIL_ID':{'$ne':''}},  
             {"MODIFIED_DATE":{"$gte": LSYTOLSY_Date(),"$lt":LSY_Date()}}]}},
            practice_cond_dictonary_list[0],
                        practice_cond_dictonary_list[1],
                         threshcond[0],
           {'$group':{'_id':{'$month':'$MODIFIED_DATE'},'auc':{'$addToSet':'$USER_ID'}}},
           {'$project':{'_id':1,'TOTAL_LSYTOLSY':{'$size':'$auc'}}}])))
        df0.rename(columns = { '_id': 'Month'}, inplace = True)
        d = dict(enumerate(calendar.month_abbr))    # to convert monthnumber of dataframe into monthname
        df0['Month'] = df0['Month'].map(d)
         
        df1 = DataFrame(list(collection.aggregate([
            {"$match":{
         '$and':testcommon_cond()['sub_master_cond']+[{'USER_ID.EMAIL_ID':{'$ne':''}},
            {"MODIFIED_DATE":{"$gte": LSY_Date(),"$lt":csy_first_date()}}]}},
            practice_cond_dictonary_list[0],
                        practice_cond_dictonary_list[1],
                         threshcond[0],
           {'$group':{'_id':{'$month':'$MODIFIED_DATE'},'auc':{'$addToSet':'$USER_ID'}}},
           {'$project':{'_id':1,'TOTAL_LSY':{'$size':'$auc'}}}])))
        df1.rename(columns = { '_id': 'Month'}, inplace = True)
        d = dict(enumerate(calendar.month_abbr))    # to convert monthnumber of dataframe into monthname
        df1['Month'] = df1['Month'].map(d)
        print('LSY:', LSY_Date)
        print('CSY',csy_first_date())
        # print(df1)
        df2 = DataFrame(list(collection.aggregate([
            {"$match":{
         '$and':testcommon_cond()['sub_master_cond']+[{'USER_ID.ROLE_ID._id' :{'$ne':ObjectId("5f155b8a3b6800007900da2b")}},
        {"USER_ID._id":{"$nin":db.user_master.distinct("_id",{"UTM_MEDIUM":{'$regex':'google', '$options':'i'}})}},
       {"USER_ID._id":{"$nin":db.user_master.distinct("_id",{"UTM_MEDIUM":{'$regex':'canvas', '$options':'i'}})}},
        {"USER_ID._id":{"$nin":db.user_master.distinct("_id",{"UTM_MEDIUM":{'$regex':'clever', '$options':'i'}})}},
         {"USER_ID._id":{"$nin":db.user_master.distinct("_id",{"UTM_MEDIUM":{'$regex':'schoology', '$options':'i'}})}},
        {'USER_ID.EMAIL_ID':{'$ne':''}},  
            {"MODIFIED_DATE":{"$gte": csy_first_date()}}]}},
            practice_cond_dictonary_list[0],
                        practice_cond_dictonary_list[1],
                         threshcond[0],
           {'$group':{'_id':{'$month':'$MODIFIED_DATE'},'auc':{'$addToSet':'$USER_ID'}}},
           {'$project':{'_id':1,'teacher_CSY':{'$size':'$auc'}}}])))
        if df2.empty == True:
            df2=pd.DataFrame({'_id':[1,2,3,4,5,6,7,8,9,10,11,12],'parents_CSY':[0,0,0,0,0,0,0,0,0,0,0,0]})
        else:
            df2
        df2.rename(columns = { '_id': 'Month'}, inplace = True)
        d = dict(enumerate(calendar.month_abbr))    # to convert monthnumber of dataframe into monthname
        df2['Month'] = df2['Month'].map(d)
        # df2
        practice_left= pd.merge(df1, df2,on='Month', how='outer')
        practice_left=practice_left.fillna(0)
        #print(practice_left)


        dfschoology = DataFrame(list(collection.aggregate([
            {"$match":{
         '$and':testcommon_cond()['sub_master_cond']+[
        {"USER_ID._id":{"$nin":db.user_master.distinct("_id",{"UTM_MEDIUM":{'$regex':'google', '$options':'i'}})}},
       {"USER_ID._id":{"$nin":db.user_master.distinct("_id",{"UTM_MEDIUM":{'$regex':'canvas', '$options':'i'}})}},
        {"USER_ID._id":{"$nin":db.user_master.distinct("_id",{"UTM_MEDIUM":{'$regex':'clever', '$options':'i'}})}},
         {"USER_ID._id":{"$in":db.user_master.distinct("_id",{"UTM_MEDIUM":{'$regex':'schoology', '$options':'i'}})}},
         {'USER_ID.EMAIL_ID':{'$ne':''}},  
            {"MODIFIED_DATE":{"$gte": csy_first_date()}}]}},
            practice_cond_dictonary_list[0],
                        practice_cond_dictonary_list[1],
                         threshcond[0],
           {'$group':{'_id':{'$month':'$MODIFIED_DATE'},'auc':{'$addToSet':'$USER_ID'}}},
           {'$project':{'_id':1,'schoology_CSY':{'$size':'$auc'}}}])))

        if dfschoology.empty == True:
            dfschoology=pd.DataFrame({'_id':[1,2,3,4,5,6,7,8,9,10,11,12],'schoology_CSY':[0,0,0,0,0,0,0,0,0,0,0,0]})
        else:
            dfschoology
        dfschoology.rename(columns = { '_id': 'Month'}, inplace = True)
        d = dict(enumerate(calendar.month_abbr))    # to convert monthnumber of dataframe into monthname
        dfschoology['Month'] = dfschoology['Month'].map(d)
        dfschoology=dfschoology.fillna(0)


        dfclever = DataFrame(list(collection.aggregate([
            {"$match":{
         '$and':testcommon_cond()['sub_master_cond']+[
        {"USER_ID._id":{"$nin":db.user_master.distinct("_id",{"UTM_MEDIUM":{'$regex':'google', '$options':'i'}})}},
       {"USER_ID._id":{"$nin":db.user_master.distinct("_id",{"UTM_MEDIUM":{'$regex':'canvas', '$options':'i'}})}},
        {"USER_ID._id":{"$in":db.user_master.distinct("_id",{"UTM_MEDIUM":{'$regex':'clever', '$options':'i'}})}},
         {"USER_ID._id":{"$nin":db.user_master.distinct("_id",{"UTM_MEDIUM":{'$regex':'schoology', '$options':'i'}})}},
            {'USER_ID.EMAIL_ID':{'$ne':''}},  
            {"MODIFIED_DATE":{"$gte": csy_first_date()}}]}},
            practice_cond_dictonary_list[0],
                        practice_cond_dictonary_list[1],
                         threshcond[0],
           {'$group':{'_id':{'$month':'$MODIFIED_DATE'},'auc':{'$addToSet':'$USER_ID'}}},
           {'$project':{'_id':1,'clever_CSY':{'$size':'$auc'}}}])))
        if dfclever.empty == True:
            dfclever=pd.DataFrame({'_id':[1,2,3,4,5,6,7,8,9,10,11,12],'clever_CSY':[0,0,0,0,0,0,0,0,0,0,0,0]})
        else:
            dfclever
        dfclever.rename(columns = { '_id': 'Month'}, inplace = True)
        d = dict(enumerate(calendar.month_abbr))    # to convert monthnumber of dataframe into monthname
        dfclever['Month'] = dfclever['Month'].map(d)
        dfclever=dfclever.fillna(0)
        
        
        dfcanvas = DataFrame(list(collection.aggregate([
            {"$match":{
         '$and':testcommon_cond()['sub_master_cond']+[
        {"USER_ID._id":{"$nin":db.user_master.distinct("_id",{"UTM_MEDIUM":{'$regex':'google', '$options':'i'}})}},
       {"USER_ID._id":{"$in":db.user_master.distinct("_id",{"UTM_MEDIUM":{'$regex':'canvas', '$options':'i'}})}},
        {"USER_ID._id":{"$nin":db.user_master.distinct("_id",{"UTM_MEDIUM":{'$regex':'clever', '$options':'i'}})}},
         {"USER_ID._id":{"$nin":db.user_master.distinct("_id",{"UTM_MEDIUM":{'$regex':'schoology', '$options':'i'}})}},
            {'USER_ID.EMAIL_ID':{'$ne':''}},  
            {"MODIFIED_DATE":{"$gte": csy_first_date()}}]}},
            practice_cond_dictonary_list[0],
                        practice_cond_dictonary_list[1],
                         threshcond[0],
           {'$group':{'_id':{'$month':'$MODIFIED_DATE'},'auc':{'$addToSet':'$USER_ID'}}},
           {'$project':{'_id':1,'canvas_CSY':{'$size':'$auc'}}}])))
        if dfcanvas.empty == True:
            dfcanvas=pd.DataFrame({'_id':[1,2,3,4,5,6,7,8,9,10,11,12],'canvas_CSY':[0,0,0,0,0,0,0,0,0,0,0,0]})
        else:
            dfcanvas
        dfcanvas.rename(columns = { '_id': 'Month'}, inplace = True)
        d = dict(enumerate(calendar.month_abbr))    # to convert monthnumber of dataframe into monthname
        dfcanvas['Month'] = dfcanvas['Month'].map(d)
        dfcanvas=dfcanvas.fillna(0)
        
        
        dfgoogle = DataFrame(list(collection.aggregate([
            {"$match":{
         '$and':testcommon_cond()['sub_master_cond']+[
        {"USER_ID._id":{"$in":db.user_master.distinct("_id",{"UTM_MEDIUM":{'$regex':'google', '$options':'i'}})}},
       {"USER_ID._id":{"$nin":db.user_master.distinct("_id",{"UTM_MEDIUM":{'$regex':'canvas', '$options':'i'}})}},
        {"USER_ID._id":{"$nin":db.user_master.distinct("_id",{"UTM_MEDIUM":{'$regex':'clever', '$options':'i'}})}},
         {"USER_ID._id":{"$nin":db.user_master.distinct("_id",{"UTM_MEDIUM":{'$regex':'schoology', '$options':'i'}})}},
            {'USER_ID.EMAIL_ID':{'$ne':''}},  
            {"MODIFIED_DATE":{"$gte": csy_first_date()}}]}},
            practice_cond_dictonary_list[0],
                        practice_cond_dictonary_list[1],
                         threshcond[0],
           {'$group':{'_id':{'$month':'$MODIFIED_DATE'},'auc':{'$addToSet':'$USER_ID'}}},
           {'$project':{'_id':1,'google_CSY':{'$size':'$auc'}}}])))
        if dfgoogle.empty == True:
            dfgoogle=pd.DataFrame({'_id':[1,2,3,4,5,6,7,8,9,10,11,12],'google_CSY':[0,0,0,0,0,0,0,0,0,0,0,0]})
        else:
            dfgoogle
        dfgoogle.rename(columns = { '_id': 'Month'}, inplace = True)
        d = dict(enumerate(calendar.month_abbr))    # to convert monthnumber of dataframe into monthname
        dfgoogle['Month'] = dfgoogle['Month'].map(d)
        dfgoogle=dfgoogle.fillna(0)
        
        
        
        

        df4 = DataFrame(list(collection.aggregate([
            {"$match":{
         '$and':testcommon_cond()['sub_master_cond']+[{'USER_ID.ROLE_ID._id':ObjectId("5f155b8a3b6800007900da2b")},
        {"USER_ID._id":{"$nin":db.user_master.distinct("_id",{"UTM_MEDIUM":{'$regex':'google', '$options':'i'}})}},
       {"USER_ID._id":{"$nin":db.user_master.distinct("_id",{"UTM_MEDIUM":{'$regex':'canvas', '$options':'i'}})}},
        {"USER_ID._id":{"$nin":db.user_master.distinct("_id",{"UTM_MEDIUM":{'$regex':'clever', '$options':'i'}})}},
         {"USER_ID._id":{"$nin":db.user_master.distinct("_id",{"UTM_MEDIUM":{'$regex':'schoology', '$options':'i'}})}},
            {'USER_ID.EMAIL_ID':{'$ne':''}},  
                  {"USER_ID.CREATED_DATE":{"$gte": datetime(2020,3,17)}},
            {"MODIFIED_DATE":{"$gte": csy_first_date()}}]}},
            practice_cond_dictonary_list[0],
                        practice_cond_dictonary_list[1],
                         threshcond[0],
           {'$group':{'_id':{'$month':'$MODIFIED_DATE'},'auc':{'$addToSet':'$USER_ID'}}},
           {'$project':{'_id':1,'parents_CSY':{'$size':'$auc'}}}])))
        if df4.empty == True:
            df4=pd.DataFrame({'_id':[1,2,3,4,5,6,7,8,9,10,11,12],'parents_CSY':[0,0,0,0,0,0,0,0,0,0,0,0]})
        else:
            df4
        df4.rename(columns = { '_id': 'Month'}, inplace = True)
        d = dict(enumerate(calendar.month_abbr))    # to convert monthnumber of dataframe into monthname
        df4['Month'] = df4['Month'].map(d)
        # df2
        practice_LSY_lsy= pd.merge(df1, df0,on='Month', how='left')
        practice_LSY= pd.merge(practice_LSY_lsy, df2,on='Month', how='left')
        practice_CSY =pd.merge(practice_LSY, dfschoology, on='Month', how='left')
        practice_CSY =pd.merge(practice_CSY, dfclever, on='Month', how='left')
        practice_CSY =pd.merge(practice_CSY, dfcanvas, on='Month', how='left')
        practice_CSY =pd.merge(practice_CSY, dfgoogle, on='Month', how='left')
        practice_CSY =pd.merge(practice_CSY, df4, on='Month', how='left').fillna(0)

        mon=pd.DataFrame({'Month':[8,9,10,11,12,1,2,3,4,5,6,7]})
        d = dict(enumerate(calendar.month_abbr))
        mon['Month'] = mon['Month'].map(d)

        data=pd.merge(mon,practice_CSY,on='Month',how='left')
        Month=data['Month'].tolist()
        TOTAL_LSY=data['TOTAL_LSY'].tolist()
        TOTAL_LSYTOLSY=data['TOTAL_LSYTOLSY'].tolist()
        teacher_CSY=data['teacher_CSY'].tolist()
        parents_CSY=data['parents_CSY'].tolist()
        schoology_CSY=data['schoology_CSY'].tolist()
        clever_CSY=data['clever_CSY'].tolist()
        canvas_CSY=data['canvas_CSY'].tolist()
        google_CSY=data['google_CSY'].tolist()
        temp=[{'Month':Month,'curve':TOTAL_LSY,'curve_LYTOLY':TOTAL_LSYTOLSY,'bar':teacher_CSY},{'bar2':parents_CSY},
              {'bars':schoology_CSY},{'barc': clever_CSY},{'barcan': canvas_CSY},{'bargoogle': google_CSY}]

        return json.dumps(temp)
    
    else:
        df0 = DataFrame(list(collection.aggregate([
            {"$match":{
         '$and':testcommon_cond()['sub_master_cond']+[
            {'USER_ID.EMAIL_ID':{'$ne':''}},  
             {"MODIFIED_DATE":{"$gte": LSYTOLSY_Date(),
                                            "$lt":LSY_Date()}}]}},
           {'$group':{'_id':{'$month':'$MODIFIED_DATE'},'auc':{'$addToSet':'$USER_ID._id'}}},
           {'$project':{'_id':1,'TOTAL_LSYTOLSY':{'$size':'$auc'}}}])))
#         print(df0)
        df0.rename(columns = { '_id': 'Month'}, inplace = True)
        d = dict(enumerate(calendar.month_abbr))    # to convert monthnumber of dataframe into monthname
        df0['Month'] = df0['Month'].map(d)
         
        df1 = DataFrame(list(collection.aggregate([
            {"$match":{
         '$and':testcommon_cond()['sub_master_cond']+[
            {'USER_ID.EMAIL_ID':{'$ne':''}},  
            {"MODIFIED_DATE":{"$gte": LSY_Date(),
                                            "$lt":csy_first_date()}}]}},
           {'$group':{'_id':{'$month':'$MODIFIED_DATE'},'auc':{'$addToSet':'$USER_ID._id'}}},
           {'$project':{'_id':1,'TOTAL_LSY':{'$size':'$auc'}}}])))
        df1.rename(columns = { '_id': 'Month'}, inplace = True)
        d = dict(enumerate(calendar.month_abbr))    # to convert monthnumber of dataframe into monthname
        df1['Month'] = df1['Month'].map(d)
        print('LSY:', LSY_Date)
        print('CSY',csy_first_date())
        # print(df1)
        df2 = DataFrame(list(collection.aggregate([
            {"$match":{
         '$and':testcommon_cond()['sub_master_cond']+[
             {'USER_ID.ROLE_ID._id' :{'$ne':ObjectId("5f155b8a3b6800007900da2b")}},
        {"USER_ID._id":{"$nin":db.user_master.distinct("_id",{"UTM_MEDIUM":{'$regex':'google', '$options':'i'}})}},
       {"USER_ID._id":{"$nin":db.user_master.distinct("_id",{"UTM_MEDIUM":{'$regex':'canvas', '$options':'i'}})}},
        {"USER_ID._id":{"$nin":db.user_master.distinct("_id",{"UTM_MEDIUM":{'$regex':'clever', '$options':'i'}})}},
         {"USER_ID._id":{"$nin":db.user_master.distinct("_id",{"UTM_MEDIUM":{'$regex':'schoology', '$options':'i'}})}},
            {'USER_ID.EMAIL_ID':{'$ne':''}},  
            {"MODIFIED_DATE":{"$gte": csy_first_date()}}]}},
           {'$group':{'_id':{'$month':'$MODIFIED_DATE'},'auc':{'$addToSet':'$USER_ID._id'}}},
           {'$project':{'_id':1,'teacher_CSY':{'$size':'$auc'}}}])))
        if df2.empty == True:
            df2=pd.DataFrame({'_id':[1,2,3,4,5,6,7,8,9,10,11,12],'parents_CSY':[0,0,0,0,0,0,0,0,0,0,0,0]})
        else:
            df2
        df2.rename(columns = { '_id': 'Month'}, inplace = True)
        d = dict(enumerate(calendar.month_abbr))    # to convert monthnumber of dataframe into monthname
        df2['Month'] = df2['Month'].map(d)
        # df2
        practice_left= pd.merge(df1, df2,on='Month', how='outer')
        practice_left=practice_left.fillna(0)
        #print(practice_left)


        dfschoology = DataFrame(list(collection.aggregate([
            {"$match":{
         '$and':testcommon_cond()['sub_master_cond']+[
            
        {"USER_ID._id":{"$nin":db.user_master.distinct("_id",{"UTM_MEDIUM":{'$regex':'google', '$options':'i'}})}},
       {"USER_ID._id":{"$nin":db.user_master.distinct("_id",{"UTM_MEDIUM":{'$regex':'canvas', '$options':'i'}})}},
        {"USER_ID._id":{"$nin":db.user_master.distinct("_id",{"UTM_MEDIUM":{'$regex':'clever', '$options':'i'}})}},
         {"USER_ID._id":{"$in":db.user_master.distinct("_id",{"UTM_MEDIUM":{'$regex':'schoology', '$options':'i'}})}},
            {'USER_ID.EMAIL_ID':{'$ne':''}},  
            {"MODIFIED_DATE":{"$gte": csy_first_date()}}]}},
           {'$group':{'_id':{'$month':'$MODIFIED_DATE'},'auc':{'$addToSet':'$USER_ID'}}},
           {'$project':{'_id':1,'schoology_CSY':{'$size':'$auc'}}}])))

        if dfschoology.empty == True:
            dfschoology=pd.DataFrame({'_id':[1,2,3,4,5,6,7,8,9,10,11,12],'schoology_CSY':[0,0,0,0,0,0,0,0,0,0,0,0]})
        else:
            dfschoology
        dfschoology.rename(columns = { '_id': 'Month'}, inplace = True)
        d = dict(enumerate(calendar.month_abbr))    # to convert monthnumber of dataframe into monthname
        dfschoology['Month'] = dfschoology['Month'].map(d)
        dfschoology=dfschoology.fillna(0)


        dfclever = DataFrame(list(collection.aggregate([
            {"$match":{
         '$and':testcommon_cond()['sub_master_cond']+[
       {"USER_ID._id":{"$nin":db.user_master.distinct("_id",{"UTM_MEDIUM":{'$regex':'google', '$options':'i'}})}},
       {"USER_ID._id":{"$nin":db.user_master.distinct("_id",{"UTM_MEDIUM":{'$regex':'canvas', '$options':'i'}})}},
       {"USER_ID._id":{"$in":db.user_master.distinct("_id",{"UTM_MEDIUM":{'$regex':'clever', '$options':'i'}})}},
       {"USER_ID._id":{"$nin":db.user_master.distinct("_id",{"UTM_MEDIUM":{'$regex':'schoology', '$options':'i'}})}},
            {'USER_ID.EMAIL_ID':{'$ne':''}},  
            {"MODIFIED_DATE":{"$gte": csy_first_date()}}]}},
           {'$group':{'_id':{'$month':'$MODIFIED_DATE'},'auc':{'$addToSet':'$USER_ID._id'}}},
           {'$project':{'_id':1,'clever_CSY':{'$size':'$auc'}}}])))
        if dfclever.empty == True:
            dfclever=pd.DataFrame({'_id':[1,2,3,4,5,6,7,8,9,10,11,12],'clever_CSY':[0,0,0,0,0,0,0,0,0,0,0,0]})
        else:
            dfclever
        dfclever.rename(columns = { '_id': 'Month'}, inplace = True)
        d = dict(enumerate(calendar.month_abbr))    # to convert monthnumber of dataframe into monthname
        dfclever['Month'] = dfclever['Month'].map(d)
        dfclever=dfclever.fillna(0)
        
        
        dfcanvas = DataFrame(list(collection.aggregate([
            {"$match":{
         '$and':testcommon_cond()['sub_master_cond']+[
          {"USER_ID._id":{"$nin":db.user_master.distinct("_id",{"UTM_MEDIUM":{'$regex':'google', '$options':'i'}})}},
          {"USER_ID._id":{"$in":db.user_master.distinct("_id",{"UTM_MEDIUM":{'$regex':'canvas', '$options':'i'}})}},
          {"USER_ID._id":{"$nin":db.user_master.distinct("_id",{"UTM_MEDIUM":{'$regex':'clever', '$options':'i'}})}},
          {"USER_ID._id":{"$nin":db.user_master.distinct("_id",{"UTM_MEDIUM":{'$regex':'schoology', '$options':'i'}})}},
            {'USER_ID.EMAIL_ID':{'$ne':''}},  
            {"MODIFIED_DATE":{"$gte": csy_first_date()}}]}},
           {'$group':{'_id':{'$month':'$MODIFIED_DATE'},'auc':{'$addToSet':'$USER_ID._id'}}},
           {'$project':{'_id':1,'canvas_CSY':{'$size':'$auc'}}}])))
        if dfcanvas.empty == True:
            dfcanvas=pd.DataFrame({'_id':[1,2,3,4,5,6,7,8,9,10,11,12],'canvas_CSY':[0,0,0,0,0,0,0,0,0,0,0,0]})
        else:
            dfcanvas
        dfcanvas.rename(columns = { '_id': 'Month'}, inplace = True)
        d = dict(enumerate(calendar.month_abbr))    # to convert monthnumber of dataframe into monthname
        dfcanvas['Month'] = dfcanvas['Month'].map(d)
        dfcanvas=dfcanvas.fillna(0)
        
        
        
        
        dfgoogle = DataFrame(list(collection.aggregate([
            {"$match":{
         '$and':testcommon_cond()['sub_master_cond']+[
          {"USER_ID._id":{"$in":db.user_master.distinct("_id",{"UTM_MEDIUM":{'$regex':'google', '$options':'i'}})}},
          {"USER_ID._id":{"$nin":db.user_master.distinct("_id",{"UTM_MEDIUM":{'$regex':'canvas', '$options':'i'}})}},
          {"USER_ID._id":{"$nin":db.user_master.distinct("_id",{"UTM_MEDIUM":{'$regex':'clever', '$options':'i'}})}},
          {"USER_ID._id":{"$nin":db.user_master.distinct("_id",{"UTM_MEDIUM":{'$regex':'schoology', '$options':'i'}})}},
            {'USER_ID.EMAIL_ID':{'$ne':''}},  
            {"MODIFIED_DATE":{"$gte": csy_first_date()}}]}},
           {'$group':{'_id':{'$month':'$MODIFIED_DATE'},'auc':{'$addToSet':'$USER_ID._id'}}},
           {'$project':{'_id':1,'google_CSY':{'$size':'$auc'}}}])))
        if dfgoogle.empty == True:
            dfgoogle=pd.DataFrame({'_id':[1,2,3,4,5,6,7,8,9,10,11,12],'google_CSY':[0,0,0,0,0,0,0,0,0,0,0,0]})
        else:
            dfgoogle
        dfgoogle.rename(columns = { '_id': 'Month'}, inplace = True)
        d = dict(enumerate(calendar.month_abbr))    # to convert monthnumber of dataframe into monthname
        dfgoogle['Month'] = dfgoogle['Month'].map(d)
        dfgoogle=dfgoogle.fillna(0)
        
        

        df4 = DataFrame(list(collection.aggregate([
            {"$match":{
         '$and':[{'USER_ID.ROLE_ID._id':ObjectId("5f155b8a3b6800007900da2b")},
        {"USER_ID._id":{"$nin":db.user_master.distinct("_id",{"UTM_MEDIUM":{'$regex':'google', '$options':'i'}})}},
       {"USER_ID._id":{"$nin":db.user_master.distinct("_id",{"UTM_MEDIUM":{'$regex':'canvas', '$options':'i'}})}},
        {"USER_ID._id":{"$nin":db.user_master.distinct("_id",{"UTM_MEDIUM":{'$regex':'clever', '$options':'i'}})}},
         {"USER_ID._id":{"$nin":db.user_master.distinct("_id",{"UTM_MEDIUM":{'$regex':'schoology', '$options':'i'}})}},              
            {'USER_ID.EMAIL_ID':{'$ne':''}},  
                  {"USER_ID.CREATED_DATE":{"$gte": datetime(2020,3,17)}},
            {"MODIFIED_DATE":{"$gte": csy_first_date()}}]}},
           {'$group':{'_id':{'$month':'$MODIFIED_DATE'},'auc':{'$addToSet':'$USER_ID._id'}}},
           {'$project':{'_id':1,'parents_CSY':{'$size':'$auc'}}}])))
        if df4.empty == True:
            df4=pd.DataFrame({'_id':[1,2,3,4,5,6,7,8,9,10,11,12],'parents_CSY':[0,0,0,0,0,0,0,0,0,0,0,0]})
        else:
            df4
        df4.rename(columns = { '_id': 'Month'}, inplace = True)
        d = dict(enumerate(calendar.month_abbr))    # to convert monthnumber of dataframe into monthname
        df4['Month'] = df4['Month'].map(d)
        # df2
        practice_LSY_lsy= pd.merge(df1, df0,on='Month', how='left')
        practice_LSY= pd.merge(practice_LSY_lsy, df2,on='Month', how='left')
        practice_CSY =pd.merge(practice_LSY, dfschoology, on='Month', how='left')
        practice_CSY =pd.merge(practice_CSY, dfclever, on='Month', how='left')
        practice_CSY =pd.merge(practice_CSY, dfcanvas, on='Month', how='left')
        practice_CSY =pd.merge(practice_CSY, dfgoogle, on='Month', how='left')
        practice_CSY =pd.merge(practice_CSY, df4, on='Month', how='left').fillna(0)

        mon=pd.DataFrame({'Month':[8,9,10,11,12,1,2,3,4,5,6,7]})
        d = dict(enumerate(calendar.month_abbr))
        mon['Month'] = mon['Month'].map(d)

        data=pd.merge(mon,practice_CSY,on='Month',how='left')
        Month=data['Month'].tolist()
        TOTAL_LSY=data['TOTAL_LSY'].tolist()
        TOTAL_LSYTOLSY=data['TOTAL_LSYTOLSY'].tolist()
        teacher_CSY=data['teacher_CSY'].tolist()
        parents_CSY=data['parents_CSY'].tolist()
        schoology_CSY=data['schoology_CSY'].tolist()
        clever_CSY=data['clever_CSY'].tolist()
        canvas_CSY=data['canvas_CSY'].tolist()
        google_CSY=data['google_CSY'].tolist()
        temp=[{'Month':Month,'curve':TOTAL_LSY,'curve_LYTOLY':TOTAL_LSYTOLSY,'bar':teacher_CSY},{'bar2':parents_CSY},
              {'bars':schoology_CSY},{'barc': clever_CSY},{'barcan': canvas_CSY},{'bargoogle': google_CSY}]
        return json.dumps(temp)


# active_trend_new_("Playback")

def practice___history___new___latest_refresh(charttype):    
    collection = db.audio_track_master_all
    collection2 = db.audio_track_master
    ########## FOR DF ###########################
    dateStr = str(LSY_Date().date())
    myDatetime = dateutil.parser.parse(dateStr)
    datestr1 = str(csy_first_date())
    myDatetime1 = dateutil.parser.parse(datestr1)
    ########### FOR DF1 ############################
    dateStr2 = str(csy_first_date().date())
    myDatetime2 = dateutil.parser.parse(dateStr2)
    ########################## FOR DF2 ###############
    dateStr3 = "2020-03-17T00:00:00.000Z"
    myDatetime3 = dateutil.parser.parse(dateStr3)
    ##################################
    ##################################
    dateStr4 = str(csy_first_date().date()+relativedelta(years=1)-relativedelta(days=1))
    myDatetime4 = dateutil.parser.parse(dateStr4)

    charttype=str(charttype).title()

    if charttype=='Practice':
        threshold=.5
        threshcond=[{'$match':{'Completion_Percentage':{'$gte':threshold}}}]
        ######################  USER PRACTICE 2019-2020(LSY) ############################################
        df1 = DataFrame(list(collection2.aggregate([
            {"$match":
            {"$and" :testcommon_cond()['sub_master_cond']+[{'USER_ID.EMAIL_ID':{'$ne':""}},
                                                           
                 {"USER_ID._id":{"$nin":db.user_master.distinct("_id",{"UTM_MEDIUM":{'$regex':'clever', '$options':'i'}})}},
                 {"USER_ID._id":{"$nin":db.user_master.distinct("_id",{"UTM_MEDIUM":{'$regex':'schoology', '$options':'i'}})}},
                {"USER_ID._id":{"$nin":db.user_master.distinct("_id",{"UTM_MEDIUM":{'$regex':'canvas', '$options':'i'}})}},
                {"USER_ID._id":{"$nin":db.user_master.distinct("_id",{"UTM_MEDIUM":{'$regex':'google', '$options':'i'}})}},
                                                           
                {"MODIFIED_DATE":{"$gte": myDatetime2}},
                {'USER_ID.ROLE_ID._id':{'$ne':ObjectId("5f155b8a3b6800007900da2b")}}]}},
        practice_cond_dictonary_list[0],
                    practice_cond_dictonary_list[1],
                     threshcond[0],

            {'$group':{'_id':{'day':{'$dayOfMonth':'$MODIFIED_DATE'}, 
                            'month':{'$month':'$MODIFIED_DATE'}},
                    'date':{'$first':'$MODIFIED_DATE'}, 
                    'Users_Practice_CSY':{'$sum':1}}},
            {'$project':{'_id':0, 'Practice_date':{"$dateToString":{"format":"%Y-%m-%d","date":'$date'}}, 
                        'Users_Practice_CSY':'$Users_Practice_CSY'}}, 
            {"$sort":{'Practice_date':1}}])))

        df2 = DataFrame(list(collection2.aggregate([{"$match":
            {"$and" :testcommon_cond()['sub_master_cond']+[
                {'USER_ID.EMAIL_ID':{'$ne':""}},
                                                                     
                 {"USER_ID._id":{"$nin":db.user_master.distinct("_id",{"UTM_MEDIUM":{'$regex':'clever', '$options':'i'}})}},
                 {"USER_ID._id":{"$nin":db.user_master.distinct("_id",{"UTM_MEDIUM":{'$regex':'schoology', '$options':'i'}})}},
                {"USER_ID._id":{"$nin":db.user_master.distinct("_id",{"UTM_MEDIUM":{'$regex':'canvas', '$options':'i'}})}},
                {"USER_ID._id":{"$nin":db.user_master.distinct("_id",{"UTM_MEDIUM":{'$regex':'google', '$options':'i'}})}},
                                        
                {"MODIFIED_DATE":{"$gte": myDatetime2}},
                {'USER_ID.ROLE_ID._id':{'$eq':ObjectId("5f155b8a3b6800007900da2b")}}]}},
                                                practice_cond_dictonary_list[0],
                            practice_cond_dictonary_list[1],
                             threshcond[0],

                {'$group':{'_id':{'day':{'$dayOfMonth':'$MODIFIED_DATE'}, 
                                    'month':{'$month':'$MODIFIED_DATE'}},
                            'date':{'$first':'$MODIFIED_DATE'}, 
                            'Parents_Practice_CSY':{'$sum':1}}},
                    {'$project':{'_id':0, 'Practice_date':{"$dateToString":{"format":"%Y-%m-%d","date":'$date'}}, 
                                'Parents_Practice_CSY':'$Parents_Practice_CSY'}}, 
                    {"$sort":{'Practice_date':1}}])))

        schoology = DataFrame(list(collection2.aggregate([
                    {"$match":
                    {"$and" :testcommon_cond()['sub_master_cond']+[
                            {'USER_ID.EMAIL_ID':{'$ne':""}},
                                                                                     
                 {"USER_ID._id":{"$nin":db.user_master.distinct("_id",{"UTM_MEDIUM":{'$regex':'clever', '$options':'i'}})}},
                 {"USER_ID._id":{"$in":db.user_master.distinct("_id",{"UTM_MEDIUM":{'$regex':'schoology', '$options':'i'}})}},
                {"USER_ID._id":{"$nin":db.user_master.distinct("_id",{"UTM_MEDIUM":{'$regex':'canvas', '$options':'i'}})}},
                {"USER_ID._id":{"$nin":db.user_master.distinct("_id",{"UTM_MEDIUM":{'$regex':'google', '$options':'i'}})}},
                                        
                            {"MODIFIED_DATE":{"$gte": myDatetime2}}
                        ]}},

        practice_cond_dictonary_list[0],
                            practice_cond_dictonary_list[1],
                             threshcond[0],

                    {'$group':{'_id':{'day':{'$dayOfMonth':'$MODIFIED_DATE'}, 
                                    'month':{'$month':'$MODIFIED_DATE'}},
                            'date':{'$first':'$MODIFIED_DATE'}, 
                            'Parents_Practice_CSY':{'$sum':1}}},
                    {'$project':{'_id':0, 'Practice_date':{"$dateToString":{"format":"%Y-%m-%d","date":'$date'}}, 
                                'Parents_Practice_CSY':'$Parents_Practice_CSY'}}, 
                    {"$sort":{'Practice_date':1}}])))
                       ########clever################################

        clever = DataFrame(list(collection2.aggregate([{"$match":
                    {"$and" :testcommon_cond()['sub_master_cond']+[
                            {'USER_ID.EMAIL_ID':{'$ne':""}},
                                                                           
                 {"USER_ID._id":{"$in":db.user_master.distinct("_id",{"UTM_MEDIUM":{'$regex':'clever', '$options':'i'}})}},
                 {"USER_ID._id":{"$nin":db.user_master.distinct("_id",{"UTM_MEDIUM":{'$regex':'schoology', '$options':'i'}})}},
                {"USER_ID._id":{"$nin":db.user_master.distinct("_id",{"UTM_MEDIUM":{'$regex':'canvas', '$options':'i'}})}},
                {"USER_ID._id":{"$nin":db.user_master.distinct("_id",{"UTM_MEDIUM":{'$regex':'google', '$options':'i'}})}},
                                        
                            {"MODIFIED_DATE":{"$gte": myDatetime2}}]}},
        practice_cond_dictonary_list[0],
                    practice_cond_dictonary_list[1],
                     threshcond[0],
            {'$group':{'_id':{'day':{'$dayOfMonth':'$MODIFIED_DATE'}, 
                            'month':{'$month':'$MODIFIED_DATE'}},
                    'date':{'$first':'$MODIFIED_DATE'}, 
                    'Parents_Practice_CSY':{'$sum':1}}},
            {'$project':{'_id':0, 'Practice_date':{"$dateToString":{"format":"%Y-%m-%d","date":'$date'}}, 
                        'Parents_Practice_CSY':'$Parents_Practice_CSY'}}, 
            {"$sort":{'Practice_date':1}}])))
        
        canvas = DataFrame(list(collection2.aggregate([{"$match":
                    {"$and" :testcommon_cond()['sub_master_cond']+[{'USER_ID.EMAIL_ID':{'$ne':""}},
                                                                                 
                 {"USER_ID._id":{"$nin":db.user_master.distinct("_id",{"UTM_MEDIUM":{'$regex':'clever', '$options':'i'}})}},
                 {"USER_ID._id":{"$nin":db.user_master.distinct("_id",{"UTM_MEDIUM":{'$regex':'schoology', '$options':'i'}})}},
                {"USER_ID._id":{"$in":db.user_master.distinct("_id",{"UTM_MEDIUM":{'$regex':'canvas', '$options':'i'}})}},
                {"USER_ID._id":{"$nin":db.user_master.distinct("_id",{"UTM_MEDIUM":{'$regex':'google', '$options':'i'}})}},
                                        
                            {"MODIFIED_DATE":{"$gte": myDatetime2}}]}},
        practice_cond_dictonary_list[0],
                    practice_cond_dictonary_list[1],
                     threshcond[0],
            {'$group':{'_id':{'day':{'$dayOfMonth':'$MODIFIED_DATE'}, 
                            'month':{'$month':'$MODIFIED_DATE'}},
                    'date':{'$first':'$MODIFIED_DATE'}, 
                    'Parents_Practice_CSY':{'$sum':1}}},
            {'$project':{'_id':0, 'Practice_date':{"$dateToString":{"format":"%Y-%m-%d","date":'$date'}}, 
                        'Parents_Practice_CSY':'$Parents_Practice_CSY'}}, 
            {"$sort":{'Practice_date':1}}])))
        
        
        
        google = DataFrame(list(collection2.aggregate([{"$match":
                    {"$and" :testcommon_cond()['sub_master_cond']+[{'USER_ID.EMAIL_ID':{'$ne':""}},
                                                                                 
                 {"USER_ID._id":{"$nin":db.user_master.distinct("_id",{"UTM_MEDIUM":{'$regex':'clever', '$options':'i'}})}},
                 {"USER_ID._id":{"$nin":db.user_master.distinct("_id",{"UTM_MEDIUM":{'$regex':'schoology', '$options':'i'}})}},
                {"USER_ID._id":{"$nin":db.user_master.distinct("_id",{"UTM_MEDIUM":{'$regex':'canvas', '$options':'i'}})}},
                {"USER_ID._id":{"$in":db.user_master.distinct("_id",{"UTM_MEDIUM":{'$regex':'google', '$options':'i'}})}},
                                        
                            {"MODIFIED_DATE":{"$gte": myDatetime2}}]}},
        practice_cond_dictonary_list[0],
                    practice_cond_dictonary_list[1],
                     threshcond[0],
            {'$group':{'_id':{'day':{'$dayOfMonth':'$MODIFIED_DATE'}, 
                            'month':{'$month':'$MODIFIED_DATE'}},
                    'date':{'$first':'$MODIFIED_DATE'}, 
                    'Parents_Practice_CSY':{'$sum':1}}},
            {'$project':{'_id':0, 'Practice_date':{"$dateToString":{"format":"%Y-%m-%d","date":'$date'}}, 
                        'Parents_Practice_CSY':'$Parents_Practice_CSY'}}, 
            {"$sort":{'Practice_date':1}}])))
        
        
        

        df3 = DataFrame(list(collection2.aggregate([{"$match":{'$and':
        testcommon_cond()['sub_master_cond']+[{'MODIFIED_DATE':{"$gte":myDatetime,"$lt": myDatetime1}}]}},
                        practice_cond_dictonary_list[0],
                            practice_cond_dictonary_list[1],
                             threshcond[0],
                    {'$group':{'_id':{'day':{'$dayOfMonth':'$MODIFIED_DATE'}, 
                                    'month':{'$month':'$MODIFIED_DATE'}},
                                'date':{'$first':'$MODIFIED_DATE'}, 
                                'Total_Practice_CSY':{'$sum':1}}},
                    {'$project':{'_id':0, 'Practice_date':{"$dateToString":{"format":"%Y-%m-%d","date":'$date'}}, 
                                'Total_Practice_LSY':'$Total_Practice_CSY'}}, 
                    {"$sort":{'Practice_date':1}}])))






        df_last_to_lsy = DataFrame(list(collection2.aggregate([{"$match":{'$and':testcommon_cond()['sub_master_cond']+[
                            {'MODIFIED_DATE':{"$gte":myDatetime-relativedelta(years=1),"$lt": myDatetime}}]}},
                        practice_cond_dictonary_list[0],
                            practice_cond_dictonary_list[1],
                             threshcond[0],
                    {'$group':{'_id':{'day':{'$dayOfMonth':'$MODIFIED_DATE'}, 
                                    'month':{'$month':'$MODIFIED_DATE'}},
                                'date':{'$first':'$MODIFIED_DATE'}, 
                                'Total_Practice_CSY':{'$sum':1}}},
                    {'$project':{'_id':0, 'Practice_date':{"$dateToString":{"format":"%Y-%m-%d","date":'$date'}}, 
                                'Total_Practice_LSY':'$Total_Practice_CSY'}}, 
                    {"$sort":{'Practice_date':1}}])))

        #user_CSY
        df1['Practice_date'] = pd.to_datetime(df1['Practice_date'])
        df5=df1.sort_values(by='Practice_date')
        #df5['Practice_date']=df5['Practice_date'].astype(np.int64)/int(1e6)
        #uscy=df5.values.tolist()
        df7=pd.date_range(start=str(csy_first_date().date()), end=str(csy_first_date().date()+relativedelta(years=1)-relativedelta(days=1)))
        df9 = pd.DataFrame(df7,columns = ["Practice_date"])
        df9['value'] = 0

        uscy1= df5.merge(df9, on="Practice_date", how='right').fillna(0).sort_values(by='Practice_date')
        uscy1['Practice_date']=uscy1['Practice_date'].astype(np.int64)/int(1e6)
        uscy=uscy1[["Practice_date","Users_Practice_CSY"]].values.tolist()

        #clever csy
        if 'Practice_date' in list(clever.columns):

            clever['Practice_date'] = pd.to_datetime(clever['Practice_date'])
            df6c=clever.sort_values(by='Practice_date')
        else:

            dates=pd.date_range(start=str(csy_first_date().date()), end=str(datetime.date.today()))
            clever=pd.DataFrame(dates,columns = ["Practice_date"])
            clever['Parents_Practice_CSY'] = 0
            df6c=clever.sort_values(by='Practice_date')
            
            
        #canvas csy
        if 'Practice_date' in list(canvas.columns):

            canvas['Practice_date'] = pd.to_datetime(canvas['Practice_date'])
            df6can=canvas.sort_values(by='Practice_date')
        else:

            dates=pd.date_range(start=str(csy_first_date().date()), end=str(datetime.date.today()))
            canvas=pd.DataFrame(dates,columns = ["Practice_date"])
            canvas['Parents_Practice_CSY'] = 0
            df6can=canvas.sort_values(by='Practice_date')
            
            
        #google csy
        if 'Practice_date' in list(google.columns):

            google['Practice_date'] = pd.to_datetime(google['Practice_date'])
            df6google=google.sort_values(by='Practice_date')
        else:

            dates=pd.date_range(start=str(csy_first_date().date()), end=str(datetime.date.today()))
            google=pd.DataFrame(dates,columns = ["Practice_date"])
            google['Parents_Practice_CSY'] = 0
            df6google=google.sort_values(by='Practice_date')
            
            
            



        #schoology csy

        if 'Practice_date' in list(schoology.columns):

            schoology['Practice_date'] = pd.to_datetime(schoology['Practice_date'])
            df6s=schoology.sort_values(by='Practice_date')
        else:

            dates=pd.date_range(start=str(csy_first_date().date()), end=str(datetime.date.today()))
            schoology=pd.DataFrame(dates,columns = ["Practice_date"])
            schoology['Parents_Practice_CSY'] = 0
            df6s=schoology.sort_values(by='Practice_date')




        #Parent_CSY
        df2['Practice_date'] = pd.to_datetime(df2['Practice_date'])
        df6=df2.sort_values(by='Practice_date')
        dfp=pd.date_range(start=str(csy_first_date().date()), end=str(csy_first_date().date()+relativedelta(years=1)-relativedelta(days=1)))
        dfp9 = pd.DataFrame(dfp,columns = ["Practice_date"])
        dfp9['value'] = 0

        pscy1= df6.merge(dfp9, on="Practice_date", how='right').fillna(0).sort_values(by='Practice_date')
        pscy1['Practice_date']=pscy1['Practice_date'].astype(np.int64)/int(1e6)
        pscy=pscy1[["Practice_date","Parents_Practice_CSY"]].values.tolist()


        ####clever
        ccsy1= df6c.merge(dfp9, on="Practice_date", how='right').fillna(0).sort_values(by='Practice_date')


        ccsy1['Practice_date']=ccsy1['Practice_date'].astype(np.int64)/int(1e6)
        ccsy=ccsy1[["Practice_date","Parents_Practice_CSY"]].values.tolist()
        
        ####canvas
        cancsy1= df6can.merge(dfp9, on="Practice_date", how='right').fillna(0).sort_values(by='Practice_date')


        cancsy1['Practice_date']=cancsy1['Practice_date'].astype(np.int64)/int(1e6)
        cancsy=cancsy1[["Practice_date","Parents_Practice_CSY"]].values.tolist()
        
        
        ####google
        googlecsy1= df6google.merge(dfp9, on="Practice_date", how='right').fillna(0).sort_values(by='Practice_date')

        googlecsy1['Practice_date']=googlecsy1['Practice_date'].astype(np.int64)/int(1e6)
        googlecsy=googlecsy1[["Practice_date","Parents_Practice_CSY"]].values.tolist()


        ####schoology
        scsy1= df6s.merge(dfp9, on="Practice_date", how='right').fillna(0).sort_values(by='Practice_date')
        scsy1['Practice_date']=scsy1['Practice_date'].astype(np.int64)/int(1e6)
        scsy=scsy1[["Practice_date","Parents_Practice_CSY"]].values.tolist()
        
        
        #practice_Lsy
        df3['Practice_date'] = pd.to_datetime(df3['Practice_date'])
        df4=df3.sort_values(by='Practice_date')
        dfl=pd.date_range(start=str(csy_first_date().date()-relativedelta(years=1)), end=str(csy_first_date().date()-relativedelta(days=1)))
        dfl9 = pd.DataFrame(dfl,columns = ["Practice_date"])
        dfl9['value'] = 0
        plcy1= df4.merge(dfl9, on="Practice_date", how='right').fillna(0).sort_values(by='Practice_date')
        plcy1['Practice_date']=plcy1['Practice_date'].astype(np.int64)/int(1e6)
        plcy=plcy1[["Practice_date","Total_Practice_LSY"]].values.tolist()

        #practice_Lsy_to_Lsy
        df_last_to_lsy['Practice_date'] = pd.to_datetime(df_last_to_lsy['Practice_date'])
        df44=df_last_to_lsy.sort_values(by='Practice_date')
        dfk=pd.date_range(start=str(myDatetime-relativedelta(years=1)), end=str(myDatetime-relativedelta(days=1)))
        dfk9 = pd.DataFrame(dfk,columns = ["Practice_date"])
        dfk9['value'] = 0
        plcy111= df44.merge(dfk9, on="Practice_date", how='right').fillna(0).sort_values(by='Practice_date')
        plcy111['Practice_date']=plcy111['Practice_date'].astype(np.int64)/int(1e6)
        plcy_lsy=plcy111[["Practice_date","Total_Practice_LSY"]].values.tolist()


        temp={'data':{'csy':uscy,'pcsy':pscy,'lsy':plcy,'lsy_to_lsy':plcy_lsy,'clever':ccsy,'schoology':scsy, 
                      'canvas': cancsy,'google': googlecsy}}
        
        
#         practice___history___new___latest
        client = MongoClient('mongodb://admin:test!_2o20@52.37.152.224:27017/')
        import timeago, datetime
        now = datetime.datetime.now() + datetime.timedelta(seconds = 60 * 3.4)
        x=now.strftime("%Y-%m-%d %H:%M:%S")
        update_date={"date":x}
        temp["update_date"]=update_date['date']
        mydb = client["compass"]
        mycol = mydb["cap_pipeline"]

        myquery = {"dashboard":"executive"}
        newvalues = { "$set": { "practice___history___new___latest."+charttype:temp} }

        mycol.update_one(myquery, newvalues)
        
        
        return json.dumps({"updated":"true","success":1})

    else:
                        ######################  USER PRACTICE 2019-2020(LSY) ############################################
        
        df1 = DataFrame(list(collection2.aggregate([
            {"$match":
            {"$and" :testcommon_cond()['sub_master_cond']+[{'USER_ID.EMAIL_ID':{'$ne':""}},
                                                                         
                 {"USER_ID._id":{"$nin":db.user_master.distinct("_id",{"UTM_MEDIUM":{'$regex':'clever', '$options':'i'}})}},
                 {"USER_ID._id":{"$nin":db.user_master.distinct("_id",{"UTM_MEDIUM":{'$regex':'schoology', '$options':'i'}})}},
                {"USER_ID._id":{"$nin":db.user_master.distinct("_id",{"UTM_MEDIUM":{'$regex':'canvas', '$options':'i'}})}},
                {"USER_ID._id":{"$nin":db.user_master.distinct("_id",{"UTM_MEDIUM":{'$regex':'google', '$options':'i'}})}},
                                        
                {"MODIFIED_DATE":{"$gte": myDatetime2}},
                {'USER_ID.ROLE_ID._id':{'$ne':ObjectId("5f155b8a3b6800007900da2b")}}]}},

            {'$group':{'_id':{'day':{'$dayOfMonth':'$MODIFIED_DATE'}, 
                            'month':{'$month':'$MODIFIED_DATE'}},
                    'date':{'$first':'$MODIFIED_DATE'}, 
                    'Users_Practice_CSY':{'$sum':1}}},
            {'$project':{'_id':0, 'Practice_date':{"$dateToString":{"format":"%Y-%m-%d","date":'$date'}}, 
                        'Users_Practice_CSY':'$Users_Practice_CSY'}}, 
            {"$sort":{'Practice_date':1}}])))

        df2 = DataFrame(list(collection2.aggregate([{"$match":
            {"$and" :testcommon_cond()['sub_master_cond']+[{'USER_ID.EMAIL_ID':{'$ne':""}},
                                                                         
                 {"USER_ID._id":{"$nin":db.user_master.distinct("_id",{"UTM_MEDIUM":{'$regex':'clever', '$options':'i'}})}},
                 {"USER_ID._id":{"$nin":db.user_master.distinct("_id",{"UTM_MEDIUM":{'$regex':'schoology', '$options':'i'}})}},
                {"USER_ID._id":{"$nin":db.user_master.distinct("_id",{"UTM_MEDIUM":{'$regex':'canvas', '$options':'i'}})}},
                {"USER_ID._id":{"$nin":db.user_master.distinct("_id",{"UTM_MEDIUM":{'$regex':'google', '$options':'i'}})}},
                                        
                {"MODIFIED_DATE":{"$gte": myDatetime2}},
                {'USER_ID.ROLE_ID._id':{'$eq':ObjectId("5f155b8a3b6800007900da2b")}}]}},

                {'$group':{'_id':{'day':{'$dayOfMonth':'$MODIFIED_DATE'}, 
                                    'month':{'$month':'$MODIFIED_DATE'}},
                            'date':{'$first':'$MODIFIED_DATE'}, 
                            'Parents_Practice_CSY':{'$sum':1}}},
                    {'$project':{'_id':0, 'Practice_date':{"$dateToString":{"format":"%Y-%m-%d","date":'$date'}}, 
                                'Parents_Practice_CSY':'$Parents_Practice_CSY'}}, 
                    {"$sort":{'Practice_date':1}}])))

        schoology = DataFrame(list(collection2.aggregate([
                    {"$match":
                    {"$and" :testcommon_cond()['sub_master_cond']+[{'USER_ID.EMAIL_ID':{'$ne':""}},
                                                                                      
                 {"USER_ID._id":{"$nin":db.user_master.distinct("_id",{"UTM_MEDIUM":{'$regex':'clever', '$options':'i'}})}},
                 {"USER_ID._id":{"$in":db.user_master.distinct("_id",{"UTM_MEDIUM":{'$regex':'schoology', '$options':'i'}})}},
                {"USER_ID._id":{"$nin":db.user_master.distinct("_id",{"UTM_MEDIUM":{'$regex':'canvas', '$options':'i'}})}},
                {"USER_ID._id":{"$nin":db.user_master.distinct("_id",{"UTM_MEDIUM":{'$regex':'google', '$options':'i'}})}},
                                        
                            {"MODIFIED_DATE":{"$gte": myDatetime2}}]}},
                    {'$group':{'_id':{'day':{'$dayOfMonth':'$MODIFIED_DATE'}, 
                                    'month':{'$month':'$MODIFIED_DATE'}},
                            'date':{'$first':'$MODIFIED_DATE'}, 
                            'Parents_Practice_CSY':{'$sum':1}}},
                    {'$project':{'_id':0, 'Practice_date':{"$dateToString":{"format":"%Y-%m-%d","date":'$date'}}, 
                                'Parents_Practice_CSY':'$Parents_Practice_CSY'}}, 
                    {"$sort":{'Practice_date':1}}])))
                                      ########clever################################

        clever = DataFrame(list(collection2.aggregate([{"$match":
                    {"$and" :testcommon_cond()['sub_master_cond']+[{'USER_ID.EMAIL_ID':{'$ne':""}},
                                                                                       
                 {"USER_ID._id":{"$in":db.user_master.distinct("_id",{"UTM_MEDIUM":{'$regex':'clever', '$options':'i'}})}},
                 {"USER_ID._id":{"$nin":db.user_master.distinct("_id",{"UTM_MEDIUM":{'$regex':'schoology', '$options':'i'}})}},
                {"USER_ID._id":{"$nin":db.user_master.distinct("_id",{"UTM_MEDIUM":{'$regex':'canvas', '$options':'i'}})}},
                {"USER_ID._id":{"$nin":db.user_master.distinct("_id",{"UTM_MEDIUM":{'$regex':'google', '$options':'i'}})}},
                                        
                            {"MODIFIED_DATE":{"$gte": myDatetime2}}]}},
            {'$group':{'_id':{'day':{'$dayOfMonth':'$MODIFIED_DATE'}, 
                            'month':{'$month':'$MODIFIED_DATE'}},
                    'date':{'$first':'$MODIFIED_DATE'}, 
                    'Parents_Practice_CSY':{'$sum':1}}},
            {'$project':{'_id':0, 'Practice_date':{"$dateToString":{"format":"%Y-%m-%d","date":'$date'}}, 
                        'Parents_Practice_CSY':'$Parents_Practice_CSY'}}, 
            {"$sort":{'Practice_date':1}}])))
        
        canvas = DataFrame(list(collection2.aggregate([{"$match":
                    {"$and" :testcommon_cond()['sub_master_cond']+[{'USER_ID.EMAIL_ID':{'$ne':""}},
                                                                                 
                 {"USER_ID._id":{"$nin":db.user_master.distinct("_id",{"UTM_MEDIUM":{'$regex':'clever', '$options':'i'}})}},
                 {"USER_ID._id":{"$nin":db.user_master.distinct("_id",{"UTM_MEDIUM":{'$regex':'schoology', '$options':'i'}})}},
                {"USER_ID._id":{"$in":db.user_master.distinct("_id",{"UTM_MEDIUM":{'$regex':'canvas', '$options':'i'}})}},
                {"USER_ID._id":{"$nin":db.user_master.distinct("_id",{"UTM_MEDIUM":{'$regex':'google', '$options':'i'}})}},
                                        
                            {"MODIFIED_DATE":{"$gte": myDatetime2}}]}},
            {'$group':{'_id':{'day':{'$dayOfMonth':'$MODIFIED_DATE'}, 
                            'month':{'$month':'$MODIFIED_DATE'}},
                    'date':{'$first':'$MODIFIED_DATE'}, 
                    'Parents_Practice_CSY':{'$sum':1}}},
            {'$project':{'_id':0, 'Practice_date':{"$dateToString":{"format":"%Y-%m-%d","date":'$date'}}, 
                        'Parents_Practice_CSY':'$Parents_Practice_CSY'}}, 
            {"$sort":{'Practice_date':1}}])))
        
        
        google = DataFrame(list(collection2.aggregate([{"$match":
                    {"$and" :testcommon_cond()['sub_master_cond']+[{'USER_ID.EMAIL_ID':{'$ne':""}},
                                                                                 
                 {"USER_ID._id":{"$nin":db.user_master.distinct("_id",{"UTM_MEDIUM":{'$regex':'clever', '$options':'i'}})}},
                 {"USER_ID._id":{"$nin":db.user_master.distinct("_id",{"UTM_MEDIUM":{'$regex':'schoology', '$options':'i'}})}},
                {"USER_ID._id":{"$nin":db.user_master.distinct("_id",{"UTM_MEDIUM":{'$regex':'canvas', '$options':'i'}})}},
                {"USER_ID._id":{"$in":db.user_master.distinct("_id",{"UTM_MEDIUM":{'$regex':'google', '$options':'i'}})}},
                                        
                            {"MODIFIED_DATE":{"$gte": myDatetime2}}]}},
            {'$group':{'_id':{'day':{'$dayOfMonth':'$MODIFIED_DATE'}, 
                            'month':{'$month':'$MODIFIED_DATE'}},
                    'date':{'$first':'$MODIFIED_DATE'}, 
                    'Parents_Practice_CSY':{'$sum':1}}},
            {'$project':{'_id':0, 'Practice_date':{"$dateToString":{"format":"%Y-%m-%d","date":'$date'}}, 
                        'Parents_Practice_CSY':'$Parents_Practice_CSY'}}, 
            {"$sort":{'Practice_date':1}}])))
        

        df3 = DataFrame(list(collection2.aggregate([{"$match":{'$and':testcommon_cond()['sub_master_cond']+
                    [{'MODIFIED_DATE':{"$gte":myDatetime,"$lt": myDatetime1}}]}},
                    {'$group':{'_id':{'day':{'$dayOfMonth':'$MODIFIED_DATE'}, 
                                    'month':{'$month':'$MODIFIED_DATE'}},
                                'date':{'$first':'$MODIFIED_DATE'}, 
                                'Total_Practice_CSY':{'$sum':1}}},
                    {'$project':{'_id':0, 'Practice_date':{"$dateToString":{"format":"%Y-%m-%d","date":'$date'}}, 
                                'Total_Practice_LSY':'$Total_Practice_CSY'}}, 
                    {"$sort":{'Practice_date':1}}])))


        df_last_to_lsy = DataFrame(list(collection2.aggregate([{"$match":{'$and':testcommon_cond()['sub_master_cond']+[
                            {'MODIFIED_DATE':{"$gte":myDatetime-relativedelta(years=1),"$lt": myDatetime}}]}},
                    {'$group':{'_id':{'day':{'$dayOfMonth':'$MODIFIED_DATE'}, 
                                    'month':{'$month':'$MODIFIED_DATE'}},
                                'date':{'$first':'$MODIFIED_DATE'}, 
                                'Total_Practice_CSY':{'$sum':1}}},
                    {'$project':{'_id':0, 'Practice_date':{"$dateToString":{"format":"%Y-%m-%d","date":'$date'}}, 
                                'Total_Practice_LSY':'$Total_Practice_CSY'}}, 
                    {"$sort":{'Practice_date':1}}])))


        #user_CSY
        df1['Practice_date'] = pd.to_datetime(df1['Practice_date'])


        df5=df1.sort_values(by='Practice_date')
        #df5['Practice_date']=df5['Practice_date'].astype(np.int64)/int(1e6)
        #uscy=df5.values.tolist()
        df7=pd.date_range(start=str(csy_first_date().date()), end=str(csy_first_date().date()+relativedelta(years=1)-relativedelta(days=1)))
        df9 = pd.DataFrame(df7,columns = ["Practice_date"])
        df9['value'] = 0

        uscy1= df5.merge(df9, on="Practice_date", how='right').fillna(0).sort_values(by='Practice_date')
        uscy1['Practice_date']=uscy1['Practice_date'].astype(np.int64)/int(1e6)
        uscy=uscy1[["Practice_date","Users_Practice_CSY"]].values.tolist()

        #clever csy
        if 'Practice_date' in list(clever.columns):

            clever['Practice_date'] = pd.to_datetime(clever['Practice_date'])
            df6c=clever.sort_values(by='Practice_date')
        else:

            dates=pd.date_range(start=str(csy_first_date().date()), end=str(datetime.date.today()))
            clever=pd.DataFrame(dates,columns = ["Practice_date"])
            clever['Parents_Practice_CSY'] = 0
            df6c=clever.sort_values(by='Practice_date')
            
            
        #canvas csy
        if 'Practice_date' in list(canvas.columns):

            canvas['Practice_date'] = pd.to_datetime(canvas['Practice_date'])
            df6can=canvas.sort_values(by='Practice_date')
        else:

            dates=pd.date_range(start=str(csy_first_date().date()), end=str(datetime.date.today()))
            canvas=pd.DataFrame(dates,columns = ["Practice_date"])
            canvas['Parents_Practice_CSY'] = 0
            df6can=canvas.sort_values(by='Practice_date')
            
            
            
         #google csy
        if 'Practice_date' in list(google.columns):

            google['Practice_date'] = pd.to_datetime(google['Practice_date'])
            df6google=google.sort_values(by='Practice_date')
        else:

            dates=pd.date_range(start=str(csy_first_date().date()), end=str(datetime.date.today()))
            google=pd.DataFrame(dates,columns = ["Practice_date"])
            google['Parents_Practice_CSY'] = 0
            df6google=google.sort_values(by='Practice_date')    
        

        #schoology csy

        if 'Practice_date' in list(schoology.columns):

            schoology['Practice_date'] = pd.to_datetime(schoology['Practice_date'])
            df6s=schoology.sort_values(by='Practice_date')
        else:

            dates=pd.date_range(start=str(csy_first_date().date()), end=str(datetime.date.today()))
            schoology=pd.DataFrame(dates,columns = ["Practice_date"])
            schoology['Parents_Practice_CSY'] = 0
            df6s=schoology.sort_values(by='Practice_date')

        #Parent_CSY
        df2['Practice_date'] = pd.to_datetime(df2['Practice_date'])
        df6=df2.sort_values(by='Practice_date')
        dfp=pd.date_range(start=str(csy_first_date().date()), end=str(csy_first_date().date()+relativedelta(years=1)-relativedelta(days=1)))
        dfp9 = pd.DataFrame(dfp,columns = ["Practice_date"])
        dfp9['value'] = 0

        pscy1= df6.merge(dfp9, on="Practice_date", how='right').fillna(0).sort_values(by='Practice_date')
        pscy1['Practice_date']=pscy1['Practice_date'].astype(np.int64)/int(1e6)
        pscy=pscy1[["Practice_date","Parents_Practice_CSY"]].values.tolist()


        ####clever
        ccsy1= df6c.merge(dfp9, on="Practice_date", how='right').fillna(0).sort_values(by='Practice_date')


        ccsy1['Practice_date']=ccsy1['Practice_date'].astype(np.int64)/int(1e6)
        ccsy=ccsy1[["Practice_date","Parents_Practice_CSY"]].values.tolist()
        
        ####canvas
        cancsy1= df6can.merge(dfp9, on="Practice_date", how='right').fillna(0).sort_values(by='Practice_date')


        cancsy1['Practice_date']=cancsy1['Practice_date'].astype(np.int64)/int(1e6)
        cancsy=cancsy1[["Practice_date","Parents_Practice_CSY"]].values.tolist()
        
        
        
        ####google
        googlecsy1= df6google.merge(dfp9, on="Practice_date", how='right').fillna(0).sort_values(by='Practice_date')


        googlecsy1['Practice_date']=googlecsy1['Practice_date'].astype(np.int64)/int(1e6)
        googlecsy=googlecsy1[["Practice_date","Parents_Practice_CSY"]].values.tolist()


        ####schoology
        scsy1= df6s.merge(dfp9, on="Practice_date", how='right').fillna(0).sort_values(by='Practice_date')
        scsy1['Practice_date']=scsy1['Practice_date'].astype(np.int64)/int(1e6)
        scsy=scsy1[["Practice_date","Parents_Practice_CSY"]].values.tolist()
        
        
        #practice_Lsy
        df3['Practice_date'] = pd.to_datetime(df3['Practice_date'])
        df4=df3.sort_values(by='Practice_date')
        dfl=pd.date_range(start=str(csy_first_date().date()-relativedelta(years=1)), end=str(csy_first_date().date()-relativedelta(days=1)))
        dfl9 = pd.DataFrame(dfl,columns = ["Practice_date"])
        dfl9['value'] = 0
        plcy1= df4.merge(dfl9, on="Practice_date", how='right').fillna(0).sort_values(by='Practice_date')
        plcy1['Practice_date']=plcy1['Practice_date'].astype(np.int64)/int(1e6)
        plcy=plcy1[["Practice_date","Total_Practice_LSY"]].values.tolist()

        #practice_Lsy_to_Lsy
        df_last_to_lsy['Practice_date'] = pd.to_datetime(df_last_to_lsy['Practice_date'])
        df44=df_last_to_lsy.sort_values(by='Practice_date')
        dfk=pd.date_range(start=str(myDatetime-relativedelta(years=1)), end=str(myDatetime-relativedelta(days=1)))
        dfk9 = pd.DataFrame(dfk,columns = ["Practice_date"])
        dfk9['value'] = 0
        plcy111= df44.merge(dfk9, on="Practice_date", how='right').fillna(0).sort_values(by='Practice_date')
        plcy111['Practice_date']=plcy111['Practice_date'].astype(np.int64)/int(1e6)
        plcy_lsy=plcy111[["Practice_date","Total_Practice_LSY"]].values.tolist()

        temp={'data':{'csy':uscy,'pcsy':pscy,'lsy':plcy,'lsy_to_lsy':plcy_lsy,'clever':ccsy,'schoology':scsy, 
                      'canvas': cancsy,'google': googlecsy}}
        
        client = MongoClient('mongodb://admin:test!_2o20@52.37.152.224:27017/')
        import timeago, datetime
        now = datetime.datetime.now() + datetime.timedelta(seconds = 60 * 3.4)
        x=now.strftime("%Y-%m-%d %H:%M:%S")
        update_date={"date":x}
        temp["update_date"]=update_date['date']
        mydb = client["compass"]
        mycol = mydb["cap_pipeline"]

        myquery = {"dashboard":"executive"}
        newvalues = { "$set": { "practice___history___new___latest."+charttype:temp} }

        mycol.update_one(myquery, newvalues)
        
        
        return json.dumps({"updated":"true","success":1})

    

def practice___history___new___latest(charttype):
    charttype=charttype.capitalize() 
    client_test = MongoClient('mongodb://admin:test!_2o20@52.37.152.224:27017/')
    db_test=client_test.compass
    data=list(db_test.cap_pipeline.aggregate([
    {"$match":
     {'$and':[
            {'dashboard':"executive"},
                      ]}},
    {'$project':{'_id':0, 'practice___history___new___latest.'+charttype:1}}

    ]))

    now = datetime.datetime.now() + datetime.timedelta(seconds = 60 * 3.4)
    x=now.strftime("%Y-%m-%d %H:%M:%S")    
    dd=timeago.format(data[0]['practice___history___new___latest'][charttype]['update_date'],x)
    data[0]['practice___history___new___latest'][charttype]['update']="Updated "+dd
    return json.dumps(data[0]['practice___history___new___latest'][charttype])
    


    
# practice___history___new___latest("Playback")



def average_trend_new_refresh():
    collection = db.audio_track_master
    df0 = DataFrame(list(collection.aggregate([
        {"$match":{
     '$and':testcommon_cond()['sub_master_cond']+
            [{"MODIFIED_DATE":{"$gte": LSYTOLSY_Date(),"$lt":LSY_Date()}}]}},
       {'$group':{'_id':{'$month':"$MODIFIED_DATE"},
    'TOTAL_USERS_PRACTICING':{'$sum':1},
    'UNIQUE_USERS_PRACTICING':{'$addToSet':'$USER_ID._id'}
     }}, 
     {'$project':{'_id':1, 'TOTAL_USERS_PRACTICING':'$TOTAL_USERS_PRACTICING', 'UNIQUE_USERS_PRACTICING':{'$size':'$UNIQUE_USERS_PRACTICING'}}}, 
     {'$sort':{'_id':1}},
    { "$project": { "TOTAL_LSYTOLSY": {"$round":[{ "$divide": ["$TOTAL_USERS_PRACTICING", "$UNIQUE_USERS_PRACTICING"] },2 ]} } }
    ])))
    df0.rename(columns = { '_id': 'Month'}, inplace = True)
    d = dict(enumerate(calendar.month_abbr))    # to convert monthnumber of dataframe into monthname
    df0['Month'] = df0['Month'].map(d) 


    df1 = DataFrame(list(collection.aggregate([
        {"$match":{
     '$and':testcommon_cond()['sub_master_cond']+[{"MODIFIED_DATE":{"$gte": LSY_Date(),
                                        "$lt":csy_first_date()}}]}},
       {'$group':{'_id':{'$month':"$MODIFIED_DATE"},
    'TOTAL_USERS_PRACTICING':{'$sum':1},
    'UNIQUE_USERS_PRACTICING':{'$addToSet':'$USER_ID._id'}
     }}, 
     {'$project':{'_id':1, 'TOTAL_USERS_PRACTICING':'$TOTAL_USERS_PRACTICING', 'UNIQUE_USERS_PRACTICING':{'$size':'$UNIQUE_USERS_PRACTICING'}}}, 
     {'$sort':{'_id':1}},
    { "$project": { "TOTAL_LSY": {"$round":[{ "$divide": ["$TOTAL_USERS_PRACTICING", "$UNIQUE_USERS_PRACTICING"] },2 ]} } }
    ])))
    df1.rename(columns = { '_id': 'Month'}, inplace = True)
    d = dict(enumerate(calendar.month_abbr))    # to convert monthnumber of dataframe into monthname
    df1['Month'] = df1['Month'].map(d)
#     print('LSY:', LSY_Date)
#     print('CSY',csy_first_date())
    # print(df1)
    df2 = DataFrame(list(collection.aggregate([
        {"$match":{
     '$and':testcommon_cond()['sub_master_cond']+[{'USER_ID.EMAIL_ID':{'$ne':''}},  
        {"MODIFIED_DATE":{"$gte": csy_first_date()}}]}},
       {'$group':{'_id':{'$month':"$MODIFIED_DATE"},
    'TOTAL_USERS_PRACTICING':{'$sum':1},
    'UNIQUE_USERS_PRACTICING':{'$addToSet':'$USER_ID._id'}
     }}, 
     {'$project':{'_id':1, 'TOTAL_USERS_PRACTICING':'$TOTAL_USERS_PRACTICING', 'UNIQUE_USERS_PRACTICING':{'$size':'$UNIQUE_USERS_PRACTICING'}}}, 
     {'$sort':{'_id':1}},
    { "$project": { "teacher_CSY": {"$round":[{ "$divide": ["$TOTAL_USERS_PRACTICING", "$UNIQUE_USERS_PRACTICING"] },2 ]} } }
    ])))
    if df2.empty == True:
        df2=pd.DataFrame({'_id':[1,2,3,4,5,6,7,8,9,10,11,12],'teacher_CSY':[0,0,0,0,0,0,0,0,0,0,0,0]})
    else:
        df2
    df2.rename(columns = { '_id': 'Month'}, inplace = True)
    d = dict(enumerate(calendar.month_abbr))    # to convert monthnumber of dataframe into monthname
    df2['Month'] = df2['Month'].map(d)
 
    practice_LSY_lsy= pd.merge(df1, df0,on='Month', how='left')
    practice_CSY= pd.merge(practice_LSY_lsy, df2,on='Month', how='left')

    mon=pd.DataFrame({'Month':[8,9,10,11,12,1,2,3,4,5,6,7]})
    d = dict(enumerate(calendar.month_abbr))
    mon['Month'] = mon['Month'].map(d)

    data=pd.merge(mon,practice_CSY,on='Month',how='left').fillna(0)
    Month=data['Month'].tolist()
    TOTAL_LSY=data['TOTAL_LSY'].tolist()
    TOTAL_LSYTOLSY=data['TOTAL_LSYTOLSY'].tolist()
    teacher_CSY=data['teacher_CSY'].tolist()
   
    temp=[{'Month':Month,'curve':TOTAL_LSY,'curve_LYTOLY':TOTAL_LSYTOLSY,'bar':teacher_CSY}]
    
    client = MongoClient('mongodb://admin:test!_2o20@52.37.152.224:27017/')
    import timeago, datetime
    now = datetime.datetime.now() + datetime.timedelta(seconds = 60 * 3.4)
    x=now.strftime("%Y-%m-%d %H:%M:%S")
    update_date={"date":x}
    temp[0]["update_date"]=update_date['date']
    mydb = client["compass"]
    mycol = mydb["cap_pipeline"]
    
    myquery = {"dashboard":"executive"}
    newvalues = { "$set": { "average_trend_new":temp} }

    mycol.update_one(myquery, newvalues)
    
    
    

    return json.dumps({"success":1,"updated":"True"})



def average_trend_new_():
    client_test = MongoClient('mongodb://admin:test!_2o20@52.37.152.224:27017/')
    db_test=client_test.compass
#     db_test.cap_pipeline('schoolId._id',{'$and':testcommon_cond()['usermaster_cond']+    
#     [{ "schoolId._id":{'$exists': True}}]})
    
    data=list(db_test.cap_pipeline.aggregate([
    {"$match":
     {'$and':[
            {'dashboard':"executive"},
                      ]}},
    {'$project':{'_id':0, 'average_trend_new':1}}

    ]))
#     print(data)
    now = datetime.datetime.now() + datetime.timedelta(seconds = 60 * 3.4)
    x=now.strftime("%Y-%m-%d %H:%M:%S")
#     print(x)
    
    dd=timeago.format(data[0]['average_trend_new'][0]['update_date'],x)
    data[0]['average_trend_new'][0]['update']="Updated "+dd
    return json.dumps(data[0]['average_trend_new'])

def topdistrict_playback_refresh():
    from datetime import datetime
    DF1=DataFrame(list(db.school_master.aggregate([
        {"$match":
         {
            '$and':[
            {'CATEGORY' :{'$exists':True}},
               {'CATEGORY' :{'$ne':"Null"}},  
                  {'CATEGORY' :{'$ne':None}}, 
             ]

         }},
        {'$project':{'school':'$_id','_id':0,'CATEGORY':'$CATEGORY'}}

        ])))
    school=DF1['school'].tolist()
    DF2=DataFrame(list(db.user_master.aggregate([
        {"$match":
         {
            '$and':testcommon_cond()['sub_master_cond']+[{'EMAIL_ID':{'$ne':''}},
                {'schoolId._id':{'$in':school}},
                 {'schoolId._id':{'$in':db.school_master.distinct('_id', {'CATEGORY':{'$ne':"Null"}})}},

    #              {'EMAIL_ID':{'$nin':['north5special@gmail.com','north4prek@gmail.com',
    #                                         'north1high@gmail.com',
    #                                         'north3ele@gmail.com',
    #                                         'north4prek@gmail.com',
    #                                         'north2middle@gmail.com']}},
                ]

         }},
        {'$project':{'_id':'$_id','school':'$schoolId._id' }}
        ])))

    user=DF2['_id'].tolist() 
    df=pd.merge(DF1,DF2, on='school', how='right')
    DF3=DataFrame(list(db.audio_track_master.aggregate(
    [{"$match":{"$and":[
    # // #              {'USER_ID.ROLE_ID._id' :{'$eq':ObjectId("5f155b8a3b6800007900da2b")}},

                    {'USER_ID._id':{'$in':user}},
          {"MODIFIED_DATE":{"$gte": csy_first_date()}}

                ]
         }},


                    {'$group':{'_id':'$USER_ID._id','complete practice':{'$sum':1}}}


         ])))
    df2=pd.merge(df,DF3, on='_id', how='left').fillna(0)

    dff=df2.groupby(['CATEGORY']).sum()
    dff=dff.drop('NULL').reset_index()
    dfff=dff.sort_values('complete practice',ascending=False)
    dfff=dfff.head(20)

    District=dfff['CATEGORY'].tolist()
    Playbacks=dfff['complete practice'].tolist()

    data={'District':District,'Playbacks':Playbacks}
    
    client = MongoClient('mongodb://admin:test!_2o20@52.37.152.224:27017/')
    import timeago, datetime
    now = datetime.datetime.now() + datetime.timedelta(seconds = 60 * 3.4)
    x=now.strftime("%Y-%m-%d %H:%M:%S")
    update_date={"date":x}
    data["update_date"]=update_date['date']
    mydb = client["compass"]
    mycol = mydb["cap_pipeline"]
    
    myquery = {"dashboard":"executive"}
    newvalues = { "$set": { "topdistrict_playback":data} }

    mycol.update_one(myquery, newvalues)
    
    
    
    
    return json.dumps({"success":1,"updated":"True"})


def topdistrict_playback():
    client_test = MongoClient('mongodb://admin:test!_2o20@52.37.152.224:27017/')
    db_test=client_test.compass
#     db_test.cap_pipeline('schoolId._id',{'$and':testcommon_cond()['usermaster_cond']+    
#     [{ "schoolId._id":{'$exists': True}}]})
    
    data=list(db_test.cap_pipeline.aggregate([
    {"$match":
     {'$and':[
            {'dashboard':"executive"},
                      ]}},
    {'$project':{'_id':0, 'topdistrict_playback':1}}

    ]))
#     print(data)
    now = datetime.datetime.now() + datetime.timedelta(seconds = 60 * 3.4)
    x=now.strftime("%Y-%m-%d %H:%M:%S")
#     print(x)
    
    dd=timeago.format(data[0]['topdistrict_playback']['update_date'],x)
    data[0]['topdistrict_playback']['update']="Updated "+dd
    return json.dumps(data[0]['topdistrict_playback'])

def schoolrating_csy():
    collection = db.audio_feedback
    df1=DataFrame(list(db.user_master.aggregate([
        {"$match":
         {'$and':testcommon_cond()['usermaster_cond']+[{'EMAIL_ID':{'$ne':''}}]}},
        {'$project':{'_id':'$_id','school':'$schoolId._id' }}
        ])))

    user=df1['_id'].tolist() 
    
    df = DataFrame(list(collection.aggregate([
     {"$match":{'$and':[
         
           {'USER._id':{'$in':user}},
      
        {'RATING':{'$ne':0}},
        {'MODIFIED_DATE':{'$gte':csy_first_date()}}]}},
        
    {'$group':{'_id':'$RATING' ,'count':{'$sum':1}}},
           {'$sort':{'_id':-1}}
        
    ])))
    rating=df['_id'].tolist()
    count=df['count'].tolist()

    temp={'rating':rating,'count':count}
    return json.dumps(temp)

def sentiment_pie():    
    df=pd.read_json(r"/root/"+'sentiment_json_data.json')
    neg=df[df['Final_Sentiment']=='Negative']
    pos=df[df['Final_Sentiment']=='Positive']
    neg_sentiment=round(len(neg)/len(df),2)*100
    pos_sentiment=round(len(pos)/len(df),2)*100
    neu_sentiment=0
    word_chart={'donut':{'pos':pos_sentiment,'neg':neg_sentiment,'neu':neu_sentiment}}
    return json.dumps(word_chart)


def sentiment_pie2():
    clean_list=[]
    news_headlines_senti = []
    news_headlines_dict = {}
    pnews_headlines=0
    nnews_headlines=0
    nenews_headlines = 0
    # date1=startdate
    # date2=enddate
    today = date.today()
    d1 = today.strftime("%Y-%m-%d")
    # myDatetimestrt = dateutil.parser.parse(date1)
    # myDatetimeend = dateutil.parser.parse(date2)
    username = urllib.parse.quote_plus('admin')
    password = urllib.parse.quote_plus('F5tMazRj47cYqm33e')
    client = MongoClient("mongodb://%s:%s@35.88.43.45:27017/" % (username, password))
    db=client.compass
    collection = db.audio_feedback

#     myDatetime1 = dateutil.parser.parse(startdate)
#     myDatetime2 = dateutil.parser.parse(enddate)

    df1=DataFrame(list(db.user_master.aggregate([
        {"$match":
         {
            '$and':testcommon_cond()['usermaster_cond']+[{'EMAIL_ID':{'$ne':''}}]
         }},
        {'$project':{'_id':'$_id','school':'$schoolId._id' }}
        ])))

    userid=df1['_id'].tolist() 
    x=['NA','N/A','n.a','.\n',"a\\n","a\n","v\n","v\\n","0-",'na\n','na','Write a feedback (optional)','Na','k,n/l','[pppppppppppsz']
    user=[
    {"$match":{'$and':[ {'USER._id':{'$in':userid}},
                    {'COMMENT':{'$exists':1}},
                       {'COMMENT':{'$ne':''}},
                       {'COMMENT':{'$ne':None}},
                        {'COMMENT':{'$nin':x}},
                       
    #         {'RATING':{'$ne':0}},
         {'MODIFIED_DATE':{"$gte":csy_first_date()}}
                         ,
                        ]}},
    { "$project": { "USER_ID": "$USER._id", "USER_NAME": "$USER.USER_NAME","_id":0, "EMAIL": "$USER.EMAIL_ID", "RATING":1,
    "LAST_COMMENT_DATE": "$MODIFIED_DATE", "AUDIO_NAME": "$AUDIO_ID.AUDIO_NAME", "NARRATOR_NAME": "$AUDIO_ID.NARRATEDBY",
    "COMMENT":1, "PROGRAM_NAME": "$AUDIO_ID.PROGRAM_ID.PROGRAM_NAME"}}
    ]
    update=list(collection.aggregate(user))
    df=pd.DataFrame(update).fillna("no info")
    text=df["COMMENT"].to_list()
    df=df[['COMMENT']]
    df = df.sample(frac=1.0).reset_index(drop=True)
    for i in df['COMMENT'].tolist():
        df = df[df.COMMENT.str.len()!=1] 
    
    import nltk
    nltk.download('vader_lexicon')

    from nltk.sentiment.vader import SentimentIntensityAnalyzer
    sia = SentimentIntensityAnalyzer()
    df['Positivity'] = df['COMMENT'].apply(lambda x: sia.polarity_scores(x)['pos'])
    df['Negativity'] = df['COMMENT'].apply(lambda x: sia.polarity_scores(x)['neg'])
    df['Neutrality'] = df['COMMENT'].apply(lambda x: sia.polarity_scores(x)['neu'])
    df['Compound'] = df['COMMENT'].apply(lambda x: sia.polarity_scores(x)['compound'])
    pd.pandas.set_option('display.max_rows',None)  
    df.to_csv('sentopt.csv')
    
    neg=df[df['Compound']<0]
    pos=df[df['Compound']>0]
    neu=df[df['Compound']==0]
    neg_sentiment=round(100*(len(neg)/(len(neu)+len(neg)+len(pos))),2)
    pos_sentiment=round(100*(len(pos)/(len(neu)+len(neg)+len(pos))),2)
    neu_sentiment=round(100*(len(neu)/(len(neu)+len(neg)+len(pos))),2)
    word_chart={'donut':{'pos':pos_sentiment,'neg':neg_sentiment,'neu':neu_sentiment}}
#     word_chart={"donut":{"pos":round(pos, 2),"neg":round(neg, 2)}}
    return json.dumps(word_chart)



# <<<<<<<<---------sentiment_json_data.json file update code---------------->>>>>>>>>>>>>>


def sentimentfile_update():    
    tfidf_vec=pickle.load(open(r'C:\Users\anil\Desktop\Advance_analytics\App_Reviews\tfidf_vec.pkl','rb'))
    sentiment_model=pickle.load(open(r"C:\Users\anil\Desktop\Advance_analytics\App_Reviews\sentiment_model.pkl",'rb'))
    data=pd.read_json(r'C:\Users\anil\Desktop\Advance_analytics\App_Reviews\sentiment_json_data.json')
    client_live= MongoClient('mongodb://admin:F5tMazRj47cYqm33e@54.202.61.130:27017/')
    db_live=client_live.compass
    max_date=max(data['COMMENT_DATE'])
    def detectlanguage(val):        
        try:
            lang=detect(val)
        except:
            lang='none'
        return lang
    new_comments_data=pd.DataFrame(list(db_live.audio_feedback.aggregate([{"$match":{'$and':[
                    { 'USER.USER_NAME':{"$not":{"$regex":"test",'$options':'i'}}},
                    {'USER.EMAIL_ID':{"$not":{"$regex":"test",'$options':'i'}}},
                    {'USER.EMAIL_ID':{"$not":{"$regex":"1gen",'$options':'i'}}},
                    {'USER.INCOMPLETE_SIGNUP':{"$ne":'Y'}},                
                    {'USER.IS_DISABLED':{"$ne":'Y'}},
                {'COMMENT':{'$nin':['',' ',None,"NULL",'N/A','n/a','null','n/A','N/a','.',',','',' ','Write a feedback (optional)']}},
        {'MODIFIED_DATE':{'$gt':dateutil.parser.parse(str(max_date))}}
                    ]}},
               {'$project':{
                   '_id':0,
                   'USER':'$USER._id',
                   'EMAIL_ID':'$USER.EMAIL_ID',
                   'SCHOOL_ID':'$USER.schoolId._id',
                   'SCHOOL_NAME':'$USER.schoolId.NAME',
                   'STATE':'$USER.schoolId.STATE',
                   'COMMENT':'$COMMENT',
                   'MOOD':'$MOOD_CARD',
                   'RATING':'$RATING',
                   'COMMENT_DATE':'$MODIFIED_DATE',
                   'AUDIO_NAME':'$AUDIO_ID.AUDIO_NAME',
                   'AUDIO_DAY':'$AUDIO_ID.AUDIO_DAY',
                   'NARRATOR':'$AUDIO_ID.NARRATEDBY'
                   }} 
                    ])))
    if new_comments_data.empty:
        print("empty")
        pass
    else:
        new_comments_data['Language_Detected']=[detectlanguage(i) for i in new_comments_data['COMMENT']]
        new_comments_data=new_comments_data[new_comments_data['Language_Detected']!='none'].reset_index(drop=True)
        translated_comments=[]
        for i in range(len(new_comments_data)):
            if new_comments_data['Language_Detected'][i]=='en':
                translated_comments.append(new_comments_data['COMMENT'][i])
            else:
                ts=GoogleTranslator(source='auto', target='en').translate(new_comments_data['COMMENT'][i])
                translated_comments.append(ts)
        new_comments_data['Translated_Eng']=translated_comments
        #clean the data
        no_use_words=list(STOPWORDS)+list(string.ascii_lowercase)
        no_use_words.remove('not')
        # no_use_words.remove('no')
        stop = set(no_use_words)
        exclude = list(set(string.punctuation))
        spec_chars = ["!",'"',"#","%","&","'","(",")",
                                    "*","+",",","-",".","/",":",";","<",
                                    "=",">","?","@","[","\\","]","^","_",
                                    "`","{","|","}","~","–","\n","'"]
        exclude=exclude+spec_chars
        exclude=set(exclude)
        lemma = WordNetLemmatizer()
        def first_round_cleaning(text):
            new_text=text.lower()
            new_text = re.sub(r'[^\w\s]',' ',new_text)
            new_text=new_text.strip()
            new_text= re.sub('[''""…]', '', new_text)
            new_text = re.sub('\n', '', new_text)
            new_text = re.sub('[%s]' % re.escape(string.punctuation), '', new_text)
            new_text=re.sub(r'\d+', '',new_text)
            new_text=" ".join(new_text.split())
            return new_text
        def round_2_cleaning(text):
            new_text=word_tokenize(text)
            new_text=[word for word in new_text if word not in stop]
            new_text=[word for word in new_text if word not in exclude]
            new_text=new_text=[lemma.lemmatize(word) for word in new_text]
            new_text=" ".join(new_text)
            return new_text
        def extra_char_removal(text):
        #     new_text=text.lower()
            new_text = re.sub(r'[^\w\s]',' ',text)
            new_text=new_text.replace(","," ")
            new_text=new_text.strip()
            new_text= re.sub('[''""…]', '', new_text)
            new_text = re.sub('\n', '', new_text)
            new_text = re.sub('[%s]' % re.escape(string.punctuation), '', new_text)
            new_text=re.sub(r'\d+', '',new_text)
            new_text=" ".join(new_text.split())
            return new_text
        new_comments_data['R1_Cleaned_Comments']=new_comments_data['Translated_Eng'].apply(first_round_cleaning)
        new_comments_data['R2_Cleaned_Comments']=new_comments_data['R1_Cleaned_Comments'].apply(round_2_cleaning)
        new_comments_data['Cleaned_Comments']=new_comments_data['R2_Cleaned_Comments'].apply(extra_char_removal)
        new_comments_data=new_comments_data[new_comments_data['R2_Cleaned_Comments']!=''].reset_index(drop=True)
        new_comments_data['Final_Sentiment']=sentiment_model.predict(tfidf_vec.transform(new_comments_data['Cleaned_Comments']))
        new_comments_data['Final_Sentiment']=sentiment_model.predict(tfidf_vec.transform(new_comments_data['Cleaned_Comments']))
        new_comments_data.fillna('',inplace=True)
        new_comments_data_final=new_comments_data[['USER', 'EMAIL_ID', 'SCHOOL_ID', 'SCHOOL_NAME', 'STATE', 'COMMENT',
               'RATING', 'COMMENT_DATE','Final_Sentiment']]
        new_comments_data_final['COMMENT_ISO_DATE']=[i.isoformat() + 'Z' for i in new_comments_data_final['COMMENT_DATE']]
        new_comments_data_final['COMMENT_ISO_DATE']=[i.isoformat() + 'Z' for i in new_comments_data_final['COMMENT_DATE']]
        new_comments_data_final.drop(columns=['COMMENT_DATE'],inplace=True)
        new_comments_data_final.rename(columns={'COMMENT_ISO_DATE':'COMMENT_DATE'},inplace=True)
        updated_data=data.append(new_comments_data_final,ignore_index=True)   
#         with open('sentiment_json_data.json', "w") as file:
#             json.dump(updated_data, file, indent=4)
        updated_data.to_json("sentiment_json_data.json",default_handler=str, orient = 'records',date_format='iso')
        return {'Status':"File updated"}