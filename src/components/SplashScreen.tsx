import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";

export function SplashScreen() {
  const router = useHistory();

  useEffect(() => {
    // Redirect to login after splash screen
    const timer = setTimeout(() => {
      router.push("/");
    }, 4000); // 4 seconds

    return () => clearTimeout(timer);
  }, [router]);

  return (
    <div className="fixed inset-0 bg-[#2B4C7E] flex items-center justify-center z-50">
      <div className="text-center">
        <div className="flex items-center justify-center mb-6">
          <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-white/20 shadow-lg">
            <img
              src="https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&q=80&w=300&h=300"
              alt="Medical Professional"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
        <h1 className="text-2xl font-bold text-white mb-2">ABA Therapist</h1>
        <p className="text-white/80 text-sm mb-4">
          Empowering Progress Through Care
        </p>
        <div className="flex items-center justify-center gap-2">
          <div
            className="w-2 h-2 bg-white rounded-full animate-bounce"
            style={{ animationDelay: "0ms" }}
          ></div>
          <div
            className="w-2 h-2 bg-white rounded-full animate-bounce"
            style={{ animationDelay: "150ms" }}
          ></div>
          <div
            className="w-2 h-2 bg-white rounded-full animate-bounce"
            style={{ animationDelay: "300ms" }}
          ></div>
        </div>
      </div>
    </div>
  );
}
