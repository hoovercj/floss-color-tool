import React from "react";
import { CustomPicker } from "react-color";

function Picker() {
    return (
        <div
            style={{
                width: 20,
                height: 20,
                transform: "translate(-10px,-10px)",
                borderRadius: 20,
                background: "rgba(255,255,255,0.2)",
                border: "1px solid white",
                boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.25)",
                boxSizing: "border-box"
            }}
        />
    );
}

function HuePicker() {
    return (
        <div
            style={{
                width: 20,
                height: 20,
                transform: "translate(-10px,-2px)",
                borderRadius: 20,
                background: "rgba(255,255,255,0.5)",
                border: "1px solid white",
                boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.25)",
                boxSizing: "border-box"
            }}
        />
    );
}

class CustomColorPicker extends React.Component {
    render() {

        var { Saturation, Hue } = require('react-color/lib/components/common');
        return (
            <div style={{
                position: "relative",
                width: "15rem",
                height: "16.7rem",
                backgroundColor: "#ffffff",
                border: "1px solid #ced4da",
                borderRadius: "2px",
                boxShadow: "0 0 10px #ced4da",
            }}>

                <div style={{
                    position: "relative",
                    width: "14rem",
                    height: "14rem",
                    margin: "auto",
                    marginTop: "0.5rem",
                    border: "1px solid #ced4da",
                    borderRadius: "2px",
                }}>

                    <Saturation
                        {...this.props}
                        pointer={Picker}
                    />
                </div>

                <div style={{
                    position: "relative",
                    width: "14rem",
                    height: "20px",
                    margin: "auto",
                    marginTop: "0.5rem",
                    border: "1px solid #ced4da",
                    borderRadius: "2px",

                }}>

                    <Hue
                        {...this.props}
                        pointer={HuePicker}

                    />
                </div>
            </div>
        )
    }
}


export default CustomPicker(CustomColorPicker);