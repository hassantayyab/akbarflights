import sys
import json
import time
from selenium.webdriver.common.by import By
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.common.action_chains import ActionChains
from bs4 import BeautifulSoup
from selenium.webdriver import Firefox
from selenium.webdriver import FirefoxProfile
from selenium.webdriver.firefox.options import Options


######################################### Webdriver ########################################
opts = Options()
profile = FirefoxProfile()
profile.set_preference("javascript.enabled", False)
driver = Firefox(options=opts,firefox_profile=profile)
driver.get("https://www.akbartravels.com/")
delay = 5
######################################### USER INPUT ########################################
#**************FORMATTING********************#
# data = 'Kolkata,Chennai,2018-04-27,2018-04-28,First,1,2,0'
#Read data from stdin


def read_in():
	lines = sys.stdin.readlines()
	# Since our input would only be having one line, parse our JSON data from that
	return json.loads(lines[0])


lines = read_in()
data = lines.split(',')
#---------------------------------------------
# print(data)
# trv_opt = 0 # 0->Economy 1->Business 2->First 3->Premium
# src = "Kolkata"
# dst = "Chennai"
# dept_date = "28/04/2018"
# ret_date = "29/04/2018"
# trv_opt = 0

src = str(data[0])  # "Kolkata"
dst = str(data[1])  # "Chennai"
dept_date = str(data[2][8:10]) + '/' + \
    str(data[2][5:7]) + '/' + str(data[2][0:4])
ret_date = str(data[3][8:10]) + '/' + \
    str(data[3][5:7]) + '/' + str(data[3][0:4])
trv_opt = int(data[4])

#------------------------
# print('data: ',src, dst, dept_date, ret_date, trv_opt)
n_adlts = None
n_chldrn = None
n_infnt = None
way_1 = False		# One way trip
r_t = False		# Round trip
m_c = False			# Multiple Trips
if (int(data[8])==1):
	way_1 = True
elif (int(data[8])==2):
	r_t = True
elif (int(data[8])==3):
	m_c = True
##############################################################################################

def scrool(driver):
	global delay
	last_height = driver.execute_script("return document.body.scrollHeight")
	count = last_height
	# print("last_height,new_height")
	while True:
		driver.execute_script("window.scrollTo(0, {});".format(last_height))
		time.sleep(delay)
		new_height = driver.execute_script("return document.body.scrollHeight")
		# print(last_height,',',new_height)
		if new_height == last_height:
			return
		last_height = new_height

t1 = time.time()
if way_1:
	one_way = driver.find_element_by_xpath("//*[@class='oneway']/div/span")
	one_way.click()
elif r_t:
	round_trip = driver.find_element_by_xpath("//*[@class='round-trip']/div/span")
	round_trip.click()
elif m_c:
	multi_city = driver.find_element_by_xpath("//*[@class='multi-city']/div/span")
	multi_city.click()
intl_btn = driver.find_element_by_xpath("//h2[@class='international-btn']")
dmst_btn = driver.find_element_by_xpath("//h2[@class='domestic-btn']")
frm = driver.find_element_by_id("From")
frm.clear()
frm.send_keys(src)
time.sleep(delay)
frm.send_keys(Keys.RETURN)
to = driver.find_element_by_id("To")
to.clear()
to.send_keys(dst)
time.sleep(delay)
to.send_keys(Keys.RETURN)
trv_class = driver.find_element_by_id("TravelClass") # up/down keys to nav economy by default
time.sleep(delay)
for i in range(1,trv_opt):
	trv_class.send_keys(Keys.DOWN) # selects business class
trv_class.click()
adlts = driver.find_element_by_id("Adults") # 12+ Years		use +ve integer to send values
if n_adlts != None:
	adlts.send_keys(n_adlts)
chldrn = driver.find_element_by_id("Chindren") # 2-12 Years	use +ve integer to send values
if n_chldrn != None:
	chldrn.send_keys(n_chldrn)
infnt = driver.find_element_by_id("Infants") # 0-23 Months	use +ve integer to send values
if n_infnt != None:
	infnt.send_keys(n_infnt)
time.sleep(delay)
driver.execute_script('document.getElementById("Departure").removeAttribute("readonly")')
dept_lbl = driver.find_element_by_xpath("//div[@class='departs']/label")
dept = driver.find_element_by_id("Departure")	# send date in dd/mm/yyyy format
dept.click()
dept.clear()
dept.send_keys(dept_date)
dept_lbl.click()

if r_t:
	driver.execute_script('document.getElementById("Return").removeAttribute("readonly")')
	ret_lbl = driver.find_element_by_xpath("//div[@class='returns']/label")
	ret = driver.find_element_by_id("Return")	# send date in dd/mm/yyyy format
	ret.click()
	ret.clear()
	ret.send_keys(ret_date)
	ret_lbl.click()

