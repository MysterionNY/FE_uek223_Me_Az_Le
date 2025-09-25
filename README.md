# OurSpace - Blogposts - üK223


## Aufgabenübersicht

Unsere Gruppe hat die Aufgabe, die Blog-Post-Funktionalität für OurSpace umzusetzen.
Das bedeutet konkret:
User können neue Blogposts erstellen, eigene Posts bearbeiten oder löschen. 
Admins haben zusätzlich die Möglichkeit, jeden beliebigen Blogpost zu bearbeiten oder zu löschen, sowie auch User erstellen, löschen und bearbeiten zu können . 
Alle User, inklusive Gäste sollen Blogposts lesen können, mit Pagination und Sortierung, damit die Liste übersichtlich bleibt. 
Das System muss also auch dafür sorgen, dass nur der Autor oder ein Admin Änderungen an einem Post durchführen darf.
Ebenfalls gibt es die Möglichkeit alle Blogposts eines Users ansehen zu können.

## Durchlauf

In der IDE:
```yarn start```

Falls Yarn noch nicht installiert ist:
```yarn install```

Homapage 
```http://localhost:3000```

Login
```http://localhost:3000/login```


## Use Cases
* UC1 User erstellt neuen Blogpost 
* UC2 User bearbeitet oder löscht eigenen Blogpost
* UC3 Admin bearbeitet oder löscht beliebigen Blogpost
* UC4 Nutzer lesen Blogposts mit Pagination und Sortierung
* UC5 Zugriffskontrolle bei Änderungen


## Frontend-URL
Endpoints | Pfad                          | Frontend Endpoint                                                      | Use Case
-------- | ------------------------------ | --------                                                               | ------------
GET      | /blogpost/{blogpostId}         | https://localhost:3000/blogposts/{{blogpostId}}                        | UC 4
GET      | /blogpost/author/{authorId}    | https://localhost:3000/author/{{authorId}}                             | UC 4
GET      | /blogpost                      | https://localhost:3000/blogposts                                       | UC 4
POST     | /blogpost                      | https://localhost:3000/blogpost/create                                 | UC 1 / UC 5 / UC 3
PUT      | /blogpost/{blogpostId}         | https://localhost:3000/blogpost/edit                                   | UC 2 / UC 5 / UC 3
DELETE   | /blogpost/{blogpostId}         | Nicht spezifisch definiert, kann von mehreren Orten aufgerufen werden  | UC 2 / UC 5 / UC 3
GET      | -                              | https://localhost:3000/adminoverview                                   | Allgemeine Anforderung Admin Page
POST     | /user/registerUser             | https://localhost:3000/adminoverview/createuser                        | Allgemeine Anforderung Admin Page
PUT      | /user/{userId}                 | https://localhost:3000/adminoverview/edituser                          | Allgemeine Anforderung Admin Page


## User Journey

Ein neuer Besucher öffnet die Website OurSpace und landet zuerst auf der öffentlichen Homepage. Dort bekommt er/sie einen Überblick, was die Plattform bietet. Um wirklich aktiv zu werden, klickt er/sie auf Login und meldet sich mit seinen/ihren persönlichen Daten an.

Nach dem Login wird er/sie auf die Blogpage weitergeleitet. Hier sieht er/sie eine Liste aller vorhandenen Blogposts, die nach Datum, Kategorie oder sogar nach Autor sortiert werden können. Gäste können diese Posts zwar auch lesen, aber nur eingeloggte Benutzer haben die Möglichkeit, selbst aktiv zu werden.

Der User klickt auf “Neuen Blogpost erstellen”. Ein Formular öffnet sich, in dem er/sie Titel, Text und eine Kategorie eingibt. Als Autor wird er/sie automatisch gesetzt. Nach dem Speichern erscheint sein/ihr neuer Blogpost direkt in der Liste und ist für alle anderen User sichtbar.

