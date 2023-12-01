import React, { useRef, useState } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { Grid } from '@mui/material';
import ReCAPTCHA from 'react-google-recaptcha';
import { validateHuman } from '../captcha-service';

const MyForm = () => {
  const [mobileNumber, setMobileNumber] = useState('');
  const [vehicleNumber, setVehicleNumber] = useState('');
  const [error, setError] = useState({mobileNumber:'', vehicleNumber:'', captcha:''})
  const [captchaKey , setCaptchaKey] = useState('')
  const captchaRef = useRef(); // for INVISIBLE SIZE 
  
  const handleSubmit = async(e) => {
    e.preventDefault();
    let hasError = false
    let err = {}
    if(!mobileNumber){
      err = {...err,mobileNumber:'Please enter Mobile Number'}
      hasError = true
    }
    if(!vehicleNumber){
      err = {...err,vehicleNumber:'Please enter Vehicle Number'}
      hasError = true
    }
    if(!captchaKey){
      err = {...err,captcha:'Please Validate Captcha'}
      hasError = true
    }
    if(hasError){
      setError(err);
      return
    }
    let isHuman = await validateHuman(captchaKey)
    captchaRef.current.reset();
    setCaptchaKey('') //after reset remove value from state
    sessionStorage.setItem('isLoggedIn',true) 
    if(isHuman){
     window.location.href = '/human'
    }
    
    
    // for INVISIBLE SIZE
    // const token = await captchaRef.current.executeAsync();
    // console.log(token)
  };

  return (
    <form onSubmit={handleSubmit}>
      <TextField
        error = {error.mobileNumber != '' ? true : false}
        type='number'
        label="Mobile Number"
        variant="outlined"
        fullWidth
        value={mobileNumber}
        onChange={(e) => {
          setMobileNumber(e.target.value)
          setError({...error,mobileNumber:''})}}
        margin="normal"
        helperText ={ error.mobileNumber}
      />
      <TextField
        error = {error.vehicleNumber != '' ? true : false}
        label="Vehicle Number"
        variant="outlined"
        fullWidth
        value={vehicleNumber}
        onChange={(e) => {
          setVehicleNumber(e.target.value)
          setError({...error,vehicleNumber:''})}}
        margin="normal"
        helperText={error.vehicleNumber}
      />
      <ReCAPTCHA 
        ref={captchaRef} //for INVISIBLE SIZE
        size='normal'
        type='audio'
        sitekey={process.env.REACT_APP_RECAPTCHA_SITE_KEY} 
        onChange={(val)=>{setCaptchaKey(val)
          setError({...error,captcha:''}
          )}} // for NORMAL & COMPACT SIZE
      />
      {error.captcha && (
        <span style={{color:'#d32f2f',fontSize:'0.75rem',marginLeft:'1rem'}}>
          {error.captcha}
        </span>
      )}
      <Grid container justifyContent="center" alignItems="center" style={{marginTop:'1rem'}}>
        <Button type="submit" variant="contained" color="primary" >
            Submit
        </Button>
      </Grid>
    </form>
  );
};

export default MyForm;
