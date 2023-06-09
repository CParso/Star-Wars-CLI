const inquirer = require("inquirer");
const axios = require("axios");
const fs = require("fs/promises");
const path = require("path");

function starWars() {
	function askFilm() {
		const filmQuestion = [
			{
				type: "list",
				name: "film",
				message: "Which film would you like to know more about?",
				choices: [
					"A New Hope",
					"The Empire Strikes Back",
					"Return of the Jedi",
					"The Phantom Menace",
					"Attack of the Clones",
					"Revenge of the Sith",
				],
			},
		];

		return inquirer.prompt(filmQuestion).then((answers) => {
			axios
				.get(`https://swapi.dev/api/films?search=${answers.film}`)
				.then((response) => {
					const filmInfo = {
						episode: response.data.results[0].episode_id,
						director: response.data.results[0].director,
						release_date: response.data.results[0].release_date,
					};
					console.log(JSON.stringify(filmInfo, null, 2));
				});
		});
	}
	askFilm();
}

starWars();
