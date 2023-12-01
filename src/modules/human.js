import { Grid } from "@mui/material"
import { useEffect } from "react"

const Human = () =>{
    useEffect(()=>{
        let loggedIn = sessionStorage.getItem('isLoggedIn')
        if(!loggedIn){
            window.location.href = '/'
        }
    },[])
    return <>
    <Grid container justifyContent={'center'}>
        <h1>You are a Human !!</h1>
    </Grid>
    </>
}

export default Human