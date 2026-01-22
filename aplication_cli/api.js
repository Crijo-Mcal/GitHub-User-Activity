
const endpoint = "https://api.github.com/users";

export async function getData(userName) {


    try {


        await checkUserExists(userName);

        const events = await getUserEvents(userName)


        if (events.length === 0) {
            console.log("No public events found.");
            return;
        }

        console.log('\n', `ACTIVITY OF USERNAME : "${userName}"`, '\n');


        for (const event of events) {
            switch (event.type) {

                case 'IssuesEvent':
                    console.log(
                        `- ${event.payload.action} an issue in ${event.repo.name}`
                    );
                    break;

                case 'PublicEvent':
                    console.log(
                        `- Made the repository public: ${event.repo.name}`
                    );
                    break;

                case 'CreateEvent':
                    console.log(
                        `- Created a new branch in repository: ${event.repo.name}`
                    );
                    break;

                case 'PullRequestEvent':
                    console.log(
                        `- ${event.payload.action} pull request "${event.payload.pull_request.title}" in ${event.repo.name}`
                    );
                    break;

            }
        }

    } catch (err) {
        console.log(err.message);
    }

}

/* fetch events if user exists */
export async function getUserEvents(username) {
    const response = await fetch(`${endpoint}/${username}/events`);

    if (!response.ok) {
        throw new Error("Failed to fetch user events");
    }

    return await response.json();
}

/* handle error */
async function checkUserExists(userName) {

    /* handle error */
    const userResponse = await fetch(`https://api.github.com/users/${userName}`)


    if (userResponse.status === 404) {
        throw new Error('user name not found')
    }

    if (!userResponse.ok) {
        throw new Error("Failed to connect to GitHub API");
    }

}
