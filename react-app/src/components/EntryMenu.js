import React, {useState} from 'react'
import Card from './Card'
import JoinSessionBtn from "./JoinSessionBtn";
import NewSessionBtn from './NewSessionBtn'
import NewSessionModal from './NewSessionModal';
import JoinSessionModal from './JoinSessionModal';

export default function EntryMeny() {
    const [newSessionModal, setNewSessionModal] = useState({ show: false })
    const [joinSessionModal, setJoinSessionModal] = useState({ show: false })

    return (
        <>
            <Card>
                <NewSessionBtn setNewSessionModal={setNewSessionModal} />
                <JoinSessionBtn setJoinSessionModal={setJoinSessionModal}/>
            </Card>
            { newSessionModal.show && <NewSessionModal setNewSessionModal={setNewSessionModal}/>}
            { joinSessionModal.show && <JoinSessionModal setJoinSessionModal={setJoinSessionModal}/>}
        </>
    )
}