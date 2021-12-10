import * as React from 'react';
import {
    BrowserRouter as Router,
    Route,
    Link,
    useParams,
} from 'react-router-dom';
import './App.css';
import { ColorTool } from './Components/color-tool';
import CustomColorPicker from './Components/customColorPicker';
import { AllColors, } from './Models/color';

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
    // TODO: Clear the filter when the location changes

    return (<Router basename='/floss-color-tool' >
        <Route path='/:brand?'>
            <RoutedApp />
        </Route>
    </Router>)
}

const RoutedApp = () => {
    const { brand: brandParam } = useParams<{ brand?: string }>();

    const [filterText, setFilterText] = React.useState('');

    // HTMLFilterText contains the content of the Text input and is updated on every InputChange
    const [HTMLFilterText, setHTMLFilterText] = React.useState('');
    // ActiveHTMLFilterText is the full hex code that gets used for sorting in the ColorTool. Only used when HTMLFilterText.length is 0 or 7
    const [ActiveHTMLFilterText, setActiveHTMLFilterText] = React.useState('');

    const [displaySketchPicker, setDisplay] = React.useState(false);

    const onInputChanged = React.useCallback((event: { target: { value: string } }) => {
        setFilterText(event.target.value);
    }, []);

    const updateActiveHTMLInput = (text: string) => {
        // Set a timeout to update the Filtertext to allow the Text in the input to update before the site freezes
        setTimeout(
            () => setActiveHTMLFilterText(text), 10
        )
    }

    const onHTMLInputChanged = (event: { target: { value: string } }) => {
        // Lots of String filtering to get a clean Hex Code

        let new_text = event.target.value.toLowerCase().split('').filter(char => /[0-9a-f]/.test(char)).join("");

        if (new_text.length === 0) {
            setHTMLFilterText(new_text);
            updateActiveHTMLInput(new_text);
            return;
        }

        if (!new_text[0].startsWith("#")) {
            new_text = "#" + new_text;
        }

        if (new_text.length > 7) {
            new_text = new_text.substring(0, 7);
        }

        setHTMLFilterText(new_text);

        if (new_text.length === 7) {
            updateActiveHTMLInput(new_text);
        }
    };

    const displayColorPicker = () => {

        const colorPicker = () => {

            if (displaySketchPicker) {

                return (
                    <div
                        style={{ position: "absolute", marginTop: "2rem", marginLeft: "-13rem" }}
                        onMouseLeave={() => setDisplay(false)}
                    >
                        <CustomColorPicker
                            color={HTMLFilterText}
                            onChange={(color: any) => onHTMLInputChanged({ target: { value: color.hex } })}
                        />
                    </div>
                );
            } else {
                return null;
            }
        }

        return (
            <React.Fragment>

                {/* Input for HexCodes */}
                <input
                    className="form-control"
                    type="search"
                    placeholder={"Search by HEX code"}
                    aria-label={"Search by HEX code"}
                    value={HTMLFilterText}
                    onChange={onHTMLInputChanged}
                >
                </input>

                {/* Color Preview Block */}
                <div
                    style={{
                        display: "absolute",
                        backgroundColor: HTMLFilterText,
                        border: "1px solid #ced4da",
                        borderRadius: "2px",
                        width: "2rem",
                        height: "2rem",
                        marginLeft: "-2.2rem",
                        marginTop: "auto",
                        marginBottom: "auto",
                        cursor: "pointer",
                    }}
                    onClick={() => setDisplay(true)}
                >
                    {/* Includes the Color Clicker which is displayed when clicked on */}
                    {colorPicker()}
                </div>


            </React.Fragment>
        )
    }


    const brand = (brandParam && brands.find(brand => brand.toLowerCase() === brandParam.toLowerCase()))
        ?? brands[0];
    const colors = allColors[brand];

    return (<div>
        <nav className="navbar fixed-top navbar-expand navbar-light bg-light">
            <div className="container-fluid">
                <div className="row w-100">

                    <div className="d-flex col-6 col-lg-4">
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
                    </div>

                    <form className="d-flex col-12 col-md-6 col-lg-3" style={{ marginTop: "3px", marginBottom: "3px" }}>
                        {displayColorPicker()}
                    </form>

                    <form className="d-flex col-md-12 col-lg-5" style={{ marginTop: "3px", marginBottom: "3px" }}>
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
            </div>
        </nav>
        <div className='container-fluid app-body'> {/* Was container-fl once, typo? */}
            <div className='row'>
                {/* Deactivate the Color Picker if the List is touched on the Phone */}
                <div className='col-sm-10 offset-sm-1 col-xl-8 offset-xl-2' onTouchStart={() => setDisplay(false)}>
                    <ColorTool
                        brand={brand}
                        colors={colors}
                        filterText={filterText}
                        filterColor={ActiveHTMLFilterText}
                    />
                </div>
            </div>
        </div>
    </div>
    )
}

export default App;
