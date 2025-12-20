import { Button } from "@/components/ui/button";
import createLeadInSupabase from "@/utils/SupaBase/supabase";
import { redirect } from "next/navigation";
import { Resend } from "resend";

// Server Action
async function createLeadArriendo(formData: FormData) {
  "use server";
  const resend = new Resend(process.env.RESEND_KEY);
  const name = formData.get("name") as string;
  const propertyId = formData.get("propertyId") as string;
  const propertyAddress = formData.get("propertyAddress") as string;
  const propertyComuna = formData.get("propertyComuna") as string;
  const rut = formData.get("rut") as string;
  const email = formData.get("email") as string;
  const phone = formData.get("phone") as string;
  const comuna = formData.get("comuna") as string;

  // propertyId is available here if needed for future use

  await createLeadInSupabase(
    {
      name,
      propertyId,
      propertyAddress,
      propertyComuna,
      rut,
      email,
      phone,
      comuna,
    },
    "leads-cotizar"
  );
  const { data, error } = await resend.emails.send({
    from: "informaciones@frgroup.cl",
    to: "lfgonzalez@frgroup.cl",
    subject: "Nuevo lead de COTIZAR",
    html: `
      <h1>Nuevo lead de COTIZAR</h1>
      <table cellpadding="6" cellspacing="0" border="0" style="font-family:sans-serif; font-size:16px; color:#232323;">
        <tr>
          <td style="font-weight:bold;">Nombre:</td>
          <td>${name ? name : ""}</td>
        </tr>
        <tr>
          <td style="font-weight:bold;">RUT:</td>
          <td>${rut ? rut : ""}</td>
        </tr>
        <tr>
          <td style="font-weight:bold;">Email:</td>
          <td>${email ? email : ""}</td>
        </tr>
        <tr>
          <td style="font-weight:bold;">Teléfono:</td>
          <td>${phone ? phone : ""}</td>
        </tr>
        <tr>
          <td style="font-weight:bold;">Comuna:</td>
          <td>${comuna ? comuna : ""}</td>
        </tr>
        ${
          propertyId
            ? `<tr>
          <td style="font-weight:bold;">ID Propiedad:</td>
          <td>${propertyId}</td>
        </tr>`
            : ""
        }
        ${
          propertyAddress
            ? `<tr>
          <td style="font-weight:bold;">Dirección Propiedad:</td>
          <td>${propertyAddress}</td>
        </tr>`
            : ""
        }
        ${
          propertyComuna
            ? `<tr>
          <td style="font-weight:bold;">Comuna Propiedad:</td>
          <td>${propertyComuna}</td>
        </tr>`
            : ""
        }
      </table>
    `,
  });
  if (error) {
    console.log("error", error);
  }

  redirect("/administracion-de-activos/cotizar/gracias");
}

interface ContactFormCotizarProps {
  propertyId?: string;
  propertyAddress?: string;
  propertyComuna?: string;
  propertyType?: string;
  transactionType?: string;
}

