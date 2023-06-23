import React, { useState } from "react";
import { Link, useNavigate } from 'react-router-dom';
import './LoginValidation'
import './App.css';
import validation from "./LoginValidation";
import axios from 'axios';

export default function Login(){
    const [values,setValues]=useState({
        login:'',
        password:''
    })
    const [errors,setErrors]=useState({})
    const handleInput=(event)=>{
        setValues(prev=>({...prev,[event.target.name]:[event.target.value]}));
    }
    const navigat= useNavigate();
    const handleSubmit=(event)=>{
        event.preventDefault();
        setErrors(validation(values));
        if(errors.login===""&&errors.password===""){
            axios.post('http://localhost:8081/login',values)
            .then(res=>{
                if(res.data==="Success"){
                    navigat('/home')
                }
                else{
                    alert("No Record")
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
        <Link to="/" class="tologin"><button class="Btnlink">Зарегистрироваться</button></Link>
      </header>
      <main>
      <div class="Registration2">
      <form action="" onSubmit={handleSubmit}>
        <div style={{background:"grey",width:"100%", marginTop: "0"}}><h1 style={{marginLeft:"5%", marginTop: "0"}}>Вход</h1></div>
        <div class="form" style={{}}>
        Логин
        <input style={{marginLeft:"110px",width:"50%",height:"30px",borderRadius:"7px"}}
          type="text"
          name="login"
          placeholder="ivanovii"
          onChange={handleInput}
          
        />
        <p>{errors.login && <span style={{color:"red"}}className='text-danger'>{errors.login}</span>}</p>
        
        Пароль 
        <input style={{marginLeft:"100px",width:"50%",height:"30px",borderRadius:"7px"}}
          name="password"
          type="password"
          placeholder="****************"
          onChange={handleInput}
          
        />
        
        <p>{errors.password && <span style={{color:"red"}} className='text-danger'>{errors.password}</span>}</p>
        <Link to="/forgot-password" class="tochange"><button class="Btnlinkpass">Забыли пароль?</button></Link>
        <button type="submit" class="btn1">Войти</button>
        
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
