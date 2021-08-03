import ReactModal from "react-modal";
import styled from "styled-components";

ReactModal.setAppElement("#root");

function ReactModalAdapter({ className, modalClassName, ...props }) {
  return (
    <ReactModal
      className={modalClassName}
      portalClassName={className}
      bodyOpenClassName="portalOpen"
      {...props}
    />
  );
}

const StyledReactModal = styled(ReactModalAdapter).attrs({
  overlayClassName: "Overlay",
  modalClassName: "Modal",
})`
  & .Overlay {
    // Overlay takes up entire screen
    background-color: rgba(50, 50, 50, 0.25);
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    width: 100%;
    // center Modal within Overlay
    display: flex;
    justify-content: center;
    align-items: center;
  }
  & .Modal {
    background-color: white;
    font-family: "BCSans", "Noto Sans", Verdana, Arial, sans-serif;
    padding: 25px;
    -webkit-box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.5);
    box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.5);
  }
  &[class*="--after-open"] {
    color: blue;
    content: "a";
  }
  &[class*="--before-close"] {
    color: purple;
    content: "a";
  }
`;

function Modal({ children, contentLabel, isOpen, setIsOpen, ...props }) {
  return (
    <StyledReactModal
      isOpen={isOpen}
      afterModalOpen={null}
      onRequestClose={() => setIsOpen(false)}
      contentLabel={contentLabel}
      {...props}
    >
      {children}
    </StyledReactModal>
  );
}

export default Modal;
