'use client';

import styles from './SkyMidMorning.module.css';

export default function SkyMidMorning() {
  return (
    <div className={styles.sky}>
      <div className={styles.cloud}></div>
      <div className={`${styles.cloud} ${styles['cloud-1']}`}></div>
      <div className={`${styles.cloud} ${styles['cloud-2']}`}></div>
    </div>
  );
}
