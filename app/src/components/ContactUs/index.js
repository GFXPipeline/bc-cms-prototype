import { useEffect, useState } from "react";
import styled from "styled-components";

import { componentService } from "../../_services/component.service";
import Button from "../Button";
import ButtonLink from "../ButtonLink";
import Icon from "../Icon";

const StyledDiv = styled.div`
  border: 2px dashed #707070;
  padding: 22px 16px;

  ul {
    list-style: none;
    padding-left: 0;

    li {
      margin-bottom: 3px;

      span.prefix {
        font-weight: 700;
      }

      svg {
        margin-right: 16px;
        width: 14px;
      }
    }
  }

  div.controls {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
  }
`;

function ContactUsBox({ id }) {
  const [title, setTitle] = useState("");
  const [intro, setIntro] = useState("");
  const [fields, setFields] = useState("");
  const [isError, setError] = useState(false);

  function getIcon(optionId) {
    switch (optionId) {
      case "2336e5ba-3ea7-407e-967b-13d1841396cf":
      case "bb29754e-381c-4716-883e-794bec296ab6":
      case "1e570d72-5d71-48b5-8edd-a2c0e0cf1c06":
      case "868a015e-ee23-48f2-9030-864ccf72aa21":
      case "6431320b-b097-481e-91b6-344c5c802cb5":
        return <Icon id="fa-phone.svg" />;
      case "e03013ae-67f0-4a3f-9d27-80d81bcf8d02":
      case "1b3dbe10-2d2b-4da5-bce0-4c669f9e31dc":
      case "1543b3fc-b727-48b9-800e-4eb1d98e8e14":
      case "c420620b-d8ea-4962-9495-42dbea21237e":
      case "7fa1f92b-c765-4c6c-9206-6f31c36ee80a":
      case "e850508e-76bc-4058-8cb0-6c0c9c41fe81":
      case "4f75ebcf-f75c-495a-b973-b20baeb29365":
      case "5248cce0-553d-4930-8e46-cb36491c068b":
        return <Icon id="fa-map-marker.svg" />;
      case "ecc76fca-f04d-40e9-93f8-f8d317d76128":
        return <Icon id="fa-envelope.svg" />;
      case "d3c9186d-d781-49f0-aa15-dc2c6547220a":
        return <Icon id="fa-link.svg" />;
      default:
        return null;
    }
  }

  function reloadComponentDetails() {
    setError(false);

    componentService
      .read(id)
      .then((component) => {
        setTitle(component?.title);
        setIntro(component?.intro);
        setFields(component?.fields);
      })
      .catch((error) => {
        console.log(error);
        setError(true);
      });
  }

  useEffect(() => {
    function getComponentDetails() {
      setError(false);

      componentService
        .read(id)
        .then((component) => {
          setTitle(component?.title);
          setIntro(component?.intro);
          setFields(component?.fields);
        })
        .catch((error) => {
          console.log(error);
          setError(true);
        });
    }

    getComponentDetails();
  }, [id]);

  return (
    <StyledDiv>
      {title && <h2>{title}</h2>}
      {intro && <div dangerouslySetInnerHTML={{ __html: intro }} />}
      {fields && Array.isArray(fields) && fields.length > 0 && (
        <ul>
          {fields.map((field, index) => {
            console.log("field: ", field);
            return (
              <li key={index}>
                {getIcon(field?.option_id)}
                <span className="prefix">{field?.label_prefix}:</span>{" "}
                <span className="value">{field?.data}</span>
              </li>
            );
          })}
        </ul>
      )}
      {isError && <p>Could not fetch component data.</p>}
      <div className="controls">
        <Button onClick={() => reloadComponentDetails()}>Refresh data</Button>
        <ButtonLink>Go to master copy</ButtonLink>
      </div>
    </StyledDiv>
  );
}

export default ContactUsBox;
