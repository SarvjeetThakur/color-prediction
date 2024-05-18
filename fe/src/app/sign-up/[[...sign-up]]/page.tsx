import * as React from 'react';
import { SignUp } from "@clerk/nextjs";

const Page = () => {

  return (
    <>
      <div className='flex justify-center items-center pt-5'>
        <SignUp />
      </div>
    </>
  );
};

export default Page;
