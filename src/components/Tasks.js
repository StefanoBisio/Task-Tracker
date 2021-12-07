import Task from './Task'

const Tasks = ({tasks, onDelete, onToggle}) => {
    
    return (
        <div>
            {tasks.map((oneTask) => (
                <Task 
                key={oneTask.id}
                task={oneTask}
                onDelete={onDelete}
                onToggle={onToggle}></Task>
                )
            )}
        </div>
    )
}

export default Tasks
