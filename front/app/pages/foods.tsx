import React, { useState,useEffect} from 'react'
import { getFoods } from '../lib/api/foods'
import { Food } from '../types'
import Image from 'next/image'

const Food: React.FC = () =>{
  const [foods,setFoods] = useState<Food[]>([])
    const myLoader = ({ src, width, quality }) => {
  return `${src}?w=${width}&q=${quality || 75}`
}
  const handleGetFoods = async ()=>{
    const res = await getFoods()
    setFoods(res.data)
  }

  useEffect(()=>{
    handleGetFoods()
  },[])


  return (
    <>
    <p>foods:</p>
    <ul>
    {foods.map((food)=>
      <div key={food.id}>
      <li>商品名: {food.name}</li>
      <li>値段: {food.price}円</li>
      {food.image?.url?
      <>
        <Image loader={myLoader} src={food.image.url} width={200} height={200} alt="no image"/>
      </>

      :<>
      <p>no image</p>
      </>}

      </div>
    )}
    </ul>
    </>
  )
}

export default Food
