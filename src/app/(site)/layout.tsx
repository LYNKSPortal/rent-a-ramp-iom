import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import ConversionAnalytics from "@/components/layout/ConversionAnalytics";

export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-full min-w-0 w-full flex-1 flex-col">
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:z-[100] focus:top-4 focus:left-4 focus:rounded focus:bg-orange focus:px-4 focus:py-2 focus:text-white focus:font-semibold"
      >
        Skip to content
      </a>
      <Navbar />
      <main id="main-content" tabIndex={-1} className="min-w-0 flex-1">
        {children}
      </main>
      <Footer />
      {process.env.VERCEL_ANALYTICS_ENABLED === "true" && <ConversionAnalytics />}
    </div>
  );
}
