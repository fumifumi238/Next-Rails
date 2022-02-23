import React, { useState,useEffect,useCallback } from 'react'
import axios from 'axios'
import { Food } from '../types'
import Image from 'next/image'

const Food: React.FC = () =>{
  const [foods,setFoods] = useState<Food[]>([])
  const [name,setName] = useState<string>("")
  const [price,setPrice] = useState<number>()
  const [image,setImage] = useState<File>()
  const [preview,setPreview] = useState<string>("")

  const myLoader = ({ src, width, quality }) => {
  return `${src}?w=${width}&q=${quality || 75}`
}

  useEffect(()=>{
    axios.get(`http://localhost:3000/api/v1/foods`, {
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
    axios.post(`http://localhost:3000/api/v1/foods/`,{
    headers: {
      "Content-Type": "multipart/form-data",
    },
      name: name,
      price: price,
      image: image
    },)

  }

    const uploadImage = useCallback((e) => {
    const file = e.target.files[0]
    setImage(file)
    console.log(image)
  }, [])

    const previewImage = useCallback((e) => {
    const file = e.target.files[0]
    setPreview(window.URL.createObjectURL(file))
    console.log(file)
  }, [])


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
        <Image loader={myLoader} src={food.image.url} width={200} height={200}/>
      </>

      :<>
      <p>no image</p>
      </>}

      </div>
    )}
    </ul>

  <form noValidate  >
  <label htmlFor="email">商品名:</label>
  <input type="text" id="email" value={name} onChange={e => setName(e.target.value)}/>
  <label htmlFor="price">値段:</label>
  <input type="text" pattern="[0-9]*" id="price" value={price} onChange={e => setPrice(Number((e.target.value)))}/>
  <input type="file" accept="image/*" onChange={e =>{
      uploadImage(e)
      previewImage(e)
  }}/>
  <button type="submit">Submit</button>
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
