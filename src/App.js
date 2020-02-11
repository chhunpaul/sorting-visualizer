import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import './App.css';

import Navigation from './components/Navigation';
import MergeSortVisualizer from "./sortingVisualizer/mergeSortVisualizer";
import BubbleSortVisualizer from "./sortingVisualizer/bubbleSortVisualizer";

class App extends Component {
    render() {
        return (
            <BrowserRouter>
                <div className="App">
                    <Navigation />
                    <Switch>
                        {/* Setting default to merge sort TODO change it to somethign else later*/}
                        <Route exact path="/" component={MergeSortVisualizer}/>
                        <Route exact path="/merge-sort" component={MergeSortVisualizer}/>
                        <Route exact path="/bubble-sort" component={BubbleSortVisualizer}/>
                        <Route component={Error}/>
                    </Switch>
                </div>
            </BrowserRouter>
        );
    }
}

export default App;