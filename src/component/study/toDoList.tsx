import React from "react";

interface ToDoProps {
  task: {
    id: number;
    task: string;
    time: string;
    checked: boolean;
  };
  onCheck: () => void;
}

const ToDoList: React.FC<ToDoProps> = ({ task, onCheck }) => {
  return (
    <div style={{ height: '50px', display: 'flex', alignItems: 'center' }}>
      <input
        type="checkbox"
        style={{ marginRight: '10px' }}
        checked={task.checked}
        onChange={onCheck}
      />
      <p style={{ flex: 1, margin: 0 }}>{task.task}</p>
      <p style={{ margin: 0 }}>{task.time}</p>
    </div>
  );
};

export default ToDoList;
