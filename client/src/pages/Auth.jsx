import { useEffect, useState } from 'react'
import Signup from '../components/Signup'
import Login from '../components/Login'
import Navbar from '../components/Navbar'

function Auth() {
  const [active, setActive] = useState(0)
  // Parse user object from localStorage on load
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem('user')
    return savedUser ? JSON.parse(savedUser) : null
  })



  // Sync user state to localStorage when it changes
  useEffect(() => {
    if (user) { 
      localStorage.setItem('user', JSON.stringify(user))
    } else {
      localStorage.removeItem('user')
      localStorage.removeItem('token') // Clear token too
    }
  }, [user])

  const handleLogout = () => {
    setUser(null)
    setActive(0)
  }

  return (
    <div className='min-h-full'>
      {!user ? (
        active === 0 ? (
          <Signup setActive={setActive} setUser={setUser} />
        ) : (
          <Login setActive={setActive} setUser={setUser} />
        )
      ) : (
        
        <div>
          <Navbar />
          <div className="flex items-center justify-between p-4 bg-gradient-to-r from-orange-500 to-orange-700 rounded-lg shadow-md mx-4 md:mx-12">
            <h2 className="text-white text-lg font-semibold tracking-wide">
              Welcome {user?.name || user}
            </h2>
            <button
              className="px-5 py-2 bg-white text-orange-700 font-medium rounded-full shadow-lg hover:bg-orange-100 hover:scale-105 transform transition duration-200"
              onClick={handleLogout}
            >
              Logout
            </button>
          </div>
         

        </div>
      )}
    </div>
  )
}

export default Auth
