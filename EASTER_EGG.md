# 🛷 Sledding Chaos Easter Egg

## Concept

Un easter egg délirant qui transforme ton CV en terrain de jeu physique ! Clique sur la luge (🛷) à côté de ton nom et regarde tout s'effondrer.

## Fonctionnalités

### Physique Réaliste
- Utilise **Matter.js** pour la simulation physique
- Gravité, collisions, rebonds
- Chaque section du CV devient un objet physique qui tombe

### Le Bonhomme en Luge
- Spawn en haut de l'écran
- Tombe avec la gravité
- Peut rebondir et rider sur les sections qui tombent
- Contrôlable avec la souris !

### Contrôles
- **Souris** : Bouge la souris pour orienter la luge
- La luge est attirée vers le curseur
- **Bouton "Arrêter le chaos"** : Ferme l'easter egg et restaure le CV

### Effets Visuels
- Fond ciel bleu dégradé
- Animation de neige qui tombe
- Instructions flottantes
- Particules et effets visuels

## Comment Déclencher

Clique sur l'emoji 🛷 juste après "Nicolas Macé" dans le header.

## Implémentation Technique

### Composants
- **SleddingChaos.jsx** : Composant principal avec Matter.js
- **SleddingChaos.css** : Styles et animations

### Architecture
1. Initialise Matter.js engine + renderer
2. Crée le bonhomme en luge (rigid body)
3. Convertit tous les éléments DOM du CV en corps physiques
4. Ajoute les bordures (sol, murs)
5. Contrôle à la souris avec force d'attraction
6. Cleanup complet au démontage

### Physique
- **Gravité** : `{ x: 0, y: 1 }`
- **Restitution** : 0.5-0.6 (rebondissement)
- **Friction** : 0.1-0.3
- **Densité** : 0.001-0.002 (léger)

### Optimisations
- Les éléments DOM originaux sont cachés (`opacity: 0`)
- Cleanup complet pour éviter les fuites mémoire
- Restauration automatique au démontage

## Améliorations Possibles

### Court Terme
- [ ] Ajuster la physique pour plus de fun
- [ ] Meilleurs sprites pour la luge
- [ ] Sons d'effets (swoosh, crash)
- [ ] Score basé sur les éléments touchés

### Long Terme
- [ ] Power-ups (vitesse, jump)
- [ ] Trails de particules derrière la luge
- [ ] Mode multijoueur local
- [ ] Obstacles animés
- [ ] Easter egg dans l'easter egg ? 🤯

## Testing

L'easter egg est sur la branche `feature/sledding-chaos`.

Pour tester :
```bash
git checkout feature/sledding-chaos
npm install
npm run dev
```

Puis clique sur 🛷 dans le header !

## Notes

- Fonctionne sur desktop et mobile
- Matter.js ajoute ~70KB au bundle (gzipped)
- Aucun impact sur les performances du CV normal
- Le composant se démonte proprement

---

**Have fun destroying your CV! 🛷💥**
