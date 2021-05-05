import * as React from 'react';
import './App.css';
import { ColorTool } from './Components/color-tool';

const colors = require('./Resources/colorsDistanceMatrix.json');

const App = () => <ColorTool colors={colors} />

export default App;
