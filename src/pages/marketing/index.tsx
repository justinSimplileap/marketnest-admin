import React, { useState } from 'react';

const Marketing = () => {
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [uploadedImageUrls, setUploadedImageUrls] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(false); // Add loading state

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      setSelectedFiles(Array.from(event.target.files));
    }
  };

  const handleSubmit = async () => {
    const formData = new FormData();
    selectedFiles.forEach((file) => {
      formData.append('file', file);
    });

    setLoading(true); // Set loading to true when upload starts

    try {
      const response = await fetch('/api/uploadImage', {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();
      if (response.ok) {
        console.log('Uploaded image URLs:', data.urls);
        setUploadedImageUrls(data.urls); // Save uploaded URLs to state
      } else {
        console.error('Error uploading images:', data.error);
      }
    } catch (error) {
      console.error('Error uploading images:', error);
    } finally {
      setLoading(false); // Set loading to false once upload finishes
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold text-center mb-6">
        Upload Multiple Banners
      </h1>

      <div className="mb-4">
        <input
          type="file"
          accept="image/*"
          multiple
          onChange={handleFileChange}
          className="w-full p-2 border-2 border-gray-300 rounded-lg"
        />
      </div>

      <div className="text-center mb-4">
        <button
          onClick={handleSubmit}
          className="bg-blue-500 text-white p-2 rounded-lg hover:bg-blue-600 transition"
          disabled={loading} // Disable button while loading
        >
          {loading ? (
            <span className="spinner-border animate-spin border-t-2 border-b-2 border-white w-5 h-5 rounded-full">
              L
            </span>
          ) : (
            'Upload Images'
          )}
        </button>
      </div>

      {/* Displaying selected files */}
      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-4">Selected Files:</h2>
        <ul className="list-disc pl-6">
          {selectedFiles.map((file, index) => (
            <li key={index} className="text-gray-600">
              {file.name}
            </li>
          ))}
        </ul>
      </div>

      {/* Displaying uploaded images */}
      {uploadedImageUrls.length > 0 && (
        <div>
          <h2 className="text-xl font-semibold mb-4">Uploaded Images:</h2>
          <div className="grid grid-cols-3 gap-4">
            {uploadedImageUrls.map((url, index) => (
              <div key={index} className="border p-2 rounded-lg shadow-lg">
                <img
                  src={url}
                  alt={`Uploaded image ${index + 1}`}
                  className="w-full h-40 object-cover rounded-lg"
                />
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Marketing;
