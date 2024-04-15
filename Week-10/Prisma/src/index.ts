import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

async function inserUser(email:string, firstName:string, lastName: string, password:string){
    const res = await prisma.user.create({
        data: {
            email,
            firstName,
            lastName,
            password
        },
        select: {
            id: true,
            firstName: true,
        }

    })
    console.log(res)
    
}
inserUser("himanshu@gmail.com","Himanshu","Rai","12345678");


interface UpdateParams{
    firstName: string;
    lastName: string;
}

async function updateUser(username:string,{
    firstName,
    lastName
}:UpdateParams){
    const res = await prisma.user.update({
        where: {
            email: username
        },
        data: {
            firstName,
            lastName
        }
    })
    console.log(res)
}

updateUser("himanshurai@gmail.com",{
    firstName: "Himanshu11",
    lastName: "Rai11"
}).then(() => {
      console.log("User updated successfully")
}).catch((e) => {
    console.error(e)
}).finally(async () => {
    await prisma.$disconnect()
})