/**
 * @overview data-based resources of ccmjs-based web component for ER model to relational scheme training
 * @author André Kless <andre.kless@web.de> 2021-2022
 * @license The MIT License (MIT)
 */

/**
 * app configuration
 * @type {Object}
 */
export const config = {
  "css.1.1": "./resources/styles.css",  // Layout
  "feedback": true,                     // Direktes Feedback
  "legend": true,                       // "Legende"-Button
  "number": 5,                          // Anzahl der Phrasen, die abgefragt werden.
  "retry": true,                        // "Korrigieren"-Button
  "show_solution": true,                // "Zeige Lösung"-Button
  "shuffle": true,                       // Phrasen mischen
  "easymode": false,                     //berücksichtigt nur die solution //TODO
  "bedingung":true                      //berücksichtigt bei der lösung die bedingung //TODO
};

/**
 * phrases data
 * @type {Object[]}
 */
export const phrases = [
  {
    "text": "Zu jedem Patienten gibt es eine Patientenakte.Die Patientenakte ist ein fester bestateil des Patienten(2e11u, , )",
    "relationship": [ "Patient", "hat", "Patientenakte" ],
    "solution": [ "1", "1" ],
    "esolution":[ "2e11u", "", "" ] //2= ref tabelle, e= einbettung|| r=referenz ,11= 1-1 beziehung||1n= 1-n beziehung ||01= 0-1 beziehung ||0n= 0-n beziehung, u=eindeutig|| ''= keine bedingug|| r=Redundanzkontrolle
  },
  {
    "text": "Eine Stadt kann ein U-Bahnnetz haben.Außerdem ist es möglich dem U-Bahnnetz U-Bahnen hinzuzufügen(2r01r, , )",
    "relationship": [ "Stadt", "hat", "U-Bahnnetz" ],
    "solution": [ "1", "c" ],
    "esolution":[ "2r01r", "", "" ]
  },
  {
    "text": "Zu jedem Deckel gibt es einen Topf, es gibt allerdings auch Töpfe ohne Deckel (z.B. Wok).Der Deckel muss nicht eigenständig sein (2e01u, , )",
    "relationship": [ "Topf", "hat", "Deckel" ],
    "solution": [ "1", "c" ],
    "esolution":[ "2e01u", "", "" ]
  },
  {
    "text": "Ein Planet kann Monde haben, die ihn umkreisen.Jeder Mond soll selbständig bleiben(2r0nu, , )",
    "relationship": [ "Planet", "hat", "Mond" ],
    "solution": [ "1", "cn" ],
    "esolution":[ "2r0nu", "", "" ]
  },
  {
    "text": "Ein Rucksack kann mehrere Gegenstände enthalten.Es soll auf die Gegenstände referenziert werden(2r0nu, , )",
    "relationship": [ "Rucksack", "enthält", "Gegenstand" ],
    "solution": [ "c", "cn" ],
    "esolution":[ "2r0nu", "", "" ]
  },
  {
    "text": "Kunden kaufen Produkte.Nicht nur Kunden sondern auch Angestellte können Produckte Kaufen(2r0n, , )",
    "relationship": [ "Kunde", "hat gekauft", "Produkt" ],
    "solution": [ "cn", "cn" ],
    "esolution":[ "2r0n", "", "" ]
  },
  {
    "text": "Ein Mensch kann keine, eine oder mehrere Staatsangehörigkeiten besitzen.(2r0nr, , )",
    "relationship": [ "Mensch", "besitzt", "Staatsangehörigkeit" ],
    "solution": [ "n", "cn" ],
    "esolution":[ "2r0nr", "", "" ]
  
  },
  {
    "text": "Ein Buch hat mehrere Seiten.Eine seite soll nur über das Buch erreichbar sein(2e1nu, , )",
    "relationship": [ "Buch", "hat", "Seite" ],
    "solution": [ "1", "n" ],
    "esolution":[ "2e1nu", "", "" ]
  },
  {
    "text": "Ein Wald besteht aus Bäume.(2e1nu, , )",
    "relationship": [ "Wald", "besteht aus", "Bäume" ],
    "solution": [ "c", "n" ],
    "esolution":[ "2e1nu", "", "" ]
  },
  {
    "text": "Auf einem Rezept stehen Zutaten.Die Tabelle der Zutaten wir noch von andern Tabellen benötigt (2r1n, , )",
    "relationship": [ "Rezept", "hat", "Zutat" ],
    "solution": [ "cn", "n" ],
    "esolution":[ "2r1n", "", "" ]
  },
  {
    "text": "Ein Haus hat Eigentümer und Eigentümer haben Häuser. Es soll über eine Traditionelle Relationale N-M beziehung gelöst weredn (, t, )",
    "relationship": [ "Haus", "hat", "Eigentümer" ],
    "solution": [ "n", "n" ],
    "esolution":[ "", "t", "" ]
  }
];

