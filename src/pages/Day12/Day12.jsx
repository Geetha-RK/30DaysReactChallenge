import React, { useState } from "react";
import "./Day12.scss";
import { Link } from "react-router-dom";

const Day12 = () => {
  const [members, setMembers] = useState([]);
  const [newMember, setNewMember] = useState("");
  const [memberFlag, setMemberFlag] = useState(true);
  const [amount, setAmount] = useState(0);
  const [payer, setPayer] = useState("");
  const [description, setDescription] = useState("");
  const [expenses, setExpenses] = useState([]);
  const [balances, setBalances] = useState({});

  const handleMembers = (e) => {
    setNewMember(e.target.value);
  };

  const handleAddMember = (e) => {
    if (newMember.trim() !== "") {
      setMembers([...members, newMember]);
      setNewMember("");
    }
  };

  const handleMemberDelete = (index) => {
    const updatedMember = members.filter((_, i) => i !== index);
    setMembers(updatedMember);
  };

  const handlePayerChange = (e) => {
    setPayer(e.target.value);
  };

  const handleAmount = (e) => {
    setAmount(e.target.value);
  };

  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
  };

  const handleSubmitExpense = () => {
    if (!payer || amount <= 0 || !description) {
      alert("Please fill in all fields.");
      return;
    }
    if (members.length === 0) {
      alert("Please add at least one member.");
      return;
    }

    const newExpense = {
      payer,
      amount,
      description,
    };

    setExpenses([...expenses, newExpense]);
    updateBalances(payer, amount);

    // Do not reset payer here so it can be used in the summary
    setAmount(0);
    setDescription("");
  };

  const updateBalances = (payer, amount) => {
    const fairShare = amount / members.length; // Divide equally among all members

    // Update the payer's balance (they paid the full amount)
    setBalances((prevBalances) => ({
      ...prevBalances,
      [payer]: (prevBalances[payer] || 0) + amount,
    }));

    // Update other members' balances (they owe a share to the payer)
    members.forEach((member) => {
      if (member !== payer) {
        setBalances((prevBalances) => ({
          ...prevBalances,
          [member]: (prevBalances[member] || 0) - fairShare,
        }));
      }
    });
  };

  return (
    <div className="expense">
      <div className="todo__box1">
        <p className="todo__title">
          <Link to="/">Back</Link>
        </p>
        <div className="todo__title">Expense Splitter</div>
      </div>
      <div className="expense__container">
        <div className="expense__top">
          <div className="expense__members">
            <h1 className="expense__title">Add Members</h1>
            <input
              className="expense__input"
              type="text"
              name="member"
              id="member"
              value={newMember}
              onChange={handleMembers}
              placeholder="Enter your group members"
            />
            <button className="expense__button" onClick={handleAddMember}>
              Add +{" "}
            </button>
          </div>
          <div className="expense__log">
            <h1 className="expense__title">Enter Expense</h1>
            <select
              className="expense__input"
              name="payer"
              id="payer"
              value={payer}
              onChange={handlePayerChange}
            >
              <option value="" disabled>
                Select Payer
              </option>
              {members.map((item, index) => (
                <option key={index} value={item}>
                  {item}
                </option>
              ))}
            </select>
            <input
              className="expense__input"
              type="number"
              name="amount"
              id="amount"
              placeholder="Amount"
              value={amount}
              onChange={handleAmount}
            />
            <textarea
              className="expense__input"
              type="text"
              name="description"
              id="description"
              placeholder="Description"
              value={description}
              onChange={handleDescriptionChange}
            />
            <button className="expense__button" onClick={handleSubmitExpense}>
              Submit Expense
            </button>
          </div>
        </div>
        <div className="expense__list">
          <div>
            <button className="expense__button" onClick={() => setMemberFlag(true)}>
              Members
            </button>
            <button className="expense__button" onClick={() => setMemberFlag(false)}>
              Log
            </button>
          </div>
          <div>
            {memberFlag && (
              <>
                <h2>Your Group members</h2>
                {members.length===0 && <p>No members yet</p>}
                <ul className="expense__ul">
                  {members.map((item, index) => (
                    <li key={index} className="expense__li">
                      <div className="namelist">
                        {item}
                        <button
                          onClick={() => handleMemberDelete(index)}
                          className="namelist__p"
                        >
                          x
                        </button>
                      </div>
                    </li>
                  ))}
                </ul>
              </>
            )}
            {!memberFlag && (
              <>
                <h2>Expense Log</h2>
                {expenses.length === 0 ? <p>No expense yet</p> : (
                    <ul className="expense__ul">
                        {expenses.map((expense, index) => (
                        <li key={index} className="expense__li">
                            <div>
                            <strong>{expense.payer}</strong> paid {expense.amount} for{" "}
                            {expense.description}
                            </div>
                        </li>
                        ))}
                    </ul>
                    )}
                <h3>Fair Expense Split</h3>
                <ul className="expense__ul">
                  {Object.entries(balances).map(([member, balance]) => {
                    if (balance !== 0) {
                      if (balance < 0) {
                        // Member owes money to the payer
                        return (
                          <li key={member} className="expense__li">
                            {member} owes ${Math.abs(balance).toFixed(2)} to {payer}
                          </li>
                        );
                      }
                    //   if (balance > 0) {
                    //     // Member is owed money by the payer
                    //     return (
                    //       <li key={member} className="expense__li">
                    //         {member} is owed ${Math.abs(balance).toFixed(2)} by {payer}
                    //       </li>
                    //     );
                    //   }
                    }
                    return null; // Do not render anything if balance is 0
                  })}
                </ul>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Day12;
