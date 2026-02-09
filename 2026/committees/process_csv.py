import csv

with open('committee_spreadsheet.csv', newline='') as csvfile:
    csv_reader = csv.reader(csvfile, delimiter=',')
    area = ''
    for row in csv_reader:
        area_change = False
        if area is '':
            area = row[2]
            area_change =  True
        elif area != row[2]:
            area = row[2]
            area_change = True
        if area_change:
            print('')
            print(area)
            print('====================')
        print("<li>" + row[0] + " " + row[1] + ", " + "<em>" + row[3] + "</em></li>")
