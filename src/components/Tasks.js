import Task from './Task'

const Tasks = ({tasks, onDelete}) => {
    
    return (
        <div>
            {tasks.map((oneTask) => (
                <Task 
                key={oneTask.id}
                task={oneTask}
                onDelete={onDelete}></Task>
                )
            )}
        </div>
    )
}

export default Tasks
