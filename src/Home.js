// Home Page
import React, {Component} from "react";
import firebase from "./firebase";
import {withRouter, Redirect} from "react-router-dom";

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
            boardClass: 'x',
            gameOutcome: '',
            playerOneJoined:'',
            playerTwoJoined:'',
            toLobby: false
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
        gameOutcome: state.gameOutcome,
        playerOneJoined: state.playerOneJoined,
        playerTwoJoined: state.playerTwoJoined,
    };

    const {key} = dbRef.push(gameObj);

    this.setState({
        key,
        toLobby: true
    })
    // this.props.history.push(`/lobby/${key}`)
}

    render() {
        const key = this.state.key
        if(this.state.toLobby === true) {
            return  <Redirect  to={`/lobby/${key}`} />
        }
        return (
            <main>
                <h1>Tic Tac Toe</h1>
                <p>play tic tac toe online with friends</p>
                <p>start game to get your game link to send to a friend</p>
                <form onSubmit={this.onStart}>
                    <button type="submit">start game</button>
                </form>
            </main>
        )
    }
}

export default withRouter(Home);