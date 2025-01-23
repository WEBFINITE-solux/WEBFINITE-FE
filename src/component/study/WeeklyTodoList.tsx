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
  const [isEditing, setIsEditing] = useState(false); // 수정 모드 상태
  const [todoToDelete, setTodoToDelete] = useState<number | null>(null); // 삭제할 todo 상태
  const [hoveredTodo, setHoveredTodo] = useState<number | null>(null); // 마우스 오버된 todo 상태

  const handleCheckboxChange = (id: number) => {
    const updatedTodos = todoList.map((todo) =>
      todo.todo_id === id ? { ...todo, is_completed: !todo.is_completed } : todo
    );
    setTodoList(updatedTodos); // 상태 업데이트
  };

  const handleDeleteTodo = (id: number) => {
    const updatedTodos = todoList.filter((todo) => todo.todo_id !== id);
    setTodoList(updatedTodos);
    setTodoToDelete(null); // 경고창 닫기
  };

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

  return (
    <div>
      <div className="top-group" style={{ display: "flex", justifyContent: "space-between", padding: "12px" }}>
        <p className="ai">투두 리스트</p>
        <div className="button-group">
          <button
            className="study-button"
            onClick={() => setIsEditing(!isEditing)}
            style={{ cursor: "pointer", padding: "6px 12px", background: "#4CAF50", color: "white", border: "none" }}
          >
            {isEditing ? "완료" : "수정하기"}
          </button>
        </div>
      </div>

      {Object.entries(groupedTodos).map(([weekKey, weekTodos]) => {
        const weekRange = formatDateRange(weekTodos[0].start_date, weekTodos[weekTodos.length - 1].end_date);

        return (
          <div key={weekKey}>
            <div style={{ borderBottom: "1px solid #C9CEFF", padding: "12px" }}>
              <h3 style={{ fontSize: "14px" }}>{weekRange}</h3>
            </div>

            <ul style={{ listStyle: "none", padding: 0 }}>
              {weekTodos.map((todo) => (
                <div
                  key={todo.todo_id}
                  onMouseEnter={() => setHoveredTodo(todo.todo_id)}
                  onMouseLeave={() => setHoveredTodo(null)}
                  style={{
                    borderBottom: "1px solid #C9CEFF",
                    padding: "12px",
                    position: "relative",
                    transition: "transform 0.3s",
                    ...(isEditing && hoveredTodo === todo.todo_id ? { transform: "translateX(-50px)" } : {}),
                  }}
                >
                  <li
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
                      <span style={{ fontSize: "14px" }}>{todo.todo_content}</span>
                    </div>
                    <span style={{ fontSize: "12px", color: "#888" }}>
                      {new Date(todo.start_date).toLocaleTimeString("en-US", {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </span>
                    {isEditing && hoveredTodo === todo.todo_id && (
                      <button
                        style={{
                          position: "absolute",
                          right: "10px",
                          background: "#FF6B6B",
                          color: "white",
                          border: "none",
                          cursor: "pointer",
                          padding: "6px 12px",
                        }}
                        onClick={() => setTodoToDelete(todo.todo_id)}
                      >
                        삭제
                      </button>
                    )}
                  </li>
                </div>
              ))}
            </ul>
          </div>
        );
      })}

      {todoToDelete !== null && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100vw",
            height: "100vh",
            background: "rgba(0, 0, 0, 0.5)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <div
            style={{
              background: "white",
              padding: "20px",
              borderRadius: "8px",
              textAlign: "center",
            }}
          >
            <p>정말 이 투두 리스트를 삭제하시겠습니까?</p>
            <div style={{ display: "flex", justifyContent: "space-around", marginTop: "12px" }}>
              <button
                style={{
                  background: "#FF6B6B",
                  color: "white",
                  border: "none",
                  cursor: "pointer",
                  padding: "6px 12px",
                }}
                onClick={() => handleDeleteTodo(todoToDelete)}
              >
                삭제
              </button>
              <button
                style={{
                  background: "#888",
                  color: "white",
                  border: "none",
                  cursor: "pointer",
                  padding: "6px 12px",
                }}
                onClick={() => setTodoToDelete(null)}
              >
                취소
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default WeeklyTodoList;
