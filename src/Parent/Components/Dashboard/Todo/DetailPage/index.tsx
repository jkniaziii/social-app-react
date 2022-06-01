import React, {useEffect} from 'react'
import { useParams } from 'react-router-dom';
import { useStore } from '../../../../store/rootStore';
import { toJS } from 'mobx';
import { observer } from 'mobx-react-lite';



const DetailPage = observer(()=> {
  const { Counter: { fetchPost, searchedData, numberOfChildren } } = useStore("");
    let { keyword } = useParams();
    
    useEffect(()=>{
      fetchPost(keyword)
     },[])

     console.log("numberOfChildren CC ___", toJS(numberOfChildren));
     
    return (
      <>    <div>DETAILS : {keyword}</div>
     {searchedData && searchedData?.map(item =>{
         console.log("ITEM ___", toJS(item))
     {/*@ts-ignore */}
      return <> 
      <h1>{item?.title}</h1>
      <div>{item?.snippet}</div>
      </>
     })}
   
    </>

  )
})

export default DetailPage;
