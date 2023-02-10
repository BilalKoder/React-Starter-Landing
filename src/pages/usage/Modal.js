import React, { useEffect } from "react";
import "./styles/Modal.css";
import useClickOutside from "../../hooks/useClickOutside";

const Modal = ({ isModalVisible, closeModal, promptData }) => {
  useEffect(() => {
    const doc = document.getElementById("modal");
    const backdrop = document.getElementById("backdrop");
    if (isModalVisible) {
      doc.classList.add("visible");
      backdrop.classList.add("backdrop");
    } else {
      doc.classList.remove("visible");
      backdrop.classList.remove("backdrop");
    }
  }, [isModalVisible]);
  const modalRef = useClickOutside(closeModal);
  return (
    <div className="backdrop" id="backdrop">
      <div className="modal-container" id="modal" ref={modalRef}>
        <input
          type="text"
          className="history-input"
          defaultValue={promptData?.prompt}
        />
        <textarea
          className="history-textarea"
          name=""
          id=""
          cols="30"
          rows="10"
          defaultValue={promptData?.result}
        ></textarea>
        <div>
          <button className="close-btn" onClick={closeModal}>
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
