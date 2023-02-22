import { sortTask } from "../methods/Sorting"
import { priorityFilter, searchFilter } from "../methods/SearchFilter"
import styles from "../src/styles/Display.module.css"
import Card from './mini-components/Card'
import PropTypes from "prop-types";


function Display({ taskGroup, setTitle, setTask, setPriority, setDeadline,setUrl, setTaskGroup, setUpdate, setUpdateId, search, searchCompleted, getId,setMenu, deleteTask, getCompleted }) {
    
    return (
        <div className={styles.listContainer}>
            <h1>Task List</h1>
            <ul className={styles.listTask}>
                {taskGroup.length === 0 ? <h2>No Task Found</h2> : 
                taskGroup
                .filter((data)  => searchFilter(data,search))
                .filter((data) => priorityFilter(data,searchCompleted))
                .sort((a, b) => sortTask(a,b))
                .map((data) => {
                    return (
                        <Card
                            key={data.id}
                            data={data}
                            setTitle={setTitle}
                            setTask={setTask}
                            setPriority={setPriority}
                            setDeadline={setDeadline}
                            setUrl={setUrl}
                            setTaskGroup={setTaskGroup}
                            setUpdate={setUpdate}
                            setUpdateId={setUpdateId}
                            getId={getId}
                            setMenu={setMenu}
                            deleteTask={deleteTask}
                            getCompleted={getCompleted}
                            />
                    )
                })}
            </ul>
        </div>
    )
}

Display.propTypes = {
    taskGroup: PropTypes.array,
    setTitle: PropTypes.func,
    setTask:PropTypes.func,
    setPriority:PropTypes.func,
    setDeadline:PropTypes.func,
    setTaskGroup:PropTypes.func,
    setUpdate: PropTypes.func,
    setUpdateId:PropTypes.func,
    search:PropTypes.string,
    searchCompleted:PropTypes.string,
    getId:PropTypes.func,
    setMenu:PropTypes.func,
    deleteTask:PropTypes.func,
    getCompleted:PropTypes.func,
}

export default Display

