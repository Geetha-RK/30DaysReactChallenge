import React, { useState } from "react";
import "./Day10.scss";
import { Link } from "react-router-dom";

const Day10 = () => {
  const [income, setIncome] = useState(0);
  const [expense, setExpense] = useState(0);
  
  const [description, setDescription] = useState('');
  const [amount,setAmount] = useState(0);

  const [history,setHistory] = useState([]);

  const handleIncome = (e) => {
    setIncome(parseFloat(e.target.value));
  };
  const handleExpense = (e) => {
    setExpense(parseFloat(e.target.value));
  };
  const handleDescription = (e) => {
    setDescription(e.target.value);
  }
  const handleAmount = (e) => {
    setAmount(parseFloat(e.target.value));
  }
  const handleNewTransaction = (e) => {
    e.preventDefault();
    const newTransaction = {
        description,
        amount,
        type: amount > 0 ? "Income" : "Expense",
      };
      
      if (amount > 0) {
        setIncome(income + amount);
        newTransaction.type = "Income";
      } else {
        setExpense(expense + Math.abs(amount));
        newTransaction.type = "Expense";
      }
      setHistory([newTransaction, ...history]);

      setDescription(''); 
      setAmount(0);
  }
  const budgetBalance = income - expense;
  return (
    <div className="budget">
      <div className="todo__box1">
        <p className="todo__title">
          <Link to="/">Back</Link>
        </p>
        <div className="todo__title">Budget Tracker</div>
      </div>
      <div className="incomebox">
        <label htmlFor="income" className="budget__label budget__label2">
          Enter Your Income Here&nbsp;&nbsp;
          <input
          className="budget__input"
            type="number"
            name="income"
            id="income"
            placeholder="Enter Your Income "
            onChange={handleIncome}
          />
        </label>
      </div>
      <div className="budget__container">
        <div className="budget__container2">
          <h2 className="budget__balance-amt">
            Budget Balance &nbsp;&nbsp;  <span className="budget__span">+ ${budgetBalance}</span>
          </h2>

          <div className="budget__box">
            <div className="budget__balance">
              <p className="budget__title">Income</p>
              <p className="budget__amount budget__income">+&nbsp;${income}</p>
            </div>
            <div className="budget__balance">
              <p className="budget__title">Expense</p>
              <p className=" budget__amount budget__expense">
                -&nbsp;${expense}
              </p>
            </div>
          </div>
          <h2 className="budget__balance-amt">New Transaction</h2>
          <div className="budget__newform">
            <label htmlFor="desc" className="budget__label">
              Budget Item Description&nbsp;
              <input
              className="budget__input"
                type="text"
                name="desc"
                id="desc"
                placeholder="Enter Description"
                value={description}
                onChange={handleDescription}
                required
              />
            </label>
            <label htmlFor="amt" className="budget__label">
              Amount&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              <input
              className="budget__input"
                type="number"
                name="amt"
                id="amt"
                placeholder="Enter Amount"
                value={amount}
                onChange={handleAmount}
                step="any" //This allows decimal values
                required
              />
            </label>
            <button className="budget__button" onClick={handleNewTransaction}>Add New Transaction</button>
          </div>
        </div>
        <div className="budget__box2">
          <h2 className="budget__balance-amt">History</h2>
          {history.length > 0 ? (
            history.map((transaction, index) => (
              <div key={index} className="transaction">
                <p className="transaction__desc">{transaction.description}</p>
                <p className={`transaction__amt ${transaction.type === "Income" ? "income" : "expense"}`}>
                  {transaction.type === "Income" ? "+" : "-"} ${Math.abs(transaction.amount)}
                </p>
              </div>
            ))
          ) : (
            <p>No transactions yet</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Day10;
