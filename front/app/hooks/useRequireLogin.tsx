import { useContext, useEffect } from 'react';
import { useRouter } from 'next/router';
import { AuthContext } from '../pages/_app';

const useRequireLogin = () => {
  const { currentUser,isSignedIn } = useContext(AuthContext);
  const router = useRouter();

  useEffect(()=>{
    if(currentUser && isSignedIn) {
      console.log(currentUser)
      router.replace("/"); // 未ログインだったのでリダイレクト
      console.log("ログインしています。")
    }
  },[currentUser])
}

export default useRequireLogin
