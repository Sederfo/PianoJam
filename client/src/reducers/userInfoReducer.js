const initialState = {
  isLogged: false,
  email: "",
  username: "",
};

const userInfoReducer = (state = initialState, action) => {
  let newState = { ...state };
  switch (action.type) {
    case "LOG_IN":
      newState.isLogged = true;
      newState.username = action.payload.username;
      newState.email = action.payload.email;
      return newState;
    case "LOG_OUT":
      return initialState;
    case "LOG_IN_GUEST":
      newState.username = action.payload;
      return newState;
    case "RESET_STORE":
      return state;
    default:
      return state;
  }
};

export default userInfoReducer;
