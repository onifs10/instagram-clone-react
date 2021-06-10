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
