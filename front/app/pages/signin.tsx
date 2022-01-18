import React, { useContext, useState } from "react";
import { useRouter } from "next/router";
import Cookies from "js-cookie";

import { AuthContext } from "./_app";
import { SignInParams } from "../types";
import {signIn} from "../lib/api/auth"

const SignIn: React.FC = ()=>{
  const router = useRouter()

  const {setIsSignedIn,setCurrentUser} = useContext(AuthContext)
  const [email,setEmail] = useState<string>("")
  const [password,setPassword] = useState<string>("")

  const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) =>{
    e.preventDefault()
    const params: SignInParams = {
      email: email,
      password: password
    }

    try{
      const res = await signIn(params)

      if(res.status = 200){
        Cookies.set("_access_token", res.headers["access-token"])
        Cookies.set("_client", res.headers["client"])
        Cookies.set("_uid", res.headers["uid"])

        setIsSignedIn(true)
        setCurrentUser(res.data.data)

        router.push("/")
        console.log("Signed in successfully!")

      }else{
        console.log("Signed in failed")
      }
    }catch(err){
      console.log(err)
    }

  }
return (
<>
<p>this is Sign in Page</p>
<p></p>
<form noValidate autoComplete="off">
  <label htmlFor="email">Email:</label>
  <input type="text" id="email" value={email} onChange={e => setEmail(e.target.value)}/>
  <label htmlFor="password">PassWord</label>
  <input type="password" id="password" value={password} onChange={e => setPassword(e.target.value)}/>
  <button type="submit" disabled={!email || !password? true: false} onClick={handleSubmit}>Submit</button>
</form>
</>)
}

export default SignIn
