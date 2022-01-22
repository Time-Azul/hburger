import { onAuthStateChanged, getAuth, signOut } from "firebase/auth";

const auth = getAuth();
const userPhoto = document.querySelector("img#avatar") as HTMLImageElement;
const buttonQuit = document.querySelector("#button-sair") as HTMLButtonElement;

if (userPhoto) {
  buttonQuit.addEventListener("click", () => {
    signOut(auth);
  });

  onAuthStateChanged(getAuth(), () => {
    if (auth.currentUser) {
      userPhoto.src = auth.currentUser.photoURL ?? "https://i.pravatar.cc/50";
    } else {
      window.location.assign("login.html");
    }
  });
}
