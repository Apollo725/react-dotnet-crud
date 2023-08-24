// Externals
import { useState, useMemo } from 'react'
import debounce from 'debounce'

// Styles
import './Input.scss'

// Constants
const DEBOUNCE_TIME = 500;

const Input = ({ sendRequest, className, placeholder }) => {
  const [searchQuery, setSearchQuery] = useState('')

  // Debounce the sendRequest function to avoid making too many API requests
  const debouncedSendRequest = useMemo(() => {
    return debounce(sendRequest, DEBOUNCE_TIME)
  }, [sendRequest])

  const handleChange = (event) => {
    const { value } = event.target
    setSearchQuery(value)

    debouncedSendRequest(value)
  }

  return (
    <input type="text" value={searchQuery} onChange={handleChange} className={className} placeholder={placeholder || 'Search...'}/>
  )
}

export default Input
