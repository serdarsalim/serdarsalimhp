'use client';

import styles from './SkyDay.module.css';

export default function SkyDay() {
  return (
    <div className={styles.sky}>
      <div className={styles.moon}></div>
      <div className={`${styles.cloud} ${styles['cloud-1']}`}></div>
      <div className={`${styles.cloud} ${styles['cloud-2']}`}></div>
      <div className={`${styles.cloud} ${styles['cloud-3']}`}></div>
      <div className={`${styles.cloud} ${styles['cloud-4']}`}></div>
      <div className={`${styles.cloud} ${styles['cloud-5']}`}></div>
    </div>
  );
}
