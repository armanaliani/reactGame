import React, { Component } from 'react';
import firebase from "./firebase";


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
                <p>{`${key}`}</p>
            </div>
        )
    }
}

export default GameLobby;