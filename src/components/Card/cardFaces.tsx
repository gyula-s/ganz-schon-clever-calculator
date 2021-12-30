import React from "react";
import cx from "classnames";
import * as styles from "./card.module.scss";
import Card from "./Card";
type Ability = "fence" | "agent" | "park" | "pool" | "construction" | "bis";
export interface ACard {
    number: number;
    ability: Ability;
}

export interface CityCard {
    first: number;
    second: number;
    goal: (string | number)[];
    achieved?: boolean;
}

const cityPlans: { [key: number]: CityCard[] } = {
    1: [
        { first: 10, second: 6, goal: [6, 6] },
        { first: 8, second: 4, goal: ["6x", 1] },
        { first: 8, second: 4, goal: ["4x", 2] },
        { first: 8, second: 4, goal: [3, 3, 3] },
        { first: 8, second: 4, goal: [5, 5] },
        { first: 6, second: 3, goal: [4, 4] },
        { first: 8, second: 4, goal: ["build all houses in the 3rd row"] },
        { first: 6, second: 3, goal: ["use 7 construction cards"] },
        { first: 6, second: 3, goal: ["build all houses in the 1st row"] },
        // { first: 8, second: 3, goal: ["use 5 'BIS' cards on the same street"] },
        {
            first: 7,
            second: 4,
            goal: ["build the first and last house in each street"],
        },
    ],
    2: [
        { first: 9, second: 5, goal: [4, 1, 1] },
        { first: 12, second: 7, goal: [3, 3, 4] },
        { first: 10, second: 6, goal: [5, 2, 2] },
        { first: 11, second: 6, goal: [1, 1, 1, 6] },
        { first: 9, second: 5, goal: [4, 5] },
        { first: 8, second: 4, goal: [3, 5] },
        {
            first: 7,
            second: 4,
            goal: ["two streets must have all of the pools built"],
        },
        {
            first: 10,
            second: 5,
            goal: [
                "all of the parks AND all of the pools on the 3rd street must be built",
            ],
        },
        {
            first: 8,
            second: 3,
            goal: [
                "all of the parks AND all of the pools on the 2nd street must be built",
            ],
        },
        {
            first: 10,
            second: 5,
            goal: [
                "build all of the parks, all of the pools, and one roundabout in the same street",
            ],
        },
        {
            first: 7,
            second: 4,
            goal: ["two streets must have all of the parks built"],
        },
    ],
    3: [
        { first: 7, second: 3, goal: [3, 4] },
        { first: 7, second: 3, goal: [2, 5] },
        { first: 13, second: 7, goal: [1, 4, 5] },
        { first: 13, second: 7, goal: [2, 3, 5] },
        { first: 12, second: 7, goal: [1, 2, 6] },
        { first: 11, second: 6, goal: [1, 2, 2, 3] },
    ],
};

