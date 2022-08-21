import axios from "axios";
import { Question } from "../Slices/QuestionSlice";

// const URL = "localhost:3000/api";
const URL = process.env.API_URL;

//Function for randomizing response data
const randomize = (arr: Array<any>) => {
  const input = [...arr];
  const output: Array<any> = [];
  while (input.length > 0) {
    let rand = Math.floor(Math.random() * input.length);
    let element = input.splice(rand, 1)[0];
    output.push(element);
  }
  return output;
};

//Get ALL questions
const getQuestions = async (category: string | null) => {
  //Get data
  const response = await axios
    .get(URL + `/questions/vetted/${category ? category : ""}`)
    .then((resp) => resp.data);

  //Randomize the data here
  return randomize(response);
};

const questionsService = {
  getQuestions,
};

export default questionsService;
