import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <section className="section notfound">
      <div className="container">
        <h1>404</h1>
        <p>Sorry, the page you are looking for does not exist.</p>
        <Link to="/" className="btn btn--primary">
          Back to home
        </Link>
      </div>
    </section>
  );
}
