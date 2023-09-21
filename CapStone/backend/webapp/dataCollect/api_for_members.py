import requests
import datetime 
from datetime import datetime as dt
import xmltodict
from huggingface_hub import InferenceClient

# for now api_key must be passed, because this package does not
# have access to the app.config because it is not in application
# instance. That would be convenient but not necessary.

# used
def propublica_get_members(api_key, congress, chamber):
    """
    Returns list of members.
    congress int: 102-117 for House, 80-117 for Senate
    chamber str: house or senate
    """
    # define url and headers
    url = f"https://api.propublica.org/congress/v1/{congress}/{chamber}/members.json"
    headers = {"X-API-Key": api_key}
    # get request to api socket
    try:
        result = requests.get(url, headers=headers)
        # turn to dictionary
        result = result.json()

        return result
    except:
        raise Exception("failed to get members")

# used
def congressgov_get_image(api_key, bioguide_id):
    url = f"https://api.congress.gov/v3/member/{bioguide_id}?api_key={api_key}"

    try:
        result = requests.get(url)
        imageUrl = result.json()
        print(imageUrl)

        if "error" in imageUrl.keys():
            print("error")
            print(imageUrl)
            raise Exception(imageUrl["error"]["code"])
        
        if "depiction" in imageUrl['member'].keys():
            return imageUrl['member']['depiction']['imageUrl']
        else:
            return "https://static.vecteezy.com/system/resources/thumbnails/010/260/479/small/default-avatar-profile-icon-of-social-media-user-in-clipart-style-vector.jpg"

    except Exception as e:
        raise e

# used
def congressgov_get_bills(api_key):
    url = f"https://api.congress.gov/v3/bill?api_key={api_key}"
 
    # return bills from last two days
    toTime = datetime.date.today()
    diff = datetime.timedelta(days = 2)
    fromTime = toTime - diff

    params = {
        "fromDateTime": str(fromTime) + "T00:00:00Z",
        "toDateTime": str(toTime) + "T00:00:00Z"
    }

    try:
        result = requests.get(url, params=params, timeout=5)
        bills = result.json()

        return bills['bills']
    except:
        raise Exception("failed to get bills")

def congressgov_get_bill_contents_url(api_key, congress, bill_type, bill_number):
    # url = f"https://xwww.congress.gov/{congress}/bills/{bill_type}{bill_number}/BILLS-{congress}{bill_type}{bill_number}rs.xml"
    # works better below
    url = f"https://api.congress.gov/v3/bill/{congress}/{bill_type.lower()}/{bill_number}/text?format=json"
    params = {
        "api_key": api_key,
        "format": "xml"
    }

    try:
        result = requests.get(url, params=params, timeout=5)
        result = result.text

        # extract url, it is the first one in the list
        i = result.find('https://www.congress.gov')
        if i == -1:
            # i = result.find('https://api.congress.gov')
            return None
        k = i
        while result[k] != '\n':
            k += 1
        bill_contents_url = result[i:k]

        return bill_contents_url
    except:
        raise Exception("failed to get bill contents url")

def congressgov_get_bill_contents(api_key, content_url):
    try:
        content_raw = requests.get(content_url, params={"api_key": api_key}, timeout=5)
        content = xmltodict.parse(content_raw.content)
    except:
        raise Exception("failed to get bill contents")
    return content

def summ_model(auth_key, payload):
    def check_parenthesis(text):
        if text[0] == "(" and text.contains(')'):
            print("top")
            arr = text.split(')')
            if arr[1] != '':
                return arr[1:]
        elif text[0] == ('('):
            print("bottom")
            arr = text.split('.')
            if arr[1] != '':
                return arr[1:]
        else:
            return text        

    def check_punct(text):
        if text != None:
            if text[-1] == '.':
                return text[:-1] + '...'
            else:
                return text
            
    def check_rand(text):
        if "This measure has" in text:
            i = text.index("This")
            if text[i-1] == "(":
                i = i - 1
            j = text.index("repeated here") + 13
            if text[j] == ".":
                j = j + 1
                if text[j] == ")":
                    j = j + 1
            return text[:i] + text[j:]
        else:
            return text

    def post_process(text):
        text = check_parenthesis(text)
        text = check_punct(text)
        text = check_rand(text)
        text = text.replace("  ", " ") 
        text = text.replace("&quot", "'")
        return text
    
    params1 = {
        "min_length": 20,
        "max_length": 50
    }
    params2 = {
        "min_length": 75,
        "max_length": 150
    }
    params3 = {
        "min_length": 175,
        "max_length": 275,
        "top_k": 4,
        "penalty_alpha": 0.6
    }

    client = InferenceClient(model="google/pegasus-billsum",token=auth_key, timeout=300)
    out_data_short = post_process(client.summarization(text=payload, parameters=params1))
    out_data_med = post_process(client.summarization(text=payload, parameters=params2))
    out_data_long = post_process(client.summarization(text=payload, parameters=params3))

    return out_data_short, out_data_med, out_data_long

