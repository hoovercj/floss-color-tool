import * as React from 'react';
import { ColorDistanceMatrix } from '../../Models/color';
import ColorItem from './color-item';
import './color-table.css';

declare var fetch: any;

interface ColorListState {
    colors: ColorDistanceMatrix;
}

export default class ColorList extends React.Component<{}, ColorListState> {

    constructor() {
        super();
        this.state = {
            colors: {}
        }
    }


    componentWillMount() {
        const self = this;
        fetch('colorsDistanceMatrix.json').then(function(response: any) {
            var contentType = response.headers.get("content-type");
            if(contentType && contentType.indexOf("application/json") !== -1) {
                return response.json().then(function(json: ColorDistanceMatrix) {
                    self.setState({ colors: json });
                });
            } else {
                console.log("Oops, we haven't got JSON!");
            }
        });
    }

    render() {
        return (
            <div>
            <h1>DMC Color List</h1>
                {/*<tbody>*/}
                    {Object.keys(this.state.colors).map((id: string) => {
                        return <ColorItem key={id} color={this.state.colors[id]} colors={this.state.colors} />;
                    })}
                {/*</tbody>*/}
            </div>
        );
    }
}
