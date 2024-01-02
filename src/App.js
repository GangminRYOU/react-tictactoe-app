import { Component, useState } from "react";
import "./App.css";
import ExpenseForm from "./components/ExpenseForm";
import ExpenseList from "./components/ExpenseList";
import "./Destructuring.js";
import destructuringPractice from "./Destructuring.js";
import Alert from "./components/Alert.js";

const App = () => {
  destructuringPractice();

  const [charge, setCharge] = useState("");
  const [amount, setAmount] = useState(0);
  const [expenses, setExpenses] = useState([
    { id: 1, charge: "렌트비", amount: 2000 },
    { id: 2, charge: "교통비", amount: 400 },
    { id: 3, charge: "식비", amount: 1200 }
  ])
  const [alert, setAlert] = useState({show: false});
  const [id, setId] = useState('');
  const [edit, setEdit] = useState(false);

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
    handleAlert({type: 'danger', text: '아이템이 삭제되었습니다.'})
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    if(charge !== "" && amount > 0){
      /* 수정조건 */
      if(edit){
        const newExpenses = expenses.map(item => {
          return item.id === id ? {...item, charge, amount} : item
        });
        setExpenses(newExpenses);
        setEdit(false);
        handleAlert({type: 'success', text: '아이템이 수정되었습니다.'})
      } else {
        const newExpense = { id: crypto.randomUUID(), charge, amount };
        /* 불변성을 지켜주기 위해서 새로운 expenses를 생성 */
        const newExpenses = [...expenses, newExpense];
        setExpenses(newExpenses);
        /* submit후에 값 초기화 */
        handleAlert({type: 'success', text: '아이템이 생성되었습니다.'})
      }
      setCharge("");
      setAmount(0);
    } else {
      console.log('error!!!');
      handleAlert({type: 'danger', text: 'charge는 빈 값일 수 없으며 amount는 0보다 커야 합니다.'})
    }
  }

  const handleAlert = ({type, text}) => {
    setAlert({show: true, type: type, text: text});
    setTimeout(() => {
      setAlert({ show: false });
    }, 7000);
  }

  const handleEdit = id => {
    const expense = expenses.find(item => item.id === id);
    const { charge, amount } = expense;
    setId(id);
    setCharge(charge);
    setAmount(amount);
    setEdit(true);
  }

  const clearItems = () => {
    setExpenses([]);
  }

    return (
      <main className="main-container">
        {alert.show ? <Alert type={alert.type} text={alert.text}/> : <></>}
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
            edit={edit}
          />
        </div>
        <div style={{width: '100%', backgroundColor: 'white', padding: '1rem'}}>
          {/* Expense List */}
          <ExpenseList 
            expenses={expenses}
            handleDelete={handleDelete}
            handleEdit={handleEdit}
            clearItems={clearItems}
          />
        </div>
        <div style={{display: 'flex', justifyContent: 'end', marginTop: '1rem'}}>
          <p style={{fontSize: '2rem'}}>
            총지출:
            <span>
              {expenses.reduce((acc, curr) => {
                return (acc += curr.amount)
              }, 0)}
              원
            </span>
          </p>
        </div>
      </main>
    )

}


export default App;