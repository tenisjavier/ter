import React from "react";
import Link from "next/link";
import Image from "next/image";

const Footer: React.FC = () => {
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

      <div className="container mx-auto px-4 py-12 relative z-10">
        <div className="flex flex-col lg:flex-row lg:justify-between">
          {/* Grouped Left Sections - Contact Info, Links, and Policies */}
          <div className="flex flex-col lg:flex-row gap-6 lg:gap-16">
            {/* Left Section - Contact Information */}
            <div className="text-white lg:flex-1">
              <div className="mb-8">
                <h3 className="text-2xl font-bold mb-2">Contáctanos</h3>
                <a href="mailto:contacto@terinversiones.cl">
                  <p className="text-destacado font-bold text-lg">
                    contacto@terinversiones.cl
                  </p>
                </a>
              </div>
              <div>
                <h4 className="font-bold text-lg mb-2">
                  Santiago (Casa Matriz)
                </h4>
                <p className="text-sm mb-1">
                  La Concepción 141, Piso 8, Oficina 801, Providencia.
                </p>
                <p className="text-sm">Teléfono: 2 2484 0000</p>
              </div>
            </div>

            {/* Middle-Left Section - ter inversiones Links */}
            <div className="text-white">
              <h4 className="font-bold text-lg mb-4">ter inversiones</h4>
              <ul className="space-y-2">
                <li>
                  <Link
                    href="/conocenos"
                    className="text-sm hover:text-destacado transition-colors"
                  >
                    Conócenos
                  </Link>
                </li>
                <li>
                  <Link
                    href="/sustentabilidad"
                    className="text-sm hover:text-destacado transition-colors"
                  >
                    Sostenibilidad
                  </Link>
                </li>
                <li>
                  <Link
                    href="/proyectos"
                    className="text-sm hover:text-destacado transition-colors"
                  >
                    Proyectos
                  </Link>
                </li>
                <li>
                  <Link
                    href="/contacto"
                    className="text-sm hover:text-destacado transition-colors"
                  >
                    Contacto
                  </Link>
                </li>
              </ul>
            </div>

            {/* Middle-Right Section - Políticas Links */}
            <div className="text-white mb-12">
              <h4 className="font-bold text-lg mb-4">Políticas</h4>
              <ul className="space-y-2">
                <li>
                  <Link
                    href="/politica-de-cookies"
                    className="text-sm hover:text-destacado transition-colors"
                  >
                    Política de cookies
                  </Link>
                </li>
                <li>
                  <Link
                    href="/aviso-legal"
                    className="text-sm hover:text-destacado transition-colors"
                  >
                    Aviso legal
                  </Link>
                </li>
                <li>
                  <Link
                    href="/politica-de-privacidad"
                    className="text-sm hover:text-destacado transition-colors"
                  >
                    Política de privacidad
                  </Link>
                </li>
                <li>
                  <Link
                    href="/politicas-de-sostenibilidad.pdf"
                    className="text-sm hover:text-destacado transition-colors"
                  >
                    Política de sostenibilidad
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          {/* Right Section - Call to Action */}
          <div className="text-white lg:shrink-0 lg:ml-12">
            <div className="text-left">
              <p className="text-destacado font-bold text-2xl">
                ter inversiones
              </p>
              <h2 className="text-3xl mb-2 font-light">¿Tienes dudas?</h2>
              <h1 className="text-5xl lg:text-4xl font-black mb-6">
                contáctanos
              </h1>
              <a
                href="mailto:contacto@terinversiones.cl"
                className="inline-flex items-center gap-3 bg-destacado text-white px-6 py-2 rounded-full hover:opacity-90 transition-opacity"
              >
                <span className="font-black">Escríbenos aquí</span>
                <div className="w-8 h-8 rounded-full bg-destacado flex items-center justify-center shrink-0 ">
                  <Image
                    src="/icons/diagonal-white.svg"
                    alt="Arrow"
                    width={80}
                    height={80}
                    className="text-white w-32 h-32"
                  />
                </div>
              </a>
            </div>
          </div>
        </div>

        {/* Copyright Section */}
        <div className="border-t border-white/20 mt-12 pt-6">
          <p className="text-white text-center text-sm">
            © 2023 TER INVERSIONES | TODOS LOS DERECHOS RESERVADOS
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
