import smile from '../icons/smile.svg';
import sad from '../icons/sad.svg';
import Image from 'next/image';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import { useState } from 'react';

const Card = ({ image, weight, hour, date, face }) => {
    const [open, setOpen] = useState(false);
    const handleClickOpen = () => {
      setOpen(true);
    };
    const handleClose = () => {
      setOpen(false);
    };

    return ( <>
      <button 
        onClick={() => {
            handleClickOpen();
        }}
        className="bg-white rounded-lg p-4 mb-4 shadow-md items-center" style={{ width: '350px', height: '150px' }}>
        <div>
            <p className="text-black border-b-2 text-xl pl-4">{date}</p>
        </div>
        <div className="w-full h-full flex">
            {/* Left side: Image */}
            <div className="w-1/3 h-full m-auto">
                {face === '1' ? (
                <Image className="p-4 pb-7 m-auto items-center h-full" src={smile} alt="smile" width={80} height={80} />
                ) : (
                <Image className="p-4 pb-7 m-auto items-center h-full" src={sad} alt="sad" width={80} height={80} />
                )}
            </div>
    
            {/* Right side: Text fields */}
            <div className="w-2/3 h-full pl-4 flex flex-col justify-center">
            <p className="text-black text-xl pb-1">Waga: {weight} g</p>
            <p className="text-black text-xl pb-2">Godzina: {hour}</p>
            {/* console.log(`data:image/png;base64,${image.buffer}`); */}
            </div>
        </div>
      </button>

        {/* Dialog */}
        <Dialog open={open} onClose={handleClose} className='rounded-3xl'>
            <DialogTitle className='text-xl'>Poop from {date} </DialogTitle>
            <DialogContent>
            {/* <p>Waga: {waga} g</p>
            <p>Godzina: {godzina}</p>
            <p>Data: {date}</p>
            <p>Face: {face === '1' ? '😊' : '😢'}</p> */}
            <img src={`data:image/png;base64,${image.buffer}`} alt="image" className='rounded-lg' />
            </DialogContent>
            <DialogActions>
            <Button onClick={handleClose} color="primary">
                ❌
            </Button>
            </DialogActions>
        </Dialog>

      </>
    );
  };
  
  export default Card;
  