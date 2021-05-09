import * as React from 'react';
import {
    BrowserRouter as Router,
    Route,
    Link,
    useParams
} from 'react-router-dom';
import './App.css';
import { ColorTool } from './Components/color-tool';
import { AllColors } from './Models/color';

const allColors: AllColors = require('./Resources/colors.json');

const brands = Object.keys(allColors);

const App = () => {
    // TODO: Add routing
    // * [X]add react router using browser router
    // * [X] Attach DMC and Anchor routes to point to appropriate lists
    // * [X] Make sure linking still works
    // * [X] Add linking to brand substitutes
    // * [X] Make it work on GitHub
    // TODO: UX Overhaul
    // * What should expanded rows look like?
    // * What should it look like when jumping around via links?
    // * Improve the DOM/Keyboard/Accessibility
    // TODO: Calculate anchor substitutions for colors that don't have one
    // TODO: Fix Favicons

    return (<Router basename='/floss-color-tool' >
        <Route path='/:brand?'>
            <RoutedApp/>
        </Route>
    </Router>)
}

const RoutedApp = () => {
    const { brand: brandParam } = useParams<{brand?: string}>();

    const brand = (brandParam && brands.find(brand => brand.toLowerCase() === brandParam.toLowerCase()))
        ?? brands[0];
    const colors = allColors[brand];

    return (<>
        <nav className="navbar fixed-top navbar-expand navbar-light bg-light">
            <div className="container-fluid">
                <span className="navbar-brand">Floss Color Tool</span>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav me-auto mb-0">
                        {brands.map(brandName => (
                            <li key={brandName} className="nav-item">
                                <Link key={brandName} to={`/${brandName.toLowerCase()}`} className={`nav-link ${brandName === brand ? 'active' : ''}`}>{brandName}</Link>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </nav>
        <div className='container app-body'>
            <div className='row'>
                <div className='col-xs-12 col-sm-10 offset-sm-1 col-lg-8 offset-lg-2'>
                    <ColorTool brand={brand} colors={colors} />
                </div>
            </div>
        </div>
    </>)
}

export default App;
