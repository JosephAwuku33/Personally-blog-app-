import React from 'react';
import HomeArticle from '../components/HomeArticle';
import HomePosts from '../components/HomePosts';

function Home() {
    return (
        <div>
            <div className="min-h-screen">
                <HomeArticle/>
                <HomePosts />
            </div>
        </div>
    );
}

export default Home;