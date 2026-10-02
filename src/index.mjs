// Objectif : implémenter la frontière de décision métier propre au dépôt.
import { readFile } from "node:fs/promises";
export const DECISIONS = Object.freeze({
  "strong_match": "rapprochement_fort",
  "review_required": "revue_requise",
  "weak_match": "rapprochement_faible",
  "no_candidate": "aucun_candidat_fourni"
});
const CRITERIA = Object.freeze({
  "strong_match": "rapprochement fort",
  "review_required": "revue requise",
  "weak_match": "rapprochement faible",
  "no_candidate": "aucun candidat fourni"
});
export function authorityMatchCase(input) {
  if (!input?.id || !input?.text || !input?.source?.url || !input?.source?.date) throw new TypeError("Le dossier exige id, text, source.url et source.date");
  const date = new Date(input.source.date);
  if (Number.isNaN(date.valueOf())) throw new TypeError("source.date doit être une date ISO valide");
  return { ...input, id: String(input.id), text: String(input.text).trim(), source: { url: String(input.source.url), date: date.toISOString() } };
}
export async function assessAuthorityMatch(input, provider) {
  const record = authorityMatchCase(input);
  if (Array.isArray(record.candidates) && record.candidates.length === 0) return { decision: "no_candidate", label: DECISIONS["no_candidate"], probability: 1, review: false, deterministic: true };
  const response = await provider.decide({
    state: record,
    questions: { decision: { type: "choice", instructions: "Analysez ce dossier à partir des seuls éléments sourcés. Évaluez le nom, les variantes, dates, professions, œuvres, lieux et identifiants présents dans la mention et les notices candidates. Choisissez la catégorie la plus prudente. N’inventez ni fait, ni règle applicable, ni garantie.", criteria: CRITERIA } },
  });
  const answer = response.answers.decision;
  return { decision: answer.choice, label: DECISIONS[answer.choice], probability: answer.probabilities[answer.choice], confidence: answer.confidence, review: answer.confidence < 0.8, deterministic: false, usage: response.usage };
}
export async function runCli(argv, io = console) {
  if (argv.length !== 1) throw new Error("Usage : jev-bnf-authority-match <dossier.json>");
  const dossier = authorityMatchCase(JSON.parse(await readFile(argv[0], "utf8")));
  io.log(JSON.stringify({ dossier, prochaineÉtape: "Transmettez ce dossier à assessAuthorityMatch avec un fournisseur Jev configuré." }, null, 2));
}
