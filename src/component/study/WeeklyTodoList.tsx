import React, { useState, useEffect } from "react";
import "./../../styles/study.css";

interface Todo {
  todo_id: number;
  todo_content: string;
  is_completed: boolean;
  start_date: string;
  end_date: string;
  user_id: number;
}

const WeeklyTodoList: React.FC = () => {
  const userId = 1;
  const [todoList, setTodoList] = useState<Todo[]>([]);
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [showAddForm, setShowAddForm] = useState(false);
  const [newTodo, setNewTodo] = useState("");
  const [hoveredTodo, setHoveredTodo] = useState<number | null>(null);
  const [todoToDelete, setTodoToDelete] = useState<number | null>(null); // 삭제할 항목 저장

  const [selectedDate, setSelectedDate] = useState(""); // ✅ 날짜 상태 추가
  const [selectedTime, setSelectedTime] = useState(""); // ✅ 시간 상태 추가
  const [showDatePicker, setShowDatePicker] = useState(false); // ✅ 날짜 선택창 보이기/숨기기
  const [showTimePicker, setShowTimePicker] = useState(false); // ✅ 시간 선택창 보이기/숨기기

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

  useEffect(() => {
    fetchToDoList();
  }, []);

  const handleDeleteTodo = async () => {
    if (todoToDelete === null) return;

    try {
      const response = await fetch(
        `https://de8b-58-29-179-25.ngrok-free.app/todo/${todoToDelete}`,
        {
          method: "DELETE",
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

      fetchToDoList();
      setTodoToDelete(null); // 모달 닫기
    } catch (error) {
      console.error("할 일 삭제 실패:", error);
    }
  };

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

  const toggleTodoCompletion = async (todoId: number, isCompleted: boolean) => {
    try {
      const response = await fetch(
        `https://d291-58-29-179-25.ngrok-free.app/todo/${todoId}/complete?isCompleted=${!isCompleted}`,
        {
          method: "PATCH",
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

      console.log(`✅ 할 일 ${todoId} 완료 상태 변경 성공!`);
      fetchToDoList(); // ✅ 최신 데이터 불러오기
    } catch (error) {
      console.error("할 일 완료 상태 변경 실패:", error);
    }
  };
  const handleSaveTodo = async () => {
    if (!newTodo.trim()) {
      alert("할 일을 입력해주세요!");
      return;
    }
    if (!selectedDate || !selectedTime) {
      alert("날짜와 시간을 선택해주세요!");
      return;
    }
  
    // 날짜와 시간을 조합하여 ISO 포맷 생성
    const formattedDateTime = `${selectedDate}T${selectedTime}:00`;
  
    const todoData = {
      user_id: userId,
      todo_content: newTodo,
      is_completed: false,
      start_date: formattedDateTime,
      end_date: formattedDateTime, // 시작과 끝이 같음
    };
  
    try {
      const response = await fetch(`https://d291-58-29-179-25.ngrok-free.app/todo`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json",
          "ngrok-skip-browser-warning": "true",
        },
        body: JSON.stringify(todoData),
      });
  
      if (!response.ok) {
        throw new Error(`HTTP 오류 발생: ${response.status}`);
      }
  
      console.log("✅ 할 일 추가 성공!");
      fetchToDoList(); // ✅ 최신 투두 리스트 불러오기
      setShowAddForm(false); // ✅ 추가 폼 닫기
      setNewTodo(""); // ✅ 입력 필드 초기화
      setSelectedDate(""); // ✅ 날짜 초기화
      setSelectedTime(""); // ✅ 시간 초기화
    } catch (error) {
      console.error("❌ 할 일 추가 실패:", error);
    }
  };
  

  return (
    <div>
      <div className="top-group">
        <p className="ai">투두 리스트</p>
        <div className="button-group">
          <button
            className="study-button"
            onClick={() => setIsEditing(!isEditing)}
          >
            {isEditing ? "삭제 완료" : "삭제하기"}
          </button>
          <button className="study-button" onClick={() => setShowAddForm(true)}>
            추가하기
          </button>
        </div>
      </div>

      {/* 투두 리스트 */}
      <div className="todo-section">
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
                      onMouseEnter={() => setHoveredTodo(todo.todo_id)}
                      onMouseLeave={() => setHoveredTodo(null)}
                      style={{
                        padding: "12px",
                        position: "relative",
                        transition: "transform 0.3s",
                        ...(isEditing && hoveredTodo === todo.todo_id
                          ? { transform: "translateX(-50px)" }
                          : {}),
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
                            onChange={() => toggleTodoCompletion(todo.todo_id, todo.is_completed)}
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
                    <div style={{ borderBottom: "1px solid #C9CEFF" }}></div>
                  </div>
                ))}
              </ul>
            </div>
          ))
        )}
      </div>
      {showAddForm && (
        <>
        <div style={{
          position: "absolute",
          zIndex: "20",
          top : "675px",
          height: "150px",
          width: "700px",
          backgroundColor: "white",
          borderRadius: "25px",
          filter: "drop-shadow(0px -5px 5px rgba(0, 0, 0, 0.05))"
        }}>
          <div style={{display: "flex", justifyContent: "space-between", padding: "10px", borderBottom: "1px solid black"}}>
            <div style={{display: "flex", gap: "20px",}} >
              <button 
              onClick={() => setShowDatePicker(!showDatePicker)}
              style={{padding:"0px", display: "flex", alignItems: "center"}}>
                <img src="/calendar.png" style={{width: "30px"}}></img>
                <p style={{fontSize: "15px", fontWeight:"bold"}}>날짜</p>
              </button>
              <button 
              onClick={() => setShowTimePicker(!showTimePicker)}
              style={{padding:"0px", display: "flex", alignItems: "center"}}>
                <img src="/clock.png" style={{width: "30px"}}></img>
                <p style={{fontSize: "15px", fontWeight:"bold"}}>시간</p>
              </button>
            </div>
            <button className="study-button" onClick={handleSaveTodo}>
            저장하기
            </button>
          </div>
          {/* ✅ 날짜 선택창 */}
          {showDatePicker && (
            <input
              type="date"
              value={selectedDate}
              onChange={(e) => {
                setSelectedDate(e.target.value);
                setShowDatePicker(false); // 선택 후 창 닫기
              }}
              style={{
                position: "absolute",
                top: "50px",
                left: "20px",
                zIndex: "100",
                padding: "5px",
              }}
            />
          )}

          {/* ✅ 시간 선택창 */}
          {showTimePicker && (
            <input
              type="time"
              value={selectedTime}
              onChange={(e) => {
                setSelectedTime(e.target.value);
                setShowTimePicker(false); // 선택 후 창 닫기
              }}
              style={{
                position: "absolute",
                top: "50px",
                left: "150px",
                zIndex: "100",
                padding: "5px",
              }}
            />
          )}

          <textarea 
          placeholder= "투두 리스트를 추가해보세요." 
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
          style={{width: "700px", border: "none", outline: "none", backgroundColor: "transparent", fontSize:"20px"}}>
          </textarea>
        </div>
        </>
      )
        
      }
      {/* 삭제 확인 모달 */}
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
            <div
              style={{
                display: "flex",
                justifyContent: "space-around",
                marginTop: "12px",
              }}
            >
              <button
                style={{
                  background: "#FF6B6B",
                  color: "white",
                  border: "none",
                  cursor: "pointer",
                  padding: "6px 12px",
                }}
                onClick={handleDeleteTodo}
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
