export class BearerToken {
    constructor(public access_token?: string, public expires_in?: number, public refresh_token?: string, scope?: string, token_type?: string){}
}
