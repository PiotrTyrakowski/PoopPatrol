import smile from '../icons/smile.svg';
import sad from '../icons/sad.svg';
import Image from 'next/image';

const Card = ({ image, waga, godzina, data, face }) => {
    return ( <>
      <div className="bg-white rounded-lg p-4 mb-4 shadow-md items-center" style={{ width: '350px', height: '150px' }}>
        <div>
            <p className="text-black">{data}</p>
        </div>
        <div className="w-full h-full flex">
            {/* Left side: Image */}
            <div className="w-1/3 h-full">
                {face === '1' ? (
                <Image src={smile} alt="smile" width={100} height={100} />
                ) : (
                <Image src={sad} alt="sad" width={100} height={100} />
                )}
            </div>
    
            {/* Right side: Text fields */}
            <div className="w-2/3 h-full pl-4 flex flex-col justify-center">
            <p className="text-black">Waga: {waga} g</p>
            <p className="text-black">Godzina: {godzina}</p>
            {/* console.log(`data:image/png;base64,${image.buffer}`); */}
            </div>
        </div>
      </div>
      </>
    );
  };
  
  export default Card;
  