def openstates_get_state_politicians(apikey, state_abb, branch):
    state_full = {
        "AL": "Alabama",
        "AK": "Alaska",
        "AZ": "Arizona",
        "AR": "Arkansas",
        "CA": "California",
        "CO": "Colorado",
        "CT": "Connecticut",
        "DE": "Delaware",
        "FL": "Florida",
        "GA": "Georgia",
        "HI": "Hawaii",
        "ID": "Idaho",
        "IL": "Illinois",
        "IN": "Indiana",
        "IA": "Iowa",
        "KS": "Kansas",
        "KY": "Kentucky",
        "LA": "Louisiana",
        "ME": "Maine",
        "MD": "Maryland",
        "MA": "Massachusetts",
        "MI": "Michigan",
        "MN": "Minnesota",
        "MS": "Mississippi",
        "MO": "Missouri",
        "MT": "Montana",
        "NE": "Nebraska",
        "NV": "Nevada",
        "NH": "New Hampshire",
        "NJ": "New Jersey",
        "NM": "New Mexico",
        "NY": "New York",
        "NC": "North Carolina",
        "ND": "North Dakota",
        "OH": "Ohio",
        "OK": "Oklahoma",
        "OR": "Oregon",
        "PA": "Pennsylvania",
        "RI": "Rhode Island",
        "SC": "South Carolina",
        "SD": "South Dakota",
        "TN": "Tennessee",
        "TX": "Texas",
        "UT": "Utah",
        "VT": "Vermont",
        "VA": "Virginia",
        "WA": "Washington",
        "WV": "West Virginia",
        "WI": "Wisconsin",
        "WY": "Wyoming"
    }
    branch_sudonym = {
        "House": "lower",
        "Senate": "upper"
    }
    url = f"https://v3.openstates.org/people"


    params = {
        "jurisdiction": state_full[state_abb],
        "page": 1,
        "per_page": 50,
        "apikey": apikey
    }
    if state_abb == "NE":
        params["org_classification"] = "legislature"
    else:
        params["org_classification"] = branch_sudonym[branch]

    try:
        congressmen = []
        while True:
            # print(params)
            data = requests.get(url, params=params).json()
            print('data got')
            if "exceeded limit" in str(data):
                print(str(data))
                raise Exception("Request limit exceeded.")

            for c in data["results"]:
                congressmen.append(c)
            print('loop done')
            params["page"] += 1
            if params["page"] > data["pagination"]["max_page"]:
                break
            print('page done')
        return congressmen
    except Exception as e:
        # print(e)
        raise Exception(f"Failed to get state congressmen: {str(e)}")
    
# not an API call, used in the next function
def _normalize_new_timestamp(timestamp):
    try:
        #2023-08-05T15:56:00Z
        # Parse the timestamp string into a datetime object
        timestamp = timestamp.replace("Z", "")
        timestamp = timestamp.replace("T", " ")
        month = timestamp[5:7]
        day = timestamp[8:10]
        year = timestamp[0:4]
        time = timestamp[11:19]
        # Return the components as an array
        return [month, day, year, time]
    except ValueError:
        return timestamp

# basic call to the news API, returns a list of dictionaries
def fetchNews(news_api_key):
    out_dicts = []
    url = 'https://newsapi.org/v2/top-headlines?country=us&category=politics'

    params = {
        'apiKey': news_api_key,
    }

    # Make the request
    try:
        response = requests.get(url, params=params)
        for article in response.json()['articles']:
                if article['description'] is None:
                    abstract = "No abstract available"
                else:
                    abstract = article['description']
                    out_dicts.append({
                    "title" : article['title'],
                    "abstract" : abstract, # "No abstract available" if no abstract
                    "published_date" : dt.strptime(article['publishedAt'], "%Y-%m-%dT%H:%M:%SZ"),
                    "url" : article['url'],
                    "company" : article["source"]["name"],
                    "imgURL": article['urlToImage']
                })
        return out_dicts

    except Exception as e:
        raise Exception(e)