/**
 * texts and labels
 * @type {Object}
 */
export const text = {
  "attr_modal_cancel": "Abbrechen",
  "attr_modal_confirm": "Hinzufügen",
  "attr_modal_title": "Neues Attribut",
  "attr_name": "Name des Attributs",
  "cancel": "Abbrechen",
  "comment": {
    "create_tables": "Hinweis: Legen Sie mit Hilfe der Buttons die nötigen Tabellen oder Typen an.",
    "add_keys": "Hinweis: Ergänzen Sie in jeder angelegten Objekt die erforderlichen Attribute.",
    "missing_arrow": "Hinweis: Setzen Sie für die Verbindungslinie zwischen zwei Objekten die Pfeilspitzen, um die Richtung und Mengenwertigkeit festzulegen, in der die Objekte miteinander in Beziehung stehen.",
    "missing_entity_table": "Hinweis: Für jede der beiden Entitäten muss eine Objekt erstellt werden.",
    "missing_entity_oid": "Hinweis: Jede der Objekt benötigt einen Objektidentifikator.",
    "no_nm_table": "Hinweis: Die mittlere \"%middle%\"-Tabelle wird nur bei einer traditionellen N:M-Beziehung benötigt.",
    "missing_nm_table": "Hinweis: Da es sich um eine traditionelle N:M-Beziehung handelt, wird eine \"%middle%\"-Tabelle benötigt.",
    "missing_nm_oref": "Hinweis: Die \"%middle%\"-Tabelle benötigt zwei Referenzen die jeweils auf eine der beiden Entitätstabellen verweisen.",
    "missing_nm_oid": "Hinweis: Damit jede Kombination aus \"%oref%\" und \"%noref%\" nur einmal vorkommen kann, müssen in der \"%middle%\"-Tabelle die beiden Referenzen einen zusammengesetzten Objektidentifikator bilden.",
    "missing_11_oref": "Hinweis: Wenn bei einer 1:1-Beziehung beide Entitäten über exakt identische Kardinalitäten verfügen, wird eine Referenz oder Einbettung bei der Hauptentität (hier \"%oref%\") hinzugefügt. Die Hauptentität (hier immer auf der linken Seite) ist die Entität, auf die in der zukünftigen Anwendung in der Regel zuerst zugegriffen wird.",
    "missing_1c_oref": "Hinweis: Wenn bei einer 1:1-Beziehung beide Entitäten über unterschiedliche Kardinalitäten verfügen, wird die Referenz bei der schwächeren Entität (hier \"%oref%\") hinzugefügt. Eine Entität ist eine schwache Entität, wenn ihre Existenz von der jeweils anderen Entität abhängt.",
    "missing_11_unique": "Hinweis: Bei einer 1:1-Beziehung muss die Referenz eindeutig sein, damit nicht mehrere Datensätze von \"%oref%\" über die Referenz auf denselben \"%noref%\"-Datensatz verweisen können.",
    "missing_arrowhead": "Hinweis: Da die Referenz oder Einbettung bei \"%oref%\" gesetzt ist und auf \"%noref%\" verweist, geht der Pfeil von \"%oref%\" nach \"%noref%\". Achte darauf ob es eine Mege oder ein einzelnes objekt ist",
    "missing_arrowhead_nm": "Hinweis: Da die beiden Referenzen der \"%middle%\"-Tabelle auf die beiden äußeren Tabellen \"%oref%\" und \"%noref%\" verweisen, gehen die Pfeile von der mittleren Tabelle zu den äußeren Objekte.",

    "merge_11": "Anmerkung: In der Praxis werden 1:1-Beziehungen häufig zu einer Objekt zusammengefasst.",

    "wrong_me":"Hinweis: Es liegt ein Fehler an der Mengenwertigkeit vor übernimm die Mengenwertigkeit aus dem ER-Diagramm",
    "wrong_me_nm":"Hinweis: Es liegt ein Fehler an der Mengenwertigkeit vor Die Traditionelle Relationale lösung verwendet 1-1 Mengen",
    "wrong_oref":"Hinweis: Anhand der Aufgabenstellung erkennt man das es sich um eine referen und nicht um eine einbettung handelt",
    "wrong_eb":"Hinweis: Anhand der Aufgabenstellung erkennt man das es sich um eine einbettung und nicht um eine referenz handelt",
    "wrong_tab":"Hinweis: Reverenzen verweisen auf Tabellen, Einbettungen betten Typen ein ",
    "wrong_be":"Hinweis: Die Bedingung ist falsch gesetzt ",
    "wrong_site":"Hinweis die referen oder einbettung befindet sich nicht in der Hauptentität "
  },
  "comment_prefix": "Richtig! Hier noch ein paar ergänzende Hinweise:",
  "correct": "Ihre Antwort war richtig!",
  "current_state": "Sie haben %% von %% Aufgaben richtig beantwortet!",
  "entity1": "Entity 1",
  "entity2": "Entity 2",
  "failed": "Ihre letzte Antwort war falsch!",
  "finish": "Neustart",
  "oref": "Referenz",
  "oref_badge": "Referenz: Attribut das auf einen Datensatz einer anderen Objekt verweist.",
  "oref_input": "Geben Sie hier an, ob es sich um eine Referenz handelt.",
  "heading": "Gegeben ist ein ER-Diagramm, das eine binäre Beziehung zwischen zwei Entitäten zeigt. Ihre Aufgabe ist es das ER-Diagramm in ein logisches relationales Schema zu überführen und dafür die nötigen Objekte anzulegen, darin die erforderlichen Attribute zu ergänzen und die Richtung festzulegen, in der die Objekte miteinander in Beziehung stehen.",
  "key_attr": "Attribut",
  "legend": "Legende",
  "multi_oid_badge": "Zusammengesetzter Objektidentifikator: Attribute mit denen sich ein Datensatz dieser Objekt eindeutig identifizieren lässt.",
  "next": "Weiter",
  "notation": "ER-Notation:",
  "opt": "Optional",
  "opt_badge": "Optionales Attribut: Muss nicht zwingend einen Wert haben.",
  "opt_input": "Geben Sie hier an, ob es sich bei der Referenz um ein optionales Attribut handelt.",
  "phrase": "Phrase [%%]:",
  "oid": "Objektidentifikator",
  "oid_badge": "Objektidentifikator: Attribut mit dem sich ein Datensatz eindeutig identifizieren lässt.",
  "oid_input": "Geben Sie hier an, ob das objekt eine Objektidentifikator besitzt.",
  "ref_select": "Referenzierte Tabelle / Typ:",
  "ref_select_input": "Geben Sie hier an auf welche Objekt die Referenz verweist.",
  "remove_attr": "Attribut entfernen",
  "retry": "Korrigieren",
  "selection": [ "Bitte auswählen", "einfach", "bedingt", "mehrfach", "bedingt mehrfach" ],
  "show_feedback": "Zeige Feedback",
  "show_solution": "Zeige Lösung",
  "submit": "Antworten",
  "table": "-Tabelle",
  "title": "Los-Trainer",
  //new
  "typ": "-Typ",
  "eb":"Einbettung",
  "eb_input": "Geben Sie hier an, ob es sich um einen Einbettung handelt.",
  "eb_badge": "Einbettung: Ein eingebetterter typ versiert seine eigenstendigkeit",
  "ma": "Mengenwertigkeit ",
  "ma_input": "Geben Sie hier die Mengenwertigkeit der beziehung an.",
  "ma_badge": "Mengenwertigesatrebut: ermöglicht es Arrys unter einem atribut zu verwalten.",
  "unique": "Eindeutigkeit",
  "unique_input": "Geben Sie hier an, ob es sich um einen Eindeutigesatrebut handelt.",
  "unique_badge": "Eindeutigesatrebut: stellt sicher das es das selbe objekt nur einmal vorkommt.",
  "redundanz": "Redundanzkontrolle",
  "redundanz_input": "Geben Sie hier an, ob es sich um einen Redundanzkontrolle handelt.",
  "redundanz_badge": "Redundanzkontrolle: stellt sicher das es das selbe objekt nur einmal vorkommt.",
  "bedingung": "Bedingung"

};

