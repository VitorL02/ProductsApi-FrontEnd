import axios from "axios";
import { http } from "./config";


export default{

    listProduct:() =>{
        return http.get('produtos');
    },
    saveProduct:(produto)=>{
        return http.post('produto',produto);
    },
    editProduct: (produto)=>{
        return http.put('produto',produto);
    },
    deleteProduct:(id)=>{
        return http.delete(`produto/${id}`,id);
    }

}