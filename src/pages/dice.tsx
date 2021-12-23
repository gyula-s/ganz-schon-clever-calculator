import React, { useCallback, useEffect, useState } from "react";
import cx from "classnames";
import { ADie, Die } from "../components/Die/Die";
import Layout from "../components/Layout";
import * as styles from "./dice.module.scss";

const getRandomNumbers = (colours: string[]): ADie[] =>
    colours.map((colour) => ({
        colour,
        number: Math.floor(Math.random() * 6) + 1,
    }));
// markup
const DicePage = () => {
    const diceColours = [
        "orange",
        "white",
        "RoyalBlue",
        "green",
        "yellow",
        "purple",
    ];

    /*
    set each dice here
    with a map display each of them
    when selected stop the number generation and put them in a separate array
    */
    const [availableColours, setAvailableColours] =
        useState<string[]>(diceColours);
    const [dicePool, setDicePool] = useState<ADie[]>([]);
    const [onPaper, setOnPaper] = useState<ADie[]>([]);
    const [currentDice, setCurrentDice] = useState<ADie>();
    const [silverPlate, setSilverPlate] = useState<ADie[]>([]);

    const toggleSelection = useCallback(
        (dice) => {
            if (JSON.stringify(currentDice) === JSON.stringify(dice)) {
                setCurrentDice(undefined);
            } else {
                setCurrentDice(dice);
            }
        },

        [currentDice, setCurrentDice]
    );

    const handleShuffle = useCallback(() => {
        if (currentDice) {
            let silverDice = [];
            if ([...onPaper, currentDice].length === 3) {
                silverDice = [...dicePool];
            } else {
                silverDice = dicePool.filter(
                    (die) => die.number < currentDice.number
                );
            }
            const silverColours = silverDice.map((d) => d.colour);
            const remainingSetOfColours = availableColours
                .filter((ac) => ac !== currentDice.colour)
                .filter((ac) => !silverColours.includes(ac));

            setOnPaper([...onPaper, currentDice]);
            setAvailableColours(remainingSetOfColours);
            setDicePool(getRandomNumbers(remainingSetOfColours));
            setCurrentDice(undefined);
            setSilverPlate([...silverPlate, ...silverDice]);
        }
        setDicePool(getRandomNumbers(availableColours));
    }, [availableColours, currentDice, onPaper]);

    const handleReset = useCallback(() => {
        setAvailableColours(diceColours);
        setCurrentDice(undefined);
        setSilverPlate([]);
        setOnPaper([]);
    }, []);

    useEffect(() => {
        setDicePool(getRandomNumbers(availableColours));
        setSilverPlate(silverPlate);
    }, [availableColours, silverPlate]);

    return (
        <Layout>
            <div className={cx([styles.dice])}>
                {dicePool.map(({ colour, number }, key) => {
                    return (
                        <Die
                            props={{
                                colour,
                                number,
                                toggle: toggleSelection,
                            }}
                            key={`${key}${colour}`}
                        />
                    );
                })}
            </div>

            <div>
                <div>
                    <label>
                        {currentDice?.colour &&
                            `Chosen die - when you've filled your sheet, press "save
                        and shuffle"`}
                        {dicePool.length ? "Select a die from above" : ""}
                    </label>
                </div>

                <div className={cx([styles.dice])}>
                    {currentDice && (
                        <Die
                            props={{
                                colour: currentDice.colour,
                                number: currentDice.number,
                                toggle: toggleSelection,
                            }}
                            key={`current-${currentDice.colour}`}
                        />
                    )}
                </div>
            </div>
            <hr />
            <div className={cx(styles.controls)}>
                <button
                    className={cx(styles.button)}
                    disabled={
                        onPaper.length === 3 || availableColours.length === 0
                    }
                    onClick={() => handleShuffle()}
                >
                    {currentDice?.colour ? "save and shuffle" : "re-shuffle"}
                </button>
                <button
                    className={cx(styles.button)}
                    onClick={() => handleReset()}
                >
                    New round
                </button>
            </div>
            <hr />

            <div className={cx([styles.dice, styles.paper])}>
                <p>On your paper:</p>
                <div style={{ display: "flex" }}>
                    {onPaper.map(({ colour, number }, key) => {
                        return (
                            <Die
                                props={{
                                    colour,
                                    number,
                                }}
                                key={`onPaper${key}${colour}`}
                            />
                        );
                    })}
                </div>
            </div>

            <div>
                <legend>Silver Plate</legend>
                <div className={cx([styles.dice, styles.silverPlate])}>
                    {silverPlate.map(({ colour, number }, key) => {
                        return (
                            <Die
                                props={{
                                    colour,
                                    number,
                                }}
                                key={`silver-${key}${colour}`}
                            />
                        );
                    })}
                </div>
            </div>
        </Layout>
    );
};

export default DicePage;
