# Configuration Firebase App Check

## 🛡️ Qu'est-ce que App Check ?
Firebase App Check protège ton backend contre:
- Les bots et scripts automatisés
- Les requêtes en masse depuis des outils comme Postman
- Les attaques par spam de scores

**Important:** App Check se lance uniquement quand le jeu démarre, pas sur le CV principal.

## 📋 Étapes de configuration

### 1. Obtenir une clé reCAPTCHA v3

1. Va sur [Google reCAPTCHA Admin](https://www.google.com/recaptcha/admin)
2. Clique sur "+" pour créer une nouvelle clé
3. Configure:
   - **Label**: InteractiveCV Sledding Game
   - **Type**: reCAPTCHA v3
   - **Domaines**: 
     - `localhost` (pour dev)
     - `nicoder44.github.io` (pour prod)
     - `interactivecv-d04a7.firebaseapp.com` (Firebase Hosting)
4. Accepte les conditions et clique "Envoyer"
5. **Copie la clé du site** (commence par `6Le...`)

### 2. Configurer dans Firebase Console

1. Va dans [Firebase Console](https://console.firebase.google.com)
2. Sélectionne ton projet `interactivecv-d04a7`
3. Dans le menu latéral, clique sur **App Check**
4. Si c'est ta première fois, clique sur "Commencer"
5. Sélectionne ton application web
6. Choisis **reCAPTCHA v3** comme provider
7. Colle la **clé du site** obtenue à l'étape 1
8. Clique sur "Enregistrer"

### 3. Activer l'enforcement pour Realtime Database

1. Toujours dans Firebase Console > App Check
2. Va dans l'onglet **APIs**
3. Trouve **Realtime Database** dans la liste
4. Clique sur les 3 points > **Enforce**
5. Confirme en cliquant "Enforce"

⚠️ **Important:** Une fois l'enforcement activé, seules les requêtes avec un token App Check valide pourront accéder à ta database.

### 4. Mettre à jour le code

Dans `src/firebase.js`, remplace:
```javascript
provider: new ReCaptchaV3Provider('YOUR_RECAPTCHA_SITE_KEY'),
```

Par ta vraie clé (celle qui commence par `6Le...`):
```javascript
provider: new ReCaptchaV3Provider('6LeXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX'),
```

### 5. Tester

1. Lance le dev: `npm run dev`
2. Ouvre le jeu (clique sur "🎮 Sledding Chaos")
3. Dans la console DevTools, tu devrais voir:
   ```
   🛡️ App Check activé pour le jeu
   ```
4. Joue et soumets un score au leaderboard
5. Si tout fonctionne, ton score s'affiche → App Check est opérationnel ✅

### 6. Déployer

```bash
npm run build
npm run deploy
```

## 🧪 Vérifier que App Check fonctionne

**Test 1 - Avec App Check (devrait marcher):**
- Ouvre ton site normalement
- Lance le jeu
- Soumets un score
- ✅ Le score s'affiche dans le leaderboard

**Test 2 - Sans App Check (devrait être bloqué):**
- Ouvre la console DevTools
- Tape:
```javascript
fetch('https://interactivecv-d04a7-default-rtdb.europe-west1.firebasedatabase.app/scores.json', {
  method: 'POST',
  body: JSON.stringify({
    pseudo: "Hacker",
    distance: 999999,
    country: "XX"
  })
})
```
- ❌ Erreur 401 Unauthorized → App Check bloque la requête

## 📊 Monitoring

Dans Firebase Console > App Check, tu peux voir:
- Nombre de requêtes vérifiées
- Requêtes bloquées (sans token valide)
- Métriques d'utilisation

## 🔧 Limites & quotas

- **reCAPTCHA v3**: 10,000 appels/mois gratuits
- Au-delà: $1 pour 1,000 appels supplémentaires
- Pour 10 amis qui jouent: largement suffisant

## ⚠️ Ce que App Check NE protège PAS

App Check ne peut **PAS** empêcher quelqu'un qui:
- Joue réellement au jeu ET modifie son score dans la console
- Modifie le code source avant de soumettre

**Pourquoi?** Parce que le token App Check est généré côté client. Si quelqu'un a accès au code, il a aussi accès au token valide.

App Check protège contre:
✅ Scripts automatisés depuis l'extérieur
✅ Bots qui spamment des scores
✅ Requêtes depuis Postman/curl sans token

App Check ne protège PAS contre:
❌ Modification du score dans React DevTools
❌ Modification du code source local
❌ Un ami motivé qui inspecte le code et l'adapte

## 🎯 Conclusion

App Check ajoute une couche de sécurité significative pour ton cas d'usage:
- Empêche les scripts de spam automatique
- Force les requêtes à passer par ton application web
- Invisible pour les utilisateurs légitimes
- Gratuit pour ton volume de trafic

Pour une protection complète, il faudrait:
- Firebase Authentication (forcer login Google)
- Firebase Functions (valider le score côté serveur)
- Replay validation (enregistrer le gameplay)

Mais pour un mini-jeu entre amis, App Check + Firebase Rules + modération manuelle = largement suffisant ! 🎮
