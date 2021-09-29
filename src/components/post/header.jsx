/* eslint-disable import/no-extraneous-dependencies */
import Avatar from 'react-avatar';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

export default function Header({ username, email }) {
  return (
    <div className="flex border-b border-gray-primary h-4 p-4 py-8">
      <Link to={`/p/${username}`} className="flex items-center">
        <Avatar email={email} name={username} round size={40} className="mr-3" />
        <p className="font-bold">{username}</p>
      </Link>
    </div>
  );
}

Header.propTypes = {
  username: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired
};
