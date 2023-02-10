import React, { useEffect } from "react";

import { useLazyGetUserHistoryQuery } from "../../services/api";
import { getUserData } from "../../redux/userSlice";
import { useSelector } from "react-redux";
import Graph from "./Graph";
import History from "./History";

const Usage = () => {
  const { user } = useSelector(getUserData);

  return (
    <div style={{ padding: "1rem", display: "flex", flexDirection: "column" }}>
      <label>Usage</label>
      <span className="light-dark">
        Below you will find a summary of your usage. Data may be delayed by upto
        5 minutes.
      </span>
      <div style={{ height: "50vh", position: "relative", marginTop: "1rem" }}>
        <Graph />
      </div>
      <br />
      <label>History</label>
      <span className="light-dark">
        Below you will find the history of your prompts.
      </span>
      <History />
    </div>
  );
};

export default Usage;
