import api from "./api"
const authService ={
    login: async (name,password)=>{
        // console.log(name,password)
        try {
             const res = await  api.post('/Login',{name,password} ) //both key and values are same ,so doesnt need to add keys
             return res.data
            }
            catch(err)
            {
                console.log(err);
                
                return err
            }

     },
     signup: async (name,dob,email,username, password ) => {

    console.log(name,dob,email,username,password );

    try {

        const res = await api.post("/Signup",
            {
                name,
                dob,
                email,
                username,
                password
            }
        );

        return res.data;

    }
    catch(err)
    {
        console.log(err);
        return err;
    }
}
}
export default authService;