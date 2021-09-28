// eslint-disable-next-line import/no-extraneous-dependencies
import PropTypes from 'prop-types';
import { memo, useState, useEffect } from 'react';
import Skeleton from 'react-loading-skeleton';
import { getSuggestedUsers } from '../services/firebase';
import SuggesstedProfile from './SuggesstedProfile';

const Suggestion = ({ userId, following, loggedInUsersdocId }) => {
  const [loading, setLoading] = useState(true);
  const [users, setUsers] = useState([]);

  const getUsers = async () => {
    try {
      const users = await getSuggestedUsers(userId, following);
      setUsers(users);
      setLoading(false);
    } catch (e) {
      setLoading(false);
      console.log(e);
    }
  };
  useEffect(() => {
    // get users
    if (userId) {
      getUsers();
    }
  }, [userId]);

  return loading ? (
    <Skeleton width="100" height="100px" />
  ) : (
    <div className="w-full">
      {users.map((item, idx) => (
        <SuggesstedProfile
          profile={item}
          userId={userId}
          key={idx}
          loggedInUsersdocId={loggedInUsersdocId}
        />
      ))}
    </div>
  );
};

Suggestion.propTypes = {
  userId: PropTypes.string,
  following: PropTypes.array,
  loggedInUsersdocId: PropTypes.string
};
export default memo(Suggestion);
