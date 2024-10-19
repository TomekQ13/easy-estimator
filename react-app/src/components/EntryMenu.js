import React from "react";
import JoinSessionBtn from "./JoinSessionBtn";
import NewSessionBtn from "./NewSessionBtn";
import Container from "react-bootstrap/esm/Container";
import StepCard from "./StepCard";
import Step1GIF from "../pictures/step1-jpg.gif";
import Step2GIF from "../pictures/step2-jpg.gif";
import Step3GIF from "../pictures/step3-jpg.gif";
import Footer from "./Footer";

export default function EntryMeny() {
    return (
        <>
            <Container className="d-flex flex-column justify-content-start align-items-center main-container">
                <div>
                    <h1 className="main-header text-center">
                        The Estimation Poker for all your planning needs
                    </h1>
                    <p className="text-center mt-3 subtitle-text">
                        The simplest estimation tool for agile teams
                    </p>
                </div>
                <div className="button-section">
                    <NewSessionBtn />
                    <JoinSessionBtn />
                </div>
                <div className="steps-section mb-2">
                    <h2 className="section-header text-center">
                        Start now with these 3 easy steps
                    </h2>
                    <div className="how-to-section-steps">
                        <StepCard
                            pictureSource={Step1GIF}
                            alt="How to start instruction step 1. Start a new estimation session by click New session button"
                            text="Start a new session"
                        />
                        <StepCard
                            pictureSource={Step2GIF}
                            alt="How to start instruction step 2. Copy the estimation session URL and send it to your team"
                            text="Send the URL to your team"
                        />
                        <StepCard
                            pictureSource={Step3GIF}
                            alt="How to start instruction step 3. Vote and discuss the estimations"
                            text="Vote and discuss your estimates"
                        />
                    </div>
                </div>

                <Footer />
            </Container>
        </>
    );
}
