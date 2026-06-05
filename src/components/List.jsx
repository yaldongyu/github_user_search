export default function List({ users }) {
  if (!users || users.length === 0) {
    return <p className="list-empty">暂无数据，请搜索</p>
  }

  return (
    <ul className="user-list">
      {users.map((user) => (
        <li key={user.id} className="user-card">
          <img
            className="user-avatar"
            src={user.avatar_url}
            alt={user.login}
            width={64}
            height={64}
          />
          <div className="user-info">
            <span className="user-login">{user.login}</span>
            <a
              className="user-link"
              href={user.html_url}
              target="_blank"
              rel="noopener noreferrer"
            >
              {user.html_url}
            </a>
          </div>
        </li>
      ))}
    </ul>
  )
}
