import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './App.css';
import './SignupValidation';
import validation from "./SignupValidation";
import axios from 'axios';

export default function SignUp(){
  const [values,setValues]=useState({
        login:'',
        password:'',
        name:'',
        surname:'',
        patronymic:'',
        email:'',
        Phone:'',
        datebirth:''
    })
    
    const navigate=useNavigate();
    const [errors,setErrors]=useState({})
    const handleInput=(event)=>{
        setValues(prev=>({...prev,[event.target.name]:[event.target.value]}));
    }
    const handleSubmit=(event)=>{
      event.preventDefault();
      setErrors(validation(values));
      if(errors.login===""&& errors.email===""&&errors.password===""&&errors.name===""&&errors.surname===""&&errors.patronymic===""&&errors.Phone===""&&errors.datebirth===""){
        axios.post('http://localhost:8081/',values)
        .then(res=>{
          if(res.data === "Login already exists"){
            alert("Логин уже существует");
          } else {
            navigate('/login');
          }
        })
        .catch(err=>console.log(err));
      }
    }; 

    return(
        <div className="SignUp">
      <header>
        <div class="head"></div>
        <div class="headimage"></div>
        <Link to="/login" class="tologin"><button class="Btnlink">Войти</button></Link>
      </header>
      <main>
      <div class="Registration">
      <form action="" onSubmit={handleSubmit}>
        <div style={{background:"grey",width:"100%", marginTop: "0"}}><h1 style={{marginLeft:"5%", marginTop: "0"}}>Регистрация</h1></div>
        <div class="form">
        
        Логин
        <input style={{marginLeft:"110px",width:"50%",height:"30px",borderRadius:"7px"}}
          name="login"
          type="text"
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
         <p>{errors.login && <span style={{color:"red"}}className='text-danger'>{errors.login}</span>}</p>
        
        Имя
        <input style={{marginLeft:"125px",width:"50%",height:"30px",borderRadius:"7px"}}
          name="name"
          type="text"
          placeholder="Иван"
          onChange={handleInput}
        />
        <p>{errors.name && <span style={{color:"red"}}className='text-danger'>{errors.name}</span>}</p>
        
        Фамилия
        <input style={{marginLeft:"90px",width:"50%",height:"30px",borderRadius:"7px"}}
          name="surname"
          type="text"
          placeholder="Иванов"
          onChange={handleInput}
        />
        <p>{errors.surname && <span style={{color:"red"}}className='text-danger'>{errors.surname}</span>}</p>
        
        Отчество
        <input style={{marginLeft:"90px",width:"50%",height:"30px",borderRadius:"7px"}}
          name="patronymic"
          type="text"
          placeholder="Иванович"
          onChange={handleInput}
        />
        <p>{errors.patronymic && <span style={{color:"red"}}className='text-danger'>{errors.patronymic}</span>}</p>
        Email
        <input style={{marginLeft:"120px",width:"50%",height:"30px",borderRadius:"7px"}}
          name="email"
          type="text"
          placeholder="ivanovii@mail.ru"
          onChange={handleInput}
        />
        <p>{errors.email && <span style={{color:"red"}}className='text-danger'>{errors.email}</span>}</p>
       
        Телефон
        <input style={{marginLeft:"95px",width:"50%",height:"30px",borderRadius:"7px"}}
          name="Phone"
          type="text"
          placeholder="8-XXX-XXX-XXXX"
          onChange={handleInput}
        />
        <p>{errors.Phone && <span style={{color:"red"}}className='text-danger'>{errors.Phone}</span>}</p>
        
        Дата рождения
        <input style={{marginLeft:"50px",width:"50%",height:"30px",borderRadius:"7px"}}
          name="datebirth"
          type="date"
          onChange={handleInput}
        />
        <p>{errors.datebirth && <span style={{color:"red"}}className='text-danger'>{errors.datebirth}</span>}</p>
        
        <button type="submit" class="btn">Зарегистрироваться</button>
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