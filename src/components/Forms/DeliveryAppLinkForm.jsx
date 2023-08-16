import {Row, Col, Container} from 'rsuite';
import { useState, useEffect } from 'react';
import axiosInstance from "../../interceptors/axiosInstance"
import auth from '../../modules/auth'

// import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
// import { useMapEvents, useMap } from 'react-leaflet/hooks'

// import Leaflet from 'leaflet';
// import 'leaflet/dist/leaflet.css';

// import Search from "react-leaflet-search";
// import ReactLeafletSearch from "react-leaflet-search";
// Leaflet.Icon.Default.imagePath =
//     '../node_modules/leaflet'

// delete Leaflet.Icon.Default.prototype._getIconUrl;

// Leaflet.Icon.Default.mergeOptions({
//     iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
//     iconUrl: require('leaflet/dist/images/marker-icon.png'),
//     shadowUrl: require('leaflet/dist/images/marker-shadow.png')
// });

export function DeliveryAppLinkForm() {
    const [phoneNumber, setPhoneNumber] = useState("");
    const [hasRegistered, setRegisterStatus] = useState(false);
    const [hasVerified, setVerificationStatus] = useState(false);

    function register() {
        var data = { "PhoneNumber": "966" + phoneNumber};
        axiosInstance.post("DeliveryApp/register", data)
            .then(({ data }) => {
                setRegisterStatus(true);
            }).catch((error) => {
            });
    }

    function verify() {
        let code = Array.from(document.querySelectorAll('[name="verifyCode"]')).map(input => input.value)
        code = parseInt(code.join(''));
        var data = { "PhoneNumber": "966" + phoneNumber, "verificationCode": code };
        axiosInstance.post("DeliveryApp/verify", data)
            .then(({ token }) => {
                auth.setToken(token);
                setRegisterStatus(true);
            }).catch((error) => {
            });
    }

    let digitValidate = function (ele) {
        ele.value = ele.value.replace(/[^0-9]/g, '');
    }

    let tabChange = function (val) {
        let ele = document.querySelectorAll('[name="verifyCode"]');
        if (ele[val - 1].value !== '') {
            ele[val].focus()
        } else if (ele[val - 1].value === '') {
            ele[val - 2].focus()
        } else {
        }
    }

    const [position, setPosition] = useState([21.625061215394258, 39.20322455322907])

    function LocationMarker() {
        const map = useMapEvents({
            click(e) {
                setPosition(e.latlng)
                if (map.getZoom() < 18) {

                    map.flyTo(e.latlng, map.getZoom() + 1)
                }
            }
        })
    }

    function MoveMarkerToCurrentLocation() {
        const map = useMap();
        map.flyTo(position, 10)
    }


    useEffect(() => {
        navigator.geolocation.getCurrentPosition((position) => {
            setPosition([position.coords.latitude, position.coords.longitude])
            // MoveMarkerToCurrentLocation()
        })

    }, [])

    return (
        <Container>
            <Row className="justify-content-md-center">
                <Col md="auto" >
                    <div className="Box">
                        <div className="BoxInner" hidden={hasRegistered}>
                            <h5>Jahez| Register</h5>
                            <h6>Enter your phone number</h6>
                            <Row>
                                <Col>
                                    <div className="PhoneNumber">
                                        <input type="text" className="Code p-2 w-100" value="+966" readOnly />
                                        <input type="text" className="Code p-2 w-100" placeholder="ex: 55-12345678" onChange={(event) => { setPhoneNumber(event.target.value) }} />
                                    </div>
                                </Col>
                            </Row>
                            <button onClick={() => register()}>Send</button>
                        </div>
                        <div className="BoxInner" hidden={!hasRegistered || hasVerified}>
                            <h5>Jahez| Verify</h5>
                            <h6>Enter your phone number</h6>
                            <Row>
                                <Col>
                                    <div className="PhoneNumberVerify">
                                        <input type="text" className="Code p-2 w-100" name='verifyCode' onInput={(e) => digitValidate(e.target)} onChange={() => tabChange(1)} />
                                        <input type="text" className="Code p-2 w-100" name='verifyCode' onInput={(e) => digitValidate(e.target)} onChange={() => tabChange(2)} />
                                        <input type="text" className="Code p-2 w-100" name='verifyCode' onInput={(e) => digitValidate(e.target)} onChange={() => tabChange(3)} />
                                        <input type="text" className="Code p-2 w-100" name='verifyCode' onInput={(e) => digitValidate(e.target)} onChange={() => tabChange(4)} />
                                        <input type="text" className="Code p-2 w-100" name='verifyCode' onInput={(e) => digitValidate(e.target)} onChange={() => tabChange(5)} />
                                        <input type="text" className="Code p-2 w-100" name='verifyCode' onInput={(e) => digitValidate(e.target)} onChange={() => tabChange(6)} />
                                    </div>
                                </Col>
                            </Row>
                            <button onClick={() => verify()}>Send</button>
                        </div>

                        <div className="BoxInner" hidden={!hasRegistered || !hasVerified}>
                            <div style={{ height: '250px', width: '500px' }}>
                                {/* <div style={{ height: '50px', width: '100%' }} /> */}
                                <MapContainer center={position} zoom={20} scrollWheelZoom={true} style={{ height: '100%', width: '100%' }}>
                                    {/* <MoveMarkerToCurrentLocation /> */}
                                    <LocationMarker />
                                    <TileLayer
                                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                                    <Marker position={position}>
                                        <Popup>
                                            A pretty CSS3 popup. <br /> Easily customizable.
                                        </Popup>
                                    </Marker>
                                </MapContainer>
                            </div>
                        </div>
                    </div>
                </Col>
            </Row>
        </Container>
    )
}
