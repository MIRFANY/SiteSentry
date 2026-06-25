import { useState } from "react";
import UploadPanel from "./components/UploadPanel";
import AgentScorecard from "./components/AgentScorecard";

function App() {
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  return (
    <div style={{ maxWidth: "900px", margin: "0 auto", padding: "2rem", fontFamily: "sans-serif" }}>
      <h1 style={{ color: "#1a1a2e", borderBottom: "3px solid #e94560", paddingBottom: "0.5rem" }}>
        🏗️ SiteSentry
      </h1>
      <p style={{ color: "#555", marginBottom: "2rem" }}>
        AI-powered construction project report analyzer
      </p>

      <UploadPanel
        setResult={setResult}
        setLoading={setLoading}
        setError={setError}
      />

      {loading && (
        <div style={{ textAlign: "center", padding: "2rem", color: "#e94560" }}>
          ⏳ Analyzing report — running 6 specialist agents...
        </div>
      )}

      {error && (
        <div style={{ background: "#ffe0e0", padding: "1rem", borderRadius: "8px", color: "#c00" }}>
          Error: {error}
        </div>
      )}

      {result && !loading && <AgentScorecard result={result} />}
    </div>
  );
}

export default App;