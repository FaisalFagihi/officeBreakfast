import EditIcon from '@rsuite/icons/Edit';
import TrashIcon from '@rsuite/icons/Trash';
import { Row, Col, Panel, Stack, Grid } from 'rsuite';
import CheckRoundIcon from '@rsuite/icons/CheckRound';

export function VendorCustom({ name, logo, image, kitchens, promotion, minimumOrder, previewButton, editButton, removeButton, isSelected, onCardClik }) {
    return (
        // <div className="ResturantItem" onClick={onCardClik}>
        //     <div><img src={logo}  className="VendorLogo" alt='icon' onDragStart={(e)=>e.preventDefault()} /></div>
        //     <div>{name}</div>
        // </div>
        <Panel bordered bodyFill style={{ display: 'inline-block', width: 250 }}>
            <Grid fluid onClick={onCardClik} className="my-2">
                <Row>
                    <Col style={{width:90}}>
                        <img className="VendorLogo" src={logo} alt='' draggable="false" />
                    </Col>
                    <Col className='m-2'>
                        <Row>
                            <Row>
                                <h6>{name}</h6>
                            </Row>
                            <Row>
                                <Stack>
                                    <EditIcon onClick={editButton} className="mx-2" />
                                    <TrashIcon onClick={removeButton} className="mx-2" />
                                </Stack>
                            </Row>
                        </Row>
                    </Col>
                    <CheckRoundIcon hidden={!isSelected} fill='#90ee90ee' style={{ fontSize: "3em", position: "absolute", top: "30%", left: "50%", transform: "translate(-50%, -50%)" }} />
                </Row>

            </Grid>
            <button className="VendorSelect" onClick={previewButton}>view</button>


        </Panel>
    );
}
