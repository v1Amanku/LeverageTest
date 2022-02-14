import {useCallback, useState} from "react";
import {IRecord, IShow} from "../interfaces/main";
import Container from 'react-bootstrap/Container';
import {Button, Col, FormControl, Image, InputGroup, Row, Table} from "react-bootstrap";
import {useNavigate} from "react-router-dom";
import {getScore} from "../helpers/ratings";

export default function Root() {
    const navigate = useNavigate()

    const [shows, setShows] = useState<Array<IRecord>>([]);
    const [searchQuery, setSearchQuery] = useState<string>('');
    const url = 'https://api.tvmaze.com/search/shows?q=';

    const handleClick = useCallback((id) => {
        navigate("/details/" + id);
    }, [navigate]);

    const getDescription = useCallback((show: IShow) => {
        return (
            <div className={'description'}>
                <h1>{show.name}</h1>
                <div><b>Premiered: </b>{show.premiered}</div>
                <div><b>Genres: </b> {show.genres.map((el, index) => index !== show.genres.length-1 ? el + ', ' : el)}</div>
            </div>
        );
    }, []);

    const handleSearch = useCallback((e) => {
        const query = e.target.value;
        setSearchQuery(query);
        if(query.length > 0) {
            fetch(url + query.trim())
                .then(response => response.json())
                .then(data => {
                    setShows(data)
                    console.log(data);
                });
        }
    }, [])

    return (
        <div>
            <Container>
                <Row className="justify-content-md-center search-bar" >
                    <Col md={9}>
                        <InputGroup>
                            <InputGroup.Text id="inputGroup-sizing-lg">Search</InputGroup.Text>
                            <FormControl aria-label="Search" aria-describedby="inputGroup-sizing-sm"
                                         onChange={handleSearch} value={searchQuery} inputMode={"text"}/>
                        </InputGroup>
                    </Col>
                </Row>
                <Row>
                    <Table responsive striped bordered>
                        <tbody>
                        {shows.map((record, index) =>
                            <tr key={index}>
                                <td width={'15%'}>
                                    <div>
                                        <Image style={{maxWidth: '100%'}} src={record.show.image?.medium ?? 'placeholder.png'}/>
                                        {record.show.status === "Running" && <div className={'airing'}>Airing</div>}
                                    </div>
                                </td>
                                <td width={'60%'}>{getDescription(record.show)}</td>
                                <td width={'2%'}>{record.show.rating?.average && getScore(record.show.rating?.average, 10)}</td>
                                <td width={'5%'}><Button onClick={() => handleClick(record.show.id)} variant={"primary"}>Link</Button></td>
                            </tr>)}
                        </tbody>
                    </Table>
                </Row>

            </Container>
        </div>
    );
}

