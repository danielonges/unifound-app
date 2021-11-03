import { Card } from 'react-bootstrap';

function LostFoundListingCard({ params }) {
    return (
        <Card>
            {/* <Card.Img variant="top" src={params.image} /> */}
            <Card.Body>
                <Card.Title>{params.name}</Card.Title>
                <Card.Text>{(params.description)}</Card.Text>
            </Card.Body>
        </Card>
    )
}

export default LostFoundListingCard;