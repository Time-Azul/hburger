import {
  getAuth,
  createUserWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import getFormValues from "./functions/getFormValues";

const pageRegister = document.querySelector(
  "body#auth #register"
) as HTMLElement;

const auth = getAuth();

if (pageRegister) {
  const form = pageRegister.querySelector("form") as HTMLFormElement;
  const span = form.querySelector("span") as HTMLSpanElement;

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const { name, email, password } = getFormValues(form);

    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const { user } = userCredential;

        span.innerText = "Registro feito com sucesso!";

        updateProfile(user, {
          displayName: name,
        }).then(() => {
            setTimeout(() => {
              window.location.href = "login.html";
            }, 1000);
          })
          .catch((error) => {

            const errorMessage = error.message;
            const errorCode = error.code;

            console.log(errorCode);

            // if (errorMessage == "auth/wrong-password") {
            //   span.innerText = "senha incorreta!";
            // } else if (errorMessage == "auth/user-not-found") {
            // } else {
            //   span.innerText = "fale com um administrador!";
            // }
          });
      })
      .catch((error) => {
        console.error(error.message);
      });
  });
}
