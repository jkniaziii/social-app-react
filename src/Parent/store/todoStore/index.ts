
import axios from "axios";
import { toJS } from "mobx";
import { cast, flow, types, } from "mobx-state-tree";


const todoModal = types.model({
    id: types.maybeNull(types.string),
    name: types.maybeNull(types.string),
    time: types.maybeNull(types.number)
})

const ImageModal = types.model({
    src: types.maybeNull(types.string),
})

const PageMapModal =  types.model({
    cse_image: types.maybeNull(types.array(ImageModal)),
    name: types.maybeNull(types.string)
})

const SearchedModal = types.model({
    title: types.maybeNull(types.string),
    snippet: types.maybeNull(types.string),
    pagemap: types.maybeNull(PageMapModal)
})
export const Counter = types.model('counter', {
    todoList: types.maybeNull(types.array(todoModal)),
    searchedData: types.maybeNull(types.array(SearchedModal)),

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

    const fetchPost = flow(function* fetchPost() {
        const postResponce = yield axios.get(`https://www.googleapis.com/customsearch/v1?key=AIzaSyCmzL3tm9ZO_30XEB-vL1t0p-bcxsXhRPM&cx=df37df1fcdbabcdf8&q=pakistan`)
         self.searchedData = postResponce?.data?.items
        console.log("postResponce ___", postResponce.data.items)
    })



    return { addTodo, removeTodo, setArray, fetchPost, editTodo }
})





export function initCounter() {

    return Counter.create({
        todoList: [],
       
    })
};