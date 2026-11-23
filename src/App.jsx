const entries = [
  { id: 1, type: 'income', amount: 200000, category: '용돈', memo: '12월 용돈' },
  { id: 2, type: 'expense', amount: 12000, category: '식비', memo: '점심' },
  { id: 3, type: 'expense', amount: 4500, category: '식비', memo: '카페' },
]

function App() {
  return (
    <div>
      <h1>나의 지출 노트</h1>
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

export default App