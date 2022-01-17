import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import getFormValues from "./functions/getFormValues";

const pageAuth = document.querySelector("body#auth #login") as HTMLBodyElement;

const auth = getAuth();

if (pageAuth) {
  const form = pageAuth.querySelector("#form-login") as HTMLFormElement;

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const { email, password } = getFormValues(form);

    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {

        const { user } = userCredential;

        const span = form.querySelector("span") as HTMLSpanElement;

        span.innerText = `Seja bem vindo ${user.displayName}!`;

        setTimeout(() => {
          window.location.href = "index.html";
        }, 1000);

      })
      .catch((error) => {
        const span = form.querySelector("span") as HTMLSpanElement;

        const errorCode = error.code;

        if (errorCode == "auth/wrong-password") {

          span.innerText = "senha incorreta!";

        } else if (errorCode == "auth/user-not-found") {

          span.innerText = "usuário não encontrado!";

        } else {
          span.innerText = "fale com um administrador!";
        }
      });
  });
}
