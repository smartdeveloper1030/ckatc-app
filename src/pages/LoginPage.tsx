import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { IonPage, IonContent } from "@ionic/react";
import supabase from "../library/supabaseClient"; // Import Supabase client
import { Eye, EyeOff, LogIn, Lock, User } from "lucide-react";
import { useUser } from "../context/UserContext";
import { getEmailWithUsername } from "../api/userApis";

const LogInPage: React.FC = () => {
  const { getUserData } = useUser();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const history = useHistory(); // Initialize useHistory

  const signInWithUsername = async (username: string, password: string) => {
    try {
      const resp = await getEmailWithUsername(username);
      const email = resp?.email;
      if (!email) {
        throw new Error("No email found");
      }

      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      if (error) {
        throw error;
      }
      await getUserData(data?.user?.id);
    } catch (error) {
      console.error(error);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await signInWithUsername(username, password);
      console.log({ check: 123 });
      history.push("/dashboard");
    } catch (error) {
      console.error("Error:", error);
      setError(JSON.stringify(error));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <IonPage>
      <IonContent className="ion-padding">
        <div className="min-h-screen bg-gradient-to-br from-[#1A365D] to-[#2B4C7E] flex items-center justify-center p-4">
          <div className="max-w-md w-full bg-white rounded-xl shadow-xl overflow-hidden">
            <div className="p-8">
              <div className="text-center mb-8">
                <div className="w-16 h-16 bg-[#2B4C7E] rounded-full mx-auto flex items-center justify-center mb-4">
                  <Lock className="h-8 w-8 text-white" />
                </div>
                <h1 className="text-2xl font-bold text-gray-900">
                  ABA Therapist
                </h1>
                <p className="text-gray-600 mt-1">Sign in to your account</p>
              </div>

              {error && (
                <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-700 rounded-lg text-sm">
                  {error}
                </div>
              )}

              <form onSubmit={handleSubmit}>
                <div className="space-y-5">
                  {/* Username Field */}
                  <div>
                    <label
                      htmlFor="username"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Username
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <User className="h-5 w-5 text-gray-400" />
                      </div>
                      <input
                        id="username"
                        name="username"
                        type="text"
                        autoComplete="username"
                        required
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        className="block w-full pl-10 pr-3 py-2.5 border border-gray-300 rounded-lg 
                             focus:ring-2 focus:ring-[#2B4C7E]/20 focus:border-[#2B4C7E] transition-colors"
                        placeholder="Enter your username"
                      />
                    </div>
                  </div>

                  {/* Password Field */}
                  <div>
                    <label
                      htmlFor="password"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Password
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Lock className="h-5 w-5 text-gray-400" />
                      </div>
                      <input
                        id="password"
                        name="password"
                        type={showPassword ? "text" : "password"}
                        autoComplete="current-password"
                        required
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="block w-full pl-10 pr-10 py-2.5 border border-gray-300 rounded-lg 
                             focus:ring-2 focus:ring-[#2B4C7E]/20 focus:border-[#2B4C7E] transition-colors"
                        placeholder="••••••••"
                      />
                      <button
                        type="button"
                        className="absolute inset-y-0 right-0 pr-3 flex items-center"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? (
                          <EyeOff className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                        ) : (
                          <Eye className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                        )}
                      </button>
                    </div>
                  </div>

                  {/* Remember Me & Forgot Password */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <input
                        id="remember-me"
                        name="remember-me"
                        type="checkbox"
                        checked={rememberMe}
                        onChange={(e) => setRememberMe(e.target.checked)}
                        className="h-4 w-4 text-[#2B4C7E] focus:ring-[#2B4C7E] border-gray-300 rounded"
                      />
                      <label
                        htmlFor="remember-me"
                        className="ml-2 block text-sm text-gray-700"
                      >
                        Remember me
                      </label>
                    </div>
                    <div className="text-sm">
                      <a
                        href="#"
                        className="font-medium text-[#2B4C7E] hover:text-[#2B4C7E]/80"
                      >
                        Forgot your password?
                      </a>
                    </div>
                  </div>

                  {/* Submit Button */}
                  <div>
                    <button
                      type="submit"
                      disabled={isLoading}
                      className={`w-full flex justify-center items-center gap-2 py-2.5 px-4 border border-transparent 
                           rounded-lg shadow-sm text-white bg-[#2B4C7E] hover:bg-[#2B4C7E]/90 
                           focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#2B4C7E]
                           transition-colors ${
                             isLoading ? "opacity-70 cursor-not-allowed" : ""
                           }`}
                    >
                      {isLoading ? (
                        <>
                          <svg
                            className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                          >
                            <circle
                              className="opacity-25"
                              cx="12"
                              cy="12"
                              r="10"
                              stroke="currentColor"
                              strokeWidth="4"
                            ></circle>
                            <path
                              className="opacity-75"
                              fill="currentColor"
                              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                            ></path>
                          </svg>
                          Signing in...
                        </>
                      ) : (
                        <>
                          <LogIn className="h-5 w-5" />
                          Sign in
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </form>

              <div className="mt-6 text-center">
                <p className="text-sm text-gray-600">
                  Don't have an account?{" "}
                  <a
                    href="#"
                    className="font-medium text-[#2B4C7E] hover:text-[#2B4C7E]/80"
                  >
                    Sign up
                  </a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default LogInPage;
