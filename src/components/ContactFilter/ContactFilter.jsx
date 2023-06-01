import { Filter, Label, Input } from './ContactFilter.styled';

export const ContactFilter = ({ value, onChange }) => (
  <Filter>
    <Label>
      Filter
      <Input type="text" value={value} onChange={onChange} />
    </Label>
  </Filter>
);
