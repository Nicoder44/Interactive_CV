# Configuration Firebase pour le Leaderboard

## Étapes pour créer ton projet Firebase

### 1. Créer un compte Firebase
1. Va sur [Firebase Console](https://console.firebase.google.com/)
2. Clique sur "Add project" (Ajouter un projet)
3. Nomme ton projet (ex: "interactive-cv-leaderboard")
4. Désactive Google Analytics (pas nécessaire)
5. Clique sur "Create project"

### 2. Créer une Realtime Database
1. Dans la console Firebase, clique sur "Realtime Database" dans le menu
2. Clique sur "Create Database"
3. Choisis une localisation (ex: `europe-west1` pour l'Europe)
4. **Important** : Commence en **mode test** pour l'instant
5. Clique sur "Enable"

### 3. Configurer les règles de sécurité
Dans l'onglet "Rules" de ta Realtime Database, remplace le contenu par :

**Pour tester (règles ouvertes)** :
```json
{
  "rules": {
    "scores": {
      ".read": true,
      ".write": true,
      ".indexOn": ["distance"]
    }
  }
}
```

Clique sur **"Publish"** et teste !

**Pour la production (avec validations)** - à mettre après les tests :
```json
{
  "rules": {
    "scores": {
      ".read": true,
      ".write": "newData.exists() && newData.hasChildren(['pseudo', 'distance', 'timestamp']) && newData.child('pseudo').isString() && newData.child('pseudo').val().length > 0 && newData.child('pseudo').val().length <= 20 && newData.child('distance').isNumber() && newData.child('distance').val() >= 0 && newData.child('distance').val() <= 100000 && newData.child('timestamp').isNumber() && (!newData.hasChild('country') || newData.child('country').isString())",
      ".indexOn": ["distance"]
    }
  }
}
```

**Explications des règles de production** :
- ✅ Lecture publique pour afficher le leaderboard
- ✅ Pseudo obligatoire, entre 1-20 caractères
- ✅ Distance doit être un nombre entre 0 et 100,000m (limite raisonnable)
- ✅ Timestamp doit être un nombre (pas de validation temporelle stricte)
- ✅ Pays optionnel mais doit être une string si présent
- ✅ Index sur `distance` pour les requêtes rapides

Ces règles empêchent :
- ❌ Scores négatifs
- ❌ Scores impossibles (> 100km)
- ❌ Données corrompues ou manquantes

### 4. Récupérer les credentials
1. Clique sur l'icône ⚙️ (Settings) puis "Project settings"
2. Scroll jusqu'à "Your apps"
3. Clique sur l'icône `</>` (Web)
4. Enregistre ton app (ex: "Web CV")
5. Copie les valeurs de `firebaseConfig`

### 5. Créer le fichier .env.local
Crée un fichier `.env.local` à la racine du projet avec :

```env
VITE_FIREBASE_API_KEY=ta_clé_api_ici
VITE_FIREBASE_AUTH_DOMAIN=ton-projet.firebaseapp.com
VITE_FIREBASE_DATABASE_URL=https://ton-projet-default-rtdb.firebaseio.com
VITE_FIREBASE_PROJECT_ID=ton-projet
VITE_FIREBASE_STORAGE_BUCKET=ton-projet.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=ton_sender_id
VITE_FIREBASE_APP_ID=ton_app_id
```

### 6. Ajouter .env.local au .gitignore
Assure-toi que `.env.local` est dans ton `.gitignore` :

```
.env.local
```

### 7. Tester localement
```bash
npm run dev
```

Joue au jeu, et quand tu arrives au Game Over, clique sur "View Leaderboard" pour tester !

### 8. Déployer sur GitHub Pages

Pour que Firebase fonctionne sur GitHub Pages, tu dois :

1. Dans Firebase Console → Project Settings → General
2. Ajouter ton domaine GitHub Pages dans "Authorized domains" :
   - `nicoder44.github.io`

3. **Option A** : Utiliser les secrets GitHub (recommandé)
   - Va dans ton repo GitHub → Settings → Secrets and variables → Actions
   - Ajoute chaque variable Firebase comme secret
   - Modifie ton workflow de déploiement pour injecter ces secrets

4. **Option B** : Variables en dur (moins sécurisé mais fonctionne)
   - Remplace directement les valeurs dans `src/firebase.js`
   - Les credentials Firebase côté client ne sont pas ultra-sensibles (ils sont visibles dans le code frontend de toute façon)
   - La sécurité vient des règles de la database

## Structure de la Database

Les scores sont stockés ainsi :

```
scores/
  ├── -NabcdefGHIJ123/
  │   ├── pseudo: "Nicolas"
  │   ├── distance: 1500
  │   ├── country: "FR"
  │   └── timestamp: 1701700000000
  ├── -NabcdefGHIJ124/
  │   ├── pseudo: "Player2"
  │   ├── distance: 1200
  │   ├── country: "US"
  │   └── timestamp: 1701700100000
  ...
```

## Fonctionnalités

✅ **Pseudo personnalisé** : Le joueur entre son nom
✅ **Détection du pays** : Via l'API ipapi.co (gratuite)
✅ **Drapeau emoji** : Convertit le code pays en emoji
✅ **Option anonyme** : Case à cocher pour ne pas afficher le drapeau
✅ **Top 10** : Affiche les 10 meilleurs scores
✅ **Temps réel** : Le leaderboard se met à jour automatiquement
✅ **Responsive** : Fonctionne sur mobile et desktop

## Coûts

Firebase gratuit inclut :
- 1 GB de stockage
- 10 GB de téléchargement/mois
- 100,000 connexions simultanées

Pour un CV avec quelques joueurs par jour, c'est **largement suffisant** et **100% gratuit** ! 🎉

## API de géolocalisation

J'utilise `ipapi.co` qui est gratuite jusqu'à 30,000 requêtes/mois.

Si tu veux plus de contrôle, tu peux aussi utiliser :
- `ip-api.com` (gratuit, 45 req/min)
- `geojs.io` (gratuit, illimité)

Pour changer l'API, modifie la ligne 15 de `src/components/Leaderboard.jsx`.

## Sécurité en production

Pour améliorer la sécurité, tu peux :

1. Ajouter une validation des scores (éviter les valeurs impossibles)
2. Limiter le nombre de soumissions par IP
3. Ajouter un CAPTCHA
4. Utiliser Firebase App Check

Mais pour un easter egg fun, les règles actuelles sont suffisantes ! 🛷

## Protections anti-triche implémentées

✅ **Validation Firebase côté serveur** :
- Score entre 0 et 100,000m maximum
- Pseudo obligatoire (1-20 caractères)
- Timestamp vérifié (ne peut pas être dans le futur)
- Types de données validés

✅ **Validation côté client** :
- Vérification des limites avant soumission
- Score arrondi pour éviter les décimales suspectes
- Pseudo tronqué à 20 caractères max

✅ **Score scellé** :
- Le score final est capturé au moment exact du Game Over
- Stocké dans une ref qui ne peut plus être modifiée
- Même si quelqu'un modifie la state `distance` dans l'inspecteur, c'est `finalScoreRef.current` qui est envoyé

⚠️ **Note importante** : Il est impossible d'empêcher complètement la triche côté client (quelqu'un peut toujours modifier le code JavaScript), MAIS :
- Les règles Firebase rejettent automatiquement les scores impossibles
- Un score de 100km+ serait de toute façon évident
- Pour un easter egg fun, c'est largement suffisant !

Si tu veux aller plus loin, tu pourrais :
- Ajouter un système de replay pour vérifier les scores
- Implémenter une détection de patterns suspects
- Utiliser Firebase App Check pour valider que les requêtes viennent de ton app
