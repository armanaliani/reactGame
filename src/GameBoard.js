import React, {Component} from 'react';
import firebase from './firebase';
import {Link} from 'react-router-dom';

// component------------------
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
            gameOutcome: '',
            playerOneJoined:'',
            playerTwoJoined:'',
        }
    }

    // takes game link to retreive matching firebase game data --------------
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
                gameOutcome: snapshot.val().gameOutcome,
                playerOneJoined:snapshot.val().playerOneJoined,
                playerTwoJoined:snapshot.val().playerTwoJoined,
            })
            
            // // check game outcome on load
            if (this.checkWin(this.state.boardClass)) {
                this.endGame(false)
            } else if (this.isDraw()) {
                // calls to a second version of endGame that prevents the gameoutcome db override issue on draw game outcomes
                this.endGamePlayerTwo(true)
                this.setState({
                    gameOutcome: 'draw'
                })
            }
            this.handleRestartMessage()
            // second game instance is somehow mounting and pushing data and overwriting outcomes
        })

    }

    // when cell is clicked, place the appropriate marker based on turn, push new turn to firebase, and change cell state to 'x' or 'circle' -------------------------
    handleClick = (e) => {
        const cell = e.target
        const state = this.state
        const boardClass = state.boardClass

        // isolating the classname with cell'Number'
        const cellClasses = e.target.className
        const cellClassArr = cellClasses.split(' ');
        const cellNumberArr = cellClassArr.slice(1,2)
        const cellStateClass = cellNumberArr.toString();

        // making sure there isnt already a marker in the chosen cell-------
        if ((!cellClassArr.includes('x')) && (!cellClassArr.includes('circle'))) {

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

            this.switchTurns()

            // places X or O in cell spot
            placeMark(cell, boardClass)
            function placeMark(cell, currentClass) {
                cell.classList.add(currentClass)
            }

            if (this.checkWin(boardClass)) {
                this.endGame(false)
                this.setState({
                    gameOutcome: boardClass,
                })
            } else if (this.isDraw()) {
                this.endGame(true)
                this.setState({
                    gameOutcome: 'draw',
                })
            } else {
                this.switchTurns()
            }
        }    
        
        // create and add function that sends a param to local storage to set one player as player x and the other player as player 0
        // local storage logic; 
            // on first turn, adds 'player x' param to local storage
            // checks to see if player x param exists in local storage, if not, gives a player o param to local storage. 
            // update placeMark() function to check to see which player param is in local storage, and only allow the player to place their specific mark
            // before it can assign a player x or player o param to loca storage, it must also check that there is no player 1 or player 2 object already in place in the database, or else the player x and player o local storage params have already been issued on other devices

        // assigning x and o signs to players, and not allowing more than 2 players in a single game
        if ((state.playerOneJoined === '' ) && (state.playerTwoJoined === '')) {
            // if both states are missing;
                // push player x to local storage 
                //  push player One joined to db
                this.updatePlayerStatus('playerOneJoined', 'yes')
                //  run placemark for boardclass x if boardclass is also x
                this.setState({
                    playerOneJoined: 'yes'
                })
                console.log('both no')
        } else if ((state.playerOneJoined === 'yes') && (state.playerTwoJoined === '')) {
            // if player one has joined but player 2 has not;
                // push player o to local storage 
                //  push player Two joined to db
                this.updatePlayerStatus('playerTwoJoined', 'yes')
                //  run placemark for boardclass o if boardclass is also circle
                this.setState({
                    playerTwoJoined: 'yes'
                })
                console.log('player one yes, player two no')
        } else if (state.playerOneJoined && state.playerTwoJoined === 'yes') {
            // if both players have joined on db, check for local storage to verify which player the user currently is one of the original two players
            // if local storage has either player x or player o param;
                // run placemark for that params boardclass
            // ----------
            // if local storage has neither player x or player o params;
                // dont run anything (should there be an error handling message for the user?)
                console.log('both players yes')
        }

        const key = this.props.match.params.gameKey
        const gameObj = [
            state.cellOne,
            state.cellTwo,
            state.cellThree,
            state.cellFour,
            state.cellFive,
            state.cellSix,
            state.cellSeven,
            state.cellEight,
            state.cellNine,
        ];
        // console.log(gameObj)
        // makes sure board is clear before pushing gameobject to local storage, ensures its only pushed once per game
        if ((!gameObj.includes('x')) && (!gameObj.includes('circle'))) {
            this.updateStorage(key);
            console.log('u good')
        }
        // ----------------
        // on endgame; clear local storages
    }

    // adds game to local storage
    updateStorage(key) {
        // figure out a way to send the local storage param just one time per game, need to be able to access by key
        const localStorageItem = key
        const ticTacToeStorage = window.localStorage.getItem(localStorageItem);
        const ticTacToeGamesArray = [];
        if (ticTacToeStorage) {
            ticTacToeGamesArray.push(...ticTacToeStorage.split(","));
        }
        const localGameObject = {
                'playerOne': 'no', 
                'playerTwo': 'no'
        }
        ticTacToeGamesArray.push(localGameObject,JSON.stringify(localGameObject));
        window.localStorage.setItem(localStorageItem, ticTacToeGamesArray.join(","));
        
    // console.log(window.localStorage)
    }

    // switches 'x'/'circle' turn -------------
    switchTurns = () => {
        const boardClass = this.state.boardClass
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
    }

    // check to see if theres a winning combination------------
    checkWin = (currentClass) => {
        const cellElements = document.querySelectorAll('[data-cell]')
        const winningCombinations = [
            // horizontals
            [0,1,2],
            [3,4,5],
            [6,7,8],
            // verticals
            [0,3,6],
            [1,4,7],
            [2,5,8],
            // diagonals
            [0,4,8],
            [2,4,6],
        ]
        // .some will return true if any values within the array are true
        return winningCombinations.some(combination => {
            return combination.every(index => {
                return cellElements[index].classList.contains(currentClass)
            })
        })
    }

    // check to see if all cells have a className of 'x' or 'circle'
    isDraw = () => {
        // extra layer of error handling security for when last cell is also the game winning cell
        // if (!this.checkWin()) {
            const cellElements = document.querySelectorAll('[data-cell]')
            return [...cellElements].every(cell => {
                return cell.classList.contains('x') || cell.classList.contains('circle')
            })
        // }
    }

    // display game outcome
    endGame = (draw) => {
        const boardClass = this.state.boardClass
        const winningMessageElement = document.getElementById('winningMessage')
        const winningMessageTextElement = document.querySelector('[data-winning-message-text]')
        if (this.state.gameOutcome === 'x') {
            winningMessageTextElement.innerText = `X's Win!`
        } else if (this.state.gameOutcome === 'circle') {
            winningMessageTextElement.innerText = `O's Win!`
        } else {
            if ((draw) || (this.state.gameOutcome === 'draw')) {
                winningMessageTextElement.innerText = "Draw!"
                if (this.state.gameOutcome === '') {
                    this.setState({
                        gameOutcome: 'draw'
                    })
                }
                this.updateGameOutcome('draw')
            } else if (boardClass === 'x') {
                winningMessageTextElement.innerText = `X's Win!`
                if (this.state.gameOutcome === '') {
                    this.setState({
                        gameOutcome: 'x'
                    })
                }
                this.updateGameOutcome('x')
            } else if (boardClass === 'circle') {
                winningMessageTextElement.innerText = `O's Win!`
                if (this.state.gameOutcome === '') {
                    this.setState({
                        gameOutcome: 'circle'
                    })
                }
                this.updateGameOutcome('circle')
            }
        }
        winningMessageElement.classList.add('show')

        // -------------
        // clear local storage
        // -------------
        const key = this.props.match.params.gameKey
        clearStorage(key)
        function clearStorage(key) {
            window.localStorage.removeItem(key)
        }
    }

    // a version of the endgame function specifically to be called by player 2 pulling data from db, to avoid multiple setstates and db updates
    endGamePlayerTwo = (draw) => {
        const boardClass = this.state.boardClass
        const winningMessageElement = document.getElementById('winningMessage')
        const winningMessageTextElement = document.querySelector('[data-winning-message-text]')
        if (this.state.gameOutcome === 'x') {
            winningMessageTextElement.innerText = `X's Win!`
        } else if (this.state.gameOutcome === 'circle') {
            winningMessageTextElement.innerText = `O's Win!`
        } 
        // including x and o win conditions so that a final x or o placement win does not get triggered as a draw
        else if ((draw) || (this.state.gameOutcome === 'draw')) {
                winningMessageTextElement.innerText = "Draw!"
                if (this.state.gameOutcome === '') {
                    this.setState({
                        gameOutcome: 'draw'
                    })
                }
        }
        winningMessageElement.classList.add('show')
    }

    // clears board states and calls for clearing database info ------------
    handleRestart = () => {
        // --------------
        // make sure user who clicks restart is one of the two players that has either player x or player o in local storage
        // --------------

        // remove cell classes
        const cellElements = document.querySelectorAll('[data-cell]')
        cellElements.forEach(cell => {
            cell.classList.remove('x')
            cell.classList.remove('circle')
        })
        // remove game outcome message
        const winningMessageElement = document.getElementById('winningMessage')
        winningMessageElement.classList.remove('show')

        this.setState({
            boardClass: 'x',
            cellOne: '',
            cellTwo: '',
            cellThree: '',
            cellFour: '',
            cellFive: '',
            cellSix: '',
            cellSeven: '',
            cellEight: '',
            cellNine: '',
            gameOutcome: '',
        })
        // clears db
        this.updateNewGame()
    }

    // if gameOutcome has been set to '' from restart, remove the game outcome message (for player 2)
    handleRestartMessage = () => {
        if (this.state.gameOutcome === '') {
            // remove game outcome message
            const winningMessageElement = document.getElementById('winningMessage')
            winningMessageElement.classList.remove('show')
        }
    }

    // clear database game info for new game-------
    updateNewGame = () => {
        const key = this.props.match.params.gameKey
        // set board class back to x
        const dbRefBoard = firebase.database().ref(`${key}/boardClass`);
        dbRefBoard.once('value', (snap) => {
            let value = snap.val();
            value = 'x'
            dbRefBoard.set(value);
        })
        // set cell classes and outcome back to ''
        const dbCellRef = [
            firebase.database().ref(`${key}/cellOne`),
            firebase.database().ref(`${key}/cellTwo`),
            firebase.database().ref(`${key}/cellThree`),
            firebase.database().ref(`${key}/cellFour`),
            firebase.database().ref(`${key}/cellFive`),
            firebase.database().ref(`${key}/cellSix`),
            firebase.database().ref(`${key}/cellSeven`),
            firebase.database().ref(`${key}/cellEight`),
            firebase.database().ref(`${key}/cellNine`),
            firebase.database().ref(`${key}/gameOutcome`),
            firebase.database().ref(`${key}/playerOneJoined`),
            firebase.database().ref(`${key}/playerTwoJoined`),
        ]
        dbCellRef.forEach((ref) => {
            ref.once('value', (snap) => {
                let value = snap.val();
                value = ''
                ref.set(value);
            })
        })
    }

    // send game outcome info to firebase db --------------
    updateGameOutcome = (symbol) => {
        const key = this.props.match.params.gameKey
        const dbRef = firebase.database().ref(`${key}/gameOutcome`);
        // issue with 2 clients, 
        dbRef.once("value", (snap) => {
            let value = snap.val();
            value = symbol
            dbRef.set(value);
        });
    }

    // send cell data to firebase ---------------------
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

    // send player one/two joined game to db ---------------
    updatePlayerStatus = (player, status) => {
        const key = this.props.match.params.gameKey
        const dbRef = firebase.database().ref(`${key}/${player}`);
        dbRef.once("value", (snap) => {
            let value = snap.val();
            value = status
            dbRef.set(value);
        })
    }

    // send board class to firebase ---------------------
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
                    <div className="messageButtons">
                        <button id="restartButton" onClick={this.handleRestart}>Restart</button>
                        <Link to="/" className="newGame" onClick={this.handleRestart}>New Game</Link>
                    </div>
                </div>
            </main>
        )
    }
}

export default GameBoard;