import React,{useContext} from "react";
import Cookies from "js-cookie";
import { signOut } from "../lib/api/auth";
import { AuthContext } from "../pages/_app";
import Router, { useRouter } from "next/router";
const Header: React.FC = () =>{
  const router = useRouter()
  const {loading,isSignedIn,setIsSignedIn} = useContext(AuthContext)
  const handleSignOut = async(e: React.MouseEvent<HTMLButtonElement>) => {
    try{
      const res = await signOut()

      if(res.data.success === true){
         setIsSignedIn(false)
         router.push("/signin")
      }
    }catch(err){
      console.log(err)
    }
  }
  return(<></>)
}

export default Header
