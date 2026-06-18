import { initializeApp } from "https://www.gstatic.com/firebasejs/9.22.0/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/9.22.0/firebase-auth.js";
import { getFirestore, doc, setDoc } from "https://www.gstatic.com/firebasejs/9.22.0/firebase-firestore.js";

// Firebase Конфигурациясы
const firebaseConfig = {
  apiKey: "AIzaSyAH-RbVmXRrkBsxSxkjpKtJP1FSgdLxyLc",
  authDomain: "ort-test-a9c23.firebaseapp.com",
  projectId: "ort-test-a9c23",
  storageBucket: "ort-test-a9c23.firebasestorage.app",
  messagingSenderId: "658338745662",
  appId: "1:658338745662:web:b1e5108d713b2fadd4306f",
  measurementId: "G-VHXVZF4EQ1"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

document.addEventListener("DOMContentLoaded", () => {
  // 1. Формаларды которуштуруу (UI Logic)
  const sign_in_btn = document.querySelector("#sign-in-btn");
  const sign_up_btn = document.querySelector("#sign-up-btn");
  const container = document.querySelector(".container");

  if (sign_up_btn && sign_in_btn) {
    sign_up_btn.addEventListener("click", () => container.classList.add("sign-up-mode"));
    sign_in_btn.addEventListener("click", () => container.classList.remove("sign-up-mode"));
  }

  // 2. Катталуу логикасы
  const signUpForm = document.querySelector('.sign-up-form');
  signUpForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const name = document.getElementById('up-name').value;
    const email = document.getElementById('up-email').value;
    const kesip = document.getElementById('up-kesip').value;
    const password = document.getElementById('up-password').value;

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      // Маалыматтарды базага сактоо
      await setDoc(doc(db, "users", userCredential.user.uid), { name, email, kesip });
      
      alert("Ийгиликтүү катталдыңыз!");
      window.location.href = "home.html"; // Үй барагына өтүү
    } catch (error) {
      alert("Ката: " + error.message);
    }
  });

  // 3. Кирүү логикасы
  const signInForm = document.querySelector('.sign-in-form');
  signInForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const email = document.getElementById('in-email').value;
    const password = document.getElementById('in-password').value;

    try {
      await signInWithEmailAndPassword(auth, email, password);
      alert("Кош келиңиз!");
      window.location.href = "home.html"; // Үй барагына өтүү
    } catch (error) {
      alert("Кирүүдө ката: " + error.message);
    }
  });
});
