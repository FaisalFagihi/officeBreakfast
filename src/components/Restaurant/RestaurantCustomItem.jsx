import EditIcon from '@rsuite/icons/Edit';
import TrashIcon from '@rsuite/icons/Trash';
import CheckRoundIcon from '@rsuite/icons/CheckRound';
import { TbTruckDelivery } from 'react-icons/tb';

export function VendorCustom({ name, logo, image, delivery, kitchens, promotion, minimumOrder, previewButton, editButton, removeButton, isSelected, onCardClik }) {
    return (
        <div className="relative border rounded-md border-gray-200" >
            <div className='absolute z-50 top-2 right-2 cursor-pointer' onClick={onCardClik}>
                <TrashIcon onClick={removeButton} />
            </div>
            <div onClick={previewButton}>
                <div className='relative h-32'>
                    <img className="rounded-t-md w-full object-cover h-full" src={image} alt='' draggable="false" />
                    <div className='absolute bottom-0'>

                        <div className='bg-gray-600 text-xs px-1 text-white text-ellipsis overflow-hidden whitespace-nowrap max-w-64 opacity-90' hidden={promotion == null}>
                            {promotion?.message}
                        </div>
                    </div>
                </div>

                <div className="p-1 py-2 flex justify-between items-center">
                    <div className='flex gap-1 items-center'>
                        <img className="border border-borderGray w-8 h-8 rounded-full" src={logo} alt='' draggable="false" />
                        <div className='text-sm'>
                            {name}
                        </div>
                    </div>
                    <div className="flex text-xs font-semibold mt-auto gap-1" hidden={!delivery}>
                        {delivery} SR <TbTruckDelivery className='text-lg' />
                    </div>

                </div>
            </div>
        </div>
    );
}
