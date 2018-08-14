import React, { Component } from "react";
import MapGL, { Popup } from "react-map-gl";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import CityInfo from "./PopupInfo"

import MyDrawer from "./myDrawer";
import "./App.css";

const styles = theme => ({
  root: {
    display: "flex"
  },

  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 0,
    padding: theme.spacing.unit * 0
  }
});

var bounds = [
  [-10, 39], // Southwest coordinates
  [14, 54] // Northeast coordinates
];

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      mapStyle: "",
      viewport: {
        mapboxApiAccessToken: "pk.eyJ1Ijoic2hldWIiLCJhIjoiWGtobTNPNCJ9.v2JwlNSGBm_KxJUKE_WLig",
        center: [2, 46.5],
        latitude: 46.5,
        longitude: 2.0,
        zoom: 4.5,
        bearing: 0
      },

      popupInfo: null,

    };
    this._updateViewport = this._updateViewport.bind(this);

  }

  _onViewportChange = viewport => this.setState({viewport});
  _onStyleChange = mapStyle => this.setState({mapStyle});
  
  componentDidMount() {
    window.addEventListener("resize", this._resize, { passive: true });
    this._resize();
  }
  
  componentWillUnmount() {
    window.removeEventListener("resize", this._resize, { passive: true });
  }

  _resize = () => {
    var drawerWidth = 1;
    var height = 56;

    if (window.innerWidth > 600) {
      //drawerWidth = 8 * 9; //this.Drawer.theme.spacing.unit * 9;
      height = 64;
      //Detect orientation window (portrait/Landscape)
    } else if (window.innerHeight < window.innerWidth) {
      height = 48;
    }

    this.setState({
      viewport: {
        ...this.state.viewport,
        width: window.innerWidth - drawerWidth,
        height: window.innerHeight - height
      },
    });
  };

  _updateViewport(viewport) { this.setState({ viewport }); }
  // _updateViewport = viewport => {this.setState({ viewport });};

  _renderPopup(event) {
    const { popupInfo } = this.state;

    if (popupInfo === null || event === null) {
      return null;
    } else {
      const { lngLat } = event;
      return (
        popupInfo[0] && (
          <Popup
            tipSize={5}
            anchor="top"
            longitude={lngLat[0]}
            latitude={lngLat[1]}
            onClose={() => this.setState({ popupInfo: null })}
          >
            <CityInfo
              layerId={popupInfo[0].layer.id}
              info={popupInfo[0].properties}
            />
          </Popup>
        )
      );
    }
  }

  state = {
    open: false
  };
  render() {
    const { viewport, mapStyle } = this.state;
    const { classes } = this.props;

    return (
      <React.Fragment>
        <div className={classes.root}>
          <MyDrawer onChange={this._onStyleChange} />
          <main className={classes.content}>
            <div className={classes.appBarSpacer} />
            <MapGL
              {...viewport}
              mapStyle={mapStyle}
              mapboxApiAccessToken="pk.eyJ1Ijoic2hldWIiLCJhIjoiWGtobTNPNCJ9.v2JwlNSGBm_KxJUKE_WLig"
              maxZoom={14}
              maxBounds={bounds}
              //onViewportChange={this._updateViewport}
              onViewportChange={(viewport) => this.setState({ viewport })}

            >
              {this._renderPopup(null)}


            </MapGL>
          </main>
        </div>
      </React.Fragment>
    );
  }
}
App.propTypes = {
  classes: PropTypes.object.isRequired
};
export default withStyles(styles)(App);
