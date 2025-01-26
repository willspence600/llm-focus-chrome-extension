import { useState } from "react";

interface PopupModalProps {
    content: string;
    onClose: () => void;
  }
  
  const PopupModal: React.FC<PopupModalProps> = ({ content, onClose }) => {
  
  
    return (
      <div className="popup-modal">
        <div className="popup-content">
          <h2>You're off-topic!</h2>
          <p>{content}</p>
          <input
            type="text"
            placeholder="Enter justification..."
          />
          <button onClick={onClose}>Dismiss</button>
        </div>
      </div>
    );
  };
  
  export default PopupModal;