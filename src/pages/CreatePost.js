import React, { useEffect, useState } from 'react';
import { addDoc, collection } from "firebase/firestore";
import { db, auth } from '../firebase-config';
import { useNavigate } from 'react-router-dom';
import  Write  from "../assets/Write.svg";
import { useAuth } from '../contexts/AuthContext';
import { storage } from '../firebase-config';
import { ref, getDownloadURL, uploadBytesResumable } from 'firebase/storage';
import { v4 } from 'uuid';
import { date, year, monthName } from '../misc/misc';

function CreatePost() {
    const [title, setTitle] = useState("");
    const [post, setPost] = useState("");
    const [imageUpload, setImageUpload] = useState(null);
    const { isAuth } = useAuth();

    let navigate = useNavigate();
 
    
    const postCollectionRef = collection(db, "posts");
    
    const createPost = async () => {
      
      if (imageUpload == null) return;
        const imageRef = ref(storage, `images/${imageUpload.name + v4()}`);
        uploadBytesResumable(imageRef, imageUpload).then(() => {
          alert("success")

            // Get the download URL
          getDownloadURL(imageRef)
          .then((url) => {
            // Insert url into an <img> tag to "download"
            
            console.log("Yay it was a success")
            const dateOfCreation = `${monthName} ${date}, ${year}`;

            addDoc(postCollectionRef, {  
              date: dateOfCreation,
              title,
              post, 
              author: {name: auth.currentUser.displayName , id: auth.currentUser.uid },
              imageUrl: url  });
              navigate("/");
          })
          .catch((error) => {
            // A full list of error codes is available at
            // https://firebase.google.com/docs/storage/web/handle-errors
            switch (error.code) {
              case 'storage/object-not-found':
                // File doesn't exist
                console.log(`File does not exist`)
                break;
              case 'storage/unauthorized':
                // User doesn't have permission to access the object
                console.log(`User does not have access`)
                break;
              case 'storage/canceled':
                // User canceled the upload
                console.log(`User canceled the upload`)
                break;

              case 'storage/unknown':
                // Unknown error occurred, inspect the server response
                console.log(`Unknown error`)
                break;
              //
              default:
                console.log(`I really don't know what's going on`)
                break;
          }
        });
      
      });



        

    }

    useEffect(() => {
      if (!isAuth){
        navigate("/SignUp");
      }
    });


    return (
        <section className="h-screen mb-5">
            <div className="px-6 h-full text-gray-dark" >
                <div className="flex text-center items-center justify-center mt-7 ">
                <h1 className="font-extrabold text-3xl">Create A Post</h1>
                </div>
                <div className="flex xl:justify-center lg:justify-between justify-center items-center flex-wrap h-full g-6">
                    <div className="grow-0 shrink-1 md:shrink-0 basis-auto xl:w-6/12 lg:w-6/12 md:w-9/12 mb-6 md:mb-0">
                        <img
                        src={Write}
                        className="w-full"
                        alt="Pic"/>
                    </div>
                    <div className="xl:ml-20 xl:w-5/12 lg:w-5/12 md:w-8/12 mb-6 md:mb-0">
                        <form>
                            <div className="flex flex-col items-center justify-center lg:justify-start">
                           
                            <div className="mb-6">
                                <input
                                type="text"
                                className="form-control block w-full px-4 py-2 text-xl font-normal text-gray-dark bg-light-white border-b  transition ease-in-out m-0 focus:text-gray-light focus:outline-none"
                                placeholder="Blog Title"
                                onChange={(event) => {
                                  setTitle(event.target.value) 
                                }}
                                />
                            </div>

                            
          <div className="mb-6">
            <textarea
              type="text"
              className="form-control block w-full px-4 py-2 text-xl font-normal text-gray-dark bg-light-white  border- transition ease-in-out m-0 focus:text-gray-light focus:bg-white focus:border-gray-light focus:outline-none"
              placeholder="Blog......."
              onChange={(event) => {
                setPost(event.target.value)
              }}
            />
          </div>
          <div className="mb-10 pb-7 text-center lg:text-left items-center justify-center">
            <input type='file' onChange={(event) => setImageUpload(event.target.files[0])} className='file:ml-8 file:py-3 file:px-10
            file:rounded-full file:border-0
            file:text-md file:font-semibold  file:text-white
            file:bg-gradient-to-r file:from-gray-dark file:to-light-white
            hover:file:cursor-pointer hover:file:opacity-80'/>
            </div>
          
          <div className="mb-10 pb-7 text-center lg:text-left items-center justify-center">
            <button
              type="button"
              className="inline-block px-7 py-3
               bg-gray-dark
              text-white font-medium text-sm leading-snug
               uppercase rounded-full shadow-md hover:bg-gray-light hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 transition duration-150 ease-in-out"
              onClick={createPost} 
            >
              POST
            </button>
            </div>
            </div>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default CreatePost;