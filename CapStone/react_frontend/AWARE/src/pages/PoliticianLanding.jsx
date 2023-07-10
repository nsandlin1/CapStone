import React, { Component } from 'react';
import USAMap from "react-usa-map";


class Map extends Component{

    containerStyle = {
      width: this.props.width,
      height: this.props.height
    }

    mapHandler = (event) => {
        alert(event.target.dataset.name);
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