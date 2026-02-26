import styles from '../styles/Home.module.css';

export default function Home() {
  return (
    <section className={styles.hero}>
      <div className={styles.heroContent}>
        <h1 className={styles.heroTitle}>Bitcoin Liquidity Coordination Layer</h1>
        <div style={{ marginTop: '2.5rem' }}>
          <p className={styles.subtitle}>
            Welcome to the Bitcoin Liquidity Coordination Layer — a next-generation platform designed to unify, analyze, and empower liquidity across the Bitcoin ecosystem.
          </p>
          <div className={styles.heroDetails}>
            <h2 className={styles.sectionTitle}>Our Mission</h2>
            <p className={styles.missionText}>
              Our mission is to provide transparent, actionable, and real-time liquidity intelligence for Bitcoin protocols, pools, and assets. We bridge fragmented liquidity sources, enabling developers, traders, and protocols to make informed decisions and drive innovation.
            </p>
            <h2 className={styles.sectionTitle}>Key Features</h2>
            <ul className={styles.featureList}>
              <li>Aggregate liquidity data from multiple Bitcoin protocols and pools</li>
              <li>Visualize liquidity, slippage, and risk metrics in real time</li>
              <li>Empower developers, traders, and protocols with actionable insights</li>
              <li>Composable, modular UI components for analytics and dashboards</li>
              <li>Promote transparency and open access to liquidity information</li>
              <li>Seamless switching between demo and real data for presentations and development</li>
            </ul>
            <div className={styles.heroVisual}>
              {/* Add a beautiful illustration or logo here if available */}
              <img src="/public/hero-illustration.png" alt="Bitcoin Liquidity Coordination Layer" className={styles.heroImage} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
