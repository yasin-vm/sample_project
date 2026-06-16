import api from "./api";

const transactionService = {

    addTransaction: async (transaction) => {

        try {

            const res = await api.post(
                "/transaction",
                transaction
            );

            return res.data;

        } catch(err) {

            return {
                success:false,
                message:err.message
            };
        }
    },

   getTransactions: async (userId) => {

    try {

        const res = await api.get(
            `/transaction/${userId}`
        );

        return res.data;

    } catch(err) {

        return {
            success:false,
            message:err.message
        };
    }
},
deleteTransaction: async (id) => {

    try{

        const res =
          await api.delete(
            `/transaction/${id}`
          );

        return res.data;

    }catch(err){

        return{
            success:false,
            message:err.message
        };
    }
},

updateTransaction: async (
    id,
    transaction
) => {

    try {

        const res =
            await api.put(
                `/transaction/${id}`,
                transaction
            );

        return res.data;

    } catch(err) {

        return {
            success:false,
            message:err.message
        };
    }
},

    
};

export default transactionService;