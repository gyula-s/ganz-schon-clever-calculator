import React from "react";
import cx from "classnames";
import * as styles from "./card.module.scss";

export const Card = ({ className, cb, children }) => {
    return (
        <div className={className} onClick={cb}>
            {children}
        </div>
    );
};

export default Card;
