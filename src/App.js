import React, {Component} from 'react';
import {HashRouter, Route, Switch} from 'react-router-dom';
import './App.css';

import Navigation from './components/Navigation';
import {
    MergeSortVisualizer,
    BubbleSortVisualizer,
    InsertionSortVisualizer,
    QuickSortVisualizer
} from "./sortingVisualizer/sortingVisualizer";

class App extends Component {
    render() {
        return (
            <HashRouter basename='/'>
                <div className="App">
                    <Navigation/>
                    <Switch>
                        <Route exact path="/" component={MergeSortVisualizer}/>
                        <Route exact path="/merge-sort" component={MergeSortVisualizer}/>
                        <Route exact path="/bubble-sort" component={BubbleSortVisualizer}/>
                        <Route exact path="/insertion-sort" component={InsertionSortVisualizer}/>
                        <Route exact path="/quick-sort" component={QuickSortVisualizer}/>
                        <Route component={Error}/>
                    </Switch>
                </div>
            </HashRouter>
        );
    }
}

export default App;