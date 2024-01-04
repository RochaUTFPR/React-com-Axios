import { useState, useEffect } from "react";
import  blogFetch from '../axios/config';
import { Link } from "react-router-dom";

import './Home.css'

const Home = () => {
  
    const [posts, SetPosts] = useState([])

    const getPosts = async() => {

        try {
            
            const response = await blogFetch.get("/posts")
            
            const data = response.data;

            SetPosts(data);
            
            } catch (error) {

            console.log('erro ao buscar dados' + error)
            
            }

    }

    useEffect(()=> {

        getPosts();

    },[])
  
  
    return (

    <div className="home">
        <h1>Últimos Posts</h1>
        {posts.length === 0 ? (<p>Carregando...</p>) : (
            posts.map((post) => (
                <div className="post" key={post.id}>
                    <h2>{post.title}</h2>
                    <p>{post.body}</p>
                    <Link to={`/posts/${post.id}`} className="btn">Ler Mais</Link>
                </div>

            ))
        )}
    </div>
  )
}

export default Home