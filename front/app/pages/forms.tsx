import React,{useState,useCallback} from "react";
import Image from 'next/image'
import { createFoods } from "../lib/api/foods";
import { useRouter } from "next/router";

// todo 画像の保存先をs3にする。エラーメッセージを出す。
const Forms: React.FC = ()=>{
  const router = useRouter()

  const [name,setName] = useState<string>("")
  const [price,setPrice] = useState<string>("")
  const [image,setImage] = useState<File>()
  const [preview,setPreview] = useState<string>("")


 const handleCreateFoods  = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const data = createFormData()
    await createFoods(data)
    .then(() => {
      // setName("")
      // setPrice("")
      // setPreview("")
      // setImage(undefined)
      router.push("/foods")
    })
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

  const createFormData = (): FormData => {
    const formData = new FormData()

    formData.append("name", name)
    formData.append("price", price)
    if (image) formData.append("image", image)

    return formData
  }

  return <>
<form onSubmit={e =>handleCreateFoods(e)}>
  <label htmlFor="name">商品名:</label>
  <input type="text" id="name" value={name} onChange={e => setName(e.target.value)} required/>
  <label htmlFor="price">値段:</label>
  <input type="text" id="price" inputMode="numeric" pattern="^[1-9][0-9]*$" value={price} onChange={e => setPrice(e.target.value)}　required />
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
}

export default Forms
