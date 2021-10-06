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

export async function getPhotosByUserId(userId) {
  try {
    const photos = await firebase
      .firestore()
      .collection('photos')
      .where('userId', '==', userId)
      .get();
    return photos.docs.map((photo) => ({
      ...photo.data(),
      docId: photo.id
    }));
  } catch (e) {
    console.log(e);
    return [];
  }
}

export async function getUserByUsername(username) {
  const result = await firebase
    .firestore()
    .collection('users')
    .where('username', '==', username)
    .get();
  return result.docs.map((item) => ({
    ...item.data(),
    docId: item.id
  }));
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

export async function getPhotos(userId, following) {
  try {
    const photos = await firebase
      .firestore()
      .collection('photos')
      .where('userId', 'in', [...following, userId])
      .get();

    const userTimelinePhotos = photos.docs.map((photo) => ({
      ...photo.data(),
      docId: photo.id
    }));

    const photosWithUserDetails = await Promise.all(
      userTimelinePhotos.map(async (photo) => {
        let userLikePhoto = false;
        if (photo.likes.includes(userId)) {
          userLikePhoto = true;
        }
        const user = await getUserByUserId(photo.userId);
        const [{ username, emailAddress }] = user;
        return { ...photo, emailAddress, username, userLikePhoto };
      })
    );
    return photosWithUserDetails;
  } catch (e) {
    console.error(e);
  }
}
