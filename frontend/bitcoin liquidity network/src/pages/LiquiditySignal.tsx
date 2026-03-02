  // Demo add handler for signals
  // Uncomment and use if you want to add signals in demo mode
  /*
  const [newSignal, setNewSignal] = useState<{ protocol: string; asset: string; pool: string; liquidity: number; slippage: number; risk: string; timestamp: string }>({ protocol: '', asset: '', pool: '', liquidity: 0, slippage: 0, risk: '', timestamp: '' });
  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newSignal.protocol || !newSignal.asset) return;
    setSignals([
      ...signals,
      {
        ...newSignal,
        timestamp: new Date().toISOString(),
      },
    ]);
    setNewSignal({ protocol: '', asset: '', pool: '', liquidity: 0, slippage: 0, risk: '', timestamp: '' });
    setError('');
  };
  */
import { useState, useEffect } from 'react';
import { getSignals, createLiquiditySignal } from '../../../src/services/LiquiditySignalService';
import { getProtocols } from '../../../src/services/ProtocolRegistryService';
import { getPools } from '../../../src/services/PoolService';
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
  const [protocols, setProtocols] = useState<any[]>([]);
  const [pools, setPools] = useState<any[]>([]);
  const [newSignal, setNewSignal] = useState<{ protocolId: string; poolId: string; asset: string; liquidity: number; slippage: number; risk: string }>({ protocolId: '', poolId: '', asset: '', liquidity: 0, slippage: 0, risk: '' });
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
    getProtocols()
      .then((data: any) => setProtocols(data))
      .catch(() => setProtocols([]));
  }, []);

  useEffect(() => {
    if (newSignal.protocolId) {
      getPools(Number(newSignal.protocolId))
        .then((data: any) => setPools(data))
        .catch(() => setPools([]));
    } else {
      setPools([]);
    }
  }, [newSignal.protocolId]);

  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newSignal.protocolId || !newSignal.poolId || !newSignal.asset) return;
    setError('');
    try {
      // Map protocolId and poolId to names
      const protocolObj = protocols.find((p: any) => String(p.id) === newSignal.protocolId);
      const poolObj = pools.find((p: any) => String(p.id) === newSignal.poolId);
      await createLiquiditySignal({
        protocol: protocolObj ? protocolObj.name : '',
        pool: poolObj ? poolObj.name : '',
        asset: newSignal.asset,
        liquidity: newSignal.liquidity,
        slippage: newSignal.slippage,
        risk: newSignal.risk,
      });
      setNewSignal({ protocolId: '', poolId: '', asset: '', liquidity: 0, slippage: 0, risk: '' });
      const updatedSignals = await getSignals();
      setSignals(updatedSignals);
    } catch (err) {
      setError('Failed to add signal');
    }
  };

  return (
    <div className={styles.signalPage}>
      <h2 className={styles.title}>Liquidity Signals</h2>
      <form className={styles.addForm} onSubmit={handleAdd}>
        <select
          value={newSignal.protocolId}
          onChange={e => setNewSignal({ ...newSignal, protocolId: e.target.value, poolId: '' })}
          required
        >
          <option value="">Select Protocol</option>
          {protocols.map((p: any) => (
            <option key={p.id} value={p.id}>{p.name}</option>
          ))}
        </select>
        <select
          value={newSignal.poolId}
          onChange={e => setNewSignal({ ...newSignal, poolId: e.target.value })}
          required
          disabled={!newSignal.protocolId || pools.length === 0}
        >
          <option value="">Select Pool</option>
          {pools.map((pool: any) => (
            <option key={pool.id} value={pool.id}>{pool.name}</option>
          ))}
        </select>
        <input
          type="text"
          placeholder="Asset"
          value={newSignal.asset}
          onChange={e => setNewSignal({ ...newSignal, asset: e.target.value })}
          required
        />
        <input
          type="number"
          placeholder="Liquidity"
          value={newSignal.liquidity}
          onChange={e => setNewSignal({ ...newSignal, liquidity: Number(e.target.value) })}
        />
        <input
          type="number"
          placeholder="Slippage (%)"
          value={newSignal.slippage}
          onChange={e => setNewSignal({ ...newSignal, slippage: Number(e.target.value) })}
        />
        <input
          type="text"
          placeholder="Risk"
          value={newSignal.risk}
          onChange={e => setNewSignal({ ...newSignal, risk: e.target.value })}
        />
        <button type="submit">Add Signal</button>
      </form>
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
          {(Array.isArray(signals) && signals.length > 0 ? signals : [
            {
              protocol: 'Bitcoin', asset: 'BTC', pool: 'Main Pool', liquidity: 1000000, slippage: 0.15, risk: 'Low', timestamp: new Date().toISOString()
            },
            {
              protocol: 'Ethereum', asset: 'ETH', pool: 'ETH Pool', liquidity: 500000, slippage: 0.22, risk: 'Medium', timestamp: new Date().toISOString()
            }
          ]).map((s, idx) => (
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
