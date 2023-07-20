import React, { useState, useEffect } from "react";
import { BsCircle } from 'react-icons/bs';
import { FederalButton } from "../components/FederalButton";
import { StateButton } from "../components/StateButton";
import { BillCard } from "../components/BillCard";

function Bills() {

    var api_url = `http://localhost:5000/api/congress/get_bills?`

    const [selectedButton, setSelectedButton] = useState('federal');
    const [bills, setBills] = useState([]);
    const [loadingBills, setLoadingBills] = useState(true);
    const [error, setError] = useState(null);
    const [billInfo, setBillInfo] = useState(null);
    const [summary, setSummary] = useState(null);
    const [more, setMore] = useState('medium');

    const handleSumLengthChange = (length) => {
        setMore(length);
    };

    function getBillsList() {   

        /*
        make api call for list of bills
        */
        console.log("fetching bills")
        fetch(api_url)
            .then((response) => {
                if (!response.ok) {
                    throw new Error(
                        `HTTP error: ${response.status}`
                    );
                }
                return response.json()
            })
            .then((data) => {
                setBills(data);
                console.log(data)
                setError(null);
            })
            .catch((err) => {
                console.log(err.message)
                setError(err);
            })
            .finally(() => {
                console.log("loading is false")
                setLoadingBills(false);
            });
    }

    const handleButtonClick = (buttonType) => {
        setSelectedButton(buttonType);
    }

    useEffect(() => {
        if (bills.length == 0) {
            getBillsList();
        }
    }, [])

    const dataFromBill = (info) => {
        setBillInfo(info);
        setSummary(info.summary)
        console.log(info);
    };

    return (
        <div className="flex flex-col items-center h-[89vh] pb-4 gap-1">
            <div className="flex flex-row items-center justify-center h-[10%] w-[90%]">
                <div className="flex flex-row h-[100%] rounded-xl gap-2 p-2 w-[90%]">
                    <FederalButton 
                        selected={selectedButton === 'federal'}
                        onClick={() => handleButtonClick('federal')}
                    />
                    <StateButton
                        selected={selectedButton === 'state'}
                        onClick={() => handleButtonClick('state')}
                    />
                        
                </div>
                    <select id="lengths" onChange={(event) => handleSumLengthChange(event.target.value)} style={{ fontSize: '16px' }}
                        className="bgblue text-white border border-gray-300 rounded-lg 
                                   focus:ring-blue-500 focus:border-blue-500 dark:text-white w-[15%] h-[60%]">
                        <option defaultValue={"medium"} >Medium Summary</option>
                        <option value="small" >Short Summary</option>
                        <option value="big" >Long Summary</option>
                    </select>
            </div>

            <div className="flex items-center gap-3 w-[90%] h-[95%] rounded-xl bg-navy p-2">

                <div className="flex flex-col p-2 gap-2 w-[25%] h-[100%] rounded-xl bg-slate-300">
                    <div className="search flex items-center justify-center rounded-xl bg-sky-50 h-[8%] hover:bg-sky-100 font-bold py-1 px-3 rounded">
                        Search
                    </div>
                    <div className="flex flex-wrap items-center justify-center rounded-xl h-[92%] bg-navy overflow-y-auto p-2 gap-2">
                        {loadingBills && <font color="#ffffff">Loading...</font>}
                        {error && <font color="#ffffff">There has been a problem loading bills.</font>}
                        {!loadingBills && (
                            bills.map((bill) => {
                                return <BillCard
                                    onClass={dataFromBill}
                                    key={bill.number}
                                    bill = {bill}
                                    />
                            })
                            
                        )}
                    </div>
                </div>
                
                <div className="flex-col p-2 w-[75%] h-[100%] rounded-xl bg-slate-300">
                    <div className="flex-col overflow-y-auto p-2 w-[100%] h-[100%] rounded-xl bg-white">
                    <p style={{ fontSize: '22px' }}>You have selected the {more} summary: </p>
                    <p>{summary}</p> </div>
                    
                </div>
            </div>
        </div>  
    )
}

export default Bills;