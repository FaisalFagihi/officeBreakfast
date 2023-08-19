import { Row, Col, Panel } from "rsuite";

export function MenuItem({ name, price, calories, photo, onClick }) {
    const caloriesContent = (calories != null) ? < div className="Calories"  >
        {calories}
    </div > : <></>
    return (
        // <div bodyFill bordered  className="w-full" style={{ height: 120, borderColor: "#f1f1f1", borderRadius: 10 }}>
        <div className="flex justify-between w-full border border-[#f1f1f1] rounded-md h-30 " onClick={onClick}>
            <div className="absolute">

                {caloriesContent}
            </div>

            <img draggable="false" className="MenuItemImage !rounded-l-md" src={photo} alt="" onDragStart={(e) => e.preventDefault()} />
            <div className="flex flex-col justify-between p-2 ">
                <div>
                    {name}
                </div>
                <div className="text-right font-bold">
                    {price} SR
                </div>
            </div>

        </div>

    );
}
