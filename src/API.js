
import axios from "axios";

export default axios.create({
  baseURL: "http://brandontreston.com",
  responseType: "json"
});