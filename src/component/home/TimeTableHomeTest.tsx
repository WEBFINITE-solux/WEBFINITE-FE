import React, { useState, useEffect } from 'react';

interface Schedule {
    location: string;
    end_time: string;
    start_time: string;
    day: string;
}

interface Course {
    course_id: number;
    title: string;
    schedule: Schedule[];
    color: string;
}

interface CourseResponse {
    courses: Course[];
}

const days = ["MON", "TUE", "WED", "THU", "FRI"];
const hours = Array.from({ length: 10 }, (_, i) => i + 9);

const TimetableHomeTest: React.FC = () => {
    const userId = 1;
    const [courses, setCourses] = useState<Course[]>([]);

    useEffect(() => {
        const fetchCourses = async () => {
            try {
                const response = await fetch(`https://d291-58-29-179-25.ngrok-free.app/course/table/${userId}/2024/1`, {
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
                const data: CourseResponse = await response.json();
                setCourses(data?.courses && Array.isArray(data.courses) ? data.courses : []);
                console.log("시간표 데이터 불러오기 성공", data?.courses);
            } catch (error) {
                console.error("시간표 데이터 불러오기 실패", error);
                setCourses([]); // API 호출 실패 시 빈 배열 설정
            }
        };

        fetchCourses();
    }, [userId]);

    return (
        <div style={{ width: '100%', overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'center' }}>
                <thead>
                    <tr>
                        <th></th>
                        {days.map((day) => (
                            <th key={day} style={{ width: "62px" }}>{day}</th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {hours.map((hour) => (
                        <tr key={hour}>
                            <td style={{ border: '1px solid #ddd', padding: '5px', fontWeight: 'bold' }}>{hour}</td>
                            {days.map((day) => (
                                <td key={day} style={{ border: '1px solid #ddd', padding: '0px', minHeight: '50px', position: 'relative' }}>
                                    {courses?.length > 0 ? (
                                        courses.map((course) =>
                                            course.schedule.map((slot, index) => {
                                                const startHour = parseInt(slot.start_time.split(':')[0], 10);
                                                const endHour = parseInt(slot.end_time.split(':')[0], 10);

                                                if (startHour === hour && slot.day === day) {
                                                    return (
                                                        <div
                                                            key={`${course.course_id}-${index}`}
                                                            style={{
                                                                backgroundColor: course.color,
                                                                padding: '5px',
                                                                borderRadius: '4px',
                                                                textAlign: 'center',
                                                                fontSize: '12px',
                                                                margin: '2px 0',
                                                                position: 'absolute',
                                                                width: '100%',
                                                                height: `${(endHour - startHour) * 50}px`,
                                                                top: 0,
                                                                left: 0,
                                                            }}
                                                        >
                                                            <div style={{ fontSize: "10px" }}>{course.title}</div>
                                                        </div>
                                                    );
                                                }
                                                return null;
                                            })
                                        )
                                    ) : (
                                        <span style={{ color: "#aaa", fontSize: "12px" }}>No Data</span>
                                    )}
                                </td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default TimetableHomeTest;
