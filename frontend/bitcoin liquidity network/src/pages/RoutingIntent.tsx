import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styles from '../styles/RoutingIntent.module.css';

interface RoutingIntent {
  user: string;
  protocol: string;
  asset: string;
  pool: string;
  intent: string;
  timestamp: string;
}

export default function RoutingIntent() {
  const [intents, setIntents] = useState<RoutingIntent[]>([]);
  const [newIntent, setNewIntent] = useState<RoutingIntent>({ user: '', protocol: '', asset: '', pool: '', intent: '', timestamp: '' });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const effectiveIntents: RoutingIntent[] = (Array.isArray(intents) && intents.length > 0
    ? intents
    : [
        {
          user: 'alice',
          protocol: 'Bitcoin',
          asset: 'BTC',
          pool: 'Main Pool',
          intent: 'Swap BTC for STX',
          timestamp: new Date().toISOString(),
        },
        {
          user: 'bob',
          protocol: 'Ethereum',
          asset: 'ETH',
          pool: 'ETH Pool',
          intent: 'Provide liquidity',
          timestamp: new Date().toISOString(),
        },
      ]);

  const btcToStxIntents = effectiveIntents.filter(
    (i) => i.asset === 'BTC' && i.intent.toLowerCase().includes('stx')
  );
  const totalRoutingIntents = effectiveIntents.length;
  const totalBtcToStxCount = btcToStxIntents.length;
  const estimatedBtcPerIntent = 0.1; // demo assumption
  const totalBtcToStxVolume = totalBtcToStxCount * estimatedBtcPerIntent;

  useEffect(() => {
    axios.get('/api/routing-intents')
      .then(res => {
        setIntents(res.data);
        setLoading(false);
      })
      .catch(() => {
        setError('Failed to load routing intents');
        setLoading(false);
      });
  }, []);

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newIntent.user || !newIntent.protocol || !newIntent.asset || !newIntent.pool || !newIntent.intent) return;
    axios.post('/api/routing-intents', {
      ...newIntent,
      timestamp: new Date().toISOString(),
    })
      .then(res => {
        setIntents([...intents, res.data]);
        setNewIntent({ user: '', protocol: '', asset: '', pool: '', intent: '', timestamp: '' });
      })
      .catch(() => setError('Failed to add routing intent'));
  };

  return (
    <div className={styles.intentPage}>
      <h2 className={styles.title}>Routing Intents</h2>
      <div className={styles.summaryCards}>
        <div className={styles.card}>
          Total routing intents:{' '}
          <span style={{ color: '#222', fontWeight: 'bold', fontSize: '2rem' }}>{totalRoutingIntents}</span>
        </div>
        <div className={styles.card}>
          Users routing BTC → STX:{' '}
          <span style={{ color: '#222', fontWeight: 'bold', fontSize: '2rem' }}>{totalBtcToStxCount}</span>
        </div>
        <div className={styles.card}>
          Est. BTC volume BTC → STX:{' '}
          <span style={{ color: '#222', fontWeight: 'bold', fontSize: '2rem' }}>{totalBtcToStxVolume.toFixed(2)} BTC</span>
        </div>
      </div>
      <form className={styles.addForm} onSubmit={handleAdd}>
        <input
          type="text"
          placeholder="User"
          value={newIntent.user}
          onChange={e => setNewIntent({ ...newIntent, user: e.target.value })}
        />
        <input
          type="text"
          placeholder="Protocol"
          value={newIntent.protocol}
          onChange={e => setNewIntent({ ...newIntent, protocol: e.target.value })}
        />
        <input
          type="text"
          placeholder="Asset"
          value={newIntent.asset}
          onChange={e => setNewIntent({ ...newIntent, asset: e.target.value })}
        />
        <input
          type="text"
          placeholder="Pool"
          value={newIntent.pool}
          onChange={e => setNewIntent({ ...newIntent, pool: e.target.value })}
        />
        <input
          type="text"
          placeholder="Intent"
          value={newIntent.intent}
          onChange={e => setNewIntent({ ...newIntent, intent: e.target.value })}
        />
        <button type="submit">Publish Intent</button>
      </form>
      {loading ? <p>Loading...</p> : null}
      {error ? <p style={{ color: 'red' }}>{error}</p> : null}
      <table className={styles.intentTable}>
        <thead>
          <tr>
            <th>User</th>
            <th>Protocol</th>
            <th>Asset</th>
            <th>Pool</th>
            <th>Intent</th>
            <th>Timestamp</th>
          </tr>
        </thead>
        <tbody>
          {effectiveIntents.map((i, idx) => (
            <tr key={idx}>
              <td>{i.user}</td>
              <td>{i.protocol}</td>
              <td>{i.asset}</td>
              <td>{i.pool}</td>
              <td>{i.intent}</td>
              <td>{new Date(i.timestamp).toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
