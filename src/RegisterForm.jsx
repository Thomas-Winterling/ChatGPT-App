//rafce
import React, { useState } from 'react'
import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword} from "firebase/auth"
import { getFirestore, doc, setDoc } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDcXE5YuNCazpk1t5Mmr_GhnhbjpwC_ZOc",
  authDomain: "chatgpt-clone-315e7.firebaseapp.com",
  projectId: "chatgpt-clone-315e7",
  storageBucket: "chatgpt-clone-315e7.appspot.com",
  messagingSenderId: "236784447745",
  appId: "1:236784447745:web:d420825ce267c22e716b00"
};

// Initialize Firebase
initializeApp(firebaseConfig);

const RegisterForm = ({ onRegistration }) => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [username, setUsername] = useState('')
    const [age, setAge] = useState('')
    const [interests, setInterests] = useState('')
    const [level, setLevel] = useState('')

    const handleSubmit = async (e) => {
        e.preventDefault();
        const auth = getAuth();
        try {
          const userCredential = await createUserWithEmailAndPassword(
            auth,
            email,
            password
          );
          console.log("User registered:", userCredential.user);
    
          const db = getFirestore();
          await setDoc(doc(db, "users", userCredential.user.uid), {
            username,
            age,
            interests,
            level,
          });
          
          // Nach erfoglreichem registrieren zu Login
          onRegistration();
    
          console.log("User information saved");
        } catch (error) {
          console.error("Error registering user:", error);
        }
      };

  return (
    <div className="bg-[#11A37F] h-screen flex flex-col items-center justify-center text-center">
    <form onSubmit={handleSubmit}>
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">
          Email;
        </label>
        <input value={email} onChange={(e) => setEmail(e.target.value)} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type="email" placeholder="Email" />
      </div>

      <div className="mb-6">
        <label className="block text-gray-700 text-sm font-bold mb-2">
          Password:
        </label>
        <input value={password} onChange={(e) => setPassword(e.target.value)} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" type="password" placeholder="******************" />
      </div>

      <div className="mb-6">
        <label className="block text-gray-700 text-sm font-bold mb-2">
          Username:
        </label>
        <input value={username} onChange={(e) => setUsername(e.target.value)} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" type="text" placeholder="Username" />
      </div>

      <div className="mb-6">
        <label className="block text-gray-700 text-sm font-bold mb-2">
          Age:
        </label>
        <input value={age} onChange={(e) => setAge(e.target.value)} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" type="number" placeholder="Age" />
      </div>

      <div className="mb-6">
        <label className="block text-gray-700 text-sm font-bold mb-2">
          Interessts:
        </label>
        <input value={interests} onChange={(e) => setInterests(e.target.value)} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" type="text" placeholder="Interessts" />
      </div>

      <div className="mb-6">
        <label className="block text-gray-700 text-sm font-bold mb-2">
          Level:
        </label>
        <input value={level} onChange={(e) => setLevel(e.target.value)} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" type="text" placeholder="Interessts" />
      </div>

      <div className="flex items-center justify-between">
        <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
          Sign In
        </button>
      </div>
    </form>
    </div>
  )
}

export default RegisterForm