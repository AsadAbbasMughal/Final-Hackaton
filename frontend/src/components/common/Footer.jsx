export default function Footer() {
  return (
    <footer className="bg-gray-100 border-t ">
      <div className="max-w-7xl mx-auto px-6 py-6 text-center text-gray-600 text-sm">
        © {new Date().getFullYear()} MyApp. All rights reserved.
      </div>
    </footer>
  );
}
