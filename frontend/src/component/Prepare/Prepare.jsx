import React from "react";
import Username from "../Category/Username";
import ShowVocab from "./ShowVocab";
import "./Prepare.css";

function Prepare({ currentUser, selectedTreasury }) {
  // console.log(selectedTreasury);
  return (
    <div id="picNo2">
      <Username currentUser={currentUser} />
      <div id="prepare-details">
        <p>Prepare</p>
      </div>
      <ShowVocab selectedTreasury={selectedTreasury} />
    </div>
  );
}

export default Prepare;
