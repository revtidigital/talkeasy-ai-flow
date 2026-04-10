import { useState } from "react";
import { Helmet } from "react-helmet-async";
import Footer from "@/components/Footer";

const BookDemo = () => {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <>
      <Helmet>
        <title>Book a Demo | ConverseAI - See Our Platform in Action</title>
        <meta
          name="description"
          content="Schedule a personalized demo of ConverseAI. See how our AI-powered chatbot and live chat platform can transform your customer engagement."
        />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://theconverseai.com/book-demo" />
      </Helmet>

      <main id="main-content" className="min-h-screen bg-background pt-24">
        {/* Hero section */}
        <section className="py-12 md:py-16 text-center px-4">
          <div className="max-w-3xl mx-auto">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
              Schedule Your Demo
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
              Choose a convenient time to see our product in action. Our team
              will walk you through how ConverseAI can help grow your business.
            </p>
          </div>
        </section>

        {/* Booking widget section */}
        <section className="pb-16 md:pb-24 px-4">
          <div className="max-w-5xl mx-auto bg-card rounded-2xl shadow-lg border border-border overflow-hidden relative">
            {isLoading && (
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 bg-card z-10">
                <div className="w-10 h-10 border-4 border-primary border-t-transparent rounded-full animate-spin" />
                <p className="text-muted-foreground text-sm">
                  Loading scheduler...
                </p>
              </div>
            )}
            {/* <iframe
              src="https://converseai.zohobookings.in/portal-embed#/421680000000042050"
              title="Schedule a demo with ConverseAI"
              className="w-full border-0"
              style={{ height: "800px", minHeight: "600px" }}
              onLoad={() => setIsLoading(false)}
              allow="payment"
            /> */}
            <iframe
  src="https://calendar.google.com/calendar/appointments/schedules/AcZssZ3A-sR86Lvn6njkZNbhagQa-tC8b_y5SNTLfMxDlllCvpaYLtv9ycg4jyW3Y8iPKoE_l-5XX3O4?gv=true"
  title="Schedule via Google Calendar"
  className="w-full border-0"
  style={{ height: "800px", minHeight: "600px" }}
  frameBorder="0"
  onLoad={() => setIsLoading(false)}
  sandbox="allow-scripts allow-same-origin allow-forms allow-popups"
/>

          </div>
        </section>

        <Footer />
      </main>
    </>
  );
};

export default BookDemo;
