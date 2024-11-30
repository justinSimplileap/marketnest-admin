'use client';
import React from 'react';
import { CldUploadWidget } from 'next-cloudinary';

const ImageUpload = () => {
  return (
    <div>
      <CldUploadWidget
        uploadPreset="product_images"
        onSuccess={({ event, info }) => {
          console.log('event', event);
          console.log('info', info);
        }}
      >
        {({ open }) => {
          return <button onClick={() => open()}>Upload an Image</button>;
        }}
      </CldUploadWidget>
    </div>
  );
};

export default ImageUpload;
