import React from "react";

const AddBillModal = ({ setBillAmount, setBillDesc }) => {
  const handleAddBill = () => {

    var billAmountStr = document.getElementById("bill-amount").value;
    var billAmount = Number(billAmountStr);
    var billDesc = document.getElementById("bill-desc").value;

    if(billAmount <= 0 || billAmount == NaN || billDesc == ""){
      alert("Invalid details");
    }else{
        setBillAmount(prev => [...prev, billAmount]);
        setBillDesc(prev => [...prev, billDesc]);
    }

    document.getElementById("billModal").close();
    document.getElementById('bill-desc').value="";
    document.getElementById('bill-amount').value="";
  };

  return (
    <div>
      <button
        className="btn btn-sm btn-primary ms-6"
        onClick={() => document.getElementById("billModal").showModal()}>
        + Add Bill
      </button>
      <dialog id="billModal" className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg underline underline-offset-4">
            Add New Bill
          </h3>
          <div className="py-4 flex flex-col gap-4">
            <div>
              <label htmlFor="bill-amount" className="cursor-pointer">
                Bill Amount:{" "}
              </label>
              <input
                id="bill-amount"
                type="text"
                placeholder="Enter bill amount"
                className="input input-bordered w-full max-w-xs focus:outline-none"
              />
            </div>

            <div>
              <label htmlFor="bill-desc" className="cursor-pointer">
                Description:{" "}
              </label>
              <input
                id="bill-desc"
                type="text"
                placeholder="Enter bill description"
                className="input input-bordered w-full max-w-xs focus:outline-none"
              />
            </div>
          </div>
          <div className="modal-action">
            <form method="dialog" >
              <button
                className="btn btn-sm btn-warning"
                onClick={handleAddBill}>
                Add
              </button>
              <button className="btn btn-sm ms-2">Close</button>
            </form>
          </div>
        </div>
      </dialog>
    </div>
  );
};

export default AddBillModal;
