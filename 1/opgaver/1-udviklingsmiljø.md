# Sådan åbner du Command Line Interface (CLI) også kaldet Terminalen i Visual Studio Code

1. Åben Visual Studio Code

2. Klik på **View** i menulinjen

3. Vælg **Terminal** fra dropdown-menuen (eller brug genvejen <kbd>Ctrl</kbd> + <kbd>`</kbd>)

4. Terminalen vises nederst i vinduet, klar til at modtage kommandoer

Du kan også højreklikke på en mappe eller fil og vælge "Open in Integrated Terminal".

# Sådan installerer du Node.js på din computer

1. Gå til [nodejs.org](https://nodejs.org/) i din browser

2. Vælg den anbefalede version til din computer (LTS)

3. Download installationsfilen til dit operativsystem (Windows, macOS eller Linux)

4. Åbn installationsfilen og følg vejledningen for at installere Node.js

5. Når installationen er færdig, kan du tjekke at Node.js virker ved at åbne din terminal og skrive:

```bash
node --version
```

Hvis du ser et versionsnummer, er Node.js installeret korrekt.

# Sådan tjekker du om Node Package Manager (npm) er installeret

Node Package Manager (npm) følger automatisk med, når du installerer Node.js. Du behøver derfor normalt ikke installere npm separat.

## Tjek om npm er installeret

1. Åbn din terminal
2. Skriv følgende kommando:

```bash
npm --version
```

Hvis du ser et versionsnummer, er npm installeret korrekt.

Hvis du har brug for at opdatere npm til den nyeste version, kan du skrive:

```bash
npm install -g npm
```

# Sådan installer du Node Version Manager på din computer

1. Åbn din terminal

2. Kør følgende kommando for at installere NVM (Node Version Manager):

```bash
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.7/install.sh | bash
```

3. Genstart din terminal, eller kør følgende kommando for at indlæse NVM:

```bash
export NVM_DIR="$([ -z "${XDG_CONFIG_HOME-}" ] && printf %s "${HOME}/.nvm" || printf %s "${XDG_CONFIG_HOME}/nvm")"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"
```

4. Tjek at NVM er installeret ved at skrive:

```bash
nvm --version
```

Hvis du ser et versionsnummer, er NVM installeret korrekt.

5. For at se hvilke versioner af Node.js du har installeret, skriv:

```bash
nvm ls
```

6. For at se alle tilgængelige versioner, skriv:

```bash
nvm ls-remote
```

7. For at installere en bestemt version, fx version 18, skriv:

```bash
nvm install 18
```

8. For at skifte til en installeret version, fx version 18, skriv:

```bash
nvm use 18
```

9. Du kan tjekke den aktive version med:

```bash
node --version
```

# Sådan installerer du Git på din computer

1. Åbn din terminal

2. Kør følgende kommando for at installere Git:

**På macOS (med Homebrew):**

```bash
brew install git
```

**På Ubuntu/Linux:**

```bash
sudo apt update
sudo apt install git
```

**På Windows:**  

Download installationsfilen fra [git-scm.com](https://git-scm.com/) og følg vejledningen.

3. Tjek at Git er installeret ved at skrive:

```bash
git --version
```

Hvis du ser et versionsnummer, er Git installeret korrekt.