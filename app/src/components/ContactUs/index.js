import { useEffect, useState } from "react";
import styled from "styled-components";

import { componentService } from "../../_services/component.service";
import Button from "../Button";

const StyledDiv = styled.div`
  border: 2px dashed #707070;
  padding: 22px 16px;
`;

function ContactUsBox({ id }) {
  const [title, setTitle] = useState("");
  const [intro, setIntro] = useState("");
  const [isError, setError] = useState(false);

  function getComponentDetails() {
    setError(false);

    componentService
      .read(id)
      .then((component) => {
        setTitle(component?.title);
        setIntro(component?.intro);
      })
      .catch((error) => {
        console.log(error);
        setError(true);
      });
  }

  useEffect(() => {
    getComponentDetails();
  }, []);

  return (
    <StyledDiv>
      {title && <h2>{title}</h2>}
      {intro && <div dangerouslySetInnerHTML={{ __html: intro }} />}
      {isError && <p>Could not fetch component data.</p>}
      <Button onClick={() => getComponentDetails()}>Refresh data</Button>
    </StyledDiv>
  );
}

export default ContactUsBox;
