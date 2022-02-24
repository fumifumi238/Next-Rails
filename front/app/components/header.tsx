import React,{useContext} from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import Cookies from "js-cookie";

import { signOut } from "../lib/api/auth";
import { AuthContext } from "../pages/_app";



const Header: React.FC = () =>{
  const router = useRouter()
  const {loading,isSignedIn,setIsSignedIn} = useContext(AuthContext)

  const handleSignOut = async(e: React.MouseEvent<HTMLButtonElement>) => {
    try{
      const res = await signOut()

      if(res.data.success === true){
        Cookies.remove("_access_token")
        Cookies.remove("_client")
        Cookies.remove("_uid")

         setIsSignedIn(false)
         router.replace("/signin")
         console.log("logout success")
      }else{
        console.log("logout failed")
      }
    }catch(err){
      console.log(err)
    }
  }

  const AuthButtons = () =>{
    if (!loading) {
      if (isSignedIn) {
        return (
          <button onClick={handleSignOut}>Sign Out</button>
        )
      } else {
        return (
          <>
          <Link href={"/signin"}>
             <button >Sign in</button>
          </Link>
          <Link href={"/signup"}>
              <button >Sign Up</button>
          </Link>
          </>
        )
      }
    } else {
      return <></>
    }
  }
  return(<>
  <AuthButtons />
  <Link href={"/"}>
    <button>Root</button>
  </Link>
    <Link href={"/foods"}>
    <button>foods</button>
  </Link>
  <Link href={"/forms"}>
    <button>forms</button>
  </Link>
  </>)
}

export default Header
