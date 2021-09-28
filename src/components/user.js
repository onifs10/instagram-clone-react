// eslint-disable-next-line import/no-extraneous-dependencies
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Skeleton from 'react-loading-skeleton';
import React from 'react';
import Avatar from 'react-avatar';

const User = ({ userName, fullName, email }) =>
  !userName || !fullName ? (
    <Skeleton count={1} height={61} />
  ) : (
    <Link to={`/p/${userName}`} className="grid grid-cols-4 gap-4 mb-6 items-center">
      <div className="flex items-center justify-between col-span-1">
        <Avatar email={email} name={fullName} round size={50} className="mr-3" />
      </div>
      <div className="col-span-3">
        <p className="font-bold text-sm">{userName}</p>
        <p className="text-sm">{fullName}</p>
      </div>
    </Link>
  );

User.propTypes = {
  userName: PropTypes.string,
  fullName: PropTypes.string,
  email: PropTypes.string
};

User.whyDidYouRender = true;

export default React.memo(User);
