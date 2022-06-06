import React from 'react';

// custom hooks
import useFetchItems from '../../hooks/useFetchItems';
// components
import ArtistList from '../../components/organism/ArtistList/ArtistList';
import CardSkeleton from '../../components/molecules/Skeletons/CardSkeleton';

function Artists() {
  const [artists, isLoadingArtists] = useFetchItems('account/byartist');

  return (
    <main style={{ padding: '1.5em' }}>
      <h1 className="heading1">Artists</h1>
      <div className="genresContainer">
        {!isLoadingArtists ? (
          <ArtistList artists={artists} />
        ) : (
          <div className="myPlaylistWrapper">
            <CardSkeleton />
          </div>
        )}
      </div>
    </main>
  );
}

export default Artists;
