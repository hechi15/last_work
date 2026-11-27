import { describe, it, expect } from 'vitest'
import { calculateMonthlySummary, getBudgetStatus } from './summary'

describe('이번 달 합계 계산', () => {
  const entries = [
    { id: 1, type: 'income', amount: 200000, date: '2026-11-03' },
    { id: 2, type: 'expense', amount: 12000, date: '2026-11-10' },
    { id: 3, type: 'expense', amount: 4500, date: '2026-11-10' },
    { id: 4, type: 'expense', amount: 30000, date: '2026-10-15' },
  ]

  it('수입 합계, 지출 합계, 잔액을 계산한다 (지난 달 내역은 빼고)', () => {
    const result = calculateMonthlySummary(entries, '2026-11')
    expect(result).toEqual({ incomeTotal: 200000, expenseTotal: 16500, balance: 183500 })
  })

  it('이번 달 내역이 하나도 없으면 모두 0이다', () => {
    const lastMonthOnly = [{ id: 1, type: 'expense', amount: 30000, date: '2026-10-15' }]
    const result = calculateMonthlySummary(lastMonthOnly, '2026-11')
    expect(result).toEqual({ incomeTotal: 0, expenseTotal: 0, balance: 0 })
  })

  it('내역 목록이 비어 있어도 모두 0이다', () => {
    const result = calculateMonthlySummary([], '2026-11')
    expect(result).toEqual({ incomeTotal: 0, expenseTotal: 0, balance: 0 })
  })
})

describe('예산 상태 판단', () => {
  it('예산을 정하지 않았으면 null이다', () => {
    expect(getBudgetStatus(10000, null)).toBeNull()
  })

  it('70% 미만이면 정상이다', () => {
    expect(getBudgetStatus(16500, 300000)).toEqual({ status: '정상', usedPercent: '5.5' })
  })

  it('딱 70%이면 주의다', () => {
    expect(getBudgetStatus(210000, 300000)).toEqual({ status: '주의', usedPercent: '70.0' })
  })

  it('정확히 100%이면 초과가 아니라 주의다', () => {
    expect(getBudgetStatus(300000, 300000)).toEqual({ status: '주의', usedPercent: '100.0' })
  })

  it('예산을 넘으면 초과다', () => {
    expect(getBudgetStatus(301000, 300000)).toEqual({ status: '초과', usedPercent: '100.3' })
  })
})