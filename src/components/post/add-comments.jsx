import { useState, useContext } from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies
import PropTypes from 'prop-types';
import FireBaseContext from '../../context/firebase';
import UserContext from '../../context/user';

export default function AddComment({ docId, comments, setComments, commentsInput }) {
  const [comment, setComment] = useState('');
  const { firebase, FieldValue } = useContext(FireBaseContext);
  const {
    user: { displayName }
  } = useContext(UserContext);
  const handleSubmitComment = (e) => {
    e.preventDefault();
    const newCommentObject = { displayName, comment };
    setComments([newCommentObject, ...comments]);
    setComment('');

    return firebase
      .firestore()
      .collection('photos')
      .doc(docId)
      .update({
        comments: FieldValue.arrayUnion(newCommentObject)
      });
  };
  return (
    <div className="border-t border-gray-primary">
      <form
        method="POST"
        className="flex justify-between pl-0 pr-5"
        onSubmit={(e) => (comment.length >= 1 ? handleSubmitComment(e) : e.preventDefault())}
      >
        <input
          ref={commentsInput}
          autoComplete="off"
          type="text"
          className="text-sm text-gray-base w-full mr-3 py-5 px-4"
          name="add-comment"
          placeholder="Add a comment"
          value={comment}
          onChange={({ target }) => setComment(target.value)}
        />
        <button
          className={`text-sm font-bold text-blue-medium ${!comment && 'opacity-25'}`}
          type="submit"
          disabled={comment.length < 1}
        >
          Post
        </button>
      </form>
    </div>
  );
}

AddComment.propTypes = {
  commentsInput: PropTypes.object.isRequired,
  docId: PropTypes.string.isRequired,
  comments: PropTypes.array.isRequired,
  setComments: PropTypes.func.isRequired
};
