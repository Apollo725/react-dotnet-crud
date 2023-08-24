// Externals
import { useState } from 'react'

// Components
import { List, Input, Loader } from './components'

// Styles
import './App.scss'

// Constants
import { ERROR_RESPONSE, SUB_KEY, SUCCESS_RESPONSE, API_BASE } from './constants'

function App() {
  const [list, setList] = useState(null)
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(false)

  const onSendRequest = async (searchQuery) => {
    setLoading(true)
    try {
      const response = await fetch(`${API_BASE}/search?q=${searchQuery}`, {
        headers: {
          'Ocp-Apim-Subscription-Key': SUB_KEY
        }
      })
      const result = await response.json()
      if (result) {
        if (result._type === SUCCESS_RESPONSE && result.webPages && result.webPages.value) {
          setList(result.webPages.value)
        }
  
        if (result._type === ERROR_RESPONSE) {
          setError(result.errors[0]?.message)
        }
      } else {
        setError('Something went wrong')
      }
      setLoading(false)
    } catch (err) {
      setError('Something went wrong')
      setLoading(false)
    }
  }

  return (
    <div className="app">
      <h3 className="app-header">
        Bing Search
      </h3>

      <Input sendRequest={onSendRequest} className="app-input" />
      {loading && <Loader dataTestId="loader" />}
      {!loading && !error && list && (
        <List
          className="app-list"
          list={list}
        />
      )}
      {!loading && error && (
        <p className="error" role='alert'>{error}</p>
      )}
    </div>
  )
}

export default App
