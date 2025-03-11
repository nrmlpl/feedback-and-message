export const metadata = {
  title: 'MystryText',
  description: 'World of Anonymous Conversation',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      {children}
    </>
  )
}
