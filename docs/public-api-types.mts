// Objectif : vérifier les types publiés depuis un projet consommateur.
import { authorityMatchCase, assessAuthorityMatch, DECISIONS } from "../src/index.mjs";
import { createFakeProvider } from "../src/jev.mjs";
const dossier = authorityMatchCase({
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
});
void DECISIONS;
void assessAuthorityMatch(dossier, createFakeProvider(() => ({})));
