import { useTarget } from '../context/TargetContext';

export const ContentHeader = () => {

    const {selectedTarget} = useTarget();

  return (
    <div className="space-y-4 flex-1">
      {/* SD Section */}
      <div className="flex gap-4">
        <div className="w-24 shrink-0">
          <span className="text-sm font-semibold text-gray-700">SD</span>
        </div>
        <div className="w-24 shrink-0">
          <span className="text-sm font-semibold text-gray-700">{selectedTarget?.target.sd}</span>
        </div>
      </div>

      {/* Target Section */}
      <div className="flex gap-4">
        <div className="w-24 shrink-0">
          <span className="text-sm font-semibold text-gray-700">Target</span>
        </div>
        <div className="flex-1">
          <p className="text-gray-700">{selectedTarget?.title}</p>
        </div>
      </div>

      {/* Program Section */}
      <div className="flex gap-4">
        <div className="w-24 shrink-0">
          <span className="text-sm font-semibold text-gray-700">Program</span>
        </div>
        <div className="flex-1">
          <p className="text-gray-700">{selectedTarget?.program}</p>
          <p className="text-sm text-gray-500 mt-1">{selectedTarget?.description}</p>
        </div>
      </div>

      {/* Target Instructions Section */}
      <div>
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Target Instructions</h3>
        <div>
          {/* {selectedTarget.target.instructions} */}
        </div>
      </div>
    </div>
  );
}; 