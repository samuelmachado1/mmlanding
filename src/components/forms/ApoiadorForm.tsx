import { useEffect, useState, type FormEvent } from 'react';
import { apoiadorFormContent, distritoFederalRegioesAdministrativas } from '../../data/content.ts';
import { isGoogleFormConfigured, submitApoiadorGoogleForm } from '../../lib/google-form.ts';
import type { ApoiadorFormData } from '../../types/index.ts';

const BRAZILIAN_STATES = [
  'AC', 'AL', 'AP', 'AM', 'BA', 'CE', 'DF', 'ES', 'GO', 'MA', 'MT', 'MS', 'MG',
  'PA', 'PB', 'PR', 'PE', 'PI', 'RJ', 'RN', 'RS', 'RO', 'RR', 'SC', 'SP', 'SE', 'TO',
] as const;

interface IbgeMunicipio {
  id: number;
  nome: string;
}

const inputClassName =
  'w-full rounded-[14px] border-[1.9px] border-brand-black/10 bg-white px-4 py-3 font-nav text-base text-brand-black outline-none placeholder:text-brand-black/50 focus:border-navy-500';

const selectClassName =
  'w-full rounded-[14px] border-[1.9px] border-brand-black/10 bg-white px-4 py-3 font-nav text-base text-brand-black outline-none focus:border-navy-500 disabled:cursor-not-allowed disabled:bg-white/70 disabled:text-brand-black/50';

const emptyForm: ApoiadorFormData = {
  nome: '',
  email: '',
  whatsapp: '',
  uf: '',
  municipio: '',
  novidades: false,
  campanhaDigital: false,
  campanhaRua: false,
  lgpdAceite: false,
};

