import { Role } from "../../auth/role.enum";


export interface UserInterface {

    getPassword(): string

    getRoles(): Array<Role>

}