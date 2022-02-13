export interface IRecord {
    score: number,
    show: IShow
}

export interface IShow {
    averageRuntime: number,
    dvdCountry?: any,
    ended: string,
    externals: any,
    genres: Array<string>,
    id: number,
    image: IImage,
    language: string,
    name: string,
    network: INetwork,
    officialSite: string,
    premiered: string,
    rating: IRating,
    runtime: number,
    schedule: ISchedule,
    status: string,
    summary: string,
    type: string,
    updated: number,
    url: string,
    webChannel?:any,
    weight: number
}

export interface IEpisodes {
    airdate: string,
    airstamp: string,
    airtime: string,
    id: string,
    image: IImage,
    name: string,
    number: number,
    rating: IRating,
    runtime: number,
    season: number,
    summary: string,
    type: string,
    ulr: string
}

export interface ICountry {
    name: string,
    code: string,
    timezone: string
}

export interface INetwork {
    country: ICountry,
    id: number,
    name: string
}

export interface IRating {
    average: number;
}

export interface IImage {
    medium: string,
    original: string;
}

export interface ISchedule {
    days: Array<string>,
    time: string
}
