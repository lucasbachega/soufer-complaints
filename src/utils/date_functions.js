import { format, isThisYear, isToday, isYesterday } from 'date-fns';
import { ptBR } from 'date-fns/locale';

export const daysWeek = [
  'Domingo',
  'Segunda-feira',
  'Terça-feira',
  'Quarta-feira',
  'Quinta-feira',
  'Sexta-feira',
  'Sábado',
];
export const daysWeekInitials = [
  'dom',
  'seg',
  'ter',
  'qua',
  'qui',
  'sex',
  'sab',
];
export const monthsNameInitials = [
  'jan',
  'fev',
  'mar',
  'abr',
  'mai',
  'jun',
  'jul',
  'ago',
  'set',
  'out',
  'nov',
  'dez',
];
export const monthsName = [
  'Janeiro',
  'Fevereiro',
  'Março',
  'Abril',
  'Maio',
  'Junho',
  'Julho',
  'Agosto',
  'Setembro',
  'Outubro',
  'Novembro',
  'Dezembro',
];

export function isDateInCurrentYear(dateParameter) {
  var today = new Date();
  return today.getFullYear() === dateParameter.getFullYear();
}

export function isDateInThisWeek(date) {
  const todayObj = new Date();
  const todayDate = todayObj.getDate();
  const todayDay = todayObj.getDay();
  const firstDayOfWeek = new Date(todayObj.setDate(todayDate - todayDay));

  // get last date of week
  const lastDayOfWeek = new Date(firstDayOfWeek);
  lastDayOfWeek.setDate(lastDayOfWeek.getDate() + 6);
  // if date is equal or within the first and last dates of the week
  return date >= firstDayOfWeek && date <= lastDayOfWeek;
}
export function formatDate(d) {
  if (!d) return;
  const date = new Date(d);
  const formatString = isThisYear(date)
    ? "d 'de' MMM."
    : "d 'de' MMM. 'de' yyyy";
  return (
    format(date, formatString, {locale: ptBR}) +
    (isToday(date) ? ' (hoje)' : '')
  );
}

function padTo2Digits(num) {
  return num.toString().padStart(2, '0');
}

export function formatMoment(date) {
  let newDate = new Date(date);
  return (
    `${newDate.getDate()} de ${monthsNameInitials[newDate.getMonth()]}. ${
      !isDateInCurrentYear(newDate) ? ` de ${newDate.getFullYear()}` : ''
    }` +
    ' às ' +
    [padTo2Digits(newDate.getHours()), padTo2Digits(newDate.getMinutes())].join(
      ':',
    ) +
    `${isToday(newDate) ? ' (hoje)' : ''} ${
      isYesterday(newDate) ? ' (ontem)' : ''
    } `
  );
}

export function formatLongDate(date, isFull = true) {
  var newDate = new Date(date);
  // if (isYesterday(newDate) || isToday(newDate)) {
  //     return formatDate(newDate, true)
  // }
  if (isDateInThisWeek(newDate) || isDateInCurrentYear(newDate)) {
    return `${daysWeekInitials[newDate.getDay()]}, ${newDate.getDate()} de ${
      monthsNameInitials[newDate.getMonth()]
    }.`;
  }
  return `${daysWeekInitials[newDate.getDay()]}, ${newDate.getDate()} de ${
    monthsNameInitials[newDate.getMonth()]
  } de ${newDate.getFullYear()}.`;
}

export function checkDate(date = '') {
  if (!Boolean(date)) return false;
  let copyDate = new Date(date);
  return copyDate instanceof Date && !isNaN(copyDate);
}
