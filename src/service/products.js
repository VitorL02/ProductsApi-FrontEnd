import axios from "axios";
import { http } from "./config";


export default{

    listProduct:() =>{
        return http.get('produtos');
    }

}