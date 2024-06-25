"use client";
import Loading from "@/app/loading";
import React, { useState } from "react";
import {useRouter} from "next/navigation";

const page = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [groupName, setGroupName] = useState("");
  const router = useRouter();

  const handleCreateNewGroup = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await fetch("https://localhost:7147/api/Group", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name: groupName }),
      });

      if (!response.ok) {
        throw new Error("Failed to create group");
      }

      setGroupName("");
      router.push('/groups');
    } catch (error) {
      console.error("Error creating group:", error);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
        <div>
          Create New Group
          <hr />
          <div className="m-3 p-3">
            <form onSubmit={handleCreateNewGroup} className="flex flex-col items-center gap-8">
              <div>
                <label htmlFor="group_name" className="me-2 cursor-pointer">
                  Group Name:{" "}
                </label>
                <input
                  type="text"
                  className="py-1 px-2"
                  placeholder="Enter group name here..."
                  id="group_name"
                  value={groupName}
                  onChange={(e) => setGroupName(e.target.value)}
                />
              </div>
              <button type="submit" className="btn btn-sm btn-success ">
                {" "}
                Create Group
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default page;
