import { Component, useState } from "react";
import "./App.css";
import ExpenseForm from "./components/ExpenseForm";
import ExpenseList from "./components/ExpenseList";
import "./Destructuring.js";
import destructuringPractice from "./Destructuring.js";

const App = () => {
  destructuringPractice();

  const [charge, setCharge] = useState("");
  const [amount, setAmount] = useState(0);
  const [expenses, setExpenses] = useState([
    { id: 1, charge: "렌트비", amount: 2000 },
    { id: 2, charge: "교통비", amount: 400 },
    { id: 3, charge: "식비", amount: 1200 }
  ])
  // onXXX함수에 등록되면, Event 객체를 받아온다.
  const handleCharge = (event) => {
    console.log(event.target.value);
    /* charge state에 입력한 값이 잘 들어가게 된다. */
    setCharge(event.target.value);
  }

  const handleAmount = (event) => {
    console.log(event.target.valueAsNumber);
    setAmount(event.target.valueAsNumber);
  }

  const handleDelete = (id) => {
    const newExpenses = expenses.filter(expense => expense.id !== id);
    console.log(newExpenses);
    setExpenses(newExpenses);
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    if(charge !== "" && amount > 0){
      const newExpense = { id: crypto.randomUUID(), charge, amount };
      /* 불변성을 지켜주기 위해서 새로운 expenses를 생성 */
      const newExpenses = [...expenses, newExpense];
      setExpenses(newExpenses);
      /* submit후에 값 초기화 */
      setCharge("");
      setAmount(0);
    } else {
      console.log('error!!!');
    }
  }

    return (
      <main className="main-container">
        <h1>예산 계산기</h1>
        <div style={{width: '100%', backgroundColor: 'white', padding: '1rem'}}>
          {/* Expense Form */}
          {/* Component는 항상 대문자로 시작해야 한다. */}
          <ExpenseForm 
            handleCharge={handleCharge}
            charge={charge}
            handleAmount={handleAmount}
            amount={amount}
            handleSubmit={handleSubmit}
          />
        </div>
        <div style={{width: '100%', backgroundColor: 'white', padding: '1rem'}}>
          {/* Expense List */}
          <ExpenseList 
            initialExpenses={expenses}
            handleDelete={handleDelete}
          />
        </div>
        <div style={{display: 'flex', justifyContent: 'end', marginTop: '1rem'}}>
          <p style={{fontSize: '2rem'}}>
            총지출:
            <span>원</span>
          </p>
        </div>
      </main>
    )

}


export default App;