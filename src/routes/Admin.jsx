import blogFetch from "../axios/config"

import { useState, useEffect } from "react"

import { Link } from "react-router-dom"

import "./Admin.css";


const Admin = () => {

    const [posts, SetPosts] = useState([])

    const getPost = async() => {

        try {
            
            const response = await blogFetch.get("/posts")
            
            const data = response.data;

            SetPosts(data);
            
            } catch (error) {

            console.log('erro ao buscar dados' + error)
            
            }

    }

    const deletePost = async(id) => {

        await blogFetch.delete(`/posts/${id}`);

        const filteredPosts = posts.filter((post) => post.id !==id)
            //Retorno todos os posts com o id diferente do que eu estou passando
        SetPosts(filteredPosts);
    }

    useEffect(() => {
        getPost();
    },[])


  return (
    <div className="admin">
        <h1>Gerenciar Posts</h1>
        {posts.length === 0 ? (<p>Carregando...</p>) : (
            posts.map((post) => (
                <div className="post" key={post.id}>
                    <h2>{post.title}</h2>
                    <div className="actions">
                        <Link className="btn edit-btn" to={`/posts/edit/${post.id}`}>Editar</Link>
                        <button className="btn delete-btn" onClick={() => deletePost(post.id)}>Deletar</button>
                    </div>
                </div>
            ))
        )}
    </div>
  )
}

export default Admin