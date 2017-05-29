import * as React from 'react';
import { ColorDistanceMatrix } from '../../Models/color';
import ColorRow from './color-row';
import './color-table.css';

declare var fetch: any;

interface ColorTableProps {
    colors: ColorDistanceMatrix;
}

export default class ColorTable extends React.Component<ColorTableProps, {}> {

    // constructor() {
    //     super();
    //     this.state = {
    //         colors: {}
    //     }
    // }


    // componentWillMount() {
    //     const self = this;
    //     fetch('colorsDistanceMatrix.json').then(function(response: any) {
    //         var contentType = response.headers.get("content-type");
    //         if(contentType && contentType.indexOf("application/json") !== -1) {
    //             return response.json().then(function(json: ColorDistanceMatrix) {
    //                 self.setState({ colors: json });
    //             });
    //         } else {
    //             console.log("Oops, we haven't got JSON!");
    //         }
    //     });
    // }

    render() {
        return (
            <table className="table table-hover color-table table-borderless">
                <thead>
                    <tr>
                        <th className='text-center'>DMC #</th>
                        <th className='text-center'>Color</th>
                        <th>Name</th>
                        <th className='text-center' colSpan={5}>Closest Colors</th>
                    </tr>
                </thead>
                {/*<tbody>*/}
                    {Object.keys(this.props.colors).map((id: string) => {
                        return <ColorRow color={this.props.colors[id]} colors={this.props.colors} />;  
                    })}
                {/*</tbody>*/}
            </table>
        );
    }
}
