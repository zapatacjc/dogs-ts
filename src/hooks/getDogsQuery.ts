import { useQuery } from "react-query";
import axios from "axios";

function GetDogsQuery() {
  const dogsQuery = useQuery("getDogsRq", async () => {
    return axios.get(`https://dog.ceo/api/breeds/list/all`);
  });

  return dogsQuery;
}

export default GetDogsQuery;
