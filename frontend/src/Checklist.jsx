// import React, { useState } from "react";
// import "./css/checklist.css";

// const Checklist = () => {
//   const [tasks, setTasks] = useState([]);
//   const [newTask, setNewTask] = useState("");

//   // Add a new task
//   const addTask = () => {
//     if (newTask.trim() !== "") {
//       setTasks([...tasks, { text: newTask, completed: false }]);
//       setNewTask("");
//     }
//   };

//   // Toggle task completion
//   const toggleTask = (index) => {
//     const updatedTasks = tasks.map((task, i) =>
//       i === index ? { ...task, completed: !task.completed } : task
//     );
//     setTasks(updatedTasks);
//   };

//   // Delete task
//   const deleteTask = (index) => {
//     setTasks(tasks.filter((_, i) => i !== index));
//   };

//   // Calculate progress
//   const completedTasks = tasks.filter((task) => task.completed).length;
//   const totalTasks = tasks.length;

//   return (
//     <div className="container">
//       <h1>Wedding Checklist</h1>

//       {/* Input for Adding Tasks */}
//       <div className="input-container">
//         <input
//           type="text"
//           placeholder="Add a new task..."
//           value={newTask}
//           onChange={(e) => setNewTask(e.target.value)}
//         />
//         <button className="add-task-btn" onClick={addTask}>Add</button>
//       </div>

//       {/* Dotted Steps Progress Bar */}
//       <div className="dotted-progress">
//         {Array.from({ length: totalTasks }).map((_, index) => (
//           <div
//             key={index}
//             className={`dot ${index < completedTasks ? "filled" : ""}`}
//           ></div>
//         ))}
//       </div>
//       <p className="progress-text">{totalTasks === 0 ? 0 : Math.round((completedTasks / totalTasks) * 100)}% Completed</p>

//       {/* Task List */}
//       <ul className="task-list">
//         {tasks.map((task, index) => (
//           <li
//             key={index}
//             className={`task-item ${task.completed ? "completed" : ""}`}
//           >
//             <span onClick={() => toggleTask(index)}>{task.text}</span>
//             <button className="delete-btn" onClick={() => deleteTask(index)}>Delete</button>
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// };

// export default Checklist;














import React, { useState } from "react";
import "./css/checklist.css";

const Checklist = () => {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");

  // Add a new task
  const addTask = () => {
    if (newTask.trim() !== "") {
      setTasks([...tasks, { text: newTask, completed: false }]);
      setNewTask("");
    }
  };

  // Toggle task completion
  const toggleTask = (index) => {
    const updatedTasks = tasks.map((task, i) =>
      i === index ? { ...task, completed: !task.completed } : task
    );
    setTasks(updatedTasks);
  };

  // Delete task
  const deleteTask = (index) => {
    setTasks(tasks.filter((_, i) => i !== index));
  };

  // Calculate progress
  const completedTasks = tasks.filter((task) => task.completed).length;
  const totalTasks = tasks.length;

  return (
    <div className="wedding-checklist">
      <h1 className="wedding-checklist__title">Wedding Checklist</h1>

      {/* Input for Adding Tasks */}
      <div className="wedding-checklist__input-container">
        <input
          type="text"
          className="wedding-checklist__input"
          placeholder="Add a new task..."
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && addTask()}
        />
        <button className="wedding-checklist__add-btn" onClick={addTask}>Add</button>
      </div>

      {/* Dotted Steps Progress Bar */}
      <div className="wedding-checklist__progress">
        {Array.from({ length: totalTasks }).map((_, index) => (
          <div
            key={index}
            className={`wedding-checklist__dot ${index < completedTasks ? "wedding-checklist__dot--filled" : ""}`}
          ></div>
        ))}
      </div>
      <p className="wedding-checklist__progress-text">
        {totalTasks === 0 ? 0 : Math.round((completedTasks / totalTasks) * 100)}% Completed
      </p>

      {/* Task List */}
      <ul className="wedding-checklist__task-list">
        {tasks.map((task, index) => (
          <li
            key={index}
            className={`wedding-checklist__task-item ${task.completed ? "wedding-checklist__task-item--completed" : ""}`}
          >
            <span
              className="wedding-checklist__task-text" 
              onClick={() => toggleTask(index)}
            >
              {task.text}
            </span>
            <button
              className="wedding-checklist__delete-btn"
              onClick={() => deleteTask(index)}
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Checklist;