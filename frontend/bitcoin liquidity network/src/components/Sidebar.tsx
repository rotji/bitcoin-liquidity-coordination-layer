import React from 'react';
import styles from '../styles/Sidebar.module.css';
import { Link } from 'react-router-dom';

export default function Sidebar() {
  return (
    <aside className={styles.sidebar}>
      <div className={styles.logo}>Bitcoin Liquidity Coordination Layer</div>
      <nav className={styles.navLinks}>
        <Link to="/protocol-registry">Protocol Registry</Link>
        <Link to="/asset-registry">Asset Registry</Link>
        <Link to="/liquidity-signal">Liquidity Signal</Link>
        <Link to="/routing-intent">Routing Intent</Link>
        <Link to="/analytics-dashboard">Analytics</Link>
      </nav>
    </aside>
  );
}
