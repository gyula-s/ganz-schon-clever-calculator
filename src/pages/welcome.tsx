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

    const resetPiles = () => {
        setNumberPile(getShuffledDeck());
        setEffectPile(blankEffectPile);
    };

    const drawNextRound = () => {
        if (numberPile[1].length) {
            const topCard1 = numberPile[1].pop();
            const topCard2 = numberPile[2].pop();
            const topCard3 = numberPile[3].pop();

            setNumberPile({ ...numberPile });
            setEffectPile({ 1: [topCard1], 2: [topCard2], 3: [topCard3] });
        }
    };

    const setAchieved = (number: string) => {
        const changed = cityCards[number];
        const changedAchieved = !!cityCards[number].achieved;
        setCityCards({
            ...cityCards,
            [number]: { ...changed, achieved: !changedAchieved },
        });
    };

    return (
        <Layout>
            <div className={cx(styles.welcome)}>
                <div className={styles.piledCards}>
                    <p>cards left in each stack: {numberPile[1].length}</p>
                    <div className={cx(styles.drawPile)}>
                        {getPiledCards(numberPile, "front", drawNextRound)}
                    </div>

                    {/* this is where we have the effects (fence, park, pool, etc.) */}
                    <div className={cx(styles.featurePile)}>
                        {getPiledCards(effectPile, "back", drawNextRound)}
                    </div>
                </div>
                <div className={cx(styles.cityCards)}>
                    {getCityCardPile(cityCards, setAchieved)}
                </div>

                {/* this is where we have the three stacks of cards (the number and the upcoming face)*/}
            </div>
            <button
                onClick={() => {
                    resetPiles();
                }}
            >
                Reset cards
            </button>
        </Layout>
    );
};

export default Welcome;
