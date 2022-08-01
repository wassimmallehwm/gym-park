export const hasRole = (role: string, roles: any): boolean => {
    const rolesMap = new Map(roles.map((item: any) => [item.label, item.label]))
    return role == rolesMap.get(role)
}

export const hasRoles = (roles: string[], userRoles: any): boolean => {
    let result = true;
    const rolesMap = new Map(userRoles.map((item: any) => [item.label, item.label]))
    roles.forEach((role: string) => {
        if(role !== rolesMap.get(role)){
            result = false
        }
    })
    return result
}