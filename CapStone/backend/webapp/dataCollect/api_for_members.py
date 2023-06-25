import requests

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
    result = requests.get(url, headers=headers)
    # turn to dictionary
    result = result.json()

    return result

# used
def get_image(api_key, bioguide_id):
    url = f"https://api.congress.gov/v3/member/{bioguide_id}?api_key={api_key}"

    try:
        result = requests.get(url)
        imageUrl = result.json()['member']['depiction']['imageUrl']

        return imageUrl
    except:
        raise Exception("failed to get image url")

def get_member(api_key, member_id):
    """
    Returns a member.
    member_id str: as assigned by the Biographical Directory of the United States Congress  
        e.g.: K000388
    """
    # define url and headers
    url = f"https://api.propublica.org/congress/v1/members/{member_id}.json"
    headers = {"X-API-Key": api_key}
    # get request to api socket
    result = requests.get(url, headers=headers)
    # turn to dictionary
    result = result.json()

    return result

def new_members(api_key):
    """
    Returns a list of new members.
    """
    # define url and headers
    url = f"https://api.propublica.org/congress/v1/members/new.json"
    headers = {"X-API-Key": api_key}
    # get request to api socket
    result = requests.get(url, headers=headers)
    # turn to dictionary
    result = result.json()

    return result

def senators_by_state(api_key, chamber, state):
    """
    Returns senators of specified state.
    chamber str: house or senate
    state: two letter state abbreviation
    """
    # define url and headers
    url = f"https://api.propublica.org/congress/v1/members/{chamber}/{state}/current.json"
    headers = {"X-API-Key": api_key}
    # get request to api socket
    result = requests.get(url, headers=headers)
    # turn to dictionary
    result = result.json()

    return result

def reps_by_state_and_district(api_key, chamber, state, district):
    """
    Returns representatives by state and district.
    chamber str: house or senate
    state str: two letter state abbreviation
    district int: numerical district designation
    """
    # define url and headers
    url = f"https://api.propublica.org/congress/v1/members/{chamber}/{state}/{district}/current.json"
    headers = {"X-API-Key": api_key}
    # get request to api socket
    result = requests.get(url, headers=headers)
    # turn to dictionary
    result = result.json()

    return result

def members_leaving_office(api_key, congress, chamber):
    """
    List of members leaving office.
    congress int: 102-117 for House, 80-117 for Senate
    chamber str: house or senate
    """
    # define url and headers
    url = f"https://api.propublica.org/congress/v1/{congress}/{chamber}/members/leaving.json"
    headers = {"X-API-Key": api_key}
    # get request to api socket
    result = requests.get(url, headers=headers)
    # turn to dictionary
    result = result.json()

    return result

def specific_member_vote_positions(api_key, member_id):
    """
    Vote history of a single member of congress.
    member_id str: as assigned by the Biographical Directory of the United States Congress  
        e.g.: K000388
    """
    # define url and headers
    url = f"https://api.propublica.org/congress/v1/members/{member_id}/votes.json"
    headers = {"X-API-Key": api_key}
    # get request to api socket
    result = requests.get(url, headers=headers)
    # turn to dictionary
    result = result.json()

    return result

def compare_two_members_vote_positions(api_key, first_member_id, second_member_id, congress, chamber):
    """
    Compare vote positions of two members.
    first_member_id str, second_member_id str: as assigned by the Biographical Directory of the United States Congress  
        e.g.: K000388
    congress int: 102-117 for House, 80-117 for Senate
    chamber str: house or senate
    """
    # define url and headers
    url = f"https://api.propublica.org/congress/v1/members/{first_member_id}/votes/{second_member_id}/{congress}/{chamber}.json"
    headers = {"X-API-Key": api_key}
    # get request to api socket
    result = requests.get(url, headers=headers)
    # turn to dictionary
    result = result.json()

    return result

