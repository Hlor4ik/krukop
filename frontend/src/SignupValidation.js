export default function validation(values){
    
    let error={}
    const loginreg = /^[a-z0-9_\.]+$/;
    const namereg = /[А-Яа-яЁё]{3,20}/;
    const emailreg = /^([a-zA-Z0-9_\-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;
    const passwordreg = /(?=^.{6,}$)(?=.*[0-9])(?=.*[A-Z])(?=.*[a-z]).*/;
    const phonereg = /^((8|\+7)[\- ]?)?(\(?\d{3}\)?[\- ]?)?[\d\- ]{7,10}$/;
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

    if(values.name===""){
        error.name="Не должно быть пустым"
    }
    else if (!namereg.test(values.name)) {
        error.name="Только русские буквы"
    }
    else{
        error.name=""
    }

    if(values.surname===""){
        error.surname="Не должно быть пустым"
    }
    else if (!namereg.test(values.surname)) {
        error.surname="Только русские буквы"
    }
    else{
        error.surname=""
    }

    if(values.patronymic===""){
        error.patronymic="Не должно быть пустым"
    }
    else if (!namereg.test(values.patronymic)) {
        error.patronymic="Только русские буквы"
    }
    else{
        error.patronymic=""
    }

    if(values.email===""){
        error.email="Не должно быть пустым"
    }
    else if (!emailreg.test(values.email)) {
        error.email="Некорректный ввод"
    }
    else{
        error.email=""
    }

    if(values.Phone===""){
        error.Phone="Не должно быть пустым"
    }
    else if (!phonereg.test(values.Phone)) {
        error.Phone="Некорректный ввод"
    }
    else{
        error.Phone=""
    }

    if(values.datebirth===""){
        error.datebirth="Не должно быть пустым"
    }
    
    else{
        error.datebirth=""
    }

    return error;
}