import { useState } from "react";
import DatePicker from "react-datepicker";
import styled from "styled-components";

import "react-datepicker/dist/react-datepicker.css";

// App-level components
import svgCalendar from "../../../../assets/noun-calendar.svg";
import Icon from "../../../../components/Icon";
import Modal from "../../../../components/Modal";
import Button from "../../../../components/Button";

const StyledModal = styled(Modal)`
  .Modal {
    width: 100%;
    max-width: 550px;

    form {
      h1 {
        margin: 0 0 22px 0;
      }

      fieldset {
        border: none;
        margin: 0;
        padding: 0;
        display: flex;
        flex-direction: row;
        margin: 0 0 12px 0;

        label {
          cursor: pointer;
        }

        &.radio-delete-type {
          display: flex;
          flex-direction: column;

          div.radio-option {
            align-items: center;
            border: 1px solid transparent;
            display: flex;
            flex-direction: row;
            padding: 16px;

            &.selected {
              border: 1px solid #707070;
            }

            input[type="radio"] {
              margin: 0 15px 0 0;
            }

            div.label-description {
              span {
                font-size: 16px;
              }

              p {
                font-size: 13px;
                margin: 8px 0 0 0;
              }
            }
          }
        }
      }

      div.reason-for-deletion {
        display: flex;
        flex-direction: column;
        margin: 0 0 12px 0;

        label {
          font-size: 13px;
          font-weight: 700;
          margin: 0 0 8px 0;
        }

        textarea {
          border: 2px solid #3e3e3e;
          display: block;
          font-family: "BCSans", "Noto Sans", Verdana, Arial, sans-serif;
          font-size: 16px;
          resize: none;

          &::placeholder {
            color: #313132;
          }
        }
      }

      div.set-time-and-date {
        align-items: center;
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        margin: 0 0 12px 0;

        div.date-and-time {
          display: flex;
          flex-direction: row;

          span {
            font-size: 13px;
          }

          div.date-select {
            display: flex;
            flex-direction: column;
            margin-right: 17px;

            div.react-datepicker-wrapper {
              border: 2px solid #3e3e3e;
              height: 48px;
              width: 144px;

              div.react-datepicker__input-container {
                input[type="text"] {
                  background-image: url(${svgCalendar});
                  background-position: right 16px top 50%;
                  background-repeat: no-repeat;
                  background-size: 20px 20px;
                  border: none;
                  font-family: "BCSans", "Noto Sans", Verdana, Arial, sans-serif;
                  font-size: 16px;
                  height: 44px;
                  padding-left: 13px;
                  width: 140px;
                }
              }
            }
          }

          div.time-select {
            display: flex;
            flex-direction: column;

            div.input-container {
              align-items: end;
              display: flex;
              flex-direction: row;
              height: 48px;

              input[type="number"] {
                border: 2px solid #3e3e3e;
                height: 48px;
              }

              span.colon {
                font-size: 16px;
                font-weight: 700;
                margin: 0 4px;
              }

              fieldset.radio-period {
                display: flex;
                flex-direction: column;
                align-items: center;
                height: 48px;
                margin-left: 6px;

                label {
                  border: 2px solid #3e3e3e;
                  display: flex;
                  flex-direction: column;
                  align-items: center;
                  height: 24px;
                  width: 35px;

                  &.selected {
                    background-color: #3e3e3e;
                    color: white;
                  }

                  &:focus-within {
                    outline: 3px solid royalblue;
                  }

                  input[type="radio"] {
                    height: 0px;
                    opacity: 0.01;
                    width: 0px;
                  }

                  span {
                    font-size: 16px;
                    font-weight: 400;
                    margin-top: -3px;
                  }
                }
              }
            }
          }
        }
      }

      div.control-buttons {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
      }
    }

    p.success {
      background-color: #dff0d8;
      border: 1px solid #d6e9c6;
      border-radius: 4px;
      color: #2d4821;
      padding: 15px;
    }

    p.error {
      background-color: #f2dede;
      border: 1px solid #ebccd1;
      border-radius: 4px;
      color: #a12622;
      padding: 15px;
    }
  }
`;

