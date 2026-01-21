
const endpoint = "https://api.github.com/users";

export async function getdata(userName) {

    /* handle error */
    try {

        const respons = await fetch(`https://api.github.com/users/${userName}`)
        if (respons.status == '404') {
            throw new Error('user name not found')
        }

    } catch (err) {
        console.log(err.message);

    }


    /* fetcht data if exist */
    try {

        const respons = await fetch(`${endpoint}/${userName}/events`);
        const dataServer = await respons.json();


        for (const data of dataServer) {


            if (data.type == 'IssuesEvent') {
                console.log('\n', `-Opened a new issue in ${data.repo.name}`, '\n');
            }

            if (data.type === 'PublicEvent') {
                console.log('\n', `-Made the repository public: ${data.repo.name}`, '\n');
            }


        }


    } catch (err) {


        console.log(err);


    }

}


