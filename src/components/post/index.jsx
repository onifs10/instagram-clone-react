import { useRef } from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies
import PropTypes from 'prop-types';
import Header from './header';
import Image from './image';
import Actions from './action';
import Footer from './footer';
import Comments from './comments';

export default function Post({
  likes,
  imageSrc,
  caption,
  userLikePhoto,
  docId,
  comments,
  username,
  dateCreated,
  emailAddress
}) {
  const commentInput = useRef(null);
  const handleFocus = () => commentInput.current?.focus();
  return (
    <div className="rounded col-span-4 bg-white border-gray-primary mb-10 shadow-sm">
      <Header username={username} email={emailAddress} />
      <Image src={imageSrc} caption={caption} />
      <Actions
        docId={docId}
        likedPhoto={userLikePhoto}
        totalLikes={likes.length}
        handleFocus={handleFocus}
      />
      <Footer caption={caption} username={username} />
      <Comments
        comments={comments}
        docId={docId}
        posted={dateCreated}
        commentInput={commentInput}
      />
    </div>
  );
}

Post.propTypes = {
  likes: PropTypes.array.isRequired,
  imageSrc: PropTypes.string.isRequired,
  username: PropTypes.string.isRequired,
  caption: PropTypes.string.isRequired,
  userLikePhoto: PropTypes.bool.isRequired,
  docId: PropTypes.string.isRequired,
  comments: PropTypes.array.isRequired,
  dateCreated: PropTypes.string.isRequired,
  emailAddress: PropTypes.string.isRequired
};
