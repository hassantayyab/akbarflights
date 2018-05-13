import time
from selenium.webdriver.common.by import By
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.common.action_chains import ActionChains
from selenium.webdriver.support.ui import Select
from selenium.webdriver import Chrome
from selenium.webdriver import ChromeOptions
from bs4 import BeautifulSoup
import re
import sys
import json
######################################### USER INPUT ########################################
# data = 'Kolkata,Chennai,2018-04-27,2018-04-28,First,1,2,0'
#Read data from stdin
def read_in():
	lines = sys.stdin.readlines()
	return json.loads(lines[0])

lines = read_in()
data = lines.split(',')
#---------------------------------------------
username = str(data[9])
password = str(data[10])

oneWay = False
roundTrip = False
if (int(data[8]) == 1):
	oneWay = True
elif (int(data[8]) == 2):
	roundTrip = True

src = str(data[0])  # "Kolkata"
dst = str(data[1])  # "Chennai"

dept_date = str(data[2][8:10]) + '/' + \
    str(data[2][5:7]) + '/' + str(data[2][0:4])
ret_date = str(data[3][8:10]) + '/' + \
    str(data[3][5:7]) + '/' + str(data[3][0:4])

n_adlts = str(data[5])			# 1 - 9 (Number)
n_chldrn = str(data[6])			# 0 - 8 (Number)
n_infnt = str(data[7])			# 0 - 1 (Number)

# 'E'-> Economy, 'B'-> Business, 'F'-> First Class, 'PE'-> Premium Economy
trv_opt = str(data[4])
delay = 1
######################################### Webdriver ########################################
t1 = time.time()

options = ChromeOptions()
options.add_argument("headless")
driver = Chrome(executable_path=r"chromedriver",chrome_options=options)

link = "http://exindia.akbartravelsonline.com/MyAccount/Login"
driver.get(link)

# Login
usernameField = driver.find_element_by_id("LoginID")
passwordField = driver.find_element_by_id("LoginPwd")
usernameField.send_keys(username)
passwordField.send_keys(password)
loginButton = driver.find_element_by_id("IDLoginUser")
loginButton.click()

# Form filling
WebDriverWait(driver, 60).until(EC.element_to_be_clickable((By.ID, "SearchType1")))

From = WebDriverWait(driver, 60).until(EC.presence_of_element_located((By.ID, "From")))
From.clear()
From.send_keys(src)
time.sleep(delay)
From.send_keys(Keys.RETURN)
To = driver.find_element_by_id("To")
To.clear()
To.send_keys(dst)
time.sleep(delay)
To.send_keys(Keys.RETURN)

DepartureDate = driver.find_element_by_id("DepartureDate")
DepartureDate.click()
time.sleep(delay)
driver.find_element_by_xpath("//td[@data-month='" +str(int(dept_date.split("/")[1])-1)+ "' and @data-year='" +dept_date.split("/")[2]+ "']/a[text()='" +dept_date.split("/")[0]+ "']").click()

if roundTrip and not oneWay:
	driver.find_element_by_id("SearchType2").click()
	time.sleep(delay)
	ReturnDate = WebDriverWait(driver, 60).until(EC.element_to_be_clickable((By.ID, "ReturnDate")))	
	ReturnDate.click()
	time.sleep(delay)
	driver.find_element_by_xpath("//td[@data-month='" +str(int(ret_date.split("/")[1])-1)+ "' and @data-year='" +ret_date.split("/")[2]+ "']/a[text()='" +ret_date.split("/")[0]+ "']").click()


Adlt = Select(driver.find_element_by_id("Adlt"))
Adlt.select_by_value(n_adlts)
Chld = Select(driver.find_element_by_id("Chld"))
Chld.select_by_value(n_chldrn)
Inft = Select(driver.find_element_by_id("Inft"))
Inft.select_by_value(n_infnt)
Travel = Select(driver.find_element_by_id("Travel"))
Travel.select_by_value(trv_opt)
driver.find_element_by_xpath("//span[contains(text(), 'SEARCH')]").click()

