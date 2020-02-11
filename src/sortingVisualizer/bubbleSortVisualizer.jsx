import React from 'react';
import './sortingVisualizer.css'
import SortingVisualizer from "./sortingVisualizer";

export default class BubbleSortVisualizer extends SortingVisualizer {
    sort() {
    }

    render() {
        const {array} = this.state;
        return (
            <div className="SortingVisualizer BubbleSort">
                <h1>Bubble Sort</h1>
                <div>
                    {array.map((value, idx) =>
                        <div className="array-bar" style={{height: `${value}px`}} key={idx}>
                        </div>
                    )}
                </div>
                <label>Size</label>
                <input onChange={this.onSizeChange}/>
                <button onClick={() => this.resetArray()}>Reset</button>
                <button onClick={() => this.sort()}>Sort</button>
            </div>
        )
    }
}
