import React from "react";

import classes from "./Footer.module.css";
import footerLogo from "../../assets/logo/logo_transparent.png"
import {NavLink, Link} from 'react-router-dom';

const footer = () => {
    return (
        <footer className={classes.Footer}>
            <div className={classes.MainFooter}>
                <div className={classes.FooterLogoContainer}>
                    <Link to="/">
                        <img src={footerLogo} className={classes.FooterLogo}/>
                    </Link>
                </div>
                <nav className={classes.NavLinks}>
                    <ul>
                        <li>
                            <NavLink className={classes.Link} to="contacts">
                                contact with me
                            </NavLink>
                        </li>
                        <li>
                            <NavLink className={classes.Link} to="behind-scene">
                                Behind the scene!
                            </NavLink>
                        </li>
                    </ul>
                </nav>
            </div>
            <div className={classes.SubFooter}>all rights reserved - 2019 (it's not a joke take it seriously ;)</div>

        </footer>
    )
};

export default footer;