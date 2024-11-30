import { v2 as cloudinary } from 'cloudinary';
import { IncomingForm } from 'formidable';
import fs from 'fs';
import { NextApiRequest, NextApiResponse } from 'next';

// Configure Cloudinary using environment variables
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});

export const config = {
  api: {
    bodyParser: false, // Disable body parsing to handle file upload manually
  },
};

export default (req: NextApiRequest, res: NextApiResponse) => {
  const form = new IncomingForm();

  form.parse(req, async (err: Error | null, fields, files) => {
    if (err) {
      return res.status(500).json({ error: 'Failed to upload file' });
    }

    // Check if files.file is an array and handle multiple files
    const uploadedFiles = files?.file
      ? Array.isArray(files.file)
        ? files.file
        : [files.file]
      : [];

    if (uploadedFiles.length === 0) {
      return res.status(400).json({ error: 'No files uploaded' });
    }

    try {
      // Upload all files to Cloudinary
      const uploadPromises = uploadedFiles.map((file) => {
        const filePath = file?.filepath;
        return cloudinary.uploader.upload(filePath);
      });

      const uploadResults = await Promise.all(uploadPromises);

      // Clean up the uploaded files from local storage
      uploadedFiles.forEach((file) => {
        fs.unlinkSync(file?.filepath);
      });

      // Return the URLs from Cloudinary
      const urls = uploadResults.map((result) => result.secure_url);

      res.status(200).json({ urls });
    } catch (uploadErr) {
      console.error(uploadErr);
      res.status(500).json({ error: 'Failed to upload images to Cloudinary' });
    }
  });
};
