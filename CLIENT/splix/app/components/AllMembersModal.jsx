"use client";
import React, { useEffect, useState } from "react";

const AllMembersModal = ({ isModalOpen, setIsModalOpen, groupId, setGroupMembers }) => {
  const [allMembers, setAllMembers] = useState([]);
  const [selectedMembers, setSelectedMembers] = useState([]);


  useEffect(() => {
    const toOpenModal = () => {
      const modal = document.getElementById("my_modal_1");
      if (isModalOpen) {
        modal.showModal();
      }
    };

    toOpenModal();

    const fetchAllMembers = async () => {
      try {
        const res = await fetch("https://localhost:7147/api/Member");
        const members = await res.json();
        setAllMembers(members);
        console.log(members);
      } catch (err) {
        console.error("Error fetching all members: ", err);
      }
    };

    fetchAllMembers();
  }, []);

  const AddMemberToGroup = (memberId) => {
    setSelectedMembers((prevState) => [...prevState, memberId]);
  };

  const SubmitAddMembers = async () => {
    setIsModalOpen(false);

    try {
        const res = await fetch(`https://localhost:7147/api/Group/${groupId}/add-members`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(selectedMembers),
        });

        if(!res.ok){
            throw new Error("Failed to add members to group");
        }

        console.log('Members added Successfully');
        const newMembersData = await fetch(`https://localhost:7147/${groupId}/members`);
        const newMembers = await newMembersData.json();
        setGroupMembers(newMembers);
    } catch (err) {
        console.error("Error adding members to group: ", err);
    }
  };

  return (
    <>
      <div>
        <dialog id="my_modal_1" className="modal">
          <div className="modal-box">
            <h3 className="font-bold text-lg">Members List</h3>
            <ul className="py-4">
              {allMembers &&
                allMembers.map((member) => (
                  <li key={member.id} className="cursor-pointer">
                    <input
                      type="checkbox"
                      id={member.id}
                      value={member.id}
                      onClick={() => AddMemberToGroup(member.id)}
                    />
                    <label htmlFor={member.id} className="ms-2">
                      {member.name}
                    </label>
                  </li>
                ))}
            </ul>

            <div className="modal-action">
              <form method="dialog">
                <button
                  className="btn btn-warning btn-sm"
                  onClick={SubmitAddMembers}>
                  Add
                </button>
                <button
                  className="btn btn-sm ms-2"
                  onClick={() => setIsModalOpen(false)}>
                  Close
                </button>
              </form>
            </div>
          </div>
        </dialog>
      </div>
    </>
  );
};

export default AllMembersModal;
