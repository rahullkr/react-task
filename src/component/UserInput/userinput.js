import React, { useState } from "react";

const ImageUploadComponent = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [display, setDisplayText] = useState(false);

  const handleChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setSelectedImage(imageUrl);
    }
  };

  const handleDisplay = () => {
    setDisplayText(true);
  };

  return (
    <>
      <input
        type="file"
        accept="image/*"
        onChange={handleChange}
      />
      <button onClick={handleDisplay}>Display Image</button>
      {display && selectedImage && (
        <div>
          <p>The uploaded image is:</p>
          <img src={selectedImage} alt="displayed" />
        </div>
      )}
    </>
  );
};

export default ImageUploadComponent;
