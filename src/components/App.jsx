import React, { useState } from 'react';
import { Container } from './Container/Container';
import { Searchbar } from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';

export const App = () => {
  const [photo, setPhoto] = useState('');
  const handleFormSubmit = photo => {
    setPhoto(photo);
  };

  return (
    <div>
      <Container>
        <Searchbar handleFormSubmit={handleFormSubmit} />
        <ImageGallery photoQuery={photo} />
      </Container>
    </div>
  );
};
