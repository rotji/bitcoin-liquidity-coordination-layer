import { useState, useEffect } from 'react';
import { getSignals } from '../../../src/services/LiquiditySignalService';
import styles from '../styles/LiquiditySignal.module.css';

interface LiquiditySignal {
  protocol: string;
  asset: string;
  pool: string;
  liquidity: number;
  slippage: number;
  risk: string;
  timestamp: string;
}

export default function LiquiditySignal() {
  const [signals, setSignals] = useState<LiquiditySignal[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    getSignals()
      .then((data: any) => {
        setSignals(data);
        setLoading(false);
      })
      .catch(() => {
        setError('Failed to load liquidity signals');
        setLoading(false);
      });
  }, []);

  return (
    <div className={styles.signalPage}>
      <h2 className={styles.title}>Liquidity Signals</h2>
      {loading ? <p>Loading...</p> : null}
      {error ? <p style={{ color: 'red' }}>{error}</p> : null}
      <table className={styles.signalTable}>
        <thead>
          <tr>
            <th>Protocol</th>
            <th>Asset</th>
            <th>Pool</th>
            <th>Liquidity</th>
            <th>Slippage</th>
            <th>Risk</th>
            <th>Timestamp</th>
          </tr>
        </thead>
        <tbody>
          {(Array.isArray(signals) ? signals : []).map((s, idx) => (
            <tr key={idx}>
              <td>{s.protocol}</td>
              <td>{s.asset}</td>
              <td>{s.pool}</td>
              <td>{s.liquidity}</td>
              <td>{s.slippage}%</td>
              <td>{s.risk}</td>
              <td>{new Date(s.timestamp).toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
