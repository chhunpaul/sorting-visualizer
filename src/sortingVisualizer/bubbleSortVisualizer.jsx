import React from 'react';
import './sortingVisualizer.css'
import SortingVisualizer from "./sortingVisualizer";
import {getBubbleSortAnimations} from "../sortingAlgorithms/sortingAlgorithms";

export default class BubbleSortVisualizer extends SortingVisualizer {
    sort() {
        const arrayBars = document.getElementsByClassName("array-bar");
        const copyArray = this.state.array.slice();
        const animations = getBubbleSortAnimations(copyArray);
        const animationTimeouts = this.state.animationTimeouts;
        let animationTimeout = 0;
        for (let i = 0; i < animations.length; i++) {
            const animation = animations[i];
            let barOneIdx = 0;
            let barTwoIdx = 0;
            switch (animation.cmd) {
                case "highlight":
                case "un-highlight":
                    [barOneIdx, barTwoIdx] = animation.indexes;
                    const color = animation.cmd === "highlight" ? this.state.sortedColor : this.state.primaryColor;
                    animationTimeout = setTimeout(() => {
                        arrayBars[barOneIdx].style.backgroundColor = color;
                        arrayBars[barTwoIdx].style.backgroundColor = color;
                    }, i * this.state.animationSpeedMS);
                    animationTimeouts.push(animationTimeout);
                    this.setState({animationTimeouts: animationTimeouts});
                    break;
                case "resize":
                    animationTimeout = setTimeout(() => {
                        const [barOneIdx, newHeight] = animation.indexes;
                        const barOneStyle = arrayBars[barOneIdx].style;
                        barOneStyle.height = `${newHeight}px`;
                    }, i * this.state.animationSpeedMS);
                    animationTimeouts.push(animationTimeout);
                    this.setState({animationTimeouts: animationTimeouts});
                    break;
                default:
                    console.log(`Animation Error: Unknown cmd: ${animation.cmd}`)
            }
        }
    }

    render() {
        const {array} = this.state;
        return (
            <div className="SortingVisualizer BubbleSort">
                <h1>Bubble Sort</h1>
                <div className="visualizer-container" style={{width: `${array.length * 4}px`}}>
                    <div className="bar-container">
                    {array.map((value, idx) =>
                        <div className="array-bar" style={{height: `${value}px`}} key={idx}>
                        </div>
                    )}
                    </div>
                </div>
                <label>Size</label>
                <input onChange={this.onSizeChange}/>
                <button onClick={() => this.resetArray()}>Reset</button>
                <button onClick={() => this.sort()}>Sort</button>
            </div>
        )
    }
}
