import React, { useState,useEffect,useCallback } from 'react'
import axios from 'axios'
import { Food } from '../types'
import Image from 'next/image'

const Food: React.FC = () =>{
  const [foods,setFoods] = useState<Food[]>([])
  const [name,setName] = useState<string>("")
  const [price,setPrice] = useState<number>(0)
  const [image,setImage] = useState<File>()
  const [preview,setPreview] = useState<string>("")

  useEffect(()=>{
    axios.get(`http://localhost:3000/foods`, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  }).then((res)=>{
      setFoods(res.data)
    }
    )

  },[])

   const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) =>{
    e.preventDefault()
    axios.post(`http://localhost:3000/foods/`,{
      name: name,
      price: price,
      image: image
    })

  }

    const uploadImage = useCallback((e) => {
    const file = e.target.files[0]
    setImage(file)
  }, [])

    const previewImage = useCallback((e) => {
    const file = e.target.files[0]
    setPreview(window.URL.createObjectURL(file))
  }, [])


  return (
    <>
    <p>foods:</p>
    <ul>
    {foods.map((food)=>
      <div key={food.id}>
      <li>商品名: {food.name}</li>
      <li>値段: {food.price}円</li>
      <li>{food.image.url}</li>
      </div>
    )}
    </ul>

  <form noValidate autoComplete="off">
  <label htmlFor="email">商品名:</label>
  <input type="text" id="email" value={name} onChange={e => setName(e.target.value)}/>
  <label htmlFor="price">値段:</label>
  <input type="number" id="price" value={price} onChange={e => setPrice(parseInt((e.target.value)))}/>
  <input type="file" accept="image/*" onChange={e =>{
      uploadImage(e)
      previewImage(e)
  }}/>
  <button type="submit"onClick={handleSubmit}>Submit</button>
</form>
{preview?
          <Image
            src={preview}
            height={140}
            width={140}
            alt="preview img"
          />
:null}
    </>
  )
}

export default Food