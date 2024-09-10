import type { Command } from './index.js';

export default {
	data: {
		name: 'otaiah',
		description: "Donne le nombre de jours qu'il reste avant la fin du travail d'Otaiah",
		// === ⚠️ FOR TESTING ⚠️ ===
		// options: [
		// 	{
		// 		name: 'date',
		// 		type: 3,
		// 		description: 'La date pour laquelle tu veux connaître le nombre de jours avant Halloween (format : YYYY-MM-DD)',
		// 		required: false,
		// 	},
		// ],
		// ==========================
	},
	async execute(interaction) {

		// === ⚠️ FOR TESTING ⚠️ ===
		// const inputDate = interaction.options.get('date');
		// let now;
		//
		// if(inputDate?.value) {
		// 	now = new Date(inputDate.value.toString());
		// } else {
		// 	now = new Date();
		// }
		// ==========================

		const frenchDate = new Date().toLocaleString('fr-FR', {
			timeZone: 'Europe/Paris',
			year: 'numeric',
			month: '2-digit',
			day: '2-digit',
			hour: '2-digit',
			minute: '2-digit',
			second: '2-digit',
		});
		const [day, month, year, hour, minute, second] = frenchDate.split(/[\s/:]/);

		const now = new Date(`${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}T${hour.padStart(2, '0')}:${minute.padStart(2, '0')}:${second.padStart(2, '0')}.000Z`);

		// Calculate the date of the next Otaiah end of job
		const nextOtaiahYear = now.getFullYear() + (now.getMonth() < 9 || (now.getMonth() === 9 && now.getDate() < 31) ? 0 : 1);
		const nextOtaiahDate = new Date(`${nextOtaiahYear}-10-31T17:00:00.000Z`);

		// Calculate the time difference between now and the next Otaiah end of job
		const timeDiff = nextOtaiahDate.getTime() - now.getTime();

		// Calculate the days, hours, minutes, and seconds remaining
		const daysRemaining = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
		const hoursRemaining = Math.floor((timeDiff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
		const minutesRemaining = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60));
		const secondsRemaining = Math.floor((timeDiff % (1000 * 60)) / 1000);

		if(daysRemaining === 365) {
			await interaction.reply(`# Otaiah est désormais en grandes vacances [🌴](https://tenor.com/view/mr-bean-mr-beans-holiday-rowan-atkinson-sea-beach-gif-14784152))️`,);
		} else {
			await interaction.reply(`## 💻 Plus que **${daysRemaining} ${daysRemaining === 1 ? 'jour' : 'jours'}**, **${hoursRemaining} ${hoursRemaining === 1 ? 'heure' : 'heures'}**, **${minutesRemaining} ${minutesRemaining === 1 ? 'minute' : 'minutes'}** et **${secondsRemaining} ${minutesRemaining === 1 ? 'seconde' : 'secondes'}** avant le début des grandes vacances d'Otaiah!`);
		}
	},
} satisfies Command;
