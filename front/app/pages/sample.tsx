import React,{useState,useEffect} from "react";
import axios from "axios";
import Link from "next/link";

type Post = {
  id: number,
  title: string
}

const Sample:React.FC = () =>{
  const [posts,setPosts] = useState<Post[]>([])
  const [nextId,setNextId] = useState<number>(1)
  const [text,setText] = useState<string>("")
  useEffect(()=>{
    axios.get(`http://localhost:3000/posts`).then((res)=>{
      setPosts(res.data)
      setNextId(res.data[res.data.length-1].id+1)
    }
    )

  },[])

  const handleOnDelete = (id: number) =>{
    axios.delete(`http://localhost:3000/posts/${id}`)
    .then((response=>{
      setPosts(posts.filter((post)=>post.id !== id))
      serchNextId()
    }))
  }

  const handleOnEdit = (id:number,value:string)=>{
    axios.patch(`http://localhost:3000/posts/${id}`,{
      title: value
    }).then(response=>{
    const deepCopy: Post[] = JSON.parse(JSON.stringify(posts));

    const newTodos = deepCopy.map((todo)=>{
      if(todo.id === id){
        todo.title = value
      }

      return todo
    })

     setPosts(newTodos);
    }).catch(error =>{
      alert("空白にしないでください")
    })
  }

  const handleOnChange = (e:React.ChangeEvent<HTMLInputElement>) =>{
    setText(e.target.value)
  }

  const handleOnSubmit = ()=>{
    axios.post(`http://localhost:3000/posts/`,{
      id: nextId,
      title: text
    })
    setPosts([...posts,{id: nextId,title: text}])
    setNextId(nextId+1)
  }

  const serchNextId = () =>{
    let maxId = 0
    posts.map((post)=>{
      if(post.id > maxId){
        maxId = post.id
      }
    })
    setNextId(maxId+1)
  }

  return (
    <div>
      <p>sample</p>
      <ul>
      {posts.map((post)=>
      <div key={post.id}>
        <li>{post.id}: {post.title}</li>
        <input type="text" value={post.title} onChange={(e)=>handleOnEdit(post.id,e.target.value)}/>
        <button onClick={()=>handleOnDelete(post.id)}>削除</button>
      </div>
      )}
      </ul>

      <form  onSubmit={(e) => {
          e.preventDefault();
          handleOnSubmit();
        }}>
        <input type="text" value={text} onChange={(e)=>handleOnChange(e)}/>
        <input type="submit" value="追加" onSubmit={handleOnSubmit} />
      </form>
        <p>{nextId}</p>
      <Link href="/">
        <a>= HOME =</a>
      </Link>
    </div>
  )
}

export default Sample
