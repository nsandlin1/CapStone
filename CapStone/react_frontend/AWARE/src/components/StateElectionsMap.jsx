import React, { useEffect, useState } from "react";
import Map from "../pages/PoliticianLanding";
import { StateElectionsLegend } from "./Legends";

function StateElectionsMap () {


    const customize = {
        "AL": {
            fill: "#d5b329"
        },
        "AK": {
            fill: "#93c35e"
        },
        "AZ": {
            fill: "#93c35e"
        },
        "AR": {
            fill: "#d5b329"
        },
        "CA": {
            fill: "#520e82"
        },
        "CO": {
            fill: "#520e82"
        },
        "CT": {
            fill: "#93c35e"
        },
        "DE": {
            fill: "#520e82"
        },
        "FL": {
            fill: "#d5b329"
        },
        "GA": {
            fill: "#520e82"
        },
        "HI": {
            fill: "#93c35e"
        },
        "ID": {
            fill: "#d5b329"
        },
        "IL": {
            fill: "#93c35e"
        },
        "IN": {
            fill: "#520e82"
        },
        "IA": {
            fill: "#d5b329"
        },
        "KS": {
            fill: "#520e82"
        },
        "KY": {
            fill: "#93c35e"
        },
        "LA": {
            fill: "#520e82"
        },
        "ME": {
            fill: "#d5b329"
        },
        "MD": {
            fill: "#93c35e"
        },
        "MA": {
            fill: "#520e82"
        },
        "MI": {
            fill: "#d5b329"
        },
        "MN": {
            fill: "#93c35e"
        },
        "MS": {
            fill: "#d5b329"
        },
        "MO": {
            fill: "#520e82"
        },
        "MT": {
            fill: "#93c35e"
        },
        "NE": {
            fill: "#d5b329"
        },
        "NV": {
            fill: "#520e82"
        },
        "NH": {
            fill: "#520e82"
        },
        "NJ": {
            fill: "#93c35e"
        },
        "NM": {
            fill: "#d5b329"
        },
        "NY": {
            fill: "#520e82"
        },
        "NC": {
            fill: "#93c35e"
        },
        "ND": {
            fill: "#520e82"
        },
        "OH": {
            fill: "#d5b329"
        },
        "OK": {
            fill: "#93c35e"
        },
        "OR": {
            fill: "#520e82"
        },
        "PA": {
            fill: "#d5b329"
        },
        "RI": {
            fill: "#93c35e"
        },
        "SC": {
            fill: "#520e82"
        },
        "SD": {
            fill: "#93c35e"
        },
        "TN": {
            fill: "#520e82"
        },
        "TX": {
            fill: "#d5b329"
        },
        "UT": {
            fill: "#520e82"
        },
        "VT": {
            fill: "#520e82"
        },
        "VA": {
            fill: "#93c35e"
        },
        "WA": {
            fill: "#d5b329"
        },
        "WV": {
            fill: "#520e82"
        },
        "WI": {
            fill: "#93c35e"
        },
        "WY": {
            fill: "#d5b329"
        }
    };  

    return (
        <div>
            <StateElectionsLegend/>
            <div className="hidden items-center justify-center md:flex w-[100%]">
                <div className="hidden 2xl:flex">
                    < Map width="900px" height="700px" customize={customize} /> 
                </div>
                <div className="hidden lg:flex 2xl:hidden">
                    < Map width="800px" height="600px" customize={customize} /> 
                </div>
                <div className="flex lg:hidden">
                    < Map width="650px" height="500px" customize={customize} /> 
                </div>
            </div>
        </div>
    )
}

export default StateElectionsMap;