import React, { useState } from "react";
import { SignInParams } from "../types";
const SignIn: React.FC = ()=>{
  const [email,setEmail] = useState<string>("")
  const [password,setPassword] = useState<string>("")

  const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) =>{
    const params: SignInParams = {
      email: email,
      password: password
    }
    console.log("Clicked Submit!!")
  }
return (
<>
<form noValidate autoComplete="off">
  <label htmlFor="email"></label>
  <input type="text" id="email" value={email} onChange={e => setEmail(e.target.value)}/>
  <label htmlFor="password"></label>
  <input type="password" id="password" value={password} onChange={e => setPassword(e.target.value)}/>
  <button type="submit" disabled={!email || !password? true: false}>Submit</button>
</form>
</>)
}
export default SignIn
