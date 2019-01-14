import React from 'react';

import Piano from '../../components/piano/piano';

import './app.scss';

const App = () => (
  <div className="app">
    <div className="page-title">React Piano</div>
    <div className="piano-container">
      <Piano />
    </div>
  </div>
);

export default App;
