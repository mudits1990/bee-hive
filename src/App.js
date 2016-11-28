import React, { Component } from 'react';
import './App.css';
import {generateHex, getCenters} from './generateHex';
import {fabric} from 'fabric'

class App extends Component {
    componentDidMount(){
        const vertices = Array.from(generateHex([5,5], 50, 3));
        let centers = getCenters([5,5], 50, 3);
        centers.push([5,5]);
        let canvas = new fabric.StaticCanvas('hexContainer', {width: 1000, height: 1000});
        let i = 0;
        let temp = [];
        vertices.map((vertice) => {
            i += 1;
            temp.push(vertice);
            if(i%6 === 0){
                let coord_list = [];
                for(let coords of temp){
                    coord_list.push({x:parseInt(coords[0])+500, y:parseInt(coords[1])+500})
                }
                console.log(coord_list);
                const pol = new fabric.Polygon(coord_list, {
                    fill: 'yellow',
                    angle: 0,
                    strokeWidth: 2,
                    strokeLineJoin: 'bevil',
                });
                canvas.add(pol);
                temp = [];
            }
        });
        this.setState({
            canvasSet: true,
            canvas: canvas
        });
    }
    render() {
        let userMessage;
        if(this.state && this.state.canvasSet){
            userMessage = 'Loaded!';
            console.log(this.state.canvas);
        }
        else{
            userMessage = 'Loading..';
            console.log(this.state);
        }
        console.log("first", userMessage);
        return (
            <div className="App">
                <div className="container">
                    <canvas id="hexContainer"/>
                    {
                        userMessage
                    }
                </div>
            </div>
        );
    }
}

export default App;
