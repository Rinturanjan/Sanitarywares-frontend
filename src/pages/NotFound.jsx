import { Link } from "react-router-dom";
export default function NotFound() {
  return (
    <div className="space-y-2 text-center">
      <h1 className="text-2xl font-bold">404</h1>
      <p>Page not found.</p>
      <Link to="/" className="underline">Go home</Link>
    </div>
  );
}
