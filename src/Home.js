// Home Page
import React, {Component} from "react";
import firebase from "./firebase";
import {withRouter} from "react-router-dom";

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
            boardClass: 'X',
        };
    }

// handle events
onStart = (e) => {
    e.preventDefault();
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
        boardClass: state.boardClass,
    };

    const {key} = dbRef.push(gameObj);

    this.setState({
        key
    })
    this.props.history.push(`/lobby/${key}`)
}

    render() {
        return (
            <main>
                <h1>Tic Tac Toe</h1>
                <p>short description about how the game works</p>
                <form onSubmit={this.onStart}>
                    <button type="submit">submit</button>
                </form>
            </main>
        )
    }
}

export default withRouter(Home);