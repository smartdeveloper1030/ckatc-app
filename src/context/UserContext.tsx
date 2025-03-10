import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  Dispatch,
} from "react";
import { UserInfo, Student } from "../types/utils";
import { getStudents, getUserDetail } from "./../api/userApis";
import supabase from "../library/supabaseClient";
import { useHistory, useLocation } from "react-router-dom";

interface UserContextType {
  user: UserInfo | undefined;
  setUser: (user: UserInfo) => void;
  students: Student[] | undefined;
  setStudents: (students: Student[]) => void;
  curStudent: Student | undefined;
  setCurStudent: (student: Student) => void;
  signOut: () => void;
  getUserData: Dispatch<any>;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export function UserProvider({ children }: { children: React.ReactNode }) {
  const router = useHistory();
  const location = useLocation();
  const pathname = location.pathname;
  const [user, setUser] = useState<UserInfo | undefined>(undefined);
  const [students, setStudents] = useState<Student[]>([]);
  const [curStudent, setCurStudent] = useState<Student | undefined>(undefined);

  useEffect(() => {
    const isAuth = !!localStorage.getItem("selected_user");
    console.log({ isAuth });

    if (isAuth && pathname === "/") {
      router.replace("/dashboard");
    }

    if (!isAuth && pathname !== "/") {
      router.replace("/");
    }
  }, [pathname]);

  // Sign-out function
  const signOut = useCallback(async () => {
    try {
      await supabase.auth.signOut({
        scope: "local",
      });
    } catch (error) {
      console.error("Error signing out:", error);
    } finally {
      handleSignedOut();
    }
  }, [user]);

  // Handle signed-out state
  const handleSignedOut = useCallback(() => {
    localStorage.removeItem("selected_user");
    localStorage.removeItem("allProgramsAndTargets");
    localStorage.removeItem("curStudent");
    localStorage.removeItem("schedule");
    localStorage.removeItem("session_id");
    localStorage.removeItem("session_info");
    localStorage.removeItem("sessions");

    setUser(undefined);
    setStudents([]); // Clear students when signing out
    setCurStudent(undefined); // Clear current student when signing out

    router.push("/");
  }, [router]);

  // Fetch students data for a user
  const getStudentsData = useCallback(async (id: string) => {
    try {
      const response = await getStudents(id);
      setStudents(response);
    } catch (error) {
      console.error("Error fetching students:", error);
    }
  }, []);

  // Fetch user data from localStorage and API
  const getUserData = useCallback(async (userId: string | undefined) => {
    try {
      if (!userId) {
        console.error("User ID is required to fetch user data.");
        return;
      }

      const response = await getUserDetail(userId);
      setUser(response);
      localStorage.setItem("selected_user", JSON.stringify(response));
    } catch (error) {
      console.error("Error fetching user details:", error);
    }
  }, []);

  // Fetch user data on component mount
  useEffect(() => {
    const selectedUser = localStorage.getItem("selected_user");
    const userInfo = selectedUser ? JSON.parse(selectedUser) : null;

    if (userInfo?.id) {
      getUserData(userInfo.id);
    }
  }, [getUserData]);

  // Fetch students data when user changes
  useEffect(() => {
    if (user?.id) {
      getStudentsData(user.id);
    }
  }, [user?.id, getStudentsData]);

  return (
    <UserContext.Provider
      value={{
        user,
        setUser,
        students,
        setStudents,
        curStudent,
        setCurStudent,
        signOut,
        getUserData,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
}
