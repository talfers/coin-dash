import React from 'react';
import './App.css';
import AppLayout from './AppLayout';
import AppBar from './AppBar';
import { AppProvider } from './context';
import Settings from '../Settings';
import Dashboard from '../Dashboard/Dashboard';
import Content from '../Shared/Content';



function App() {
  return (
    <AppLayout>
      <AppProvider>
        <AppBar/>
        <Content>
          <Settings/>
          <Dashboard/>
        </Content>
      </AppProvider>
    </AppLayout>
  );
 }

export default App;
