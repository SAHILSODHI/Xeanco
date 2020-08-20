import React, {useState, useEffect} from 'react'
import Layout from './Layout'
import {getCategories} from './apiCore'
import Checkbox from './Checkbox'

const Shop = () => {
    const [categories, setCategories] = useState([])
    const [error, setError] = useState(false)
    const [myFilters, setMyFilters] = useState({
        filters: {category: [], price: []}
    })
    const init = () => {
        getCategories().then(data => {
            if(data.error){
                setError(data.error)
            } else{
                setCategories(data)
            }
        })
    }

    useEffect(() => {
        init()
    }, [])

    const handleFilters = (filters, filterBy) => {
        const newFilters = {...myFilters}
        newFilters.filters[filterBy] = filters
        setMyFilters(newFilters)
    }

    return (
        <Layout title = 'Shop Page' description = 'Search books of your choice' className = 'container-fluid'>
            <div className = 'row'>
                <div className = 'col-4'>
                    <h4>Filter by categories</h4>
                    <ul>
                        <Checkbox categories = {categories} handleFilters = {filters => handleFilters(filters, 'category')}/>
                    </ul>
                </div>
                <div className = 'col-8'>
                    {JSON.stringify(myFilters)}
                </div>
            </div>
        </Layout>
    )
}

export default Shop
