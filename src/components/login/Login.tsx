import axios from "axios";
import { ChangeEvent, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { IUser } from "../../interfaces/IUser";
import { ILogin } from "../../interfaces/ILogin";
import { useAuth } from "../../context/AuthContext";
import { Error } from "../generics/Error";
import { Loading } from "../generics/Loading";

export const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const [formData, setFormData] = useState<ILogin>({
    email: "",
    password: "",
  });
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const errorAuth = location.state?.error as string;
    if (errorAuth) {
      setError(errorAuth);
    }
  }, [location.state?.error]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.post<IUser>("http://3.128.31.139:8080/users/login", formData, { withCredentials: true });
      login(response.data);
      navigate("/private/hotels");

    } catch (err) {
      setLoading(false);
      setError("Invalid email or password");
      console.error(err);
    }
  };

  return (
    <div className="container">

      <div className="titleDiv">
        <h2>Login</h2>
        <button type="button" onClick={() => navigate("/")}>Home</button>
      </div>

      <div className="searchForm">
        <form onSubmit={handleSubmit}>
          {error && <Error error={error} />}
          {loading && <Loading />}
          <div className="formRow">
            <div className="formGroup">
              <label htmlFor="email">Email:</label>
              <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} />
            </div>

            <div className="formGroup">
              <label htmlFor="password">Password:</label>
              <input type="password" id="password" name="password" value={formData.password} onChange={handleChange} />
            </div>
          </div>

          <div className="formRow">
            <button type="submit">Login</button>
          </div>
        </form>
      </div>
    </div>

  );
};
