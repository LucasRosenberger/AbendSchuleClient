export class Facher{
    constructor(
        public id : number,
        public Kolleg : string,
        public Fach : string,
        public Sem : number,
        public picked : boolean
    ){

    }
}

export class Gegenstand{
    constructor(
        public gegenstandid : number
    ){
        
    }
}

export class Session{
    constructor(
        public sessionstring : string,
        public id : number
    ){

    }
}