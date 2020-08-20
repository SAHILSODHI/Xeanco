import React, {useState, useEffect} from 'react'
const Checkbox = ({categories}) => {
    const [checked, setChecked] = useState([])

    const handleToggle = c => () => {
        const currentCategoryId = checked.indexOf(c)    // -1 if not found, else forst index
        const newCheckedCategoryId = [...checked]
        if(currentCategoryId === -1){
            newCheckedCategoryId.push(c)
        } else{
            newCheckedCategoryId.splice(currentCategoryId, 1) // take 1 item matched off
        }
        console.log(newCheckedCategoryId)
        setChecked(newCheckedCategoryId)
    }

    return categories.map((c, i) => (
        <li key = {i} className = 'list-unstyled'>
            <input onChange = {handleToggle(c._id)} value = {checked.indexOf(c._id === -1)} type = 'checkbox' className = 'form-check-input' />
            <label className = 'form-check-label'>{c.name}</label>
        </li>
    ))
}

export default Checkbox