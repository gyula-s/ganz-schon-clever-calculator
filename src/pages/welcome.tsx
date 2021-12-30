import React, { useCallback, useState } from "react";
import Layout from "../components/Layout";
import {
    ACard,
    blankEffectPile,
    getCityCardPile,
    getCityPlans,
    getPiledCards,
    getShuffledDeck,
} from "../components/Card/cardFaces";
import cx from "classnames";
import * as styles from "./welcome.module.scss";

const Welcome = () => {
    const [numberPile, setNumberPile] = useState(getShuffledDeck());
    const [effectPile, setEffectPile] = useState<{
        [key: number]: ACard[];
    }>(blankEffectPile);
    const [cityCards, setCityCards] = useState(getCityPlans());

    const resetPiles = useCallback(() => {
        setNumberPile(getShuffledDeck());
        setEffectPile(blankEffectPile);
    }, []);

    const resetCityCards = useCallback(() => {
        setCityCards(getCityPlans());
    }, []);

    const undo = useCallback(() => {
        if (effectPile[1].length) {
            const topCard1 = effectPile[1].pop();
            const topCard2 = effectPile[2].pop();
            const topCard3 = effectPile[3].pop();

            setEffectPile({ ...effectPile });
            setNumberPile({
                1: [...numberPile[1], topCard1],
                2: [...numberPile[2], topCard2],
                3: [...numberPile[3], topCard3],
            });
        }
    }, [effectPile, numberPile]);

    const drawNextRound = useCallback(() => {
        if (numberPile[1].length) {
            const topCard1 = numberPile[1].pop();
            const topCard2 = numberPile[2].pop();
            const topCard3 = numberPile[3].pop();

            setNumberPile({ ...numberPile });
            setEffectPile({
                1: [...effectPile[1], topCard1],
                2: [...effectPile[2], topCard2],
                3: [...effectPile[3], topCard3],
            });
        }
    }, [effectPile, numberPile]);

    const setAchieved = useCallback(
        (number: string) => {
            const changed = cityCards[number];
            const changedAchieved = !!cityCards[number].achieved;
            setCityCards({
                ...cityCards,
                [number]: { ...changed, achieved: !changedAchieved },
            });
        },
        [cityCards]
    );

    return (
        <Layout>
            <div className={cx(styles.welcome)}>
                <div className={cx(styles.cityCards)}>
                    {getCityCardPile(cityCards, setAchieved)}
                    <div className={cx(styles.controls)}>
                        <button
                            onClick={() => {
                                resetCityCards();
                            }}
                        >
                            Change city plans
                        </button>
                        <button
                            onClick={() => {
                                resetPiles();
                            }}
                        >
                            Reset cards
                        </button>

                        <button
                            disabled={!effectPile[1].length}
                            onClick={() => {
                                undo();
                            }}
                        >
                            Undo
                        </button>
                        <p>cards left in each stack: {numberPile[1].length}</p>
                    </div>
                </div>
                <div className={styles.piledCards}>
                    <div className={cx(styles.drawPile)}>
                        {getPiledCards(numberPile, "front", drawNextRound)}
                    </div>

                    {/* this is where we have the effects (fence, park, pool, etc.) */}
                    <div className={cx(styles.featurePile)}>
                        {getPiledCards(effectPile, "back", drawNextRound)}
                    </div>
                </div>

                {/* this is where we have the three stacks of cards (the number and the upcoming face)*/}
            </div>
        </Layout>
    );
};

export default Welcome;
