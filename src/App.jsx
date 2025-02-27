import React, { useState } from "react";
import "./App.css";

// Reusable Modal Component
function Modal({ isOpen, onClose, title, children }) {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 flex items-center justify-center z-50" style={{ backgroundColor: 'rgba(243, 244, 246, 0.4)' }}>
      <div className="bg-white rounded-lg py-[25px] px-[31px] w-full max-w-md mx-4 shadow-xl">
        <div className="relative">
          <button
            className="absolute top-[-12px] right-[-8px] text-2xl font-bold text-gray-600 hover:text-black"
            onClick={onClose}
          >
            &times;
          </button>
        </div>
        <div class="gap-[12px] h-[53px] w-full">
          <h2 className="text-xl font-bold">{title}</h2>
          {title === "Add New Task" ? (
            <p className="text-xs font-light">Create a new task with title, priority, and optional notes.</p>
          ) : (
            <p className="text-xs font-light">Modify the task details below.</p>
          )}
        </div>
        
        {children}
      </div>
    </div>
  );
}

function App() {
  const [tasks, setTasks] = useState([
    {
      id: 1,
      title: "Design System Updates",
      description: "Update color palette and typography in the design system",
      timeOfDay: "Morning",
      priority: "high",
      completed: false
    },
    {
      id: 2,
      title: "Bug Fixes",
      description: "Fix reported issues in the latest release",
      timeOfDay: "Afternoon",
      priority: "low",
      completed: true
    },
    {
      id: 3,
      title: "Feature Request",
      description: "Add new feature to the application",
      timeOfDay: "Evening",
      priority: "medium",
      completed: false
    },
  ]);

  const morningTasks = tasks.filter(task => task.timeOfDay === "Morning");
  const afternoonTasks = tasks.filter(task => task.timeOfDay === "Afternoon");
  const eveningTasks = tasks.filter(task => task.timeOfDay === "Evening");

  const toggleComplete = (taskId) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === taskId ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const [modalOpen, setModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState({});
  const [currentTask, setCurrentTask] = useState({ 
    id: null, 
    title: "", 
    description: "",
    timeOfDay: "Morning",
    priority: "medium",
    completed: false
  });

  // Handle CRUD operations
  const handleSaveTask = () => {
    if (!currentTask.title.trim()) {
      alert("Task title is required");
      return;
    }
    
    if (currentTask.id === null) {
      // Add new task with a new ID
      setTasks([...tasks, { ...currentTask, id: Date.now() }]);
    } else {
      // Edit existing task
      setTasks(tasks.map(task => (task.id === currentTask.id ? currentTask : task)));
    }
    setModalOpen(false);
    resetCurrentTask();
  };

  const handleDeleteTask = (id) => {
    if (window.confirm("Are you sure you want to delete this task?")) {
      setTasks(tasks.filter(task => task.id !== id));
    }
  };
  
  // Reset the current task form
  const resetCurrentTask = () => {
    setCurrentTask({ 
      id: null, 
      title: "", 
      description: "",
      timeOfDay: "Morning",
      priority: "medium",
      completed: false
    });
  };

  const openModal = (type, task = null) => {
    if (type === "add") {
      resetCurrentTask();
    } else if (type === "edit" || type === "view") {
      // Make sure we have a task object
      if (!task) return;
      setCurrentTask({ ...task });
    }
    
    setModalContent({
      type,
      title: type === "add" ? "Add New Task" : type === "edit" ? "Edit Task" : "View Task",
    });
    setModalOpen(true);
  };

  const completedCount = tasks.filter(task => task.completed).length;
  
  // Function to render a single task
  const renderTask = (task) => (
    <div key={task.id} className="flex flex-col border rounded-lg py-3 px-3 gap-4"
      onClick={() => openModal("view", task)}>
      <div className="relative flex flex-row items-start">
        {task.completed ? (
          <svg
            className="w-6 h-6 min-w-6 mr-1 cursor-pointer"
            onClick={() => toggleComplete(task.id)}
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12ZM16.0303 8.96967C16.3232 9.26256 16.3232 9.73744 16.0303 10.0303L11.0303 15.0303C10.7374 15.3232 10.2626 15.3232 9.96967 15.0303L7.96967 13.0303C7.67678 12.7374 7.67678 12.2626 7.96967 11.9697C8.26256 11.6768 8.73744 11.6768 9.03033 11.9697L10.5 13.4393L12.7348 11.2045L14.9697 8.96967C15.2626 8.67678 15.7374 8.67678 16.0303 8.96967Z"
              fill="#2b9f23"
            />
          </svg>
        ) : (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="w-6 h-6 min-w-6 mr-1 cursor-pointer"
            onClick={() => toggleComplete(task.id)}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M9 12.75L11.25 15L15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
            />
          </svg>
        )}
        <p
          className={`text-xs py-1 px-3 rounded-full ${
            task.priority === 'low'
              ? 'text-blue-500 bg-blue-50'
              : task.priority === 'medium'
              ? 'text-orange-700 bg-orange-50'
              : 'text-red-500 bg-red-50'
          }`}
        >
          {task.priority}
        </p>
        <div className="w-full ml-1">
          <p className={`text-wrap font-medium flex-grow break-words ${task.completed ? "line-through" : ""}`}>{task.title}</p>
        </div>
        <div className="flex ml-2">
          <button onClick={() => openModal("edit", task)} className="mr-1">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5">
              <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487Zm0 0L19.5 7.125" />
            </svg>
          </button>
          
          <button onClick={() => handleDeleteTask(task.id)}>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5">
              <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
            </svg>
          </button>
        </div>
      </div>
      <p className="text-xs">{task.description}</p>
    </div>
  );

  // Function to render a time-of-day section
  const renderTimeSection = (title, tasks, icon) => (
    <div className="flex flex-col justify-start bg-white w-full border rounded-lg py-6 px-4 gap-4 mb-6">
      <div className="flex flex-col gap-3">
        <div className="flex flex-row h-8 space-x-2 items-center">
          {icon}
          <p className="text-2xl font-bold">{title}</p>
        </div>
        <p className="text-xs text-gray-500 font-medium">{tasks.filter(task => !task.completed).length} active tasks</p>
      </div>
      
      <div className="flex flex-col gap-6">
        {tasks.length > 0 ? (
          tasks.map(renderTask)
        ) : (
          <p className="text-sm text-gray-400 italic">No tasks for this time period</p>
        )}
      </div>
    </div>
  );
  
  return (
    <div className="flex flex-col w-full p-4 md:p-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col md:flex-row w-full justify-between items-start md:items-center mb-8">
        <div className="flex flex-col justify-start mb-4 md:mb-0">
          <h1 className="text-3xl font-bold">Daily Tasks</h1>
          <p className="text-base text-gray-500 font-medium">{completedCount} of {tasks.length} tasks completed </p>
        </div>
        <div>
          <button
            onClick={() => openModal("add")}
            className="newTaskButton bg-black text-white px-4 py-2 rounded-lg"
          >
            Add New Task
          </button>
        </div>
      </div>

      {/* Task Lists */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Morning Section */}
        {renderTimeSection("Morning", morningTasks, 
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v2.25m6.364.386-1.591 1.591M21 12h-2.25m-.386 6.364-1.591-1.591M12 18.75V21m-4.773-4.227-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z" />
          </svg>
        )}
        
        {/* Afternoon Section */}
        {renderTimeSection("Afternoon", afternoonTasks,
          <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M8 22H16" stroke="#000000" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
            <path d="M5 19H19" stroke="#000000" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
            <path d="M2 16H22" stroke="#000000" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
            <path d="M10 6.34141C10.6256 6.12031 11.2987 6 12 6C15.3137 6 18 8.68629 18 12C18 13.5217 17.4335 14.911 16.5 15.9687H7.5C6.56645 14.911 6 13.5217 6 12C6 11.2987 6.12031 10.6256 6.34141 10" stroke="#000000" strokeWidth="1.5" strokeLinecap="round"></path>
            <path d="M12 2V3" stroke="#000000" strokeWidth="1.5" strokeLinecap="round"></path>
            <path d="M22 12L21 12" stroke="#000000" strokeWidth="1.5" strokeLinecap="round"></path>
            <path d="M3 12L2 12" stroke="#000000" strokeWidth="1.5" strokeLinecap="round"></path>
            <path d="M19.0708 4.92969L18.678 5.32252" stroke="#000000" strokeWidth="1.5" strokeLinecap="round"></path>
            <path d="M5.32178 5.32227L4.92894 4.92943" stroke="#000000" strokeWidth="1.5" strokeLinecap="round"></path>
          </svg>
        )}
        
        {/* Evening Section */}
        {renderTimeSection("Evening", eveningTasks,
          <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M21.0672 11.8568L20.4253 11.469L21.0672 11.8568ZM12.1432 2.93276L11.7553 2.29085V2.29085L12.1432 2.93276ZM21.25 12C21.25 17.1086 17.1086 21.25 12 21.25V22.75C17.9371 22.75 22.75 17.9371 22.75 12H21.25ZM12 21.25C6.89137 21.25 2.75 17.1086 2.75 12H1.25C1.25 17.9371 6.06294 22.75 12 22.75V21.25ZM2.75 12C2.75 6.89137 6.89137 2.75 12 2.75V1.25C6.06294 1.25 1.25 6.06294 1.25 12H2.75ZM15.5 14.25C12.3244 14.25 9.75 11.6756 9.75 8.5H8.25C8.25 12.5041 11.4959 15.75 15.5 15.75V14.25ZM20.4253 11.469C19.4172 13.1373 17.5882 14.25 15.5 14.25V15.75C18.1349 15.75 20.4407 14.3439 21.7092 12.2447L20.4253 11.469ZM9.75 8.5C9.75 6.41182 10.8627 4.5828 12.531 3.57467L11.7553 2.29085C9.65609 3.5593 8.25 5.86509 8.25 8.5H9.75ZM12 2.75C11.9115 2.75 11.8077 2.71008 11.7324 2.63168C11.6686 2.56527 11.6538 2.50244 11.6503 2.47703C11.6461 2.44587 11.6482 2.35557 11.7553 2.29085L12.531 3.57467C13.0342 3.27065 13.196 2.71398 13.1368 2.27627C13.0754 1.82126 12.7166 1.25 12 1.25V2.75ZM21.7092 12.2447C21.6444 12.3518 21.5541 12.3539 21.523 12.3497C21.4976 12.3462 21.4347 12.3314 21.3683 12.2676C21.2899 12.1923 21.25 12.0885 21.25 12H22.75C22.75 11.2834 22.1787 10.9246 21.7237 10.8632C21.286 10.804 20.7293 10.9658 20.4253 11.469L21.7092 12.2447Z" fill="#000000"></path>
          </svg>
        )}
      </div>

      {/* Modal */}
      <Modal 
        isOpen={modalOpen} 
        onClose={() => setModalOpen(false)} 
        title={modalContent.title}>
        {modalContent.type === "view" ? (
          <>
            <p className="text-[12px] font-light mt-5">Title</p>  <p className="text-[12px] font-semibold mb-3">{currentTask.title}</p>
            <p className="text-[12px] font-light">Time of Day</p> <p className="text-[12px] font-semibold mb-3">{currentTask.timeOfDay}</p>
            <p className="text-[12px] font-light">Priority</p>
            <p
              className={`text-[12px] mt-1 py-1 px-5 rounded-full w-fit text-center mb-3 ${
                currentTask.priority === 'low'
                  ? 'text-blue-500 bg-blue-50'
                  : currentTask.priority === 'medium'
                  ? 'text-orange-700 bg-orange-50'
                  : 'text-red-500 bg-red-50'
              }`}
              
            >
              {currentTask.priority}
            </p>
            <p className="text-[12px] font-light">Description</p> <p className="text-[12px] font-semibold mb-3">{currentTask.description}</p>
            <p className="text-[12px] font-light">Status</p><p className="text-[12px] font-semibold mb-3">{currentTask.completed ? "Completed" : "Pending"}</p>
          </>
        ) : (
          <form className="mt-4" onSubmit={(e) => { e.preventDefault(); handleSaveTask(); }}>
            <div className="mb-4">
              <input
                type="text"
                placeholder="Task Title"
                className="w-full p-2 border rounded-lg mb-2"
                value={currentTask.title}
                onChange={(e) => setCurrentTask({ ...currentTask, title: e.target.value })}
                disabled={modalContent.type === "view"}
              />
            </div>
            
            <div className="mb-8">
              {/* <label className="block text-sm font-medium mb-1">Time of Day</label> */}
              <select
                className="w-full p-2 border rounded-lg"
                value={currentTask.timeOfDay}
                onChange={(e) => setCurrentTask({ ...currentTask, timeOfDay: e.target.value })}
                disabled={modalContent.type === "view"}
              >
                <option value="Morning">Morning</option>
                <option value="Afternoon">Afternoon</option>
                <option value="Evening">Evening</option>
              </select>
            </div>
            
            <div className="mb-8">
              {/* <label className="block text-sm font-medium mb-1">Priority</label> */}
              <select
                className="w-full p-2 border rounded-lg"
                value={currentTask.priority}
                onChange={(e) => setCurrentTask({ ...currentTask, priority: e.target.value })}
                disabled={modalContent.type === "view"}
              >
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
              </select>
            </div>

            <div className="mb-4">
              <textarea
                placeholder="Task Description"
                className="w-full p-2 border rounded-lg mb-2"
                value={currentTask.description}
                onChange={(e) => setCurrentTask({ ...currentTask, description: e.target.value })}
                disabled={modalContent.type === "view"}
                rows="3"
              ></textarea>
            </div>
            
            {modalContent.type !== "view" && (
              <button
                type="submit"
                className="bg-blue-500 text-white px-4 py-2 rounded-lg w-full"
              >
                Save Task
              </button>
            )}
          </form>
        )}
      </Modal>
    </div>
  );
}

export default App;