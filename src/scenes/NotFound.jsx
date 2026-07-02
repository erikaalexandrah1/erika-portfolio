import Navbar from "../components/Navbar";
import Seo from "../components/Seo";

export default function NotFound() {
  return (
    <div className="relative w-full h-screen bg-black text-white overflow-hidden grid place-items-center">
      <Seo
        title="Page not found"
        description="The page you are looking for doesn't exist or was moved."
        path="/404"
      />
      <Navbar />
      <div className="text-center px-6">
        <div className="text-7xl md:text-8xl font-extrabold tracking-tight">404</div>
        <p className="mt-3 text-white/60">
          This page doesn't exist or was moved.
        </p>
        <a
          href="/"
          className="inline-block mt-7 px-5 py-2.5 rounded-full border border-white/15 bg-white/5 hover:bg-white/10 transition-colors uppercase tracking-wide text-sm"
        >
          Back home
        </a>
      </div>
    </div>
  );
}
