import React, { useState } from "react";

interface Todo {
  todo_id: number;
  todo_content: string;
  is_completed: boolean;
  start_date: string;
  end_date: string;
  user_id: number;
}

interface WeeklyTodoListProps {
  todos: Todo[]; // 전달받는 todo 리스트
}

const WeeklyTodoList: React.FC<WeeklyTodoListProps> = ({ todos }) => {
  const [todoList, setTodoList] = useState(todos); // 상태로 관리

  const handleCheckboxChange = (id: number) => {
    const updatedTodos = todoList.map((todo) =>
      todo.todo_id === id ? { ...todo, is_completed: !todo.is_completed } : todo
    );
    setTodoList(updatedTodos); // 상태 업데이트
  };

  // 날짜 포맷 함수 (예: November 14-18)
  const formatDateRange = (startDate: string, endDate: string) => {
    const start = new Date(startDate);
    const end = new Date(endDate);
    const options: Intl.DateTimeFormatOptions = { month: "long", day: "numeric" };

    if (start.getMonth() === end.getMonth()) {
      return `${start.toLocaleDateString("en-US", options)} - ${end.toLocaleDateString("en-US", {
        day: "numeric",
      })}`;
    }
    return `${start.toLocaleDateString("en-US", options)} ~ ${end.toLocaleDateString("en-US", options)}`;
  };

  // 주간 TODO를 그룹화
  const groupedTodos = todoList.reduce((acc, todo) => {
    const startDate = new Date(todo.start_date);
    const weekKey = `${startDate.getFullYear()}-${startDate.getMonth()}-${Math.ceil(
      startDate.getDate() / 7
    )}`; // 주간 키 생성

    if (!acc[weekKey]) {
      acc[weekKey] = [];
    }
    acc[weekKey].push(todo);
    return acc;
  }, {} as Record<string, Todo[]>);

  // 렌더링
  return (
    <div>
      {Object.entries(groupedTodos).map(([weekKey, weekTodos]) => {
        const weekRange = formatDateRange(weekTodos[0].start_date, weekTodos[weekTodos.length - 1].end_date);

        return (
          <div key={weekKey}>
            <div style={{borderBottom:"1px solid #C9CEFF", padding: "12px"}}>
                <h3 style={{ fontSize: "14px"}}>{weekRange}</h3>
            </div>
            
                <ul style={{ listStyle: "none" }}>
                {weekTodos.map((todo) => (
                    <div style={{borderBottom:"1px solid #C9CEFF", padding: "12px"}}>
                        <li
                        key={todo.todo_id}
                        style={{
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                        }}
                        >
                        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                            <input
                            type="checkbox"
                            checked={todo.is_completed}
                            onChange={() => handleCheckboxChange(todo.todo_id)}
                            style={{ cursor: "pointer" }}
                            />
                            <span
                            style={{
                                fontSize: "14px",
                            }}
                            >
                            {todo.todo_content}
                            </span>
                        </div>
                        <span style={{ fontSize: "12px", color: "#888" }}>
                            {new Date(todo.start_date).toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" })}
                        </span>
                        </li>
                    </div>
                ))}
                </ul>
            
          </div>
        );
      })}
    </div>
  );
};

export default WeeklyTodoList;
