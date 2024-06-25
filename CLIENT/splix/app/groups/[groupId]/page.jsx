"use client";
import React, { useState, useEffect } from "react";
import Loading from "../../loading";
import AllMembersModal from "@/app/components/AllMembersModal.jsx";
import AddBillModal from "@/app/components/AddBillModal.jsx";

const page = ({ params }) => {
  const groupId = params.groupId;
  const [groupMembers, setGroupMembers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [billAmount, setBillAmount] = useState([]);
  const [billDesc, setBillDesc] = useState([]);
  const currentDate = new Date();

  console.log(billAmount, billDesc);

  useEffect(() => {
    const fetchGroupMembers = async () => {
      try {
        const res = await fetch(`https://localhost:7147/${groupId}/members`);
        const groupMembers = await res.json();
        setGroupMembers(groupMembers);
        console.log(groupMembers);
        setIsLoading(false);
      } catch (err) {
        console.error("Error fetching group members: ", err);
      }
    };

    fetchGroupMembers();
  }, []);

  const handleModalOpen = () => {
    setIsModalOpen(true);
    console.log(isModalOpen);
  };

  const formatDate = (date) => {
    const options = {
      year: "numeric",
      month: "long",
      day: "numeric",
    };
    return date.toLocaleDateString("en-US", options);
  };
  return (
    <>
      {isLoading ? ( // show loader
        <Loading />
      ) : (
        <div>
          <h1>Group Members</h1>
          <hr />

          <div className="m-3 p-3">
            <ul>
              {groupMembers.length == 0 ? (
                <>{"No members found"}</>
              ) : (
                groupMembers.map((member) => (
                  <li key={member.id}>{member.name}</li>
                ))
              )}
            </ul>

            <button
              className="btn btn-sm btn-info btn-outline mt-4"
              onClick={handleModalOpen}>
              Add new members
            </button>
          </div>

          {isModalOpen && (
            <AllMembersModal
              isModalOpen={isModalOpen}
              setIsModalOpen={setIsModalOpen}
              groupId={groupId}
              setGroupMembers={setGroupMembers}
            />
          )}

          <AddBillModal
            setBillAmount={setBillAmount}
            setBillDesc={setBillDesc}
          />

          <div className="msg-box mt-4 ms-6 ">
            <h1 className="underline underline-offset-4 mb-4">Group Bills</h1>
            {billAmount.length == 0 ? <>{"No bills found"}</> : billAmount.map((amount, index) => (
              <div key={index} className="flex flex-col gap-2">
                <p>
                  Tapas paid ${amount} for {billDesc[index]} on {formatDate(currentDate)}.
                </p>
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default page;
