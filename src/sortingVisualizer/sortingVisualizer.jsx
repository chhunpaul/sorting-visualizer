import React from 'react';
import './sortingVisualizer.css'

import {getMergeSortAnimations} from '../sortingAlgorithms/sortingAlgorithms';

// TODO make these an options on the page
const ANIMATION_SPEED_MS = 5;
const PRIMARY_COLOR = '#DCDADA';
const SORTED_COLOR = 'turquoise';

export default class SortingVisualizer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            arraySize: 300,
            array: [],
            animationTimeouts: [],
            animationSpeedMS: ANIMATION_SPEED_MS,
            primaryColor: PRIMARY_COLOR,
            sortedColor: SORTED_COLOR,
        };
        this.onSizeChange = this.onSizeChange.bind(this);
    }

    componentDidMount() {
        this.resetArray()
    }

    componentWillUnmount() {
        this.resetArray()
    }

    cancel() {
        const arrayBars = document.getElementsByClassName('array-bar');
        // Reset the colors in case it was sorted previously.
        for (let i = 0; i < arrayBars.length; i++) {
            arrayBars[i].style.backgroundColor = PRIMARY_COLOR;
        }
        const animationTimeouts = this.state.animationTimeouts;
        for (let i=0; i<animationTimeouts.length; i++) {
            clearTimeout(animationTimeouts[i]);
        }
        this.setState({animationTimeouts: []});
    }

    onSizeChange(e) {
        this.cancel();
        this.updateSize(e.target.value);
        this.setState({arraySize: e.target.value})
    }
    updateSize(arraySize) {
        const array = [];
        for (let i = 0; i < arraySize; i++) {
            let min = 5;
            let max = 500;
            let randNum = Math.floor(Math.random() * (max - min + 1) + min);
            array.push(randNum)
        }
        this.setState({array: array, arraySize: arraySize});
    }

    resetArray() {
        this.cancel();
        this.updateSize(this.state.arraySize);
    }

    // TODO disable the mergesort button once its finished
    mergeSort() {
        const copyArray = this.state.array.slice();
        const animations = getMergeSortAnimations(copyArray);
        const arrayBars = document.getElementsByClassName('array-bar');
        const animationTimeouts = this.state.animationTimeouts;
        let animationTimeout = 0;
        for (let i = 0; i < animations.length; i++) {
            // debugger;
            const animation = animations[i];
            switch (animation.cmd) {
                case "highlight":
                    const [barOneIdx, barTwoIdx] = animation.indexes;
                    const barOneStyle = arrayBars[barOneIdx].style;
                    const barTwoStyle = arrayBars[barTwoIdx].style;

                    animationTimeout = setTimeout(() => {
                        barOneStyle.backgroundColor = SORTED_COLOR;
                        barTwoStyle.backgroundColor = SORTED_COLOR;
                    }, i * ANIMATION_SPEED_MS);
                    animationTimeouts.push(animationTimeout);
                    this.setState({animationTimeouts: animationTimeouts});
                    break;
                case "resize":
                    animationTimeout = setTimeout(() => {
                        const [barOneIdx, newHeight] = animation.indexes;
                        const barOneStyle = arrayBars[barOneIdx].style;
                        barOneStyle.height = `${newHeight}px`;
                    }, i * ANIMATION_SPEED_MS);
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
            <>
                <label>Size</label>
                <input onChange={this.onSizeChange}/>
                <div className="container">
                    {array.map((value, idx) =>
                        <div className="array-bar" style={{height: `${value}px`}} key={idx}>
                        </div>
                    )}
                </div>
                <button onClick={() => this.resetArray()}>Reset</button>
                <button onClick={() => this.mergeSort()}>Merge Sort</button>
            </>
        )
    }
}
