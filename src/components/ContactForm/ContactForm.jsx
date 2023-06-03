import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Formik, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { Button } from 'components/ui';
import { StyledForm, Label, Input, Error } from './ContactForm.styled';

const schema = Yup.object().shape({
  name: Yup.string()
    .matches(
      /^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$/,
      "Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
    )
    .required('Name is required'),
  number: Yup.string()
    .matches(
      /\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}/,
      'Phone number must be digits and can contain spaces, dashes, parentheses and can start with +'
    )
    .required('Number is required'),
});

export class ContactForm extends Component {
  static propTypes = {
    onSubmit: PropTypes.func.isRequired,
  };

  state = {
    name: '',
    number: '',
  };

  handleSubmit = (values, { resetForm, setErrors }) => {
    const { onSubmit, contacts } = this.props;
    const { name, number } = values;

    const existingContact = contacts.find(
      contact => contact.name === name || contact.number === number
    );

    if (existingContact) {
      if (existingContact.name === name) {
        setErrors({ name: 'Contact with this name already exists!' });
      }
      if (existingContact.number === number) {
        setErrors({ number: 'Contact with this number already exists!' });
      }
      return;
    }

    onSubmit(values.name, values.number);
    resetForm();
  };

  render() {
    return (
      <Formik
        initialValues={{ name: '', number: '' }}
        validationSchema={schema}
        onSubmit={this.handleSubmit}
      >
        <StyledForm>
          <Label htmlFor="name">
            Name
            <Field
              type="text"
              name="name"
              as={Input}
              placeholder="Enter name"
            />
            <ErrorMessage name="name" component={Error} />
          </Label>
          <Label htmlFor="number">
            Number
            <Field
              type="text"
              name="number"
              as={Input}
              placeholder="Enter number"
            />
            <ErrorMessage name="number" component={Error} />
          </Label>
          <Button type="submit">Add contact</Button>
        </StyledForm>
      </Formik>
    );
  }
}