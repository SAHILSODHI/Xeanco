import React, {useState} from 'react'
import Layout from '../core/Layout'
import {Link} from 'react-router-dom'
import {signup} from '../auth'

const Signup = () => {
    const[values, setValues] = useState({
        name: '',
        email: '',
        password: '',
        error: '',
        success: false
    })

    const {name, email, password, error, success} = values

    const clickSubmit = event => {
            setValues({...values, error: false})
            // destructure values to create a new user
            event.preventDefault()
            // signup a new user, this would be moved to a different API file
            signup({name, email, password})
            .then(data => {
                if(data.error){
                    setValues({...values, error: data.error, success: false})
                } else{
                    setValues({
                        ...values,
                        name: '',
                        email: '',
                        password: '',
                        error: '',
                        success: true
                    })
                }
            })
    }

    const handleChange = name => event => {
        setValues({...values, error: false, [name]: event.target.value})
    }

    const signUpForm = 
    (
        // value in input used to manipulate input values
        <form>
            <div className = 'form-group'>
                <label className='text-muted'>Name</label>
                <input onChange={handleChange('name')} type = 'text' className = 'form-control' value = {name}/>
            </div>
            <div className = 'form-group'>
                <label className='text-muted'>Email</label>
                <input onChange={handleChange('email')} type = 'email' className = 'form-control' value = {email}/>
            </div>
            <div className = 'form-group'>
                <label className='text-muted'>Password</label>
                <input onChange={handleChange('password')} type = 'password' className = 'form-control' value = {password}/>
            </div>
            <button onClick={clickSubmit} className='btn btn-primary'>Submit</button>
        </form>
    )

    const showError = () =>(
        <div className='alert alert-danger' style={{display: error ? '': 'none'}}>{error}</div>
    )

    const showSuccess = () =>(
        <div className='alert alert-info' style={{display: success ? '': 'none'}}>New account is created. 
        Please <Link to='/signin'>SignIn</Link></div>
    )

    return(
        <Layout title='Sign Up' description = 'Welcome to Xeanco!!' className='container col-md-8 offset-2'>
            {showSuccess()}
            {showError()}
            {signUpForm}
            {/* {JSON.stringify(values)} */}
        </Layout>
    )
}

export default Signup