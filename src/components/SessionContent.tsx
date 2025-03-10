import React, { useState, useEffect } from "react";
import { Footer } from "../components/Footer";
import { useTarget } from "../context/TargetContext";
import { useUser } from "../context/UserContext";
import { RecordDTTParams } from "../types/utils";
import { recordDTTValue } from "../api/userApis";
import { ContentHeader } from "../components/ContentHeader";

interface DTT_Type {
  yes: boolean;
  vocalPrompt: boolean;
  gesturalPrompt: boolean;
  positionalPrompt: boolean;
  modeling: boolean;
  no: boolean;
  refusedTrial: boolean;
  fieldof1_9: boolean;
}
export const SessionContent = () => {
  const { curStudent } = useUser();
  const { selectedTarget, updateProgress } = useTarget();
  const [startTime, setStartTime] = useState<string | null>(null);
  const [promptTypes, setPromptTypes] = useState<DTT_Type>({
    yes: false,
    vocalPrompt: false,
    gesturalPrompt: false,
    positionalPrompt: false,
    modeling: false,
    no: false,
    refusedTrial: false,
    fieldof1_9: false,
  });

  useEffect(() => {
    setPromptTypes({
      yes: false,
      vocalPrompt: false,
      gesturalPrompt: false,
      positionalPrompt: false,
      modeling: false,
      no: false,
      refusedTrial: false,
      fieldof1_9: false,
    });
    setStartTime(new Date().toISOString());
  }, [selectedTarget?.id]);

  const handlePromptChange = (type: keyof typeof promptTypes) => {
    if (!selectedTarget) return;
    const promptTypesList = Object.keys(promptTypes);
    const promptIndex = promptTypesList.indexOf(type) + 1;
    setPromptTypes((prev) => {
      const newPromptTypes = {
        ...prev,
        [type]: !prev[type],
      };
      if (newPromptTypes[type]) {
        updateProgress(selectedTarget.id);
        const dttParams: RecordDTTParams = {
          // session_id: session?.id,
          session_id: parseInt(localStorage.getItem("session_id") || "0"),
          student_id: curStudent?.id,
          target_id: selectedTarget?.id,
          dtt_value: promptIndex,
          start_at: startTime?.toString(),
          end_at: new Date().toISOString(),
        };

        console.log("----------recordDTTValue----------");
        console.log({ dttParams });

        recordDTTValue(dttParams).then((response) => {
          console.log("----", response);
        });
        setStartTime(new Date().toISOString());
        // Reset checkboxes after a short delay
        setTimeout(() => {
          setPromptTypes({
            yes: false,
            vocalPrompt: false,
            gesturalPrompt: false,
            positionalPrompt: false,
            modeling: false,
            no: false,
            refusedTrial: false,
            fieldof1_9: false,
          });
        }, 300);
      }
      return newPromptTypes;
    });
  };

  if (!selectedTarget) {
    return (
      <main className="flex-1 flex flex-col overflow-hidden">
        <div className="flex-1 bg-gray-100 p-1 overflow-y-auto">
          <div className="bg-white rounded-lg shadow-sm p-1 flex items-center justify-center min-h-[400px]">
            <p className="text-gray-500 text-lg">
              Select a target from the menu to view details
            </p>
          </div>
        </div>
        <Footer />
      </main>
    );
  }

  return (
    <main className="flex-1 flex flex-col overflow-hidden">
      <div className="flex-1 bg-gray-100 p-1 overflow-y-auto">
        <div className="bg-white rounded-lg shadow-sm p-6 min-h-min">
          <div className="bg-white z-10 mb-6">
            <ContentHeader />
          </div>
          <div className="overflow-y-auto">
            <div className="space-y-4">
              {/* Prompt Delay & Previous Trial */}
              <div className="flex gap-8">
                <div className="flex gap-2 items-center">
                  <span className="text-sm font-medium text-gray-700">
                    Prompt Delay
                  </span>
                  <span className="text-sm text-gray-600">
                    {selectedTarget.promptDelay}
                  </span>
                </div>
                <div className="flex gap-2 items-center">
                  <span className="text-sm font-medium text-gray-700">
                    Previous Trial
                  </span>
                  <span className="text-sm text-gray-600">
                    {selectedTarget.previousTrial}
                  </span>
                </div>
              </div>

              {/* Prompt Types Grid */}
              <div className="grid grid-cols-2 gap-4">
                {Object.entries(promptTypes).map(([type, checked]) => (
                  <label
                    key={type}
                    className={`flex items-center gap-3 p-3 border rounded-lg cursor-pointer
                      transition-all duration-200
                      ${
                        checked
                          ? "bg-[#2B4C7E]/10 border-[#2B4C7E] shadow-inner"
                          : "border-gray-200 hover:bg-gray-50 hover:border-[#2B4C7E]/30"
                      }`}
                  >
                    <input
                      type="checkbox"
                      checked={checked}
                      onChange={() =>
                        handlePromptChange(type as keyof typeof promptTypes)
                      }
                      className="h-5 w-5 rounded border-gray-300 text-[#2B4C7E] 
                               focus:ring-[#2B4C7E] transition-colors"
                    />
                    <span
                      className={`text-gray-700 capitalize transition-colors
                      ${checked ? "text-[#2B4C7E] font-medium" : ""}`}
                    >
                      {type.replace(/([A-Z])/g, " $1").trim()}
                    </span>
                  </label>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};
