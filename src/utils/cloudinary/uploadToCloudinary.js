import axios from 'axios';

const uploadToCloudinary = async (fileType, data) => {
  try {
    const response = await fetch(
      `${process.env.REACT_APP_CLOUDINARY_URL}/${fileType}/upload`,
      {
        method: 'POST',
        body: data
      }
    );
    if (!response.ok) throw new Error('Server error. Please try again later.');
    return await response.json();
  } catch (error) {
    throw new Error(error.message);
  }
};

export const uploadToCloudinaryWithProgress = async (
  fileType,
  data,
  setProgress = null
) => {
  try {
    const response = await axios.request({
      method: 'post',
      url: `${process.env.REACT_APP_CLOUDINARY_URL}/${fileType}/upload`,
      data,
      onUploadProgress: setProgress
        ? (p) => {
            const percent = Math.round((p.loaded / p.total) * 100);
            setProgress(percent);
          }
        : null
    });
    if (response.status !== 200)
      throw new Error('Server error. Please try again later.');
    return response.data;
  } catch (e) {
    throw new Error(e.message);
  }
};

export default uploadToCloudinary;
