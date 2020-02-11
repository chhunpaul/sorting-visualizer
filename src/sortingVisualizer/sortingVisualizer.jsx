import React from 'react';
import './sortingVisualizer.css'

import {getMergeSortAnimations} from '../sortingAlgorithms/sortingAlgorithms';

// TODO make these an options on the page
const ANIMATION_SPEED_MS = 10;
const PRIMARY_COLOR = '#DCDADA';
const SORTED_COLOR = '#40e0d0';

export default class SortingVisualizer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            arraySize: 100,
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
            let max = 300;
            let randNum = Math.floor(Math.random() * (max - min + 1) + min);
            array.push(randNum)
        }
        this.setState({array: array, arraySize: arraySize});
    }

    resetArray() {
        this.cancel();
        this.updateSize(this.state.arraySize);
    }
}
