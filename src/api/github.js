import axios from 'axios'

export async function searchUsers(keyword) {
  const res = await axios.get('https://api.github.com/search/users', {
    params: { q: keyword, per_page: 10 },
  })
  return res.data.items
}
