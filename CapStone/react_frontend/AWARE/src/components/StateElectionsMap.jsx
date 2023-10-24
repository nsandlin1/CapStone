import React, { useEffect, useState } from "react";
import Map from "../pages/Student/PoliticianLanding";
import { StateElectionsLegend } from "./Legends";

function StateElectionsMap () {

    const y2023 = "#d5b329"; // yellow
    const y2024 = "#93c35e"; // green
    const y2025 = "#520e82"; // purple
    const y2026 = "#E64141"; // red

    const customize = {
        "AL": {
            fill: y2026
        },
        "AK": {
            fill: y2026
        },
        "AZ": {
            fill: y2026
        },
        "AR": {
            fill: y2026
        },
        "CA": {
            fill: y2026
        },
        "CO": {
            fill: y2026
        },
        "CT": {
            fill: y2026
        },
        "DE": {
            fill: y2024
        },
        "FL": {
            fill: y2026
        },
        "GA": {
            fill: y2026
        },
        "HI": {
            fill: y2026
        },
        "ID": {
            fill: y2026
        },
        "IL": {
            fill: y2026
        },
        "IN": {
            fill: y2024
        },
        "IA": {
            fill: y2026
        },
        "KS": {
            fill: y2026
        },
        "KY": {
            fill: y2023
        },
        "LA": {
            fill: y2023
        },
        "ME": {
            fill: y2026
        },
        "MD": {
            fill: y2026
        },
        "MA": {
            fill: y2026
        },
        "MI": {
            fill: y2026
        },
        "MN": {
            fill: y2026
        },
        "MS": {
            fill: y2023
        },
        "MO": {
            fill: y2024
        },
        "MT": {
            fill: y2024
        },
        "NE": {
            fill: y2026
        },
        "NV": {
            fill: y2026
        },
        "NH": {
            fill: y2024
        },
        "NJ": {
            fill: y2025
        },
        "NM": {
            fill: y2026
        },
        "NY": {
            fill: y2026
        },
        "NC": {
            fill: y2024
        },
        "ND": {
            fill: y2024
        },
        "OH": {
            fill: y2026
        },
        "OK": {
            fill: y2026
        },
        "OR": {
            fill: y2026
        },
        "PA": {
            fill: y2026
        },
        "RI": {
            fill: y2026
        },
        "SC": {
            fill: y2026
        },
        "SD": {
            fill: y2026
        },
        "TN": {
            fill: y2026
        },
        "TX": {
            fill: y2026
        },
        "UT": {
            fill: y2024
        },
        "VT": {
            fill: y2024
        },
        "VA": {
            fill: y2025
        },
        "WA": {
            fill: y2024
        },
        "WV": {
            fill: y2024
        },
        "WI": {
            fill: y2026
        },
        "WY": {
            fill: y2026
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