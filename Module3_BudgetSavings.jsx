import { useState } from "react";

const categories = [
  { id: 1, name: "Food & Dining", icon: "🍽️", budget: 1200, spent: 0 },
  { id: 2, name: "Transportation", icon: "🚗", budget: 800, spent: 0 },
  { id: 3, name: "Entertainment", icon: "🎬", budget: 500, spent: 0 },
  { id: 4, name: "Shopping", icon: "🛍️", budget: 300, spent: 0 },
  { id: 5, name: "Utilities", icon: "💡", budget: 400, spent: 0 },
  { id: 6, name: "Healthcare", icon: "🏥", budget: 200, spent: 0 },
];

const defaultSavings = [
  { id: 1, name: "Vacation Fund", icon: "✈️", target: 5000, current: 2500, deadline: "2025-12-31" },
  { id: 2, name: "Emergency Fund", icon: "🛡️", target: 10000, current: 9000, deadline: "2025-06-30" },
];

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&family=DM+Sans:wght@300;400;500;600&display=swap');

  * { box-sizing: border-box; margin: 0; padding: 0; }

  :root {
    --cream: #FAF7F2;
    --warm-white: #FFFFFF;
    --gold: #C9A84C;
    --gold-light: #F5E6C4;
    --gold-bg: #FDF6E7;
    --text-dark: #1A1A1A;
    --text-mid: #555;
    --text-light: #888;
    --danger: #D9534F;
    --success: #5B8A5A;
    --border: #EDE8DF;
    --shadow: 0 2px 12px rgba(0,0,0,0.07);
  }

  body { background: var(--cream); font-family: 'DM Sans', sans-serif; color: var(--text-dark); }

  .app { max-width: 430px; margin: 0 auto; min-height: 100vh; background: var(--cream); padding-bottom: 80px; }

  .header {
    background: var(--warm-white);
    padding: 20px 20px 16px;
    border-bottom: 1px solid var(--border);
    position: sticky; top: 0; z-index: 10;
  }
  .header-top { display: flex; justify-content: space-between; align-items: center; margin-bottom: 16px; }
  .back-btn { background: none; border: none; font-size: 18px; cursor: pointer; color: var(--text-mid); }
  .header h1 { font-family: 'DM Serif Display', serif; font-size: 22px; color: var(--text-dark); }
  .tabs { display: flex; gap: 4px; background: var(--gold-bg); padding: 4px; border-radius: 12px; }
  .tab { flex: 1; padding: 8px; border: none; background: none; border-radius: 9px; font-family: 'DM Sans', sans-serif; font-size: 13px; font-weight: 500; color: var(--text-mid); cursor: pointer; transition: all 0.2s; }
  .tab.active { background: var(--warm-white); color: var(--gold); box-shadow: 0 1px 4px rgba(0,0,0,0.08); }

  .section { padding: 20px; }
  .section-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 16px; }
  .section-title { font-family: 'DM Serif Display', serif; font-size: 19px; color: var(--text-dark); }
  .add-btn { background: var(--gold); color: white; border: none; width: 32px; height: 32px; border-radius: 50%; font-size: 20px; cursor: pointer; display: flex; align-items: center; justify-content: center; box-shadow: 0 2px 8px rgba(201,168,76,0.35); transition: transform 0.15s; }
  .add-btn:hover { transform: scale(1.1); }

  .summary-banner {
    background: linear-gradient(135deg, #C9A84C 0%, #E8C96A 100%);
    border-radius: 18px; padding: 20px; margin: 20px 20px 0; color: white;
    display: flex; justify-content: space-between; align-items: center;
    box-shadow: 0 6px 24px rgba(201,168,76,0.3);
  }
  .summary-label { font-size: 12px; opacity: 0.85; margin-bottom: 4px; }
  .summary-amount { font-family: 'DM Serif Display', serif; font-size: 28px; }
  .summary-sub { font-size: 12px; opacity: 0.8; margin-top: 4px; }
  .summary-ring { position: relative; width: 64px; height: 64px; }
  .summary-ring svg { transform: rotate(-90deg); }
  .summary-ring-label { position: absolute; inset: 0; display: flex; align-items: center; justify-content: center; font-size: 11px; font-weight: 600; }

  .card {
    background: var(--warm-white); border-radius: 16px; padding: 16px;
    margin-bottom: 12px; box-shadow: var(--shadow);
    animation: slideUp 0.25s ease both;
  }
  @keyframes slideUp { from { opacity:0; transform: translateY(8px); } to { opacity:1; transform: translateY(0); } }

  .card-row { display: flex; align-items: center; gap: 12px; margin-bottom: 10px; }
  .card-icon { width: 40px; height: 40px; background: var(--gold-bg); border-radius: 12px; display: flex; align-items: center; justify-content: center; font-size: 20px; flex-shrink: 0; }
  .card-info { flex: 1; }
  .card-name { font-weight: 600; font-size: 14px; color: var(--text-dark); }
  .card-sub { font-size: 12px; color: var(--text-light); margin-top: 1px; }
  .card-amount { font-family: 'DM Serif Display', serif; font-size: 16px; color: var(--text-dark); text-align: right; }
  .card-amount small { display: block; font-family: 'DM Sans', sans-serif; font-size: 11px; color: var(--text-light); }

  .progress-bar { height: 6px; background: #EDE8DF; border-radius: 99px; overflow: hidden; }
  .progress-fill { height: 100%; border-radius: 99px; transition: width 0.6s cubic-bezier(0.34,1.56,0.64,1); }
  .progress-safe { background: linear-gradient(90deg, var(--gold), #E8C96A); }
  .progress-warn { background: linear-gradient(90deg, #E89A4C, #F5B96A); }
  .progress-danger { background: linear-gradient(90deg, var(--danger), #E87070); }
  .progress-goal { background: linear-gradient(90deg, var(--success), #82C881); }

  .card-footer { display: flex; justify-content: space-between; align-items: center; margin-top: 8px; }
  .card-remaining { font-size: 12px; }
  .card-remaining.ok { color: var(--success); }
  .card-remaining.warn { color: #E89A4C; }
  .card-remaining.danger { color: var(--danger); }
  .card-percent { font-size: 11px; color: var(--text-light); font-weight: 600; }

  .card-actions { display: flex; gap: 6px; }
  .action-btn { border: none; background: var(--gold-bg); color: var(--gold); border-radius: 8px; padding: 4px 10px; font-size: 11px; font-weight: 600; cursor: pointer; transition: background 0.15s; }
  .action-btn:hover { background: var(--gold-light); }
  .action-btn.del { color: var(--danger); background: #FEF2F2; }
  .action-btn.del:hover { background: #FEE2E2; }

  .deadline-chip { font-size: 11px; color: var(--text-light); background: var(--gold-bg); border-radius: 99px; padding: 3px 9px; }

  /* Modal overlay */
  .overlay { position: fixed; inset: 0; background: rgba(0,0,0,0.35); display: flex; align-items: flex-end; justify-content: center; z-index: 100; animation: fadeIn 0.2s; }
  @keyframes fadeIn { from { opacity:0 } to { opacity:1 } }
  .modal { background: white; border-radius: 24px 24px 0 0; padding: 24px 20px 40px; width: 100%; max-width: 430px; animation: slideModal 0.3s cubic-bezier(0.34,1.56,0.64,1); }
  @keyframes slideModal { from { transform: translateY(100%) } to { transform: translateY(0) } }
  .modal-title { font-family: 'DM Serif Display', serif; font-size: 20px; margin-bottom: 20px; }
  .modal label { display: block; font-size: 12px; font-weight: 600; color: var(--text-mid); margin-bottom: 6px; text-transform: uppercase; letter-spacing: 0.5px; }
  .modal input, .modal select { width: 100%; padding: 12px 14px; border: 1.5px solid var(--border); border-radius: 12px; font-family: 'DM Sans', sans-serif; font-size: 14px; color: var(--text-dark); background: var(--cream); margin-bottom: 14px; outline: none; transition: border-color 0.2s; }
  .modal input:focus, .modal select:focus { border-color: var(--gold); }
  .modal-actions { display: flex; gap: 10px; margin-top: 4px; }
  .btn-primary { flex: 1; padding: 14px; background: var(--gold); color: white; border: none; border-radius: 14px; font-family: 'DM Sans', sans-serif; font-size: 15px; font-weight: 600; cursor: pointer; transition: opacity 0.15s; }
  .btn-primary:hover { opacity: 0.9; }
  .btn-secondary { flex: 1; padding: 14px; background: var(--gold-bg); color: var(--gold); border: none; border-radius: 14px; font-family: 'DM Sans', sans-serif; font-size: 15px; font-weight: 600; cursor: pointer; }

  .nav { position: fixed; bottom: 0; left: 50%; transform: translateX(-50%); width: 100%; max-width: 430px; background: white; border-top: 1px solid var(--border); display: flex; padding: 10px 0 16px; }
  .nav-item { flex: 1; display: flex; flex-direction: column; align-items: center; gap: 4px; background: none; border: none; cursor: pointer; font-family: 'DM Sans', sans-serif; }
  .nav-icon { font-size: 20px; }
  .nav-label { font-size: 10px; color: var(--text-light); }
  .nav-item.active .nav-label { color: var(--gold); font-weight: 600; }

  .empty { text-align: center; padding: 40px 20px; color: var(--text-light); }
  .empty p { margin-top: 8px; font-size: 13px; }
`;

export default function BudgetSavingsApp() {
  const [tab, setTab] = useState("budget");
  const [budgets, setBudgets] = useState(categories.map(c => ({ ...c, spent: Math.floor(Math.random() * c.budget * 0.8) })));
  const [savings, setSavings] = useState(defaultSavings);
  const [showModal, setShowModal] = useState(false);
  const [editItem, setEditItem] = useState(null);
  const [form, setForm] = useState({});

  const totalBudget = budgets.reduce((s, c) => s + c.budget, 0);
  const totalSpent = budgets.reduce((s, c) => s + c.spent, 0);
  const overallPct = Math.round((totalSpent / totalBudget) * 100);

  function openAdd() {
    setEditItem(null);
    if (tab === "budget") setForm({ name: "", budget: "", icon: "💰", spent: 0 });
    else setForm({ name: "", target: "", current: "", icon: "🎯", deadline: "" });
    setShowModal(true);
  }
  function openEdit(item) {
    setEditItem(item.id);
    setForm({ ...item });
    setShowModal(true);
  }
  function save() {
    if (tab === "budget") {
      if (editItem) setBudgets(b => b.map(x => x.id === editItem ? { ...x, ...form, budget: +form.budget, spent: +form.spent } : x));
      else setBudgets(b => [...b, { ...form, id: Date.now(), budget: +form.budget, spent: +form.spent }]);
    } else {
      if (editItem) setSavings(s => s.map(x => x.id === editItem ? { ...x, ...form, target: +form.target, current: +form.current } : x));
      else setSavings(s => [...s, { ...form, id: Date.now(), target: +form.target, current: +form.current }]);
    }
    setShowModal(false);
  }
  function del(id) {
    if (tab === "budget") setBudgets(b => b.filter(x => x.id !== id));
    else setSavings(s => s.filter(x => x.id !== id));
  }

  function getProgressClass(pct) {
    if (pct >= 90) return "progress-danger";
    if (pct >= 70) return "progress-warn";
    return "progress-safe";
  }
  function getRemainingClass(pct) {
    if (pct >= 90) return "danger";
    if (pct >= 70) return "warn";
    return "ok";
  }

  return (
    <>
      <style>{styles}</style>
      <div className="app">
        <div className="header">
          <div className="header-top">
            <button className="back-btn">←</button>
            <h1>Budget & Goals</h1>
            <div style={{ width: 28 }} />
          </div>
          <div className="tabs">
            <button className={`tab${tab === "budget" ? " active" : ""}`} onClick={() => setTab("budget")}>Monthly Budget</button>
            <button className={`tab${tab === "savings" ? " active" : ""}`} onClick={() => setTab("savings")}>Savings Goals</button>
          </div>
        </div>

        {tab === "budget" && (
          <>
            <div className="summary-banner">
              <div>
                <div className="summary-label">Total Spent</div>
                <div className="summary-amount">${totalSpent.toLocaleString()}</div>
                <div className="summary-sub">of ${totalBudget.toLocaleString()} budget</div>
              </div>
              <div className="summary-ring">
                <svg width="64" height="64" viewBox="0 0 64 64">
                  <circle cx="32" cy="32" r="26" fill="none" stroke="rgba(255,255,255,0.25)" strokeWidth="7" />
                  <circle cx="32" cy="32" r="26" fill="none" stroke="white" strokeWidth="7"
                    strokeDasharray={`${(overallPct / 100) * 163} 163`} strokeLinecap="round" />
                </svg>
                <div className="summary-ring-label" style={{ color: "white" }}>{overallPct}%</div>
              </div>
            </div>

            <div className="section">
              <div className="section-header">
                <span className="section-title">Categories</span>
                <button className="add-btn" onClick={openAdd}>+</button>
              </div>
              {budgets.map((cat, i) => {
                const pct = Math.min(100, Math.round((cat.spent / cat.budget) * 100));
                const rem = cat.budget - cat.spent;
                return (
                  <div className="card" key={cat.id} style={{ animationDelay: `${i * 0.05}s` }}>
                    <div className="card-row">
                      <div className="card-icon">{cat.icon}</div>
                      <div className="card-info">
                        <div className="card-name">{cat.name}</div>
                        <div className="card-sub">Spent ${cat.spent.toLocaleString()}</div>
                      </div>
                      <div className="card-amount">
                        ${cat.budget.toLocaleString()}
                        <small>budget</small>
                      </div>
                    </div>
                    <div className="progress-bar">
                      <div className={`progress-fill ${getProgressClass(pct)}`} style={{ width: `${pct}%` }} />
                    </div>
                    <div className="card-footer">
                      <span className={`card-remaining ${getRemainingClass(pct)}`}>
                        {rem >= 0 ? `$${rem.toLocaleString()} remaining` : `$${Math.abs(rem).toLocaleString()} over budget`}
                      </span>
                      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                        <span className="card-percent">{pct}%</span>
                        <div className="card-actions">
                          <button className="action-btn" onClick={() => openEdit(cat)}>Edit</button>
                          <button className="action-btn del" onClick={() => del(cat.id)}>✕</button>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
              {budgets.length === 0 && <div className="empty">🗂️<p>No budget categories yet. Add one!</p></div>}
            </div>
          </>
        )}

        {tab === "savings" && (
          <div className="section">
            <div className="section-header">
              <span className="section-title">Goals</span>
              <button className="add-btn" onClick={openAdd}>+</button>
            </div>
            {savings.map((goal, i) => {
              const pct = Math.min(100, Math.round((goal.current / goal.target) * 100));
              const rem = goal.target - goal.current;
              const daysLeft = Math.ceil((new Date(goal.deadline) - new Date()) / 86400000);
              return (
                <div className="card" key={goal.id} style={{ animationDelay: `${i * 0.05}s` }}>
                  <div className="card-row">
                    <div className="card-icon">{goal.icon}</div>
                    <div className="card-info">
                      <div className="card-name">{goal.name}</div>
                      <div className="card-sub">${goal.current.toLocaleString()} saved</div>
                    </div>
                    <div className="card-amount">
                      ${goal.target.toLocaleString()}
                      <small>target</small>
                    </div>
                  </div>
                  <div className="progress-bar">
                    <div className="progress-fill progress-goal" style={{ width: `${pct}%` }} />
                  </div>
                  <div className="card-footer">
                    <span className="card-remaining ok">
                      {rem > 0 ? `$${rem.toLocaleString()} to go` : "🎉 Goal reached!"}
                    </span>
                    <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                      {goal.deadline && <span className="deadline-chip">{daysLeft > 0 ? `${daysLeft}d left` : "Past due"}</span>}
                      <div className="card-actions">
                        <button className="action-btn" onClick={() => openEdit(goal)}>Edit</button>
                        <button className="action-btn del" onClick={() => del(goal.id)}>✕</button>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
            {savings.length === 0 && <div className="empty">🎯<p>No savings goals yet. Start one!</p></div>}
          </div>
        )}

        {showModal && (
          <div className="overlay" onClick={e => e.target === e.currentTarget && setShowModal(false)}>
            <div className="modal">
              <div className="modal-title">{editItem ? "Edit" : "Add"} {tab === "budget" ? "Budget" : "Goal"}</div>
              {tab === "budget" ? (
                <>
                  <label>Category Name</label>
                  <input placeholder="e.g. Groceries" value={form.name || ""} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} />
                  <label>Icon (emoji)</label>
                  <input placeholder="e.g. 🛒" value={form.icon || ""} onChange={e => setForm(f => ({ ...f, icon: e.target.value }))} />
                  <label>Monthly Budget ($)</label>
                  <input type="number" placeholder="0" value={form.budget || ""} onChange={e => setForm(f => ({ ...f, budget: e.target.value }))} />
                  <label>Amount Spent So Far ($)</label>
                  <input type="number" placeholder="0" value={form.spent || ""} onChange={e => setForm(f => ({ ...f, spent: e.target.value }))} />
                </>
              ) : (
                <>
                  <label>Goal Name</label>
                  <input placeholder="e.g. New Laptop" value={form.name || ""} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} />
                  <label>Icon (emoji)</label>
                  <input placeholder="e.g. 💻" value={form.icon || ""} onChange={e => setForm(f => ({ ...f, icon: e.target.value }))} />
                  <label>Target Amount ($)</label>
                  <input type="number" placeholder="0" value={form.target || ""} onChange={e => setForm(f => ({ ...f, target: e.target.value }))} />
                  <label>Current Savings ($)</label>
                  <input type="number" placeholder="0" value={form.current || ""} onChange={e => setForm(f => ({ ...f, current: e.target.value }))} />
                  <label>Deadline</label>
                  <input type="date" value={form.deadline || ""} onChange={e => setForm(f => ({ ...f, deadline: e.target.value }))} />
                </>
              )}
              <div className="modal-actions">
                <button className="btn-secondary" onClick={() => setShowModal(false)}>Cancel</button>
                <button className="btn-primary" onClick={save}>Save</button>
              </div>
            </div>
          </div>
        )}

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
