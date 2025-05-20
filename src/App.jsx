import { useState, useEffect } from 'react';
import TodoItem from './components/TodoItem';

function App() {
  const [tareas, setTareas] = useState(() => {
    const guardadas = localStorage.getItem('tareas');
    return guardadas ? JSON.parse(guardadas) : [];
  });

  const [nuevaTarea, setNuevaTarea] = useState('');
  const [filtro, setFiltro] = useState('todas'); // todas | completadas | incompletas

  useEffect(() => {
    localStorage.setItem('tareas', JSON.stringify(tareas));
  }, [tareas]);

  const agregarTarea = () => {
    if (nuevaTarea.trim() === '') return;
    const tarea = {
      id: Date.now(),
      texto: nuevaTarea,
      completada: false,
    };
    setTareas([...tareas, tarea]);
    setNuevaTarea('');
  };

  const eliminarTarea = (id) => {
    setTareas(tareas.filter(t => t.id !== id));
  };

  const toggleCompletada = (id) => {
    setTareas(tareas.map(t =>
      t.id === id ? { ...t, completada: !t.completada } : t
    ));
  };

  const tareasFiltradas = tareas.filter(t => {
    if (filtro === 'completadas') return t.completada;
    if (filtro === 'incompletas') return !t.completada;
    return true; // todas
  });

  return (
    <div className="container mt-5">
      <div className="card shadow p-4">
        <h2 className="text-center mb-4">Administrador de Tareas 🗒️</h2>

        <div className="input-group mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="Nueva tarea..."
            value={nuevaTarea}
            onChange={(e) => setNuevaTarea(e.target.value)}
          />
          <button className="btn btn-success" onClick={agregarTarea}>
            Agregar
          </button>
        </div>

        <div className="btn-group mb-3" role="group">
          <button
            className={`btn ${filtro === 'todas' ? 'btn-primary' : 'btn-outline-primary'}`}
            onClick={() => setFiltro('todas')}
          >
            Todas
          </button>
          <button
            className={`btn ${filtro === 'incompletas' ? 'btn-warning' : 'btn-outline-warning'}`}
            onClick={() => setFiltro('incompletas')}
          >
            Incompletas
          </button>
          <button
            className={`btn ${filtro === 'completadas' ? 'btn-success' : 'btn-outline-success'}`}
            onClick={() => setFiltro('completadas')}
          >
            Completadas
          </button>
        </div>

        <ul className="list-group">
          {tareasFiltradas.length === 0 ? (
            <li className="list-group-item text-center text-muted">
              No hay tareas para mostrar.
            </li>
          ) : (
            tareasFiltradas.map(tarea => (
              <TodoItem
                key={tarea.id}
                tarea={tarea}
                onEliminar={eliminarTarea}
                onToggle={toggleCompletada}
              />
            ))
          )}
        </ul>
      </div>
    </div>
  );
}

export default App;
