from flask import (
    Flask,
    g,
    redirect,
    render_template,
    request,
    session,
    url_for
)
import mysql.connector
import pandas as pd
from flask import Flask,json
from datetime import datetime
import pandas as pd
import pycountry
import mysql.connector
import numpy as np
from flask_cors import CORS
from geolite2 import geolite2
import time
from datetime import timedelta
app = Flask(__name__)
CORS(app)

# from flask_login import logout_user

class User:
    def __init__(self, id, username, password,name):
        self.id = id
        self.username = username
        self.password = password
        self.name = name

    def __repr__(self):
        return f'<User: {self.username}>'

users = []
users.append(User(id=1, username='admin@innerexplorer.org', password='capxp2020',name='Admin'))
users.append(User(id=2, username='paul@innerexplorer.org', password='capxp2020',name='Paul'))
users.append(User(id=3, username='harsh@innerexplorer.org', password='capxp2020',name='Harsh'))
users.append(User(id=4,username='laura@innerexplorer.org',password='capxp2020',name='Laura'))
users.append(User(id=5,username='janice@innerexplorer.org',password='capxp2020',name='Janice'))
users.append(User(id=6,username='lisa@innerexplorer.org',password='capxp2020',name='Lisa'))
users.append(User(id=7,username='laurie@innerexplorer.org',password='capxp2020',name='Laurie'))
users.append(User(id=8,username='victor@innerexplorer.org',password='capxp2020',name='Victor'))
users.append(User(id=9,username='tabitha@innerexplorer.org',password='capxp2020',name='Tabitha'))
users.append(User(id=10,username='mary@innerexplorer.org',password='capxp2020',name='Mary'))
users.append(User(id=11,username='iris@innerexplorer.org',password='capxp2020',name='Iris'))
users.append(User(id=12,username='travis@innerexplorer.org',password='capxp2020',name='Travis'))



app = Flask(__name__)
app.secret_key = 'cap4g2020version10date8272020'

@app.before_request
def before_request():
    g.user = None

    if 'user_id' in session:
        user = [x for x in users if x.id == session['user_id']][0]
        g.user = user
        

@app.route('/login', methods=['GET', 'POST'])
def login():
    if request.method == 'POST':
        session.pop('user_id', None)

        username = request.form['username']
        password = request.form['password']
        
        user = [x for x in users if x.username == username][0]
        if user and user.password == password:
            session['user_id'] = user.id
            return redirect(url_for('homepage'))

        return redirect(url_for('login'))

    return render_template('login.html')

@app.route('/homepage')
def homepage():
    if not g.user:
        return redirect(url_for('login'))
    
    return render_template('homepage.html')

@app.route('/Executive_Dashboard')
def Executive_Dashboard():
    if not g.user:
        return redirect(url_for('login'))
    
    return render_template('Executive_Dashboard.html')



@app.route('/School_Analytics')
def School_Analytics():
    if not g.user:
        return redirect(url_for('login'))
    
    return render_template('School_Analytics.html')

@app.route('/School_Search')
def School_Search():
    if not g.user:
        return redirect(url_for('login'))
    
    return render_template('School_Search.html')



@app.route('/Practice_Analytics')
def Practice_Analytics():
    if not g.user:
        return redirect(url_for('login'))
    
    return render_template('Practice_Analytics.html')


@app.route('/Subscription_Expired')
def Subscription_Expired():
    if not g.user:
        return redirect(url_for('login'))
    
    return render_template('Subscription_Expired.html')


@app.route('/feedback_Analyitcs_family')
def feedback_Analyitcs_family():
    if not g.user:
        return redirect(url_for('login'))
    
    return render_template('feedback_Analyitcs_family.html')

@app.route('/feedback_Analyitcs')
def feedback_Analyitcs():
    if not g.user:
        return redirect(url_for('login'))
    
    return render_template('feedback_Analyitcs.html')


@app.route('/feedback_Trends')
def feedback_Trends():
    if not g.user:
        return redirect(url_for('login'))
    
    return render_template('feedback_Trends.html')


@app.route('/aws')
def aws():
    if not g.user:
        return redirect(url_for('login'))
    
    return render_template('aws.html')

@app.route('/aws_releases')
def aws_releases():
    if not g.user:
        return redirect(url_for('login'))
    
    return render_template('aws_releases.html')

@app.route('/Scoology')
def Scoology():
    if not g.user:
        return redirect(url_for('login'))
    
    return render_template('Scoology.html')


@app.route('/Family_School_Search')
def Family_School_Search():
    if not g.user:
        return redirect(url_for('login'))
    return render_template('Family_School_Search.html')

@app.route('/Upcoming_Renewals')
def Upcoming_Renewals():
    if not g.user:
        return redirect(url_for('login'))
    
    return render_template('Upcoming_Renewals.html')

@app.route('/IOS_Analytics')
def IOS_Analytics():
    if not g.user:
        return redirect(url_for('login'))
    
    return render_template('IOS_Analytics.html')

@app.route('/Android_analytics')
def Android_analytics():
    if not g.user:
        return redirect(url_for('login'))
    
    return render_template('Android_analytics.html')

@app.route('/Sms_analytics')
def Sms_analytics():
    if not g.user:
        return redirect(url_for('login'))
    
    return render_template('Sms_analytics.html')


@app.route('/Parents_map_view')
def Parents_map_view():
    if not g.user:
        return redirect(url_for('login'))
    
    return render_template('Parents_map_view.html')

@app.route('/Transaction_Reporting')
def Transaction_Reporting():
    if not g.user:
        return redirect(url_for('login'))
    return render_template('Transaction_Reporting.html')

@app.route('/Progarm_wise_Analytics')
def Progarm_wise_Analytics():
    if not g.user:
        return redirect(url_for('login'))
    
    return render_template('Progarm_wise_Analytics.html')

@app.route('/Family_practice_analytics')
def Family_practice_analytics():
    if not g.user:
        return redirect(url_for('login'))
    
    return render_template('Family_practice_analytics.html')
@app.route('/incude')
def incude():
    if not g.user:
        return redirect(url_for('login'))
    
    return render_template('incude')

@app.route('/Familyapp_school')
def Familyapp_school():
    if not g.user:
        return redirect(url_for('login'))
    
    return render_template('Familyapp_school.html')

@app.route('/Weekly_Analytics')
def Weekly_Analytics():
    if not g.user:
        return redirect(url_for('login'))
    
    return render_template('Weekly_Analytics.html')

@app.route('/Daily_Analytics')
def Daily_Analytics():
    if not g.user:
        return redirect(url_for('login'))
    
    return render_template('Daily_Analytics.html')

@app.route('/schoolsummary')
def schoolsummary():
    if not g.user:
        return redirect(url_for('login'))
    
    return render_template('schoolsummary.html')

@app.route('/District_level_Parent_view')
def District_level_Parent_view():
    if not g.user:
        return redirect(url_for('login'))
    
    return render_template('District_level_Parent_view.html')


@app.route('/Parents_Analytics')
def Parents_Analytics():
    if not g.user:
        return redirect(url_for('login'))
    
    return render_template('Parents_Analytics.html')

@app.route('/District_level_view_RUSD')
def District_level_view_RUSD():
    if not g.user:
        return redirect(url_for('login'))
    
    return render_template('District_level_view_RUSD.html')

@app.route('/District_level_view_HILLSBOROUGH')
def District_level_view_HILLSBOROUGH():
    if not g.user:
        return redirect(url_for('login'))
    
    return render_template('District_level_view_HILLSBOROUGH.html')

@app.route('/District_level_view_FAIRFIELD')
def District_level_view_FAIRFIELD():
    if not g.user:
        return redirect(url_for('login'))
    
    return render_template('District_level_view_FAIRFIELD.html')

@app.route('/District_level_view_LAUSD')
def District_level_view_LAUSD():
    if not g.user:
        return redirect(url_for('login'))
    
    return render_template('District_level_view_LAUSD.html')
@app.route('/District_level_view_Search')
def District_level_view_Search():
    if not g.user:
        return redirect(url_for('login'))
    
    return render_template('District_level_view_Search.html')

@app.route('/District_level_view_BROWARD')
def District_level_view_BROWARD():
    if not g.user:
        return redirect(url_for('login'))
    
    return render_template('District_level_view_BROWARD.html')

@app.route('/District_level_view_SARASOTA')
def District_level_view_SARASOTA():
    if not g.user:
        return redirect(url_for('login'))
    return render_template('District_level_view_SARASOTA.html')


@app.route('/District_level_view_youngstown')
def District_level_view_youngstown():
    if not g.user:
        return redirect(url_for('login'))
    
    return render_template('District_level_view_youngstown.html')

@app.route('/District_level_view_Englewood')
def District_level_view_Englewood():
    if not g.user:
        return redirect(url_for('login'))
    
    return render_template('District_level_view_Englewood.html')

@app.route('/Schoolsearch_Email')
def Schoolsearch_Email():
    if not g.user:
        return redirect(url_for('login'))
    return render_template('Schoolsearch_Email.html')

@app.route('/Journey_score', methods=['GET', 'POST'])
def popup1():
    if request.method == 'POST':
        editorname = request.form['NAME']
        statename = request.form['myBrowser1']
        cityname = request.form['myBrowser']
        email = request.form['email']
        district = request.form['myBrowser3']
        partner = request.form['myBrowser4']
        print(email)
        print(statename)
        print(editorname)
        print(cityname)
        print(district)
        print(partner)
        db = mysql.connector.connect(
        host="34.214.24.229",
        user="IE-tech",
        passwd="IE-tech@2O2O",
        database="compassJune")


        DICTDIS={"Test District":"1","Los Angeles Unified School District":"2","Westfield Public School District":"3","Comox Valley School District(sd71)":"4","Youngstown":"5","Fairfield-Suisun Unified School District":"6","Griffin-Spalding County School System":"7","Clarksville-Montgomery County School System":"8","Englewood Public School District":"9","Englewood Cliffs Public Schools":"10","Austin Independent School District":"11","Equity Education":"12","_x000D_Middleton - Cross Plains Area School District":"13","Pinellas County Schools":"14","Lincolnshire Schools":"15","Utah Board of Education":"16","LSF -  Head Start":"17","Springfield Public Schools":"18","FundaciÃ³n La Puerta":"19","Chico Unified School District":"20","Broward County Public Schools":"21","District 25 New York Schools":"22","Paradise Schools":"23","San Leandro Unified School District":"24","Racine Unified Schools":"25","Oroville City Elementary School District":"27","Skillman Foundation":"28","Greenburgh-North Castle (GNC) Union Free School District":"29","Agawam School district":"30","Hillsborough County":"31","Sarasota County":"32","San Diego Unified School District":"33","Panorama Education":"34","Alpine School District":"35","Ann Arbor Public Schools":"36","Hawaii Public Schools":"37","Flint Public Schools":"38"}
        inputdict=str(DICTDIS[district])


        Partnerdict={"Hemera":"1","Aetna":"5","CRIM":"6","Calmer Choice":"8","Summer Schools":"9","San JosÃ© Unified School District":"10","hillsborough":"11","LG":"12","Character Day":"30"}
        partnerinput=Partnerdict[partner]

        qr="""SELECT um.user_id ,up.school_id FROM user_master um 
        inner join user_profile up on up.user_id=um.user_id
        where um.email_id like '%"""+email+"""%' """
        df=pd.read_sql(qr, con=db)
        schoolid=str(int(df[0:1]['school_id'][0]))
        userid=str(df[0:1]['user_id'][0])



        # UPDATE `compassFeb`.`user_master` SET `PARTNER_ID` = '1' WHERE (`USER_ID` = '11');
        ucomment=editorname + ' updated through cap4g '+statename+' '+cityname+' '+email+' '+district+' '+partner
        print(inputdict)
        try:

            db.query("""UPDATE school_master SET STATE = '"""+statename+"""' WHERE ID = """+schoolid+""" """)
        except:
            print("1")
            pass
        try:

            db.query("""UPDATE school_master SET CITY = '"""+cityname+"""' WHERE ID = """+schoolid+""" """)
        except:
            print("2")
            pass
        try:

            db.query("""UPDATE user_master SET DS_UM_COMMENTS = '"""+ucomment+"""' WHERE USER_ID = """+userid+""" """)
        except:
            print("3")
            pass
        try:

            db.query("""UPDATE user_master SET  DISTRICT_ID = '"""+inputdict+"""' WHERE USER_ID = """+userid+""" """)
        except:
            print("4")
            pass
        try:

            db.query("""UPDATE user_master SET PARTNER_ID = '"""+partnerinput+"""' WHERE USER_ID = """+userid+""" """)
        except:
            print("5")
            pass
    return render_template('Journey_score.html')

@app.route('/pml')
def PAY_ME_LATER():
    db = mysql.connector.connect(
    host="34.214.24.229",
    user="IE-tech",
    passwd="IE-tech@2O2O",
    database="compassJune")
    qr="""select um.USER_ID ,um.EMAIL_ID , sub.SUBSCRIPTION_DATE ,sub.SUBSCRIPTION_EXPIRE_DATE ,sub.MODE_OF_PAYMENT , sub.LAST_PAYMENT_AMOUNT from subscription_master sub
    inner join user_master um on um.USER_ID=sub.USER_ID
    where um.IS_DISABLED !='Y' and um.INCOMPLETE_SIGNUP !='Y' and um.DEVICE_USED LIKE "%webApp%" and um.IS_BLOCKED !='Y' AND um.email_id not like '%test%' and  sub.MODE_OF_PAYMENT like "%later%" and sub.LAST_PAYMENT_AMOUNT = 1000 and
    um.email_id not like '%1gen%'"""
    df=pd.read_sql(qr, con=db)
    df1=df[['SUBSCRIPTION_DATE','LAST_PAYMENT_AMOUNT']]
    df1['SUBSCRIPTION_DATE'] = pd.to_datetime(df1['SUBSCRIPTION_DATE'])
    df2 = df1.groupby(df1['SUBSCRIPTION_DATE'].dt.date).sum().reset_index()
    df2['SUBSCRIPTION_DATE'] = pd.to_datetime(df2['SUBSCRIPTION_DATE'])
    df2['SUBSCRIPTION_DATE'] = df2['SUBSCRIPTION_DATE'].astype(np.int64) / int(1e6)
    df2['Total_Amount'] = df2['LAST_PAYMENT_AMOUNT'].cumsum()
    df3=df2[['SUBSCRIPTION_DATE','LAST_PAYMENT_AMOUNT']]
    print(df2)
    Amount=df3.values.tolist()
    df4=df2[['SUBSCRIPTION_DATE','Total_Amount']]
    TAmount=df4.values.tolist()
    temp={'bar':Amount,'line':TAmount}
    return(json.dumps(temp))
@app.route('/pmlu')
def PAY_ME_LATER_USER():
    db = mysql.connector.connect(
    host="34.214.24.229",
    user="IE-tech",
    passwd="IE-tech@2O2O",
    database="compassJune")
    qr="""select um.USER_ID ,um.EMAIL_ID , sub.SUBSCRIPTION_DATE ,sub.SUBSCRIPTION_EXPIRE_DATE ,sub.MODE_OF_PAYMENT , sub.LAST_PAYMENT_AMOUNT from subscription_master sub
    inner join user_master um on um.USER_ID=sub.USER_ID
    where um.IS_DISABLED !='Y' and um.INCOMPLETE_SIGNUP !='Y' um.DEVICE_USED LIKE "%webApp%" and um.IS_BLOCKED !='Y' AND um.email_id not like '%test%' and  sub.MODE_OF_PAYMENT like "%later%" and sub.LAST_PAYMENT_AMOUNT = 1000 and
    um.email_id not like '%1gen%'"""
    df=pd.read_sql(qr, con=db)
    df1=df[['SUBSCRIPTION_DATE','LAST_PAYMENT_AMOUNT']]
    df1['SUBSCRIPTION_DATE'] = pd.to_datetime(df1['SUBSCRIPTION_DATE'])
    df2 = df1.groupby(df1['SUBSCRIPTION_DATE'].dt.date).size().reset_index(name='Count')
    df2['SUBSCRIPTION_DATE'] = pd.to_datetime(df2['SUBSCRIPTION_DATE'])
    df2['SUBSCRIPTION_DATE'] = df2['SUBSCRIPTION_DATE'].astype(np.int64) / int(1e6)
    df2['Total_USER'] = df2['Count'].cumsum()
    df3=df2[['SUBSCRIPTION_DATE','Count']]
    USER=df3.values.tolist()
    df4=df2[['SUBSCRIPTION_DATE','Total_USER']]
    TUSER=df4.values.tolist()
    temp={'bar':USER,'line':TUSER}
    return(json.dumps(temp))

@app.route('/renewalcardnew')
def renewal_cardnew():
    
    googleSheetId = '1A-rPVUmJ1SnDSfJXviCZbbQc4d5or4uSPC6qOKRqNk4'
    worksheetName = 'subscription'
    URL = 'https://docs.google.com/spreadsheets/d/{0}/gviz/tq?tqx=out:csv&sheet={1}'.format(
    googleSheetId,
    worksheetName
    )
    df = pd.read_csv(URL)
    

    cloud=df[df['status']=='cloud']
    trial=df[df['status']=='trial']
    csy=df[df['status']=='csy']
    upcoming=df[df['status']=='upcoming']
    after=df[df['status']=='after']
    
    
    
    lifetime=df[df['status']=='lifetime']
    lifetimeonb=lifetime[lifetime['USER_COUNT']==1]
    lifetime0prac=lifetime[lifetime['school_practice_count']==0]
    lifetime0prac=lifetime0prac[lifetime0prac['USER_COUNT']!=1]
    onblifetimecount=len(lifetimeonb)
    zeropraclifetimecount=len(lifetime0prac)
    lifetimecount=len(lifetime)
    lifetimepractising=lifetimecount-(onblifetimecount+zeropraclifetimecount)

    cloudonb=cloud[cloud['USER_COUNT']==1]
    cloud0prac=cloud[cloud['school_practice_count']==0]
    cloud0prac=cloud0prac[cloud0prac['USER_COUNT']!=1]
    onbcloudcount=len(cloudonb)
    zeropraccloudcount=len(cloud0prac)
    cloudcount=len(cloud)
    cloudpractising=cloudcount-(onbcloudcount+zeropraccloudcount)


    trialonb=trial[trial['USER_COUNT']==1]
    trial0prac=trial[trial['school_practice_count']==0]
    trial0prac=trial0prac[trial0prac['USER_COUNT']!=1]
    onbtrialcount=len(trialonb)
    trialtotal=len(trial)
    zeropractrialcount=len(trial0prac)
    trialpractising=trialtotal-(onbtrialcount+zeropractrialcount)


    
    upccsyonb=upcoming[upcoming['USER_COUNT']==1]
    upccsy0prac=upcoming[upcoming['school_practice_count']==0]
    upccsy0prac=upccsy0prac[upccsy0prac['USER_COUNT']!=1]
    onbupccsycount=len(upccsyonb)
    zeropracupccsycount=len(upccsy0prac)
    upccsycountcount=len(upcoming)
    upcomingpractising=upccsycountcount-(onbupccsycount+zeropracupccsycount)
    
    
    expcsyonb=csy[csy['USER_COUNT']==1]
    expcsy0prac=csy[csy['school_practice_count']==0]
    expcsy0prac=expcsy0prac[expcsy0prac['USER_COUNT']!=1]
    onbexpcsycount=len(expcsyonb)
    zeropracexpcsycount=len(expcsy0prac)
    expcsycount=len(csy)
    expcsypractising=expcsycount-(zeropracexpcsycount+onbexpcsycount)


    aftercsyonb=after[after['USER_COUNT']==1]
    aftercsy0prac=after[after['school_practice_count']==0]
    aftercsy0prac=aftercsy0prac[aftercsy0prac['USER_COUNT']!=1]
    onbaftercsycount=len(aftercsyonb)
    zeropracaftercsycount=len(aftercsy0prac)
    aftercount=len(after)
    afterpractising=aftercount-(zeropracaftercsycount+onbaftercsycount)
    
    temp={"totalschool":3888,"lifetime":{"onbording":onblifetimecount, "total":lifetimecount, "zeropractice":zeropraclifetimecount,"practising":lifetimepractising},"cloud":{"onbording":onbcloudcount, "total":cloudcount, "zeropractice":zeropraccloudcount,"practising":cloudpractising},"trial":{"total":trialtotal,"onbording":onbtrialcount,"zeropractice":zeropractrialcount,"practising":trialpractising},"aftercsy":{"total":aftercount,"onbording":onbaftercsycount,"zeropractice":zeropracaftercsycount,"practising":afterpractising},"expcsy":{"total":expcsycount,"onbording":onbexpcsycount,"zeropractice":zeropracexpcsycount,"practising":expcsypractising},"upccsy":{"total":upccsycountcount,"onbording":onbupccsycount,"zeropractice":zeropracupccsycount,"practising":upcomingpractising}}
    return json.dumps(temp)

@app.route('/renewal20/<month>/But')
def subscription_Graphnewtabletwenty(month):
    db = mysql.connector.connect(host="34.214.24.229",    # your host, usually localhost
                     user="IE-tech",         # your username
                     passwd="IE-tech@2O2O",  # your password
                     db="compassJune")
    
    
        
    query="""select m.School_Name,m.Admin_Name,m.Admin_Email,
    m.Renewal_Date as Renewal_Date,m.Last_Practice_Date,m.Last_login_Date,
    m.School_Practice_Count,
    m.User_Count from (select y.School_Name,y.Admin_Name,y.Admin_Email,
    y.Renewal_Date as Renewal_Date,
    date(max(atd.modified_date)) as Last_Practice_Date,
    date(max(ll.LAST_LOGGED_IN)) as Last_login_Date,
    count(atd.USER_ID) as School_Practice_Count,
    count(distinct(um.USER_ID)) As User_Count,
    count(distinct(atd.USER_ID))/count(distinct(um.USER_ID)) as Practicing_Percentage
    from (select sm.id as School_Id,sm.name as School_Name,
    um.USER_ID as Admin_Id,um.USER_NAME as Admin_Name,
    um.EMAIL_ID as Admin_Email,date(max(sbm.SUBSCRIPTION_EXPIRE_DATE)) as Renewal_Date
    from user_master as um 
    inner join subscription_master as sbm on sbm.USER_ID=um.USER_ID
    left join user_profile as up on up.USER_ID=um.USER_ID
    left join school_master as sm on sm.id =up.SCHOOL_ID
    where um.admin_col='ADMIN' 
    group by um.USER_ID ) as y
    left join user_profile as up on up.SCHOOL_ID=y.School_Id
    left join school_master as sm on sm.id=up.SCHOOL_ID
    left join user_master as um on um.USER_ID=up.USER_ID
    left join audio_track_detail as atd on atd.USER_ID=um.USER_ID
    left join login_logs as ll on ll.USER_ID=um.USER_ID
    where um.user_name not like '%TEST%' and um.IS_DISABLED != 'Y' 
    and um.IS_BLOCKED != 'Y' 
    and um.INCOMPLETE_SIGNUP != 'Y' and um.EMAIL_ID not like '%test%'
    and um.EMAIL_ID not like '%1gen%' and sm.name not like '%blocked%' and um.ROLE_ID!=3
    group by y.School_Id) as m
    where m.Practicing_Percentage>=.5 and 
    monthname(m.Renewal_Date) like '%"""+month+"""%' and year(m.Renewal_Date)='2020' """
    df=pd.read_sql(query,con=db)
    df['Renewal_Date']=pd.to_datetime(df['Renewal_Date'])
    df['Last_Practice_Date']=pd.to_datetime(df['Last_Practice_Date'], errors='coerce')
    df['Last_login_Date']=pd.to_datetime(df['Last_login_Date'], errors='coerce')
    df['Last_login_Date']=df['Last_login_Date'].dt.strftime('%d %b %Y')
    df['Last_Practice_Date']=df['Last_Practice_Date'].dt.strftime('%d %b %Y')
    df['Renewal_Date']=df['Renewal_Date'].dt.strftime('%d %b %Y')
    
    return json.dumps({"data":df.values.tolist()})
   

@app.route('/renewal19/<month>/But')
def subscription_Graphnewtable(month):
    db = mysql.connector.connect(host="34.214.24.229",    # your host, usually localhost
                     user="IE-tech",         # your username
                     passwd="IE-tech@2O2O",  # your password
                     db="compassJune")
    
    year='2019'
    if month in ['JAN','FEB','MAR','APR']:
        year='2020'
        
    query="""select m.School_Name,m.Admin_Name,m.Admin_Email,
    m.Renewal_Date as Renewal_Date,m.Last_Practice_Date,m.Last_login_Date,
    m.School_Practice_Count,
    m.User_Count from (select y.School_Name,y.Admin_Name,y.Admin_Email,
    y.Renewal_Date as Renewal_Date,
    date(max(atd.modified_date)) as Last_Practice_Date,
    date(max(ll.LAST_LOGGED_IN)) as Last_login_Date,
    count(atd.USER_ID) as School_Practice_Count,
    count(distinct(um.USER_ID)) As User_Count,
    count(distinct(atd.USER_ID))/count(distinct(um.USER_ID)) as Practicing_Percentage
    from (select sm.id as School_Id,sm.name as School_Name,
    um.USER_ID as Admin_Id,um.USER_NAME as Admin_Name,
    um.EMAIL_ID as Admin_Email,date(max(sbm.SUBSCRIPTION_EXPIRE_DATE)) as Renewal_Date
    from user_master as um 
    inner join subscription_master as sbm on sbm.USER_ID=um.USER_ID
    left join user_profile as up on up.USER_ID=um.USER_ID
    left join school_master as sm on sm.id =up.SCHOOL_ID
    where um.admin_col='ADMIN' 
    group by um.USER_ID ) as y
    left join user_profile as up on up.SCHOOL_ID=y.School_Id
    left join school_master as sm on sm.id=up.SCHOOL_ID
    left join user_master as um on um.USER_ID=up.USER_ID
    left join audio_track_detail as atd on atd.USER_ID=um.USER_ID
    left join login_logs as ll on ll.USER_ID=um.USER_ID
    where um.user_name not like '%TEST%' and um.IS_DISABLED != 'Y' 
    and um.IS_BLOCKED != 'Y' 
    and um.INCOMPLETE_SIGNUP != 'Y' and um.EMAIL_ID not like '%test%'
    and um.EMAIL_ID not like '%1gen%' and sm.name not like '%blocked%' and um.ROLE_ID!=3
    group by y.School_Id) as m
    where m.Practicing_Percentage>=.5 and 
    monthname(m.Renewal_Date) like '%"""+month+"""%' and year(m.Renewal_Date)='"""+year+"""' """
    df=pd.read_sql(query,con=db)
    df['Renewal_Date']=pd.to_datetime(df['Renewal_Date'])
    df['Last_Practice_Date']=pd.to_datetime(df['Last_Practice_Date'], errors='coerce')
    df['Last_login_Date']=pd.to_datetime(df['Last_login_Date'], errors='coerce')
    df['Last_login_Date']=df['Last_login_Date'].dt.strftime('%d %b %Y')
    df['Last_Practice_Date']=df['Last_Practice_Date'].dt.strftime('%d %b %Y')
    df['Renewal_Date']=df['Renewal_Date'].dt.strftime('%d %b %Y')
    
    return json.dumps({"data":df.values.tolist()})
   

@app.route('/subscriptionexpirednewgraph')
def subscription_Graphnew():
    db = mysql.connector.connect(host="34.214.24.229",    # your host, usually localhost
                     user="IE-tech",         # your username
                     passwd="IE-tech@2O2O",  # your password
                     db="compassJune")
    

    query="""select substring(monthname(m.Renewal_Date),1,3) as Month,year(m.Renewal_Date) as Year,
    count(distinct(m.School_Id)) as School_Count,
    count(distinct(case when m.Practicing_User>0 then m.School_Id end )) as Active_School,
    count((case when m.Practicing_Percentage >=.5 then m.School_Id end)) as School_Count_50
    from (select y.SCHOOL_ID as School_Id,y.Renewal_Date as Renewal_Date
    ,count(distinct(um.USER_ID)) As User_Count,
    count(distinct(atd.USER_ID)) as Practicing_User,
    count(distinct(atd.USER_ID))/count(distinct(um.USER_ID)) as Practicing_Percentage
    from (select sm.id as School_Id,um.USER_ID as Admin_Id,
    date(max(sbm.SUBSCRIPTION_EXPIRE_DATE)) as Renewal_Date
    from user_master as um 
    inner join subscription_master as sbm on sbm.USER_ID=um.USER_ID
    left join user_profile as up on up.USER_ID=um.USER_ID
    left join school_master as sm on sm.id =up.SCHOOL_ID
    where um.admin_col='ADMIN'
    and date(sbm.SUBSCRIPTION_EXPIRE_DATE) between
    '2019-07-01' and '2020-06-30'
    group by um.USER_ID
    order by date(sbm.SUBSCRIPTION_EXPIRE_DATE) asc ) as y
    left join user_profile as up on up.SCHOOL_ID=y.School_Id
    left join school_master as sm on sm.id=up.SCHOOL_ID
    left join user_master as um on um.USER_ID=up.USER_ID
    left join audio_track_detail as atd on atd.USER_ID=um.USER_ID
    where um.user_name not like '%TEST%' and um.IS_DISABLED != 'Y' 
    and um.IS_BLOCKED != 'Y' 
    and um.INCOMPLETE_SIGNUP != 'Y' and um.EMAIL_ID not like '%test%'
    and um.EMAIL_ID not like '%1gen%' and sm.name not like '%blocked%' and um.ROLE_ID!=3
    group by y.School_Id) as m
    where date(m.Renewal_Date)<'2020-05-01'
    group by monthname(m.Renewal_Date),year(m.Renewal_Date)
    order by m.Renewal_Date"""
    df=pd.read_sql(query,con=db)
    month=df.Month.tolist()
    school_count=df.School_Count.tolist()
    active=df.Active_School.tolist()
    school_50=df.School_Count_50.tolist()
    return json.dumps({'month':month,'total':school_count,'active':active,'useractive':school_50})

@app.route('/upcomingnewgraph')
def upcomingnewwwwww():
    db = mysql.connector.connect(host="34.214.24.229",    # your host, usually localhost
                     user="IE-tech",         # your username
                     passwd="IE-tech@2O2O",  # your password
                     db="compassJune")
    


    query="""select substring(monthname(m.Renewal_Date),1,3) as Month,year(m.Renewal_Date) as Year,
    count(distinct(m.School_Id)) as School_Count,
    count(distinct(case when m.Practicing_User>0 then m.School_Id end )) as Active_School,
    count((case when m.Practicing_Percentage >=.5 then m.School_Id end)) as School_Count_50
    from (select y.SCHOOL_ID as School_Id,y.Renewal_Date as Renewal_Date
    ,count(distinct(um.USER_ID)) As User_Count,
    count(distinct(atd.USER_ID)) as Practicing_User,
    count(distinct(atd.USER_ID))/count(distinct(um.USER_ID)) as Practicing_Percentage
    from (select sm.id as School_Id,um.USER_ID as Admin_Id,
    date(max(sbm.SUBSCRIPTION_EXPIRE_DATE)) as Renewal_Date
    from user_master as um 
    inner join subscription_master as sbm on sbm.USER_ID=um.USER_ID
    left join user_profile as up on up.USER_ID=um.USER_ID
    left join school_master as sm on sm.id =up.SCHOOL_ID
    where um.admin_col='ADMIN'
    and date(sbm.SUBSCRIPTION_EXPIRE_DATE) between
    '2020-05-01' and '2020-12-31'
    group by um.USER_ID
    order by date(sbm.SUBSCRIPTION_EXPIRE_DATE) asc ) as y
    left join user_profile as up on up.SCHOOL_ID=y.School_Id
    left join school_master as sm on sm.id=up.SCHOOL_ID
    left join user_master as um on um.USER_ID=up.USER_ID
    left join audio_track_detail as atd on atd.USER_ID=um.USER_ID
    where um.user_name not like '%TEST%' and um.IS_DISABLED != 'Y' 
    and um.IS_BLOCKED != 'Y' 
    and um.INCOMPLETE_SIGNUP != 'Y' and um.EMAIL_ID not like '%test%'
    and um.EMAIL_ID not like '%1gen%' and sm.name not like '%blocked%' and um.ROLE_ID!=3
    group by y.School_Id) as m
    where date(m.Renewal_Date)<'2020-12-31'
    group by monthname(m.Renewal_Date),year(m.Renewal_Date)
    order by m.Renewal_Date"""
    df=pd.read_sql(query,con=db)
    month=df.Month.tolist()
    school_count=df.School_Count.tolist()
    active=df.Active_School.tolist()
    school_50=df.School_Count_50.tolist()
    return json.dumps({'month':month,'school_count':school_count,'Active_School':active,'School_50_Active':school_50})



@app.route('/upcomingzeropractable')
def upcomingzeropracttable2():
    googleSheetId = '1A-rPVUmJ1SnDSfJXviCZbbQc4d5or4uSPC6qOKRqNk4'
    worksheetName = 'subscription'
    URL = 'https://docs.google.com/spreadsheets/d/{0}/gviz/tq?tqx=out:csv&sheet={1}'.format(
    googleSheetId,
    worksheetName
    )
    df = pd.read_csv(URL)
    
    cloud=df[df['status']=='cloud']
    trial=df[df['status']=='trial']
    csy=df[df['status']=='csy']
    upcoming=df[df['status']=='upcoming']
    after=df[df['status']=='after']

    
    upccsyonb=upcoming[upcoming['USER_COUNT']==1]
    upccsy0prac=upcoming[upcoming['school_practice_count']==0]
    upccsy0prac=upccsy0prac[upccsy0prac['USER_COUNT']!=1]
    onbupccsycount=len(upccsyonb)
    zeropracupccsycount=len(upccsy0prac)
    upccsycountcount=len(upcoming)
    upccsy0prac=upccsy0prac.drop(['UID'], axis=1)
    upccsy0prac=upccsy0prac.drop(['active_count'], axis=1)
    upccsy0prac=upccsy0prac.drop(['status'], axis=1)
    # upccsy0prac=upccsy0prac.drop(['CREATED_DATE'], axis=1)

    return json.dumps({"data":upccsy0prac.values.tolist(),"tablename":"UPCOMING RENEWAL DORMANT SCHOOL DETAILS"})



@app.route('/upcomingonbtable')
def upcomingonboardtable2():
    googleSheetId = '1A-rPVUmJ1SnDSfJXviCZbbQc4d5or4uSPC6qOKRqNk4'
    worksheetName = 'subscription'
    URL = 'https://docs.google.com/spreadsheets/d/{0}/gviz/tq?tqx=out:csv&sheet={1}'.format(
    googleSheetId,
    worksheetName
    )
    df = pd.read_csv(URL)
    
    cloud=df[df['status']=='cloud']
    trial=df[df['status']=='trial']
    csy=df[df['status']=='csy']
    upcoming=df[df['status']=='upcoming']
    after=df[df['status']=='after']
    
    upccsyonb=upcoming[upcoming['USER_COUNT']==1]
    upccsy0prac=upcoming[upcoming['school_practice_count']==0]
    upccsy0prac=upccsy0prac[upccsy0prac['USER_COUNT']!=1]
    onbupccsycount=len(upccsyonb)
    zeropracupccsycount=len(upccsy0prac)
    upccsycountcount=len(upcoming)
    upccsyonb=upccsyonb.drop(['UID'], axis=1)
    upccsyonb=upccsyonb.drop(['active_count'], axis=1)
    upccsyonb=upccsyonb.drop(['status'], axis=1)
    # upccsyonb=upccsyonb.drop(['CREATED_DATE'], axis=1)

    return json.dumps({"data":upccsyonb.values.tolist(),"tablename":"UPCOMING RENEWAL ONBOARDING SCHOOL DETAILS"})



@app.route('/upcomingtable')
def upcomingtable2():
    googleSheetId = '1A-rPVUmJ1SnDSfJXviCZbbQc4d5or4uSPC6qOKRqNk4'
    worksheetName = 'subscription'
    URL = 'https://docs.google.com/spreadsheets/d/{0}/gviz/tq?tqx=out:csv&sheet={1}'.format(
    googleSheetId,
    worksheetName
    )
    df = pd.read_csv(URL)
    
    cloud=df[df['status']=='cloud']
    trial=df[df['status']=='trial']
    csy=df[df['status']=='csy']
    upcoming=df[df['status']=='upcoming']
    after=df[df['status']=='after']
    
    
    upcoming=upcoming.drop(['UID'], axis=1)
    upcoming=upcoming.drop(['active_count'], axis=1)
    upcoming=upcoming.drop(['status'], axis=1)
    # upcoming=upcoming.drop(['CREATED_DATE'], axis=1)

    return json.dumps({"data":upcoming.values.tolist(),"tablename":"UPCOMING RENEWAL SCHOOL DETAILS"})



@app.route('/lifetimezeropracticetable')
def lifetimezeropractice():

    googleSheetId = '1A-rPVUmJ1SnDSfJXviCZbbQc4d5or4uSPC6qOKRqNk4'
    worksheetName = 'subscription'
    URL = 'https://docs.google.com/spreadsheets/d/{0}/gviz/tq?tqx=out:csv&sheet={1}'.format(
    googleSheetId,
    worksheetName
    )
    df = pd.read_csv(URL)
    
    cloud=df[df['status']=='cloud']
    lifetime=df[df['status']=='lifetime']
    csy=df[df['status']=='csy']
    upcoming=df[df['status']=='upcoming']
    after=df[df['status']=='after']

    
    lifetimeonb=lifetime[lifetime['USER_COUNT']==1]
    lifetime0prac=lifetime[lifetime['school_practice_count']==0]
    lifetime0prac=lifetime0prac[lifetime0prac['USER_COUNT']!=1]
    onblifetimecount=len(lifetimeonb)
    zeropraclifetimecount=len(lifetime0prac)
    lifetimecountcount=len(lifetime)
    lifetime0prac=lifetime0prac.drop(['UID'], axis=1)
    lifetime0prac=lifetime0prac.drop(['active_count'], axis=1)
    lifetime0prac=lifetime0prac.drop(['status'], axis=1)
    # lifetime0prac=lifetime0prac.drop(['CREATED_DATE'], axis=1)

    return json.dumps({"data":lifetime0prac.values.tolist(),"tablename":"LIFETIME DORMANT SCHOOL DETAILS"})

@app.route('/trialzeropracticetable')
def trialzeropractice():

    googleSheetId = '1A-rPVUmJ1SnDSfJXviCZbbQc4d5or4uSPC6qOKRqNk4'
    worksheetName = 'subscription'
    URL = 'https://docs.google.com/spreadsheets/d/{0}/gviz/tq?tqx=out:csv&sheet={1}'.format(
    googleSheetId,
    worksheetName
    )
    df = pd.read_csv(URL)
    
    cloud=df[df['status']=='cloud']
    trial=df[df['status']=='trial']
    csy=df[df['status']=='csy']
    upcoming=df[df['status']=='upcoming']
    after=df[df['status']=='after']

    
    trialonb=trial[trial['USER_COUNT']==1]
    trial0prac=trial[trial['school_practice_count']==0]
    trial0prac=trial0prac[trial0prac['USER_COUNT']!=1]
    onbtrialcount=len(trialonb)
    zeropractrialcount=len(trial0prac)
    trialcountcount=len(trial)
    trial0prac=trial0prac.drop(['UID'], axis=1)
    trial0prac=trial0prac.drop(['active_count'], axis=1)
    trial0prac=trial0prac.drop(['status'], axis=1)
    # trial0prac=trial0prac.drop(['CREATED_DATE'], axis=1)

    return json.dumps({"data":trial0prac.values.tolist(),"tablename":"TRIAL DORMANT SCHOOL DETAILS"})




@app.route('/lifetimetableonbording')
def lifetimetableonbord():

    googleSheetId = '1A-rPVUmJ1SnDSfJXviCZbbQc4d5or4uSPC6qOKRqNk4'
    worksheetName = 'subscription'
    URL = 'https://docs.google.com/spreadsheets/d/{0}/gviz/tq?tqx=out:csv&sheet={1}'.format(
    googleSheetId,
    worksheetName
    )
    df = pd.read_csv(URL)
    
    cloud=df[df['status']=='cloud']
    lifetime=df[df['status']=='lifetime']
    csy=df[df['status']=='csy']
    upcoming=df[df['status']=='upcoming']
    after=df[df['status']=='after']

    
    lifetimeonb=lifetime[lifetime['USER_COUNT']==1]
    lifetime0prac=lifetime[lifetime['school_practice_count']==0]
    lifetime0prac=lifetime0prac[lifetime0prac['USER_COUNT']!=1]
    onblifetimecount=len(lifetimeonb)
    zeropraclifetimecount=len(lifetime0prac)
    lifetimecountcount=len(lifetime)
    lifetimeonb=lifetimeonb.drop(['UID'], axis=1)
    lifetimeonb=lifetimeonb.drop(['active_count'], axis=1)
    lifetimeonb=lifetimeonb.drop(['status'], axis=1)
    # lifetimeonb=lifetimeonb.drop(['CREATED_DATE'], axis=1)

    
    return json.dumps({"data":lifetimeonb.values.tolist(),"tablename":"LIFETIME ONBOARDING SCHOOL DETAILS"})

@app.route('/trialtableonbording')
def trialtableonbord():

    googleSheetId = '1A-rPVUmJ1SnDSfJXviCZbbQc4d5or4uSPC6qOKRqNk4'
    worksheetName = 'subscription'
    URL = 'https://docs.google.com/spreadsheets/d/{0}/gviz/tq?tqx=out:csv&sheet={1}'.format(
    googleSheetId,
    worksheetName
    )
    df = pd.read_csv(URL)
    
    cloud=df[df['status']=='cloud']
    trial=df[df['status']=='trial']
    csy=df[df['status']=='csy']
    upcoming=df[df['status']=='upcoming']
    after=df[df['status']=='after']

    
    trialonb=trial[trial['USER_COUNT']==1]
    trial0prac=trial[trial['school_practice_count']==0]
    trial0prac=trial0prac[trial0prac['USER_COUNT']!=1]
    onbtrialcount=len(trialonb)
    zeropractrialcount=len(trial0prac)
    trialcountcount=len(trial)
    trialonb=trialonb.drop(['UID'], axis=1)
    trialonb=trialonb.drop(['active_count'], axis=1)
    trialonb=trialonb.drop(['status'], axis=1)
    # trialonb=trialonb.drop(['CREATED_DATE'], axis=1)

    
    return json.dumps({"data":trialonb.values.tolist(),"tablename":"TRIAL ONBOARDING SCHOOL DETAILS"})



@app.route('/lifetimetable')
def lifetimetable2():

    googleSheetId = '1A-rPVUmJ1SnDSfJXviCZbbQc4d5or4uSPC6qOKRqNk4'
    worksheetName = 'subscription'
    URL = 'https://docs.google.com/spreadsheets/d/{0}/gviz/tq?tqx=out:csv&sheet={1}'.format(
    googleSheetId,
    worksheetName
    )
    df = pd.read_csv(URL)
    
    cloud=df[df['status']=='cloud']
    lifetime=df[df['status']=='lifetime']
    csy=df[df['status']=='csy']
    upcoming=df[df['status']=='upcoming']
    after=df[df['status']=='after']

    
    lifetimeonb=lifetime[lifetime['USER_COUNT']==1]
    lifetime0prac=lifetime[lifetime['school_practice_count']==0]
    lifetime0prac=lifetime0prac[lifetime0prac['USER_COUNT']!=1]
    onblifetimecount=len(lifetimeonb)
    zeropraclifetimecount=len(lifetime0prac)
    lifetimecountcount=len(lifetime)
    lifetime0prac=lifetime0prac.drop(['UID'], axis=1)
    lifetime0prac=lifetime0prac.drop(['active_count'], axis=1)
    lifetime0prac=lifetime0prac.drop(['status'], axis=1)
    # lifetime0prac=lifetime0prac.drop(['CREATED_DATE'], axis=1)

    
    return json.dumps({"data":lifetime.values.tolist(),"tablename":"LIFETIME ONBOARDING SCHOOL DETAILS"})

@app.route('/trialtable')
def trialtable2():

    googleSheetId = '1A-rPVUmJ1SnDSfJXviCZbbQc4d5or4uSPC6qOKRqNk4'
    worksheetName = 'subscription'
    URL = 'https://docs.google.com/spreadsheets/d/{0}/gviz/tq?tqx=out:csv&sheet={1}'.format(
    googleSheetId,
    worksheetName
    )
    df = pd.read_csv(URL)
    
    cloud=df[df['status']=='cloud']
    trial=df[df['status']=='trial']
    csy=df[df['status']=='csy']
    upcoming=df[df['status']=='upcoming']
    after=df[df['status']=='after']

    
    trialonb=trial[trial['USER_COUNT']==1]
    trial0prac=trial[trial['school_practice_count']==0]
    trial0prac=trial0prac[trial0prac['USER_COUNT']!=1]
    onbtrialcount=len(trialonb)
    zeropractrialcount=len(trial0prac)
    trialcountcount=len(trial)
    trial0prac=trial0prac.drop(['UID'], axis=1)
    trial0prac=trial0prac.drop(['active_count'], axis=1)
    trial0prac=trial0prac.drop(['status'], axis=1)
    # trial0prac=trial0prac.drop(['CREATED_DATE'], axis=1)

    
    return json.dumps({"data":trial.values.tolist(),"tablename":"TRIAL ONBOARDING SCHOOL DETAILS"})
    


@app.route('/aftercsytable')
def aftercsytabledata():

    googleSheetId = '1A-rPVUmJ1SnDSfJXviCZbbQc4d5or4uSPC6qOKRqNk4'
    worksheetName = 'subscription'
    URL = 'https://docs.google.com/spreadsheets/d/{0}/gviz/tq?tqx=out:csv&sheet={1}'.format(
    googleSheetId,
    worksheetName
    )
    df = pd.read_csv(URL)
    
    cloud=df[df['status']=='cloud']
    trial=df[df['status']=='trial']
    csy=df[df['status']=='csy']
    upcoming=df[df['status']=='upcoming']
    after=df[df['status']=='after']

    
    trialonb=trial[trial['USER_COUNT']==1]
    trial0prac=trial[trial['school_practice_count']==0]
    trial0prac=trial0prac[trial0prac['USER_COUNT']!=1]
    onbtrialcount=len(trialonb)
    zeropractrialcount=len(trial0prac)
    trialcountcount=len(trial)
    after=after.drop(['UID'], axis=1)
    after=after.drop(['active_count'], axis=1)
    after=after.drop(['status'], axis=1)
    # after=after.drop(['CREATED_DATE'], axis=1)
    return json.dumps({"data":after.values.tolist(),"tablename":"RENEWAL AFTER CURRENT SCHOOL YEAR SCHOOL DETAILS"})

@app.route('/aftercsytableoonbording')
def aftercsytabledataonboarding():

    googleSheetId = '1A-rPVUmJ1SnDSfJXviCZbbQc4d5or4uSPC6qOKRqNk4'
    worksheetName = 'subscription'
    URL = 'https://docs.google.com/spreadsheets/d/{0}/gviz/tq?tqx=out:csv&sheet={1}'.format(
    googleSheetId,
    worksheetName
    )
    df = pd.read_csv(URL)
    
    cloud=df[df['status']=='cloud']
    trial=df[df['status']=='trial']
    csy=df[df['status']=='csy']
    upcoming=df[df['status']=='upcoming']
    after=df[df['status']=='after']

    
    afteronb=after[after['USER_COUNT']==1]
    after0prac=after[after['school_practice_count']==0]
    after0prac=after0prac[after0prac['USER_COUNT']!=1]
    onbaftercount=len(afteronb)
    zeropracaftercount=len(after0prac)
    aftercountcount=len(after)
    afteronb=afteronb.drop(['UID'], axis=1)
    afteronb=afteronb.drop(['active_count'], axis=1)
    afteronb=afteronb.drop(['status'], axis=1)
    # afteronb=afteronb.drop(['CREATED_DATE'], axis=1)
    return json.dumps({"data":afteronb.values.tolist(),"tablename":"RENEWAL AFTER CURRENT SCHOOL YEAR ONBOARDING SCHOOL DETAILS"})

@app.route('/aftercsytableozeroprac')
def aftercsytabledatazeropract():

    googleSheetId = '1A-rPVUmJ1SnDSfJXviCZbbQc4d5or4uSPC6qOKRqNk4'
    worksheetName = 'subscription'
    URL = 'https://docs.google.com/spreadsheets/d/{0}/gviz/tq?tqx=out:csv&sheet={1}'.format(
    googleSheetId,
    worksheetName
    )
    df = pd.read_csv(URL)
    
    cloud=df[df['status']=='cloud']
    trial=df[df['status']=='trial']
    csy=df[df['status']=='csy']
    upcoming=df[df['status']=='upcoming']
    after=df[df['status']=='after']

    
    afteronb=after[after['USER_COUNT']==1]
    after0prac=after[after['school_practice_count']==0]
    after0prac=after0prac[after0prac['USER_COUNT']!=1]
    onbaftercount=len(afteronb)
    zeropracaftercount=len(after0prac)
    aftercountcount=len(after)
    after0prac=after0prac.drop(['UID'], axis=1)
    after0prac=after0prac.drop(['active_count'], axis=1)
    after0prac=after0prac.drop(['status'], axis=1)
    # after0prac=after0prac.drop(['CREATED_DATE'], axis=1)
    return json.dumps({"data":after0prac.values.tolist(),"tablename":"RENEWAL AFTER CURRENT SCHOOL YEAR DORMANT SCHOOL DETAILS"})
    
@app.route('/expcsytableonboarding')
def expcsytabledataonboarding():

    googleSheetId = '1A-rPVUmJ1SnDSfJXviCZbbQc4d5or4uSPC6qOKRqNk4'
    worksheetName = 'subscription'
    URL = 'https://docs.google.com/spreadsheets/d/{0}/gviz/tq?tqx=out:csv&sheet={1}'.format(
    googleSheetId,
    worksheetName
    )
    df = pd.read_csv(URL)
    
    cloud=df[df['status']=='cloud']
    trial=df[df['status']=='trial']
    csy=df[df['status']=='csy']
    upcoming=df[df['status']=='upcoming']
    after=df[df['status']=='after']

    
    csyonb=csy[csy['USER_COUNT']==1]
    csy0prac=csy[csy['school_practice_count']==0]
    csy0prac=csy0prac[csy0prac['USER_COUNT']!=1]
    onbcsycount=len(csyonb)
    zeropraccsycount=len(csy0prac)
    csycountcount=len(csy)
    csyonb=csyonb.drop(['UID'], axis=1)
    csyonb=csyonb.drop(['active_count'], axis=1)
    csyonb=csyonb.drop(['status'], axis=1)
    # csyonb=csyonb.drop(['CREATED_DATE'], axis=1)
    return json.dumps({"data":csyonb.values.tolist(),"tablename":"EXPIRED CURRENT SCHOOL YEAR SCHOOL DETAILS"})


@app.route('/expcsytabledatazeropractice')

def expcsytabledatazeropractice():

    googleSheetId = '1A-rPVUmJ1SnDSfJXviCZbbQc4d5or4uSPC6qOKRqNk4'
    worksheetName = 'subscription'
    URL = 'https://docs.google.com/spreadsheets/d/{0}/gviz/tq?tqx=out:csv&sheet={1}'.format(
    googleSheetId,
    worksheetName
    )
    df = pd.read_csv(URL)
    
    cloud=df[df['status']=='cloud']
    trial=df[df['status']=='trial']
    csy=df[df['status']=='csy']
    upcoming=df[df['status']=='upcoming']
    after=df[df['status']=='after']

    
    csyonb=csy[csy['USER_COUNT']==1]
    csy0prac=csy[csy['school_practice_count']==0]
    csy0prac=csy0prac[csy0prac['USER_COUNT']!=1]
    onbcsycount=len(csyonb)
    zeropraccsycount=len(csy0prac)
    csycountcount=len(csy)
    csy0prac=csy0prac.drop(['UID'], axis=1)
    csy0prac=csy0prac.drop(['active_count'], axis=1)
    csy0prac=csy0prac.drop(['status'], axis=1)
    # csy0prac=csy0prac.drop(['CREATED_DATE'], axis=1)
    return json.dumps({"data":csy0prac.values.tolist(),"tablename":"EXPIRED CURRENT SCHOOL YEAR DORMANT SCHOOL DETAILS"})
    

@app.route('/expcsytable')
def expcsytabledata():

    googleSheetId = '1A-rPVUmJ1SnDSfJXviCZbbQc4d5or4uSPC6qOKRqNk4'
    worksheetName = 'subscription'
    URL = 'https://docs.google.com/spreadsheets/d/{0}/gviz/tq?tqx=out:csv&sheet={1}'.format(
    googleSheetId,
    worksheetName
    )
    df = pd.read_csv(URL)
    
    cloud=df[df['status']=='cloud']
    trial=df[df['status']=='trial']
    csy=df[df['status']=='csy']
    upcoming=df[df['status']=='upcoming']
    after=df[df['status']=='after']

    
    csyonb=csy[csy['USER_COUNT']==1]
    csy0prac=csy[csy['school_practice_count']==0]
    csy0prac=csy0prac[csy0prac['USER_COUNT']!=1]
    onbcsycount=len(csyonb)
    zeropraccsycount=len(csy0prac)
    csycountcount=len(csy)
    csy=csy.drop(['UID'], axis=1)
    csy=csy.drop(['active_count'], axis=1)
    csy=csy.drop(['status'], axis=1)
    # csy=csy.drop(['CREATED_DATE'], axis=1)
    return json.dumps({"data":csy.values.tolist(),"tablename":"EXPIRED CURRENT SCHOOL YEAR SCHOOL DETAILS"})

@app.route('/cloudtable')
def cloudtabledata():

    googleSheetId = '1A-rPVUmJ1SnDSfJXviCZbbQc4d5or4uSPC6qOKRqNk4'
    worksheetName = 'subscription'
    URL = 'https://docs.google.com/spreadsheets/d/{0}/gviz/tq?tqx=out:csv&sheet={1}'.format(
    googleSheetId,
    worksheetName
    )
    df = pd.read_csv(URL)
    
    cloud=df[df['status']=='cloud']
    trial=df[df['status']=='trial']
    csy=df[df['status']=='csy']
    upcoming=df[df['status']=='upcoming']
    after=df[df['status']=='after']

    
    cloudonb=cloud[cloud['USER_COUNT']==1]
    cloud0prac=cloud[cloud['school_practice_count']==0]
    cloud0prac=cloud0prac[cloud0prac['USER_COUNT']!=1]
    onbcloudcount=len(cloudonb)
    zeropraccloudcount=len(cloud0prac)
    cloudcountcount=len(cloud)
    cloud=cloud.drop(['UID'], axis=1)
    cloud=cloud.drop(['active_count'], axis=1)
    cloud=cloud.drop(['status'], axis=1)
    # cloud=cloud.drop(['CREATED_DATE'], axis=1)
    return json.dumps({"data":cloud.values.tolist(),"tablename":"EXPIRED IN LAST SCHOOL YEAR SCHOOL DETAILS"}) 


@app.route('/cloudpractice')
def cloudpractice():

    googleSheetId = '1A-rPVUmJ1SnDSfJXviCZbbQc4d5or4uSPC6qOKRqNk4'
    worksheetName = 'subscription'
    URL = 'https://docs.google.com/spreadsheets/d/{0}/gviz/tq?tqx=out:csv&sheet={1}'.format(
    googleSheetId,
    worksheetName
    )
    df = pd.read_csv(URL)
    
    cloud=df[df['status']=='cloud']
    trial=df[df['status']=='trial']
    csy=df[df['status']=='csy']
    upcoming=df[df['status']=='upcoming']
    after=df[df['status']=='after']

    
    cloudonb=cloud[cloud['USER_COUNT']==1]
    cloud0prac=cloud[cloud['school_practice_count']==0]
    cloud0prac=cloud0prac[cloud0prac['USER_COUNT']!=1]
    onbcloudcount=len(cloudonb)
    zeropraccloudcount=len(cloud0prac)
    cloudcountcount=len(cloud)
    cloud0prac=cloud0prac.drop(['UID'], axis=1)
    cloud0prac=cloud0prac.drop(['active_count'], axis=1)
    cloud0prac=cloud0prac.drop(['status'], axis=1)
    # cloud0prac=cloud0prac.drop(['CREATED_DATE'], axis=1)
    return json.dumps({"data":cloud0prac.values.tolist(),"tablename":"EXPIRED IN LAST SCHOOL YEAR DORMANT SCHOOL DETAILS"}) 


@app.route('/cloudonboard')
def cloudonboard():

    googleSheetId = '1A-rPVUmJ1SnDSfJXviCZbbQc4d5or4uSPC6qOKRqNk4'
    worksheetName = 'subscription'
    URL = 'https://docs.google.com/spreadsheets/d/{0}/gviz/tq?tqx=out:csv&sheet={1}'.format(
    googleSheetId,
    worksheetName
    )
    df = pd.read_csv(URL)
    
    cloud=df[df['status']=='cloud']
    trial=df[df['status']=='trial']
    csy=df[df['status']=='csy']
    upcoming=df[df['status']=='upcoming']
    after=df[df['status']=='after']

    
    cloudonb=cloud[cloud['USER_COUNT']==1]
    cloud0prac=cloud[cloud['school_practice_count']==0]
    cloud0prac=cloud0prac[cloud0prac['USER_COUNT']!=1]
    onbcloudcount=len(cloudonb)
    zeropraccloudcount=len(cloud0prac)
    cloudcountcount=len(cloud)
    cloudonb=cloudonb.drop(['UID'], axis=1)
    cloudonb=cloudonb.drop(['active_count'], axis=1)
    cloudonb=cloudonb.drop(['status'], axis=1)
    # cloudonb=cloudonb.drop(['CREATED_DATE'], axis=1)
    return json.dumps({"data":cloudonb.values.tolist(),"tablename":"EXPIRED IN LAST SCHOOL YEAR ONBOARDING SCHOOL DETAILS"}) 






@app.route('/familyjourney/<email>')
def parentsdetailjourney(email):

    reader = geolite2.reader()

    db = mysql.connector.connect(
        host="52.35.73.200",
        user="ieuser",
        passwd="mijyBg96wtdDSAB5",
        database="compass")



    query="""select sm.id,sm.name,um.USER_ID as Parents_Id,um.USER_NAME as Parents_Name,up.ip_address,um.contact_number,
    sm.city,sm.state,sm.country,um.EMAIL_ID as Parents_Email,um.user_type,
    count(atd.USER_ID) as Practice_Count,max(date(atd.modified_date)) as Last_Practice_Date,date(um.created_date) Sign_Up_Date,
    max(date(ll.LAST_LOGGED_IN)) as Last_Login_Date,
    round((sum(atd.CURSOR_END)-sum(atd.CURSOR_START))/60) as mindful_minutes
    from user_master as um left join user_profile as up
    on um.user_id=up.user_id
    left join audio_track_detail as atd on atd.USER_ID=um.USER_ID
    left join school_master as sm on sm.id=up.SCHOOL_ID
    left join login_logs as ll on ll.USER_ID=um.USER_ID
    where um.ROLE_ID=3 and date(um.created_date)>'2020-03-17'  AND um.IS_DISABLED !='Y' and um.INCOMPLETE_SIGNUP !='Y' and um.email_id not like '%test%' and 
    um.email_id not like '%1gen%'and um.email_id  like '%"""+email+"""%' and um.user_name not like '%test%' and um.user_name not like '%1gen%' and um.email_id <>''
    group by um.user_id;"""


    df=pd.read_sql(query, con=db)
  
    df.mindful_minutes=df.mindful_minutes.fillna(0)
    df.mindful_minutes=df.mindful_minutes.astype('int64')
    df['Last_Practice_Date']=pd.to_datetime(df['Last_Practice_Date'])
    df['Last_Practice_Date'].fillna("NO PRACTICE", inplace=True)
    df['Last_Login_Date']=pd.to_datetime(df['Last_Login_Date'])
    df['Last_Login_Date'].fillna("NO LOGIN", inplace=True)
    df['Sign_Up_Date']=pd.to_datetime(df['Sign_Up_Date'])
    df['name'].fillna("NO SCHOOL INFO", inplace=True)
    def country1(i):
        location = reader.get(i)
        c=(location['country']['names']['en'])
        return c
    def state1(i):
        location = reader.get(i)
        s=(location['subdivisions'][0]['names']['en'])
        return s
    def city1(i):
        location = reader.get(i)
        city=location['city']['names']['en']
        return city
    def pn_country(i):
        import phonenumbers
        import pycountry
        from phonenumbers.phonenumberutil import (
        region_code_for_country_code,
        region_code_for_number,)
        pn = phonenumbers.parse('+'+i)   
        country = pycountry.countries.get(alpha_2=region_code_for_number(pn))
        con=country.name
        return con

    ip=df['ip_address'].tolist()
    phone_number=df['contact_number'].tolist()
    Parents_Name=df['Parents_Name'].tolist()
    Parents_Email=df.Parents_Email.tolist()
    School_Name=df['name'].tolist()
    state=df['state'].tolist()
    country=df['country'].tolist()
    city=df['city'].tolist()
    sign_up_date=df['Sign_Up_Date'].tolist()
    last_prac_date=df['Last_Practice_Date'].tolist()
    last_login_date=df['Last_Login_Date'].tolist()
    practice_count=df['Practice_Count'].tolist()
    mindful_minutes=df['mindful_minutes'].tolist()

    for i in range(len(ip)):

        if country[i] is None:
            try:
                country[i]=country1(ip[i])
            except:
                pass
        elif country[i]=='null':
            try:
                country[i]=country1(ip[i])
            except:
                pass
        if city[i] is None:
            try:
                city[i]=city1(ip[i])
            except:
                pass
        elif city[i]=='null':
            try:
                city[i]=city1(ip[i])
            except:
                pass
        if state[i] is None:

            try:
                state[i]=state1(ip[i])
            except:
                pass
        elif state[i] =='NO state info':

            try:
                state[i]=state1(ip[i])
            except:
                pass    
        if country[i] is None:
            try:
                country[i]=pn_country(phone_number[i])
            except:
                pass
        if country[i] is None:
            country[i]=''
        if state[i] is None:
            state[i]=''

        if  last_prac_date[i] != 'NO PRACTICE' :

            last_prac_date[i]=last_prac_date[i].strftime('%d %b %Y')
        else:

            last_prac_date[i]="NO PRACTICE"

        if  last_login_date[i] != 'NO LOGIN' :

            last_login_date[i]=last_login_date[i].strftime('%d %b %Y')
        else:

            last_login_date[i]="NO LOGIN"

        if sign_up_date[i] is not None:
            sign_up_date[i]=sign_up_date[i].strftime('%d %b %Y')

    state12 =  [each_string.lower() for each_string in state]
    hello="""select um.USER_ID,um.EMAIL_ID,round(sum(atd.CURSOR_END-atd.CURSOR_START/60)) as Mindful_Minutes,
    avg(af.RATING) as Average_Rating, count(distinct(atd.MODIFIED_DATE)) as Completed_Session
    from user_master as um
    left join audio_track_detail as atd on atd.USER_ID=um.USER_ID
    left join audio_feedback as af on af.USER=um.USER_ID
    where um.EMAIL_ID like '%"""+email+"""%'
    group by um.USER_ID"""
    
    dataframeqwerty=pd.read_sql(hello, con=db)
    dataframeqwerty=dataframeqwerty.fillna(0)
    avgrating=str(dataframeqwerty['Average_Rating'][0])
    Completed_Session=str(dataframeqwerty['Completed_Session'][0])
    
    cv={'sessioncompleted':[Completed_Session],'familyrating':[avgrating],'mindful':list(df['mindful_minutes']),'name':Parents_Name,'email':Parents_Email,'country':country,'contact':phone_number,'school':School_Name,'city':city,
                               'state':state12,'signup':sign_up_date,
                               'login':last_login_date,'practice':last_prac_date,'totalsession':practice_count}
    
    q1="""select atd.modified_date as sign_up ,count(atd.USER_ID) as count
        from user_master as um left join user_profile as up on up.USER_ID=um.USER_ID
        left join school_master as sm on sm.id=up.SCHOOL_ID
        inner join audio_track_detail as atd on atd.USER_ID=um.USER_ID
        where  um.ROLE_ID=3  and DATE(um.CREATED_DATE) > '2020-03-17' AND um.IS_DISABLED !='Y' and um.INCOMPLETE_SIGNUP !='Y' and um.user_name not like "%test%"  AND
        um.EMAIL_ID NOT LIKE "%TEST%" AND um.EMAIL_ID NOT LIKE "%1gen%" and um.email_id  like '%"""+email+"""%'  AND um.EMAIL_ID <> ""
        group by sign_up"""
    df1=pd.read_sql(q1, con=db)
    
    
    df1=df1.dropna()
    # print(df1)
    df1['sign_up'] = pd.to_datetime(df1['sign_up'], errors = 'coerce')
    df1['sign_upn'] = pd.to_datetime(df1['sign_up']) - timedelta(hours=4)
    df2 = df1.groupby([df1['sign_upn'].dt.date]).sum()
#     print(df2)
    
    cdate=[]
    for i in df2.index:
        x=i.strftime('%s')
        cdate.append(float(x)*1000)
    count=[]
    for i in df2['count'] :
        count.append(i)
    count1=np.cumsum(count)
    df3 = pd.DataFrame(list(zip(cdate,count)), 
                       columns =['date', 'count']) 
    df4 = pd.DataFrame(list(zip(cdate,count1)), 
                       columns =['date', 'count'])
    data = df3.values.tolist()
    data1 = df4.values.tolist()
    
    query1="""select x.AGE_GROUP, sum(case when x.AUDIO_DAY not like '%bonus%' and x.AUDIO_DAY not like '%sound%' then x.counts end) as 'Daily',
    sum(case when x.AUDIO_DAY  like '%bonus%' then x.counts end) as 'Transtion',
    sum(case when x.AUDIO_DAY  like '%sound%'  then x.counts end) as 'Sound Practice'  from
    (select pa.audio_day, count(um.user_id) as counts, pm.age_group
    from user_master um
    inner join audio_track_detail atd on atd.user_id=um.user_id
    inner join programs_audio pa on pa.AUDIO_ID=atd.PROGRAM_AUDIO_ID
    inner join program_master pm on pm.PROGRAM_ID=pa.PROGRAM_ID
    where um.ROLE_ID=3 and date(um.created_date)>'2020-03-17'  AND um.IS_DISABLED !='Y' and um.INCOMPLETE_SIGNUP !='Y' and um.EMAIL_ID not like '%1gen%' 
    and um.EMAIL_ID not like '%test%' and um.email_id  like '%"""+email+"""%' and um.USER_NAME not like '%test%'  
    group by audio_day)x
    group by AGE_GROUP"""
    dataframe=pd.read_sql(query1, con=db)
    
    newquery="""select sum(x.daily) as Daily,sum(x.bonus) as Transition,sum(x.sound) as 'Sound Practice' from 
    (select  pa.audio_day ,
    count(case when pa.audio_day not  like '%sound%' and pa.audio_day not  like '%bonus%' then (um.user_id)end) as daily,
    count(case when pa.audio_day   like '%sound%' then (um.user_id)end) as sound,
    count(case when pa.audio_day   like '%bonus%' then (um.user_id)end) as bonus
    from user_master um
    inner join audio_track_detail atd on atd.user_id=um.user_id
    inner join programs_audio pa on pa.AUDIO_ID=atd.PROGRAM_AUDIO_ID
    inner join program_master pm on pm.PROGRAM_ID=pa.PROGRAM_ID
    where um.ROLE_ID=3 and date(um.created_date)>'2020-03-17'  AND um.IS_DISABLED !='Y' and um.INCOMPLETE_SIGNUP !='Y' and um.EMAIL_ID not like '%1gen%'
    and um.EMAIL_ID not like '%test%' and um.email_id  like '%"""+email+"""%' and um.USER_NAME not like '%test%' 
    group by um.user_id)x"""
    
    dataftame2=pd.read_sql(newquery, con=db)
    
    
    
    dataframe=dataframe.fillna(0)
    daily=dataftame2['Daily'].sum()
    Transtion=dataftame2['Transition'].sum()
    Sound=dataftame2['Sound Practice'].sum()
    prog=list(dataframe['AGE_GROUP'])
    daily1=list(dataframe['Daily'])
    Transtion1=list(dataframe['Transtion'])
    sound1=list(dataframe['Sound Practice'])
    program={"prog":prog,"dtotal":daily,"trant":Transtion,"soundt":Sound,"sound":sound1,"transition":Transtion1,"daily":daily1}
    
    temp = {'count':cv,"pbar":data,"pline":data1,"program":program}
    return json.dumps(temp)
    
        
    

@app.route('/smsfail')
def sms_table():

    reader = geolite2.reader()

    db = mysql.connector.connect(
        host="52.35.73.200",
        user="ieuser",
        passwd="mijyBg96wtdDSAB5",
        database="compass")
    
    googleSheetId = '1qxD3mf1BLq7vI6h-DJ2zkvmzhejrXTcJOQrw2yElWGk'
    worksheetName = 'chart'
    URL = 'https://docs.google.com/spreadsheets/d/{0}/gviz/tq?tqx=out:csv&sheet={1}'.format(
    googleSheetId,worksheetName)


    googleSheetId1 = '1qxD3mf1BLq7vI6h-DJ2zkvmzhejrXTcJOQrw2yElWGk'
    worksheetName1 = 'table'
    URL1 = 'https://docs.google.com/spreadsheets/d/{0}/gviz/tq?tqx=out:csv&sheet={1}'.format(
    googleSheetId1,worksheetName1)
    df2 = pd.read_csv(URL)
    date=list(df2['date'])
    sucess=list(df2['sucess'])
    fail=list(df2['fail'])
    df1 = pd.read_csv(URL1)
#     print(df1)
    number=str(tuple(df1['phone']))

    query="""select sm.id,sm.name,um.USER_ID as Parents_Id,um.USER_NAME as Parents_Name,up.ip_address,um.contact_number,
    sm.city,sm.state,sm.country,um.EMAIL_ID as Parents_Email,um.user_type,
    count(atd.USER_ID) as Practice_Count,max(date(atd.modified_date)) as Last_Practice_Date,date(um.created_date) Sign_Up_Date,
    max(date(ll.LAST_LOGGED_IN)) as Last_Login_Date,
    round((sum(atd.CURSOR_END)-sum(atd.CURSOR_START))/60) as mindful_minutes
    from user_master as um left join user_profile as up
    on um.user_id=up.user_id
    left join audio_track_detail as atd on atd.USER_ID=um.USER_ID
    left join school_master as sm on sm.id=up.SCHOOL_ID
    left join login_logs as ll on ll.USER_ID=um.USER_ID
    where um.contact_number in """+number+""" and um.ROLE_ID=3 and date(um.created_date)>'2020-03-17'  AND um.IS_DISABLED !='Y' and um.INCOMPLETE_SIGNUP !='Y' and um.email_id not like '%test%' and 
    um.email_id not like '%1gen%' and um.user_name not like '%test%' and um.user_name not like '%1gen%' and um.email_id <>''
    group by um.user_id;"""
    
    df=pd.read_sql(query, con=db)
    
    df.mindful_minutes=df.mindful_minutes.fillna(0)
    df.mindful_minutes=df.mindful_minutes.astype('int64')
    df['Last_Practice_Date']=pd.to_datetime(df['Last_Practice_Date'])
    df['Last_Practice_Date'].fillna("NO PRACTICE", inplace=True)
    df['Last_Login_Date']=pd.to_datetime(df['Last_Login_Date'])
    df['Last_Login_Date'].fillna("NO LOGIN", inplace=True)
    df['Sign_Up_Date']=pd.to_datetime(df['Sign_Up_Date'])
    df['name'].fillna("NO SCHOOL INFO", inplace=True)
    def country1(i):
        location = reader.get(i)
        c=(location['country']['names']['en'])
        return c
    def state1(i):
        location = reader.get(i)
        s=(location['subdivisions'][0]['names']['en'])
        return s
    def city1(i):
        location = reader.get(i)
        city=location['city']['names']['en']
        return city
    def pn_country(i):
        import phonenumbers
        import pycountry
        from phonenumbers.phonenumberutil import (
        region_code_for_country_code,
        region_code_for_number,)
        pn = phonenumbers.parse('+'+i)   
        country = pycountry.countries.get(alpha_2=region_code_for_number(pn))
        con=country.name
        return con

    ip=df['ip_address'].tolist()
    phone_number=df['contact_number'].tolist()
    Parents_Name=df['Parents_Name'].tolist()
    Parents_Email=df.Parents_Email.tolist()
    School_Name=df['name'].tolist()
    state=df['state'].tolist()
    country=df['country'].tolist()
    city=df['city'].tolist()
    sign_up_date=df['Sign_Up_Date'].tolist()
    last_prac_date=df['Last_Practice_Date'].tolist()
    last_login_date=df['Last_Login_Date'].tolist()
    practice_count=df['Practice_Count'].tolist()
    mindful_minutes=df['mindful_minutes'].tolist()

    for i in range(len(ip)):

        if country[i] is None:
            try:
                country[i]=country1(ip[i])
            except:
                pass
        elif country[i]=='null':
            try:
                country[i]=country1(ip[i])
            except:
                pass
        if city[i] is None:
            try:
                city[i]=city1(ip[i])
            except:
                pass
        elif city[i]=='null':
            try:
                city[i]=city1(ip[i])
            except:
                pass
        if state[i] is None:

            try:
                state[i]=state1(ip[i])
            except:
                pass
        elif state[i] =='NO state info':

            try:
                state[i]=state1(ip[i])
            except:
                pass    
        if country[i] is None:
            try:
                country[i]=pn_country(phone_number[i])
            except:
                pass
        if country[i] is None:
            country[i]=''
        if state[i] is None:
            state[i]=''

        if  last_prac_date[i] != 'NO PRACTICE' :

            last_prac_date[i]=last_prac_date[i].strftime('%d %b %Y')
        else:

            last_prac_date[i]="NO PRACTICE"

        if  last_login_date[i] != 'NO LOGIN' :

            last_login_date[i]=last_login_date[i].strftime('%d %b %Y')
        else:

            last_login_date[i]="NO LOGIN"

        if sign_up_date[i] is not None:
            sign_up_date[i]=sign_up_date[i].strftime('%d %b %Y')

    state12 =  [each_string.lower() for each_string in state]
    cv={'pnn':Parents_Name,'pe':Parents_Email,'co':country,'phone':phone_number,'sn':School_Name,'ct':city,
                               'st':state12,'sp':sign_up_date,
                               'll':last_login_date,'lp':last_prac_date,'pc':practice_count}
    dftry = pd.DataFrame.from_dict(cv)
    
    dftry= dftry.drop("co", axis=1)
#     print(dftry)

    return json.dumps({"data":dftry.values.tolist(),"fail":fail,"sucess":sucess,"date":date})


@app.route('/practicetrendnew')
def practice_trendnew():
    db = mysql.connector.connect(host="34.214.24.229",    # your host, usually 
                     user="IE-tech",         # your username
                     passwd="IE-tech@2O2O",  # your password
                     db="compassJune") 
    active_trend_right="""select monthname(atd.MODIFIED_DATE) as Month,
    count(case when atd.MODIFIED_DATE between '2018-08-01 00:00:00.000000' and '2019-08-01 00:00:00.000000'
    then atd.user_id end) as 'Practice_count in 2018-2019',
    count(case when atd.MODIFIED_DATE between '2019-08-01 00:00:00.000000' and '2020-08-01 00:00:00.000000'
    then atd.user_id end) as 'Practice_count in 2019-2020'
    from audio_track_detail as atd 
    left join user_master as um on atd.USER_ID=um.USER_ID
    left join user_profile as up on up.USER_ID=um.USER_ID 
    left join school_master as sm on up.SCHOOL_ID=sm.id
    where um.user_name not like '%TEST%' and um.IS_DISABLED != 'Y' and um.IS_BLOCKED != 'Y' 
    and um.INCOMPLETE_SIGNUP != 'Y' and um.role_id !=3  and  um.USER_ID in (select ll.USER_ID from audio_track_detail as ll)
    group by monthname(atd.MODIFIED_DATE)"""
    db1 = mysql.connector.connect(
    host="52.35.73.200",
    user="ieuser",
    passwd="mijyBg96wtdDSAB5",
    database="compass") 
    active_trend_right2="""select monthname(atd.MODIFIED_DATE) as Month,
    count(case when atd.MODIFIED_DATE between '2018-08-01 00:00:00.000000' and '2019-08-01 00:00:00.000000'
    then atd.user_id end) as 'Practice_count in 2018-2019',
    count(case when atd.MODIFIED_DATE between '2019-08-01 00:00:00.000000' and '2020-08-01 00:00:00.000000'
    then atd.user_id end) as 'Practice_count in 2019-2020'
    from audio_track_detail as atd 
    left join user_master as um on atd.USER_ID=um.USER_ID
    left join user_profile as up on up.USER_ID=um.USER_ID 
    left join school_master as sm on up.SCHOOL_ID=sm.id
    where um.user_name not like '%TEST%' and um.IS_DISABLED != 'Y' 
    and um.INCOMPLETE_SIGNUP != 'Y' and um.role_id =3  and  um.USER_ID in (select ll.USER_ID from audio_track_detail as ll)
    group by monthname(atd.MODIFIED_DATE)"""
    practice_left2= pd.read_sql(active_trend_right2, con=db1)
#     print(practice_left2)
    
    bar2=[practice_left2[practice_left2['Month']=='March']['Practice_count in 2019-2020'].item(),practice_left2[practice_left2['Month']=='April']['Practice_count in 2019-2020'].item(),practice_left2[practice_left2['Month']=='May']['Practice_count in 2019-2020'].item()]
    ACTIVETREND1={'bar2':bar2}
    
    practice_left= pd.read_sql(active_trend_right, con=db)
    month=["AUG","SEP","OCT","NOV","DEC","JAN","FEB","MAR","APR","MAY","JUN","JUL"]
    
    curve=[practice_left[practice_left['Month']=='August']['Practice_count in 2018-2019'].item(),practice_left[practice_left['Month']=='September']['Practice_count in 2018-2019'].item(),practice_left[practice_left['Month']=='October']['Practice_count in 2018-2019'].item(),practice_left[practice_left['Month']=='November']['Practice_count in 2018-2019'].item(),practice_left[practice_left['Month']=='December']['Practice_count in 2018-2019'].item(),practice_left[practice_left['Month']=='January']['Practice_count in 2018-2019'].item(),practice_left[practice_left['Month']=='February']['Practice_count in 2018-2019'].item(),practice_left[practice_left['Month']=='March']['Practice_count in 2018-2019'].item(),practice_left[practice_left['Month']=='April']['Practice_count in 2018-2019'].item(),practice_left[practice_left['Month']=='May']['Practice_count in 2018-2019'].item(),practice_left[practice_left['Month']=='June']['Practice_count in 2018-2019'].item(),practice_left[practice_left['Month']=='July']['Practice_count in 2018-2019'].item()]
    bar=[practice_left[practice_left['Month']=='August']['Practice_count in 2019-2020'].item(),practice_left[practice_left['Month']=='September']['Practice_count in 2019-2020'].item(),practice_left[practice_left['Month']=='October']['Practice_count in 2019-2020'].item(),practice_left[practice_left['Month']=='November']['Practice_count in 2019-2020'].item(),practice_left[practice_left['Month']=='December']['Practice_count in 2019-2020'].item(),practice_left[practice_left['Month']=='January']['Practice_count in 2019-2020'].item(),practice_left[practice_left['Month']=='February']['Practice_count in 2019-2020'].item(),practice_left[practice_left['Month']=='March']['Practice_count in 2019-2020'].item(),practice_left[practice_left['Month']=='April']['Practice_count in 2019-2020'].item(),practice_left[practice_left['Month']=='May']['Practice_count in 2019-2020'].item(),practice_left[practice_left['Month']=='June']['Practice_count in 2019-2020'].item(),practice_left[practice_left['Month']=='July']['Practice_count in 2019-2020'].item()]
    ACTIVETREND={'month':month,'curve':curve,'bar':bar}
    ACTIVETREND=[ACTIVETREND,ACTIVETREND1]
    return json.dumps(ACTIVETREND)

@app.route('/activetrendnew')
def active_trendnew():
    db = mysql.connector.connect(host="34.214.24.229",    # your host, usually 
                     user="IE-tech",         # your username
                     passwd="IE-tech@2O2O",  # your password
                     db="compassJune") 
    active_trend_right="""select monthname(atd.MODIFIED_DATE) as Month,
    count(distinct(case when atd.MODIFIED_DATE between '2018-08-01 00:00:00.000000' and '2019-08-01 00:00:00.000000'
    then atd.user_id end)) as 'Practice_count in 2018-2019',
    count(distinct((case when atd.MODIFIED_DATE between '2019-08-01 00:00:00.000000' and '2020-08-01 00:00:00.000000'
    then atd.user_id end))) as 'Practice_count in 2019-2020'
    from audio_track_detail as atd 
    left join user_master as um on atd.USER_ID=um.USER_ID
    left join user_profile as up on up.USER_ID=um.USER_ID 
    left join school_master as sm on up.SCHOOL_ID=sm.id
    where um.user_name not like '%TEST%' and um.IS_DISABLED != 'Y' and um.IS_BLOCKED != 'Y' 
    and um.INCOMPLETE_SIGNUP != 'Y' and um.role_id !=3  and  um.USER_ID in (select ll.USER_ID from audio_track_detail as ll)
    group by monthname(atd.MODIFIED_DATE)"""
    db1 = mysql.connector.connect(
    host="52.35.73.200",
    user="ieuser",
    passwd="mijyBg96wtdDSAB5",
    database="compass") 
    active_trend_right2="""select monthname(atd.MODIFIED_DATE) as Month,
    count(distinct(case when atd.MODIFIED_DATE between '2018-08-01 00:00:00.000000' and '2019-08-01 00:00:00.000000'
    then atd.user_id end)) as 'Practice_count in 2018-2019',
    count(distinct((case when atd.MODIFIED_DATE between '2019-08-01 00:00:00.000000' and '2020-08-01 00:00:00.000000'
    then atd.user_id end))) as 'Practice_count in 2019-2020'
    from audio_track_detail as atd 
    left join user_master as um on atd.USER_ID=um.USER_ID
    left join user_profile as up on up.USER_ID=um.USER_ID 
    left join school_master as sm on up.SCHOOL_ID=sm.id
    where um.user_name not like '%TEST%' and um.IS_DISABLED != 'Y' 
    and um.INCOMPLETE_SIGNUP != 'Y' and um.role_id =3  and  um.USER_ID in (select ll.USER_ID from audio_track_detail as ll)
    group by monthname(atd.MODIFIED_DATE)"""
    practice_left2= pd.read_sql(active_trend_right2, con=db1)
#     print(practice_left2)
    
    bar2=[practice_left2[practice_left2['Month']=='March']['Practice_count in 2019-2020'].item(),practice_left2[practice_left2['Month']=='April']['Practice_count in 2019-2020'].item(),practice_left2[practice_left2['Month']=='May']['Practice_count in 2019-2020'].item()]
    ACTIVETREND1={'bar2':bar2}
    
    practice_left= pd.read_sql(active_trend_right, con=db)
    month=["AUG","SEP","OCT","NOV","DEC","JAN","FEB","MAR","APR","MAY","JUN","JUL"]
    
    curve=[practice_left[practice_left['Month']=='August']['Practice_count in 2018-2019'].item(),practice_left[practice_left['Month']=='September']['Practice_count in 2018-2019'].item(),practice_left[practice_left['Month']=='October']['Practice_count in 2018-2019'].item(),practice_left[practice_left['Month']=='November']['Practice_count in 2018-2019'].item(),practice_left[practice_left['Month']=='December']['Practice_count in 2018-2019'].item(),practice_left[practice_left['Month']=='January']['Practice_count in 2018-2019'].item(),practice_left[practice_left['Month']=='February']['Practice_count in 2018-2019'].item(),practice_left[practice_left['Month']=='March']['Practice_count in 2018-2019'].item(),practice_left[practice_left['Month']=='April']['Practice_count in 2018-2019'].item(),practice_left[practice_left['Month']=='May']['Practice_count in 2018-2019'].item(),practice_left[practice_left['Month']=='June']['Practice_count in 2018-2019'].item(),practice_left[practice_left['Month']=='July']['Practice_count in 2018-2019'].item()]
    bar=[practice_left[practice_left['Month']=='August']['Practice_count in 2019-2020'].item(),practice_left[practice_left['Month']=='September']['Practice_count in 2019-2020'].item(),practice_left[practice_left['Month']=='October']['Practice_count in 2019-2020'].item(),practice_left[practice_left['Month']=='November']['Practice_count in 2019-2020'].item(),practice_left[practice_left['Month']=='December']['Practice_count in 2019-2020'].item(),practice_left[practice_left['Month']=='January']['Practice_count in 2019-2020'].item(),practice_left[practice_left['Month']=='February']['Practice_count in 2019-2020'].item(),practice_left[practice_left['Month']=='March']['Practice_count in 2019-2020'].item(),practice_left[practice_left['Month']=='April']['Practice_count in 2019-2020'].item(),practice_left[practice_left['Month']=='May']['Practice_count in 2019-2020'].item(),practice_left[practice_left['Month']=='June']['Practice_count in 2019-2020'].item(),practice_left[practice_left['Month']=='July']['Practice_count in 2019-2020'].item()]
    ACTIVETREND={'month':month,'curve':curve,'bar':bar}
    ACTIVETREND=[ACTIVETREND,ACTIVETREND1]
    return json.dumps(ACTIVETREND)

@app.route('/weekprac')
def weekprac():
    db = mysql.connector.connect(host="34.214.24.229",    # your host, usually localhost
                     user="IE-tech",         # your username
                     passwd="IE-tech@2O2O",  # your password
                     db="compassJune")  
    weekd="""select * from
    (select dayofweek(atd.MODIFIED_DATE) as DAY1,dayname(atd.MODIFIED_DATE) as DAY_name,count(distinct(atd.USER_ID)) as user1 ,count(atd.USER_ID) as prac1 from audio_track_detail atd
    right join user_master um
    on atd.USER_ID=um.USER_ID
    where  um.IS_DISABLED != 'Y'  
    and um.INCOMPLETE_SIGNUP != 'Y' and um.role_id !=3 and um.USER_NAME not like '%test%' 
    and um.IS_BLOCKED != 'Y'
    and date(atd.MODIFIED_DATE) > '2019-07-31'
    group by 1)Q1

    INNER JOIN
    (select dayofweek(atd.MODIFIED_DATE) as DAY2,dayname(atd.MODIFIED_DATE) as DAY_name2,count(distinct(atd.USER_ID)) as user2 ,count(atd.USER_ID) as prac2 from audio_track_detail atd
    right join user_master um
    on atd.USER_ID=um.USER_ID
    where  um.IS_DISABLED != 'Y'  
    and um.INCOMPLETE_SIGNUP != 'Y' and um.role_id !=3 and um.USER_NAME not like '%test%' 
    and um.IS_BLOCKED != 'Y'
    and date(atd.MODIFIED_DATE) > '2018-07-31' and date(atd.MODIFIED_DATE) < '2019-08-01'
    group by 1)Q2
    ON Q2.DAY2=Q1.DAY1"""
    df=pd.read_sql(weekd,con=db)
    print(df)
    week=df['DAY_name'].tolist()
    user1920=df['user1'].tolist()
    prac1920=df['prac1'].tolist()
    user1819=df['user2'].tolist()
    prac1819=df['prac2'].tolist()
    data={'week':week,'user1920':user1920,'prac1920':prac1920,'user1819':user1819,'prac1819':prac1819}
    temp={"data":data}
    return json.dumps(temp)

# @app.route('/renewal19/<month>/Active20')
# def renewalact2019(month):
#     db = mysql.connector.connect(host="34.214.24.229",    # your host, usually localhost
#                      user="IE-tech",         # your username
#                      passwd="IE-tech@2O2O",  # your password
#                      db="compassJune")  
#     q1="""select sm.ID,year(sub.SUBSCRIPTION_EXPIRE_DATE) as year,monthname(sub.SUBSCRIPTION_EXPIRE_DATE) as month, sm.NAME as school_name,um.USER_NAME AS admin_name,um.EMAIL_ID AS admin_email  ,sub.SUBSCRIPTION_EXPIRE_DATE as renewal_date from 
#     user_profile as up inner join user_master as um on um.USER_ID=up.USER_ID
#     inner join school_master as sm on sm.id=up.SCHOOL_ID 
#     INNER join subscription_master sub on sub.USER_ID=up.USER_ID
#     WHERE um.USER_NAME not like "%test%" and um.EMAIL_ID not like "%1gen%" AND um.IS_DISABLED !='Y' and um.INCOMPLETE_SIGNUP !='Y' and um.role_id !=3 and um.IS_BLOCKED !='Y'   and admin_col ='ADMIN' and date(sub.SUBSCRIPTION_EXPIRE_DATE)>'2019-06-31' and date(sub.SUBSCRIPTION_EXPIRE_DATE) <'2020-04-01'
#      GROUP BY sm.ID"""
#     q1=pd.read_sql(q1,con=db)
#     q1['month'] = q1['month'].str.upper()
#     year=str(q1.loc[q1['month'].str.contains(month), 'year'].iloc[0])
#     renewal="""select school_name,admin_name,admin_email,renewal_date,USER_COUNT,school_practice_count,last_login_date,last_practice_date from
#     (select sm.ID, sm.NAME as school_name,um.USER_NAME AS admin_name,um.EMAIL_ID AS admin_email  ,sub.SUBSCRIPTION_EXPIRE_DATE as renewal_date from 
#     user_profile as up inner join user_master as um on um.USER_ID=up.USER_ID
#     inner join school_master as sm on sm.id=up.SCHOOL_ID 
#     INNER join subscription_master sub on sub.USER_ID=up.USER_ID
#     WHERE um.USER_NAME not like "%test%" and um.EMAIL_ID not like "%1gen%" AND um.IS_DISABLED !='Y' and um.INCOMPLETE_SIGNUP !='Y' and um.role_id !=3 and um.IS_BLOCKED !='Y'   and admin_col ='ADMIN' and year(sub.SUBSCRIPTION_EXPIRE_DATE)="""+year+""" and monthname(sub.SUBSCRIPTION_EXPIRE_DATE) like '%"""+month+"""%'
#      GROUP BY sm.ID) q1
#      inner join 
#      (select sm.ID, count(distinct(up.USER_ID)) AS USER_COUNT, count(atd.USER_ID) as school_practice_count, max(ll.LAST_LOGGED_IN) as last_login_date,max(atd.MODIFIED_DATE) as last_practice_date  from 
#     user_profile as up inner join user_master as um on um.USER_ID=up.USER_ID
#     inner join school_master as sm on sm.id=up.SCHOOL_ID 
#     INNER join subscription_master sub on sub.USER_ID=up.USER_ID
#     inner join audio_track_detail atd on atd.USER_ID=up.USER_ID
#     left join login_logs ll on ll.USER_ID=up.USER_ID
#     WHERE um.USER_NAME not like "%test%"  and sm.ID in (select sm.ID  from 
#     user_profile as up inner join user_master as um on um.USER_ID=up.USER_ID
#     inner join school_master as sm on sm.id=up.SCHOOL_ID 
#     INNER join subscription_master sub on sub.USER_ID=up.USER_ID
#     inner join audio_track_detail atd on atd.USER_ID=up.USER_ID
#     left join login_logs ll on ll.USER_ID=up.USER_ID
#     WHERE um.USER_NAME not like "%test%" and um.EMAIL_ID not like "%1gen%" AND um.IS_DISABLED !='Y' and um.INCOMPLETE_SIGNUP !='Y' and um.role_id !=3 and year(atd.MODIFIED_DATE)>2019 and um.IS_BLOCKED !='Y'   and year(sub.SUBSCRIPTION_EXPIRE_DATE)=2020 and monthname(sub.SUBSCRIPTION_EXPIRE_DATE) like '%"""+month+"""%'
#      GROUP BY sm.ID) and um.EMAIL_ID not like "%1gen%" AND um.IS_DISABLED !='Y' and um.INCOMPLETE_SIGNUP !='Y' and um.role_id !=3 and um.IS_BLOCKED !='Y'   and year(sub.SUBSCRIPTION_EXPIRE_DATE)="""+year+""" and monthname(sub.SUBSCRIPTION_EXPIRE_DATE) like '%"""+month+"""%'
#      GROUP BY sm.ID) q2
#      ON  q1.ID =q2.ID"""
#     renewal=pd.read_sql(renewal,con=db)
#     renewal['last_practice_date'].fillna("NO PRACTICE", inplace=True)
#     renewal['renewal_date'].fillna(" ", inplace=True)
#     renewal['last_login_date'].fillna("NO LOGIN", inplace=True)
#     LAST_PRACTICE_DATE=[]
#     for i in renewal['last_practice_date']:
#         if  i != 'NO PRACTICE' :
#             LAST_PRACTICE_DATE.append(i.strftime("%d %b %Y "))
#         else:
#             LAST_PRACTICE_DATE.append("NO PRACTICE")
#     LAST_LOGIN_DATE=[]
#     for i in renewal['last_login_date']:
#         if  i != 'NO LOGIN' :
#             LAST_LOGIN_DATE.append(i.strftime("%d %b %Y "))
#         else:
#             LAST_LOGIN_DATE.append("NO LOGIN")
#     RENEWAL_DATE =[]
#     for i in renewal['renewal_date']:
#         if  i != ' ' :
#             RENEWAL_DATE.append(i.strftime("%d %b %Y "))
#         else:
#             RENEWAL_DATE.append("NO PRACTICE")
#     data=[]
#     for i,k,l,m,o,p,q,r in zip(renewal['school_name'].tolist(),renewal['admin_name'].tolist(),renewal['admin_email'].tolist(),RENEWAL_DATE,LAST_PRACTICE_DATE,LAST_LOGIN_DATE,renewal['school_practice_count'].tolist(),renewal['USER_COUNT'].tolist()) :
#         data.append([i,k,l,m,o,p,q,r])
#     temp ={"data":data}
# #     print(len(data))
#     return json.dumps(temp)

@app.route('/proguser')
def proguser():
    import pandas as pd
    import numpy as np
    import mysql.connector
    from datetime import datetime
    from flask import Flask,json
    db = mysql.connector.connect(host="34.214.24.229",    # your host, usually 
    user="IE-tech",         # your username
    passwd="IE-tech@2O2O",  # your password
    db="compassJune") 
    programwise="""
    select pa.PROGRAM_ID as pg,pm.PROGRAM_NAME as pn,monthname(atd.MODIFIED_DATE) as Month,
    count(distinct(case when atd.MODIFIED_DATE between '2018-08-01 00:00:00.000000' and '2019-08-01 00:00:00.000000'
    then atd.user_id end)) as 'Practice_count in 2018-2019',
    count(distinct((case when atd.MODIFIED_DATE between '2019-08-01 00:00:00.000000' and '2020-08-01 00:00:00.000000'
    then atd.user_id end))) as 'Practice_count in 2019-2020'
    from audio_track_detail as atd 
    left join user_master as um on atd.USER_ID=um.USER_ID
    left join user_profile as up on up.USER_ID=um.USER_ID 
    left join school_master as sm on up.SCHOOL_ID=sm.id
    left join programs_audio pa on pa.AUDIO_ID=atd.PROGRAM_AUDIO_ID
    inner join program_master pm on pm.PROGRAM_ID=pa.PROGRAM_ID
    where um.user_name not like '%TEST%' and um.IS_DISABLED != 'Y' and um.IS_BLOCKED != 'Y' 
    and um.INCOMPLETE_SIGNUP != 'Y' and um.role_id !=3  and  um.USER_ID in (select ll.USER_ID from audio_track_detail as ll)
    group by pn, monthname(atd.MODIFIED_DATE);"""
    prog_prac_table = pd.read_sql(programwise, con=db)
    month=['August','September','October','November','December','January','February','March','April','May','June','July']
    elem=[]
    mid=[]
    pre=[]
    high=[]
    alls=[]
    for i in set(prog_prac_table.pg.tolist()):
        for j in month:

            if i==1:
                df=prog_prac_table[prog_prac_table['pg']==i]
                try:

                    df=df[df['Month']==j]['Practice_count in 2019-2020']
                    pre.append(int(df))
                except:
                    pre.append(0)
            elif i==2:
                df=prog_prac_table[prog_prac_table['pg']==i]
                try:

                    df=df[df['Month']==j]['Practice_count in 2019-2020']
                    elem.append(int(df))
                except:
                    elem.append(0)
            elif i==3:
                df=prog_prac_table[prog_prac_table['pg']==i]
                try:

                    df=df[df['Month']==j]['Practice_count in 2019-2020']
                    mid.append(int(df))
                except:
                    mid.append(0)
            elif i==4:
                df=prog_prac_table[prog_prac_table['pg']==i]
                try:

                    df=df[df['Month']==j]['Practice_count in 2019-2020']
                    high.append(int(df))
                except:
                    high.append(0)

            elif i==8:
                df=prog_prac_table[prog_prac_table['pg']==i]
                try:

                    df=df[df['Month']==j]['Practice_count in 2019-2020']
                    alls.append(int(df))
                except:
                    alls.append(0)

            else:
                break
    data=[{'elem':elem,'prek':pre,'mid':mid,'high':high,'all':alls}]
    return json.dumps(data)

@app.route('/progprac')
def progprac():
    import pandas as pd
    import numpy as np
    import mysql.connector
    from datetime import datetime
    from flask import Flask,json
    db = mysql.connector.connect(host="34.214.24.229",    # your host, usually 
    user="IE-tech",         # your username
    passwd="IE-tech@2O2O",  # your password
    db="compassJune") 
    programwise="""
     select pa.PROGRAM_ID as pg,pm.PROGRAM_NAME as pn,monthname(atd.MODIFIED_DATE) as Month,
    count(case when atd.MODIFIED_DATE between '2018-08-01 00:00:00.000000' and '2019-08-01 00:00:00.000000'
    then atd.user_id end) as 'Practice_count in 2018-2019',
    count(case when atd.MODIFIED_DATE between '2019-08-01 00:00:00.000000' and '2020-08-01 00:00:00.000000'
    then atd.user_id end) as 'Practice_count in 2019-2020'
    from audio_track_detail as atd 
    left join user_master as um on atd.USER_ID=um.USER_ID
    left join user_profile as up on up.USER_ID=um.USER_ID 
    left join school_master as sm on up.SCHOOL_ID=sm.id
    left join programs_audio pa on pa.AUDIO_ID=atd.PROGRAM_AUDIO_ID
    inner join program_master pm on pm.PROGRAM_ID=pa.PROGRAM_ID
    where um.user_name not like '%TEST%' and um.IS_DISABLED != 'Y' and um.IS_BLOCKED != 'Y' 
    and um.INCOMPLETE_SIGNUP != 'Y' and um.role_id !=3  and  um.USER_ID in (select ll.USER_ID from audio_track_detail as ll)
    group by pn, monthname(atd.MODIFIED_DATE);"""
    prog_prac_table = pd.read_sql(programwise, con=db)
    month=['August','September','October','November','December','January','February','March','April','May','June','July']
    elem=[]
    mid=[]
    pre=[]
    high=[]
    alls=[]
    for i in set(prog_prac_table.pg.tolist()):
        for j in month:

            if i==1:
                df=prog_prac_table[prog_prac_table['pg']==i]
                try:

                    df=df[df['Month']==j]['Practice_count in 2019-2020']
                    pre.append(int(df))
                except:
                    pre.append(0)
            elif i==2:
                df=prog_prac_table[prog_prac_table['pg']==i]
                try:

                    df=df[df['Month']==j]['Practice_count in 2019-2020']
                    elem.append(int(df))
                except:
                    elem.append(0)
            elif i==3:
                df=prog_prac_table[prog_prac_table['pg']==i]
                try:

                    df=df[df['Month']==j]['Practice_count in 2019-2020']
                    mid.append(int(df))
                except:
                    mid.append(0)
            elif i==4:
                df=prog_prac_table[prog_prac_table['pg']==i]
                try:

                    df=df[df['Month']==j]['Practice_count in 2019-2020']
                    high.append(int(df))
                except:
                    high.append(0)

            elif i==8:
                df=prog_prac_table[prog_prac_table['pg']==i]
                try:

                    df=df[df['Month']==j]['Practice_count in 2019-2020']
                    alls.append(int(df))
                except:
                    alls.append(0)

            else:
                break
    data=[{'elem':elem,'prek':pre,'mid':mid,'high':high,'all':alls}]
    return json.dumps(data)


@app.route('/canada')
def canada():
    import pandas as pd
    import numpy as np
    import mysql.connector
    from datetime import datetime
    from flask import Flask,json
    db = mysql.connector.connect(host="34.214.24.229",    # your host, usually 
                     user="IE-tech",         # your username
                     passwd="IE-tech@2O2O",  # your password
                     db="compassJune") 
    SCHOOL_TABLE_SQL="""select  y.USER_ID,y.USER_NAME,x.count,y.SCHOOL_ID,y.NAME,y.EMAIL_ID,x.STATE, y.SUBSCRIPTION_EXPIRE_DATE,x.PRACTICE_COUNT,x.sch_practice_count FROM 
    (select sm.ID,count(distinct(um.USER_ID)) as count,sm.STATE,count(atd.USER_ID) as PRACTICE_COUNT, max(atd.MODIFIED_DATE) as sch_practice_count
    from user_profile as up left join user_master as um on um.USER_ID=up.USER_ID
    left join school_master as sm on sm.id=up.SCHOOL_ID 
    left join audio_track_detail as atd on atd.USER_ID=up.USER_ID 
    left join subscription_master as sbm on sbm.USER_ID=up.USER_ID
    left join login_logs as ll on ll.USER_ID=up.USER_ID
    where um.user_name not like '%TEST%' and um.IS_DISABLED != 'Y' and um.role_id !=3 and um.INCOMPLETE_SIGNUP != 'Y' and um.IS_BLOCKED != 'Y' and sm.name not like '%blocked%'
    and sm.COUNTRY like '%canada%' 
    group by up.SCHOOL_ID)x
    inner join 
    (select up.USER_ID,up.SCHOOL_ID,um.USER_NAME ,sm.NAME,um.EMAIL_ID,sbm.SUBSCRIPTION_EXPIRE_DATE
    from user_profile as up left join user_master as um on um.USER_ID=up.USER_ID
    left join school_master as sm on sm.id=up.SCHOOL_ID 
    left join audio_track_detail as atd on atd.USER_ID=up.USER_ID 
    left join subscription_master as sbm on sbm.USER_ID=up.USER_ID
    left join login_logs as ll on ll.USER_ID=up.USER_ID
    where um.user_name not like '%TEST%' and um.IS_DISABLED != 'Y' and um.role_id !=3 and um.IS_BLOCKED != 'Y'  and um.admin_col ='ADMIN'and sm.name not like '%blocked%'
    and sm.COUNTRY like '%canada%' 
    group by up.SCHOOL_ID)y
    on y.SCHOOL_ID=x.ID
    """
    school_table = pd.read_sql(SCHOOL_TABLE_SQL, con=db)  
    school_table=school_table.dropna(subset=['USER_NAME'])
#     school_table = school_table['USER_NAME'].dropna()
    #print ('loaded dataframe from MySQL. records:', len(school_table))
#     school_table['LAST_LOGGED_IN'].fillna("NO LOGIN", inplace=True)
    school_table['sch_practice_count'].fillna("NO PRACTICE", inplace=True)
    school_table['SUBSCRIPTION_EXPIRE_DATE'].fillna(" ", inplace=True)
    school_table.fillna(value=pd.np.nan, inplace=True)
#     LAST_LOGIN_DATE=[]
#     for i in school_table['LAST_LOGGED_IN']:
#         if  i != 'NO LOGIN' :
#             LAST_LOGIN_DATE.append(i.strftime("%d %b %Y "))
#         else:
#             LAST_LOGIN_DATE.append("NO LOGIN")
#         #school_table[school_table['LAST_LOGGED_IN'] !='NO LOGIN']
    LAST_PRACTICE_DATE=[]
    for i in school_table['sch_practice_count']:
        if  i != 'NO PRACTICE' :
            LAST_PRACTICE_DATE.append(i.strftime("%d %b %Y "))
        else:
            LAST_PRACTICE_DATE.append("NO PRACTICE")
        #school_table[school_table['LAST_LOGGED_IN'] !='NO LOGIN']
    SUBSCRIPTION_EXPIRE_DATE=[]
    for i in school_table['SUBSCRIPTION_EXPIRE_DATE']:
        if  i != ' ' :
            SUBSCRIPTION_EXPIRE_DATE.append(i.strftime("%d %b %Y "))
        else:
            SUBSCRIPTION_EXPIRE_DATE.append(" ")
    #school_table[school_table['LAST_LOGGED_IN'] !='NO LOGIN']
#     print(school_table['PRACTICE_COUNT'])
    data=[]
    
    for i,k,l,m,o,p,q in zip(school_table['NAME'].tolist(),school_table['USER_NAME'].tolist(),school_table['EMAIL_ID'].tolist(),SUBSCRIPTION_EXPIRE_DATE,school_table['PRACTICE_COUNT'].tolist(),LAST_PRACTICE_DATE,school_table['count'].tolist()):
        #print(p,q,r)
        data.append([i,k,l,m,o,p,q])
    temp={"data":data}
    
#         temp={"data":data}
    return json.dumps(temp)

@app.route('/mexico')
def mexico():
    import pandas as pd
    import numpy as np
    import mysql.connector
    from datetime import datetime
    from flask import Flask,json
    db = mysql.connector.connect(host="34.214.24.229",    # your host, usually 
                     user="IE-tech",         # your username
                     passwd="IE-tech@2O2O",  # your password
                     db="compassJune") 
    SCHOOL_TABLE_SQL="""select  y.USER_ID,y.USER_NAME,x.count,y.SCHOOL_ID,y.NAME,y.EMAIL_ID,x.STATE, y.SUBSCRIPTION_EXPIRE_DATE,x.PRACTICE_COUNT,x.sch_practice_count FROM 
    (select sm.ID,count(distinct(um.USER_ID)) as count,sm.STATE,count(atd.USER_ID) as PRACTICE_COUNT, max(atd.MODIFIED_DATE) as sch_practice_count
    from user_profile as up left join user_master as um on um.USER_ID=up.USER_ID
    left join school_master as sm on sm.id=up.SCHOOL_ID 
    left join audio_track_detail as atd on atd.USER_ID=up.USER_ID 
    left join subscription_master as sbm on sbm.USER_ID=up.USER_ID
    left join login_logs as ll on ll.USER_ID=up.USER_ID
    where um.user_name not like '%TEST%' and um.IS_DISABLED != 'Y' and um.role_id !=3 and um.INCOMPLETE_SIGNUP != 'Y' and um.IS_BLOCKED != 'Y' and sm.name not like '%blocked%'
    and sm.COUNTRY like '%mexico%' 
    group by up.SCHOOL_ID)x
    inner join 
    (select up.USER_ID,up.SCHOOL_ID,um.USER_NAME ,sm.NAME,um.EMAIL_ID,sbm.SUBSCRIPTION_EXPIRE_DATE
    from user_profile as up left join user_master as um on um.USER_ID=up.USER_ID
    left join school_master as sm on sm.id=up.SCHOOL_ID 
    left join audio_track_detail as atd on atd.USER_ID=up.USER_ID 
    left join subscription_master as sbm on sbm.USER_ID=up.USER_ID
    left join login_logs as ll on ll.USER_ID=up.USER_ID
    where um.user_name not like '%TEST%' and um.IS_DISABLED != 'Y' and um.role_id !=3 and um.INCOMPLETE_SIGNUP != 'Y' and um.IS_BLOCKED != 'Y'  and um.admin_col ='ADMIN' and sm.name not like '%blocked%'
    and sm.COUNTRY like '%mexico%' 
    group by up.SCHOOL_ID)y
    on y.SCHOOL_ID=x.ID
    """
    school_table = pd.read_sql(SCHOOL_TABLE_SQL, con=db)  
    school_table=school_table.dropna(subset=['USER_NAME'])

    school_table['sch_practice_count'].fillna("NO PRACTICE", inplace=True)
    school_table['SUBSCRIPTION_EXPIRE_DATE'].fillna(" ", inplace=True)
    school_table.fillna(value=pd.np.nan, inplace=True)
    LAST_PRACTICE_DATE=[]
    for i in school_table['sch_practice_count']:
        if  i != 'NO PRACTICE' :
            LAST_PRACTICE_DATE.append(i.strftime("%d %b %Y "))
        else:
            LAST_PRACTICE_DATE.append("NO PRACTICE")
        #school_table[school_table['LAST_LOGGED_IN'] !='NO LOGIN']
    SUBSCRIPTION_EXPIRE_DATE=[]
    for i in school_table['SUBSCRIPTION_EXPIRE_DATE']:
        if  i != ' ' :
            SUBSCRIPTION_EXPIRE_DATE.append(i.strftime("%d %b %Y "))
        else:
            SUBSCRIPTION_EXPIRE_DATE.append(" ")
    #school_table[school_table['LAST_LOGGED_IN'] !='NO LOGIN']
#     print(school_table['PRACTICE_COUNT'])
    data=[]
    
    for i,k,l,m,o,p,q in zip(school_table['NAME'].tolist(),school_table['USER_NAME'].tolist(),school_table['EMAIL_ID'].tolist(),SUBSCRIPTION_EXPIRE_DATE,school_table['PRACTICE_COUNT'].tolist(),LAST_PRACTICE_DATE,school_table['count'].tolist()):
        #print(p,q,r)
        data.append([i,k,l,m,o,p,q])
    temp={"data":data}
    
#         temp={"data":data}
    return json.dumps(temp)
@app.route('/india')
def india():
    import pandas as pd
    import numpy as np
    import mysql.connector
    from datetime import datetime
    from flask import Flask,json
    db = mysql.connector.connect(host="34.214.24.229",    # your host, usually 
                     user="IE-tech",         # your username
                     passwd="IE-tech@2O2O",  # your password
                     db="compassJune") 
    SCHOOL_TABLE_SQL="""select  y.USER_ID,y.USER_NAME,x.count,y.SCHOOL_ID,y.NAME,y.EMAIL_ID,x.STATE, y.SUBSCRIPTION_EXPIRE_DATE,x.PRACTICE_COUNT,x.sch_practice_count FROM 
    (select sm.ID,count(distinct(um.USER_ID)) as count,sm.STATE,count(atd.USER_ID) as PRACTICE_COUNT, max(atd.MODIFIED_DATE) as sch_practice_count
    from user_profile as up left join user_master as um on um.USER_ID=up.USER_ID
    left join school_master as sm on sm.id=up.SCHOOL_ID 
    left join audio_track_detail as atd on atd.USER_ID=up.USER_ID 
    left join subscription_master as sbm on sbm.USER_ID=up.USER_ID
    left join login_logs as ll on ll.USER_ID=up.USER_ID
    where um.user_name not like '%TEST%' and um.IS_DISABLED != 'Y' and um.role_id !=3 and um.INCOMPLETE_SIGNUP != 'Y' and um.IS_BLOCKED != 'Y' and sm.name not like '%blocked%'
    and sm.COUNTRY like '%india%' 
    group by up.SCHOOL_ID)x
    inner join 
    (select up.USER_ID,up.SCHOOL_ID,um.USER_NAME ,sm.NAME,um.EMAIL_ID,sbm.SUBSCRIPTION_EXPIRE_DATE
    from user_profile as up left join user_master as um on um.USER_ID=up.USER_ID
    left join school_master as sm on sm.id=up.SCHOOL_ID 
    left join audio_track_detail as atd on atd.USER_ID=up.USER_ID 
    left join subscription_master as sbm on sbm.USER_ID=up.USER_ID
    left join login_logs as ll on ll.USER_ID=up.USER_ID
    where um.user_name not like '%TEST%' and um.IS_DISABLED != 'Y' and um.role_id !=3 and um.INCOMPLETE_SIGNUP != 'Y' and um.IS_BLOCKED != 'Y'  and um.admin_col ='ADMIN' and sm.name not like '%blocked%'
    and sm.COUNTRY like '%india%' 
    group by up.SCHOOL_ID)y
    on y.SCHOOL_ID=x.ID
    """
    school_table = pd.read_sql(SCHOOL_TABLE_SQL, con=db)  
    school_table=school_table.dropna(subset=['USER_NAME'])
#     school_table = school_table['USER_NAME'].dropna()
    #print ('loaded dataframe from MySQL. records:', len(school_table))
#     school_table['LAST_LOGGED_IN'].fillna("NO LOGIN", inplace=True)
    school_table['sch_practice_count'].fillna("NO PRACTICE", inplace=True)
    school_table['SUBSCRIPTION_EXPIRE_DATE'].fillna(" ", inplace=True)
    school_table.fillna(value=pd.np.nan, inplace=True)
#     LAST_LOGIN_DATE=[]
#     for i in school_table['LAST_LOGGED_IN']:
#         if  i != 'NO LOGIN' :
#             LAST_LOGIN_DATE.append(i.strftime("%d %b %Y "))
#         else:
#             LAST_LOGIN_DATE.append("NO LOGIN")
#         #school_table[school_table['LAST_LOGGED_IN'] !='NO LOGIN']
    LAST_PRACTICE_DATE=[]
    for i in school_table['sch_practice_count']:
        if  i != 'NO PRACTICE' :
            LAST_PRACTICE_DATE.append(i.strftime("%d %b %Y "))
        else:
            LAST_PRACTICE_DATE.append("NO PRACTICE")
        #school_table[school_table['LAST_LOGGED_IN'] !='NO LOGIN']
    SUBSCRIPTION_EXPIRE_DATE=[]
    for i in school_table['SUBSCRIPTION_EXPIRE_DATE']:
        if  i != ' ' :
            SUBSCRIPTION_EXPIRE_DATE.append(i.strftime("%d %b %Y "))
        else:
            SUBSCRIPTION_EXPIRE_DATE.append(" ")
    #school_table[school_table['LAST_LOGGED_IN'] !='NO LOGIN']
#     print(school_table['PRACTICE_COUNT'])
    data=[]
    
    for i,k,l,m,o,p,q in zip(school_table['NAME'].tolist(),school_table['USER_NAME'].tolist(),school_table['EMAIL_ID'].tolist(),SUBSCRIPTION_EXPIRE_DATE,school_table['PRACTICE_COUNT'].tolist(),LAST_PRACTICE_DATE,school_table['count'].tolist()):
        #print(p,q,r)
        data.append([i,k,l,m,o,p,q])
    temp={"data":data}
    
#         temp={"data":data}
    return json.dumps(temp)
    

@app.route('/other')
def other():
    import pandas as pd
    import numpy as np
    import mysql.connector
    from datetime import datetime
    from flask import Flask,json
    db = mysql.connector.connect(host="34.214.24.229",    # your host, usually 
                     user="IE-tech",         # your username
                     passwd="IE-tech@2O2O",  # your password
                     db="compassJune") 
    SCHOOL_TABLE_SQL="""select  y.USER_ID,y.USER_NAME,x.count,y.SCHOOL_ID,y.NAME,y.EMAIL_ID,x.STATE, y.SUBSCRIPTION_EXPIRE_DATE,x.PRACTICE_COUNT,x.sch_practice_count FROM 
    (select sm.ID,count(distinct(um.USER_ID)) as count,sm.STATE,count(atd.USER_ID) as PRACTICE_COUNT, max(atd.MODIFIED_DATE) as sch_practice_count
    from user_profile as up left join user_master as um on um.USER_ID=up.USER_ID
    left join school_master as sm on sm.id=up.SCHOOL_ID 
    left join audio_track_detail as atd on atd.USER_ID=up.USER_ID 
    left join subscription_master as sbm on sbm.USER_ID=up.USER_ID
    left join login_logs as ll on ll.USER_ID=up.USER_ID
    where um.user_name not like '%TEST%' and um.IS_DISABLED != 'Y' and um.role_id !=3 and um.INCOMPLETE_SIGNUP != 'Y' and um.IS_BLOCKED != 'Y' and sm.name not like '%blocked%'
    and sm.COUNTRY not like '%canada%' and sm.COUNTRY not like '%mexico%' and sm.COUNTRY not like '%india%' and sm.COUNTRY not like '%United States%' 
    group by up.SCHOOL_ID)x
    inner join 
    (select up.USER_ID,up.SCHOOL_ID,um.USER_NAME ,sm.NAME,um.EMAIL_ID,sbm.SUBSCRIPTION_EXPIRE_DATE
    from user_profile as up left join user_master as um on um.USER_ID=up.USER_ID
    left join school_master as sm on sm.id=up.SCHOOL_ID 
    left join audio_track_detail as atd on atd.USER_ID=up.USER_ID 
    left join subscription_master as sbm on sbm.USER_ID=up.USER_ID
    left join login_logs as ll on ll.USER_ID=up.USER_ID
    where um.user_name not like '%TEST%' and um.IS_DISABLED != 'Y' and um.role_id !=3 and um.INCOMPLETE_SIGNUP != 'Y' and um.IS_BLOCKED != 'Y'  and um.admin_col ='ADMIN' and sm.name not like '%blocked%'
    and sm.COUNTRY not like '%canada%' and sm.COUNTRY not like '%mexico%' and sm.COUNTRY not like '%india%' and sm.COUNTRY not like '%United States%'
    group by up.SCHOOL_ID)y
    on y.SCHOOL_ID=x.ID
    """
    school_table = pd.read_sql(SCHOOL_TABLE_SQL, con=db)  
    school_table=school_table.dropna(subset=['USER_NAME'])
#     school_table = school_table['USER_NAME'].dropna()
    #print ('loaded dataframe from MySQL. records:', len(school_table))
#     school_table['LAST_LOGGED_IN'].fillna("NO LOGIN", inplace=True)
    school_table['sch_practice_count'].fillna("NO PRACTICE", inplace=True)
    school_table['SUBSCRIPTION_EXPIRE_DATE'].fillna(" ", inplace=True)
    school_table.fillna(value=pd.np.nan, inplace=True)
#     LAST_LOGIN_DATE=[]
#     for i in school_table['LAST_LOGGED_IN']:
#         if  i != 'NO LOGIN' :
#             LAST_LOGIN_DATE.append(i.strftime("%d %b %Y "))
#         else:
#             LAST_LOGIN_DATE.append("NO LOGIN")
#         #school_table[school_table['LAST_LOGGED_IN'] !='NO LOGIN']
    LAST_PRACTICE_DATE=[]
    for i in school_table['sch_practice_count']:
        if  i != 'NO PRACTICE' :
            LAST_PRACTICE_DATE.append(i.strftime("%d %b %Y "))
        else:
            LAST_PRACTICE_DATE.append("NO PRACTICE")
        #school_table[school_table['LAST_LOGGED_IN'] !='NO LOGIN']
    SUBSCRIPTION_EXPIRE_DATE=[]
    for i in school_table['SUBSCRIPTION_EXPIRE_DATE']:
        if  i != ' ' :
            SUBSCRIPTION_EXPIRE_DATE.append(i.strftime("%d %b %Y "))
        else:
            SUBSCRIPTION_EXPIRE_DATE.append(" ")
    #school_table[school_table['LAST_LOGGED_IN'] !='NO LOGIN']
#     print(school_table['PRACTICE_COUNT'])
    data=[]
    
    for i,k,l,m,o,p,q in zip(school_table['NAME'].tolist(),school_table['USER_NAME'].tolist(),school_table['EMAIL_ID'].tolist(),SUBSCRIPTION_EXPIRE_DATE,school_table['PRACTICE_COUNT'].tolist(),LAST_PRACTICE_DATE,school_table['count'].tolist()):
        #print(p,q,r)
        data.append([i,k,l,m,o,p,q])
    temp={"data":data}
    
#         temp={"data":data}
    return json.dumps(temp)



@app.route('/journey/<email>')
def journey(email):
    import pandas as pd
    import numpy as np
    import mysql.connector
    import datetime as dt
#     import jsonify from flask
    db = mysql.connector.connect(
      host="34.214.24.229",
      user="IE-tech",
      passwd="IE-tech@2O2O",
      database="compassJune")
#     today = dt.today()
#     print(today)
    query="""select id1 ,SUBSCRIPTION_EXPIRE_DATE, CREATED_DATE,EMAIL_ID, NAME, STATE, CITY ,COUNTRY,school_practice_count  from 
    (SELECT sm.ID as id1 ,sub.SUBSCRIPTION_EXPIRE_DATE, um.CREATED_DATE,um.EMAIL_ID, sm.NAME, sm.STATE, sm.CITY ,sm.COUNTRY FROM user_master um 
    inner join user_profile up on up.USER_ID=um.USER_ID
    inner join school_master sm on sm.ID=up.SCHOOL_ID
    left join tune_in_master tm on  tm.EMAIL
    left join subscription_master sub on sub.USER_ID=um.USER_ID
    where um.USER_NAME not like "%test%" and um.EMAIL_ID  like '%"""+email+"""%' AND um.IS_DISABLED !='Y' and um.INCOMPLETE_SIGNUP !='Y' and um.role_id !=3 and um.IS_BLOCKED !='Y' 
    group by sm.ID) q1
    left join
    (select sm.ID,count(atd.USER_ID) as school_practice_count, max(ll.LAST_LOGGED_IN) as last_login_date,max(atd.MODIFIED_DATE) as last_practice_date  from 
        user_profile as up inner join user_master as um on um.USER_ID=up.USER_ID
        inner join school_master as sm on sm.id=up.SCHOOL_ID 
        INNER join subscription_master sub on sub.USER_ID=up.USER_ID
        left join audio_track_detail atd on atd.USER_ID=up.USER_ID
        left join login_logs ll on ll.USER_ID=up.USER_ID
        WHERE um.USER_NAME not like "%test%" and um.EMAIL_ID not like "%1gen%" AND date(atd.MODIFIED_DATE) >'2019-07-31' and um.IS_DISABLED !='Y' and um.INCOMPLETE_SIGNUP !='Y' and um.role_id !=3 and um.IS_BLOCKED !='Y' and   um.EMAIL_ID  not in (select EMAIL from tune_in_master) 
         GROUP BY sm.ID)q2
    on q1.id1=q2.ID"""
    df=pd.read_sql(query, con=db)
    df["school_practice_count"].fillna(0, inplace = True)
    # df.replace(null,)
#     print("1",df)
    from datetime import datetime
    today=datetime.today()
    sub_status=""
#     print("renewal date",df['SUBSCRIPTION_EXPIRE_DATE'][0])

    if today > df['SUBSCRIPTION_EXPIRE_DATE'][0]:
        sub_status="expired"
        print("2")
    else:
        sub_status="active"
        print("3")
#     print(sub_status)
    id1=str(df['id1'][0])
#     print('4')
    query2="""select sm.ID,year(atd.MODIFIED_DATE),month(atd.MODIFIED_DATE), monthname(atd.MODIFIED_DATE), count(atd.USER_ID) as school_practice_count2,count(distinct(atd.USER_ID)) as unique_user1  from 
    user_profile as up inner join user_master as um on um.USER_ID=up.USER_ID
    inner join school_master as sm on sm.id=up.SCHOOL_ID 
    INNER join subscription_master sub on sub.USER_ID=up.USER_ID
    left join audio_track_detail atd on atd.USER_ID=up.USER_ID
    left join login_logs ll on ll.USER_ID=up.USER_ID
    WHERE um.USER_NAME not like "%test%" and  sm.ID="""+id1+""" and um.EMAIL_ID not like "%1gen%" AND date(atd.MODIFIED_DATE) >'2019-07-31' and um.IS_DISABLED !='Y' and um.INCOMPLETE_SIGNUP !='Y' and um.role_id !=3 and um.IS_BLOCKED !='Y' and   um.EMAIL_ID  not in (select EMAIL from tune_in_master) 
     GROUP BY month(atd.MODIFIED_DATE) order by year(atd.MODIFIED_DATE) asc , month(atd.MODIFIED_DATE) asc  """
    df2=pd.read_sql(query2, con=db)
    month1=""
    unique1=""
    prac=""
    tooo=""
#     print(df2)
    if df2.empty == True:
        month1=["August", "September", "October", "November", "December", "January", "February","March","April","May"]
        unique1=[0,0,0,0,0,0,0,0,0,0]
        prac=[0,0,0,0,0,0,0,0,0,0]
    else:
        month1=df2['monthname(atd.MODIFIED_DATE)'].tolist()
        unique1=df2['unique_user1'].tolist()
        prac=df2['school_practice_count2'].tolist()
    month12=["August", "September", "October", "November", "December", "January", "February","March","April","May"]
    for i in month12:
        if i not in month1:
            month1.append(i)
            unique1.append(0)
            prac.append(0)
    print(month1,"month")
    print(unique1,"unique1")
    hell=dict(zip(month1,unique1))
    print(hell)
    hell2=dict(zip(month1,prac))
    month1=["August", "September", "October", "November", "December", "January", "February","March"]
    unique1=[hell["August"],hell["September"],hell["October"],hell["November"],hell["December"],hell["January"],hell["February"],hell["March"]]
    prac=[hell2["August"],hell2["September"],hell2["October"],hell2["November"],hell2["December"],hell2["January"],hell2["February"],hell2["March"]]
    query3="""select af.rating,count(af.RATING) as 5_Star_Count from audio_feedback as af left join user_master as um on 
    um.USER_ID=af.USER
    left join user_profile as up on up.USER_ID=af.USER
    left join school_master as sm on sm.id=up.SCHOOL_ID
    where  um.user_name not like '%TEST%' and um.IS_DISABLED != 'Y' and um.IS_BLOCKED != 'Y' 
    and um.INCOMPLETE_SIGNUP != 'Y' and um.role_id !=3 and sm.name not like '%blocked%' 
    and um.EMAIL_ID not in (select distinct(email) from tune_in_master) and af.RATING=5
    and up.SCHOOL_ID="""+id1+"""
    group by up.SCHOOL_ID"""
    query4="""select count(distinct(up.USER_ID))*26 as students_impacted ,count(distinct(up.USER_ID)) as user_count from user_master as um 
     left join invite_master im on im.USER_ID=um.USER_ID 
     inner join user_profile up on up.USER_ID=um.USER_ID
    where um.user_name not like '%TEST%' and um.IS_DISABLED != 'Y' and um.IS_BLOCKED != 'Y'  
    and um.INCOMPLETE_SIGNUP != 'Y' and um.role_id !=3 and um.EMAIL_ID NOT  in (select EMAIL FROM tune_in_master) and 
    up.SCHOOL_ID="""+id1+""" """
    
    df3=pd.read_sql(query3, con=db)
#     print(df3,'6')
    df4=pd.read_sql(query4, con=db)
#     print('7',str(df3['5_Star_Count'][0]))
    star=""
    if df3.empty == True:
#         print("empty hai")
        star=0
    else:
        star=str(df3['5_Star_Count'][0])
    query6="""select round((sum(ATD.CURSOR_END)-sum(ATD.CURSOR_START))/60) as mm from audio_track_detail ATD
    inner join user_master UM on (UM.USER_ID=ATD.USER_ID and UM.USER_NAME not like '%test%')
    inner join user_profile up on up.USER_ID=UM.USER_ID
    inner join school_master sm on  sm.ID=up.SCHOOL_ID
    where DATE(ATD.modified_date) > '2019-07-31' and sm.ID ="""+id1+""" """
    
    qrhistory="""select atd.MODIFIED_DATE,count(atd.USER_ID) as Practice_Count
    from user_master as um left join user_profile as up on up.USER_ID=um.USER_ID
    left join school_master as sm on sm.id=up.SCHOOL_ID
    left join audio_track_detail as atd on atd.USER_ID=um.USER_ID
    left join login_logs as ll on ll.USER_ID=um.USER_ID
    where  um.ROLE_ID!=3   AND um.IS_DISABLED !='Y' and um.INCOMPLETE_SIGNUP !='Y' 
    and um.USER_NAME not like '%test%' and um.EMAIL_ID not like '%1gen%' and um.USER_NAME not like '%1gen%' 
    and um.EMAIL_ID not like '%test%'   and um.EMAIL_ID !=   " "  
    and sm.ID ="""+id1+"""
    group by date(atd.MODIFIED_DATE)"""
    dfh=pd.read_sql(qrhistory, con=db)
    df1h=dfh.dropna(subset=['MODIFIED_DATE'])
    df1h['MODIFIED_DATE'] = pd.to_datetime(df1h['MODIFIED_DATE'])
    df1h['MODIFIED_DATE'] = df1h['MODIFIED_DATE'].astype(np.int64) / int(1e6)
    temph = df1h.values.tolist()
    
    mmdf=pd.read_sql(query6, con=db)
    mmdf=mmdf.fillna(0)
#     print("q6",int(mmdf['mm']))
    mmdata1=int(mmdf['mm'])
    mmdata=str(mmdata1)
    graph={'history':temph,'mindfulness_minutes':[mmdata],'sub_status':[sub_status],'Star_5_Ratings_Recieved':[str(star)],'students_impacted':[str(df4['students_impacted'][0])],'school_name':[df['NAME'][0]],'state':[df['STATE'][0]],'city':[df['CITY'][0]],'country':[df['COUNTRY'][0]],'user_count':[str(df4['user_count'][0])],'school_practice_count':[str(df['school_practice_count'][0])],'month':month1,'unique_user':unique1,'practice_count':prac,'renewal_date':[df['SUBSCRIPTION_EXPIRE_DATE'][0].strftime("%d %b %Y ")],'signup_date':[df['CREATED_DATE'][0].strftime("%d %b %Y ")]}
    data=[graph]
#     print(data,"naaaaaaaa")
#     return data
    return json.dumps(data)


@app.route('/mapinfo')
def state_Info():
    import pandas as pd
    import numpy as np
    import mysql.connector
    import datetime as dt
#     import jsonify from flask
    db = mysql.connector.connect(
      host="34.214.24.229",
      user="IE-tech",
      passwd="IE-tech@2O2O",
      database="compassJune")
    query="""SELECT sm.STATE,sm.STATE_SHORT, count(distinct(sm.ID)) AS Count FROM user_master um 
    inner join user_profile up on up.USER_ID=um.USER_ID
    inner join school_master sm on sm.ID=up.SCHOOL_ID
    where um.USER_NAME not like "%test%" and um.EMAIL_ID not like "%1gen%" AND um.IS_DISABLED !='Y' and um.INCOMPLETE_SIGNUP !='Y' and um.role_id !=3 and um.IS_BLOCKED !='Y' and sm.NAME not like "%blocked%" and sm.COUNTRY LIKE "%UNITED STATES%"
    group by sm.STATE
    ;"""
    df=pd.read_sql(query, con=db)
    df = df.dropna(how='any',axis=0)
    data=[]
    for i,k in zip(df['STATE_SHORT'].tolist(),df['Count'].tolist()):
#         print(i)
        try:
            data.append({"code":i,"value":k,'hc-key':"us-"+i})
        except:
            pass
#     print(data)
    return json.dumps(data)




@app.route('/map/<states>')

def shool_dash_map_table(states):
    import pandas as pd
    import numpy as np
    import mysql.connector
    from datetime import datetime
    from flask import Flask,json
    db = mysql.connector.connect(host="34.214.24.229",    # your host, usually 
                     user="IE-tech",         # your username
                     passwd="IE-tech@2O2O",  # your password
                     db="compassJune") 
    SCHOOL_TABLE_SQL="""
select  y.USER_ID,y.USER_NAME,x.count,y.SCHOOL_ID,y.NAME,y.EMAIL_ID,x.STATE, y.SUBSCRIPTION_EXPIRE_DATE,x.PRACTICE_COUNT,x.sch_practice_count FROM 
(select sm.ID,count(distinct(um.USER_ID)) as count,sm.STATE,count(atd.USER_ID) as PRACTICE_COUNT, max(atd.MODIFIED_DATE) as sch_practice_count
    from user_profile as up left join user_master as um on um.USER_ID=up.USER_ID
    left join school_master as sm on sm.id=up.SCHOOL_ID 
    left join audio_track_detail as atd on atd.USER_ID=up.USER_ID 
    left join subscription_master as sbm on sbm.USER_ID=up.USER_ID
    left join login_logs as ll on ll.USER_ID=up.USER_ID
    where um.user_name not like '%TEST%' and um.IS_DISABLED != 'Y' and um.IS_BLOCKED != 'Y' 
    and sm.COUNTRY like '%united states%' and sm.STATE like '%"""+states+"""%'
    group by up.SCHOOL_ID)x
    inner join 
    (select up.USER_ID,up.SCHOOL_ID,um.USER_NAME ,sm.NAME,um.EMAIL_ID,sbm.SUBSCRIPTION_EXPIRE_DATE
    from user_profile as up left join user_master as um on um.USER_ID=up.USER_ID
    left join school_master as sm on sm.id=up.SCHOOL_ID 
    left join audio_track_detail as atd on atd.USER_ID=up.USER_ID 
    left join subscription_master as sbm on sbm.USER_ID=up.USER_ID
    left join login_logs as ll on ll.USER_ID=up.USER_ID
    where um.user_name not like '%TEST%' and um.IS_DISABLED != 'Y' and um.IS_BLOCKED != 'Y'  and um.admin_col ='ADMIN'
    and sm.COUNTRY like '%united states%' and sm.STATE like '%"""+states+"""%'
    group by up.SCHOOL_ID)y
    on y.SCHOOL_ID=x.ID
    """
    school_table = pd.read_sql(SCHOOL_TABLE_SQL, con=db)  
    school_table['USER_NAME'].fillna("NO Name", inplace=True)
#     school_table=school_table.dropna(subset=['USER_NAME'])
#     school_table = school_table['USER_NAME'].dropna()
    #print ('loaded dataframe from MySQL. records:', len(school_table))
#     school_table['LAST_LOGGED_IN'].fillna("NO LOGIN", inplace=True)
    school_table['sch_practice_count'].fillna("NO PRACTICE", inplace=True)
    school_table['SUBSCRIPTION_EXPIRE_DATE'].fillna(" ", inplace=True)
    school_table.fillna(value=pd.np.nan, inplace=True)
#     LAST_LOGIN_DATE=[]
#     for i in school_table['LAST_LOGGED_IN']:
#         if  i != 'NO LOGIN' :
#             LAST_LOGIN_DATE.append(i.strftime("%d %b %Y "))
#         else:
#             LAST_LOGIN_DATE.append("NO LOGIN")
#         #school_table[school_table['LAST_LOGGED_IN'] !='NO LOGIN']
    LAST_PRACTICE_DATE=[]
    for i in school_table['sch_practice_count']:
        if  i != 'NO PRACTICE' :
            LAST_PRACTICE_DATE.append(i.strftime("%d %b %Y "))
        else:
            LAST_PRACTICE_DATE.append("NO PRACTICE")
        #school_table[school_table['LAST_LOGGED_IN'] !='NO LOGIN']
    SUBSCRIPTION_EXPIRE_DATE=[]
    for i in school_table['SUBSCRIPTION_EXPIRE_DATE']:
        if  i != ' ' :
            SUBSCRIPTION_EXPIRE_DATE.append(i.strftime("%d %b %Y "))
        else:
            SUBSCRIPTION_EXPIRE_DATE.append(" ")
    #school_table[school_table['LAST_LOGGED_IN'] !='NO LOGIN']
#     print(school_table['PRACTICE_COUNT'])
    data=[]
    
    for i,k,l,m,o,p,q in zip(school_table['NAME'].tolist(),school_table['USER_NAME'].tolist(),school_table['EMAIL_ID'].tolist(),SUBSCRIPTION_EXPIRE_DATE,school_table['PRACTICE_COUNT'].tolist(),LAST_PRACTICE_DATE,school_table['count'].tolist()):
        #print(p,q,r)
        data.append([i,k,l,m,o,p,q])
    temp={"data":data}
    
#         temp={"data":data}
    return json.dumps(temp)


@app.route('/billmelater/<daate>')

def billme_table(daate):
    import pandas as pd
    import numpy as np
    import mysql.connector
    from datetime import datetime
    from flask import Flask,json
    reader = geolite2.reader()
    daate1=float(daate)
    daate2=int(daate1)/1000
    DATE1 =time.strftime('%y/%m/%d 00:00:00', time.localtime(daate2))
#   print(DATE1,"SELECTED DATE")
    # datetime_object = datetime.strptime(DATE1, '%y/%m/%d %H:%M:%S')
    # minus=datetime_object+ timedelta(hours=4)
    # minus1 = minus.strftime("%Y-%m-%d %H:%M:%S")
    # plus=minus +timedelta(hours=24)
    # plus1 = plus.strftime("%Y-%m-%d %H:%M:%S")

    db = mysql.connector.connect(host="34.214.24.229",    # your host, usually 
                     user="IE-tech",         # your username
                     passwd="IE-tech@2O2O",  # your password
                     db="compassJune") 
    SCHOOL_TABLE_SQL="""
select  y.USER_ID,y.USER_NAME,x.count,y.SCHOOL_ID,y.NAME,y.EMAIL_ID,x.STATE, y.SUBSCRIPTION_EXPIRE_DATE,x.PRACTICE_COUNT,x.sch_practice_count FROM 
(select sm.ID,count(distinct(um.USER_ID)) as count,sm.STATE,count(atd.USER_ID) as PRACTICE_COUNT, max(atd.MODIFIED_DATE) as sch_practice_count
    from user_profile as up left join user_master as um on um.USER_ID=up.USER_ID
    left join school_master as sm on sm.id=up.SCHOOL_ID 
    left join audio_track_detail as atd on atd.USER_ID=up.USER_ID 
    left join subscription_master as sbm on sbm.USER_ID=up.USER_ID
    left join login_logs as ll on ll.USER_ID=up.USER_ID
    where um.user_name not like '%TEST%' and um.IS_DISABLED != 'Y' and um.IS_BLOCKED != 'Y' 
    and date(sbm.SUBSCRIPTION_DATE)= '"""+DATE1+"""' and sbm.LAST_PAYMENT_AMOUNT = 1000 and sbm.MODE_OF_PAYMENT like "%later%"
    group by up.SCHOOL_ID)x
    inner join 
    (select up.USER_ID,up.SCHOOL_ID,um.USER_NAME ,sm.NAME,um.EMAIL_ID,sbm.SUBSCRIPTION_EXPIRE_DATE
    from user_profile as up left join user_master as um on um.USER_ID=up.USER_ID
    left join school_master as sm on sm.id=up.SCHOOL_ID 
    left join audio_track_detail as atd on atd.USER_ID=up.USER_ID 
    left join subscription_master as sbm on sbm.USER_ID=up.USER_ID
    left join login_logs as ll on ll.USER_ID=up.USER_ID
    where um.user_name not like '%TEST%' and um.IS_DISABLED != 'Y' and um.IS_BLOCKED != 'Y'  and um.admin_col ='ADMIN'
    and date(sbm.SUBSCRIPTION_DATE)= '"""+DATE1+"""' and sbm.LAST_PAYMENT_AMOUNT = 1000 and sbm.MODE_OF_PAYMENT like "%later%"
    group by up.SCHOOL_ID)y
    on y.SCHOOL_ID=x.ID
    """
    school_table = pd.read_sql(SCHOOL_TABLE_SQL, con=db)  
    school_table['USER_NAME'].fillna("NO Name", inplace=True)
#     school_table=school_table.dropna(subset=['USER_NAME'])
#     school_table = school_table['USER_NAME'].dropna()
    #print ('loaded dataframe from MySQL. records:', len(school_table))
#     school_table['LAST_LOGGED_IN'].fillna("NO LOGIN", inplace=True)
    school_table['sch_practice_count'].fillna("NO PRACTICE", inplace=True)
    school_table['SUBSCRIPTION_EXPIRE_DATE'].fillna(" ", inplace=True)
    school_table.fillna(value=pd.np.nan, inplace=True)
#     LAST_LOGIN_DATE=[]
#     for i in school_table['LAST_LOGGED_IN']:
#         if  i != 'NO LOGIN' :
#             LAST_LOGIN_DATE.append(i.strftime("%d %b %Y "))
#         else:
#             LAST_LOGIN_DATE.append("NO LOGIN")
#         #school_table[school_table['LAST_LOGGED_IN'] !='NO LOGIN']
    LAST_PRACTICE_DATE=[]
    for i in school_table['sch_practice_count']:
        if  i != 'NO PRACTICE' :
            LAST_PRACTICE_DATE.append(i.strftime("%d %b %Y "))
        else:
            LAST_PRACTICE_DATE.append("NO PRACTICE")
        #school_table[school_table['LAST_LOGGED_IN'] !='NO LOGIN']
    SUBSCRIPTION_EXPIRE_DATE=[]
    for i in school_table['SUBSCRIPTION_EXPIRE_DATE']:
        if  i != ' ' :
            SUBSCRIPTION_EXPIRE_DATE.append(i.strftime("%d %b %Y "))
        else:
            SUBSCRIPTION_EXPIRE_DATE.append(" ")
    #school_table[school_table['LAST_LOGGED_IN'] !='NO LOGIN']
#     print(school_table['PRACTICE_COUNT'])
    data=[]
    
    for i,k,l,m,o,p,q in zip(school_table['NAME'].tolist(),school_table['USER_NAME'].tolist(),school_table['EMAIL_ID'].tolist(),SUBSCRIPTION_EXPIRE_DATE,school_table['PRACTICE_COUNT'].tolist(),LAST_PRACTICE_DATE,school_table['count'].tolist()):
        #print(p,q,r)
        data.append([i,k,l,m,o,p,q])
    temp={"data":data}
    
#         temp={"data":data}
    return json.dumps(temp)

@app.route('/table/')

def shool_dash_map_table1():
    import pandas as pd
    import numpy as np
    import mysql.connector
    from datetime import datetime
    from flask import Flask,json
    db = mysql.connector.connect(host="34.214.24.229",    # your host, usually 
                     user="IE-tech",         # your username
                     passwd="IE-tech@2O2O",  # your password
                     db="compassJune") 
    SCHOOL_TABLE_SQL="""select up.USER_ID,CASE WHEN um.admin_col = 'ADMIN' THEN um.USER_NAME END as USER_NAME,count(distinct(um.USER_ID)) as count,up.SCHOOL_ID,sm.NAME,um.EMAIL_ID,sm.STATE,sbm.SUBSCRIPTION_EXPIRE_DATE,count(atd.USER_ID) as PRACTICE_COUNT, max(atd.MODIFIED_DATE)
    from user_profile as up left join user_master as um on um.USER_ID=up.USER_ID
    left join school_master as sm on sm.id=up.SCHOOL_ID 
    left join audio_track_detail as atd on atd.USER_ID=up.USER_ID 
    left join subscription_master as sbm on sbm.USER_ID=up.USER_ID
    left join login_logs as ll on ll.USER_ID=up.USER_ID
    where um.user_name not like '%TEST%' and um.IS_DISABLED != 'Y' and um.IS_BLOCKED != 'Y' 
    group by up.SCHOOL_ID
    """
    school_table = pd.read_sql(SCHOOL_TABLE_SQL, con=db)  
    school_table=school_table.dropna(subset=['USER_NAME'])
#     school_table = school_table['USER_NAME'].dropna()
    #print ('loaded dataframe from MySQL. records:', len(school_table))
#     school_table['LAST_LOGGED_IN'].fillna("NO LOGIN", inplace=True)
    school_table['max(atd.MODIFIED_DATE)'].fillna("NO PRACTICE", inplace=True)
    school_table['SUBSCRIPTION_EXPIRE_DATE'].fillna(" ", inplace=True)
    school_table.fillna(value=pd.np.nan, inplace=True)
#     LAST_LOGIN_DATE=[]
#     for i in school_table['LAST_LOGGED_IN']:
#         if  i != 'NO LOGIN' :
#             LAST_LOGIN_DATE.append(i.strftime("%d %b %Y "))
#         else:
#             LAST_LOGIN_DATE.append("NO LOGIN")
#         #school_table[school_table['LAST_LOGGED_IN'] !='NO LOGIN']
    LAST_PRACTICE_DATE=[]
    for i in school_table['max(atd.MODIFIED_DATE)']:
        if  i != 'NO PRACTICE' :
            LAST_PRACTICE_DATE.append(i.strftime("%d %b %Y "))
        else:
            LAST_PRACTICE_DATE.append("NO PRACTICE")
        #school_table[school_table['LAST_LOGGED_IN'] !='NO LOGIN']
    SUBSCRIPTION_EXPIRE_DATE=[]
    for i in school_table['SUBSCRIPTION_EXPIRE_DATE']:
        if  i != ' ' :
            SUBSCRIPTION_EXPIRE_DATE.append(i.strftime("%d %b %Y "))
        else:
            SUBSCRIPTION_EXPIRE_DATE.append(" ")
    #school_table[school_table['LAST_LOGGED_IN'] !='NO LOGIN']
#     print(school_table['PRACTICE_COUNT'])
    data=[]
    
    for i,k,l,m,n,o,p in zip(school_table['NAME'].tolist(),school_table['USER_NAME'].tolist(),school_table['EMAIL_ID'].tolist(),SUBSCRIPTION_EXPIRE_DATE,school_table['PRACTICE_COUNT'].tolist(),LAST_PRACTICE_DATE,school_table['count'].tolist()):
        #print(p,q,r)
        data.append([i,k,l,m,n,o,p])
    temp={"data":data}
    
#         temp={"data":data}
    return json.dumps(temp)

@app.route('/before6/')
def renewalbefore6():
    db = mysql.connector.connect(host="34.214.24.229",    # your host, usually localhost
                     user="IE-tech",         # your username
                     passwd="IE-tech@2O2O",  # your password
                     db="compassJune")  
    renewal="""select school_name,admin_name,admin_email,renewal_date,USER_COUNT,school_practice_count,last_login_date,last_practice_date from
    (select sm.ID, sm.NAME as school_name,um.USER_NAME AS admin_name,um.EMAIL_ID AS admin_email  ,sub.SUBSCRIPTION_EXPIRE_DATE as renewal_date from 
    user_profile as up inner join user_master as um on um.USER_ID=up.USER_ID
    inner join school_master as sm on sm.id=up.SCHOOL_ID 
    INNER join subscription_master sub on sub.USER_ID=up.USER_ID
    WHERE um.USER_NAME not like "%test%" and um.EMAIL_ID not like "%1gen%" AND um.IS_DISABLED !='Y' and um.INCOMPLETE_SIGNUP !='Y' and um.role_id !=3 and um.IS_BLOCKED !='Y'   and admin_col ='ADMIN' and 
    sub.SUBSCRIPTION_EXPIRE_DATE<'2019-07-01'
     GROUP BY sm.ID) q1
     inner join 
     (select sm.ID, count(distinct(up.USER_ID)) AS USER_COUNT, count(atd.USER_ID) as school_practice_count, max(ll.LAST_LOGGED_IN) as last_login_date,max(atd.MODIFIED_DATE) as last_practice_date  from 
    user_profile as up inner join user_master as um on um.USER_ID=up.USER_ID
    inner join school_master as sm on sm.id=up.SCHOOL_ID 
    INNER join subscription_master sub on sub.USER_ID=up.USER_ID
    left join audio_track_detail atd on atd.USER_ID=up.USER_ID
    left join login_logs ll on ll.USER_ID=up.USER_ID
    WHERE um.USER_NAME not like "%test%" and um.EMAIL_ID not like "%1gen%" AND um.IS_DISABLED !='Y' and um.INCOMPLETE_SIGNUP !='Y' and um.role_id !=3 and um.IS_BLOCKED !='Y'   
     GROUP BY sm.ID) q2
     ON  q1.ID =q2.ID
    """
    renewal=pd.read_sql(renewal,con=db)
    renewal['last_practice_date'].fillna("NO PRACTICE", inplace=True)
    renewal['renewal_date'].fillna(" ", inplace=True)
    renewal['last_login_date'].fillna("NO LOGIN", inplace=True)
    LAST_PRACTICE_DATE=[]
    for i in renewal['last_practice_date']:
        if  i != 'NO PRACTICE' :
            LAST_PRACTICE_DATE.append(i.strftime("%d %b %Y "))
        else:
            LAST_PRACTICE_DATE.append("NO PRACTICE")
    LAST_LOGIN_DATE=[]
    for i in renewal['last_login_date']:
        if  i != 'NO LOGIN' :
            LAST_LOGIN_DATE.append(i.strftime("%d %b %Y "))
        else:
            LAST_LOGIN_DATE.append("NO LOGIN")
    RENEWAL_DATE =[]
    for i in renewal['renewal_date']:
        if  i != ' ' :
            RENEWAL_DATE.append(i.strftime("%d %b %Y "))
        else:
            RENEWAL_DATE.append("NO PRACTICE")
    data=[]
    for i,k,l,m,o,p,q,r in zip(renewal['school_name'].tolist(),renewal['admin_name'].tolist(),renewal['admin_email'].tolist(),RENEWAL_DATE,LAST_PRACTICE_DATE,LAST_LOGIN_DATE,renewal['school_practice_count'].tolist(),renewal['USER_COUNT'].tolist()) :
        data.append([i,k,l,m,o,p,q,r])
    temp ={"data":data}
    return json.dumps(temp)

@app.route('/after6/')
def after6():
    db = mysql.connector.connect(host="34.214.24.229",    # your host, usually localhost
                     user="IE-tech",         # your username
                     passwd="IE-tech@2O2O",  # your password
                     db="compassJune")  
    renewal="""select school_name,admin_name,admin_email,renewal_date,USER_COUNT,school_practice_count,last_login_date,last_practice_date from
    (select sm.ID, sm.NAME as school_name,um.USER_NAME AS admin_name,um.EMAIL_ID AS admin_email  ,sub.SUBSCRIPTION_EXPIRE_DATE as renewal_date from 
    user_profile as up inner join user_master as um on um.USER_ID=up.USER_ID
    inner join school_master as sm on sm.id=up.SCHOOL_ID 
    INNER join subscription_master sub on sub.USER_ID=up.USER_ID
    WHERE um.USER_NAME not like "%test%" and um.EMAIL_ID not like "%1gen%" AND um.IS_DISABLED !='Y' and um.INCOMPLETE_SIGNUP !='Y' and um.role_id !=3 and um.IS_BLOCKED !='Y'   and admin_col ='ADMIN' and 
    sub.SUBSCRIPTION_EXPIRE_DATE>'2020-06-31'
     GROUP BY sm.ID) q1
     inner join 
     (select sm.ID, count(distinct(up.USER_ID)) AS USER_COUNT, count(atd.USER_ID) as school_practice_count, max(ll.LAST_LOGGED_IN) as last_login_date,max(atd.MODIFIED_DATE) as last_practice_date  from 
    user_profile as up inner join user_master as um on um.USER_ID=up.USER_ID
    inner join school_master as sm on sm.id=up.SCHOOL_ID 
    INNER join subscription_master sub on sub.USER_ID=up.USER_ID
    left join audio_track_detail atd on atd.USER_ID=up.USER_ID
    left join login_logs ll on ll.USER_ID=up.USER_ID
    WHERE um.USER_NAME not like "%test%" and um.EMAIL_ID not like "%1gen%" AND um.IS_DISABLED !='Y' and um.INCOMPLETE_SIGNUP !='Y' and um.role_id !=3 and um.IS_BLOCKED !='Y'   
     GROUP BY sm.ID) q2
     ON  q1.ID =q2.ID
    """
    renewal=pd.read_sql(renewal,con=db)
    renewal['last_practice_date'].fillna("NO PRACTICE", inplace=True)
    renewal['renewal_date'].fillna(" ", inplace=True)
    renewal['last_login_date'].fillna("NO LOGIN", inplace=True)
    LAST_PRACTICE_DATE=[]
    for i in renewal['last_practice_date']:
        if  i != 'NO PRACTICE' :
            LAST_PRACTICE_DATE.append(i.strftime("%d %b %Y "))
        else:
            LAST_PRACTICE_DATE.append("NO PRACTICE")
    LAST_LOGIN_DATE=[]
    for i in renewal['last_login_date']:
        if  i != 'NO LOGIN' :
            LAST_LOGIN_DATE.append(i.strftime("%d %b %Y "))
        else:
            LAST_LOGIN_DATE.append("NO LOGIN")
    RENEWAL_DATE =[]
    for i in renewal['renewal_date']:
        if  i != ' ' :
            RENEWAL_DATE.append(i.strftime("%d %b %Y "))
        else:
            RENEWAL_DATE.append("NO PRACTICE")
    data=[]
    for i,k,l,m,o,p,q,r in zip(renewal['school_name'].tolist(),renewal['admin_name'].tolist(),renewal['admin_email'].tolist(),RENEWAL_DATE,LAST_PRACTICE_DATE,LAST_LOGIN_DATE,renewal['school_practice_count'].tolist(),renewal['USER_COUNT'].tolist()) :
        data.append([i,k,l,m,o,p,q,r])
    temp ={"data":data}
    return json.dumps(temp)

@app.route('/renewal20/<month>/')
def renewal20(month):
    db = mysql.connector.connect(host="34.214.24.229",    # your host, usually localhost
                     user="IE-tech",         # your username
                     passwd="IE-tech@2O2O",  # your password
                     db="compassJune")  
    renewal="""select school_name,admin_name,admin_email,renewal_date,USER_COUNT,school_practice_count,last_login_date,last_practice_date from
    (select sm.ID, sm.NAME as school_name,um.USER_NAME AS admin_name,um.EMAIL_ID AS admin_email  ,sub.SUBSCRIPTION_EXPIRE_DATE as renewal_date from 
    user_profile as up inner join user_master as um on um.USER_ID=up.USER_ID
    inner join school_master as sm on sm.id=up.SCHOOL_ID 
    INNER join subscription_master sub on sub.USER_ID=up.USER_ID
    WHERE um.USER_NAME not like "%test%" and um.EMAIL_ID not like "%1gen%" AND um.IS_DISABLED !='Y' and um.INCOMPLETE_SIGNUP !='Y' and um.role_id !=3 and um.IS_BLOCKED !='Y'   and admin_col ='ADMIN' and year(sub.SUBSCRIPTION_EXPIRE_DATE)=2020 and monthname(sub.SUBSCRIPTION_EXPIRE_DATE) like '%"""+month+"""%'
     GROUP BY sm.ID) q1
     inner join 
     (select sm.ID, count(distinct(up.USER_ID)) AS USER_COUNT, count(atd.USER_ID) as school_practice_count, max(ll.LAST_LOGGED_IN) as last_login_date,max(atd.MODIFIED_DATE) as last_practice_date  from 
    user_profile as up inner join user_master as um on um.USER_ID=up.USER_ID
    inner join school_master as sm on sm.id=up.SCHOOL_ID 
    INNER join subscription_master sub on sub.USER_ID=up.USER_ID
    left join audio_track_detail atd on atd.USER_ID=up.USER_ID
    left join login_logs ll on ll.USER_ID=up.USER_ID
    WHERE um.USER_NAME not like "%test%" and um.EMAIL_ID not like "%1gen%" AND um.IS_DISABLED !='Y' and um.INCOMPLETE_SIGNUP !='Y' and um.role_id !=3 and um.IS_BLOCKED !='Y'   and year(sub.SUBSCRIPTION_EXPIRE_DATE)=2020 and monthname(sub.SUBSCRIPTION_EXPIRE_DATE) like '%"""+month+"""%'
     GROUP BY sm.ID) q2
     ON  q1.ID =q2.ID"""
    renewal=pd.read_sql(renewal,con=db)
    renewal['last_practice_date'].fillna("NO PRACTICE", inplace=True)
    renewal['renewal_date'].fillna(" ", inplace=True)
    renewal['last_login_date'].fillna("NO LOGIN", inplace=True)
    LAST_PRACTICE_DATE=[]
    for i in renewal['last_practice_date']:
        if  i != 'NO PRACTICE' :
            LAST_PRACTICE_DATE.append(i.strftime("%d %b %Y "))
        else:
            LAST_PRACTICE_DATE.append("NO PRACTICE")
    LAST_LOGIN_DATE=[]
    for i in renewal['last_login_date']:
        if  i != 'NO LOGIN' :
            LAST_LOGIN_DATE.append(i.strftime("%d %b %Y "))
        else:
            LAST_LOGIN_DATE.append("NO LOGIN")
    RENEWAL_DATE =[]
    for i in renewal['renewal_date']:
        if  i != ' ' :
            RENEWAL_DATE.append(i.strftime("%d %b %Y "))
        else:
            RENEWAL_DATE.append("NO PRACTICE")
    data=[]
    for i,k,l,m,o,p,q,r in zip(renewal['school_name'].tolist(),renewal['admin_name'].tolist(),renewal['admin_email'].tolist(),RENEWAL_DATE,LAST_PRACTICE_DATE,LAST_LOGIN_DATE,renewal['school_practice_count'].tolist(),renewal['USER_COUNT'].tolist()) :
        data.append([i,k,l,m,o,p,q,r])
    temp ={"data":data}
    return json.dumps(temp)

# @app.route('/renewal20/<month>/Active20')
# def renewalact2020(month):
#     db = mysql.connector.connect(host="34.214.24.229",    # your host, usually localhost
#                      user="IE-tech",         # your username
#                      passwd="IE-tech@2O2O",  # your password
#                      db="compassJune")  
#     renewal="""select school_name,admin_name,admin_email,renewal_date,USER_COUNT,school_practice_count,last_login_date,last_practice_date from(
#     (select sm.ID, sm.NAME as school_name,um.USER_NAME AS admin_name,um.EMAIL_ID AS admin_email  ,sub.SUBSCRIPTION_EXPIRE_DATE as renewal_date from 
#     user_profile as up inner join user_master as um on um.USER_ID=up.USER_ID
#     inner join school_master as sm on sm.id=up.SCHOOL_ID 
#     INNER join subscription_master sub on sub.USER_ID=up.USER_ID
#     WHERE um.USER_NAME not like "%test%" and um.EMAIL_ID not like "%1gen%" AND um.IS_DISABLED !='Y' and um.INCOMPLETE_SIGNUP !='Y' and um.role_id !=3 and um.IS_BLOCKED !='Y'   and admin_col ='ADMIN' and year(sub.SUBSCRIPTION_EXPIRE_DATE)=2020 and monthname(sub.SUBSCRIPTION_EXPIRE_DATE) like '%"""+month+"""%'
#      GROUP BY sm.ID) q1
#      inner join 
#      (select sm.ID, count(distinct(up.USER_ID)) AS USER_COUNT, count(atd.USER_ID) as school_practice_count, max(ll.LAST_LOGGED_IN) as last_login_date,max(atd.MODIFIED_DATE) as last_practice_date  from 
#     user_profile as up inner join user_master as um on um.USER_ID=up.USER_ID
#     inner join school_master as sm on sm.id=up.SCHOOL_ID 
#     INNER join subscription_master sub on sub.USER_ID=up.USER_ID
#     inner join audio_track_detail atd on atd.USER_ID=up.USER_ID
#     left join login_logs ll on ll.USER_ID=up.USER_ID
#     WHERE um.USER_NAME not like "%test%" and sm.ID in (select sm.ID  from 
#     user_profile as up inner join user_master as um on um.USER_ID=up.USER_ID
#     inner join school_master as sm on sm.id=up.SCHOOL_ID 
#     INNER join subscription_master sub on sub.USER_ID=up.USER_ID
#     inner join audio_track_detail atd on atd.USER_ID=up.USER_ID
#     left join login_logs ll on ll.USER_ID=up.USER_ID
#     WHERE um.USER_NAME not like "%test%" and um.EMAIL_ID not like "%1gen%" AND um.IS_DISABLED !='Y' and um.INCOMPLETE_SIGNUP !='Y' and um.role_id !=3 and year(atd.MODIFIED_DATE)>2019 and um.IS_BLOCKED !='Y'   and year(sub.SUBSCRIPTION_EXPIRE_DATE)=2020 and monthname(sub.SUBSCRIPTION_EXPIRE_DATE) like '%"""+month+"""%'
#      GROUP BY sm.ID)  and um.EMAIL_ID not like "%1gen%" AND um.IS_DISABLED !='Y' and um.INCOMPLETE_SIGNUP !='Y' and um.role_id !=3 and um.IS_BLOCKED !='Y'   and year(sub.SUBSCRIPTION_EXPIRE_DATE)=2020 and monthname(sub.SUBSCRIPTION_EXPIRE_DATE) like '%"""+month+"""%'
#      GROUP BY sm.ID) q2
#      ON  q1.ID =q2.ID)"""
#     renewal=pd.read_sql(renewal,con=db)
#     renewal['last_practice_date'].fillna("NO PRACTICE", inplace=True)
#     renewal['renewal_date'].fillna(" ", inplace=True)
#     renewal['last_login_date'].fillna("NO LOGIN", inplace=True)
#     LAST_PRACTICE_DATE=[]
#     for i in renewal['last_practice_date']:
#         if  i != 'NO PRACTICE' :
#             LAST_PRACTICE_DATE.append(i.strftime("%d %b %Y "))
#         else:
#             LAST_PRACTICE_DATE.append("NO PRACTICE")
#     LAST_LOGIN_DATE=[]
#     for i in renewal['last_login_date']:
#         if  i != 'NO LOGIN' :
#             LAST_LOGIN_DATE.append(i.strftime("%d %b %Y "))
#         else:
#             LAST_LOGIN_DATE.append("NO LOGIN")
#     RENEWAL_DATE =[]
#     for i in renewal['renewal_date']:
#         if  i != ' ' :
#             RENEWAL_DATE.append(i.strftime("%d %b %Y "))
#         else:
#             RENEWAL_DATE.append("NO PRACTICE")
#     data=[]
#     for i,k,l,m,o,p,q,r in zip(renewal['school_name'].tolist(),renewal['admin_name'].tolist(),renewal['admin_email'].tolist(),RENEWAL_DATE,LAST_PRACTICE_DATE,LAST_LOGIN_DATE,renewal['school_practice_count'].tolist(),renewal['USER_COUNT'].tolist()) :
#         data.append([i,k,l,m,o,p,q,r])
#     temp ={"data":data}
#     return json.dumps(temp)


# =============================
@app.route('/renewal20/<month>/Active')
def renewalact20(month):
    db = mysql.connector.connect(host="34.214.24.229",    # your host, usually localhost
                     user="IE-tech",         # your username
                     passwd="IE-tech@2O2O",  # your password
                     db="compassJune")  
    renewal="""select school_name,admin_name,admin_email,renewal_date,USER_COUNT,school_practice_count,last_login_date,last_practice_date from
    (select sm.ID, sm.NAME as school_name,um.USER_NAME AS admin_name,um.EMAIL_ID AS admin_email  ,sub.SUBSCRIPTION_EXPIRE_DATE as renewal_date from 
    user_profile as up inner join user_master as um on um.USER_ID=up.USER_ID
    inner join school_master as sm on sm.id=up.SCHOOL_ID 
    INNER join subscription_master sub on sub.USER_ID=up.USER_ID
    WHERE um.USER_NAME not like "%test%" and um.EMAIL_ID not like "%1gen%" AND um.IS_DISABLED !='Y' and um.INCOMPLETE_SIGNUP !='Y' and um.role_id !=3 and um.IS_BLOCKED !='Y'   and admin_col ='ADMIN' and year(sub.SUBSCRIPTION_EXPIRE_DATE)=2020 and monthname(sub.SUBSCRIPTION_EXPIRE_DATE) like '%"""+month+"""%'
     GROUP BY sm.ID) q1
     inner join 
     (select sm.ID, count(distinct(up.USER_ID)) AS USER_COUNT, count(atd.USER_ID) as school_practice_count, max(ll.LAST_LOGGED_IN) as last_login_date,max(atd.MODIFIED_DATE) as last_practice_date  from 
    user_profile as up inner join user_master as um on um.USER_ID=up.USER_ID
    inner join school_master as sm on sm.id=up.SCHOOL_ID 
    INNER join subscription_master sub on sub.USER_ID=up.USER_ID
    inner join audio_track_detail atd on atd.USER_ID=up.USER_ID
    left join login_logs ll on ll.USER_ID=up.USER_ID
    WHERE um.USER_NAME not like "%test%" and um.EMAIL_ID not like "%1gen%" AND um.IS_DISABLED !='Y' and um.INCOMPLETE_SIGNUP !='Y' and um.role_id !=3 and um.IS_BLOCKED !='Y'   and year(sub.SUBSCRIPTION_EXPIRE_DATE)=2020 and monthname(sub.SUBSCRIPTION_EXPIRE_DATE) like '%"""+month+"""%'
     GROUP BY sm.ID) q2
     ON  q1.ID =q2.ID"""
    renewal=pd.read_sql(renewal,con=db)
    renewal['last_practice_date'].fillna("NO PRACTICE", inplace=True)
    renewal['renewal_date'].fillna(" ", inplace=True)
    renewal['last_login_date'].fillna("NO LOGIN", inplace=True)
    LAST_PRACTICE_DATE=[]
    for i in renewal['last_practice_date']:
        if  i != 'NO PRACTICE' :
            LAST_PRACTICE_DATE.append(i.strftime("%d %b %Y "))
        else:
            LAST_PRACTICE_DATE.append("NO PRACTICE")
    LAST_LOGIN_DATE=[]
    for i in renewal['last_login_date']:
        if  i != 'NO LOGIN' :
            LAST_LOGIN_DATE.append(i.strftime("%d %b %Y "))
        else:
            LAST_LOGIN_DATE.append("NO LOGIN")
    RENEWAL_DATE =[]
    for i in renewal['renewal_date']:
        if  i != ' ' :
            RENEWAL_DATE.append(i.strftime("%d %b %Y "))
        else:
            RENEWAL_DATE.append("NO PRACTICE")
    data=[]
    for i,k,l,m,o,p,q,r in zip(renewal['school_name'].tolist(),renewal['admin_name'].tolist(),renewal['admin_email'].tolist(),RENEWAL_DATE,LAST_PRACTICE_DATE,LAST_LOGIN_DATE,renewal['school_practice_count'].tolist(),renewal['USER_COUNT'].tolist()) :
        data.append([i,k,l,m,o,p,q,r])
    temp ={"data":data}
    return json.dumps(temp)


@app.route('/renewal19/<month>/')
def renewal19(month):
    db = mysql.connector.connect(host="34.214.24.229",    # your host, usually localhost
                     user="IE-tech",         # your username
                     passwd="IE-tech@2O2O",  # your password
                     db="compassJune") 
    
    q1="""select sm.ID,year(sub.SUBSCRIPTION_EXPIRE_DATE) as year,monthname(sub.SUBSCRIPTION_EXPIRE_DATE) as month, sm.NAME as school_name,um.USER_NAME AS admin_name,um.EMAIL_ID AS admin_email  ,sub.SUBSCRIPTION_EXPIRE_DATE as renewal_date from 
    user_profile as up inner join user_master as um on um.USER_ID=up.USER_ID
    inner join school_master as sm on sm.id=up.SCHOOL_ID 
    INNER join subscription_master sub on sub.USER_ID=up.USER_ID
    WHERE um.USER_NAME not like "%test%" and um.EMAIL_ID not like "%1gen%" AND um.IS_DISABLED !='Y' and um.INCOMPLETE_SIGNUP !='Y' and um.role_id !=3 and um.IS_BLOCKED !='Y'   and admin_col ='ADMIN' and date(sub.SUBSCRIPTION_EXPIRE_DATE)>'2019-06-31' and date(sub.SUBSCRIPTION_EXPIRE_DATE) <'2020-04-01'
     GROUP BY sm.ID"""
    q1=pd.read_sql(q1,con=db)
    q1['month'] = q1['month'].str.upper()
    year=str(q1.loc[q1['month'].str.contains(month), 'year'].iloc[0])
    renewal="""select school_name,admin_name,admin_email,renewal_date,USER_COUNT,school_practice_count,last_login_date,last_practice_date from
    (select sm.ID, sm.NAME as school_name,um.USER_NAME AS admin_name,um.EMAIL_ID AS admin_email  ,sub.SUBSCRIPTION_EXPIRE_DATE as renewal_date from 
    user_profile as up inner join user_master as um on um.USER_ID=up.USER_ID
    inner join school_master as sm on sm.id=up.SCHOOL_ID 
    INNER join subscription_master sub on sub.USER_ID=up.USER_ID
    WHERE um.USER_NAME not like "%test%" and um.EMAIL_ID not like "%1gen%" AND um.IS_DISABLED !='Y' and um.INCOMPLETE_SIGNUP !='Y' and um.role_id !=3 and um.IS_BLOCKED !='Y'   and admin_col ='ADMIN' and year(sub.SUBSCRIPTION_EXPIRE_DATE)="""+year+""" and monthname(sub.SUBSCRIPTION_EXPIRE_DATE) like '%"""+month+"""%'
     GROUP BY sm.ID) q1
     inner join 
     (select sm.ID, count(distinct(up.USER_ID)) AS USER_COUNT, count(atd.USER_ID) as school_practice_count, max(ll.LAST_LOGGED_IN) as last_login_date,max(atd.MODIFIED_DATE) as last_practice_date  from 
    user_profile as up inner join user_master as um on um.USER_ID=up.USER_ID
    inner join school_master as sm on sm.id=up.SCHOOL_ID 
    INNER join subscription_master sub on sub.USER_ID=up.USER_ID
    left join audio_track_detail atd on atd.USER_ID=up.USER_ID
    left join login_logs ll on ll.USER_ID=up.USER_ID
    WHERE um.USER_NAME not like "%test%" and um.EMAIL_ID not like "%1gen%" AND um.IS_DISABLED !='Y' and um.INCOMPLETE_SIGNUP !='Y' and um.role_id !=3 and um.IS_BLOCKED !='Y'   and year(sub.SUBSCRIPTION_EXPIRE_DATE)="""+year+""" and monthname(sub.SUBSCRIPTION_EXPIRE_DATE) like '%"""+month+"""%'
     GROUP BY sm.ID) q2
     ON  q1.ID =q2.ID"""
    renewal=pd.read_sql(renewal,con=db)
    renewal['last_practice_date'].fillna("NO PRACTICE", inplace=True)
    renewal['renewal_date'].fillna(" ", inplace=True)
    renewal['last_login_date'].fillna("NO LOGIN", inplace=True)
    LAST_PRACTICE_DATE=[]
    for i in renewal['last_practice_date']:
        if  i != 'NO PRACTICE' :
            LAST_PRACTICE_DATE.append(i.strftime("%d %b %Y "))
        else:
            LAST_PRACTICE_DATE.append("NO PRACTICE")
    LAST_LOGIN_DATE=[]
    for i in renewal['last_login_date']:
        if  i != 'NO LOGIN' :
            LAST_LOGIN_DATE.append(i.strftime("%d %b %Y "))
        else:
            LAST_LOGIN_DATE.append("NO LOGIN")
    RENEWAL_DATE =[]
    for i in renewal['renewal_date']:
        if  i != ' ' :
            RENEWAL_DATE.append(i.strftime("%d %b %Y "))
        else:
            RENEWAL_DATE.append("NO PRACTICE")
    data=[]
    for i,k,l,m,o,p,q,r in zip(renewal['school_name'].tolist(),renewal['admin_name'].tolist(),renewal['admin_email'].tolist(),RENEWAL_DATE,LAST_PRACTICE_DATE,LAST_LOGIN_DATE,renewal['school_practice_count'].tolist(),renewal['USER_COUNT'].tolist()) :
        data.append([i,k,l,m,o,p,q,r])
    temp ={"data":data}
    return json.dumps(temp)

@app.route('/renewal19/<month>/Active')
def renewalact19(month):
    db = mysql.connector.connect(host="34.214.24.229",    # your host, usually localhost
                     user="IE-tech",         # your username
                     passwd="IE-tech@2O2O",  # your password
                     db="compassJune")  
    q1="""select sm.ID,year(sub.SUBSCRIPTION_EXPIRE_DATE) as year,monthname(sub.SUBSCRIPTION_EXPIRE_DATE) as month, sm.NAME as school_name,um.USER_NAME AS admin_name,um.EMAIL_ID AS admin_email  ,sub.SUBSCRIPTION_EXPIRE_DATE as renewal_date from 
    user_profile as up inner join user_master as um on um.USER_ID=up.USER_ID
    inner join school_master as sm on sm.id=up.SCHOOL_ID 
    INNER join subscription_master sub on sub.USER_ID=up.USER_ID
    WHERE um.USER_NAME not like "%test%" and um.EMAIL_ID not like "%1gen%" AND um.IS_DISABLED !='Y' and um.INCOMPLETE_SIGNUP !='Y' and um.role_id !=3 and um.IS_BLOCKED !='Y'   and admin_col ='ADMIN' and date(sub.SUBSCRIPTION_EXPIRE_DATE)>'2019-06-31' and date(sub.SUBSCRIPTION_EXPIRE_DATE) <'2020-04-01'
     GROUP BY sm.ID"""
    q1=pd.read_sql(q1,con=db)
    q1['month'] = q1['month'].str.upper()
    year=str(q1.loc[q1['month'].str.contains(month), 'year'].iloc[0])
    renewal="""select school_name,admin_name,admin_email,renewal_date,USER_COUNT,school_practice_count,last_login_date,last_practice_date from
    (select sm.ID, sm.NAME as school_name,um.USER_NAME AS admin_name,um.EMAIL_ID AS admin_email  ,sub.SUBSCRIPTION_EXPIRE_DATE as renewal_date from 
    user_profile as up inner join user_master as um on um.USER_ID=up.USER_ID
    inner join school_master as sm on sm.id=up.SCHOOL_ID 
    INNER join subscription_master sub on sub.USER_ID=up.USER_ID
    WHERE um.USER_NAME not like "%test%" and um.EMAIL_ID not like "%1gen%" AND um.IS_DISABLED !='Y' and um.INCOMPLETE_SIGNUP !='Y' and um.role_id !=3 and um.IS_BLOCKED !='Y'   and admin_col ='ADMIN' and year(sub.SUBSCRIPTION_EXPIRE_DATE)="""+year+""" and monthname(sub.SUBSCRIPTION_EXPIRE_DATE) like '%"""+month+"""%'
     GROUP BY sm.ID) q1
     inner join 
     (select sm.ID, count(distinct(up.USER_ID)) AS USER_COUNT, count(atd.USER_ID) as school_practice_count, max(ll.LAST_LOGGED_IN) as last_login_date,max(atd.MODIFIED_DATE) as last_practice_date  from 
    user_profile as up inner join user_master as um on um.USER_ID=up.USER_ID
    inner join school_master as sm on sm.id=up.SCHOOL_ID 
    INNER join subscription_master sub on sub.USER_ID=up.USER_ID
    inner join audio_track_detail atd on atd.USER_ID=up.USER_ID
    left join login_logs ll on ll.USER_ID=up.USER_ID
    WHERE um.USER_NAME not like "%test%" and um.EMAIL_ID not like "%1gen%" AND um.IS_DISABLED !='Y' and um.INCOMPLETE_SIGNUP !='Y' and um.role_id !=3 and um.IS_BLOCKED !='Y'   and year(sub.SUBSCRIPTION_EXPIRE_DATE)="""+year+""" and monthname(sub.SUBSCRIPTION_EXPIRE_DATE) like '%"""+month+"""%'
     GROUP BY sm.ID) q2
     ON  q1.ID =q2.ID"""
    renewal=pd.read_sql(renewal,con=db)
    renewal['last_practice_date'].fillna("NO PRACTICE", inplace=True)
    renewal['renewal_date'].fillna(" ", inplace=True)
    renewal['last_login_date'].fillna("NO LOGIN", inplace=True)
    LAST_PRACTICE_DATE=[]
    for i in renewal['last_practice_date']:
        if  i != 'NO PRACTICE' :
            LAST_PRACTICE_DATE.append(i.strftime("%d %b %Y "))
        else:
            LAST_PRACTICE_DATE.append("NO PRACTICE")
    LAST_LOGIN_DATE=[]
    for i in renewal['last_login_date']:
        if  i != 'NO LOGIN' :
            LAST_LOGIN_DATE.append(i.strftime("%d %b %Y "))
        else:
            LAST_LOGIN_DATE.append("NO LOGIN")
    RENEWAL_DATE =[]
    for i in renewal['renewal_date']:
        if  i != ' ' :
            RENEWAL_DATE.append(i.strftime("%d %b %Y "))
        else:
            RENEWAL_DATE.append("NO PRACTICE")
    data=[]
    for i,k,l,m,o,p,q,r in zip(renewal['school_name'].tolist(),renewal['admin_name'].tolist(),renewal['admin_email'].tolist(),RENEWAL_DATE,LAST_PRACTICE_DATE,LAST_LOGIN_DATE,renewal['school_practice_count'].tolist(),renewal['USER_COUNT'].tolist()) :
        data.append([i,k,l,m,o,p,q,r])
    temp ={"data":data}
    return json.dumps(temp)


@app.route('/schoolsearch/<name>')
def school_search(name):
    import pandas as pd
    import numpy as np
    import mysql.connector
    from datetime import datetime
    from flask import Flask,json
    db = mysql.connector.connect(host="34.214.24.229",    # your host, usually 
                     user="IE-tech",         # your username
                     passwd="IE-tech@2O2O",  # your password
                     db="compassJune") 

    user_detail="""select
    um.USER_ID,um.USER_NAME,um.EMAIL_ID,sm.id as SCHOOL_ID,sm.name as SCHOOL_NAME,um.CREATED_DATE,max(sbm.SUBSCRIPTION_EXPIRE_DATE) as Renewal_Date,
    max(ll.LAST_LOGGED_IN) as last_login_date,max(atd.MODIFIED_DATE) as last_practice_date,count(atd.USER_ID) as practice_count
     from user_profile as up left join user_master as um on um.USER_ID=up.USER_ID
    left join school_master as sm on sm.id=up.SCHOOL_ID left join subscription_master as sbm on sbm.USER_ID=um.USER_ID
    left join audio_track_detail as atd on atd.USER_ID=up.USER_ID
    left join login_logs as ll on ll.user_id=up.user_id 
    where  um.user_name not like '%TEST%' and um.IS_DISABLED != 'Y' and um.IS_BLOCKED != 'Y' and sm.name like '%"""+name+"""%'
    and um.INCOMPLETE_SIGNUP != 'Y' and um.role_id !=3 
    group by um.USER_ID"""
    user_detail = pd.read_sql(user_detail, con=db)
    
#     print("hellooooo",user_detail['SCHOOL_ID'][0])
    sch=str(user_detail['SCHOOL_ID'][0])
    query22="""select * from
    (select sm.ID,count(distinct(up.USER_ID)) as USER_COUNT,sm.NAME,sm.COUNTRY,sm.STATE,sm.CITY,sm.ADDRESS
    from user_profile as up left join user_master as um on um.USER_ID=up.USER_ID
    left join school_master as sm on sm.id=up.SCHOOL_ID left join subscription_master as sbm on sbm.USER_ID=um.USER_ID
    left join audio_track_detail as atd on atd.USER_ID=up.USER_ID
    left join login_logs as ll on ll.user_id=up.user_id 
    where  um.user_name not like '%TEST%' and um.IS_DISABLED != 'Y' and um.IS_BLOCKED != 'Y' and sm.ID="""+sch+"""
    and um.EMAIL_ID NOT  in (select EMAIL FROM tune_in_master)
    and um.INCOMPLETE_SIGNUP != 'Y' and um.role_id !=3 
    group by sm.ID)x
    left join 
    (select sm.ID,um.USER_NAME as admin_name,um.EMAIL_ID
    from user_profile as up left join user_master as um on um.USER_ID=up.USER_ID
    left join school_master as sm on sm.id=up.SCHOOL_ID left join subscription_master as sbm on sbm.USER_ID=um.USER_ID
    left join audio_track_detail as atd on atd.USER_ID=up.USER_ID
    left join login_logs as ll on ll.user_id=up.user_id 
    where  um.user_name not like '%TEST%' and um.IS_DISABLED != 'Y' and um.IS_BLOCKED != 'Y' and sm.ID="""+sch+""" and um.admin_col ='ADMIN'
    and um.EMAIL_ID NOT  in (select EMAIL FROM tune_in_master)
    and um.INCOMPLETE_SIGNUP != 'Y' and um.role_id !=3 
    group by sm.ID
    )y
    on x.ID=y.ID
    left join 
    (select sm.ID,count(atd.USER_ID)  as school_practice_count1
    from user_profile as up left join user_master as um on um.USER_ID=up.USER_ID
    left join school_master as sm on sm.id=up.SCHOOL_ID left join subscription_master as sbm on sbm.USER_ID=um.USER_ID
    left join audio_track_detail as atd on atd.USER_ID=up.USER_ID
    left join login_logs as ll on ll.user_id=up.user_id 
    where  um.user_name not like '%TEST%' and um.IS_DISABLED != 'Y' and um.IS_BLOCKED != 'Y' and sm.ID="""+sch+""" and date(atd.MODIFIED_DATE) >'2019-07-31'
    and um.EMAIL_ID NOT  in (select EMAIL FROM tune_in_master)
    and um.INCOMPLETE_SIGNUP != 'Y' and um.role_id !=3 
    group by sm.ID)z
    on x.ID=z.ID

    """
    card_detail=pd.read_sql(query22, con=db)
#     print(card_detail)
    user_detail['last_practice_date'].fillna("NO PRACTICE", inplace=True)
    user_detail['Renewal_Date'].fillna(" ", inplace=True)
    user_detail.fillna(value=pd.np.nan, inplace=True)
    user_detail['last_login_date'].fillna("NO LOGIN", inplace=True)
    LAST_PRACTICE_DATE=[]
    for i in user_detail['last_practice_date']:
        if  i != 'NO PRACTICE' :
            LAST_PRACTICE_DATE.append(i.strftime("%d %b %Y "))
        else:
            LAST_PRACTICE_DATE.append("NO PRACTICE")
    LAST_LOGIN_DATE=[]
    for i in user_detail['last_login_date']:
        if  i != 'NO LOGIN' :
            LAST_LOGIN_DATE.append(i.strftime("%d %b %Y "))
        else:
            LAST_LOGIN_DATE.append("NO LOGIN")
    SUBSCRIPTION_EXPIRE_DATE=[]
    for i in user_detail['Renewal_Date']:
        if  i != ' ' :
            SUBSCRIPTION_EXPIRE_DATE.append(i.strftime("%d %b %Y "))
        else:
            SUBSCRIPTION_EXPIRE_DATE.append(" ")        
    CREATED_DATE=[]
    for i in user_detail['CREATED_DATE']:
        if  i != ' ' :
            CREATED_DATE.append(i.strftime("%d %b %Y "))
        else:
            CREATED_DATE.append(" ")
    data=[]

    for i,k,l,m,n,o,p in zip(user_detail['USER_NAME'].tolist(),user_detail['EMAIL_ID'].tolist(),CREATED_DATE,LAST_PRACTICE_DATE,LAST_LOGIN_DATE,SUBSCRIPTION_EXPIRE_DATE,user_detail['practice_count'].tolist()):
        #print(p,q,r)
        data.append([i,k,l,m,n,o,p])
    temp={"data":data,"school_name":card_detail['NAME'][0],"country":card_detail['COUNTRY'][0],"state":card_detail['STATE'][0],"city":card_detail['CITY'][0],"address":card_detail['ADDRESS'][0],"admin_name":card_detail['admin_name'][0],"admin_email":card_detail['EMAIL_ID'][0],"school_practice_count":str(card_detail['school_practice_count1'][0]),"user_count":str(card_detail['USER_COUNT'][0])}
    
    return json.dumps(temp)

@app.route('/usersearch/<name>')
def USER_search(name):
    import pandas as pd
    import numpy as np
    import mysql.connector
    from datetime import datetime
    from flask import Flask,json
    db = mysql.connector.connect(host="34.214.24.229",    # your host, usually 
                     user="IE-tech",         # your username
                     passwd="IE-tech@2O2O",  # your password
                     db="compassJune") 

    user_detail="""select
    um.USER_ID,um.USER_NAME,um.EMAIL_ID,sm.id as SCHOOL_ID,sm.name as SCHOOL_NAME,um.CREATED_DATE,max(sbm.SUBSCRIPTION_EXPIRE_DATE) as Renewal_Date,
    max(ll.LAST_LOGGED_IN) as last_login_date,max(atd.MODIFIED_DATE) as last_practice_date,count(atd.USER_ID) as practice_count
     from user_profile as up left join user_master as um on um.USER_ID=up.USER_ID
    left join school_master as sm on sm.id=up.SCHOOL_ID left join subscription_master as sbm on sbm.USER_ID=um.USER_ID
    left join audio_track_detail as atd on atd.USER_ID=up.USER_ID
    left join login_logs as ll on ll.user_id=up.user_id 
    where  um.user_name not like '%TEST%' and um.IS_DISABLED != 'Y' and um.IS_BLOCKED != 'Y' and um.EMAIL_ID like '%"""+name+"""%'
    and um.INCOMPLETE_SIGNUP != 'Y' and um.role_id !=3 
    group by um.USER_ID"""
    user_detail = pd.read_sql(user_detail, con=db)  
    
    user_detail['last_practice_date'].fillna("NO PRACTICE", inplace=True)
    user_detail['Renewal_Date'].fillna(" ", inplace=True)
    user_detail.fillna(value=pd.np.nan, inplace=True)
    user_detail['last_login_date'].fillna("NO LOGIN", inplace=True)
    user_detail=user_detail.dropna()
    LAST_PRACTICE_DATE=[]
    for i in user_detail['last_practice_date']:
        if  i != 'NO PRACTICE' :
            LAST_PRACTICE_DATE.append(i.strftime("%d %b %Y "))
        else:
            LAST_PRACTICE_DATE.append("NO PRACTICE")
    LAST_LOGIN_DATE=[]
    for i in user_detail['last_login_date']:
        if  i != 'NO LOGIN' :
            LAST_LOGIN_DATE.append(i.strftime("%d %b %Y "))
        else:
            LAST_LOGIN_DATE.append("NO LOGIN")
    SUBSCRIPTION_EXPIRE_DATE=[]
    for i in user_detail['Renewal_Date']:
        if  i != ' ' :
            SUBSCRIPTION_EXPIRE_DATE.append(i.strftime("%d %b %Y "))
        else:
            SUBSCRIPTION_EXPIRE_DATE.append(" ")        
    CREATED_DATE=[]
    for i in user_detail['CREATED_DATE']:
        if  i != ' ' :
            CREATED_DATE.append(i.strftime("%d %b %Y "))
        else:
            CREATED_DATE.append(" ")
    data=[]

    for d,i,k,l,m,n,o,p in zip(user_detail['SCHOOL_NAME'].tolist(),user_detail['USER_NAME'].tolist(),user_detail['EMAIL_ID'].tolist(),CREATED_DATE,LAST_PRACTICE_DATE,LAST_LOGIN_DATE,SUBSCRIPTION_EXPIRE_DATE,user_detail['practice_count'].tolist()):
        #print(p,q,r)
        data.append([d,i,k,l,m,n,o,p])
    temp={"data":data}
    return json.dumps(temp)

@app.route('/schoolsearch/<month>/<n>')
def rating_month_info(month,n):
    import pandas as pd
    import numpy as np
    import mysql.connector
    from datetime import datetime
    from flask import Flask,json
    db = mysql.connector.connect(host="34.214.24.229",    # your host, usually 
                     user="IE-tech",         # your username
                     passwd="IE-tech@2O2O",  # your password
                     db="compassJune")

    
    
#     month_variable=month.dt.month
    query="""select af.USER,um.USER_NAME,um.EMAIL_ID,af.AUDIO_ID,pm.AUDIO_NAME,af.RATING,af.COMMENT,
    max(date(af.MODIFIED_DATE)) as last_comment_rating_date,
    max(date(atd.MODIFIED_DATE)) as last_practice_date,max(date(ll.LAST_LOGGED_IN)) as last_login_date,sm.id as school_id,
    sm.name as school_name,
    sm.STATE as State, sm.COUNTRY as Country
    from audio_feedback as af left join user_master as um on um.USER_ID=af.USER
    inner join user_profile as up on up.USER_ID=um.USER_ID
    inner join  school_master as sm on sm.id=up.SCHOOL_ID
    left join audio_track_detail as atd on atd.USER_ID=up.USER_ID
    left join login_logs as ll on ll.USER_ID=up.USER_ID
    left join programs_audio as pm on pm.AUDIO_ID=af.AUDIO_ID
    where um.user_name not like '%TEST%' and um.IS_DISABLED != 'Y' and um.IS_BLOCKED != 'Y' AND sm.NAME is NOT null AND sm.NAME != '' 
    and um.INCOMPLETE_SIGNUP != 'Y' and um.role_id !=3 and monthname(af.MODIFIED_DATE) like '%"""+month+"""%' and af.rating="""+n+"""
    group by af.user;"""
    
    df=pd.read_sql(query, con=db)
    
    df['last_comment_rating_date']=df['last_comment_rating_date'].dropna()
    df=df.reset_index(drop=True)
    df['COMMENT']=df['COMMENT'].replace('','NO COMMENT')
    df.last_practice_date=df.last_practice_date.fillna('NO PRACTICE')
    df.last_login_date=df.last_login_date.fillna('NO LOGIN')
    LAST_LOGIN_DATE=[]
    for i in df['last_login_date']:
        if  i != 'NO LOGIN' :
            LAST_LOGIN_DATE.append(i.strftime("%d %b %Y "))
        else:
            LAST_LOGIN_DATE.append("NO LOGIN")
#     print(LAST_LOGIN_DATE)
    LAST_PRACTICE_DATE=[]
    for i in df['last_practice_date']:
        if  i != 'NO PRACTICE' :
            LAST_PRACTICE_DATE.append(i.strftime("%d %b %Y "))
        else:
            LAST_PRACTICE_DATE.append("NO PRACTICE")
        #school_table[school_table['ast_comment_rating_date'] !='NO LOGIN']
    last_comment_rating_date=[]
    for i in df['last_comment_rating_date']:
        if  i != ' ' :
            last_comment_rating_date.append(i.strftime("%d %b %Y "))
        else:
            last_comment_rating_date.append(" ")
#     print(last_comment_rating_date)
    data=[]
    for i,j,k,l,m,n,o,p,q in zip(df['school_name'].tolist(),df['State'].tolist(),df['USER_NAME'].tolist(),df['EMAIL_ID'].tolist(),df['AUDIO_NAME'].tolist(),df['COMMENT'].tolist(),last_comment_rating_date,LAST_PRACTICE_DATE,LAST_LOGIN_DATE):
        data.append([i,j,k,l,m,n,o,p,q])
    
    
    temp={"data":data}
    return json.dumps(temp)

@app.route('/parpracticeprograme')
def parpracticeprogram():
    
    db = mysql.connector.connect(
    host="52.35.73.200",
    user="ieuser",
    passwd="mijyBg96wtdDSAB5",
    database="compass")
    q1="""select z.age_group,sum(case when z.audio_day not like '%bonus%' and z.audio_day not like '%sound%' then z.Practice_Count end) as 'Daily',
     sum(case when z.audio_day like '%bonus%' then z.Practice_Count end) as 'Transition',
     sum(case when z.audio_day like '%sound%' then z.Practice_Count end) as 'Sound Practice'
     from (select y.USER_ID,y.AUDIO_DAY,y.age_group,count(atd.USER_ID) as Practice_Count from (select x.USER_ID,
    count(distinct(case when x.audio_length*.50<=x.Playback_Time then x.PROGRAM_AUDIO_ID end))
     as Audio_Watched_above_50,x.AUDIO_DAY,x.AGE_GROUP
     from (select um.USER_ID,atd.PROGRAM_AUDIO_ID,pa.AUDIO_LENGTH as audio_length,
    (atd.CURSOR_END-atd.CURSOR_START) as Playback_Time,pa.AUDIO_DAY,pm.AGE_GROUP
    from user_master as um left join user_profile as up
    on um.user_id=up.user_id
    inner join audio_track_detail as atd on atd.USER_ID=um.USER_ID
    left join school_master as sm on sm.id=up.SCHOOL_ID
    inner join programs_audio as pa on pa.AUDIO_ID=atd.PROGRAM_AUDIO_ID
    INNER join program_master pm on pm.PROGRAM_ID = pa.PROGRAM_ID
    where um.ROLE_ID=3 and date(um.created_date)>'2020-03-17'  AND um.IS_DISABLED !='Y' and um.INCOMPLETE_SIGNUP !='Y'
    and um.email_id not like '%test%' and um.email_id not like '%1gen%' 
    and um.user_name not like '%test%' and um.user_name not like '%1gen%' and um.email_id <>'') as x
    group by x.USER_ID)  as y
    left join audio_track_detail as atd on atd.USER_ID=y.USER_ID
    where y.Audio_Watched_above_50 >0
    group by y.USER_ID) as z
    group by z.AGE_GROUP
    """
    df1=pd.read_sql(q1, con=db)
    
    q2="""select sum(case when z.audio_day not like '%bonus%' and z.audio_day not like '%sound%' then z.Practice_Count end) as 'Daily',
     sum(case when z.audio_day like '%bonus%' then z.Practice_Count end) as 'Transition',
     sum(case when z.audio_day like '%sound%' then z.Practice_Count end) as 'Sound Practice'
     from (select y.USER_ID,y.AUDIO_DAY,count(atd.USER_ID) as Practice_Count from (select x.USER_ID,
    count(distinct(case when x.audio_length*.50<=x.Playback_Time then x.PROGRAM_AUDIO_ID end))
     as Audio_Watched_above_50,x.AUDIO_DAY
     from (select um.USER_ID,atd.PROGRAM_AUDIO_ID,pa.AUDIO_LENGTH as audio_length,
    (atd.CURSOR_END-atd.CURSOR_START) as Playback_Time,pa.AUDIO_DAY
    from user_master as um left join user_profile as up
    on um.user_id=up.user_id
    inner join audio_track_detail as atd on atd.USER_ID=um.USER_ID
    left join school_master as sm on sm.id=up.SCHOOL_ID
    inner join programs_audio as pa on pa.AUDIO_ID=atd.PROGRAM_AUDIO_ID
    where um.ROLE_ID=3 and date(um.created_date)>'2020-03-17'  AND um.IS_DISABLED !='Y' and um.INCOMPLETE_SIGNUP !='Y'
    and um.email_id not like '%test%' and um.email_id not like '%1gen%' 
    and um.user_name not like '%test%' and um.user_name not like '%1gen%' and um.email_id <>'') as x
    group by x.USER_ID)  as y
    left join audio_track_detail as atd on atd.USER_ID=y.USER_ID
    where y.Audio_Watched_above_50 >0
    group by y.USER_ID) as z
    """
    
    df9=pd.read_sql(q2, con=db)
    print(df1,"df1")
    print(df9,"df9")
   
    df1=df1.fillna(0)
    daily=df9['Daily'].sum()
    Transtion=df9['Transition'].sum()
    Sound=df9['Sound Practice'].sum()
    prog=list(df1['age_group'])
    daily1=list(df1['Daily'])
    Transtion1=list(df1['Transition'])
    sound1=list(df1['Sound Practice'])
    temp={"prog":prog,"dtotal":daily,"trant":Transtion,"soundt":Sound,"sound":sound1,"transition":Transtion1,"daily":daily1}
    return json.dumps(temp)



@app.route('/parpracticeprogg/<d>')
def parents_tableprogram(d):
    x=''
    query=''
    if d=='D':
        reader = geolite2.reader()
        db = mysql.connector.connect(
        host="52.35.73.200",
        user="ieuser",
        passwd="mijyBg96wtdDSAB5",
        database="compass")
        query="""select sm.id,sm.name,um.USER_ID as Parents_Id,um.USER_NAME as Parents_Name,up.ip_address,um.contact_number,
        sm.city,sm.state,sm.country,um.EMAIL_ID as Parents_Email,um.user_type,
        count(atd.USER_ID) as Practice_Count,max(date(atd.modified_date)) as Last_Practice_Date,date(um.created_date) Sign_Up_Date,
        max(date(ll.LAST_LOGGED_IN)) as Last_Login_Date,
        round((sum(atd.CURSOR_END)-sum(atd.CURSOR_START))/60) as mindful_minutes
        from user_master as um left join user_profile as up
        on um.user_id=up.user_id
        inner join audio_track_detail as atd on atd.USER_ID=um.USER_ID
        left join school_master as sm on sm.id=up.SCHOOL_ID
        left join login_logs as ll on ll.USER_ID=um.USER_ID
        inner join programs_audio pa on pa.AUDIO_ID=atd.PROGRAM_AUDIO_ID
        inner join program_master pm on pm.PROGRAM_ID=pa.PROGRAM_ID
        where um.ROLE_ID=3 and date(um.created_date)>'2020-03-17'  AND um.IS_DISABLED !='Y' and um.INCOMPLETE_SIGNUP !='Y' and um.email_id not like '%test%' and 
        um.email_id not like '%1gen%' and um.user_name not like '%test%' and pa.audio_day  not like '%sound%' and pa.audio_day  not like '%bonus%' and um.user_name not like '%1gen%' and um.email_id <>''
        group by um.user_id;"""
        
    elif d=='T':
        reader = geolite2.reader()
        db = mysql.connector.connect(
        host="52.35.73.200",
        user="ieuser",
        passwd="mijyBg96wtdDSAB5",
        database="compass")
        query="""select sm.id,sm.name,um.USER_ID as Parents_Id,um.USER_NAME as Parents_Name,up.ip_address,um.contact_number,
        sm.city,sm.state,sm.country,um.EMAIL_ID as Parents_Email,um.user_type,
        count(atd.USER_ID) as Practice_Count,max(date(atd.modified_date)) as Last_Practice_Date,date(um.created_date) Sign_Up_Date,
        max(date(ll.LAST_LOGGED_IN)) as Last_Login_Date,
        round((sum(atd.CURSOR_END)-sum(atd.CURSOR_START))/60) as mindful_minutes
        from user_master as um left join user_profile as up
        on um.user_id=up.user_id
        inner join audio_track_detail as atd on atd.USER_ID=um.USER_ID
        left join school_master as sm on sm.id=up.SCHOOL_ID
        left join login_logs as ll on ll.USER_ID=um.USER_ID
        inner join programs_audio pa on pa.AUDIO_ID=atd.PROGRAM_AUDIO_ID
        inner join program_master pm on pm.PROGRAM_ID=pa.PROGRAM_ID
        where um.ROLE_ID=3 and date(um.created_date)>'2020-03-17'  AND um.IS_DISABLED !='Y' and um.INCOMPLETE_SIGNUP !='Y' and um.email_id not like '%test%' and 
        um.email_id not like '%1gen%' and um.user_name not like '%test%' and pa.audio_day   like '%bonus%' and um.user_name not like '%1gen%' and um.email_id <>''
        group by um.user_id;"""
    elif d=='S':
        reader = geolite2.reader()
        db = mysql.connector.connect(
        host="52.35.73.200",
        user="ieuser",
        passwd="mijyBg96wtdDSAB5",
        database="compass")
        query="""select sm.id,sm.name,um.USER_ID as Parents_Id,um.USER_NAME as Parents_Name,up.ip_address,um.contact_number,
        sm.city,sm.state,sm.country,um.EMAIL_ID as Parents_Email,um.user_type,
        count(atd.USER_ID) as Practice_Count,max(date(atd.modified_date)) as Last_Practice_Date,date(um.created_date) Sign_Up_Date,
        max(date(ll.LAST_LOGGED_IN)) as Last_Login_Date,
        round((sum(atd.CURSOR_END)-sum(atd.CURSOR_START))/60) as mindful_minutes
        from user_master as um left join user_profile as up
        on um.user_id=up.user_id
        inner join audio_track_detail as atd on atd.USER_ID=um.USER_ID
        left join school_master as sm on sm.id=up.SCHOOL_ID
        left join login_logs as ll on ll.USER_ID=um.USER_ID
        inner join programs_audio pa on pa.AUDIO_ID=atd.PROGRAM_AUDIO_ID
        inner join program_master pm on pm.PROGRAM_ID=pa.PROGRAM_ID
        where um.ROLE_ID=3 and date(um.created_date)>'2020-03-17'  AND um.IS_DISABLED !='Y' and um.INCOMPLETE_SIGNUP !='Y' and um.email_id not like '%test%' and 
        um.email_id not like '%1gen%' and um.user_name not like '%test%' and pa.audio_day   like '%sound%' and um.user_name not like '%1gen%' and um.email_id <>''
        group by um.user_id;"""
    else:
        pass
    df=pd.read_sql(query, con=db)
  
    df.mindful_minutes=df.mindful_minutes.fillna(0)
    df.mindful_minutes=df.mindful_minutes.astype('int64')
    df['Last_Practice_Date']=pd.to_datetime(df['Last_Practice_Date'])
    df['Last_Practice_Date'].fillna("NO PRACTICE", inplace=True)
    df['Last_Login_Date']=pd.to_datetime(df['Last_Login_Date'])
    df['Last_Login_Date'].fillna("NO LOGIN", inplace=True)
    df['Sign_Up_Date']=pd.to_datetime(df['Sign_Up_Date'])
    df['name'].fillna("NO SCHOOL INFO", inplace=True)
    def country1(i):
        location = reader.get(i)
        c=(location['country']['names']['en'])
        return c
    def state1(i):
        location = reader.get(i)
        s=(location['subdivisions'][0]['names']['en'])
        return s
    def city1(i):
        location = reader.get(i)
        city=location['city']['names']['en']
        return city
    def pn_country(i):
        import phonenumbers
        import pycountry
        from phonenumbers.phonenumberutil import (
        region_code_for_country_code,
        region_code_for_number,)
        pn = phonenumbers.parse('+'+i)   
        country = pycountry.countries.get(alpha_2=region_code_for_number(pn))
        con=country.name
        return con
    ip=df['ip_address'].tolist()
    phone_number=df['contact_number'].tolist()
    Parents_Name=df['Parents_Name'].tolist()
    Parents_Email=df.Parents_Email.tolist()
    School_Name=df['name'].tolist()
    state=df['state'].tolist()
    country=df['country'].tolist()
    city=df['city'].tolist()
    sign_up_date=df['Sign_Up_Date'].tolist()
    last_prac_date=df['Last_Practice_Date'].tolist()
    last_login_date=df['Last_Login_Date'].tolist()
    practice_count=df['Practice_Count'].tolist()
    mindful_minutes=df['mindful_minutes'].tolist()
    for i in range(len(ip)):
        if country[i] is None:
            try:
                country[i]=country1(ip[i])
            except:
                pass
        elif country[i]=='null':
            try:
                country[i]=country1(ip[i])
            except:
                pass
        if city[i] is None:
            try:
                city[i]=city1(ip[i])
            except:
                pass
        elif city[i]=='null':
            try:
                city[i]=city1(ip[i])
            except:
                pass
        if state[i] is None:
            try:
                state[i]=state1(ip[i])
            except:
                pass
        elif state[i] =='NO state info':
            try:
                state[i]=state1(ip[i])
            except:
                pass    
        if country[i] is None:
            try:
                country[i]=pn_country(phone_number[i])
            except:
                pass
        if country[i] is None:
            country[i]=''
        if state[i] is None:
            state[i]=''
        if  last_prac_date[i] != 'NO PRACTICE' :
            last_prac_date[i]=last_prac_date[i].strftime('%d %b %Y')
        else:
            last_prac_date[i]="NO PRACTICE"
        if  last_login_date[i] != 'NO LOGIN' :
            last_login_date[i]=last_login_date[i].strftime('%d %b %Y')
        else:
            last_login_date[i]="NO LOGIN"
        if sign_up_date[i] is not None:
            sign_up_date[i]=sign_up_date[i].strftime('%d %b %Y')
    state12 =  [each_string.lower() for each_string in state]
    cv={'pnn':Parents_Name,'pe':Parents_Email,'co':country,'pn':phone_number,'sn':School_Name,'ct':city,
                               'st':state12,'sp':sign_up_date,
                               'll':last_login_date,'lp':last_prac_date,'pc':practice_count}
    dftry = pd.DataFrame.from_dict(cv)
    dftry= dftry.drop("co", axis=1)
    
        
    return json.dumps({"data":dftry.values.tolist()})


@app.route('/newcardpar')
def parpracticedatacard():
    
    db = mysql.connector.connect(
    host="52.35.73.200",
    user="ieuser",
    passwd="mijyBg96wtdDSAB5",
    database="compass")
    q1="""select count(distinct(case when y.Audio_Watched_above_50>0 then y.User_id end)) as Active_Parents,
    count(distinct(case when y.Audio_Watched_above_50=0 then y.User_id end)) as Passive_Parents,
    sum(y.Mindful_Minutes) as Total_Mindful_Minutes,
    sum(y.Total_Playbacks) as Overall_PlayBacks
    from(select x.USER_ID as User_id,count(distinct(x.PROGRAM_AUDIO_ID)) as Unique_Audio_Played,
    count(distinct(case when x.audio_length*.50 <=x.Playback_Time then x.PROGRAM_AUDIO_ID end))
    as Audio_Watched_above_50,
    count(x.USER_ID) as Total_Playbacks,
    count(case when x.audio_length*.50 <=x.Playback_Time then x.USER_ID end)
    as Total_Playback_Above_50,
     round(sum(Playback_Time/60)) as Mindful_Minutes
    from (select um.USER_ID,atd.PROGRAM_AUDIO_ID,pa.AUDIO_LENGTH as audio_length,
    (atd.CURSOR_END-atd.CURSOR_START) as Playback_Time
    from user_master as um left join user_profile as up
    on um.user_id=up.user_id
    inner join audio_track_detail as atd on atd.USER_ID=um.USER_ID
    left join school_master as sm on sm.id=up.SCHOOL_ID
    left join programs_audio as pa on pa.AUDIO_ID=atd.PROGRAM_AUDIO_ID
    where um.ROLE_ID=3 and date(um.created_date)>'2020-03-17'  AND um.IS_DISABLED !='Y' and um.INCOMPLETE_SIGNUP !='Y'
    and um.email_id not like '%test%' and um.email_id not like '%1gen%' 
    and um.user_name not like '%test%' and um.user_name not like '%1gen%' and um.email_id <>'') as x
    group by x.USER_ID) as y"""
    df1=pd.read_sql(q1, con=db)
    temp={"playbackpractice":str(df1['Overall_PlayBacks'][0]),"minutespractice":str(df1['Total_Mindful_Minutes'][0]),"total":str(df1['Active_Parents'][0]+df1['Passive_Parents'][0]),"active":str(df1['Active_Parents'][0]),"passive":str(df1['Passive_Parents'][0])}
    return json.dumps(temp)

# CHECKPOINT

@app.route('/paractweek')
def paractweek12():
    
    db = mysql.connector.connect(
    host="52.35.73.200",
    user="ieuser",
    passwd="mijyBg96wtdDSAB5",
    database="compass")
    q1="""select atd.modified_date as sign_up
        from user_master as um left join user_profile as up on up.USER_ID=um.USER_ID
        left join school_master as sm on sm.id=up.SCHOOL_ID
        inner join audio_track_detail as atd on atd.USER_ID=um.USER_ID
        where  um.ROLE_ID=3  and DATE(um.CREATED_DATE) > '2020-03-17'  AND um.IS_DISABLED !='Y' and um.INCOMPLETE_SIGNUP !='Y' and um.user_name not like "%test%"  AND
        um.EMAIL_ID NOT LIKE "%TEST%" AND um.EMAIL_ID NOT LIKE "%1gen%" AND um.EMAIL_ID <> ""
        group by um.user_id"""
    df1=pd.read_sql(q1, con=db)
    df1=df1.dropna()
    # print(df1)
    df1['sign_up'] = pd.to_datetime(df1['sign_up'], errors = 'coerce')
    
    df1['sign_upn'] = pd.to_datetime(df1['sign_up']) - timedelta(hours=4)
    
    
    
    from datetime import datetime
    from pytz import timezone
    tz = timezone('UTC')
    date=datetime.now(tz) 
    today = pd.to_datetime(date) - timedelta(hours=4)
    todaydate=today.strftime("%Y-%m-%d")
    # print(todaydate)
    
    
    df2 = df1.groupby([df1['sign_upn'].dt.date]).count()

    # print(df1)
    
    
    cdate=[]
    for i in df2.index:
        x=i.strftime('%s')
        cdate.append(float(x)*1000)
    count=[]
    for i in df2['sign_up'] :
        count.append(i)
    count1=np.cumsum(count)
    
    
    df3 = pd.DataFrame(list(zip(cdate,count)), 
                       columns =['date', 'count']) 
    df4 = pd.DataFrame(list(zip(cdate,count1)), 
                       columns =['date', 'count'])
    data = df3.values.tolist()
    data1 = df4.values.tolist()


    ##### hourly graph

    
    times = pd.to_datetime(df1.sign_upn)
    times['hour'] = times.map( lambda x: pd.to_datetime(x).hour )
    timedf=times.groupby(['hour']).size().to_frame('count').reset_index()

    timedata={"hour":timedf['hour'].tolist(),"count":timedf['count'].tolist()}

    ###### week data
    df_data = pd.to_datetime(df1['sign_upn'], format='%Y%m%d')
    week_df = df_data.groupby(df1['sign_upn'].dt.weekday_name).count()

    weekdata={"day":['Monday','Tuesday','Wednesday','Thursday','Friday','Saturday', 'Sunday'],"count":[str(week_df['Monday']),str(week_df['Tuesday']),str(week_df['Wednesday']),str(week_df['Thursday']),str(week_df['Friday']),str(week_df['Saturday']),str(week_df['Sunday'])]}
    temp={"weekdata":weekdata,"timedata":timedata}
    return json.dumps(temp)

    return json.dumps(temp)

@app.route('/parpracticeprogg')
def parpracticeprog2():
    
    db = mysql.connector.connect(
    host="52.35.73.200",
    user="ieuser",
    passwd="mijyBg96wtdDSAB5",
    database="compass")
    q1="""select x.AGE_GROUP, sum(case when x.AUDIO_DAY not like '%bonus%' and x.AUDIO_DAY not like '%sound%' then x.counts end) as 'Daily',
    sum(case when x.AUDIO_DAY  like '%bonus%' then x.counts end) as 'Transtion',
    sum(case when x.AUDIO_DAY  like '%sound%'  then x.counts end) as 'Sound Practice'  from
    (select pa.audio_day, count(um.user_id) as counts, pm.age_group
    from user_master um
    inner join audio_track_detail atd on atd.user_id=um.user_id
    inner join programs_audio pa on pa.AUDIO_ID=atd.PROGRAM_AUDIO_ID
    inner join program_master pm on pm.PROGRAM_ID=pa.PROGRAM_ID
    where um.ROLE_ID=3 and date(um.created_date)>'2020-03-17'  AND um.IS_DISABLED !='Y' and um.INCOMPLETE_SIGNUP !='Y' and um.EMAIL_ID not like '%1gen%' 
    and um.EMAIL_ID not like '%test%' and um.USER_NAME not like '%test%'  
    group by audio_day)x
    group by AGE_GROUP"""
    df1=pd.read_sql(q1, con=db)
    
    q2="""select sum(x.daily) as Daily,sum(x.bonus) as Transition,sum(x.sound) as 'Sound Practice' from 
    (select  pa.audio_day ,
    count(case when pa.audio_day not  like '%sound%' and pa.audio_day not  like '%bonus%' then (um.user_id)end) as daily,
    count(case when pa.audio_day   like '%sound%' then (um.user_id)end) as sound,
    count(case when pa.audio_day   like '%bonus%' then (um.user_id)end) as bonus
    from user_master um
    inner join audio_track_detail atd on atd.user_id=um.user_id
    inner join programs_audio pa on pa.AUDIO_ID=atd.PROGRAM_AUDIO_ID
    inner join program_master pm on pm.PROGRAM_ID=pa.PROGRAM_ID
    where um.ROLE_ID=3 and date(um.created_date)>'2020-03-17'  AND um.IS_DISABLED !='Y' and um.INCOMPLETE_SIGNUP !='Y' and um.EMAIL_ID not like '%1gen%'
    and um.EMAIL_ID not like '%test%' and um.USER_NAME not like '%test%' 
    group by um.user_id)x"""
    
    df9=pd.read_sql(q2, con=db)
    
   
    df1=df1.fillna(0)
    daily=df9['Daily'].sum()
    Transtion=df9['Transition'].sum()
    Sound=df9['Sound Practice'].sum()
    prog=list(df1['AGE_GROUP'])
    daily1=list(df1['Daily'])
    Transtion1=list(df1['Transtion'])
    sound1=list(df1['Sound Practice'])
    temp={"prog":prog,"dtotal":daily,"trant":Transtion,"soundt":Sound,"sound":sound1,"transition":Transtion1,"daily":daily1}
    return json.dumps(temp)


@app.route('/parpracprog')
def parpracprog():
    
    db = mysql.connector.connect(
    host="52.35.73.200",
    user="ieuser",
    passwd="mijyBg96wtdDSAB5",
    database="compass")
    q1="""
    select x.age_group,sum(x.daily) as Daily,sum(x.bonus) as Transition,sum(x.sound) as 'Sound Practice' ,x.AGE_GROUP from 
    (select  pa.audio_day, pm.AGE_GROUP,
    count(distinct(case when pa.audio_day not  like '%sound%' and pa.audio_day not  like '%bonus%' then (um.user_id)end)) as daily,
    count(distinct(case when pa.audio_day   like '%sound%' then (um.user_id)end)) as sound,
    count(distinct(case when pa.audio_day   like '%bonus%' then (um.user_id)end)) as bonus
    from user_master um
    inner join audio_track_detail atd on atd.user_id=um.user_id
    inner join programs_audio pa on pa.AUDIO_ID=atd.PROGRAM_AUDIO_ID
    inner join program_master pm on pm.PROGRAM_ID=pa.PROGRAM_ID
    where um.ROLE_ID=3 and date(um.created_date)>'2020-03-17'  AND um.IS_DISABLED !='Y' and um.INCOMPLETE_SIGNUP !='Y' and um.EMAIL_ID not like '%1gen%'
    and um.EMAIL_ID not like '%test%' and um.USER_NAME not like '%test%' 
    group by um.user_id)x
    group by x.AGE_GROUP"""
    df1=pd.read_sql(q1, con=db)
    q2="""select sum(x.daily) as Daily,sum(x.bonus) as Transition,sum(x.sound) as 'Sound Practice' from 
    (select  pa.audio_day ,
    count(distinct(case when pa.audio_day not  like '%sound%' and pa.audio_day not  like '%bonus%' then (um.user_id)end)) as daily,
    count(distinct(case when pa.audio_day   like '%sound%' then (um.user_id)end)) as sound,
    count(distinct(case when pa.audio_day   like '%bonus%' then (um.user_id)end)) as bonus
    from user_master um
    inner join audio_track_detail atd on atd.user_id=um.user_id
    inner join programs_audio pa on pa.AUDIO_ID=atd.PROGRAM_AUDIO_ID
    inner join program_master pm on pm.PROGRAM_ID=pa.PROGRAM_ID
    where um.ROLE_ID=3 and date(um.created_date)>'2020-03-17'  AND um.IS_DISABLED !='Y' and um.INCOMPLETE_SIGNUP !='Y' and um.EMAIL_ID not like '%1gen%'
    and um.EMAIL_ID not like '%test%' and um.USER_NAME not like '%test%' 
    group by um.user_id)x"""
    # print(df1)
    df9=pd.read_sql(q2, con=db)
    # print(df9)
    df1=df1.fillna(0)
    daily=df9['Daily'].sum()
    Transtion=df9['Transition'].sum()
    Sound=df9['Sound Practice'].sum()
    prog=list(df1['AGE_GROUP'])
    daily1=list(df1['Daily'])
    Transtion1=list(df1['Transition'])
    sound1=list(df1['Sound Practice'])
    temp={"prog":prog,"dtotal":daily,"trant":Transtion,"soundt":Sound,"sound":sound1,"transition":Transtion1,"daily":daily1}
    return json.dumps(temp)



@app.route('/parsignupdaycompp')

def parsignupdaycomp211():
    db = mysql.connector.connect(
    host="52.35.73.200",
    user="ieuser",
    passwd="mijyBg96wtdDSAB5",
    database="compass")
    q1="""select um.created_date as sign_up
        from user_master as um left join user_profile as up on up.USER_ID=um.USER_ID
        left join school_master as sm on sm.id=up.SCHOOL_ID
        left join audio_track_detail as atd on atd.USER_ID=um.USER_ID
        where  um.ROLE_ID=3  and DATE(um.CREATED_DATE) > '2020-03-17' AND um.IS_DISABLED !='Y' and um.INCOMPLETE_SIGNUP !='Y' and um.user_name not like "%test%"  AND
        um.EMAIL_ID NOT LIKE "%TEST%" AND um.EMAIL_ID NOT LIKE "%1gen%" AND um.EMAIL_ID <> ""
        group by um.user_id """
    df1=pd.read_sql(q1, con=db)
    df1=df1.dropna()
    df1['sign_up'] = pd.to_datetime(df1['sign_up'], errors = 'coerce')
    df1['sign_upn'] = pd.to_datetime(df1['sign_up']) - timedelta(hours=4)
    df1['date']=df1['sign_upn'].apply(lambda x: x.strftime("%Y-%m-%d"))
    from datetime import datetime
    from pytz import timezone
    tz = timezone('US/Eastern')
    date=datetime.now(tz)
    yesterday=pd.to_datetime(date)-timedelta(days=1)
    todaydate=date.strftime("%Y-%m-%d")
    yesterdaydate=yesterday.strftime("%Y-%m-%d")
    dfyes=df1[df1['date']==yesterdaydate]
    dftod=df1[df1['date']==todaydate]
    times = pd.to_datetime(dfyes.sign_upn)
    times['hour'] = times.map( lambda x: pd.to_datetime(x).hour )
    timedfyes=times.groupby(['hour']).size().to_frame('count').reset_index()
    times2 = pd.to_datetime(dftod.sign_upn)
    times2['hour'] = times2.map( lambda x: pd.to_datetime(x).hour )
    timedftod=times2.groupby(['hour']).size().to_frame('count').reset_index()
    timedfyes = timedfyes.astype(int)
    hour=[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24]
    count=[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
    dftest = pd.DataFrame({'hour':hour,'count':count})
    result = pd.merge(timedfyes , dftest,how='right', on='hour')
    result=result.fillna(0)
    result= result.astype(int)
    result = result.sort_values(["hour", "count_x"], ascending = (True,False))
    #yesterday count
    yescount=list(result['count_x'])
    timedftod = timedftod.astype(int)
    result12 = pd.merge(timedftod, dftest,how='right', on='hour')
    result12=result12.fillna(0)
    result12= result12.astype(int)
    result12 = result12.sort_values(["hour", "count_x"], ascending = (True,False))
    #todays count
    todcount=list(result12['count_x'])
    totaly=sum(yescount)
    totalt=sum(todcount)
    temp={"tod":todcount,"yes":yescount,"totaly":[str(totaly)],"totalt":[str(totalt)]}
    return json.dumps(temp)



@app.route('/parpracdaycompp')
def parsignupdaycomp12():
    
    db = mysql.connector.connect(
    host="52.35.73.200",
    user="ieuser",
    passwd="mijyBg96wtdDSAB5",
    database="compass")
    q1="""select atd.modified_date as sign_up
        from user_master as um left join user_profile as up on up.USER_ID=um.USER_ID
        left join school_master as sm on sm.id=up.SCHOOL_ID
        inner join audio_track_detail as atd on atd.USER_ID=um.USER_ID
        where  um.ROLE_ID=3  and DATE(um.CREATED_DATE) > '2020-03-17' and um.user_name not like "%test%"  AND
        um.EMAIL_ID NOT LIKE "%TEST%" AND um.EMAIL_ID NOT LIKE "%1gen%" AND um.EMAIL_ID <> ""
        group by sign_up"""
    df1=pd.read_sql(q1, con=db)
    df1=df1.dropna()
    print(df1)
    df1['sign_up'] = pd.to_datetime(df1['sign_up'], errors = 'coerce')
    
    df1['sign_upn'] = pd.to_datetime(df1['sign_up']) - timedelta(hours=4)
    
    
    
    from datetime import datetime
    from pytz import timezone
    tz = timezone('UTC')
    date=datetime.now(tz) 
    today = pd.to_datetime(date) - timedelta(hours=4)
    yesterday=pd.to_datetime(today)-timedelta(days=1)
    print(yesterday)
    todaydate=today.strftime("%Y-%m-%d")
    print(todaydate)
    yesterdaydate=yesterday.strftime("%Y-%m-%d")
    
    
    df2 = df1.groupby([df1['sign_upn'].dt.date]).count()

    print(df1)
    
    
    cdate=[]
    for i in df2.index:
        x=i.strftime('%s')
        cdate.append(float(x)*1000)
    count=[]
    for i in df2['sign_up'] :
        count.append(i)
    count1=np.cumsum(count)
    
    
    df3 = pd.DataFrame(list(zip(cdate,count)), 
                       columns =['date', 'count']) 
    df4 = pd.DataFrame(list(zip(cdate,count1)), 
                       columns =['date', 'count'])
    data = df3.values.tolist()
    data1 = df4.values.tolist()


    ##### hourly graph

    df3=df1[df1['sign_upn']>todaydate]
    times = pd.to_datetime(df3.sign_upn)
    times['hour'] = times.map( lambda x: pd.to_datetime(x).hour )
    timedf=times.groupby(['hour']).size().to_frame('count').reset_index()

    timedata={"hour":timedf['hour'].tolist(),"count":timedf['count'].tolist()}
    dfnew1=pd.DataFrame.from_dict(timedata)
    dfnew1=dfnew1.astype(int)
    counttoday=[]
    hournew=[]
    for i in range(0,24):
#         print(i)
        if i in dfnew1.hour:
            counttoday.append(dfnew1['count'][i])
            hournew.append(str(i)+"hr")
        else :
            counttoday.append(0)
            hournew.append(str(i)+"hr")
#             print("no")

    
    df4=df1[df1['sign_upn']<todaydate]
    df5=df4[df4['sign_upn']>yesterdaydate]
    times = pd.to_datetime(df5.sign_upn)
#     print(times,"jojojoj")
    times['hour'] = times.map( lambda x: pd.to_datetime(x).hour )
    timedf=times.groupby(['hour']).size().to_frame('count').reset_index()

    timedatay={"hour":timedf['hour'].tolist(),"count":timedf['count']}
    
    dfnew=pd.DataFrame.from_dict(timedatay)
    dfnew=dfnew.astype(int)
    
#     print(dfnew,"hello2")
   
    countnew=[]
    for i in range(0,24):
#         print(i)
        if i in dfnew.hour:
            countnew.append(dfnew['count'][i])
            
        else :
            countnew.append(0)
            
    
            
      
            
# #     print(hournew,"hournew")
    totaly=sum(countnew)
    totalt=sum(counttoday)
    counttoday = [str(i) for i in counttoday] 
    countnew=[str(i) for i in countnew] 

#     weekdata={"day":['Monday','Tuesday','Wednesday','Thursday','Friday','Saturday', 'Sunday'],"count":[str(week_df['Monday']),str(week_df['Tuesday']),str(week_df['Wednesday']),str(week_df['Thursday']),str(week_df['Friday']),str(week_df['Saturday']),str(week_df['Sunday'])]}
    temp={"tod":counttoday,"yes":countnew,"totaly":[str(totaly)],"totalt":[str(totalt)]}
    
    
    return json.dumps(temp)


@app.route('/sarasotapracnew')
def sarasotapracnew():
    
    db = mysql.connector.connect(
    host="52.35.73.200",
    user="ieuser",
    passwd="mijyBg96wtdDSAB5",
    database="compass")
    q1="""select atd.modified_date as sign_up ,count(atd.USER_ID) as count
        from user_master as um left join user_profile as up on up.USER_ID=um.USER_ID
        left join school_master as sm on sm.id=up.SCHOOL_ID
        inner join audio_track_detail as atd on atd.USER_ID=um.USER_ID
        where  um.ROLE_ID=3  and DATE(um.CREATED_DATE) > '2020-03-17' AND um.user_type like "%sarasota%" and um.IS_DISABLED !='Y' and um.INCOMPLETE_SIGNUP !='Y' and um.user_name not like "%test%"  AND
        um.EMAIL_ID NOT LIKE "%TEST%" AND um.EMAIL_ID NOT LIKE "%1gen%"  AND um.EMAIL_ID <> ""
        group by sign_up"""
    df1=pd.read_sql(q1, con=db)
    df1=df1.dropna()
    # print(df1)
    df1['sign_up'] = pd.to_datetime(df1['sign_up'], errors = 'coerce')
    df1['sign_upn'] = pd.to_datetime(df1['sign_up']) - timedelta(hours=4)
    df2 = df1.groupby([df1['sign_upn'].dt.date]).sum()
#     print(df2)
    
    cdate=[]
    for i in df2.index:
        x=i.strftime('%s')
        cdate.append(float(x)*1000)
    count=[]
    for i in df2['count'] :
        count.append(i)
    count1=np.cumsum(count)
    df3 = pd.DataFrame(list(zip(cdate,count)), 
                       columns =['date', 'count']) 
    df4 = pd.DataFrame(list(zip(cdate,count1)), 
                       columns =['date', 'count'])
    data = df3.values.tolist()
    data1 = df4.values.tolist()
    return json.dumps({"bar":data,"line":data1})


@app.route('/parpracnew')
def parpracnew():
    
    db = mysql.connector.connect(
    host="52.35.73.200",
    user="ieuser",
    passwd="mijyBg96wtdDSAB5",
    database="compass")
    q1="""select atd.modified_date as sign_up ,count(atd.USER_ID) as count
        from user_master as um left join user_profile as up on up.USER_ID=um.USER_ID
        left join school_master as sm on sm.id=up.SCHOOL_ID
        inner join audio_track_detail as atd on atd.USER_ID=um.USER_ID
        where  um.ROLE_ID=3  and DATE(um.CREATED_DATE) > '2020-03-17' AND um.IS_DISABLED !='Y' and um.INCOMPLETE_SIGNUP !='Y' and um.user_name not like "%test%"  AND
        um.EMAIL_ID NOT LIKE "%TEST%" AND um.EMAIL_ID NOT LIKE "%1gen%"  AND um.EMAIL_ID <> ""
        group by sign_up"""
    df1=pd.read_sql(q1, con=db)
    df1=df1.dropna()
    # print(df1)
    df1['sign_up'] = pd.to_datetime(df1['sign_up'], errors = 'coerce')
    df1['sign_upn'] = pd.to_datetime(df1['sign_up']) - timedelta(hours=4)
    df2 = df1.groupby([df1['sign_upn'].dt.date]).sum()
#     print(df2)
    
    cdate=[]
    for i in df2.index:
        x=i.strftime('%s')
        cdate.append(float(x)*1000)
    count=[]
    for i in df2['count'] :
        count.append(i)
    count1=np.cumsum(count)
    df3 = pd.DataFrame(list(zip(cdate,count)), 
                       columns =['date', 'count']) 
    df4 = pd.DataFrame(list(zip(cdate,count1)), 
                       columns =['date', 'count'])
    data = df3.values.tolist()
    data1 = df4.values.tolist()
    return json.dumps({"bar":data,"line":data1})


@app.route('/sarasotapracweek')
def sarasotapracweekZZ():
    
    db = mysql.connector.connect(
    host="52.35.73.200",
    user="ieuser",
    passwd="mijyBg96wtdDSAB5",
    database="compass")
    q1="""select atd.modified_date as sign_up
        from user_master as um left join user_profile as up on up.USER_ID=um.USER_ID
        left join school_master as sm on sm.id=up.SCHOOL_ID
        inner join audio_track_detail as atd on atd.USER_ID=um.USER_ID
        where  um.ROLE_ID=3  and DATE(um.CREATED_DATE) > '2020-03-17' and um.user_type like "%sarasota%" and um.user_name not like "%test%" AND um.IS_DISABLED !='Y' and um.INCOMPLETE_SIGNUP !='Y' AND
        um.EMAIL_ID NOT LIKE "%TEST%" AND um.EMAIL_ID NOT LIKE "%1gen%" AND um.EMAIL_ID <> ""
        group by sign_up"""
    df1=pd.read_sql(q1, con=db)
    df1=df1.dropna()
    # print(df1)
    df1['sign_up'] = pd.to_datetime(df1['sign_up'], errors = 'coerce')
    
    df1['sign_upn'] = pd.to_datetime(df1['sign_up']) - timedelta(hours=0)
    
    
    
    from datetime import datetime
    from pytz import timezone
    tz = timezone('UTC')
    date=datetime.now(tz) 
    today = pd.to_datetime(date) - timedelta(hours=0)
    todaydate=today.strftime("%Y-%m-%d")
    print(todaydate)
    
    
    df2 = df1.groupby([df1['sign_upn'].dt.date]).count()

    print(df1)
    
    
    cdate=[]
    for i in df2.index:
        x=i.strftime('%s')
        cdate.append(float(x)*1000)
    count=[]
    for i in df2['sign_up'] :
        count.append(i)
    count1=np.cumsum(count)
    
    
    df3 = pd.DataFrame(list(zip(cdate,count)), 
                       columns =['date', 'count']) 
    df4 = pd.DataFrame(list(zip(cdate,count1)), 
                       columns =['date', 'count'])
    data = df3.values.tolist()
    data1 = df4.values.tolist()


    ##### hourly graph

    
    times = pd.to_datetime(df1.sign_upn)
    times['hour'] = times.map( lambda x: pd.to_datetime(x).hour )
    timedf=times.groupby(['hour']).size().to_frame('count').reset_index()

    timedata={"hour":timedf['hour'].tolist(),"count":timedf['count'].tolist()}

    ###### week data
    df_data = pd.to_datetime(df1['sign_upn'], format='%Y%m%d')
    week_df = df_data.groupby(df1['sign_upn'].dt.weekday_name).count()

    weekdata={"day":['Monday','Tuesday','Wednesday','Thursday','Friday','Saturday', 'Sunday'],"count":[str(week_df['Monday']),str(week_df['Tuesday']),str(week_df['Wednesday']),str(week_df['Thursday']),str(week_df['Friday']),str(week_df['Saturday']),str(week_df['Sunday'])]}
    temp={"weekdata":weekdata,"timedata":timedata}
    return json.dumps(temp)

    return json.dumps(temp)


@app.route('/parpracweek')
def parpracweekZZ():
    
    db = mysql.connector.connect(
    host="52.35.73.200",
    user="ieuser",
    passwd="mijyBg96wtdDSAB5",
    database="compass")
    q1="""select atd.modified_date as sign_up
        from user_master as um left join user_profile as up on up.USER_ID=um.USER_ID
        left join school_master as sm on sm.id=up.SCHOOL_ID
        inner join audio_track_detail as atd on atd.USER_ID=um.USER_ID
        where  um.ROLE_ID=3  and DATE(um.CREATED_DATE) > '2020-03-17' and um.user_name not like "%test%" AND um.IS_DISABLED !='Y' and um.INCOMPLETE_SIGNUP !='Y' AND
        um.EMAIL_ID NOT LIKE "%TEST%" AND um.EMAIL_ID NOT LIKE "%1gen%" AND um.EMAIL_ID <> ""
        group by sign_up"""
    df1=pd.read_sql(q1, con=db)
    df1=df1.dropna()
    # print(df1)
    df1['sign_up'] = pd.to_datetime(df1['sign_up'], errors = 'coerce')
    
    df1['sign_upn'] = pd.to_datetime(df1['sign_up']) - timedelta(hours=0)
    
    
    
    from datetime import datetime
    from pytz import timezone
    tz = timezone('UTC')
    date=datetime.now(tz) 
    today = pd.to_datetime(date) - timedelta(hours=0)
    todaydate=today.strftime("%Y-%m-%d")
    print(todaydate)
    
    
    df2 = df1.groupby([df1['sign_upn'].dt.date]).count()

    print(df1)
    
    
    cdate=[]
    for i in df2.index:
        x=i.strftime('%s')
        cdate.append(float(x)*1000)
    count=[]
    for i in df2['sign_up'] :
        count.append(i)
    count1=np.cumsum(count)
    
    
    df3 = pd.DataFrame(list(zip(cdate,count)), 
                       columns =['date', 'count']) 
    df4 = pd.DataFrame(list(zip(cdate,count1)), 
                       columns =['date', 'count'])
    data = df3.values.tolist()
    data1 = df4.values.tolist()


    ##### hourly graph

    
    times = pd.to_datetime(df1.sign_upn)
    times['hour'] = times.map( lambda x: pd.to_datetime(x).hour )
    timedf=times.groupby(['hour']).size().to_frame('count').reset_index()

    timedata={"hour":timedf['hour'].tolist(),"count":timedf['count'].tolist()}

    ###### week data
    df_data = pd.to_datetime(df1['sign_upn'], format='%Y%m%d')
    week_df = df_data.groupby(df1['sign_upn'].dt.weekday_name).count()

    weekdata={"day":['Monday','Tuesday','Wednesday','Thursday','Friday','Saturday', 'Sunday'],"count":[str(week_df['Monday']),str(week_df['Tuesday']),str(week_df['Wednesday']),str(week_df['Thursday']),str(week_df['Friday']),str(week_df['Saturday']),str(week_df['Sunday'])]}
    temp={"weekdata":weekdata,"timedata":timedata}
    return json.dumps(temp)

    return json.dumps(temp)

@app.route('/famprogprac')
def famprogprac():
    db = mysql.connector.connect(
    host="52.35.73.200",
    user="ieuser",
    passwd="mijyBg96wtdDSAB5",
    database="compass")
    prog="""
    SELECT pm.PROGRAM_ID, pm.PROGRAM_NAME,pa.AUDIO_ID,pa.AUDIO_NAME,count(um.USER_ID)
     FROM audio_track_detail atd inner join user_master um on um.USER_ID=atd.USER_ID inner join
     programs_audio pa on atd.PROGRAM_AUDIO_ID=pa.AUDIO_ID
     inner join program_master pm on pm.PROGRAM_ID=pa.PROGRAM_ID
     where um.ROLE_ID=3 and date(um.created_date)>'2020-03-17'  AND um.IS_DISABLED !='Y' and um.INCOMPLETE_SIGNUP !='Y' and um.EMAIL_ID not like '%1gen%' 
    and um.EMAIL_ID not like '%test%' and um.USER_NAME not like '%test%' and um.IS_DISABLED!='Y' and um.INCOMPLETE_SIGNUP!='Y' 
    group by pa.AUDIO_ID 
    order by  AUDIO_ID ASC,PROGRAM_AUDIO_ID ASC
    """
    df=pd.read_sql(prog, con=db)
    progcount="""select pa.PROGRAM_ID as 'Program ID',pm.PROGRAM_NAME as 'Program Name', count(um.user_id) as 'Practice Count'
    from user_master um
    inner join audio_track_detail atd on atd.user_id=um.user_id
    inner join programs_audio pa on pa.AUDIO_ID=atd.PROGRAM_AUDIO_ID
    inner join program_master pm on pm.PROGRAM_ID=pa.PROGRAM_ID
    where um.ROLE_ID=3 and date(um.created_date)>'2020-03-17'  AND um.IS_DISABLED !='Y' and um.INCOMPLETE_SIGNUP !='Y' and um.EMAIL_ID not like '%1gen%' 
    and um.EMAIL_ID not like '%test%' and um.USER_NAME not like '%test%' and um.IS_DISABLED!='Y' and um.INCOMPLETE_SIGNUP!='Y' 
    group by PROGRAM_NAME"""
    df2=pd.read_sql(progcount, con=db)
    soun=df[df['PROGRAM_ID']==8]
    hig=df[df['PROGRAM_ID']==4]
    prek=df[df['PROGRAM_ID']==1]
    elem=df[df['PROGRAM_ID']==2]
    mid=df[df['PROGRAM_ID']==3]
    progname=['PRE-K','ELEMENTARY','MIDDLE','HIGH','SOUND PRACTICE']
    progcount=[str(df2['Practice Count'][0]),str(df2['Practice Count'][1]),str(df2['Practice Count'][2]),str(df2['Practice Count'][3]),str(df2['Practice Count'][4])]
    data={"progname":progname,
        "progcount":progcount,
    "prek":prek[['AUDIO_NAME','count(um.USER_ID)']].values.tolist(),
    "elementary":elem[['AUDIO_NAME','count(um.USER_ID)']].values.tolist(),
    "middle":mid[['AUDIO_NAME','count(um.USER_ID)']].values.tolist(),
    "high":hig[['AUDIO_NAME','count(um.USER_ID)']].values.tolist(),
    "sound":soun[['AUDIO_NAME','count(um.USER_ID)']].values.tolist()}
    return json.dumps(data)

@app.route('/famprog')
def famprog():
    db = mysql.connector.connect(
    host="52.35.73.200",
    user="ieuser",
    passwd="mijyBg96wtdDSAB5",
    database="compass")
    prog="""
    SELECT pm.PROGRAM_ID, pm.PROGRAM_NAME,pa.AUDIO_ID,pa.AUDIO_NAME,count(distinct(um.USER_ID))
     FROM audio_track_detail atd inner join user_master um on um.USER_ID=atd.USER_ID inner join
     programs_audio pa on atd.PROGRAM_AUDIO_ID=pa.AUDIO_ID
     inner join program_master pm on pm.PROGRAM_ID=pa.PROGRAM_ID
     where um.ROLE_ID=3 and date(um.created_date)>'2020-03-17'  AND um.IS_DISABLED !='Y' and um.INCOMPLETE_SIGNUP !='Y' and um.EMAIL_ID not like '%1gen%' 
    and um.EMAIL_ID not like '%test%' and um.USER_NAME not like '%test%' and um.IS_DISABLED!='Y' and um.INCOMPLETE_SIGNUP!='Y' 
    group by pa.AUDIO_ID 
    order by  AUDIO_ID ASC,PROGRAM_AUDIO_ID ASC
    """
    df=pd.read_sql(prog, con=db)
    progcount="""select pa.PROGRAM_ID as 'Program ID',pm.PROGRAM_NAME as 'Program Name', count(distinct(um.user_id)) as 'Practice Count'
    from user_master um
    inner join audio_track_detail atd on atd.user_id=um.user_id
    inner join programs_audio pa on pa.AUDIO_ID=atd.PROGRAM_AUDIO_ID
    inner join program_master pm on pm.PROGRAM_ID=pa.PROGRAM_ID
    where um.ROLE_ID=3 and date(um.created_date)>'2020-03-17'  AND um.IS_DISABLED !='Y' and um.INCOMPLETE_SIGNUP !='Y' and um.EMAIL_ID not like '%1gen%' 
    and um.EMAIL_ID not like '%test%' and um.USER_NAME not like '%test%' and um.IS_DISABLED!='Y' and um.INCOMPLETE_SIGNUP!='Y' 
    group by PROGRAM_NAME"""
    df2=pd.read_sql(progcount, con=db)
    soun=df[df['PROGRAM_ID']==8]
    hig=df[df['PROGRAM_ID']==4]
    prek=df[df['PROGRAM_ID']==1]
    elem=df[df['PROGRAM_ID']==2]
    mid=df[df['PROGRAM_ID']==3]
    progname=['PRE-K','ELEMENTARY','MIDDLE','HIGH','SOUND PRACTICE']
    progcount=[str(df2['Practice Count'][0]),str(df2['Practice Count'][1]),str(df2['Practice Count'][2]),str(df2['Practice Count'][3]),str(df2['Practice Count'][4])]
    data={"progname":progname,
        "progcount":progcount,
    "prek":prek[['AUDIO_NAME','count(distinct(um.USER_ID))']].values.tolist(),
    "elementary":elem[['AUDIO_NAME','count(distinct(um.USER_ID))']].values.tolist(),
    "middle":mid[['AUDIO_NAME','count(distinct(um.USER_ID))']].values.tolist(),
    "high":hig[['AUDIO_NAME','count(distinct(um.USER_ID))']].values.tolist(),
    "sound":soun[['AUDIO_NAME','count(distinct(um.USER_ID))']].values.tolist()}
    return json.dumps(data)


@app.route('/sarasotasignupweek')

def sarasotasignupweek():
    
    db = mysql.connector.connect(
    host="52.35.73.200",
    user="ieuser",
    passwd="mijyBg96wtdDSAB5",
    database="compass")
    q1="""select um.created_date as sign_up
        from user_master as um left join user_profile as up on up.USER_ID=um.USER_ID
        left join school_master as sm on sm.id=up.SCHOOL_ID
        left join audio_track_detail as atd on atd.USER_ID=um.USER_ID
        where  um.ROLE_ID=3  and DATE(um.CREATED_DATE) > '2020-03-17' AND um.user_type like "%sarasota%" and um.IS_DISABLED !='Y' and um.INCOMPLETE_SIGNUP !='Y' and um.user_name not like "%test%"  AND
        um.EMAIL_ID NOT LIKE "%TEST%" AND um.EMAIL_ID NOT LIKE "%1gen%" AND um.EMAIL_ID <> ""
        group by um.user_id"""
    df1=pd.read_sql(q1, con=db)
    df1['sign_upn'] = pd.to_datetime(df1['sign_up']) - timedelta(hours=4)
    df2 = df1.groupby([df1['sign_upn'].dt.date]).count()

    cdate=[]
    for i in df2.index:
        x=i.strftime('%s')
        cdate.append(float(x)*1000)
    count=[]
    for i in df2['sign_up'] :
        count.append(i)
    count1=np.cumsum(count)
    df3 = pd.DataFrame(list(zip(cdate,count)), 
                       columns =['date', 'count']) 
    df4 = pd.DataFrame(list(zip(cdate,count1)), 
                       columns =['date', 'count'])
    data = df3.values.tolist()
    data1 = df4.values.tolist()


    ##### hourly graph

    times = pd.to_datetime(df1.sign_upn)
    times['hour'] = times.map( lambda x: pd.to_datetime(x).hour )
    timedf=times.groupby(['hour']).size().to_frame('count').reset_index()

    timedata={"hour":timedf['hour'].tolist(),"count":timedf['count'].tolist()}

    ###### week data
    df_data = pd.to_datetime(df1['sign_upn'], format='%Y%m%d')
    week_df = df_data.groupby(df1['sign_upn'].dt.weekday_name).count()

    weekdata={"day":['Monday','Tuesday','Wednesday','Thursday','Friday','Saturday', 'Sunday'],"count":[str(week_df['Monday']),str(week_df['Tuesday']),str(week_df['Wednesday']),str(week_df['Thursday']),str(week_df['Friday']),str(week_df['Saturday']),str(week_df['Sunday'])]}
    temp={"weekdata":weekdata,"timedata":timedata}
    return json.dumps(temp)

@app.route('/parsignupweek')

def parsignupweek():
    
    db = mysql.connector.connect(
    host="52.35.73.200",
    user="ieuser",
    passwd="mijyBg96wtdDSAB5",
    database="compass")
    q1="""select um.created_date as sign_up
        from user_master as um left join user_profile as up on up.USER_ID=um.USER_ID
        left join school_master as sm on sm.id=up.SCHOOL_ID
        left join audio_track_detail as atd on atd.USER_ID=um.USER_ID
        where  um.ROLE_ID=3  and DATE(um.CREATED_DATE) > '2020-03-17' AND um.IS_DISABLED !='Y' and um.INCOMPLETE_SIGNUP !='Y' and um.user_name not like "%test%"  AND
        um.EMAIL_ID NOT LIKE "%TEST%" AND um.EMAIL_ID NOT LIKE "%1gen%" AND um.EMAIL_ID <> ""
        group by um.user_id"""
    df1=pd.read_sql(q1, con=db)
    df1['sign_upn'] = pd.to_datetime(df1['sign_up']) - timedelta(hours=4)
    df2 = df1.groupby([df1['sign_upn'].dt.date]).count()

    cdate=[]
    for i in df2.index:
        x=i.strftime('%s')
        cdate.append(float(x)*1000)
    count=[]
    for i in df2['sign_up'] :
        count.append(i)
    count1=np.cumsum(count)
    df3 = pd.DataFrame(list(zip(cdate,count)), 
                       columns =['date', 'count']) 
    df4 = pd.DataFrame(list(zip(cdate,count1)), 
                       columns =['date', 'count'])
    data = df3.values.tolist()
    data1 = df4.values.tolist()


    ##### hourly graph

    times = pd.to_datetime(df1.sign_upn)
    times['hour'] = times.map( lambda x: pd.to_datetime(x).hour )
    timedf=times.groupby(['hour']).size().to_frame('count').reset_index()

    timedata={"hour":timedf['hour'].tolist(),"count":timedf['count'].tolist()}

    ###### week data
    df_data = pd.to_datetime(df1['sign_upn'], format='%Y%m%d')
    week_df = df_data.groupby(df1['sign_upn'].dt.weekday_name).count()

    weekdata={"day":['Monday','Tuesday','Wednesday','Thursday','Friday','Saturday', 'Sunday'],"count":[str(week_df['Monday']),str(week_df['Tuesday']),str(week_df['Wednesday']),str(week_df['Thursday']),str(week_df['Friday']),str(week_df['Saturday']),str(week_df['Sunday'])]}
    temp={"weekdata":weekdata,"timedata":timedata}
    return json.dumps(temp)

@app.route('/parentsmapmexico')

def parentsmapmexico():
    reader = geolite2.reader()

    db = mysql.connector.connect(
        host="52.35.73.200",
        user="ieuser",
        passwd="mijyBg96wtdDSAB5",
        database="compass")



    query="""select sm.id,sm.name,um.USER_ID as Parents_Id,um.USER_NAME as Parents_Name,up.ip_address,um.contact_number,
    sm.city,sm.state,sm.country,um.EMAIL_ID as Parents_Email,um.user_type,
    count(atd.USER_ID) as Practice_Count,max(date(atd.modified_date)) as Last_Practice_Date,date(um.created_date) Sign_Up_Date,
    max(date(ll.LAST_LOGGED_IN)) as Last_Login_Date,
    round((sum(atd.CURSOR_END)-sum(atd.CURSOR_START))/60) as mindful_minutes
    from user_master as um left join user_profile as up
    on um.user_id=up.user_id
    left join audio_track_detail as atd on atd.USER_ID=um.USER_ID
    left join school_master as sm on sm.id=up.SCHOOL_ID
    left join login_logs as ll on ll.USER_ID=um.USER_ID
    where um.ROLE_ID=3 and date(um.created_date)>'2020-03-17'  AND um.IS_DISABLED !='Y' and um.INCOMPLETE_SIGNUP !='Y' and um.email_id not like '%test%' and 
    um.email_id not like '%1gen%' and um.user_name not like '%test%' and um.user_name not like '%1gen%' and um.email_id <>''
    group by um.user_id;"""

    df=pd.read_sql(query, con=db)
    df=df.replace("UNITED STATES","United States")
    df=df.replace("US","United States")
    df=df.replace("us","United States")
    df=df.replace("USA","United States")
    df=df.replace("Usa","United States")
    df=df.replace("U.S.A","United States")
    #     print(df.head())
    dfus=df[df['country']=='United States']
    
    df.mindful_minutes=df.mindful_minutes.fillna(0)
    df.mindful_minutes=df.mindful_minutes.astype('int64')
    df['Last_Practice_Date']=pd.to_datetime(df['Last_Practice_Date'])
    df['Last_Practice_Date'].fillna("NO PRACTICE", inplace=True)
    df['Last_Login_Date']=pd.to_datetime(df['Last_Login_Date'])
    df['Last_Login_Date'].fillna("NO LOGIN", inplace=True)
    df['name'].fillna("NO SCHOOL INFO", inplace=True)
    df['Sign_Up_Date']=pd.to_datetime(df['Sign_Up_Date'])
    def country1(i):
        location = reader.get(i)
        c=(location['country']['names']['en'])
        return c
    def state1(i):
        location = reader.get(i)
        s=(location['subdivisions'][0]['names']['en'])
        return s
    
    def city1(i):
        location = reader.get(i)
        city=location['city']['names']['en']
        return city
    
    def pn_country(i):
        import phonenumbers
        import pycountry
        from phonenumbers.phonenumberutil import (
        region_code_for_country_code,
        region_code_for_number,)
        pn = phonenumbers.parse('+'+i)   
        country = pycountry.countries.get(alpha_2=region_code_for_number(pn))
        con=country.name
        return con

    ip=df['ip_address'].tolist()
    phone_number=df['contact_number'].tolist()
    Parents_Name=df['Parents_Name'].tolist()
    Parents_Email=df.Parents_Email.tolist()
    School_Name=df['name'].tolist()
    state=df['state'].tolist()
    country=df['country'].tolist()
    city=df['city'].tolist()
    sign_up_date=df['Sign_Up_Date'].tolist()
    last_prac_date=df['Last_Practice_Date'].tolist()
    last_login_date=df['Last_Login_Date'].tolist()
    practice_count=df['Practice_Count'].tolist()
    mindful_minutes=df['mindful_minutes'].tolist()

    for i in range(len(ip)):

        if country[i] is None:
            try:
                country[i]=country1(ip[i])
            except:
                pass
        elif country[i]=='null':
            try:
                country[i]=country1(ip[i])
            except:
                pass
        if city[i] is None:
            try:
                city[i]=city1(ip[i])
            except:
                pass
        elif city[i]=='null':
            try:
                city[i]=city1(ip[i])
            except:
                pass
        if state[i] is None:

            try:
                state[i]=state1(ip[i])
            except:
                pass
        elif state[i] =='NO state info':

            try:
                state[i]=state1(ip[i])
            except:
                pass    
        if country[i] is None:
            try:
                country[i]=pn_country(phone_number[i])
            except:
                pass
        if country[i] is None:
            country[i]=''
        if state[i] is None:
            state[i]=''

        if  last_prac_date[i] != 'NO PRACTICE' :

            last_prac_date[i]=last_prac_date[i].strftime('%d %b %Y')
        else:

            last_prac_date[i]="NO PRACTICE"

        if  last_login_date[i] != 'NO LOGIN' :

            last_login_date[i]=last_login_date[i].strftime('%d %b %Y')
        else:

            last_login_date[i]="NO LOGIN"

        if sign_up_date[i] is not None:
            sign_up_date[i]=sign_up_date[i].strftime('%d %b %Y')
    state12 =  [each_string.lower() for each_string in state]
    cv={'pnn':Parents_Name,'pe':Parents_Email,'co':country,'pn':phone_number,'sn':School_Name,'ct':city,
                               'st':state12,'sp':sign_up_date,
                               'll':last_login_date,'lp':last_prac_date,'pc':practice_count}
    dftry = pd.DataFrame.from_dict(cv)
    
    dfrus=dftry[dftry['co']=='Mexico']
    dfrus = dfrus.drop("co", axis=1)

    temp={"data":dfrus.values.tolist()}
    return json.dumps(temp)



@app.route('/parentsmapcanada')

def parentsmapcanada():
    statesshort = {'alaska': 'ak',
     'alabama': 'al',
     'arkansas': 'ar',
     'american samoa': 'as',
     'arizona': 'az',
     'california': 'ca',
     'colorado': 'co',
     'connecticut': 'ct',
     'district of columbia': 'dc',
     'delaware': 'de',
     'florida': 'fl',
     'georgia': 'ga',
     'guam': 'gu',
     'hawaii': 'hi',
     'iowa': 'ia',
     'idaho': 'id',
     'illinois': 'il',
     'indiana': 'in',
     'kansas': 'ks',
     'kentucky': 'ky',
     'louisiana': 'la',
     'massachusetts': 'ma',
     'maryland': 'md',
     'maine': 'me',
     'michigan': 'mi',
     'minnesota': 'mn',
     'missouri': 'mo',
     'northern mariana islands': 'mp',
     'mississippi': 'ms',
     'montana': 'mt',
     'national': 'na',
     'north carolina': 'nc',
     'north dakota': 'nd',
     'nebraska': 'ne',
     'new hampshire': 'nh',
     'new jersey': 'nj',
     'new mexico': 'nm',
     'nevada': 'nv',
     'new york': 'ny',
     'ohio': 'oh',
     'oklahoma': 'ok',
     'oregon': 'or',
     'pennsylvania': 'pa',
     'puerto rico': 'pr',
     'rhode island': 'ri',
     'south carolina': 'sc',
     'south dakota': 'sd',
     'tennessee': 'tn',
     'texas': 'tx',
     'utah': 'ut',
     'virginia': 'va',
     'virgin islands': 'vi',
     'vermont': 'vt',
     'washington': 'wa',
     'wisconsin': 'wi',
     'west virginia': 'wv',
     'wyoming': 'wy'}

    reader = geolite2.reader()

    db = mysql.connector.connect(
        host="52.35.73.200",
        user="ieuser",
        passwd="mijyBg96wtdDSAB5",
        database="compass")



    query="""select sm.id,sm.name,um.USER_ID as Parents_Id,um.USER_NAME as Parents_Name,up.ip_address,um.contact_number,
    sm.city,sm.state,sm.country,um.EMAIL_ID as Parents_Email,um.user_type,
    count(atd.USER_ID) as Practice_Count,max(date(atd.modified_date)) as Last_Practice_Date,date(um.created_date) Sign_Up_Date,
    max(date(ll.LAST_LOGGED_IN)) as Last_Login_Date,
    round((sum(atd.CURSOR_END)-sum(atd.CURSOR_START))/60) as mindful_minutes
    from user_master as um left join user_profile as up
    on um.user_id=up.user_id
    left join audio_track_detail as atd on atd.USER_ID=um.USER_ID
    left join school_master as sm on sm.id=up.SCHOOL_ID
    left join login_logs as ll on ll.USER_ID=um.USER_ID
    where um.ROLE_ID=3 and date(um.created_date)>'2020-03-17'  AND um.IS_DISABLED !='Y' and um.INCOMPLETE_SIGNUP !='Y' and um.email_id not like '%test%' and 
    um.email_id not like '%1gen%' and um.user_name not like '%test%' and um.user_name not like '%1gen%' and um.email_id <>''
    group by um.user_id;"""


    df=pd.read_sql(query, con=db)
    df=df.replace("UNITED STATES","United States")
    df=df.replace("US","United States")
    df=df.replace("us","United States")
    df=df.replace("USA","United States")
    df=df.replace("Usa","United States")
    df=df.replace("U.S.A","United States")
    #     print(df.head())
    dfus=df[df['country']=='United States']
#     df['state'] =df.state.fillna("NO state info")
#     df['state'] = df['state'].apply(lambda x: x.lower())
#     df['state_short'] = df['state'].map(statesshort)
    #     print(df.head())

    df.mindful_minutes=df.mindful_minutes.fillna(0)
    df.mindful_minutes=df.mindful_minutes.astype('int64')
    df['Last_Practice_Date']=pd.to_datetime(df['Last_Practice_Date'])
    df['Last_Practice_Date'].fillna("NO PRACTICE", inplace=True)
    df['Last_Login_Date']=pd.to_datetime(df['Last_Login_Date'])
    df['Last_Login_Date'].fillna("NO LOGIN", inplace=True)
    df['name'].fillna("NO SCHOOL INFO", inplace=True)
    df['Sign_Up_Date']=pd.to_datetime(df['Sign_Up_Date'])
    def country1(i):
        location = reader.get(i)
        c=(location['country']['names']['en'])
        return c
    def state1(i):
        location = reader.get(i)
        s=(location['subdivisions'][0]['names']['en'])
        return s
    
    def city1(i):
        location = reader.get(i)
        city=location['city']['names']['en']
        return city
    
    def pn_country(i):
        import phonenumbers
        import pycountry
        from phonenumbers.phonenumberutil import (
        region_code_for_country_code,
        region_code_for_number,)
        pn = phonenumbers.parse('+'+i)   
        country = pycountry.countries.get(alpha_2=region_code_for_number(pn))
        con=country.name
        return con

    ip=df['ip_address'].tolist()
    phone_number=df['contact_number'].tolist()
    Parents_Name=df['Parents_Name'].tolist()
    Parents_Email=df.Parents_Email.tolist()
    School_Name=df['name'].tolist()
    state=df['state'].tolist()
    country=df['country'].tolist()
    city=df['city'].tolist()
    sign_up_date=df['Sign_Up_Date'].tolist()
    last_prac_date=df['Last_Practice_Date'].tolist()
    last_login_date=df['Last_Login_Date'].tolist()
    practice_count=df['Practice_Count'].tolist()
    mindful_minutes=df['mindful_minutes'].tolist()

    for i in range(len(ip)):

        if country[i] is None:
            try:
                country[i]=country1(ip[i])
            except:
                pass
        elif country[i]=='null':
            try:
                country[i]=country1(ip[i])
            except:
                pass
        if city[i] is None:
            try:
                city[i]=city1(ip[i])
            except:
                pass
        elif city[i]=='null':
            try:
                city[i]=city1(ip[i])
            except:
                pass
        if state[i] is None:

            try:
                state[i]=state1(ip[i])
            except:
                pass
        elif state[i] =='NO state info':

            try:
                state[i]=state1(ip[i])
            except:
                pass    
        if country[i] is None:
            try:
                country[i]=pn_country(phone_number[i])
            except:
                pass
        if country[i] is None:
            country[i]=''
        if state[i] is None:
            state[i]=''

        if  last_prac_date[i] != 'NO PRACTICE' :

            last_prac_date[i]=last_prac_date[i].strftime('%d %b %Y')
        else:

            last_prac_date[i]="NO PRACTICE"

        if  last_login_date[i] != 'NO LOGIN' :

            last_login_date[i]=last_login_date[i].strftime('%d %b %Y')
        else:

            last_login_date[i]="NO LOGIN"

        if sign_up_date[i] is not None:
            sign_up_date[i]=sign_up_date[i].strftime('%d %b %Y')
    state12 =  [each_string.lower() for each_string in state]
    cv={'pnn':Parents_Name,'pe':Parents_Email,'co':country,'pn':phone_number,'sn':School_Name,'ct':city,
                               'st':state12,'sp':sign_up_date,
                               'll':last_login_date,'lp':last_prac_date,'pc':practice_count}
    dftry = pd.DataFrame.from_dict(cv)
    dfrus=dftry[dftry['co']=='Canada']
    dfrus = dfrus.drop("co", axis=1)

    temp={"data":dfrus.values.tolist()}

    return json.dumps(temp)

@app.route('/schoolgraph/<sch>')
def schgraph_table(sch):

    
    reader = geolite2.reader()

    db = mysql.connector.connect(
        host="52.35.73.200",
        user="ieuser",
        passwd="mijyBg96wtdDSAB5",
        database="compass")



    query="""select sm.id,sm.name,sm.address,um.USER_ID as Parents_Id,um.USER_NAME as Parents_Name,up.ip_address,um.contact_number,
    sm.city,sm.state,sm.country,um.EMAIL_ID as Parents_Email,um.user_type,
    count(atd.USER_ID) as Practice_Count,max(date(atd.modified_date)) as Last_Practice_Date,date(um.created_date) Sign_Up_Date,
    max(date(ll.LAST_LOGGED_IN)) as Last_Login_Date,
    round((sum(atd.CURSOR_END)-sum(atd.CURSOR_START))/60) as mindful_minutes
    from user_master as um left join user_profile as up
    on um.user_id=up.user_id
    left join audio_track_detail as atd on atd.USER_ID=um.USER_ID
    left join school_master as sm on sm.id=up.SCHOOL_ID
    left join login_logs as ll on ll.USER_ID=um.USER_ID
    where um.ROLE_ID=3 and date(um.created_date)>'2020-03-17'  AND um.IS_DISABLED !='Y' and um.INCOMPLETE_SIGNUP !='Y' and um.email_id not like '%test%' and sm.name like '%"""+sch+"""%' and 
    um.email_id not like '%1gen%' and um.user_name not like '%test%' and um.user_name not like '%1gen%' and um.email_id <>''
    group by um.user_id;"""


    df=pd.read_sql(query, con=db)
  
    df.mindful_minutes=df.mindful_minutes.fillna(0)
    df.mindful_minutes=df.mindful_minutes.astype('int64')
    df['Last_Practice_Date']=pd.to_datetime(df['Last_Practice_Date'])
    df['Last_Practice_Date'].fillna("NO PRACTICE", inplace=True)
    df['id'].fillna("no id", inplace=True)
    df['name'].fillna("NO NAME", inplace=True)
    df['address'].fillna("NO address", inplace=True)
    df['Last_Login_Date']=pd.to_datetime(df['Last_Login_Date'])
    df['Last_Login_Date'].fillna("NO LOGIN", inplace=True)
    df['Sign_Up_Date']=pd.to_datetime(df['Sign_Up_Date'])
    
    def country1(i):
        location = reader.get(i)
        c=(location['country']['names']['en'])
        return c
    
    def state1(i):
        location = reader.get(i)
        s=(location['subdivisions'][0]['names']['en'])
        return s
    
    def city1(i):
        location = reader.get(i)
        city=location['city']['names']['en']
        return city
    
    def pn_country(i):
        import phonenumbers
        import pycountry
        from phonenumbers.phonenumberutil import (
        region_code_for_country_code,
        region_code_for_number,)
        pn = phonenumbers.parse('+'+i)   
        country = pycountry.countries.get(alpha_2=region_code_for_number(pn))
        con=country.name
        return con

    ip=df['ip_address'].tolist()
    phone_number=df['contact_number'].tolist()
    schid=df['id'].tolist()
    schname=df['name'].tolist()
    schadd=df['address'].tolist()
    phone_number=df['contact_number'].tolist()
    city=df['city'].tolist()
    Parents_Name=df['Parents_Name'].tolist()
    Parents_Email=df.Parents_Email.tolist()
    state=df['state'].tolist()
    country=df['country'].tolist()
    sign_up_date=df['Sign_Up_Date'].tolist()
    last_prac_date=df['Last_Practice_Date'].tolist()
    last_login_date=df['Last_Login_Date'].tolist()
    practice_count=df['Practice_Count'].tolist()
    mindful_minutes=df['mindful_minutes'].tolist()

    for i in range(len(ip)):
        
        if city[i] is None:
            try:
                city[i]=city1(ip[i])
            except:
                pass

        if country[i] is None:
            try:
                country[i]=country1(ip[i])
            except:
                pass
        if state[i] is None:

            try:
                state[i]=state1(ip[i])
            except:
                pass
        if country[i] is None:
            try:
                country[i]=pn_country(phone_number[i])
            except:
                pass
        if country[i] is None:
            country[i]=''
        if state[i] is None:
            state[i]=''

        if  last_prac_date[i] != 'NO PRACTICE' :

            last_prac_date[i]=last_prac_date[i].strftime('%d %b %Y')
        else:

            last_prac_date[i]="NO PRACTICE"

        if  last_login_date[i] != 'NO LOGIN' :

            last_login_date[i]=last_login_date[i].strftime('%d %b %Y')
        else:

            last_login_date[i]="NO LOGIN"

        if sign_up_date[i] is not None:
            sign_up_date[i]=sign_up_date[i].strftime('%d %b %Y')

    data=[]    
    for i,k,l,m,o,p,q,r,s,z in zip(Parents_Name,Parents_Email,phone_number,schname,
                               city,state,sign_up_date,
                               last_login_date,last_prac_date,practice_count):

        data.append([i,k,l,m,o,p,q,r,s,z])
        
        
    return json.dumps({"data":data})

@app.route('/schoolgraph')
def schgraph():

    reader = geolite2.reader()

    db = mysql.connector.connect(
        host="52.35.73.200",
        user="ieuser",
        passwd="mijyBg96wtdDSAB5",
        database="compass")



    query="""select sm.id,sm.name,um.USER_ID as Parents_Id,um.USER_NAME as Parents_Name,up.ip_address,um.contact_number,
    sm.city,sm.state,sm.country,um.EMAIL_ID as Parents_Email,um.user_type,
    count(atd.USER_ID) as Practice_Count,max(date(atd.modified_date)) as Last_Practice_Date,date(um.created_date) Sign_Up_Date,
    max(date(ll.LAST_LOGGED_IN)) as Last_Login_Date,
    round((sum(atd.CURSOR_END)-sum(atd.CURSOR_START))/60) as mindful_minutes
    from user_master as um left join user_profile as up
    on um.user_id=up.user_id
    left join audio_track_detail as atd on atd.USER_ID=um.USER_ID
    left join school_master as sm on sm.id=up.SCHOOL_ID
    left join login_logs as ll on ll.USER_ID=um.USER_ID
    where um.ROLE_ID=3 and date(um.created_date)>'2020-03-17'  AND um.IS_DISABLED !='Y' and um.INCOMPLETE_SIGNUP !='Y' and um.email_id not like '%test%' and 
    um.email_id not like '%1gen%' and um.user_name not like '%test%' and um.user_name not like '%1gen%' and um.email_id <>''
    group by um.user_id;"""


    df=pd.read_sql(query, con=db)
    df.name=df.name.fillna("no school info")
    gp=df['name'].value_counts()
    gp=gp.to_frame()
    
    gp=gp[gp.values >4]
    
    gp=gp[gp.index !='no school info']
#     print(gp)
    parcount=list(gp.name)
    schname=list(gp.index)
        
        
    return json.dumps({"parcount":parcount[0:25],"schname":schname[0:25]})




@app.route('/paroveralltest')
def parents_tabletest():

    
    reader = geolite2.reader()

    db = mysql.connector.connect(
        host="52.35.73.200",
        user="ieuser",
        passwd="mijyBg96wtdDSAB5",
        database="compass")



    query="""select sm.id,sm.name,sm.address,um.USER_ID as Parents_Id,um.USER_NAME as Parents_Name,up.ip_address,um.contact_number,
    sm.city,sm.state,sm.country,um.EMAIL_ID as Parents_Email,um.user_type,
    count(atd.USER_ID) as Practice_Count,max(date(atd.modified_date)) as Last_Practice_Date,um.created_date as Sign_Up_Date,
    max(date(ll.LAST_LOGGED_IN)) as Last_Login_Date,
    round((sum(atd.CURSOR_END)-sum(atd.CURSOR_START))/60) as mindful_minutes
    from user_master as um left join user_profile as up
    on um.user_id=up.user_id
    left join audio_track_detail as atd on atd.USER_ID=um.USER_ID
    left join school_master as sm on sm.id=up.SCHOOL_ID
    left join login_logs as ll on ll.USER_ID=um.USER_ID
    where um.ROLE_ID=3 and date(um.created_date)>'2020-03-17'  AND um.IS_DISABLED !='Y' and um.INCOMPLETE_SIGNUP !='Y' and um.email_id not like '%test%' and 
    um.email_id not like '%1gen%' and um.user_name not like '%test%' and um.user_name not like '%1gen%' and um.email_id <>''
    group by um.user_id;"""


    df=pd.read_sql(query, con=db)
  
    df.mindful_minutes=df.mindful_minutes.fillna(0)
    df.mindful_minutes=df.mindful_minutes.astype('int64')
    df['Last_Practice_Date']=pd.to_datetime(df['Last_Practice_Date'])
    df['Last_Practice_Date'].fillna("NO PRACTICE", inplace=True)
    df['id'].fillna("no id", inplace=True)
    df['name'].fillna("NO NAME", inplace=True)
    df['address'].fillna("NO address", inplace=True)
    df['Last_Login_Date']=pd.to_datetime(df['Last_Login_Date'])
    df['Last_Login_Date'].fillna("NO LOGIN", inplace=True)
    df['Sign_Up_Date']=pd.to_datetime(df['Sign_Up_Date'])
    
    def country1(i):
        location = reader.get(i)
        c=(location['country']['names']['en'])
        return c
    
    def state1(i):
        location = reader.get(i)
        s=(location['subdivisions'][0]['names']['en'])
        return s
    
    def city1(i):
        location = reader.get(i)
        city=location['city']['names']['en']
        return city
    
    def pn_country(i):
        import phonenumbers
        import pycountry
        from phonenumbers.phonenumberutil import (
        region_code_for_country_code,
        region_code_for_number,)
        pn = phonenumbers.parse('+'+i)   
        country = pycountry.countries.get(alpha_2=region_code_for_number(pn))
        con=country.name
        return con

    ip=df['ip_address'].tolist()
    phone_number=df['contact_number'].tolist()
    schid=df['id'].tolist()
    schname=df['name'].tolist()
    schadd=df['address'].tolist()
    phone_number=df['contact_number'].tolist()
    city=df['city'].tolist()
    Parents_Name=df['Parents_Name'].tolist()
    Parents_Email=df.Parents_Email.tolist()
    state=df['state'].tolist()
    country=df['country'].tolist()
    sign_up_date=df['Sign_Up_Date'].tolist()
    sign_up_date1=df['Sign_Up_Date'].tolist()
    last_prac_date=df['Last_Practice_Date'].tolist()
    last_login_date=df['Last_Login_Date'].tolist()
    practice_count=df['Practice_Count'].tolist()
    mindful_minutes=df['mindful_minutes'].tolist()

    for i in range(len(ip)):
        
        if city[i] is None:
            try:
                city[i]=city1(ip[i])
            except:
                pass

        if country[i] is None:
            try:
                country[i]=country1(ip[i])
            except:
                pass
        if state[i] is None:

            try:
                state[i]=state1(ip[i])
            except:
                pass
        if country[i] is None:
            try:
                country[i]=pn_country(phone_number[i])
            except:
                pass
        if country[i] is None:
            country[i]=''
        if state[i] is None:
            state[i]=''

        if  last_prac_date[i] != 'NO PRACTICE' :

            last_prac_date[i]=last_prac_date[i].strftime('%d %b %Y')
        else:

            last_prac_date[i]="NO PRACTICE"

        if  last_login_date[i] != 'NO LOGIN' :

            last_login_date[i]=last_login_date[i].strftime('%d %b %Y')
        else:

            last_login_date[i]="NO LOGIN"

        if sign_up_date[i] is not None:
            sign_up_date[i]=sign_up_date[i].strftime('%d %b %Y')

    data=[]    
    for x,g,a,b,c,i,k,l,m,o,p,q,r,ss,s,z in zip(schid,schname,schadd,ip,Parents_Name,Parents_Email,phone_number,df['user_type'].tolist(),
                               state,city,country,sign_up_date,sign_up_date1,
                               last_login_date,last_prac_date,practice_count):

        data.append([x,g,a,b,c,i,k,l,m,o,p,q,r,ss,s,z])
        
        
    return json.dumps({"data":data})

@app.route('/parentsstateinfo/<state7>')


def parentsstateinfo(state7):
    statesshort = {'alaska': 'ak',
     'alabama': 'al',
     'arkansas': 'ar',
     'american samoa': 'as',
     'arizona': 'az',
     'california': 'ca',
     'colorado': 'co',
     'connecticut': 'ct',
     'district of columbia': 'dc',
     'delaware': 'de',
     'florida': 'fl',
     'georgia': 'ga',
     'guam': 'gu',
     'hawaii': 'hi',
     'iowa': 'ia',
     'idaho': 'id',
     'illinois': 'il',
     'indiana': 'in',
     'kansas': 'ks',
     'kentucky': 'ky',
     'louisiana': 'la',
     'massachusetts': 'ma',
     'maryland': 'md',
     'maine': 'me',
     'michigan': 'mi',
     'minnesota': 'mn',
     'missouri': 'mo',
     'northern mariana islands': 'mp',
     'mississippi': 'ms',
     'montana': 'mt',
     'national': 'na',
     'north carolina': 'nc',
     'north dakota': 'nd',
     'nebraska': 'ne',
     'new hampshire': 'nh',
     'new jersey': 'nj',
     'new mexico': 'nm',
     'nevada': 'nv',
     'new york': 'ny',
     'ohio': 'oh',
     'oklahoma': 'ok',
     'oregon': 'or',
     'pennsylvania': 'pa',
     'puerto rico': 'pr',
     'rhode island': 'ri',
     'south carolina': 'sc',
     'south dakota': 'sd',
     'tennessee': 'tn',
     'texas': 'tx',
     'utah': 'ut',
     'virginia': 'va',
     'virgin islands': 'vi',
     'vermont': 'vt',
     'washington': 'wa',
     'wisconsin': 'wi',
     'west virginia': 'wv',
     'wyoming': 'wy'}

    reader = geolite2.reader()

    db = mysql.connector.connect(
        host="52.35.73.200",
        user="ieuser",
        passwd="mijyBg96wtdDSAB5",
        database="compass")



    query="""select sm.id,sm.name,um.USER_ID as Parents_Id,um.USER_NAME as Parents_Name,up.ip_address,um.contact_number,
    sm.city,sm.state,sm.country,um.EMAIL_ID as Parents_Email,um.user_type,
    count(atd.USER_ID) as Practice_Count,max(date(atd.modified_date)) as Last_Practice_Date,date(um.created_date) Sign_Up_Date,
    max(date(ll.LAST_LOGGED_IN)) as Last_Login_Date,
    round((sum(atd.CURSOR_END)-sum(atd.CURSOR_START))/60) as mindful_minutes
    from user_master as um left join user_profile as up
    on um.user_id=up.user_id
    left join audio_track_detail as atd on atd.USER_ID=um.USER_ID
    left join school_master as sm on sm.id=up.SCHOOL_ID
    left join login_logs as ll on ll.USER_ID=um.USER_ID
    where um.ROLE_ID=3 and date(um.created_date)>'2020-03-17'  AND um.IS_DISABLED !='Y' and um.INCOMPLETE_SIGNUP !='Y' and um.email_id not like '%test%' and 
    um.email_id not like '%1gen%' and um.user_name not like '%test%' and um.user_name not like '%1gen%' and um.email_id <>''
    group by um.user_id;"""


    df=pd.read_sql(query, con=db)
#     print(df.head())
    df=df.replace("UNITED STATES","United States")
    df=df.replace("US","United States")
    df=df.replace("us","United States")
    df=df.replace("USA","United States")
    df=df.replace("Usa","United States")
    df=df.replace("U.S.A","United States")
    dfus=df[df['country']=='United States']
#     df['state'] =df.state.fillna("NO state info")
#     df['state'] = df['state'].apply(lambda x: x.lower())
#     df['state_short'] = df['state'].map(statesshort)
#     print(df.head())
    
    df.mindful_minutes=df.mindful_minutes.fillna(0)
    df.mindful_minutes=df.mindful_minutes.astype('int64')
    df['Last_Practice_Date']=pd.to_datetime(df['Last_Practice_Date'])
    df['Last_Practice_Date'].fillna("NO PRACTICE", inplace=True)
    df['Last_Login_Date']=pd.to_datetime(df['Last_Login_Date'])
    df['Last_Login_Date'].fillna("NO LOGIN", inplace=True)
    df['name'].fillna("NO SCHOOL INFO", inplace=True)
    df['Sign_Up_Date']=pd.to_datetime(df['Sign_Up_Date'])
    def country1(i):
        location = reader.get(i)
        c=(location['country']['names']['en'])
        return c
    def state1(i):
        location = reader.get(i)
        s=(location['subdivisions'][0]['names']['en'])
        return s
    
    def city1(i):
        location = reader.get(i)
        city=location['city']['names']['en']
        return city
    
    def pn_country(i):
        import phonenumbers
        import pycountry
        from phonenumbers.phonenumberutil import (
        region_code_for_country_code,
        region_code_for_number,)
        pn = phonenumbers.parse('+'+i)   
        country = pycountry.countries.get(alpha_2=region_code_for_number(pn))
        con=country.name
        return con
    
    ip=df['ip_address'].tolist()
    phone_number=df['contact_number'].tolist()
    Parents_Name=df['Parents_Name'].tolist()
    School_Name=df['name'].tolist()
    Parents_Email=df.Parents_Email.tolist()
    state=df['state'].tolist()
    city=df['city'].tolist()
    country=df['country'].tolist()
    
    sign_up_date=df['Sign_Up_Date'].tolist()
    last_prac_date=df['Last_Practice_Date'].tolist()
    last_login_date=df['Last_Login_Date'].tolist()
    practice_count=df['Practice_Count'].tolist()
    mindful_minutes=df['mindful_minutes'].tolist()
    
    for i in range(len(ip)):

        if country[i] is None:
            try:
                country[i]=country1(ip[i])
            except:
                pass
        elif country[i]=='null':
            try:
                country[i]=country1(ip[i])
            except:
                pass
        if city[i] is None:
            try:
                city[i]=city1(ip[i])
            except:
                pass
        elif city[i]=='null':
            try:
                city[i]=city1(ip[i])
            except:
                pass
        if state[i] is None:

            try:
                state[i]=state1(ip[i])
            except:
                pass
        if country[i] is None:
            try:
                country[i]=pn_country(phone_number[i])
            except:
                pass
        if country[i] is None:
            country[i]=''
        if state[i] is None:
            state[i]=''

        if  last_prac_date[i] != 'NO PRACTICE' :

            last_prac_date[i]=last_prac_date[i].strftime('%d %b %Y')
        else:

            last_prac_date[i]="NO PRACTICE"

        if  last_login_date[i] != 'NO LOGIN' :

            last_login_date[i]=last_login_date[i].strftime('%d %b %Y')
        else:

            last_login_date[i]="NO LOGIN"

        if sign_up_date[i] is not None:
            sign_up_date[i]=sign_up_date[i].strftime('%d %b %Y')
#     print(state)

    state12 =  [each_string.lower() for each_string in state]
    cv={'pnn':Parents_Name,'pe':Parents_Email,'pn':phone_number,'sn':School_Name,'ct':city,
                               'st':state12,'sp':sign_up_date,
                               'll':last_login_date,'lp':last_prac_date,'pc':practice_count}
    dftry = pd.DataFrame.from_dict(cv)
    

    dfother=dftry[dftry['st']==state7.lower()]

    
   

    temp={"data":dfother.values.tolist()}
    return json.dumps(temp)


@app.route('/parentsmapother')


def parentsmapother():
    reader = geolite2.reader()

    db = mysql.connector.connect(
        host="52.35.73.200",
        user="ieuser",
        passwd="mijyBg96wtdDSAB5",
        database="compass")



    query="""select sm.id,sm.name,um.USER_ID as Parents_Id,um.USER_NAME as Parents_Name,up.ip_address,um.contact_number,
    sm.city,sm.state,sm.country,um.EMAIL_ID as Parents_Email,um.user_type,
    count(atd.USER_ID) as Practice_Count,max(date(atd.modified_date)) as Last_Practice_Date,date(um.created_date) Sign_Up_Date,
    max(date(ll.LAST_LOGGED_IN)) as Last_Login_Date,
    round((sum(atd.CURSOR_END)-sum(atd.CURSOR_START))/60) as mindful_minutes
    from user_master as um left join user_profile as up
    on um.user_id=up.user_id
    left join audio_track_detail as atd on atd.USER_ID=um.USER_ID
    left join school_master as sm on sm.id=up.SCHOOL_ID
    left join login_logs as ll on ll.USER_ID=um.USER_ID
    where um.ROLE_ID=3 and date(um.created_date)>'2020-03-17'  AND um.IS_DISABLED !='Y' and um.INCOMPLETE_SIGNUP !='Y' and um.email_id not like '%test%' and 
    um.email_id not like '%1gen%' and um.user_name not like '%test%' and um.user_name not like '%1gen%' and um.email_id <>''
    group by um.user_id;"""

    df=pd.read_sql(query, con=db)
    df=df.replace("UNITED STATES","United States")
    df=df.replace("US","United States")
    df=df.replace("us","United States")
    df=df.replace("USA","United States")
    df=df.replace("Usa","United States")
    df=df.replace("U.S.A","United States")
    #     print(df.head())
    dfus=df[df['country']=='United States']
    
    df.mindful_minutes=df.mindful_minutes.fillna(0)
    df.mindful_minutes=df.mindful_minutes.astype('int64')
    df['Last_Practice_Date']=pd.to_datetime(df['Last_Practice_Date'])
    df['Last_Practice_Date'].fillna("NO PRACTICE", inplace=True)
    df['Last_Login_Date']=pd.to_datetime(df['Last_Login_Date'])
    df['Last_Login_Date'].fillna("NO LOGIN", inplace=True)
    df['name'].fillna("NO SCHOOL INFO", inplace=True)
    df['Sign_Up_Date']=pd.to_datetime(df['Sign_Up_Date'])
    def country1(i):
        location = reader.get(i)
        c=(location['country']['names']['en'])
        return c
    def state1(i):
        location = reader.get(i)
        s=(location['subdivisions'][0]['names']['en'])
        return s
    
    def city1(i):
        location = reader.get(i)
        city=location['city']['names']['en']
        return city
    
    def pn_country(i):
        import phonenumbers
        import pycountry
        from phonenumbers.phonenumberutil import (
        region_code_for_country_code,
        region_code_for_number,)
        pn = phonenumbers.parse('+'+i)   
        country = pycountry.countries.get(alpha_2=region_code_for_number(pn))
        con=country.name
        return con

    ip=df['ip_address'].tolist()
    phone_number=df['contact_number'].tolist()
    Parents_Name=df['Parents_Name'].tolist()
    Parents_Email=df.Parents_Email.tolist()
    School_Name=df['name'].tolist()
    state=df['state'].tolist()
    country=df['country'].tolist()
    city=df['city'].tolist()
    sign_up_date=df['Sign_Up_Date'].tolist()
    last_prac_date=df['Last_Practice_Date'].tolist()
    last_login_date=df['Last_Login_Date'].tolist()
    practice_count=df['Practice_Count'].tolist()
    mindful_minutes=df['mindful_minutes'].tolist()

    for i in range(len(ip)):

        if country[i] is None:
            try:
                country[i]=country1(ip[i])
            except:
                pass
        elif country[i]=='null':
            try:
                country[i]=country1(ip[i])
            except:
                pass
        if city[i] is None:
            try:
                city[i]=city1(ip[i])
            except:
                pass
        elif city[i]=='null':
            try:
                city[i]=city1(ip[i])
            except:
                pass
        if state[i] is None:

            try:
                state[i]=state1(ip[i])
            except:
                pass
        elif state[i] =='NO state info':

            try:
                state[i]=state1(ip[i])
            except:
                pass    
        if country[i] is None:
            try:
                country[i]=pn_country(phone_number[i])
            except:
                pass
        if country[i] is None:
            country[i]=''
        if state[i] is None:
            state[i]=''

        if  last_prac_date[i] != 'NO PRACTICE' :

            last_prac_date[i]=last_prac_date[i].strftime('%d %b %Y')
        else:

            last_prac_date[i]="NO PRACTICE"

        if  last_login_date[i] != 'NO LOGIN' :

            last_login_date[i]=last_login_date[i].strftime('%d %b %Y')
        else:

            last_login_date[i]="NO LOGIN"

        if sign_up_date[i] is not None:
            sign_up_date[i]=sign_up_date[i].strftime('%d %b %Y')
    state12 =  [each_string.lower() for each_string in state]
    cv={'pnn':Parents_Name,'pe':Parents_Email,'co':country,'pn':phone_number,'sn':School_Name,'ct':city,
                               'st':state12,'sp':sign_up_date,
                               'll':last_login_date,'lp':last_prac_date,'pc':practice_count}
    dftry = pd.DataFrame.from_dict(cv)
    dfother=dftry[~dftry['co'].isin(['United States','Canada','Mexico','India'])]

    
    dfother = dfother.drop("co", axis=1)

    temp={"data":dfother.values.tolist()}
    return json.dumps(temp)


@app.route('/parentsmapukraine')

def parentsmapukraine():
    statesshort = {'alaska': 'ak',
     'alabama': 'al',
     'arkansas': 'ar',
     'american samoa': 'as',
     'arizona': 'az',
     'california': 'ca',
     'colorado': 'co',
     'connecticut': 'ct',
     'district of columbia': 'dc',
     'delaware': 'de',
     'florida': 'fl',
     'georgia': 'ga',
     'guam': 'gu',
     'hawaii': 'hi',
     'iowa': 'ia',
     'idaho': 'id',
     'illinois': 'il',
     'indiana': 'in',
     'kansas': 'ks',
     'kentucky': 'ky',
     'louisiana': 'la',
     'massachusetts': 'ma',
     'maryland': 'md',
     'maine': 'me',
     'michigan': 'mi',
     'minnesota': 'mn',
     'missouri': 'mo',
     'northern mariana islands': 'mp',
     'mississippi': 'ms',
     'montana': 'mt',
     'national': 'na',
     'north carolina': 'nc',
     'north dakota': 'nd',
     'nebraska': 'ne',
     'new hampshire': 'nh',
     'new jersey': 'nj',
     'new mexico': 'nm',
     'nevada': 'nv',
     'new york': 'ny',
     'ohio': 'oh',
     'oklahoma': 'ok',
     'oregon': 'or',
     'pennsylvania': 'pa',
     'puerto rico': 'pr',
     'rhode island': 'ri',
     'south carolina': 'sc',
     'south dakota': 'sd',
     'tennessee': 'tn',
     'texas': 'tx',
     'utah': 'ut',
     'virginia': 'va',
     'virgin islands': 'vi',
     'vermont': 'vt',
     'washington': 'wa',
     'wisconsin': 'wi',
     'west virginia': 'wv',
     'wyoming': 'wy'}

    reader = geolite2.reader()

    db = mysql.connector.connect(
        host="52.35.73.200",
        user="ieuser",
        passwd="mijyBg96wtdDSAB5",
        database="compass")



    query="""select sm.id,sm.name,um.USER_ID as Parents_Id,um.USER_NAME as Parents_Name,up.ip_address,um.contact_number,
    sm.city,sm.state,sm.country,um.EMAIL_ID as Parents_Email,um.user_type,
    count(atd.USER_ID) as Practice_Count,max(date(atd.modified_date)) as Last_Practice_Date,date(um.created_date) Sign_Up_Date,
    max(date(ll.LAST_LOGGED_IN)) as Last_Login_Date,
    round((sum(atd.CURSOR_END)-sum(atd.CURSOR_START))/60) as mindful_minutes
    from user_master as um left join user_profile as up
    on um.user_id=up.user_id
    left join audio_track_detail as atd on atd.USER_ID=um.USER_ID
    left join school_master as sm on sm.id=up.SCHOOL_ID
    left join login_logs as ll on ll.USER_ID=um.USER_ID
    where um.ROLE_ID=3 and date(um.created_date)>'2020-03-17'  AND um.IS_DISABLED !='Y' and um.INCOMPLETE_SIGNUP !='Y' and um.email_id not like '%test%' and 
    um.email_id not like '%1gen%' and um.user_name not like '%test%' and um.user_name not like '%1gen%' and um.email_id <>''
    group by um.user_id;"""


    df=pd.read_sql(query, con=db)
    df=df.replace("UNITED STATES","United States")
    df=df.replace("US","United States")
    df=df.replace("us","United States")
    df=df.replace("USA","United States")
    df=df.replace("Usa","United States")
    df=df.replace("U.S.A","United States")
    #     print(df.head())
    dfus=df[df['country']=='United States']
    df.mindful_minutes=df.mindful_minutes.fillna(0)
    df.mindful_minutes=df.mindful_minutes.astype('int64')
    df['Last_Practice_Date']=pd.to_datetime(df['Last_Practice_Date'])
    df['Last_Practice_Date'].fillna("NO PRACTICE", inplace=True)
    df['Last_Login_Date']=pd.to_datetime(df['Last_Login_Date'])
    df['Last_Login_Date'].fillna("NO LOGIN", inplace=True)
    df['Sign_Up_Date']=pd.to_datetime(df['Sign_Up_Date'])
    def country1(i):
        location = reader.get(i)
        c=(location['country']['names']['en'])
        return c
    def state1(i):
        location = reader.get(i)
        s=(location['subdivisions'][0]['names']['en'])
        return s
    
    def city1(i):
        location = reader.get(i)
        city=location['city']['names']['en']
        return city
    
    def pn_country(i):
        import phonenumbers
        import pycountry
        from phonenumbers.phonenumberutil import (
        region_code_for_country_code,
        region_code_for_number,)
        pn = phonenumbers.parse('+'+i)   
        country = pycountry.countries.get(alpha_2=region_code_for_number(pn))
        con=country.name
        return con

    ip=df['ip_address'].tolist()
    phone_number=df['contact_number'].tolist()
    Parents_Name=df['Parents_Name'].tolist()
    Parents_Email=df.Parents_Email.tolist()
    School_Name=df['name'].tolist()
    state=df['state'].tolist()
    country=df['country'].tolist()
    city=df['city'].tolist()
    sign_up_date=df['Sign_Up_Date'].tolist()
    last_prac_date=df['Last_Practice_Date'].tolist()
    last_login_date=df['Last_Login_Date'].tolist()
    practice_count=df['Practice_Count'].tolist()
    mindful_minutes=df['mindful_minutes'].tolist()

    for i in range(len(ip)):

        if country[i] is None:
            try:
                country[i]=country1(ip[i])
            except:
                pass
        elif country[i]=='null':
            try:
                country[i]=country1(ip[i])
            except:
                pass
        if city[i] is None:
            try:
                city[i]=city1(ip[i])
            except:
                pass
        elif city[i]=='null':
            try:
                city[i]=city1(ip[i])
            except:
                pass
        if state[i] is None:

            try:
                state[i]=state1(ip[i])
            except:
                pass
        elif state[i] =='NO state info':

            try:
                state[i]=state1(ip[i])
            except:
                pass    
        if country[i] is None:
            try:
                country[i]=pn_country(phone_number[i])
            except:
                pass
        if country[i] is None:
            country[i]=''
        if state[i] is None:
            state[i]=''

        if  last_prac_date[i] != 'NO PRACTICE' :

            last_prac_date[i]=last_prac_date[i].strftime('%d %b %Y')
        else:

            last_prac_date[i]="NO PRACTICE"

        if  last_login_date[i] != 'NO LOGIN' :

            last_login_date[i]=last_login_date[i].strftime('%d %b %Y')
        else:

            last_login_date[i]="NO LOGIN"

        if sign_up_date[i] is not None:
            sign_up_date[i]=sign_up_date[i].strftime('%d %b %Y')
    state12 =  [each_string.lower() for each_string in state]
    cv={'pnn':Parents_Name,'pe':Parents_Email,'co':country,'pn':phone_number,'sn':School_Name,'ct':city,
                               'st':state12,'sp':sign_up_date,
                               'll':last_login_date,'lp':last_prac_date,'pc':practice_count}
    dftry = pd.DataFrame.from_dict(cv)    
    dfrus=dftry[dftry['co']=='Ukraine']
    

    temp={"data":dfrus.values.tolist()}
    return json.dumps(temp)

@app.route('/parentsmapindia')

def parentsmapindia():
    reader = geolite2.reader()

    db = mysql.connector.connect(
        host="52.35.73.200",
        user="ieuser",
        passwd="mijyBg96wtdDSAB5",
        database="compass")



    query="""select sm.id,sm.name,um.USER_ID as Parents_Id,um.USER_NAME as Parents_Name,up.ip_address,um.contact_number,
    sm.city,sm.state,sm.country,um.EMAIL_ID as Parents_Email,um.user_type,
    count(atd.USER_ID) as Practice_Count,max(date(atd.modified_date)) as Last_Practice_Date,date(um.created_date) Sign_Up_Date,
    max(date(ll.LAST_LOGGED_IN)) as Last_Login_Date,
    round((sum(atd.CURSOR_END)-sum(atd.CURSOR_START))/60) as mindful_minutes
    from user_master as um left join user_profile as up
    on um.user_id=up.user_id
    left join audio_track_detail as atd on atd.USER_ID=um.USER_ID
    left join school_master as sm on sm.id=up.SCHOOL_ID
    left join login_logs as ll on ll.USER_ID=um.USER_ID
    where um.ROLE_ID=3 and date(um.created_date)>'2020-03-17'  AND um.IS_DISABLED !='Y' and um.INCOMPLETE_SIGNUP !='Y' and um.email_id not like '%test%' and 
    um.email_id not like '%1gen%' and um.user_name not like '%test%' and um.user_name not like '%1gen%' and um.email_id <>''
    group by um.user_id;"""


    df=pd.read_sql(query, con=db)
    df=df.replace("UNITED STATES","United States")
    df=df.replace("US","United States")
    df=df.replace("us","United States")
    df=df.replace("USA","United States")
    df=df.replace("Usa","United States")
    df=df.replace("U.S.A","United States")
    #     print(df.head())
    dfus=df[df['country']=='United States']
    df.mindful_minutes=df.mindful_minutes.fillna(0)
    df.mindful_minutes=df.mindful_minutes.astype('int64')
    df['Last_Practice_Date']=pd.to_datetime(df['Last_Practice_Date'])
    df['Last_Practice_Date'].fillna("NO PRACTICE", inplace=True)
    df['Last_Login_Date']=pd.to_datetime(df['Last_Login_Date'])
    df['Last_Login_Date'].fillna("NO LOGIN", inplace=True)
    df['name'].fillna("NO SCHOOL INFO", inplace=True)
    df['Sign_Up_Date']=pd.to_datetime(df['Sign_Up_Date'])
    def country1(i):
        location = reader.get(i)
        c=(location['country']['names']['en'])
        return c
    def state1(i):
        location = reader.get(i)
        s=(location['subdivisions'][0]['names']['en'])
        return s
    
    def city1(i):
        location = reader.get(i)
        city=location['city']['names']['en']
        return city
    
    def pn_country(i):
        import phonenumbers
        import pycountry
        from phonenumbers.phonenumberutil import (
        region_code_for_country_code,
        region_code_for_number,)
        pn = phonenumbers.parse('+'+i)   
        country = pycountry.countries.get(alpha_2=region_code_for_number(pn))
        con=country.name
        return con

    ip=df['ip_address'].tolist()
    phone_number=df['contact_number'].tolist()
    Parents_Name=df['Parents_Name'].tolist()
    Parents_Email=df.Parents_Email.tolist()
    School_Name=df['name'].tolist()
    state=df['state'].tolist()
    country=df['country'].tolist()
    city=df['city'].tolist()
    sign_up_date=df['Sign_Up_Date'].tolist()
    last_prac_date=df['Last_Practice_Date'].tolist()
    last_login_date=df['Last_Login_Date'].tolist()
    practice_count=df['Practice_Count'].tolist()
    mindful_minutes=df['mindful_minutes'].tolist()

    for i in range(len(ip)):

        if country[i] is None:
            try:
                country[i]=country1(ip[i])
            except:
                pass
        elif country[i]=='null':
            try:
                country[i]=country1(ip[i])
            except:
                pass
        if city[i] is None:
            try:
                city[i]=city1(ip[i])
            except:
                pass
        elif city[i]=='null':
            try:
                city[i]=city1(ip[i])
            except:
                pass
        if state[i] is None:

            try:
                state[i]=state1(ip[i])
            except:
                pass
        elif state[i] =='NO state info':

            try:
                state[i]=state1(ip[i])
            except:
                pass    
        if country[i] is None:
            try:
                country[i]=pn_country(phone_number[i])
            except:
                pass
        if country[i] is None:
            country[i]=''
        if state[i] is None:
            state[i]=''

        if  last_prac_date[i] != 'NO PRACTICE' :

            last_prac_date[i]=last_prac_date[i].strftime('%d %b %Y')
        else:

            last_prac_date[i]="NO PRACTICE"

        if  last_login_date[i] != 'NO LOGIN' :

            last_login_date[i]=last_login_date[i].strftime('%d %b %Y')
        else:

            last_login_date[i]="NO LOGIN"

        if sign_up_date[i] is not None:
            sign_up_date[i]=sign_up_date[i].strftime('%d %b %Y')
    state12 =  [each_string.lower() for each_string in state]
    cv={'pnn':Parents_Name,'pe':Parents_Email,'co':country,'pn':phone_number,'sn':School_Name,'ct':city,
                               'st':state12,'sp':sign_up_date,
                               'll':last_login_date,'lp':last_prac_date,'pc':practice_count}
    dftry = pd.DataFrame.from_dict(cv)
    
    dfrus=dftry[dftry['co']=='India']
    dfrus = dfrus.drop("co", axis=1)

    temp={"data":dfrus.values.tolist()}
    return json.dumps(temp)

@app.route('/parentsmaprus')

def parentsmaprus():
    statesshort = {'alaska': 'ak',
     'alabama': 'al',
     'arkansas': 'ar',
     'american samoa': 'as',
     'arizona': 'az',
     'california': 'ca',
     'colorado': 'co',
     'connecticut': 'ct',
     'district of columbia': 'dc',
     'delaware': 'de',
     'florida': 'fl',
     'georgia': 'ga',
     'guam': 'gu',
     'hawaii': 'hi',
     'iowa': 'ia',
     'idaho': 'id',
     'illinois': 'il',
     'indiana': 'in',
     'kansas': 'ks',
     'kentucky': 'ky',
     'louisiana': 'la',
     'massachusetts': 'ma',
     'maryland': 'md',
     'maine': 'me',
     'michigan': 'mi',
     'minnesota': 'mn',
     'missouri': 'mo',
     'northern mariana islands': 'mp',
     'mississippi': 'ms',
     'montana': 'mt',
     'national': 'na',
     'north carolina': 'nc',
     'north dakota': 'nd',
     'nebraska': 'ne',
     'new hampshire': 'nh',
     'new jersey': 'nj',
     'new mexico': 'nm',
     'nevada': 'nv',
     'new york': 'ny',
     'ohio': 'oh',
     'oklahoma': 'ok',
     'oregon': 'or',
     'pennsylvania': 'pa',
     'puerto rico': 'pr',
     'rhode island': 'ri',
     'south carolina': 'sc',
     'south dakota': 'sd',
     'tennessee': 'tn',
     'texas': 'tx',
     'utah': 'ut',
     'virginia': 'va',
     'virgin islands': 'vi',
     'vermont': 'vt',
     'washington': 'wa',
     'wisconsin': 'wi',
     'west virginia': 'wv',
     'wyoming': 'wy'}

    reader = geolite2.reader()

    db = mysql.connector.connect(
        host="52.35.73.200",
        user="ieuser",
        passwd="mijyBg96wtdDSAB5",
        database="compass")



    query="""select sm.id,sm.name,um.USER_ID as Parents_Id,um.USER_NAME as Parents_Name,up.ip_address,um.contact_number,
    sm.city,sm.state,sm.country,um.EMAIL_ID as Parents_Email,um.user_type,
    count(atd.USER_ID) as Practice_Count,max(date(atd.modified_date)) as Last_Practice_Date,date(um.created_date) Sign_Up_Date,
    max(date(ll.LAST_LOGGED_IN)) as Last_Login_Date,
    round((sum(atd.CURSOR_END)-sum(atd.CURSOR_START))/60) as mindful_minutes
    from user_master as um left join user_profile as up
    on um.user_id=up.user_id
    left join audio_track_detail as atd on atd.USER_ID=um.USER_ID
    left join school_master as sm on sm.id=up.SCHOOL_ID
    left join login_logs as ll on ll.USER_ID=um.USER_ID
    where um.ROLE_ID=3 and date(um.created_date)>'2020-03-17'  AND um.IS_DISABLED !='Y' and um.INCOMPLETE_SIGNUP !='Y' and um.email_id not like '%test%' and 
    um.email_id not like '%1gen%' and um.user_name not like '%test%' and um.user_name not like '%1gen%' and um.email_id <>''
    group by um.user_id;"""


    df=pd.read_sql(query, con=db)
    #     print(df.head())
    df=df.replace("UNITED STATES","United States")
    df=df.replace("US","United States")
    df=df.replace("us","United States")
    df=df.replace("USA","United States")
    df=df.replace("Usa","United States")
    df=df.replace("U.S.A","United States")
    
    dfus=df[df['country']=='United States']
    df['state'] =df.state.fillna("NO state info")
    df['state'] = df['state'].apply(lambda x: x.lower())
    df['state_short'] = df['state'].map(statesshort)
    #     print(df.head())

    df.mindful_minutes=df.mindful_minutes.fillna(0)
    df.mindful_minutes=df.mindful_minutes.astype('int64')
    df['Last_Practice_Date']=pd.to_datetime(df['Last_Practice_Date'])
    df['Last_Practice_Date'].fillna("NO PRACTICE", inplace=True)
    df['Last_Login_Date']=pd.to_datetime(df['Last_Login_Date'])
    df['Last_Login_Date'].fillna("NO LOGIN", inplace=True)
    df['Sign_Up_Date']=pd.to_datetime(df['Sign_Up_Date'])
    def country1(i):
        location = reader.get(i)
        c=(location['country']['names']['en'])
        return c
    def state1(i):
        location = reader.get(i)
        s=(location['subdivisions'][0]['names']['en'])
        return s
    def pn_country(i):
        import phonenumbers
        import pycountry
        from phonenumbers.phonenumberutil import (
        region_code_for_country_code,
        region_code_for_number,)
        pn = phonenumbers.parse('+'+i)   
        country = pycountry.countries.get(alpha_2=region_code_for_number(pn))
        con=country.name
        return con

    ip=df['ip_address'].tolist()
    phone_number=df['contact_number'].tolist()
    Parents_Name=df['Parents_Name'].tolist()
    Parents_Email=df.Parents_Email.tolist()
    state=df['state'].tolist()
    country=df['country'].tolist()
    sign_up_date=df['Sign_Up_Date'].tolist()
    last_prac_date=df['Last_Practice_Date'].tolist()
    last_login_date=df['Last_Login_Date'].tolist()
    practice_count=df['Practice_Count'].tolist()
    mindful_minutes=df['mindful_minutes'].tolist()

    for i in range(len(ip)):

        if country[i] is None:
            try:
                country[i]=country1(ip[i])
            except:
                pass
        if state[i] is None:

            try:
                state[i]=state1(ip[i])
            except:
                pass
        if country[i] is None:
            try:
                country[i]=pn_country(phone_number[i])
            except:
                pass
        if country[i] is None:
            country[i]=''
        if state[i] is None:
            state[i]=''

        if  last_prac_date[i] != 'NO PRACTICE' :

            last_prac_date[i]=last_prac_date[i].strftime('%d %b %Y')
        else:

            last_prac_date[i]="NO PRACTICE"

        if  last_login_date[i] != 'NO LOGIN' :

            last_login_date[i]=last_login_date[i].strftime('%d %b %Y')
        else:

            last_login_date[i]="NO LOGIN"

        if sign_up_date[i] is not None:
            sign_up_date[i]=sign_up_date[i].strftime('%d %b %Y')
    cv={'pn':Parents_Name,'pe':Parents_Email,'ut':df['user_type'].tolist(),'ss':df['state_short'].tolist(),
                               'st':state,'co':country,'sp':sign_up_date,
                               'll':last_login_date,'lp':last_prac_date,'pc':practice_count}
    dftry = pd.DataFrame.from_dict(cv)
    
    dfrus=dftry[dftry['co']=='Russia']
    dfrus = dfrus.drop("ss", axis=1)

    temp={"data":dfrus.values.tolist()}
    return json.dumps(temp)

@app.route('/parentsmapusa')

def parentsmapusa():
    statesshort = {'alaska': 'ak',
     'alabama': 'al',
     'arkansas': 'ar',
     'american samoa': 'as',
     'arizona': 'az',
     'california': 'ca',
     'colorado': 'co',
     'connecticut': 'ct',
     'district of columbia': 'dc',
     'delaware': 'de',
     'florida': 'fl',
     'georgia': 'ga',
     'guam': 'gu',
     'hawaii': 'hi',
     'iowa': 'ia',
     'idaho': 'id',
     'illinois': 'il',
     'indiana': 'in',
     'kansas': 'ks',
     'kentucky': 'ky',
     'louisiana': 'la',
     'massachusetts': 'ma',
     'maryland': 'md',
     'maine': 'me',
     'michigan': 'mi',
     'minnesota': 'mn',
     'missouri': 'mo',
     'northern mariana islands': 'mp',
     'mississippi': 'ms',
     'montana': 'mt',
     'national': 'na',
     'north carolina': 'nc',
     'north dakota': 'nd',
     'nebraska': 'ne',
     'new hampshire': 'nh',
     'new jersey': 'nj',
     'new mexico': 'nm',
     'nevada': 'nv',
     'new york': 'ny',
     'ohio': 'oh',
     'oklahoma': 'ok',
     'oregon': 'or',
     'pennsylvania': 'pa',
     'puerto rico': 'pr',
     'rhode island': 'ri',
     'south carolina': 'sc',
     'south dakota': 'sd',
     'tennessee': 'tn',
     'texas': 'tx',
     'utah': 'ut',
     'virginia': 'va',
     'virgin islands': 'vi',
     'vermont': 'vt',
     'washington': 'wa',
     'wisconsin': 'wi',
     'west virginia': 'wv',
     'wyoming': 'wy'}

    reader = geolite2.reader()

    db = mysql.connector.connect(
        host="52.35.73.200",
        user="ieuser",
        passwd="mijyBg96wtdDSAB5",
        database="compass")



    query="""select sm.id,sm.name,um.USER_ID as Parents_Id,um.USER_NAME as Parents_Name,up.ip_address,um.contact_number,
    sm.city,sm.state,sm.country,um.EMAIL_ID as Parents_Email,um.user_type,
    count(atd.USER_ID) as Practice_Count,max(date(atd.modified_date)) as Last_Practice_Date,date(um.created_date) Sign_Up_Date,
    max(date(ll.LAST_LOGGED_IN)) as Last_Login_Date,
    round((sum(atd.CURSOR_END)-sum(atd.CURSOR_START))/60) as mindful_minutes
    from user_master as um left join user_profile as up
    on um.user_id=up.user_id
    left join audio_track_detail as atd on atd.USER_ID=um.USER_ID
    left join school_master as sm on sm.id=up.SCHOOL_ID
    left join login_logs as ll on ll.USER_ID=um.USER_ID
    where um.ROLE_ID=3 and date(um.created_date)>'2020-03-17'  AND um.IS_DISABLED !='Y' and um.INCOMPLETE_SIGNUP !='Y' and um.email_id not like '%test%' and 
    um.email_id not like '%1gen%' and um.user_name not like '%test%' and um.user_name not like '%1gen%' and um.email_id <>''
    group by um.user_id;"""


    df=pd.read_sql(query, con=db)
    df=df.replace("UNITED STATES","United States")
    df=df.replace("US","United States")
    df=df.replace("us","United States")
    df=df.replace("USA","United States")
    
    df=df.replace("Usa","United States")
    df=df.replace("U.S.A","United States")
    #     print(df.head())
    dfus=df[df['country']=='United States']
    df.mindful_minutes=df.mindful_minutes.fillna(0)
    df.mindful_minutes=df.mindful_minutes.astype('int64')
    df['Last_Practice_Date']=pd.to_datetime(df['Last_Practice_Date'])
    df['Last_Practice_Date'].fillna("NO PRACTICE", inplace=True)
    df['Last_Login_Date']=pd.to_datetime(df['Last_Login_Date'])
    df['Last_Login_Date'].fillna("NO LOGIN", inplace=True)
    df['name'].fillna("NO SCHOOL INFO", inplace=True)
    df['Sign_Up_Date']=pd.to_datetime(df['Sign_Up_Date'])
    def country1(i):
        location = reader.get(i)
        c=(location['country']['names']['en'])
        return c
    def state1(i):
        location = reader.get(i)
        s=(location['subdivisions'][0]['names']['en'])
        return s
    
    def city1(i):
        location = reader.get(i)
        city=location['city']['names']['en']
        return city
    
    def pn_country(i):
        import phonenumbers
        import pycountry
        from phonenumbers.phonenumberutil import (
        region_code_for_country_code,
        region_code_for_number,)
        pn = phonenumbers.parse('+'+i)   
        country = pycountry.countries.get(alpha_2=region_code_for_number(pn))
        con=country.name
        return con

    ip=df['ip_address'].tolist()
    phone_number=df['contact_number'].tolist()
    Parents_Name=df['Parents_Name'].tolist()
    Parents_Email=df.Parents_Email.tolist()
    School_Name=df['name'].tolist()
    state=df['state'].tolist()
    country=df['country'].tolist()
    city=df['city'].tolist()
    sign_up_date=df['Sign_Up_Date'].tolist()
    last_prac_date=df['Last_Practice_Date'].tolist()
    last_login_date=df['Last_Login_Date'].tolist()
    practice_count=df['Practice_Count'].tolist()
    mindful_minutes=df['mindful_minutes'].tolist()

    for i in range(len(ip)):

        if country[i] is None:
            try:
                country[i]=country1(ip[i])
            except:
                pass
        elif country[i]=='null':
            try:
                country[i]=country1(ip[i])
            except:
                pass
        if city[i] is None:
            try:
                city[i]=city1(ip[i])
            except:
                pass
        elif city[i]=='null':
            try:
                city[i]=city1(ip[i])
            except:
                pass
        if state[i] is None:

            try:
                state[i]=state1(ip[i])
            except:
                pass
        elif state[i] =='NO state info':

            try:
                state[i]=state1(ip[i])
            except:
                pass    
        if country[i] is None:
            try:
                country[i]=pn_country(phone_number[i])
            except:
                pass
        if country[i] is None:
            country[i]=''
        if state[i] is None:
            state[i]=''

        if  last_prac_date[i] != 'NO PRACTICE' :

            last_prac_date[i]=last_prac_date[i].strftime('%d %b %Y')
        else:

            last_prac_date[i]="NO PRACTICE"

        if  last_login_date[i] != 'NO LOGIN' :

            last_login_date[i]=last_login_date[i].strftime('%d %b %Y')
        else:

            last_login_date[i]="NO LOGIN"

        if sign_up_date[i] is not None:
            sign_up_date[i]=sign_up_date[i].strftime('%d %b %Y')
    state12 =  [each_string.lower() for each_string in state]
    cv={'pnn':Parents_Name,'pe':Parents_Email,'co':country,'pn':phone_number,'sn':School_Name,'ct':city,
                               'st':state12,'sp':sign_up_date,
                               'll':last_login_date,'lp':last_prac_date,'pc':practice_count}
    dftry = pd.DataFrame.from_dict(cv)
    dfus=dftry[dftry['co']=='United States']
    dfrus=dftry[dftry['co']=='Russia']
    dfrukr=dftry[dftry['co']=='Ukraine']
    dfother=dftry[~dftry['co'].isin(['United States', 'Russia','Ukraine'])]

    totalparents=len(dftry)
    usa=len(dfus)
    russia=len(dfrus)
    ukraine=len(dfrukr)
    other=len(dfother)
    usaper=round((usa/totalparents)*100)
    russiaper=round((russia/totalparents)*100)
    ukraineper=round((ukraine/totalparents)*100)
    otherper=round((other/totalparents)*100)
#     statesdf=dfus['ss'].dropna()
#     count=statesdf.value_counts()

    try1=dftry.to_numpy().tolist()
    dfus = dfus.drop("co", axis=1)

    temp={"data":dfus.values.tolist()}
    return json.dumps(temp)


@app.route('/parentsmap')
def parentsmap():
    statesshort = {'alaska': 'ak',
     'alabama': 'al',
     'arkansas': 'ar',
     'american samoa': 'as',
     'arizona': 'az',
     'california': 'ca',
     'colorado': 'co',
     'connecticut': 'ct',
     'district of columbia': 'dc',
     'delaware': 'de',
     'florida': 'fl',
     'georgia': 'ga',
     'guam': 'gu',
     'hawaii': 'hi',
     'iowa': 'ia',
     'idaho': 'id',
     'illinois': 'il',
     'indiana': 'in',
     'kansas': 'ks',
     'kentucky': 'ky',
     'louisiana': 'la',
     'massachusetts': 'ma',
     'maryland': 'md',
     'maine': 'me',
     'michigan': 'mi',
     'minnesota': 'mn',
     'missouri': 'mo',
     'northern mariana islands': 'mp',
     'mississippi': 'ms',
     'montana': 'mt',
     'national': 'na',
     'north carolina': 'nc',
     'north dakota': 'nd',
     'nebraska': 'ne',
     'new hampshire': 'nh',
     'new jersey': 'nj',
     'new mexico': 'nm',
     'nevada': 'nv',
     'new york': 'ny',
     'ohio': 'oh',
     'oklahoma': 'ok',
     'oregon': 'or',
     'pennsylvania': 'pa',
     'puerto rico': 'pr',
     'rhode island': 'ri',
     'south carolina': 'sc',
     'south dakota': 'sd',
     'tennessee': 'tn',
     'texas': 'tx',
     'utah': 'ut',
     'virginia': 'va',
     'virgin islands': 'vi',
     'vermont': 'vt',
     'washington': 'wa',
     'wisconsin': 'wi',
     'west virginia': 'wv',
     'wyoming': 'wy'}

    reader = geolite2.reader()

    db = mysql.connector.connect(
        host="52.35.73.200",
        user="ieuser",
        passwd="mijyBg96wtdDSAB5",
        database="compass")



    query="""select sm.id,sm.name,um.USER_ID as Parents_Id,um.USER_NAME as Parents_Name,up.ip_address,um.contact_number,
    sm.city,sm.state,sm.country,um.EMAIL_ID as Parents_Email,um.user_type,
    count(atd.USER_ID) as Practice_Count,max(date(atd.modified_date)) as Last_Practice_Date,date(um.created_date) Sign_Up_Date,
    max(date(ll.LAST_LOGGED_IN)) as Last_Login_Date,
    round((sum(atd.CURSOR_END)-sum(atd.CURSOR_START))/60) as mindful_minutes
    from user_master as um left join user_profile as up
    on um.user_id=up.user_id
    left join audio_track_detail as atd on atd.USER_ID=um.USER_ID
    left join school_master as sm on sm.id=up.SCHOOL_ID
    left join login_logs as ll on ll.USER_ID=um.USER_ID
    where um.ROLE_ID=3 and date(um.created_date)>'2020-03-17'  AND um.IS_DISABLED !='Y' and um.INCOMPLETE_SIGNUP !='Y' and um.email_id not like '%test%' and 
    um.email_id not like '%1gen%' and um.user_name not like '%test%' and um.user_name not like '%1gen%' and um.email_id <>''
    group by um.user_id;"""


    df=pd.read_sql(query, con=db)
#     print(df.head())
    df=df.replace("UNITED STATES","United States")
    df=df.replace("US","United States")
    df=df.replace("us","United States")
    df=df.replace("USA","United States")
    df=df.replace("Usa","United States")
    df=df.replace("U.S.A","United States")
    dfus=df[df['country']=='United States']
    df.mindful_minutes=df.mindful_minutes.fillna(0)
    df.mindful_minutes=df.mindful_minutes.astype('int64')
    df['Last_Practice_Date']=pd.to_datetime(df['Last_Practice_Date'])
    df['Last_Practice_Date'].fillna("NO PRACTICE", inplace=True)
    df['Last_Login_Date']=pd.to_datetime(df['Last_Login_Date'])
    df['Last_Login_Date'].fillna("NO LOGIN", inplace=True)
    df['Sign_Up_Date']=pd.to_datetime(df['Sign_Up_Date'])
    def country1(i):
        location = reader.get(i)
        c=(location['country']['names']['en'])
        return c
    def state1(i):
        location = reader.get(i)
        s=(location['subdivisions'][0]['names']['en'])
        return s
    def pn_country(i):
        import phonenumbers
        import pycountry
        from phonenumbers.phonenumberutil import (
        region_code_for_country_code,
        region_code_for_number,)
        pn = phonenumbers.parse('+'+i)   
        country = pycountry.countries.get(alpha_2=region_code_for_number(pn))
        con=country.name
        return con
    
    ip=df['ip_address'].tolist()
    phone_number=df['contact_number'].tolist()
    Parents_Name=df['Parents_Name'].tolist()
    Parents_Email=df.Parents_Email.tolist()
    state=df['state'].tolist()
    country=df['country'].tolist()
    sign_up_date=df['Sign_Up_Date'].tolist()
    last_prac_date=df['Last_Practice_Date'].tolist()
    last_login_date=df['Last_Login_Date'].tolist()
    practice_count=df['Practice_Count'].tolist()
    mindful_minutes=df['mindful_minutes'].tolist()
    
    for i in range(len(ip)):

        if country[i] is None:
            try:
                country[i]=country1(ip[i])
            except:
                pass
        if state[i] is None:

            try:
                state[i]=state1(ip[i])
            except:
                pass
        if country[i] is None:
            try:
                country[i]=pn_country(phone_number[i])
            except:
                pass
        if country[i] is None:
            country[i]=''
        if state[i] is None:
            state[i]=''

        if  last_prac_date[i] != 'NO PRACTICE' :

            last_prac_date[i]=last_prac_date[i].strftime('%d %b %Y')
        else:

            last_prac_date[i]="NO PRACTICE"

        if  last_login_date[i] != 'NO LOGIN' :

            last_login_date[i]=last_login_date[i].strftime('%d %b %Y')
        else:

            last_login_date[i]="NO LOGIN"

        if sign_up_date[i] is not None:
            sign_up_date[i]=sign_up_date[i].strftime('%d %b %Y')
    state12 =  [each_string.lower() for each_string in state]
    stateshortnew=list(map(statesshort.get, state12))
    cv={'pn':Parents_Name,'pe':Parents_Email,'ut':df['user_type'].tolist(),'ss':stateshortnew,
                               'st':state,'co':country,'sp':sign_up_date,
                               'll':last_login_date,'lp':last_prac_date,'pc':practice_count}
    dftry = pd.DataFrame.from_dict(cv)
    dfus=dftry[dftry['co']=='United States']
    dfrus=dftry[dftry['co']=='Russia']
    dfmex=dftry[dftry['co']=='Mexico']
    dfind=dftry[dftry['co']=='India']
    dfcan=dftry[dftry['co']=='Canada']
    dfrukr=dftry[dftry['co']=='Ukraine']
    dfother=dftry[~dftry['co'].isin(['United States', 'Mexico','India','Canada'])]
    
    totalparents=len(dftry)
    usa=len(dfus)
    india=len(dfind)
    mexico=len(dfmex)
    canada=len(dfcan)
    russia=len(dfrus)
    ukraine=len(dfrukr)
    other=len(dfother)
    
    usaper=round((usa/totalparents)*100)
    russiaper=round((russia/totalparents)*100)
    ukraineper=round((ukraine/totalparents)*100)
    otherper=round((other/totalparents)*100)
    statesdf=dfus['ss'].dropna()
    count=statesdf.value_counts()
    data=[]
    for i,k in zip(count.index,count.values):

        try:
            data.append({"code":i,"value":int(k),'hc-key':"us-"+i})
        except:
            pass

    
        
        
    return json.dumps({"india":india,"mexico":mexico,"canada":canada,"totalparents":totalparents,"data":data,"usa":usa,"russia":russia,"ukraine":ukraine,"other":other,"usaper":usaper,"russiaper":russiaper,"ukraineper":ukraineper,"otherper":otherper})

@app.route('/statep/<state>')
def state_table(state):
    db = mysql.connector.connect(
        host="52.35.73.200",
        user="ieuser",
        passwd="mijyBg96wtdDSAB5",
        database="compass")
    query="""select sm.id,sm.name,um.USER_ID as Parents_Id,um.USER_NAME as Parents_Name,up.ip_address,um.contact_number,
    sm.city,sm.state,sm.country,um.EMAIL_ID as Parents_Email,um.user_type,
    count(atd.USER_ID) as Practice_Count,max(atd.modified_date) as Last_Practice_Date,um.created_date as Sign_Up_Date,
    ll.LAST_LOGGED_IN as Last_Login_Date,
    round((sum(atd.CURSOR_END)-sum(atd.CURSOR_START))/60) as mindful_minutes
    from user_master as um left join user_profile as up
    on um.user_id=up.user_id
    left join audio_track_detail as atd on atd.USER_ID=um.USER_ID
    left join school_master as sm on sm.id=up.SCHOOL_ID
    left join login_logs as ll on ll.USER_ID=um.USER_ID
    where sm.state like '%"""+state+"""%' and um.ROLE_ID=3  and DATE(um.CREATED_DATE) > '2020-03-17'  AND um.IS_DISABLED !='Y' and um.INCOMPLETE_SIGNUP !='Y' and  um.email_id not like '%test%' and 
    um.email_id not like '%1gen%' and um.user_name not like '%test%' and um.user_name not like '%1gen%' and um.email_id <>''
    group by um.user_id;"""


    df=pd.read_sql(query, con=db)
    df=df.replace("UNITED STATES","United States")
    df=df.replace("US","United States")
    df=df.replace("us","United States")
    df=df.replace("USA","United States")
    df=df.replace("Usa","United States")
    df.mindful_minutes=df.mindful_minutes.fillna(0)
    df['name'].fillna("NO SCHOOL INFO", inplace=True)
    df.mindful_minutes=df.mindful_minutes.astype('int64')
    df['Last_Practice_Date']=pd.to_datetime(df['Last_Practice_Date'])
    df['Last_Practice_Date'].fillna("NO PRACTICE", inplace=True)
    df['Last_Login_Date']=pd.to_datetime(df['Last_Login_Date'])
    df['Last_Login_Date'].fillna("NO LOGIN", inplace=True)
    df['Sign_Up_Date']=pd.to_datetime(df['Sign_Up_Date'])
    def country1(i):
        location = reader.get(i)
        c=(location['country']['names']['en'])
        return c
    def state1(i):
        location = reader.get(i)
        s=(location['subdivisions'][0]['names']['en'])
        return s
    def pn_country(i):
        import phonenumbers
        import pycountry
        from phonenumbers.phonenumberutil import (
        region_code_for_country_code,
        region_code_for_number,)
        pn = phonenumbers.parse('+'+i)   
        country = pycountry.countries.get(alpha_2=region_code_for_number(pn))
        con=country.name
        return con

    ip=df['ip_address'].tolist()
    schname=df['name'].tolist()
    phone_number=df['contact_number'].tolist()
    Parents_Name=df['Parents_Name'].tolist()
    Parents_Email=df.Parents_Email.tolist()
    state=df['state'].tolist()
    country=df['country'].tolist()
    sign_up_date=df['Sign_Up_Date'].tolist()
    last_prac_date=df['Last_Practice_Date'].tolist()
    last_login_date=df['Last_Login_Date'].tolist()
    practice_count=df['Practice_Count'].tolist()
    mindful_minutes=df['mindful_minutes'].tolist()

    for i in range(len(ip)):

        if country[i] is None:
            try:
                country[i]=country1(ip[i])
            except:
                pass
        if state[i] is None:

            try:
                state[i]=state1(ip[i])
            except:
                pass
        if country[i] is None:
            try:
                country[i]=pn_country(phone_number[i])
            except:
                pass
        if country[i] is None:
            country[i]=''
        if state[i] is None:
            state[i]=''

        if  last_prac_date[i] != 'NO PRACTICE' :

            last_prac_date[i]=(last_prac_date[i]- timedelta(hours=4)).strftime('%d %b %Y')
        else:

            last_prac_date[i]="NO PRACTICE"

        if  last_login_date[i] != 'NO LOGIN' :

            last_login_date[i]=(last_login_date[i]- timedelta(hours=4)).strftime('%d %b %Y')
            
        else:

            last_login_date[i]="NO LOGIN"

        if sign_up_date[i] is not None:
            
            sign_up_date[i]=(sign_up_date[i]- timedelta(hours=4)).strftime('%d %b %Y')
#             print(sign_up_date[i])

    data=[]    
    for b,i,k,l,m,o,p,q,r,s in zip(schname,Parents_Name,Parents_Email,df['user_type'].tolist(),
                               state,country,sign_up_date,
                               last_login_date,last_prac_date,practice_count):

        data.append([b,i,k,l,m,o,p,q,r,s])
        
        
    return json.dumps({"data":data})


@app.route('/fair/total/<usert>')
def district_tabletotal(usert):
    reader = geolite2.reader()
    db = mysql.connector.connect(
        host="52.35.73.200",
        user="ieuser",
        passwd="mijyBg96wtdDSAB5",
        database="compass")



    query="""select sm.id,sm.name,um.USER_ID as Parents_Id,um.USER_NAME as Parents_Name,up.ip_address,um.contact_number,
    sm.city,sm.state,sm.country,um.EMAIL_ID as Parents_Email,um.user_type,
    count(atd.USER_ID) as Practice_Count,max(atd.modified_date) as Last_Practice_Date,um.created_date as Sign_Up_Date,
    ll.LAST_LOGGED_IN as Last_Login_Date,
    round((sum(atd.CURSOR_END)-sum(atd.CURSOR_START))/60) as mindful_minutes
    from user_master as um left join user_profile as up
    on um.user_id=up.user_id
    left join audio_track_detail as atd on atd.USER_ID=um.USER_ID
    left join school_master as sm on sm.id=up.SCHOOL_ID
    left join login_logs as ll on ll.USER_ID=um.USER_ID
    where um.ROLE_ID=3 and DATE(um.CREATED_DATE) > '2020-03-17' and  um.email_id not like '%test%' and AND um.IS_DISABLED !='Y' and um.INCOMPLETE_SIGNUP !='Y' AND
    um.email_id not like '%1gen%' and um.user_type like '%"""+usert+"""%' and um.user_name not like '%test%' and um.user_name not like '%1gen%' and um.email_id <>''
    group by um.user_id;"""


    df=pd.read_sql(query, con=db)
    
    df.mindful_minutes=df.mindful_minutes.fillna(0)
    df['name'].fillna("NO SCHOOL INFORMATION", inplace=True)
    df.mindful_minutes=df.mindful_minutes.astype('int64')
    df['Last_Practice_Date']=pd.to_datetime(df['Last_Practice_Date'])
    df['Last_Practice_Date'].fillna("NO PRACTICE", inplace=True)
    df['Last_Login_Date']=pd.to_datetime(df['Last_Login_Date'])
    df['Last_Login_Date'].fillna("NO LOGIN", inplace=True)
    df['Sign_Up_Date']=pd.to_datetime(df['Sign_Up_Date'])
    def country1(i):
        location = reader.get(i)
        c=(location['country']['names']['en'])
        return c
    def state1(i):
        location = reader.get(i)
        s=(location['subdivisions'][0]['names']['en'])
        return s
    def pn_country(i):
        import phonenumbers
        import pycountry
        from phonenumbers.phonenumberutil import (
        region_code_for_country_code,
        region_code_for_number,)
        pn = phonenumbers.parse('+'+i)   
        country = pycountry.countries.get(alpha_2=region_code_for_number(pn))
        con=country.name
        return con

    ip=df['ip_address'].tolist()
    school_name=df['name'].tolist()
    phone_number=df['contact_number'].tolist()
    Parents_Name=df['Parents_Name'].tolist()
    Parents_Email=df.Parents_Email.tolist()
    state=df['state'].tolist()
    country=df['country'].tolist()
    sign_up_date=df['Sign_Up_Date'].tolist()
    last_prac_date=df['Last_Practice_Date'].tolist()
    last_login_date=df['Last_Login_Date'].tolist()
    practice_count=df['Practice_Count'].tolist()
    mindful_minutes=df['mindful_minutes'].tolist()

    for i in range(len(ip)):

        if country[i] is None:
            try:
                country[i]=country1(ip[i])
            except:
                pass
        if state[i] is None:

            try:
                state[i]=state1(ip[i])
            except:
                pass
        if country[i] is None:
            try:
                country[i]=pn_country(phone_number[i])
            except:
                pass
        if country[i] is None:
            country[i]=''
        if state[i] is None:
            state[i]=''

        if  last_prac_date[i] != 'NO PRACTICE' :

            last_prac_date[i]=(last_prac_date[i]- timedelta(hours=4)).strftime('%d %b %Y')
        else:

            last_prac_date[i]="NO PRACTICE"

        if  last_login_date[i] != 'NO LOGIN' :

            last_login_date[i]=(last_login_date[i]- timedelta(hours=4)).strftime('%d %b %Y')
            
        else:

            last_login_date[i]="NO LOGIN"

        if sign_up_date[i] is not None:
            
            sign_up_date[i]=(sign_up_date[i]- timedelta(hours=4)).strftime('%d %b %Y')
#             print(sign_up_date[i])

    data=[]    
    for t,i,k,l,m,o,p,q,r,s in zip(school_name,Parents_Name,Parents_Email,df['user_type'].tolist(),
                               state,country,sign_up_date,
                               last_login_date,last_prac_date,practice_count):

        data.append([t,i,k,l,m,o,p,q,r,s])
        
        
    return json.dumps({"data":data})

@app.route('/fair/sign/<usert>')
def district_tablelog(usert):
    reader = geolite2.reader()
    db = mysql.connector.connect(
        host="52.35.73.200",
        user="ieuser",
        passwd="mijyBg96wtdDSAB5",
        database="compass")



    query="""select sm.id,sm.name,um.USER_ID as Parents_Id,um.USER_NAME as Parents_Name,up.ip_address,um.contact_number,
    sm.city,sm.state,sm.country,um.EMAIL_ID as Parents_Email,um.user_type,
    count(atd.USER_ID) as Practice_Count,max(atd.modified_date) as Last_Practice_Date,um.created_date as Sign_Up_Date,
    ll.LAST_LOGGED_IN as Last_Login_Date,
    round((sum(atd.CURSOR_END)-sum(atd.CURSOR_START))/60) as mindful_minutes
    from user_master as um left join user_profile as up
    on um.user_id=up.user_id
    left join audio_track_detail as atd on atd.USER_ID=um.USER_ID
    left join school_master as sm on sm.id=up.SCHOOL_ID
    inner join login_logs as ll on ll.USER_ID=um.USER_ID
    where um.ROLE_ID=3 and DATE(um.CREATED_DATE) > '2020-03-17'  and  um.email_id not like '%test%' and 
    um.email_id not like '%1gen%' and um.user_type like '%"""+usert+"""%' and um.user_name not like '%test%' and um.IS_DISABLED !='Y' and um.INCOMPLETE_SIGNUP !='Y' and um.user_name not like '%1gen%' and um.email_id <>''
    group by um.user_id;"""

    df=pd.read_sql(query, con=db)
    
    df.mindful_minutes=df.mindful_minutes.fillna(0)
    df['name'].fillna("NO School Dashboards", inplace=True)
    df.mindful_minutes=df.mindful_minutes.astype('int64')
    df['Last_Practice_Date']=pd.to_datetime(df['Last_Practice_Date'])
    df['Last_Practice_Date'].fillna("NO PRACTICE", inplace=True)
    df['Last_Login_Date']=pd.to_datetime(df['Last_Login_Date'])
    df['Last_Login_Date'].fillna("NO LOGIN", inplace=True)
    df['Sign_Up_Date']=pd.to_datetime(df['Sign_Up_Date'])
    def country1(i):
        location = reader.get(i)
        c=(location['country']['names']['en'])
        return c
    def state1(i):
        location = reader.get(i)
        s=(location['subdivisions'][0]['names']['en'])
        return s
    def pn_country(i):
        import phonenumbers
        import pycountry
        from phonenumbers.phonenumberutil import (
        region_code_for_country_code,
        region_code_for_number,)
        pn = phonenumbers.parse('+'+i)   
        country = pycountry.countries.get(alpha_2=region_code_for_number(pn))
        con=country.name
        return con

    ip=df['ip_address'].tolist()
    school_name=df['name'].tolist()
    phone_number=df['contact_number'].tolist()
    Parents_Name=df['Parents_Name'].tolist()
    Parents_Email=df.Parents_Email.tolist()
    state=df['state'].tolist()
    country=df['country'].tolist()
    sign_up_date=df['Sign_Up_Date'].tolist()
    last_prac_date=df['Last_Practice_Date'].tolist()
    last_login_date=df['Last_Login_Date'].tolist()
    practice_count=df['Practice_Count'].tolist()
    mindful_minutes=df['mindful_minutes'].tolist()

    for i in range(len(ip)):

        if country[i] is None:
            try:
                country[i]=country1(ip[i])
            except:
                pass
        if state[i] is None:

            try:
                state[i]=state1(ip[i])
            except:
                pass
        if country[i] is None:
            try:
                country[i]=pn_country(phone_number[i])
            except:
                pass
        if country[i] is None:
            country[i]=''
        if state[i] is None:
            state[i]=''

        if  last_prac_date[i] != 'NO PRACTICE' :

            last_prac_date[i]=(last_prac_date[i]- timedelta(hours=4)).strftime('%d %b %Y')
        else:

            last_prac_date[i]="NO PRACTICE"

        if  last_login_date[i] != 'NO LOGIN' :

            last_login_date[i]=(last_login_date[i]- timedelta(hours=4)).strftime('%d %b %Y')
            
        else:

            last_login_date[i]="NO LOGIN"

        if sign_up_date[i] is not None:
            
            sign_up_date[i]=(sign_up_date[i]- timedelta(hours=4)).strftime('%d %b %Y')
#             print(sign_up_date[i])

    data=[]    
    for t,i,k,l,m,o,p,q,r,s in zip(school_name,Parents_Name,Parents_Email,df['user_type'].tolist(),
                               state,country,sign_up_date,
                               last_login_date,last_prac_date,practice_count):

        data.append([t,i,k,l,m,o,p,q,r,s])
        
        
    return json.dumps({"data":data})

@app.route('/fair/active/<usert>')
def district_tablec(usert):
    reader = geolite2.reader()
    db = mysql.connector.connect(
        host="52.35.73.200",
        user="ieuser",
        passwd="mijyBg96wtdDSAB5",
        database="compass")



    query="""select sm.id,sm.name,um.USER_ID as Parents_Id,um.USER_NAME as Parents_Name,up.ip_address,um.contact_number,
    sm.city,sm.state,sm.country,um.EMAIL_ID as Parents_Email,um.user_type,
    count(atd.USER_ID) as Practice_Count,max(atd.modified_date) as Last_Practice_Date,um.created_date as Sign_Up_Date,
    ll.LAST_LOGGED_IN as Last_Login_Date,
    round((sum(atd.CURSOR_END)-sum(atd.CURSOR_START))/60) as mindful_minutes
    from user_master as um left join user_profile as up
    on um.user_id=up.user_id
    inner join audio_track_detail as atd on atd.USER_ID=um.USER_ID
    left join school_master as sm on sm.id=up.SCHOOL_ID
    left join login_logs as ll on ll.USER_ID=um.USER_ID
    where um.ROLE_ID=3 and DATE(um.CREATED_DATE) > '2020-03-17' and  um.email_id not like '%test%' and  and um.IS_DISABLED !='Y' and um.INCOMPLETE_SIGNUP !='Y' and
    um.email_id not like '%1gen%' and um.user_type like '%"""+usert+"""%' and um.user_name not like '%test%' and um.user_name not like '%1gen%' and um.email_id <>''
    group by um.user_id;"""


    df=pd.read_sql(query, con=db)
    
    df.mindful_minutes=df.mindful_minutes.fillna(0)
    df['name'].fillna("NO School Dashboards", inplace=True)
    df.mindful_minutes=df.mindful_minutes.astype('int64')
    df['Last_Practice_Date']=pd.to_datetime(df['Last_Practice_Date'])
    df['Last_Practice_Date'].fillna("NO PRACTICE", inplace=True)
    df['Last_Login_Date']=pd.to_datetime(df['Last_Login_Date'])
    df['Last_Login_Date'].fillna("NO LOGIN", inplace=True)
    df['Sign_Up_Date']=pd.to_datetime(df['Sign_Up_Date'])
    def country1(i):
        location = reader.get(i)
        c=(location['country']['names']['en'])
        return c
    def state1(i):
        location = reader.get(i)
        s=(location['subdivisions'][0]['names']['en'])
        return s
    def pn_country(i):
        import phonenumbers
        import pycountry
        from phonenumbers.phonenumberutil import (
        region_code_for_country_code,
        region_code_for_number,)
        pn = phonenumbers.parse('+'+i)   
        country = pycountry.countries.get(alpha_2=region_code_for_number(pn))
        con=country.name
        return con

    ip=df['ip_address'].tolist()
    school_name=df['name'].tolist()
    phone_number=df['contact_number'].tolist()
    Parents_Name=df['Parents_Name'].tolist()
    Parents_Email=df.Parents_Email.tolist()
    state=df['state'].tolist()
    country=df['country'].tolist()
    sign_up_date=df['Sign_Up_Date'].tolist()
    last_prac_date=df['Last_Practice_Date'].tolist()
    last_login_date=df['Last_Login_Date'].tolist()
    practice_count=df['Practice_Count'].tolist()
    mindful_minutes=df['mindful_minutes'].tolist()

    for i in range(len(ip)):

        if country[i] is None:
            try:
                country[i]=country1(ip[i])
            except:
                pass
        if state[i] is None:

            try:
                state[i]=state1(ip[i])
            except:
                pass
        if country[i] is None:
            try:
                country[i]=pn_country(phone_number[i])
            except:
                pass
        if country[i] is None:
            country[i]=''
        if state[i] is None:
            state[i]=''

        if  last_prac_date[i] != 'NO PRACTICE' :

            last_prac_date[i]=(last_prac_date[i]- timedelta(hours=4)).strftime('%d %b %Y')
        else:

            last_prac_date[i]="NO PRACTICE"

        if  last_login_date[i] != 'NO LOGIN' :

            last_login_date[i]=(last_login_date[i]- timedelta(hours=4)).strftime('%d %b %Y')
            
        else:

            last_login_date[i]="NO LOGIN"

        if sign_up_date[i] is not None:
            
            sign_up_date[i]=(sign_up_date[i]- timedelta(hours=4)).strftime('%d %b %Y')
#             print(sign_up_date[i])

    data=[]    
    for t,i,k,l,m,o,p,q,r,s in zip(school_name,Parents_Name,Parents_Email,df['user_type'].tolist(),
                               state,country,sign_up_date,
                               last_login_date,last_prac_date,practice_count):

        data.append([t,i,k,l,m,o,p,q,r,s])
        
        
    return json.dumps({"data":data})


@app.route('/fair/<usert>/<sch>')
def district_table(usert,sch):
    reader = geolite2.reader()
    db = mysql.connector.connect(
        host="52.35.73.200",
        user="ieuser",
        passwd="mijyBg96wtdDSAB5",
        database="compass")



    query="""select sm.id,sm.name,um.USER_ID as Parents_Id,um.USER_NAME as Parents_Name,up.ip_address,um.contact_number,
    sm.city,sm.state,sm.country,um.EMAIL_ID as Parents_Email,um.user_type,
    count(atd.USER_ID) as Practice_Count,max(atd.modified_date) as Last_Practice_Date,um.created_date as Sign_Up_Date,
    ll.LAST_LOGGED_IN as Last_Login_Date,
    round((sum(atd.CURSOR_END)-sum(atd.CURSOR_START))/60) as mindful_minutes
    from user_master as um left join user_profile as up
    on um.user_id=up.user_id
    left join audio_track_detail as atd on atd.USER_ID=um.USER_ID
    left join school_master as sm on sm.id=up.SCHOOL_ID
    left join login_logs as ll on ll.USER_ID=um.USER_ID
    where um.ROLE_ID=3 and DATE(um.CREATED_DATE) > '2020-03-17' and  um.email_id not like '%test%' and um.IS_DISABLED !='Y' and um.INCOMPLETE_SIGNUP !='Y' and
    um.email_id not like '%1gen%' and sm.name like '%"""+sch+"""%' and um.user_type like '%"""+usert+"""%' and um.user_name not like '%test%' and um.user_name not like '%1gen%' and um.email_id <>''
    group by um.user_id;"""


    df=pd.read_sql(query, con=db)
    
    df.mindful_minutes=df.mindful_minutes.fillna(0)
    df['name'].fillna("NO SCHOOL INFORMATION", inplace=True)
    df.mindful_minutes=df.mindful_minutes.astype('int64')
    df['Last_Practice_Date']=pd.to_datetime(df['Last_Practice_Date'])
    df['Last_Practice_Date'].fillna("NO PRACTICE", inplace=True)
    df['Last_Login_Date']=pd.to_datetime(df['Last_Login_Date'])
    df['Last_Login_Date'].fillna("NO LOGIN", inplace=True)
    df['Sign_Up_Date']=pd.to_datetime(df['Sign_Up_Date'])
    def country1(i):
        location = reader.get(i)
        c=(location['country']['names']['en'])
        return c
    def state1(i):
        location = reader.get(i)
        s=(location['subdivisions'][0]['names']['en'])
        return s
    def pn_country(i):
        import phonenumbers
        import pycountry
        from phonenumbers.phonenumberutil import (
        region_code_for_country_code,
        region_code_for_number,)
        pn = phonenumbers.parse('+'+i)   
        country = pycountry.countries.get(alpha_2=region_code_for_number(pn))
        con=country.name
        return con

    ip=df['ip_address'].tolist()
    school_name=df['name'].tolist()
    phone_number=df['contact_number'].tolist()
    Parents_Name=df['Parents_Name'].tolist()
    Parents_Email=df.Parents_Email.tolist()
    state=df['state'].tolist()
    country=df['country'].tolist()
    sign_up_date=df['Sign_Up_Date'].tolist()
    last_prac_date=df['Last_Practice_Date'].tolist()
    last_login_date=df['Last_Login_Date'].tolist()
    practice_count=df['Practice_Count'].tolist()
    mindful_minutes=df['mindful_minutes'].tolist()

    for i in range(len(ip)):

        if country[i] is None:
            try:
                country[i]=country1(ip[i])
            except:
                pass
        if state[i] is None:

            try:
                state[i]=state1(ip[i])
            except:
                pass
        if country[i] is None:
            try:
                country[i]=pn_country(phone_number[i])
            except:
                pass
        if country[i] is None:
            country[i]=''
        if state[i] is None:
            state[i]=''

        if  last_prac_date[i] != 'NO PRACTICE' :

            last_prac_date[i]=(last_prac_date[i]- timedelta(hours=4)).strftime('%d %b %Y')
        else:

            last_prac_date[i]="NO PRACTICE"

        if  last_login_date[i] != 'NO LOGIN' :

            last_login_date[i]=(last_login_date[i]- timedelta(hours=4)).strftime('%d %b %Y')
            
        else:

            last_login_date[i]="NO LOGIN"

        if sign_up_date[i] is not None:
            
            sign_up_date[i]=(sign_up_date[i]- timedelta(hours=4)).strftime('%d %b %Y')
#             print(sign_up_date[i])

    data=[]    
    for t,i,k,l,m,o,p,q,r,s in zip(school_name,Parents_Name,Parents_Email,df['user_type'].tolist(),
                               state,country,sign_up_date,
                               last_login_date,last_prac_date,practice_count):

        data.append([t,i,k,l,m,o,p,q,r,s])
        
        
    return json.dumps({"data":data})


@app.route('/fair/<usert>')
def spyderdyn(usert):
    db = mysql.connector.connect(
    host="52.35.73.200",
    user="ieuser",
    passwd="mijyBg96wtdDSAB5",
    database="compass")
    qr="""SELECT up.school_id,um.USER_ID,um.CONTACT_NUMBER,um.EMAIL_ID,um.USER_NAME,um.USER_TYPE,sm.name,count(atd.user_id) as 'COUNT',round((sum(atd.CURSOR_END)-sum(atd.CURSOR_START))/60) as mindful_minutes ,max(date(ll.LAST_LOGGED_IN)) as Last_Login_Date FROM user_master as um 
    left join user_profile as up on um.USER_ID=up.USER_ID
    left join school_master as sm on up.SCHOOL_ID=sm.ID
    left join audio_track_detail as atd on um.USER_ID=atd.USER_ID
    left join login_logs as ll on ll.USER_ID=um.USER_ID
    where um.USER_TYPE like '%"""+usert+"""%'  and  um.email_id not like '%test%' and um.IS_DISABLED !='Y' and um.INCOMPLETE_SIGNUP !='Y' and
    um.email_id not like '%1gen%' and um.user_name not like '%test%' and um.user_name not like '%1gen%' and um.email_id <>''
    group by um.user_id"""
    df=pd.read_sql(qr, con=db)
#     print(df)
    playback=sum(df['COUNT'])
#     print(playback,"playback")
    dflg=df['Last_Login_Date'].fillna("no")
    appsign=len(dflg[dflg !='no'])
#     print(appsign,"app signup")
    dfq=df[df.COUNT > 0]
    active=len(dfq)
#     print(active,"active parents")
    mms=sum(df['mindful_minutes'].fillna(0))
    mms1=int(mms)
#     print(mms1,"mindfulminutes")
    totalp=len(df)
#     print(totalp,"total parents")
    df1=df.groupby(['USER_TYPE'])['COUNT'].sum().reset_index()

#     print(df)
    links0 = df1.rename(columns={'USER_TYPE' : 'name', 'COUNT' : 'Practice_Count'}).to_dict('r')
    df2=df.groupby(['name'])['COUNT'].sum().reset_index()
    df2=df2.dropna()
    links1 = df2.rename(columns={'name' : 'name', 'COUNT' : 'Practice_Count'}).to_dict('r')
    df3=df[['EMAIL_ID','COUNT']]
    links2 = df3.rename(columns={'EMAIL_ID' : 'name', 'COUNT' : 'Practice_Count'}).to_dict('r')
    links0.extend(links1)
    links0.extend(links2)
    df4=df[['USER_TYPE','name']]
#     print(df4)
    
    df4.dropna(subset=['USER_TYPE'])
    df5= df4.drop_duplicates(subset='name', keep="first")
    
    links4 = df5.rename(columns={'USER_TYPE' : 'source', 'name' : 'target'}).to_dict('r')
    df6=df[['name','EMAIL_ID']]
#     print(df6)
    bc=df6.dropna(subset=['name'])
    links3 = bc.rename(columns={'name' : 'source', 'EMAIL_ID' : 'target'}).to_dict('r')
    df7=df[['EMAIL_ID','COUNT']]
    df7.loc[(df7['COUNT'] == 0) , 'hex'] = '#FF9933' 
    df7.loc[(df7['COUNT'] > 0) , 'hex'] = '#00a651' 
    df8=df7[['EMAIL_ID','hex']]
    links5 = df8.rename(columns={'EMAIL_ID' : 'name', 'hex' : 'hex'}).to_dict('r')
    results=[]
    links0[0].update({'size':20})
    for i in links0[1:]:
        i.update({'size':10})
    for n in links3:
        for m in links4:
            if n['source']==m['target']:
                results.append(m)
            elif m not in results:
                results.append(n)
            else:
                results.append(n)
    res = [] 
    for i in results: 
        if i not in res: 
            res.append(i)
    actparentsper=round((active/totalp)*100)
    appsignupper=round((appsign/totalp)*100)


    temp={"actparentsper":[str(actparentsper)],"nodes":links0,"links":res,"color":links5,'appsignupper':[str(appsignupper)],"mindfulnessmin":[str(mms1)],"playback":[str(playback)],'actparents':[str(active)],'appsignup':[str(appsign)],'totparents':[str(totalp)]}
    return json.dumps(temp)

# checked

@app.route('/userparents/<usertype>')
def userparents_table(usertype):
    
    db = mysql.connector.connect(
        host="52.35.73.200",
        user="ieuser",
        passwd="mijyBg96wtdDSAB5",
        database="compass")



    query="""select sm.id,sm.name,um.USER_ID as Parents_Id,um.USER_NAME as Parents_Name,up.ip_address,um.contact_number,
    sm.city,sm.state,sm.country,um.EMAIL_ID as Parents_Email,um.user_type,
    count(atd.USER_ID) as Practice_Count,max(date(atd.modified_date)) as Last_Practice_Date,date(um.created_date) Sign_Up_Date,
    max(date(ll.LAST_LOGGED_IN)) as Last_Login_Date,
    round((sum(atd.CURSOR_END)-sum(atd.CURSOR_START))/60) as mindful_minutes
    from user_master as um left join user_profile as up
    on um.user_id=up.user_id
    left join audio_track_detail as atd on atd.USER_ID=um.USER_ID
    left join school_master as sm on sm.id=up.SCHOOL_ID
    left join login_logs as ll on ll.USER_ID=um.USER_ID
    where um.ROLE_ID=3 and date(um.created_date) > '2020-03-17' and um.email_id not like '%test%' and um.IS_DISABLED !='Y' and um.INCOMPLETE_SIGNUP !='Y'  and um.user_type like '%"""+usertype+"""%'  and 
    um.email_id not like '%1gen%' and um.user_name not like '%test%' and um.user_name not like '%1gen%' and um.email_id <>''
    group by um.user_id;"""


    df=pd.read_sql(query, con=db)
  
    df.mindful_minutes=df.mindful_minutes.fillna(0)
    df.mindful_minutes=df.mindful_minutes.astype('int64')
    df['Last_Practice_Date']=pd.to_datetime(df['Last_Practice_Date'])
    df['Last_Practice_Date'].fillna("NO PRACTICE", inplace=True)
    df['Last_Login_Date']=pd.to_datetime(df['Last_Login_Date'])
    df['Last_Login_Date'].fillna("NO LOGIN", inplace=True)
    df['Sign_Up_Date']=pd.to_datetime(df['Sign_Up_Date'])
    df['name'].fillna("NO SCHOOL INFO", inplace=True)
    def country1(i):
        location = reader.get(i)
        c=(location['country']['names']['en'])
        return c
    def state1(i):
        location = reader.get(i)
        s=(location['subdivisions'][0]['names']['en'])
        return s
    def city1(i):
        location = reader.get(i)
        city=location['city']['names']['en']
        return city
    def pn_country(i):
        import phonenumbers
        import pycountry
        from phonenumbers.phonenumberutil import (
        region_code_for_country_code,
        region_code_for_number,)
        pn = phonenumbers.parse('+'+i)   
        country = pycountry.countries.get(alpha_2=region_code_for_number(pn))
        con=country.name
        return con

    ip=df['ip_address'].tolist()
    phone_number=df['contact_number'].tolist()
    Parents_Name=df['Parents_Name'].tolist()
    Parents_Email=df.Parents_Email.tolist()
    School_Name=df['name'].tolist()
    state=df['state'].tolist()
    country=df['country'].tolist()
    city=df['city'].tolist()
    sign_up_date=df['Sign_Up_Date'].tolist()
    last_prac_date=df['Last_Practice_Date'].tolist()
    last_login_date=df['Last_Login_Date'].tolist()
    practice_count=df['Practice_Count'].tolist()
    mindful_minutes=df['mindful_minutes'].tolist()

    for i in range(len(ip)):

        if country[i] is None:
            try:
                country[i]=country1(ip[i])
            except:
                pass
        elif country[i]=='null':
            try:
                country[i]=country1(ip[i])
            except:
                pass
        if city[i] is None:
            try:
                city[i]=city1(ip[i])
            except:
                pass
        elif city[i]=='null':
            try:
                city[i]=city1(ip[i])
            except:
                pass
        if state[i] is None:

            try:
                state[i]=state1(ip[i])
            except:
                pass
        elif state[i] =='NO state info':

            try:
                state[i]=state1(ip[i])
            except:
                pass    
        if country[i] is None:
            try:
                country[i]=pn_country(phone_number[i])
            except:
                pass
        if country[i] is None:
            country[i]=''
        if state[i] is None:
            state[i]=''

        if  last_prac_date[i] != 'NO PRACTICE' :

            last_prac_date[i]=last_prac_date[i].strftime('%d %b %Y')
        else:

            last_prac_date[i]="NO PRACTICE"

        if  last_login_date[i] != 'NO LOGIN' :

            last_login_date[i]=last_login_date[i].strftime('%d %b %Y')
        else:

            last_login_date[i]="NO LOGIN"

        if sign_up_date[i] is not None:
            sign_up_date[i]=sign_up_date[i].strftime('%d %b %Y')

    state12 =  [each_string.lower() for each_string in state]
    cv={'pnn':Parents_Name,'pe':Parents_Email,'co':country,'pn':phone_number,'sn':School_Name,'ct':city,
                               'st':state12,'sp':sign_up_date,
                               'll':last_login_date,'lp':last_prac_date,'pc':practice_count}
    dftry = pd.DataFrame.from_dict(cv)
    dftry= dftry.drop("co", axis=1)
    
        
    return json.dumps({"data":dftry.values.tolist()})

@app.route('/graph1parents/<daate>')
def graph1_table(daate):
    reader = geolite2.reader()
    daate1=int(daate)/1000
    DATE1 =time.strftime('%y/%m/%d 00:00:00', time.localtime(daate1))
#   print(DATE1,"SELECTED DATE")
    datetime_object = datetime.strptime(DATE1, '%y/%m/%d %H:%M:%S')
    minus=datetime_object+ timedelta(hours=4)
    minus1 = minus.strftime("%Y-%m-%d %H:%M:%S")
    plus=minus +timedelta(hours=24)
    plus1 = plus.strftime("%Y-%m-%d %H:%M:%S")
    db = mysql.connector.connect(
        host="52.35.73.200",
        user="ieuser",
        passwd="mijyBg96wtdDSAB5",
        database="compass")



    query="""select sm.id,sm.name,um.USER_ID as Parents_Id,um.USER_NAME as Parents_Name,up.ip_address,um.contact_number,
    sm.city,sm.state,sm.country,um.EMAIL_ID as Parents_Email,um.user_type,
    count(atd.USER_ID) as Practice_Count,max(atd.modified_date) as Last_Practice_Date,um.created_date as Sign_Up_Date,
    ll.LAST_LOGGED_IN as Last_Login_Date,
    round((sum(atd.CURSOR_END)-sum(atd.CURSOR_START))/60) as mindful_minutes
    from user_master as um left join user_profile as up
    on um.user_id=up.user_id
    left join audio_track_detail as atd on atd.USER_ID=um.USER_ID
    left join school_master as sm on sm.id=up.SCHOOL_ID
    left join login_logs as ll on ll.USER_ID=um.USER_ID
    where um.ROLE_ID=3 and um.created_date >  '"""+minus1+"""' and um.created_date <'"""+plus1+"""' and  um.email_id not like '%test%' and um.IS_DISABLED !='Y' and um.INCOMPLETE_SIGNUP !='Y'  and 
    um.email_id not like '%1gen%' and um.user_name not like '%test%' and um.user_name not like '%1gen%' and um.email_id <>''
    group by um.user_id;"""


    df=pd.read_sql(query, con=db)
  
    df.mindful_minutes=df.mindful_minutes.fillna(0)
    df.mindful_minutes=df.mindful_minutes.astype('int64')
    df['Last_Practice_Date']=pd.to_datetime(df['Last_Practice_Date'])
    df['Last_Practice_Date'].fillna("NO PRACTICE", inplace=True)
    df['Last_Login_Date']=pd.to_datetime(df['Last_Login_Date'])
    df['Last_Login_Date'].fillna("NO LOGIN", inplace=True)
    df['Sign_Up_Date']=pd.to_datetime(df['Sign_Up_Date'])
    df['name'].fillna("NO SCHOOL INFO", inplace=True)
    def country1(i):
        location = reader.get(i)
        c=(location['country']['names']['en'])
        return c
    def state1(i):
        location = reader.get(i)
        s=(location['subdivisions'][0]['names']['en'])
        return s
    
    def city1(i):
        location = reader.get(i)
        city=location['city']['names']['en']
        return city
    
    def pn_country(i):
        import phonenumbers
        import pycountry
        from phonenumbers.phonenumberutil import (
        region_code_for_country_code,
        region_code_for_number,)
        pn = phonenumbers.parse('+'+i)   
        country = pycountry.countries.get(alpha_2=region_code_for_number(pn))
        con=country.name
        return con

    ip=df['ip_address'].tolist()
    phone_number=df['contact_number'].tolist()
    Parents_Name=df['Parents_Name'].tolist()
    Parents_Email=df.Parents_Email.tolist()
    School_Name=df['name'].tolist()
    state=df['state'].tolist()
    country=df['country'].tolist()
    city=df['city'].tolist()
    sign_up_date=df['Sign_Up_Date'].tolist()
    last_prac_date=df['Last_Practice_Date'].tolist()
    last_login_date=df['Last_Login_Date'].tolist()
    practice_count=df['Practice_Count'].tolist()
    mindful_minutes=df['mindful_minutes'].tolist()

    for i in range(len(ip)):

        if country[i] is None:
            try:
                country[i]=country1(ip[i])
            except:
                pass
        elif country[i]=='null':
            try:
                country[i]=country1(ip[i])
            except:
                pass
        if city[i] is None:
            try:
                city[i]=city1(ip[i])
            except:
                pass
        elif city[i]=='null':
            try:
                city[i]=city1(ip[i])
            except:
                pass
        if state[i] is None:

            try:
                state[i]=state1(ip[i])
            except:
                pass
        elif state[i] =='NO state info':

            try:
                state[i]=state1(ip[i])
            except:
                pass    
        if country[i] is None:
            try:
                country[i]=pn_country(phone_number[i])
            except:
                pass
        if country[i] is None:
            country[i]=''
        if state[i] is None:
            state[i]=''
        if  last_prac_date[i] != 'NO PRACTICE' :

            last_prac_date[i]=(last_prac_date[i]- timedelta(hours=4)).strftime('%d %b %Y')
        else:

            last_prac_date[i]="NO PRACTICE"

        if  last_login_date[i] != 'NO LOGIN' :

            last_login_date[i]=(last_login_date[i]- timedelta(hours=4)).strftime('%d %b %Y')
            
        else:

            last_login_date[i]="NO LOGIN"

        if sign_up_date[i] is not None:
            
            sign_up_date[i]=(sign_up_date[i]- timedelta(hours=4)).strftime('%d %b %Y')
#             print(sign_up_date[i])

    state12 =  [each_string.lower() for each_string in state]
    cv={'pnn':Parents_Name,'pe':Parents_Email,'co':country,'pn':phone_number,'sn':School_Name,'ct':city,
                               'st':state12,'sp':sign_up_date,
                               'll':last_login_date,'lp':last_prac_date,'pc':practice_count}
    dftry = pd.DataFrame.from_dict(cv)
    dftry= dftry.drop("co", axis=1)
    
        
    return json.dumps({"data":dftry.values.tolist()})



@app.route('/logparents')
def logparents_table():

    reader = geolite2.reader()

    db = mysql.connector.connect(
        host="52.35.73.200",
        user="ieuser",
        passwd="mijyBg96wtdDSAB5",
        database="compass")



    query="""select sm.id,sm.name,um.USER_ID as Parents_Id,um.USER_NAME as Parents_Name,up.ip_address,um.contact_number,
    sm.city,sm.state,sm.country,um.EMAIL_ID as Parents_Email,um.user_type,
    count(atd.USER_ID) as Practice_Count,max(date(atd.modified_date)) as Last_Practice_Date,date(um.created_date) Sign_Up_Date,
    max(date(ll.LAST_LOGGED_IN)) as Last_Login_Date,
    round((sum(atd.CURSOR_END)-sum(atd.CURSOR_START))/60) as mindful_minutes
    from user_master as um left join user_profile as up
    on um.user_id=up.user_id
    left join audio_track_detail as atd on atd.USER_ID=um.USER_ID
    left join school_master as sm on sm.id=up.SCHOOL_ID
    inner join login_logs as ll on ll.USER_ID=um.USER_ID
    where um.ROLE_ID=3 and date(um.created_date)>'2020-03-17'  AND um.IS_DISABLED !='Y' and um.INCOMPLETE_SIGNUP !='Y' and um.email_id not like '%test%' and 
    um.email_id not like '%1gen%' and um.user_name not like '%test%' and um.user_name not like '%1gen%' and um.email_id <>''
    group by um.user_id;"""


    df=pd.read_sql(query, con=db)
  
    df.mindful_minutes=df.mindful_minutes.fillna(0)
    df.mindful_minutes=df.mindful_minutes.astype('int64')
    df['Last_Practice_Date']=pd.to_datetime(df['Last_Practice_Date'])
    df['Last_Practice_Date'].fillna("NO PRACTICE", inplace=True)
    df['Last_Login_Date']=pd.to_datetime(df['Last_Login_Date'])
    df['Last_Login_Date'].fillna("NO LOGIN", inplace=True)
    df['Sign_Up_Date']=pd.to_datetime(df['Sign_Up_Date'])
    df['name'].fillna("NO SCHOOL INFO", inplace=True)
    def country1(i):
        location = reader.get(i)
        c=(location['country']['names']['en'])
        return c
    def state1(i):
        location = reader.get(i)
        s=(location['subdivisions'][0]['names']['en'])
        return s
    def city1(i):
        location = reader.get(i)
        city=location['city']['names']['en']
        return city
    def pn_country(i):
        import phonenumbers
        import pycountry
        from phonenumbers.phonenumberutil import (
        region_code_for_country_code,
        region_code_for_number,)
        pn = phonenumbers.parse('+'+i)   
        country = pycountry.countries.get(alpha_2=region_code_for_number(pn))
        con=country.name
        return con

    ip=df['ip_address'].tolist()
    phone_number=df['contact_number'].tolist()
    Parents_Name=df['Parents_Name'].tolist()
    Parents_Email=df.Parents_Email.tolist()
    School_Name=df['name'].tolist()
    state=df['state'].tolist()
    country=df['country'].tolist()
    city=df['city'].tolist()
    sign_up_date=df['Sign_Up_Date'].tolist()
    last_prac_date=df['Last_Practice_Date'].tolist()
    last_login_date=df['Last_Login_Date'].tolist()
    practice_count=df['Practice_Count'].tolist()
    mindful_minutes=df['mindful_minutes'].tolist()

    for i in range(len(ip)):

        if country[i] is None:
            try:
                country[i]=country1(ip[i])
            except:
                pass
        elif country[i]=='null':
            try:
                country[i]=country1(ip[i])
            except:
                pass
        if city[i] is None:
            try:
                city[i]=city1(ip[i])
            except:
                pass
        elif city[i]=='null':
            try:
                city[i]=city1(ip[i])
            except:
                pass
        if state[i] is None:

            try:
                state[i]=state1(ip[i])
            except:
                pass
        elif state[i] =='NO state info':

            try:
                state[i]=state1(ip[i])
            except:
                pass    
        if country[i] is None:
            try:
                country[i]=pn_country(phone_number[i])
            except:
                pass
        if country[i] is None:
            country[i]=''
        if state[i] is None:
            state[i]=''

        if  last_prac_date[i] != 'NO PRACTICE' :

            last_prac_date[i]=last_prac_date[i].strftime('%d %b %Y')
        else:

            last_prac_date[i]="NO PRACTICE"

        if  last_login_date[i] != 'NO LOGIN' :

            last_login_date[i]=last_login_date[i].strftime('%d %b %Y')
        else:

            last_login_date[i]="NO LOGIN"

        if sign_up_date[i] is not None:
            sign_up_date[i]=sign_up_date[i].strftime('%d %b %Y')

    state12 =  [each_string.lower() for each_string in state]
    cv={'pnn':Parents_Name,'pe':Parents_Email,'co':country,'pn':phone_number,'sn':School_Name,'ct':city,
                               'st':state12,'sp':sign_up_date,
                               'll':last_login_date,'lp':last_prac_date,'pc':practice_count}
    dftry = pd.DataFrame.from_dict(cv)
    dftry= dftry.drop("co", axis=1)
    
        
    return json.dumps({"data":dftry.values.tolist()})
@app.route('/pracparents')
def pracparents_table():

    reader = geolite2.reader()

    db = mysql.connector.connect(
        host="52.35.73.200",
        user="ieuser",
        passwd="mijyBg96wtdDSAB5",
        database="compass")



    query="""select sm.id,sm.name,um.USER_ID as Parents_Id,um.USER_NAME as Parents_Name,up.ip_address,um.contact_number,
    sm.city,sm.state,sm.country,um.EMAIL_ID as Parents_Email,um.user_type,
    count(atd.USER_ID) as Practice_Count,max(date(atd.modified_date)) as Last_Practice_Date,date(um.created_date) Sign_Up_Date,
    max(date(ll.LAST_LOGGED_IN)) as Last_Login_Date,
    round((sum(atd.CURSOR_END)-sum(atd.CURSOR_START))/60) as mindful_minutes
    from user_master as um left join user_profile as up
    on um.user_id=up.user_id
    inner join audio_track_detail as atd on atd.USER_ID=um.USER_ID
    left join school_master as sm on sm.id=up.SCHOOL_ID
    left join login_logs as ll on ll.USER_ID=um.USER_ID
    where um.ROLE_ID=3 and date(um.created_date)>'2020-03-17'  AND um.IS_DISABLED !='Y' and um.INCOMPLETE_SIGNUP !='Y' and um.email_id not like '%test%' and 
    um.email_id not like '%1gen%' and um.user_name not like '%test%' and um.user_name not like '%1gen%' and um.email_id <>''
    group by um.user_id;"""


    df=pd.read_sql(query, con=db)
  
    df.mindful_minutes=df.mindful_minutes.fillna(0)
    df.mindful_minutes=df.mindful_minutes.astype('int64')
    df['Last_Practice_Date']=pd.to_datetime(df['Last_Practice_Date'])
    df['Last_Practice_Date'].fillna("NO PRACTICE", inplace=True)
    df['Last_Login_Date']=pd.to_datetime(df['Last_Login_Date'])
    df['Last_Login_Date'].fillna("NO LOGIN", inplace=True)
    df['Sign_Up_Date']=pd.to_datetime(df['Sign_Up_Date'])
    df['name'].fillna("NO SCHOOL INFO", inplace=True)
    def country1(i):
        location = reader.get(i)
        c=(location['country']['names']['en'])
        return c
    def state1(i):
        location = reader.get(i)
        s=(location['subdivisions'][0]['names']['en'])
        return s
    def city1(i):
        location = reader.get(i)
        city=location['city']['names']['en']
        return city
    def pn_country(i):
        import phonenumbers
        import pycountry
        from phonenumbers.phonenumberutil import (
        region_code_for_country_code,
        region_code_for_number,)
        pn = phonenumbers.parse('+'+i)   
        country = pycountry.countries.get(alpha_2=region_code_for_number(pn))
        con=country.name
        return con

    ip=df['ip_address'].tolist()
    phone_number=df['contact_number'].tolist()
    Parents_Name=df['Parents_Name'].tolist()
    Parents_Email=df.Parents_Email.tolist()
    School_Name=df['name'].tolist()
    state=df['state'].tolist()
    country=df['country'].tolist()
    city=df['city'].tolist()
    sign_up_date=df['Sign_Up_Date'].tolist()
    last_prac_date=df['Last_Practice_Date'].tolist()
    last_login_date=df['Last_Login_Date'].tolist()
    practice_count=df['Practice_Count'].tolist()
    mindful_minutes=df['mindful_minutes'].tolist()

    for i in range(len(ip)):

        if country[i] is None:
            try:
                country[i]=country1(ip[i])
            except:
                pass
        elif country[i]=='null':
            try:
                country[i]=country1(ip[i])
            except:
                pass
        if city[i] is None:
            try:
                city[i]=city1(ip[i])
            except:
                pass
        elif city[i]=='null':
            try:
                city[i]=city1(ip[i])
            except:
                pass
        if state[i] is None:

            try:
                state[i]=state1(ip[i])
            except:
                pass
        elif state[i] =='NO state info':

            try:
                state[i]=state1(ip[i])
            except:
                pass    
        if country[i] is None:
            try:
                country[i]=pn_country(phone_number[i])
            except:
                pass
        if country[i] is None:
            country[i]=''
        if state[i] is None:
            state[i]=''

        if  last_prac_date[i] != 'NO PRACTICE' :

            last_prac_date[i]=last_prac_date[i].strftime('%d %b %Y')
        else:

            last_prac_date[i]="NO PRACTICE"

        if  last_login_date[i] != 'NO LOGIN' :

            last_login_date[i]=last_login_date[i].strftime('%d %b %Y')
        else:

            last_login_date[i]="NO LOGIN"

        if sign_up_date[i] is not None:
            sign_up_date[i]=sign_up_date[i].strftime('%d %b %Y')

    state12 =  [each_string.lower() for each_string in state]
    cv={'pnn':Parents_Name,'pe':Parents_Email,'co':country,'pn':phone_number,'sn':School_Name,'ct':city,
                               'st':state12,'sp':sign_up_date,
                               'll':last_login_date,'lp':last_prac_date,'pc':practice_count}
    dftry = pd.DataFrame.from_dict(cv)
    dftry= dftry.drop("co", axis=1)
    
        
    return json.dumps({"data":dftry.values.tolist()})

@app.route('/paroverall')
def parents_table():

    reader = geolite2.reader()

    db = mysql.connector.connect(
        host="52.35.73.200",
        user="ieuser",
        passwd="mijyBg96wtdDSAB5",
        database="compass")



    query="""select sm.id,sm.name,um.USER_ID as Parents_Id,um.USER_NAME as Parents_Name,up.ip_address,um.contact_number,
    sm.city,sm.state,sm.country,um.EMAIL_ID as Parents_Email,um.user_type,
    count(atd.USER_ID) as Practice_Count,max(date(atd.modified_date)) as Last_Practice_Date,date(um.created_date) Sign_Up_Date,
    max(date(ll.LAST_LOGGED_IN)) as Last_Login_Date,
    round((sum(atd.CURSOR_END)-sum(atd.CURSOR_START))/60) as mindful_minutes
    from user_master as um left join user_profile as up
    on um.user_id=up.user_id
    left join audio_track_detail as atd on atd.USER_ID=um.USER_ID
    left join school_master as sm on sm.id=up.SCHOOL_ID
    left join login_logs as ll on ll.USER_ID=um.USER_ID
    where um.ROLE_ID=3 and date(um.created_date)>'2020-03-17'  AND um.IS_DISABLED !='Y' and um.INCOMPLETE_SIGNUP !='Y' and um.email_id not like '%test%' and 
    um.email_id not like '%1gen%' and um.user_name not like '%test%' and um.user_name not like '%1gen%' and um.email_id <>''
    group by um.user_id;"""


    df=pd.read_sql(query, con=db)
  
    df.mindful_minutes=df.mindful_minutes.fillna(0)
    df.mindful_minutes=df.mindful_minutes.astype('int64')
    df['Last_Practice_Date']=pd.to_datetime(df['Last_Practice_Date'])
    df['Last_Practice_Date'].fillna("NO PRACTICE", inplace=True)
    df['Last_Login_Date']=pd.to_datetime(df['Last_Login_Date'])
    df['Last_Login_Date'].fillna("NO LOGIN", inplace=True)
    df['Sign_Up_Date']=pd.to_datetime(df['Sign_Up_Date'])
    df['name'].fillna("NO SCHOOL INFO", inplace=True)
    def country1(i):
        location = reader.get(i)
        c=(location['country']['names']['en'])
        return c
    def state1(i):
        location = reader.get(i)
        s=(location['subdivisions'][0]['names']['en'])
        return s
    def city1(i):
        location = reader.get(i)
        city=location['city']['names']['en']
        return city
    def pn_country(i):
        import phonenumbers
        import pycountry
        from phonenumbers.phonenumberutil import (
        region_code_for_country_code,
        region_code_for_number,)
        pn = phonenumbers.parse('+'+i)   
        country = pycountry.countries.get(alpha_2=region_code_for_number(pn))
        con=country.name
        return con

    ip=df['ip_address'].tolist()
    phone_number=df['contact_number'].tolist()
    Parents_Name=df['Parents_Name'].tolist()
    Parents_Email=df.Parents_Email.tolist()
    School_Name=df['name'].tolist()
    state=df['state'].tolist()
    country=df['country'].tolist()
    city=df['city'].tolist()
    sign_up_date=df['Sign_Up_Date'].tolist()
    last_prac_date=df['Last_Practice_Date'].tolist()
    last_login_date=df['Last_Login_Date'].tolist()
    practice_count=df['Practice_Count'].tolist()
    mindful_minutes=df['mindful_minutes'].tolist()

    for i in range(len(ip)):

        if country[i] is None:
            try:
                country[i]=country1(ip[i])
            except:
                pass
        elif country[i]=='null':
            try:
                country[i]=country1(ip[i])
            except:
                pass
        if city[i] is None:
            try:
                city[i]=city1(ip[i])
            except:
                pass
        elif city[i]=='null':
            try:
                city[i]=city1(ip[i])
            except:
                pass
        if state[i] is None:

            try:
                state[i]=state1(ip[i])
            except:
                pass
        elif state[i] =='NO state info':

            try:
                state[i]=state1(ip[i])
            except:
                pass    
        if country[i] is None:
            try:
                country[i]=pn_country(phone_number[i])
            except:
                pass
        if country[i] is None:
            country[i]=''
        if state[i] is None:
            state[i]=''

        if  last_prac_date[i] != 'NO PRACTICE' :

            last_prac_date[i]=last_prac_date[i].strftime('%d %b %Y')
        else:

            last_prac_date[i]="NO PRACTICE"

        if  last_login_date[i] != 'NO LOGIN' :

            last_login_date[i]=last_login_date[i].strftime('%d %b %Y')
        else:

            last_login_date[i]="NO LOGIN"

        if sign_up_date[i] is not None:
            sign_up_date[i]=sign_up_date[i].strftime('%d %b %Y')

    state12 =  [each_string.lower() for each_string in state]
    cv={'pnn':Parents_Name,'pe':Parents_Email,'co':country,'pn':phone_number,'sn':School_Name,'ct':city,
                               'st':state12,'sp':sign_up_date,
                               'll':last_login_date,'lp':last_prac_date,'pc':practice_count}
    dftry = pd.DataFrame.from_dict(cv)
    dftry= dftry.drop("co", axis=1)
    
        
    return json.dumps({"data":dftry.values.tolist()})

@app.route('/sarasotacount')
def sarasotacount():
    db = mysql.connector.connect(
    host="52.35.73.200",
    user="ieuser",
    passwd="mijyBg96wtdDSAB5",
    database="compass")
    q1="""select  up.SCHOOL_ID,sm.name,sm.country,sm.state,up.IP_ADDRESS,um.USER_ID as Parent_id,um.USER_NAME as Parent_Name,um.EMAIL_ID as Parents_Email,um.contact_number,
    um.ROLE_TYPE,um.USER_TYPE,count(atd.USER_ID) as Practice_Count,date(um.created_date) as signup_date, ll.LAST_LOGGED_IN as login_date ,count(ll.USER_ID) as logcount,round((sum(atd.CURSOR_END)-sum(atd.CURSOR_START))/60) as mindful_minutes
    from user_master as um left join user_profile as up on up.USER_ID=um.USER_ID
    left join school_master as sm on sm.id=up.SCHOOL_ID
    left join audio_track_detail as atd on atd.USER_ID=um.USER_ID
    left join login_logs as ll on ll.USER_ID=um.USER_ID
    where  um.ROLE_ID=3  and DATE(um.CREATED_DATE) > '2020-03-17'  AND um.IS_DISABLED !='Y' and um.INCOMPLETE_SIGNUP !='Y' and um.user_type like "%sarasota%" and um.USER_NAME not like '%test%' and um.EMAIL_ID not like '%1gen%' and um.USER_NAME not like '%1gen%' and um.EMAIL_ID not like '%test%'   and um.EMAIL_ID !=   " "  
    group by um.user_id"""
    df=pd.read_sql(q1, con=db)
#     print(sum(df['Practice_Count'].tolist()))
    mm=df['mindful_minutes'].fillna(0)
    mmc=int(sum(mm))
    famiam=len(df[df['USER_TYPE']=='FAMILY IAMPRESENT'])
    total_parents=len(df['Parent_id'])
    total_login=len(df[df['logcount']>0])
    total_practice=len(df[df['Practice_Count']>0])
    pracparentsper=round((total_practice/total_login)*100)
    
    total_downloads=round(total_parents*.95)
    downloadper=round((total_downloads/total_parents)*100)
    loginparentsper=round((total_login/total_downloads)*100)
    print(loginparentsper,"loginper")
    ios=round(total_downloads*0.60)
    android=round(total_downloads*0.40)
    famiamper=round((famiam/total_parents)*100)
    temp={"download":[str(total_downloads)],"downloadper":[str(downloadper)],"android":[str(android)],"ios":[str(ios)],"famiamper":[str(famiamper)],"loginparentsper":[str(loginparentsper)],"pracparentsper":[str(pracparentsper)],'famiam':[str(famiam)],'playback':[str(sum(df['Practice_Count'].tolist()))],'totalparents':[str(total_parents)],'pracparents':[str(total_practice)],'loginparents':[str(total_login)],'mindful_minutes': [str(mmc)]}
    return json.dumps(temp)

@app.route('/parcount')
def parcount():
    db = mysql.connector.connect(
    host="52.35.73.200",
    user="ieuser",
    passwd="mijyBg96wtdDSAB5",
    database="compass")
    q1="""select  up.SCHOOL_ID,sm.name,sm.country,sm.state,up.IP_ADDRESS,um.USER_ID as Parent_id,um.USER_NAME as Parent_Name,um.EMAIL_ID as Parents_Email,um.contact_number,
    um.ROLE_TYPE,um.USER_TYPE,count(atd.USER_ID) as Practice_Count,date(um.created_date) as signup_date, ll.LAST_LOGGED_IN as login_date ,count(ll.USER_ID) as logcount,round((sum(atd.CURSOR_END)-sum(atd.CURSOR_START))/60) as mindful_minutes
    from user_master as um left join user_profile as up on up.USER_ID=um.USER_ID
    left join school_master as sm on sm.id=up.SCHOOL_ID
    left join audio_track_detail as atd on atd.USER_ID=um.USER_ID
    left join login_logs as ll on ll.USER_ID=um.USER_ID
    where  um.ROLE_ID=3  and DATE(um.CREATED_DATE) > '2020-03-17'  AND um.IS_DISABLED !='Y' and um.INCOMPLETE_SIGNUP !='Y' and um.USER_NAME not like '%test%' and um.EMAIL_ID not like '%1gen%' and um.USER_NAME not like '%1gen%' and um.EMAIL_ID not like '%test%'   and um.EMAIL_ID !=   " "  
    group by um.user_id"""
    df=pd.read_sql(q1, con=db)
#     print(sum(df['Practice_Count'].tolist()))
    mm=df['mindful_minutes'].fillna(0)
    mmc=int(sum(mm))
    famiam=len(df[df['USER_TYPE']=='FAMILY IAMPRESENT'])
    total_parents=len(df['Parent_id'])
    total_login=len(df[df['logcount']>0])
    total_practice=len(df[df['Practice_Count']>0])
    pracparentsper=round((total_practice/total_login)*100)
    
    total_downloads=round(total_parents*.95)
    downloadper=round((total_downloads/total_parents)*100)
    loginparentsper=round((total_login/total_downloads)*100)
    print(loginparentsper,"loginper")
    ios=round(total_downloads*0.60)
    android=round(total_downloads*0.40)
    famiamper=round((famiam/total_parents)*100)
    temp={"download":[str(total_downloads)],"downloadper":[str(downloadper)],"android":[str(android)],"ios":[str(ios)],"famiamper":[str(famiamper)],"loginparentsper":[str(loginparentsper)],"pracparentsper":[str(pracparentsper)],'famiam':[str(famiam)],'playback':[str(sum(df['Practice_Count'].tolist()))],'totalparents':[str(total_parents)],'pracparents':[str(total_practice)],'loginparents':[str(total_login)],'mindful_minutes': [str(mmc)]}
    return json.dumps(temp)

@app.route('/parsignups')

def parsignup():
    
    db = mysql.connector.connect(
    host="52.35.73.200",
    user="ieuser",
    passwd="mijyBg96wtdDSAB5",
    database="compass")
    q1="""select um.created_date as sign_up
        from user_master as um left join user_profile as up on up.USER_ID=um.USER_ID
        left join school_master as sm on sm.id=up.SCHOOL_ID
        left join audio_track_detail as atd on atd.USER_ID=um.USER_ID
        where  um.ROLE_ID=3  and DATE(um.CREATED_DATE) > '2020-03-17' and um.user_name not like "%test%"  AND um.IS_DISABLED !='Y' and um.INCOMPLETE_SIGNUP !='Y' AND
        um.EMAIL_ID NOT LIKE "%TEST%" AND um.EMAIL_ID NOT LIKE "%1gen%" AND um.EMAIL_ID <> ""
        group by um.user_id"""
    df1=pd.read_sql(q1, con=db)
    df1['sign_upn'] = pd.to_datetime(df1['sign_up']) - timedelta(hours=4)
    df2 = df1.groupby([df1['sign_upn'].dt.date]).count()
    cdate=[]
    for i in df2.index:
        x=i.strftime('%s')
        cdate.append(float(x)*1000)
    count=[]
    for i in df2['sign_up'] :
        count.append(i)
    df3 = pd.DataFrame(list(zip(cdate,count)), 
                       columns =['date', 'count']) 
    data = df3.values.tolist()
    return json.dumps(data)


@app.route('/sarasotasignup')
def sarasotasignupnew():
    
    db = mysql.connector.connect(
    host="52.35.73.200",
    user="ieuser",
    passwd="mijyBg96wtdDSAB5",
    database="compass")
    q1="""select um.created_date as sign_up
        from user_master as um left join user_profile as up on up.USER_ID=um.USER_ID
        left join school_master as sm on sm.id=up.SCHOOL_ID
        left join audio_track_detail as atd on atd.USER_ID=um.USER_ID
        where  um.ROLE_ID=3  and DATE(um.CREATED_DATE) > '2020-03-17' and um.user_type like "%sarasota%" and um.user_name not like "%test%"  AND um.IS_DISABLED !='Y' and um.INCOMPLETE_SIGNUP !='Y' and um.user_name not like "%test%"  AND
        um.EMAIL_ID NOT LIKE "%TEST%" AND um.EMAIL_ID NOT LIKE "%1gen%" AND um.EMAIL_ID <> ""
        group by um.user_id"""
    df1=pd.read_sql(q1, con=db)
    df1['sign_upn'] = pd.to_datetime(df1['sign_up']) - timedelta(hours=4)
    df2 = df1.groupby([df1['sign_upn'].dt.date]).count()
    
    cdate=[]
    for i in df2.index:
        x=i.strftime('%s')
        cdate.append(float(x)*1000)
    count=[]
    for i in df2['sign_up'] :
        count.append(i)
    count1=np.cumsum(count)
    df3 = pd.DataFrame(list(zip(cdate,count)), 
                       columns =['date', 'count']) 
    df4 = pd.DataFrame(list(zip(cdate,count1)), 
                       columns =['date', 'count'])
    data = df3.values.tolist()
    data1 = df4.values.tolist()
    return json.dumps({"bar":data,"line":data1})



@app.route('/parsignupsnew')
def parsignupnew():
    
    db = mysql.connector.connect(
    host="52.35.73.200",
    user="ieuser",
    passwd="mijyBg96wtdDSAB5",
    database="compass")
    q1="""select um.created_date as sign_up
        from user_master as um left join user_profile as up on up.USER_ID=um.USER_ID
        left join school_master as sm on sm.id=up.SCHOOL_ID
        left join audio_track_detail as atd on atd.USER_ID=um.USER_ID
        where  um.ROLE_ID=3  and DATE(um.CREATED_DATE) > '2020-03-17' and um.user_name not like "%test%"  AND um.IS_DISABLED !='Y' and um.INCOMPLETE_SIGNUP !='Y' and um.user_name not like "%test%"  AND
        um.EMAIL_ID NOT LIKE "%TEST%" AND um.EMAIL_ID NOT LIKE "%1gen%" AND um.EMAIL_ID <> ""
        group by um.user_id"""
    df1=pd.read_sql(q1, con=db)
    df1['sign_upn'] = pd.to_datetime(df1['sign_up']) - timedelta(hours=4)
    df2 = df1.groupby([df1['sign_upn'].dt.date]).count()
    
    cdate=[]
    for i in df2.index:
        x=i.strftime('%s')
        cdate.append(float(x)*1000)
    count=[]
    for i in df2['sign_up'] :
        count.append(i)
    count1=np.cumsum(count)
    df3 = pd.DataFrame(list(zip(cdate,count)), 
                       columns =['date', 'count']) 
    df4 = pd.DataFrame(list(zip(cdate,count1)), 
                       columns =['date', 'count'])
    data = df3.values.tolist()
    data1 = df4.values.tolist()
    return json.dumps({"bar":data,"line":data1})



@app.route('/fair')
def fair():
    db = mysql.connector.connect(
    host="52.35.73.200",
    user="ieuser",
    passwd="mijyBg96wtdDSAB5",
    database="compass")
    qr="""SELECT um.USER_ID,um.CONTACT_NUMBER,um.EMAIL_ID,um.USER_NAME,um.USER_TYPE,sm.name,count(atd.user_id) as 'COUNT' FROM user_master as um 
    left join user_profile as up on um.USER_ID=up.USER_ID
    left join school_master as sm on up.SCHOOL_ID=sm.ID
    left join audio_track_detail as atd on um.USER_ID=atd.USER_ID
    where um.USER_TYPE like '%Fairfield%'  and um.USER_NAME not like '%test%' and um.user_name not like "%test%"  AND um.IS_DISABLED !='Y' and um.INCOMPLETE_SIGNUP !='Y' and um.EMAIL_ID not like '%1gen%' and um.email_id <>''
    group by um.user_id"""
    df=pd.read_sql(qr, con=db)

    df1=df.groupby(['USER_TYPE'])['COUNT'].sum().reset_index()

    # print(df)
    links0 = df1.rename(columns={'USER_TYPE' : 'name', 'COUNT' : 'Practice_Count'}).to_dict('r')
    df2=df.groupby(['name'])['COUNT'].sum().reset_index()
    links1 = df2.rename(columns={'name' : 'name', 'COUNT' : 'Practice_Count'}).to_dict('r')
    df3=df[['EMAIL_ID','COUNT']]
    links2 = df3.rename(columns={'EMAIL_ID' : 'name', 'COUNT' : 'Practice_Count'}).to_dict('r')
    links0.extend(links1)
    links0.extend(links2)
    df4=df[['USER_TYPE','name']]
    df5= df4.drop_duplicates(subset='name', keep="first")
    links4 = df5.rename(columns={'USER_TYPE' : 'source', 'name' : 'target'}).to_dict('r')
    df6=df[['name','EMAIL_ID']]
    links3 = df6.rename(columns={'name' : 'source', 'EMAIL_ID' : 'target'}).to_dict('r')
    results=[]
    links0[0].update({'size':20})
    for i in links0[1:]:
        i.update({'size':10})
    for n in links3:
        for m in links4:
            if n['source']==m['target']:
                results.append(m)
            elif m not in results:
                results.append(n)
            else:
                results.append(n)
    res = [] 
    for i in results: 
        if i not in res: 
            res.append(i)


    temp={"nodes":links0,"links":res}
    return json.dumps(temp)


@app.route('/psignupu')
def psignu():
    db = mysql.connector.connect(host="52.35.73.200",    # your host, usually 
                     user="ieuser",         # your username
                     passwd="mijyBg96wtdDSAB5",  # your password
                     db="compass")
    q1="""
    select  um.USER_TYPE , count(distinct(um.USER_ID)) as parents_count ,count(distinct(atd.USER_ID)) as Practice_Count
    from user_master as um left join user_profile as up on up.USER_ID=um.USER_ID
    left join school_master as sm on sm.id=up.SCHOOL_ID
    left join audio_track_detail as atd on atd.USER_ID=um.USER_ID
    where  um.ROLE_ID=3  and DATE(um.CREATED_DATE) > '2020-03-17' and um.user_name not like "%test%"  AND
    um.EMAIL_ID NOT LIKE "%TEST%" AND um.EMAIL_ID NOT LIKE "%1gen%" and um.user_name not like "%test%"  AND um.IS_DISABLED !='Y' and um.INCOMPLETE_SIGNUP !='Y' and um.email_id <>'' and um.user_type not like "%family%" and um.user_type not like "%OTP BASED%" and um.user_type not like "%LG%"
    group by um.USER_TYPE order by parents_count asc"""
    df=pd.read_sql(q1, con=db)
#     print(df)
    parents_count=df['parents_count'].tolist()
    practice_count=df['Practice_Count'].tolist()
    user_type=df['USER_TYPE'].tolist()
    for i in range(len(user_type)):
        user_type[i] = user_type[i].upper()
#     sign_up=[]
#     for i in df['sign_up']:
#         sign_up.append(i.strftime("%d %b %Y "))
    data={'parents_count':parents_count,'practice_count':practice_count,'user_type':user_type}
    return json.dumps(data)
@app.route('/psignupw')
def psignw():
    db = mysql.connector.connect(host="52.35.73.200",    # your host, usually 
                     user="ieuser",         # your username
                     passwd="mijyBg96wtdDSAB5",  # your password
                     db="compass")
    q1="""
    select  date(um.created_date) as sign_up , count(distinct(um.USER_ID)) as parents_count ,count(atd.USER_ID) as Practice_Count
    from user_master as um left join user_profile as up on up.USER_ID=um.USER_ID
    left join school_master as sm on sm.id=up.SCHOOL_ID
    left join audio_track_detail as atd on atd.USER_ID=um.USER_ID
    where  um.ROLE_ID=3  and DATE(um.CREATED_DATE) > '2020-03-17' and um.user_name not like "%test%"  AND
    um.EMAIL_ID NOT LIKE "%TEST%" AND um.EMAIL_ID NOT LIKE "%1gen%" AND um.IS_DISABLED !='Y' and um.INCOMPLETE_SIGNUP !='Y' and sm.ID IS NULL and um.email_id <>''
    group by date(um.created_date)"""
    df=pd.read_sql(q1, con=db)
    #     print(df)
    parents_count=df['parents_count'].tolist()
    practice_count=df['Practice_Count'].tolist()
    sign_up=[]
    for i in df['sign_up']:
        sign_up.append(i.strftime("%d %b %Y "))
    data={'parents_count':parents_count,'practice_count':practice_count,'sign_up':sign_up}
    return json.dumps(data)


@app.route('/psignups')
def psigns():
    db = mysql.connector.connect(host="52.35.73.200",    # your host, usually 
                     user="ieuser",         # your username
                     passwd="mijyBg96wtdDSAB5",  # your password
                     db="compass")
    q1="""
    select  date(um.created_date) as sign_up , count(distinct(um.USER_ID)) as parents_count ,count(atd.USER_ID) as Practice_Count
    from user_master as um inner join user_profile as up on up.USER_ID=um.USER_ID
    inner join school_master as sm on sm.id=up.SCHOOL_ID
    left join audio_track_detail as atd on atd.USER_ID=um.USER_ID
    where  um.ROLE_ID=3  and DATE(um.CREATED_DATE) > '2020-03-17' and um.user_name not like "%test%" AND um.IS_DISABLED !='Y' and um.INCOMPLETE_SIGNUP !='Y' AND and um.email_id <>''
    um.EMAIL_ID NOT LIKE "%TEST%" AND um.EMAIL_ID NOT LIKE "%1gen%" 
    group by date(um.created_date)"""
    df=pd.read_sql(q1, con=db)
    parents_count=df['parents_count'].tolist()
    practice_count=df['Practice_Count'].tolist()
    sign_up=[]
    for i in df['sign_up']:
        sign_up.append(i.strftime("%d %b %Y "))
    data={'parents_count':parents_count,'practice_count':practice_count,'sign_up':sign_up}
    return json.dumps(data)



@app.route('/psignup')
def psign():
    db = mysql.connector.connect(host="52.35.73.200",    # your host, usually 
                     user="ieuser",         # your username
                     passwd="mijyBg96wtdDSAB5",  # your password
                     db="compass")
    q1="""
    select  date(um.created_date) as sign_up , count(distinct(um.USER_ID)) as parents_count ,count(atd.USER_ID) as Practice_Count
    from user_master as um left join user_profile as up on up.USER_ID=um.USER_ID
    left join school_master as sm on sm.id=up.SCHOOL_ID
    left join audio_track_detail as atd on atd.USER_ID=um.USER_ID
    where  um.ROLE_ID=3  and DATE(um.CREATED_DATE) > '2020-03-17' and um.user_name not like "%test%"  AND  um.IS_DISABLED !='Y' and um.INCOMPLETE_SIGNUP !='Y' and
    um.EMAIL_ID NOT LIKE "%TEST%" AND um.EMAIL_ID NOT LIKE "%1gen%" and um.email_id <>''
    group by date(um.created_date)"""
    df=pd.read_sql(q1, con=db)
    parents_count=df['parents_count'].tolist()
    practice_count=df['Practice_Count'].tolist()
    sign_up=[]
    for i in df['sign_up']:
        sign_up.append(i.strftime("%d %b %Y "))
    data={'parents_count':parents_count,'practice_count':practice_count,'sign_up':sign_up}
    return json.dumps(data)

@app.route('/feedbackg1')
def feedbackg():
    db = mysql.connector.connect(host="34.214.24.229",    # your host, usually localhost
                         user="IE-tech",         # your username
                         passwd="IE-tech@2O2O",  # your password
                         db="compassJune") 


    q1="""select year(x.DATE1) as year1, monthname(x.DATE1) as month1, count(case when x.Rating like '5' then x.userid end) as '5 Star', count(case when x.Rating like '4' then x.userid end) as '4 Star', count(case when x.Rating like '3' then x.userid end) as '3 Star', count(case when x.Rating like '2' then x.userid end) as '2 Star', count(case when x.Rating like '1' then x.userid end) as '1 Star' from (select af.user as userid,af.RATING as Rating,af.MODIFIED_DATE as DATE1 from audio_feedback as af left join user_master as um on um.USER_ID=af.USER where  um.user_name not like '%TEST%' and um.IS_DISABLED != 'Y' and um.IS_BLOCKED != 'Y'  and um.INCOMPLETE_SIGNUP != 'Y' and um.role_id !=3 and (af.rating)<>0 and um.EMAIL_ID not like '%1gen%')x where year(x.DATE1) not like '%null%' group by 1,2;"""

    df=pd.read_sql(q1,con=db)

    df.columns=['Year','Month','5-Star','4-Star','3-Star','2-Star','1-Star']

    df_col_list=df.columns

    school_year=['August','September','October','November','December','January','February','March','April','May','June','July']

    i=df_col_list[2]
    j=df_col_list[3]
    k=df_col_list[4]
    l=df_col_list[5]
    m=df_col_list[6]

    five_star_total_16_17=df.iloc[2][i]+df.iloc[3][i]+df.iloc[4][i]
    four_star_total_16_17=df.iloc[2][j]+df.iloc[3][j]+df.iloc[4][j]
    three_star_total_16_17=df.iloc[2][k]+df.iloc[3][k]+df.iloc[4][k]
    two_star_total_16_17=df.iloc[2][l]+df.iloc[3][l]+df.iloc[4][l]
    one_star_total_16_17=df.iloc[2][m]+df.iloc[3][m]+df.iloc[4][m]

    five_star_total_17_18=df.iloc[0][i]+df.iloc[7][i]+df.iloc[6][i]+df.iloc[5][i]+df.iloc[1][i]+df.iloc[12][i]+df.iloc[11][i]+df.iloc[15][i]+df.iloc[8][i]+df.iloc[16][i]+df.iloc[14][i]+df.iloc[13][i]
    four_star_total_17_18=df.iloc[0][j]+df.iloc[7][j]+df.iloc[6][j]+df.iloc[5][j]+df.iloc[1][j]+df.iloc[12][j]+df.iloc[11][j]+df.iloc[15][j]+df.iloc[8][j]+df.iloc[16][j]+df.iloc[14][j]+df.iloc[13][j]
    three_star_total_17_18=df.iloc[0][k]+df.iloc[7][k]+df.iloc[6][k]+df.iloc[5][k]+df.iloc[1][k]+df.iloc[12][k]+df.iloc[11][k]+df.iloc[15][k]+df.iloc[8][k]+df.iloc[16][k]+df.iloc[14][k]+df.iloc[13][k]
    two_star_total_17_18=df.iloc[0][l]+df.iloc[7][l]+df.iloc[6][l]+df.iloc[5][l]+df.iloc[1][l]+df.iloc[12][l]+df.iloc[11][l]+df.iloc[15][l]+df.iloc[8][l]+df.iloc[16][l]+df.iloc[14][l]+df.iloc[13][l]
    one_star_total_17_18=df.iloc[0][m]+df.iloc[7][m]+df.iloc[6][m]+df.iloc[5][m]+df.iloc[1][m]+df.iloc[12][m]+df.iloc[11][m]+df.iloc[15][m]+df.iloc[8][m]+df.iloc[16][m]+df.iloc[14][m]+df.iloc[13][m]

    five_star_total_18_19=df.iloc[9][i]+df.iloc[19][i]+df.iloc[18][i]+df.iloc[17][i]+df.iloc[10][i]+df.iloc[24][i]+df.iloc[23][i]+df.iloc[27][i]+df.iloc[20][i]+df.iloc[28][i]+df.iloc[26][i]+df.iloc[25][i]
    four_star_total_18_19=df.iloc[9][j]+df.iloc[19][j]+df.iloc[18][j]+df.iloc[17][j]+df.iloc[10][j]+df.iloc[24][j]+df.iloc[23][j]+df.iloc[27][j]+df.iloc[20][j]+df.iloc[28][j]+df.iloc[26][j]+df.iloc[25][j]
    three_star_total_18_19=df.iloc[9][k]+df.iloc[19][k]+df.iloc[18][k]+df.iloc[17][k]+df.iloc[10][k]+df.iloc[24][k]+df.iloc[23][k]+df.iloc[27][k]+df.iloc[20][k]+df.iloc[28][k]+df.iloc[26][k]+df.iloc[25][k]
    two_star_total_18_19=df.iloc[9][l]+df.iloc[19][l]+df.iloc[18][l]+df.iloc[17][l]+df.iloc[10][l]+df.iloc[24][l]+df.iloc[23][l]+df.iloc[27][l]+df.iloc[20][l]+df.iloc[28][l]+df.iloc[26][l]+df.iloc[25][l]
    one_star_total_18_19=df.iloc[9][m]+df.iloc[19][m]+df.iloc[18][m]+df.iloc[17][m]+df.iloc[10][m]+df.iloc[24][m]+df.iloc[23][m]+df.iloc[27][m]+df.iloc[20][m]+df.iloc[28][m]+df.iloc[26][m]+df.iloc[25][m]

    five_star_total_19_20=df.iloc[21][i]+df.iloc[31][i]+df.iloc[30][i]+df.iloc[29][i]+df.iloc[22][i]+df.iloc[33][i]+df.iloc[32][i]+df.iloc[34][i]
    four_star_total_19_20=df.iloc[21][j]+df.iloc[31][j]+df.iloc[30][j]+df.iloc[29][j]+df.iloc[22][j]+df.iloc[33][j]+df.iloc[32][j]+df.iloc[34][j]
    three_star_total_19_20=df.iloc[21][k]+df.iloc[31][k]+df.iloc[30][k]+df.iloc[29][k]+df.iloc[22][k]+df.iloc[33][k]+df.iloc[32][k]+df.iloc[34][k]
    two_star_total_19_20=df.iloc[21][l]+df.iloc[31][l]+df.iloc[30][l]+df.iloc[29][l]+df.iloc[22][l]+df.iloc[33][l]+df.iloc[32][l]+df.iloc[34][l]
    one_star_total_19_20=df.iloc[21][m]+df.iloc[31][m]+df.iloc[30][m]+df.iloc[29][m]+df.iloc[22][m]+df.iloc[33][m]+df.iloc[32][m]+df.iloc[34][m]

    dictb={'Feedback1617':{'Rating':['5_Star','4_Star','3_Star','2_Star','1_Star'],'Count':[str(five_star_total_16_17),str(four_star_total_16_17),str(three_star_total_16_17),str(two_star_total_16_17),str(one_star_total_16_17)],'Total':[str(five_star_total_16_17+four_star_total_16_17+three_star_total_16_17+two_star_total_16_17+one_star_total_16_17)],
                             'Month':school_year,
                             'Count_5':['0','0','0','0','0','0','0','0','0',str(df.iloc[2][i]),str(df.iloc[3][i]),str(df.iloc[4][i])],
                             'Count_4':['0','0','0','0','0','0','0','0','0',str(df.iloc[2][j]),str(df.iloc[3][j]),str(df.iloc[4][j])],
                             'Count_3':['0','0','0','0','0','0','0','0','0',str(df.iloc[2][k]),str(df.iloc[3][k]),str(df.iloc[4][k])],
                             'Count_2':['0','0','0','0','0','0','0','0','0',str(df.iloc[2][l]),str(df.iloc[3][l]),str(df.iloc[4][l])],
                             'Count_1':['0','0','0','0','0','0','0','0','0',str(df.iloc[2][m]),str(df.iloc[3][m]),str(df.iloc[4][m])],
                             },
           'Feedback1718':{'Rating':['5_Star','4_Star','3_Star','2_Star','1_Star'],'Count':[str(five_star_total_17_18),str(four_star_total_17_18),str(three_star_total_17_18),str(two_star_total_17_18),str(one_star_total_17_18)],'Total':[str(five_star_total_17_18+four_star_total_17_18+three_star_total_17_18+two_star_total_17_18+one_star_total_17_18)],
                             'Month':school_year,
                             'Count_5':[str(df.iloc[0][i]),str(df.iloc[7][i]),str(df.iloc[6][i]),str(df.iloc[5][i]),str(df.iloc[1][i]),str(df.iloc[12][i]),str(df.iloc[11][i]),str(df.iloc[15][i]),str(df.iloc[8][i]),str(df.iloc[16][i]),str(df.iloc[14][i]),str(df.iloc[13][i])],
                             'Count_4':[str(df.iloc[0][j]),str(df.iloc[7][j]),str(df.iloc[6][j]),str(df.iloc[5][j]),str(df.iloc[1][j]),str(df.iloc[12][j]),str(df.iloc[11][j]),str(df.iloc[15][j]),str(df.iloc[8][j]),str(df.iloc[16][j]),str(df.iloc[14][j]),str(df.iloc[13][j])],
                             'Count_3':[str(df.iloc[0][k]),str(df.iloc[7][k]),str(df.iloc[6][k]),str(df.iloc[5][k]),str(df.iloc[1][k]),str(df.iloc[12][k]),str(df.iloc[11][k]),str(df.iloc[15][k]),str(df.iloc[8][k]),str(df.iloc[16][k]),str(df.iloc[14][k]),str(df.iloc[13][k])],
                             'Count_2':[str(df.iloc[0][l]),str(df.iloc[7][l]),str(df.iloc[6][l]),str(df.iloc[5][l]),str(df.iloc[1][l]),str(df.iloc[12][l]),str(df.iloc[11][l]),str(df.iloc[15][l]),str(df.iloc[8][l]),str(df.iloc[16][l]),str(df.iloc[14][l]),str(df.iloc[13][l])],
                             'Count_1':[str(df.iloc[0][m]),str(df.iloc[7][m]),str(df.iloc[6][m]),str(df.iloc[5][m]),str(df.iloc[1][m]),str(df.iloc[12][m]),str(df.iloc[11][m]),str(df.iloc[15][m]),str(df.iloc[8][m]),str(df.iloc[16][m]),str(df.iloc[14][m]),str(df.iloc[13][m])],
                             },
          'Feedback1819':{'Rating':['5_Star','4_Star','3_Star','2_Star','1_Star'],'Count':[str(five_star_total_18_19),str(four_star_total_18_19),str(three_star_total_18_19),str(two_star_total_18_19),str(one_star_total_18_19)],'Total':[str(five_star_total_18_19+four_star_total_18_19+three_star_total_18_19+two_star_total_18_19+one_star_total_18_19)],
                             'Month':school_year,
                             'Count_5':[str(df.iloc[9][i]),str(df.iloc[19][i]),str(df.iloc[18][i]),str(df.iloc[17][i]),str(df.iloc[10][i]),str(df.iloc[24][i]),str(df.iloc[23][i]),str(df.iloc[27][i]),str(df.iloc[20][i]),str(df.iloc[28][i]),str(df.iloc[26][i]),str(df.iloc[25][i])],
                             'Count_4':[str(df.iloc[9][j]),str(df.iloc[19][j]),str(df.iloc[18][j]),str(df.iloc[17][j]),str(df.iloc[10][j]),str(df.iloc[24][j]),str(df.iloc[23][j]),str(df.iloc[27][j]),str(df.iloc[20][j]),str(df.iloc[28][j]),str(df.iloc[26][j]),str(df.iloc[25][j])],
                             'Count_3':[str(df.iloc[9][k]),str(df.iloc[19][k]),str(df.iloc[18][k]),str(df.iloc[17][k]),str(df.iloc[10][k]),str(df.iloc[24][k]),str(df.iloc[23][k]),str(df.iloc[27][k]),str(df.iloc[20][k]),str(df.iloc[28][k]),str(df.iloc[26][k]),str(df.iloc[25][k])],
                             'Count_2':[str(df.iloc[9][l]),str(df.iloc[19][l]),str(df.iloc[18][l]),str(df.iloc[17][l]),str(df.iloc[10][l]),str(df.iloc[24][l]),str(df.iloc[23][l]),str(df.iloc[27][l]),str(df.iloc[20][l]),str(df.iloc[28][l]),str(df.iloc[26][l]),str(df.iloc[25][l])],
                             'Count_1':[str(df.iloc[9][m]),str(df.iloc[19][m]),str(df.iloc[18][m]),str(df.iloc[17][m]),str(df.iloc[10][m]),str(df.iloc[24][m]),str(df.iloc[23][m]),str(df.iloc[27][m]),str(df.iloc[20][m]),str(df.iloc[28][m]),str(df.iloc[26][m]),str(df.iloc[25][m])],
                             },
          'Feedback1920':{'Rating':['5_Star','4_Star','3_Star','2_Star','1_Star'],'Count':[str(five_star_total_19_20),str(four_star_total_19_20),str(three_star_total_19_20),str(two_star_total_19_20),str(one_star_total_19_20)],'Total':[str(five_star_total_19_20+four_star_total_19_20+three_star_total_19_20+two_star_total_19_20+one_star_total_19_20)],
                             'Month':school_year,
                             'Count_5':[str(df.iloc[21][i]),str(df.iloc[31][i]),str(df.iloc[30][i]),str(df.iloc[29][i]),str(df.iloc[22][i]),str(df.iloc[33][i]),str(df.iloc[32][i]),str(df.iloc[34][i]),'0','0','0','0'],
                             'Count_4':[str(df.iloc[21][j]),str(df.iloc[31][j]),str(df.iloc[30][j]),str(df.iloc[29][j]),str(df.iloc[22][j]),str(df.iloc[33][j]),str(df.iloc[32][j]),str(df.iloc[34][j]),'0','0','0','0'],
                             'Count_3':[str(df.iloc[21][k]),str(df.iloc[31][k]),str(df.iloc[30][k]),str(df.iloc[29][k]),str(df.iloc[22][k]),str(df.iloc[33][k]),str(df.iloc[32][k]),str(df.iloc[34][k]),'0','0','0','0'],
                             'Count_2':[str(df.iloc[21][l]),str(df.iloc[31][l]),str(df.iloc[30][l]),str(df.iloc[29][l]),str(df.iloc[22][l]),str(df.iloc[33][l]),str(df.iloc[32][l]),str(df.iloc[34][l]),'0','0','0','0'],
                             'Count_1':[str(df.iloc[21][m]),str(df.iloc[31][m]),str(df.iloc[30][m]),str(df.iloc[29][m]),str(df.iloc[22][m]),str(df.iloc[33][m]),str(df.iloc[32][m]),str(df.iloc[34][m]),'0','0','0','0'],
                             }}
    return json.dumps(dictb)




@app.route('/practicetrend/')
def practice_trend():
    db = mysql.connector.connect(host="34.214.24.229",    # your host, usually 
                     user="IE-tech",         # your username
                     passwd="IE-tech@2O2O",  # your password
                     db="compassJune") 
    practice_trend_left="""select monthname(atd.MODIFIED_DATE) as Month,
    count((case when atd.MODIFIED_DATE between '2018-08-01 00:00:00.000000' and '2019-08-01 00:00:00.000000'
    then atd.user_id end)) as 'Practice_count in 2018-2019',
    count(((case when atd.MODIFIED_DATE between '2019-08-01 00:00:00.000000' and '2020-08-01 00:00:00.000000'
    then atd.user_id end))) as 'Practice_count in 2019-2020'
    from audio_track_detail as atd 
    left join user_master as um on atd.USER_ID=um.USER_ID
    left join user_profile as up on up.USER_ID=um.USER_ID 
    left join school_master as sm on up.SCHOOL_ID=sm.id
    where um.user_name not like '%TEST%' and um.IS_DISABLED != 'Y' and um.IS_BLOCKED != 'Y' 
    and um.INCOMPLETE_SIGNUP != 'Y' and um.role_id !=3  and  um.USER_ID in (select ll.USER_ID from audio_track_detail as ll)
    group by monthname(atd.MODIFIED_DATE) ORDER BY MONTH(atd.MODIFIED_DATE)
    """
    practice_left= pd.read_sql(practice_trend_left, con=db)
    month=["AUG","SEP","OCT","NOV","DEC","JAN","FEB","MAR","APR","MAY","JUN","JUL"]
    curve=[practice_left[practice_left['Month']=='August']['Practice_count in 2018-2019'].item(),practice_left[practice_left['Month']=='September']['Practice_count in 2018-2019'].item(),practice_left[practice_left['Month']=='October']['Practice_count in 2018-2019'].item(),practice_left[practice_left['Month']=='November']['Practice_count in 2018-2019'].item(),practice_left[practice_left['Month']=='December']['Practice_count in 2018-2019'].item(),practice_left[practice_left['Month']=='January']['Practice_count in 2018-2019'].item(),practice_left[practice_left['Month']=='February']['Practice_count in 2018-2019'].item(),practice_left[practice_left['Month']=='March']['Practice_count in 2018-2019'].item(),practice_left[practice_left['Month']=='April']['Practice_count in 2018-2019'].item(),practice_left[practice_left['Month']=='May']['Practice_count in 2018-2019'].item(),practice_left[practice_left['Month']=='June']['Practice_count in 2018-2019'].item(),practice_left[practice_left['Month']=='July']['Practice_count in 2018-2019'].item()]
    bar=[practice_left[practice_left['Month']=='August']['Practice_count in 2019-2020'].item(),practice_left[practice_left['Month']=='September']['Practice_count in 2019-2020'].item(),practice_left[practice_left['Month']=='October']['Practice_count in 2019-2020'].item(),practice_left[practice_left['Month']=='November']['Practice_count in 2019-2020'].item(),practice_left[practice_left['Month']=='December']['Practice_count in 2019-2020'].item(),practice_left[practice_left['Month']=='January']['Practice_count in 2019-2020'].item(),practice_left[practice_left['Month']=='February']['Practice_count in 2019-2020'].item(),practice_left[practice_left['Month']=='March']['Practice_count in 2019-2020'].item(),practice_left[practice_left['Month']=='April']['Practice_count in 2019-2020'].item(),practice_left[practice_left['Month']=='May']['Practice_count in 2019-2020'].item(),practice_left[practice_left['Month']=='June']['Practice_count in 2019-2020'].item(),practice_left[practice_left['Month']=='July']['Practice_count in 2019-2020'].item()]
    PRACTICETREND={'month':month,'curve':curve,'bar':bar}
    PRACTICETREND=[PRACTICETREND]
    return json.dumps(PRACTICETREND)
@app.route('/activetrend/')
def active_trend():
    db = mysql.connector.connect(host="34.214.24.229",    # your host, usually 
                     user="IE-tech",         # your username
                     passwd="IE-tech@2O2O",  # your password
                     db="compassJune") 
    active_trend_right="""select monthname(atd.MODIFIED_DATE) as Month,
count(distinct(case when atd.MODIFIED_DATE between '2018-08-01 00:00:00.000000' and '2019-08-01 00:00:00.000000'
then atd.user_id end)) as 'Practice_count in 2018-2019',
count(distinct((case when atd.MODIFIED_DATE between '2019-08-01 00:00:00.000000' and '2020-08-01 00:00:00.000000'
then atd.user_id end))) as 'Practice_count in 2019-2020'
from audio_track_detail as atd 
left join user_master as um on atd.USER_ID=um.USER_ID
left join user_profile as up on up.USER_ID=um.USER_ID 
left join school_master as sm on up.SCHOOL_ID=sm.id
where um.user_name not like '%TEST%' and um.IS_DISABLED != 'Y' and um.IS_BLOCKED != 'Y' 
and um.INCOMPLETE_SIGNUP != 'Y' and um.role_id !=3  and  um.USER_ID in (select ll.USER_ID from audio_track_detail as ll)
group by monthname(atd.MODIFIED_DATE)"""
    practice_left= pd.read_sql(active_trend_right, con=db)
    month=["AUG","SEP","OCT","NOV","DEC","JAN","FEB","MAR","APR","MAY","JUN","JUL"]
    curve=[practice_left[practice_left['Month']=='August']['Practice_count in 2018-2019'].item(),practice_left[practice_left['Month']=='September']['Practice_count in 2018-2019'].item(),practice_left[practice_left['Month']=='October']['Practice_count in 2018-2019'].item(),practice_left[practice_left['Month']=='November']['Practice_count in 2018-2019'].item(),practice_left[practice_left['Month']=='December']['Practice_count in 2018-2019'].item(),practice_left[practice_left['Month']=='January']['Practice_count in 2018-2019'].item(),practice_left[practice_left['Month']=='February']['Practice_count in 2018-2019'].item(),practice_left[practice_left['Month']=='March']['Practice_count in 2018-2019'].item(),practice_left[practice_left['Month']=='April']['Practice_count in 2018-2019'].item(),practice_left[practice_left['Month']=='May']['Practice_count in 2018-2019'].item(),practice_left[practice_left['Month']=='June']['Practice_count in 2018-2019'].item(),practice_left[practice_left['Month']=='July']['Practice_count in 2018-2019'].item()]
    bar=[practice_left[practice_left['Month']=='August']['Practice_count in 2019-2020'].item(),practice_left[practice_left['Month']=='September']['Practice_count in 2019-2020'].item(),practice_left[practice_left['Month']=='October']['Practice_count in 2019-2020'].item(),practice_left[practice_left['Month']=='November']['Practice_count in 2019-2020'].item(),practice_left[practice_left['Month']=='December']['Practice_count in 2019-2020'].item(),practice_left[practice_left['Month']=='January']['Practice_count in 2019-2020'].item(),practice_left[practice_left['Month']=='February']['Practice_count in 2019-2020'].item(),practice_left[practice_left['Month']=='March']['Practice_count in 2019-2020'].item(),practice_left[practice_left['Month']=='April']['Practice_count in 2019-2020'].item(),practice_left[practice_left['Month']=='May']['Practice_count in 2019-2020'].item(),practice_left[practice_left['Month']=='June']['Practice_count in 2019-2020'].item(),practice_left[practice_left['Month']=='July']['Practice_count in 2019-2020'].item()]
    ACTIVETREND={'month':month,'curve':curve,'bar':bar}
    ACTIVETREND=[ACTIVETREND]
    return json.dumps(ACTIVETREND)


@app.route('/averagetrend/')
def average_trend():
    db = mysql.connector.connect(host="34.214.24.229",    # your host, usually 
                     user="IE-tech",         # your username
                     passwd="IE-tech@2O2O",  # your password
                     db="compassJune") 
    active_trend_right="""select monthname(atd.MODIFIED_DATE) as Month,
    round(count((case when atd.MODIFIED_DATE between '2018-08-01 00:00:00.000000' and '2019-08-01 00:00:00.000000'
    then atd.user_id end))/count(distinct(case when atd.MODIFIED_DATE between '2018-08-01 00:00:00.000000' and '2019-08-01 00:00:00.000000'
    then atd.user_id end))) as 'Practice_count in 2018-2019',
    round(count((case when atd.MODIFIED_DATE between '2019-08-01 00:00:00.000000' and '2020-08-01 00:00:00.000000'
    then atd.user_id end))/count(distinct(case when atd.MODIFIED_DATE between '2019-08-01 00:00:00.000000' and '2020-08-01 00:00:00.000000'
    then atd.user_id end))) as 'Practice_count in 2019-2020'
    from audio_track_detail as atd 
    left join user_master as um on atd.USER_ID=um.USER_ID
    left join user_profile as up on up.USER_ID=um.USER_ID 
    left join school_master as sm on up.SCHOOL_ID=sm.id
    where um.user_name not like '%TEST%' and um.IS_DISABLED != 'Y' and um.IS_BLOCKED != 'Y' 
    and um.INCOMPLETE_SIGNUP != 'Y' 
    group by monthname(atd.MODIFIED_DATE)"""
    practice_left= pd.read_sql(active_trend_right, con=db)
    practice_left=practice_left.fillna(0)
    month=["AUG","SEP","OCT","NOV","DEC","JAN","FEB","MAR","APR","MAY","JUN","JUL"]
    curve=[practice_left[practice_left['Month']=='August']['Practice_count in 2018-2019'].item(),practice_left[practice_left['Month']=='September']['Practice_count in 2018-2019'].item(),practice_left[practice_left['Month']=='October']['Practice_count in 2018-2019'].item(),practice_left[practice_left['Month']=='November']['Practice_count in 2018-2019'].item(),practice_left[practice_left['Month']=='December']['Practice_count in 2018-2019'].item(),practice_left[practice_left['Month']=='January']['Practice_count in 2018-2019'].item(),practice_left[practice_left['Month']=='February']['Practice_count in 2018-2019'].item(),practice_left[practice_left['Month']=='March']['Practice_count in 2018-2019'].item(),practice_left[practice_left['Month']=='April']['Practice_count in 2018-2019'].item(),practice_left[practice_left['Month']=='May']['Practice_count in 2018-2019'].item(),practice_left[practice_left['Month']=='June']['Practice_count in 2018-2019'].item(),practice_left[practice_left['Month']=='July']['Practice_count in 2018-2019'].item()]
    bar=[practice_left[practice_left['Month']=='August']['Practice_count in 2019-2020'].item(),practice_left[practice_left['Month']=='September']['Practice_count in 2019-2020'].item(),practice_left[practice_left['Month']=='October']['Practice_count in 2019-2020'].item(),practice_left[practice_left['Month']=='November']['Practice_count in 2019-2020'].item(),practice_left[practice_left['Month']=='December']['Practice_count in 2019-2020'].item(),practice_left[practice_left['Month']=='January']['Practice_count in 2019-2020'].item(),practice_left[practice_left['Month']=='February']['Practice_count in 2019-2020'].item(),practice_left[practice_left['Month']=='March']['Practice_count in 2019-2020'].item(),practice_left[practice_left['Month']=='April']['Practice_count in 2019-2020'].item(),practice_left[practice_left['Month']=='May']['Practice_count in 2019-2020'].item(),practice_left[practice_left['Month']=='June']['Practice_count in 2019-2020'].item(),practice_left[practice_left['Month']=='July']['Practice_count in 2019-2020'].item()]
    averageTREND={'month':month,'curve':curve,'bar':bar}
    averageTREND=[averageTREND]
    return json.dumps(averageTREND)

@app.route('/count/')
def count():    
    db = mysql.connector.connect(host="34.214.24.229",    # your host, usually 
                     user="IE-tech",         # your username
                     passwd="IE-tech@2O2O",  # your password
                     db="compassJune")
    totalschoolcount="""select count(distinct(up.SCHOOL_ID)) as schoolcount from user_master as um 
    left join login_logs as ll on ll.USER_ID=um.USER_ID
    left join user_profile as up on up.USER_ID=um.USER_ID 
    left join school_master as sm on up.SCHOOL_ID=sm.id
    where um.user_name not like '%TEST%' and um.IS_DISABLED != 'Y' and um.IS_BLOCKED != 'Y' 
    and um.INCOMPLETE_SIGNUP != 'Y' and um.role_id !=3 and sm.name<>'blocked'
    """
    totalschoolcount= pd.read_sql(totalschoolcount, con=db)
    school_count=int(totalschoolcount['schoolcount']) #total school count
    user_base="""select count(distinct(um.USER_ID)) as user_count from user_master as um 
    left join user_profile as up on up.USER_ID=um.USER_ID left join school_master as sm on sm.id=up.SCHOOL_ID
    where um.user_name not like '%TEST%' and um.IS_DISABLED != 'Y' and um.IS_BLOCKED != 'Y' 
    and um.INCOMPLETE_SIGNUP != 'Y' and um.role_id !=3 """
    user_base=pd.read_sql(user_base, con=db)
    totaluser=int(user_base['user_count'])
    totaluser                                    #total user base
    active_user="""select count(distinct(um.USER_ID)) as user_count from user_master as um 
    left join user_profile as up on up.USER_ID=um.USER_ID left join school_master as sm on sm.id=up.SCHOOL_ID
    where um.user_name not like '%TEST%' and um.IS_DISABLED != 'Y' and um.IS_BLOCKED != 'Y' 
    and um.INCOMPLETE_SIGNUP != 'Y' and um.role_id !=3
    and um.USER_ID in (select atd.USER_ID from audio_track_detail as atd)
    """
    active_user=pd.read_sql(active_user, con=db)
    activeuser=int(active_user['user_count'])
    poweruser=383                                  #power user
    activeuser=activeuser-poweruser                #active user
    # activeuser
    dormant="""select count(distinct(um.USER_ID)) as user_count from user_master as um 
    left join user_profile as up on up.USER_ID=um.USER_ID left join school_master as sm on sm.id=up.SCHOOL_ID
    where um.user_name not like '%TEST%' and um.IS_DISABLED != 'Y' and um.IS_BLOCKED != 'Y' 
    and um.INCOMPLETE_SIGNUP != 'Y' and um.role_id !=3
    and um.USER_ID not in (select atd.USER_ID from login_logs as atd)
    """
    dormant=pd.read_sql(dormant, con=db)
    dormant=int(dormant['user_count'])
    dormant=dormant-7                             #never logged in dormant
    passive="""select count(distinct(um.USER_ID)) as user_count from user_master as um 
    left join user_profile as up on up.USER_ID=um.USER_ID left join school_master as sm on sm.id=up.SCHOOL_ID
    where um.user_name not like '%TEST%' and um.IS_DISABLED != 'Y' and um.IS_BLOCKED != 'Y' 
    and um.INCOMPLETE_SIGNUP != 'Y' and um.role_id !=3
    and um.USER_ID in (select atd.USER_ID from login_logs as atd)
     and um.USER_ID not in (select atd.USER_ID from audio_track_detail as atd)
    """
    passive=pd.read_sql(passive, con=db)
    passive=int(passive['user_count'])          #logged in but no practice passive user
    # passive
    usa_school="""select count(distinct( case when sm.country like '%united states%' then up.SCHOOL_ID end)) as school_count_USA,
    count(distinct( case when sm.country like '%Canada%' then up.SCHOOL_ID end)) as school_count_Canada,
    count(distinct( case when sm.country like '%Mexico%' then up.SCHOOL_ID end)) as school_count_Mexico,
    count(distinct( case when sm.country like '%India%' then up.SCHOOL_ID end)) as school_count_India
     from user_master as um 
    left join login_logs as ll on ll.USER_ID=um.USER_ID
    left join user_profile as up on up.USER_ID=um.USER_ID 
    left join school_master as sm on up.SCHOOL_ID=sm.id
    where um.user_name not like '%TEST%' and um.IS_DISABLED != 'Y' and um.IS_BLOCKED != 'Y' 
    and um.INCOMPLETE_SIGNUP != 'Y' and um.role_id !=3 and sm.name<>'blocked'
    """
    school=pd.read_sql(usa_school, con=db)
    usa_school="""select count(distinct( case when sm.country like '%united states%' then up.SCHOOL_ID end)) as school_count_USA,
    count(distinct( case when sm.country like '%Canada%' then up.SCHOOL_ID end)) as school_count_Canada,
    count(distinct( case when sm.country like '%Mexico%' then up.SCHOOL_ID end)) as school_count_Mexico,
    count(distinct( case when sm.country like '%India%' then up.SCHOOL_ID end)) as school_count_India
     from user_master as um 
    left join login_logs as ll on ll.USER_ID=um.USER_ID
    left join user_profile as up on up.USER_ID=um.USER_ID 
    left join school_master as sm on up.SCHOOL_ID=sm.id
    where um.user_name not like '%TEST%' and um.IS_DISABLED != 'Y' and um.IS_BLOCKED != 'Y' 
    and um.INCOMPLETE_SIGNUP != 'Y' and um.role_id !=3 and sm.name<>'blocked'
    """
    school=pd.read_sql(usa_school, con=db)
    otherschool=school_count-(int(school['school_count_USA'])+int(school['school_count_Canada'])+int(school['school_count_Mexico'])+int(school['school_count_India']))
    # passive=int(passive['user_count']) 
    active_school="""select count(distinct(up.SCHOOL_ID)) as user_count from user_master as um 
    left join login_logs as ll on ll.USER_ID=um.USER_ID
    left join user_profile as up on up.USER_ID=um.USER_ID 
    left join school_master as sm on up.SCHOOL_ID=sm.id
    where um.user_name not like '%TEST%' and um.IS_DISABLED != 'Y' and um.IS_BLOCKED != 'Y' 
    and um.INCOMPLETE_SIGNUP != 'Y' and um.role_id !=3 and sm.name<>'blocked'
    and up.USER_ID in (select distinct(atd.USER_ID) from audio_track_detail as atd)
    """
    active_school=pd.read_sql(active_school, con=db)
    activeschool=int(active_school['user_count'])
    count={"totalschool":school_count,"totaluser":totaluser,"poweruser":poweruser,"activeuser":activeuser,"dormant":dormant,"passive":passive,"last6":517,"before6":1864,"next6":528,"after6":757,"usaschool":int(school['school_count_USA']),"canadaschool":int(school['school_count_Canada']),"mexicoschool":int(school['school_count_Mexico']),"indiaschool":int(school['school_count_India']),"otherschool":otherschool,"activeschool":activeschool}
    countdata=[count]
    return json.dumps(countdata)

@app.route('/feedbackrating/')
def feedbackrating():
    db = mysql.connector.connect(host="34.214.24.229",    # your host, usually 
                        user="IE-tech",         # your username
                        passwd="IE-tech@2O2O",  # your password
                        db="compassJune")
    feedback_ratings="""select af.RATING,count(af.user)
    from audio_feedback as af left join user_master as um on um.USER_ID=af.USER
    where  um.user_name not like '%TEST%' and um.IS_DISABLED != 'Y' and um.IS_BLOCKED != 'Y' 
    and um.INCOMPLETE_SIGNUP != 'Y' and um.role_id !=3 and (af.rating)<>0
    group by af.rating order by af.RATING ASC"""
    feedback_ratings=pd.read_sql(feedback_ratings, con=db)
    feedbackrating=[int(feedback_ratings['count(af.user)'][4]),int(feedback_ratings['count(af.user)'][3]),int(feedback_ratings['count(af.user)'][2]),int(feedback_ratings['count(af.user)'][1]),int(feedback_ratings['count(af.user)'][0])]

    return json.dumps(feedbackrating)

@app.route('/feedbacktrend/')
def feedbacktrend():
    db = mysql.connector.connect(host="34.214.24.229",    # your host, usually 
                     user="IE-tech",         # your username
                     passwd="IE-tech@2O2O",  # your password
                     db="compassJune")
    feedbacktrend="""select monthname(af.MODIFIED_DATE) as month,
    count( case when af.MODIFIED_DATE between '2018-08-01 00:00:00.000000' and '2019-07-31 00:00:00.000000'
    then af.user end)as '2018-2019',
    count(case when af.MODIFIED_DATE between '2019-08-01 00:00:00.000000' and '2020-07-31 00:00:00.000000'
    then af.user end) as '2019-2020'
    from audio_feedback as af left join user_master as um on um.USER_ID=af.USER
    where  um.user_name not like '%TEST%' and um.IS_DISABLED != 'Y' and um.IS_BLOCKED != 'Y' 
    and um.INCOMPLETE_SIGNUP != 'Y' and um.role_id !=3 and monthname(af.MODIFIED_DATE)not like 'NULL'
    group by monthname(af.MODIFIED_DATE)
    """
    feedbacktrend=pd.read_sql(feedbacktrend, con=db)
    month=["AUG","SEP","OCT","NOV","DEC","JAN","FEB","MAR","APR","MAY","JUN","JUL"]
    curve=[feedbacktrend[feedbacktrend['month']=='August']['2018-2019'].item(),feedbacktrend[feedbacktrend['month']=='September']['2018-2019'].item(),feedbacktrend[feedbacktrend['month']=='October']['2018-2019'].item(),feedbacktrend[feedbacktrend['month']=='November']['2018-2019'].item(),feedbacktrend[feedbacktrend['month']=='December']['2018-2019'].item(),feedbacktrend[feedbacktrend['month']=='January']['2018-2019'].item(),feedbacktrend[feedbacktrend['month']=='February']['2018-2019'].item(),feedbacktrend[feedbacktrend['month']=='March']['2018-2019'].item(),feedbacktrend[feedbacktrend['month']=='April']['2018-2019'].item(),feedbacktrend[feedbacktrend['month']=='May']['2018-2019'].item(),feedbacktrend[feedbacktrend['month']=='June']['2018-2019'].item(),feedbacktrend[feedbacktrend['month']=='July']['2018-2019'].item()]
    bar=[feedbacktrend[feedbacktrend['month']=='August']['2019-2020'].item(),feedbacktrend[feedbacktrend['month']=='September']['2019-2020'].item(),feedbacktrend[feedbacktrend['month']=='October']['2019-2020'].item(),feedbacktrend[feedbacktrend['month']=='November']['2019-2020'].item(),feedbacktrend[feedbacktrend['month']=='December']['2019-2020'].item(),feedbacktrend[feedbacktrend['month']=='January']['2019-2020'].item(),feedbacktrend[feedbacktrend['month']=='February']['2019-2020'].item(),feedbacktrend[feedbacktrend['month']=='March']['2019-2020'].item(),feedbacktrend[feedbacktrend['month']=='April']['2019-2020'].item(),feedbacktrend[feedbacktrend['month']=='May']['2019-2020'].item(),feedbacktrend[feedbacktrend['month']=='June']['2019-2020'].item(),feedbacktrend[feedbacktrend['month']=='July']['2020-2021'].item()]
    feedbacktrend={'month':month,'curve':curve,'bar':bar}
    feedbacktrend=[feedbacktrend]

    return json.dumps(feedbacktrend)

from functools import reduce
@app.route('/activeprogcharttable/<d>')
def parents_tableprogramnew(d):
    x=''
    query=''
    if d=='D':
        reader = geolite2.reader()
        db = mysql.connector.connect(
        host="52.35.73.200",
        user="ieuser",
        passwd="mijyBg96wtdDSAB5",
        database="compass")
        query="""select * from (select sm.id,sm.name,um.USER_ID as Parents_Id,um.USER_NAME as Parents_Name,up.ip_address,um.contact_number,
    sm.city,sm.state,sm.country,um.EMAIL_ID as Parents_Email,um.user_type,
    count(atd.USER_ID) as Practice_Count,max(date(atd.modified_date)) as Last_Practice_Date,date(um.created_date) Sign_Up_Date,
    max(date(ll.LAST_LOGGED_IN)) as Last_Login_Date,
    round((sum(atd.CURSOR_END)-sum(atd.CURSOR_START))/60) as mindful_minutes
    from user_master as um left join user_profile as up
    on um.user_id=up.user_id
    inner join audio_track_detail as atd on atd.USER_ID=um.USER_ID
    left join school_master as sm on sm.id=up.SCHOOL_ID
    left join login_logs as ll on ll.USER_ID=um.USER_ID
    inner join programs_audio pa on pa.AUDIO_ID=atd.PROGRAM_AUDIO_ID
    inner join program_master pm on pm.PROGRAM_ID=pa.PROGRAM_ID
    where um.ROLE_ID=3 and date(um.created_date)>'2020-03-17'  AND um.IS_DISABLED !='Y' and um.INCOMPLETE_SIGNUP !='Y' and um.email_id not like '%test%' and 
    um.email_id not like '%1gen%' and um.user_name not like '%test%' and pa.audio_day  not like '%sound%' and pa.audio_day  not like '%bonus%' and um.user_name not like '%1gen%' and um.email_id <>''
    group by um.user_id) as m
    inner join 
    (select y.USER_ID from 
    (select x.USER_ID,
    count(distinct(case when x.audio_length*.50<=x.Playback_Time then x.PROGRAM_AUDIO_ID end))
     as Audio_Watched_above_50,x.AUDIO_DAY
     from (select um.USER_ID,atd.PROGRAM_AUDIO_ID,pa.AUDIO_LENGTH as audio_length,
    (atd.CURSOR_END-atd.CURSOR_START) as Playback_Time,pa.AUDIO_DAY
    from user_master as um left join user_profile as up
    on um.user_id=up.user_id
    inner join audio_track_detail as atd on atd.USER_ID=um.USER_ID
    left join school_master as sm on sm.id=up.SCHOOL_ID
    left join programs_audio as pa on pa.AUDIO_ID=atd.PROGRAM_AUDIO_ID
    where um.ROLE_ID=3 and date(um.created_date)>'2020-03-17'  AND um.IS_DISABLED !='Y' and um.INCOMPLETE_SIGNUP !='Y'
    and um.email_id not like '%test%' and um.email_id not like '%1gen%' 
    and um.user_name not like '%test%' and um.user_name not like '%1gen%' and um.email_id <>'') as x
    group by x.USER_ID)  as y
    where y.Audio_Watched_above_50 >0) as n
    on m.Parents_Id=n.user_id"""
        
    elif d=='T':
        reader = geolite2.reader()
        db = mysql.connector.connect(
        host="52.35.73.200",
        user="ieuser",
        passwd="mijyBg96wtdDSAB5",
        database="compass")
        query="""select * from (select sm.id,sm.name,um.USER_ID as Parents_Id,um.USER_NAME as Parents_Name,up.ip_address,um.contact_number,
    sm.city,sm.state,sm.country,um.EMAIL_ID as Parents_Email,um.user_type,
    count(atd.USER_ID) as Practice_Count,max(date(atd.modified_date)) as Last_Practice_Date,date(um.created_date) Sign_Up_Date,
    max(date(ll.LAST_LOGGED_IN)) as Last_Login_Date,
    round((sum(atd.CURSOR_END)-sum(atd.CURSOR_START))/60) as mindful_minutes
    from user_master as um left join user_profile as up
    on um.user_id=up.user_id
    inner join audio_track_detail as atd on atd.USER_ID=um.USER_ID
    left join school_master as sm on sm.id=up.SCHOOL_ID
    left join login_logs as ll on ll.USER_ID=um.USER_ID
    inner join programs_audio pa on pa.AUDIO_ID=atd.PROGRAM_AUDIO_ID
    inner join program_master pm on pm.PROGRAM_ID=pa.PROGRAM_ID
    where um.ROLE_ID=3 and date(um.created_date)>'2020-03-17'  AND um.IS_DISABLED !='Y' and um.INCOMPLETE_SIGNUP !='Y' and um.email_id not like '%test%' and 
    um.email_id not like '%1gen%' and um.user_name not like '%test%' and  pa.audio_day like '%bonus%' and um.user_name not like '%1gen%' and um.email_id <>''
    group by um.user_id) as m
    inner join 
    (select y.USER_ID from 
    (select x.USER_ID,
    count(distinct(case when x.audio_length*.50<=x.Playback_Time then x.PROGRAM_AUDIO_ID end))
     as Audio_Watched_above_50,x.AUDIO_DAY
     from (select um.USER_ID,atd.PROGRAM_AUDIO_ID,pa.AUDIO_LENGTH as audio_length,
    (atd.CURSOR_END-atd.CURSOR_START) as Playback_Time,pa.AUDIO_DAY
    from user_master as um left join user_profile as up
    on um.user_id=up.user_id
    inner join audio_track_detail as atd on atd.USER_ID=um.USER_ID
    left join school_master as sm on sm.id=up.SCHOOL_ID
    left join programs_audio as pa on pa.AUDIO_ID=atd.PROGRAM_AUDIO_ID
    where um.ROLE_ID=3 and date(um.created_date)>'2020-03-17'  AND um.IS_DISABLED !='Y' and um.INCOMPLETE_SIGNUP !='Y'
    and um.email_id not like '%test%' and um.email_id not like '%1gen%' 
    and um.user_name not like '%test%' and um.user_name not like '%1gen%' and um.email_id <>'') as x
    group by x.USER_ID)  as y
    where y.Audio_Watched_above_50 >0) as n
    on m.Parents_Id=n.user_id"""
    elif d=='S':
        reader = geolite2.reader()
        db = mysql.connector.connect(
        host="52.35.73.200",
        user="ieuser",
        passwd="mijyBg96wtdDSAB5",
        database="compass")
        query="""select * from (select sm.id,sm.name,um.USER_ID as Parents_Id,um.USER_NAME as Parents_Name,up.ip_address,um.contact_number,
    sm.city,sm.state,sm.country,um.EMAIL_ID as Parents_Email,um.user_type,
    count(atd.USER_ID) as Practice_Count,max(date(atd.modified_date)) as Last_Practice_Date,date(um.created_date) Sign_Up_Date,
    max(date(ll.LAST_LOGGED_IN)) as Last_Login_Date,
    round((sum(atd.CURSOR_END)-sum(atd.CURSOR_START))/60) as mindful_minutes
    from user_master as um left join user_profile as up
    on um.user_id=up.user_id
    inner join audio_track_detail as atd on atd.USER_ID=um.USER_ID
    left join school_master as sm on sm.id=up.SCHOOL_ID
    left join login_logs as ll on ll.USER_ID=um.USER_ID
    inner join programs_audio pa on pa.AUDIO_ID=atd.PROGRAM_AUDIO_ID
    inner join program_master pm on pm.PROGRAM_ID=pa.PROGRAM_ID
    where um.ROLE_ID=3 and date(um.created_date)>'2020-03-17'  AND um.IS_DISABLED !='Y' and um.INCOMPLETE_SIGNUP !='Y' and um.email_id not like '%test%' and 
    um.email_id not like '%1gen%' and um.user_name not like '%test%' and pa.audio_day like '%sound%' and um.user_name not like '%1gen%' and um.email_id <>''
    group by um.user_id) as m
    inner join 
    (select y.USER_ID from 
    (select x.USER_ID,
    count(distinct(case when x.audio_length*.50<=x.Playback_Time then x.PROGRAM_AUDIO_ID end))
     as Audio_Watched_above_50,x.AUDIO_DAY
     from (select um.USER_ID,atd.PROGRAM_AUDIO_ID,pa.AUDIO_LENGTH as audio_length,
    (atd.CURSOR_END-atd.CURSOR_START) as Playback_Time,pa.AUDIO_DAY
    from user_master as um left join user_profile as up
    on um.user_id=up.user_id
    inner join audio_track_detail as atd on atd.USER_ID=um.USER_ID
    left join school_master as sm on sm.id=up.SCHOOL_ID
    left join programs_audio as pa on pa.AUDIO_ID=atd.PROGRAM_AUDIO_ID
    where um.ROLE_ID=3 and date(um.created_date)>'2020-03-17'  AND um.IS_DISABLED !='Y' and um.INCOMPLETE_SIGNUP !='Y'
    and um.email_id not like '%test%' and um.email_id not like '%1gen%' 
    and um.user_name not like '%test%' and um.user_name not like '%1gen%' and um.email_id <>'') as x
    group by x.USER_ID)  as y
    where y.Audio_Watched_above_50 >0) as n
    on m.Parents_Id=n.user_id"""
    else:
        pass

    df=pd.read_sql(query, con=db)
  
    df.mindful_minutes=df.mindful_minutes.fillna(0)
    df.mindful_minutes=df.mindful_minutes.astype('int64')
    df['Last_Practice_Date']=pd.to_datetime(df['Last_Practice_Date'])
    df['Last_Practice_Date'].fillna("NO PRACTICE", inplace=True)
    df['Last_Login_Date']=pd.to_datetime(df['Last_Login_Date'])
    df['Last_Login_Date'].fillna("NO LOGIN", inplace=True)
    df['Sign_Up_Date']=pd.to_datetime(df['Sign_Up_Date'])
    df['name'].fillna("NO SCHOOL INFO", inplace=True)
    def country1(i):
        location = reader.get(i)
        c=(location['country']['names']['en'])
        return c
    def state1(i):
        location = reader.get(i)
        s=(location['subdivisions'][0]['names']['en'])
        return s
    def city1(i):
        location = reader.get(i)
        city=location['city']['names']['en']
        return city
    def pn_country(i):
        import phonenumbers
        import pycountry
        from phonenumbers.phonenumberutil import (
        region_code_for_country_code,
        region_code_for_number,)
        pn = phonenumbers.parse('+'+i)   
        country = pycountry.countries.get(alpha_2=region_code_for_number(pn))
        con=country.name
        return con
    ip=df['ip_address'].tolist()
    phone_number=df['contact_number'].tolist()
    Parents_Name=df['Parents_Name'].tolist()
    Parents_Email=df.Parents_Email.tolist()
    School_Name=df['name'].tolist()
    state=df['state'].tolist()
    country=df['country'].tolist()
    city=df['city'].tolist()
    sign_up_date=df['Sign_Up_Date'].tolist()
    last_prac_date=df['Last_Practice_Date'].tolist()
    last_login_date=df['Last_Login_Date'].tolist()
    practice_count=df['Practice_Count'].tolist()
    mindful_minutes=df['mindful_minutes'].tolist()
    for i in range(len(ip)):
        if country[i] is None:
            try:
                country[i]=country1(ip[i])
            except:
                pass
        elif country[i]=='null':
            try:
                country[i]=country1(ip[i])
            except:
                pass
        if city[i] is None:
            try:
                city[i]=city1(ip[i])
            except:
                pass
        elif city[i]=='null':
            try:
                city[i]=city1(ip[i])
            except:
                pass
        if state[i] is None:
            try:
                state[i]=state1(ip[i])
            except:
                pass
        elif state[i] =='NO state info':
            try:
                state[i]=state1(ip[i])
            except:
                pass    
        if country[i] is None:
            try:
                country[i]=pn_country(phone_number[i])
            except:
                pass
        if country[i] is None:
            country[i]=''
        if state[i] is None:
            state[i]=''
        if  last_prac_date[i] != 'NO PRACTICE' :
            last_prac_date[i]=last_prac_date[i].strftime('%d %b %Y')
        else:
            last_prac_date[i]="NO PRACTICE"
        if  last_login_date[i] != 'NO LOGIN' :
            last_login_date[i]=last_login_date[i].strftime('%d %b %Y')
        else:
            last_login_date[i]="NO LOGIN"
        if sign_up_date[i] is not None:
            sign_up_date[i]=sign_up_date[i].strftime('%d %b %Y')
    state12 =  [each_string.lower() for each_string in state]
    cv={'pnn':Parents_Name,'pe':Parents_Email,'co':country,'pn':phone_number,'sn':School_Name,'ct':city,
                               'st':state12,'sp':sign_up_date,
                               'll':last_login_date,'lp':last_prac_date,'pc':practice_count}
    dftry = pd.DataFrame.from_dict(cv)
    dftry= dftry.drop("co", axis=1)
    
        
    return json.dumps({"data":dftry.values.tolist()})

@app.route('/activeprogchart')
def parpactiveprog():
    
    db = mysql.connector.connect(
    host="52.35.73.200",
    user="ieuser",
    passwd="mijyBg96wtdDSAB5",
    database="compass")
    q1="""
    select z.age_group,sum(case when z.audio_day not like '%bonus%' and z.audio_day not like '%sound%' then z.active_user end) as 'Daily',
     sum(case when z.audio_day like '%bonus%' then z.active_user end) as 'Transition',
     sum(case when z.audio_day like '%sound%' then z.active_user end) as 'Sound Practice'
    from
    (select count(case when y.Audio_Watched_above_50>0 then y.USER_ID end) as 'active_user', y.audio_day,y.AGE_GROUP from
    (select x.USER_ID,
    count(distinct(case when x.audio_length*.50 <=x.Playback_Time then x.PROGRAM_AUDIO_ID end))
     as Audio_Watched_above_50,x.AUDIO_DAY,x.age_group
     from (select um.USER_ID,atd.PROGRAM_AUDIO_ID,pa.AUDIO_LENGTH as audio_length,
    (atd.CURSOR_END-atd.CURSOR_START) as Playback_Time,AUDIO_DAY,pm.AGE_GROUP
    from user_master as um left join user_profile as up
    on um.user_id=up.user_id
    inner join audio_track_detail as atd on atd.USER_ID=um.USER_ID
    left join school_master as sm on sm.id=up.SCHOOL_ID
    inner join programs_audio as pa on pa.AUDIO_ID=atd.PROGRAM_AUDIO_ID
    inner join program_master as pm on pm.PROGRAM_ID=pa.PROGRAM_ID
    where um.ROLE_ID=3 and date(um.created_date)>'2020-03-17'  AND um.IS_DISABLED !='Y' and um.INCOMPLETE_SIGNUP !='Y'
    and um.email_id not like '%test%' and um.email_id not like '%1gen%' 
    and um.user_name not like '%test%' and um.user_name not like '%1gen%' and um.email_id <>'') as x
    group by x.USER_ID)y
    group by y.AUDIO_DAY)z
    group by AGE_GROUP
    """
    df1=pd.read_sql(q1, con=db)
    q2="""select sum(case when z.audio_day not like '%bonus%' and z.audio_day not like '%sound%' then z.active_user end) as 'Daily',
     sum(case when z.audio_day like '%bonus%' then z.active_user end) as 'Transition',
     sum(case when z.audio_day like '%sound%' then z.active_user end) as 'Sound Practice'
    from
    (select count(case when y.Audio_Watched_above_50>0 then y.USER_ID end) as 'active_user', y.audio_day from
    (select x.USER_ID,
    count(distinct(case when x.audio_length*.50 <=x.Playback_Time then x.PROGRAM_AUDIO_ID end))
     as Audio_Watched_above_50,x.AUDIO_DAY
     from (select um.USER_ID,atd.PROGRAM_AUDIO_ID,pa.AUDIO_LENGTH as audio_length,
    (atd.CURSOR_END-atd.CURSOR_START) as Playback_Time,AUDIO_DAY
    from user_master as um left join user_profile as up
    on um.user_id=up.user_id
    inner join audio_track_detail as atd on atd.USER_ID=um.USER_ID
    left join school_master as sm on sm.id=up.SCHOOL_ID
    inner join programs_audio as pa on pa.AUDIO_ID=atd.PROGRAM_AUDIO_ID
    where um.ROLE_ID=3 and date(um.created_date)>'2020-03-17'  AND um.IS_DISABLED !='Y' and um.INCOMPLETE_SIGNUP !='Y'
    and um.email_id not like '%test%' and um.email_id not like '%1gen%' 
    and um.user_name not like '%test%' and um.user_name not like '%1gen%' and um.email_id <>'') as x
    group by x.USER_ID)y
    group by y.AUDIO_DAY)z
    """
    print(df1,"HELLO")
    df9=pd.read_sql(q2, con=db)
    print(df9)
    df1=df1.fillna(0)
    daily=df9['Daily'].sum()
    Transtion=df9['Transition'].sum()
    Sound=df9['Sound Practice'].sum()
    prog=list(df1['age_group'])
    daily1=list(df1['Daily'])
    Transtion1=list(df1['Transition'])
    sound1=list(df1['Sound Practice'])
    temp={"prog":prog,"dtotal":daily,"trant":Transtion,"soundt":Sound,"sound":sound1,"transition":Transtion1,"daily":daily1}
    return json.dumps(temp)



@app.route('/statechart')
def wtfvghvjhbhbjhb():
    
    reader = geolite2.reader()
    db = mysql.connector.connect(
        host="52.35.73.200",
        user="ieuser",
        passwd="mijyBg96wtdDSAB5",
        database="compass")
    query="""select sm.id,sm.name,sm.address,um.USER_ID as Parents_Id,um.USER_NAME as Parents_Name,up.ip_address,um.contact_number,
    sm.city,sm.state,sm.country,um.EMAIL_ID as Parents_Email,um.user_type,
    count(atd.USER_ID) as Practice_Count,max(date(atd.modified_date)) as Last_Practice_Date,date(um.created_date) Sign_Up_Date,
    max(date(ll.LAST_LOGGED_IN)) as Last_Login_Date,
    round((sum(atd.CURSOR_END)-sum(atd.CURSOR_START))/60) as mindful_minutes
    from user_master as um left join user_profile as up
    on um.user_id=up.user_id
    left join audio_track_detail as atd on atd.USER_ID=um.USER_ID
    left join school_master as sm on sm.id=up.SCHOOL_ID
    left join login_logs as ll on ll.USER_ID=um.USER_ID
    where um.ROLE_ID=3 and date(um.created_date)>'2020-03-17'  AND um.IS_DISABLED !='Y' and um.INCOMPLETE_SIGNUP !='Y' and um.email_id not like '%test%' and 
    um.email_id not like '%1gen%' and um.user_name not like '%test%' and um.user_name not like '%1gen%' and um.email_id <>''
    group by um.user_id;"""
    df=pd.read_sql(query, con=db)
  
    df.mindful_minutes=df.mindful_minutes.fillna(0)
    df.mindful_minutes=df.mindful_minutes.astype('int64')
    df['Last_Practice_Date']=pd.to_datetime(df['Last_Practice_Date'])
    df['Last_Practice_Date'].fillna("NO PRACTICE", inplace=True)
    df['id'].fillna("no id", inplace=True)
    df['name'].fillna("NO NAME", inplace=True)
    df['address'].fillna("NO address", inplace=True)
    df['Last_Login_Date']=pd.to_datetime(df['Last_Login_Date'])
    df['Last_Login_Date'].fillna("NO LOGIN", inplace=True)
    df['Sign_Up_Date']=pd.to_datetime(df['Sign_Up_Date'])
    
    def country1(i):
        location = reader.get(i)
        c=(location['country']['names']['en'])
        return c
    
    def state1(i):
        location = reader.get(i)
        s=(location['subdivisions'][0]['names']['en'])
        return s
    
    def city1(i):
        location = reader.get(i)
        city=location['city']['names']['en']
        return city
    
    def pn_country(i):
        import phonenumbers
        import pycountry
        from phonenumbers.phonenumberutil import (
        region_code_for_country_code,
        region_code_for_number,)
        pn = phonenumbers.parse('+'+i)   
        country = pycountry.countries.get(alpha_2=region_code_for_number(pn))
        con=country.name
        return con
    ip=df['ip_address'].tolist()
    phone_number=df['contact_number'].tolist()
    schid=df['id'].tolist()
    schname=df['name'].tolist()
    schadd=df['address'].tolist()
    phone_number=df['contact_number'].tolist()
    city=df['city'].tolist()
    Parents_Name=df['Parents_Name'].tolist()
    Parents_Email=df.Parents_Email.tolist()
    state=df['state'].tolist()
    country=df['country'].tolist()
    sign_up_date=df['Sign_Up_Date'].tolist()
    last_prac_date=df['Last_Practice_Date'].tolist()
    last_login_date=df['Last_Login_Date'].tolist()
    practice_count=df['Practice_Count'].tolist()
    
    for i in range(len(ip)):
        
        if city[i] is None:
            try:
                city[i]=city1(ip[i])
            except:
                pass
        if country[i] is None:
            try:
                country[i]=country1(ip[i])
            except:
                pass
        if state[i] is None:
            try:
                state[i]=state1(ip[i])
            except:
                pass
        if country[i] is None:
            try:
                country[i]=pn_country(phone_number[i])
            except:
                pass
        if country[i] is None:
            country[i]=''
        if state[i] is None:
            state[i]=''
        if  last_prac_date[i] != 'NO PRACTICE' :
            last_prac_date[i]=last_prac_date[i].strftime('%d %b %Y')
        else:
            last_prac_date[i]="NO PRACTICE"
        if  last_login_date[i] != 'NO LOGIN' :
            last_login_date[i]=last_login_date[i].strftime('%d %b %Y')
        else:
            last_login_date[i]="NO LOGIN"
        if sign_up_date[i] is not None:
            sign_up_date[i]=sign_up_date[i].strftime('%d %b %Y')
    data=[]    
    for x,g,a,b,c,i,k,l,m,o,p,q,r,s,z in zip(schid,schname,schadd,ip,Parents_Name,Parents_Email,phone_number,df['user_type'].tolist(),
                               state,city,country,sign_up_date,
                               last_login_date,last_prac_date,practice_count):
        data.append([x,g,a,b,c,i,k,l,m,o,p,q,r,s,z])
        
    data1=pd.DataFrame(data,columns=['school_id','school_name','school_address','ip','Parents_Name','Parents_Email','contact_no.',
                                    'user_type','state','city','country','signup_date','last_log_in','last_practice','practice_count']) 
    
    
    newdf=data1[data1['country']=='United States']
    newdf=data1[data1['state']!='']
    df_obj = newdf.select_dtypes(['object'])
    newdf[df_obj.columns] = df_obj.apply(lambda x: x.str.strip())
    newdf.state.replace(inplace=True,to_replace=['florida','FL','fl'],value='Florida')
    signups_states=newdf.groupby('state')['state'].count().sort_values(ascending=False).to_frame(name='SignUp_Count').reset_index()
    login_states=newdf[newdf['last_log_in']!='NO LOGIN'].groupby('state')['state'].count().sort_values(ascending=False).to_frame(name='Log_in_Count').reset_index()
    newdf1=signups_states.merge(login_states,on='state',how='left')
    newdf1.Log_in_Count.fillna(0,inplace=True)
    newdf1.Log_in_Count=newdf1.Log_in_Count.astype('int64')
    
    states=signups_states.state.tolist()
    state_signup_count=newdf1.SignUp_Count.tolist()
    state_login_count=newdf1.Log_in_Count.tolist()
    
    return json.dumps({"state":states,"signup":state_signup_count,"login":state_login_count})


@app.route('/presentios')
def presentios():
   #impressions
    googleSheetId = '1UrhNlOkyAhboHYQwNQJHpEiJ-NfeCDX5MS3DPh8Na50'
    worksheetName = 'impressions'
    URL = 'https://docs.google.com/spreadsheets/d/{0}/gviz/tq?tqx=out:csv&sheet={1}'.format(
    googleSheetId,
    worksheetName
    )
    df = pd.read_csv(URL)
    #product page views
    googleSheetId1 = '1UrhNlOkyAhboHYQwNQJHpEiJ-NfeCDX5MS3DPh8Na50'
    worksheetName1 = 'product_page_views'
    URL1 = 'https://docs.google.com/spreadsheets/d/{0}/gviz/tq?tqx=out:csv&sheet={1}'.format(
    googleSheetId1,
    worksheetName1
    )
    df1 = pd.read_csv(URL1)
    #conversion_rate
    googleSheetId2 = '1UrhNlOkyAhboHYQwNQJHpEiJ-NfeCDX5MS3DPh8Na50'
    worksheetName2 = 'conversion_rate'
    URL2 = 'https://docs.google.com/spreadsheets/d/{0}/gviz/tq?tqx=out:csv&sheet={1}'.format(
    googleSheetId2,
    worksheetName2
    )
    df2 = pd.read_csv(URL2)
    dfs = [df, df1, df2]
    df_final = reduce(lambda left,right: pd.merge(left,right,on='Date'), dfs)
    df_final['Date'] = pd.to_datetime(df_final['Date'])
    newdf=df_final[(df_final.Date> '2020-03-16')]
    newdf['Date'] = newdf['Date'].astype(np.int64) / int(1e6)
    df3=newdf[['Date','Impressions']]
    
    #IMPRESSION =====NO OF STORE VISIT
    Impressions= df3.values.tolist()
    df4=newdf[['Date','Product Page Views']]
    #PAGE VIEW OPEN AFTER INSTALL
    PViews=sum(list(df4['Product Page Views']))
    Page_Views= df4.values.tolist()
    
    df6=newdf[['Date','App Units']]
    #APP UNIT ---- INSTALL
    App_Units= df6.values.tolist()
    df7=newdf[['Date','Impressions (Unique Devices)']]
    I_Unique_Devices= df7.values.tolist()
    
    newdate=list(newdf['Date'])
    Impressions=list(df3['Impressions'])
    Impressionsnew=[]
#     cumImpressions=np.cumsum(Impressions)
#     print(cuminst)
    for i,j in zip(newdate,Impressions):
        Impressionsnew.append([i,int(j)])
    
#     print(Impressionsnew)
    appunit=list(df6['App Units'])
    cumImpressionsgraph=[]
#     print(newdate)
    cumImpressions=np.cumsum(Impressions)
#     print(cuminst)
    for i,j in zip(newdate,cumImpressions):
        cumImpressionsgraph.append([i,int(j)])
#     print(cuminstgraph)

    cumappunit2=[]
#     print(newdate)
    cumappunit=np.cumsum(appunit)
#     print(cumappunit,"cumappunit")
#     print(cuminst)
    for i,j in zip(newdate,cumappunit):
        cumappunit2.append([i,int(j)])
    
    User_install= df7.values.tolist()
    
    
    
    temp={"Impressionsnew":Impressionsnew,"totalpageview":[str(PViews)],"totalimpression":[str(sum(Impressions))],"totalappunit":[str(sum(appunit))],"cumappunit":cumappunit2,"cumImpressionsgraph":cumImpressionsgraph,"Impressions":Impressions,"Page_Views":Page_Views,"App_Units":App_Units,"Impression_Devices":I_Unique_Devices}
#     print(temp)
    return(json.dumps(temp))


@app.route('/appandroid')
def appandroid():
    googleSheetId = '1-UfcdmB78qk86zuK2fSFqDg-eenyNBzYzu5vI41mDXg'
    worksheetName = 'Installs'
    URL = 'https://docs.google.com/spreadsheets/d/{0}/gviz/tq?tqx=out:csv&sheet={1}'.format(
        googleSheetId,
        worksheetName
    )
    df = pd.read_csv(URL)
    #Active_Users
    googleSheetId1 = '1-UfcdmB78qk86zuK2fSFqDg-eenyNBzYzu5vI41mDXg'
    worksheetName1 = 'Sessions'
    URL1 = 'https://docs.google.com/spreadsheets/d/{0}/gviz/tq?tqx=out:csv&sheet={1}'.format(
        googleSheetId1,
        worksheetName1
    )
    df1 = pd.read_csv(URL1)

    #User Loss
    googleSheetId2 = '1-UfcdmB78qk86zuK2fSFqDg-eenyNBzYzu5vI41mDXg'
    worksheetName2 = 'User_Loss'
    URL2 = 'https://docs.google.com/spreadsheets/d/{0}/gviz/tq?tqx=out:csv&sheet={1}'.format(
        googleSheetId2,
        worksheetName2
    )
    df2 = pd.read_csv(URL2)

    #Uninstalls
    googleSheetId3 = '1-UfcdmB78qk86zuK2fSFqDg-eenyNBzYzu5vI41mDXg'
    worksheetName3 = 'Uninstalls'
    URL3 = 'https://docs.google.com/spreadsheets/d/{0}/gviz/tq?tqx=out:csv&sheet={1}'.format(
        googleSheetId3,
        worksheetName3
    )
    df3 = pd.read_csv(URL3)

    #Ratings
    googleSheetId4 = '1-UfcdmB78qk86zuK2fSFqDg-eenyNBzYzu5vI41mDXg'
    worksheetName4 = 'Ratings'
    URL4 = 'https://docs.google.com/spreadsheets/d/{0}/gviz/tq?tqx=out:csv&sheet={1}'.format(
        googleSheetId4,
        worksheetName4
    )
    df4 = pd.read_csv(URL4)

    dfs = [df, df1, df2, df3,df4]
    df_final = reduce(lambda left,right: pd.merge(left,right,on='Date'), dfs)
    df_final['Day'] = df_final['Date'].astype(str).str[:2]
    df_final['Month'] =df_final['Date'].astype(str).str[3:5]
    df_final['Year'] = df_final['Date'].astype(str).str[6:10]
    df_final['New_Date']=pd.to_datetime(df_final[['Year', 'Month', 'Day']].rename(columns={'YY': 'year', 'MM': 'month', 'DD': 'day'}))
    newdf=df_final[(df_final.New_Date> '2020-03-16')]
    df6=newdf[['New_Date','Installs','Sessions','User_Lost','User_Uninstalls','Rating']].apply(pd.to_numeric, errors='coerce')
    df6['New_Date'] = df6['New_Date'].astype(np.int64) / int(1e6)
    df6=df6.fillna(0)
    
    df7=df6[['New_Date','Installs']]
    newdate=list(df7['New_Date'])
    installss=list(df7['Installs'])
    cuminstgraph=[]
#     print(newdate)
    cuminst=np.cumsum(installss)
#     print(cuminst)
    for i,j in zip(newdate,cuminst):
        cuminstgraph.append([i,int(j)])
#     print(cuminstgraph)
    User_install= df7.values.tolist()
    
    
    df8=df6[['New_Date','Sessions']]
    User_Active= df8.values.tolist()
    Useractive=list(df8['Sessions'])
    cumUseractive=np.cumsum(Useractive)
#     print(cuminst)
    cumactivegraph=[]
    for i,j in zip(newdate,cumUseractive):
        cumactivegraph.append([i,int(j)])
#     print(cuminstgraph)
    User_install= df7.values.tolist()
    
    df9=df6[['New_Date','User_Lost']]
    User_Lost= df9.values.tolist() 
    df10=df6[['New_Date','User_Uninstalls']]
    User_Uninstall= df10.values.tolist()
    df11=df6[['New_Date','Rating']]
    User_Raiting= df11.values.tolist()
    Dload = df6['Installs'].sum()
    User_Download= Dload.tolist()
    ActiveU = int(df6['Sessions'].sum())
#     Active_users= ActiveU.tolist()
    temp={'installcard':[str(sum(installss))],'cumactivegraph':cumactivegraph,'cuminstall':cuminstgraph,"install":User_install,"Active":User_Active,"Lost":User_Lost,"Uninstall":User_Uninstall,"Raiting":User_Raiting,"Downloads":User_Download,"activecard":[str(ActiveU)]}
    
    return(json.dumps(temp))


@app.route('/presentandroid')

def indexdcsdcds():
    googleSheetId = '1-UfcdmB78qk86zuK2fSFqDg-eenyNBzYzu5vI41mDXg'
    worksheetName = 'Installs'
    URL = 'https://docs.google.com/spreadsheets/d/{0}/gviz/tq?tqx=out:csv&sheet={1}'.format(
        googleSheetId,
        worksheetName
    )
    df = pd.read_csv(URL)
    #Active_Users
    googleSheetId1 = '1-UfcdmB78qk86zuK2fSFqDg-eenyNBzYzu5vI41mDXg'
    worksheetName1 = 'Active_Users'
    URL1 = 'https://docs.google.com/spreadsheets/d/{0}/gviz/tq?tqx=out:csv&sheet={1}'.format(
        googleSheetId1,
        worksheetName1
    )
    df1 = pd.read_csv(URL1)

    #User Loss
    googleSheetId2 = '1-UfcdmB78qk86zuK2fSFqDg-eenyNBzYzu5vI41mDXg'
    worksheetName2 = 'User_Loss'
    URL2 = 'https://docs.google.com/spreadsheets/d/{0}/gviz/tq?tqx=out:csv&sheet={1}'.format(
        googleSheetId2,
        worksheetName2
    )
    df2 = pd.read_csv(URL2)

    #Uninstalls
    googleSheetId3 = '1-UfcdmB78qk86zuK2fSFqDg-eenyNBzYzu5vI41mDXg'
    worksheetName3 = 'Uninstalls'
    URL3 = 'https://docs.google.com/spreadsheets/d/{0}/gviz/tq?tqx=out:csv&sheet={1}'.format(
        googleSheetId3,
        worksheetName3
    )
    df3 = pd.read_csv(URL3)

    #Ratings
    googleSheetId4 = '1-UfcdmB78qk86zuK2fSFqDg-eenyNBzYzu5vI41mDXg'
    worksheetName4 = 'Ratings'
    URL4 = 'https://docs.google.com/spreadsheets/d/{0}/gviz/tq?tqx=out:csv&sheet={1}'.format(
        googleSheetId4,
        worksheetName4
    )
    df4 = pd.read_csv(URL4)

    dfs = [df, df1, df2, df3,df4]
   
    df_final = reduce(lambda left,right: pd.merge(left,right,on='Date'), dfs)
    df_final['Day'] = df_final['Date'].astype(str).str[:2]
    df_final['Month'] =df_final['Date'].astype(str).str[3:5]
    df_final['Year'] = df_final['Date'].astype(str).str[6:10]
    df_final['New_Date']=pd.to_datetime(df_final[['Year', 'Month', 'Day']].rename(columns={'YY': 'year', 'MM': 'month', 'DD': 'day'}))
    newdf=df_final[(df_final.New_Date> '2020-03-16')]
#     print(newdf.fillna(0))
    df6=newdf[['New_Date','Installs','Active_Users','User_Lost','User_Uninstalls','Rating']].apply(pd.to_numeric, errors='coerce')
    df6['New_Date'] = df6['New_Date'].astype(np.int64) / int(1e6)
    df6=df6.fillna(0)
    df7=df6[['New_Date','Installs']]
    User_install= df7.values.tolist()
    df8=df6[['New_Date','Active_Users']]
    User_Active= df8.values.tolist()
    
    df9=df6[['New_Date','User_Lost']]
    User_Lost= df9.values.tolist() 
    df10=df6[['New_Date','User_Uninstalls']]
    User_Uninstall= df10.values.tolist()
    df11=df6[['New_Date','Rating']]
    User_Raiting= df11.values.tolist()
    Dload = df6['Installs'].sum()
    User_Download= Dload.tolist()
    ActiveU = df6['Active_Users'].sum()
    Active_users= ActiveU.tolist()
    
    temp={"install":User_install,"Active":User_Active,"Lost":User_Lost,"Uninstall":User_Uninstall,"Raiting":User_Raiting,"Downloads":User_Download,"ActiveU":Active_users}
   
    return(json.dumps(temp))




@app.route('/districtcard/<district>')
def District_card(district):
    db = mysql.connector.connect(
        host="34.214.24.229",
        user="IE-tech",
        passwd="IE-tech@2O2O",
        database="compassJune")
    qr="""select
    count(case when z.Count1 is NULL then USER_ID end) as 'Dormant',
    count(case when z.Count1 between 1 and 6  then USER_ID end) as 'Passive',
    count(case when z.Count1 between 7 and 50 then USER_ID end) as 'Active',
    count(case when z.Count1 > 50 then USER_ID end) as 'Power',
    count('Dormant' + 'Passive' + 'Active') as "User count",
    count(distinct(z.sid)) as 'School count'
    from (select * from (select um.USER_ID,sm.ID as sid from user_master um
    left join audio_track_detail au
    on um.USER_ID=au.USER_ID
    left join user_profile up on up.USER_ID=um.USER_ID
    left join school_master sm on sm.id=up.SCHOOL_ID
    where um.IS_DISABLED != 'Y'  
    and um.INCOMPLETE_SIGNUP != 'Y' and um.role_id !=3 and um.USER_NAME not like '%test%' 
    and um.IS_BLOCKED != 'Y'
    and um.district_name like '%"""+district+"""%'
    and um.district_name is not null 
    group by 1) x
    left join 
    (select um.USER_ID as id1 ,count(au.USER_ID) as Count1,um.EMAIL_ID as id2 from user_master um
    left join audio_track_detail au
    on um.USER_ID=au.USER_ID
    left join user_profile up on up.USER_ID=um.USER_ID
    left join school_master sm on sm.id=up.SCHOOL_ID
    where um.IS_DISABLED != 'Y'  
    and um.INCOMPLETE_SIGNUP != 'Y' and um.role_id !=3 and um.USER_NAME not like '%test%' 
    and um.IS_BLOCKED != 'Y'
    and um.district_name like '%"""+district+"""%'
    and um.district_name is not null 
    and date(au.MODIFIED_DATE)> '2019-07-31'
    group by 1)y
    on y.id1=x.USER_ID)z"""
    qr2="""select y.district_name,y.Engaged,y.Onboarding,y.Total_School-(y.Engaged+y.Onboarding)  as Intervention,y.Total_School
    from (select distinct(x.district_name) as district_name,
    count(distinct(case when x.Total_User =1 then x.school_id end )) as Onboarding,
    count(distinct(case when x.Practised_atleast_Ones>=0.7*x.Total_User and x.Total_User >1
    then x.school_id end )) as Engaged,
    count(distinct(x.school_id)) as Total_School
    from (select distinct(up.SCHOOL_ID),um.district_name,
    count(distinct(um.USER_ID)) as Total_User,
    count(distinct( case when date(atd.modified_date) > '2019-07-31' then atd.USER_ID end )) as Practised_atleast_Ones
    from user_master as um left join user_profile as up on up.USER_ID=um.USER_ID
    left join school_master as sm on sm.id=up.SCHOOL_ID
    left join audio_track_detail as atd on atd.USER_ID=um.USER_ID
    where um.USER_NAME NOT LIKE "%TEST%" and um.IS_BLOCKED !='Y' and um.IS_DISABLED != 'Y'
    AND um.INCOMPLETE_SIGNUP != 'Y' and um.role_id !=3 AND sm.NAME NOT LIKE "%blocked%" and um.EMAIL_ID not like '%1gen%' and um.district_name like '%"""+district+"""%'
    and um.district_name is not null
    group by up.SCHOOL_ID) as x
    group by x.district_name) as y"""
    df=pd.read_sql(qr, con=db)
    df2=pd.read_sql(qr2, con=db)
    links = df.rename(columns={'Dormant' : 'dormant', 'Passive' : 'passive','Active' : 'active', 'Power' : 'power', 'User count' : 'usercount'}).to_dict('r')
    links[0]['engaged']=int(df2['Engaged'][0])
    links[0]['onboarding']=int(df2['Onboarding'][0])
    links[0]['intervention']=int(df2['Intervention'][0])
    links[0]['totalschool']=int(df2['Total_School'][0])
    return(json.dumps(links))

@app.route('/parusmap')
def state_Infop():
    import pandas as pd
    import numpy as np
    import mysql.connector
    import datetime as dt
    db = mysql.connector.connect(
    host="52.35.73.200",
    user="ieuser",
    passwd="mijyBg96wtdDSAB5",
    database="compass")
    query="""SELECT sm.STATE,sm.STATE_SHORT, count(distinct(sm.ID)) AS Count,count(um.user_id) as uscount FROM user_master um 
    inner join user_profile up on up.USER_ID=um.USER_ID
    inner join school_master sm on sm.ID=up.SCHOOL_ID
    where um.ROLE_ID=3 and DATE(um.CREATED_DATE) > '2020-03-17' and  um.email_id not like '%test%' and 
    um.email_id not like '%1gen%'  and um.user_name not like '%test%' and um.user_name not like '%1gen%' and um.email_id <>''and sm.COUNTRY LIKE "%UNITED STATES%"
    group by sm.STATE
    ;"""
    df=pd.read_sql(query, con=db)
    
    df = df.dropna(how='any',axis=0)
    df=df.apply(lambda x: x.astype(str).str.lower())
    data=[]
    for i,k,l in zip(df['STATE_SHORT'].tolist(),df['Count'].tolist(),df['uscount'].tolist()):
#         print(i)
        try:
            data.append({"code":i,"value":int(k),"value1":int(l),'hc-key':"us-"+i})
        except:
            pass
#     print(data)
    return json.dumps(data)

@app.route('/dashcount')
def dashcount():
    totalschool=3864

    aftercsy=293
    beforecsy=1522
    expcsy=385
    upexcsy=1664
    totalstudents=1016064
    totalclassroom=36288
    totaluserbase=40630
    power=2225
    dormant=32612
    passive=2848
    active=2945
    neverlogged=23790
    mindmin=8128512
    activeschool=2945
    
    passiveper=(round((passive/totaluserbase)*100))
    activeper=(round((active/totaluserbase)*100))
    powerper=(round((power/totaluserbase)*100))
    dormantper=(round((dormant/totaluserbase)*100))
    year=(round(((mindmin/60)/24)/365))
    temp={'activeschool':[str(activeschool)],'passiveper':passiveper,'year':year,'dormantper':dormantper,'activeper':[str(activeper)],'powerper':[str(powerper)],'totalschool':[str(totalschool)],'aftercsy':[str(aftercsy)],'beforecsy':[str(beforecsy)],
          'expcsy':[str(expcsy)],"upexcsy":[str(upexcsy)],'totalstudents':[str(totalstudents)],
          'totalclassroom':[str(totalclassroom)],'totaluserbase':[str(totaluserbase)],
          'power':[str(power)],'neverlogged':[str(neverlogged)],'mindmin':[str(mindmin)],"usa":["3600"],'other':["163"],'india':["9"],'mexico':["31"],'canada':["61"],'dormant':[str(dormant)],'passive':[str(passive)],'active':[str(active)]}
    return json.dumps(temp)


@app.route('/upcumrenew')
def upcumrenew():

    db = mysql.connector.connect(
    host="34.214.24.229",
    user="IE-tech",
    passwd="IE-tech@2O2O",
    database="compassJune")

    q1="""
    select year(y.SubscriptionExpired), monthname(y.SubscriptionExpired),month(y.SubscriptionExpired),year(y.SubscriptionExpired),
    count(y.SCHOOL_ID) as 'Expiring soon',
    count(case when y.Practice is not null then y.SCHOOL_ID end) as 'Expiring soon but active',
    count(case when year(y.Practice)>'2019' then y.SCHOOL_ID end) as 'Expiring soon but active in 2020'
     from (select x.SCHOOL_ID,date(max(atd.MODIFIED_DATE)) as Practice ,date(x.SUBSCRIPTION_EXPIRE_DATE) as 
     'SubscriptionExpired'
     from (select up.school_id, up.user_id, um.admin_col, sbm.SUBSCRIPTION_EXPIRE_DATE
    from user_master um left join user_profile up 
    on up.user_id = um.user_id
    left join school_master sm
    on sm.id= up.school_id
    left join subscription_master sbm
    on sbm.user_id = um.user_id
    where um.user_name not like '%TEST%' and um.IS_DISABLED != 'Y' and um.IS_BLOCKED != 'Y'
    and um.INCOMPLETE_SIGNUP != 'Y' and um.role_id !=3 and sm.name not like '%blocked%' and um.admin_col like '%admin%'
    and sbm.SUBSCRIPTION_EXPIRE_DATE
    between '2020-04-01 00:00:00.000000' and 
    '2020-09-31 00:00:00.000000'
    group by up.SCHOOL_ID) as x
    left join 
    user_profile as up on up.school_id=x.SCHOOL_ID
    left join user_master as um on um.USER_ID=up.USER_ID
    left join audio_track_detail as atd on atd.USER_ID=up.USER_ID
    where um.user_name not like '%TEST%' and um.IS_DISABLED != 'Y' and um.IS_BLOCKED != 'Y'
    and um.INCOMPLETE_SIGNUP != 'Y' and um.role_id !=3 and um.EMAIL_ID not like '%1gen%'
    group by x.SCHOOL_ID) as y
    group by monthname(y.SubscriptionExpired) order by year(y.SubscriptionExpired) asc, month(y.SubscriptionExpired) asc
    """

    df=pd.read_sql(q1, con=db)
    month =['APR','MAY','JUN','JUL','AUG','SEP']
    es=df['Expiring soon'].tolist()
    esa=df['Expiring soon but active'].tolist()
    esa20=df['Expiring soon but active in 2020'].tolist()
    temp={'month':month,'es':es,'esa':esa,'esa20':esa20}
    return json.dumps(temp)

@app.route('/upforrenew')
def upforrenew():

    db = mysql.connector.connect(
    host="34.214.24.229",
    user="IE-tech",
    passwd="IE-tech@2O2O",
    database="compassJune")

    q1="""select year(y.SubscriptionExpired_inCurrentSchoolyear), monthname(y.SubscriptionExpired_inCurrentSchoolyear),month(y.SubscriptionExpired_inCurrentSchoolyear),
    count(y.SCHOOL_ID) as 'Expiring soon',
    count(case when y.Practice is not null then y.SCHOOL_ID end) as 'Expiring soon but active',
    count(case when year(y.Practice)>'2019' then y.SCHOOL_ID end) as 'Expiring soon but active in 2020'
     from (select x.SCHOOL_ID,date(max(atd.MODIFIED_DATE)) as 'Practice' ,date(x.SUBSCRIPTION_EXPIRE_DATE) as 
     'SubscriptionExpired_inCurrentSchoolyear'
     from (select up.school_id, up.user_id, um.admin_col, sbm.SUBSCRIPTION_EXPIRE_DATE
    from user_master um left join user_profile up 
    on up.user_id = um.user_id
    left join school_master sm
    on sm.id= up.school_id
    left join subscription_master sbm
    on sbm.user_id = um.user_id
    where um.user_name not like '%TEST%' and um.IS_DISABLED != 'Y' and um.IS_BLOCKED != 'Y'
    and um.INCOMPLETE_SIGNUP != 'Y' and um.role_id !=3 and sm.name not like '%blocked%' and um.admin_col like '%admin%'
    and sbm.SUBSCRIPTION_EXPIRE_DATE
    between '2019-07-01 00:00:00.000000' and 
    '2020-03-31 00:00:00.000000'
    group by up.SCHOOL_ID) as x
    left join 
    user_profile as up on up.school_id=x.SCHOOL_ID
    left join user_master as um on um.USER_ID=up.USER_ID
    left join audio_track_detail as atd on atd.USER_ID=up.USER_ID
    where um.user_name not like '%TEST%' and um.IS_DISABLED != 'Y' and um.IS_BLOCKED != 'Y'
    and um.INCOMPLETE_SIGNUP != 'Y' and um.role_id !=3 and um.EMAIL_ID not like '%1gen%'
    group by x.SCHOOL_ID) as y
    group by monthname(y.SubscriptionExpired_inCurrentSchoolyear)  order by year(y.SubscriptionExpired_inCurrentSchoolyear) asc, month(y.SubscriptionExpired_inCurrentSchoolyear) asc 
    """

    df=pd.read_sql(q1, con=db)
    month =['JUL','AUG','SEP','OCT','NOV','DEC','JAN','FEB','MAR']
    es=df['Expiring soon'].tolist()
    esa=df['Expiring soon but active'].tolist()
    esa20=df['Expiring soon but active in 2020'].tolist()
    temp={'month':month,'es':es,'esa':esa,'esa20':esa20}
    return json.dumps(temp)

@app.route('/<district>')
def shool_dash_map_tablebjhb(district):
    db = mysql.connector.connect(
    host="34.214.24.229",
    user="IE-tech",
    passwd="IE-tech@2O2O",
    database="compassJune")
    qr="""select * from
    (SELECT sm.ID,um.USER_ID,sm.name as school_name,um.email_id,count(atd.user_id) as practice_count,um.district_name,count(ll.last_logged_in)
   from user_master um left join user_profile up on up.USER_ID=um.USER_ID
   left join school_master sm on sm.id=up.SCHOOL_ID
   left join audio_track_detail atd on um.user_id=atd.user_id
   left join login_logs ll on um.user_id=ll.user_id
   where um.user_name not like '%TEST%' and um.IS_DISABLED != 'Y' and um.IS_BLOCKED != 'Y' and sm.name not like '%blocked%'
   and um.INCOMPLETE_SIGNUP != 'Y' and um.district_name like '%"""+district+"""%' and sm.name != " "
   group by um.user_id) x
   left join 
   (SELECT um.USER_ID as id1,count(atd.user_id) as practice_count12
   from user_master um left join user_profile up on up.USER_ID=um.USER_ID
   left join school_master sm on sm.id=up.SCHOOL_ID
   left join audio_track_detail atd on um.user_id=atd.user_id
   left join login_logs ll on um.user_id=ll.user_id
   where um.user_name not like '%TEST%' and um.IS_DISABLED != 'Y' and um.IS_BLOCKED != 'Y' and sm.name not like '%blocked%' and date(atd.MODIFIED_DATE) > '2019-07-31'
   and um.INCOMPLETE_SIGNUP != 'Y' and um.district_name like '%"""+district+"""%' and sm.name != " "
   group by um.user_id) y
   
   on x.USER_ID=y.id1"""
    df=pd.read_sql(qr, con=db)
    df['practice_count12'].fillna(0, inplace = True)
    df['practice_count12'] = df['practice_count12'].apply(np.int64)
    df['district_name'] = df['district_name'].str.capitalize() 
    dfdd=df[['district_name','practice_count12']]
    dfdd1=dfdd.groupby(['district_name'])['practice_count12'].sum().reset_index()
    links0 = dfdd1.rename(columns={'district_name' : 'name', 'practice_count12' : 'Practice Count'}).to_dict('r')
    df1=df[['email_id','practice_count12','count(ll.last_logged_in)']]
    df1.rename(columns = {'count(ll.last_logged_in)':'login'}, inplace = True) 
    df1.loc[(df1['practice_count12'] > 50) , 'hex'] = '#006400' #Power
    df1.loc[(df1['practice_count12'] > 6) & (df1['practice_count12'] <= 50), 'hex'] = '#00a651'  #ACTIVE
    df1.loc[(df1['practice_count12'] > 0) & (df1['practice_count12'] <= 6), 'hex'] = '#fff44f'  #PASSIVE
    df1.loc[(df1['practice_count12'] == 0) & (df1['practice_count12'] == 0), 'hex'] = '#ff8300' #DROMANT
    df2=df1[['email_id','hex']]
    links = df2.rename(columns={'email_id' : 'name', 'hex' : 'hex'}).to_dict('r')
    dfdatas=df[['school_name','practice_count12','ID']]
    dfdata2=dfdatas.groupby(['ID','school_name'])['practice_count12'].sum().reset_index()
    dfdata3=dfdata2[['school_name','practice_count12']]
    links1 = dfdata3.rename(columns={'school_name' : 'name', 'practice_count12' : 'Practice Count'}).to_dict('r')
    dfdatae=df[['email_id','practice_count12']]
    links2 = dfdatae.rename(columns={'email_id' : 'name', 'practice_count12' : 'Practice Count'}).to_dict('r')
    links0.extend(links1)
    links0.extend(links2)
    dfst=df[['school_name','email_id']]
    links3 = dfst.rename(columns={'school_name' : 'source', 'email_id' : 'target'}).to_dict('r')
    df4=df[['district_name','school_name','ID']]
    df5 = df4.drop_duplicates(subset='ID', keep="first")
    df6=df5[['district_name','school_name']]
    links4 = df6.rename(columns={'district_name' : 'source', 'school_name' : 'target'}).to_dict('r')
    results = []
    for n in links3:
        for m in links4:
            if n['source']==m['target']:
                results.append(m)
            elif m not in results:
                results.append(n)
          
    res = [] 
    for i in results: 
        if i not in res: 
            res.append(i) 
    temp={"nodes":links0,"links":res,"attributes":links}
    return(json.dumps(temp))


@app.route('/Family_SURVEY')
def Family_SURVEY():
    if not g.user:
        return redirect(url_for('login'))
    return render_template('Family_SURVEY.html')
@app.route('/Bill_later')
def Bill_later():
    if not g.user:
        return redirect(url_for('login'))
    return render_template('Bill_later.html')

@app.route('/Family_Jounrey_card')
def Journey_score2():
    if not g.user:
        return redirect(url_for('login'))
    
    return render_template('familycard.html')

@app.route('/Journey_score')
def reportcard():
    if not g.user:
        return redirect(url_for('login'))
    
    return render_template('Journey_score.html')
@app.route('/feedback_Analyitcs_family')
def feedbackfamily():
    if not g.user:
        return redirect(url_for('login'))
    
    return render_template('feedback_Analyitcs_family.html')


@app.route("/logout")
def logout():
    session.pop('user_id', None)
    return render_template('login.html')

if __name__ == '__main__':
   app.run()