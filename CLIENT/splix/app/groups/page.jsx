"use client";

import React, { useEffect, useState } from "react";
import GroupComp from "../components/GroupComp";
import Loading from "../loading";
import CreateNewGroupComp from "@/app/components/CreateNewGroupComp/CreateNewGroupComp.jsx";

const page = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [groups, setGroups] = useState([]);

  useEffect(() => {
    const fetchGroups = async () => {
      try {
        const res = await fetch("https://localhost:7147/api/Group");
        const groups = await res.json();
        setGroups(groups);
        console.log(groups);
        setIsLoading(false);
      } catch (err) {
        console.error("Error fetching groups: ", err);
      }
    };

    fetchGroups();
  }, []);

  return (
    <>
      {isLoading ? ( // show loader
        <Loading />
      ) : (
        <div>
          All Groups
          <hr />
          <div className="h-[80vh] border border-white p-8 m-8">
            <GroupComp groups={groups} />
          </div>
          <div className="flex justify-end me-8 pe-8">
            <CreateNewGroupComp />
          </div>
        </div>
      )}
    </> 
  );
};

export default page;