const getGoalImages = (card: CityCard) => {
    const elements = card.goal.map((g, i) => {
        if (typeof g === "number") {
            const getBlock = (g: number) => {
                const street = [];
                for (let j = 0; j < g; j++) {
                    street.push(
                        <img
                            className={styles.plotImage}
                            src={`/plot.png`}
                            alt={g.toString()}
                            key={`${g}-${i}-${j}`}
                        />
                    );
                }
                return street;
            };
            return (
                <div
                    className={styles.street}
                    style={{
                        height: `${Math.floor(100 / (card.goal.length + 1))}%`,
                    }}
                    key={`${g}-${i}`}
                >
                    {getBlock(g)}
                </div>
            );
        } else {
            return (
                <p className={styles.goalText} key={`string-${i}`}>
                    {g}
                </p>
            );
        }
    });
    return <section className={styles.goalBlock}>{elements}</section>;
};
const getRandomItem = function <T>(arr: T[]): T {
    return arr[Math.floor(Math.random() * arr.length)];
};
export const getCityPlans = () => {
    const one = getRandomItem(cityPlans[1]);
    const two = getRandomItem(cityPlans[2]);
    const three = getRandomItem(cityPlans[3]);
    return { 1: one, 2: two, 3: three };
};
export const getShuffledDeck = (): { [key: number]: ACard[] } => {
    const baseDeck: { [key in Ability]: number[] } = {
        pool: [3, 4, 6, 7, 8, 9, 10, 12, 13],
        construction: [3, 4, 6, 7, 8, 9, 10, 12, 13],
        bis: [3, 4, 6, 7, 8, 9, 10, 12, 13],
        fence: [1, 2, 3, 5, 5, 6, 6, 7, 8, 8, 9, 10, 10, 11, 11, 13, 14, 15],
        park: [1, 2, 4, 5, 5, 6, 7, 7, 8, 8, 9, 9, 10, 11, 11, 12, 14, 15],
        agent: [1, 2, 4, 5, 5, 6, 7, 7, 8, 8, 9, 9, 10, 11, 11, 12, 14, 15],
    };

    const readyDeck = Object.keys(baseDeck).reduce<ACard[]>((acc, key) => {
        const keyCards = baseDeck[key].map((n: number) => ({
            ability: key,
            number: n,
        }));
        return acc.concat(keyCards);
    }, []);

    const shuffled = readyDeck
        .map((value) => ({ value, sort: Math.random() }))
        .sort((a, b) => a.sort - b.sort)
        .map(({ value }) => value);

    //separating the shuffled deck into three
    return {
        1: shuffled.slice(0, 27),
        2: shuffled.slice(27, 27 * 2),
        3: shuffled.slice(27 * 2),
    };
};

const getFrontOfCard = (card: ACard) => {
    return (
        <>
            <div className={cx(styles.number)}>{card.number}</div>
            <figure className={cx(styles.ability)}>
                <img
                    className={cx(styles.imgNextRound)}
                    src={`/${card.ability}.png`}
                    alt={card.ability}
                ></img>
            </figure>
        </>
    );
};

const getBackOfCard = (card: ACard) => {
    return (
        <>
            <div className={cx(styles.backOfCard)}>
                <img
                    className={cx(styles.imgThisRound)}
                    src={`/${card.ability}.png`}
                    alt={card.ability}
                ></img>
            </div>
        </>
    );
};

export const getCityCardPile = (cards: { [key: string]: CityCard }, cb) => {
    const reportCardNumber = (number) => () => cb(number);
    const c = [];
    for (let i = 1; i <= 3; i++) {
        c.push(
            <Card type="cityCard" cb={reportCardNumber(i)} key={i}>
                {getCityCard(cards[i], i)}
            </Card>
        );
    }
    return <>{c}</>;
};
const getCityCard = (card: CityCard, order: number) => {
    const achieved = card.achieved;
    return (
        <>
            <div className={cx(styles.cityOrder)}>{order}</div>

            <div className={cx(styles.cityInfo)}>
                {getGoalImages(card)}
                <section className={cx(styles.cityPoints)}>
                    <span className={cx(styles.firstPoint)}>
                        {achieved ? "✔" : card.first}
                    </span>
                    <span>{card.second}</span>
                </section>
            </div>
        </>
    );
};

export const getPiledCards = (
    pile: { [key: number]: ACard[] },
    type: "front" | "back",
    cb: Function
) => {
    if (!pile[1].length) {
        return null;
    }

    const firstPile = pile[1];
    const secondPile = pile[2];
    const thirdPile = pile[3];

    const getCardFace = {
        front: getFrontOfCard,
        back: getBackOfCard,
    };

    return (
        <>
            <Card type="gameCard" cb={cb}>
                {getCardFace[type](firstPile[firstPile.length - 1])}
            </Card>
            <Card type="gameCard" cb={cb}>
                {getCardFace[type](secondPile[secondPile.length - 1])}
            </Card>
            <Card type="gameCard" cb={cb}>
                {getCardFace[type](thirdPile[thirdPile.length - 1])}
            </Card>
        </>
    );
};

export const blankEffectPile = { 1: [], 2: [], 3: [] };
