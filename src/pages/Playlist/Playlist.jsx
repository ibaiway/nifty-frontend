/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useState } from 'react';
// formik
import { Formik } from 'formik';
import { toast } from 'react-toastify';
// router dom
import { useParams } from 'react-router-dom';
// redux
import { useSelector, useDispatch } from 'react-redux';
import {
  closeModal,
  openModal,
  setModalAction
} from '../../redux/Dialog/dialogSlice';
// hooks
import useFetchItems from '../../hooks/useFetchItems';
// components
import TrendingTrackItemSkeleton from '../../components/molecules/Skeletons/TrendingTrackItemSkeleton';
import Modal from '../../components/template/Modal/Modal';
import PlaylistFormContainer from '../../components/molecules/PlaylistFormContainer/PlaylistFormContainer';
import TrendingList from '../../components/organism/TrendingList/TrendingList';
// icons
import defaultPlaylist from '../../assets/img/defaultSong.png';
import dots from '../../assets/svg/dotsHorizontal.svg';
// styles
import './Playlist.scss';
// utils
import editPlaylist, { followPlaylist } from '../../utils/api/apiPlaylist';
import { createPlaylistSchema } from '../../utils/schemas';
import PlaylistPlayButton from '../../components/atoms/PlaylistPlayButton/PlaylistPlayButton';

function Playlist() {
  // get playlist id and get playlist
  const { id } = useParams();
  const [playlist, isLoading, setPlaylist] = useFetchItems(`playlist/${id}`);
  // redux
  const dispatch = useDispatch();
  const {
    dialog: { isModalOpen, modalAction },
    user
  } = useSelector((state) => state);
  // currentUser follows playlist state
  // edit form values and image state
  const [playlistImage, setPlaylistImage] = useState(null);

  const initialValues = {
    name: playlist.name,
    description: playlist.description,
    publicAccessible: playlist.publicAccessible
  };

  const handleFollowPlaylist = async () => {
    try {
      await followPlaylist(playlist._id, !playlist.isFollowed);
      setPlaylist({ ...playlist, isFollowed: !playlist.isFollowed });
    } catch (e) {
      toast.error('Failed to follow/unfollow playlist');
    }
  };

  const handleOpenEditModal = () => {
    if (playlist.user._id !== user.id) return;
    dispatch(openModal());
    dispatch(setModalAction('editPlaylist'));
  };

  const handleEditPlaylist = async (values) => {
    const toastId = toast.loading('Editing playlist...');
    dispatch(closeModal());
    try {
      const newPlaylist = await editPlaylist(
        {
          ...values,
          image: playlistImage
        },
        { method: 'PUT', url: `/playlist/${playlist._id}` }
      );
      setPlaylist({ ...playlist, ...newPlaylist });
      toast.dismiss(toastId);
      toast.success('Playlist edited!');
    } catch (e) {
      toast.dismiss(toastId);
      toast.error('Failed to edit playlist, please, try again');
    }
  };
  return (
    <>
      <section className="playlistSectionContainer">
        <header className="playlistHeader">
          <div className="editableInformationWrapper">
            <div className="playlistImageWrapper">
              <img
                src={playlist.thumbnail || defaultPlaylist}
                alt="playlist"
                className="playlistImage"
              />
            </div>

            <div className="playlistInfoWrapper">
              <div className="headingFollowPlaylist">
                <h2 className="heading2 playlistName">{playlist.name}</h2>
                <div className="followButtonWrapper">
                  <div className="playlistButtonWrapper">
                    <PlaylistPlayButton
                      isPlaylistView
                      tracks={playlist.tracks}
                    />
                  </div>
                </div>
              </div>
              <p>{playlist.description}</p>
              <div className="buttonsWrapper">
                <button
                  className="editablePlaylistButton"
                  type="button"
                  onClick={handleOpenEditModal}
                >
                  <img src={dots} alt="" />
                </button>
                <button
                  type="button"
                  onClick={handleFollowPlaylist}
                  className="playlistFollowBtn"
                >
                  {playlist.isFollowed ? 'Unfollow' : 'Follow'}
                </button>
              </div>
            </div>
          </div>
        </header>

        {isLoading ? (
          <TrendingTrackItemSkeleton />
        ) : (
          <div className="playlistTracksWrapper">
            <TrendingList
              errorMessage="This playlist do not have tracks"
              tracks={playlist.tracks}
              handleListState={setPlaylist}
            />
          </div>
        )}
      </section>
      {isModalOpen && modalAction === 'editPlaylist' ? (
        <Modal title="Edit your playlist">
          <Formik
            initialValues={initialValues}
            onSubmit={handleEditPlaylist}
            validationSchema={createPlaylistSchema}
          >
            {({ errors, touched }) => (
              <PlaylistFormContainer
                handleChangeImage={setPlaylistImage}
                playlistImage={playlist.thumbnail}
                errors={errors}
                touched={touched}
              />
            )}
          </Formik>
        </Modal>
      ) : null}
    </>
  );
}

export default Playlist;
