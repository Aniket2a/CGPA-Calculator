import React from 'react';
import { CGPAProvider } from './context/CGPAContext';
import { MainContainer } from './components/MainContainer';

export default function App() {
  return (
    <CGPAProvider>
      <MainContainer />
    </CGPAProvider>
  );
}
