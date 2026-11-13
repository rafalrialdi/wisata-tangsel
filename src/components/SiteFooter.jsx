export default function SiteFooter({ border = false }) {
  return (
    <footer
      className={`relative z-10 w-full px-margin-mobile md:px-margin pt-12 pb-12 ${
        border ? 'border-t border-outline-variant/30 bg-background-base' : 'bg-transparent'
      }`}
    >
      <div className="max-w-[1280px] mx-auto text-xs text-text-secondary/70">
        <p>© {new Date().getFullYear()} Jelajah Tangsel. Seluruh hak cipta dilindungi.</p>
      </div>
    </footer>
  )
}
