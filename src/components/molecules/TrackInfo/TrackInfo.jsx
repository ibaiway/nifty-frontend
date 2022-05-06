import React from 'react';
import './TrackInfo.scss';

function TrackInfo({ title, artist, songImage }) {
  return (
    <div className="songPlayerWrapper">
      <img className="songPlayerImage" src={songImage} alt="song" />
      <div className="songPlayerInfo">
        <h3 className="songPlayerTitle">{title}</h3>
        <span className="songPlayerArtist">{artist}</span>
      </div>
    </div>
  );
}

export default TrackInfo;