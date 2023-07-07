#!/bin/bash

echo "Updating bills..."
updated=`curl -s http://127.0.0.1:5000/api/congress/get_bills?update=True`
echo "Bills added:" $updated
