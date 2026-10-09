# NATUROMIEL — Coffret 5 pots

Landing page autonome à déployer depuis le répertoire `offre-coffret/` sur Vercel. Le fichier `index.html` inclut directement styles, scripts et visuels des pots et de leurs nouvelles étiquettes. `favicon.svg` est l'icône de la page. **Les étiquettes conservent leur identité visuelle, distincte du logo historique du site.**

## Offre

- Coffret **5 pots au choix** : **50 €** (pollen de montagne 230 g inclus parmi les choix possibles et non offert).
- Si au moins un des cinq pots est du **miel de thym ou de thym rose** : **+5 €** → 55 €.
- Si au moins un des cinq pots est du **miel à la gelée royale** : **+10 €** → 60 €.
- Si le coffret contient à la fois l'un des deux miels de thym et le miel à la gelée royale : **+15 €** → 65 €.
- **Miel à la gelée royale 450 g vendu seul : 25 €** l'unité.
- Les suppléments sont **par coffret**, non par nombre de pots spéciaux.
- Plusieurs pots identiques autorisés. La commande et la disponibilité sont confirmées par WhatsApp au **+212 716 014 148**.

Variétés : romarin, thym, thym rose, eucalyptus, miellat de chêne vert, citronnier, lavande cultivée, lavande papillon (à confirmer au bon de commande), tilleul, garrigue, coriandre, miel à la gelée royale, pollen de montagne.

## Vérifications
La page contient le catalogue, le formulaire de composition de cinq pots, le calcul du supplément et la génération du message WhatsApp. Depuis ce dossier :

```bash
node verify-offer.cjs
```

## Déploiement sur Vercel
Importer le dépôt `novaskilltech/naturomiel`, choisir **Root Directory = `offre-coffret`**, Framework Preset **Other**. Ce dossier n'est pas le projet Next.js situé à la racine du dépôt.

**À contrôler avant publication** : conditions générales, identité légale, droits sur les photographies fournisseur, stock réel, CGV et formulation des allégations de santé. La livraison est soumise à confirmation de l'adresse sur l'itinéraire A63/A10 jusqu'en Île-de-France.
