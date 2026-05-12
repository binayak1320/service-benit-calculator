
"use client";
import { useEffect, useMemo, useState } from "react";

export default function Home() {
  const [totalSalary, setTotalSalary] = useState("");
  const [basicSalary, setBasicSalary] = useState("");
  const [serviceYear, setServiceYear] = useState("");

  // Auto calculate basic salary from total salary
  useEffect(() => {
    const total = Number(totalSalary);

    if (total > 0) {
      const basic = total * 0.6;
      setBasicSalary(String(basic.toFixed(2)));
    }
  }, [totalSalary]);


  const benefitDays = useMemo(() => {
    const year = Number(serviceYear);

    if (year >= 10) return 30;
    if (year > 3 && year < 10) return 15;
    if (year === 3) return 7;

    return 0;
  }, [serviceYear]);

  const totalBenefit = useMemo(() => {
    const basic = Number(basicSalary);
    const year = Number(serviceYear);

    if (!basic || !year || !benefitDays) return 0;

    return ((basic / 30) * benefitDays * year).toFixed(2);
  }, [basicSalary, serviceYear, benefitDays]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-950 flex items-center justify-center p-4">
      <div className="w-full max-w-xl backdrop-blur-xl bg-white/10 border border-white/20 rounded-3xl shadow-2xl p-8">
        <div className="text-center mb-8">
          <div className="titleWrapper">
            <div className="logo items-center justify-center flex">
              <img width={50} height={50} src="/MascoLogo.png" alt="logo" />
            </div>
            <h1  className="text-3xl font-bold text-white">
              Service Benefit Calculator
            </h1>
          </div>
          <p className="text-slate-300 mt-2">
            Calculate employee service benefits instantly
          </p>
        </div>
        <div className="space-y-4">
          <div>
            <label className="text-white text-sm mb-2 block">
              Monthly Gross Salary
            </label>

            <input
              type="number"
              placeholder="Enter total salary"
              value={totalSalary}
              onChange={(e) => setTotalSalary(e.target.value)}
              className="w-full h-14 rounded-2xl bg-white/10 border border-white/20 px-4 text-white outline-none focus:border-indigo-400"
            />

            <small className="text-slate-400 mt-1 block">
              Basic salary will be auto calculated as 60%
            </small>
          </div>

          {/* Basic Salary */}
          <div>
            <label className="text-white text-sm mb-2 block">
              Basic Salary
            </label>

            <input
              type="number"
              placeholder="Enter basic salary"
              value={basicSalary}
              onChange={(e) => setBasicSalary(e.target.value)}
              className="w-full h-14 rounded-2xl bg-white/10 border border-white/20 px-4 text-white outline-none focus:border-indigo-400"
            />
          </div>

          {/* Service Year */}
          <div>
            <label className="text-white text-sm mb-2 block">
              Service Year
            </label>

            <input
              type="number"
              placeholder="Enter service year"
              value={serviceYear}
              onChange={(e) => setServiceYear(e.target.value)}
              className="w-full h-14 rounded-2xl bg-white/10 border border-white/20 px-4 text-white outline-none focus:border-indigo-400"
            />
          </div>

          {/* Benefit Rule */}
          <div className="bg-indigo-500/10 border border-indigo-400/20 rounded-2xl p-5">

            <h2 className="text-white font-semibold mb-4">
              Benefit Rules
            </h2>

            <div className="grid grid-cols-3 gap-3">

              <div className="bg-white/10 rounded-xl p-3 text-center">
                <p className="text-slate-300 text-sm">Just 3 Years</p>
                <p className="text-white text-xl font-bold">7 Days</p>
              </div>

              <div className="bg-white/10 rounded-xl p-3 text-center">
                <p className="text-slate-300 text-sm">Above 3 & Below 10 Years</p>
                
                <p className="text-white text-xl font-bold">15 Days</p>
              </div>

              <div className="bg-white/10 rounded-xl p-3 text-center">
                <p className="text-slate-300 text-sm">10 Years and Above</p>
                <p className="text-white text-xl font-bold">30 Days</p>
              </div>

            </div>
          </div>

          {/* Result */}
          <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-3xl p-4 text-center shadow-xl">

            <p className="text-white/80 text-sm mb-2">
              Total Service Benefit
            </p>

            <h2 className="text-4xl font-bold text-white">
              ৳ {totalBenefit}
            </h2>

            <p className="text-white/70 mt-3">
              Benefit Days: {benefitDays}
            </p>

          </div>

          {/* Formula */}
          <div className="bg-black/20 rounded-2xl p-4 text-center">
            <p className="text-slate-300 text-sm">
              Formula
            </p>

            <p className="text-white mt-2">
              (Basic / 30) × Benefit Days × Service Year
            </p>
          </div>

        </div>

      </div>

    </div>
  );
}