# returns articles related to a given term, same format as previous
def querySearchTerm(news_api_key, term):
    out_dicts = []
    url = f'https://newsapi.org/v2/everything?q={term}&language=en&sortBy=publishedAt'

    params = {
        'apiKey': news_api_key,
        'language': 'en',
    }

    # Make the request
    try:
        response = requests.get(url, params=params)
        for article in response.json()['articles']:
                if article['description'] is None:
                    abstract = "No abstract available"
                else:
                    abstract = article['description']
                out_dicts.append({
                "title" : (article['title']),
                "abstract" : (abstract), # "No abstract available" if no abstract
                "published_date" : dt.strptime(article['publishedAt'], "%Y-%m-%dT%H:%M:%SZ"),
                "url" : (article['url']),
                "company" : (article["source"]["name"]),
                "imgURL" : article['urlToImage']
            })
        return out_dicts
    except:
        raise Exception("failed to get news related to search term")

# returns a list of dictionaries, each dictionary represents an election
def fetchElections(election_api_key):
    try:
        x = requests.get('https://www.googleapis.com/civicinfo/v2/elections?key=' + election_api_key)
        response = (x.json())
        for dictionary in response["elections"]:
            if "ocdDivisionId" in dictionary:
                dictionary.pop("ocdDivisionId")
        return response["elections"]
    except:
        raise Exception("failed to fetch available elections")

# returns a list containing a metadata dictionary, a userAddress dictionary, an elecs dictionary, and a referendum dictionary
def fetchElectionInfo(election_api_key, address, electionID):
    try:
        metadata = {} # metadata["name"] => name, metadata["date"] => date, metadata["id"] => id
        userAddress = {} # userAddress["electionInfoUrl"] => url, userAddress["electionRegistrationUrl"] => url, ...
        elecs = {} # elecs["office"] => [(name, party), (name, party), ...]
        referendum = {} # dictionary["referendumTitle"] => [referendumSubtitle, referendumUrl]

        params = {'electionId':electionID, 'address':address, 'key': election_api_key}
        response = requests.get(f'https://www.googleapis.com/civicinfo/v2/voterinfo', params=params)
        data = response.json()

        if "election" in data.keys():
            
            metadata["name"] = data["election"]["name"]
            metadata["date"] = data["election"]["electionDay"]
            metadata["id"] = data["election"]["id"]

        if "state" in data.keys():
            
            if "electionInfoUrl" in data["state"][0]['electionAdministrationBody'].keys():
                userAddress["electionInfoUrl"] = data["state"][0]['electionAdministrationBody']["electionInfoUrl"]
            if "electionRegistrationUrl" in data["state"][0]['electionAdministrationBody'].keys():
                userAddress["electionRegistrationUrl"] = data["state"][0]['electionAdministrationBody']["electionRegistrationUrl"]
            if "votingLocationFinderUrl" in data["state"][0]['electionAdministrationBody'].keys():
                userAddress["votingLocationFinderUrl"] = data["state"][0]['electionAdministrationBody']["votingLocationFinderUrl"]
            if "ballotInfoUrl" in data["state"][0]['electionAdministrationBody'].keys():
                userAddress["ballotInfoUrl"] = data["state"][0]['electionAdministrationBody']["ballotInfoUrl"]

        if "contests" in data.keys():

            for contest in (data['contests']):
                if "office" in contest.keys():
                    office = (contest["office"])
                    elecs[office] = []
        
                if "candidates" in contest.keys():
                    for candidate in contest["candidates"]:
                        elecs[office].append((candidate["name"] , candidate["party"]))
                
                if "referendumTitle" in contest.keys():
                    if "referendumSubtitle" in contest.keys():
                        if "referendumUrl" in contest.keys():
                            referendum[contest["referendumTitle"]] = [contest["referendumSubtitle"], contest["referendumUrl"]] 
                        else:
                            referendum[contest["referendumTitle"]] = [contest["referendumSubtitle"], "No URL"]

        return [metadata, elecs, referendum, userAddress]
    except:
        raise Exception("failed to fetch election-address specific info")


if __name__ == '__main__':
    x = requests.get("https://api.congress.gov/v3/bill/118/hr/4333?format=xml", params={"api_key": "BLBBwtEM5wcueO0Y7zjUKBYkGjlmiScLLOZNVXKV"})