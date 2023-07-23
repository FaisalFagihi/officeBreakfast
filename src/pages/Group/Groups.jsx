import React from 'react'
import { Stack, Grid, Button, Divider, InputGroup, Row, Col, Dropdown, AutoComplete, Avatar, PanelGroup, FlexboxGrid, Whisper, Tooltip, Modal } from "rsuite";
import { Loader } from 'rsuite';

import { MdNoFood } from 'react-icons/md';
import GroupCard from "../Group/GroupCard";

export default function Groups({ items }) {

    return items?.map((group) => {
        return <div key={group.id} className='my-3'>
            <GroupCard item={group} />
        </div>
    })
}
