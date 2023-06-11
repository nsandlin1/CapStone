import requests
from api_keys import api_keys


def get_members(congress, chamber):
    """
    Returns list of members.
    congress: 102-117 for House, 80-117 for Senate
    chamber: house or senate
    """
    # define url and headers
    url = f"https://api.propublica.org/congress/v1/{congress}/{chamber}/members.json"
    headers = {"X-API-Key": api_keys["ProPublica"]}
    # get request to api socket
    result = requests.get(url, headers=headers)
    # turn to dictionary
    result = result.json()

    return result

if __name__ == '__main__':
    res = get_members(118, "senate")