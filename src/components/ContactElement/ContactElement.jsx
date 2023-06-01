import PropTypes from 'prop-types';
import { Item, Name, Number } from './ContactElement.styled';

export const ContactElement = ({ id, name, number }) => {
  return (
    <Item key={id}>
      <Name>{name}</Name>
      <Number>{number}</Number>
    </Item>
  );
};

ContactElement.propTypes = {
  id: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  number: PropTypes.number.isRequired,
};
