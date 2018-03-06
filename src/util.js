export default function getRandomIntInclusive(f, s) {
  const min = Math.ceil(f)
  const max = Math.floor(s)
  // eslint-disable-next-line
  return Math.floor(Math.random() * (max - min + 1)) + min
}
const series = []
for (let i = 0; i < 24; i += 1) {
  series[i] = getRandomIntInclusive(0, 3)
}
