import React, {useEffect} from 'react'
import { useParams } from 'react-router-dom';
import { useStore } from '../../../../store/rootStore';
import { toJS } from 'mobx';
import { observer } from 'mobx-react-lite';
import DetailCard from './card';
import styles from './style.module.scss'


const DetailPage = observer(()=> {
  const { Counter: { fetchPost, searchedData, numberOfChildren } } = useStore("");
    let { keyword } = useParams();
    
    useEffect(()=>{
      fetchPost(keyword)
     },[])

     console.log("numberOfChildren CC ___", toJS(searchedData));
     
    return (
      <>   
      {/* <div>DETAILS : {keyword}</div> */}
      <div className={styles.mainContainer}>
     {searchedData && searchedData?.map(item =>{
    return <> 
        <DetailCard
         
        img={item?.pagemap?.cse_image?.length ? item?.pagemap?.cse_image[0]?.src : 'https://img.lovepik.com/element/40170/0204.png_860.png'}
        title={item?.title}
        snippet={item?.snippet}
        />
      </>
     })}
   </div>
    </>

  )
})

export default DetailPage;
