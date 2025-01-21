import { Button } from "react-bootstrap";
import "./App.css";
import { Link, Navigate } from "react-router-dom";
import { useAuth } from "./AuthProvider/AuthProvider";

function Home() {
  const { user, handleLogout } = useAuth();

  if (!user) {
    return <Navigate to="/login" />;
  }

  return (
    <div className="App">
      <header className="App-header">
        <p>hello react</p>
        <Button as={Link} to="/reels">
          Go to Reels
        </Button>
        <Button onClick={handleLogout}>Log out</Button>
      </header>
    </div>
  );
}

export default Home;