export function ApoiadorForm() {
  const [form, setForm] = useState<ApoiadorFormData>(emptyForm);
  const [municipios, setMunicipios] = useState<IbgeMunicipio[]>([]);
  const [municipiosLoading, setMunicipiosLoading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const content = apoiadorFormContent;
  const isDistritoFederal = form.uf === 'DF';

  useEffect(() => {
    if (!form.uf || form.uf === 'DF') {
      setMunicipios([]);
      setMunicipiosLoading(false);
      return;
    }

    let cancelled = false;
    setMunicipiosLoading(true);

    fetch(`https://servicodados.ibge.gov.br/api/v1/localidades/estados/${form.uf}/municipios`)
      .then((response) => response.json())
      .then((data: IbgeMunicipio[]) => {
        if (!cancelled) {
          setMunicipios(data);
        }
      })
      .catch(() => {
        if (!cancelled) {
          setMunicipios([]);
        }
      })
      .finally(() => {
        if (!cancelled) {
          setMunicipiosLoading(false);
        }
      });

    return () => {
      cancelled = true;
    };
  }, [form.uf]);

  const locationOptions = isDistritoFederal
    ? distritoFederalRegioesAdministrativas.map((ra) => ({ id: ra, nome: ra }))
    : municipios;

  const locationPlaceholder = !form.uf
    ? content.municipioSelectUf
    : isDistritoFederal
      ? content.placeholders.regiaoAdministrativa
      : municipiosLoading
        ? content.municipioLoading
        : content.placeholders.municipio;

  function updateField<K extends keyof ApoiadorFormData>(key: K, value: ApoiadorFormData[K]) {
    setForm((current) => ({ ...current, [key]: value }));
    setErrorMessage(null);
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!isGoogleFormConfigured()) {
      setErrorMessage(content.notConfiguredMessage);
      return;
    }

    setIsSubmitting(true);
    setErrorMessage(null);

    try {
      await submitApoiadorGoogleForm(form);
      setIsSuccess(true);
      setForm(emptyForm);
    } catch {
      setErrorMessage(content.notConfiguredMessage);
    } finally {
      setIsSubmitting(false);
    }
  }

  if (isSuccess) {
    return (
      <div className="text-center">
        <p className="font-nav text-lg font-bold text-navy-500">{content.successMessage}</p>
      </div>
    );
  }

  return (
    <form className="space-y-4" onSubmit={handleSubmit} noValidate>
      <input
        type="text"
        className={inputClassName}
        placeholder={content.placeholders.nome}
        value={form.nome}
        onChange={(event) => updateField('nome', event.target.value)}
        required
      />
      <input
        type="email"
        className={inputClassName}
        placeholder={content.placeholders.email}
        value={form.email}
        onChange={(event) => updateField('email', event.target.value)}
        required
      />
      <input
        type="tel"
        className={inputClassName}
        placeholder={content.placeholders.whatsapp}
        value={form.whatsapp}
        onChange={(event) => updateField('whatsapp', event.target.value)}
        required
      />

      <div className="grid grid-cols-[minmax(0,1fr)_minmax(0,2.5fr)] gap-3">
        <select
          className={selectClassName}
          value={form.uf}
          onChange={(event) => {
            updateField('uf', event.target.value);
            updateField('municipio', '');
          }}
          required
        >
          <option value="">{content.placeholders.uf}</option>
          {BRAZILIAN_STATES.map((uf) => (
            <option key={uf} value={uf}>{uf}</option>
          ))}
        </select>

        <select
          className={selectClassName}
          value={form.municipio}
          onChange={(event) => updateField('municipio', event.target.value)}
          disabled={!form.uf || (!isDistritoFederal && municipiosLoading)}
          required
        >
          <option value="">{locationPlaceholder}</option>
          {locationOptions.map((location) => (
            <option key={location.id} value={location.nome}>{location.nome}</option>
          ))}
        </select>
      </div>

      <div className="space-y-3 pt-2">
        <label className="flex items-start gap-3 font-nav text-sm leading-snug text-brand-black">
          <input
            type="checkbox"
            className="mt-0.5 size-4 shrink-0 accent-navy-500"
            checked={form.novidades}
            onChange={(event) => updateField('novidades', event.target.checked)}
          />
          {content.checkboxes.novidades}
        </label>
        <label className="flex items-start gap-3 font-nav text-sm leading-snug text-brand-black">
          <input
            type="checkbox"
            className="mt-0.5 size-4 shrink-0 accent-navy-500"
            checked={form.campanhaDigital}
            onChange={(event) => updateField('campanhaDigital', event.target.checked)}
          />
          {content.checkboxes.campanhaDigital}
        </label>
        <label className="flex items-start gap-3 font-nav text-sm leading-snug text-brand-black">
          <input
            type="checkbox"
            className="mt-0.5 size-4 shrink-0 accent-navy-500"
            checked={form.campanhaRua}
            onChange={(event) => updateField('campanhaRua', event.target.checked)}
          />
          {content.checkboxes.campanhaRua}
        </label>
      </div>

      <div className="space-y-3 border-t border-brand-black/10 pt-4">
        <h3 className="font-nav text-sm font-bold uppercase text-brand-black">
          {content.lgpdTermTitle}
        </h3>
        <p className="font-nav text-sm leading-snug text-brand-black">
          {content.lgpdTermText}
        </p>
        <label className="flex items-start gap-3 font-nav text-sm leading-snug text-brand-black">
          <input
            type="checkbox"
            className="mt-0.5 size-4 shrink-0 accent-navy-500"
            checked={form.lgpdAceite}
            onChange={(event) => updateField('lgpdAceite', event.target.checked)}
            required
          />
          {content.lgpdCheckboxLabel}
        </label>
      </div>

      {errorMessage ? (
        <p className="text-center font-nav text-sm font-semibold text-brand-red">{errorMessage}</p>
      ) : null}

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full rounded-[14px] bg-navy-500 px-6 py-4 font-nav text-lg font-bold text-white transition hover:bg-navy-600 disabled:cursor-not-allowed disabled:opacity-70"
      >
        {isSubmitting ? 'Enviando...' : content.submitLabel}
      </button>
    </form>
  );
}
