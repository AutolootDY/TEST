import './App.css';
import {BrowserRouter,Routes,Route } from 'react-router-dom'
import LoginScreen from './screen/LoginScreen';
import RegisterScreen from './screen/RegisterScreen';
import HomeScreen from './screen/HomeScreen';
import ResetPasswordScreen from './screen/ResetPasswordScreen';
import ForgotPasswordScreen from './screen/ForgotPasswordScreen';
import ForgotPasswordSucceedScreen from './screen/ForgotPasswordSucceedScreen';
import RegisterSucceedScreen from './screen/RegisterSucceedScreen';
import LogScreen from './screen/LogScreen';
import LoadingScreen from './screen/LoadingScreen';
import ErrorScreen from './screen/ErrorScreen';
import {AuthProvider} from './auth/Auth';
import Dash from './screen/Dashboard';
import PhysicalTest from './test/PhysicalTest';
import TheoryTest from './test/TheoryTest';
import PracticalTest from './test/PracticalTest';
import TestResultStatus from './test/TestResultStatus'
import TestResultsReport from './test/TestResultsReport'


function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<LoginScreen/>}/>
          <Route path='/register' element={<RegisterScreen/>}/>
          
          <Route path='/Dash' element={<Dash/>}/>

          <Route path='/home' element={<HomeScreen/>}/>
          <Route path='/forgotPass' element={<ForgotPasswordScreen/>}/>
          <Route path='/ForgotPassScreen/:token' element={<ForgotPasswordSucceedScreen/>}/>
          <Route path='/resetPass' element={<ResetPasswordScreen/>}/>

          <Route path='/PhysicalTest' element={<PhysicalTest/>}/>
          <Route path='/TheoryTest' element={<TheoryTest/>}/>
          <Route path='/PracticalTest' element={<PracticalTest/>}/>
          <Route path='/TestResultStatus' element={<TestResultStatus/>}/>
          <Route path='/TestResultsReport' element={<TestResultsReport/>}/>


          <Route path='/RegisterSucceedScreen/:token' element={<RegisterSucceedScreen/>}/>
          <Route path='/Log/:date/:email/:statusEmail/:statusLogin/:page' element={<LogScreen/>}/>
          <Route path='/loading' element={<LoadingScreen/>}/>
          <Route path='/error' element={<ErrorScreen/>}/>
          <Route path='*' element={<ErrorScreen/>}/>
        </Routes>
      </BrowserRouter>
    </AuthProvider>

  );
}

export default App;
