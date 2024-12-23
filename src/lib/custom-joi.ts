const Mongoose = require("mongoose")
var Joi = require("joi")


// Phone number
Joi = Joi.extend(joi => {
    return {
        type: "phoneNumber",
        messages: {
            'phoneNumber.boolean': "{{#label}}  cannot of type boolean",
            'phoneNumber.notIndian': "{{#label}}  does not start from +91",
            'phoneNumber.incorrectLength': "{{#label}} should be of 10 digit",
            'phoneNumber.outOfBound': "{{#label}} Should be of 10 digit",
            "phoneNumber.invalidDataType": "{{#label}} is of invalid data type"
        },
        coerce(value, helpers){
            if(typeof value === "string") {
                value = value.replace("+91", "")
                
                if(value.charAt(0) === "+") return {value, errors: helpers.error("phoneNumber.notIndian")}
                else if(value.length !== 10) return {value, errors: helpers.error('phoneNumber.incorrectLength')}

                value = parseInt(value)
            }else if(typeof value === "boolean"){
                return {value, errors: helpers.error("phoneNumber.boolean")}
            }

            return {value}
        },
        validate(value, helpers){
            if(typeof value === "number"){
                if(value < 1000000000 || value > 9999999999) return {value, errors: helpers.error('phoneNumber.outOfBound')}
            }else {
                return {value, errors: helpers.error("phoneNumber.invalidDataType")}
            }
        }
    }
})

Joi = Joi.extend(joi => {
    return {
        type: "objectId",
        messages: {
            'objectId.notValid': "{{#label}} is not a valid mongodb id"
        },
        validate(value, helpers){
            if(Mongoose.Types.ObjectId.isValid(value)){
                value = new Mongoose.Types.ObjectId(value)
            }else {
                return {value, errors: helpers.error("objectId.notValid")}
            }
        }
    }
})

Joi = Joi.extend(joi => {
    return {
        type: "url",
        messages: {
            'url.notValid': "{{#label}} is not a valid url"
        },
        validate(value, helpers){
            if(typeof value !== "string" || value.indexOf("http") !== 0){
                return {value, errors: helpers.error("url.notValid")}
            }
        }
    }
})

module.exports = Joi
export default Joi