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

    private static DEFAULT_EXPANDED_CLASS = '';
    private static ACTIVE_CLASS = 'active';

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
        if (!color) {
            return null;
        }
        const expandedState = this.state.expanded ? ColorRow.ACTIVE_CLASS : ColorRow.DEFAULT_EXPANDED_CLASS;
        return (
            <tbody className={`${expandedState}`}>
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
