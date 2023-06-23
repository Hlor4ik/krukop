export default function validation(values){
    
    let error={}
    const loginreg = /^[a-z0-9_\.]+$/;
    const passwordreg = /(?=^.{6,}$)(?=.*[0-9])(?=.*[A-Z])(?=.*[a-z]).*/;
    if(values.login===""){
        error.login="Не должно быть пустым"
    }
    else if (!loginreg.test(values.login)) {
        error.login="Английски буквы и(или) цифры"
    }
    else{
        error.login=""
    }
    if(values.password===""){
        error.password="Не должно быть пустым"
    }
    else if (!passwordreg.test(values.password)) {
        error.password="Обязательна цифра и буква в верхнем и нижнем регистре,минимум 6 символов"
    }
    else{
        error.password=""
    }
    return error;
}
