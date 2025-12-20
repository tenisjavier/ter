import React from "react";

const FooterCorredora: React.FC = () => {
  return (
    <footer className="bg-primario relative overflow-hidden bg-[url('/footer.jpg')] bg-cover bg-center">
      {/* Background building overlay */}
      <div
        className="absolute right-0 top-0 w-1/3 h-full opacity-10"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='200' height='200' viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Crect x='0' y='0' width='40' height='40'/%3E%3Crect x='40' y='0' width='40' height='40'/%3E%3Crect x='80' y='0' width='40' height='40'/%3E%3Crect x='120' y='0' width='40' height='40'/%3E%3Crect x='160' y='0' width='40' height='40'/%3E%3Crect x='0' y='40' width='40' height='40'/%3E%3Crect x='40' y='40' width='40' height='40'/%3E%3Crect x='80' y='40' width='40' height='40'/%3E%3Crect x='120' y='40' width='40' height='40'/%3E%3Crect x='160' y='40' width='40' height='40'/%3E%3Crect x='0' y='80' width='40' height='40'/%3E%3Crect x='40' y='80' width='40' height='40'/%3E%3Crect x='80' y='80' width='40' height='40'/%3E%3Crect x='120' y='80' width='40' height='40'/%3E%3Crect x='160' y='80' width='40' height='40'/%3E%3Crect x='0' y='120' width='40' height='40'/%3E%3Crect x='40' y='120' width='40' height='40'/%3E%3Crect x='80' y='120' width='40' height='40'/%3E%3Crect x='120' y='120' width='40' height='40'/%3E%3Crect x='160' y='120' width='40' height='40'/%3E%3Crect x='0' y='160' width='40' height='40'/%3E%3Crect x='40' y='160' width='40' height='40'/%3E%3Crect x='80' y='160' width='40' height='40'/%3E%3Crect x='120' y='160' width='40' height='40'/%3E%3Crect x='160' y='160' width='40' height='40'/%3E%3C/g%3E%3C/svg%3E")`,
          backgroundSize: "40px 40px",
        }}
      />

      <div className="container mx-auto px-4 py-12 relative z-10 ">
        <div className="flex flex-col lg:flex-row lg:justify-between gap-12">
          {/* Left Section - Office Information */}
          <div className="text-white lg:flex-1">
            <h3 className="text-2xl font-bold mb-8">Nuestras Oficinas</h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Left Column */}
              <div className="space-y-6">
                <div>
                  <h4 className="font-bold text-lg mb-2">
                    Santiago (Casa Matriz)
                  </h4>
                  <p className="text-sm mb-1">
                    La Concepción 141, Piso 8, Of. 801, Providencia
                  </p>
                  <p className="text-sm">Tel.: 2 2482 1500 </p>
                </div>
                <div>
                  <h4 className="font-bold text-lg mb-2">
                    Santiago (Sucursal)
                  </h4>
                  <p className="text-sm mb-1">
                    La Concepción 191, Piso 8, Of. 801, Providencia{" "}
                  </p>
                  <p className="text-sm">Tel.: 2 2482 1500 </p>
                </div>

                <div>
                  <h4 className="font-bold text-lg mb-2">Viña del Mar</h4>
                  <p className="text-sm mb-1">7 Norte 645, Piso 9, Of. 914</p>
                  <p className="text-sm">Tel.: 32 2235 320 / 32 2353 010</p>
                </div>
              </div>

              {/* Right Column */}
              <div className="space-y-6">
                <div>
                  <h4 className="font-bold text-lg mb-2">Antofagasta</h4>
                  <p className="text-sm mb-1">Uribe 636, Piso 8, Of. 802</p>
                  <p className="text-sm">Tel.: 55 2466 220</p>
                </div>

                <div>
                  <h4 className="font-bold text-lg mb-2">Concepción</h4>
                  <p className="text-sm mb-1">
                    Av. Arturo Prat 199, Torre B, Piso 9, Of. 905
                  </p>
                  <p className="text-sm">Tel.: 41 3800 080</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Section - Call to Action */}
          <div className="text-white lg:flex-shrink-0">
            <div className="text-left">
              <p className="text-destacado font-bold text-sm mb-4">FR GROUP</p>
              <h2 className="text-3xl font-bold mb-2">¿Tienes dudas?</h2>
              <h1 className="text-5xl font-black mb-6">contáctanos </h1>
              <button className="bg-destacado text-white px-4 py-2 rounded-md mr-8 mb-8">
                <a href="/corredores-de-seguros/contacto">Contáctanos</a>
              </button>
              <br></br>
              {/* LinkedIn Logo */}
              <div className="flex items-center gap-2">
                <p> Síguenos en LinkedIn</p>
                <a
                  href="https://www.linkedin.com/company/fr-group-corredora-de-seguros/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block transition-transform hover:scale-110"
                  aria-label="Síguenos en LinkedIn"
                >
                  <svg
                    className="w-8 h-8 text-white hover:text-blue-400 transition-colors"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Copyright Section */}
        <div className="border-t border-gray-600 mt-12 pt-6">
          <p className="text-white text-center text-sm">
            © FR GROUP TODOS LOS DERECHOS RESERVADOS
          </p>
        </div>
      </div>
    </footer>
  );
};

export default FooterCorredora;
