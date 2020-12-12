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
        const cellClasses = e.target.className
        // console.log(cellClasses);

        const cellClassArr = cellClasses.split(' ');
        // console.log(cellClassArr)

        const cellNumberArr = cellClassArr.slice(1,2)
        // console.log(cellNumberArr)

        const cellStateClass = cellNumberArr.toString();
        console.log(cellStateClass)


        const stateArray = Object.keys(this.state).map((key) => [String(key), this.state[key]])
        console.log(stateArray)

        const test = stateArray.map(item => {
            if ((item[0] === cellStateClass) && (this.state.circleTurn === false)) {
                item[1] = 'x'
            } else if ((item[0] === cellStateClass) && (this.state.circleTurn === true)) {
                item[1] = 'circle'
            }
            return item
        })
        console.log(test);
        this.setState({
            test
        })
        console.log(this.state)

        // for (const stateItem in this.state) {
        //     if (stateItem === cellStateClass) {
        //         console.log(stateItem.value)
        //     }
        // }

        // this.setState({
            
        // })
        // console.log(this.state)


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