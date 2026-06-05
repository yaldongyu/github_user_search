import { useState } from 'react'
import PubSub from 'pubsub-js'

export default function Search() {
  const [keyword, setKeyword] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!keyword.trim()) return
    PubSub.publish('SEARCH', keyword.trim())
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
