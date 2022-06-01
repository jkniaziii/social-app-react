import React, { RefObject, useEffect, useRef, useState } from 'react'
import styles from './style.module.scss'
import { useStore } from './../../../store/rootStore';
import { observer } from 'mobx-react-lite';
import { getId, getTime } from '../../../utils/Functions';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash } from '@fortawesome/fontawesome-free-solid';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { toJS } from 'mobx';
import { Table } from 'antd';
import moment from 'moment';
import { useNavigate, Link } from 'react-router-dom';

const Todo = observer(() => {

  const { Counter: { searchedData, todoList, setArray, addTodo, removeTodo, editTodo, fetchPost } } = useStore("");
  const [input, setInput] = useState('');
  const [editId, setEditId] = useState('');
  const [isError, setIsError] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  let history = useNavigate();
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
      addTodo({ name: input, id: getId(), time: getTime() })
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
   
  const columns= [
    {
      title: 'Keyword',
      dataIndex: 'keyword',
      key: 'name',
      render: (_ : any, data: any) => {
       
        return  <div style={{fontWeight: 'bold'}}>{data?.name}</div>
      },
      width:' 40%',
    },
    {
      title: 'Searched On',
      dataIndex: 'searched',
      key: 'searched',
      render: (_ : any, data: any) => {
       return <div style={{fontWeight: '600'}}>{moment(data?.time).format('D MMMM YYYY h  : mm : ss A')}</div>
      },
      width:' 40%',
    },
    {
      title: 'View Details',
      dataIndex: 'detail',
      key: 'details',
      render: (_ : any, data: any) => {
      return <div 
      onClick={()=>history(`detail/${data.name}`)}
      className={styles.dtlBtn}>{'View Details'}</div>
      },
      width:' 15%',
    },
    {
      title: 'Delete',
      dataIndex: 'options',
      key: 'options',
      render: (_ : any, data: any) => {
      return  <div
      onClick={()=>removeTodo(data.id)}
      ><FontAwesomeIcon icon={faTrash as IconProp} /></div>
      },
      width:' 5%',
    },
    {
      title: 'Edit',
      dataIndex: 'edit',
      key: 'edit',
      render: (_ : any, data: any) => {
      return  <div
      onClick={()=>editHandle(data)}
      ><FontAwesomeIcon icon={faEdit as IconProp} /></div>
      },
      width:' 5%',
    },

  ];

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
       
       {todoList && <Table 
       // @ts-ignore 
       columns={columns} 
       dataSource={[...todoList]}
       pagination={false}
        />}
      </div>
    </div>
  )
})

export default Todo;