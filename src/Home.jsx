export default function Home() {
    const entries = JSON.parse(localStorage.getItem("solace-entries") || "[]")
    const streak = JSON.parse(localStorage.getItem("solace-streak") || "{}")
  
    const habits = [...new Set(entries.map(e => e.habit))]
    const recentEntries = entries.slice(0, 3)
  
    const getStreak = (habit) => {
      const start = streak[habit]
      if (!start) return 0
      const diff = Math.floor((Date.now() - new Date(start)) / (1000 * 60 * 60 * 24))
      return diff
    }
  
    const startStreak = (habit) => {
      const updated = { ...streak, [habit]: new Date().toISOString() }
      localStorage.setItem("solace-streak", JSON.stringify(updated))
      window.location.reload()
    }
  
    return (
      <div>
        {habits.length === 0 && (
          <div style={{ textAlign: "center", color: "#8aab84", marginTop: "40px" }}>
            <p style={{ fontSize: "2rem" }}>🌸</p>
            <p style={{ letterSpacing: "2px", fontSize: "0.85rem" }}>welcome to solace</p>
            <p style={{ fontSize: "0.75rem", color: "#e8a0b0" }}>head to the journal to log your first urge!</p>
          </div>
        )}
  
        {habits.length > 0 && (
          <div style={{ marginBottom: "24px" }}>
            <p style={{ color: "#8aab84", letterSpacing: "2px", fontSize: "0.75rem", margin: "0 0 12px" }}>YOUR STREAKS 🌿</p>
            {habits.map(habit => (
              <div key={habit} style={{
                background: "white",
                borderRadius: "16px",
                padding: "16px 20px",
                marginBottom: "12px",
                boxShadow: "0 2px 10px rgba(0,0,0,0.05)",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center"
              }}>
                <div>
                  <p style={{ margin: 0, color: "#4a5e4a", fontWeight: "bold" }}>{habit}</p>
                  <p style={{ margin: "4px 0 0", color: "#e8a0b0", fontSize: "0.8rem" }}>
                    {getStreak(habit)} days clean 🌸
                  </p>
                </div>
                <button onClick={() => startStreak(habit)} style={{
                  background: "linear-gradient(135deg, #c9e0c4, #f2c4ce)",
                  border: "none",
                  borderRadius: "20px",
                  padding: "6px 14px",
                  cursor: "pointer",
                  fontFamily: "Georgia, serif",
                  color: "#4a5e4a",
                  fontSize: "0.75rem",
                  letterSpacing: "1px"
                }}>reset</button>
              </div>
            ))}
          </div>
        )}
  
        {recentEntries.length > 0 && (
          <div>
            <p style={{ color: "#8aab84", letterSpacing: "2px", fontSize: "0.75rem", margin: "0 0 12px" }}>RECENT ENTRIES 📋</p>
            {recentEntries.map(entry => (
              <div key={entry.id} style={{
                background: "white",
                borderRadius: "16px",
                padding: "16px",
                marginBottom: "12px",
                boxShadow: "0 2px 10px rgba(0,0,0,0.05)"
              }}>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "6px" }}>
                  <span style={{ color: "#8aab84", fontWeight: "bold" }}>{entry.habit}</span>
                  <span style={{ color: "#e8a0b0", fontSize: "0.8rem" }}>{entry.date}</span>
                </div>
                <p style={{ margin: "0 0 6px", color: "#4a5e4a", fontSize: "0.9rem" }}>{entry.note || "no note added"}</p>
                <p style={{ margin: 0, color: "#e8a0b0", fontSize: "0.75rem" }}>intensity: {entry.intensity}/10</p>
              </div>
            ))}
          </div>
        )}
      </div>
    )
  }