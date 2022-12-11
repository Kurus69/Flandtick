import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/home';
import Tikets from './pages/tikets';
import Transaction from './pages/transaction';
import { useContext, useState, useEffect } from 'react';
import { UserContext } from './context/userContext';
import { API, setAuthToken } from './config/api';
import Tiket from './pages/admin/tiket';
import Train from './pages/admin/train';
import AddTiket from './component/admin/addtiket';


function App() {
  const [state, dispatch] = useContext(UserContext)
  const [isLoading, setIsLoading] = useState(true)
  useEffect(() => {
    if (localStorage.token) {
      setAuthToken(localStorage.token);
    }
    if (state.isLogin === false && !isLoading) {
    }
  }, [state]);

  const checkUser = async () => {
    try {
      const response = await API.get('/checkauth');
      if (response.status === 404) {
        return dispatch({
          type: 'AUTH_ERROR',
        });
      }
      let payload = response.data.data;
      payload.token = localStorage.token;
      dispatch({
        type: 'USER_SUCCESS',
        payload,
      });
      setIsLoading(false)
    } catch (error) {
      // console.log(error);
      setIsLoading(false)
    }
  };
  useEffect(() => {
    checkUser();
  }, []);
  return (
    <>
      {
        isLoading ? null :
          <>
            <Router>
              <Routes>
                <Route path='/' element={<Home />}></Route>
                <Route path='/tiket' element={<Tikets />}></Route>
                <Route path='/transaction' element={<Transaction />}></Route>
                <Route path='/invoice/:id' element={<Transaction />}></Route>
                <Route path='/admintiket' element={<Tiket />}></Route>
                <Route path='/formtiket' element={<AddTiket />}></Route>
                <Route path='/admintrain' element={<Train />}></Route>
              </Routes>
            </Router>
          </>
      }

    </>
  );
}

export default App;
