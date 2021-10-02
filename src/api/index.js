import { API } from "../config";

export const getRecords = () => {
  //console.log(user.name, user.email, user.password, user.phone);

  return fetch(`${API}/abc`, {
    method: "GET",
  })
    .then((response) => {
      //console.log(JSON.stringify(response.json()));
      console.log(response);
      return response.json();
    })
    .catch((err) => {
      console.log(err);
    });
};
