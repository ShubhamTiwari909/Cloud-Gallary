import { GoogleAuthProvider, GithubAuthProvider, signInWithPopup } from "firebase/auth"
import {auth} from "./firebaseConfig"
// Registration
const googleProvider = new GoogleAuthProvider();
const githubProvider = new GithubAuthProvider();
export const signupWithGoogle = (router) => {
    signInWithPopup(auth, googleProvider)
        .then(response => {
            sessionStorage.setItem("Token", response.user.accessToken)
            sessionStorage.setItem("uid", response.user.email + response.user.accessToken.slice(0,15))
            router.push("/folders/navigation")
        })
        .catch(err => console.log("error"))
}

