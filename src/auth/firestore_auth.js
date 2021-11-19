import { firestoreInstance } from "./firebase_auth";
import { sendEmail } from "../api";
import { toSignupAlertEmail } from "../config";

export const createUser = async ({ UID }) => {
  let emails_combined = await getAdminList();
  //console.log("result: ", emails_combined);

  firestoreInstance
    .collection("users")
    .doc(UID)
    .set({
      role: 0,
      email_id: UID,
      activation: false,
    })
    .then((docRef) => {
      //console.log("Document written with ID: ");
      sendEmail({
        toEmail: toSignupAlertEmail,
        subject: "New Signup Alert",
        text: `New signup ${UID} is waiting for activation.`,
        cc: emails_combined,
      });
      alert("Successfully created User Profile: ");
    })
    .catch((error) => {
      console.error("Error adding document: ", error);
      alert("Error while Creating User Profile: ", error);
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

export const getAdminList = async () => {
  let combined_emails = "";
  return firestoreInstance
    .collection("users")
    .where("role", "==", 2)
    .get()
    .then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        //console.log("admin list", " => ", doc.data().email_id);
        combined_emails += `${doc.data().email_id}, `;
        //arrayStudents.push(doc.data());
      });
      combined_emails = combined_emails.substring(
        0,
        combined_emails.length - 2
      );
      //console.log("arrayAssi: ", arrayAssi);
      console.log("combined: ", combined_emails);
      return combined_emails;
    })
    .catch((error) => {
      console.log("Error getting documents: ", error);
    });
};

export const updateUser = ({ email, role, activation, sendMail = false }) => {
  //console.log("sendmai: ", sendMail);
  //console.log(":", email);
  //console.log(": ", role);
  //console.log(": ", activation);

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
      if (sendMail) {
        sendEmail({
          toEmail: email,
          subject: "e-Emphasys Account Activation",
          text: "Your e-Emphasys dashboard account has been activated.",
        });
      }
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
      //console.log("Role updated successfully");
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
