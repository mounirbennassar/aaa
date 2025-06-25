import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../globals.css";
import { Providers } from "../providers";

const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Healthcare Accreditation Mastery Workshop - Event Details | AAA Academy",
  description: "Master the principles and practices of healthcare accreditation with industry experts. Comprehensive 3-day workshop covering quality management, survey preparation, and best practices.",
};

export default function DetailsLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link
          href="https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css"
          rel="stylesheet"
        />
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@6.4.0/css/all.min.css"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap"
          rel="stylesheet"
        />
        <style
          dangerouslySetInnerHTML={{
            __html: `
              body { 
                font-family: 'Inter', sans-serif; 
                scroll-behavior: smooth;
              }
              .gradient-bg { 
                background: linear-gradient(135deg, #1e3a8a 0%, #3730a3 100%); 
                position: relative;
              }
              .gradient-bg::before {
                content: '';
                position: absolute;
                top: 0;
                left: 0;
                right: 0;
                bottom: 0;
                background: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><defs><pattern id="grid" width="10" height="10" patternUnits="userSpaceOnUse"><path d="M 10 0 L 0 0 0 10" fill="none" stroke="rgba(255,255,255,0.1)" stroke-width="1"/></pattern></defs><rect width="100" height="100" fill="url(%23grid)"/></svg>');
                opacity: 0.3;
              }
              .card-hover { 
                transition: all 0.3s ease; 
                cursor: pointer;
              }
              .card-hover:hover { 
                transform: translateY(-8px); 
                box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25); 
              }
              .text-primary { color: #1e3a8a; }
              .bg-primary { background-color: #1e3a8a; }
              .border-primary { border-color: #1e3a8a; }
              .text-accent { color: #dc2626; }
              .bg-accent { background-color: #dc2626; }
              .btn-primary { 
                background-color: #1e3a8a; 
                color: white; 
                transition: all 0.3s ease;
                border: none;
              }
              .btn-primary:hover { 
                background-color: #1e40af; 
                transform: translateY(-2px);
                box-shadow: 0 10px 20px rgba(30, 58, 138, 0.3);
              }
              .btn-accent { 
                background-color: #dc2626; 
                color: white; 
                transition: all 0.3s ease;
                border: none;
              }
              .btn-accent:hover { 
                background-color: #b91c1c; 
                transform: translateY(-2px);
                box-shadow: 0 10px 20px rgba(220, 38, 38, 0.3);
              }
              .agenda-timeline { position: relative; }
              .agenda-timeline::before { 
                content: ''; 
                position: absolute; 
                left: 15px; 
                top: 0; 
                bottom: 0; 
                width: 3px; 
                background: linear-gradient(to bottom, #1e3a8a, #dc2626);
                border-radius: 2px;
              }
              .agenda-item { 
                position: relative; 
                padding-left: 50px; 
                margin-bottom: 30px; 
                opacity: 0;
                animation: slideInLeft 0.6s ease forwards;
              }
              .agenda-item:nth-child(2) { animation-delay: 0.1s; }
              .agenda-item:nth-child(3) { animation-delay: 0.2s; }
              .agenda-item:nth-child(4) { animation-delay: 0.3s; }
              .agenda-item:nth-child(5) { animation-delay: 0.4s; }
              .agenda-item:nth-child(6) { animation-delay: 0.5s; }
              .agenda-dot { 
                position: absolute; 
                left: 6px; 
                top: 8px; 
                width: 20px; 
                height: 20px; 
                border-radius: 50%; 
                background-color: #dc2626; 
                border: 4px solid white; 
                box-shadow: 0 0 0 3px #1e3a8a;
                z-index: 2;
              }
              .price-card { 
                background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%); 
              }
              .early-bird { 
                background: linear-gradient(135deg, #fee2e2 0%, #fecaca 100%); 
                border: 2px solid #dc2626; 
                position: relative;
                overflow: hidden;
              }
              .early-bird::before {
                content: '';
                position: absolute;
                top: -50%;
                left: -50%;
                width: 200%;
                height: 200%;
                background: linear-gradient(45deg, transparent, rgba(255,255,255,0.1), transparent);
                transform: rotate(45deg);
                animation: shine 3s infinite;
              }
              @keyframes slideInLeft {
                from {
                  opacity: 0;
                  transform: translateX(-30px);
                }
                to {
                  opacity: 1;
                  transform: translateX(0);
                }
              }
              @keyframes shine {
                0% { transform: translateX(-100%) translateY(-100%) rotate(45deg); }
                50% { transform: translateX(100%) translateY(100%) rotate(45deg); }
                100% { transform: translateX(-100%) translateY(-100%) rotate(45deg); }
              }
              .fade-in {
                animation: fadeIn 0.8s ease-in-out;
              }
              @keyframes fadeIn {
                from { opacity: 0; transform: translateY(20px); }
                to { opacity: 1; transform: translateY(0); }
              }
              .pulse-accent {
                animation: pulseAccent 2s infinite;
              }
              @keyframes pulseAccent {
                0%, 100% { box-shadow: 0 0 0 0 rgba(220, 38, 38, 0.4); }
                50% { box-shadow: 0 0 0 10px rgba(220, 38, 38, 0); }
              }
            `
          }}
        />
      </head>
      <body className={`${inter.variable} antialiased`}>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
} 