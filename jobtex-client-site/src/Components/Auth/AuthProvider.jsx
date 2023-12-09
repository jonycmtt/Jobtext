import { createContext, useEffect, useState } from "react"
import { GoogleAuthProvider, createUserWithEmailAndPassword, getAuth, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from "firebase/auth";
import app from "../../../firebase.config";
import axios from "axios";

export const AuthContext = createContext();
const auth = getAuth(app)

const AuthProvider = ({children}) => {
    const [user,setUser] = useState(null)
    const [loading,setLoading] = useState(true)

    const createUser = (email,password) => {
        setLoading(true)
        return createUserWithEmailAndPassword(auth,email,password)
    }

    const updateProfileInfo = (name,photoUrl) => {
        setLoading(true)
        return updateProfile(name,photoUrl)
    }

    const loginUser = (email,password) => {
        setLoading(true)
        return signInWithEmailAndPassword(auth,email,password)
    }

    const googleLogin = () => {
        const provider = new GoogleAuthProvider();
        return signInWithPopup(auth,provider)
    }
    const logOutUser = () => {
        return signOut(auth)
    }

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth,currentUser => {
            // console.log('current user is ',currentUser)
            const userEmail = currentUser?.email || user?.email;
            const loggedUser = {email : userEmail}
            setUser(currentUser)
            setLoading(false)

            if(currentUser) {
                axios.post('https://jobtex-server-site.vercel.app/jwt',loggedUser , {
                    withCredentials : true
                })
                .then(res => {
                    console.log('token response', res.data)
                })
            }
            else {
                axios.post('https://jobtex-server-site.vercel.app/logout', loggedUser , {
                    withCredentials :true
                })
                .then(res => {
                    console.log(res.data)
                })
            }
            return () => {
               return unsubscribe()
            }
        })
    },[])
    const authInfo = {
        user,
        loading,
        createUser,
        updateProfileInfo,
        logOutUser,
        loginUser,
        setLoading,
        googleLogin
    }

  return <AuthContext.Provider value={authInfo}>
    {children}
  </AuthContext.Provider>
}

export default AuthProvider
