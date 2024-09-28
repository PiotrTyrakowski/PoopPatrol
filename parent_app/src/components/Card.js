import smile from '../icons/smile.svg';
import sad from '../icons/sad.svg';

const Card = ({ image, waga, godzina }) => {
    return ( <>
    
      <div className="bg-white rounded-lg p-4 mb-4 shadow-md items-center" style={{ width: '350px', height: '150px' }}>
        <div>
            <p className="text-black">10.05.2024</p>
        </div>
        <div className="w-full h-full flex">
            {/* Left side: Image */}
            <div className="w-1/3 h-full">
            {/* <img
                src={`data:image/png;base64,${image.buffer}`}
                alt="Card Image"
                className="w-full max-h-full object-cover rounded-md"
                style={{ objectFit: 'cover' }}
            /> */}
            <svg
                src="../icons/smile.svg"
                alt="Card Image"
                className="w-full max-h-full object-cover rounded-md"
                style={{ objectFit: 'cover' }}
            />
            </div>
    
            {/* Right side: Text fields */}
            <div className="w-2/3 h-full pl-4 flex flex-col justify-center">
            <p className="text-black">Waga: {waga} g</p>
            <p className="text-black">Godzina: {godzina}</p>
            </div>
        </div>
      </div>
      </>
    );
  };
  
  export default Card;
  