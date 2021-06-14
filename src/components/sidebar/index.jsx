import useUser from '../../hooks/use-user';
import User from '../user';
import Suggestion from '../suggestion';

export default function Sidebar() {
  const { fullname, username, userId } = useUser();

  return (
    <div className="p-4">
      <User username={username} fullname={fullname} />
      <Suggestion userId={userId} />
    </div>
  );
}
