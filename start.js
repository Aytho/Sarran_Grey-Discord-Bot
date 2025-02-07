import { Client, Events, GatewayIntentBits } from 'discord.js';
import fs from 'fs';

// Initialiser le client Discord
const client = new Client({
	intents: [GatewayIntentBits.Guilds],
});

// Chemin vers le fichier JSON contenant les événements
const EVENTS_FILE = './events.json';

/**
 * Fonction pour lire les événements existants à partir du fichier JSON
 * @returns {any|*[]}
 */
function readEventsFromFile() {
	if (fs.existsSync(EVENTS_FILE)) {
		const data = fs.readFileSync(EVENTS_FILE);
		return JSON.parse(data);
	}
	return [];
}

/**
 * Fonction pour écrire les événements dans le fichier JSON
 * @param events
 */
function writeEventsToFile(events) {
	fs.writeFileSync(EVENTS_FILE, JSON.stringify(events, null, 2));
}

/**
 * Fonction pour vérifier si un événement existe déjà et s'il est valide
 * @param events
 * @param title
 * @returns {*|null}
 */
function checkExistingEvent(events, title) {
	const existingEvent = events.find(event => event.name === title);
	const currentTime = new Date();

	if (existingEvent) {
		const eventEndTime = new Date(existingEvent.scheduledEndTimestamp);
		// Vérifiez si l'événement a déjà terminé
		if (eventEndTime <= currentTime) {
			console.log(`L'événement "${title}" a déjà terminé. Création d'un nouvel événement...`);
			return null; // Indique que l'événement doit être remplacé
		} else {
			console.log(`L'événement "${title}" existe déjà avec l'ID : ${existingEvent.id}`);
			return existingEvent; // Retourne l'événement existant
		}
	}
	return null; // Aucun événement existant
}

/**
 * Fonction pour créer un nouvel événement
 * @param guild
 * @param title
 * @param game
 * @returns {Promise<GuildScheduledEvent<>>}
 */
async function createEvent(guild, title, game) {
	const event = await guild.scheduledEvents.create({
		name: title,
		description: game,
		scheduledStartTime: new Date(Date.now()), // Heure de début
		scheduledEndTime: new Date(Date.now() + 10800000), // 3 heures
		privacyLevel: 2, // GUILD_ONLY
		entityType: 3, // EXTERNAL
		entityMetadata: {
			location: process.env.TWITCH_CHANNEL_URL,
		},
	});

	console.log(`Événement créé : ${event.name}`);
	return event; // Retourne l'événement créé
}


/**
 * Fonction pour changer l'icône du serveur
 * @param guild
 * @returns {Promise<void>}
 */
async function updateServerIcon(guild) {
	try {
		const iconPath = process.env.LIVE_ON_ICON;
		if (fs.existsSync(iconPath)) {
			const iconBuffer = fs.readFileSync(iconPath);
			await guild.setIcon(iconBuffer);
			console.log('Icône du serveur mise à jour avec succès.');
		} else {
			console.error(`Le fichier d'icône "${iconPath}" n'existe pas.`);
		}
	} catch (error) {
		console.error(`Erreur lors de la mise à jour de l'icône du serveur : ${error.message}`);
	}
}

// Événement déclenché lorsque le client est prêt
client.once(Events.ClientReady, async () => {
	const guild = await client.guilds.fetch(process.env.GUILD_ID);
	const title = process.argv[2] || process.env.DEFAULT_TITLE;
	const game = process.argv[3] || '';

	// Lire les événements existants
	let events = readEventsFromFile();

	// Vérifier si un événement avec le même nom existe déjà
	const existingEvent = checkExistingEvent(events, title);

	// Si un événement existant a été trouvé, le supprimer
	if (existingEvent === null) {
		// Vider le tableau d'événements
		events = [];
		writeEventsToFile(events); // Écrire un tableau vide
	} else {
		await client.destroy();
		return; // Ne pas créer un nouvel événement
	}

	// Créer un nouvel événement
	const newEvent = await createEvent(guild, title, game);

	// Ajouter le nouvel événement au fichier JSON
	events.push({
		id: newEvent.id,
		name: newEvent.name,
		scheduledStartTimestamp: newEvent.scheduledStartTimestamp,
		scheduledEndTimestamp: newEvent.scheduledEndTimestamp,
	});
	writeEventsToFile(events);

	// Changer l'icône du serveur
	await updateServerIcon(guild);

	await client.destroy();
});

// Connexion au client
void client.login(process.env.DISCORD_TOKEN);