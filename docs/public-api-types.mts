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
void assessAuthorityMatch(dossier, createFakeProvider(() => ({ model: "jev-1.13.0", answers: { decision: { type: "choice", choice: "strong_match", probabilities: { "strong_match": 0.82, "review_required": 0.06, "weak_match": 0.06, "no_candidate": 0.06 }, confidence: 0.82 } } })));

// Ces erreurs attendues protègent le contrat des consommateurs TypeScript.
// @ts-expect-error — un fournisseur doit retourner une réponse Jev complète.
createFakeProvider(() => ({}));
const result = await assessAuthorityMatch(dossier, createFakeProvider(() => ({ model: "jev-1.13.0", answers: {} })));
const review: boolean = result.review;
void review;
// @ts-expect-error — la revue humaine est un booléen.
const incorrect: string = result.review;
void incorrect;
