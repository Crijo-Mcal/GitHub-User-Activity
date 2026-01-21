import { getData } from "./api.js";
const argv = process.argv.slice(2);


if (argv[0] == "github-activity") {
    getData(argv[1]);

}