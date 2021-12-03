// Libs
import { Link } from 'react-router-dom';

// Styles
import '../../assets/styles/reset.css';


function NotFound() {
    return (
      <div className="notfound-background">
        <div className="notfound">
          <Link to="/">404 - NOT FOUND</Link>
        </div>
      </div>
    );
  }

export default NotFound;