import React from 'react';

interface StudyModifyingProps {
  isEditing: boolean;
  onEdit: () => void;
}

const StudyModifying: React.FC<StudyModifyingProps> = ({ isEditing, onEdit }) => {
  return (
    <div className="text-left p-5">
      <h2 className="text-2xl font-extrabold">수강권 수정</h2>
      <button onClick={onEdit}>편집</button>
    </div>
  );
};

export default StudyModifying;