import * as React from 'react';
import './App.css';
import ColorTool from './Components/color-tool';

const colors = require('./Resources/colorsDistanceMatrix.json');

class App extends React.Component<{}, null> {

  render() {
    return (
      <ColorTool colors={colors} />
    );
  }
}

export default App;
