import React,{useState,useEffect} from "react";
import { GetServerSideProps } from "next";
import { SignUpParams } from "../types";
const SignUp: React.FC = ()=>{
  const [name,setName] = useState<string>("")
  const [email,setEmail] = useState<string>("")
  const [password,setPassword] = useState<string>("")
  const [passwordConfirmation, setPasswordConfirmation] = useState<string>("")

  const handleOnSubmit = async (e: React.MouseEvent<HTMLButtonElement>) =>{
    
  }
return (
  <div>
    <p>Sign Up</p>
  </div>
)
}

export default SignUp
