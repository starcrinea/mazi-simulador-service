import { app, HttpRequest, HttpResponseInit, InvocationContext } from "@azure/functions"

import { calcularCronograma } from "../modules/simulador/simulador.service"
import { SimulacionRequest } from "../types/simulacion"

export async function simular(request: HttpRequest, context: InvocationContext): Promise<HttpResponseInit> {

  try{

    const body = await request.json() as SimulacionRequest

    const {
      monto,
      tea,
      plazo,
      diaPago,
      tipoCobro,
      fechaInicio
    } = body

    const cronograma = calcularCronograma({
      inversion:monto,
      tea,
      plazo,
      fechaInicio,
      diaPago,
      tipoCobro
    })

    return {
      status:200,
      jsonBody:{
        cronograma
      }
    }

  }catch(error){

    context.log(error)

    return {
      status:500,
      jsonBody:{
        error:"Error en simulación"
      }
    }

  }

}

app.http('simular', {
  methods:['POST'],
  authLevel:'anonymous',
  handler:simular
})