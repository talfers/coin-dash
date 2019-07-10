import React from 'react';
import WelcomeMessage from './WelcomeMessage';
import './App.css';
import AppLayout from './AppLayout';
import AppBar from './AppBar';
import { AppProvider } from './context';



function App() {
  return (
    <AppLayout>
      <AppProvider>
        <AppBar/>
        <WelcomeMessage/>
      </AppProvider>
    </AppLayout>
  );
}

export default App;
