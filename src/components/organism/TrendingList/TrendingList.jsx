import React from 'react';

// components
import TrendingItem from '../../molecules/TrendingTrackItem/TrendingTrackItem';
// default img
import defaultImg from '../../../assets/img/defaultSong.png';
// styles
import './TrendingList.scss';

function TrendingList({ tracks }) {
  return (
    <div className="trendingListWrapper">
      {tracks.map((track) => (
        <TrendingItem
          key={track._id}
          trackSrc={track.url}
          artistImg={track.thumbnail || defaultImg}
          artistName={track.artist.firstName}
          trackId={track._id}
          trackName={track.title}
          isLiked={track.isLiked}
        />
      ))}
    </div>
  );
}

export default TrendingList;
