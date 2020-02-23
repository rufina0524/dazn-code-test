import React from 'react';

import Logo from '../Logo/Logo';

import styles from './header.css';

const Header = () => (
    <header className={styles.header}>
        <Logo className={styles.headerLogo} />
    </header>
);

export default Header;
