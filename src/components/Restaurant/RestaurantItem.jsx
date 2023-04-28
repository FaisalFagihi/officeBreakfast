import { TiStarFullOutline } from 'react-icons/ti'
import { BiStopwatch } from 'react-icons/bi'
import { TbTruckDelivery } from 'react-icons/tb'
import { Row, Col, Panel, Stack, Whisper, Tooltip } from 'rsuite';
import CheckRoundIcon from '@rsuite/icons/CheckRound';

export function RestaurantItem({ name, logo, rating, rateCount, image, delivey, status, promotion, minimumOrder, timeEstimation, distance, previewButton, isSelected, onCardClik }) {
    return (
        <Panel bodyFill bordered style={{ width: "220px" }}>
            <div className="RestaurantItem" onClick={onCardClik}>
                <div className="RestaurantImage">
                    <img className="VendorStickyLogo" src={logo} alt='' />
                    <img className="RestaurantImage" src={image} alt='' />
                </div>
                <div className="RestaurantDetails">
                    <div className="RestaurantName">
                        {name}
                    </div>
                    <div className="RestaurantDelivery flex" hidden={delivey == null}>
                        {delivey} SAR <TbTruckDelivery  style={{ fontSize: "16px" }} />
                    </div>
                    {/* <div className="VendorRating" hidden={rating == null}>
                        <TiStarFullOutline className="Star" /> <div> {rating} ({rateCount})</div>
                    </div> */}
                    <Whisper
                        placement="topStart"
                        controlId="control-id-context-menu"
                        trigger="hover"
                        speaker={<Tooltip><Row style={{ fontSize: "12px" }}>
                            {promotion?.message}
                        </Row></Tooltip>}
                    >
                        <div className="VendorPromotion" hidden={promotion == null}>
                            {promotion?.message}
                        </div>
                    </Whisper>
                </div>
                <CheckRoundIcon hidden={!isSelected} fill='#90ee90ee' style={{ fontSize: "3em", position: "absolute", top: "30%", left: "50%", transform: "translate(-50%, -50%)" }} />
            </div>
            <button className="VendorSelect" hidden={!previewButton} onClick={previewButton}>view</button>
        </Panel>
    );
}
