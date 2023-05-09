import React, { useEffect, useState } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebase-config';


function HomePosts() {
    const [postLists, setPostList] = useState([]);

    const postCollectionRef = collection(db, "posts");



    useEffect(() => {
        const getPosts = async () => {
            const data = await getDocs(postCollectionRef);
            setPostList(data.docs.map((doc) => ({...doc.data(), id: doc.id })));
        }; 

        getPosts();
    });
    return (
        <div className="flex flex-col items-center justify-center mt-8">
            {postLists.map((post) => {
                return ( 
                    <div key={post.id} className="flex items-center justify-center lg:w-3/4 lg:h-1/4  mx-2 mb-8 ">
                        <div className="lg:w-1/2 lg:h-1/2 sm:h-1/6 sm:w-1/2 overflow-hidden  rounded-lg bg-white shadow-xl">
                            <img className="lg:w-full lg:h-48 md:h-42  md:w-full object-cover rounded-t-lg 
                            md:rounded-none md:rounded-l-lg" 
                            src={post.imageUrl} alt="" />
                
                            
                            <div className="p-6 sm:overflow-hidden">
                                <h4 className="text-gray-light text-xl font-bold mb-1">{post.date}</h4>
                                <h5 className="text-gray-light text-xl font-medium mb-2">{post.title}</h5>
                                <p className="text-gray-light text-base mb-8 lg:truncate sm:text-ellipsis">
                                    {post.post}
                                </p>
                                <p className="text-gray-light text-xs mb-2">@ {post.author.name} </p>
                        </div>
                    </div>
                    </div>
                )
            })}
        </div>
    );
}

export default HomePosts;