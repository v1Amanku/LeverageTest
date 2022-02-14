import {IEpisodes} from "../interfaces/main";
import {Card, Table} from "react-bootstrap";

interface ISeasonCard {
    season: Array<IEpisodes>
}

export default function SeasonCard(props: ISeasonCard) {

    return (<>
            {props.season.length > 0 &&
                <div className={'season-card'}>
                    <Card className="text-center">
                        <Card.Header><h3>{'Season ' + props.season[0].season}</h3></Card.Header>
                        <Card.Body>
                            <div style={{textAlign:"left"}}>
                                <Table size="sm">
                                    <thead>
                                    <tr>
                                        <th>#</th>
                                        <th>Name</th>
                                        <th>Description</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    {props.season.map((episode, index) =>
                                        <tr key={index}>
                                            <td width={'3%'}>{episode.number}</td>
                                            <td width={'17%'}>{episode.name}</td>
                                            <td><div dangerouslySetInnerHTML={{__html: episode.summary}}/></td>
                                        </tr>
                                    )}
                                    </tbody>
                                </Table>
                            </div>
                        </Card.Body>
                    </Card>
                </div>}
        </>);
}