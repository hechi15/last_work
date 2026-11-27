// 한 달치 내역으로 수입 합계, 지출 합계, 잔액을 계산한다
// entries: 내역 목록, monthText: '2026-11' 같은 달 글자
export function calculateMonthlySummary(entries, monthText) {
  const monthEntries = entries.filter((entry) => entry.date.slice(0, 7) === monthText)

  let incomeTotal = 0
  let expenseTotal = 0
  for (const entry of monthEntries) {
    if (entry.type === 'income') {
      incomeTotal += entry.amount
    } else {
      expenseTotal += entry.amount
    }
  }

  return { incomeTotal, expenseTotal, balance: incomeTotal - expenseTotal }
}

// 예산 대비 지출로 상태(정상/주의/초과)를 정한다. 예산을 정하지 않았으면 null
export function getBudgetStatus(expenseTotal, budget) {
  if (budget === null) {
    return null
  }

  const usedPercent = ((expenseTotal / budget) * 100).toFixed(1)

  let status
  if (expenseTotal > budget) {
    status = '초과'
  } else if (expenseTotal * 100 >= budget * 70) {
    status = '주의'
  } else {
    status = '정상'
  }

  return { status, usedPercent }
}