# Qalam Württemberg — Website (Entwurf)

Eine deutschsprachige, statische Website für die Qalam Bildungsakademie Württemberg.
Die Grundinformationen sind aus dem bereitgestellten Qalam-Kursleitfaden und der Informationsbroschüre zusammengefasst. Logodateien stammen aus den bereitgestellten Materialien. Namen/Rollen aus öffentlichen Qalam-Instagram-Screenshots müssen vor Veröffentlichung überprüft werden.

## Kostenlos veröffentlichen

1. Dateien/Ordner dieses Projekts (nicht die ZIP-Datei) auf GitHub in ein öffentliches Repository hochladen.
2. Cloudflare Dashboard → Workers & Pages → Create → Pages → Connect to Git → Repository auswählen.
3. Framework: None; Build command: `exit 0`; Build output: `.` (Wurzelverzeichnis).
4. Nach Deploy wird eine `*.pages.dev` Vorschau angezeigt.

## Ohne Code Inhalte bearbeiten

1. `https://app.pagescms.org/` öffnen und mit GitHub anmelden.
2. Pages CMS GitHub-App für das Repository zulassen.
3. Repository auswählen. Die `.pages.yml` im Repository definiert die Eingabefelder.
4. Texte, Module, Lehrpersonal, Team und Meldungen bearbeiten. Pages CMS speichert Änderungen in GitHub; Cloudflare Pages veröffentlicht sie automatisch.

**Wichtig:** Die erste Version hat separate Dateien unter `content/`. Dies erleichtert die Website-Anzeige ohne Build-Tool. Die Daten sind zur Sicherheit auf verschiedene JSON-Dateien verteilt; damit überschreiben sich die Bereiche nicht gegenseitig.

## Vor der öffentlichen Bekanntgabe unbedingt erledigen

- Impressum und Datenschutztexte rechtlich prüfen und ausfüllen.
- Verantwortlichen Träger, Postanschrift und Kontaktmöglichkeit klären.
- Namen und Rollen der Personen bestätigen; deren Fotos nur mit Berechtigung veröffentlichen.
- Wenn verbindliche Anmeldungen erwünscht sind, Datenschutz-konformes Formular anschließen. Aktuell führt die Kontakt-Schaltfläche zu Instagram bzw. optional E-Mail; **es werden keine Anmeldedaten gespeichert**.
- Vordefinierte Beispielmeldungen und Kursangaben mit aktuellem Angebot abgleichen.

## Dateien

- `index.html`, `styles.css`, `app.js`: Gestaltung und Darstellung
- `content/*.json`: Text-, Kurs-, Team- und Newsdaten
- `.pages.yml`: Eingabemaske für Pages CMS
- `assets/`: bereitgestelltes Qalam-Material

Keine Tracking-/Analytics-Skripte enthalten; keine Serverformulare oder Nutzerdatenspeicherung.
