
const endpoint = "https://api.github.com/users";

export async function getData(userName) {

    /* handle error */
    try {



    } catch (err) {
        console.log(err.message);

    }


    /* fetcht event if exist */
    try {

        const userResponse = await fetch(`https://api.github.com/users/${userName}`)
        if (userResponse.status === 404) {
            throw new Error('user name not found')
        }

        const eventsResponse = await fetch(`${endpoint}/${userName}/events`);
        const events = await eventsResponse.json();


        for (const event of events) {


            if (event.type == 'IssuesEvent') {
                console.log('\n', `- Opened a new issue in ${event.repo.name}`, '\n');
            }

            if (event.type === 'PublicEvent') {
                console.log('\n', `- Made the repository public: ${event.repo.name}`, '\n');
            }

            if (event.type === 'CreateEvent') {
                console.log('\n', `- Create new Branch in repository: ${event.repo.name}`, '\n');
            }


        }


    } catch (err) {


        console.log(err);


    }

}


