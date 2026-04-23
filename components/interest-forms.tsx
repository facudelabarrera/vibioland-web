'use client'

import { useState } from 'react'

import { cn } from '@/lib/utils'
import { ShimmerButton } from '@/components/ui/shimmer-button'

const joinProjectOptions = [
  { value: 'general', label: 'El modelo en general' },
  { value: 'higuera', label: 'vibio.higuera' },
  { value: 'berlanga', label: 'vibio.berlanga' },
  { value: 'future', label: 'Próximos proyectos' },
] as const

const joinHouseholdOptions = [
  { value: 'solo', label: 'Voy solo/a' },
  { value: 'pareja', label: 'En pareja' },
  { value: 'familia', label: 'Con familia / hijos' },
  { value: 'other', label: 'Otro' },
] as const

const joinTimelineOptions = [
  { value: 'explorando', label: 'Solo explorando' },
  { value: '12m', label: 'En los próximos 12 meses' },
  { value: '24m', label: 'Entre 12 y 24 meses' },
  { value: 'ready', label: 'Listo/a para conversar ya' },
] as const

const housingOptions = [
  { value: 'buy', label: 'Compra' },
  { value: 'rent', label: 'Alquiler' },
  { value: 'flex', label: 'Estoy abierto/a a ambas' },
  { value: 'unknown', label: 'Todavía no lo sé' },
] as const

const investorTypeOptions = [
  { value: 'angel', label: 'Ángel / individual' },
  { value: 'family-office', label: 'Family office' },
  { value: 'fund', label: 'Fondo' },
  { value: 'company', label: 'Empresa / partner estratégico' },
  { value: 'other', label: 'Otro' },
] as const

const investorRangeOptions = [
  { value: 'under-50k', label: 'Hasta €50k' },
  { value: '50-250k', label: '€50k – €250k' },
  { value: '250k-1m', label: '€250k – €1M' },
  { value: 'over-1m', label: 'Más de €1M' },
] as const

const investorFocusOptions = [
  { value: 'equity', label: 'Equity / participación' },
  { value: 'debt', label: 'Deuda / financiación estructurada' },
  { value: 'impact', label: 'Impacto + retorno' },
  { value: 'strategic', label: 'Alianza estratégica' },
] as const

const investorInvolvementOptions = [
  { value: 'silent', label: 'Principalmente capital' },
  { value: 'advisor', label: 'Capital + acompañamiento' },
  { value: 'hands-on', label: 'Muy involucrado/a' },
  { value: 'open', label: 'Depende de la oportunidad' },
] as const

type Option = { value: string; label: string }

export function JoinInterestForm() {
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    city: '',
    household: 'solo',
    project: 'general',
    timeline: 'explorando',
    housing: 'unknown',
    work: '',
    message: '',
  })

  return (
    <form onSubmit={(e) => e.preventDefault()} className="vibio-surface-radius-lg border border-vibio-border bg-vibio-surface p-8 lg:p-10">
      <div className="grid gap-5 sm:grid-cols-2">
        <Field id="join-name" label="Nombre y apellido" required value={form.name} onChange={(value) => setForm({ ...form, name: value })} placeholder="Tu nombre" />
        <Field id="join-email" label="Email" type="email" required value={form.email} onChange={(value) => setForm({ ...form, email: value })} placeholder="vos@email.com" />
        <Field id="join-phone" label="Teléfono" value={form.phone} onChange={(value) => setForm({ ...form, phone: value })} placeholder="Opcional" />
        <Field id="join-city" label="Ciudad actual" required value={form.city} onChange={(value) => setForm({ ...form, city: value })} placeholder="Dónde vivís hoy" />
      </div>

      <div className="mt-5 grid gap-5 sm:grid-cols-2">
        <SelectField id="join-household" label="¿Con quién te imaginás dando el paso?" value={form.household} onChange={(value) => setForm({ ...form, household: value })} options={joinHouseholdOptions} />
        <SelectField id="join-project" label="Proyecto o foco de interés" value={form.project} onChange={(value) => setForm({ ...form, project: value })} options={joinProjectOptions} />
        <SelectField id="join-timeline" label="Momento" value={form.timeline} onChange={(value) => setForm({ ...form, timeline: value })} options={joinTimelineOptions} />
        <SelectField id="join-housing" label="Formato de vivienda que te interesa" value={form.housing} onChange={(value) => setForm({ ...form, housing: value })} options={housingOptions} />
      </div>

      <Field id="join-work" label="Trabajo / actividad principal" value={form.work} onChange={(value) => setForm({ ...form, work: value })} placeholder="Remoto, híbrido, proyecto propio, etc." className="mt-5" />

      <TextAreaField id="join-message" label="¿Qué te gustaría encontrar en vibio?" value={form.message} onChange={(value) => setForm({ ...form, message: value })} placeholder="Contanos qué buscás, qué dudas tenés y cómo imaginás tu vida en comunidad." className="mt-5" />

      <ShimmerButton type="submit" background="var(--color-vibio-brand-yellow)" shimmerColor="var(--color-vibio-brand-green)" className="mt-8 w-full border-transparent px-6 py-3.5 text-sm font-medium !text-vibio-dark">
        Enviar interés para vivir en vibio
      </ShimmerButton>

      <p className="mt-4 text-center text-[11px] text-vibio-text/52">
        Nos ayuda a responder con más contexto y menos ida y vuelta innecesaria.
      </p>
    </form>
  )
}

