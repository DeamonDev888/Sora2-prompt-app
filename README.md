# Sora 2 Prompt Architect 🎬

Une application web React TypeScript qui génère des prompts optimisés pour le modèle de génération vidéo Sora 2 d'OpenAI, alimentée par l'IA de Google Gemini 2.5.

![Sora 2 Prompt Architect](https://img.shields.io/badge/React-19.2.0-blue?logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5.8.2-blue?logo=typescript)
![Vite](https://img.shields.io/badge/Vite-6.2.0-646CFF?logo=vite)
![Gemini API](https://img.shields.io/badge/Gemini-2.5-orange?logo=google)

## 🎯 Fonctionnalités

- **Interface Wizard Intuitive** : Guide en 4 étapes pour créer des prompts vidéo complexes
- **Génération Bilingue** : Crée automatiquement des prompts en français et anglais
- **Optimisation IA** : Utilise Google Gemini 2.5 pour optimiser les prompts selon les contraintes de Sora 2
- **Contrôle Cinématographique** : Paramètres avancés pour la caméra, l'éclairage et le mouvement
- **Limite de Caractères** : Respecte la limite de 1000 caractères imposée par Sora 2
- **Copie One-Click** : Copie facile des prompts générés dans le presse-papiers

## 🚀 Démarrage Rapide

### Prérequis

- Node.js 18+
- Une clé API Google Gemini 2.5

### Installation

1. Cloner le dépôt :
```bash
git clone https://github.com/DeamonDev888/Sora2-prompt-app.git
cd Sora2-prompt-app
```

2. Installer les dépendances :
```bash
npm install
```

3. Configurer la clé API Gemini :
Créer un fichier `.env` à la racine du projet :
```
API_KEY=votre_cle_api_gemini_ici
```

4. Démarrer l'application :
```bash
npm run dev
```

L'application sera disponible sur `http://localhost:5173`

## 📋 Guide d'utilisation

### Étape 1 : Format & Style
- Choisissez la durée de votre vidéo (4s, 8s, ou 12s)
- Sélectionnez le modèle de qualité (Sora 2 ou Sora 2 Pro)
- Définissez le style visuel général

### Étape 2 : Identité & Props
- Décrivez votre personnage (character bible)
- Spécifiez les objets et éléments de continuité

### Étape 3 : Cinématographie
- Définissez le cadrage et la composition
- Configurez l'objectif et la profondeur de champ
- Décrivez l'éclairage et l'atmosphère

### Étape 4 : Mouvement & Action
- Décrivez l'action principale
- Spécifiez les mouvements de caméra
- Définissez les règles de physique et continuité

### Résultat
L'application génère deux prompts optimisés (français/anglais) prêts à être utilisés avec Sora 2.

## 🛠 Architecture Technique

### Structure du Projet

```
├── components/
│   └── WizardSteps.tsx      # Composants du wizard (4 étapes)
├── services/
│   └── geminiService.ts     # Service d'interaction avec Gemini API
├── App.tsx                  # Composant principal
├── types.ts                 # Types TypeScript
├── index.html              # Template HTML
├── package.json            # Dépendances
└── vite.config.ts          # Configuration Vite
```

### Technologies Utilisées

- **React 19.2.0** : Framework JavaScript moderne
- **TypeScript 5.8.2** : Typage statique et sécurité
- **Vite 6.2.0** : Build tool ultra-rapide
- **@google/genai** : Client officiel Google Gemini API
- **Lucide React** : Icônes modernes et légères

### Variables d'Environnement

| Variable | Description | Requis |
|----------|-------------|---------|
| `API_KEY` | Clé API Google Gemini 2.5 | ✅ |

## 🎨 Personnalisation

### Thème et Design

L'application utilise une couleur sombre moderne avec des accents indigo/cyan. Pour personnaliser le thème :

1. Modifier les classes Tailwind dans `App.tsx`
2. Ajuster les couleurs dans le composant `WizardSteps.tsx`

### Extensions Possibles

- Ajout de nouveaux modèles vidéo
- Sauvegarde des prompts créés
- Export en format CSV/JSON
- Intégration avec d'autres APIs IA

## 🐛 Dépannage

### Problèmes Communs

**API Key invalide** :
```bash
Error: API Key is missing. Please set the API_KEY environment variable.
```
Solution : Vérifiez votre fichier `.env` et assurez-vous que la clé API est correcte.

**Limite de caractères dépassée** :
L'application optimise automatiquement les prompts pour respecter la limite de 1000 caractères de Sora 2.

### Développement

```bash
# Démarrer le serveur de développement
npm run dev

# Builder pour production
npm run build

# Prévisualiser le build de production
npm run preview
```

## 📝 Roadmap

- [ ] Sauvegarde des prompts dans le localStorage
- [ ] Historique des générations
- [ ] Templates prédéfinis
- [ ] Support multi-langues étendu
- [ ] Export avancé (JSON, CSV)

## 🤝 Contribuer

Les contributions sont les bienvenues ! N'hésitez pas à :

1. Forker le projet
2. Créer une branche (`git checkout -b feature/amazing-feature`)
3. Committer vos changements (`git commit -m 'Add amazing feature'`)
4. Pousser sur la branche (`git push origin feature/amazing-feature`)
5. Ouvrir une Pull Request

## 📄 License

Ce projet est sous license MIT. Voir le fichier [LICENSE](LICENSE) pour plus de détails.

## 🙏 Remerciements

- **OpenAI** : Pour le modèle Sora 2
- **Google** : Pour l'API Gemini 2.5
- **Vercel** : Pour l'hébergement et l'infrastructure

---

**Auteur**: DeamonDev888
**Dépôt**: https://github.com/DeamonDev888/Sora2-prompt-app
