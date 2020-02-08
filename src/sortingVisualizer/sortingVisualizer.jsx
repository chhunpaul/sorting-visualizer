import React from 'react';
import './sortingVisualizer.css'

import {getMergeSortAnimations} from '../sortingAlgorithms/sortingAlgorithms';

// TODO make these an options on the page
const ANIMATION_SPEED_MS = 5;
const PRIMARY_COLOR = 'turquoise';

export default class SortingVisualizer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            array: [],
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
        const animations = getMergeSortAnimations(this.state.array);
        const arrayBars = document.getElementsByClassName('array-bar');
        for (let i = 0; i < animations.length; i++) {
            const animation = animations[i];
            switch (animation.cmd) {
                case "highlight":
                    const [barOneIdx, barTwoIdx] = animation.indexes;
                    const barOneStyle = arrayBars[barOneIdx].style;
                    const barTwoStyle = arrayBars[barTwoIdx].style;
                    setTimeout(() => {
                        barOneStyle.backgroundColor = PRIMARY_COLOR;
                        barTwoStyle.backgroundColor = PRIMARY_COLOR;
                    }, i * ANIMATION_SPEED_MS);
                    break;
                case "resize":
                    setTimeout(() => {
                        const [barOneIdx, newHeight] = animation.indexes;
                        const barOneStyle = arrayBars[barOneIdx].style;
                        barOneStyle.height = `${newHeight}px`;
                    }, i * ANIMATION_SPEED_MS);
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
