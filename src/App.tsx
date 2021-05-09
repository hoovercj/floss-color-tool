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
    // TODO: UX Overhaul
    // * [X] Move search into navbar
    // * [X] Add expand/collapse icon
    // * [X] Add a background to the row when it has focus within
    // * [ ] Fixed table header?
    // * Improve the DOM/Keyboard/Accessibility
    //    * [X] Allow expanding/collapsing via keyboard
    //    * [ ] Allow arrow keys to move within the grid? (do I need to use office fabric focus zone component?)
    // TODO: Calculate anchor substitutions for colors that don't have one
    // TODO: Fix Favicons
    // TODO: Add "favorites" section?

    return (<Router basename='/floss-color-tool' >
        <Route path='/:brand?'>
            <RoutedApp/>
        </Route>
    </Router>)
}

const RoutedApp = () => {
    const { brand: brandParam } = useParams<{brand?: string}>();
    const [filterText, setFilterText] = React.useState('');

    const onInputChanged = React.useCallback((event: {target: { value: string}}) => {
        setFilterText(event.target.value);
    }, []);

    const brand = (brandParam && brands.find(brand => brand.toLowerCase() === brandParam.toLowerCase()))
        ?? brands[0];
    const colors = allColors[brand];

    return (<>
        <nav className="navbar fixed-top navbar-expand navbar-light bg-light">
            <div className="container-fluid">
                <span role="heading" aria-level={1} className="navbar-brand">Floss Color Tool</span>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav me-auto mb-0">
                        {brands.map(brandName => (
                            <li key={brandName} className="nav-item">
                                <Link key={brandName} to={`/${brandName.toLowerCase()}`} className={`nav-link ${brandName === brand ? 'active' : ''}`}>{brandName}</Link>
                            </li>
                        ))}
                    </ul>
                </div>
                <form className="d-flex col-md-5">
                    <input
                        className="form-control"
                        type="search"
                        placeholder={"Search"}
                        aria-label={"Search"}
                        value={filterText}
                        onChange={onInputChanged}
                    >
                    </input>
                </form>
            </div>
        </nav>
        <div className='container-fl app-body'>
            <div className='row'>
                <div className='col-sm-10 offset-sm-1 col-xl-8 offset-xl-2'>
                    <ColorTool brand={brand} colors={colors} filterText={filterText}/>
                </div>
            </div>
        </div>
    </>)
}

export default App;
