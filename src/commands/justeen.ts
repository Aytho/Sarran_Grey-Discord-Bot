import type { Command } from './index.js';

const halloweenCountdown = [
	"Tu sais qu’une citrouille peut peser plus de 1000 kg ? 🍂",
	"As-tu entendu parler du fantôme qui détestait la pluie ? Il disait toujours : 'Je ne veux pas être délavé !' 👻",
	"Fun fact : Saviez-vous que les premiers costumes d’Halloween étaient censés éloigner les mauvais esprits ? 👹",
	"Pourquoi les vampires adorent Halloween ? Parce qu'ils peuvent enfin 'compter' sur nous ! 🧛‍♂️",
	"Saviez-vous que le mot 'witch' vient du vieil anglais 'wicce' qui signifie sage ? 🧹",
	"Pourquoi les squelettes ne se battent jamais entre eux ? Ils n'ont pas de tripes ! 💀",
	"Tu savais que les chauves-souris sont les seuls mammifères capables de voler ? 🦇",
	"Quel est le plat préféré des fantômes ? Le boo-langerie ! 🥐",
	"Les araignées noires sont prêtes pour leur grand show ! 🕸️",
	"Pourquoi les vampires n'aiment pas les barbecues ? Ils ont peur des steaks ! 🍖",
	"Saviez-vous que les citrouilles sont techniquement des baies ? 🍂",
	"À ton avis, combien de bonbons peut contenir un sac sans fond ? 🍭",
	"Saviez-vous que la plus grande toile d'araignée du monde fait plus de 25 mètres de large ? 🕷️",
	"Pourquoi les fantômes détestent-ils les tempêtes ? Parce qu'ils ont peur des éclairs ! ⚡",
	"Un chaudron, un balai, et une pointe de magie... es-tu prêt pour les sorts ? ✨",
	"Saviez-vous que les citrouilles étaient autrefois utilisées pour guérir les piqûres de serpent ? 🐍",
	"Pourquoi les zombies sont-ils mauvais en mathématiques ? Parce qu'ils comptent sur leurs doigts... littéralement ! 🧠",
	"Les araignées sont prêtes à tisser leurs toiles d'effroi ! 🕷️",
	"Pourquoi les vampires sont-ils toujours en retard ? Ils se réveillent à la tombée de la nuit ! 🕛",
	"Saviez-vous que l'origine des lanternes de citrouille vient d'une vieille légende irlandaise ? 🍀",
	"Pourquoi les araignées n’ont-elles pas de réseau social ? Elles préfèrent tisser leur toile ! 🕸️",
	"Es-tu prêt à faire trembler de peur tous tes voisins ? 👀",
	"Il est temps de sortir ton balai... mais pas pour nettoyer ! 🧹",
	"Tu savais que les citrouilles sont bonnes pour les yeux ? Une bonne raison de creuser les tiennes ! 🎃",
	"Une semaine avant que les araignées sortent pour danser ! 🕷️",
	"Pourquoi les fantômes aiment les ascenseurs ? Parce qu'ils ont un faible pour les hauteurs ! 🎢",
	"Saviez-vous que les chauves-souris peuvent manger 1 000 moustiques en une heure ? 🦇",
	"Ta citrouille est-elle prête pour son grand moment de gloire ? 🍂",
	"Pourquoi les fantômes ne mentent jamais ? Parce qu'on les voit à travers ! 👀",
	"Prêt à concocter la potion parfaite ? 🔮",
	"C’est presque l’heure des frissons ! Es-tu prêt à effrayer ou à être effrayé ? 👻"
];

export default {
	data: {
		name: 'justeen',
		description: "Donne le nombre de jours qu'il reste avant Halloween",
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

		const now = new Date();

		// Calculate the date of the next Halloween
		const nextHalloweenYear = now.getFullYear() + (now.getMonth() < 9 || (now.getMonth() === 9 && now.getDate() < 31) ? 0 : 1);
		const nextHalloweenDate = new Date(`${nextHalloweenYear}-10-31T00:00:00.000Z`);

		// Calculate the time difference between now and the next Halloween
		const timeDiff = nextHalloweenDate.getTime() - now.getTime();

		// Calculate the days, hours, minutes, and seconds remaining
		const daysRemaining = Math.floor(timeDiff / (1_000 * 60 * 60 * 24));

		if(daysRemaining === 365) {
			await interaction.reply(`# [🎃](https://tenor.com/view/halloween-gif-gif-26981355) This is Halloween! 👻🕸️`,);
		} else {
			await interaction.reply(`## 🎃 Plus que ${daysRemaining} ${daysRemaining === 1 ? 'jour' : 'jours'} avant Halloween ! ${daysRemaining <= 31 ? halloweenCountdown[31 - daysRemaining] : ""}`);
		}
	},
} satisfies Command;
