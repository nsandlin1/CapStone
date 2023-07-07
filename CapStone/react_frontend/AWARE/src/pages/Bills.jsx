import React, { useState, useEffect } from "react";
import { BsCircle } from 'react-icons/bs';
import { FederalButton } from "../components/FederalButton";
import { StateButton } from "../components/StateButton";
import { BillCard } from "../components/BillCard";

function Bills() {

    var api_url = `http://localhost:5000/api/congress/get_bills`

    const [selectedButton, setSelectedButton] = useState('federal');
    const [bills, setBills] = useState([]);
    const [loadingBills, setLoadingBills] = useState(true);
    const [error, setError] = useState(null);
    const [billInfo, setBillInfo] = useState(null);
    const [summary, setSummary] = useState(null);

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
    }, [bills])

    const dataFromBill = (info) => {
        setBillInfo(info);
        setSummary(info.summary)
        console.log(info);
    };

    return (
        <div className="flex flex-col items-center h-[89vh] py-4 gap-1">
            <div className="flex items-start w-[90%] h-[10%] flex-grow rounded-xl gap-2 p-2">
                {/* <div className="flex items-center justify-center bg-zinc-800 rounded-xl w-[7%] h-[55%] mt-auto">
                    <p className="text-white">Federal</p>
                </div> */}
                <FederalButton 
                    selected={selectedButton === 'federal'}
                    onClick={() => handleButtonClick('federal')}
                />
                <StateButton
                    selected={selectedButton === 'state'}
                    onClick={() => handleButtonClick('state')}
                />
            </div>
            <div className="flex items-center gap-3 w-[90%] h-[90%] rounded-xl bg-slate-700 p-2">
                <div className="flex flex-col p-2 gap-2 w-[25%] h-[100%] rounded-xl bg-slate-300">
                    <div className="search flex items-center justify-center rounded-xl bg-orange-400 h-[8%]">
                        Search bar
                    </div>
                    <div className="flex flex-wrap items-center justify-center rounded-xl h-[92%] bg-zinc-800 overflow-auto p-2 gap-2">
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
                <div className="flex p-2 w-[75%] h-[100%] rounded-xl bg-slate-300">
                    <p>{summary}</p>
                </div>
            </div>
        </div>  
    )
}

export default Bills;