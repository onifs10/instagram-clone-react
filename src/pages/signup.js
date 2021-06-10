import { useContext, useEffect, useState } from 'react';
import { useHistory, Link } from 'react-router-dom';
import FirebaseContext from '../context/firebase';
import * as ROUTES from '../constants/routes';
import { doesUsernameExist } from '../services/firebase';

export default function SignUp() {
  const history = useHistory();
  const { firebase } = useContext(FirebaseContext);

  const [username, setUsername] = useState('');
  const [fullname, setFullname] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [error, setError] = useState('');

  const isInvalid = password === '' || email === '';

  const handleSignUp = async (event) => {
    event.preventDefault();
    // eslint-disable-next-line no-empty
    const usernameExist = await doesUsernameExist(username);
    console.log('usernameExist', usernameExist);
    if (!usernameExist) {
      try {
        const createdUserResult = await firebase
          .auth()
          .createUserWithEmailAndPassword(email, password);
        await createdUserResult.user.updateProfile({
          displayName: username
        });

        await firebase.firestore().collection('users').add({
          userId: createdUserResult.user.uid,
          username: username.toLowerCase(),
          fullName: fullname,
          emailAddress: email.toLowerCase(),
          following: [],
          dateCreated: Date.now()
        });

        history.push(ROUTES.DASHBOARD);
        // eslint-disable-next-line no-empty
      } catch (error) {
        setFullname('');
        setPassword('');
        setEmail('');
        setUsername('');
        setError(error.message);
      }
    } else {
      setError('the username already exist');
    }
  };

  useEffect(() => {
    document.title = 'Sign up - instagram';
  }, []);

  return (
    <div className="container flex mx-auto max-w-screen-md items-center h-screen">
      <div className="flex w-3/5">
        <img src="/images/iphone-with-profile.jpg" alt="iphone with instagram on screen" />
      </div>
      <div className="flex flex-col w-2/5">
        <div className="flex flex-col items-center bg-white p-4 border border-gray-primary mb-4 rounded">
          <h1 className="flex justify-center w-full">
            <img src="/images/logo.png" alt="instagram" className="mt-2 mb-3 w-6/12" />
          </h1>
          {error && <p className="mb-4 text-xs text-red-primary"> {error}</p>}

          <form onSubmit={handleSignUp} method="POST">
            <input
              aria-label="Enter your Username"
              type="text"
              placeholder="Username"
              className="text-sm text-gray-base w-full mr-3 py-5 px-4 h-8 border border-gray-primary rounded mb-2"
              value={username}
              onChange={({ target }) => setUsername(target.value)}
            />
            <input
              aria-label="Enter your Full name"
              type="text"
              placeholder="Full name"
              className="text-sm text-gray-base w-full mr-3 py-5 px-4 h-8 border border-gray-primary rounded mb-2"
              value={fullname}
              onChange={({ target }) => setFullname(target.value)}
            />
            <input
              aria-label="Enter your email address"
              type="text"
              placeholder="Email address"
              className="text-sm text-gray-base w-full mr-3 py-5 px-4 h-8 border border-gray-primary rounded mb-2"
              value={email}
              onChange={({ target }) => setEmail(target.value)}
            />
            <input
              aria-label="Enter your password"
              type="password"
              placeholder="Password"
              className="text-sm text-gray-base w-full mr-3 py-5 px-4 h-8 border border-gray-primary rounded mb-2"
              value={password}
              onChange={({ target }) => setPassword(target.value)}
            />
            <button
              disabled={isInvalid}
              type="submit"
              className={`bg-blue-medium text-white w-full rounded h-8 font-bold ${
                isInvalid && 'opacity-50'
              }`}
            >
              Sign Up
            </button>
          </form>
        </div>
        <div className="flex justify-center flex-col w-full bg-white border border-gray-primary p-4 rounded">
          <p className="text-sm text-center">
            Have an account ? {` `}
            <Link to={ROUTES.LOGIN} className="font-bold text-blue-medium">
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
