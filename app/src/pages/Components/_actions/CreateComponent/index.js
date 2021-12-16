import styled from "styled-components";

// Global components & services
import Modal from "../../../../components/Modal";
import TextInput from "../../../../components/TextInput";

// Component Types
import ContactInformation from "./ContactInformation";

const StyledModal = styled(Modal)``;

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
