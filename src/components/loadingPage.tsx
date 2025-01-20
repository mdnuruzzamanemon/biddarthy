export default function Loading() {
  return (
    <div className="min-h-screen pt-16">
      <div className="fixed inset-0 bg-[#0A192F]/80 backdrop-blur-sm z-40 flex items-center justify-center">
        <div className="w-16 h-16 border-4 border-t-white border-r-white border-b-transparent border-l-transparent rounded-full animate-spin" />
        <span className="sr-only">Loading...</span>
      </div>
    </div>
  )
} 