// import React from 'react';
import Navigation from '../../component/Homepage/Navigation';

function Homepage() {
  return (
    <>
      <Navigation />
      <div className="h-screen mt-5 flex items-center flex-col justify-center w-full mx-auto top-0 relative">
        <h1 className="text-4xl mt-5 text-bold ">PROJECT REPOSITORY SYSTEM</h1>{' '}
        <br />
        <p className="text-4xl">COMPUTER TCHNOLOGY DEPARTMENT</p>
        <ul className="mt-10">
          <li className="mb-2">
            <span className="mx-2 text-2xl">MATRIC:</span>
            <span className="text-2xl font-bold">P/ND/51</span>
          </li>
          <li className="mb-2">
            <span className="mx-2 text-2xl">NAME:</span>
            <span className="text-2xl font-bold">Mikel</span>
          </li>
          <li className="mb-2">
            <span className="mx-2 text-2xl">PROGRAM:</span>
            <span className="text-2xl font-bold">ND PART TIME</span>
          </li>
          <li className="mb-2">
            <span className="mx-2 text-2xl">SESSION:</span>
            <span className="text-2xl font-bold">ND PART TIME</span>
          </li>
          <li className="mb-2">
            <span className="mx-2 text-2xl">SEMESTER:</span>
            <span className="text-2xl font-bold">SECOND SEMESTER</span>
          </li>
          <li className="mb-2">
            <span className="mx-2 text-2xl">LEVEL:</span>
            <span className="text-2xl font-bold">ND3</span>
          </li>
          <li className="mb-2">
            <span className="mx-2 text-2xl">PROJECT NAME:</span>
            <span className="text-2xl font-bold">REPOSITORY DATA SYSTEM</span>
          </li>
        </ul>
      </div>
    </>
  );
}

// export default Homepage;
export default Homepage;
