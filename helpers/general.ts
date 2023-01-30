import { Moment } from 'moment'
import moment = require('moment')

type DateVacaciones = {
  fecha_inicio: Moment
  fecha_fin: Moment
  sueldoVacaciones: number
}
type Dateprestaciones = {
  preaviso: number
  regalia: number
  cesantia: number
  totalPrestaciones: number
}

export function deleteKeys<T, K extends keyof T>(
  array: T[],
  keys: string[]
): any[] {
  array?.forEach((item) => {
    keys?.forEach((key) => {
      delete item[key]
    })
  })
  return array
}

const calculateMonthsMoment = (date1: Moment, date2: Moment) =>
  date1.diff(date2, 'months')

const calculateYearsMoment = (date1: Moment, date2: Moment) =>
  date1.diff(date2, 'years')

const calcularPreaviso = (meses: number): number =>
  meses < 3
    ? 0
    : meses >= 3 && meses < 6
    ? 7
    : meses >= 6 && meses < 12
    ? 14
    : 28

const calcularCesantia = (meses: number, years: number): number =>
  meses < 3
    ? 0
    : meses >= 3 && meses < 6
    ? 6
    : meses >= 6 && meses < 12
    ? 13
    : meses > 12 && years <= 5
    ? years * 21
    : meses > 12 && years >= 5
    ? years * 23
    : 0

//Liquidacion del empleado (Despido)
export const calcularPrestaciones = (
  fecha_contratado: Moment,
  salario: number,
  tomoVacaciones: boolean,
  salarioVacaciones: number,
  regalia: number
): Dateprestaciones => {
  const meses = calculateMonthsMoment(moment(), moment(fecha_contratado))
  const years = calculateYearsMoment(moment(), moment(fecha_contratado))

  const preaviso = (salario / 23.83) * calcularPreaviso(meses)
  const cesantia = (salario / 23.83) * calcularCesantia(meses, years)

  const totalPrestaciones = tomoVacaciones
    ? preaviso + cesantia + regalia
    : preaviso + cesantia + salarioVacaciones + regalia
  return { preaviso, regalia, cesantia, totalPrestaciones }
}

export const vacacionesDisponibles = (fecha_contratado: Moment): boolean =>
  calculateMonthsMoment(moment(), fecha_contratado) >= 3

// sumar dias a una fecha en moment omitiendo fines de semana
export const addDays = (date: Moment, days: number, dias_omitir: number) => {
  let result = moment(date)
  let dias = 0
  let contador = 0
  while (contador < days) {
    dias_omitir === 1 && result?.day() !== 0 ? dias++ : contador++

    dias_omitir === 2 && result?.day() !== 0 && result?.day() !== 6
      ? dias++
      : contador++
  }
  return result?.add(
    dias_omitir === 1 ? dias : dias + Number(moment(date)?.format('DD')),
    'days'
  )
}

export const vacaciones = (
  fechaIngreso: Moment,
  sueldo: number,
  dias_omitir: number
): DateVacaciones => {
  const meses = calculateMonthsMoment(moment(), fechaIngreso)
  const mesesEmpresas =
    meses < 5
      ? 0
      : meses >= 5 && meses <= 6
      ? 6
      : meses >= 6 && meses <= 7
      ? 7
      : meses >= 7 && meses <= 8
      ? 8
      : meses >= 8 && meses <= 8
      ? 9
      : meses >= 9 && meses <= 10
      ? 10
      : meses >= 10 && meses <= 11
      ? 11
      : meses >= 11 && meses <= 12
      ? 12
      : meses >= 13 && meses <= 14
      ? 14
      : meses >= 60 && 18

  const fecha_inicio = moment(fechaIngreso).add(
    calculateYearsMoment(moment(), fechaIngreso),
    'year'
  )
  const fecha_fin = addDays(fecha_inicio, mesesEmpresas, dias_omitir)
  const sueldoVacaciones = (sueldo * mesesEmpresas) / 23.83
  return { fecha_inicio, fecha_fin, sueldoVacaciones }
}

export const regalia = (fecha_contratado: Moment, salario: number): number => {
  return fecha_contratado.year() === moment().year()
    ? (salario / 12) * calculateMonthsMoment(moment(), fecha_contratado)
    : (salario / 12) * calculateMonthsMoment(moment(), moment().startOf('year'))
}

export function isEqual<T>(array: T[]): T[] {
  if (array?.[0]?.['id']) {
    array.sort((a, b) => {
      return a['id'] > b['id'] ? 1 : -1
    })
    const keysArray = Object.keys(array[0])
    let previousChange = array[0]
    const finalArray: T[] = []

    for (let a = 0; a < array?.length; a++) {
      const currentObject = new Object() as T
      for (let i = 0; i < keysArray.length; i++) {
        if (previousChange[keysArray[i]] !== array[a][keysArray[i]]) {
          keysArray[i]?.includes('fecha')
            ? (currentObject[`${keysArray[i]}`] = `${moment(
                previousChange[keysArray[i]]
              )?.format('DD/MM/YYYY')} -> ${moment(
                array[a][keysArray[i]]
              )?.format('DD/MM/YYYY')}`)
            : (currentObject[`${keysArray[i]}`] = `${
                previousChange[keysArray[i]]
              } -> ${array[a][keysArray[i]]}`)
        }
      }

      finalArray.push({
        ...array[a],
        cambios: currentObject,
      })
      previousChange = array[a]
    }
    return finalArray?.filter((item) => Object.keys(item).length > 0) ?? []
  } else {
    return []
  }
}

// agregar campo a un objeto
const obj = { a: 1, b: 2, c: 3 }
const newObj = { ...obj, d: 4 }

export const cronExpression = (moment: Moment, exact = false) => {
  const minute = exact ? 0 : moment.minute()
  const second = exact ? 0 : moment.second()
  const hour = exact ? 0 : moment.hour()
  const dayOfMonth = moment.date()
  const month = moment.month() + 1
  const dayOfWeek = exact ? 0 : moment.day()
  return `${second} ${minute} ${hour} ${dayOfMonth} ${month} ${dayOfWeek}`
}
const ISR = (sueldo: number) => {
  const sueldoAnual = sueldo * 12
  return sueldoAnual < 416220.0
    ? 0
    : sueldoAnual > 416220.01 && sueldoAnual < 624329.0
    ? (sueldoAnual - 416220.01) * 0.15
    : sueldoAnual > 624329.01 && sueldoAnual < 867123.0
    ? (sueldoAnual - 624329.01) * 0.2 + 31216.0
    : sueldoAnual > 867123.0 && (sueldoAnual - 867123.01) * 0.25 + 79776.0
}

export const nomina = (sueldo: number, ahorro: number = 0) => {
  const afp = sueldo * 0.0287
  const sfs = sueldo * 0.0304
  const isr = ISR(sueldo - sfs - afp)
  const total_descuento = afp + sfs + isr / 12
  const sueldo_neto = sueldo - afp - sfs - isr / 12
  const totalSinAhorro = sueldo - afp - sfs - isr / 12 - ahorro
  const sueldoAnual = sueldo * 12
  const sueldoBruto = sueldo

  return {
    afp,
    sfs,
    isr,
    total_descuento,
    sueldo_neto,
    totalSinAhorro,
    sueldoAnual,
    sueldoBruto,
  }
}
