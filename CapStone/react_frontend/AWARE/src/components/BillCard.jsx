import React, { useState, useEffect } from "react";

export const BillCard = () => {

    const [bills, setBills] = useState([]);
    const [loadingBills, setLoadingBills] = useState(true);
    const [error, setError] = useState(null);

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
        

        return (
            <div className="flex items-center justify-center bg-slate-300">

            </div>
        )
}