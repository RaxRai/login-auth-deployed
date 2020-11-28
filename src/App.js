
import Axios from 'axios';
import './App.css';
import SignIn from './components/login';
import {BrowserRouter ,Route , Switch} from 'react-router-dom';
import {toast} from 'react-toastify';
import Dashboard from './components/dashboard';
import 'react-toastify/dist/ReactToastify.css';

toast.configure({
  autoClose: 2500,
  position: toast.POSITION.BOTTOM_RIGHT,
});

Axios.interceptors.request.use((config)=>{
  const token = localStorage.getItem('token');
  if(token){
    config.headers.Authorization = `${token}`;
  }
  return {
    ...config,
  }
},(error)=>{
  console.log(error);
});

function App() {
  return (
    <BrowserRouter >
      <Switch>
        <Route path='/dashboard' component={Dashboard}/>
        <Route path='/' component={SignIn}/>
      </Switch>
    </BrowserRouter>

  );
}

export default App;
