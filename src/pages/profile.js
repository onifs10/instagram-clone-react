import { useEffect, useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import Header from '../components/header';
import { getUserByUsername } from '../services/firebase';
import * as ROUTES from '../constants/routes';
import UserProfile from '../components/profile';

export default function Profile() {
  const history = useHistory();
  const { username } = useParams();
  const [userProfile, setUserProfile] = useState(null);
  useEffect(() => {
    async function checkUserExist() {
      const user = await getUserByUsername(username);
      if (user.length > 0) {
        setUserProfile(user[0]);
      } else {
        history.push(ROUTES.NOT_FOUND);
      }
    }

    checkUserExist();
  }, [username, history]);

  useEffect(() => {
    document.title = 'Profile - Instagram';
    return () => {
      document.title = 'Instagram';
    };
  }, []);
  return userProfile?.username ? (
    <div className="bg-gray-background">
      <Header />
      <div className="mx-auto max-w-screen-lg">
        <UserProfile user={userProfile} />
      </div>
    </div>
  ) : null;
}
