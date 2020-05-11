
import axios from "axios";

export default axios.create({
  baseURL: "http://brandontreston.com:81",
  responseType: "json"
});