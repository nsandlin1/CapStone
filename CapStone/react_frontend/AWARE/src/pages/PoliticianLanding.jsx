import React, { Component, useState } from 'react';
import USAMap from "react-usa-map";


class Map extends Component{
    state = {
      selectedState: null
    };

    containerStyle = {
      width: this.props.width,
      height: this.props.height
    }

    mapHandler = (event) => {
        this.props.parentCallback(event.target.dataset.name);
    };

    customStateColor = () => {
      return{
        "AL": { "fill": "#ffffff" },
        "AK": { "fill": "#ffffff" },
        "AZ": { "fill": "#ffffff" },
        "AR": { "fill": "#ffffff" },
        "CA": { "fill": "#ffffff" },
        "CO": { "fill": "#ffffff" },
        "CT": { "fill": "#ffffff" },
        "DE": { "fill": "#ffffff" },
        "FL": { "fill": "#ffffff" },
        "GA": { "fill": "#ffffff" },
        "HI": { "fill": "#ffffff" },
        "ID": { "fill": "#ffffff" },
        "IL": { "fill": "#ffffff" },
        "IN": { "fill": "#ffffff" },
        "IA": { "fill": "#ffffff" },
        "KS": { "fill": "#ffffff" },
        "KY": { "fill": "#ffffff" },
        "LA": { "fill": "#ffffff" },
        "ME": { "fill": "#ffffff" },
        "MD": { "fill": "#ffffff" },
        "MA": { "fill": "#ffffff" },
        "MI": { "fill": "#ffffff" },
        "MN": { "fill": "#ffffff" },
        "MS": { "fill": "#ffffff" },
        "MO": { "fill": "#ffffff" },
        "MT": { "fill": "#ffffff" },
        "NE": { "fill": "#ffffff" },
        "NV": { "fill": "#ffffff" },
        "NH": { "fill": "#ffffff" },
        "NJ": { "fill": "#ffffff" },
        "NM": { "fill": "#ffffff" },
        "NY": { "fill": "#ffffff" },
        "NC": { "fill": "#ffffff" },
        "ND": { "fill": "#ffffff" },
        "OH": { "fill": "#ffffff" },
        "OK": { "fill": "#ffffff" },
        "OR": { "fill": "#ffffff" },
        "PA": { "fill": "#ffffff" },
        "RI": { "fill": "#ffffff" },
        "SC": { "fill": "#ffffff" },
        "SD": { "fill": "#ffffff" },
        "TN": { "fill": "#ffffff" },
        "TX": { "fill": "#ffffff" },
        "UT": { "fill": "#ffffff" },
        "VT": { "fill": "#ffffff" },
        "VA": { "fill": "#ffffff" },
        "WA": { "fill": "#ffffff" },
        "WV": { "fill": "#ffffff" },
        "WI": { "fill": "#ffffff" },
        "WY": { "fill": "#ffffff" }
      }
    }

    render() {
        return (
          <div style={this.containerStyle} className="flex items-center justify-center">
            <USAMap 
            customize={this.customStateColor}
            onClick={this.mapHandler} />
          </div>
        );
    }
}

export default Map;