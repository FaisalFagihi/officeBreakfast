
import { useEffect, useState } from "react";
import Groups from "../Group/Groups";
import JoinToGroup from "../Group/JoinToGroup";
import { Divider, Loader } from 'rsuite';
import groupController from "../../controller/groupController";
import Fatch from "../../Helpers/Fatcher";
import userController from "../../controller/userController";
import { LeadersTable } from "../Group/UsersTable";
import { Panel } from "../../style/Style";
import { AiOutlineWarning } from "react-icons/ai";


export default function HomePage() {
    const [groups, setGroups] = useState([]);
    const [leaders, setLeaders] = useState([]);
    const [leadersReload, setLeadersReload] = useState(false);
    const [groupsReload, setGroupsReload] = useState(false);

    const warning = <div className='flex justify-center '>
        <div className='flex  items-center gap-1 mb-1 bg-white rounded-full px-2'>
            <AiOutlineWarning size={16} />
            <div className='text-gray-400 font-light text-center text-sm'>Delivery cost and items prices might be changed based on the actual receipt</div>
        </div>
    </div>
    return (
        <div className="flex flex-col gap-2">
                        <div>{warning}</div>

            <Panel header='Groups' className='!p-0 !bg-transparent' shaded={false} hidden={!leaders.length > 0}>
                <Fatch request={groupController.getAllGroups} setData={setGroups} reload={groupsReload || leadersReload}>
                    <Groups items={groups} />
                </Fatch>
            </Panel>
            {/* <Divider /> */}

            <Panel header='Volunteers' className='!p-0  !bg-transparent' shaded={false} >
                <Fatch request={userController.getOwners} setData={setLeaders} reload={leadersReload}>
                    <LeadersTable items={leaders} onAction={() => setLeadersReload(!leadersReload)} />
                </Fatch>

            </Panel>

            <div className="mx-2">
                <JoinToGroup onJoin={() => { setLeadersReload(!leadersReload) }} />
            </div>

        </div>
    );
}
