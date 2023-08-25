import React from 'react'
import { Stack, Grid, Button, Divider, InputGroup, Row, Col, Dropdown, AutoComplete, Avatar, PanelGroup, FlexboxGrid, Whisper, Tooltip, Modal } from "rsuite";
import { Loader } from 'rsuite';

import { MdNoFood } from 'react-icons/md';
import GroupCard from "../Group/GroupCard";

export default function Groups({ items }) {

    return items?.length > 0 ? items.map((group) => {
        return <div key={group.id} className='mb-3'>
            <GroupCard item={group} />
        </div>
    }) : <div className="flex flex-col items-center gap-2">
        <MdNoFood style={{ fontSize: "3em", width: "100%" }} />
        <div>there are no available groups</div>
    </div>
}