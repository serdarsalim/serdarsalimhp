'use client';

import styles from './SkyMorning.module.css';

export default function SkyMorning() {
  return (
    <div className={styles.sky}>
      <div className={styles.cloud}></div>
      <div className={`${styles.cloud} ${styles['cloud-1']}`}></div>
      <div className={`${styles.cloud} ${styles['cloud-2']}`}></div>
      <div className={styles['shooting-star']}></div>
      <div className={`${styles['shooting-star']} ${styles['shooting-star-2']}`}></div>
    </div>
  );
}
