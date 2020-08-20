import React, {useState} from 'react'
import Layout from '../core/Layout'
import {Redirect} from 'react-router-dom'
import {signin, authenticate, isAuthenticated} from '../auth'

const Signin = () => {
    const[values, setValues] = useState({
        email: 'sahilsingh@gmail.com',
        password: '123456',
        error: '',
        loading: false,
        redirectToReferrer: false
    })

    const {name, email, password, error, loading, redirectToReferrer} = values
    const {user} = isAuthenticated()

    const clickSubmit = event => {
            setValues({...values, error: false, loading: true})
            // destructure values to create a new user
            event.preventDefault()
            // sigin a new user, this would be moved to a different API file
            signin({name, email, password})
            .then(data => {
                if(data.error){
                    setValues({...values, error: data.error, loading: false})
                } else{
                    authenticate(data, 
                        () => {
                        setValues({
                        ...values,
                        redirectToReferrer : true
                    })
                        })
                }
            })
    }

    const handleChange = name => event => {
        setValues({...values, error: false, [name]: event.target.value})
    }

    const signInForm = () =>
    (
        // value in input used to manipulate input values
        <form>
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

    const showLoading = () =>(
        loading && (
            <div className='alert alert-info'><h2>Loading</h2></div>
        )
    )

    // redirect user after successful login
    const redirectUser = () =>{
        if(redirectToReferrer){
            if(user && user.role === 1){
                return <Redirect to='/admin/dashboard' />
            } else{
                return <Redirect to='/user/dashboard' />
            }
        }
        if(isAuthenticated()){
            return <Redirect to = '/' />
        }
    }

    return(
        <Layout title='SignIn' description = 'Welcome to Xeanco!!' className='container col-md-8 offset-2'>
            {showLoading()}
            {showError()}
            {signInForm()}
            {redirectUser()}
            {/* {JSON.stringify(values)} */}
        </Layout>
    )
}

export default Signin
