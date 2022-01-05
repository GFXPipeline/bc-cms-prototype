import styled from "styled-components";

// Global components & services
import Modal from "../../../../components/Modal";

// Component Types
import ContactInformation from "./ContactInformation";

const StyledModal = styled(Modal)`
  .Modal {
    display: flex;
    flex-direction: column;
    height: auto;
    max-height: 90%;
    min-height: 80%;
    max-width: 90%;
    width: auto;
  }
`;

function CreateComponent({ isOpen, setIsOpen, onAfterClose }) {
  return (
    <StyledModal
      isOpen={isOpen}
      setIsOpen={setIsOpen}
      onAfterClose={onAfterClose}
    >
      <ContactInformation />
    </StyledModal>
  );
}

export default CreateComponent;
