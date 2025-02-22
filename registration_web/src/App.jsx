import { useState } from 'react'
import reactLogo from './assets/react.svg'
import google from './assets/Google.png'
import facebook from './assets/Facebook.png'
import emailLogo from './assets/Email.png'
import passwordLogo from './assets/Password.png'
import hide from './assets/Group.png'
import logo from './assets/Logo.png'
import bg from './assets/Illustration.png'
import viteLogo from '/vite.svg'
// import './App.css'

function App() {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const login = ()=>{
    if(!email.includes('@')){
      alert("email must contain @")
    }
    console.log("email :",email);
    console.log("password :",password);
  }
  const handleEmail = (event) => {
    setEmail(event.target.value);
  };const handlePassword = (event) => {
    setPassword(event.target.value);
  };
  // const showPassword = ()=>{}

  return (
    <section style={{ backgroundColor: "#5769d4" }} className="min-h-screen flex items-center justify-center
          font-mono">
      <div className="flex relative shadow-2xl bg-white rounded-2xl"> 
        <div  style={{ backgroundColor: "#3949ab"}} className="flex-col rounded-l-2xl justify-center items-center w-2xl xl:flex hidden">
            <div className="absolute m-10 top-0 left-0 text-black">
                <img src={logo} className='w-[80%]' alt="" />
            </div>
            <img src={bg} alt="" className=' object-cover w-[357px] h-[357px]'/>
            <h1 className='text-white text-2xl font-bold'>Welcome aboard my friend</h1>
            <h3 className='text-white text-sm'>just a couple of clicks and we start</h3>
        </div>
        <div className="flex flex-col p-20   items-center justify-center text-center gap-5 rounded-2xl">
        
        <h1 style={{color:'#3949ab'}} className="text-xl  pb-5">
          Log in
        </h1>
        <div className='w-[100%]'>
          <div className='flex flex-col justify-center gap-4'>
        <div className="flex border-1 p-1 rounded-xl  items-center text-left gap-1">
        <img src={emailLogo} alt="Email Icon"/>
          <input value={email} onChange={handleEmail} type="text" placeholder='Email' className='rounded-md p-1 w-[100%] outline-none'/>
        </div>
        <div className="flex gap-1 p-1 border-1 rounded-xl items-center">
          <img src={passwordLogo} alt="Email Icon"/>
          <input value={password} onChange={handlePassword} type={showPassword ? "text" : "password"} placeholder='Password' className='rounded-md p-1 w-[100%] outline-none'/>
          <img onMouseDown={() => setShowPassword(true)} onMouseUp={() => setShowPassword(false)} src={hide} className="float-right" alt="Email Icon"/>
        </div>
        </div>
          <span className='float-right pt-4'>Forgot password?</span>
          </div>
          <button onClick={login} style={{background:'#9ca4d5', color:'white'}} className='h-[40px] rounded-3xl w-[100%]'>Log in</button>
          <div className="flex items-center w-60">
            <div className="flex-grow border-t border-gray-300"></div>
            <span className="px-3 text-gray-500">Or</span>
            <div className="flex-grow border-t border-gray-300"></div>
          </div>
          <div className='flex w-[100%] flex-row gap-5'>
              <button className='flex p-1 w-1/2 border-1 rounded-2xl justify-center'><img src={google} alt="" /> &nbsp;google</button>
              <button className='flex p-1 w-1/2 border-1 rounded-2xl justify-center'><img src={facebook} alt="" />&nbsp;facebook</button>
          </div>
            <span>Have no account yet?</span>
            <button className='flex w-80 border-1 rounded-2xl justify-center'><span className='text- p-1'>Register</span></button>
          </div>
      </div>
      
    </section>
  )
}

export default App
