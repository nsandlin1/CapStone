#!/bin/bash

# update bills db
echo "Updating bills..."
updated=$(curl -s http://127.0.0.1:5000/api/congress/get_bills?update=True)
echo "Bills added:" $updated

# update state-level congressmen db
# need for every state and branch, but jsut doing louisiana senate for now
echo "Updating State Congressmen..."
updated=$(curl -s http://127.0.0.1:5000/api/congress/state_members?update=True\&state=LA\&branch=Senate)
echo "State Congressmen added:" $updated