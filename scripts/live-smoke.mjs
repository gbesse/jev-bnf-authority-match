// Objectif : effectuer un appel Jev synthétique uniquement sur demande explicite.
import { createJevClient } from "../src/jev.mjs";
import { assessAuthorityMatch } from "../src/index.mjs";
const client = createJevClient();
const résultat = await assessAuthorityMatch({
  "id": "exemple-1",
  "text": "Mention synthétique d’un auteur avec nom complet, année de naissance et titre d’une œuvre ; une seule notice candidate partage ces trois éléments.",
  "source": {
    "url": "https://example.test/source-publique",
    "date": "2026-10-01"
  },
  "details": {
    "territoire": "France — cas synthétique",
    "origine": "donnée synthétique"
  }
}, client);
console.log(JSON.stringify({ décision: résultat.decision, confiance: résultat.confidence, usage: résultat.usage }, null, 2));
