import Role from '../models/role.model';

export const createRoles = async () => {
    try{
        const count = await Role.estimatedDocumentCount()
        if(count > 0){
            return
        }
        const values = await Promise.all([
            new Role({name: 'Admin'}).save(),
            new Role({name: 'Teacher'}).save(),
            new Role({name: 'Student'}).save()
        ])
        console.log(values)
    }catch(err){
        console.error(err)
    }
    

}
