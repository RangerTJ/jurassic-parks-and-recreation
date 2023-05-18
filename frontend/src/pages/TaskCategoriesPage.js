import React, { useEffect, useState } from "react";
import { Link } from 'react-router-dom'; // May not need?
import Axios from 'axios';

// TaskCategories SQL Endpoints
const hostURL = 'http://localhost:3001';  // Apparently I need to pass this as a prop or something?
const getTaskCategoriesURL = hostURL + '/api/getTaskCategories';
const createTaskCategoriesURL = hostURL + '/api/insertTaskCategories';
const updateTaskCategoriesURL = hostURL + '/api/updateTaskCategories';
const deleteTaskCategoriesURL = hostURL + '/api/deleteTaskCategories/';

function TaskCategoryPage() {

    // Task Category useStates
    const [categoryName, setCategoryName] = useState('')
    const [newTaskCategory, setNewTaskCategory] = useState('')
    const [taskCategoryList, setTaskCategoryList] = useState([])

    // CRUD operations modeled off tutorial - CITE IN DETAIL LATER

    // READ Task Categories
    useEffect(()=> {
        Axios.get(getTaskCategoriesURL).then((response)=> {
            setTaskCategoryList(response.data)
            console.log(response.data)
            })
    }, [])
  
    // For some reason trying to clear text with .then(()=> {setCategoryName("")}); results in an error about reading data in my tries
    // Or maybe something like this? https://stackoverflow.com/questions/14837466/clearing-a-text-field-on-button-click
    // https://www.freecodecamp.org/news/how-to-clear-input-values-of-dynamic-form-in-react/ TO READ

    // CREATE
    const submitNewTaskCategory = () => {
        Axios.post(createTaskCategoriesURL, {
            categoryName: categoryName
        }).then(() => {Axios.get(getTaskCategoriesURL)
        .then((response)=> {setTaskCategoryList(response.data)
            console.log(response.data);
        });
        });
    };

    // UPDATE - Apparently needed to RETURN the Axios get for it to work for some reason
    const updateTaskCategory = (idTaskCategory) => {
      Axios.put(updateTaskCategoriesURL, {
        idTaskCategory: idTaskCategory,
        categoryName: newTaskCategory
      })
          .then(() => {return Axios.get(getTaskCategoriesURL);})
          .then((response) => {
            setTaskCategoryList(response.data);
            console.log(response.data);
        }
    )};

    // DELETE - Apparently sending a response from server fixed it so it refreshes automatically
    const delTaskCategory = (delCategory) => {
        Axios.delete(deleteTaskCategoriesURL + delCategory)
        .then(() => {Axios.get(getTaskCategoriesURL)
        .then((response) => {setTaskCategoryList(response.data);
            console.log(response.data);
            });
        });
    };

    return(
        <>
            <h2>CRUD Tester</h2>
            <article>
                <h3>INSERT Test + READ from Task Categories</h3>
                    {/* Example From Tutorial */}
                    <input type="text" name="inputCategory" onChange={(e) => {
                        setCategoryName(e.target.value)
                    }}/>
                    <p><button onClick={submitNewTaskCategory}>Test Insert Task Category</button></p>

                    {/* Dynamic Table Alpha Version Test*/}
                    <div className="scrollableTable">
                        <table>
                            <tr>
                                <th>ID</th>
                                <th>Category</th>
                                <th>Update</th>
                                <th>Delete</th>
                            </tr>
                            {taskCategoryList.map((val)=> {
                            return (
                                <tr>
                                    <td>{val.idTaskCategory}</td>
                                    <td>{val.categoryName}</td>
                                    <td width="100px">
                                        <input type="text" onChange={(e)=> {setNewTaskCategory(e.target.value)}}></input>
                                        <button onClick={()=> {updateTaskCategory(val.idTaskCategory, val.categoryName)}}>Update</button>
                                    </td>
                                    <td width="100px"><button onClick={()=> {delTaskCategory(val.idTaskCategory)}}>Delete</button></td>
                                </tr>)
                        })}
                        </table>
                    </div>
            </article>
        </>
        )};

    export default TaskCategoryPage;