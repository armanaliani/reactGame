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
                game: snapshot.val(),
                cellOne: snapshot.val().cellOne,
                cellTwo: snapshot.val().cellTwo,
                cellThree: snapshot.val().cellThree,
                cellFour: snapshot.val().cellFour,
                cellFive: snapshot.val().cellFive,
                cellSix: snapshot.val().cellSix,
                cellSeven: snapshot.val().cellSeven,
                cellEight: snapshot.val().cellEight,
                cellNine: snapshot.val().cellNine,
                boardClass: snapshot.val().boardClass,
                circleTurn: snapshot.val().circleTurn,
                gameOutcome: snapshot.val().gameOutcome,
            })
        })
    }

    handleClick = (e) => {
        const cell = e.target
        const state = this.state
        const boardClass = state.boardClass

        // isolating the classname with cell'Number'
        const cellClasses = e.target.className
        const cellClassArr = cellClasses.split(' ');
        const cellNumberArr = cellClassArr.slice(1,2)
        const cellStateClass = cellNumberArr.toString();
        console.log(cellStateClass)

        // setting cell state of matching state class to x or circle
        if(cellStateClass === 'cellOne') {
            this.setState({
                cellOne: boardClass
            })
            this.updateCellData('cellOne')
        } else if (cellStateClass === 'cellTwo') {
            this.setState({
                cellTwo: boardClass
            })
            this.updateCellData('cellTwo')
        } else if (cellStateClass === 'cellThree') {
            this.setState({
                cellThree: boardClass
            })
            this.updateCellData('cellThree')
        } else if (cellStateClass === 'cellFour') {
            this.setState({
                cellFour: boardClass
            })
            this.updateCellData('cellFour')
        } else if (cellStateClass === 'cellFive') {
            this.setState({
                cellFive: boardClass
            })
            this.updateCellData('cellFive')
        } else if (cellStateClass === 'cellSix') {
            this.setState({
                cellSix: boardClass
            })
            this.updateCellData('cellSix')
        } else if (cellStateClass === 'cellSeven') {
            this.setState({
                cellSeven: boardClass
            })
            this.updateCellData('cellSeven')
        } else if (cellStateClass === 'cellEight') {
            this.setState({
                cellEight: boardClass
            })
            this.updateCellData('cellEight')
        } else if (cellStateClass === 'cellNine') {
            this.setState({
                cellNine: boardClass
            })
            this.updateCellData('cellNine')
        }

        // switch board class
        if  (boardClass === 'x') {
            this.setState({
                boardClass: 'circle'
            })
            this.updateBoardClass('boardClass')
        } else if (boardClass === 'circle') {
            this.setState({
                boardClass: 'x'
            })
            this.updateBoardClass('boardClass')
        }
        
        // switches player turn
        // const circleTurn = state.circleTurn
        // this.setState({
        //     circleTurn: !circleTurn
        // })

        // places X or O in cell spot
        placeMark(cell, boardClass)
        function placeMark(cell, currentClass) {
            cell.classList.add(currentClass)
        }
    }

    // push cell data to firebase ---------------------
    updateCellData = (cell) => {
        const key = this.props.match.params.gameKey
        const dbRef = firebase.database().ref(`${key}/${cell}`);
        const boardClass = this.state.boardClass
        dbRef.once("value", (snap) => {
            let value = snap.val();
            if (boardClass === 'x') {
                value = 'x'
                dbRef.set(value);
            } else if (boardClass === 'circle') {
                value = 'circle'
                dbRef.set(value);
            }
        });
    }

    updateBoardClass = (stateName) => {
        const key = this.props.match.params.gameKey
        const dbRef = firebase.database().ref(`${key}/${stateName}`);
        const boardClass = this.state.boardClass
        dbRef.once("value", (snap) => {
            let value = snap.val();
            if (boardClass === 'x') {
                value = 'circle'
                dbRef.set(value);
            } else if (boardClass === 'circle') {
                value = 'x'
                dbRef.set(value);
            }
        });
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