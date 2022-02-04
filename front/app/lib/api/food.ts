import client from "./client";
import { Food } from "../../types";

const getFoods = () =>{
  return client.get("/foods", {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
}
