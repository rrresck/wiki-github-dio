import { useState } from 'react';
import gitLogo from '../assets/gitLogo.png';
import { Container } from './styles';
import Input from '../components/input';
import ItemRepo from '../components/ItemRepo';
import { api } from '../services/api';
import Button from '../components/Button';

function App() {

  const [currentRepo, setCurrentRepo] = useState ('');
  const [repos, setRepos] = useState([]);

  const handleSearchRepo = async () => {

    const {data} = await api.get(`repos/${currentRepo}`)

    if(data.id){

      const isExist = repos.find(repo => repo.id === data.id);
      if(!isExist){
      setRepos(prev => [...prev, data]);
      setCurrentRepo('')
      return
      }
    }
    alert('Repositório já está na lista!')
  }

  const handleRemoveRepo = (id) => {
   
    const remove = repos.filter((repo) => repo.id !== id);
    setRepos(remove);
    }
  

  return (
    <Container>
      <img src={gitLogo} width={72} height={72} alt="github logo" />
      <Input value={currentRepo} onChange={(e) => setCurrentRepo(e.target.value)}/>
      <Button onClick={handleSearchRepo}/>
      {repos.map(repo => <ItemRepo handleRemoveRepo={handleRemoveRepo} repo={repo}/>)}
    </Container>
  );
}

export default App;
