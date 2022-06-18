import io from "socket.io-client";
import store from "config/store";
import { logInGuest } from "actions";

export const socket = io.connect("http://localhost:5000", {
  query: {
    username: store.getState().userInfo.username,
  },
});

socket.on("receive-guest-id", (id) => {

  if (!store.getState().userInfo.isLogged){
  store.dispatch(logInGuest(id));}
});
