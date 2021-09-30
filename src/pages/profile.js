import { useEffect } from 'react';
import Header from '../components/header';

export default function Profile() {
  useEffect(() => {
    document.title = 'Profile - Instagram';
    return () => {
      document.title = 'Instagram';
    };
  }, []);
  return (
    <div className="bg-gray-background">
      <Header />
      <div className="mx-auto max-w-screen-lg">
        <p className="text-center text-2xl">Profile</p>
      </div>
    </div>
  );
}
