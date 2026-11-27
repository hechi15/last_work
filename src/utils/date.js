// 날짜를 '2026-11-25' 같은 글자로 바꿔 주는 함수
export function toDateText(date) {
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')
  return `${year}-${month}-${day}`
}