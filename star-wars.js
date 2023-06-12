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
					console.log(
						`Episode: ${filmInfo.episode}\nDirector: ${filmInfo.director}\nRelease date: ${filmInfo.release_date}`
					);
					askCategory(answers.film);
				});
		});
	}

	function askCategory(filmChoice) {
		const categoryQuestion = [
			{
				type: "list",
				name: "category",
				message: "What would you like to view?",
				choices: ["Characters", "Planets", "Starships", "Species", "Vehicles"],
			},
		];

		return inquirer.prompt(categoryQuestion).then((answers) => {
			axios
				.get(`https://swapi.dev/api/films?search=${filmChoice}`)
				.then((response) => {
					const categoryInfo =
						response.data.results[0][answers.category.toLowerCase()];
					switch (answers.category.toLowerCase()) {
						case "characters":
							axios
								.get(categoryInfo.map((link) => `${link}`))
								.then((response) => characters(response.data.results[0].name));
							break;
						case "planets":
							planets(categoryInfo);
							break;
						case "starships":
							starships(categoryInfo);
							break;
						case "species":
							species(categoryInfo);
							break;
						case "vehicles":
							vehicles(categoryInfo);
							break;
					}
				});
		});
	}

	function characters(characterList) {
		console.log(characterList);
		const characterQuestion = [
			{
				type: "list",
				name: "character",
				message: "Which character are you interested in?",
				choices: [], // setup characterQuestion THEN continue
			},
		];
		axios
			.get(characterList.forEach((link) => `${link}`))
			.then((response) =>
				characterQuestion.choices.push(response.data.results[0].name)
			)
			.then(
				inquirer.prompt(characterQuestion).then((answers) => {
					axios
						.get(`https://swapi.dev/api/people?search=${answers.character}`)
						.then((response) => {
							characterInfo = {
								name: response.data.results[0].name,
								height: response.data.results[0].height,
								mass: response.data.results[0].mass,
								hairColor: response.data.results[0].hair_color,
								skinColor: response.data.results[0].skin_color,
								eyeColor: response.data.results[0].eye_color,
								birthYear: response.data.results[0].birth_year,
								gender: response.data.results[0].gender,
								homeworld: response.data.results[0].homeworld,
							};
							console.log(
								`Name: ${characterInfo.name}\nHeight: ${characterInfo.height}cm\nMass: ${characterInfo.mass}kg\nHair color: ${characterInfo.hairColor}\nSkin color: ${characterInfo.skinColor}\nEye color: ${characterInfo.eyeColor}\nBirth year: ${characterInfo.birthYear}\nGender: ${characterInfo.gender}\nHomeworld: ${characterInfo.homeworld}`
							);
						});
				})
			);
	}

	function planets(filmChoice) {}

	function starships(filmChoice) {}

	function species(filmChoice) {}

	function vehicles(filmChoice) {}

	askFilm();
}

starWars();
