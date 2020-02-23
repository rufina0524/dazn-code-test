import React from 'react';

import styles from './footer.css';

const YEAR = new Date().getFullYear();

const Footer = () => (
    <footer className={styles.footer}>
        <p className={styles.footerCopyrightNotice}>&copy; {YEAR} DAZN</p>
    </footer>
);

export default Footer;
