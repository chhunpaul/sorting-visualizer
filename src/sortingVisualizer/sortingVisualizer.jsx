import React from 'react';
import './sortingVisualizer.css'
import {
    getBubbleSortAnimations, getHeapSortAnimations,
    getInsertionSortAnimations,
    getMergeSortAnimations,
    getQuickSortAnimations
} from "../sortingAlgorithms/sortingAlgorithms";

const ANIMATION_SPEED_MS = 5;
const PRIMARY_COLOR = '#DCDADA';
const SORTED_COLOR = '#40e0d0';

class SortingVisualizer extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            arraySize: 0,
            array: [],
            animationTimeouts: [],
            animationSpeedMS: ANIMATION_SPEED_MS,
            primaryColor: PRIMARY_COLOR,
            sortedColor: SORTED_COLOR,
            getAnimations: this.props.getAnimations,
            sorting: false,
        };
        window.addEventListener("resize", () => {
            this.onSizeChange(window.innerWidth / 5);
        });
    }

    componentDidMount() {
        this.resetArray();
        this.updateSize(window.innerWidth / 5)
    }

    componentWillUnmount() {
        this.resetArray()
    }

    sort() {
        this.setState({sorting: true});
        const arrayBars = document.getElementsByClassName("array-bar");
        const copyArray = this.state.array.slice();
        const animations = this.state.getAnimations(copyArray);
        const animationTimeouts = this.state.animationTimeouts;
        let animationTimeout = 0;
        for (let i = 0; i < animations.length; i++) {
            const animation = animations[i];
            switch (animation.cmd) {
                case "highlight":
                case "un-highlight":
                    const color = animation.cmd === "highlight" ? this.state.sortedColor : this.state.primaryColor;
                    animationTimeout = setTimeout(() => {
                        for (let i of animation.indexes) {
                            arrayBars[i].style.backgroundColor = color;
                        }
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

    onSizeChange(size) {
        this.cancel();
        this.updateSize(size);
        this.setState({arraySize: size})
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
        this.setState({sorting: false});
    }

    render() {
        const {array} = this.state;
        return (
            <div className="SortingVisualizer">
                <h1>{this.props.name}</h1>
                <div className="visualizer-container" style={{width: `${array.length * 4}px`}}>
                    <div className="bar-container">
                        {array.map((value, idx) =>
                            <div className="array-bar" style={{height: `${value}px`}} key={idx}>
                            </div>
                        )}
                    </div>
                </div>
                <button onClick={() => this.resetArray()}>Reset</button>
                <button onClick={() => this.sort()} disabled={this.state.sorting}>Sort</button>
            </div>
        )
    }
}

export class MergeSortVisualizer extends SortingVisualizer {
    render() {
        return <SortingVisualizer name="Merge Sort" getAnimations={getMergeSortAnimations} />
    }
}

export class BubbleSortVisualizer extends SortingVisualizer {
    render() {
        return <SortingVisualizer name="Bubble Sort" getAnimations={getBubbleSortAnimations} />
    }
}

export class InsertionSortVisualizer extends SortingVisualizer {
    render() {
        return <SortingVisualizer name="Insertion Sort" getAnimations={getInsertionSortAnimations} />
    }
}

export class QuickSortVisualizer extends SortingVisualizer {
    render() {
        return <SortingVisualizer name="Quick Sort" getAnimations={getQuickSortAnimations} />
    }
}

export class HeapSortVisualizer extends SortingVisualizer {
    render() {
        return <SortingVisualizer name="Heap Sort" getAnimations={getHeapSortAnimations} />
    }
}