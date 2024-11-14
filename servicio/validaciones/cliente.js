//https://www.npmjs.com/package/joi
//https://joi.dev/

import Joi from 'joi'

export const validar = cliente => {

    const productoSchema = Joi.object({
        nombre: Joi.string().alphanum().required(),
        dni: Joi.number().min(0).max(1000000).required(),
        edad: Joi.number().integer().min(0).max(99).required()
    })

    const { error } = productoSchema.validate(cliente)
    if(error) {
        return { result: false, error }
    }
    return { result: true }
}
