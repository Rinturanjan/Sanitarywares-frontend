export default function Footer() {
  return (
    <footer className="mt-16 border-t bg-black z-10 ">
      <div className="mx-auto max-w-6xl p-6 text-sm text-gray-600">
        © {new Date().getFullYear()} SanitaryWares. All rights reserved.
      </div>
    </footer>
  );
}
