import React, { useState, useEffect } from "react";

import "./styles.css";

import api from './services/api';

function App() {
  const [repositories, setRepositories] = useState([]);

  useEffect( () => {
    api.get('/repositories').then( response =>
      setRepositories( response.data )
    );
  }, [] );

  async function handleAddRepository() {
    // TODO
     const response = await api.post('/repositories', {
      title: 'Prog Web',
      url: 'ufopa.edu.br',
      techs: ['Python', 'Node.JS', 'ReactJS'],
    })

    setRepositories( [...repositories, response.data ] );

  }

  async function handleRemoveRepository( id ) {
    await api.delete( `repositories/${id}` );

    setRepositories( repositories.filter ( repository => repository.id !== id ));
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {repositories.map(repository => 
          <li key={repository.id}>
            
            <ul>
              <li> <a href={ repository.url } target="_blank"> { repository.title } </a></li>
              <li> Likes: {repository.likes} </li>
            </ul>

            <button onClick={() => handleRemoveRepository(repository.id)}>
              Remover
            </button>
          </li>
        )}
      </ul>

      <li key={repositories.id}>    
        <button onClick={handleAddRepository}>
          Adicionar
        </button>
      </li>

    </div>
  );
}

export default App;