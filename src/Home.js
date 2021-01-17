// Home Page
import React, {Component} from "react";
import firebase from "./firebase";
import {withRouter, Redirect} from "react-router-dom";
import image from './assets/gameMachineTwo.png';

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
            <main className="mainPageContent wrapper home">
                <div className="homeLayout">
                    <h1>TIC TAC TOE</h1>
                    <p>Play Tic Tac Toe online in 3 simple steps</p>
                    <ul>
                        <li>Start a game</li>
                        <li>Invite friends</li>
                        <li>Play</li>
                    </ul>
                    <form onSubmit={this.onStart}>
                        <button type="submit" className="button">start game</button>
                    </form>
                </div>
                <div className="homeImg img">
                    <img src={image} alt=""/>
                </div>
            </main>
        )
    }
}

export default withRouter(Home);