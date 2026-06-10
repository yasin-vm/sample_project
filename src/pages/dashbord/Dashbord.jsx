import "./Dashbord.css";

function Dashbord() {
  return (
    <div className="dashboard-container">

      <div className="dashboard-header">
        <h1>Budget Dashboard</h1>
        <p>Track your money efficiently 💰</p>
      </div>

      <div className="dashboard-cards">

        <div className="card balance">
          <h2>Total Balance</h2>
          <p>₹25,000</p>
        </div>

        <div className="card income">
          <h2>Total Income</h2>
          <p>₹40,000</p>
        </div>

        <div className="card expense">
          <h2>Total Expense</h2>
          <p>₹15,000</p>
        </div>

        <div className="card savings">
          <h2>Total Savings</h2>
          <p>₹25,000</p>
        </div>

      </div>

      <div className="recent-transactions">

        <h2>Recent Transactions</h2>

        <div className="transaction income-row">
          <span>Salary</span>
          <span>+ ₹20,000</span>
        </div>

        <div className="transaction expense-row">
          <span>Food</span>
          <span>- ₹500</span>
        </div>

        <div className="transaction expense-row">
          <span>Petrol</span>
          <span>- ₹1,000</span>
        </div>

        <div className="transaction income-row">
          <span>Freelance</span>
          <span>+ ₹5,000</span>
        </div>

      </div>

    </div>
  );
}

export default Dashbord;