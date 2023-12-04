export const validateHuman = async(token) => {
    try{
      // Google api call should initiated from server side only, here its throwing CORS error.
        const response = await fetch(
            `https://www.google.com/recaptcha/api/siteverify?secret=${process.env.REACT_APP_RECAPTCHA_SECRET_KEY}&response=${token}`,
            {
              method: "POST",
              headers:{
                'Access-Control-Allow-Origin': '*',
                'Content-Type': 'application/x-www-form-urlencoded'
              },
        
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