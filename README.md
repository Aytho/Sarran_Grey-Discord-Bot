
![Logo](https://static-cdn.jtvnw.net/jtv_user_pictures/c514fd68-e9c0-4577-9bfd-39bdae6eca1b-profile_banner-480.jpeg)


# Discord bot of [Sarran_Grey](https://www.twitch.tv/sarran_grey)
This bot is used for the Discord server of the French Twitch streamer [Sarran_Grey](https://www.twitch.tv/sarran_grey).




## Installation

⚠️ **Node.js 16.11.0** or newer is required.

### 1. Download the Project

Start by downloading the project folders and files into a directory of your choice.

If you have Git installed, you can do this command :
```bash
git clone https://github.com/Aytho/Sarran_Grey---Discord-Bot bot-folder-name
```

### 2. Navigate to the Directory

Open a terminal and navigate to the directory where your project is located:

```bash
cd your/path/to/folder
```

### 3. Install Dependencies

Next, run the following commands to install dependencies and build the project:

```bash
  npm install
  npm run build
```

⚠️ Don't close the terminal, we will use it later.
### 4. Creating a discord bot

1. First, go to [Discord's Developer Portal](https://discord.com/developers/applications) and click "New Application":

   ![The "new application" button can be found in the top right of the developer portal page](https://i.imgur.com/hQ8AxNn.png)

2. Now give your app a name, read and accept the linked terms of service, and click create.

   ![New application form, with a box to input the app's name](https://imgur.com/aIkiaDU.png)

   On the new screen you will be able to change your app profile image, app description and several other details.

   ![The "general information" page of a discord app user shows a selection box for the app icon and a name and description form](https://imgur.com/B7dkKpX.png)

3. Go to 'Bot' tab and customize your bot.
4. Check these checkbox ![Privileged Gateway Intents checkbox](https://images.ctfassets.net/a364c9khexw9/3EU2g4bryuotzbkocgq6gE/e2b7630e783ac07157f2ed959cf81995/Picture_2.png) and save changes.


### 5. Adding your bot to your server

Now it's time to invite your bot to your server! Don't worry about the bot being up and running for this next step.

1. First, fetch your app's "Application ID" back from the "General information" tab:

   ![Your app's ID can be found under the name and description boxes of "General Information"](https://imgur.com/OnL9ELT.png)

2. Head to the following URL, replacing `YOUR_APP_ID_HERE` with the ID you grabbed above: `https://discord.com/oauth2/authorize?client_id=YOUR_APP_ID_HERE&permissions=414464691264&integration_type=0&scope=applications.commands+bot`

   ([more information can be found about this URL in Discord's developer docs](https://discord.com/developers/docs/topics/oauth2#bots))

3. You'll be presented with a consent dialog, explaining what's necessary to attach the bot to your server. Please read this carefully, then select the right server from the dropdown, and click Authorize!

   ![The consent dialog provides some information about the application and you, and explains that you need "Manage Servers" permission to add the bot to a server](https://imgur.com/HcFRX1w.png)

   Next, you have a summary of the permissions you grant to the bot on your discord server. Click on the "Authorize" button if you agree to this

   ![The authorized panel presents no additional information and can be safely closed](https://imgur.com/plpzBcP.png)

### 6. Token security

**IMPORTANT**: you should NEVER give your bot's token to anybody you do not trust, and especially never publish it in a public location, such as a Git repo. The token gives **full access** to your bot account, and a malicious actor could use it to hijack the bot (ranging from the irritating – such as leaving all your servers, and breaking your bridge – to the much more serious – such a spamming unfavorable links or deleting messages and channels in servers where it has moderator permissions). **Keep your token secret!**

However, if your token ever does get compromised or you suspect it has been, not all is lost: the very first thing you should do is [go to your Discord Apps page](https://discord.com/developers/applications), select the relevant bot, and then under the "Bot" tab of the left sidebar, **regenerate the token** in the same location you originally accessed the token. This will give you a brand-new unique token that you can update in your bot's config.

![The "bot token" panel, same as in the "Fetching your bot's token" header above](https://imgur.com/5AXfSOp.png)

### 7. Edit configuration

Go back to your bot folder and copy the `.env.example` to `.env` and edit it :
- `DISCORD_TOKEN` is the token of your discord bot.
- `CLIENT_ID` is the ID of your discord bot application (Application ID).
- `GUILD_ID` is the ID of your discord server.

### 4. Start the Bot

Finally, start your bot using the following command:

```bash
  npm run deploy
  npm run start
```
## Authors

- [@Aytho](https://www.github.com/aytho)
- [@Otaiah](https://www.github.com/otaiah)