import React from 'react';
import './sortingVisualizer.css'
import {getBubbleSortAnimations} from "../sortingAlgorithms/sortingAlgorithms";

const ANIMATION_SPEED_MS = 5;
const PRIMARY_COLOR = '#DCDADA';
const SORTED_COLOR = '#40e0d0';

export default class SortingVisualizer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            arraySize: 400,
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

    sort(getAnimations) {
        const arrayBars = document.getElementsByClassName("array-bar");
        const copyArray = this.state.array.slice();
        const animations = getAnimations(copyArray);
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
        // this.updateSize(e.target.value);
        let targetValue = e.target.value;
        // MAX is 500
        if (targetValue > 400){
            targetValue = 400;
        }
        // Min is 1
        if (targetValue < 30) {
            targetValue = 30;
        }
        this.updateSize(targetValue);
        e.target.value = targetValue;
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
