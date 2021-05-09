import * as React from 'react';
import './App.css';
import { ColorTool } from './Components/color-tool';
import { AllColors } from './Models/color';

const allColors: AllColors = require('./Resources/colors.json');

const brands = Object.keys(allColors);

const App = () => {
    const [brand, setBrand] = React.useState(brands[0]);
    const colors = allColors[brand];

    return (<>
        <nav className="navbar navbar-default navbar-fixed-top">
            <div className="container-fluid">
                <div className="navbar-header">
                    <span className="navbar-brand">Floss Color Tool</span>
                </div>
                <ul className="nav navbar-nav">
                    {brands.map(brandName => (
                        <li key={brandName} className={brandName === brand ? "active" : ""}>
                            <a href="#" onClick={() => setBrand(brandName)}>{brandName}</a>
                        </li>
                    ))}
                </ul>
            </div>
        </nav>
        <div className="container app-body">
            <div className="row">
                <div className="col-xs-12 col-sm-10 col-sm-offset-1 col-lg-8 col-lg-offset-2">
                    <ColorTool brand={brand} colors={colors} />
                </div>
            </div>
        </div>
    </>)
}

export default App;
