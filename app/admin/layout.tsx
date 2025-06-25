'use client'

import { useEffect } from "react";
import "../globals.css";

export default function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  useEffect(() => {
    // Add admin class to body to hide main header/footer
    document.body.classList.add('admin-page');
    document.body.style.backgroundColor = '#f9fafb';
    
    return () => {
      // Clean up when leaving admin pages
      document.body.classList.remove('admin-page');
      document.body.style.backgroundColor = '';
    };
  }, []);

  return (
    <>
      <style dangerouslySetInnerHTML={{
        __html: `
          /* Hide main website header and footer in admin routes */
          body.admin-page header:not(.admin-header),
          body.admin-page footer {
            display: none !important;
          }
          
          /* Admin page styling */
          body.admin-page {
            background-color: #f9fafb !important;
            margin: 0 !important;
            padding: 0 !important;
          }
          
          .admin-container {
            min-height: 100vh;
            background-color: #f9fafb;
          }
          
          /* Admin specific styles */
          .admin-container .gradient-bg { 
            background: linear-gradient(135deg, #1e3a8a 0%, #3b82f6 100%); 
          }
          .admin-container .card-hover { 
            transition: all 0.3s ease; 
          }
          .admin-container .card-hover:hover { 
            transform: translateY(-8px); 
            box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25); 
          }
          .admin-container .text-gradient { 
            background: linear-gradient(135deg, #1e3a8a, #3b82f6); 
            -webkit-background-clip: text; 
            -webkit-text-fill-color: transparent; 
          }
        `
      }} />
      <div className="admin-container">
        {children}
      </div>
    </>
  );
} 