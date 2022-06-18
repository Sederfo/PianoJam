const initialState = [];

const trailingNotesReducer = (state = initialState, action) => {
  let newState = [...state];
  switch (action.type) {
    case "ADD_TRAILING_NOTE":
      newState.push(action.payload);
      return newState;
    case "DELETE_TRAILING_NOTE":
      

      var removeIndex = newState.map(item => item.id).indexOf(action.payload);

      ~removeIndex && newState.splice(removeIndex, 1);
      
      
      return newState;
    default:
      return state;
  }
};

export default trailingNotesReducer;
