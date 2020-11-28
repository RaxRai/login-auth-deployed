import React, { useState } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import EmailIcon from '@material-ui/icons/Email';
import LockIcon from '@material-ui/icons/Lock';
import AllInclusiveIcon from '@material-ui/icons/AllInclusive';
import Typography from '@material-ui/core/Typography';
import { makeStyles  } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import {toast} from 'react-toastify';
import Axios from 'axios';
import ReactLoading from "react-loading";

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://spacecode.com/">
        SpaceCode SAS
      </Link>{' '}
      {new Date().getFullYear()}
      {'. All rights reserved.'}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
    formContainer: {
        display: 'flex',
        height: '100vh',
        width: '100vw',
        justifyContent: 'center',
        alignItems: 'center'
    },
  paper: {
    marginTop: theme.spacing(2),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
    justifyContent: 'center',
    alignItems: 'center'
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
    backgroundColor: 'teal'
  },
  container: {
      display: 'flex',
      flexDirection: 'column',
      height: "70% !important",
      width: "80%",
      backgroundColor : 'whitesmoke',
      boxShadow: '0px 1px 6px -2px #000000',
      borderRadius: '5px'
  }
}));



export default function SignIn(props) {
    const [account, setAccount] = useState({ email: "", password: "" });
  const [error, setError] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const handleChange = (property, event) => {
    const accountCopy = {...account};
    accountCopy[property] = event.target.value;
    setAccount(accountCopy);
    validate(property);
  };
  const validate = (property) => {
    property === "email" ? validateEmail() : validatePassword();
  };

  const validateEmail=()=> {
        const newErrors = { ...error };
        const emailformat = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
        if (account.email.match(emailformat)) {
            newErrors.email = "";
        }else{
            newErrors.email = "please enter a valid email";
        }
        setError(newErrors);
    };


  const validatePassword = () => {
    const newErrors = { ...error };
    if (account.password.length < 6) {
      newErrors.password = "Password should be greater than 6 chars";
    } else {
      newErrors.password = "";
    }
    setError(newErrors);
  };
  const classes = useStyles();

  const handleSubmit=(e)=>{
      e.preventDefault();
      setLoading(true);
      Axios.post("http://iqc.jeweltrace.in/api/v1/auth/login", account).then((res)=>{
          //console.log(res)
          if(!res.data.status){
            toast.error("Login Failed, Please check login details");
            setLoading(false);
            return
          }
          toast.success("Login Succesfull");
          localStorage.setItem("token" , res.data.data.token);
          props.history.push("./dashboard");
          setLoading(false);
      }).catch((err)=>{
          console.log(err);

      })
  }
  return (
    <div className={classes.formContainer}>
    <Container component="main" maxWidth="xs" className={classes.container}>
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <AllInclusiveIcon />
        </Avatar>
        <Typography component="h1" variant="h4" style={{fontWeight : 700 }}>
          infinity visibility
        </Typography>
        <form className={classes.form} onSubmit={handleSubmit}>

        <Grid container spacing={1} alignItems="flex-end">
            <Grid container item xs={1}>
                <EmailIcon/>
            </Grid>
            <Grid container item xs={11}>
                <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="email"
                    label="Email Address"
                    name="email"
                    autoFocus
                    value={account.email}
                    error={!!error.email}
                    helperText={error.email}
                    autoComplete="off"
                    onChange={(event) => handleChange("email", event)}
                />
            </Grid>
        </Grid>
        <Grid container spacing={1} alignItems="flex-end">
            <Grid container item xs={1}>
                <LockIcon/>
            </Grid>
            <Grid container item xs={11}>
                <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                value={account.password}
                error={!!error.password}
                helperText={error.password}
                autoComplete="off"
                onChange={(event) => handleChange("password", event)}
                />
            </Grid>
        </Grid>

          {loading ? (<ReactLoading type="spin" color="#sss" />) : (<Button
            type="submit"
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Login
          </Button>) }


        </form>
        <Box mt={8}>
            <Copyright />
        </Box>
      </div>

    </Container>
    </div>
  );
}