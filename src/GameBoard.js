import React, {Component} from 'react';
import firebase from './firebase';
import {Link, Redirect} from 'react-router-dom';

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
            gameOver: false,
            extraPlayer: false,
            turnMssg: 'its anyones move',
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
                playerOneJoined: snapshot.val().playerOneJoined,
                playerTwoJoined: snapshot.val().playerTwoJoined,
            })
            // checks to see if there is an extra player
            this.extraPlayer(key)
            
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
            this.turnIndication()
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
                state.gameOver
            ];
            // makes sure board is clear before pushing gameobject to session storage, ensures its only pushed once per game
            if ((!gameObj.includes('x')) && (!gameObj.includes('circle'))) {
                this.setStorage(key, '');
            }
            const sessionStorageItem = key
            const storageThing = window.sessionStorage.getItem(sessionStorageItem);
            // assigning x and o signs to players, and not allowing more than 2 players in a single game
            if ((state.playerOneJoined === '' ) && (state.playerTwoJoined === '')) {
            // if both states are missing;
            //  run placemark for boardclass x if boardclass is also x
                if (state.boardClass === 'x') {
                        // push 'playerX' to session storage 
                        this.setStorage(key, 'playerX');
                        //  push player One joined to db
                        this.updatePlayerStatus('playerOneJoined', 'yes')
                        // set state player one joined
                        this.setState({
                            playerOneJoined: 'yes'
                        })
                        this.setStateClass(cellStateClass)
                        placeMark(cell, boardClass)
                        // switch player turns
                        this.switchTurns()
                        this.setState({
                            turnMssg: 'waiting for opponent...'
                        })
                    }
            } else if ((state.playerOneJoined === 'yes') && (state.playerTwoJoined === '') && (storageThing === null)) {
            // if player one has joined but player 2 has not;
            //  run placemark for boardclass o if boardclass is also circle
                if (state.boardClass === 'circle') {
                        // push 'playerO' to session storage 
                        this.setStorage(key, 'playerO');
                        //  push player Two joined to db
                        this.updatePlayerStatus('playerTwoJoined', 'yes')
                        // set state player two joined
                        this.setState({
                            playerTwoJoined: 'yes'
                        })
                        this.setStateClass(cellStateClass)
                        placeMark(cell, boardClass)
                        // switch player turns
                        this.switchTurns()
                        this.setState({
                            turnMssg: 'waiting for opponent...'
                        })
                    }
            } else if (state.playerOneJoined && state.playerTwoJoined === 'yes') {
                // if both players have joined on db, check for session storage to verify which player the user currently is one of the original two players
                if (storageThing === 'playerX') {
                // if session storage has either player x;
                    // run placemark for x boardclass
                    if (state.boardClass === 'x') {
                        placeMark(cell, boardClass)
                        this.setStateClass(cellStateClass)
                        // switch player turns
                        this.switchTurns()
                        this.setState({
                            turnMssg: 'waiting for opponent...',
                        })
                    }
                } else if  (storageThing === 'playerO') {
                // if session storage has either player o;
                    // run placemark for o boardclass
                    if (state.boardClass === 'circle') {
                        placeMark(cell, boardClass)
                        this.setStateClass(cellStateClass)
                        // switch player turns
                        this.switchTurns()
                        this.setState({
                            turnMssg: 'waiting for opponent...',
                        })
                    }
                } else if (storageThing === null) {
                // if the player is an extra player do nothing
                    return;
                }
            }
            // ----------------------------------------
            // places X or O in cell spot
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
            } 
        }
    }

    setStateClass(cellStateClass) {
        const boardClass = this.state.boardClass
        const newStateObj = this.state
        if (cellStateClass === newStateObj) {
            this.setState({
                newStateObj: boardClass
            })
        }
        this.updateCellData(cellStateClass)
    }

    // adds game to session storage
    setStorage(key, status) {
        const sessionStorageItem = key
        const sessionGameObject = [
                // will hold either 'playerX' or 'playerO'
                status
        ]
        window.sessionStorage.setItem(sessionStorageItem, sessionGameObject);
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

    // checks to see if there is an extra player
    extraPlayer(key) {
        const state = this.state
        const sessionStorageItem = key
        const boardClass = this.state.boardClass
        const storageThing = window.sessionStorage.getItem(sessionStorageItem);
        const extraMessageElement = document.getElementById('extraMessage')
        if ((state.playerOneJoined === 'yes') && (state.playerTwoJoined === 'yes') && (storageThing === null)) {
            if ((!this.checkWin(boardClass)) && (!this.isDraw()) && (state.gameOver === false)) {
                extraMessageElement.classList.add('show')
                setTimeout(this.extraPlayerRedirect, 3000)
            }
        }
    }

    // sets extra player to state (after delay from extraPlayer function)
    extraPlayerRedirect = () => {
        this.setState({
            extraPlayer: true
        })
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
        const key = this.props.match.params.gameKey
        const boardClass = this.state.boardClass
        const winningMessageElement = document.getElementById('winningMessage')
        const winningMessageTextElement = document.querySelector('[data-winning-message-text]')
        if (this.state.gameOutcome === 'x') {
            winningMessageTextElement.innerText = `X's Win!`
            this.setState({
                gameOver: true
            })
        } else if (this.state.gameOutcome === 'circle') {
            winningMessageTextElement.innerText = `O's Win!`
            this.setState({
                gameOver: true
            })
        } else {
            if ((draw) || (this.state.gameOutcome === 'draw')) {
                winningMessageTextElement.innerText = "Draw!"
                if (this.state.gameOutcome === '') {
                    this.setState({
                        gameOutcome: 'draw',
                        gameOver: true
                    })
                }
                this.updateGameOutcome('draw')
            } else if (boardClass === 'x') {
                winningMessageTextElement.innerText = `X's Win!`
                if (this.state.gameOutcome === '') {
                    this.setState({
                        gameOutcome: 'x',
                        gameOver: true
                    })
                }
                this.updateGameOutcome('x')
            } else if (boardClass === 'circle') {
                winningMessageTextElement.innerText = `O's Win!`
                if (this.state.gameOutcome === '') {
                    this.setState({
                        gameOutcome: 'circle',
                        gameOver: true
                    })
                }
                this.updateGameOutcome('circle')
            }
        }
        winningMessageElement.classList.add('show')
        // // clear session storage
        // // -------------
        clearStorage(key)
        function clearStorage(key) {
            window.sessionStorage.clear(key)
        }
    }

    // a version of the endgame function specifically to be called by player 2 pulling data from db, to avoid multiple setstates and db updates
    endGamePlayerTwo = (draw) => {
        const key = this.props.match.params.gameKey
        const winningMessageElement = document.getElementById('winningMessage')
        const winningMessageTextElement = document.querySelector('[data-winning-message-text]')
        if (this.state.gameOutcome === 'x') {
            winningMessageTextElement.innerText = `X's Win!`
            this.setState({
                gameOver: true
            })
        } else if (this.state.gameOutcome === 'circle') {
            winningMessageTextElement.innerText = `O's Win!`
            this.setState({
                gameOver: true
            })
        } else if ((draw) || (this.state.gameOutcome === 'draw')) {
        // including x and o win conditions so that a final x or o placement win does not get triggered as a draw
                winningMessageTextElement.innerText = "Draw!"
                if (this.state.gameOutcome === '') {
                    this.setState({
                        gameOutcome: 'draw',
                        gameOver: true
                    })
                }
        }
        winningMessageElement.classList.add('show')
        // // clear session storage
        // // -------------
        clearStorage(key)
        function clearStorage(key) {
            window.sessionStorage.clear(key)
        }
    }

    // clears board states and calls for clearing database info ------------
    handleRestart = () => {
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
            gameOver: false,
            turnIndication: 'its anyones move',
            
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
        this.setState({
            turnMssg: 'its anyones move'
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

    turnIndication() {
        const state = this.state
        const key = this.props.match.params.gameKey
        const sessionStorageItem = key
        const boardClass = this.state.boardClass
        const storageThing = window.sessionStorage.getItem(sessionStorageItem);

        if((storageThing === 'playerX') && (boardClass === 'circle')) {
            this.setState({
                turnMssg: `waiting for opponent...`
            })
        } else if ((storageThing === 'playerO') && (boardClass === 'x')) {
            this.setState({
                turnMssg: `waiting for opponent...`
            })
        } else if ((state.playerOneJoined === '') && (state.playerTwoJoined === '')) {
            this.setState({
                turnMssg: `its anyones move`
            })
        } else if  ((state.playerOneJoined === 'yes') && (state.playerTwoJoined === '')) {
            this.setState({
                turnMssg: `its your move player O`
            })
        } else if ((state.playerOneJoined === 'yes') && (state.playerTwoJoined === 'yes') && (storageThing === 'playerX') && (boardClass === 'x')) {
            this.setState({
                turnMssg: 'its your move player X'
            })
        }  else if ((state.playerOneJoined === 'yes') && (state.playerTwoJoined === 'yes') && (storageThing === 'playerO') && (boardClass === 'circle')) {
            this.setState({
                turnMssg: 'its your move player O'
            })
        } else {
            return
        }
    }


    render() {
        const key = this.props.match.params.gameKey
        const boardClass = this.state.boardClass;
        const state = this.state;
        if (state.extraPlayer === true) {
            return  <Redirect  to="/" />
        }
        return (
            <main className="mainPageContent wrapper gameBoard">
                <div className="turnIndicatorMssg" id="turnIndMssg">
                    <p>{state.turnMssg}</p>
                </div>
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
                <div className="winningMessage" id="winningMessage">
                    <div data-winning-message-text></div>
                    <div className="messageButtons">
                        <button id="restartButton button" onClick={this.handleRestart}>Restart</button>
                        <Link to="/" className="newGame button" onClick={this.handleRestart}>Home</Link>
                    </div>
                </div>
                {/*pop up message to show to extra player explaining that redirect was due to game lobby being full*/}
                <div className="extraPlyerMessage" id="extraMessage">
                    <div>
                        <h2>This Games Full!</h2>
                        <p>You'll be redirected in 3 seconds</p>
                    </div>
                </div>
                <Link to={`/lobby/${key}`} className="button">Back to Lobby</Link>
            </main>
        )
    }
}

export default GameBoard;