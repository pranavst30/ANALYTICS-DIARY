import Header from "@/components/header";
import "./globals.css";
import { Inter } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";
import { Toaster } from "sonner";
import "react-quill-new/dist/quill.snow.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Analytics Diary",
  description: "",
};

export default function RootLayout({ children }) {
  return (
    <ClerkProvider
    // appearance={{
    //   baseTheme: shadesOfPurple,
    //   variables: {
    //     colorPrimary: "#3b82f6",
    //     colorBackground: "#1a202c",
    //     colorInputBackground: "#2D3748",
    //     colorInputText: "#F3F4F6",
    //   },
    //   elements: {
    //     formButtonPrimary: "bg-purple-600 hover:bg-purple-700 text-white",
    //     card: "bg-gray-800",
    //     headerTitle: "text-blue-400",
    //     headerSubtitle: "text-gray-400",
    //   },
    // }}
    >
<html lang="en">
  <body className={`${inter.className} bg-gradient-to-b from-blue-50 via-blue-100 to-blue-50`}>
    <Header />
    <main className="min-h-screen">{children}</main>
    <Toaster richColors />

    <footer className="bg-blue-300 py-12 bg-opacity-10">
      <div className="container mx-auto px-4 text-center text-gray-900">
        <p></p>
      </div>
    </footer>
  </body>
</html>


    </ClerkProvider>
  );
}
