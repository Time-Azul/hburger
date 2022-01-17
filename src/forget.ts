import { getAuth, sendPasswordResetEmail } from "firebase/auth";

const pageForget = document.querySelector("body#auth #forget") as HTMLElement;
const auth = getAuth();

if (pageForget) {
    const form = pageForget.querySelector("form [name='email']") as HTMLFormElement;
    const span = form.querySelector("span") as HTMLSpanElement;


  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const email = sessionStorage.getItem("email");

    if (email) {

        sendPasswordResetEmail(auth, email)
        .then(() => {
          span.innerText = "Instruções enviada para seu e-mail!";
        })
        .catch((error) => console.error(error.message));
    }
  });
}
