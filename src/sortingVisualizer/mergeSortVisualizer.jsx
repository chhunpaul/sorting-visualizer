import React from 'react';
import './sortingVisualizer.css'

import {getMergeSortAnimations} from '../sortingAlgorithms/sortingAlgorithms';
import SortingVisualizer from "./sortingVisualizer";

export default class MergeSortVisualizer extends SortingVisualizer {

    mergeSort() {
        const arrayBars = document.getElementsByClassName("array-bar");
        const copyArray = this.state.array.slice();
        const animations = getMergeSortAnimations(copyArray);
        const animationTimeouts = this.state.animationTimeouts;
        let animationTimeout = 0;
        for (let i = 0; i < animations.length; i++) {
            const animation = animations[i];
            switch (animation.cmd) {
                case "highlight":
                    const [barOneIdx, barTwoIdx] = animation.indexes;
                    const barOneStyle = arrayBars[barOneIdx].style;
                    const barTwoStyle = arrayBars[barTwoIdx].style;
                    animationTimeout = setTimeout(() => {
                        barOneStyle.backgroundColor = this.state.sortedColor;
                        barTwoStyle.backgroundColor = this.state.sortedColor;
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
            <div className="SortingVisualizer MergeSort">
                <h1>Merge Sort</h1>
                <div className="visualizer-container" style={{width: `${array.length * 4}px`}}>
                    <div className="bar-container">
                        {array.map((value, idx) =>
                            <div className="array-bar" style={{height: `${value}px`}} key={idx}>
                            </div>
                        )}
                    </div>
                </div>
                <label>Size</label>
                <input type="number" onChange={this.onSizeChange}/>
                <button onClick={() => this.resetArray()}>Reset</button>
                <button onClick={() => this.mergeSort()}>Merge Sort</button>
            </div>
        )
    }
}
