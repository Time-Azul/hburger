import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import getFormValues from "./functions/getFormValues";

const pageAuth = document.querySelector("body#auth") as HTMLBodyElement;

if (pageAuth) {
  const form = pageAuth.querySelector("form#form-login") as HTMLFormElement;
  const auth = getAuth();
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const { email, password } = getFormValues(form);
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        window.location.href = "index.html";
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
      });
  });
}
