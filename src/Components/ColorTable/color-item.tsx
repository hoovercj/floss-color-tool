import * as React from 'react';
import { Color, ColorDistanceMatrix } from '../../Models/color';
// import CloseColorRow from './close-color-row';

interface ColorItemProps {
    color: Color;
    colors: ColorDistanceMatrix;
}

interface ColorItemState {
    expanded: boolean;
}

export default class ColorItem extends React.Component<ColorItemProps, ColorItemState> {

    constructor() {
        super();
        this.state = {
            expanded: false
        }
    }

    onRowClick = () => {
        this.setState({
            expanded: !this.state.expanded
        })
    }

    render() {
        const color: Color = this.props.color;
        return (
            <div className='row color-row' onClick={this.onRowClick}>
                <div className='col-sm-1 color-swatch' style={{backgroundColor: '#' + color.RGBcode}}></div>
                <div className='col-sm-2 text'>
                    {color.Floss}
                </div>
                <div className='col-sm-4 text'>{color.Description}</div>
                {color.Distances.slice(0, 5).map(closeColor =>
                    <div className='col-sm-1 color-swatch' title={`${closeColor.Floss} - ${this.props.colors[closeColor.Floss].Description}`} style={{backgroundColor: '#' + this.props.colors[closeColor.Floss].RGBcode}} ></div>
                )}
                {/*<div className={`bottom ${this.state.expanded ? '' : 'hidden'}`} >
                    {color.Distances.slice(0, 5).map(closeColor =>
                        <CloseColorRow visible={this.state.expanded} color={color} closeColor={this.props.colors[closeColor.Floss]} />
                    )}
                </div>*/}
            </div>
        );
    }
}
