// import { ContactElement } from 'components/ContactElement';
import { Button } from 'components/ui';
import { List, Item, Name, Number } from './ContactList.styled';

export const ContactList = ({ contacts, onDeleteContact }) => (
  <List>
    {contacts.map(({ id, name, number }) => (
      <Item key={id}>
        <Name>{name}</Name>
        <Number>{number}</Number>
        <Button onClick={() => onDeleteContact(id)}>Delete</Button>
      </Item>
    ))}
  </List>
);
