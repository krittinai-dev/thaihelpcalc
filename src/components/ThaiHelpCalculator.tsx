"use client";

import { useState } from "react";


const GOV_MAX_DAY = 200;
const GOV_MAX_MONTH = 1000;


function fmt(n: number) {
  return n.toLocaleString("th-TH", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

export default function ThaiHelpCalculator() {
  const [mode, setMode] = useState<"self" | "val">("val");
  const [amount, setAmount] = useState("");
  const [wallet, setWallet] = useState("");
  const [showMore, setShowMore] = useState(false);


  const n = parseFloat(amount);
  let govPay = 0, selfPay = 0, totalVal = 0;
  if (!isNaN(n) && n > 0) {
    if (mode === "self") {
      selfPay = n;
      govPay = n * 1.5;
      totalVal = n + govPay;
    } else {
      totalVal = n;
      selfPay = n * 0.4;
      govPay = n * 0.6;
    }
  }

  const hasAmount = govPay > 0;
  const overDayCap = hasAmount && govPay > GOV_MAX_DAY;
  const overMonthCap = hasAmount && govPay > GOV_MAX_MONTH;

  const walletNum = parseFloat(wallet);
  const hasWallet = !isNaN(walletNum) && wallet !== "";
  const needTopup = hasWallet ? selfPay - walletNum : null;

  return (
    <div className="max-w-[500px] mx-auto px-4 py-6 pb-20">
      <div className="text-center mb-6">
        <div
          className="h-1.5 w-24 mx-auto mb-4 rounded-full"
          style={{ background: "linear-gradient(90deg, #a3192e 33%, #fff 33% 66%, #1b3a7a 66%)" }}
        />
        <h1 className="font-mitr text-3xl" style={{ color: "#1b4d8f" }}>
          คำนวณ <span style={{ color: "#c0392b" }}>ไทยช่วยไทยพลัส</span>
        </h1>
        <p className="text-sm mt-1" style={{ color: "#5a6b85" }}>รัฐช่วย 60% เราจ่าย 40%</p>
      </div>

      <div className="bg-white rounded-3xl p-5 mb-4 border" style={{ borderColor: "#d9e2ef" }}>

        <div className="flex gap-2 rounded-2xl p-1.5 mb-4" style={{ background: "#f4f7fb" }}>
          <button
            onClick={() => { setMode("val"); setAmount(""); }}
            className="flex-1 py-2.5 rounded-xl text-sm font-semibold cursor-pointer transition-all"
            style={mode === "val"
              ? { background: "#fff", color: "#1b4d8f", boxShadow: "0 2px 8px #1b4d8f20" }
              : { background: "transparent", color: "#6b7a93" }}
          >
            🛒 ใส่มูลค่าสินค้า
          </button>
          <button
            onClick={() => { setMode("self"); setAmount(""); }}
            className="flex-1 py-2.5 rounded-xl text-sm font-semibold cursor-pointer transition-all"
            style={mode === "self"
              ? { background: "#fff", color: "#1b4d8f", boxShadow: "0 2px 8px #1b4d8f20" }
              : { background: "transparent", color: "#6b7a93" }}
          >
            💸 ใส่ยอดที่จ่ายเอง
          </button>
        </div>

        <label className="block text-sm font-semibold mb-2" style={{ color: "#41506b" }}>
          {mode === "val" ? "มูลค่าสินค้าที่อยากได้" : "จำนวนเงินที่อยากจ่ายเอง"}
        </label>
        <div className="relative">
          <input
            type="number"
            inputMode="decimal"
            placeholder="0"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="font-mitr w-full text-4xl text-center py-4 pr-16 pl-4 rounded-2xl border-2 outline-none transition-all"
            style={{
              borderColor: amount ? "#1b4d8f" : "#d9e2ef",
              boxShadow: amount ? "0 0 0 4px #1b4d8f18" : "none",
              color: "#15233b",
            }}
          />
          <span className="absolute right-4 top-1/2 -translate-y-1/2 font-semibold text-sm" style={{ color: "#9aa7bd" }}>
            บาท
          </span>
        </div>

        <div className="flex flex-wrap gap-2 mt-3">
          {(mode === "val" ? [50,70, 100, 150,200,250,333] : [20, 40, 60, 80, 100, 133]).map((v) => (
            <button
              key={v}
              onClick={() => setAmount(String(v))}
              className="border rounded-full px-3.5 py-1.5 text-sm cursor-pointer transition-colors"
              style={{
                borderColor: "#d9e2ef",
                background: parseFloat(amount) === v ? "#e8f1fc" : "#fff",
                color: "#1b4d8f",
              }}
            >
              {v} บาท
            </button>
          ))}
        </div>

        {overMonthCap && (
          <div className="mt-3 rounded-2xl px-4 py-3 text-sm" style={{ background: "#fde8e8", border: "1px solid #f5a0a0", color: "#8b1a1a" }}>
            🚫 รัฐช่วยสูงสุด <strong>1,000 บาท/เดือน</strong> ยอดคุ้มสุดต่อเดือน คือซื้อ <strong>1,666.67 บาท</strong> จ่ายเอง <strong>666.67 บาท</strong>
          </div>
        )}

        {overDayCap && !overMonthCap && (
          <div className="mt-3 rounded-2xl px-4 py-3 text-sm" style={{ background: "#fff7e6", border: "1px solid #ffe0a3", color: "#9a6b00" }}>
            ⚠️ รัฐช่วยสูงสุด <strong>200 บาท/วัน</strong> ยอดคุ้มสุดต่อวัน คือซื้อ <strong>333.33 บาท</strong> จ่ายเอง <strong>133.33 บาท</strong>
          </div>
        )}
      </div>

      <div className="bg-white rounded-3xl p-5 mb-4 border" style={{ borderColor: "#d9e2ef" }}>
        <div className="flex flex-col gap-3">

          <div className="flex items-center justify-between rounded-2xl px-4 py-3 border" style={{ background: "#e8f1fc", borderColor: "#c2dbf5" }}>
            <span className="font-semibold text-sm" style={{ color: "#1b4d8f" }}>รัฐช่วยจ่าย 60%</span>
            <span className="font-mitr text-2xl" style={{ color: "#1b4d8f" }}>
              {fmt(govPay)} <small className="text-sm opacity-70">บาท</small>
            </span>
          </div>

          <div className="flex items-center justify-between rounded-2xl px-4 py-3 border" style={{ background: "#fdecea", borderColor: "#f3c9c3" }}>
            <span className="font-semibold text-sm" style={{ color: "#c0392b" }}>เราจ่ายเอง 40%</span>
            <span className="font-mitr text-2xl" style={{ color: "#c0392b" }}>
              {fmt(selfPay)} <small className="text-sm opacity-70">บาท</small>
            </span>
          </div>

          <div className="flex items-center justify-between rounded-2xl px-4 py-3 border" style={{ background: "#e7f6ee", borderColor: "#bfe6cf" }}>
            <span className="font-semibold text-sm" style={{ color: "#1e7d4f" }}>มูลค่าสินค้าที่ซื้อได้</span>
            <span className="font-mitr text-2xl" style={{ color: "#1e7d4f" }}>
              {fmt(totalVal)} <small className="text-sm opacity-70">บาท</small>
            </span>
          </div>

        </div>
      </div>

      <div className="bg-white rounded-3xl p-5 mb-4 border" style={{ borderColor: "#d9e2ef" }}>

        <div className="rounded-2xl p-5 text-center text-white mb-4"
          style={{ background: "linear-gradient(135deg, #c0392b, #e05545)" }}>
          <p className="text-sm font-semibold opacity-90">ต้องมีในเป๋าตัง</p>
          <p className="font-mitr text-4xl my-1">
            {fmt(selfPay)} <small className="text-base opacity-80">บาท</small>
          </p>
          <p className="text-xs opacity-75">ส่วน 40% ที่เราจ่ายเอง</p>
        </div>

        <label className="block text-sm font-semibold mb-2" style={{ color: "#41506b" }}>
          ตอนนี้มีในเป๋าตังเท่าไร? <span className="font-normal" style={{ color: "#9aa7bd" }}>(ไม่บังคับ)</span>
        </label>
        <div className="relative">
          <input
            type="number"
            inputMode="decimal"
            placeholder="0"
            value={wallet}
            onChange={(e) => setWallet(e.target.value)}
            className="font-mitr w-full text-4xl text-center py-4 pr-16 pl-4 rounded-2xl border-2 outline-none transition-all"
            style={{
              borderColor: wallet ? "#c0392b" : "#d9e2ef",
              boxShadow: wallet ? "0 0 0 4px #c0392b18" : "none",
              color: "#15233b",
            }}
          />
          <span className="absolute right-4 top-1/2 -translate-y-1/2 font-semibold text-sm" style={{ color: "#9aa7bd" }}>
            บาท
          </span>
        </div>

        {hasAmount && hasWallet && needTopup !== null && (
          <div className="mt-3 rounded-2xl px-4 py-3 text-sm"
            style={
              needTopup > 0.01
                ? { background: "#fff7e6", border: "1px solid #ffe0a3", color: "#8a5d00" }
                : { background: "#e7f6ee", border: "1px solid #bfe6cf", color: "#1e7d4f" }
            }
          >
            {needTopup > 0.01
              ? <>ต้องเติมอีก <strong>{fmt(needTopup)}</strong> บาท</>
              : <>✅ เงินพอแล้ว ! {Math.abs(needTopup) > 0.01 && <>เหลือ <strong>{fmt(Math.abs(needTopup))}</strong> บาท</>}</>
            }
          </div>
        )}
      </div>

      <button
        onClick={() => setShowMore(!showMore)}
        className="w-full py-3 rounded-2xl text-sm font-semibold cursor-pointer mb-3 border transition-colors"
        style={{
          background: showMore ? "#e8f1fc" : "#fff",
          borderColor: "#d9e2ef",
          color: "#1b4d8f",
        }}
      >
        {showMore ? "▲ ซ่อน" : "▼ ดูเพิ่มเติม"} สูตรคุ้มสุด
      </button>

      {showMore && (
        <div className="flex flex-col gap-4">

          <div className="rounded-3xl p-5 text-white"
            style={{ background: "linear-gradient(135deg, #1b4d8f, #2f6fc0)" }}>
            <h2 className="font-mitr text-lg mb-3">สูตรคุ้มสุด</h2>

            <p className="text-xs opacity-60 mb-1 font-semibold">รายวัน</p>
            <div className="flex justify-between py-1.5 text-sm border-b border-white/20">
              <span>ซื้อของรวม</span><span className="font-mitr">333.33 บาท</span>
            </div>
            <div className="flex justify-between py-1.5 text-sm border-b border-white/20">
              <span>รัฐช่วยจ่าย</span><span className="font-mitr">200.00 บาท</span>
            </div>
            <div className="flex justify-between py-1.5 text-sm font-bold">
              <span>เราเติมเอง</span><span className="font-mitr">133.33 บาท</span>
            </div>

            <div className="my-3 border-t border-white/20" />

            <p className="text-xs opacity-60 mb-1 font-semibold">รายเดือน</p>
            <div className="flex justify-between py-1.5 text-sm border-b border-white/20">
              <span>ซื้อของรวม</span><span className="font-mitr">1,666.67 บาท</span>
            </div>
            <div className="flex justify-between py-1.5 text-sm border-b border-white/20">
              <span>รัฐช่วยจ่าย</span><span className="font-mitr">1,000.00 บาท</span>
            </div>
            <div className="flex justify-between py-1.5 text-sm font-bold">
              <span>เราเติมเอง</span><span className="font-mitr">666.67 บาท</span>
            </div>

            <div className="mt-3 rounded-xl px-3 py-2.5 text-xs leading-5"
              style={{ background: "rgba(255,255,255,0.12)" }}>
              - ยอดไม่สะสมข้ามเดือน ต้องใช้ให้หมดในเดือนนั้น<br />
              - ใช้จ่ายผ่าน <strong>เป๋าตัง</strong> ต้องเปิด G Wallet ก่อน
            </div>
          </div>

        </div>
      )}

      <p className="text-center text-xs mt-6" style={{ color: "#90a0ba" }}>
        เครื่องคำนวณช่วยประเมินเบื้องต้น อัตราจริงอ้างอิงตามเงื่อนไขโครงการ
      </p>
    </div>
  );
}
