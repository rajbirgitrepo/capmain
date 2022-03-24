
import pymongo
from pymongo import MongoClient
import urllib.parse
from bson.objectid import ObjectId
import pandas as pd
import datetime
from pandas import DataFrame
username = urllib.parse.quote_plus('admin')
password = urllib.parse.quote_plus('F5tMazRj47cYqm33e')
client = MongoClient("mongodb://%s:%s@52.41.36.115:27017/" % (username, password))
db=client.compass
print(db)

collection3= db.user_master
qrC=[
{"$match":
{"$and":[
{'IS_DISABLED':{"$ne":'Y'}}, {'INCOMPLETE_SIGNUP':{"$ne":'Y'}},
]}},
{"$match": {"$and":[{'USER_NAME':{"$not":{"$regex":"Test",'$options':'i'}}},
{'USER_NAME':{"$not":{"$regex":'1gen','$options':'i'}}}, 
{'EMAIL_ID':{"$not":{"$regex":'test','$options':'i'}}}, {'EMAIL_ID':{'$not':{'$regex':'1gen', '$options':'i'}}},

{'ROLE_ID._id':{'$eq':ObjectId("5f155b8a3b6800007900da2b")}},
{'CREATED_DATE':{'$gte':datetime.datetime(2020,3,17)}}
]}},

{'$project':{'_id':1, 'SCHOOL_NAME':'$schoolId.NAME', 'PARENTS_NAME':'$USER_NAME', 'PARENTS_EMAIL':'$EMAIL_ID',
    'state':'$schoolId.STATE', 'CITY':'$schoolId.CITY', 'country':'$schoolId.COUNTRY', 
        'USER_TYPE':'$USER_TYPE','ip_address':'$IP_ADDRESS', 'CONTACT_NUMBER':'$CONTACT_NUMBER',
    'SIGNUP_DATE':"$CREATED_DATE"
    }}
]


list2=list(collection3.aggregate(qrC))
df_atma= DataFrame(list2)
print(df_atma)