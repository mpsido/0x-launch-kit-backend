export class UserModel {
    public userAddress?: string;
    public isBanned?: boolean;
    constructor(
        opts: {
            userAddress?: string;
            isBanned?: boolean;
        } = {},
    ) {
        this.userAddress = opts.userAddress;
        this.isBanned = opts.isBanned;
    }
}
