import { useState } from 'react';
import tarefas from './todos/todos.json';
import './App.css';
import { MdDelete } from "react-icons/md";
import { CiEdit } from "react-icons/ci";
import { CiCircleCheck } from "react-icons/ci";

function App() {
  const [listaTarefas, setListaTarefas] = useState(tarefas.todos);
  const [novaTarefa, setNovaTarefa] = useState('')

  function adicionarTarefa() {
    if (novaTarefa.trim() === '') {
      alert('Por favor, insira uma tarefa válida.');
      return;
    }



    const novaTarefaobg = {
      id: listaTarefas.length + 1, // Gera um ID único baseado no tamanho atual da lista
      titulo: novaTarefa,
      concluido: false, // Define a tarefa como não concluída inicialmente
    }

    setListaTarefas([...listaTarefas, novaTarefaobg])

    setNovaTarefa(''); // Limpa o campo de entrada após adicionar a tarefa
  }

  function deletarTarefa(id: number) {
    const ListaAtualizada = listaTarefas.filter((tarefa) => tarefa.id !== id)

    setListaTarefas(ListaAtualizada)
  }


  function alternarConcluido(id: number) {
    const listaAtualizada = listaTarefas.map((tarefa) =>
      tarefa.id === id ? { ...tarefa, concluido: !tarefa.concluido } : tarefa
    );
    setListaTarefas(listaAtualizada);
  }

  function editarTarefa(id: number) {
    const tarefaParaEditar = listaTarefas.find((tarefa) => tarefa.id === id);
    if (tarefaParaEditar) {
      const novoTitulo = prompt('Edite o título da tarefa:', tarefaParaEditar.titulo);

      if (novoTitulo !== null && novoTitulo.trim() !== '') {
        const listaAtualizada = listaTarefas.map((tarefa) =>
          tarefa.id === id ? { ...tarefa, titulo: novoTitulo } : tarefa
        );
        setListaTarefas(listaAtualizada);
      }
    }
  }

  return (
    <div className='container'>
      
      <h1>Lista de Tarefas</h1>
      <div className='header'>

        <input
          type="text"
          value={novaTarefa}
          placeholder="Digite uma nova tarefa"
          onChange={(evento: React.ChangeEvent<HTMLInputElement>) =>
            setNovaTarefa(evento.target.value)
          }
        />
        <button onClick={adicionarTarefa}> Adicionar Tarefa</button>
      </div>
      <section>
        <ul className='lista-tarefas'>
          {listaTarefas.map((tarefa) => (
            <li key={tarefa.id}>
              <span className="tarefa-texto">{tarefa.titulo}</span>
              <div className="acoes-tarefa">
                <button className="btn-completar" onClick={() => alternarConcluido(tarefa.id)}>
                <CiCircleCheck color={tarefa.concluido ? 'green' : 'gray'} size={30} />

                </button>
                <button className="btn-deletar" onClick={() => deletarTarefa(tarefa.id)}>
                  <MdDelete  size={30}/>
                </button>
                <button className="btn-editar" onClick={() => editarTarefa(tarefa.id)}>
                  <CiEdit size={30}/>
                </button>
              </div>
            </li>
          ))}
        </ul>
      </section>


    </div>
  );
}

export default App;
