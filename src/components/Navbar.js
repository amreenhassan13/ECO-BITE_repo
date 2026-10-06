import Link from 'next/link';

export default function Navbar() {
  return (
    <nav className="bg-white shadow-sm border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          
          {/* Left Side: Logo */}
          <div className="flex items-center">
            <Link href="/" className="flex items-center gap-2">
              <span className="text-2xl font-black text-green-600 tracking-tight">Eco-Bite</span>
            </Link>
          </div>

          {/* Middle/Right Side: Links */}
          <div className="flex items-center space-x-6">
            
            <Link href="/food" className="text-gray-600 hover:text-green-600 font-medium text-sm transition">
              Find Food
            </Link>
            <Link href="/orders" className="text-gray-600 hover:text-green-600 font-medium text-sm transition">My Orders</Link>

            <div className="h-6 w-px bg-gray-300"></div> 
            
            <Link href="/add-food" className="text-gray-600 hover:text-green-600 font-medium text-sm transition">
              List Food
            </Link>

            <Link href="/admin" className="text-gray-600 hover:text-green-600 font-medium text-sm transition">
              Admin Panel
            </Link>

            {/* NEW APPLY LINK */}
            <Link href="/apply" className="text-gray-600 hover:text-green-600 font-medium text-sm transition">
              Partner with Us
            </Link>

            <Link href="/login" className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition font-medium text-sm shadow-sm ml-4">
              Login
            </Link>
          </div>

        </div>
      </div>
    </nav>
  );
}