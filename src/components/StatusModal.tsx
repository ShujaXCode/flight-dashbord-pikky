/**
 * Pikky Assessment
 * @author Shuja Naqvi
 */
import React, { useState } from "react";

interface StatusModalProps {
  isOpen: boolean;
  onClose: () => void;
  onUpdateStatus: (status: string) => void;
}

const StatusModal: React.FC<StatusModalProps> = ({
  isOpen,
  onClose,
  onUpdateStatus,
}) => {
  const [status, setStatus] = useState("Scheduled");

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-4 rounded shadow-lg w-1/3">
        <h2 className="text-xl font-bold">Update Flight Status</h2>
        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          className="border p-2 w-full mt-4"
        >
          <option value="Scheduled">Scheduled</option>
          <option value="Delayed">Delayed</option>
          <option value="Cancelled">Cancelled</option>
          <option value="In-flight">In-flight</option>
        </select>

        <div className="flex gap-4 mt-4">
          <button
            onClick={() => {
              onUpdateStatus(status);
              onClose();
            }}
            className="bg-blue-500 text-white p-2 rounded"
          >
            Update Status
          </button>
          <button onClick={onClose} className="bg-gray-300 p-2 rounded">
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default StatusModal;
