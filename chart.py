import pandas as pd
import numpy as np
import datetime as dt
from flask import Flask, request, jsonify
from flask import Flask,json
from flask_cors import CORS
app= Flask(__name__)
CORS(app)
@app.route('/chartdesc')


def chartdexc():
    googleSheetId = '1iG7jxaM-93k9tu2LWpFxr01ZUICrPO2YTWyNbSuBhmQ'
    worksheetName = 'Payment'
    URL = 'https://docs.google.com/spreadsheets/d/{0}/gviz/tq?tqx=out:csv&sheet={1}'.format(googleSheetId,worksheetName)
    df=pd.read_csv(URL)

    temp={}
    for i in range(len(df)):
        key=df['Chart_name'][i]
        value=df['Description'][i]
        temp.update({key:value})
        
    return(json.dumps(temp))
if __name__== "__main__":
    app.run(host='172.31.0.77',port=5002)
    
    
