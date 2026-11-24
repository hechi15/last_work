import { useState } from 'react'

const initialEntries = [
  { id: 1, type: 'income', amount: 200000, category: '용돈', memo: '12월 용돈' },
  { id: 2, type: 'expense', amount: 12000, category: '식비', memo: '점심' },
  { id: 3, type: 'expense', amount: 4500, category: '식비', memo: '카페' },
]

function MainPage() {
  const [entries, setEntries] = useState(initialEntries)
  const [type, setType] = useState('expense')
  const [amount, setAmount] = useState('')
  const [category, setCategory] = useState('식비')
  const [memo, setMemo] = useState('')
  const [error, setError] = useState('')

  function handleSubmit(e) {
    e.preventDefault()

    const value = Number(amount)
    if (amount.trim() === '' || Number.isNaN(value) || value <= 0) {
      setError('금액은 0보다 큰 숫자로 입력하세요')
      return
    }

    setError('')
    const newEntry = { id: Date.now(), type, amount: value, category, memo }
    setEntries([...entries, newEntry])
    setAmount('')
    setMemo('')
  }

  return (
    <div>
      <h1>나의 지출 노트</h1>

      <form onSubmit={handleSubmit}>
        <select value={type} onChange={(e) => setType(e.target.value)}>
          <option value="expense">지출</option>
          <option value="income">수입</option>
        </select>
        <input
          value={amount}
          onChange={(e) => {
            setAmount(e.target.value)
            setError('')
          }}
          placeholder="금액 (예: 12000)"
        />
        <select value={category} onChange={(e) => setCategory(e.target.value)}>
          <option>식비</option>
          <option>교통</option>
          <option>문화</option>
          <option>기타</option>
        </select>
        <input
          value={memo}
          onChange={(e) => setMemo(e.target.value)}
          placeholder="메모"
        />
        <button type="submit">등록</button>
      </form>

      {error && <p style={{ color: 'tomato' }}>{error}</p>}

      <ul>
        {entries.map((entry) => (
          <li key={entry.id}>
            [{entry.type === 'income' ? '수입' : '지출'}] {entry.category} - {entry.memo}: {entry.amount}원
          </li>
        ))}
      </ul>
    </div>
  )
}

export default MainPage