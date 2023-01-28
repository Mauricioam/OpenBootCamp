import React from "react";
import PropTypes from "prop-types";
import { Task } from "../models/task.class";
import { LEVELS } from "../models/levels.enum";

function TaskComponent({ task, complete , deleteTask }) {

  /* Funcion que retorna un icono dependiendo del nivel de urgencia */
  const taskLevelBadge = () => {
    switch (task.level) {
      case LEVELS.NORMAL:
        return (<h6 className="mb-0"><span className="badge bg-primary">{task.level}</span></h6>);
      case LEVELS.URGENTE:
        return (<h6 className="mb-0"><span className="badge bg-warning">{task.level}</span></h6>);
    
      case LEVELS.BLOCKING:
        return (<h6 className="mb-0"><span className="badge bg-danger">{task.level}</span></h6>);
    
        default:
            break;
    }
  };
  /* Funcion que retorna el icono de completado  */
  const taskCompletedIcons = () => {
    if(task.completed){
        return (<i onClick={()=> complete(task)} className="bi bi-toggle-on task-action"></i>)
    } else {
        return (<i onClick={()=> complete(task)}  className="bi bi-toggle-off task-action"></i>)
    }
  }


  function styleTasks(){
      if(task.completed){
        return "fw-normal text-center text-decoration-line-through text-muted"
      } else{
        return "fw-normal text-center text-decoration-none text-reset"
      }
    }
 


  return (
    <tr className={styleTasks()} >
      <th>
        <span className="ms-2">{task.name}</span>
      </th>
      <td>
        <span className="align-middle">{task.description}</span>
      </td>
      <td>
        <span className="align-middle">{taskLevelBadge()}</span>
      </td>
      <td>
        <span className="align-middle">
            {taskCompletedIcons()}
          <i className="bi bi-trash-fill task-action" onClick={()=> deleteTask(task)} style={{ color: "red" }}></i>
        </span>
      </td>
    </tr>
    /*     <div>
        <h1>
            Nombre: {task.name}
        </h1>
        <h2>
            Descripcion: {task.description}
        </h2>
        <h3>
            Level: { task.level}
        </h3>
        <h4>
            Esta tarea esta: {task.completed ? "Completado": "Pendiente"}
        </h4>
    </div> */
  );
}

TaskComponent.propTypes = {
  task: PropTypes.instanceOf(Task).isRequired,
  complete: PropTypes.func.isRequired,
  
};

export default TaskComponent;
