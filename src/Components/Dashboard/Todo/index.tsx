import React, { RefObject, useEffect, useRef, useState } from 'react'
import styles from './style.module.scss'
import { useStore } from './../../../store/rootStore';
import { observer } from 'mobx-react-lite';
import { getId } from '../../../utils/Functions';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash } from '@fortawesome/fontawesome-free-solid';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
const Todo = observer(() => {

  const { Counter: { todoList, setArray, addTodo, removeTodo, editTodo } } = useStore("");
  const [input, setInput] = useState('');
  const [editId, setEditId] = useState('');
  const [isError, setIsError] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  
  const focus = useRef<HTMLInputElement>(null);
  const submitHandle = () => {
    if (input.trim() === '') {
      setIsError(true);
      return;
    }

    if (isEdit) {
      editTodo(input, editId)
      setInput('')
      setIsEdit(false)
    } else {
      addTodo({ name: input, id: getId() })
      setInput('')
      setIsEdit(false)
    }
  }

  const setList = () => {
    const savedTodos = (localStorage.getItem("list"));
    if (savedTodos) {
      setArray(JSON.parse(savedTodos));
    }
  }

  const editHandle = (item: any) => {
    focus.current?.focus()
    setIsEdit(true);
    setInput(item.name);
    setEditId(item.id);
  }
  useEffect(() => {
    setList();
  }, []);

  useEffect(() => {
    localStorage.setItem("list", JSON.stringify(todoList));
  }, [todoList?.length]);
   
  return (
    <div className={styles.mainContainer}>
      <div className={styles.container}>
        <input
          ref={focus}
          value={input}
          onChange={(e) => { setInput(e.target.value) }}
          className={styles.input} />
        <button
          onClick={submitHandle}
          className={styles.button}>{isEdit ? 'Update' : 'Add'}</button>
      </div>
      <div className={styles.list}>
        {todoList?.map((item: any) => {
          return <div key={item.id} className={styles.listItem}>
            <div>{item.name}</div>
            <div>
              <FontAwesomeIcon
                onClick={() => editHandle(item)}
                style={{ fontSize: 15, cursor: 'pointer', color: 'yellow' }} icon={faEdit as IconProp} />
              <FontAwesomeIcon
                onClick={() => removeTodo(item.id)}
                style={{ fontSize: 15, cursor: 'pointer', color: 'red', marginLeft: 5 }} icon={faTrash as IconProp} />
            </div>
          </div>
        })}
      </div>
    </div>
  )
})

export default Todo;