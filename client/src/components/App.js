import User from './user';
import LoginForm from './login-form';
import SignupPage from './signup-page';
import './App.css';

function App() {
  return (
    <div className="container">
      <h1>Welcome to BookFace </h1>
      <LoginForm />
      <SignupPage />
      <User />
    </div>
  );
}

export default App;
