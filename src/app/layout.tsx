import type { Metadata } from "next";
import { Prompt } from "next/font/google"; 
import "./globals.css";

const prompt = Prompt({
  variable: "--font-prompt",
  subsets: ["thai", "latin"],
  weight: ["400", "500", "600", "700"], 
});

export const metadata: Metadata = {
  title: "คำนวณไทยช่วยไทยพลัส 60/40 — รัฐจ่ายเท่าไร เราจ่ายเท่าไร",
  description: "คำนวณโครงการไทยช่วยไทยพลัส 60/40 ง่ายๆ — กรอกมูลค่าสินค้าหรือยอดที่จ่ายเอง รู้ทันทีว่ารัฐช่วยเท่าไร เราจ่ายเท่าไร และต้องเติมเป๋าตังเท่าไร",
  keywords: ["ไทยช่วยไทย", "ไทยช่วยไทยพลัส", "60 40", "คำนวณ ไทยช่วยไทย", "รัฐช่วยจ่าย 60", "เป๋าตัง", "คำนวณเป๋าตัง", "ไทยช่วยไทย 2568"],
  openGraph: {
    title: "คำนวณไทยช่วยไทยพลัส 60/40",
    description: "รู้ทันทีว่ารัฐช่วยเท่าไร เราจ่ายเท่าไร ต้องเติมเป๋าตังเท่าไร",
    locale: "th_TH",
    type: "website",
  },
  alternates: {
    canonical: "https://thaihelpcalc.vercel.app",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="th" className={`${prompt.variable}`}>
      <body>{children}</body>
    </html>
  );
}