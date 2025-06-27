import React, { useEffect, useRef } from 'react';
import styles from './preloader.module.css';

export const Preloader: React.FC = () => {
  const loaderRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    return () => {
      // Плавное исчезновение перед удалением
      if (loaderRef.current) {
        loaderRef.current.style.opacity = '0';
        loaderRef.current.style.transition = 'opacity 300ms ease-out';
      }
    };
  }, []);

  return (
    <div ref={loaderRef} className={styles.preloader}>
      <div className={styles.spinner}></div>
    </div>
  );
};