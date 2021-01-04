import React, { Component } from 'react';
import firebase from "./firebase";
import {Link} from 'react-router-dom';


class GameLobby extends Component {
    constructor() {
        super();
        this.state = {
            game: {}
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
    }


    render() {
        const key = this.props.match.params.gameKey
        return (
            <div>
                <p>heres your unique game link, send it to your opponent</p>
                <div className="gameLinkDiv">
                    <p id='gameUrl'>{`https://armanaliani.github.io/reactGame/gameboard/${key}`}</p>
                    <button onClick={this.copyLink}>copy url</button>
                </div>
                <Link to={`/gameboard/${key}`}>Play</Link>
            </div>
        )
    }
}

export default GameLobby;