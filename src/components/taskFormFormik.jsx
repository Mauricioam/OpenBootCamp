import React from 'react';
import { Formik, Form, Field  } from 'formik';
import * as Yup from "yup";
import { Task } from '../models/task.class';
import { LEVELS } from '../models/levels.enum';


function TaskFormFormik({ add }) {

const initialValues = {
    name:"",
    description:"",
    completed: false,
    level: LEVELS.NORMAL

}


    const taskFormSchema = Yup.object().shape(
            {
                name: Yup.string()
                    .required("Ingresa un título"),
                description: Yup.string()
                    .required("Ingresa la descripción"),
                level:Yup.string().oneOf([LEVELS.NORMAL,LEVELS.BLOCKING,LEVELS.URGENTE],"Must select a level")
                        .required("Select a level")

            }
    )


    const addTask = (values) => { 
        const newTask = new Task(
            values.name,
            values.description,
            values.completed,
            values.level
        )
            add(newTask)
      }

  return (
    <div style={{margin:"3rem 0 3rem"}}>
        <Formik
        initialValues={initialValues}
        validationSchema={taskFormSchema}
        onSubmit={addTask}
        >

        {({ values,touched, errors, handleChange }) => (
            <Form style={{display:"flex",alignItems:"center"}}>
                {console.log(values)}
                <div style={{display:"flex",flexDirection:"column"}}>
                <Field id="name" type="text" name="name" placeholder="Task Name" ></Field>
                {errors.name && touched.name && <p>{errors.name}</p>}
                </div>
                <div style={{display:"flex",flexDirection:"column"}}>
                <Field  type="text" name="description" placeholder="Task Description" ></Field>
                {errors.description && touched.description && <p>{errors.description}</p>}
                
                </div>
                <label>Prioridad</label>
                <select name="level" defaultValue={LEVELS.NORMAL} onChange={handleChange} >
                    <option value={LEVELS.NORMAL}>{LEVELS.NORMAL}</option>
                    <option value={LEVELS.BLOCKING}>{LEVELS.BLOCKING}</option>
                    <option value={LEVELS.URGENTE}>{LEVELS.URGENTE}</option>
                </select>
                {errors.level && touched.level && <p style={{color:"red",border:"solid black"}}>{errors.level}</p>}
               
                <button type='submit'>Add Task</button>
            </Form>

        )}

        </Formik>
    </div>
  )
}

export default TaskFormFormik;