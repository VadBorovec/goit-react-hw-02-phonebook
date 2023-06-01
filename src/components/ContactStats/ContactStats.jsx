import { Box, Text } from './ContactStats.styled';

export const ContactStats = ({ totalContactCount }) => (
  <Box>
    <Text>Total contacts: {totalContactCount}</Text>
  </Box>
);
