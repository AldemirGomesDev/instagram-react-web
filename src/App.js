import React from 'react';
import { BrowserRouter } from 'react-router-dom';

import Header from './components/Header';
import Routes from './router';

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes />
    </BrowserRouter>
  );
}

export default App;
