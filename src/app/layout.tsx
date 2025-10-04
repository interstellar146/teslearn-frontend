import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Sidebar } from "@/components/layout/Sidebar"; // 1. Import the Sidebar

const inter = Inter({ subsets: ["latin"] });

// 2. Update the metadata for our app
export const metadata: Metadata = {
  title: "Teslearn - Dashboard",
  description: "Your AI-powered personalized learning platform.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {/* 3. Create the main layout container */}
        <div className="flex h-screen bg-gray-50/50">
          {/* 4. Add the Sidebar component here */}
          <Sidebar />
          {/* 5. Render the current page next to the sidebar */}
          <main className="flex-1 overflow-y-auto">
            {children}
          </main>
        </div>
      </body>
    </html>
  );
}

