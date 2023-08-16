import { TiStarFullOutline } from 'react-icons/ti'
import { BiStopwatch } from 'react-icons/bi'
import { TbTruckDelivery } from 'react-icons/tb'
import { BiTrash } from 'react-icons/bi'
import { LuEdit } from 'react-icons/lu'
import { Row, Col, Panel, Stack, Whisper, Tooltip } from 'rsuite';
import CheckRoundIcon from '@rsuite/icons/CheckRound';

export function RestaurantItem({ name, logo, rating, rateCount, image, delivery, status, promotion, minimumOrder, timeEstimation, distance, previewButton, isSelected, onEditClik, onRemoveClik, className }) {
    return (
        <div className={`relative border rounded-md border-gray-200 ${className}`} >
            <div className='absolute z-50 top-2 right-2 cursor-pointer flex gap-2' >
                <LuEdit hidden={!onEditClik} onClick={onEditClik} size={20} />
                <BiTrash hidden={!onRemoveClik} onClick={onRemoveClik} size={20} />
            </div>
            <div onClick={previewButton}>
                <div className='relative h-32'>
                    <img className="rounded-t-md w-full object-cover h-full" src={image} alt='' draggable="false" />
                    <div className='absolute bottom-0'>
                        <Whisper
                            placement="topStart"
                            controlId="control-id-context-menu"
                            trigger="hover"
                            speaker={<Tooltip><Row style={{ fontSize: "12px" }}>
                                {promotion?.message}
                            </Row></Tooltip>}
                        >
                            <div className='bg-gray-600 text-xs px-1 text-white text-ellipsis overflow-hidden whitespace-nowrap max-w-64 opacity-90' hidden={promotion == null}>
                                {promotion?.message}
                            </div>
                        </Whisper>
                    </div>
                </div>
                <div className="p-1 py-2 flex justify-between items-center">
                    <div className='flex gap-1 items-center'>
                        <img className="border border-borderGray w-8 h-8 rounded-full" src={logo} alt='' draggable="false" />
                        <div className='text-sm'>
                            {name}
                        </div>
                    </div>
                    <div className="flex text-xs font-semibold mt-auto gap-1" hidden={delivery == null}>
                        {delivery} SAR <TbTruckDelivery className='text-lg' />
                    </div>
                    {/* <div className="VendorRating" hidden={rating == null}>
                        <TiStarFullOutline className="Star" /> <div> {rating} ({rateCount})</div>
                    </div> */}

                </div>
                <CheckRoundIcon hidden={!isSelected} fill='#90ee90ee' style={{ fontSize: "3em", position: "absolute", top: "30%", left: "50%", transform: "translate(-50%, -50%)" }} />
            </div>
        </div>

    );
}
