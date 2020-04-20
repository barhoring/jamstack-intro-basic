import React, { useReducer } from "react";
import styles from "./form.module.css";

const INITIAL_STATE = {
  name: "",
  email: "",
  subject: "",
  body: "",
};

// To spare the pain of creating 4 different fuctions to handle the input
// we use a reducer function

const reducer = (state, action) => {
  switch (action.type) {
    case "updateFieldValue":
      return { ...state, [action.field]: action.value };

    default:
      return INITIAL_STATE;
  }
};

const Form = () => {
  const [state, dispatch] = useReducer(reducer, INITIAL_STATE);

  // `updateFieldValue will be set in action.type in case of input change`
  const updateFieldValue = (field) => (event) => {
    dispatch({ type: "updateFieldValue", field, value: event.target.value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
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
        <input className={styles.input} type="email" name="email" />
      </label>
      <label className={styles.label}>
        Subject
        <input className={styles.input} type="text" name="subject" />
      </label>
      <label className={styles.label}>
        Body
        <textarea className={styles.input} name="body" />
      </label>
      <button className={styles.button}>Send</button>
    </form>
  );
};

export default Form;
