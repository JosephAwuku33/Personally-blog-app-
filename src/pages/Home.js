import React from 'react';
import HomeArticle from '../components/HomeArticle';
import HomePosts from '../components/HomePosts';
import { motion } from "framer-motion";

function Home() {
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 3 }}
        >
            <div className="min-h-screen">
                <HomeArticle />
                <HomePosts />
            </div>
        </motion.div>
    );
}

export default Home;