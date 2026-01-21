const endpoint = "https://api.github.com/users";

export async function getdata(userName = 'Crijo-Mcal') {
    try {

        const respons = await fetch(`${endpoint}/${userName}/events`);
        const data = await respons.json();
        console.log(data[0].actor.id);


    } catch (err) {


        console.log(err);


    }

}