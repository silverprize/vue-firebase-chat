import dayjs from 'dayjs'
import LocalizedFormat from 'dayjs/plugin/localizedFormat'
import 'dayjs/locale/ko'

dayjs.extend(LocalizedFormat)
dayjs.locale('ko')

function formatDatetime(value: string) {
  return dayjs(value).format('LL A hh:mm:ss')
}

export { formatDatetime }
