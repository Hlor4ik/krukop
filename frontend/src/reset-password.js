import React, { useState } from "react";
import { Link, useNavigate } from 'react-router-dom';
import './App.css';
import axios from 'axios';
import './LoginValidation';
import validation from "./LoginValidation";

export default function Changepass2(){
    const [values,setValues]=useState({
      resetToken:'',
      password:''
    })
    const [errors,setErrors]=useState({})
    
    const handleInput=(event)=>{
      setValues(prev=>({...prev,[event.target.name]:event.target.value}));
    }
    const navigato= useNavigate();
    const handleSubmit=(event)=>{
      event.preventDefault();
      setErrors(validation(values));
      if(errors.password===""){
        axios.post(('http://localhost:8081/reset-password'),values)
        .then(res=>{
          if(res.data==="Success"){
            alert("Пароль поменян");
            navigato('/login');
          }
          else{
              alert("Не верный код")
          }
        })
        .catch(err=>console.log(err));
      }
    }
    
    return(
        <div className="SignUp">
        <header>
          <div class="head"></div>
          <div class="headimage"></div>
        </header>
        <main>
        <div class="Registration2">
        <form action="" onSubmit={handleSubmit}>
          <div style={{background:"grey",width:"100%", marginTop: "0"}}><h1 style={{marginLeft:"5%", marginTop: "0"}}>Изменение пароля</h1></div>
          <div class="form" style={{}}>
         Код
        <input style={{marginLeft:"100px",width:"50%",height:"30px",borderRadius:"7px"}}
          type="text"
          name="resetToken"
          onChange={handleInput}
        />
        <br></br>
        <br></br>
          Пароль 
        <input style={{marginLeft:"70px",width:"50%",height:"30px",borderRadius:"7px"}}
          name="password"
          type="password"
          placeholder="****************"
          onChange={handleInput}
        />
        <p>{errors.password && <span style={{color:"red"}} className='text-danger'>{errors.password}</span>}</p>
          <button type="submit" value="submit" class="btn" >Изменить пароль</button>
          </div>
        </form>
        </div>
        </main>
        <footer>
        <div class="foot"></div>
        </footer>
      </div>
    )
  }