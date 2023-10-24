import { IoIosArrowRoundBack } from "react-icons/io";
import { IoIosArrowBack } from "react-icons/io";
import  StatePolitician  from "./StateCard";
import React, { useEffect, useState } from "react";

export const StatePoliticians = ({ state, setState, states, branch }) => {

    var api_url = `/api/congress/state_members?state=${state}&branch=${branch}`;
    const [error, setError] = useState([]);
    const [pols, setPols] = useState([]);


    function getPoliticiansList() {
        /*
        make api request to get politicians return to pols variable
        */
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
                setPols(data);
                setError(null);
                console.log(pols)
            })
            .catch((err) => {
                setError(err);
                console.log(err)
            })
            // .finally(() => {
            //     setLoading(false);
            // });
    }

    useEffect(() => {
        getPoliticiansList()
    }, [])

    const goBack = () => {
        setState(null);
    }

    return (
        <div className="flex flex-col h-[76vh] w-[100%] rounded-xl p-2">
            <div className="flex flex-row items-center gap-2 h-[10%] w-[100%] rounded-xl">
                <div className="w-[20%]">
                    <IoIosArrowRoundBack className="BackArrow text-navy" onClick={goBack}/>
                </div>
                <div className="w-[60%] flex justify-center">
                    <h1 className="text-2xl font-bold text-navy sm:text-3xl md:text-6xl">{states[state]}</h1>
                </div>
                <div className="flex w-[20%]">
                </div>
            </div>
            <div className="flex flex-col items-center p-2 h-[90%] w-[100%] overflow-y-auto bg-navy gap-2 rounded-xl">
                {
                    pols.map((pol) => {
                        return <StatePolitician name={pol.name} website={pol.openstates_url}/>
                    })
                }
            </div>
        </div>
    );
}

