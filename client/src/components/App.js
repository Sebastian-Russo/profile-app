import User from './user';
import SignupPage from './signup-page';
import './App.css';

function App() {
  return (
    <div className="container">
      <h1>Welcome to BookFace </h1>
      <SignupPage />
      <User />
    </div>
  );
}

export default App;
