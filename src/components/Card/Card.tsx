import React from "react";
import cx from "classnames";
import * as styles from "./card.module.scss";

export const Card = ({ cb, children }) => {
    return (
        <div className={cx(styles.card)} onClick={cb}>
            {children}
        </div>
    );
};

export default Card;
