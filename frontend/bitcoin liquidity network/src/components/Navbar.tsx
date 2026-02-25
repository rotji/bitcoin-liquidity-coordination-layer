

import styles from '../styles/Navbar.module.css';
import { Link } from 'react-router-dom';
// Wallet integration removed

export default function Navbar() {
  // Wallet integration removed
  return (
    <nav className={styles.navbar}>
      <div className={styles.navLinks}>
        <Link to="/">Home</Link>
        <Link to="/about">About</Link>
      </div>
      {/* Wallet integration UI removed */}
    </nav>
  );
}
