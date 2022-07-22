import React, {useEffect, useState} from 'react'
import Card from './Card'
import JoinSessionBtn from "./JoinSessionBtn";
import NewSessionBtn from './NewSessionBtn'
import NewSessionModal from './NewSessionModal';
import JoinSessionModal from './JoinSessionModal';
import { getUsernameFromLS } from '../contexts/Auth';

export default function EntryMeny({ username }) {
    const [newSessionModal, setNewSessionModal] = useState({ show: false })
    const [joinSessionModal, setJoinSessionModal] = useState({ show: false })

    if (username === null) {
        setRegisterModal({ show: true })
    }

    return (
        <>
            <Card>
                <NewSessionBtn setNewSessionModal={setNewSessionModal} />
                <JoinSessionBtn setJoinSessionModal={setJoinSessionModal}/>
            </Card>
            { newSessionModal.show && 
                <NewSessionModal
                    setNewSessionModal = { setNewSessionModal }
                />
            }
            { joinSessionModal.show && 
                <JoinSessionModal
                    setJoinSessionModal = { setJoinSessionModal }
                />
            }
            
        </>
    )
}