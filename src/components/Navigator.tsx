import { useState } from "react";
import {
  Brain,
  FileSpreadsheet,
  ScrollText,
  FileText,
  FileCheck,
  ClipboardCheck,
  Video,
  BarChart2,
} from "lucide-react";
import { BehaviorWgt } from "./Behavior/BehaviorWgt";
import { TrialSheetWgt } from "./TrialSheet/TrialSheetWgt";
import { SoapNotesWgt } from "./SoapNotes/SoapNotesWgt";
import { NotesWgt } from "./Notes/NotesWgt";
import { DocumentsWgt } from "./Documents/DocumentsWgt";
import { AssessmentsWgt } from "./Assessments/AssessmentsWgt";
import { VideosWgt } from "./Videos/VideosWgt";
import { ReportWgt } from "./Report/ReportWgt";

interface NavigatorProps {
  studentName?: string;
}

export function Navigator({ studentName = "Example Student" }: NavigatorProps) {
  const [activeWidget, setActiveWidget] = useState<string | null>(null);
  const navItems = [
    {
      id: "behaviors",
      icon: Brain,
      label: "BEHAVIORS",
      widget: BehaviorWgt,
    },
    {
      id: "trial-sheet",
      icon: FileSpreadsheet,
      label: "TRIAL SHEET",
      widget: TrialSheetWgt,
    },
    {
      id: "soap-notes",
      icon: ScrollText,
      label: "SOAP NOTES",
      widget: SoapNotesWgt,
    },
    {
      id: "notes",
      icon: FileText,
      label: "NOTES",
      widget: NotesWgt,
    },
    {
      id: "documents",
      icon: FileCheck,
      label: "DOCUMENTS",
      widget: DocumentsWgt,
    },
    {
      id: "assessments",
      icon: ClipboardCheck,
      label: "ASSESSMENTS",
      widget: AssessmentsWgt,
    },
    {
      id: "videos",
      icon: Video,
      label: "VIDEOS",
      widget: VideosWgt,
    },
    {
      id: "report",
      icon: BarChart2,
      label: "REPORT",
      widget: ReportWgt,
    },
  ];

  const handleItemClick = (id: string) => {
    setActiveWidget(id);
  };

  const handleClose = () => {
    setActiveWidget(null);
  };

  return (
    <>
      <nav className="bg-white border-b border-gray-200 relative">
        <div className="flex justify-between items-stretch w-full">
          {navItems.map((item) => {
            const isActive = activeWidget === item.id;

            return (
              <button
                key={item.id}
                onClick={() => handleItemClick(item.id)}
                className={`flex-1 flex flex-col items-center justify-center py-3 px-2 
                  relative outline-none transition-colors duration-200
                  ${isActive ? "bg-[#2B4C7E]/10" : "bg-white"}
                  focus:outline-none focus:ring-2 focus:ring-[#2B4C7E]/20`}
              >
                <item.icon
                  className={`h-5 w-5 mb-1 transition-colors duration-200
                  ${isActive ? "text-[#2B4C7E]" : "text-gray-600"}`}
                />
                <span
                  className={`text-xs font-medium transition-colors duration-200
                  ${isActive ? "text-[#2B4C7E]" : "text-gray-600"}`}
                >
                  {item.label}
                </span>

                {/* Active Indicator */}
                <div
                  className={`absolute bottom-0 left-0 w-full h-0.5 bg-[#2B4C7E] 
                  transition-transform duration-200 transform origin-left
                  ${isActive ? "scale-x-100" : "scale-x-0"}`}
                />
              </button>
            );
          })}
        </div>
      </nav>

      {/* Widgets */}
      {activeWidget && (
        <div className="fixed inset-0 bg-white z-50">
          {(() => {
            const WidgetComponent = navItems.find(
              (item) => item.id === activeWidget
            )?.widget;
            return WidgetComponent ? (
              <WidgetComponent
                onClose={handleClose}
                onNavigate={handleItemClick}
                studentName={studentName}
              />
            ) : null;
          })()}
        </div>
      )}
    </>
  );
}
