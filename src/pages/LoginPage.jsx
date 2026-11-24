import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

function LoginPage() {
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  function handleSubmit(e) {
    e.preventDefault()

    if (email.trim() === '' || password === '') {
      setError('이메일과 비밀번호를 입력하세요')
      return
    }
    if (password.length < 6) {
      setError('비밀번호는 6자 이상이어야 해요')
      return
    }

    setError('')
    navigate('/')
  }

  return (
    <div>
      <h1>로그인</h1>

      <form onSubmit={handleSubmit}>
        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="name@company.com"
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="비밀번호 (6자 이상)"
        />
        <button type="submit">로그인</button>
      </form>

      {error && <p style={{ color: 'tomato' }}>{error}</p>}
    </div>
  )
}

export default LoginPage