import React, { useState } from "react";
import { Link, useNavigate } from 'react-router-dom';
import './SignupValidation'
import './App.css';
import validation from "./SignupValidation";
import axios from 'axios';

export default function Changepass(){
    const [values,setValues]=useState({
        email:''
    })
    const [errors,setErrors]=useState({})
    const handleInput=(event)=>{
        setValues(prev=>({...prev,[event.target.name]:[event.target.value]}));
    }
    const navigat= useNavigate();
    const handleSubmit=(event)=>{
      event.preventDefault();
      setErrors(validation(values));
      if(errors.email===""){
          axios.post('http://localhost:8081/forgot-password',values)
          .then(res=>{
            if(res.data==="Success"){
              alert("Сообщение отправлено на вашу почту")
              navigat('/reset-password')
            }
            else{
                alert("Не удалось отправить сообщение")
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
          <Link to="/login" class="tologin"><button class="Btnlink">Войти</button></Link>
        </header>
        <main>
        <div class="Registration1">
        <form action=""  onSubmit={handleSubmit}>
          <div style={{background:"grey",width:"100%", marginTop: "0"}}><h1 style={{marginLeft:"5%", marginTop: "0"}}>Восстановление пароля</h1></div>
          <div class="form" style={{}}>
        Email
        <input style={{marginLeft:"120px",width:"50%",height:"30px",borderRadius:"7px"}}
          name="email"
          type="text"
          placeholder="ivanovii@mail.ru"
          onChange={handleInput}
        />
        <p>{errors.email && <span style={{color:"red"}}className='text-danger'>{errors.email}</span>}</p>
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