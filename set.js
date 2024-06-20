const fs = require('fs-extra');
const { Sequelize } = require('sequelize');
if (fs.existsSync('set.env'))
    require('dotenv').config({ path: __dirname + '/set.env' });
const path = require("path");
const databasePath = path.join(__dirname, './database.db');
const DATABASE_URL = process.env.DATABASE_URL === undefined
    ? databasePath
    : process.env.DATABASE_URL;
module.exports = { session: process.env.SESSION_ID || 'Gifted;;;',Gifted;;;eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiMkVBU0o4NVhMZ2ZUWXp5WVpNdG53bHd3akVqa1VocEhpdWszdkVpNkRXbz0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiN0RMTExzQXprR0VIbTkzWUpYSWN2QmZlQWVWK0pNSjYzQkFFRndPendEZz0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJnQjkySm5tZVJpNHRKQW96MWhMTk5ZUmp1TXRTVmdJdGNuOW0yTStMV2trPSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJYOTlGVE9CbUJHejA2TlRoZzJMQy9HSldwb08ycVUwODVlRzI0c3c4TVRjPSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6Ik9BOXZYTmVVUVJ0MEpaaXczc2ZiNitRcW1VRElFR0RqRUE2UU8xL1kzRzA9In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6ImpQT0FkOFcyZG55Wm1wdFdpb21oWUN3Nndsd2s2SkZ3NEZ3SmptMi9GQ2M9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiRURiLzBBUzdISGpMSThRWkU4OXY3SnlORXkrSmhSMjBBeWxhdHlicEJGZz0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiYzZmL3gvSzhPNEFrRGkvQllzS1hmUXdCRXN5ZXJWYXpma3oxblpxdzdYVT0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IjM4UmVJU2pZL0FRNjdEM3FTU09OWHF3UGM5NHZMWGh3cUx0RHBhV2VSWUJYY3FrcGMwUUd3aFcrc3Fuakg2RTUzSXh0TDZIM21TOE9tOUVNUm1naERnPT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6MzEsImFkdlNlY3JldEtleSI6IlBBMTRJcUNxZ2I0MmJxRE1mYmdkUlF2YjZBdGY4a05sVXg5QVFmaFZmZjA9IiwicHJvY2Vzc2VkSGlzdG9yeU1lc3NhZ2VzIjpbXSwibmV4dFByZUtleUlkIjozMSwiZmlyc3RVbnVwbG9hZGVkUHJlS2V5SWQiOjMxLCJhY2NvdW50U3luY0NvdW50ZXIiOjAsImFjY291bnRTZXR0aW5ncyI6eyJ1bmFyY2hpdmVDaGF0cyI6ZmFsc2V9LCJkZXZpY2VJZCI6ImNIcWVQMEhqUXpxUllaUDM3VE5udFEiLCJwaG9uZUlkIjoiOWFlZDcwMGMtMDcxNC00ODdlLWI2YmYtM2IyMzI0ODZmZTAzIiwiaWRlbnRpdHlJZCI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IndkbGRWYS9VWXZ5SU9ZckYwdWw0Z0pYWkY0WT0ifSwicmVnaXN0ZXJlZCI6dHJ1ZSwiYmFja3VwVG9rZW4iOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJvQXZsb2JDR3pZU2IrYUZpTE40bWNmUTM5TlU9In0sInJlZ2lzdHJhdGlvbiI6e30sInBhaXJpbmdDb2RlIjoiRzVITlNSNDIiLCJtZSI6eyJpZCI6IjkyMzQwNDgxMjA5NzozOEBzLndoYXRzYXBwLm5ldCJ9LCJhY2NvdW50Ijp7ImRldGFpbHMiOiJDUFd4MDVvRUVLcnN6Yk1HR0F3Z0FDZ0EiLCJhY2NvdW50U2lnbmF0dXJlS2V5IjoiZjBkM2hQUG1ZaE4zcHEyTW5iUURKa05JYTVPZWp4VEd2S1l4ZCtMZUF3dz0iLCJhY2NvdW50U2lnbmF0dXJlIjoiTXJ5a2VGTjY4WWljRit1cGdlN0swa2RockdVRUVMY2NyWFFaa0Z6SjZpT212ejdqakd4YVNQUzRjeDY2cytqMXN4Y1QvUkUyRTdKQ28yNFFpcllxRGc9PSIsImRldmljZVNpZ25hdHVyZSI6IkR4elZFa24yLzRxaXNOVGpkSUoxaEdRUHJoRFAwYlBOL3d3NGl5QnAxZkhlM2RWMDc0MHVhby85QUdZOWFWN05xQ1hIOW9LZ3RrZERnQUh3YmZHWUJ3PT0ifSwic2lnbmFsSWRlbnRpdGllcyI6W3siaWRlbnRpZmllciI6eyJuYW1lIjoiOTIzNDA0ODEyMDk3OjM4QHMud2hhdHNhcHAubmV0IiwiZGV2aWNlSWQiOjB9LCJpZGVudGlmaWVyS2V5Ijp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiQlg5SGQ0VHo1bUlUZDZhdGpKMjBBeVpEU0d1VG5vOFV4cnltTVhmaTNnTU0ifX1dLCJwbGF0Zm9ybSI6ImFuZHJvaWQiLCJsYXN0QWNjb3VudFN5bmNUaW1lc3RhbXAiOjE3MTg4NDI5Mzd9
    PREFIXE: process.env.PREFIX || ".",
    OWNER_NAME: process.env.OWNER_NAME || "Gifted Tech",
    NUMERO_OWNER : process.env.OWNER_NUMBER || "923404812097,3024806614", 
             
    AUTO_READ_STATUS: process.env.AUTO_READ_STATUS || "yes",
AUTOREAD_MESSAGES: process.env.AUTO_READ_MESSAGES || "yes",
CHATBOT: process.env.CHAT_BOT || "no",
    AUTO_DOWNLOAD_STATUS: process.env.AUTO_DOWNLOAD_STATUS || 'no',
    BOT : process.env.BOT_NAME || 'ɢɪғᴛᴇᴅ-ᴍᴅ',
    OPENAI_API_KEY : process.env.OPENAI_API_KEY || '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',
    URL : process.env.BOT_MENU_LINKS || 'https://telegra.ph/file/a202f454c9532c3f5b7f8.jpg',
    MODE: process.env.PUBLIC_MODE || "yes",
    PM_PERMIT: process.env.PM_PERMIT || 'no',
    HEROKU_APP_NAME : process.env.HEROKU_APP_NAME,
    HEROKU_APY_KEY : process.env.HEROKU_API_KEY ,
    WARN_COUNT : process.env.WARN_COUNT || '5' ,
    PRESENCE : process.env.PRESENCE || 'online',
    //GPT : process.env.OPENAI_API_KEY || '',
    DP : process.env.STARTING_BOT_MESSAGE || "yes",
    ADM : process.env.ANTI_DELETE_MESSAGE || 'yes',
    DATABASE_URL,
    DATABASE: DATABASE_URL === databasePath
        ? "postgres://db_7xp9_user:6hwmTN7rGPNsjlBEHyX49CXwrG7cDeYi@dpg-cj7ldu5jeehc73b2p7g0-a.oregon-postgres.render.com/db_7xp9" : "postgres://db_7xp9_user:6hwmTN7rGPNsjlBEHyX49CXwrG7cDeYi@dpg-cj7ldu5jeehc73b2p7g0-a.oregon-postgres.render.com/db_7xp9",
    /* new Sequelize({
     dialect: 'sqlite',
     storage: DATABASE_URL,
     logging: false,
})
: new Sequelize(DATABASE_URL, {
     dialect: 'postgres',
     ssl: true,
     protocol: 'postgres',
     dialectOptions: {
         native: true,
         ssl: { require: true, rejectUnauthorized: false },
     },
     logging: false,
}),*/
};
let fichier = require.resolve(__filename);
fs.watchFile(fichier, () => {
    fs.unwatchFile(fichier);
    console.log(`mise à jour ${__filename}`);
    delete require.cache[fichier];
    require(fichier);
});

