import { app, HttpRequest, HttpResponseInit, InvocationContext } from "@azure/functions"
import { simulacionesContainer } from "../database/cosmos"
import { SimulacionRequest } from "../types/simulacion"

export async function guardar(request: HttpRequest, context: InvocationContext): Promise<HttpResponseInit>{

try{

const body = await request.json() as SimulacionRequest

// obtener último correlativo

const query={
query:"SELECT TOP 1 c.pid FROM c ORDER BY c.pid DESC"
}

const {resources}=await simulacionesContainer.items
.query(query)
.fetchAll()

let nuevoId=1

if(resources.length>0){

nuevoId=resources[0].pid+1

}

// construir documento

const documento={

id:nuevoId.toString(),

pid:nuevoId,

prospecto:body.dni || "",

fecha:new Date().toISOString(),

rango:true,

parametros:{

codigo:"GINV",

moneda:body.moneda,

producto:body.producto,

plazo:body.plazo,

monto:body.monto,

fechaDesembolso:body.fechaInicio,

diaPago:body.diaPago,

cobroInteres:body.tipoCobro,

tea:body.tea,

teatope:body.tea

},

cronograma:{

fecha:body.fechaInicio,

inversion:body.monto,

rendimiento:0,

impuesto:0,

deposito:0,

trea:0,

montoFinal:0,

cuotas:body.cronograma

}

}

await simulacionesContainer.items.create(documento)

return{

status:200,

jsonBody:{
mensaje:"Simulación guardada",
id:nuevoId
}

}

}catch(error){

context.log(error)

return{

status:500,

jsonBody:{
error:"Error guardando"
}

}

}

}

app.http('guardar',{
methods:['POST'],
authLevel:'anonymous',
handler:guardar
})