def compare_two_members_bill_sponsorships(api_key, first_member_id, second_member_id, congress, chamber):
    """
    Compare bill sponsorships of two members.
    first_member_id str, second_member_id str: as assigned by the Biographical Directory of the United States Congress  
        e.g.: K000388
    congress int: 102-117 for House, 80-117 for Senate
    chamber str: house or senate
    """
    # define url and headers
    url = f"https://api.propublica.org/congress/v1/members/{first_member_id}/bills/{second_member_id}/{congress}/{chamber}.json"
    headers = {"X-API-Key": api_key}
    # get request to api socket
    result = requests.get(url, headers=headers)
    # turn to dictionary
    result = result.json()

    return result

def member_bills_cosponsored(api_key, member_id):
    """
    Return bills cosponsored by member.
    member_id str: as assigned by the Biographical Directory of the United States Congress  
        e.g.: K000388
    """
    # define url and headers
    url = f"https://api.propublica.org/congress/v1/members/{member_id}/bills/{type}.json"
    headers = {"X-API-Key": api_key}
    # get request to api socket
    result = requests.get(url, headers=headers)
    # turn to dictionary
    result = result.json()

    return result

def member_office_expenses(api_key, member_id, year, quarter):
    """
    Return office expenses by year and quarter for a single member.
    member_id str: as assigned by the Biographical Directory of the United States Congress  
        e.g.: K000388
    year int: 2009-idk
    quarter int: 1-4
    """
    # define url and headers
    url = f"https://api.propublica.org/congress/v1/members/{member_id}/office_expenses/{year}/{quarter}.json"
    headers = {"X-API-Key": api_key}
    # get request to api socket
    result = requests.get(url, headers=headers)
    # turn to dictionary
    result = result.json()

    return result

def member_office_expenses_by_category(api_key, member_id, category):
    """
    Return office expenses by category for a single member.
    member_id str: as assigned by the Biographical Directory of the United States Congress  
        e.g.: K000388
    category str: travel or personnel or rent-utilities or other-services or supplies or franked-mail or printing or equipment or total
    """
    # define url and headers
    url = f"https://api.propublica.org/congress/v1/members/{member_id}/office_expenses/category/{category}.json"
    headers = {"X-API-Key": api_key}
    # get request to api socket
    result = requests.get(url, headers=headers)
    # turn to dictionary
    result = result.json()

    return result

def office_expenses_per_category(api_key, category, year, quarter):
    """
    Return office expenses by year, quarter, and category.
    category str: travel or personnel or rent-utilities or other-services or supplies or franked-mail or printing or equipment or total
    year int: 2009-idk
    quarter int: 1-4
    """
    # define url and headers
    url = f"https://api.propublica.org/congress/v1/office_expenses/category/{category}/{year}/{quarter}.json"
    headers = {"X-API-Key": api_key}
    # get request to api socket
    result = requests.get(url, headers=headers)
    # turn to dictionary
    result = result.json()

    return result

def house_privately_funded_trips(api_key, congress):
    """
    Return a list of privately funded travel trips
    congress int: 102-117 for House, 80-117 for Senate
    """
    # define url and headers
    url = f"https://api.propublica.org/congress/v1/{congress}/private-trips.json"
    headers = {"X-API-Key": api_key}
    # get request to api socket
    result = requests.get(url, headers=headers)
    # turn to dictionary
    result = result.json()

    return result

def house_privately_funded_trips_by_member(api_key, member_id):
    """
    Return a list of privately funded travel trips
    congress int: 102-117 for House, 80-117 for Senate
    """
    # define url and headers
    url = f"https://api.propublica.org/congress/v1/members/{member_id}/private-trips.json"
    headers = {"X-API-Key": api_key}
    # get request to api socket
    result = requests.get(url, headers=headers)
    # turn to dictionary
    result = result.json()

    return result

if __name__ == '__main__':
    key = "JIVe962pF4EiPLlH5C9mOA78IPnDeBKdMvvHibp1"
    # res = get_members(key, 118, "house")
    # print(res["results"][0]["members"])
    