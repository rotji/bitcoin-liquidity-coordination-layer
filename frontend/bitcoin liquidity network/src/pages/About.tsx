import styles from '../styles/About.module.css';

export default function About() {
  return (
    <section className={styles.aboutSection}>
      <div className={styles.aboutContent}>
        <h2 className={styles.heroTitle}>Bitcoin Liquidity Coordination Layer</h2>
        <div style={{ marginTop: '2.5rem' }}>
          <p className={styles.aboutSubtitle}>
            Our mission is to provide a unified, open-source platform for Bitcoin liquidity data, empowering users and developers with actionable insights and transparent analytics.
          </p>
          <div>
            <h3 className={styles.sectionTitle}>Key Features</h3>
            <ul className={styles.featureList}>
              <li>Unified access to liquidity data across protocols and pools</li>
              <li>Real-time analytics and visualizations for liquidity, slippage, and risk</li>
              <li>Developer-friendly APIs and modular UI components</li>
              <li>Open, transparent, and community-driven infrastructure</li>
              <li>Designed for extensibility and composability</li>
            </ul>
          </div>
          <div className={styles.aboutFooter}>
            <p>
              Join us in building the future of Bitcoin liquidity coordination. Contribute, integrate, or explore our platform to unlock new possibilities for the Bitcoin ecosystem.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
