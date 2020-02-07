import React from 'react';
import './sortingVisualizer.css'

// import * as sortingAlgorithms from '../sortingAlgorithms/sortingAlgorithms';
import Algorithms from '../sortingAlgorithms/sortingAlgorithms'

export default class SortingVisualizer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            array: [],
            alg: new Algorithms(),
        }
    }

    componentDidMount() {
        this.resetArray()
    }

    resetArray() {
        const array = [];
        for (let i = 0; i < 200; i++) {
            let min = 5;
            let max = 500;
            let randNum = Math.floor(Math.random() * (max - min + 1) + min);
            array.push(randNum)
        }
        this.setState({array})
    }

    mergeSort() {
        const jsSortedArray = this.state.array.slice().sort((a, b) => a - b);
        Algorithms.mergeSort(this.state.array);
        console.log(arraysAreEqual(jsSortedArray, this.state.array))

        // TODO make some kind of animation for the visualization portion
        const arrayBars = document.getElementsByClassName('array-bar');
        for (let i = 0; i < this.state.array.length; i++) {
            let bar = arrayBars[i];
            bar.style.height = `${this.state.array[i]}px`
        }
    }

    // bubbleSort() {
    // }
    //
    // heapSort() {
    // }
    //
    // quickSort() {
    // }

    render() {
        const {array} = this.state;
        return (
            <>
                <div className="container">
                    {array.map((value, idx) =>
                        <div className="array-bar" style={{height: `${value}px`}} key={idx}>
                        </div>
                    )}
                </div>
                <button onClick={() => this.resetArray()}>Reset</button>
                <button onClick={() => this.mergeSort()}>Merge Sort</button>
                {/*<button onClick={() => this.quickSort()}>Quick Sort</button>*/}
                {/*<button onClick={() => this.bubbleSort()}>Bubble Sort</button>*/}
                {/*<button onClick={() => this.heapSort()}>Heap Sort</button>*/}
            </>
        )
    }
}

// Test for sorting
function arraysAreEqual(arrayOne, arrayTwo) {
    if (arrayOne.length !== arrayTwo.length) return false;
    for (let i = 0; i < arrayOne.length; i++) {
        if (arrayOne[i] !== arrayTwo[i]) return false;
    }
    return true;
}