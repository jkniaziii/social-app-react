
import axios from "axios";
import { toJS } from "mobx";
import { cast, flow, types, } from "mobx-state-tree";
import { API_KEY, SEARCH_ID } from "../../utils/Constants";


const ratingModal = types.model({
    count: types.maybeNull(types.number),
    rate: types.maybeNull(types.number),
});

const productModal = types.model({
    id: types.maybeNull(types.number),
    price: types.maybeNull(types.number),
    category: types.maybeNull(types.string),
    description: types.maybeNull(types.string),
    image: types.maybeNull(types.string),
    title: types.maybeNull(types.string),
    rating: types.maybeNull(ratingModal),
})


export const Cart = types.model('counter', {
    products: types.maybeNull(types.array(productModal)),
    isLoading: types.boolean,
   
}).actions((self: any) => {
   
    const fetchData = flow(function* fetchData() {
       self.isLoading = true;
       try{
        const responce = yield axios.get('https://fakestoreapi.com/products');
        self.products = [...responce?.data]
       } catch (e) {
         console.log("responce ___", e)
       } finally{
        self.isLoading = false;
       }
    })

    return { fetchData }
})





export function initCart() {

    return Cart.create({
        products : [],
        isLoading: false
    })
};