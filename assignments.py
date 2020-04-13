import requests
import json
from icalendar import Calendar, Event
import datetime
from datetime import timedelta
import calendar

url = "https://canvas.chapman.edu/api/v1/courses"
headers = {'Authorization' : 'Bearer 13679~oCA3xVNzmeE11RfWJPpH5vbS2M4R9FJNEa4xQtuirxyDUYMVFbgoBfdp6Eq3d3wk'}
r = requests.get(url, headers = headers)
data = r.json()

yesterday = datetime.datetime.today() - timedelta(days=1)
margin = datetime.timedelta(days = 7)

for course in data:
    rt = requests.get(course['calendar']['ics'], headers = headers)
    open('calendar.ics', 'wb').close()
    f = open('calendar.ics', 'wb')
    f.write(rt.content)
    f.close()

    g = open('calendar.ics','rb')
    gcal = Calendar.from_ical(g.read())

    counter = 0
    for component in gcal.walk():
        if component.name == "VEVENT":
            strdate = str(component.get('dtstart').dt)
            strdate = strdate[:19]
            date = datetime.datetime.strptime(strdate, '%Y-%m-%d %H:%M:%S')
            month = calendar.month_name[int(date.strftime("%m"))]
            day = date.strftime("%d")

            if (yesterday <= date <= yesterday + margin):
                if counter == 0:
                    print("-------------------------------------------------------------------------------------------------------------------")
                    print(course['name'])
                    print(component.get('summary'))
                    print("DUE: " + month + " " + day)
                    print("\n")
                    counter = 1
                elif counter != 0:
                    print(component.get('summary'))
                    print("DUE: " + month + " " + day)
                    print("\n")

    g.close()
