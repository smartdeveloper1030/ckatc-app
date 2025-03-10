import React, { createContext, useContext, useState, useEffect } from "react";
import { ProgramInfo, SessionInfo, TargetInfo } from "../types/utils";

interface TargetItem {
  id: string;
  title: string;
  program: string;
  description: string;
  promptDelay: string;
  previousTrial: string;
  status: "not-started" | "in-progress" | "mastered";
  completed: number;
  total: number;
  progress: string;
  target: TargetInfo;
}

interface Section {
  title: string;
  items: TargetItem[];
}

interface TargetContextType {
  selectedTarget: TargetItem | null;
  setSelectedTarget: (target: TargetItem | null) => void;
  sections: Section[];
  setSections: React.Dispatch<React.SetStateAction<Section[]>>;
  updateProgress: (targetId: string) => void;
  expandedPrograms: number[];
  setExpandedSections: React.Dispatch<React.SetStateAction<number[]>>;
  programs: ProgramInfo[];
  setPrograms: React.Dispatch<React.SetStateAction<ProgramInfo[]>>;
  session: SessionInfo | undefined;
  setSession: React.Dispatch<React.SetStateAction<SessionInfo | undefined>>;
}

const TargetContext = createContext<TargetContextType | undefined>(undefined);

export function TargetProvider({ children }: { children: React.ReactNode }) {
  const [selectedTarget, setSelectedTarget] = useState<TargetItem | null>(null);
  const [sections, setSections] = useState<Section[]>([]);
  const [expandedPrograms, setExpandedSections] = useState<number[]>([]);
  const [programs, setPrograms] = useState<ProgramInfo[]>([]);
  const [session, setSession] = useState<SessionInfo | undefined>(undefined);
  const [flag, setFlag] = useState(false);

  // Auto-select first item and expand first section on mount
  useEffect(() => {
    if (!flag) return;
    if (sections.length > 0 && sections[0].items.length > 0) {
      setExpandedSections([0]);
      setSelectedTarget(sections[0].items[0]);
    }
    setFlag(false);
  }, [sections]);

  useEffect(() => {
    if (programs.length > 0) {
      setFlag(true);
      const sections: Section[] = [];
      programs.map((program: ProgramInfo) => {
        if (program.targets.length > 0) {
          const section: Section = {
            title: program.title,
            items: [],
          };
          program.targets.map((target: TargetInfo) => {
            const item: TargetItem = {
              id: target.id.toString(),
              title: target.target_name,
              program: program.title,
              description: target.description,
              promptDelay: target.prompt_schedule,
              previousTrial: "no",
              status:
                target.dtt_data[0].count === 0
                  ? "not-started"
                  : target.dtt_data[0].count >= target.desired_daily_tirals
                  ? "mastered"
                  : "in-progress",
              completed: target.dtt_data[0].count,
              total: target.desired_daily_tirals,
              progress:
                target.dtt_data[0].count + "/" + target.desired_daily_tirals,
              target: target,
            };
            section.items.push(item);
          });
          sections.push(section);
        }
      });
      setSections(sections);
    }
  }, [programs]);

  const findNextSection = (currentSectionIndex: number): number | null => {
    for (let i = currentSectionIndex + 1; i < sections.length; i++) {
      if (sections[i].items.length > 0) {
        return i;
      }
    }
    return null;
  };

  const updateProgress = (targetId: string) => {
    setSections((prevSections) => {
      const newSections = [...prevSections];

      // Find current target's indices
      let currentSectionIndex = -1;
      let currentItemIndex = -1;

      for (let i = 0; i < newSections.length; i++) {
        const itemIndex = newSections[i].items.findIndex(
          (item) => item.id === targetId
        );
        if (itemIndex !== -1) {
          currentSectionIndex = i;
          currentItemIndex = itemIndex;
          break;
        }
      }
      // console.log({currentSectionIndex, currentItemIndex});
      if (currentSectionIndex !== -1 && currentItemIndex !== -1) {
        const currentItem =
          newSections[currentSectionIndex].items[currentItemIndex];

        // if (currentItem.completed < currentItem.total) { ///////////////////////////////////////////////
        // Update progress
        currentItem.completed += 1;
        currentItem.progress = `${currentItem.completed}/${currentItem.total}`;

        // Update status based on progress
        if (currentItem.completed === 0) {
          currentItem.status = "not-started";
        } else if (currentItem.completed >= currentItem.total) {
          /////////////===/////////////////////////
          currentItem.status = "mastered";

          // Check if this is the last item in the current section
          const isLastItem =
            currentItemIndex ===
            newSections[currentSectionIndex].items.length - 1;

          if (isLastItem) {
            // Find next section
            const nextSectionIndex = findNextSection(currentSectionIndex);

            if (nextSectionIndex !== null) {
              // Close current section and open next section
              setExpandedSections((prev) => {
                const newExpanded = prev.filter(
                  (index) => index !== currentSectionIndex
                );
                return [...newExpanded, nextSectionIndex];
              });

              // Select first item of next section
              setTimeout(() => {
                setSelectedTarget(newSections[nextSectionIndex].items[0]);
              }, 300);
            }
          } else {
            // Select next item in current section
            setTimeout(() => {
              setSelectedTarget(
                newSections[currentSectionIndex].items[currentItemIndex + 1]
              );
            }, 300);
          }
        } else {
          currentItem.status = "in-progress";
        }

        // When progress bar is filled (regardless of being the last item or not)
        if (currentItem.completed === currentItem.total) {
          const isLastItem =
            currentItemIndex ===
            newSections[currentSectionIndex].items.length - 1;

          if (isLastItem) {
            // If it's the last item, find and select the first item of the next section
            const nextSectionIndex = findNextSection(currentSectionIndex);

            if (nextSectionIndex !== null) {
              // Close current section and open next section
              setExpandedSections((prev) => {
                const newExpanded = prev.filter(
                  (index) => index !== currentSectionIndex
                );
                return [...newExpanded, nextSectionIndex];
              });

              // Select first item of next section
              setTimeout(() => {
                setSelectedTarget(newSections[nextSectionIndex].items[0]);
              }, 300);
            }
          } else {
            // If it's not the last item, select the next item in the current section
            setTimeout(() => {
              setSelectedTarget(
                newSections[currentSectionIndex].items[currentItemIndex + 1]
              );
            }, 300);
          }
        }
        // } //////////////////////////////////////////////////////////////////////////////////////////////
      }

      return newSections;
    });
  };

  return (
    <TargetContext.Provider
      value={{
        selectedTarget,
        setSelectedTarget,
        sections,
        setSections,
        updateProgress,
        expandedPrograms,
        setExpandedSections,
        programs,
        setPrograms,
        session,
        setSession,
      }}
    >
      {children}
    </TargetContext.Provider>
  );
}

export function useTarget() {
  const context = useContext(TargetContext);
  if (context === undefined) {
    throw new Error("useTarget must be used within a TargetProvider");
  }
  return context;
}
