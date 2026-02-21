export default function MdxLayout({ children }: { children: React.ReactNode }) {
  // Create any shared layout or styles here
  return (
    <div className="prose lg:prose-lg xl:prose-xl dark:prose-invert self-center p-4">
      {children}
    </div>
  )
}
