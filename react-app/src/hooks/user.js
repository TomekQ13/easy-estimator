import useFetch from "./useFetch";

export function useCreateUser() {
    const fetchWrapper = useFetch(false);

    function registerUser({ username, sessionId }) {
        return fetchWrapper({
            url: "/user/register",
            method: "POST",
            body: {
                username,
                sessionId,
            },
        })
            .then((response) => {
                if (response.status === 201) {
                    console.log("User registered successfully");
                    return response.json();
                }

                if (
                    response.status === 403 ||
                    response.status === 404 ||
                    response.status === 400
                )
                    return console.error(
                        "Received an error while registering a user"
                    );
            })
            .catch((error) => {
                console.error(
                    "There was an error while registering a user " + error
                );
                return undefined;
            });
    }

    return registerUser;
}
