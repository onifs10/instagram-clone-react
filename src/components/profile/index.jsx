// eslint-disable-next-line import/no-extraneous-dependencies
import PropTypes from 'prop-types';
import { useReducer, useEffect } from 'react';
import { getPhotosByUserId } from '../../services/firebase';
import ProfileHeader from './header';
import UserPhotos from './photos';

export default function UserProfile({ user }) {
  const reducer = (state, newState) => ({ ...state, ...newState });
  const initialState = {
    profile: user,
    photosCollection: [],
    followersCount: 0
  };
  const [{ profile, photosCollection, followersCount }, dispatch] = useReducer(
    reducer,
    initialState
  );

  useEffect(() => {
    async function getProfileInfoAndPhotos() {
      const photos = await getPhotosByUserId(user?.userId);
      dispatch({ photosCollection: photos });
    }
    if (user) {
      dispatch({ profile: user, followersCount: user.followers.length });
      getProfileInfoAndPhotos();
    }
  }, [user]);

  return (
    <>
      <ProfileHeader />
      <UserPhotos photos={photosCollection} />
      <div>user profile</div>
    </>
  );
}

UserProfile.propTypes = {
  user: PropTypes.shape({
    dateCreated: PropTypes.number,
    emailAddress: PropTypes.string,
    followers: PropTypes.array,
    following: PropTypes.array,
    fullName: PropTypes.string,
    userId: PropTypes.string,
    username: PropTypes.string
  })
};
