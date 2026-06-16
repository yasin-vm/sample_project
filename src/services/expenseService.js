import api from "./api";

const expenseService = {

    addExpense: async (expense) => {

        try {

            const res = await api.post(
                "/expense",
                expense
            );

            return res.data;

        } catch(err) {

            return err.response.data;
        }
    }
};

export default expenseService;