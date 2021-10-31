import { firestoreInstance } from "./firebase_auth";

export const createUser = ({ UID }) => {
  console.log(UID);
  firestoreInstance
    .collection("users")
    .doc(UID)
    .set({
      role: 0,
      email_id: UID,
      activation: false,
    })
    .then((docRef) => {
      console.log("Document written with ID: ");
      alert("Succes adding document: ");
    })
    .catch((error) => {
      console.error("Error adding document: ", error);
      alert("Error adding document: ", error);
    });
};

export const getUsersList = async () => {
  let arrayStudents = [];

  return firestoreInstance
    .collection("users")
    .get()
    .then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        //console.log(doc.id, " => ", doc.data());
        arrayStudents.push(doc.data());
      });
      //console.log("arrayAssi: ", arrayAssi);
      return arrayStudents;
    })
    .catch((error) => {
      console.log("Error getting documents: ", error);
    });
};

export const updateUser = ({ email, role, activation }) => {
  return firestoreInstance
    .collection("users")
    .doc(email)
    .set({
      email_id: email,
      role: role,
      activation: activation,
    })
    .then(() => {
      alert("Updated successfully");
    })
    .catch((err) => {
      alert("Update Failed: " + err);
    });
};

export const updateUserActivation = ({ email, activation }) => {
  return firestoreInstance
    .collection("users")
    .doc(email)
    .set({
      email_id: email,
      activation: activation,
    })
    .then(() => {
      console.log("Role updated successfully");
    })
    .catch((err) => {
      console.log(err);
    });
};

export const getUserData = (email) => {
  //console.log("email", email);
  return (
    firestoreInstance
      .collection("users")
      .doc(email)
      //.where("id", "==", email.toString())
      .get()
      .then((doc) => {
        if (doc.exists) {
          //console.log("Document data:", doc.data());
          return doc.data();
        } else {
          // doc.data() will be undefined in this case
          console.log("No such document!");
        }
      })
      .catch((error) => {
        console.log("Error getting documents: ", error);
      })
  );
};
