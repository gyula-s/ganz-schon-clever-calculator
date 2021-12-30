import React from "react";
import cx from "classnames";
import * as styles from "./card.module.scss";

export const Card = ({ cb, type, children }) => {
    return (
        <div className={cx(styles[type], styles.card)} onClick={cb}>
            {children}
        </div>
    );
};

export default Card;
