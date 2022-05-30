import React, { useEffect } from 'react'
import { useStore } from '../../../store/rootStore';
import styles from './style.module.scss'
import { toJS } from 'mobx';
import Card from './Card';
import { observer } from 'mobx-react-lite';
import { chunk } from '../../../utils/Functions';

const Cart = observer(() => {
  const { Cart : {fetchData, products} } = useStore("");
 
  // const getData = async()=>{
  //  await fetchData()
  // }
  useEffect(()=>{
    fetchData()
    
  }, [])
 
 
  return (
    <div>
   
    <h1>Cart</h1>
     {products?.map(item=>{

       return <div>
         <Card
         title={item.title}
         category={item.category}
         id={item.id}
         image={item.image}
         price={item.price}
         rating={item.rating?.count}
       /></div>
     })}
    </div>
  )
})

export default Cart;