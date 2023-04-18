export interface responseJWT {
    hasError: boolean,
    stacktrace: string,
    message: string,
    response: {
        token: string,
        userName: string,
        esLdapUser: string
    }
}