Wenn er/sie merkt, dass er/sie sich vertippt hat, kann er/sie den Post jederzeit bearbeiten oder, falls er/sie es sich anders überlegt, einfach wieder löschen. Admins haben darüber hinaus die Möglichkeit, auch fremde Blogposts zu bearbeiten oder zu löschen. Normale User dürfen das nur bei ihren eigenen Beiträgen.

## Projekt 
Wir haben ein Skelett erhalten, mit welchem wir anfangen konnten. wir entwickleten einen Plan und haben uns danach aufgeteilt, damit jeder seine eigenen Aufgaben zu tun hatte.

## Struktur

Wir haben die Projekt Grundstruktur so erhalten im Style von Atomic Design:

* Atoms
* Molecules
* Organisms
* Pages
* Services
* Validation

Wo möglich haben wir Komponenten ausgelagert und wiederverwendbar gemacht, wie Buttons, Form-Felder, ganze Formulare und Validierungen.

### Atoms

In den Atomen haben wir die kleinsten wiederverwendbaren Komponenten abgelegt, zum Beispiel Buttons und Input-Felder. Diese Bausteine werden überall im Projekt genutzt, wie beim Erstellen, Bearbeiten oder Löschen eines Blogposts.
Die Buttons folgen dabei immer demselben Grundgerüst, nur die jeweilige Funktionalität unterscheidet sich.

### Molecules

Unsere Moleküle setzen sich aus mehreren Atomen zusammen. Beispiele sind:

* BlogFormFields: Eingabefelder für Titel, Text und Kategorie, umgesetzt mit Formik und Yup zur Validierung.

* BlogCard: Eine Komponente, die alle Blog-Attribute übersichtlich darstellt (Titel, Kategorie, Autor, Datum).

### Organisms

Hier haben wir komplexere Strukturen zusammengestellt, die mehrere Moleküle enthalten:

* BlogCreation: Ermöglicht es dem User, einen neuen Blogpost zu erstellen.

* BlogEdit: Ermöglicht das Bearbeiten bestehender Blogposts.

* BlogGrid: Zeigt eine Übersicht aller BlogCards an.

* Navbar: Navigation zwischen den Hauptseiten (Login und Blogs).

### Pages

Die Pages repräsentieren die eigentlichen Seiten der Applikation:

* BlogDetail: Seite mit allen Details eines einzelnen Blogposts, inkl. Optionen zum Bearbeiten oder Löschen (nur für Autor/Admin).
* LandingPage: Öffentliche Startseite, die auch für Gäste sichtbar ist.
* Login: Einfaches Formular, mit dem sich Benutzer anmelden können.
* BlogPage: Seite wo alle Blogposts angezeigt werden. Als Admin sieht man die selbe Seite und kann dabei beliebige Blogposts bearbeiten und löschen.

### Services

Hier landet alles, was mit der API zu tun hat:

* Api.ts: Definiert die Basis-URL für Backend-Aufrufe.
* UserService: Kümmert sich um User-bezogene Endpoints.
* RoleService & AuthorityService: Regeln Rollen und Berechtigungen.

## Validierung

Sehr wichtig, da es viele Möglichkeiten für Fehler gibt. Um diese zu verhindern, haben wirr Validierung verwendet:
Für Blogposts, mussten wir sicherstellen, dass Titel, Kategorie und Text nicht leer sind.
Mit Yup konnten wir alle Felder leicht und zuverlässig validieren.

## Tests
Die Postman Tests, welche im Backend Repository zu finden sind, werden natürlich mit Psotman ausgeführt.
JUnit Tests können im bakcend ausgeführt werden und Cypress hier im Frontend.

### Cypress
Im Frontend kann die Datei zum ausführen der Cypress-Tests unter 

```FE_uek223_Me_Az_Le/cypress/e2e/BlogpostPage/BlogpostPage.cy.ts```

gefunden werden. Mit dem ausführen dieser Datei werden die UC 1 & 2 getestet. Zum laufen bringen dieses Cypress-Tests wird ein laufendes Backend, sowie Frontend benötigt. Zudem muss der Container im Docker laufen.

---

**Präsentiert von Mert, Leon und Azar**

