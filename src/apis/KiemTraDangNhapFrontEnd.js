import axios from "axios";
import Server from "../server/Server";

export default axios.create({
  baseURL: Server + "/api/v1/kiem-tra-dang-nhap-frontend",
});