export function ContactFormCotizar({
  propertyId,
  propertyAddress,
  propertyComuna,
  propertyType,
  transactionType,
}: ContactFormCotizarProps) {
  return (
    <div className="min-h-screen">
      {/* Hero Section with Background Image */}
      <div
        className="relative h-[800px] lg:h-[900px]"
        style={{
          background: `linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)), url('/contacto.jpg')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          backgroundAttachment: "fixed",
        }}
      >
        {/* Hero Content */}
        <div className="relative z-10 flex flex-col justify-start items-center  text-center px-4 pt-20 lg:pt-44">
          <h1 className="text-white text-3xl lg:text-5xl md:text-6xl font-bold mb-4">
            Cotiza {propertyType} en {transactionType}
          </h1>
          <p className="text-white lg:text-3xl text-xl  mb-8 font-light">
            Completa el formulario y te contactaremos.
          </p>
        </div>

        {/* Floating Contact Form Card */}
        <div className="absolute lg:bottom-0 -bottom-16 left-1/2 transform -translate-x-1/2 translate-y-1/2 z-20 w-full max-w-6xl px-4">
          <div className="bg-white rounded-xl shadow-2xl p-8">
            <div className="grid lg:grid-cols-2 gap-12 items-start">
              {/* Left Panel - Information */}
              <div className="space-y-6 lg:mt-12 mt-4">
                <div>
                  <p className="text-destacado text-sm font-bold uppercase tracking-wide mb-2">
                    ESTAMOS AQUÍ PARA AYUDARTE
                  </p>
                  <h2 className="text-primary lg:text-4xl text-2xl font-light mb-2">
                    ¿Necesitas más información?
                  </h2>
                  <p className="text-gray-600 text-xl lg:text-4xl font-normal ">
                    No dudes en
                    <span className="font-bold"> escribirnos</span>
                  </p>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <svg
                      className="w-16 h-16 text-destacado flex-shrink-0"
                      fill="currentColor"
                      stroke="white"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                      />
                    </svg>
                    <span className="text-gray-700">
                      Email<br></br>{" "}
                      <span className="font-bold">corretaje@frgroup.cl</span>
                    </span>
                  </div>

                  <div className="flex items-center gap-3">
                    <svg
                      className="w-16 h-16 text-destacado flex-shrink-0"
                      fill="currentColor"
                      stroke="white"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                      />
                    </svg>
                    <span className="text-gray-700">
                      Telefono: <br></br>
                      <span className="font-bold">+56 9 5705 2983</span>
                    </span>
                  </div>
                </div>
              </div>

              {/* Right Panel - Contact Form */}
              <div>
                <form className="space-y-6" action={createLeadArriendo}>
                  {/* Hidden propertyId field */}
                  {propertyId && (
                    <input type="hidden" name="propertyId" value={propertyId} />
                  )}
                  {propertyAddress && (
                    <input
                      type="hidden"
                      name="propertyAddress"
                      value={propertyAddress}
                    />
                  )}
                  {propertyComuna && (
                    <input
                      type="hidden"
                      name="propertyComuna"
                      value={propertyComuna}
                    />
                  )}
                  {/* Name Field */}
                  <div>
                    <label
                      htmlFor="name"
                      className="block text-gray-800 font-bold mb-2"
                    >
                      Nombre*
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      placeholder="Inserta tu nombre"
                      required
                      className="w-full px-4 py-3 bg-gray-100 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="rut"
                      className="block text-gray-800 font-bold mb-2"
                    >
                      RUT*
                    </label>
                    <input
                      type="text"
                      required
                      id="rut"
                      name="rut"
                      placeholder="Ej: 12345678-9"
                      className="w-full px-4 py-3 bg-gray-100 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>

                  {/* Phone Field */}
                  <div>
                    <label
                      htmlFor="phone"
                      className="block text-primarui font-bold mb-2"
                    >
                      Teléfono
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      placeholder="+569 1234 5678"
                      required
                      className="w-full px-4 py-3 bg-gray-100 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  {/* Email Field */}
                  <div>
                    <label
                      htmlFor="email"
                      className="block text-gray-800 font-bold mb-2"
                    >
                      Email*
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      placeholder="Ej: juan.rodriguez@falabella.com"
                      required
                      className="w-full px-4 py-3 bg-gray-100 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>

                  {/* Name Field */}
                  <div>
                    <label
                      htmlFor="comuna"
                      className="block text-gray-800 font-bold mb-2"
                    >
                      Comuna*
                    </label>
                    <input
                      type="text"
                      id="comuna"
                      name="comuna"
                      placeholder="Providencia"
                      required
                      className="w-full px-4 py-3 bg-gray-100 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>

                  {/* Submit Button */}
                  <div className="text-center pt-4">
                    <Button
                      type="submit"
                      showArrow={true}
                      size="lg"
                      className={`cursor-pointer text-lg bg-destacado text-white p-0 my-2 btn-light  lg:text-base py-6 pl-8 pr-0 rounded-full font-bold hover:text-white  w-fit`}
                    >
                      Enviar Mensaje
                    </Button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Section to provide space for the floating form */}
      <div className="bg-white pt-32 pb-16 h-[48rem]">
        {/* Additional content can go here */}
      </div>
    </div>
  );
}
