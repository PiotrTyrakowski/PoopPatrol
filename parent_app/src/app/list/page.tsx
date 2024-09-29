// app/page.tsx (or any page you'd like to use)
'use client'
import { useEffect, useState } from 'react';
import Card from '../../components/Card';
import { convertISOToTime } from '@/utils/dateTimeConverter';
import { convertISOToDate } from '@/utils/dateTimeConverter';


type ImageData = {
  _id: string;
  buffer: string; // Base64-encoded string
  submittedAt: string;
  weight: string; //weight --
  face: string; // 1 if happy face, 0 if unhappy face
};



const ImageGallery = () => {
  const [images, setImages] = useState<ImageData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const response = await fetch('/api/get-images');
        const data = await response.json();
        setImages(data);
      } catch (error) {
        console.error('Error fetching images:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchImages();
  }, []);

  if (loading) {
    return <p className="text-black">Loading images...</p>;
  }

  return (
    <div className='min-h-screen bg-gray-100 p-4'>
      <h1 className="text-black">Image Gallery</h1>
      <ul style={{ listStyleType: 'none', padding: 0 }}>
        {/* {images.map((image) => (
          <li key={image._id} style={{ marginBottom: '20px' }}>
            <img
              src={`data:image/png;base64,${image.buffer}`}
              alt="Submitted"
              style={{ width: '200px', height: '200px', objectFit: 'cover' }}
            />
            <p>Submitted at: {new Date(image.submittedAt).toLocaleString()}</p>
          </li> 
        ))} */}
        {images.map((image) => (
          <Card 
            key={image._id}
            image={image} 
            waga={image.weight} 
            godzina={convertISOToTime(image.submittedAt)} 
            data={convertISOToDate(image.submittedAt)} 
            face={image.face} 
            />
        ))}
      </ul>
    </div>
  );
};


export default ImageGallery;