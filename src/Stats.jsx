import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts"
export default function Stats() {
  const entries = JSON.parse(localStorage.getItem("solace-entries") || "[]")

  const habitCounts = entries.reduce((acc, entry) => {
    acc[entry.habit] = (acc[entry.habit] || 0) + 1
    return acc
  }, {})

  const barData = Object.entries(habitCounts).map(([habit, count]) => ({ habit, count }))

  const avgIntensity = entries.length
    ? (entries.reduce((sum, e) => sum + Number(e.intensity), 0) / entries.length).toFixed(1)
    : 0

  const COLORS = ["#c9e0c4", "#e8a0b0", "#f2c4ce", "#8aab84", "#d4b8e0"]

  if (entries.length === 0) return (
    <div style={{ textAlign: "center", color: "#8aab84", marginTop: "40px" }}>
      <p style={{ fontSize: "2rem" }}>🌸</p>
      <p style={{ letterSpacing: "2px", fontSize: "0.85rem" }}>no entries yet</p>
      <p style={{ fontSize: "0.75rem", color: "#e8a0b0" }}>log some urges in the journal first!</p>
    </div>
  )

  return (
    <div>
      <div style={{
        background: "white",
        borderRadius: "20px",
        padding: "24px",
        marginBottom: "20px",
        boxShadow: "0 2px 20px rgba(0,0,0,0.05)",
        textAlign: "center"
      }}>
        <p style={{ color: "#8aab84", letterSpacing: "2px", fontSize: "0.75rem", margin: "0 0 8px" }}>TOTAL URGES LOGGED</p>
        <p style={{ fontSize: "3rem", margin: 0, color: "#e8a0b0", fontWeight: "300" }}>{entries.length}</p>
      </div>

      <div style={{
        background: "white",
        borderRadius: "20px",
        padding: "24px",
        marginBottom: "20px",
        boxShadow: "0 2px 20px rgba(0,0,0,0.05)",
        textAlign: "center"
      }}>
        <p style={{ color: "#8aab84", letterSpacing: "2px", fontSize: "0.75rem", margin: "0 0 8px" }}>AVERAGE INTENSITY</p>
        <p style={{ fontSize: "3rem", margin: 0, color: "#e8a0b0", fontWeight: "300" }}>{avgIntensity}<span style={{ fontSize: "1rem" }}>/10</span></p>
      </div>

      <div style={{
        background: "white",
        borderRadius: "20px",
        padding: "24px",
        marginBottom: "20px",
        boxShadow: "0 2px 20px rgba(0,0,0,0.05)"
      }}>
        <p style={{ color: "#8aab84", letterSpacing: "2px", fontSize: "0.75rem", margin: "0 0 16px" }}>URGES BY HABIT</p>
        <ResponsiveContainer width="100%" height={200}>
          <BarChart data={barData}>
            <XAxis dataKey="habit" tick={{ fontSize: 12, fill: "#8aab84" }} />
            <YAxis tick={{ fontSize: 12, fill: "#8aab84" }} />
            <Tooltip />
            <Bar dataKey="count" fill="#c9e0c4" radius={[8, 8, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div style={{
        background: "white",
        borderRadius: "20px",
        padding: "24px",
        marginBottom: "20px",
        boxShadow: "0 2px 20px rgba(0,0,0,0.05)"
      }}>
        <p style={{ color: "#8aab84", letterSpacing: "2px", fontSize: "0.75rem", margin: "0 0 16px" }}>HABIT BREAKDOWN</p>
        <ResponsiveContainer width="100%" height={200}>
          <PieChart>
            <Pie data={barData} dataKey="count" nameKey="habit" cx="50%" cy="50%" outerRadius={80} label>
              {barData.map((_, index) => (
                <Cell key={index} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}