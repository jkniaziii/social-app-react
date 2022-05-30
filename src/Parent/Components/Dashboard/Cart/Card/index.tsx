import React from 'react'
import styles from './style.module.scss'

const Card = (props : any) => {
    return (
         <div className={styles.constainer}>
         <img className={styles.img}  src={props.image} alt='NOT FOUND'/>
         <div>
         <div>{props.title}</div>
         <div>{props.category}</div>
         </div>
         <div>
         <div>Discount</div>
         <div>{props.price}</div>
         </div>
         <div>{props.rating}</div>

         </div>
    )
}


export default Card;
