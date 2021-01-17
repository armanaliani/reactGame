import React, { Component } from 'react';
import firebase from "./firebase";
import {Link} from 'react-router-dom';
import image from './assets/gameController.png';



class GameLobby extends Component {
    constructor() {
        super();
        this.state = {
            game: {},
            linkCopied: false
        };
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

    copyLink = () => {
        const copyUrl = document.getElementById('gameUrl').textContent
        const clipboard = window.navigator.clipboard;
        clipboard.writeText(copyUrl)
        this.setState({
            linkCopied: true
        })
        setTimeout(this.removeMssg, 1000)
    }

    removeMssg = () => {
        this.setState({
            linkCopied: false
        })
    }


    render() {
        const key = this.props.match.params.gameKey
        return (
            <div className="mainPageContent wrapper">
                <p>heres your unique game link, send it to your opponent</p>
                <div className="gameLinkDiv">
                    <p id='gameUrl'>{`https://armanaliani.github.io/reactGame/gameboard/${key}`}</p>
                    <button onClick={this.copyLink}>copy url</button>
                </div>
                <p className={this.state.linkCopied === true ? "show copiedLink" : "copiedLink"}>Copied to Clipboard</p>
                <Link to={`/gameboard/${key}`} className="button">Join Game</Link>
                <div className="lobbyImg img">
                    <img src={image} alt=""/>
                </div>
            </div>
        )
    }
}

export default GameLobby;