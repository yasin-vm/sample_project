import "./Dashbord.css";
import { useNavigate } from "react-router";
import AddTransaction from "../../components/buttons/AddTransaction";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell
} from "recharts";
import { useState, useEffect } from "react"; import transactionService from "../../services/transactionService";
function Dashbord() {

  const [transactions, setTransactions] = useState([]);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [filteredTransactions, setFilteredTransactions] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [filterType, setFilterType] = useState("all");

  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const [editData, setEditData] = useState(null);
  // Use search results if available
  const chartTransactions =
    filteredTransactions.length > 0
      ? filteredTransactions
      : transactions;

  //dynamic chart
  const data = transactions
    .filter(t => t.type === "expense")
    .map(transaction => ({

      day: new Date(
        transaction.date
      ).toLocaleDateString(),

      expense: Number(
        transaction.amount
      )

    }));
  //pi chart
  const pieData = Object.values(

    chartTransactions
      .filter(t => t.type === "expense")
      .reduce((acc, transaction) => {

        if (!acc[transaction.category]) {

          acc[transaction.category] = {
            name: transaction.category,
            value: 0
          };
        }

        acc[transaction.category].value +=
          Number(transaction.amount);

        return acc;

      }, {})

  );



  const COLORS = [
    "#00d084",
    "#4dabf7",
    "#ffa94d",
    "#ff6b6b"
  ];

  const loadTransactions = async () => {

    const user = JSON.parse(
      localStorage.getItem("user")
    );

    const result =
      await transactionService.getTransactions(
        user._id
      );

    if (result.success) {

      setTransactions(result.data);
    }
  };

  const handleEdit = (transaction) => {

    setEditData(transaction);

    setShowModal(true);

  };

  const handleDelete = async (id) => {

    const result =
      await transactionService
        .deleteTransaction(id);

    if (result.success) {

      loadTransactions();

    } else {

      alert(result.message);
    }
  };
  useEffect(() => {

    loadTransactions();

  }, []);

  const totalIncome = transactions
    .filter(t => t.type === "income")
    .reduce(
      (sum, t) => sum + Number(t.amount),
      0
    );

  const totalExpense = transactions
    .filter(t => t.type === "expense")
    .reduce(
      (sum, t) => sum + Number(t.amount),
      0
    );

  const totalSavings =
    totalIncome - totalExpense;

  const totalTransactions =
    transactions.length;

  //search using date
  const handleSearch = () => {

    const result = transactions.filter(
      (transaction) => {

        const transactionDate =
          new Date(transaction.date);

        return (
          transactionDate >= new Date(startDate) &&
          transactionDate <= new Date(endDate)
        );
      }
    );

    setFilteredTransactions(result);
  };

  //total search
  const searchIncome = filteredTransactions
    .filter(t => t.type === "income")
    .reduce(
      (sum, t) => sum + Number(t.amount),
      0
    );

  const searchExpense = filteredTransactions
    .filter(t => t.type === "expense")
    .reduce(
      (sum, t) => sum + Number(t.amount),
      0
    );

  const searchSavings =
    searchIncome - searchExpense;

  const displayedTransactions = transactions.filter(
    (transaction) => {

      const matchesSearch =
        transaction.category
          .toLowerCase()
          .includes(searchText.toLowerCase());

      const matchesFilter =
        filterType === "all"
          ? true
          : transaction.type === filterType;

      return matchesSearch && matchesFilter;
    }
  );
  console.log("Transactions:", transactions);
  console.log("Displayed:", displayedTransactions);
  console.log("PIE DATA:", pieData);


  return (
    <div className="dashboard-container">

      <div className="dashboard-header">
        <h1>Budget Dashboard</h1>
        <p>Track your money efficiently 💰</p>
      </div>

      <div className="search-section">

        <input
          type="date"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
        />

        <input
          type="date"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
        />

        <button onClick={handleSearch}>
          Search
        </button>



      </div>

      <div className="search-result">

        <h3>📅 Search Results</h3>

        <div className="search-stats">

          <div className="stat-card">
            <span>Transactions</span>
            <h2>
              {filteredTransactions.length || "-"}
            </h2>
          </div>

          <div className="stat-card income-stat">
            <span>Income</span>
            <h2>₹{searchIncome}</h2>
          </div>

          <div className="stat-card expense-stat">
            <span>Expense</span>
            <h2>₹{searchExpense}</h2>
          </div>

          <div className="stat-card savings-stat">
            <span>Savings</span>
            <h2>₹{searchSavings}</h2>
          </div>

        </div>

      </div>

      <div className="dashboard-cards">

        <div className="card income">
          <h2>💰Total Income</h2>
          <p>₹{totalIncome}</p>
        </div>

        <div className="card expense">
          <h2>💸Total Expense</h2>
          <p>₹{totalExpense}</p>
        </div>
        <div className="card savings">
          <h2>🏦Total Savings</h2>
          <p>₹{totalSavings}</p>
        </div>

        <div className="card transactions">
          <h2>📊Transactions</h2>
          <p>{totalTransactions}</p>
        </div>

      </div>
      <div className="charts-container">

        <div className="graph-section">

          <h2>Expense Analysis</h2>

          <div className="graph-box">

            <ResponsiveContainer width="100%" height={250}>
              <LineChart data={data}>

                <CartesianGrid strokeDasharray="3 3" />

                <XAxis dataKey="day" />

                <YAxis />

                <Tooltip />

                <Line
                  type="monotone"
                  dataKey="expense"
                  stroke="#00d084"
                  strokeWidth={3}
                />

              </LineChart>
            </ResponsiveContainer>

          </div>

        </div>

        <div className="pie-section">

          <h2>Expense Categories</h2>

          <div className="pie-box">

            <ResponsiveContainer width="100%" height={250}>

              <PieChart>

                <Tooltip />

                <Pie
                  data={pieData}
                  dataKey="value"
                  nameKey="name"
                  outerRadius={80}
                  label={({ name, percent }) =>
                    `${name} ${(percent * 100).toFixed(0)}%`
                  }
                >

                  {pieData.map((entry, index) => (
                    <Cell
                      key={index}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}

                </Pie>

              </PieChart>

            </ResponsiveContainer>

          </div>

        </div>

      </div>





      <div className="transaction-toolbar">

        <input
          type="text"
          placeholder="Search category..."
          value={searchText}
          onChange={(e) =>
            setSearchText(e.target.value)
          }
        />

        <select
          value={filterType}
          onChange={(e) =>
            setFilterType(e.target.value)
          }
        >
          <option value="all">
            All
          </option>

          <option value="income">
            Income
          </option>

          <option value="expense">
            Expense
          </option>
        </select>

        <button
          onClick={() => setShowModal(true)}
        >
          + Add Transaction
        </button>

      </div>

      <div className="recent-transactions">

        <h2>Recent Transactions</h2>

        <div className="transaction-header">
          <span>Category</span>
          <span>Type</span>
          <span>Amount</span>
          <span>Date</span>
          <span>Action</span>
        </div>

        {displayedTransactions.map((transaction) => (

          <div
            key={transaction._id}
            className="transaction-row"
          >
            <span>{transaction.category}</span>

            <span
              className={
                transaction.type === "income"
                  ? "income-badge"
                  : "expense-badge"
              }
            >
              {transaction.type}
            </span>

            <span>₹{transaction.amount}</span>

            <span>
              {new Date(transaction.date).toLocaleDateString()}
            </span>

            <div className="action-buttons">

              <button
                className="icon-btn edit-btn"
                onClick={() => handleEdit(transaction)}
              >
                ✎
              </button>

              <button

                className="icon-btn delete-btn"
                onClick={() =>
                  handleDelete(transaction._id)
                }
              >
                ✕
              </button>

            </div>
          </div>

        ))}

      </div>
      {showModal && (

        <div
          className="modal-overlay"
          onClick={() => setShowModal(false)}
        >

          <div
            className="modal-content"
            onClick={(e) => e.stopPropagation()}
          >

            <button
              className="close-btn"
              onClick={() => setShowModal(false)}
            >
              ✖
            </button>

            <AddTransaction
              editData={editData}
              onSuccess={async () => {

                setEditData(null);

                await loadTransactions();

                setShowModal(false);

              }}
            />

          </div>

        </div>

      )}
    </div>
  );
}

export default Dashbord;