import React, { useState, useEffect } from "react";
import "./../../styles/study.css"

interface Todo {
    todo_id: number;
    todo_content: string;
    is_completed: boolean;
    start_date: string;
    end_date: string;
    user_id: number;
}

const TodoListHome: React.FC = () => {
    const userId = 1;
    const [todoList, setTodoList] = useState<Todo[]>([]);
    const [loading, setLoading] = useState(true);

    

    useEffect(() => {
        const fetchToDoList = async () => {
                try {
                    setLoading(true);
                    const response = await fetch(
                    `https://d291-58-29-179-25.ngrok-free.app/todo/user/${userId}`,
                    {
                        method: "GET",
                        headers: {
                        "Content-Type": "application/json",
                        "Accept": "application/json",
                        "ngrok-skip-browser-warning": "true",
                        },
                    }
                    );

                    if (!response.ok) {
                    throw new Error(`HTTP 오류 발생: ${response.status}`);
                    }

                    const data = await response.json();
                    setTodoList(data);
                } catch (error) {
                    console.error("할 일 목록 가져오기 실패:", error);
                } finally {
                    setLoading(false);
                }
            };
        fetchToDoList();
    }, []);

    const groupedTodos = todoList.reduce((acc, todo) => {
        const startDate = new Date(todo.start_date).toLocaleDateString("en-US", {
          month: "long",
          day: "numeric",
        });
        if (!acc[startDate]) {
          acc[startDate] = [];
        }
        acc[startDate].push(todo);
        return acc;
      }, {} as Record<string, Todo[]>);
    
    
    return(
        <div className="todo-section-home">
        {loading ? (
          <p>로딩 중...</p>
        ) : (
          Object.entries(groupedTodos).map(([startDate, todos]) => (
            <div key={startDate}>
              <div style={{ padding: "12px" }}>
                <h3 style={{ fontSize: "14px" }}>{startDate}</h3>
              </div>
              <div style={{ borderBottom: "1px solid #C9CEFF" }}></div>

              <ul style={{ listStyle: "none", padding: 0 }}>
                {todos.map((todo) => (
                  <div key={todo.todo_id}>
                    <div
                      style={{
                        padding: "12px",
                        position: "relative",
                        transition: "transform 0.3s",
                      }}
                    >
                      <li
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                        }}
                      >
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            gap: "10px",
                          }}
                        >
                          <input
                            type="checkbox"
                            checked={todo.is_completed}
                            onChange={() => console.log("완료 상태 변경")}
                            style={{ cursor: "pointer" }}
                          />
                          <span style={{ fontSize: "14px" }}>
                            {todo.todo_content}
                          </span>
                        </div>
                        <span style={{ fontSize: "12px", color: "#888" }}>
                          {new Date(todo.start_date).toLocaleTimeString(
                            "en-US",
                            {
                              hour: "2-digit",
                              minute: "2-digit",
                            }
                          )}
                        </span>
                      </li>
                    </div>
                    <div style={{ borderBottom: "1px solid #C9CEFF" }}></div>
                  </div>
                ))}
              </ul>
            </div>
          ))
        )}
      </div>
    )
}

export default TodoListHome;