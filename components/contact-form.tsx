'use client'

import { useState } from 'react'
import { ShimmerButton } from '@/components/ui/shimmer-button'

const projectOptions = [
  { value: 'no-lo-se', label: 'Todavía no lo sé' },
  { value: 'higuera', label: 'vibio.higuera' },
  { value: 'berlanga', label: 'vibio.berlanga' },
  { value: 'otro', label: 'Otro / el modelo en general' },
] as const

type ProjectValue = (typeof projectOptions)[number]['value']

const SPECIFIC_PROJECTS: ProjectValue[] = ['higuera', 'berlanga']

export function ContactForm() {
  const [form, setForm] = useState({
    name: '',
    email: '',
    city: '',
    project: 'no-lo-se' as ProjectValue,
    message: '',
  })

  const showProjectHint = SPECIFIC_PROJECTS.includes(form.project)

  return (
    <form
      onSubmit={(e) => e.preventDefault()}
      className="border-[0.5px] border-vibio-border bg-vibio-surface p-8"
    >
      <Field
        id="contact-name"
        label="Nombre"
        required
        value={form.name}
        onChange={(v) => setForm({ ...form, name: v })}
        placeholder="Tu nombre"
      />

      <Field
        id="contact-email"
        label="Email"
        type="email"
        required
        value={form.email}
        onChange={(v) => setForm({ ...form, email: v })}
        placeholder="tu@email.com"
        className="mt-5"
      />

      <Field
        id="contact-city"
        label="Ciudad"
        required
        value={form.city}
        onChange={(v) => setForm({ ...form, city: v })}
        placeholder="Dónde vivís ahora"
        className="mt-5"
      />

      <div className="mt-5">
        <label
          htmlFor="contact-project"
          className="mb-1.5 block text-[12px] font-medium text-vibio-text/68"
        >
          ¿Hay algún proyecto que te interese?
        </label>
        <select
          id="contact-project"
          value={form.project}
          onChange={(e) =>
            setForm({ ...form, project: e.target.value as ProjectValue })
          }
          className="w-full appearance-none border-[0.5px] border-vibio-border bg-vibio-white px-4 py-3 text-[15px] text-vibio-text focus:border-vibio-accent-sky focus:outline-none"
        >
          {projectOptions.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
        {showProjectHint && (
          <p className="mt-2 text-[13px] text-vibio-text/52">
            Te vamos a conectar con el equipo de ese proyecto.
          </p>
        )}
      </div>

      <div className="mt-5">
        <label
          htmlFor="contact-message"
          className="mb-1.5 block text-[12px] font-medium text-vibio-text/68"
        >
          Mensaje
        </label>
        <textarea
          id="contact-message"
          rows={4}
          value={form.message}
          onChange={(e) => setForm({ ...form, message: e.target.value })}
          placeholder="Lo que quieras contarnos"
          className="w-full resize-none border-[0.5px] border-vibio-border bg-vibio-white px-4 py-3 text-[15px] text-vibio-text placeholder:text-vibio-text/45 focus:border-vibio-accent-sky focus:outline-none"
        />
      </div>

      <ShimmerButton
        type="submit"
        background="#18191b"
        shimmerColor="#ffffff"
        borderRadius="0"
        className="mt-8 w-full px-6 py-3.5 text-sm font-medium !text-vibio-white"
      >
        Empezar la conversación
      </ShimmerButton>

      <p className="mt-4 text-center text-[11px] text-vibio-text/52">
        Sin spam. Sin automatizaciones. Te responde una persona.
      </p>
    </form>
  )
}

type FieldProps = {
  id: string
  label: string
  type?: 'text' | 'email'
  required?: boolean
  value: string
  onChange: (value: string) => void
  placeholder?: string
  className?: string
}

function Field({
  id,
  label,
  type = 'text',
  required,
  value,
  onChange,
  placeholder,
  className,
}: FieldProps) {
  return (
    <div className={className}>
      <label
        htmlFor={id}
        className="mb-1.5 block text-[12px] font-medium text-vibio-text/68"
      >
        {label}
      </label>
      <input
        type={type}
        id={id}
        required={required}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full border-[0.5px] border-vibio-border bg-vibio-white px-4 py-3 text-[15px] text-vibio-text placeholder:text-vibio-text/45 focus:border-vibio-accent-sky focus:outline-none"
      />
    </div>
  )
}
