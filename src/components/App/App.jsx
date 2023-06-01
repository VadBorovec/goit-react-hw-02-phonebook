import React, { Component } from 'react';
import shortid from 'shortid';

import { Container, Section } from 'components/ui';

import {
  ContactFilter,
  ContactForm,
  ContactList,
  ContactStats,
} from 'components';

export class App extends Component {
  state = {
    contacts: [],
    filter: '',
  };

  addContact = (name, number) => {
    const contact = {
      id: shortid.generate(),
      name: name,
      number: number,
    };

    this.setState(prevState => ({
      contacts: [contact, ...prevState.contacts],
    }));
  };

  deleteContact = contactId => {
    this.setState(prevState => ({
      contacts: prevState.contacts.filter(contact => contact.id !== contactId),
    }));
  };

  changeFilter = e => {
    this.setState({ filter: e.currentTarget.value });
  };

  getVisibleContacts = () => {
    const { filter, contacts } = this.state;
    const normalizedFilter = filter.toLowerCase();

    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(normalizedFilter)
    );
  };

  render() {
    const { contacts, filter } = this.state;
    const totalContactCount = contacts.length;
    const visibleContacts = this.getVisibleContacts();

    return (
      <Container>
        <Section title="Phonebook">
          <ContactForm onSubmit={this.addContact} />
          <ContactFilter value={filter} onChange={this.changeFilter} />
          <ContactStats totalContactCount={totalContactCount} />

          <ContactList
            contacts={visibleContacts}
            onDeleteContact={this.deleteContact}
          />
        </Section>
      </Container>
    );
  }
}
