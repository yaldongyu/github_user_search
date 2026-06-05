import { useState } from 'react'
import axios from 'axios'
import Search from './components/Search'
import List from './components/List'
import './App.css'

function App() {
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleSearch = async (keyword) => {
    setLoading(true)
    setError('')
    try {
      const res = await axios.get('https://api.github.com/search/users', {
        params: { q: keyword, per_page: 10 },
      })
      setUsers(res.data.items)
    } catch (err) {
      setError('请求失败，请稍后重试')
      setUsers([])
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="app">
      <h1>GitHub 用户搜索</h1>
      <Search onSearch={handleSearch} />
      {loading && <p className="status-text">搜索中...</p>}
      {error && <p className="status-text error">{error}</p>}
      {!loading && !error && <List users={users} />}
    </div>
  )
}

export default App
