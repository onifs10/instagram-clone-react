import { useState, useContext, useEffect } from 'react';
import UserContext from '../context/user';
import { getUserByUserId, getPhotos } from '../services/firebase';

export default function usePhotos() {
  const [photos, setphotos] = useState(null);
  const {
    user: { uid: userId }
  } = useContext(UserContext);

  useEffect(() => {
    async function getTimelinPhotos() {
      const [{ following }] = await getUserByUserId(userId);
      let followedUserPhotos = [];
      if (following.length > 0) {
        followedUserPhotos = await getPhotos(userId, following);
      }
      followedUserPhotos.sort((a, b) => b.dateCreated - a.dateCreated);
      setphotos(followedUserPhotos);
    }
    getTimelinPhotos();
  }, [userId]);
  return { photos };
}
