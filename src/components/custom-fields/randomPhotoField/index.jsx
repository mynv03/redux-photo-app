import RandomPhoto from "components/RandomPhoto";
import { ErrorMessage } from "formik";
import PropTypes from "prop-types";
import React from "react";
import { FormGroup, Input, Label } from "reactstrap";
import FormFeedback from "reactstrap/lib/FormFeedback";

RandomPhotoField.propTypes = {
  field: PropTypes.object.isRequired,
  form: PropTypes.object.isRequired,

  label: PropTypes.string,
};

RandomPhotoField.defaultProps = {
  label: "",
};

function RandomPhotoField(props) {
  const { field, form, label } = props;

  const { name, value, onBlur } = field;

  const handleImageUrlChange = (newImageUrl) => {
    form.setFieldValue(name, newImageUrl);
  }
  const {errors, touched} = form

  const showError = errors[name] && touched[name];
  return (
    <FormGroup>
      {label && <Label for={name}>{label}</Label>}

      <RandomPhoto
        name={name}
        imageUrl={value}
        onImageUrlChange={handleImageUrlChange}
        onRandomButtonBlur={onBlur}

      />
    <div className={showError ? 'is-invalid' : ''}></div>
    <ErrorMessage name={name} component={FormFeedback}></ErrorMessage>
    </FormGroup>
  );
}

export default RandomPhotoField;
