# Comment la décision est prise

Résout une mention ambiguë vers des autorités BnF candidates et conserve les rapprochements incertains en revue.

Le code normalise la source et applique d’abord le cas déterministe documenté dans `src/index.mjs`. Pour les autres dossiers, Jev choisit la catégorie la plus prudente selon le nom, les variantes, dates, professions, œuvres, lieux et identifiants présents dans la mention et les notices candidates. Une confiance inférieure à `0.8`, la catégorie `review_required` ou une absence de données choisie par le modèle marque le résultat pour revue humaine. Une collection vide explicitement fournie reste un résultat déterministe sans appel Jev.

Les requêtes SPARQL, identifiants, dates exactes et règles d’unicité restent déterministes.

Les démonstrations ne contiennent que des probabilités synthétiques. Constituez un corpus français annoté, mesurez les erreurs par catégorie et fixez vos propres seuils avant un usage opérationnel.
