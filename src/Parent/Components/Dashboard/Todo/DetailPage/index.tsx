import React from 'react'
import { useParams } from 'react-router-dom';

const DetailPage = ()=> {
    let { keyword } = useParams();
  console.log("KEYWIRD ___", keyword)
    return (
    <div>DETAILS : {keyword}</div>
  )
}

export default DetailPage;
