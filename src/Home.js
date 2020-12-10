// Home Page
import React, {Component} from "react";
import firebase from "./firebase";
import {Link} from "react-router-dom";

class Home extends Component {
    constructor() {
        super();
        this.state = {
            key: '',
            cellOne: '',
            cellTwo: '',
            cellThree: '',
            cellFour: '',
            cellFive: '',
            cellSix: '',
            cellSeven: '',
            cellEight: '',
            cellNine: '',
        };
    }

// handle events
onStart = (event) => {
    event.preventDefault();
    const dbRef = firebase.database().ref();
    const state = this.state;
    const gameObj = {
        cellOne: state.cellOne,
        cellTwo: state.cellTwo,
        cellThree: state.cellThree,
        cellFour: state.cellFour,
        cellFive: state.cellFive,
        cellSix: state.cellSix,
        cellSeven: state.cellSeven,
        cellEight: state.cellEight,
        cellNine: state.cellNine,
    };

    const {key} = dbRef.push(gameObj);

    this.state({
        key
    })
}

    render() {
        const key = this.state.key
        return (
            <main>
                <h1>Tic Tac Toe</h1>
                <p>short description about how the game works</p>
                <Link to={`/${key}gamelobby}`} onClick={this.onStart}>
                    Start Game
                </Link>
            </main>
        )
    }
}

export default Home;