if oneWay and not roundTrip:
	WebDriverWait(driver, 60).until(EC.presence_of_element_located((By.ID, "divFlightDetails")))
	soup = BeautifulSoup(driver.page_source,"html.parser")
	results = dict()
	typ = soup.find("div",class_="sect-head").get_text().strip()
	typ = ' '.join(typ.split())
	oneSide = soup.find("div",id="divFlightDetails")
	flightNums = [n.get_text() for n in oneSide.find_all("div",class_="airlinedet") if n.get_text().strip()]
	flightDepAndArr = [n.get_text(" ") for n in oneSide.find_all("div",class_="tltip depart") if n.get_text()]
	flightDeparture = [flightDepAndArr[x] for x in range(0,len(flightDepAndArr),2)]
	flightArrival = [flightDepAndArr[x] for x in range(1,len(flightDepAndArr),2)]
	flightDuration = [n.get_text().strip() for n in oneSide.find_all("div",class_="duration") if n.get_text()]	
	flightFare = [n.get_text().replace('\xa0',' ') for n in oneSide.find_all("span",id=re.compile('^spnFareDetail')) if n.get_text()]
	flightImages = [n.find("img")["src"] for n in oneSide.find_all("div",class_="airlinedet") if n.find("img")]
	results[typ] = list(zip(flightNums,flightImages,flightDeparture,flightDuration,flightArrival,flightFare))

	res = json.dumps(results)
	print(res)

elif roundTrip and not oneWay:
	WebDriverWait(driver, 60).until(EC.visibility_of_element_located((By.CLASS_NAME, "doms-listcont")))
	soup = BeautifulSoup(driver.page_source,"html.parser")
	results = dict()
	leftSide = soup.find("div",id="divOWBx") 
	left = leftSide.find("div",class_="doms-showinghead-text").get_text().strip().encode("ascii", "ignore").decode("utf-8")
	left = ' '.join(left.split()).replace(" "," to ")
	flightNums = [n.get_text() for n in leftSide.find_all("div",class_="doms-box-twotext") if n.get_text().strip()]
	flightDeparture = [n.get_text(" ") for n in leftSide.find_all("div",class_="doms-box-threetext") if n.get_text()]
	flightDuration = [n.get_text(" ") for n in leftSide.find_all("div",class_="doms-box-fouetext") if n.get_text()]
	flightArrival = [n.get_text(" ") for n in leftSide.find_all("div",class_="doms-box-fivetext") if n.get_text()]
	flightFare = [n.get_text().replace('\xa0',' ') for n in leftSide.find_all("div",id=re.compile('^FareDetail')) if n.get_text()]
	flightImages = [n.find('img')['src'] for n in leftSide.find_all("div", class_="doms-box-twotext") if n.find('img')]
	results[left] = list(zip(flightNums,flightImages,flightDeparture,flightDuration,flightArrival,flightFare))		
	rightSide = soup.find("div",id="divRTBx") 
	right = rightSide.find("div",class_="doms-showinghead-text").get_text().strip().encode("ascii", "ignore").decode("utf-8")
	right = ' '.join(right.split()).replace(" "," to ")
	flightNums = [n.get_text() for n in rightSide.find_all("div",class_="doms-box-twotext") if n.get_text().strip()]
	flightDeparture = [n.get_text(" ") for n in rightSide.find_all("div",class_="doms-box-threetext") if n.get_text()]
	flightDuration = [n.get_text(" ") for n in rightSide.find_all("div",class_="doms-box-fouetext") if n.get_text()]
	flightArrival = [n.get_text(" ") for n in rightSide.find_all("div",class_="doms-box-fivetext") if n.get_text()]
	flightFare = [n.get_text().replace('\xa0',' ') for n in rightSide.find_all("div",id=re.compile('^FareDetail')) if n.get_text()]
	flightImages = [n.find('img')['src'] for n in rightSide.find_all("div", class_="doms-box-twotext") if n.find('img')]
	results[right] = list(zip(flightNums,flightImages,flightDeparture,flightDuration,flightArrival,flightFare))	

	res = json.dumps(results)
	print(res)

driver.quit()

# print("\nElapsed time:",time.time()-t1)
