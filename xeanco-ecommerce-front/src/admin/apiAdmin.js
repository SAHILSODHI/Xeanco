import {API} from '../config'

export const createCategory = (userId, token, category) => {
    // send header and request body
    return fetch(`${API}/category/create/${userId}`,{
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(category)
    })
        .then(response => {
            return response.json()
        })
        .catch(err => {
            console.log(err)
        })
}

export const createProduct = (userId, token, product) => {
    // send header and request body
    return fetch(`${API}/product/create/${userId}`,{
        method: 'POST',
        headers: {
            Accept: 'application/json',
            // we have image and we are sending form data
            Authorization: `Bearer ${token}`
        },
        body: product
    })
        .then(response => {
            return response.json()
        })
        .catch(err => {
            console.log(err)
        })
}

export const getCategories = () => {
    return fetch(`${API}/categories`,{
        method: 'GET'
    })
    .then(response => {
        return response.json()
    })
    .catch(err => console.log(err))
}
