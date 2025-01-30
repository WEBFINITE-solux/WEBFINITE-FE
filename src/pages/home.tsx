import React, { useState, useEffect } from 'react';
import './../styles/home.css';
import StudyPlanHome from '../component/home/StudyPlanHome';
import LearningProgress from '../component/home/LearningProgress';
import TodoListHome from '../component/home/TodoListHome';
import NoDataComponent from '../component/NoDataComponent';
import QuizList from '../component/home/QuizList';
import TimeTableHomeTest from '../component/home/TimeTableHomeTest';

interface StudyPlan {
  prompt_text: string;
  learning_plan: {
    plan_id: number;
    week: number;
    plan_title: string;
    plan_description: string;
  }[];
}

const Home: React.FC = () => {
  const userId = 1; // 실제 로그인된 유저 ID 적용 필요
  const [name, setName] = useState('testName');
  const [introduction, setIntroduction] = useState("testIntroduction");
  const [img, setImg] = useState("img1");
  const [profileId, setProfileId] = useState();

  const [studyPlan, setStudyPlan] = useState<StudyPlan | null>(null);
  const [loadingStudyPlan, setLoadingStudyPlan] = useState(true);
  const [showImg, setShowImg] = useState(false);
  const openChatGPT = () => {
    window.open('https://chatgpt.com/');
  };
  useEffect(() => {
    const fetchProfile = async () => {
      try{
        const response = await fetch(`https://d291-58-29-179-25.ngrok-free.app/profile/${userId}`,{
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "Accept": "application/json",
            "ngrok-skip-browser-warning": "true"
          },
        });
        if (!response.ok) {
          throw new Error(`HTTP 오류 발생: ${response.status}`);
        }
        const data = await response.json();
        setName(data.nickname);
        setIntroduction(data.introduction);
        setImg(data.icon);
        setProfileId(data.profileId);
      } catch (e: unknown) {
        if (e instanceof Error) {
          console.error('Error fetching study plan:', e.message);
        }
      }
    }
    const fetchStudyPlan = async () => {
      try {
        setLoadingStudyPlan(true);
        const response = await fetch(`https://d291-58-29-179-25.ngrok-free.app/plan/${userId}`,{
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "Accept": "application/json",
            "ngrok-skip-browser-warning": "true"
          },
        }); 
        if (!response.ok) {
          throw new Error(`HTTP 오류 발생: ${response.status}`);
        }
        const data = await response.json();
        setStudyPlan(data);
      } catch (e: unknown) {
        if (e instanceof Error) {
          console.error('Error fetching study plan:', e.message);
        }
      } finally {
        setLoadingStudyPlan(false);
      }
    };
    
    fetchProfile();
    fetchStudyPlan();
  }, []);

  const handleChangeProfileImage = async (newImg: string) => {
    setImg(newImg); // 먼저 UI 상태 변경
  
    if (!profileId) {
      console.error("프로필 ID가 없습니다.");
      return;
    }
  
    try {
      console.log(`이미지 값 ${newImg}`)
      const response = await fetch(`https://d291-58-29-179-25.ngrok-free.app/profile/${profileId}/image`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json",
          "ngrok-skip-browser-warning": "true",
        },
        body: JSON.stringify({ icon: newImg }),
      });
  
      if (!response.ok) {
        throw new Error(`HTTP 오류 발생: ${response.status}`);
      }
  
      console.log("프로필 이미지가 성공적으로 저장되었습니다!");

    } catch (error) {
      console.error("프로필 이미지 저장 실패:", error);
    }
  };

  return (
    <div className="home">
      <div className="left">
        <div className="home-title">
          <p className="titletext">Hello, {name}.</p>
        </div>
        <div style={{ display: 'flex', gap: '20px' }}>
          <div>
            <p className="text">오늘의 할 일</p>
            <div
              className="table"
              style={{ height: '200px', width: '680px' }}
            >
              {<TodoListHome />}
            </div>
          </div>
          <div>
            <p className="text">학습 달성률</p>
            <div className="table" style={{ height: '200px', width: '350px' }}>
              <div style={{ height: '200px', width: '350px'}}>
                <div style={{display: "flex", justifyContent: "space-between", padding: "5px 20px"}}>
                  <p style={{fontWeight: "bold", fontSize: "10px"}}>Per week</p>
                  <p style={{color: "#6A6A6A", fontSize: "10px"}}>7days</p>
                </div>
                <LearningProgress userId={userId} />
              </div>
              
            </div>
          </div>
        </div>

        <div>
          <div>
            <p className="text">학습 계획</p>
          </div>
          <div
            className="table"
            style={{ width: '1050px', height: '270px', overflowY: 'auto' }}
          >
            {loadingStudyPlan ? (
              <p>Loading...</p>
            ) : studyPlan && studyPlan.learning_plan && studyPlan.learning_plan.length > 0 ? (
              <StudyPlanHome studyPlan={studyPlan} />
            ) : (
              <NoDataComponent />
            )}
          </div>
        </div>
        <div style={{ display: 'flex', flexDirection: 'row-reverse' }}>
          <button onClick={openChatGPT} className="gpt">
            <img
              src="/GotoChatGPT.png"
              alt="Go To ChatGPT"
              style={{ width: '130px' }}
            />
          </button>
        </div>
      </div>

      <div className="right">
        <div
          className="table"
          style={{ height: '730px', padding: '15px', fontWeight: 'bold' }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <p>마이페이지</p>
          </div>
          <div style={{ textAlign: 'center' }}>
            <img src={`/${img}.png`} alt="Profile" style={{width: "120px", margin: "10px"}}/>
            <div style={{display: "flex", justifyContent: "center"}}>
              <p>{name}</p>
              <button style={{padding: "0px 7px"}} onClick={() => setShowImg(true)}>
                <img src='/profileImgChange.png'></img>
              </button>
            </div>
            {showImg && (
              <div>
                <div style={{
                  position: "absolute",
                  zIndex: "20",
                  left:"1450px",
                  backgroundImage: "url('/imgSelectBackground.png')",
                  backgroundSize: "cover",
                  width: "450px",
                  height: "146px",
                }}>
                  <p style={{fontWeight: "bold", textAlign: "left", marginTop: "20px", marginLeft: "20px"}}>프로필 사진</p>
                  <div style={{
                    display: "flex",
                    justifyContent: "space-evenly"
                  }}>
                    <button onClick={() => {handleChangeProfileImage("img1"), setShowImg(false)}} style={{padding: "0px", backgroundColor : "rgba(0,0,0,0)", border: "none", borderRadius: "100px", height: "80px", width: "80px"}}>
                      <img src='/img1.png' style={{height: "80px"}}></img>
                    </button>
                    <button onClick={() => {handleChangeProfileImage("img2"), setShowImg(false)}} style={{padding: "0px", backgroundColor : "rgba(0,0,0,0)", border: "none", borderRadius: "100px", height: "80px", width: "80px"}}>
                      <img src='/img2.png' style={{height: "80px"}}></img>
                    </button>
                    <button onClick={() => {handleChangeProfileImage("img3"), setShowImg(false)}} style={{padding: "0px", backgroundColor : "rgba(0,0,0,0)", border: "none", borderRadius: "100px", height: "80px", width: "80px"}}>
                      <img src='/img3.png' style={{height: "80px"}}></img>
                    </button>
                    <button onClick={() => {handleChangeProfileImage("img4"), setShowImg(false)}} style={{padding: "0px", backgroundColor : "rgba(0,0,0,0)", border: "none", borderRadius: "100px", height: "80px", width: "80px"}}>
                      <img src='/img4.png' style={{height: "80px"}}></img>
                    </button>
                    <button onClick={() => {handleChangeProfileImage("img5"), setShowImg(false)}} style={{padding: "0px", backgroundColor : "rgba(0,0,0,0)", border: "none", borderRadius: "100px", height: "80px", width: "80px"}}>
                      <img src='/img5.png' style={{height: "80px"}}></img>
                    </button>
                  </div>
                  

                </div>
                <div style={{
                  position: "absolute",
                  top: "100px",
                  left: "1470px",
                  backgroundColor: "rgba(0, 0, 0, 0.50)",
                  width: "400px",
                  height: "730px",
                  borderRadius: "25px",
                  zIndex: "10"
                }}>
                </div>
              </div>
            )}
            <p style={{ fontWeight: 'normal', color: "#747474" }}>{introduction}</p>
          </div>
          <div>
            <p>시간표</p>
            <div style={{
              width: "370px", height: "200px", overflowY: "auto", marginBottom: "15px"
            }}><TimeTableHomeTest/></div>
            <p>퀴즈</p>
            <div style={{
              backgroundColor: "#F5F6FB",
              borderRadius: "25px",
              padding: "5px",
              height: "200px",
              overflowY: "auto"
            }}>
              <QuizList userId = {userId}/>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
