import blogFetch from '../axios/config';

import { useState } from 'react';

import { useNavigate } from 'react-router-dom';

import './NewPost.css';



const NewPost = () => {

    const navigate = useNavigate()

    const [title, setTitle] = useState();
    const [body, setBody] = useState();

    const createPost = async (e) => {
        e.preventDefault();
        const post = {title, body , userId : 1}

        await blogFetch.post("/posts", {
            body: post,
        });

        //Não precisa transformar o arquivo para json por que estamos usando axios.

        navigate("/");
        
        //Não vai aparecer o novo dado salvo porque a api é só para testes, mas o post é enviado, recebemos 201, "Post Criado".

    }

  return (
    <div className='new-post'>
        <h2>Inserir novo post:</h2>
        <form onSubmit={(e) => createPost(e)}>
            <div className="form-control">
                <label htmlFor="title">Titulo:</label>
                <input 
                    type="text" 
                    name="title" 
                    id="title" 
                    placeholder='Digite o título'
                    onChange={(e) => setTitle(e.target.value)} 
                />
            </div>
            <div className="form-control">
                <label htmlFor="body">Conteudo:</label>
                <textarea 
                    name="body" 
                    id="body" 
                    placeholder='Digite o conteúdo'
                    onChange={(e) => setBody(e.target.value)}  
                />
            </div>
            <input type='submit' value='Criar Post' className='btn'/>
        </form>
    </div>
  )
}

export default NewPost