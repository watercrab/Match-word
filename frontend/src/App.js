import React, { useEffect, useState } from "react";
import axios from "axios";
import { Routes, Route } from "react-router-dom";
import { useLocalStorage } from "./component/useLocalStorage";
import "./App.css";
import Login from "./component/Login/Login";
import Register from "./component/Register/Register";
import EditProfile from "./component/Setting/EditProfile";
import Category from "./component/Category/Category";
import VocabularyTreasury from "./component/VocabularyTreasury/VocabularyTreasury";
import Prepare from "./component/Prepare/Prepare";
import EditVocabulary from "./component/EditVocabulary/EditVocabulary";
import Setting from "./component/Setting/Setting";
import Edit from "./component/Setting/Edit";

function App() {
  const [users, setUsers] = useState([]);
  // const [getLocalStorage, setSaveData, clearLocalStorage] =
  //   useLocalStorage("Current User");
  const [currentUser, setCurrentUser] = useState([]);
  const [selectedTreasury, setSelectedTreasury] = useState([]);
  const [selectEdit, setSelectEdit] = useState("");

  const getLocalStorageUser = async () => {
    try {
      const local = await localStorage.getItem("Current User");

      if (local) {
        await setCurrentUser(JSON.parse(local));
        return JSON.parse(local);
      }
    } catch (error) {
      return undefined;
    }
  };

  const getLocalStorageTreasury = async () => {
    try {
      const local = await localStorage.getItem("Treasury");

      if (local) {
        await setSelectedTreasury(JSON.parse(local));
        return JSON.parse(local);
      }
    } catch (error) {
      return undefined;
    }
  };

  const getAllUsers = () => {
    axios
      .get("http://127.0.0.1:8000/users/")
      .then((data) => {
        setUsers(data.data);
      })
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    getAllUsers();
    getLocalStorageUser();
    getLocalStorageTreasury();
  }, []);

  console.log(users);

  return (
    <Routes>
      {/* path="/" หน้าแรกที่ขึ้นมาแสดง */}
      <Route
        path="/"
        element={<Login users={users} setCurrentUser={setCurrentUser} />}
      />
      <Route path="/register" element={<Register />} />
      <Route
        path="/editProfile"
        element={
          <EditProfile
            currentUser={currentUser}
            setCurrentUser={setCurrentUser}
          />
        }
      />
      <Route
        path="/category"
        element={
          <Category
            currentUser={currentUser}
            setSelectedTreasury={setSelectedTreasury}
          />
        }
      />
      <Route
        path="/vocabularyTreasury"
        element={<VocabularyTreasury currentUser={currentUser} />}
      />
      <Route
        path="/prepare"
        element={
          <Prepare
            currentUser={currentUser}
            selectedTreasury={selectedTreasury}
          />
        }
      />
      <Route
        path="/editVocabulary"
        element={
          <EditVocabulary
            currentUser={currentUser}
            selectedTreasury={selectedTreasury}
          />
        }
      />
      <Route path="/setting" element={<Setting />} />
      <Route path="/edit" element={<Edit setSelectEdit={setSelectEdit} />} />
    </Routes>
  );
}

export default App;
