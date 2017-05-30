import * as React from 'react';
import { Color, ColorDistanceMatrix } from '../Models/color';
import ColorTable from './ColorTable/color-table';
import './color-tool.css'

interface ColorTableProps {
    colors: ColorDistanceMatrix;
}

interface ColorToolState {
    filter?: string;
    filteredColors?: string[];
}

const DEFAULT_ARRAY: string[] = [];
export default class ColorTool extends React.Component<ColorTableProps, ColorToolState> {

    constructor(props: ColorTableProps) {
        super(props);
        this.state = {
            filter: '',
            filteredColors: Object.keys(props.colors)
        };
    }

    onInputChanged = (event: {target: { value: string}}) => {
        this.setState({filter: event.target.value});
        this.debouncedApplyFilter();
    }

    debounce(func: any, wait: number, immediate: boolean = false): () => void {
        var timeout: any;
        return function(this: Function) {
            var context = this, args = arguments;
            var later = function() {
                timeout = null;
                if (!immediate) func.apply(context, args);
            };
            var callNow = immediate && !timeout;
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
            if (callNow) func.apply(context, args);
        };
    };

    applyFilter = () => {
        if (!this.state.filter) {
            this.setState({filteredColors: Object.keys(this.props.colors)});
        }

        const filter = this.state.filter ? this.state.filter.trim().toLowerCase() : '';

        this.setState({filteredColors: Object.keys(this.props.colors).filter(colorId => {
            const color: Color = this.props.colors[colorId];
            return color.description.toLowerCase().includes(filter) ||
                   color.number.includes(filter);
        }) || DEFAULT_ARRAY});
    }
    debouncedApplyFilter: () => void = this.debounce(this.applyFilter, 250);

    render() {
        return (
            <div className="container">
                <div className="row">
                    <div className="col-xs-12 col-sm-10 col-sm-offset-1 col-lg-8 col-lg-offset-2">
                        <h1 className="text-center">DMC Color Substitute Chart</h1>
                        <div className="row">
                            <div className="col-xs-12 col-sm-6">
                                <input className="form-control filter" type="text" onChange={this.onInputChanged} placeholder="Search for DMC # or name" value={this.state.filter} />
                            </div>
                        </div>
                        {/*<ColorTable colors={this.props.colors}/>*/}
                        <ColorTable colors={this.props.colors} filteredColors={this.state.filteredColors || DEFAULT_ARRAY} filter={this.state.filter}/>
                    </div>
                </div>
            </div>
        );
    }
}