import React from "react";

const HomePage = () => {
  return (
    <div className="min-h-screen bg-gray-100 p-4">
      {/* Container */}
      <div className="grid grid-cols-2 gap-4">

        {/* Poop Icon and Number */}
        <div className="col-span-2 flex flex-row gap-x-2 items-center justify-center bg-white p-2 rounded-[1rem] shadow-md h-[16rem]">
          <h1 className="text-[15rem] font-bold">1</h1>
          <span className="text-[10rem]">💩</span>
        </div>

        {/* Recommended Article Section */}
        <div className="col-span-1 bg-white p-6 rounded-[1rem] shadow-md flex flex-col items-center h-[12rem]">
          <span className="text-3xl">🍎</span>
          <p className="text-center mt-4">Polecajka artykuł</p>
        </div>


        {/* Recommended Article Section */}
        <div className="col-span-1 bg-white p-6 rounded-[1rem] shadow-md flex flex-col items-center h-[12rem]">
          <h2 className="text-sm text-gray-600 mb-2">To dobre źródło błonnika</h2>
          <p className="text-center mt-4">Polecajka artykuł</p>
        </div>



        {/* Weight Chart */}
        <div className="col-span-2 bg-white p-6 rounded-[1rem] shadow-md">
          <h2 className="text-sm text-gray-600 mb-2">Waga</h2>
          <div className="h-32 w-full bg-blue-200 flex items-center justify-center">
            {/* Replace with actual chart */}
            <p>Waga (Chart)</p>
          </div>
        </div>
      {/* </div> */}

        <div className="col-span-2 bg-white p-6 rounded-[1rem] shadow-md">
          <h2 className="text-sm text-gray-600 mb-2">Waga</h2>
          <div className="h-32 w-full bg-blue-200 flex items-center justify-center">
            {/* Replace with actual chart */}
            <p>Waga (Chart)</p>
          </div>
        </div>
        </div>



      {/* Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 bg-white py-4 flex justify-around border-t border-gray-200">
        <button className="text-center text-pink-500">
          <span className="block">🏠</span>
          <span className="text-xs">Home</span>
        </button>
        <button className="text-center text-pink-500">
          <span className="block">🏠</span>
          <span className="text-xs">Home</span>
        </button>
        <button className="text-center text-pink-500">
          <span className="block">🛍️</span>
          <span className="text-xs">Products</span>
        </button>
      </div>
    </div>
  );
};

export default HomePage;
