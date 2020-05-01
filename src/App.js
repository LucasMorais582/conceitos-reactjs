import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import api from './services/api.js';
import "./styles.css";
import moment from 'moment';

function App() {
  const [ projects, setProjects ] = useState([]);
    useEffect(() => {
        api.get('repositories').then(response => {
            setProjects(response.data);
        });
    }, []);
  async function handleAddRepository() {
    try{
      const response = await api.post('repositories',{
        title: `Curso *******   - Criado em: ${moment().format('DD/MM/YYYY - HH:mm:ss')}`,
        owner: 'Lucas Morais'
      }); 
      const project = response.data;

      setProjects([...projects, project]);
    } catch(error) {
      alert('Erro ao cadastrar o repositório, tente novamente.');
    }
  }

  async function handleRemoveRepository(id) {
    try {
      await api.delete(`repositories/${ id }`);
      setProjects(projects.filter(project => project.id !== id));
  } catch(error) {
      alert('Erro ao apagar o repositório, tente novamente.');
  }
  }

  return (
    <> 
    <Header id="title" title="Repositórios">
        <ul data-testid="repository-list">
            { projects.map(project =>
            <li key={ project.id }>
               { project.title } 
               <button type="button" onClick={ () => handleRemoveRepository(project.id) }>Remover</button>
            </li>)}
        </ul>
        <button type="button" onClick={ handleAddRepository }>Adicionar</button>
    </Header>
    </>
  );
}

export default App;
