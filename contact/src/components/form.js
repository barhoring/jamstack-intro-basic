import React, { useReducer } from "react";
import styles from "./form.module.css";

const INITIAL_STATE = {
  name: "",
  email: "",
  subject: "",
  body: "",
  status: "IDLE",
};

// To spare the pain of creating 4 different fuctions to handle the input
// we use a reducer function

const reducer = (state, action) => {
  switch (action.type) {
    case "updateFieldValue":
      return { ...state, [action.field]: action.value };
    case "updateStatus":
      return { ...state, status: action.status };

    case "reset":
    default:
      return INITIAL_STATE;
  }
};

const Form = () => {
  const [state, dispatch] = useReducer(reducer, INITIAL_STATE);

  const setStatus = (status) => dispatch({ type: "updateStatus", status });

  // `updateFieldValue will be set in action.type in case of input change`
  const updateFieldValue = (field) => (event) => {
    dispatch({ type: "updateFieldValue", field, value: event.target.value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setStatus("PENDING");
    console.log(state);
    setTimeout(() => setStatus("SUCCESS"), 1000);
  };

  if (state.status === "SUCCESS") {
    return (
      <p className={styles.success}>
        Message sent !
        <button
          type="reset"
          onClick={() => dispatch({ type: "reset" })}
          className={`${styles.button} ${styles.centered}`}
        >
          Reset
        </button>
      </p>
    );
  }

  console.log(state.status);
  return (
    <>
      {state.status === "ERROR" && (
        <p className={styles.error}>Something went wrong. Please try again</p>
      )}
      <form
        className={`${styles.form} ${
          state.status === "PENDING" && styles.pending
        }`}
        onSubmit={handleSubmit}
      >
        <label className={styles.label}>
          Name
          <input
            className={styles.input}
            type="text"
            name="name"
            value={state.name}
            onChange={updateFieldValue("name")}
          />
        </label>
        <label className={styles.label}>
          Email
          <input
            className={styles.input}
            type="email"
            name="email"
            value={state.email}
            onChange={updateFieldValue("email")}
          />
        </label>
        <label className={styles.label}>
          Subject
          <input
            className={styles.input}
            type="text"
            name="subject"
            value={state.subject}
            onChange={updateFieldValue("subject")}
          />
        </label>
        <label className={styles.label}>
          Body
          <textarea
            className={styles.input}
            name="body"
            value={state.body}
            onChange={updateFieldValue("body")}
          />
        </label>
        <button className={styles.button}>Send</button>
      </form>
    </>
  );
};

export default Form;
