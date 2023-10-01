import { useState, useEffect } from 'react'

function useIsMobile () {
  // State to store whether the device is mobile
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    // Function to check if the device is mobile
    function checkIsMobile () {
      setIsMobile(window.innerWidth < 768) // You can adjust the breakpoint (768) as needed
    }

    // Add an event listener to recheck when the window is resized
    window.addEventListener('resize', checkIsMobile)

    // Initial check when the component mounts
    checkIsMobile()

    // Remove the event listener when the component unmounts
    return () => {
      window.removeEventListener('resize', checkIsMobile)
    }
  }, [])

  return isMobile
}

export default useIsMobile
