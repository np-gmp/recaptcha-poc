export const validateHuman = async(token) => {
    try{
        const response = await fetch(
            `https://www.google.com/recaptcha/api/siteverify?secret=${process.env.REACT_APP_RECAPTCHA_SECRET_KEY}&response=${token}`,
            {
              method: "POST",
            }
          );
          const data = await response.json();
          console.log(data)
          return data.success;
    }catch(e){
        console.log(e.message)
        return false
    }
}