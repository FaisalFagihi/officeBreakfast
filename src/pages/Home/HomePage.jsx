
import { useEffect, useState } from "react";
import Groups from "../Group/Groups";
import JoinToGroup from "../Group/JoinToGroup";
import { Divider, Loader } from 'rsuite';
import groupController from "../../controller/groupController";
import Fatch from "../../Helpers/Fatcher";
import userController from "../../controller/userController";
import { LeadersTable } from "../Group/UsersTable";
import { Panel } from "../../style/Style";


export default function HomePage() {
    const [groups, setGroups] = useState([]);
    const [leaders, setLeaders] = useState([]);
    const [leadersReload, setLeadersReload] = useState(false);
    const [groupsReload, setGroupsReload] = useState(false);


    return (
        <div>
            <Fatch request={groupController.getAllGroups} setData={setGroups} reload={groupsReload}>
                <Groups items={groups} />
            </Fatch>

            {(groups?.length < 1) ? <div className='flex justify-start text-lg' >
                join to a leader
            </div> : <></>}
            <JoinToGroup onJoin={() => { setLeadersReload(!leadersReload) }} />


            <Panel header='Leaders' className='pt-4'>
                <Fatch request={userController.getOwners} setData={setLeaders} reload={leadersReload}>
                    <LeadersTable items={leaders} onAction={() => setLeadersReload(!leadersReload)} />
                </Fatch>

            </Panel>

            <br />

        </div>
    );
}
