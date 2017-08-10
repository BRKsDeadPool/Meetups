import moment from 'moment'
import 'moment/locale/pt-br'

export default (value) => {
  const date = moment(value)

  return date.format('D [de] MMMM [de] YYYY[, as] HH [horas] [e] mm [minutos]')
}

/*
export default (value) => {
  const date = new Date(value)

  return date.toLocaleString(['pt-BR'], {
    month: 'short',
    day: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  })
}
*/
