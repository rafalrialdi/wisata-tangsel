export default function SiteFooter({ border = false }) {
  return (
    <footer
      className={`relative z-10 w-full px-margin-mobile md:px-margin pt-12 pb-12 ${
        border ? 'border-t border-outline-variant/30 bg-background-base' : 'bg-transparent'
      }`}
    >
      <div className="max-w-[1280px] mx-auto flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 text-xs text-text-secondary/70">
        <p>© {new Date().getFullYear()} Jelajah Tangsel. Seluruh hak cipta dilindungi.</p>
        <p className="tracking-wide">rafika · azip · rafal</p>
      </div>
    </footer>
  )
}
