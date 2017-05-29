import * as React from 'react';
import { Color, ColorDistanceMatrix } from '../../Models/color';
import CloseColorRow from './close-color-row';

interface ColorRowProps {
    color: Color;
    colors: ColorDistanceMatrix;
}

interface ColorRowState {
    expanded: boolean;
}

export default class ColorRow extends React.Component<ColorRowProps, ColorRowState> {

    constructor() {
        super();
        this.state = {
            expanded: false
        };
    }

    onRowClick = () => {
        this.setState({
            expanded: !this.state.expanded
        });
    }

    render() {
        const color: Color = this.props.color;
        return (
            <tbody className={`${this.state.expanded ? 'active' : ''}`}>
                <tr className="clickable" onClick={this.onRowClick}>
                    <td className="text-center">{color.number}</td>
                    <td style={{backgroundColor: '#' + color.rgbCode}}/>
                    <td>{color.description}</td>
                    {color.distances.slice(0, 5).map(closeColor =>
                        <td
                            key={closeColor.number}
                            title={`${closeColor.number} - ${this.props.colors[closeColor.number].description}`}
                            style={{backgroundColor: '#' + this.props.colors[closeColor.number].rgbCode}}
                        />
                    )}
                </tr>
                <tr className={this.state.expanded ? '' : 'hidden'}>
                    <td colSpan={8}>
                    <div className="row inner bold">
                        <div className="col-xs-2 text-center">DMC #</div>
                        <div className="col-xs-4">Name</div>
                        <div className="col-xs-3 text-center">Alternative</div>
                        <div className="col-xs-3 text-center">Original</div>
                    </div>
                        {color.distances.slice(0, 5).map(closeColor =>
                            <CloseColorRow
                                key={closeColor.number}
                                visible={this.state.expanded}
                                color={color}
                                closeColor={this.props.colors[closeColor.number]}
                            />
                        )}
                    </td>
                </tr>
            {/*<CloseColorTable color={this.props.color} colors={this.props.colors} />*/}
            </tbody>
        );
    }
}
