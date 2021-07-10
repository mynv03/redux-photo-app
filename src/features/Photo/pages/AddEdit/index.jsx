import { addPhoto, updatePhoto } from 'features/Photo/photoSlice';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import Banner from '../../../../components/Banner';
import PhotoForm from '../../components/PhotoForm';
import './styles.scss';

AddEditPage.propTypes = {};

function AddEditPage(props) {
  const dispatch = useDispatch();
  const history = useHistory();
  const { photoId } = useParams();
  const editedPhoto = useSelector(state => state.photos.find(x => x.id === +photoId))
  const isAddPhoto = !photoId;
  const initialValues = isAddPhoto
  ? {
    title: "",
    categoryId: null,
    photo: ""
  } : editedPhoto;

  const handleSubmit = (values) =>{
    return new Promise(resolve => {
      if(isAddPhoto){
        console.log('Form submit: ', values)
        setTimeout(() => {
          const action = addPhoto(values);
          dispatch(action);
        }, 2000);
      }else{
        const action = updatePhoto(values);
        dispatch(action);
      }
      history.push('/photos');
    })
    
    
  }
  return (
    <div className="photo-edit">
      <Banner title="Pick your amazing photo 😎" />

      <div className="photo-edit__form">
        <PhotoForm
          initialValues={initialValues}
          isAddPhoto = {isAddPhoto}
          onSubmit={handleSubmit} 
        />
      </div>
    </div>
  );
}

export default AddEditPage;