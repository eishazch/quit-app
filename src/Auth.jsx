import { useState } from "react"
import { supabase } from "./supabase"

export default function Auth() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [isLogin, setIsLogin] = useState(true)
  const [message, setMessage] = useState("")
  const [loading, setLoading] = useState(false)

  const handleAuth = async () => {
    setLoading(true)
    setMessage("")

    if (isLogin) {
      const { error } = await supabase.auth.signInWithPassword({ email, password })
      if (error) setMessage(error.message)
    } else {
      const { error } = await supabase.auth.signUp({ email, password })
      if (error) setMessage(error.message)
      else setMessage("check your email to confirm your account! 🌸")
    }
    setLoading(false)
  }

  return (
    <div style={{ minHeight: "100vh", background: "linear-gradient(135deg, #f2f7f0, #fdf0f3)", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "Georgia, serif" }}>
      <div style={{ background: "white", borderRadius: "24px", padding: "40px", width: "100%", maxWidth: "400px", boxShadow: "0 4px 24px rgba(0,0,0,0.06)" }}>
        <div style={{ textAlign: "center", marginBottom: "32px" }}>
          <h1 style={{ fontSize: "2.5rem", fontWeight: "300", letterSpacing: "8px", color: "#8aab84", margin: "0 0 8px" }}>serene ꩜</h1>
          <p style={{ color: "#e8a0b0", letterSpacing: "3px", fontSize: "0.75rem", margin: 0 }}>heal, gently</p>
        </div>

        <p style={{ color: "#8aab84", letterSpacing: "2px", fontSize: "0.7rem", margin: "0 0 8px" }}>EMAIL</p>
        <input
          type="email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          placeholder="your@email.com"
          style={{
            width: "100%",
            padding: "12px",
            borderRadius: "12px",
            border: "1px solid #c9e0c4",
            marginBottom: "16px",
            fontFamily: "Georgia, serif",
            color: "#4a5e4a",
            boxSizing: "border-box"
          }}
        />

        <p style={{ color: "#8aab84", letterSpacing: "2px", fontSize: "0.7rem", margin: "0 0 8px" }}>PASSWORD</p>
        <input
          type="password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          placeholder="••••••••"
          style={{
            width: "100%",
            padding: "12px",
            borderRadius: "12px",
            border: "1px solid #c9e0c4",
            marginBottom: "24px",
            fontFamily: "Georgia, serif",
            color: "#4a5e4a",
            boxSizing: "border-box"
          }}
        />

        <button onClick={handleAuth} disabled={loading} style={{
          width: "100%",
          padding: "14px",
          background: "linear-gradient(135deg, #c9e0c4, #f2c4ce)",
          border: "none",
          borderRadius: "20px",
          cursor: "pointer",
          fontFamily: "Georgia, serif",
          color: "#4a5e4a",
          letterSpacing: "2px",
          fontSize: "0.85rem",
          marginBottom: "16px"
        }}>{loading ? "loading..." : isLogin ? "sign in 🌸" : "sign up 🌱"}</button>

        <p style={{ textAlign: "center", color: "#8aab84", fontSize: "0.8rem", cursor: "pointer", margin: 0 }}
          onClick={() => setIsLogin(!isLogin)}>
          {isLogin ? "no account? sign up" : "have an account? sign in"}
        </p>

        {message && <p style={{ textAlign: "center", color: "#e8a0b0", fontSize: "0.8rem", marginTop: "16px" }}>{message}</p>}
      </div>
    </div>
  )
}