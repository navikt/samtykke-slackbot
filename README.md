# samtykke-slackbot
Slack bot for NAV's digital samtykkeløsning for brukertester som varsler NAV ansatte på Slack om hendelser relatert til deres samtykke. Botten avhenger av Slack sitt API bibliotek, [bolt-js](https://github.com/SlackAPI/bolt-js) for å sende meldinger på Slack.

Botten fungerer som et REST API som mottar meldinger via HTTP kall og ber så Slack via [bolt-js](https://github.com/SlackAPI/bolt-js) sende meldingene til den spesifiserte Slack kanalen i HTTP kallet.

## Kom i gang med utvikling

### Forutsetninger
- Node v18+
- Yarn v1.22+
- Slack bot token og signing secret for NAV IT sitt Slack workspace

For å få tilgang til Slack bot token og signing secret kontakt i ``#researchops`` eller ``#samtykke-løsning`` på Slack.

### Kjøre botten lokalt
Legge til Slack bot token og signing secret i miljøvariabler
````bash
touch .env && echo SLACK_BOT_TOKEN=<bot_token> >> .env && echo SLACK_SIGNING_SECRET=<signing_secret> >> .env
````

Last ned avhengigheter
````bash
yarn install
````

Kjør botten
````bash
yarn dev
````

## Testmiljø på NAIS
Testmiljøet til botten lever i `dev-gcp` clusteret på NAIS. NAIS henter Slack bot token og signing secret fra [Google Secrets Manager](https://doc.nais.io/security/secrets/google-secrets-manager/?h=secret) og legger dem inn som miljøvariabler i botten. Hvis av en grunn disse ikke ligger i [Google Secrets Manager](https://doc.nais.io/security/secrets/google-secrets-manager/?h=secret) må de legges inn manuelt i [Google Secrets Manager](https://doc.nais.io/security/secrets/google-secrets-manager/?h=secret).

For å kunne inspisere appen i `dev-gcp` må [naisdevice](https://doc.nais.io/device/?h=nais) være aktivert og du må være medlem av team-researchops. Kontakt i ``#researchops`` eller ``#samtykke-løsning`` på Slack for å få tilgang.

For NAV-ansatte
Interne henvendelser kan sendes på Slack via kanalene ``#researchops`` eller ``#samtykke-løsning``.