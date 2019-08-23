export class UserModel {
    public _id?: number;
    public name?: string;
    public email?: string;
    public password?: string;
    public isBanned?: boolean;
    constructor(
        opts: {
            name?: string;
            email?: string;
            password?: string;
            userAddress?: string;
            isBanned?: boolean;
        } = {},
    ) {
        this.name = opts.name;
        this.email = opts.email;
        this.password = opts.password;
        this.isBanned = opts.isBanned;
    }
}
