import React, {useContext, useEffect, useState} from 'react'
import Card from './Card'
import JoinSessionBtn from "./JoinSessionBtn";
import NewSessionBtn from './NewSessionBtn'
import NewSessionModal from './NewSessionModal';
import JoinSessionModal from './JoinSessionModal';
import RegisterModal from './RegisterModal';
import { authContext } from '../contexts/Auth'

export default function EntryMeny() {
    const [newSessionModal, setNewSessionModal] = useState({ show: false })
    const [joinSessionModal, setJoinSessionModal] = useState({ show: false })

    const { username, setRegisterModal } = useContext(authContext)

    useEffect(() => {
        if (username === null || username === undefined) {
            setRegisterModal({ show: true })
        }
    }, [username, setRegisterModal])


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