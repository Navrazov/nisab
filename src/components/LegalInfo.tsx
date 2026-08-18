import { Container } from './ui/Container'

export function LegalInfo() {
  return (
    <section id="legal" className="scroll-mt-20 border-t border-brand-100 bg-brand-50/60 py-16 transition-colors duration-300 sm:py-24 dark:border-white/10 dark:bg-white/[0.03]">
      <Container>
        <div className="max-w-2xl">
          <span className="text-xs font-semibold uppercase tracking-widest text-brand-400 dark:text-brand-300">
            Важно знать
          </span>
          <h2 className="mt-3 font-serif text-3xl font-semibold text-brand-900 sm:text-4xl dark:text-white">
            Правовая информация
          </h2>
        </div>

        <div className="mt-10 grid gap-5 text-sm leading-relaxed text-brand-600 sm:grid-cols-3 dark:text-brand-200">
          <div className="rounded-2xl border border-brand-100 bg-white p-6 transition-colors duration-300 dark:border-white/10 dark:bg-brand-900/40">
            <h3 className="font-semibold text-brand-900 dark:text-white">Рассрочка, а не кредит</h3>
            <p className="mt-2">
              Услуга оформляется как рассрочка платежа по договору купли-продажи товара
              (ст. 489 Гражданского кодекса РФ), а не как заём или потребительский кредит.
              Действие Федерального закона от 21.12.2013 № 353-ФЗ «О потребительском кредите
              (займе)» на такие договоры не распространяется.
            </p>
          </div>

          <div className="rounded-2xl border border-brand-100 bg-white p-6 transition-colors duration-300 dark:border-white/10 dark:bg-brand-900/40">
            <h3 className="font-semibold text-brand-900 dark:text-white">Наценка вместо процента</h3>
            <p className="mt-2">
              В основе расчёта — фиксированная торговая наценка на стоимость товара, а не
              ссудный процент. Такой подход соответствует принципам исламских финансов (отказ
              от риба) и заранее известен клиенту до подписания договора.
            </p>
          </div>

          <div className="rounded-2xl border border-brand-100 bg-white p-6 transition-colors duration-300 dark:border-white/10 dark:bg-brand-900/40">
            <h3 className="font-semibold text-brand-900 dark:text-white">Персональные данные</h3>
            <p className="mt-2">
              Обработка персональных данных клиентов осуществляется в соответствии с
              Федеральным законом от 27.07.2006 № 152-ФЗ «О персональных данных». Согласие на
              обработку данных запрашивается при подаче заявки.
            </p>
          </div>
        </div>
      </Container>
    </section>
  )
}
