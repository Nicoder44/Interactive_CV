# Nettoyage effectué ✅

## Fichier consolidé créé

**`public/CV.tex`** - Votre CV complet en un seul fichier

Ce fichier contient toutes les informations de votre CV Overleaf original, consolidées et simplifiées pour fonctionner avec le parser du site web.

## Fichiers originaux (peuvent être supprimés)

Le dossier `public/CV_Anglais_2025/` contient votre export Overleaf original avec :

### Fichiers utilisés (déjà intégrés dans CV.tex) :
- ✅ `resume.tex` - Fichier principal
- ✅ `resume/summary.tex` - Résumé
- ✅ `cv/education.tex` - Formation
- ✅ `resume/experience.tex` - Expériences
- ✅ `resume/skills.tex` - Compétences
- ✅ `resume/extracurricular.tex` - Activités

### Fichiers NON utilisés (peuvent être supprimés) :
- ❌ `resume/writing.tex` - Non inclus dans resume.tex
- ❌ `resume/committees.tex` - Non inclus
- ❌ `resume/presentation.tex` - Non inclus
- ❌ `cv.tex` - Template exemple (pas votre CV)
- ❌ `cv/committees.tex` - Non inclus
- ❌ `cv/formation.tex` - Non inclus
- ❌ `cv/honors.tex` - Non inclus
- ❌ `cv/presentation.tex` - Non inclus
- ❌ `cv/writing.tex` - Non inclus
- ❌ `cv/skills.tex` - Version CV (on utilise resume/skills.tex)
- ❌ `cv/experience.tex` - Version CV (on utilise resume/experience.tex)
- ❌ `coverletter.tex` - Lettre de motivation template
- ❌ `awesome-cv.cls` - Classe LaTeX (non nécessaire)
- ❌ `fonts/` - Polices (non nécessaires pour le web)

### Photo de profil :
- 📷 `photoprofil.jpg` - Votre photo (gardez-la si vous voulez l'utiliser)
- ❌ `profile.png` - Photo template exemple

## Comment nettoyer

Si vous voulez supprimer les fichiers inutiles :

```powershell
# Supprimer tout le dossier Overleaf original
Remove-Item -Recurse -Force "c:\Projects\Web_CV\public\CV_Anglais_2025"
```

Ou gardez juste votre photo :
```powershell
# Copier la photo
Copy-Item "c:\Projects\Web_CV\public\CV_Anglais_2025\photoprofil.jpg" "c:\Projects\Web_CV\public\"

# Puis supprimer le dossier
Remove-Item -Recurse -Force "c:\Projects\Web_CV\public\CV_Anglais_2025"
```

## Votre CV est maintenant actif !

Le site web utilise **`public/CV.tex`** qui contient :

✅ Vos informations personnelles (Nicolas Macé)  
✅ Votre résumé professionnel  
✅ Votre formation (Polytech Angers)  
✅ Vos expériences (AXA France, stages, etc.)  
✅ Vos compétences (Java, Spring Boot, Kubernetes, etc.)  
✅ Vos activités (Escalade 🧗, Skydiving 🪂, Traveling ✈️)  

## Prochaines étapes

1. **Ajouter vos vidéos** :
   - Créez `public/videos/`
   - Ajoutez vos vidéos d'escalade, skydiving, voyages
   - Elles s'afficheront au survol des hobbies !

2. **Personnaliser** :
   - Les niveaux de compétences sont déjà configurés dans `src/utils/cvEnrichment.js`
   - Vous pouvez les ajuster selon vos préférences

3. **Mettre à jour** :
   - Pour modifier votre CV, éditez simplement `public/CV.tex`
   - Le site se mettra à jour automatiquement !

## Test

Le site est accessible sur : http://localhost:5174

Votre CV s'affiche avec tous les effets interactifs ! 🎉
