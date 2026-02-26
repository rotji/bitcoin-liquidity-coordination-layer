// TypeScript declaration for Hiro Wallet provider
declare global {
  interface Window {
    stacksProvider?: any;
  }
}


import styles from '../styles/Navbar.module.css';
import { Link } from 'react-router-dom';
import { useState } from 'react';

export default function Navbar() {
  const [address, setAddress] = useState<string | null>(null);

  const connectWallet = async () => {
    if (window.stacksProvider) {
      try {
        const result = await window.stacksProvider.request({
          method: 'stx_getAddresses',
        });
        setAddress(result.addresses[0].address);
      } catch (err) {
        alert('Wallet connection failed');
      }
    } else {
      alert('Hiro Wallet extension not found. Please install it.');
    }
  };
  return (
    <nav className={styles.navbar}>
      <div className={styles.navLinks}>
        <Link to="/">Home</Link>
        <Link to="/about">About</Link>
      </div>
      <div className={styles.navLinks}>
        {address ? (
          <span>Connected: {address}</span>
        ) : (
          <button className={styles.navButton} onClick={connectWallet}>Connect Wallet</button>
        )}
      </div>
    </nav>
  );
}
