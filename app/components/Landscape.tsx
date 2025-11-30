'use client';

import React, { useState } from 'react';
import styles from './Landscape.module.css';

export default function Landscape() {
  const [key, setKey] = useState(0);

  const handleClick = () => {
    setKey(prev => prev + 1);
  };

  return (
    <div key={key} className={styles.landscape} onClick={handleClick}>
      <div className={styles['connect-card']}>
        <h2 className={styles['connect-title']}>Let's Connect</h2>
        <div className={styles['connect-card-content']}>
          <div className={styles['connect-links']}>
            <a href="mailto:contact@serdarsalim.com" className={styles['connect-link']}>
              <svg className={styles['connect-icon']} viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l8.21 5.14a2 2 0 002.16 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              <span>contact@serdarsalim.com</span>
            </a>
            <a
              href="https://linkedin.com/in/domurcuk"
              target="_blank"
              rel="noopener noreferrer"
              className={styles['connect-link']}
            >
              <svg className={styles['connect-icon']} viewBox="0 0 24 24" fill="currentColor">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452z" />
              </svg>
              <span>LinkedIn</span>
            </a>
            <a
              href="https://tiktok.com/@salimspoke"
              target="_blank"
              rel="noopener noreferrer"
              className={styles['connect-link']}
            >
              <svg className={styles['connect-icon']} viewBox="0 0 24 24" fill="currentColor">
                <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-5.2 1.74 2.89 2.89 0 012.31-4.64 2.93 2.93 0 01.88.13V9.4a6.84 6.84 0 00-1-.05A6.33 6.33 0 005 20.1a6.34 6.34 0 0010.86-4.43v-7a8.16 8.16 0 004.77 1.52v-3.4a4.85 4.85 0 01-1-.1z" />
              </svg>
              <span>TikTok</span>
            </a>
          </div>
        </div>
      </div>
      <div className={styles.mountain}></div>
      <div className={`${styles.mountain} ${styles['mountain-2']}`}></div>
      <div className={`${styles.mountain} ${styles['mountain-3']}`}></div>
      <div className={`${styles['sun-container']} ${styles['sun-container-1']}`}></div>
      <div className={styles['sun-container']}>
        <div className={styles.sun}></div>
      </div>
      <div className={styles.cloud}></div>
      <div className={`${styles.cloud} ${styles['cloud-1']}`}></div>
      <div className={styles.light}></div>
      <div className={`${styles.light} ${styles['light-1']}`}></div>
      <div className={`${styles.light} ${styles['light-2']}`}></div>
      <div className={`${styles.light} ${styles['light-3']}`}></div>
      <div className={`${styles.light} ${styles['light-4']}`}></div>
      <div className={`${styles.light} ${styles['light-5']}`}></div>
      <div className={`${styles.light} ${styles['light-6']}`}></div>
      <div className={`${styles.light} ${styles['light-7']}`}></div>
      <div className={styles.water}></div>
      <div className={styles.splash}></div>
      <div className={`${styles.splash} ${styles['delay-1']}`}></div>
      <div className={`${styles.splash} ${styles['delay-2']}`}></div>
      <div className={`${styles.splash} ${styles['splash-4']} ${styles['delay-2']}`}></div>
      <div className={`${styles.splash} ${styles['splash-4']} ${styles['delay-3']}`}></div>
      <div className={`${styles.splash} ${styles['splash-4']} ${styles['delay-4']}`}></div>
      <div className={`${styles.splash} ${styles['splash-stone']} ${styles['delay-3']}`}></div>
      <div className={`${styles.splash} ${styles['splash-stone']} ${styles['splash-4']}`}></div>
      <div className={`${styles.splash} ${styles['splash-stone']} ${styles['splash-5']}`}></div>
      <div className={`${styles.lotus} ${styles['lotus-1']}`}></div>
      <div className={`${styles.lotus} ${styles['lotus-2']}`}></div>
      <div className={`${styles.lotus} ${styles['lotus-3']}`}></div>
      <div className={styles.front}>
        <div className={styles.stone}></div>
        <div className={styles.grass}></div>
        <div className={`${styles.grass} ${styles['grass-1']}`}></div>
        <div className={`${styles.grass} ${styles['grass-2']}`}></div>
        <div className={styles.reed}></div>
        <div className={`${styles.reed} ${styles['reed-1']}`}></div>
      </div>
    </div>
  );
}
