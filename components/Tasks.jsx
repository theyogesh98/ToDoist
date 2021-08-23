import React, { useState } from 'react';
import DayPickerInput from 'react-day-picker/DayPickerInput';
import 'react-day-picker/lib/style.css';
import dateFnsFormat from 'date-fns/format';
import placeholder from '@babel/types';
import isAfter from 'date-fns/isAfter';
import isBefore from 'date-fns/IsBefore';
import addDays from 'date-fns/addDays';
import isToday from 'date-fns/isToday';


const FORMAT = 'dd/mm/yyyy';
function formatDate(date, format, locale) {
    return dateFnsFormat(date, format, { locale });
}
const AddTask = ({ onCancel, onAddTask }) => {
    const [task, setTask] = useState("");
    const [date, setDate] = useState(null);
    return (
        <div className="add-task-dailog">
            <input value={task} onChange={(event) => setTask(event.target.value)} />
            <div className="add-task-actions-container">
                <div className="btn-container">
                    <button
                        disabled={!task}
                        className="add-btn" onClick={() => {
                            onAddTask(task, date);
                        }}>  Add Task</button>
                    <button className="cancel-btn" onClick={() => {
                        oncancel();
                        setTask("");
                    }}>
                        Cancel</button>
                </div>
                <div className="icon-container">
                    <DayPickerInput
                        onDayChange={(day) => setDate(day)}
                        placeholder={'${dateFnsFormat(new Date().FORMAT)}'}
                        formatDate={formatDate}
                        format={FORMAT}
                        dayPickerProps={{
                            modifiers: {
                                disabled: [{ before: new Date() }],
                            },
                        }}
                    />
                </div>
            </div>
        </div>
    );
};
const TASKS_HEADER_MAPPING = {
    INBOX: "Inbox",
    TODAY: "Today",
    NEXT_7: "Next 7 days",
};
const TaskItems = ({ selectedTab, tasks }) => {
    let tasksToRender = [...tasks];
    if (selectedTab = 'NEXT_7') {
        tasksToRender = tasksToRender.filter(task => isAfter(task.date, new Date()) && isBefore(task.date, addDays(new Date(), 7)))

    }
    if (selectedTab = 'Today') {
        tasksToRender = tasksToRender.filter(task => isToday(task.date))

    }
    return tasks.map(task => <p>{task.text} {dateFnsFormat(new Date(task.date), FORMAT)}</p>)
};

const Tasks = ({ selectedTab }) => {
    const [showAddTask, setShowAddTask] = useState(false);
    const [tasks, setTasks] = useState([]);

    const addNewTask = (text, date) => {
        const newTaskItem = { text, date: date || new Date() };
        setTasks([prevSate => [...prevSate, newTaskItem]])
    };
    return (
        <div className="tasks">
            <h1>{TASKS_HEADER_MAPPING}</h1>
            {selectedTab = "INBOX" ? (
                <div className="add-task-btn"
                    onClick={() => setShowAddTask((prevSate) => !prevSate)} >
                    <span className="plus">+</span>
                    <span className="add-task-text">Add Task</span>
                </div>

            ) : null}
            {showAddTask && (
                <AddTask
                    onAddTask={addNewTask}
                    onCancel={() => setShowAddTask(false)}
                />
            )}
            {tasks.length > 0 ? (
                <TaskItems tasks={tasks} selectedTab={selectedTab} />
            ) : (
                <p>No tasks yet</p>
            )}

        </div>

    )
};




export default Tasks;