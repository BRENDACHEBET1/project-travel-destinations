function Footer() {
  return (
    <footer className="border-t border-white/15 bg-slate-950/90 py-6 text-center text-sm text-slate-400">
      <p>© {new Date().getFullYear()} World Explorer. All rights reserved.</p>
    </footer>
  );
}

export default Footer;