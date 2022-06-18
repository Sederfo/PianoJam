const initialState = []

const activeKeysReducer = (state = initialState, action) => {
  let newActiveKeys;
  switch (action.type) {
    case "ACTIVATE_KEY":
      newActiveKeys = [...state, action.payload];
      return newActiveKeys
    case "DEACTIVATE_KEY":
      newActiveKeys = [...state];

      let index = newActiveKeys.findIndex(object=>{
        return object.midi === action.payload.midi
      });
   
      while (index > -1) {
        newActiveKeys.splice(index, 1); // 2nd parameter means remove one item only
        index = newActiveKeys.findIndex(object=>{
          return object.midi === action.payload.midi
        });
      }

      return newActiveKeys
    default:
      return state;
  }
};

export default activeKeysReducer;
