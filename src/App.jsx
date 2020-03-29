import React from 'react';
import './style/main.sass';
import Metronome from './components/Metronome';
import 'bootstrap/scss/bootstrap-reboot.scss';

export default function App() {
  return (
    <div className="container">
      <Metronome />
    </div>
  );
}
