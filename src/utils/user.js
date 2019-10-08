const isValidPassword = (password) =>{
   return password.length >= 8 && !password.toLowerCase().includes('password');
}

const getFirstName = (fullName) => {
    return fullName.split(' ')[0];
}

const getLastName = (fullName) => {
    return fullName.split(' ')[1];
}
export {isValidPassword, getFirstName, getLastName};