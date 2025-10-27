import MemberWorkspaceRepository from "../repositories/memberWorkspace.repository.js"
import WorkspaceRepository from "../repositories/workspace.repository.js"
import UserRepository from "../repositories/user.repository.js"
import { ServerError } from "../error.js"
import jwt from "jsonwebtoken"

class WorkspaceService {
    static async getAll(user_id){
        const members = await MemberWorkspaceRepository.getAllByUserId(user_id)
        return members
    } 

    static async create(user_id, name, url_img){
        
        //Crear el espacio de trabajo 
        const workspace_created = await WorkspaceRepository.create(name, url_img)

        //Crear al miembro con role de  admin (Creador del workspace)
        await MemberWorkspaceRepository.create(user_id, workspace_created._id, 'admin')

        return workspace_created
    }

    static async inviteUserToWorkspace(email_invited, id_workspace, id_inviter, invited_role) {
        const user = await UserRepository.getByEmail(email_invited)

        if (!user) {
            throw new ServerError(404, `El usuario con el email ${email_invited} no existe.`)
        }

        // Verificar que el usuario no esté ya en el workspace
        const isMember = await MemberWorkspaceRepository.getByUserIdAndWorkspaceId(user._id, id_workspace)

        if (isMember) {
            throw new ServerError(400, `El usuario con el email ${email_invited} ya es miembro del workspace.`)
        }

        // Generar un token con los datos necesarios
        const tokenPayload = {
            id_invited: user._id,
            id_inviter,
            id_workspace,
            invited_role
        }

        const token = jwt.sign(tokenPayload, process.env.SECRET_KEY, { expiresIn: '7d' })

        return {
            message: `Usuario ${email_invited} invitado correctamente.`,
            token
        }
    }
}


export default WorkspaceService