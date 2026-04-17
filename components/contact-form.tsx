'use client'

import { useState } from 'react'

import { cn } from '@/lib/utils'
import { ShimmerButton } from '@/components/ui/shimmer-button'

const interestOptions = [
  { value: 'vivir', label: 'Vivir en vibio' },
  { value: 'territorio', label: 'Proponer territorio' },
  { value: 'modelo', label: 'Cómo funciona' },
  { value: 'equipo', label: 'Habla con el equipo' },
  { value: 'otro', label: 'Otro' },
] as const

type InterestValue = (typeof interestOptions)[number]['value']

export function ContactForm() {
  const [form, setForm] = useState({
    name: '',
    email: '',
    interest: 'equipo' as InterestValue,
    message: '',
  })

  return (
    <form
      onSubmit={(e) => e.preventDefault()}
      className="border border-vibio-border/65 bg-vibio-white p-8 lg:p-10"
    >
      <Field
        id="contact-name"
        label="Nombre"
        required
        value={form.name}
        onChange={(v) => setForm({ ...form, name: v })}
        placeholder="Tu nombre completo"
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

      <div className="mt-5">
        <span className="mb-2 block text-[12px] font-medium text-vibio-text/52">
          Me interesa
        </span>
        <div className="flex flex-wrap gap-2">
          {interestOptions.map((option) => {
            const selected = form.interest === option.value

            return (
              <button
                key={option.value}
                type="button"
                onClick={() => setForm({ ...form, interest: option.value })}
                className={cn(
                  'border px-3.5 py-2 text-[12px] font-medium transition-colors',
                  selected
                    ? 'border-vibio-brand-yellow bg-vibio-brand-yellow text-vibio-dark'
                    : 'border-vibio-border/55 text-vibio-text/70 hover:border-vibio-text/35 hover:text-vibio-text',
                )}
              >
                {option.label}
              </button>
            )
          })}
        </div>
      </div>

      <div className="mt-5">
        <label
          htmlFor="contact-message"
          className="mb-2 block text-[12px] font-medium text-vibio-text/52"
        >
          Mensaje
        </label>
        <textarea
          id="contact-message"
          rows={4}
          value={form.message}
          onChange={(e) => setForm({ ...form, message: e.target.value })}
          placeholder="Contanos un poco más sobre tu consulta..."
          className="w-full resize-none border border-vibio-border/65 bg-vibio-surface px-4 py-3 text-[15px] text-vibio-text placeholder:text-vibio-text/45 focus:border-vibio-accent-sky focus:outline-none"
        />
      </div>

      <ShimmerButton
        type="submit"
        background="var(--color-vibio-brand-yellow)"
        shimmerColor="var(--color-vibio-brand-green)"
        borderRadius="0"
        className="mt-8 w-full px-6 py-3.5 text-sm font-medium !text-vibio-dark"
      >
        Empezar la conversación
      </ShimmerButton>

      <p className="mt-4 text-center text-[11px] text-vibio-text/52">
        Respondemos en menos de 48 horas, de persona a persona.
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
        className="mb-2 block text-[12px] font-medium text-vibio-text/52"
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
        className="w-full border-b border-vibio-border/65 bg-transparent px-0 py-3 text-[15px] text-vibio-text placeholder:text-vibio-text/45 focus:border-vibio-accent-sky focus:outline-none"
      />
    </div>
  )
}
