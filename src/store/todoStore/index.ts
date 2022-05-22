
import { toJS } from "mobx";
import { cast, flow, types, } from "mobx-state-tree";


const todoModal = types.model({
    id: types.maybeNull(types.string),
    name: types.maybeNull(types.string)
})
export const Counter = types.model('counter', {
    todoList: types.maybeNull(types.array(todoModal)),
    isEdit: types.maybeNull(types.boolean)

}).actions((self: any) => {
    const setArray = (array: any) => {
        self.todoList = array;
    }
    const addTodo = (item: any) => {
        self.todoList.push(item);
    }
    const removeTodo = (id: string) => {
        var index = self.todoList.findIndex((i: any) => i.id === id);
        if (index > -1) {
            self.todoList.splice(index, 1);
        } else {
            return self.todoList;
        }
    }
    const editTodo = (name: string, id: string) => {
        var index = self.todoList.findIndex((i: any) => i.id === id);
        if (index > -1) {
            self.todoList[index].name = name;
        } else {
            return self.todoList;
        }
    }

    const fetchData = flow(function* fetchData() {
        //     const responce = yield axios.get('https://jsonplaceholder.typicode.com/users');
        //    self.jsonData  =(responce.data.map(item =>item.name))
        //    return self.jsonData
    })

    const fetchPost = flow(function* fetchPost() {
        //  const postResponce = yield axios.get('https://jsonplaceholder.typicode.com/posts')
        //  self.postData = postResponce.data.map(item=>item.body);
        //  return self.postData;
    })

    return { addTodo, removeTodo, setArray, fetchData, fetchPost, editTodo }
})





export function initCounter() {

    return Counter.create({
        todoList: [],
        isEdit: false,
    })
};