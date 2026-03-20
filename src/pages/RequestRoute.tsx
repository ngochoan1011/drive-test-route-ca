import { useState } from "react";
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

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    const form = e.currentTarget;
    const formData = new FormData(form);
    
    // FormSubmit settings
    formData.append("_subject", `New Route Request: ${center?.name || "Unknown Center"}`);
    if (center) {
      formData.append("Test Center", center.name);
    }
    formData.append("_captcha", "false"); // Disable recaptcha for AJAX

    try {
      const response = await fetch("https://formsubmit.co/ajax/ngochoan1011@gmail.com", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        toast({
          title: "Request Sent",
          description: "Thank you! We have received your request for route data. (Check your email for activation if this is the first time using FormSubmit)",
        });
        setTimeout(() => {
          navigate("/");
        }, 3000);
      } else {
        throw new Error("Form submission failed");
      }
    } catch (error) {
      toast({
        title: "Submission Error",
        description: "There was a problem sending your request. Please try again later.",
        variant: "destructive",
      });
      setIsSubmitting(false);
    }
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
              name="email"
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
              name="attachment"
              accept=".json,.gpx,.kml"
              className="w-full text-sm text-muted-foreground file:bg-primary/10 file:text-primary file:border-0 file:rounded-md file:px-4 file:py-2 file:mr-4 file:font-semibold hover:file:bg-primary/20 transition-colors"
            />
            <p className="text-xs text-muted-foreground">Accepts .json, .gpx, or .kml files.</p>
          </div>

          <div className="bg-primary/5 rounded-lg p-4 mt-6 border border-primary/10">
            <h3 className="text-sm font-semibold text-foreground mb-2">How to quickly create route data:</h3>
            <ol className="list-decimal list-outside ml-4 space-y-2 text-xs text-muted-foreground">
              <li>Open <strong>Google My Maps</strong> (<a href="https://mymaps.google.com" target="_blank" rel="noreferrer" className="text-primary hover:underline">mymaps.google.com</a>).</li>
              <li>Create a new map and use the "Add directions" feature.</li>
              <li>Enter the intersection points along the route sequentially (e.g., 50 Fourth Ave, Orangeville &rarr; Hwy 10 &amp; 5th Ave, Orangeville &rarr; etc.). Google will automatically draw the curve following the actual road.</li>
              <li>Click the three dots on My Maps and select "Export to KML/KMZ".</li>
              <li>Use an online tool (like <a href="https://geojson.io/" target="_blank" rel="noreferrer" className="text-primary hover:underline">geojson.io</a>) to convert that KML file to a precise .geojson file to submit here.</li>
            </ol>
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-primary text-primary-foreground hover:bg-primary/90 font-medium py-2.5 rounded-lg flex items-center justify-center gap-2 transition-colors mt-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Send className="h-4 w-4" />
            {isSubmitting ? "Submitting..." : "Submit Request"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default RequestRoute;
