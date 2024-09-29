// app/page.tsx (or any page you'd like to use)
'use client'
import { useEffect, useState } from 'react';
import Card from '../../components/Card';
import { convertISOToTime } from '@/utils/dateTimeConverter';
import { convertISOToDate } from '@/utils/dateTimeConverter';
import Navbar from '../../components/Navbar';


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

        data.sort((a: ImageData, b: ImageData) => {
          return new Date(b.submittedAt).getTime() - new Date(a.submittedAt).getTime();
        });


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
    <div>
    <div className='min-h-screen bg-gray-100 p-4'>
      {/* <h1 className="text-black">Image Gallery</h1> */}
      <p className=" text-4xl font-bold text-gray-800 mb-4">Image Gallery</p>
      <ul style={{ listStyleType: 'none', padding: 0 }}>
        {images.map((image) => (
          <Card 
            key={image._id}
            image={image} 
            weight={image.weight} 
            hour={convertISOToTime(image.submittedAt)} 
            date={convertISOToDate(image.submittedAt)} 
            face={'1'} 
            />
        ))}
      </ul>
    </div>
    <Navbar />
    </div>
  );
};

export default ImageGallery;