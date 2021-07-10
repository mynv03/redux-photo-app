import React from 'react';
import Banner from '../../../../components/Banner';
import Images from '../../../../constants/images';
import { Link, useHistory } from 'react-router-dom';
import { Container } from 'reactstrap';
import { useDispatch, useSelector } from 'react-redux';
import PhotoList from 'features/Photo/components/PhotoList';
import { removePhoto } from 'features/Photo/photoSlice';

MainPage.propTypes = {};

function MainPage(props) {
  const photos = useSelector(state => state.photos);
  const dispatch = useDispatch();
  const history = useHistory();
  const handlePhotoRemoveClick = (photo) => {
    console.log('Remove:', photo);
    const photoId = photo.id;
    dispatch(removePhoto(photoId))
  }

  const handlePhotoEditClick = (photo) => {
    console.log('Edit:', photo);
    const editPhotoUrl = `/photos/${photo.id}`
    history.push(editPhotoUrl);
  }

  return (
    <div className="photo-main">
      <Banner title="Your awesome photos 🎉" backgroundUrl={Images.PINK_BG} />

      <Container className="text-center">
        <Link to="/photos/add">Add new photo</Link>

        <PhotoList 
          photoList={photos}
          onPhotoEditClick={handlePhotoEditClick}
          onPhotoRemoveClick={handlePhotoRemoveClick}
        />
      </Container>
    </div>
  );
}

export default MainPage;