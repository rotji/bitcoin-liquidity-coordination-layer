import React, { useState, useEffect } from 'react';
import { getAssets } from '../../../src/services/AssetRegistryService';
import styles from '../styles/AssetRegistry.module.css';

// Define asset type
interface Asset {
  name: string;
  type: string;
  protocols: string[];
}

export default function AssetRegistry() {
  const [assets, setAssets] = useState<Asset[]>([]);
  const [newAsset, setNewAsset] = useState<{ name: string; type: string; protocols: string }>({ name: '', type: '', protocols: '' });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    getAssets()
      .then((data: any) => {
        setAssets(data);
        setLoading(false);
      })
      .catch(() => {
        setError('Failed to load assets');
        setLoading(false);
      });
  }, []);

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newAsset.name || !newAsset.type) return;
    // Demo mode: simulate upload by updating local state
    setAssets([
      ...assets,
      {
        name: newAsset.name,
        type: newAsset.type,
        protocols: newAsset.protocols.split(',').map(p => p.trim()),
      },
    ]);
    setNewAsset({ name: '', type: '', protocols: '' });
    setError('');
  };

  return (
    <div className={styles.registryPage}>
      <h2 className={styles.title}>Asset Registry</h2>
      <form className={styles.addForm} onSubmit={handleAdd}>
        <input
          type="text"
          placeholder="Asset Name"
          value={newAsset.name}
          onChange={e => setNewAsset({ ...newAsset, name: e.target.value })}
        />
        <input
          type="text"
          placeholder="Type (Native, Token, Wrapped)"
          value={newAsset.type}
          onChange={e => setNewAsset({ ...newAsset, type: e.target.value })}
        />
        <input
          type="text"
          placeholder="Protocols (comma separated)"
          value={newAsset.protocols}
          onChange={e => setNewAsset({ ...newAsset, protocols: e.target.value })}
        />
        <button type="submit">Add Asset</button>
      </form>
      {loading ? <p>Loading...</p> : null}
      {error ? <p style={{ color: 'red' }}>{error}</p> : null}
      <table className={styles.assetTable}>
        <thead>
          <tr>
            <th>Name</th>
            <th>Type</th>
            <th>Protocols</th>
          </tr>
        </thead>
        <tbody>
          {(Array.isArray(assets) && assets.length > 0 ? assets : [
            { name: 'Bitcoin', type: 'Native', protocols: ['Bitcoin', 'Stacks'] },
            { name: 'Ethereum', type: 'Token', protocols: ['Ethereum', 'Stacks'] }
          ]).map((a, idx) => (
            <tr key={idx}>
              <td>{a.name}</td>
              <td>{a.type}</td>
              <td>{Array.isArray(a.protocols) ? a.protocols.join(', ') : a.protocols}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
