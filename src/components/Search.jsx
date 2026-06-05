import { useState } from 'react'
import PubSub from 'pubsub-js'
import { searchUsers } from '../api/github'

export default function Search() {
  const [keyword, setKeyword] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!keyword.trim()) return
    PubSub.publish('SEARCH_RESULT', { users: [], loading: true, error: '' })
    try {
      const users = await searchUsers(keyword.trim())
      PubSub.publish('SEARCH_RESULT', { users, loading: false, error: '' })
    } catch (err) {
      PubSub.publish('SEARCH_RESULT', { users: [], loading: false, error: '请求失败，请稍后重试' })
    }
  }

  return (
    <form className="search-form" onSubmit={handleSubmit}>
      <input
        className="search-input"
        type="text"
        value={keyword}
        onChange={e => setKeyword(e.target.value)}
        placeholder="输入 GitHub 用户名搜索..."
      />
      <button className="search-btn" type="submit">
        搜索
      </button>
    </form>
  )
}
