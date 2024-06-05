import React from 'react';
import Container from '@mui/material/Container';
import Header from './Header';
import Content from './Content';
import { ListProvider } from './context/ListContext';

function App() {
  return (
    <ListProvider>
      <Header />
      <Container>
        <Content />
      </Container>
    </ListProvider>
  );
}

export default App;
