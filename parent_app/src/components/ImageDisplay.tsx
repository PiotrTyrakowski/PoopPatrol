import React, { useEffect, useState } from 'react';

const ImageDisplay: React.FC = () => {
  const [imageSrc, setImageSrc] = useState<string | null>(null);

  useEffect(() => {
    const fetchImage = async () => {
      try {
        const response = await fetch('/api/upload'); // Adjust the endpoint as necessary
        const data = await response.json();
        setImageSrc(data.img); // Assuming the image URL is returned in the 'img' field
      } catch (error) {
        console.error('Error fetching image:', error);
      }
    };

    fetchImage();
  }, []);

  return (
    <div>
      {imageSrc ? (
        <img src={imageSrc} alt="Uploaded" />
      ) : (
        <p>Loading image...</p>
      )}
    </div>
  );
};

export default ImageDisplay;