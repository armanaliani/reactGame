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


    render() {
        const key = this.props.match.params.gameKey
        return (
            <div>
                {/* use links as player X and player O versions? */}
                <p>{`/gameboard/${key}`}</p>
                <Link to={`/gameboard/${key}`}>Play</Link>
            </div>
        )
    }
}

export default GameLobby;