import { useState } from "react";
import { IonPage, IonContent } from "@ionic/react";
import { Header } from "../components/Header";
import { Check } from "lucide-react";

const ProgramSettingsPage: React.FC = () => {
  const [selectedItems, setSelectedItems] = useState<string[]>([
    "01-M Manipulates and explores objects from 1 minute",
    "02-M Responds to hearing his own name 5 times",
  ]);

  const items = [
    "All",
    "01-M Manipulates and explores objects from 1 minute",
    "02-M Responds to hearing his own name 5 times",
    "02-M Shows variation in play by independently interacting with 5 different items",
    "03-M Demonstrates generalization by engaging in exploratory movement and playing with the toys in a novel environment for 2 minutes",
  ];

  const handleItemClick = (item: string) => {
    if (item === "All") {
      // If "All" is selected, deselect all items
      // If not all items are selected, select all items
      setSelectedItems(
        selectedItems.length === items.length - 1 ? [] : items.slice(1)
      );
    } else {
      setSelectedItems((prev) => {
        if (prev.includes(item)) {
          return prev.filter((i) => i !== item);
        } else {
          return [...prev, item];
        }
      });
    }
  };

  return (
    <IonPage>
      <IonContent className="ion-padding">
        <div className="flex flex-col h-screen bg-white">
          <div className="flex-shrink-0">
            <Header
              onBackClick={() => window.history.back()}
              studentName="John Doe"
            />
          </div>

          <div className="flex-1 overflow-y-auto bg-gray-100">
            <div className="flex justify-center">
              <div className="w-1/2 bg-white rounded-lg p-4 space-y-6 m-4">
                {items.map((item) => (
                  <button
                    key={item}
                    onClick={() => handleItemClick(item)}
                    className="w-full flex items-center gap-3 p-4 rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors text-left"
                  >
                    <div
                      className={`w-6 h-6 rounded border flex items-center justify-center transition-colors
                    ${
                      selectedItems.includes(item) ||
                      (item === "All" &&
                        selectedItems.length === items.length - 1)
                        ? "bg-[#2B4C7E] border-[#2B4C7E]"
                        : "border-gray-300"
                    }`}
                    >
                      {(selectedItems.includes(item) ||
                        (item === "All" &&
                          selectedItems.length === items.length - 1)) && (
                        <Check className="h-4 w-4 text-white" />
                      )}
                    </div>
                    <span className="text-gray-700">{item}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Footer - Fixed at bottom */}
          <div className="flex-shrink-0 w-full flex justify-center gap-3 p-4 border-t border-gray-200 bg-white">
            <button className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 font-medium hover:bg-gray-50 transition-colors">
              Cancel
            </button>
            <button
              onClick={() => {}}
              className="px-4 py-2 bg-[#2B4C7E] text-white rounded-lg font-medium hover:bg-[#2B4C7E]/90 transition-colors"
            >
              Save
            </button>
          </div>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default ProgramSettingsPage;
