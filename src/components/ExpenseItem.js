import React, { Component } from 'react'
import './ExpenseItem.css';
import {MdDelete, MdEdit} from 'react-icons/md';

const ExpenseItem = ({ expense, handleDelete }) => {
    return (
      <li className='item'>
        {/* 아이템 정보 */}
        <div className='info'>
          <span className='expense'>{expense.charge}</span>
          <span className='amount'>{expense.amount}</span>
        </div>
        {/* 아이템 관련 버튼 */}
        <div>
          <button className='edit-btn'><MdEdit/></button>
          <button 
            className='clear-btn' 
            onClick={() => handleDelete(expense.id)}
          ><MdDelete/></button>
        </div>
      </li>
    )
}

export default ExpenseItem
