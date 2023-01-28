import React , { useState} from "react";
import { Task } from "../models/task.class";
import { LEVELS } from "../models/levels.enum";
import TaskComponent from "./task";
import TaskForm from "./taskForm";
import TaskFormFormik from "./taskFormFormik";


function TaskListComponent() {
  const defaultTask1 = new Task("Example1", "Default", false, LEVELS.NORMAL);
  const defaultTask2 = new Task("Example2", "Descripcion", false, LEVELS.URGENTE);
  const defaultTask3 = new Task("Example2", "Descripcion", false, LEVELS.BLOCKING);

  const [tasks, setTasks] = useState([defaultTask1,defaultTask2,defaultTask3]);
  const [loading, setLoading] = useState(true);
  
  const completeTask = (task) => {
    const index = tasks.indexOf(task);
    const tempTask = [...tasks];
    tempTask[index].completed = !tempTask[index].completed;
    setTasks(tempTask); 
    
  };

  const deleteTask = (task) => {
    const index = tasks.indexOf(task);
    const tempTask = [...tasks];
    tempTask.splice(index,1)
    setTasks(tempTask);
  };

  const addnewTask = (task) => {
    console.log(task)
    const tempTask = [...tasks];
    tempTask.push(task);
    setTasks(tempTask);
  }

  const Table = () =>{
    return (
      <table>
      <thead>
      <tr>
        <th scope="col">Titulo</th>
        <th scope="col">Descripcion</th>
        <th scope="col">Prioridad</th>
        <th scope="col">Acciones</th>
      </tr>
      </thead>
      <tbody>
       {tasks.map((task,index) => {

        return (
          <TaskComponent deleteTask={deleteTask} complete={completeTask} task={task} key={index}/>
        )
       })}

      </tbody>
    </table>
    )
  }

  let taskTable;

  if(tasks.length > 0){
    taskTable = <Table/>
  } else {
    taskTable = (<div className="text-center">
      <h3>No task added</h3>
      <h4>Please enter a task</h4>
    </div>)
  }

  return (
    <div>
      <div className="col-12">
        <div className="card">
          <div className="card-header p-3 text-center">
            <h5>Tu tarea</h5>
          </div>
          <div
            className="card-body"
            data-mbd-perfect-scrollbar="true"
            style={{ position: "relative", height: "400px" }}
          >
          {taskTable}
          </div>
        </div>
      </div>
      <TaskFormFormik add={addnewTask}  />
    </div>
  );
}

export default TaskListComponent;
