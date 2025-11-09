import { useAuth } from '../context/AuthContext'

export default function Profile() {
  const { user } = useAuth()

  // Helper function to get initials from the user's name for the avatar
  const getInitials = (name) => {
    if (!name) return 'U' // Default 'U' for User
    
    const names = name.split(' ')
    if (names.length > 1) {
      // Use first letter of first name and first letter of last name
      return `${names[0][0]}${names[names.length - 1][0]}`.toUpperCase()
    }
    // Use first letter of the single name
    return names[0][0].toUpperCase()
  }

  const displayName = user?.name || 'User'
  const displayEmail = user?.email

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 font-sans p-4">
      {/* Changed to max-w-sm for a more compact card feel */}
      <div className="bg-white p-8 rounded-lg shadow-xl w-full max-w-sm">
        
        {/* --- Avatar & Header Section --- */}
        <div className="flex flex-col items-center mb-6">
          {/* Placeholder Avatar */}
          <div className="w-24 h-24 rounded-full bg-indigo-500 text-white flex items-center justify-center text-4xl font-bold mb-4">
            {getInitials(user?.name)}
          </div>
          
          {/* User's Name */}
          <h1 className="text-2xl font-bold text-gray-900">{displayName}</h1>
          
          {/* User's Email */}
          {displayEmail && (
            <p className="text-md text-gray-600 mt-1">{displayEmail}</p>
          )}
        </div>

        {/* --- Divider --- */}
        <hr className="my-6 border-gray-200" />

        {/* --- Details Section --- */}
        <div className="space-y-4">
          <h2 className="text-lg font-semibold text-gray-800 mb-2">Account Details</h2>
          
          {/* Re-displaying info in a list format for clarity */}
          <div>
            <label className="block text-xs font-medium text-gray-500">Name</label>
            <p className="text-md text-gray-800">{displayName}</p>
          </div>
          
          <div>
            <label className="block text-xs font-medium text-gray-500">Email</label>
            <p className="text-md text-gray-800">{displayEmail || 'No email provided'}</p>
          </div>
          
          {/* You could add more read-only fields here as needed */}
          {/* Example:
          <div>
            <label className="block text-xs font-medium text-gray-500">Member Since</label>
            <p className="text-md text-gray-800">January 2024</p>
          </div>
          */}
        </div>

        {/* --- Footer Note (Optional) --- */}
        <div className="text-center mt-8">
           <p className="text-xs text-gray-400">This is a read-only view of your profile.</p>
        </div>

      </div>
    </div>
  )
}