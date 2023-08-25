import { TiStarFullOutline } from 'react-icons/ti'
import { BiStopwatch } from 'react-icons/bi'
import { TbTruckDelivery } from 'react-icons/tb'
import { BiTrash } from 'react-icons/bi'
import { LuEdit } from 'react-icons/lu'
import { Row, Col, Panel, Stack, Whisper, Tooltip, Divider } from 'rsuite';
import CheckRoundIcon from '@rsuite/icons/CheckRound';

export function RestaurantItem({ name, logo, rating, rateCount, image, delivery, status, promotion, minimumOrder, timeEstimation, distance, previewButton, isSelected, onEditClik, onRemoveClik, className }) {
    return (
        <div className={`relative shadow-sm rounded-xl bg-white w-56 ${className}`} >
            <div className='flex flex-col items-center p-3'>
                <div className='w-full flex flex-col items-center gap-1  ' onClick={previewButton} >

                    <div className='relative w-full h-28'>
                        <img className="rounded-xl w-full object-cover h-full" src={image} alt='' draggable="false" />
                        {/* <div className='absolute bottom-0'>
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
                        </div> */}
                        <div hidden={!rating}>
                            <div className='absolute top-0 bg-white flex gap-1 items-center rounded-br-lg' >
                                <TiStarFullOutline size={14} className="text-yellow-400" /> <div className='pr-2'>{rating}</div>
                            </div>
                        </div>
                    </div>
                    <div className='align-middle'>
                    <p className='text-sm truncate'>
                        {name}
                    </p>
                        </div>
                </div>
                <div hidden={onEditClik && onRemoveClik} className='w-full' >

                    <Divider className='m-0 my-1' />
                    <div className='w-full flex flex-row justify-center gap-2 align-middle' >
                        <LuEdit className='cursor-pointer' hidden={!onEditClik} onClick={onEditClik} size={18} />
                        <BiTrash className='cursor-pointer' hidden={!onRemoveClik} onClick={onRemoveClik} size={18} />
                    </div>
                </div>
                {/* <div className="p-1 py-2 flex justify-between items-center">
                    <div className='flex gap-1 items-center'>
                        <img className="border border-borderGray w-8 h-8 rounded-full" src={logo} alt='' draggable="false" />

                    </div>
                    <div className="text-xs font-semibold mt-auto gap-1" hidden={!delivery}>
                        {delivery} SAR <TbTruckDelivery className='text-lg' />
                    </div>
                </div> */}
                <CheckRoundIcon hidden={!isSelected} fill='#90ee90ee' style={{ fontSize: "3em", position: "absolute", top: "30%", left: "50%", transform: "translate(-50%, -50%)" }} />
            </div>
        </div>

    );
}
