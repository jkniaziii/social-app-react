import React from 'react'
import styles from './style.module.scss'

const DetailCard = (props : any) => {
  return (
      <div>
          <div className={styles.container}>
            <div style={{display: 'flex'}}>
                <div  className={styles.circular}><img className={styles.imgContainer} src={props.img} alt='WIKI'/></div>
                <div className={styles.title}>{props.title}</div>
            </div>
            <div>{props.snippet}</div>
          </div>
      </div>
  )
}

export default DetailCard;
