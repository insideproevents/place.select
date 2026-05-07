import { useState, useMemo, useCallback } from 'react';
import { motion } from 'framer-motion';
import { Calculator, Minus, Plus } from 'lucide-react';

interface CalculatorState {
  currency: 'CLP' | 'UF';
  income: number;
  propertyValue: number;
  downPaymentPercent: number;
  interestRate: number;
  years: number;
  fireInsurance: number;
  lifeInsurance: number;
}

const UF_VALUE = 39728;
const YEARS_OPTIONS = [10, 15, 20, 25, 30];

export default function MortgageCalculator() {
  const [state, setState] = useState<CalculatorState>({
    currency: 'UF',
    income: 2200000,
    propertyValue: 3000,
    downPaymentPercent: 20,
    interestRate: 4.13,
    years: 30,
    fireInsurance: 0.18,
    lifeInsurance: 0.79,
  });

  const updateField = useCallback(<K extends keyof CalculatorState>(
    key: K,
    value: CalculatorState[K]
  ) => {
    setState((prev) => ({ ...prev, [key]: value }));
  }, []);

  const adjustIncome = useCallback((delta: number) => {
    setState((prev) => ({ ...prev, income: Math.max(500000, prev.income + delta) }));
  }, []);

  const results = useMemo(() => {
    const monthlyRate = state.interestRate / 100 / 12;
    const numPayments = state.years * 12;
    const downPayment = state.propertyValue * (state.downPaymentPercent / 100);
    const loanAmount = state.propertyValue - downPayment;

    let monthlyPayment = 0;
    if (monthlyRate > 0) {
      monthlyPayment =
        (loanAmount * monthlyRate * Math.pow(1 + monthlyRate, numPayments)) /
        (Math.pow(1 + monthlyRate, numPayments) - 1);
    } else {
      monthlyPayment = loanAmount / numPayments;
    }

    const totalMonthly = monthlyPayment + state.fireInsurance + state.lifeInsurance;
    const incomeUF = state.income / UF_VALUE;
    const debtRatio = incomeUF > 0 ? (totalMonthly / incomeUF) * 100 : 0;

    let capacityText = '';
    let capacityColor = '';
    if (debtRatio <= 25) {
      capacityText = 'Excelente capacidad de pago';
      capacityColor = 'text-green-400';
    } else if (debtRatio <= 35) {
      capacityText = 'Buena capacidad de pago';
      capacityColor = 'text-amber-400';
    } else if (debtRatio <= 45) {
      capacityText = 'Capacidad de pago ajustada';
      capacityColor = 'text-orange-400';
    } else {
      capacityText = 'Capacidad de pago limitada';
      capacityColor = 'text-red-400';
    }

    const mortgagePercent = monthlyPayment / totalMonthly;
    const insurancePercent = (state.fireInsurance + state.lifeInsurance) / totalMonthly;

    return {
      monthlyPayment: Math.round(monthlyPayment * 100) / 100,
      insuranceTotal: Math.round((state.fireInsurance + state.lifeInsurance) * 100) / 100,
      totalMonthly: Math.round(totalMonthly * 100) / 100,
      debtRatio: Math.round(debtRatio * 10) / 10,
      capacityText,
      capacityColor,
      mortgagePercent: isNaN(mortgagePercent) ? 0.8 : mortgagePercent,
      insurancePercent: isNaN(insurancePercent) ? 0.2 : insurancePercent,
    };
  }, [state]);

  const donutCircumference = 2 * Math.PI * 80;
  const mortgageOffset = donutCircumference * (1 - results.mortgagePercent);
  const insuranceOffset = donutCircumference * results.mortgagePercent;

  return (
    <section id="calculadora" className="py-20 lg:py-28 bg-[#0A0A0A]">
      <div className="max-w-[1000px] mx-auto px-4 sm:px-6 lg:px-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <Calculator className="w-8 h-8 text-[#C9A962] mx-auto mb-4" strokeWidth={1.5} />
          <h2 className="font-display text-3xl lg:text-4xl text-white">Calcula tu Crédito</h2>
          <p className="mt-3 text-[#B0B0B0] text-base">
            Simula tu crédito hipotecario y conoce las cuotas mensuales
          </p>
        </motion.div>

        {/* Calculator Card */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="rounded-2xl p-6 sm:p-8 lg:p-10"
          style={{ background: 'linear-gradient(135deg, #C9A962 0%, #9A7B3D 100%)' }}
        >
          <h3 className="text-center text-white text-xl font-semibold mb-6">
            Calculadora Hipotecaria
          </h3>

          {/* CLP/UF Toggle */}
          <div className="flex justify-center mb-6">
            <div className="inline-flex bg-black/20 rounded-lg p-1">
              <button
                onClick={() => updateField('currency', 'CLP')}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${
                  state.currency === 'CLP'
                    ? 'bg-black/50 text-white'
                    : 'text-white/70 hover:text-white'
                }`}
              >
                CLP
              </button>
              <button
                onClick={() => updateField('currency', 'UF')}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${
                  state.currency === 'UF'
                    ? 'bg-black/50 text-white'
                    : 'text-white/70 hover:text-white'
                }`}
              >
                UF
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-10">
            {/* Inputs */}
            <div className="space-y-5">
              {/* Income */}
              <div>
                <label className="block text-sm font-medium text-white/90 mb-2">
                  Renta Líquida Mensual ({state.currency})
                </label>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => adjustIncome(-100000)}
                    className="w-10 h-10 flex items-center justify-center rounded-lg bg-white/15 text-white hover:bg-white/25 transition-colors"
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <input
                    type="number"
                    value={state.income}
                    onChange={(e) => updateField('income', Number(e.target.value))}
                    className="flex-1 px-4 py-2.5 bg-white/15 border-0 rounded-lg text-white text-sm focus:outline-none focus:ring-2 focus:ring-white/30"
                  />
                  <button
                    onClick={() => adjustIncome(100000)}
                    className="w-10 h-10 flex items-center justify-center rounded-lg bg-white/15 text-white hover:bg-white/25 transition-colors"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Property Value */}
              <div>
                <label className="block text-sm font-medium text-white/90 mb-2">
                  Valor Total de la Propiedad (UF)
                </label>
                <input
                  type="number"
                  value={state.propertyValue}
                  onChange={(e) => updateField('propertyValue', Number(e.target.value))}
                  className="w-full px-4 py-2.5 bg-white/15 border-0 rounded-lg text-white text-sm focus:outline-none focus:ring-2 focus:ring-white/30"
                />
              </div>

              {/* Down Payment */}
              <div>
                <label className="block text-sm font-medium text-white/90 mb-2">
                  Pie (%)
                </label>
                <input
                  type="number"
                  value={state.downPaymentPercent}
                  onChange={(e) => updateField('downPaymentPercent', Number(e.target.value))}
                  className="w-full px-4 py-2.5 bg-white/15 border-0 rounded-lg text-white text-sm focus:outline-none focus:ring-2 focus:ring-white/30"
                />
              </div>

              {/* Interest Rate */}
              <div>
                <label className="block text-sm font-medium text-white/90 mb-2">
                  Tasa de Interés Anual (BCCh: 4.13%)
                </label>
                <input
                  type="number"
                  step="0.01"
                  value={state.interestRate}
                  onChange={(e) => updateField('interestRate', Number(e.target.value))}
                  className="w-full px-4 py-2.5 bg-white/15 border-0 rounded-lg text-white text-sm focus:outline-none focus:ring-2 focus:ring-white/30"
                />
              </div>

              {/* Years */}
              <div>
                <label className="block text-sm font-medium text-white/90 mb-2">
                  Plazo del Crédito (Años)
                </label>
                <select
                  value={state.years}
                  onChange={(e) => updateField('years', Number(e.target.value))}
                  className="w-full px-4 py-2.5 bg-white/15 border-0 rounded-lg text-white text-sm focus:outline-none focus:ring-2 focus:ring-white/30 appearance-none"
                >
                  {YEARS_OPTIONS.map((y) => (
                    <option key={y} value={y} className="bg-[#1A1A1A]">
                      {y} años
                    </option>
                  ))}
                </select>
              </div>

              {/* Fire Insurance */}
              <div>
                <label className="block text-sm font-medium text-white/90 mb-2">
                  Seguro de Incendio y Sismo (UF)
                </label>
                <input
                  type="number"
                  step="0.01"
                  value={state.fireInsurance}
                  onChange={(e) => updateField('fireInsurance', Number(e.target.value))}
                  className="w-full px-4 py-2.5 bg-white/15 border-0 rounded-lg text-white text-sm focus:outline-none focus:ring-2 focus:ring-white/30"
                />
              </div>

              {/* Life Insurance */}
              <div>
                <label className="block text-sm font-medium text-white/90 mb-2">
                  Seguro de Desgravamen (UF)
                </label>
                <input
                  type="number"
                  step="0.01"
                  value={state.lifeInsurance}
                  onChange={(e) => updateField('lifeInsurance', Number(e.target.value))}
                  className="w-full px-4 py-2.5 bg-white/15 border-0 rounded-lg text-white text-sm focus:outline-none focus:ring-2 focus:ring-white/30"
                />
              </div>
            </div>

            {/* Results */}
            <div className="flex flex-col items-center justify-center gap-6">
              {/* Donut Chart */}
              <div className="relative w-48 h-48">
                <svg viewBox="0 0 200 200" className="w-full h-full -rotate-90">
                  {/* Background circle */}
                  <circle
                    cx="100"
                    cy="100"
                    r="80"
                    fill="none"
                    stroke="rgba(255,255,255,0.15)"
                    strokeWidth="16"
                  />
                  {/* Insurance arc */}
                  <circle
                    cx="100"
                    cy="100"
                    r="80"
                    fill="none"
                    stroke="rgba(255,255,255,0.5)"
                    strokeWidth="16"
                    strokeDasharray={`${insuranceOffset} ${donutCircumference}`}
                    strokeDashoffset={-mortgageOffset}
                    strokeLinecap="round"
                  />
                  {/* Mortgage arc */}
                  <circle
                    cx="100"
                    cy="100"
                    r="80"
                    fill="none"
                    stroke="#E8D5A3"
                    strokeWidth="16"
                    strokeDasharray={`${donutCircumference - mortgageOffset} ${donutCircumference}`}
                    strokeDashoffset={0}
                    strokeLinecap="round"
                  />
                </svg>
              </div>

              {/* Results Card */}
              <div className="w-full bg-black/40 rounded-xl p-6 space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-white/80">Pago Hipoteca:</span>
                  <span className="text-lg font-semibold text-white">
                    {results.monthlyPayment.toLocaleString('es-CL', { minimumFractionDigits: 2 })} UF
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-white/80">Seguros:</span>
                  <span className="text-lg font-semibold text-white">
                    {results.insuranceTotal.toLocaleString('es-CL', { minimumFractionDigits: 2 })} UF
                  </span>
                </div>
                <div className="h-px bg-white/20" />
                <div className="flex justify-between items-center">
                  <span className="text-sm text-white/80">Pago Mensual Total:</span>
                  <span className="text-xl font-bold text-white">
                    {results.totalMonthly.toLocaleString('es-CL', { minimumFractionDigits: 2 })} UF
                  </span>
                </div>
                <div className="h-px bg-white/20" />
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm text-white/80">Porcentaje de Endeudamiento:</span>
                    <span className={`text-lg font-bold ${results.capacityColor}`}>
                      {results.debtRatio}%
                    </span>
                  </div>
                  <div className="w-full h-2 bg-white/20 rounded-full overflow-hidden">
                    <motion.div
                      className="h-full bg-[#C9A962] rounded-full"
                      initial={{ width: 0 }}
                      animate={{ width: `${Math.min(results.debtRatio, 100)}%` }}
                      transition={{ duration: 0.8, ease: 'easeOut' }}
                    />
                  </div>
                  <p className={`mt-2 text-sm font-medium ${results.capacityColor}`}>
                    {results.capacityText}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Disclaimer */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-8 bg-[#111111] rounded-lg p-6"
        >
          <h4 className="text-red-500 font-semibold mb-3">Importante</h4>
          <p className="text-sm text-[#B0B0B0] leading-relaxed">
            Esta simulación se entrega a modo informativo, por lo que las tasas y plazos son referenciales y no constituyen un análisis crediticio del solicitante.
          </p>
          <p className="mt-2 text-sm text-[#B0B0B0] leading-relaxed">
            Recuerde que cada institución evalúa el riesgo crediticio de sus clientes antes de brindar un crédito. Por esto, debe consultar en cada institución para conocer las condiciones y características específicas de sus productos.
          </p>
          <p className="mt-2 text-sm text-[#B0B0B0] leading-relaxed">
            Esta simulación contempla la modalidad de crédito hipotecario más utilizada (mutuo hipotecario no endosables en UF y a tasa fija) para asegurar su comparabilidad.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
