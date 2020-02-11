import React from 'react';
import './sortingVisualizer.css'

import {getMergeSortAnimations} from '../sortingAlgorithms/sortingAlgorithms';
import SortingVisualizer from "./sortingVisualizer";

export default class MergeSortVisualizer extends SortingVisualizer {

    render() {
        const {array} = this.state;
        return (
            <div className="SortingVisualizer">
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
                <button onClick={() => this.sort(getMergeSortAnimations)}>Sort</button>
            </div>
        )
    }
}
