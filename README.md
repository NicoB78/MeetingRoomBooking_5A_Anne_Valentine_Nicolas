# Application Meeting Room : réserver des salles en toute facilité !
# Prise en main de l'Application

## Page de connexion


#### S'enregistrer en tant qu'administrateur
Se connecter en tant admin en tapant "root" dans le champ Last Name

#### Rechercher une salle 
- Rechercher disponibilités des salles un jour donné
- Choix sur :
                
- la capacité (initialisé à 0, si le champ est vide)
                
- l'heure de début
                
- l'heure de la fin (pas obligé de mettre les deux horaires), en    mettant la fin à 12h, il verra les disponibilités du matin)
- Ensuite, on choisit la salle désirée et on arrive sur une nouvelle page qui permet de choisir plus d'élément de la réservation.

Book Room:
- Affiche en haut a gauche : la date du jour de la réservation
- Affiche en haut au milieu : le nom de la salle
- Affiche en haut à droite : la photo de la salle
- Choisir l'horaire de début et l'horaire de fin
- Choisir les participants (cette liste peut être vide)


## Connexion en tant qu'admnistrateur
### Membre

#### Créer un membre
 Cliquer sur **"Add Member"** et remplir les champs : nom de famille, prénom, email et date de naissance

#### Editer un membre
Cliquer sur le bouton **"Update"** sur la même ligne que le membre puis renter les modifications sur les coordonnées du participant.

**_NB : les anciennes coordonnées s'affichent en gris dans les cases._**

#### Delete un membre
Cliquer sur le bouton **"Delete"** sur la même ligne que le membre à supprimer


### Salle

#### Créer une salle
Cliquer sur **"Add Room"** et remplir les champs : nom, capacité, équipement et photo

**_NB : Quand une photo est sélectionnée, elle apparaît plus zommée que les autres_**


#### Editer une salle
Cliquer sur le bouton **"Update"** associé à la salle correspondante et remplir les champs : nom, capacité, équipement et photo

**_NB : les anciennes coordonnées s'affichent en gris dans les cases._**

#### Supprimer une salle
Cliquer sur le bouton **"Delete"** correspondant à la salle à supprimer


### Reservations

#### Créer une réservation
Cliquer sur **"Add Reservation"** et remplir les champs Id Leader, Id Room, Début, Fin et Id attendee.

#### Editer une réservation
Cliquer sur le bouton **"Update"** associé à la réservation et  remplir les champs Id Leader, Id Room, Début, Fin et Id attendee.

**_NB: Les champs qui apparaissent en gris sont les anciennes données associées à la réservation_**

#### Supprimer une réservation
Cliquer sur le bouton **"Delete"** associé à la réservation

#### Rechercher une salle 
- Rechercher disponibilités des salles un jour donné
- Choix sur :
                
- la capacité (initialisé à 0, si le champ est vide)
                
- l'heure de début
                
- l'heure de la fin (pas obligé de mettre les deux horaires), en    mettant la fin à 12h, il verra les disponibilités du matin)
- Ensuite, on choisit la salle désirée et on arrive sur une nouvelle page qui permet de choisir plus d'élément de la réservation.

Book Room:
- Affiche en haut a gauche : la date du jour de la réservation
- Affiche en haut au milieu : le nom de la salle
- Affiche en haut à droite : la photo de la salle
- Choisir l'horaire de début et l'horaire de fin
- Choisir les participants (cette liste peut être vide)


#### Se déconnecter
Cliquer sur **"Sign out"**


## Connexion en tant qu'utilisateur
L'utilisateur se connecte en tapant son nom dans le champ Last Name

#### Recherher une salle
- Rechercher disponibilités des salles un jour donné
- Choix sur :
                
- la capacité (initialisé à 0, si le champ est vide)
                
- l'heure de début
                
- l'heure de la fin (pas obligé de mettre les deux horaires), en    mettant la fin à 12h, il verra les disponibilités du matin)
- Ensuite, on choisit la salle désirée et on arrive sur une nouvelle page qui permet de choisir plus d'élément de la réservation.

Book Room:
- Affiche en haut a gauche : la date du jour de la réservation
- Affiche en haut au milieu : le nom de la salle
- Affiche en haut à droite : la photo de la salle
- Choisir l'horaire de début et l'horaire de fin
- Choisir les participants (cette liste peut être vide)

#### Accéder à ma liste des réservations

L'utilisateur peut accéder aux informations de ses réservations :

-  Id
- Debut
- Fin 
- Id Leader
- Id Room




# Pour lancer l'application 

Lancer le back d'abord en suivant les étapes du ReadMe de l'API puis lancer le front en suivant les étapes via le ReadMe du front

# Axe d'amelioration

Lorsque que nous éditons un membre ou une salle, l'id de l'objet change et dérègle donc le fonctionnement de nos participants et des réservations qui se basent sur ces id pour fonctionner. Il faudrait donc changer de manière d'éditer les objets salle et membre.











