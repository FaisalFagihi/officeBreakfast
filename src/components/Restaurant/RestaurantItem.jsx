import { TiStarFullOutline } from 'react-icons/ti'
import { BiStopwatch } from 'react-icons/bi'
import { TbTruckDelivery } from 'react-icons/tb'
import { BiTrash } from 'react-icons/bi'
import { LuEdit } from 'react-icons/lu'
import { Row, Col, Panel, Stack, Whisper, Tooltip, Divider, Dropdown } from 'rsuite';
import CheckRoundIcon from '@rsuite/icons/CheckRound';

export function RestaurantItem({ name, logo, rating, rateCount, image, delivery, status, promotion, minimumOrder, timeEstimation, distance, previewButton, isSelected, onEditClik, onRemoveClik, className }) {
    const SizeDropdown = ({ onEditClik, onRemoveClik, ...props }) => (
        // <LuEdit className='cursor-pointer' hidden={!onEditClik} onClick={onEditClik} size={18} />
        // <BiTrash className='cursor-pointer' hidden={!onRemoveClik} onClick={onRemoveClik} size={18} />


        <Dropdown {...props} >
            <Dropdown.Item hidden={!onEditClik} onClick={onEditClik}>edit</Dropdown.Item>
            <Dropdown.Item hidden={!onRemoveClik} onClick={onRemoveClik} >remove</Dropdown.Item>
        </Dropdown>
    );

    return (
        <div className={`relative shadow-sm rounded-xl bg-white ${className}`} >
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
                <div hidden={!onEditClik && !onRemoveClik} className='w-full' >

                    <SizeDropdown onEditClik={onEditClik} onRemoveClik={onRemoveClik} placement="topEnd"  title="..." size="xs" style={{ position: "absolute", bottom: 1, right: 1, zIndex: 20 }} />

                </div>
                {/* <div className="p-1 py-2 flex justify-between items-center">
                    <div className='flex gap-1 items-center'>
                        <img className="border border-borderGray w-8 h-8 rounded-full" src={logo} alt='' draggable="false" />

                    </div>
                    <div className="text-xs font-semibold mt-auto gap-1" hidden={!delivery}>
                        {delivery} SR <TbTruckDelivery className='text-lg' />
                    </div>
                </div> */}
                <CheckRoundIcon hidden={!isSelected} fill='#90ee90ee' style={{ fontSize: "3em", position: "absolute", top: "30%", left: "50%", transform: "translate(-50%, -50%)" }} />
            </div>
        </div>

    );
}
