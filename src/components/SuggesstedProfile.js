import { Link } from 'react-router-dom';
import { useState } from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies
import PropTypes from 'prop-types';
import { updateLoggedInUserFollowing, updateUserFollowers } from '../services/firebase';

export default function SuggesstedProfile({ profile, userId, loggedInUsersdocId }) {
  const [followed, setFollowed] = useState(false);

  const followUser = async () => {
    try {
      setFollowed(true);
      await updateLoggedInUserFollowing(loggedInUsersdocId, profile.userId, false);
      await updateUserFollowers(profile.docId, userId, false);
    } catch (e) {
      console.log(e);
    }
  };
  return !followed ? (
    <div className="w-full flex justify-between items-center">
      <div className="w-2/3 flex items-center h-full my-1">
        <img
          src={`images/avatars/${profile.username}.jpg`}
          alt="pp"
          className="w-8 h-8 rounded-full flex mr-3"
        />
        <Link to={`/p/${profile.username}`}>
          <p>{profile.username}</p>
        </Link>
      </div>
      <button type="button" className="text-xs font-bold text-blue-medium" onClick={followUser}>
        follow
      </button>
    </div>
  ) : null;
}

SuggesstedProfile.propTypes = {
  profile: PropTypes.object.isRequired,
  userId: PropTypes.string.isRequired,
  loggedInUsersdocId: PropTypes.string.isRequired
};
