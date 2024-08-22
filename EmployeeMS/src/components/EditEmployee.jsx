import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';


const EditEmployee = () => {

    const {id}= useParams();

    const [employee, setEmployee] = useState({
        name:'',
        email:'',
        category_id:'',
        address:'',
        salary:''
    
      });

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


    axios.get('http://localhost:3000/auth/employee/'+id)
    .then(result =>{
      setEmployee({
        ...employee,
        name:result.data.Result[0].name,
        email:result.data.Result[0].email,
        address:result.data.Result[0].address,
        salary:result.data.Result[0].salary,
        category_id:result.data.Result[0].category_id

      })

    }).catch(err=>console.log(err))
  },[])


      const handleSubmit=(e)=>{
          e.preventDefault();
          axios.put('http://localhost:3000/auth/edit_employee/'+id, employee)
          .then(result =>{
            if(result.data.Status) {
              navigate('/dashboard/employee')
          }else{
              alert(result.data.Error)
          }
      
          }).catch(err=>console.log(err))

      }

  return (
    <div className='d-flex justify-content-center align-items-center mt-3'>
    <div className='p-3 rounded w-50 border '>
    <h3 className='text-center'>Edit Employee</h3>
    <form className='row g-1' onSubmit={handleSubmit}>
        <div className='col-12'>
   <label className='form-label' htmlFor='inputName'><strong>Name</strong></label>
     <input id='inputName' type='text' value={employee.name} name='name' placeholder='Enter Employee Name'
      className='form-control rounded-0'  onChange={(e) =>setEmployee({ ...employee, name: e.target.value})}  />
        
        </div>
        <div className='col-12'>
   <label className='form-label' htmlFor='inputEmail'><strong>Email</strong></label>
     <input id='inputEmail' type='email' value={employee.email} name='email' placeholder='Enter Email'
      className='form-control rounded-0' autoComplete='off'  onChange={(e) =>setEmployee({ ...employee, email: e.target.value})} />
        
        </div>
     
        <div className='col-12'>
 
   <label className='form-label' htmlFor='inputSalary'><strong>Salary</strong></label>
     <input id='' type='text' value={employee.salary} name='salary' placeholder='Enter Salary'
      className='form-control rounded-0'  onChange={(e) =>setEmployee({ ...employee, salary: e.target.value})} />
        
        </div>
        <div className='col-12'>
   <label className='form-label' htmlFor='category'><strong>Address</strong></label>
     <input id='inputAddress' type='text' value={employee.address} name='address' placeholder='Enter Address'
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
       
        <button className='btn btn-success w-100 rounded-0 mb-2'>EDIT EMPLOYEE</button>

    </form>

    </div></div>
  )
}

export default EditEmployee;