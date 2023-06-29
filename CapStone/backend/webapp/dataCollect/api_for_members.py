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

        return imageUrl['member']['depiction']['imageUrl']
    except:
        raise Exception("failed to get image url")

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
    client = InferenceClient(token=auth_key, timeout=20)
    out_data = client.summarization(text=payload, model="LukeMoore11/Big-Benjamin")

    return out_data

if __name__ == '__main__':
    x = requests.get("https://api.congress.gov/v3/bill/118/hr/4333?format=xml", params={"api_key": "BLBBwtEM5wcueO0Y7zjUKBYkGjlmiScLLOZNVXKV"})