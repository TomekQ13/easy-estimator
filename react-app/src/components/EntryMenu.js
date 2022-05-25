import React, {useEffect, useState} from 'react'
import Card from './Card'
import JoinSessionBtn from "./JoinSessionBtn";
import NewSessionBtn from './NewSessionBtn'
import NewSessionModal from './NewSessionModal';
import JoinSessionModal from './JoinSessionModal';
import RegisterModal from './RegisterModal';
import Cookies from 'universal-cookie';

export default function EntryMeny() {
    const [newSessionModal, setNewSessionModal] = useState({ show: false })
    const [joinSessionModal, setJoinSessionModal] = useState({ show: false })
    const [registerModal, setRegisterModal] = useState({ show: false })

    function checkForUsername() {
        const cookies = new Cookies()
        console.log(cookies)

        if (cookies.get('username')) return true
        return false
    }

    useEffect(() => {
        if (checkForUsername() === false) {
            setRegisterModal({ show: true })
        }
    }, [])


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
            { registerModal.show && <RegisterModal setRegisterModal={setRegisterModal}/>}
        </>
    )
}