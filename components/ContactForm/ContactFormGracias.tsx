import { Button } from "@/components/ui/button";
import createLeadInSupabase from "@/utils/SupaBase/supabase";

export function ContactFormGracias() {
  return (
    <div className="min-h-screen">
      {/* Hero Section with Background Image */}
      <div
        className="relative min-h-screen"
        style={{
          background: `linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)), url('/contacto.jpg')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          backgroundAttachment: "fixed",
          minHeight: "100vh",
        }}
      >
        {/* Hero Content */}
        <div className="relative z-10 flex flex-col justify-start items-center min-h-screen text-center px-4 pt-20 lg:pt-44">
          <h1 className="text-white text-3xl lg:text-5xl md:text-6xl font-bold mb-4">
            Gracias te contactaremos a la brevedad
          </h1>
        </div>
      </div>
    </div>
  );
}
