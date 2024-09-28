// app/page.tsx (or any page you'd like to use)
'use client'
import { useEffect, useState } from 'react';
import { convertISOToDateTime } from '@/utils/dateTimeConverter';

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
    return <p>Loading images...</p>;
  }

  return (
    <div>
      <h1>Image Gallery</h1>
      <ul style={{ listStyleType: 'none', padding: 0 }}>
        {images.map((image) => (
          <li key={image._id} style={{ marginBottom: '20px' }}>
            <img
              src={`data:image/png;base64,${image.buffer}`}
              alt="Submitted"
              style={{ width: '200px', height: '200px', objectFit: 'cover' }}
            />
            <p>Submitted at: {new Date(convertISOToDateTime(image.submittedAt)).toLocaleString()}</p>
            <p>Weight: {image.weight}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ImageGallery;