search_btn = driver.find_element_by_id("FlightSearchBtn")
time.sleep(delay)
search_btn.click()

if m_c:
	add_city = driver.find_element_by_class_name("mlti-add")
	mc_froms = [x for x in driver.find_elements_by_xpath("//*[@value='Select Departure City']")] 
	mc_tos = [x for x in driver.find_elements_by_xpath("//*[@value='Select Destination City']")]
	mc_dests = [x for x in driver.find_elements_by_xpath("//*[@value='dd/mm/yyyy']")] # send date in dd/mm/yyyy format

####################################################################################################
# try:
# 	WebDriverWait(driver, 60).until(EC.element_to_be_clickable((By.ID, "wzrk-cancel"))).click()
# 	time.sleep(delay)

# except:
# 	pass

if way_1:
	WebDriverWait(driver, 60).until(EC.element_to_be_clickable((By.CLASS_NAME, "display-right-section")))
	time.sleep(delay)
	scrool(driver)
	soup = BeautifulSoup(driver.page_source,"html.parser")

	results = dict()

	typ = driver.find_element_by_xpath("//div[@class='sector-details']/h2").text 
	oneSide = soup.find("div",class_="dis-list-wrap")
	flightNums = [n.get_text() for n in oneSide.find_all("div",class_="dspl-flgt-nm") if n.get_text()]
	flightDeparture = [n.get_text() for n in oneSide.find_all("div",class_="dep-flgt") if n.get_text()]
	flightDuration = [n.get_text() for n in oneSide.find_all("div",class_="dep-time") if n.get_text()]
	flightArrival = [n.get_text() for n in oneSide.find_all("div",class_="arvl-time") if n.get_text() != '' and ':' in n.get_text()]
	flightFare = [n.get_text() for n in oneSide.find_all("div",class_="totel-fare") if n.get_text() != '']
	flightImages = [n.find("img")["src"] for n in oneSide.find_all("div",class_="jet-kot")]
	results[typ] = list(zip(flightNums,flightImages,flightDeparture,flightDuration,flightArrival,flightFare))

	res = json.dumps(results)
	print(res)

elif r_t:
	WebDriverWait(driver, 60).until(EC.element_to_be_clickable((By.ID, "owsector")))
	time.sleep(delay*2)
	soup = BeautifulSoup(driver.page_source,"html.parser")	

	results = dict()

	left = soup.find("div",class_="split-left-main").find("div",class_="split-head").find("div",id="owsector").get_text().strip().encode("ascii", "ignore").decode("utf-8")
	left = ' '.join(left.split()).replace(" ","-")
	leftSide = soup.find("div",id="owdisplay")
	flightNums = [n.get_text() for n in leftSide.find_all("div",class_="flt-depbt") if n.get_text()]
	flightImages = [n.find('img')['src'] for n in leftSide.find_all("div", class_="flt-depbt") if n.find('img')]
	flightDeparture = [n.get_text() for n in leftSide.find_all("div",class_="flt-durbt") if n.get_text()]
	flightDuration = [n.get_text() for n in leftSide.find_all("div",class_="flt-arrbt") if n.get_text()]
	flightArrival = [n.get_text().strip(".") for n in leftSide.find_all("div",class_="flt-prcbt") if n.get_text() and ':' in n.get_text()]
	flightFare = [n.get_text() for n in leftSide.find_all("div",class_="totel-fare-big") if n.get_text()]
	results[left] = list(zip(flightNums,flightImages,flightDeparture,flightDuration,flightArrival,flightFare))		

	right = soup.find("div",class_="split-right-main").find("div",class_="split-head").find("div",id="owsector").get_text().strip().encode("ascii", "ignore").decode("utf-8")
	right = ' '.join(right.split()).replace(" ","-")
	rightSide = soup.find("div",id="rtdisplay")
	flightNums = [n.get_text() for n in rightSide.find_all("div",class_="flt-depbt") if n.get_text()]
	flightImages = [n.find('img')['src'] for n in rightSide.find_all("div", class_="flt-depbt") if n.find('img')]
	flightDeparture = [n.get_text() for n in rightSide.find_all("div",class_="flt-durbt") if n.get_text()]
	flightDuration = [n.get_text() for n in rightSide.find_all("div",class_="flt-arrbt") if n.get_text()]
	flightArrival = [n.get_text().strip(".") for n in rightSide.find_all("div",class_="flt-prcbt") if n.get_text() and ':' in n.get_text()]
	flightFare = [n.get_text() for n in rightSide.find_all("div",class_="totel-fare-big") if n.get_text()]
	results[right] = list(zip(flightNums,flightImages,flightDeparture,flightDuration,flightArrival,flightFare))

	res = json.dumps(results)
	print(res)

driver.quit()
# print("\nElapsed time:",time.time()-t1)


