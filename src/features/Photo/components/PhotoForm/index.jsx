import { PHOTO_CATEGORY_OPTIONS } from "constants/global";
import PropTypes from "prop-types";
import React from "react";
import { Button, FormGroup, Input, Label, Spinner } from "reactstrap";
import { Formik, Form, FastField } from "formik";
import * as yup from 'yup';
import InputField from "components/custom-fields/InputField";
import SelectField from "components/custom-fields/selectField";
import RandomPhotoField from "components/custom-fields/randomPhotoField";
PhotoForm.propTypes = {
  onSubmit: PropTypes.func,
};

PhotoForm.defaultProps = {
  onSubmit: null,
};

function PhotoForm(props) {
  // npm i --save react-select
  const { initialValues, isAddPhoto } = props;

  const validationSchema = yup.object().shape({
    title: yup.string().required('This field is required.'),

    categoryId: yup.number().required('This field is required.').positive().integer().nullable(),

    photo: yup.string().when('categoryId', {
      is: 1,
      then: yup.string().required('This field is required.'),
      otherwise: yup.string().notRequired()
    }),
  });
  return (
    <Formik 
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={props.onSubmit}
    >
      {(formikProps) => {
        const { values, errors, touched, isSubmitting } = formikProps;
        console.log({ values, errors, touched })
        return (
          <Form>
            <FastField
              name="title"
              component={InputField}
              label="Title"
              placeholder="Eg: Wow nature ..."
            />

            <FastField
              name="categoryId"
              component={SelectField}
              label="Category"
              placeholder="What's your photo category?"
              options={PHOTO_CATEGORY_OPTIONS}
            />

            <FastField
              name="photo"
              component={RandomPhotoField}
              label="Photo"
            />

            <FormGroup>
              <Button color={isAddPhoto ? 'primary' : 'warning'}>
                {isSubmitting && <Spinner size="sm"></Spinner>}
                {isAddPhoto ? 'Add to album' : 'Update photo' }  
              </Button>
            </FormGroup>
          </Form>
        );
      }}
    </Formik>
  );
}

export default PhotoForm;
