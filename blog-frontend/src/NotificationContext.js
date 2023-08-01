import { createContext, useReducer, useContext } from "react";

const notificationReducer = (state, action) => {
  switch (action.type) {
    case "ERROR":
      return action;
    case "LIKE":
      return `you liked '${action.message}'`;
    case "ADD":
      return `blog: '${action.message}' added`;
    case "DELETE":
      return `blog '${action.message}' has been deleted`;
    case "LOGOUT":
      return `${action.message} have logged out`;
    case "LOGIN":
      return `${action.message} have logged in`;
    case "CLEAR":
      return "";
    default:
      return state;
  }
};

const NotificationContext = createContext();

export const NotificationContextProvider = (props) => {
  const [notification, notificationDispatch] = useReducer(
    notificationReducer,
    ""
  );

  return (
    <NotificationContext.Provider value={[notification, notificationDispatch]}>
      {props.children}
    </NotificationContext.Provider>
  );
};

export const useNotificationMessage = () => {
  const [notification] = useContext(NotificationContext);
  return notification;
};

export const useNotificationDispatch = () => {
  const [, notificationDispatch] = useContext(NotificationContext);

  const dispatchAction = (type, message) => {
    console.log("testAction:", type);
    console.log("testMessage:", message);

    notificationDispatch({ type, message });
  };

  return dispatchAction;
};

export default NotificationContext;
