import { useState } from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import transactionService from "../../services/transactionService"; // Adjusted relative path to your service
import "./AddTransaction.css";
import { toast } from "react-toastify";

const TransactionSchema = Yup.object().shape({
  type: Yup.string().required("Please select a transaction type"),
  category: Yup.string().required("Please select a category"),
  amount: Yup.number().positive("Amount must be greater than 0").required("Required"),
  description: Yup.string().required("Required"),
  date: Yup.date().required("Required"),
});

function AddTransaction({ onSuccess, editData }) {

  const handleAddTransaction = async (values, { resetForm, setSubmitting }) => {
    // Formatting values to ensure numerical accuracy before pushing to API
    const user = JSON.parse(
      localStorage.getItem("user")
    );

    const payload = {
      ...values,
      userId: user._id,
      amount: Number(values.amount)
    };

    const toastId = toast.loading(
      editData
        ? "Updating Transaction..."
        : "Saving Transaction..."
    );

    let result;

    if (editData) {

      result =
        await transactionService
          .updateTransaction(
            editData._id,
            payload
          );

    } else {

      result =
        await transactionService
          .addTransaction(
            payload
          );
    }
    if (result.success) {

      toast.update(toastId, {
        render: editData
          ? "Transaction Updated Successfully"
          : "Transaction Added Successfully",
        type: "success",
        isLoading: false,
        autoClose: 3000
      });

      resetForm();

      if (onSuccess) {
        onSuccess();
      }

    } else {

      toast.update(toastId, {
        render:
          result.message ||
          "Failed to Save Transaction",
        type: "error",
        isLoading: false,
        autoClose: 3000
      });

    }

    setSubmitting(false);
  };

  return (
    <div className="add-transaction-container">
      <div className="transaction-card">
        <h2>
          {editData
            ? "Edit Transaction"
            : "Add Transaction"}
        </h2>

        <Formik
          initialValues={{

            type:
              editData?.type || "",

            category:
              editData?.category || "",

            amount:
              editData?.amount || "",

            description:
              editData?.description || "",

            date:
              editData?.date
                ? editData.date.split("T")[0]
                : new Date()
                  .toISOString()
                  .split("T")[0]

          }}
          enableReinitialize
          validationSchema={TransactionSchema}
          onSubmit={handleAddTransaction}
        >
          {({ values, errors, touched, setFieldValue, isSubmitting }) => (
            <Form>
              {/* Type Select */}
              <div className="form-group">
                <Field
                  as="select"
                  name="type"
                  onChange={(e) => {
                    setFieldValue("type", e.target.value);
                    setFieldValue("category", ""); // Flushes old category value when target type switches
                  }}
                >
                  <option value="">Select Type</option>
                  <option value="income">Income</option>
                  <option value="expense">Expense</option>
                </Field>
                {errors.type && touched.type && <div className="error-text">{errors.type}</div>}
              </div>

              {/* Category Select */}
              <div className="form-group">
                <Field as="select" name="category" disabled={!values.type}>
                  <option value="">Select Category</option>
                  {values.type === "income" && (
                    <>
                      <option value="Salary">Salary</option>
                      <option value="Bonus">Bonus</option>
                      <option value="Freelance">Freelance</option>
                    </>
                  )}
                  {values.type === "expense" && (
                    <>
                      <option value="Food">Food</option>
                      <option value="Travel">Travel</option>
                      <option value="Shopping">Shopping</option>
                      <option value="Bills">Bills</option>
                      <option value="Health">Health</option>
                    </>
                  )}
                </Field>
                {errors.category && touched.category && <div className="error-text">{errors.category}</div>}
              </div>

              {/* Amount Input */}
              <div className="form-group">
                <Field type="number" name="amount" placeholder="Amount" />
                {errors.amount && touched.amount && <div className="error-text">{errors.amount}</div>}
              </div>

              {/* Description Input */}
              <div className="form-group">
                <Field type="text" name="description" placeholder="Description" />
                {errors.description && touched.description && <div className="error-text">{errors.description}</div>}
              </div>

              {/* Date Input */}
              <div className="form-group">
                <Field type="date" name="date" />
                {errors.date && touched.date && <div className="error-text">{errors.date}</div>}
              </div>

              <button type="submit" className="submit-btn" disabled={isSubmitting}>
                {
                  isSubmitting
                    ? "Saving..."
                    : editData
                      ? "Update Transaction"
                      : "Add Transaction"
                }
              </button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
}

export default AddTransaction;