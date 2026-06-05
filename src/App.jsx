import { useEffect } from 'react'
import axios from 'axios'
import PubSub from 'pubsub-js'
import Search from './components/Search'
import List from './components/List'
import './App.css'

function App() {
  useEffect(() => {
    const token = PubSub.subscribe('SEARCH', async (_, keyword) => {
      PubSub.publish('SEARCH_RESULT', { users: [], loading: true, error: '' })
      try {
        const res = await axios.get('https://api.github.com/search/users', {
          params: { q: keyword, per_page: 10 },
        })
        PubSub.publish('SEARCH_RESULT', { users: res.data.items, loading: false, error: '' })
      } catch (err) {
        PubSub.publish('SEARCH_RESULT', { users: [], loading: false, error: '请求失败，请稍后重试' })
      }
    })
    return () => PubSub.unsubscribe(token)
  }, [])

  return (
    <div className="app">
      <h1>GitHub 用户搜索</h1>
      <Search />
      <List />
    </div>
  )
}

export default App
