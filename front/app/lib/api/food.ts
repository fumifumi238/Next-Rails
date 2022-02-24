import client from "./client";
import { Food } from "../../types";

const options = {
  headers: {
    "Content-Type": "multipart/form-data",
  },
};
const getFoods = () =>{
  return client.get("/foods", {

  });
}
