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

    render() {
        return (
          <div style={this.containerStyle} className="flex items-center justify-center">
            <USAMap onClick={this.mapHandler} />
          </div>
        );
    }
}

export default Map;