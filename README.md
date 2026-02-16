# Bancarotta Evitata 💸

Bancarotta Evitata è un'applicazione per la gestione delle finanze personali, progettata per aiutarti a tenere traccia delle tue spese ed evitare... la bancarotta!

Il progetto è composto da:
- **Backend**: Django (Python)
- **Frontend**: React + Vite (JavaScript/Node.js)

## Struttura del Progetto

```
BancarottaEvitata/
├── backend/          # Codice sorgente Backend (Django)
├── frontend/         # Codice sorgente Frontend (React + Vite)
├── run.sh            # Script per avviare l'applicazione
├── venv/             # Virtual Environment Python (globale)
└── README.md         # Questo file
```

## Prerequisiti

Assicurati di avere installato:
- [Python 3](https://www.python.org/)
- [Node.js](https://nodejs.org/) & npm

## Installazione

### 1. Configurazione Backend

Attiva il virtual environment e installa le dipendenze:

```bash
# Attiva il virtual environment (se non è già attivo)
source venv/bin/activate

# Installa le dipendenze (assicurati di essere nella cartella corretta)
pip install django django-cors-headers djangorestframework
```
*Nota: Se hai un file `requirements.txt`, usa `pip install -r requirements.txt`.*

### 2. Configurazione Frontend

Installa le dipendenze del frontend:

```bash
cd frontend
npm install
cd ..
```

## Avvio dell'Applicazione

Per avviare sia il backend che il frontend contemporaneamente, puoi utilizzare lo script `run.sh`:

```bash
./run.sh
```

Una volta avviato:
- **Frontend**: [http://localhost:5173](http://localhost:5173)
- **Backend API**: [http://127.0.0.1:8000](http://127.0.0.1:8000)
- **Admin Panel**: [http://127.0.0.1:8000/admin](http://127.0.0.1:8000/admin)

## Sviluppo

- Per fermare il server, premi `Ctrl+C` nel terminale dove è in esecuzione `run.sh`.
- Il database SQLite è situato in `backend/db.sqlite3`.

## Licenza

Questo progetto è distribuito sotto licenza MIT. Vedi il file [LICENSE](LICENSE) per maggiori dettagli.