function DeletePage({ id, isOpen, setIsOpen }) {
  const [deleteType, setDeleteType] = useState("soft-delete");
  const [reason, setReason] = useState("");
  const [date, setDate] = useState(new Date());
  const [timeHour, setTimeHour] = useState(parseInt(12));
  const [timeMinute, setTimeMinute] = useState(parseInt(0));
  const [period, setPeriod] = useState("am");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isError, setIsError] = useState(false);

  function handleDeletePage(event) {
    event.preventDefault();
    setIsSubmitting(true);

    // Call pageService.delete(id)
    // Set success or error
  }

  return (
    <StyledModal isOpen={isOpen} setIsOpen={setIsOpen} contentLabel={"Delete"}>
      <form id="delete-page">
        <h1>Delete</h1>
        <fieldset className="radio-delete-type">
          <div
            className={
              deleteType === "soft-delete"
                ? "radio-option selected"
                : "radio-option"
            }
          >
            <input
              type="radio"
              id="soft-delete"
              name="delete-type"
              value="soft-delete"
              checked={deleteType === "soft-delete"}
              onChange={() => setDeleteType("soft-delete")}
            />
            <div className="label-description">
              <label htmlFor="soft-delete">Soft</label>
              <p>
                Page will be greyed out and inaccessible publicly. Will be hard
                deleted after a period of time.
              </p>
            </div>
          </div>
          <div
            className={
              deleteType === "hard-delete"
                ? "radio-option selected"
                : "radio-option"
            }
          >
            <input
              type="radio"
              id="hard-delete"
              name="delete-type"
              value="hard-delete"
              checked={deleteType === "hard-delete"}
              onChange={() => setDeleteType("hard-delete")}
            />
            <div className="label-description">
              <label htmlFor="hard-delete">Hard</label>
              <p>
                This will permanently delete the page and remove it from the
                content list.
              </p>
            </div>
          </div>
        </fieldset>
        <div className="reason-for-deletion">
          <label>* Reason for deletion</label>
          <textarea
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            placeholder={"Enter reason for deletion."}
            rows={3}
            requried
          />
        </div>
        <div className="set-time-and-date">
          <label>
            <input type="checkbox" />
            <span>Set time and date</span>
          </label>
          <div className="date-and-time">
            <div className="date-select">
              <span>Date</span>
              <DatePicker selected={date} onChange={(date) => setDate(date)} />
            </div>
            <div className="time-select">
              <span>Time</span>
              <div className="input-container">
                <input
                  type="number"
                  id="hour"
                  min="1"
                  max="12"
                  value={timeHour}
                  onChange={(e) => setTimeHour(parseInt(e.target.value))}
                />
                <span className="colon">:</span>
                <input
                  type="number"
                  id="minute"
                  min="0"
                  max="59"
                  value={timeMinute}
                  onChange={(e) => setTimeMinute(parseInt(e.target.value))}
                />
                <fieldset className="radio-period">
                  <label className={period === "am" ? "selected" : null}>
                    <input
                      type="radio"
                      name="period"
                      value="am"
                      checked={period === "am"}
                      onChange={(e) => setPeriod("am")}
                    />
                    <span>AM</span>
                  </label>
                  <label className={period === "pm" ? "selected" : null}>
                    <input
                      type="radio"
                      name="period"
                      value="pm"
                      checked={period === "pm"}
                      onChange={(e) => setPeriod("pm")}
                    />
                    <span>PM</span>
                  </label>
                </fieldset>
              </div>
            </div>
          </div>
        </div>
        <div className="control-buttons">
          <Button
            onClick={(e) => handleDeletePage(e)}
            primary
            disabled={isSubmitting}
          >
            Delete
          </Button>
          <Button onClick={() => setIsOpen(false)} disabled={isSubmitting}>
            Cancel
          </Button>
        </div>
      </form>
      {isError && (
        <p className="error">Error attempting to mark page for deletion</p>
      )}
      {isSuccess && (
        <p className="success">
          Selected page has been marked for{" "}
          {deleteType === "soft-delete" ? "soft" : "hard"} deletion.
        </p>
      )}
    </StyledModal>
  );
}

export default DeletePage;
