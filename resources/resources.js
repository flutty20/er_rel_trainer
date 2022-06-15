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
  "shuffle": true                       // Phrasen mischen
};

/**
 * phrases data
 * @type {Object[]}
 */
export const phrases = [
  {
    "text": "Zu jedem Patienten gibt es eine Patientenakte.",
    "relationship": [ "Patient", "hat", "Patientenakte" ],
    "solution": [ "1", "1" ]
  },
  {
    "text": "Eine Stadt kann ein U-Bahnnetz haben.",
    "relationship": [ "Stadt", "hat", "U-Bahnnetz" ],
    "solution": [ "1", "c" ]
  },
  {
    "text": "Zu jedem Topf gibt es einen Deckel, es gibt allerdings auch Töpfe ohne Deckel (z.B. Wok).",
    "relationship": [ "Topf", "hat", "Deckel" ],
    "solution": [ "c", "1" ]
  },
  {
    "text": "Ein Planet kann Monde haben, die ihn umkreisen.",
    "relationship": [ "Planet", "hat", "Mond" ],
    "solution": [ "1", "cn" ]
  },
  {
    "text": "Ein Rucksack kann mehrere Gegenstände enthalten.",
    "relationship": [ "Rucksack", "enthält", "Gegenstand" ],
    "solution": [ "c", "cn" ]
  },
  {
    "text": "Kunden kaufen Produkte.",
    "relationship": [ "Kunde", "hat gekauft", "Produkt" ],
    "solution": [ "cn", "cn" ]
  },
  {
    "text": "Ein Mensch kann keine, eine oder mehrere Staatsangehörigkeiten besitzen.",
    "relationship": [ "Mensch", "besitzt", "Staatsangehörigkeit" ],
    "solution": [ "n", "cn" ]
  },
  {
    "text": "Ein Buch hat mehrere Seiten.",
    "relationship": [ "Buch", "hat", "Seite" ],
    "solution": [ "1", "n" ]
  },
  {
    "text": "Ein Wald hat Bäume.",
    "relationship": [ "Wald", "hat", "Bäume" ],
    "solution": [ "c", "n" ]
  },
  {
    "text": "Auf einem Rezept stehen Zutaten.",
    "relationship": [ "Rezept", "hat", "Zutat" ],
    "solution": [ "cn", "n" ]
  },
  {
    "text": "Ein Haus hat Eigentümer und Eigentümer haben Häuser.",
    "relationship": [ "Haus", "hat", "Eigentümer" ],
    "solution": [ "n", "n" ]
  }
];

/**
 * texts and labels
 * @type {Object}
 */
