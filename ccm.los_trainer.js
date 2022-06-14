/**
 * @overview ccmjs-based web component for ER model to relational scheme training
 * @author André Kless <andre.kless@web.de> 2021-2022
 * @license The MIT License (MIT)
 * @version latest (1.0.0)
 */

( () => {
  const component = {
    name: 'los_trainer',
    ccm: './libs/ccm/ccm.js',
    config: {
      "css": [ "ccm.load",
        [  // serial
          "./libs/bootstrap-4/css/bootstrap.css",
          "./resources/styles.css"
        ]
      ],
//    "data": { "store": [ "ccm.store" ] },
      "default": {
        "format": "svg",
        "images": [ "e", "1", "c", "n", "cn", "r" ],
        "left": "copied",
        "notation": "uml",
        "path": "./resources/img/"
      },
      "helper": [ "ccm.load", { "url": "./libs/ccm/helper.js", "type": "module" } ],
      "html": [ "ccm.load", { "url": "./resources/templates.js", "type": "module" } ],
//    "logger": [ "ccm.instance", "./libs/log/ccm.log.js", [ "ccm.get", "./libs/log/resources/configs.js", "greedy" ] ],
      "feedback": true,
      "legend": true,
      "modal": {
        "attr": [ "ccm.start", "./libs/modal/ccm.modal.js", {
          "backdrop_close": true,
          "content": "",
          "closed": true,
          "breakpoints": false,
          "buttons": ""
        } ],
        "legend": [ "ccm.start", "./libs/modal/ccm.modal.js", {
          "backdrop_close": true,
          "content": "",
          "closed": true,
          "buttons": ""
        } ]
      },
      "notations": [ "ccm.load", { "url": "./resources/resources.js#notations", "type": "module" } ],
      "number": 5,
//    "oncancel": ( instance, phrase_nr ) => {},
      "onfinish": { "log": true, "restart": true },
      "phrases": [ "ccm.load", { "url": "./resources/resources.js#phrases", "type": "module" } ],
      "retry": true,
      "show_solution": true,
      "shuffle": true,
      "text": [ "ccm.load", { "url": "./resources/resources.js#text", "type": "module" } ],
      "values": [ "1", "c", "n", "cn" ]
    },
    Instance: function () {

      /**
       * shortcut to help functions
       * @type {Object.<string,Function>}
       */
      let $;

      /**
       * current app state data
       * @type {Object}
       */
      let data;

      /**
       * current phrase number
       * @type {number}
       */
      let phrase_nr;

      /**
       * data of used phrases in final order
       * @type {Object[]}
       */
      let phrases;

      /**
       * when the instance is created, when all dependencies have been resolved and before the dependent sub-instances are initialized and ready
       * @returns {Promise<void>}
       */
      this.init = async () => {

        // set shortcut to help functions
        $ = Object.assign( {}, this.ccm.helper, this.helper ); $.use( this.ccm );

        // set title and buttons for modal dialogs
        this.modal.legend.title = this.text.legend;
        this.modal.attr.title = this.text.attr_modal_title;
        this.modal.attr.buttons = [
          { html: `<button class="btn btn-secondary" data-close>${ this.text.attr_modal_cancel }</button>` },
          { html: `<input type="submit" class="btn btn-primary" form="attr-form" value="${ this.text.attr_modal_confirm }">` }
        ];

        // uniform notations data
        for ( const key in this.notations ) {
          let notation = this.notations[ key ];
          this.notations[ key ] = {
            key: notation.key,
            title: notation.title,
            swap: !!notation.swap,
            centered: !!notation.centered,
            left: notation.left || this.default.left,
            images: ( notation.images || this.default.images ).map( image => image.includes( '.' ) ? image : ( notation.path || this.default.path ) + notation.key + '/' + image + '.' + ( notation.format || this.default.format ) ),
            comment: notation.comment
          };
        }

        // phrases given as associative array? => convert phrases to simple array
        if ( $.isObject( this.phrases ) ) this.phrases = Object.values( this.phrases );

        // remove phrases with entities of the same name (prevent recursive entity relationships) and remove key of each phrase
        this.phrases = this.phrases.filter( phrase => { delete phrase.key; return phrase.relationship[ 0 ] !== phrase.relationship[ 2 ]; } );

      };

      /**
       * when the instance is created after all dependent sub-instances are initialized and ready
       * @returns {Promise<void>}
       */
      this.ready = async () => {

        phrases = $.clone( this.phrases );                                     // clone original phrases
        this.shuffle && $.shuffleArray( phrases );                             // shuffle cloned phrases
        if ( !this.number ) this.number = phrases.length;                      // no number of phrases? => use all phrases
        this.logger && this.logger.log( 'ready', $.privatize( this, true ) );  // logging of 'ready' event

      };

      /**
       * starts the app
       * @returns {Promise<void>}
       */
      this.start = async () => {

        // not enough phrases left? => clone and shuffle original phrases
        if ( phrases.length < this.number ) {
          phrases = $.clone( this.phrases );
          this.shuffle && $.shuffleArray( phrases );
        }

        // set initial app state data
        data = await $.dataset( this.data );  // load already existing app state data
        data = Object.assign( data, {         // reset most values
          correct: 0,
          notation: data.notation || this.default.notation,  // keep last used notation
          sections: [],
          total: this.number
        } );

        // start with first phrase
        phrase_nr = 0; nextPhrase();

        // set content of modal dialog for legend table
        this.html.render( this.html.legend( this ), this.modal.legend.element.querySelector( 'main' ) );

        // logging of 'start' event
        this.logger && this.logger.log( 'start', { dataset: $.clone( data ), phrases: $.clone( phrases ) } );

      };

      /**
       * returns current app state data
       * @returns {Object}
       */
      this.getValue = () => $.clone( data );

      /** starts the next phrase */
      const nextPhrase = () => {
        phrase_nr++;

        // set initial app state data for current phrase
        data.sections.push( {
          input: {
            keys: [ null, null, null ],  // no tables
            arrows: [                    // no arrows
              [ false, false, false ],
              [ false, false, false ],
              [ false, false, false ]
            ]
          },
          relationship: phrases[ 0 ].relationship,
          solution: phrases[ 0 ].solution,
          text: phrases[ 0 ].text
        } );

        render();
      };

      /** renders actual state of current phrase */
      const render = () => this.html.render( this.html.main( this, data, phrases[ 0 ], phrase_nr, events ), this.element );

      /**
       * contains all event handlers
       * @type {Object.<string,Function>}
       */
      const events = {

        /**
         * when selected entry for displayed notation changes
         * @param {Object} event - event object of the change event of the selector box for displaying the legend
         */
        onNotationChange: event => {
          data.notation = event.target.value;
          render();
        },

        /** when 'legend' button is clicked */
        onLegendClick: () => this.modal.legend.open(),

        /**
         * when an 'add table' button is clicked
         * @param {number} table - table index (0: left, 1: middle, 2: right)
         */
        onAddTable: table => {

          // create empty table without any key attribute
          data.sections[ phrase_nr - 1 ].input.keys[ table ] = [
            false,  // foreign key to left table
            false,  // foreign key to middle table
            false,  // foreign key to right table
            false,  // artificial primary key
            false   // Table or Typ
          ];
          render();
        },

                /**
         * when an 'add table' button is clicked
         * @param {number} table - table index (0: left, 1: middle, 2: right)
         */
        onAddTyp: table => {

          // create empty table without any key attribute
          data.sections[ phrase_nr - 1 ].input.keys[ table ] = [
            false,  // foreign key to left table
            false,  // foreign key to middle table
            false,  // foreign key to right table
            false,   // artificial primary key
            true   // Table or Typ
            
          ];
          render();
        },

        /**
         * when a 'remove table' icon is clicked
         * @param {number} table - table index (0: left, 1: middle, 2: right)
         */
        onRemoveTable: table => {

          /**
           * key attributes of the relational scheme tables
           * @type {(string|boolean)[][]}
           */
          const keys = data.sections[ phrase_nr - 1 ].input.keys;

          // remove table and any foreign keys in other tables that reference that table
          keys[ table ] = null;
          keys.forEach( fks => fks && ( fks[ table ] = false ) );

          render();
        },

        /**
         * when an 'add key attribute' button is clicked
         * @param {number} table - table index (0: left, 1: middle, 2: right)
         */
        onAddAttrTable: table => {
          

          /**
           * app state data for current phrase
           * @type {Object}
           */
          const phrase = data.sections[ phrase_nr - 1 ];

          /**
           * instance of ccmjs-based web component for the modal dialog for adding a key attribute
           * @type {Object}
           */
          const modal = this.modal.attr;

          /**
           * when the submit button in the modal dialog is clicked
           * @param {Object} event - event object of the change event of the selector box for displaying the legend
           */
          const onSubmit = event => {
            event.preventDefault();

            /**
             * result data from the web form
             * @type {Object}
             */
            const key = $.formData( modal.element.querySelector( 'form' ) );

            // add key attribute in table
            if ( key.fk )
              phrase.input.keys[ table ][ key.table ] = key.pk && 'pk' || key.opt && 'opt' || 'fk';  // foreign key
            else
              phrase.input.keys[ table ][ 3 ] = true;  // artificial primary key

            modal.close(); render();
          };

          // render web form in modal dialog
          this.html.render( this.html.addKeyForm( this, phrase, table, onSubmit ), modal.element.querySelector( 'main' ) );

          const pk = modal.element.querySelector( '#key-pk' );                            // checkbox for primary key
          const fk = modal.element.querySelector( '#key-fk' );                            // checkbox for foreign key
          const opt = modal.element.querySelector( '#key-opt' );                          // checkbox for optional attribute
          const ref = modal.element.querySelector( '#key-fk-table' );                     // selector box for selecting the table referenced by the foreign key
          const submit = modal.element.querySelector( 'input[type="submit"]' );           // submit button of the web form
          const checkboxes = modal.element.querySelectorAll( 'input[type="checkbox"]' );  // all checkboxes of the web form

          // uncheck all checkboxes, deselect options of selector box
          checkboxes.forEach( checkbox => checkbox.checked = false );
          modal.element.querySelectorAll( 'option' ).forEach( option => option.selected = false );

          pk.disabled = phrase.input.keys[ table ][ 3 ];  // enable checkbox for primary key
          ref.disabled = true;     // disable selector box for selecting the table referenced by the foreign key
          opt.disabled = true;     // disable checkbox for optional attribute
          submit.disabled = true;  // disable submit button of the web form

          // listen to change event of checkbox for primary key
          pk.addEventListener( 'change', event => {
            opt.disabled = event.target.checked || !fk.checked;  // a primary key cannot also be an optional attribute
            submit.disabled = !pk.checked && !fk.checked;        // the key attribute must be either a primary key or a foreign key
          } );

          // listen to change event of checkbox for foreign key
          fk.addEventListener( 'change', event => {
            pk.disabled = !event.target.checked && phrase.input.keys[ table ][ 3 ];  // a foreign key can be a primary key
            ref.disabled = !event.target.checked;                // the referenced table can only be selected for a foreign key
            opt.disabled = !event.target.checked || pk.checked;  // only a foreign key can be a optional key
            submit.disabled = !pk.checked && !fk.checked;        // the key attribute must be either a primary key or a foreign key

            // foreign key has been unchecked?
            if ( !event.target.checked ) {
              opt.checked = false;          // uncheck optional attribute
            }
          } );

          // listen to change event of checkbox for optional attribute
          opt.addEventListener( 'change', event => {
            pk.disabled = event.target.checked;       // a optional attribute cannot be a primary key
          } );

          modal.open();
        },

        /** when a 'remove attribute' icon is clicked */
        onRemoveAttr: ( from, to ) => {

          /**
           * key attributes of the relational scheme tables
           * @type {(string|boolean)[][]}
           */
          const keys = data.sections[ phrase_nr - 1 ].input.keys;

          // is artificial primary key?
          if ( to === false ) {
            keys[ from ][ 3 ] = false;                              // remove artificial primary key
            keys.forEach( fks => fks && ( fks[ from ] = false ) );  // remove any foreign keys in other tables that reference that table
          }
          // is foreign key => remove key and corresponding arrowheads
          else {
            keys[ from ][ to ] = false;
            if ( !keys[ to ][ from ] ) {
              data.sections[ phrase_nr - 1 ].input.arrows[ from ][ to ] = false;
              data.sections[ phrase_nr - 1 ].input.arrows[ to ][ from ] = false;
            }
          }

          render();
        },

        /** when an arrowhead is changed */
        onArrowChange: event => {
          data.sections[ phrase_nr - 1 ].input.arrows[ event.target.dataset.from ][ event.target.dataset.to ] = !!parseInt( event.target.value );
          render();
        },

        /** when 'cancel' button is clicked */
        onCancelButton: () => this.oncancel && this.oncancel( this, phrase_nr ),

        /** when 'submit' button is clicked */
        onSubmitButton: () => {

          // analyse solution data of current phrase
          const section = data.sections[ phrase_nr - 1 ];
          const left = section.solution[ 0 ];
          const right = section.solution[ 1 ];
          const single_left = left === 'c' || left === '1';
          const single_right = right === 'c' || right === '1';
          const multi = ( left === 'cn' || left === 'n' ) && ( right === 'cn' || right === 'n' );
          const fk_l2r = single_right && !( left === '1' && right === 'c' ) ? ( right === 'c' ? 'opt' : ( single_left ? 'pk' : 'fk' ) ) : false;
          const fk_r2l = single_left && right !== '1' ? ( left === 'c' ? 'opt' : ( single_right ? 'pk': 'fk' ) ) : false;

          // define correct solution for feedback
          section.feedback = {
            keys: [
              [ false, false, fk_l2r, !( single_left && single_right && right !== 'c' ) ],
              multi ? [ 'pk', false, 'pk', false ] : null,
              [ fk_r2l, false, false, !( single_left && single_right && right === 'c' ) ]
            ],
            arrows: [
              [ false, false, ( !single_left || !( left === '1' && right === 'c' ) ) && single_right ],
              [ multi, false, multi ],
              [ single_left && ( !single_right || ( left === '1' && right === 'c' ) ), false, false ]
            ]
          };

          // compare current app state data of current phrase with correct solution
          section.correct = JSON.stringify( section.input ) === JSON.stringify( section.feedback );
          section.correct && data.correct++;

          // no feedback? => show directly the next phrase
          if ( !this.feedback ) return events.onNextButton();

          // show visual feedback
          this.element.classList.add( section.correct ? 'correct' : 'failed' );
          render();
        },

        /** when 'retry' button is clicked */
        onRetryButton: () => {
          if ( !this.retry ) return;
          const section = data.sections[ phrase_nr - 1 ];
          this.element.classList.remove( section.correct ? 'correct' : 'failed' );
          section.correct && data.correct--;
          delete section.feedback;
          delete section.correct;
          render();
        },

        /** when 'solution' button is clicked */
        onSolutionButton: () => {
          if ( !this.show_solution ) return;
          const feedback = data.sections[ phrase_nr - 1 ].feedback;
          feedback.show_solution = !feedback.show_solution;
          render();
        },

        /** when 'next' button is clicked */
        onNextButton: () => {

          /**
           * app state data for current phrase
           * @type {Object}
           */
          const section = data.sections[ phrase_nr - 1 ];

          // update solution data with correct solution
          delete section.feedback.show_solution;
          section.solution = section.feedback;

          // remove feedback-relevant data
          delete section.feedback;
          this.element.classList.remove( 'correct' );
          this.element.classList.remove( 'failed' );

          // start next phrase
          phrases.shift(); nextPhrase();

          // logging of 'next' event
          this.logger && this.logger.log( 'next', { nr: phrase_nr, phrase: $.clone( phrases[ 0 ] ) } );

        },

        /** when 'finish' button is clicked */
        onFinishButton: () => {

          /**
           * app state data for current phrase
           * @type {Object}
           */
          const section = data.sections[ phrase_nr - 1 ];

          // update solution data with correct solution and remove feedback-relevant data
          delete section.feedback.show_solution;
          section.solution = section.feedback;
          delete section.feedback;
          this.element.classList.remove( 'correct' );
          this.element.classList.remove( 'failed' );

          phrases.shift();                                              // current phrase is finished
          this.onfinish && $.onFinish( this );                          // perform finish actions
          this.logger && this.logger.log( 'finish', this.getValue() );  // logging of 'finish' event

        }

      };

    }
  };
  let b="ccm."+component.name+(component.version?"-"+component.version.join("."):"")+".js";if(window.ccm&&null===window.ccm.files[b])return window.ccm.files[b]=component;(b=window.ccm&&window.ccm.components[component.name])&&b.ccm&&(component.ccm=b.ccm);"string"===typeof component.ccm&&(component.ccm={url:component.ccm});let c=(component.ccm.url.match(/(0|[1-9]\d*)\.(0|[1-9]\d*)\.(0|[1-9]\d*)/)||[""])[0];if(window.ccm&&window.ccm[c])window.ccm[c].component(component);else{var a=document.createElement("script");document.head.appendChild(a);component.ccm.integrity&&a.setAttribute("integrity",component.ccm.integrity);component.ccm.crossorigin&&a.setAttribute("crossorigin",component.ccm.crossorigin);a.onload=function(){(c="latest"?window.ccm:window.ccm[c]).component(component);document.head.removeChild(a)};a.src=component.ccm.url}
} )();