import requests
import datetime
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
        "org_classification": branch_sudonym[branch],
        "page": 1,
        "per_page": 50,
        "apikey": apikey
    }

    try:
        congressmen = []
        while True:
            print(params)
            data = requests.get(url, params=params).json()
            print('data got')
            if "exceeded limit" in str(data):
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
        print(e)
        raise Exception(f"Failed to get state congressmen: {str(e)}")

if __name__ == '__main__':
    x = requests.get("https://api.congress.gov/v3/bill/118/hr/4333?format=xml", params={"api_key": "BLBBwtEM5wcueO0Y7zjUKBYkGjlmiScLLOZNVXKV"})