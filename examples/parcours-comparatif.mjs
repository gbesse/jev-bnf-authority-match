// Objectif : produire un rapport hors ligne comparant les trois chemins de décision.
import { assessAuthorityMatch } from "../src/index.mjs";
import { createFakeProvider } from "../src/jev.mjs";
const principal = {
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
};
const limite = {
  "id": "limite-1",
  "text": "Cas synthétique traité par une règle déterministe avant toute analyse sémantique.",
  "source": {
    "url": "https://example.test/cas-limite",
    "date": "2026-10-01"
  },
  "candidates": []
};
const revue = {
  "id": "revue-1",
  "text": "La mention contient uniquement un nom fréquent et une initiale, tandis que plusieurs notices candidates restent compatibles.",
  "source": {
    "url": "https://example.test/dossier-ambigu",
    "date": "2026-10-01"
  },
  "details": {
    "origine": "donnée synthétique",
    "signal": "informations incomplètes"
  }
};
const réponses = [{
  "model": "jev-1.13.0",
  "answers": {
    "decision": {
      "type": "choice",
      "choice": "strong_match",
      "probabilities": {
        "strong_match": 0.82,
        "review_required": 0.06,
        "weak_match": 0.06,
        "no_candidate": 0.06
      },
      "confidence": 0.82
    }
  },
  "usage": {
    "input_tokens": 120,
    "output_tokens": 0
  }
}, {
  "model": "jev-1.13.0",
  "answers": {
    "decision": {
      "type": "choice",
      "choice": "review_required",
      "probabilities": {
        "strong_match": 0.1267,
        "review_required": 0.62,
        "weak_match": 0.1267,
        "no_candidate": 0.1267
      },
      "confidence": 0.62
    }
  },
  "usage": {
    "input_tokens": 140,
    "output_tokens": 0
  }
}];
const provider = createFakeProvider(() => réponses.shift());
const résultats = [];
for (const [scénario, dossier] of [["principal", principal], ["limite déterministe", limite], ["revue humaine", revue]]) {
  const résultat = await assessAuthorityMatch(dossier, provider);
  résultats.push({ scénario, décision: résultat.label, revueHumaine: résultat.review, déterministe: résultat.deterministic });
}
console.log(JSON.stringify({ dépôt: "jev-bnf-authority-match", résultats }, null, 2));
