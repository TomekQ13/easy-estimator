import React, { useContext, useEffect, useState } from "react";
import JoinSessionBtn from "./JoinSessionBtn";
import NewSessionBtn from "./NewSessionBtn";
import JoinSessionModal from "./JoinSessionModal";
import { authContext } from "../contexts/Auth";
import Container from "react-bootstrap/esm/Container";
import StepCard from "./StepCard";
import Step1GIF from "../pictures/step1-jpg.gif";
import Step2GIF from "../pictures/step2-jpg.gif";
import Step3GIF from "../pictures/step3-jpg.gif";

export default function EntryMeny() {
    const [joinSessionModal, setJoinSessionModal] = useState({ show: false });

    const { username, setRegisterModal, userId } = useContext(authContext);

    useEffect(() => {
        if (
            username === null ||
            username === undefined ||
            userId === null ||
            userId === undefined
        ) {
            setRegisterModal({ show: true });
        }
    }, [username, setRegisterModal, userId]);

    return (
        <>
            <Container className="vh-75 d-flex flex-column justify-content-start align-items-center">
                <div className="header-section">
                    <h1 className="main-header text-center">
                        The Estimation Poker for all your planning needs
                    </h1>
                    <p className="text-center mt-3 subtitle-text">
                        The simplest estimation tool for development teams
                    </p>
                </div>
                <div className="button-section">
                    <NewSessionBtn />

                    <JoinSessionBtn setJoinSessionModal={setJoinSessionModal} />
                    {joinSessionModal.show && (
                        <JoinSessionModal
                            setJoinSessionModal={setJoinSessionModal}
                            joinSessionModal={joinSessionModal}
                        />
                    )}
                </div>
                <div className="how-to-section">
                    <h2 className="section-header">
                        Start now with these 3 easy steps
                    </h2>
                    <div className="how-to-section-steps">
                        <StepCard
                            pictureSource={Step1GIF}
                            text="Start a new session"
                        />
                        <StepCard
                            pictureSource={Step2GIF}
                            text="Send the URL to your team"
                        />
                        <StepCard
                            pictureSource={Step3GIF}
                            text="Vote and discuss your estimates"
                        />
                    </div>
                </div>
                {/* <div className="pro-section">
                    <div className="pro-item-section pro-item-section-left">
                        <div>
                            <h2 className="pro-item-section-title">
                                Estimate live with your team
                            </h2>
                            <small className="subtitle-text">
                                Lorem Ipsum is simply dummy text of the printing
                                and typesetting industry.
                            </small>
                        </div>
                        <img
                            src={proImage}
                            width="700"
                            height="400"
                            className="pro-image"
                        ></img>
                    </div>
                    <div className="pro-item-section pro-item-section-right">
                        <div>
                            <h2 className="pro-item-section-title">
                                Get a clear summary of the votes
                            </h2>
                            <small className="subtitle-text">
                                Lorem Ipsum has been the industry's standard
                                dummy text ever since the 1500s
                            </small>
                        </div>
                        <img
                            src={proImage}
                            width="700"
                            height="400"
                            className="pro-image"
                        ></img>
                    </div>
                    <div className="pro-item-section pro-item-section-left">
                        <div>
                            <h2 className="pro-item-section-title">
                                Free now and forever
                            </h2>
                            <small className="subtitle-text">
                                when an unknown printer took a galley of type
                                and scrambled it to make a type specimen book
                            </small>
                        </div>
                        <img
                            src={proImage}
                            width="700"
                            height="400"
                            className="pro-image"
                        ></img>
                    </div>
                    <div className="pro-item-section pro-item-section-right">
                        <div>
                            <h2 className="pro-item-section-title">
                                Estimate on the go
                            </h2>
                            <small className="subtitle-text">
                                It has survived not only five centuries
                            </small>
                        </div>
                        <img
                            src={proImage}
                            width="700"
                            height="400"
                            className="pro-image"
                        ></img>
                    </div>
                </div> */}
                <footer className="footer mt-4">
                    <Container>
                        <div className="footer-menu">
                            <div className="footer-link">FAQ</div>
                            <div className="footer-link">Contact</div>
                            <div className="footer-link">Privacy policy</div>
                        </div>
                    </Container>
                </footer>
            </Container>
        </>
    );
}
