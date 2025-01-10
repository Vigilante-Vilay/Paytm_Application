const zod = require("zod");

const userSignInSchema = zod.object({
    username: zod.string(),
    password: zod.string(),
    firstName: zod.string(),
    lastName: zod.string()
});

const userLoginSchema = zod.object({
    username: zod.string(),
    password: zod.string()
});

const updateSchema = zod.object({
    username: zod.string().optional(),
    password: zod.string().optional(),
    firstName: zod.string().optional(),
    lastName: zod.string().optional() 
})

module.exports={
    userSignInSchema,updateSchema,userLoginSchema
}