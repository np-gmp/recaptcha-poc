import { Grid } from '@mui/material';
import MyForm from "./modules/form";

function App() {
  return (
    <Grid container spacing={2} justifyContent="center" alignItems="center" style={{marginTop:'15rem'}}>
      <MyForm />
    </Grid>
  );
}

export default App;
