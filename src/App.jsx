import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import './App.css'

import Login from './auth/Login'
import Signup from './auth/Signup'
function App() {

  const [page, setPage] = useState("login");

  return (
    <>
      {
        page === "login"
        ? <Login setPage={setPage}/>
        : <Signup setPage={setPage}/>
      }
    </>
  );
}

export default App;










// function App() {
//   const [count, addCount] = useState(0)

//   const increment = ()=> {
//   if(count<10 ){
//     addCount((count) => count + 1)
//   } 
//   }

//   const decrement=() => {
//     if(count>0){
//     addCount((count) => count - 1)
//     }
//   }

//   return (
//     <> //fragment
//       <section id="center">


//         <div>
//           <h1>COUNTER</h1>
          
//         </div>
//         <button
//           type="button"
//           className="counter"
//           onClick={increment}
//         >
//           Pres  Here To Increment 
//         </button>
//         <button
//           type="button"
//           className="counter"
//           onClick={decrement}
//         >
//           Pres  Here To Decrement 
//         </button>

//         <p>
         
//             {count}
          
//         </p>

//       </section>

      

     
//     </>
//   )
// }

// export default App



