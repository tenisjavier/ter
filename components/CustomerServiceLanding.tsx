"use client"

import React, { useState } from "react"

type Status = "idle" | "sending" | "success" | "error"

const CustomerServiceLanding: React.FC = () => {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [message, setMessage] = useState("")
  const [status, setStatus] = useState<Status>("idle")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email || !message) {
      setStatus("error")
      return
    }
    setStatus("sending")
    // Simulate send
    setTimeout(() => {
      setStatus("success")
      setName("")
      setEmail("")
      setMessage("")
    }, 800)
  }

  return (
    <main className="max-w-6xl mx-auto p-6">
      <section className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="px-6 py-10 md:flex md:items-center md:justify-between">
          <div className="max-w-2xl">
            <h1 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
              Atención al cliente
            </h1>
            <p className="mt-4 text-gray-600">
              Estamos aquí para ayudarte. Preguntas sobre tu cuenta, soporte técnico
              o información sobre nuestros servicios — nuestro equipo de atención
              al cliente responde rápido y con claridad.
            </p>
            <dl className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="flex items-start gap-3">
                <svg className="h-6 w-6 text-indigo-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden>
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8m-9 13V5" />
                </svg>
                <div>
                  <dt className="font-medium text-gray-900">Soporte 24/7</dt>
                  <dd className="mt-1 text-sm text-gray-600">Respuesta rápida por chat y correo.</dd>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <svg className="h-6 w-6 text-indigo-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden>
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h4l3 8 4-16 3 8h4" />
                </svg>
                <div>
                  <dt className="font-medium text-gray-900">Centros de ayuda</dt>
                  <dd className="mt-1 text-sm text-gray-600">Artículos y guías paso a paso.</dd>
                </div>
              </div>
            </dl>
          </div>

          <div className="mt-8 md:mt-0 md:ml-8 w-full max-w-md">
            <div className="bg-gray-50 p-6 rounded-lg">
              <h2 className="text-lg font-semibold text-gray-900">Contáctanos</h2>
              <p className="mt-2 text-sm text-gray-600">Rellena el formulario y te responderemos lo antes posible.</p>

              <form className="mt-4" onSubmit={handleSubmit} aria-label="contact form">
                <label className="block">
                  <span className="text-sm text-gray-700">Nombre (opcional)</span>
                  <input
                    className="mt-1 block w-full rounded-md border-gray-200 shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Tu nombre"
                  />
                </label>

                <label className="block mt-3">
                  <span className="text-sm text-gray-700">Correo electrónico</span>
                  <input
                    type="email"
                    required
                    className="mt-1 block w-full rounded-md border-gray-200 shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="tucorreo@ejemplo.com"
                  />
                </label>

                <label className="block mt-3">
                  <span className="text-sm text-gray-700">Mensaje</span>
                  <textarea
                    required
                    rows={4}
                    className="mt-1 block w-full rounded-md border-gray-200 shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Cuéntanos cómo podemos ayudar"
                  />
                </label>

                <div className="mt-4 flex items-center gap-3">
                  <button
                    type="submit"
                    className="inline-flex items-center justify-center rounded-md bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700 disabled:opacity-60"
                    disabled={status === "sending"}
                  >
                    {status === "sending" ? "Enviando..." : "Enviar mensaje"}
                  </button>

                  <button
                    type="button"
                    className="text-sm text-gray-600 underline"
                    onClick={() => {
                      setName("")
                      setEmail("")
                      setMessage("")
                      setStatus("idle")
                    }}
                  >
                    Reiniciar
                  </button>
                </div>

                {status === "success" && (
                  <p className="mt-3 text-sm text-green-600">Gracias — tu mensaje ha sido enviado.</p>
                )}
                {status === "error" && (
                  <p className="mt-3 text-sm text-red-600">Por favor completa el correo y el mensaje.</p>
                )}
              </form>

              <div className="mt-6 text-sm text-gray-700">
                <p>También puedes llamarnos: <strong className="text-gray-900">+34 900 123 456</strong></p>
                <p className="mt-1">Correo: <a href="mailto:soporte@ejemplo.com" className="underline">soporte@ejemplo.com</a></p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mt-8">
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <h3 className="text-lg font-semibold">Preguntas frecuentes</h3>
          <ul className="mt-4 space-y-3 text-gray-700">
            <li>
              <strong>¿Cuál es el horario de soporte?</strong>
              <p className="text-sm text-gray-600">Atendemos 24/7 por chat. Soporte telefónico en horario laboral.</p>
            </li>
            <li>
              <strong>¿Cuánto tarda la respuesta por correo?</strong>
              <p className="text-sm text-gray-600">Normalmente menos de 24 horas.</p>
            </li>
          </ul>
        </div>
      </section>
    </main>
  )
}

export default CustomerServiceLanding
