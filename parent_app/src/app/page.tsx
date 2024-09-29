import React from "react";
import { format } from 'date-fns';
import { LineChart } from '@mui/x-charts/LineChart';
import {BarChart} from "@mui/x-charts";



const HomePage = () => {
  const currentDate = new Date();
  const formattedDate = format(currentDate, 'MMMM do');


  return (
      <div>

    <div className=" bg-gray-100 p-4">
      {/* Container */}
      <div className="flex justify-between">
        <div>
          <p className=" text-xl font-bold text-gray-400 ">{formattedDate}</p>
          <p className=" text-4xl font-bold text-gray-800 mb-4">Podsumowanie</p>
        </div>
        <div className="my-auto rounded-[4.5rem] h-[3.25rem] w-[3.25rem] bg-[#A55D49] text-xl text-white text-center flex items-center justify-center">
          WF
        </div>

      </div>


      <section className="grid grid-cols-2 gap-4">

        {/* Poop Icon and Number */}
        <div className="col-span-2 flex flex-row gap-x-2 items-center justify-center bg-white p-2 rounded-[1rem] shadow-md h-[16rem]">
          <h1 className="text-[15rem] text-black font-bold">1</h1>
          <span className="text-[10rem] flex items-center justify-center">💩</span>
        </div>

        {/* Recommended Article Section */}
        <div className="col-span-1 bg-white rounded-[1rem] shadow-md flex flex-col items-center h-[12rem]">
          <p className="text-xl text-black border-b-2 w-full p-2 pl-4 ">Dzienna Porada</p>
          <div className="flex flex-col items-center justify-center flex-1">
            <span className="text-[4.5rem]">🍎</span>
            <p className="text-center text-black p-0">Zwiększ błonnik </p>
          </div>
        </div>



        {/* Recommended Article Section */}
        <a className="col-span-1 bg-white rounded-[1rem] shadow-md flex flex-col items-center h-[12rem] justify-between" href={"https://centrumrespo.pl/dzieci/dieta-dla-dzieci-jadlospis/"}>
          <p className="text-xl text-black border-b-2 w-full p-2 pl-4">Przykładowa dieta</p>

          <div className="flex flex-col items-center justify-center flex-1">
            <span className="text-[4.5rem] leading-none">🥗</span>
            <p className="text-center text-black mt-2"></p>
          </div>
        </a>


        {/* Weight Chart */}

        <div className="col-span-2 bg-white rounded-[1rem] shadow-md h-72">
          <p className="text-xl text-black border-b-2 w-full p-2 pl-4">Liczba kupek</p>
          <div className="h-36 w-full flex items-center justify-center mt-8">
            <BarChart
                xAxis={[
                  {
                    id: 'defaultized-x-axis-0', // Definiowanie ID osi
                    data: ['pon', 'wt', 'śr', 'czw',  'pt', 'sob', 'ndz'],
                    scaleType: 'band', // Ustawienie typu "band" dla osi X
                  },
                ]}
                tooltip={{trigger: 'none'}}
                series={[
                  {
                    id: 'auto-generated-id-0', // Dodanie identyfikatora do serii danych
                    data: [2, 0, 2, 5, 2, 3, 1],
                    color: 'rgb(172,88,75)', // Brązowy kolor dla słupków
                  },
                ]}
                width={400} // Dostosowanie szerokości wykresu
                height={250} // Dostosowanie wysokości wykresu
            />
          </div>
        </div>


        <div className="col-span-2 bg-white rounded-[1rem] shadow-md h-72 mb-6" >
          <p className="text-xl text-black border-b-2 w-full p-2 pl-4">Waga[mg]</p>
          <div className="h-36 w-full flex items-center justify-center mt-8">
            <LineChart
                xAxis={[
                  {
                    data: ['pon', 'wt', 'śr', 'czw', 'pt', 'sob', 'ndz'],
                    scaleType: 'point', // Dodanie skali dla osi X
                  },
                ]}
                series={[
                  {
                    curve: 'natural',
                    data: [200, 0, 225, 450, 150, 290, 200], // Dopasowana liczba punktów do osi X (7 wartości)
                    area: true,
                    baseline: 'min',
                    color: 'rgba(250,117,45,0.51)', // Kolor dla linii i obszaru
                  },
                ]}
                width={400} // Dostosowanie szerokości wykresu
                height={275} // Dostosowanie wysokości wykresu
                tooltip={{trigger: 'none'}}
            />
          </div>
        </div>
      </section>

      </div >
        {/* Bottom Navigation */}
        <div className="sticky bottom-0 left-0 right-0 bg-white py-4 flex justify-around border border-gray-400 ">
          <a className="text-center text-pink-500">
            <span className="block text-[2rem]">🏠</span>
            <span className="text-xs">Home</span>
          </a>
          <a className="text-center text-pink-500">
            <span className="block text-[2rem]">📅️</span>
            <span className="text-xs">Poop history</span>
          </a>
        </div>
      </div>

  );
};

export default HomePage;
