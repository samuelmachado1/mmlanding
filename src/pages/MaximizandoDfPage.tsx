import { PageLayout } from '../components/layout/PageLayout.tsx';
import { maximizandoDfPage } from '../data/content.ts';

export default function MaximizandoDfPage() {
  return (
    <PageLayout>
      <h1 className="mb-6 font-body text-3xl font-extrabold text-brand-black">{maximizandoDfPage.title}</h1>
      {maximizandoDfPage.paragraphs.map((paragraph) => (
        <p key={paragraph.slice(0, 48)} className="mb-4 leading-relaxed text-brand-black/90">
          {paragraph}
        </p>
      ))}
      <div className="mt-8 overflow-x-auto">
        <table className="w-full min-w-[32rem] border-collapse text-sm">
          <thead>
            <tr className="border-b border-brand-black/20">
              <th className="py-2 text-left font-semibold">Área de Investimento</th>
              <th className="py-2 text-left font-semibold">Valor alocado na LOA</th>
              <th className="py-2 text-left font-semibold">Porcentagem do Total</th>
            </tr>
          </thead>
          <tbody>
            {maximizandoDfPage.rows.map((row) => (
              <tr key={row.area} className="border-b border-brand-black/10">
                <td className="py-2">{row.area}</td>
                <td className="py-2">{row.amount}</td>
                <td className="py-2">{row.percent}</td>
              </tr>
            ))}
            <tr className="font-bold">
              <td className="py-2">{maximizandoDfPage.total.area}</td>
              <td className="py-2">{maximizandoDfPage.total.amount}</td>
              <td className="py-2">{maximizandoDfPage.total.percent}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </PageLayout>
  );
}
