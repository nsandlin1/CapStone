import React, { Component } from 'react';
import USAMap from "react-usa-map";

class Map extends Component {

    mapHandler = (event) => {
        alert(event.target.dataset.name);
    };

    render() {
        return (
          <div className="flex items-center justify-center h-[89vh]">
            <USAMap onClick={this.mapHandler} />
          </div>
        );
    }
}

export default Map;