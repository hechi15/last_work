import { useState } from 'react'
import { toDateText } from '../utils/date'
import { calculateMonthlySummary, getBudgetStatus } from '../utils/summary'

// 샘플 내역: 오늘 날짜 3개 + 지난 달 날짜 1개
const today = new Date()
const lastMonthDay = new Date(today.getFullYear(), today.getMonth() - 1, 15)

const initialEntries = [
  { id: 1, type: 'income', amount: 200000, category: '용돈', memo: '이번 달 용돈', date: toDateText(today) },
  { id: 2, type: 'expense', amount: 12000, category: '식비', memo: '점심', date: toDateText(today) },
  { id: 3, type: 'expense', amount: 4500, category: '식비', memo: '카페', date: toDateText(today) },
  { id: 4, type: 'expense', amount: 30000, category: '문화', memo: '지난 달 영화와 책', date: toDateText(lastMonthDay) },
]

function MainPage() {
  const [entries, setEntries] = useState(initialEntries)
  const [type, setType] = useState('expense')
  const [amount, setAmount] = useState('')
  const [category, setCategory] = useState('식비')
  const [memo, setMemo] = useState('')
  const [error, setError] = useState('')

  // 예산: 아직 정하지 않았으면 null
  const [budget, setBudget] = useState(null)
  const [budgetInput, setBudgetInput] = useState('')
  const [budgetError, setBudgetError] = useState('')

  // 계산은 utils 파일의 함수에게 맡긴다
  const thisMonth = toDateText(new Date()).slice(0, 7)
  const { incomeTotal, expenseTotal, balance } = calculateMonthlySummary(entries, thisMonth)
  const budgetResult = getBudgetStatus(expenseTotal, budget)

  function handleSubmit(e) {
    e.preventDefault()
    const value = Number(amount)
    if (amount.trim() === '' || !Number.isFinite(value) || value <= 0) {
      setError('금액은 0보다 큰 숫자로 입력하세요')
      return
    }
    setError('')
    const newEntry = {
      id: Date.now(),
      type,
      amount: value,
      category,
      memo,
      date: toDateText(new Date()),
    }
    setEntries([...entries, newEntry])
    setAmount('')
    setMemo('')
  }

  function handleBudgetSubmit(e) {
    e.preventDefault()
    const value = Number(budgetInput)
    if (budgetInput.trim() === '' || !Number.isFinite(value) || value <= 0) {
      setBudgetError('예산은 0보다 큰 숫자로 입력하세요')
      return
    }
    setBudgetError('')
    setBudget(value)
    setBudgetInput('')
  }

  return (
    <div>
      <h1>나의 지출 노트</h1>

      <section>
        <h2>{thisMonth} 요약</h2>
        <p>수입 합계: {incomeTotal.toLocaleString()}원</p>
        <p>지출 합계: {expenseTotal.toLocaleString()}원</p>
        <p>잔액: {balance.toLocaleString()}원</p>
      </section>

      <section>
        <h2>이번 달 예산</h2>
        <form onSubmit={handleBudgetSubmit}>
          <input
            value={budgetInput}
            onChange={(e) => {
              setBudgetInput(e.target.value)
              setBudgetError('')
            }}
            placeholder="월 예산 (예: 300000)"
          />
          <button type="submit">예산 정하기</button>
        </form>
        {budgetError && <p style={{ color: 'tomato' }}>{budgetError}</p>}
        {budgetResult === null ? (
          <p>아직 예산을 정하지 않았어요</p>
        ) : (
          <>
            <p>
              예산: {budget.toLocaleString()}원 / 남은 예산: {(budget - expenseTotal).toLocaleString()}원
            </p>
            <p>
              상태: {budgetResult.status} (예산의 {budgetResult.usedPercent}% 사용)
            </p>
          </>
        )}
      </section>

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
        <input value={memo} onChange={(e) => setMemo(e.target.value)} placeholder="메모" />
        <button type="submit">등록</button>
      </form>
      {error && <p style={{ color: 'tomato' }}>{error}</p>}

      <ul>
        {entries.map((entry) => (
          <li key={entry.id}>
            {entry.date} [{entry.type === 'income' ? '수입' : '지출'}] {entry.category} - {entry.memo}: {entry.amount}원
          </li>
        ))}
      </ul>
    </div>
  )
}

export default MainPage