import Link from "next/link";
import React from "react";

const GroupComp = ({ groups }) => {
  return (
    <>
      <ul> 
        {groups.map((group) => (
          <Link key={group.id} href={"/groups/" + group.id}>
            <li >{group.name}</li>
          </Link>
        ))}
      </ul>
    </>
  );
};

export default GroupComp;
