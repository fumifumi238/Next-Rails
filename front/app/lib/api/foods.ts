import client from "./client";
import { Food } from "../../types";

const options = {
  headers: {
    "Content-Type": "multipart/form-data",
  },
};
export const getFoods = () =>{
  return client.get("/foods",options);
}

export const createFoods = (data: FormData)=>{
  return client.post("/foods",data,options)
}
