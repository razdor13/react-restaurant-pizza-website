import React from 'react';

import styles from './NotFound.module.scss';

 const NotFound= () => {
  return (
    <div className={styles.root}>
      <h1>
        <span>😕</span>
        <br />
        Нічого тут не бачу 
      </h1>
      <p className={styles.description}>
        Ти зайшов не туди 💀
      </p>
    </div>
  );
};

export default NotFound