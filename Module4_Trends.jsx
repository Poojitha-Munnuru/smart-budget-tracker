import { useState } from "react";
import { LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";

const monthlyData = [
  { month: "Jan", income: 4200, expenses: 3100 },
  { month: "Feb", income: 4200, expenses: 2800 },
  { month: "Mar", income: 4500, expenses: 3400 },
  { month: "Apr", income: 4500, expenses: 3900 },
  { month: "May", income: 4800, expenses: 3200 },
  { month: "Jun", income: 4800, expenses: 3500 },
];

const categoryData = [
  { name: "Food", value: 1200, color: "#C9A84C" },
  { name: "Transport", value: 620, color: "#8B6F2E" },
  { name: "Entertainment", value: 480, color: "#E8C96A" },
  { name: "Utilities", value: 350, color: "#D4AA50" },
  { name: "Shopping", value: 290, color: "#F5E6C4" },
  { name: "Healthcare", value: 160, color: "#A07840" },
];

const spendingTrend = [
  { month: "Jan", amount: 3100 },
  { month: "Feb", amount: 2800 },
  { month: "Mar", amount: 3400 },
  { month: "Apr", amount: 3900 },
  { month: "May", amount: 3200 },
  { month: "Jun", amount: 3500 },
];

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&family=DM+Sans:wght@300;400;500;600&display=swap');
  * { box-sizing: border-box; margin: 0; padding: 0; }
  :root {
    --cream: #FAF7F2; --warm-white: #FFFFFF; --gold: #C9A84C;
    --gold-light: #F5E6C4; --gold-bg: #FDF6E7;
    --text-dark: #1A1A1A; --text-mid: #555; --text-light: #888;
    --danger: #D9534F; --success: #5B8A5A; --border: #EDE8DF;
    --shadow: 0 2px 12px rgba(0,0,0,0.07);
  }
  body { background: var(--cream); font-family: 'DM Sans', sans-serif; color: var(--text-dark); }
  .app { max-width: 430px; margin: 0 auto; min-height: 100vh; background: var(--cream); padding-bottom: 90px; }

  .header { background: var(--warm-white); padding: 20px 20px 16px; border-bottom: 1px solid var(--border); position: sticky; top: 0; z-index: 10; }
  .header-top { display: flex; justify-content: space-between; align-items: center; margin-bottom: 14px; }
  .back-btn { background: none; border: none; font-size: 18px; cursor: pointer; color: var(--text-mid); }
  .header h1 { font-family: 'DM Serif Display', serif; font-size: 22px; color: var(--text-dark); }
  .period-pills { display: flex; gap: 6px; }
  .pill { padding: 5px 14px; border-radius: 99px; border: 1.5px solid var(--border); background: none; font-family: 'DM Sans', sans-serif; font-size: 12px; font-weight: 500; color: var(--text-mid); cursor: pointer; transition: all 0.2s; }
  .pill.active { background: var(--gold); border-color: var(--gold); color: white; }

  .kpi-row { display: flex; gap: 10px; padding: 16px 20px 0; }
  .kpi-card { flex: 1; background: var(--warm-white); border-radius: 16px; padding: 14px 12px; box-shadow: var(--shadow); }
  .kpi-label { font-size: 11px; color: var(--text-light); margin-bottom: 4px; text-transform: uppercase; letter-spacing: 0.4px; }
  .kpi-value { font-family: 'DM Serif Display', serif; font-size: 18px; color: var(--text-dark); }
  .kpi-badge { display: inline-block; font-size: 10px; font-weight: 700; border-radius: 99px; padding: 2px 6px; margin-top: 4px; }
  .kpi-badge.up { background: #DCFCE7; color: var(--success); }
  .kpi-badge.down { background: #FEE2E2; color: var(--danger); }

  .chart-section { padding: 20px 20px 0; }
  .chart-card { background: var(--warm-white); border-radius: 18px; padding: 18px; box-shadow: var(--shadow); margin-bottom: 14px; animation: slideUp 0.3s ease both; }
  @keyframes slideUp { from { opacity:0; transform:translateY(10px); } to { opacity:1; transform:translateY(0); } }
  .chart-header { display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 14px; }
  .chart-title { font-family: 'DM Serif Display', serif; font-size: 16px; color: var(--text-dark); }
  .chart-sub { font-size: 12px; color: var(--text-light); margin-top: 2px; }

  .legend-row { display: flex; flex-wrap: wrap; gap: 8px; margin-top: 12px; }
  .legend-item { display: flex; align-items: center; gap: 5px; font-size: 11px; color: var(--text-mid); }
  .legend-dot { width: 8px; height: 8px; border-radius: 50%; flex-shrink: 0; }

  .insight-strip { margin: 0 20px 14px; background: linear-gradient(135deg, #C9A84C 0%, #E8C96A 100%); border-radius: 16px; padding: 16px; color: white; display: flex; align-items: center; gap: 14px; box-shadow: 0 4px 16px rgba(201,168,76,0.25); }
  .insight-icon { font-size: 26px; flex-shrink: 0; }
  .insight-title { font-weight: 700; font-size: 13px; margin-bottom: 2px; }
  .insight-text { font-size: 12px; opacity: 0.88; line-height: 1.4; }

  .category-list { margin-top: 4px; }
  .cat-row { display: flex; align-items: center; gap: 10px; margin-bottom: 10px; }
  .cat-dot { width: 10px; height: 10px; border-radius: 3px; flex-shrink: 0; }
  .cat-name { flex: 1; font-size: 13px; color: var(--text-dark); }
  .cat-bar-wrap { flex: 2; height: 6px; background: var(--gold-bg); border-radius: 99px; overflow: hidden; }
  .cat-bar-fill { height: 100%; border-radius: 99px; transition: width 0.7s cubic-bezier(0.34,1.56,0.64,1); }
  .cat-val { font-size: 12px; font-weight: 600; color: var(--text-mid); min-width: 42px; text-align: right; }

  .custom-tooltip { background: white; border: 1px solid var(--border); border-radius: 10px; padding: 8px 12px; box-shadow: 0 4px 12px rgba(0,0,0,0.1); font-family: 'DM Sans', sans-serif; font-size: 12px; }
  .tooltip-label { font-weight: 700; margin-bottom: 4px; color: var(--text-dark); }
  .tooltip-row { display: flex; gap: 6px; align-items: center; color: var(--text-mid); }

  .nav { position: fixed; bottom: 0; left: 50%; transform: translateX(-50%); width: 100%; max-width: 430px; background: white; border-top: 1px solid var(--border); display: flex; padding: 10px 0 16px; }
  .nav-item { flex: 1; display: flex; flex-direction: column; align-items: center; gap: 4px; background: none; border: none; cursor: pointer; font-family: 'DM Sans', sans-serif; }
  .nav-icon { font-size: 20px; }
  .nav-label { font-size: 10px; color: var(--text-light); }
  .nav-item.active .nav-label { color: var(--gold); font-weight: 600; }
`;

const CustomTooltip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null;
  return (
    <div className="custom-tooltip">
      <div className="tooltip-label">{label}</div>
      {payload.map((p, i) => (
        <div key={i} className="tooltip-row">
          <div style={{ width: 8, height: 8, borderRadius: 2, background: p.color }} />
          {p.name}: <strong>${p.value.toLocaleString()}</strong>
        </div>
      ))}
    </div>
  );
};

export default function TrendsApp() {
  const [period, setPeriod] = useState("6M");

  const latestMonth = monthlyData[monthlyData.length - 1];
  const prevMonth = monthlyData[monthlyData.length - 2];
  const savingsRate = Math.round(((latestMonth.income - latestMonth.expenses) / latestMonth.income) * 100);
  const expenseChange = Math.round(((latestMonth.expenses - prevMonth.expenses) / prevMonth.expenses) * 100);
  const maxCat = Math.max(...categoryData.map(c => c.value));

  return (
    <>
      <style>{styles}</style>
      <div className="app">
        <div className="header">
          <div className="header-top">
            <button className="back-btn">←</button>
            <h1>Trends</h1>
            <div style={{ width: 28 }} />
          </div>
          <div className="period-pills">
            {["1M", "3M", "6M", "1Y"].map(p => (
              <button key={p} className={`pill${period === p ? " active" : ""}`} onClick={() => setPeriod(p)}>{p}</button>
            ))}
          </div>
        </div>

        <div className="kpi-row">
          <div className="kpi-card">
            <div className="kpi-label">Income</div>
            <div className="kpi-value">${(latestMonth.income / 1000).toFixed(1)}k</div>
            <div className="kpi-badge up">+5%</div>
          </div>
          <div className="kpi-card">
            <div className="kpi-label">Expenses</div>
            <div className="kpi-value">${(latestMonth.expenses / 1000).toFixed(1)}k</div>
            <div className={`kpi-badge ${expenseChange > 0 ? "down" : "up"}`}>{expenseChange > 0 ? "+" : ""}{expenseChange}%</div>
          </div>
          <div className="kpi-card">
            <div className="kpi-label">Savings</div>
            <div className="kpi-value">{savingsRate}%</div>
            <div className="kpi-badge up">rate</div>
          </div>
        </div>

        <div className="chart-section">
          {/* Spending Trend Line Chart */}
          <div className="chart-card" style={{ animationDelay: "0.05s" }}>
            <div className="chart-header">
              <div>
                <div className="chart-title">Monthly Spending</div>
                <div className="chart-sub">Last 6 months</div>
              </div>
              <div style={{ textAlign: "right" }}>
                <div style={{ fontFamily: "'DM Serif Display', serif", fontSize: 20 }}>${latestMonth.expenses.toLocaleString()}</div>
                <div style={{ fontSize: 11, color: expenseChange > 0 ? "#D9534F" : "#5B8A5A", fontWeight: 700 }}>
                  {expenseChange > 0 ? "▲" : "▼"} {Math.abs(expenseChange)}% vs last month
                </div>
              </div>
            </div>
            <ResponsiveContainer width="100%" height={160}>
              <LineChart data={spendingTrend} margin={{ top: 4, right: 4, left: -24, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#F0EBE1" vertical={false} />
                <XAxis dataKey="month" tick={{ fontFamily: "DM Sans", fontSize: 11, fill: "#888" }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontFamily: "DM Sans", fontSize: 10, fill: "#888" }} axisLine={false} tickLine={false} tickFormatter={v => `$${v/1000}k`} />
                <Tooltip content={<CustomTooltip />} />
                <Line type="monotone" dataKey="amount" name="Spending" stroke="#C9A84C" strokeWidth={2.5} dot={{ fill: "#C9A84C", r: 3 }} activeDot={{ r: 5, fill: "#C9A84C" }} />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* Income vs Expenses Bar Chart */}
          <div className="chart-card" style={{ animationDelay: "0.1s" }}>
            <div className="chart-header">
              <div>
                <div className="chart-title">Income vs Expenses</div>
                <div className="chart-sub">Monthly comparison</div>
              </div>
              <div style={{ fontSize: 11, color: "#5B8A5A", fontWeight: 700, background: "#DCFCE7", borderRadius: 99, padding: "3px 9px" }}>
                ${(latestMonth.income - latestMonth.expenses).toLocaleString()} saved
              </div>
            </div>
            <ResponsiveContainer width="100%" height={170}>
              <BarChart data={monthlyData} margin={{ top: 4, right: 4, left: -24, bottom: 0 }} barSize={14} barGap={4}>
                <CartesianGrid strokeDasharray="3 3" stroke="#F0EBE1" vertical={false} />
                <XAxis dataKey="month" tick={{ fontFamily: "DM Sans", fontSize: 11, fill: "#888" }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontFamily: "DM Sans", fontSize: 10, fill: "#888" }} axisLine={false} tickLine={false} tickFormatter={v => `$${v/1000}k`} />
                <Tooltip content={<CustomTooltip />} />
                <Bar dataKey="income" name="Income" fill="#5B8A5A" radius={[4, 4, 0, 0]} />
                <Bar dataKey="expenses" name="Expenses" fill="#C9A84C" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
            <div className="legend-row">
              <div className="legend-item"><div className="legend-dot" style={{ background: "#5B8A5A" }} />Income</div>
              <div className="legend-item"><div className="legend-dot" style={{ background: "#C9A84C" }} />Expenses</div>
            </div>
          </div>
        </div>

        {/* Insight Strip */}
        <div className="insight-strip">
          <div className="insight-icon">💡</div>
          <div>
            <div className="insight-title">You're saving {savingsRate}% of your income</div>
            <div className="insight-text">Great progress! Financial experts recommend saving at least 20%. You're right on track.</div>
          </div>
        </div>

        {/* Category Spending */}
        <div className="chart-section">
          <div className="chart-card" style={{ animationDelay: "0.15s" }}>
            <div className="chart-header">
              <div>
                <div className="chart-title">Spending Breakdown</div>
                <div className="chart-sub">By category this month</div>
              </div>
              <div style={{ textAlign: "right" }}>
                <div style={{ fontFamily: "'DM Serif Display', serif", fontSize: 18 }}>
                  ${categoryData.reduce((s, c) => s + c.value, 0).toLocaleString()}
                </div>
                <div style={{ fontSize: 11, color: "#888" }}>total</div>
              </div>
            </div>

            {/* Pie + List side by side */}
            <div style={{ display: "flex", gap: 16, alignItems: "center" }}>
              <div style={{ flexShrink: 0 }}>
                <ResponsiveContainer width={120} height={120}>
                  <PieChart>
                    <Pie data={categoryData} cx="50%" cy="50%" innerRadius={32} outerRadius={55} dataKey="value" strokeWidth={2} stroke="#FAF7F2">
                      {categoryData.map((entry, i) => <Cell key={i} fill={entry.color} />)}
                    </Pie>
                    <Tooltip formatter={(v) => [`$${v}`, ""]} />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div className="category-list" style={{ flex: 1 }}>
                {categoryData.map((cat, i) => (
                  <div key={i} className="cat-row">
                    <div className="cat-dot" style={{ background: cat.color }} />
                    <div className="cat-name">{cat.name}</div>
                    <div className="cat-bar-wrap">
                      <div className="cat-bar-fill" style={{ width: `${(cat.value / maxCat) * 100}%`, background: cat.color }} />
                    </div>
                    <div className="cat-val">${cat.value}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <nav className="nav">
          {[["🏠","Dashboard"],["≡","Transactions"],["📊","Budget"],["👤","Profile"]].map(([icon, label]) => (
            <button key={label} className={`nav-item${label === "Budget" ? " active" : ""}`}>
              <span className="nav-icon">{icon}</span>
              <span className="nav-label">{label}</span>
            </button>
          ))}
        </nav>
      </div>
    </>
  );
}
