import React, { useState } from "react";

export default function Participant({ setPhase, data, setData }) {
  const [participantId, setParticipantId] = useState("");
  const handleClick = (e) => {
    if (participantId) {
      setData({ ...data, participantId: participantId });
      setPhase("test");
    }
  };

  return (
    <div className="flex flex-col gap-2 w-[400px] justify-center">
      <p className="text-center text-xl">Ievadiet savu identifikatoru</p>
      <input
        type="text"
        id="participantId"
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
        onChange={(e) => setParticipantId(e.target.value)}
        required
      />
      <button
        className="bg-[#19b394] hover:bg-emerald-700 text-white py-2 px-4 rounded h-[50px]"
        onClick={handleClick}
      >
        Turpināt
      </button>
    </div>
  );
}