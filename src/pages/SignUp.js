import React, { useRef, useState } from 'react';
import { auth, provider } from "../firebase-config";
import { signInWithPopup } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import ErrorAlert from '../components/ErrorAlert';
import { useAuth } from '../contexts/AuthContext';


const SignUp = () => {

    const emailRef = useRef();
    const passwordRef = useRef();
    const { signup, setIsAuth } = useAuth();
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(true);
    let navigate = useNavigate();

    async function handleSubmit(event){
      event.preventDefault();

      if (passwordRef.current.value.length < 8){
         return setError("Password length is short")
      }
      
      try  {
        setError("");
        setLoading(true);
        signup(emailRef.current.value, passwordRef.current.value);
        setIsAuth(true);
        navigate("/Post");

      } catch {
        setError("Failed to create an account")
      }

      setLoading(false);
      
    }


    const signInWithGoogle = () => {
      signInWithPopup(auth, provider).then( (result) => {
        localStorage.setItem("isAuth", true)
        setIsAuth(true);
        console.log(auth);
        navigate("/Post");
        console.log(result.user.displayName[0])
      }).catch((err) => console.log(err))
    };


    return (
        <section className="lg:h-screen sm:h-3/4 mb-12">
            <div className="px-6 h-full text-gray-dark">
                <div className="flex xl:justify-center lg:justify-between justify-center items-center flex-wrap h-full g-6">
                    <div className="grow-0 shrink-1 md:shrink-0 basis-auto xl:w-6/12 lg:w-6/12 md:w-9/12 mb-12 md:mb-0">
                        <img
                        src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp"
                        className="w-full"
                        alt="Pic"/>
                    </div>
                    <div className="xl:ml-20 xl:w-5/12 lg:w-5/12 md:w-8/12 mb-12 md:mb-0">
 
                        {loading && error && <ErrorAlert message={error}/> }
                        <form onSubmit={handleSubmit}>
                            <div className="flex flex-row items-center justify-center">
                                <p className="text-lg mb-0 mr-4">Sign in with</p>
                                <button
                                    type="button"
                                    data-mdb-ripple="true"
                                    data-mdb-ripple-color="light"
                                    className="inline-block p-3 bg-gray-dark hover:bg-gray-light text-white font-medium text-xs leading-tight uppercase rounded-full shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out mx-1"
            >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512" className="w-4 h-4">
                <path
                  fill="currentColor"
                  d="M279.14 288l14.22-92.66h-88.91v-60.13c0-25.35 12.42-50.06 52.24-50.06h40.42V6.26S260.43 0 225.36 0c-73.22 0-121.08 44.38-121.08 124.72v70.62H22.89V288h81.39v224h100.17V288z"
                />
              </svg>
            </button>
            <button
                                    type="button"
                                    data-mdb-ripple="true"
                                    data-mdb-ripple-color="light"
                                    className="inline-block p-3 bg-gray-dark hover:bg-gray-light text-white font-medium text-xs leading-tight uppercase rounded-full shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:shadow-lg transition duration-150 ease-in-out mx-1"
                                    onClick={signInWithGoogle}
            >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" className="w-4 h-4">
                <path
                  fill="currentColor"
                  d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z"
                />
              </svg>
            </button>
                            </div>
                            <div className="flex items-center my-4 before:flex-1 before:border-t before:border-gray-300 before:mt-0.5 after:flex-1 after:border-t after:border-gray-300 after:mt-0.5">
                                <p className="text-center font-semibold mx-4 mb-0">Or</p>
                            </div>
                           
                            <div className="mb-4">
                                <input
                                type="email"
                                className="form-control block w-full px-4 py-2 text-xl font-normal text-gray-dark bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-light focus:bg-white focus:outline-none"
                                placeholder="Email address"
                                ref={emailRef}
                                />
                            </div>

                            
          <div className="mb-4">
            <input
              type="password"
              className="form-control block w-full px-4 py-2 text-xl font-normal text-gray-dark bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-light focus:bg-white focus:border-gray-light focus:outline-none"
              placeholder="Password"
              ref={passwordRef}
              
            />
          </div>
          <div className="flex items-center justify-center text-center lg:text-left  ">
            <button
              type="submit"
              className="inline-block px-7 py-3 bg-gray-dark text-white font-medium text-sm leading-snug uppercase rounded shadow-md hover:bg-gray-light hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 transition duration-150 ease-in-out"
            >
              Sign Up
            </button>
            </div>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default SignUp; 