import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

import { componentService } from "../../../../_services/component.service";
import LoadSpinner from "../../../../components/LoadSpinner";

const StyledDiv = styled.div``;

function Usage({ id }) {
  const [useList, setUseList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    componentService
      .getComponentUsage(id)
      .then((data) => {
        setUseList(data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setIsError(true);
      });
  }, [id]);

  return (
    <StyledDiv>
      {isLoading && <LoadSpinner />}
      {!isLoading && (
        <>
          {useList?.length === 0 && (
            <p>This component isn't used in any pages.</p>
          )}
          {useList && Array.isArray(useList) && useList?.length > 0 && (
            <>
              <h2>Pages</h2>
              <ol>
                {useList.map((use, index) => {
                  return (
                    <li key={index}>
                      <Link to={`/content/${use?.page_id}`}>
                        {use?.page_title}
                      </Link>
                    </li>
                  );
                })}
              </ol>
            </>
          )}
          {isError && <p>Error getting usage list.</p>}
        </>
      )}
    </StyledDiv>
  );
}

export default Usage;
