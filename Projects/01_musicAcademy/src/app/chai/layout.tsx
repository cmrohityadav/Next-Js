


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
    <h2>inner chai Nav bar</h2>
       {children}
    </>

    
  );
}
