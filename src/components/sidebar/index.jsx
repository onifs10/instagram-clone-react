import useUser from '../../hooks/use-user';
import User from '../user';
import Suggestion from '../suggestion';

const SideBar = () => {
  const {
    user: { fullName, username, userId, emailAddress: email, following, docId }
  } = useUser();

  return (
    <div className="p-4">
      <User userName={username} fullName={fullName} email={email} />
      <Suggestion userId={userId} following={following} loggedInUsersdocId={docId} />
    </div>
  );
};

export default SideBar;
