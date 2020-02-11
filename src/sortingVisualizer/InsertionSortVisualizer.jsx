import React from 'react';
import './sortingVisualizer.css'
import SortingVisualizer from "./sortingVisualizer";
import {getBubbleSortAnimations, getInsertionSortAnimations} from "../sortingAlgorithms/sortingAlgorithms";

export default class BubbleSortVisualizer extends SortingVisualizer {

    render() {
        const {array} = this.state;
        return (
            <div className="SortingVisualizer">
                <h1>Insertion Sort</h1>
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
                <button onClick={() => this.sort(getInsertionSortAnimations)}>Sort</button>
            </div>
        )
    }
}
