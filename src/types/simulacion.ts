export type CronogramaItem = {
  id: number
  fecha: Date
  concepto: string
  inversion: number
  rendimiento: number
  impuesto: number
  deposito: number
  disponible: number
}

export type SimulacionRequest = {
  nombre: string
  dni: string
  producto: string
  monto: number
  tea: number
  plazo: number
  diaPago: number
  moneda: string
  tipoCobro: string
  fechaInicio: string
  cronograma?: CronogramaItem[]
}

export type SimulacionResponse = {
  cronograma: CronogramaItem[]
}