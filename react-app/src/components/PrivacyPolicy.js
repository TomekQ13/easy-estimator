import React from "react";
import { Container } from "react-bootstrap";
import Footer from "./Footer";

export default function PrivacyPolicy() {
    return (
        <>
            <Container>
                <h1>Privacy Policy</h1>
                <h2>1. Introduction</h2>
                <p>
                    Welcome to <strong>[Your App's Name]</strong> (the "App").
                    Your privacy is very important to us. This Privacy Policy
                    explains our practices regarding the collection, use, and
                    disclosure of information when you use our App.
                </p>

                <h2>2. No Personal Information Collected</h2>
                <p>
                    We do not collect, store, or process any personally
                    identifiable information (PII) from users of our App. This
                    means we do not require users to create accounts, provide
                    names, email addresses, or any other personal information.
                </p>

                <h2>3. Usage Data</h2>
                <p>
                    While we do not collect personal information, we may collect
                    non-personally identifiable information to improve the
                    functionality and performance of the App. This may include
                    data like:
                </p>
                <ul>
                    <li>
                        Device information (e.g., device type, operating system)
                    </li>
                    <li>
                        Usage statistics (e.g., number of app sessions, feature
                        usage)
                    </li>
                </ul>
                <p>
                    This data is collected in an anonymized manner and is used
                    solely to improve the user experience and the performance of
                    the App.
                </p>

                <h2>4. Data Security</h2>
                <p>
                    Since we do not store any personal information, we do not
                    require additional measures for the protection of personal
                    data. However, we are committed to keeping the App secure
                    and protecting any non-personal data that may be collected
                    for analytics purposes.
                </p>

                <h2>5. Changes to This Privacy Policy</h2>
                <p>
                    We may update this Privacy Policy from time to time to
                    reflect changes in our practices or for other operational,
                    legal, or regulatory reasons. Any changes will be posted on
                    this page, and we encourage users to review this policy
                    periodically.
                </p>

                <h2>6. Contact Us</h2>
                <p>
                    If you have any questions or concerns about this Privacy
                    Policy or our practices, please contact us at:
                </p>
                <ul>
                    <li>
                        Email:{" "}
                        <a href="mailto:[contact.agilepoker@gmail.com]">
                            contact.agilepoker@gmail.com
                        </a>
                    </li>
                </ul>
            </Container>
            <Footer />
        </>
    );
}