export const text = {
  "attr_modal_cancel": "Abbrechen",
  "attr_modal_confirm": "Hinzufügen",
  "attr_modal_title": "Neues Schlüsselattribut",
  "attr_name": "Name des Schlüsselattributs",
  "cancel": "Abbrechen",
  "comment": {
    "create_tables": "Hinweis: Legen Sie mit Hilfe der Buttons die nötigen Tabellen an.",
    "add_keys": "Hinweis: Ergänzen Sie in jeder angelegten Tabelle die erforderlichen Schlüsselattribute.",
    "missing_arrow": "Hinweis: Setzen Sie für die Verbindungslinie zwischen zwei Tabellen die Pfeilspitzen, um die Richtung festzulegen, in der die Tabellen miteinander in Beziehung stehen.",
    "missing_entity_table": "Hinweis: Für jede der beiden Entitäten muss eine Tabelle erstellt werden.",
    "missing_entity_pk": "Hinweis: Jede der beiden Entitätstabelle benötigt einen Primärschlüssel.",
    "no_nm_table": "Hinweis: Die mittlere \"%middle%\"-Tabelle wird nur bei einer N:M-Beziehung benötigt.",
    "missing_nm_table": "Hinweis: Da es sich um eine N:M-Beziehung handelt, wird eine \"%middle%\"-Tabelle benötigt.",
    "missing_nm_fk": "Hinweis: Die \"%middle%\"-Tabelle benötigt zwei Fremdschlüssel die jeweils auf eine der beiden Entitätstabellen verweisen.",
    "missing_nm_pk": "Hinweis: Damit jede Kombination aus \"%fk%\" und \"%nofk%\" nur einmal vorkommen kann, müssen in der \"%middle%\"-Tabelle die beiden Fremdschlüssel einen zusammengesetzten Primärschlüssel bilden.",
    "missing_11_fk": "Hinweis: Wenn bei einer 1:1-Beziehung beide Entitäten über exakt identische Kardinalitäten verfügen, wird ein Fremdschlüssel bei der Hauptentität (hier \"%fk%\") hinzugefügt. Die Hauptentität (hier immer auf der linken Seite) ist die Entität, auf die in der zukünftigen Anwendung in der Regel zuerst zugegriffen wird.",
    "missing_1c_fk": "Hinweis: Wenn bei einer 1:1-Beziehung beide Entitäten über unterschiedliche Kardinalitäten verfügen, wird der Fremdschlüssel bei der schwächeren Entität (hier \"%fk%\") hinzugefügt. Eine Entität ist eine schwache Entität, wenn ihre Existenz von der jeweils anderen Entität abhängt.",
    "missing_1n_fk": "Hinweis: Bei einer 1:N-Beziehung wird der Fremdschlüssel bei der einfachen Entität (hier \"%fk%\") hinzugefügt. Eine einfache Entität ist die Entität, die höchstens einmal mit der jeweils anderen Entität verbunden ist.",
    "missing_11_unique": "Hinweis: Bei einer 1:1-Beziehung muss der Fremdschlüssel eindeutig sein, damit nicht mehrere Datensätze von \"%fk%\" über den Fremdschlüssel auf denselben \"%nofk%\"-Datensatz verweisen können.",
    "missing_opt": "Hinweis: Da ein \"%fk%\"-Datensatz auch keinen zugehörigen \"%nofk%\"-Datensatz haben kann, muss der Fremdschlüssel optional sein.",
    "missing_arrowhead": "Hinweis: Da der Fremdschlüssel bei \"%fk%\" gesetzt ist und auf \"%nofk%\" verweist, geht der Pfeil von \"%fk%\" nach \"%nofk%\".",
    "missing_arrowhead_nm": "Hinweis: Da die beiden Fremdschlüssel der \"%middle%\"-Tabelle auf die beiden äußeren Tabellen \"%fk%\" und \"%nofk%\" verweisen, gehen die Pfeile von der mittleren Tabelle zu den äußeren Tabellen.",
    "mandatory_11": "Anmerkung: Es kann vorkommen, dass es einen \"%nofk%\"-Datensatz gibt, zu dem kein \"%fk%\"-Datensatz existiert, der über den Fremdschlüssel auf den \"%nofk%\"-Datensatz verweist. Das es zu jedem \"%nofk%\"-Datensatz immer genau einen \"%fk%\"-Datensatz gibt, lässt sich hier im relationalen Schema nicht darstellen. Dies muss später in der Datenbank mit anderen Mitteln sichergestellt werden.",
    "mandatory_1n": "Anmerkung: Es kann vorkommen, dass es einen \"%nofk%\"-Datensatz gibt, zu dem kein \"%fk%\"-Datensatz existiert, der über den Fremdschlüssel auf den \"%nofk%\"-Datensatz verweist. Das es zu jedem \"%nofk%\"-Datensatz immer mindestens einen \"%fk%\"-Datensatz gibt, lässt sich hier im relationalen Schema nicht darstellen. Dies muss später in der Datenbank mit anderen Mitteln sichergestellt werden.",
    "mandatory_nm": "Anmerkung: Es kann vorkommen, dass es einen \"%nofk%\"-Datensatz gibt, zu dem in der \"%middle%\"-Tabelle kein Datensatz existiert, der dem \"%nofk%\"-Datensatz einen \"%fk%\"-Datensatz zuordnet. Das es zu jedem \"%nofk%\"-Datensatz immer mindestens einen zugehörigen \"%fk%\"-Datensatz gibt, lässt sich hier im relationalen Schema nicht darstellen. Dies muss später in der Datenbank mit anderen Mitteln sichergestellt werden.",
    "merge_11": "Anmerkung: In der Praxis werden 1:1-Beziehungen häufig zu einer Tabelle zusammengefasst."
  },
  "comment_prefix": "Richtig! Hier noch ein paar ergänzende Hinweise:",
  "correct": "Ihre Antwort war richtig!",
  "current_state": "Sie haben %% von %% Aufgaben richtig beantwortet!",
  "entity1": "Entity 1",
  "entity2": "Entity 2",
  "failed": "Ihre letzte Antwort war falsch!",
  "finish": "Neustart",
  "fk": "Fremdschlüssel",
  "fk_badge": "Fremdschlüssel: Attribut das auf einen Datensatz einer anderen Tabelle verweist.",
  "fk_input": "Geben Sie hier an, ob der Schlüssel ein Fremdschlüssel ist.",
  "heading": "Gegeben ist ein ER-Diagramm, das eine binäre Beziehung zwischen zwei Entitäten zeigt. Ihre Aufgabe ist es das ER-Diagramm in ein logisches relationales Schema zu überführen und dafür die nötigen Tabellen anzulegen, darin die erforderlichen Schlüsselattribute zu ergänzen und die Richtung festzulegen, in der die Tabellen miteinander in Beziehung stehen.",
  "key_attr": "Schlüsselattribut",
  "legend": "Legende",
  "multi_pk_badge": "Zusammengesetzter Primärschlüssel: Attribute mit denen sich ein Datensatz dieser Tabelle eindeutig identifizieren lässt.",
  "next": "Weiter",
  "notation": "ER-Notation:",
  "opt": "Optional",
  "opt_badge": "Optionales Attribut: Muss nicht zwingend einen Wert haben.",
  "opt_input": "Geben Sie hier an, ob es sich bei dem Fremdschlüssel um ein optionales Attribut handelt.",
  "phrase": "Phrase [%%]:",
  "pk": "Primärschlüssel",
  "pk_badge": "Primärschlüssel: Attribut mit dem sich ein Datensatz dieser Tabelle eindeutig identifizieren lässt.",
  "pk_input": "Geben Sie hier an, ob der Schlüssel ein Primärschlüssel ist bzw. zum zusammengesetzten Primärschlüssel gehört.",
  "ref_table": "Referenzierte Tabelle / Typ:",
  "ref_table_input": "Geben Sie hier an auf welche Tabelle der Fremdschlüssel verweist.",
  "remove_attr": "Schlüsselattribut entfernen",
  "retry": "Korrigieren",
  "selection": [ "Bitte auswählen", "einfach", "bedingt", "mehrfach", "bedingt mehrfach" ],
  "show_feedback": "Zeige Feedback",
  "show_solution": "Zeige Lösung",
  "submit": "Antworten",
  "table": "-Tabelle",
  "title": "Los-Trainer",
  //new
  "typ": "-Typ",
  "refo": "Referenz",
  "refo_input": "Geben Sie hier an, ob es sich um einen referenzierung handelt.",
  "refo_badge": "Referenz: ist ein Atrebut welches auf einen anderen typen verweist.",
  "eb":"Einbettung",
  "eb_input": "Geben Sie hier an, ob es sich um einen Einbettung handelt.",
  "eb_badge": "Einbettung: Ein eingebetterter typ versiert seine eigenstendigkeit",
  "ma": "Mengenwertigesatrebut ",
  "ma_input": "Geben Sie hier an, ob es sich um einen Mengenwertigesatrebut handelt.",
  "ma_badge": "Mengenwertigesatrebut: ermöglicht es Arrys unter einem atribut zu verwalten."
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
