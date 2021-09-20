export class User {

    constructor (
        public  email              : string,
        public  id                 : string,
        private _token             : string,
        private _tokenEpirationDate: Date
    ) {}

    public get token() : string {
        if (!this._tokenEpirationDate || new Date() > this._tokenEpirationDate) {
            return null
        }
        return this._token
    }

}