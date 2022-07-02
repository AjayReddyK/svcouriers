export const initialState = {
  login: null,
  usertype: null,
  updatedata: null,
  tracking_id: null,
  signup: null,
  resetpassword: null,
  resetpasswordconfirm: null,
  creation: null,
  location: null,
  pickup: null,
};

export const reducer = (state, action) => {
  console.log("entering reduceer");
  if (action.type === "LOGIN") {
    return { ...state, login: action.payload };
  } else if (action.type === "USERTYPE") {
    return { ...state, usertype: action.payload };
  } else if (action.type === "UPDATEDATA") {
    console.log("in reducer:", action.payload);
    return { ...state, updatedata: action.payload };
  } else if (action.type === "TRACKING") {
    console.log("in reducer:", action.payload);
    return { ...state, tracking_id: action.payload };
  } else if (action.type === "SIGNUP") {
    console.log("in reducer:", action.payload);
    return { ...state, signup: action.payload };
  } else if (action.type === "RESETPASSWORD") {
    console.log("in reducer:", action.payload);
    return { ...state, resetpassword: action.payload };
  } else if (action.type === "RESETPASSWORDCONFIRM") {
    console.log("in reducer:" + action.payload);
    return { ...state, resetpasswordconfirm: action.payload };
  } else if (action.type === "CREATION") {
    console.log("in reducer:" + action.payload);
    return { ...state, creation: action.payload };
  } else if (action.type === "LOCATION") {
    console.log("in reducer:" + action.payload);
    return { ...state, location: action.payload };
  } else if (action.type === "PICKUP") {
    console.log("in reducer :" + action.payload);
    return { ...state, location: action.payload };
  }
  return state;
};
