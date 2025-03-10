import React, { useState } from "react";
import {
  ChevronLeft,
  Settings,
  LogOut,
  FileText,
  Brain,
  Calendar,
  BarChart2,
  Users,
  Clock,
  BookOpen,
} from "lucide-react";
import { useUser } from "../context/UserContext";

interface HeaderProps {
  onBackClick?: () => void;
  studentName: string;
}

export function Header({ onBackClick, studentName }: HeaderProps) {
  const { signOut } = useUser();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const menuItems = [
    {
      category: "ABA Programs",
      items: [
        {
          icon: Brain,
          label: "Behavior Analysis",
          description: "Track and analyze behaviors",
        },
        {
          icon: Calendar,
          label: "Session Planning",
          description: "Schedule and manage sessions",
        },
        {
          icon: BarChart2,
          label: "Data Collection",
          description: "Record and analyze progress",
        },
        {
          icon: Clock,
          label: "Time Tracking",
          description: "Monitor session duration",
        },
      ],
    },
    {
      category: "Clinical Tools",
      items: [
        {
          icon: FileText,
          label: "Assessment Tools",
          description: "VB-MAPP, ABLLS-R, etc.",
        },
        {
          icon: Users,
          label: "Team Collaboration",
          description: "Coordinate with therapists",
        },
        {
          icon: BookOpen,
          label: "Resources",
          description: "Training materials and guides",
        },
      ],
    },
  ];

  return (
    <header className="bg-white border-b border-gray-200">
      <div className="px-4 py-3">
        <div className="flex justify-between items-center">
          {/* Left: Back Button and Student Info */}
          <div className="flex items-center gap-4">
            <button
              onClick={onBackClick}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <ChevronLeft className="h-6 w-6 text-gray-600" />
            </button>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gray-200 rounded-lg flex items-center justify-center">
                <span className="text-gray-600 font-medium">
                  {studentName
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </span>
              </div>
              <span className="text-gray-900 font-medium">{studentName}</span>
            </div>
          </div>
          {/* Right: Session Timer and User Profile */}
          <div className="flex items-center gap-4">
            {/* User Profile */}
            <div className="relative">
              <button
                className="flex items-center gap-2"
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              >
                <div className="w-8 h-8 bg-[#2B4C7E] rounded-full flex items-center justify-center">
                  <span className="text-white font-medium">AB</span>
                </div>
              </button>

              {/* Dropdown Menu */}
              {isDropdownOpen && (
                <div
                  className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-lg border border-gray-200 
                              py-2 z-50 animate-fadeIn"
                >
                  {/* User Section */}
                  <div className="px-4 py-3 border-b border-gray-100">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-[#2B4C7E] rounded-full flex items-center justify-center">
                        <span className="text-white font-medium text-lg">
                          AB
                        </span>
                      </div>
                      <div>
                        <h3 className="text-sm font-semibold text-gray-900">
                          Andres Belmonte
                        </h3>
                        <p className="text-xs text-gray-500">BCBA Certified</p>
                      </div>
                    </div>
                  </div>

                  {/* Menu Categories */}
                  {menuItems.map((category, index) => (
                    <div key={index} className="py-2">
                      <div className="px-4 py-1">
                        <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                          {category.category}
                        </span>
                      </div>
                      {category.items.map((item, itemIndex) => (
                        <button
                          key={itemIndex}
                          className="w-full flex items-center gap-3 px-4 py-2 text-sm text-gray-700 
                                   hover:bg-gray-50 transition-colors"
                        >
                          <item.icon className="h-4 w-4 text-[#2B4C7E]" />
                          <div className="text-left">
                            <span className="font-medium">{item.label}</span>
                            <p className="text-xs text-gray-500">
                              {item.description}
                            </p>
                          </div>
                        </button>
                      ))}
                    </div>
                  ))}

                  {/* Footer Actions */}
                  <div className="border-t border-gray-100 mt-2 pt-2">
                    <button
                      className="w-full flex items-center gap-3 px-4 py-2 text-sm text-gray-700 
                                    hover:bg-gray-50 transition-colors"
                    >
                      <Settings className="h-4 w-4" />
                      <span>Settings</span>
                    </button>
                    <button
                      className="w-full flex items-center gap-3 px-4 py-2 text-sm text-red-600 
                                    hover:bg-red-50 transition-colors"
                    >
                      <LogOut className="h-4 w-4" />
                      <span onClick={() => signOut()}>Sign out</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
