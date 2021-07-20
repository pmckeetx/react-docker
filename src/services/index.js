import config from '../config'
import rest from '../util/rest' 

const USE_SERVICE_HOST = process.env.REACT_APP_USE_SERVICE_HOST

console.log( `REACT_APP_USE_SERVICE_HOST: ${USE_SERVICE_HOST}` )

let entities = {
  payload: []
}

async function searchEntities( entity ) {
  if( USE_SERVICE_HOST ) {
    return await rest.get( `${config.services.host}/${entity}` )
  } else {
    return new Promise( (resolve, reject) => {
      return resolve( entities )
    })
  }
}

async function getById( entity, id ) {
  return await rest.get( `${config.services.host}/${entity}/${id}` )
}

async function createEntity( entity, obj ) {
  // { "id": 1, "name": "foo" }
  return new Promise( (resolve, reject) => {
    entities.payload.push( obj )
    return resolve( obj )
  })
  // return await rest.post( `${config.services.host}/${entity}`, obj )
}

export default {
  searchEntities,
  getById,
  createEntity
}