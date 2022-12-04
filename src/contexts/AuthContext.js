import React, {useContext, useState, useEffect} from 'react'
import {auth} from '../firebase'

const AuthContext = React.createContext()

export function useAuth(){
    return useContext(AuthContext)
}

export default function AuthProvider({children}) {
    
    const [currentUser, setCurrentUser] = useState()
    const [loading, setLoading] = useState(true)
    //sign up
    function signup(email, password){
        return auth.createUserWithEmailAndPassword(email, password)
    }
    //login
    function login(email, password){
        return auth.signInWithEmailAndPassword(email, password)
    }
    //log out
    function logout(){
        return auth.signOut()
    }
    //reset password
    function resetPassword(email){
        return auth.sendPasswordResetEmail(email)
    }
    //updateEmail
    function updateEmail(email){
        return currentUser.updateEmail(email)
    }
    //updatePassword
    function updatePassword(password){
        return currentUser.updatePassword(password)
    }
    //useEffect --> auth.onStateChanged
    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(user=>{
            setCurrentUser(user)
            setLoading(false)
        })

        return unsubscribe
    }, [])
    
    //value
    const value = {
        currentUser,
        signup,
        login,
        logout,
        resetPassword,
        updateEmail,
        updatePassword
    }

  return (
    <AuthContext.Provider value={value}>
        {!loading && children}
    </AuthContext.Provider>
  )
}
