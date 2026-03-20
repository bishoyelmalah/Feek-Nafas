import styles from './UnderConstructionPage.module.css';

export function UnderConstructionPage() {
  return (
    <main className={styles.page}>
      <span className={styles.badge}>System Notice</span>
      <h1 className={styles.title}>Under Construction</h1>
      <p className={styles.subtitle}>We&apos;re working on the next update.</p>
    </main>
  );
}