export function InvestorInterestForm() {
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    organization: '',
    investorType: 'angel',
    range: '50-250k',
    focus: 'impact',
    involvement: 'advisor',
    geography: '',
    message: '',
  })

  return (
    <form onSubmit={(e) => e.preventDefault()} className="vibio-surface-radius-lg border border-vibio-border bg-vibio-surface p-8 lg:p-10">
      <div className="grid gap-5 sm:grid-cols-2">
        <Field id="investor-name" label="Nombre y apellido" required value={form.name} onChange={(value) => setForm({ ...form, name: value })} placeholder="Tu nombre" />
        <Field id="investor-email" label="Email" type="email" required value={form.email} onChange={(value) => setForm({ ...form, email: value })} placeholder="vos@organizacion.com" />
        <Field id="investor-phone" label="Teléfono" value={form.phone} onChange={(value) => setForm({ ...form, phone: value })} placeholder="Opcional" />
        <Field id="investor-organization" label="Organización / vehículo inversor" value={form.organization} onChange={(value) => setForm({ ...form, organization: value })} placeholder="Fondo, family office, empresa, etc." />
      </div>

      <div className="mt-5 grid gap-5 sm:grid-cols-2">
        <SelectField id="investor-type" label="Perfil inversor" value={form.investorType} onChange={(value) => setForm({ ...form, investorType: value })} options={investorTypeOptions} />
        <SelectField id="investor-range" label="Rango estimado" value={form.range} onChange={(value) => setForm({ ...form, range: value })} options={investorRangeOptions} />
        <SelectField id="investor-focus" label="Tesis o formato de interés" value={form.focus} onChange={(value) => setForm({ ...form, focus: value })} options={investorFocusOptions} />
        <SelectField id="investor-involvement" label="Nivel de involucramiento" value={form.involvement} onChange={(value) => setForm({ ...form, involvement: value })} options={investorInvolvementOptions} />
      </div>

      <Field id="investor-geography" label="Territorio o tipo de proyecto que te interesa" value={form.geography} onChange={(value) => setForm({ ...form, geography: value })} placeholder="España rural, expansión, proyectos piloto, etc." className="mt-5" />

      <TextAreaField id="investor-message" label="¿Qué te gustaría evaluar?" value={form.message} onChange={(value) => setForm({ ...form, message: value })} placeholder="Contanos ticket, expectativas de retorno, hipótesis de impacto o qué información te haría falta para avanzar." className="mt-5" />

      <ShimmerButton type="submit" background="var(--color-vibio-brand-yellow)" shimmerColor="var(--color-vibio-brand-green)" className="mt-8 w-full border-transparent px-6 py-3.5 text-sm font-medium !text-vibio-dark">
        Enviar interés inversor
      </ShimmerButton>

      <p className="mt-4 text-center text-[11px] text-vibio-text/52">
        Buscamos conversaciones con encaje real, no volumen por volumen.
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

function Field({ id, label, type = 'text', required, value, onChange, placeholder, className }: FieldProps) {
  return (
    <div className={className}>
      <label htmlFor={id} className="mb-1.5 block text-[12px] font-medium text-vibio-text/68">
        {label}
      </label>
      <input type={type} id={id} required={required} value={value} onChange={(e) => onChange(e.target.value)} placeholder={placeholder} className={baseInputClassName} />
    </div>
  )
}

type SelectFieldProps = {
  id: string
  label: string
  value: string
  onChange: (value: string) => void
  options: readonly Option[]
}

function SelectField({ id, label, value, onChange, options }: SelectFieldProps) {
  return (
    <div>
      <label htmlFor={id} className="mb-1.5 block text-[12px] font-medium text-vibio-text/68">
        {label}
      </label>
      <select id={id} value={value} onChange={(e) => onChange(e.target.value)} className={cn(baseInputClassName, 'appearance-none')}>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  )
}

type TextAreaFieldProps = {
  id: string
  label: string
  value: string
  onChange: (value: string) => void
  placeholder?: string
  className?: string
}

function TextAreaField({ id, label, value, onChange, placeholder, className }: TextAreaFieldProps) {
  return (
    <div className={className}>
      <label htmlFor={id} className="mb-1.5 block text-[12px] font-medium text-vibio-text/68">
        {label}
      </label>
      <textarea id={id} rows={5} value={value} onChange={(e) => onChange(e.target.value)} placeholder={placeholder} className={cn(baseInputClassName, 'resize-none')} />
    </div>
  )
}

const baseInputClassName =
  'vibio-input-radius w-full border border-vibio-border bg-vibio-white px-4 py-3 text-[15px] text-vibio-text placeholder:text-vibio-text/45 focus:border-vibio-accent-sky focus:outline-none'
