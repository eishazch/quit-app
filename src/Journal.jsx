import { useState, useEffect } from "react"

export default function Journal() {
  const [entries, setEntries] = useState(() => {
    const saved = localStorage.getItem("solace-entries")
    return saved ? JSON.parse(saved) : []
  })
  const [habit, setHabit] = useState("")
  const [note, setNote] = useState("")
  const [intensity, setIntensity] = useState(5)

  useEffect(() => {
    localStorage.setItem("solace-entries", JSON.stringify(entries))
  }, [entries])

  const logUrge = () => {
    if (!habit) return
    const entry = {
      id: Date.now(),
      habit,
      note,
      intensity,
      date: new Date().toLocaleDateString(),
      time: new Date().toLocaleTimeString()
    }
    setEntries([entry, ...entries])
    setNote("")
    setIntensity(5)
  }

  return (
    <div>
      <div style={{
        background: "white",
        borderRadius: "20px",
        padding: "24px",
        marginBottom: "20px",
        boxShadow: "0 2px 20px rgba(0,0,0,0.05)"
      }}>
        <p style={{ margin: "0 0 12px", color: "#8aab84", letterSpacing: "2px", fontSize: "0.75rem" }}>WHAT ARE YOU QUITTING?</p>
        <select value={habit} onChange={e => setHabit(e.target.value)} style={{
          width: "100%",
          padding: "10px",
          borderRadius: "10px",
          border: "1px solid #c9e0c4",
          marginBottom: "16px",
          fontFamily: "Georgia, serif",
          color: "#4a5e4a"
        }}>
          <option value="">select a habit...</option>
          <option value="smoking">⋆ smoking</option>
          <option value="sugar">⋆ sugar</option>
          <option value="doomscrolling">⋆ doomscrolling</option>
          <option value="alcohol">⋆ alcohol</option>
          <option value="other">⋆ other</option>
        </select>

        <p style={{ margin: "0 0 8px", color: "#8aab84", letterSpacing: "2px", fontSize: "0.75rem" }}>URGE INTENSITY: {intensity}/10</p>
        <input type="range" min="1" max="10" value={intensity} onChange={e => setIntensity(e.target.value)} style={{ width: "100%", marginBottom: "16px", accentColor: "#e8a0b0" }} />

        <p style={{ margin: "0 0 8px", color: "#8aab84", letterSpacing: "2px", fontSize: "0.75rem" }}>HOW ARE YOU FEELING?</p>
        <textarea value={note} onChange={e => setNote(e.target.value)} placeholder="write it out..." rows={3} style={{
          width: "100%",
          padding: "10px",
          borderRadius: "10px",
          border: "1px solid #c9e0c4",
          fontFamily: "Georgia, serif",
          color: "#4a5e4a",
          resize: "none",
          boxSizing: "border-box"
        }} />

        <button onClick={logUrge} style={{
          marginTop: "16px",
          width: "100%",
          padding: "12px",
          background: "linear-gradient(135deg, #c9e0c4, #f2c4ce)",
          border: "none",
          borderRadius: "20px",
          cursor: "pointer",
          fontFamily: "Georgia, serif",
          color: "#4a5e4a",
          letterSpacing: "2px",
          fontSize: "0.85rem"
        }}>log urge ꩜</button>
      </div>

      {entries.map(entry => (
        <div key={entry.id} style={{
          background: "white",
          borderRadius: "16px",
          padding: "16px",
          marginBottom: "12px",
          boxShadow: "0 2px 10px rgba(0,0,0,0.05)"
        }}>
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "8px" }}>
            <span style={{ color: "#8aab84", fontWeight: "bold" }}>{entry.habit}</span>
            <span style={{ color: "#e8a0b0", fontSize: "0.8rem" }}>{entry.date} · {entry.time}</span>
          </div>
          <p style={{ margin: "0 0 8px", color: "#4a5e4a" }}>{entry.note || "no note added"}</p>
          <p style={{ margin: 0, color: "#e8a0b0", fontSize: "0.8rem" }}>intensity: {entry.intensity}/10</p>
        </div>
      ))}
    </div>
  )
}