import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { IonPage, IonContent } from "@ionic/react";
import { Brain, Target, User, Settings } from "lucide-react";
import { useUser } from "../context/UserContext";
import {
  getStudents,
  getSessionsWithTherapist,
  getSessionsDetails,
} from "../api/userApis";
import {
  AllProgramsAndTargets,
  ProgramInfo,
  SessionInfo,
} from "../types/utils";
import { useTarget } from "../context/TargetContext";
import { Header } from "../components/Header";

interface SessionItem {
  client: string;
  time: string;
  duration: string;
  type: string;
  targets: number;
  behaviors: number;
  image: string;
  imageError?: boolean;
}
const DashboardPage: React.FC = () => {
  const { user, students, setStudents, curStudent, setCurStudent } = useUser();
  const { setPrograms, setSession } = useTarget();
  const [sessions, setSessions] = useState<SessionItem[]>([]);
  const [schedule, setSchedule] = useState<SessionInfo[]>([]);
  const [expandedSession, setExpandedSession] = useState<{
    sessionInfo: SessionInfo;
    sessionIndex: number;
  } | null>(null);
  const [allProgramsAndTargets, setAllProgramsAndTargets] =
    useState<AllProgramsAndTargets | null>(null);

  const router = useHistory();

  const getStudentDetails = async (id: string) => {
    getStudents(id).then((response) => {
      setStudents(response);
      console.log("----------First Step: getStudentDetails(user.id)----------");
      console.log({ students: response });
    });
  };

  useEffect(() => {
    const sessions = localStorage.getItem("sessions");
    const schedule = localStorage.getItem("schedule");
    const student = localStorage.getItem("curStudent");
    const expandedSessionData = localStorage.getItem("expandedSession");

    if (sessions && sessions.length > 0) setSessions(JSON.parse(sessions));
    if (schedule && schedule.length > 0) setSchedule(JSON.parse(schedule));
    if (student) setCurStudent(JSON.parse(student));
    if (expandedSessionData) {
      const parsedData = JSON.parse(expandedSessionData);
      setExpandedSession(parsedData);
      // Also fetch session details when restoring expanded state
      if (parsedData?.sessionInfo) {
        getSessionsDetails(
          parsedData.sessionInfo.id,
          parsedData.sessionInfo.student_id
        ).then((response) => {
          setAllProgramsAndTargets(response);
        });
      }
    }
  }, []);

  useEffect(() => {
    if (user?.id) {
      getStudentDetails(user?.id);
    }
  }, [user?.id]);

  useEffect(() => {
    if (students && students.length > 0) {
      const sessions = students.map((student) => ({
        client: student.first_name + " " + student.last_name,
        time: "11:30 AM",
        duration: "90 min",
        type: "Discrete Trial Training ",
        targets: student.target_counts ? student.target_counts : 0,
        behaviors: 0,
        image: "",
      }));
      setSessions(sessions);
      if (sessions && sessions.length > 0) {
        localStorage.setItem("sessions", JSON.stringify(sessions));
      }
    }
  }, [students]);

  const handleStudentClick = (index: number) => {
    if (students && students.length > 0) {
      setCurStudent(students[index]);
      localStorage.setItem("curStudent", JSON.stringify(students[index]));
      const student_id = students[index].id;
      const therapist_id = user?.id;

      if (therapist_id && student_id) {
        getSessionsWithTherapist(therapist_id, student_id.toString()).then(
          (response) => {
            console.log(response.sessions);
            const session_info: SessionInfo = response.sessions;
            const items: SessionInfo[] = [];
            items.push(session_info);
            setSchedule(items);
            localStorage.setItem("schedule", JSON.stringify(items));
            localStorage.setItem("session_info", JSON.stringify(session_info));
          }
        );
      }
    }
  };

  const handleStudentSettingClick = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    index: number
  ) => {
    e.stopPropagation();
    handleStudentClick(index);
    router.push("/sessionSetting");
  };

  const handleImageError = (index: number) => {
    setSessions((prevSessions) =>
      prevSessions.map((session, i) =>
        i === index ? { ...session, imageError: true } : session
      )
    );
  };

  const toggleSession = (item: SessionInfo, index: number) => {
    setSession(item);
    getSessionsDetails(item.id, item.student_id).then((response) => {
      localStorage.setItem("session_id", JSON.stringify(item.id));
      setAllProgramsAndTargets(response);
      if (response && Object.keys(response).length > 0) {
        localStorage.setItem("allProgramsAndTargets", JSON.stringify(response));
      }
      console.log(
        "----------Third Step: getSessionsDetails(session_id, item.student_id)----------"
      );
      console.log({ response });
    });
    setExpandedSession((prev) => {
      if (prev?.sessionInfo.id === item.id && prev?.sessionIndex === index) {
        localStorage.removeItem("expandedSession");
        return null;
      }
      const expandedSessionData = { sessionInfo: item, sessionIndex: index };
      localStorage.setItem(
        "expandedSession",
        JSON.stringify(expandedSessionData)
      );
      return expandedSessionData;
    });
  };

  const handleProgramAndTargetClick = (
    program: ProgramInfo[],
    treatment_step: string
  ) => {
    console.log(
      "------------Fourth Step: handleProgramAndTargetClick(programs)------------"
    );
    console.log({ program });
    localStorage.setItem("treatment_step", treatment_step);
    setPrograms(program);
    router.push("/session");
  };

  return (
    <IonPage>
      <IonContent className="ion-padding">
        <div className="h-screen flex flex-col">
          <Header studentName="Dashboard" />
          <div className="flex flex-row flex-1 overflow-hidden">
            <aside className="w-[30%] bg-gray-100 p-1 overflow-y-auto">
              <div className="bg-white rounded-lg shadow-sm">
                <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
                  <h3 className="text-lg font-semibold text-gray-900">
                    Students list
                  </h3>
                </div>
                <div className="p-6">
                  <div className="space-y-4">
                    {sessions.map((session, index) => (
                      <div
                        key={index}
                        className="bg-gray-50 rounded-lg p-4 cursor-pointer hover:bg-gray-100 transition-colors"
                        onClick={() => handleStudentClick(index)}
                      >
                        <div className="flex items-center gap-4">
                          <div className="w-14 h-14 rounded-lg overflow-hidden shadow-sm ring-1 ring-gray-200">
                            {session.imageError ? (
                              <div className="w-full h-full bg-gray-100 flex items-center justify-center">
                                <User className="h-8 w-8 text-gray-400" />
                              </div>
                            ) : (
                              <img
                                src={session.image}
                                alt={session.client}
                                className="w-full h-full object-cover"
                                onError={() => handleImageError(index)}
                              />
                            )}
                          </div>
                          <div className="flex-1">
                            <h4 className="font-medium text-gray-900">
                              {session.client}
                            </h4>
                            <p className="text-sm text-gray-500">
                              {session.type}
                            </p>
                            <div className="flex items-center gap-4 mt-1">
                              <div className="flex items-center gap-1 text-xs text-blue-600">
                                <Target className="h-3 w-3" />
                                <span>{session.targets} targets</span>
                              </div>
                            </div>
                          </div>
                          <div className="flex items-center">
                            <button
                              className="p-4 rounded-full hover:bg-gray-200 transition-colors"
                              onClick={(e) =>
                                handleStudentSettingClick(e, index)
                              }
                            >
                              <Settings className="h-10 w-10 text-gray-500" />
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </aside>
            <main className="flex-1 p-1 overflow-y-auto">
              <div className="bg-white rounded-lg shadow-sm">
                <div className="px-6 py-4 border-b border-gray-200">
                  <h3 className="text-lg font-semibold text-gray-900">
                    Session Schedule
                  </h3>
                </div>
                <div className="p-6">
                  <div>
                    {schedule.map((item, index) => (
                      <div key={index}>
                        <div className="space-y-3">
                          <div key={index}>
                            <div
                              className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer"
                              onClick={() => toggleSession(item, index)}
                            >
                              <div className="w-10 h-10 bg-[#2B4C7E] rounded-lg flex items-center justify-center text-white font-medium">
                                {curStudent?.first_name?.split(" ")[0][0]}
                                {curStudent?.last_name?.split(" ")[0][0]}
                              </div>
                              <div className="flex-1">
                                <h4 className="font-medium text-gray-900">
                                  {curStudent?.first_name}{" "}
                                  {curStudent?.last_name}.
                                </h4>
                                <div className="flex items-center gap-2 mt-1">
                                  <span className="text-sm text-gray-500">
                                    {item.created_at}
                                  </span>
                                  <span className="text-xs text-gray-400">
                                    •
                                  </span>
                                  <span className="text-sm text-gray-500">
                                    {/* {item.settings.advance_format} */}
                                  </span>
                                </div>
                                <div className="flex items-center gap-1 mt-1">
                                  <Brain className="h-3 w-3 text-[#2B4C7E]" />
                                  <span className="text-xs text-gray-500">
                                    {item.settings.advance_format}
                                  </span>
                                </div>
                              </div>
                              <div
                                className={`transform transition-transform ${
                                  expandedSession?.sessionInfo === item &&
                                  expandedSession?.sessionIndex === index
                                    ? "rotate-180"
                                    : ""
                                }`}
                              >
                                ▼
                              </div>
                            </div>
                            <div className="flex flex-col">
                              {expandedSession?.sessionInfo.id === item.id &&
                                expandedSession?.sessionIndex === index && (
                                  <div className="flex flex-row mt-2 ml-2 gap-2">
                                    {allProgramsAndTargets?.baselinePrograms &&
                                      allProgramsAndTargets.baselinePrograms
                                        .length > 0 && (
                                        <div
                                          className="flex-1 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 cursor-pointer flex items-center justify-between"
                                          onClick={() =>
                                            handleProgramAndTargetClick(
                                              allProgramsAndTargets.baselinePrograms,
                                              "Baseline"
                                            )
                                          }
                                        >
                                          <span className="text-sm text-gray-700">
                                            BaseLine
                                          </span>
                                          <button
                                            className="p-2 rounded-full hover:bg-gray-200 transition-colors"
                                            onClick={(e) => {
                                              e.stopPropagation();
                                              router.push("/programSetting");
                                            }}
                                          >
                                            <Settings className="h-5 w-5 text-gray-500" />
                                          </button>
                                        </div>
                                      )}

                                    {allProgramsAndTargets?.inTreatmentPrograms &&
                                      allProgramsAndTargets.inTreatmentPrograms
                                        .length > 0 && (
                                        <div
                                          className="flex-1 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 cursor-pointer flex items-center justify-between"
                                          onClick={() =>
                                            handleProgramAndTargetClick(
                                              allProgramsAndTargets.inTreatmentPrograms,
                                              "In_Treatment"
                                            )
                                          }
                                        >
                                          <span className="text-sm text-gray-700">
                                            Target
                                          </span>
                                          <button
                                            className="p-2 rounded-full hover:bg-gray-200 transition-colors"
                                            onClick={(e) => {
                                              e.stopPropagation();
                                              router.push("/programSetting");
                                            }}
                                          >
                                            <Settings className="h-5 w-5 text-gray-500" />
                                          </button>
                                        </div>
                                      )}

                                    {allProgramsAndTargets?.masteredPrograms &&
                                      allProgramsAndTargets.masteredPrograms
                                        .length > 0 && (
                                        <div
                                          className="flex-1 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 cursor-pointer flex items-center justify-between"
                                          onClick={() =>
                                            handleProgramAndTargetClick(
                                              allProgramsAndTargets.masteredPrograms,
                                              "Maintenance"
                                            )
                                          }
                                        >
                                          <span className="text-sm text-gray-700">
                                            Maintenance
                                          </span>
                                          <button
                                            className="p-2 rounded-full hover:bg-gray-200 transition-colors"
                                            onClick={(e) => {
                                              e.stopPropagation();
                                              console.log(
                                                "----------Fourth Step: navigate('/programSetting')----------"
                                              );
                                              router.push("/programSetting");
                                            }}
                                          >
                                            <Settings className="h-5 w-5 text-gray-500" />
                                          </button>
                                        </div>
                                      )}
                                  </div>
                                )}
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </main>
          </div>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default DashboardPage;
