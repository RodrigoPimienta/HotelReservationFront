import { useNavigate } from "react-router-dom";

export const HomePublic = () => {

  const navigate = useNavigate();
  return (
    <>

      <div className="container">

        <div className="titleDiv">
          <div>Home page</div>
          <button onClick={() => navigate('/login')}>Login</button>
          <button onClick={() => navigate('/register')}>Register</button>
        </div>


        <div className="about">
          <h1>About</h1>
          <p>This is a hotel reservation system built with React and TypeScript.</p>
          <p>It allows users to search for hotels, view hotel details, and make reservations.</p>
          <p>Users can also view their reservations and manage their accounts.</p>
          <p>The system is built with a RESTful API and uses JWT for authentication.</p>
          <p>The system is designed to be responsive and works on all devices.</p>
          <p>The system is built with the latest technologies and best practices.</p>
        </div>

        <div className="features">
          <h1>Features</h1>
          <ul>
            <li>Search for hotels</li>
            <li>View hotel details</li>
            <li>Make reservations</li>
            <li>View reservations</li>
            <li>Manage account</li>
            <li>Responsive design</li>
            <li>Built with the latest technologies</li>
          </ul>
        </div>

      </div>

    </>
  )
}
