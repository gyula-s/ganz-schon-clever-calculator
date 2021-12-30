import React, { useEffect, useState } from "react";
import Player from "../components/Player";
import Layout from "../components/Layout/Layout";

const emptyScore = {
    yellow: 0,
    blue: 0,
    green: 0,
    orange: 0,
    purple: 0,
    fox: 0,
    total: 0,
};

// markup
const IndexPage = () => {
    const [players, setPlayers] = useState({});
    const [name, setName] = useState("");
    //function to get data stored in localstorage
    const getData = () => {
        const localData: string = localStorage.getItem("playerNames");
        //check if there is data in local storage if not return empty object
        return localData ? JSON.parse(localData) : {};
    };

    //updete players state on the first render
    useEffect(() => {
        setPlayers(getData());
    }, []);

    //update the localstorage when the players state change
    useEffect(() => {
        const names: Array<string> = Object.keys(players);
        let playerNames = {};
        names.map((name) => {
            playerNames = { ...playerNames, [name]: { score: emptyScore } };
        });
        localStorage.setItem("playerNames", JSON.stringify(playerNames));
    }, [players]);
    const onChangeHandler = ({
        target,
    }: React.ChangeEvent<HTMLInputElement>) => {
        setName(target.value);
    };

    const generatePlayerName = () =>
        name.length > 0 ? name : `Player ${Object.keys(players).length + 1}`;

    const handleSubmit = (e) => {
        e.preventDefault();
        const playerName = generatePlayerName();

        setPlayers((prevState) => ({
            ...prevState,
            [playerName]: { score: emptyScore },
        }));
        setName("");
    };

    const setPlayerScore = (name: string, score: string) => {
        setPlayers((prevState) => ({
            ...prevState,
            [name]: { score },
        }));
    };

    const resetGame = () => {
        const playerNames = Object.keys(players);
        const newPlayers = playerNames.reduce((acc, cur) => {
            return { ...acc, [cur]: { score: emptyScore } };
        }, {});
        setPlayers(newPlayers);
    };

    let isGameInProgress = false;

    const playersEntries = Object.entries(players);

    const anyPlayerHasAScore = playersEntries.some(
        ([_, val]: any[]) => val.score.total > 0
    );

    if (playersEntries.length > 0 && anyPlayerHasAScore) {
        isGameInProgress = true;
    }

    return (
        <>
            <Layout>
                {players &&
                    Object.keys(players).map((key, index) => {
                        return (
                            <Player
                                name={key}
                                score={players[key].score}
                                setPlayerScore={setPlayerScore}
                                key={`${key}${index}`}
                            />
                        );
                    })}

                <br />
                <form onSubmit={handleSubmit}>
                    <input
                        type="text"
                        placeholder="name"
                        name="playerName"
                        value={name}
                        onChange={onChangeHandler}
                    />
                    <button>Add player</button>
                </form>

                <br />
                <button onClick={() => setPlayers({})}>Remove Players</button>
                {isGameInProgress && (
                    <button onClick={() => resetGame()}>Reset Game</button>
                )}
            </Layout>
        </>
    );
};

export default IndexPage;
