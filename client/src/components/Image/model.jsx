import React from "react";

const Modal = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div
        className="absolute inset-0 bg-black opacity-50"
        onClick={onClose}
      ></div>
      <div className="bg-black p-8 m-8 text-white border-white border-2 rounded-xl relative">
        <button className="absolute top-2 right-2 text-white" onClick={onClose}>
          ✖️
        </button>
        {children}
      </div>
    </div>
  );
};

export default Modal;
