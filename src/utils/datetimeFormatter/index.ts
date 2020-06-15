import dayjs from 'dayjs'
import LocalizedFormat from 'dayjs/plugin/localizedFormat'
import 'dayjs/locale/ko'

dayjs.extend(LocalizedFormat)
dayjs.locale('ko')

function formatDatetime(value: number) {
  return dayjs(value).format('LL A hh:mm:ss')
}

export { formatDatetime }
