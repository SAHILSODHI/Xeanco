import React, {useState, useEffect} from 'react'
import Layout from './Layout'
import {getCategories} from './apiCore'
import Card from './Card'

const Search = () =>{

    const [data, setData] = useState({
        categories: [],
        category: '', // store if a user picks a category
        search: '',
        result: [],
        searched: false
    })

    const {categories, category, search, result, searched} = data

    const loadCategories = () => {
        getCategories().then(data => {
            if(data.err){
                console.log(data.err)
            } else {
                setData({...data, categories: data})
            }
        })
    }
    
    useEffect(() => {
        loadCategories()
    }, [])

    const searchData = () => {
        console.log(category, search)
    }

    const searchSubmit = (e) => {
        e.preventDefault()
        searchData()
    }

    const handleChange = name => event => {
        setData({...data, [name]: event.target.value, searched: false})
    }

    const searchForm = () => (
        <form onSubmit = {searchSubmit}>
            <span className = 'input-group-text'>
                <div className = 'input-group input-group-lg'>
                    <div className = 'input-group-prepend'>
                        <select className = 'btn mr-2' onChange = {handleChange('category')}>
                            <option value = 'All'>Pick Category</option>
                            {categories.map((c, i) => (<option key = {i} value = {c._id}>{c.name}</option>))}
                        </select>
                    </div>
                    <input type = 'search' className = 'form-control' onChange = {handleChange('search')}
                    placeholder = 'Search By Name'></input>
                </div>
                <div className = 'btn input-group-append' style = {{border: 'none'}}>
                    <button className = 'input-group-text'>Search</button>
                </div>
            </span>
        </form>   
    )

    return (
        <div className = 'row'>
            <div className = 'container mb-3'>{searchForm()}</div>
        </div>
    )
}

export default Search
