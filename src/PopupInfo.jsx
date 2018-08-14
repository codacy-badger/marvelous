import React, { PureComponent } from "react";
import Truncate from "react-truncate";
import "./PopupInfo.css";


function ShowOpeningHours(props) {
  if (!props.info.startTime) {
    return null;
  }

  return (
    <div>
      Horaires: <br />
      StartTime {props.info.startTime}<br />
      EndTime: {props.info.endTime}<br />
    </div>
  );
}

export default class CityInfo extends PureComponent {
  render() {
    const { info, layerId } = this.props;
    var displayName = info.label;
    if (layerId.includes("aop")) {
      return (
        <div className="popPupStyle">
          <div className="baseText">
            {info.aire_geo}
          </div>
        </div>
      );
    }
    if (displayName && info.link) {
      return (
        <div className="popPupStyle">
          <div className="titleText">
            <a target="_new" href={info.link} className="titleText" rel="noopener">{displayName}</a><br />
          </div>
          <img src={info.thumbnail} className="picturePoppup" alt={info.label} />
          <div className="baseText">
            <Truncate lines={9} ellipsis={<span>... <a href={info.link} rel="noopener">More</a></span>}>
              {info.abstract}
            </Truncate>
          </div>
        </div>
      );
    }
    else if (displayName) {
      return (
        <div className="popPupStyle">
          <div>
            <div className="baseText">
              <div className="titleText">
                {displayName}<br />
              </div>
              <div>
                {info.abstract}<br />
                {"validFrom:"}<br />
                {"StartDate: "}{info.validFrom}<br />
                <ShowOpeningHours info={info} />

                {"Address:"}<br />
                {info.streetAddress}<br />
                {info.postalCode}{" "}{info.addressLocality}<br />

              </div>
            </div>
          </div>
        </div>
      );
    }
    else {
      displayName = info.nom_du_musee;
      var link = null;
      if (info.sitweb) {
        link = info.sitweb.includes("http://") ? info.sitweb : "http://" + info.sitweb;
      }
      return (
        <div className="popPupStyle">
          <div>
            <div className="baseText">
              <div className="titleText">
                {displayName}<br />
              </div>
              <div>
                {info.adr}<br />
                {info.cp}{" "}{info.ville}<br />
                {"Ouverture:"}<br />
                {info.periode_ouverture}
              </div>
            </div>
            <a target="_new" href={link} rel="noopener">Site internet</a>
          </div>
        </div>
      );
    }
  }
}


