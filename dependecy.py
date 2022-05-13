# !/usr/bin/env python
# coding: utf-8

# In[ ]:
#checking
from flask import (
    Flask,
    g,
    redirect,
    render_template,
    flash,
    request,
    session,
    url_for,
    send_file
)
from bson.regex import Regex
import pandas as pd
from flask import Flask,json
from datetime import datetime
import io
from pandas.io.json import json_normalize
import pandas as pd
import pycountry
import collections
# import mysql.connector
import numpy as np
from pandas import Timestamp
from flask_cors import CORS
from geolite2 import geolite2
import time
from textblob import TextBlob
from nltk.corpus import stopwords
from nltk.tokenize import word_tokenize

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
import math
import json
import urllib.request
from sort_dataframeby_monthorweek import *
from pytz import timezone
from six.moves import urllib
from numpyencoder import NumpyEncoder
from flask import Response
from flask import Flask, make_response

from flask import Flask,json, request, jsonify
from dateutil.relativedelta import relativedelta

#  new libraries to be imported 

from pandas.tseries.holiday import USFederalHolidayCalendar
from pandas.tseries.offsets import CustomBusinessDay
from sklearn.preprocessing import StandardScaler
import collections
import os

client_live= MongoClient('mongodb://admin:F5tMazRj47cYqm33e@54.202.61.130:27017/')
db_live=client_live.compass


client_live= MongoClient('mongodb://admin:F5tMazRj47cYqm33e@54.202.61.130:27017/')
db=client_live.compass

def csy_first_date():
        date_today =datetime.date.today()
    #     print(date_today)
    #     date_today='2024-07-01'
    #     day_end=datetime.datetime.strptime(date_today, '%Y-%m-%d').date()
        initial_date='2020-08-01'
        day1=datetime.datetime.strptime(initial_date, '%Y-%m-%d').date()
        # Check if leap year in the calculation
        if ((day1.year+1) % 4) == 0:
            if ((day1.year+1) % 100) == 0:
                if ((day1.year+1) % 400) == 0:
                    days_diff=1
                else:
                    days_diff=1
            else:
                days_diff=1
        else:
            days_diff=0
        if ((date_today-day1).days<(365+days_diff)):
            day_1=day1
        else:
            day1=day1+timedelta(days=(365+days_diff))
            day_1=day1

        csy_date=datetime.datetime.strptime((day_1.strftime('%Y-%m-%d')), '%Y-%m-%d')
        

        return csy_date
    
    
def LSY_Date():

    LSY_Date=csy_first_date()-relativedelta(years=1)
    return LSY_Date

def LSYTOLSY_Date():
    LSYTOLSY_Date=csy_first_date()-relativedelta(years=2)
    return LSYTOLSY_Date


def testcommon_cond():
    condum=[{'USER_NAME':{"$not":{"$regex":'test','$options':'i'}}},
    {'IS_DISABLED':{"$ne":'Y'}},
    {'IS_BLOCKED':{"$ne":'Y'}},
    {'INCOMPLETE_SIGNUP':{"$ne":'Y'}},
    {'EMAIL_ID':{"$not":{"$regex":'test','$options':'i'}}},
    {'EMAIL_ID':{"$not":{"$regex":'1gen','$options':'i'}}},
    {'EMAIL_ID':{"$ne":""}}, {'USER_NAME':{"$not":{"$regex":'1gen','$options':'i'}}},
    {'schoolId.NAME':{'$not':{"$regex":'test','$options':'i'}}},
    {'schoolId.NAME':{'$not':{"$regex":'TEST','$options':'i'}}},
    {'schoolId.BLOCKED_BY_CAP':{'$exists':0}},
    {'schoolId._id':{'$exists':1}},
    {'schoolId.NAME':{"$not":{"$regex":'blocked', '$options':'i'}}}]

    condsub=[{"USER_ID.IS_DISABLED":{"$ne":"Y"}},
          {"USER_ID.IS_BLOCKED":{"$ne":"Y"}},
         {"USER_ID.INCOMPLETE_SIGNUP":{"$ne":"Y"}},    
         { 'USER_ID.USER_NAME':{"$not":{"$regex":"test",'$options':'i'}}},
             { 'USER_ID.USER_NAME':{"$not":{"$regex":"1gen",'$options':'i'}}},
              {'USER_ID.schoolId.BLOCKED_BY_CAP':{'$exists':False}},  
             {'USER_ID.schoolId.NAME':{"$not":{"$regex":"test",'$options':'i'}}},
                       {'USER_ID.EMAIL_ID':{"$not":{"$regex":"test",'$options':'i'}}},
                         {'USER_ID.EMAIL_ID':{"$not":{"$regex":"1gen",'$options':'i'}}}]

    condaudf=[{ 'USER.USER_NAME':{"$not":{"$regex":"test",'$options':'i'}}},
                   {'USER.EMAIL_ID':{"$not":{"$regex":"test",'$options':'i'}}},
                     {'USER.EMAIL_ID':{"$not":{"$regex":"1gen",'$options':'i'}}},
          {'USER.INCOMPLETE_SIGNUP':{"$ne":'Y'}},
          {'USER.IS_DISABLED':{"$ne":'Y'}},
          {'USER.IS_BLOCKED':{"$ne":'Y'}},
          {'USER.schoolId.NAME':{'$not':{"$regex":'Blocked','$options':'i'}}},
          {'USER.schoolId.BLOCKED_BY_CAP':{'$exists':0}}]
    
    temp={'usermaster_cond':condum,        
        'sub_master_cond':condsub,
        'audiofeedback_cond':condaudf}
    return temp