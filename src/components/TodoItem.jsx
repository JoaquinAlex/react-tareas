function TodoItem({ tarea, onEliminar, onToggle }) {
  return (
    <li
      className={`list-group-item d-flex justify-content-between align-items-center ${
        tarea.completada ? 'list-group-item-success' : ''
      }`}
    >
      <span
        onClick={() => onToggle(tarea.id)}
        style={{
          textDecoration: tarea.completada ? 'line-through' : 'none',
          cursor: 'pointer',
        }}
      >
        {tarea.texto}
      </span>
      <button className="btn btn-sm btn-danger" onClick={() => onEliminar(tarea.id)}>
        ❌
      </button>
    </li>
  );
}

export default TodoItem;
