import {IEpisodes} from "../interfaces/main";
import _ from 'lodash';
import SeasonCard from "./SeasonCard";

interface ISeasonCards {
    series: Array<IEpisodes>
}

export default function SeasonCards(props:ISeasonCards) {
    const showsGroupedBySeason: Array<Array<IEpisodes>> = _.values(_.groupBy(props.series, (el) => el.season));
    return (<>
        {showsGroupedBySeason.map((season: Array<IEpisodes>, index) => <SeasonCard key={index} season={season}/>)}
    </>)
}