import React from 'react'
import {BrowserRouter, Routes, Route} from "react-router-dom"
import "bootstrap/dist/css/bootstrap.min.css"
import Home from '../containers/Home'
import RestaurantDetail from '../containers/RestaurantDetail'
import Layout from '../components/Layout'
import Login from '../containers/Login'
import Register from '../containers/Register'
import Context from '../context/AppContext'
import Profile from '../containers/Profile'
import useInitialState from '../hooks/useInitialState'
import Review from '../containers/Review'
export default function App() {

    const initialState = useInitialState()
    return (
        <Context.Provider value={initialState}>
        <BrowserRouter>
            <Layout>
                <Routes>
                    <Route path="/" element={<Home />}/>
                    <Route path="/login" element={<Login />}/>
                    <Route path="/register" element={<Register />}/>
                    <Route path="/id/:id" element={<RestaurantDetail />}/>
                    <Route path="/profile" element={<Profile />}/>
                    <Route  path="/review/post/:id"element={<Review />}/>
                    <Route  path="/review/update/:id"element={<Review />}/>


                    <Route  path="*"element={<Home />}/>



                </Routes>
            </Layout>
        </BrowserRouter>
        </Context.Provider>
    )
}
