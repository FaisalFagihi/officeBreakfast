import { Row, Col, Panel } from "rsuite";

export function MenuItem({ name, price, calories, photo, onClick }) {
    const caloriesContent = (calories != null) ? < div className="Calories"  >
        {calories}
    </div > : <></>
    return (
        <Panel bodyFill bordered  onClick={onClick} style={{ width: 330, height: 120, borderColor:"#f1f1f1", borderRadius:10}}>
            <Row>
                <Col style={{ width: 160 }}>
                    {caloriesContent}
                    <img draggable="false" className="MenuItemImage" src={photo} alt="" onDragStart={(e) => e.preventDefault()} />
                </Col>
                <Col style={{ width: 165, padding: 5 }}>
                    <Row style={{ height: 80 }}>
                        {name}
                    </Row>
                    <Row style={{ height: "auto", textAlign: "right" }} >
                        {price} SR
                    </Row>
                </Col>
            </Row>
        </Panel>
    );
}
