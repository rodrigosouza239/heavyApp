import { ErrorMessage as FormikErrorMessage } from 'formik';
import ErrorMessage from '@components/ErrorMessage';
import PropTypes from 'prop-types';
import React from 'react';

function FormErrorMessage({ name }) {
  return <FormikErrorMessage component={ErrorMessage} name={name} />;
}

FormErrorMessage.propTypes = {
  name: PropTypes.string.isRequired,
};

export default FormErrorMessage;
