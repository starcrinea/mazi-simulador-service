import { CronogramaItem } from "../../types/simulacion"

export function calcularCronograma({
  inversion,
  tea,
  plazo,
  fechaInicio,
  diaPago,
  tipoCobro
}:{
  inversion:number
  tea:number
  plazo:number
  fechaInicio:string
  diaPago:number
  tipoCobro:string
}):CronogramaItem[]{

const cronograma:CronogramaItem[]=[]

const start=new Date(fechaInicio)

const i360=Math.pow(1+tea,1/360)-1

cronograma.push({

id:0,
fecha:start,
concepto:"Inversión inicial",
inversion,
rendimiento:0,
impuesto:0,
deposito:0,
disponible:0

})

let fechaAnterior=start

let contadorCobro=1

const frecuencia={
"Mensual":1,
"Trimestral":3,
"Semestral":6,
"Al Liquidar":plazo
}[tipoCobro] || 1


for(let i=1;i<=plazo;i++){

const fecha=new Date(start)
fecha.setMonth(start.getMonth()+i)
fecha.setDate(diaPago)

const dias=Math.floor(
(fecha.getTime()-fechaAnterior.getTime())/(1000*60*60*24)
)

const rendimiento=(inversion*Math.pow(1+i360,dias))-inversion

const impuesto=rendimiento*0.05

let deposito=0
let concepto=""

if(contadorCobro===frecuencia){

deposito=rendimiento-impuesto
concepto="Cobro de intereses"
contadorCobro=1

}else{

contadorCobro++

}

cronograma.push({

id:i,
fecha,
concepto,
inversion,
rendimiento,
impuesto,
deposito,
disponible:0

})

fechaAnterior=fecha

}

const last=cronograma[cronograma.length-1]

last.concepto="Liquidación"

last.disponible=inversion+last.rendimiento-last.impuesto

last.deposito=last.rendimiento-last.impuesto

return cronograma

}