/**
 * notations data
 * @type {Object.<string,Object>}
 */
export const notations = {
  "abrial": {
    "key": "abrial",
    "title": "Abrial",
    "centered": true,
    "swap": true,
    "comment": "Die Abrial bzw. (min,max)-Notation gibt für jeden an einer Beziehung beteiligten Entitätstyp an, mit wie vielen Entitäten auf der anderen Seite eine Entität dieses Typs mindestens und höchstens in Beziehung steht."
  },
  "arrow": {
    "key": "arrow",
    "title": "Pfeilnotation",
    "left": "mirrored"
  },
  "chen": {
    "key": "chen",
    "title": "Chen",
    "centered": true,
    "comment": "In der Chen-Notation sind nur einfache und mehrfache Beziehungstypen (1 und N) darstellbar, da die Beziehungsmengen bei Chen nur in ihrer Maximalaussage genannt werden. Bei Phrasen die auf einen bedingten oder mehrfach bedingten Beziehungstyp hindeuten, sollte besser zu einer anderen Notation gewechselt werden."
  },
  "crow": {
    "key": "crow",
    "title": "Krähenfuß",
    "left": "mirrored"
  },
  "mc": {
    "key": "mc",
    "title": "MC"
  },
  "uml": {
    "key": "uml",
    "title": "UML"
  }
};
