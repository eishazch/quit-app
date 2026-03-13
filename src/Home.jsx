import { useState } from "react"

export default function Home() {
  const entries = JSON.parse(localStorage.getItem("solace-entries") || "[]")
  const [streak, setStreak] = useState(JSON.parse(localStorage.getItem("solace-streak") || "{}"))

  const habits = [...new Set(entries.map(e => e.habit))]
  const recentEntries = entries.slice(0, 3)

  const getStreak = (habit) => {
    const start = streak[habit]
    if (!start) return 0
    return Math.floor((Date.now() - new Date(start)) / (1000 * 60 * 60 * 24))
  }

  const startStreak = (habit) => {
    const updated = { ...streak, [habit]: new Date().toISOString() }
    localStorage.setItem("solace-streak", JSON.stringify(updated))
    setStreak(updated)
  }

  const getMilestone = (days) => {
    if (days >= 30) return "🏆 30 days strong!"
    if (days >= 7) return "🌟 one week free!"
    if (days >= 3) return "✨ 3 days clean!"
    if (days >= 1) return "🌱 keep going!"
    return "🌸 start your streak!"
  }

  return (
    <div>
      <div style={{
        background: "white",
        borderRadius: "24px",
        padding: "32px",
        marginBottom: "24px",
        boxShadow: "0 4px 24px rgba(0,0,0,0.06)",
        textAlign: "center"
      }}>
        <p style={{ fontSize: "3rem", margin: "0 0 8px" }}>🌸</p>
        <h2 style={{ margin: "0 0 8px", fontWeight: "300", color: "#4a5e4a", fontSize: "1.4rem" }}>
          welcome back
        </h2>
        <p style={{ margin: 0, color: "#8aab84", fontSize: "0.8rem", letterSpacing: "2px" }}>
          every moment is a fresh start
        </p>
      </div>

      {habits.length > 0 && (
        <div style={{ marginBottom: "24px" }}>
          <p style={{ color: "#8aab84", letterSpacing: "2px", fontSize: "0.7rem", margin: "0 0 12px" }}>YOUR STREAKS 🌿</p>
          {habits.map(habit => (
            <div key={habit} style={{
              background: "white",
              borderRadius: "20px",
              padding: "20px",
              marginBottom: "12px",
              boxShadow: "0 2px 16px rgba(0,0,0,0.05)",
            }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "12px" }}>
                <p style={{ margin: 0, color: "#4a5e4a", fontWeight: "bold", fontSize: "1rem" }}>{habit}</p>
                <span style={{
                  background: "linear-gradient(135deg, #c9e0c4, #f2c4ce)",
                  borderRadius: "20px",
                  padding: "4px 12px",
                  fontSize: "0.7rem",
                  color: "#4a5e4a",
                  letterSpacing: "1px"
                }}>{getMilestone(getStreak(habit))}</span>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
                <div style={{ textAlign: "center" }}>
                  <p style={{ margin: 0, fontSize: "2.5rem", color: "#e8a0b0", fontWeight: "300" }}>{getStreak(habit)}</p>
                  <p style={{ margin: 0, color: "#8aab84", fontSize: "0.7rem", letterSpacing: "1px" }}>DAYS</p>
                </div>
                <button onClick={() => startStreak(habit)} style={{
                  background: "transparent",
                  border: "1px solid #c9e0c4",
                  borderRadius: "20px",
                  padding: "6px 16px",
                  cursor: "pointer",
                  fontFamily: "Georgia, serif",
                  color: "#8aab84",
                  fontSize: "0.7rem",
                  letterSpacing: "1px"
                }}>reset streak</button>
              </div>
            </div>
          ))}
        </div>
      )}

      {habits.length === 0 && (
        <div style={{
          background: "white",
          borderRadius: "20px",
          padding: "32px",
          textAlign: "center",
          boxShadow: "0 2px 16px rgba(0,0,0,0.05)",
          marginBottom: "24px"
        }}>
          <p style={{ color: "#8aab84", fontSize: "0.85rem", letterSpacing: "1px" }}>head to the journal to log your first urge 🌿</p>
        </div>
      )}

      {recentEntries.length > 0 && (
        <div>
          <p style={{ color: "#8aab84", letterSpacing: "2px", fontSize: "0.7rem", margin: "0 0 12px" }}>RECENT ENTRIES 📋</p>
          {recentEntries.map(entry => (
            <div key={entry.id} style={{
              background: "white",
              borderRadius: "16px",
              padding: "16px 20px",
              marginBottom: "10px",
              boxShadow: "0 2px 10px rgba(0,0,0,0.05)",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center"
            }}>
              <div>
                <p style={{ margin: "0 0 4px", color: "#4a5e4a", fontWeight: "bold", fontSize: "0.9rem" }}>{entry.habit}</p>
                <p style={{ margin: 0, color: "#8aab84", fontSize: "0.75rem" }}>{entry.note || "no note added"}</p>
              </div>
              <div style={{ textAlign: "right" }}>
                <p style={{ margin: "0 0 4px", color: "#e8a0b0", fontSize: "0.75rem" }}>{entry.date}</p>
                <p style={{ margin: 0, color: "#8aab84", fontSize: "0.7rem" }}>intensity: {entry.intensity}/10</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}