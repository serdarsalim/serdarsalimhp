'use client';

import styles from './Sky.module.css';

export default function SkyNoStars() {
  return (
    <div className={styles.sky}>
      <div className={styles.cloud}></div>
      <div className={`${styles.cloud} ${styles['cloud-1']}`}></div>
      <div className={`${styles.cloud} ${styles['cloud-2']}`}></div>
    </div>
  );
}
