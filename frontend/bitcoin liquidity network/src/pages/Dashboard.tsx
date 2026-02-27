import styles from '../styles/Dashboard.module.css';

export default function Dashboard() {
  return (
    <div className={styles.dashboard}>
      <div style={{ marginTop: '2.5rem' }}>
        <div className={styles.summaryCards}>
          <div className={styles.card}>Total protocols indexed: <span style={{color:'#222',fontWeight:'bold',fontSize:'2rem'}}>5</span></div>
          <div className={styles.card}>Total liquidity observed: <span style={{color:'#222',fontWeight:'bold',fontSize:'2rem'}}>$2,150,000</span></div>
          <div className={styles.card}>Avg pool score: <span style={{color:'#222',fontWeight:'bold',fontSize:'2rem'}}>0.81</span></div>
          <div className={styles.card}>Number of active pools: <span style={{color:'#222',fontWeight:'bold',fontSize:'2rem'}}>31</span></div>
        </div>
        <div className={styles.poolTable}>
          <h2>Liquidity Pool Table</h2>
          <table>
            <thead>
              <tr>
                <th>Pool ID / Protocol</th>
                <th>Assets</th>
                <th>Latest reserves</th>
                <th>Price</th>
                <th>Liquidity Score</th>
                <th>Depth metrics</th>
                <th>Risk Flags</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>pool1 / Bitcoin</td>
                <td>BTC</td>
                <td>1,000,000</td>
                <td>$43,000</td>
                <td>0.92</td>
                <td>High</td>
                <td>Low</td>
              </tr>
              <tr>
                <td>pool2 / Ethereum</td>
                <td>ETH</td>
                <td>500,000</td>
                <td>$3,200</td>
                <td>0.67</td>
                <td>Medium</td>
                <td>Medium</td>
              </tr>
              <tr>
                <td>pool3 / Stacks</td>
                <td>STX</td>
                <td>250,000</td>
                <td>$2.5</td>
                <td>0.51</td>
                <td>Low</td>
                <td>Low</td>
              </tr>
              <tr>
                <td>pool4 / RSK</td>
                <td>RBTC</td>
                <td>120,000</td>
                <td>$43,050</td>
                <td>0.33</td>
                <td>Low</td>
                <td>High</td>
              </tr>
              <tr>
                <td>pool5 / Liquid</td>
                <td>L-BTC</td>
                <td>300,000</td>
                <td>$43,000</td>
                <td>0.78</td>
                <td>Medium</td>
                <td>Medium</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className={styles.visualizations}>
          <h2>Visualizations</h2>
          <div>Bar chart placeholder</div>
          <div>Line chart placeholder</div>
          <div>Heatmap placeholder</div>
        </div>
        <div className={styles.quickActions}>
          <h2>Quick Actions</h2>
          <input type="text" placeholder="Search pool by assets or protocol" />
          <button>Toggle View</button>
          <div style={{marginTop:'1rem',fontWeight:'bold',fontSize:'1.2rem'}}>Get Started</div>
        </div>
      </div>
    </div>
  );
}
