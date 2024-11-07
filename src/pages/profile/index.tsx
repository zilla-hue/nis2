import { useEffect, useState } from 'react';
import UpdateProfileForm from './_components/UpdateProfileForm';
import usersData from '@/data/users.json';

// Define the User type based on the structure in usersData
type User = (typeof usersData.users)[0];

const ProfilePage = () => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    // Simulate fetching user data
    const fetchUser = async () => {
      // In a real app, you'd get the current user's ID from authentication
      const userId = '1'; // Assuming the first user for this example
      const foundUser = usersData.users.find((u) => u.id === userId);
      setUser(foundUser || null);
    };

    fetchUser();
  }, []);

  return (
    <div className="container mx-auto px-4 py-8 mt-16">
      <h1 className="text-3xl font-extrabold text-center mb-8">Your Profile</h1>

      {user ? (
        <>
          <div className="mb-6 text-center">
            <h2 className="text-2xl font-semibold mb-2">
              Welcome, {user.email}
            </h2>
            <p className="text-gray-600">
              Manage your personal information and preferences here.
            </p>
          </div>
          <UpdateProfileForm user={user} />
        </>
      ) : (
        <p className="text-red-500 text-center">
          Error: Unable to load user data. Please try again later.
        </p>
      )}
    </div>
  );
};

export default ProfilePage;
