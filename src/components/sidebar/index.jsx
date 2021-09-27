import useUser from '../../hooks/use-user';
import User from '../user';
import Suggestion from '../suggestion';

export default function Sidebar() {
  const {
    user: { fullName, username, userId, emailAddress: email }
  } = useUser();
  return (
    <div className="p-4">
      <User userName={username} fullName={fullName} email={email} />
      <Suggestion userId={userId} />
    </div>
  );
}
