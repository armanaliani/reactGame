import React, {Component} from 'react';
import firebase from './firebase';
import {Link} from 'react-router-dom';

class GameBoard extends Component {
    constructor() {
        super();
        this.state = {
            game: {},
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
            circleTurn: false,
            gameOutcome: '',
        }
    }

    componentDidMount() {
        const key = this.props.match.params.gameKey
        firebase
        .database()
        .ref(key)
        .on("value", (snapshot) => {
            this.setState({
                game: snapshot.val()
            })
        })
    }

    handleClick = (e) => {
        const cell = e.target
        console.log(cell)
        const currentClass = this.state.boardClass ? 'x' : 'circle' 
        // // push cell data to firebase ---------------------
        // const key = this.props.match.params.gameKey
        // const dbRef = firebase.database().ref(`${key}`);

        placeMark(cell, currentClass)
        // swapTurns()

        // places X or O in cell spot
        function placeMark(cell, currentClass) {
            cell.classList.add(currentClass)
        }
        // // switches player turn
        // function swapTurns() {
        //     const circleTurn = this.state.circleTurn
        //     this.setState({
        //         circleTurn: !circleTurn
        //     })
        // }
    }


    render() {
        const boardClass = this.state.boardClass;
        const state = this.state;
        return (
            <main>
                <div className={`board ${boardClass}`} id="board">
                    <div className={`cell cellOne ${state.cellOne}`} data-cell onClick={this.handleClick}></div>
                    <div className={`cell cellTwo ${state.cellTwo}`} data-cell onClick={this.handleClick}></div>
                    <div className={`cell cellThree ${state.cellThree}`} data-cell onClick={this.handleClick}></div>
                    <div className={`cell cellFour ${state.cellFour}`} data-cell onClick={this.handleClick}></div>
                    <div className={`cell cellFive ${state.cellFive}`} data-cell onClick={this.handleClick}></div>
                    <div className={`cell cellSix ${state.cellSix}`} data-cell onClick={this.handleClick}></div>
                    <div className={`cell cellSeven ${state.cellSeven}`} data-cell onClick={this.handleClick}></div>
                    <div className={`cell cellEight ${state.cellEight}`} data-cell onClick={this.handleClick}></div>
                    <div className={`cell cellNine ${state.cellNine}`} data-cell onClick={this.handleClick}></div>
                </div>
                <div className="winning-message" id="winningMessage">
                    <div data-winning-message-text></div>
                    <button id="restartButton">Restart</button>
                    <Link to="/"></Link>
                </div>
            </main>
        )
    }
}

export default GameBoard;