'use client'
import useSWR from 'swr';
import Card from '../../components/Card';
import { convertISOToTime, convertISOToDate } from '@/utils/dateTimeConverter';

type ImageData = {
  _id: string;
  buffer: string;
  submittedAt: string;
  weight: string;
  face: string;
};

const fetcher = (url: string) => fetch(url).then(res => res.json());

const ImageGallery = () => {
  const { data: images, error } = useSWR<ImageData[]>('/api/get-images', fetcher, {
    refreshInterval: 5000, // Fetch data every 5 seconds
  });

  if (error) return <p className="text-black">Failed to load images.</p>;
  if (!images) return <p className="text-black">Loading images...</p>;

  return (
    <div className='min-h-screen bg-gray-100 p-4'>
      <h1 className="text-black">Image Gallery</h1>
      <ul style={{ listStyleType: 'none', padding: 0 }}>
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
