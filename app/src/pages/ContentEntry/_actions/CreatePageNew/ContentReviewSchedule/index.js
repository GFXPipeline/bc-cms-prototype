import styled from "styled-components";

import TextInput from "../../../../../components/TextInput";

const StyledDiv = styled.div`
  padding: 24px;

  h3 {
    font-size: 30px;
    margin: 0 0 18px 0;
  }

  div.question-group {
    padding: 0 30px;

    fieldset {
      border: none;
      display: flex;
      flex-direction: column;
      margin: 0px;
      padding: 22px 30px;

      div.radio-option {
        display: flex;
        flex-direction: row;
        margin-bottom: 26px;

        input[type="radio"] {
          margin: 0px;
          opacity: 0.01;
          width: 0.01px;
        }

        input[type="radio"] + label {
          align-items: center;
          cursor: pointer;
          display: flex;
          flex-direction: row;

          &::before {
            align-items: center;
            background-color: white;
            border: 3px solid #3c3c3c;
            border-radius: 100%;
            content: "";
            display: flex;
            flex-direction: row;
            justify-content: space-around;
            height: 30px;
            margin-right: 16px;
            width: 30px;
          }
        }

        input[type="radio"]:checked + label {
          &::before {
            background-color: #3c3c3c;
            box-shadow: inset 0 0 0 5px white;
            color: #3c3c3c;
          }
        }

        input[type="radio"]:focus + label {
          outline: 2px solid blue;
        }
      }

      input[type="text"] {
        border: 3px solid;
        margin-left: 38px;
        width: 430px;
      }
    }
  }
`;

function ContentReviewSchedule({
  contact,
  email,
  reviewFrequency,
  setContact,
  setEmail,
  setReviewFrequency,
}) {
  return (
    <StyledDiv>
      <h3>Content review schedule</h3>
      <div className="question-group">
        <label>Content should be review once every:</label>
        <fieldset>
          <div className="radio-option">
            <input
              type="radio"
              name="schedule"
              id="3-months"
              checked={reviewFrequency === "3-months"}
              onChange={() => setReviewFrequency("3-months")}
            />
            <label htmlFor="3-months">3 months</label>
          </div>
          <div className="radio-option">
            <input
              type="radio"
              name="schedule"
              id="6-months"
              checked={reviewFrequency === "6-months"}
              onChange={() => setReviewFrequency("6-months")}
            />
            <label htmlFor="6-months">6 months</label>
          </div>
          <div className="radio-option">
            <input
              type="radio"
              name="schedule"
              id="12-months"
              checked={reviewFrequency === "12-months"}
              onChange={() => setReviewFrequency("12-months")}
            />
            <label htmlFor="12-months">12 months</label>
          </div>
        </fieldset>
      </div>
      <div className="question-group">
        <label>
          Send notification to the following person or email 7 days before
          content review date:
        </label>
        <fieldset>
          <div className="radio-option">
            <input
              type="radio"
              name="recipient"
              id="security-group-manager"
              checked={contact === "security-group-manager"}
              onChange={() => setContact("security-group-manager")}
            />
            <label htmlFor="security-group-manager">
              Security group manager
            </label>
          </div>
          <div className="radio-option">
            <input
              type="radio"
              name="recipient"
              id="specific-email"
              checked={contact === "specific-email"}
              onChange={() => setContact("specific-email")}
            />
            <label htmlFor="specific-email">
              Specific email (group inbox recommended)
            </label>
          </div>
          <TextInput
            disabled={contact !== "specific-email"}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </fieldset>
      </div>
    </StyledDiv>
  );
}

export default ContentReviewSchedule;
