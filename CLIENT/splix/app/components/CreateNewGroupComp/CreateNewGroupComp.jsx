import React from "react";
import "./style.css";
import Link from "next/link";

const CreateNewGroupComp = () => {
  return (
    <>
      {/* <button className="cssbuttons-io">
        <span id="main_span">
          <span id="plus_icon" className="pb-1 me-2 text-xl">
            +
          </span>
          New Group
        </span>
      </button> */}
      <Link href='/groups/new'><button className="btn btn-success btn-outline btn-sm" id="new_group_button">+ New Group</button></Link>
    </>
  );
};

export default CreateNewGroupComp;
