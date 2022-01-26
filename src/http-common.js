import axios from "axios"
//configuring axios to have this header on every requests
axios.defaults.headers.common['Authorization'] = localStorage.getItem('token')

export default function http (){


    return axios.create({
        baseURL:'https://alejandro-restaurant-api.herokuapp.com/api/v1',
        timeout: 10000
    })
}