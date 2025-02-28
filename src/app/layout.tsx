import { Metadata } from "next";
import "./globals.css";

import { AntdRegistry } from '@ant-design/nextjs-registry';



export const metadata: Metadata = {
  title: 'Restaurante gourmet',
  description: 'Restaurante gourmet',
  viewport: 'width=device-width, initial-scale=1',
  openGraph: {
    title: 'Restaurante gourmet',
    description: 'Restaurante gourmet',
    // images: ['https://danielabrao.com.br/danti-laptop.png']
  },
  robots: {
    index: true,
    follow: true,
    nocache: true,
    googleBot: {
      index: true,
      follow: true
    }
  }
}


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={'homepage-layout'}>
        <AntdRegistry>
          {children}
        </AntdRegistry>
      </body>
    </html>
  );
}
