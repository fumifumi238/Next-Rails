import React,{useContext,useState} from "react";
import Cookies from "js-cookie"
import { useRouter } from "next/router";

import { AuthContext } from "./_app";
import { signUp } from "../lib/api/auth";
import { SignUpParams } from "../types";

const SignUp: React.FC = ()=>{

  const { setIsSignedIn, setCurrentUser } = useContext(AuthContext)
  const router = useRouter()
  const [name,setName] = useState<string>("")
  const [email,setEmail] = useState<string>("")
  const [password,setPassword] = useState<string>("")
  const [passwordConfirmation, setPasswordConfirmation] = useState<string>("")

  const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) =>{
    e.preventDefault()

    const params: SignUpParams = {
      name: name,
      email: email,
      password: password,
      passwordConfirmation: passwordConfirmation
    }
    console.log(params)

    try{
      // axiosリクエストを送る
      const res = await signUp(params)
      console.log(res)

      if(res.status === 200){
        Cookies.set("_access_token", res.headers["access-token"])
        Cookies.set("_client", res.headers["client"])
        Cookies.set("_uid", res.headers["uid"])

        setIsSignedIn(true)
        setCurrentUser(res.data.data)

        router.replace("/home")
        console.log("Signed in successfully!")
      }else{
        console.log("status is not 200")
      }
    }catch(err){
      console.log(err)
      console.log("error")
    }
  }

return (
  <div>
    <p>Sign Up Page</p>
    <form autoComplete="off">
      <label htmlFor="name">Name: </label>
      <input id="name" type="text" value={name} onChange={e => setName(e.target.value)}/>

      <label htmlFor="email">Email: </label>
      <input id="email" type="email" value={email} onChange={e => setEmail(e.target.value)}/>

      <label htmlFor="password">Password: </label>
      <input id="password" type="password" value={password} onChange={e => setPassword(e.target.value)}/>

        <label htmlFor="passwordConfirmation">PasswordConfirmation: </label>
      <input id="passwordConfirmation" type="password" value={passwordConfirmation} onChange={e => setPasswordConfirmation(e.target.value)}/>
      <button type="submit"  disabled={!name || !email || !password || !passwordConfirmation ? true : false} onClick={handleSubmit}>Submit</button>
    </form>
  </div>
)
}

export default SignUp
