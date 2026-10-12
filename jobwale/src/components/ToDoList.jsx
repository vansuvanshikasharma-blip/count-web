function ToDoList() {
    const AddTask= () =>{
    
    }
    return(
        <div>
            <div>
                <h2>Task To Do</h2>
                <input type="text" name="Task Name" placeholder="Enter Task Name" />
            </div>
            <div>
                <h2>Task Date</h2>
                <input type="Date" name="Date" placeholder="Enter Task Date" />
                
            </div>
            <div>
                <h2>Add Task</h2>
                <button onClick={AddTask}>Add Task</button>
               
            </div>

        </div>
    )
}
export default ToDoList;