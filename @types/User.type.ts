export type TUserSchema = {
    name:string,
    slug:string
    email:string,
    password:string
    profileImg:string,
    phone:string,
    role: 'user' | 'admin'
}

