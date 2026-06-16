import api from "./api"

const authService = {

      login: async (username,password) => {

        try {

            const res = await api.post('/login', {
            username,
            password
            });
            return res.data;

        } catch(err) {
           return err.response.data;
         }
    },

    signup: async (name,dob,phone,email,username,password) => {

        try {
            // http://localhost:3000/api/signup

            const res = await api.post('/signup', {
                name,
                dob,
                phone,
                email,
                username,
                password
            });

            return res.data;

        } catch(err) {
          return err.response.data;
         }
    },
    updateProfile: async (user) => {

    try {

        const res = await api.put(
            '/profile',
            user
        );

        return res.data;

    } catch(err) {

        return err.response.data;
    }
    }
}

export default authService;