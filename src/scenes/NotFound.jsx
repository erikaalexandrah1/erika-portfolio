import Navbar from "../components/Navbar";
import Seo from "../components/Seo";
import Button from "../components/ui/Button";
import PageBackground from "../components/ui/PageBackground";

export default function NotFound() {
  return (
    <div className="relative w-full h-screen text-white overflow-hidden grid place-items-center">
      <Seo
        title="Page not found"
        description="The page you are looking for doesn't exist or was moved."
        path="/404"
      />
      <PageBackground />
      <Navbar />
      <div className="text-center px-6">
        <div className="text-7xl md:text-8xl font-extrabold tracking-tight">404</div>
        <p className="mt-3 text-white/60">
          This page doesn't exist or was moved.
        </p>
        <div className="mt-7 flex justify-center">
          <Button to="/" variant="primary" size="lg">
            Back home
          </Button>
        </div>
      </div>
    </div>
  );
}
