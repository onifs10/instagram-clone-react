import { firebase, FieldValue } from '../lib/firebase';

// eslint-disable-next-line import/prefer-default-export
export async function doesUsernameExist(username) {
  const result = await firebase
    .firestore()
    .collection('users')
    .where('username', '==', username)
    .get();
  return result.docs.length > 0;
}

export async function getUserByUserId(userId) {
  // console.log(userId);
  const result = await firebase.firestore().collection('users').where('userId', '==', userId).get();

  const user = result.docs.map((item) => ({
    ...item.data(),
    docId: item.id
  }));

  return user;
}

export async function getSuggestedUsers(userId, following) {
  // get users
  try {
    const result = await firebase
      .firestore()
      .collection('users')
      .where('userId', '!=', userId)
      .limit(10)
      .get();
    const users = result.docs
      .map((item) => ({
        ...item.data(),
        docId: item.id
      }))
      .filter((item) => !following.includes(item.userId));
    return users;
  } catch (error) {
    console.error(error);
  }
}

export async function updateLoggedInUserFollowing(
  loggedInUserdocId,
  profileId,
  isFollowing = true
) {
  return firebase
    .firestore()
    .collection('users')
    .doc(loggedInUserdocId)
    .update({
      following: isFollowing ? FieldValue.arrayRemove(profileId) : FieldValue.arrayUnion(profileId)
    });
}

export async function updateUserFollowers(profileDocId, userId, isFollowing = true) {
  return firebase
    .firestore()
    .collection('users')
    .doc(profileDocId)
    .update({
      followers: isFollowing ? FieldValue.arrayRemove(userId) : FieldValue.arrayUnion(userId)
    });
}
