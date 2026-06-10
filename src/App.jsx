import { RouterProvider } from 'react-router'
import router from './router/Router';

function App() {
  return (
    <>
      <RouterProvider router={router} />
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



