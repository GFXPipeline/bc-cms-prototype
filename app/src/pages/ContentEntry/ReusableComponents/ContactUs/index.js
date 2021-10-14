import { useEffect, useState } from "react";
import styled from "styled-components";

import Accordion from "../../../../components/Accordion";
import Button from "../../../../components/Button";
import ButtonLink from "../../../../components/ButtonLink";
import Select from "../../../../components/Select";

import { componentService } from "../../../../_services/component.service";

const StyledDiv = styled.div`
  padding: 13px 16px;

  label {
    font-size: 13px;
    font-weight: 700;
    margin-bottom: 8px;
  }

  p {
    margin: 8px 0;
  }
`;

function ContactUsInput({
  onClick,
  isOpen,
  setIsOpen,
  contactUsId,
  setContactUsId,
}) {
  const [options, setOptions] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  function getOptionsList() {
    setIsError(false);

    componentService
      .getComponentsByType("d632b0f5-99b8-4a73-a1ac-02f6117388db") // Contact information GUID
      .then((options) => {
        const newOptions = [];

        options &&
          Array.isArray(options) &&
          options.length > 0 &&
          options?.forEach((option) => {
            newOptions.push({
              value: option?.id,
              label: option?.title,
            });
          });

        setOptions(newOptions);
        setIsLoading(false);
      })
      .catch((error) => {
        setIsError(true);
        setIsLoading(false);
        throw error;
      });
  }

  useEffect(() => {
    getOptionsList();
  }, []);

  return (
    <Accordion
      id={"accordion-contact-us"}
      label={"Contact Us"}
      open={isOpen}
      toggleOpen={() => setIsOpen(!isOpen)}
    >
      <StyledDiv>
        <Select
          id="contact-us-select"
          name="contact-us-select"
          disabled={isLoading}
          onChange={setContactUsId}
          value={contactUsId}
          options={[{ label: "Please select one", value: "" }, ...options]}
        />
        {isError && (
          <p>
            Could not get options list.{" "}
            <ButtonLink onClick={getOptionsList}>Refresh</ButtonLink>.
          </p>
        )}
        <Button onClick={onClick} disabled={!contactUsId}>
          Add to page
        </Button>
      </StyledDiv>
    </Accordion>
  );
}

export default ContactUsInput;
