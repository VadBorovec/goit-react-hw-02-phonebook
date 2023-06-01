import React, { Component } from 'react';
import shortid from 'shortid';

import Container from './ui/Container';
import Section from './ui/Section';

import Form from './Form';
import Counter from './Counter';
import Dropdown from './Dropdown';
import ColorPicker from './ColorPicker';
import ContactList from './ContactList';
import ContactForm from './ContactForm';
import ContactFilter from './ContactFilter';
import ContactStats from './ContactStats';

import colorPickerOptions from './ColorPicker/colorPickerOptions.json';
import initialContacts from '../../data/contacts.json';

class App extends Component {
  state = {
    contacts: initialContacts,
    filter: '',
  };

  addContact = text => {
    if (text.trim() === '') {
      window.alert(
        'Please enter your message. An empty field cannot be saved.'
      );
      return;
    }

    console.log(text);
    const contact = {
      id: shortid.generate(),
      text,
      completed: false,
    };
    this.setState(({ contacts }) => ({
      contacts: [contact, ...contacts],
    }));
  };

  deleteContact = contactId => {
    this.setState(prevState => ({
      contacts: prevState.contacts.filter(contact => contact.id !== contactId),
    }));
  };

  toggleCompleted = contactId => {
    console.log(contactId);
    this.setState(({ contacts }) => ({
      contacts: contacts.map(contact =>
        contact.id === contactId
          ? { ...contact, completed: !contact.completed }
          : contact
      ),
    }));
  };

  changeFilter = e => {
    this.setState({ filter: e.currentTarget.value });
  };

  getVisibleContacts = () => {
    const { filter, contacts } = this.state;
    const normalizedFilter = filter.toLowerCase();

    return contacts.filter(contact =>
      contact.text.toLowerCase().includes(normalizedFilter)
    );
  };

  calculateCompletedContacts = () => {
    const { contacts } = this.state;

    return contacts.reduce(
      (total, contact) => (contact.completed ? total + 1 : total),
      0
    );
  };

  formSubmitHandler = data => {
    console.log(data);
  };

  render() {
    const { contacts, filter } = this.state;
    const totalContactCount = contacts.length;
    const completedContactCount = this.calculateCompletedContacts();
    const visibleContacts = this.getVisibleContacts();

    return (
      <Container>
        <Form onSubmit={this.formSubmitHandler} />
        <Counter initialValue={10} />
        <Dropdown />
        <ColorPicker options={colorPickerOptions} />
        <Section title="Contact list">
          <ContactForm onSubmit={this.addContact} />
          <ContactFilter value={filter} onChange={this.changeFilter} />
          <ContactStats
            totalContactCount={totalContactCount}
            completedContactCount={completedContactCount}
          />

          <ContactList
            contacts={visibleContacts}
            onDeleteContact={this.deleteContact}
            onToggleCompleted={this.toggleCompleted}
          />
        </Section>
      </Container>
    );
  }
}

export default App;
