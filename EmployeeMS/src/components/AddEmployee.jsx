import React , {useEffect, useState} from 'react';
import Category from './Category';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AddEmployee = () => {

  const [employee, setEmployee] = useState({
    name:'',
    email:'',
    password:'',
    address:'',
    salary:'',
    category_id:''

  })

    const [category, setCategory]=useState([]);
    const navigate = useNavigate();


    useEffect(()=> {
        axios.get('http://localhost:3000/auth/category')
        .then(result =>{
        if(result.data.Status) {
          setCategory(result.data.Result);
        } else {
          alert(result.data.Error)
        }
    
        }).catch(err=>console.log(err))
      },[]);

      const handleSubmit = (event) =>{  
        event.preventDefault();
        axios.post('http://localhost:3000/auth/add_employee', employee)
        .then(result =>{
          if(result.data.Status) {
              navigate('/dashboard/employee')
          }else{
              alert(result.data.Error)
          }
      })
      .catch(err =>console.log(err))
  }

  return (
    <div className='d-flex justify-content-center align-items-center mt-3'>
    <div className='p-3 rounded w-50 border '>
    <h3 className='text-center'>Add Employee</h3>
    <form className='row g-1' onSubmit={handleSubmit}>
        <div className='col-12'>
   <label className='form-label' htmlFor='inputName'><strong>Name</strong></label>
     <input id='inputName' type='text' name='name' placeholder='Enter Employee Name'
      className='form-control rounded-0'  onChange={(e) =>setEmployee({ ...employee, name: e.target.value})}  />
        
        </div>
        <div className='col-12'>
   <label className='form-label' htmlFor='inputEmail'><strong>Email</strong></label>
     <input id='inputEmail' type='email' name='email' placeholder='Enter Email'
      className='form-control rounded-0' autoComplete='off'  onChange={(e) =>setEmployee({ ...employee, email: e.target.value})} />
        
        </div>
        <div className='col-12'>
   <label className='form-label' htmlFor='inputPassword'><strong>Password</strong></label>
     <input id='inputPassword' type='password' name='password' placeholder='Enter Pasword'
      className='form-control rounded-0'  onChange={(e) =>setEmployee({ ...employee, password: e.target.value})} />
        
        </div>
        <div className='col-12'>
 
   <label className='form-label' htmlFor='inputSalary'><strong>Salary</strong></label>
     <input id='' type='text' name='salary' placeholder='Enter Salary'
      className='form-control rounded-0'  onChange={(e) =>setEmployee({ ...employee, salary: e.target.value})} />
        
        </div>
        <div className='col-12'>
   <label className='form-label' htmlFor='category'><strong>Address</strong></label>
     <input id='inputAddress' type='text' name='address' placeholder='Enter Address'
      className='form-control rounded-0'  onChange={(e) =>setEmployee({ ...employee, address: e.target.value})}   />
        
        </div>
        <div className='col-12 '>
   <label className='form-label' htmlFor='category'><strong>Category</strong></label>
   <select name='category' id='category' className='form-select'  onChange={(e) =>setEmployee({ ...employee, category_id: e.target.value})}> 
    {
        category.map(c=>{
            return <option value={c.id}>{c.name}</option>
        })
    }
   </select>
    </div>
       
      
        <button className='btn btn-success w-100 rounded-0 mb-2'>ADD EMPLOYEE</button>

    </form>

    </div></div>
  )
}

export default AddEmployee;