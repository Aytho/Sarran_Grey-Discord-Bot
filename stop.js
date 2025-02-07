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
 * Fonction pour supprimer un événement de Discord
 * @param guild
 * @param eventId
 * @returns {Promise<void>}
 */
async function deleteEvent(guild, eventId) {
	try {
		const event = await guild.scheduledEvents.fetch(eventId);
		await event.delete();
		console.log(`Événement supprimé : ${event.name}`);
	} catch (error) {
		console.error(`Erreur lors de la suppression de l'événement : ${error.message}`);
	}
}

/**
 * Fonction pour changer l'icône du serveur
 * @param guild
 * @returns {Promise<void>}
 */
async function updateServerIcon(guild) {
	try {
		const iconPath = process.env.LIVE_OFF_ICON; // Chemin vers l'icône
		if (fs.existsSync(iconPath)) {
			const iconBuffer = fs.readFileSync(iconPath); // Lire le fichier d'icône
			await guild.setIcon(iconBuffer); // Changer l'icône du serveur
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

	// Lire les événements existants
	let events = readEventsFromFile();

	// Vérifier s'il y a un événement à supprimer
	if (events.length > 0) {
		const eventId = events[0].id; // Supposer qu'il n'y a qu'un événement
		await deleteEvent(guild, eventId); // Supprimer l'événement de Discord

		// Réinitialiser le tableau d'événements
		events = [];
		writeEventsToFile(events); // Écrire un tableau vide
		console.log('Événement supprimé du fichier JSON.');
	} else {
		console.log('Aucun événement à supprimer.');
	}

	// Changer l'icône du serveur
	await updateServerIcon(guild);

	await client.destroy(); // Détruire le client après l'exécution
});

// Connexion au client
void client.login(process.env.DISCORD_TOKEN);