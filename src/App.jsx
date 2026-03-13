import { useState, useEffect } from "react"
import { supabase } from "./supabase"
import Journal from "./Journal"
import Stats from "./Stats"
import Home from "./Home"
import Auth from "./Auth"

export default function App() {
  const [page, setPage] = useState("home")
  const [session, setSession] = useState(null)

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session)
    })
    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session)
    })
  }, [])

  if (!session) return <Auth />

  return (
    <div style={{
      fontFamily: "'Georgia', serif",
      maxWidth: "600px",
      margin: "0 auto",
      padding: "40px 20px",
      background: "linear-gradient(135deg, #f2f7f0, #fdf0f3)",
      minHeight: "100vh",
      color: "#4a5e4a"
    }}>
      <div style={{ textAlign: "center", marginBottom: "40px" }}>
        <h1 style={{
          fontSize: "3rem",
          fontWeight: "300",
          letterSpacing: "8px",
          color: "#8aab84",
          margin: 0
        }}>serene ꩜</h1>
        <p style={{ color: "#e8a0b0", letterSpacing: "3px", fontSize: "0.8rem" }}>
          heal, gently
        </p>
      </div>

      <nav style={{ display: "flex", justifyContent: "center", gap: "20px", marginBottom: "40px" }}>
        {["home", "journal", "stats"].map(p => (
          <button key={p} onClick={() => setPage(p)} style={{
            background: page === p ? "#c9e0c4" : "transparent",
            color: page === p ? "#4a5e4a" : "#8aab84",
            border: "1px solid #c9e0c4",
            borderRadius: "20px",
            padding: "8px 20px",
            cursor: "pointer",
            letterSpacing: "2px",
            fontSize: "0.75rem"
          }}>{p}</button>
        ))}
        <button onClick={() => supabase.auth.signOut()} style={{
          background: "transparent",
          color: "#e8a0b0",
          border: "1px solid #e8a0b0",
          borderRadius: "20px",
          padding: "8px 20px",
          cursor: "pointer",
          letterSpacing: "2px",
          fontSize: "0.75rem"
        }}>sign out</button>
      </nav>

      {page === "home" && <Home />}
      {page === "journal" && <Journal />}
      {page === "stats" && <Stats />}
    </div>
  )
}