import { useSearchParams, useNavigate } from "react-router-dom";
import { testCenters } from "@/data/testCenters";
import { ArrowLeft, Send } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

const RequestRoute = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const centerId = searchParams.get("centerId");
  const center = testCenters.find((c) => c.id === centerId);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Request Sent",
      description: "Thank you! We have received your request for route data.",
    });
    // For now, simply navigate back home.
    setTimeout(() => {
      navigate("/");
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center p-6">
      <div className="max-w-md w-full bg-card shadow-xl rounded-2xl p-8 border border-border">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 mb-6 text-muted-foreground hover:text-foreground transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          <span className="text-sm font-medium">Back</span>
        </button>

        <h1 className="text-2xl font-bold text-foreground mb-2">Request Route Data</h1>
        {center && (
          <p className="text-muted-foreground mb-6 text-sm">
            We currently don't have route paths for{" "}
            <strong className="text-foreground">{center.name}</strong>. Provide your email
            and we'll notify you when it's available, or upload your own route file!
          </p>
        )}
        {!center && (
          <p className="text-muted-foreground mb-6 text-sm">
            Please let us know which DriveTest centre you'd like to see.
          </p>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-1.5">
            <label htmlFor="email" className="block text-sm font-medium text-foreground">
              Email Address
            </label>
            <input
              type="email"
              id="email"
              placeholder="you@example.com"
              required
              className="w-full bg-background border border-border rounded-lg px-4 py-2 text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-shadow"
            />
          </div>

          <div className="space-y-1.5">
            <label htmlFor="route_file" className="block text-sm font-medium text-foreground">
              Have route data? (Optional)
            </label>
            <input
              type="file"
              id="route_file"
              accept=".json,.gpx,.kml"
              className="w-full text-sm text-muted-foreground file:bg-primary/10 file:text-primary file:border-0 file:rounded-md file:px-4 file:py-2 file:mr-4 file:font-semibold hover:file:bg-primary/20 transition-colors"
            />
            <p className="text-xs text-muted-foreground">Accepts .json, .gpx, or .kml files.</p>
          </div>

          <button
            type="submit"
            className="w-full bg-primary text-primary-foreground hover:bg-primary/90 font-medium py-2.5 rounded-lg flex items-center justify-center gap-2 transition-colors mt-2"
          >
            <Send className="h-4 w-4" />
            Submit Request
          </button>
        </form>
      </div>
    </div>
  );
};

export default RequestRoute;
