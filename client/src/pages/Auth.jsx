import { useEffect, useState } from 'react'
import Signup from '../components/Signup'
import Login from '../components/Login'
import Navbar from '../components/Navbar'

function Auth() {
  const [active, setActive] = useState(0)
  // Parse user object from localStorage on load
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem('user')
    return savedUser ? savedUser : null
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
    <div className="pb-[1100px] md:pb-[600px] lg:pb-[500px]">
      {!user ? (
        active === 0 ? (
          <Signup setActive={setActive} setUser={setUser} />
        ) : (
          <Login setActive={setActive} setUser={setUser} />
        )
      ) : (
        <div className="pb-[500px] md:pb-[400px] lg:pb-[300px]">
          <Navbar />
          <div className='flex'>
            <h2>Welcome, {user.name}</h2>
            <button
              className='px-4 py-2 bg-orange-600 rounded-xl text-white absolute right-8'
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
