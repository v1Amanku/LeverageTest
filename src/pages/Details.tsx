import {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import {IEpisodes, IShow} from "../interfaces/main";
import Container from "react-bootstrap/Container";
import {Card, Image} from "react-bootstrap";
import {getScore} from "../helpers/ratings";
import SeasonCards from "../components/SeasonCards";
import dayjs from "dayjs";

export default function Details() {
    const { id } = useParams();

    const [show, setShow] = useState<IShow>();
    const [series, setSeries] = useState<Array<IEpisodes>>([]);

    useEffect(() => {
        let isMounted = true;
        const url = 'https://api.tvmaze.com/shows/';
        fetch(url + id + '?embed=episodes')
            .then(response => response.json())
            .then(data => {
                if(isMounted) {
                    setShow(data);
                    setSeries(data._embedded?.episodes);
                }
            });
        return () => {
            isMounted = false
        };
    }, [id])

    return(<Container className={"details-container"}>
        {show && (
            <div className={'columns'}>
                <div className={'image-container'}>
                    <Image className={'image'} src={show.image.original} />
                </div>
                <div className={"description-container"}>
                    <Card className="text-center">
                        <Card.Header><h1>{show.name}</h1></Card.Header>
                        <Card.Body>
                            <div className={'summary'} dangerouslySetInnerHTML={{__html: show.summary}}/>
                            <div style={{textAlign:"left"}}>
                                <div><b>Premiered: </b>{dayjs().diff(dayjs(show.premiered, "YYYY-MM-DD"), 'days')} days ago</div>
                                <div><b>Genres: </b> {show.genres.map((el, index) => index !== show.genres.length-1 ? el + ', ' : el)}</div>
                                <div><b>Language: </b> {show.language}</div>
                                <div><b>Status: </b>{show.status}</div>
                                <div><b>Official site: </b><a href={show.officialSite} target={'_blank'} rel="noreferrer">{show.officialSite} </a></div>
                                <div style={{paddingTop: 20}}>{getScore(show.rating.average, 10)}</div>
                            </div>
                        </Card.Body>
                    </Card>
                    <SeasonCards series={series}/>
                </div>
            </div>
        )}
        </Container>);
}