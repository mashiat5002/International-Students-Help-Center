function isValidPassword(password:string) {
  if (password.length < 8) {
    return {"res":"Invalid","reason":"Password must be at least 8 characters long."};
  }

  if (!/[A-Z]/.test(password)) {
    return {"res":"Invalid","reason":"Password must contain at least one uppercase letter."};
  }

  if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
    return {"res":"Invalid","reason":"Password must contain at least one special character."};
  }

  return {"res":"valid","reason":"valid"};
}
  export default isValidPassword;