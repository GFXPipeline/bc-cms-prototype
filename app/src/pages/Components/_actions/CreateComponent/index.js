import { useEffect, useState } from "react";
import styled from "styled-components";

import Modal from "../../../../components/Modal";
import TextInput from "../../../../components/TextInput";
import { componentService } from "../../../../_services/component.service";
import { useDebounce } from "../../../../hooks/useDebounce";

const StyledModal = styled(Modal)``;

const Result = styled.div`
  background-color: #f0f0f0;
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  margin: 2px 0;
  padding: 3px 6px;

  span {
    font-size: 13px;
    font-weight: 400;
  }
`;

function CreateComponent({ isOpen, setIsOpen, onAfterClose }) {
  const [search, setSearch] = useState("");
  const debouncedSearch = useDebounce(search, 300);
  const [results, setResults] = useState([]);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    if (debouncedSearch) {
      componentService.getComponentsBySearchTerm(debouncedSearch)
        .then((results) => {
          setResults(results)
        })
        .catch((error) => {
          setIsError(true);
        })
    }
  }, [debouncedSearch]);

  return (
    <StyledModal
      isOpen={isOpen}
      setIsOpen={setIsOpen}
      onAfterClose={onAfterClose}
    >
      <h1>Create component</h1>
      <TextInput
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      {results && Array.isArray(results) && results?.length > 0 && results.map((result, index) => {
        return (
          <Result key={index}>
            <span className="name"><strong>Name: </strong>{result?.name}</span>
            <span className="type"><strong>Type: </strong>{result?.type_display_name}</span>
            <span className="title"><strong>Title: </strong>{result?.title}</span>
          </Result>
        )
      })}
      {isError && <p>Error getting results</p>}
    </StyledModal>
  )
}

export default CreateComponent;
