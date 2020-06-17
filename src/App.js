import React, { useState, useEffect } from "react";
import api from './services/api';

import "./styles.css";

function App() {
  const [repositories, setRepositories] = useState([]);

  useEffect(() => {
    api.get('repositories').then(repositories => {
      setRepositories(repositories.data);
    });
  }, []);

  async function handleAddRepository() {
    const { data } = await api.post('repositories', {
      title: "Desafio ReactJS",
      url: "https://github.com/eoliveira90",
      techs: ['HTML5', 'CSS3', 'Node JS', 'TypeScript']
    });
    setRepositories([...repositories, data]);
  }

  async function handleRemoveRepository(id) {
    await api.delete(`repositories/${id}`);
    const filteredRepositories = repositories.filter( (repository) => repository.id !== id );
    setRepositories(filteredRepositories);
  }

  return (
    <>
      <div>
        <ul data-testid="repository-list">
          {repositories.map(repository => (
            <li key={repository.id}>
              {repository.title}
              <button onClick={() => handleRemoveRepository(repository.id)}>
                Remover
          </button>
            </li>
          ))}
        </ul>

        <button onClick={handleAddRepository}>Adicionar</button>
      </div>
    </>
  );
}
/*
<div className="container" style={{ 'display': 'none' }}>
        <div className="row">
          <div className="col-md-5">

            <h4 className="text-center font-weight-bold">Post creation form</h4>
            <div className="form-group">
              <input type="text" placeholder="Post title" v-model="post.title" className="form-control" />
            </div>
            <div className="form-group">
              <textarea v-model="post.content" placeholder="Post content" className="form-control"></textarea>
            </div>
            <div className="form-group">
              <button className="btn btn-block btn-primary" onClick={handleAddRepository}>Adicionar</button>
            </div>
          </div>
          <div className="col-md-7">


            <h4 className="text-center font-weight-bold">Posts</h4>
            <table className="table table-striped">
              <thead>
                <tr>
                  <th scope="col">Title</th>
                  <th scope="col">Techs</th>
                  <th scope="col">Actions</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="post in posts">
                  <td>title</td>
                  <td>techs</td>
                  <td>
                    <button className="btn btn-danger" onClick={() => handleRemoveRepository(1)}>Remover</button>
                  </td>
                </tr>
              </tbody>
            </table>

          </div>
        </div>
      </div>
*/
export default App;
