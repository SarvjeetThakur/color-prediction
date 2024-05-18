import { UserProfile } from '@clerk/nextjs';
import React from 'react';

const Profile = () => {
  return (
    <div className='w-full mb-16'>
      <div className='w-full flex justify-center'>
        <div className='max-w-screen flex justify-center items-center  w-full p-4'>
          <UserProfile path="/profile" />
        </div>
      </div>
    </div>
  );
};

export default Profile;