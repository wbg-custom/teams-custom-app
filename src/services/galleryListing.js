import axios from "axios";

export async function getPhotos() {
  return axios.get("https://picsum.photos/200/300");
}
