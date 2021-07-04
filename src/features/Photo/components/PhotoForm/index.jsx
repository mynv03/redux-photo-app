import { PHOTO_CATEGORY_OPTIONS } from "constants/global";
import PropTypes from "prop-types";
import React from "react";
import Select from "react-select";
import { Button, FormGroup, Input, Label } from "reactstrap";
import Images from "constants/images";
import { Formik, Form, FastField } from "formik";
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
  const initialValues = {
    title: "",
    categoryId: null,
  };
  return (
    <Formik 
      initialValues={initialValues}
      onSubmit={values => console.log(values)}
    >
      {(formikProps) => {
        const { values, errors, touched } = formikProps;
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
              <Button color="primary">Add to album</Button>
            </FormGroup>
          </Form>
        );
      }}
    </Formik>
  );
}

export default PhotoForm;
