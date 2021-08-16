// Prepare demo data
// Data is joined to map using value of 'hc-key' property by default.
// See API docs for 'joinBy' for more info on linking data and map.


var data = [
  'VISTA DEL MONTE ELEMENTARY'
]
let URL = '/schoolsearch/'
class Autocomplete {
  constructor({
    rootNode,
    inputNode,
    resultsNode,
    searchFn,
    shouldAutoSelect = false,
    onShow = () => {},
    onHide = () => {}
  } = {}) {
    this.rootNode = rootNode
    this.inputNode = inputNode
    this.resultsNode = resultsNode
    this.searchFn = searchFn
    this.shouldAutoSelect = shouldAutoSelect
    this.onShow = onShow
    this.onHide = onHide
    this.activeIndex = -1
    this.resultsCount = 0
    this.showResults = false
    this.hasInlineAutocomplete = this.inputNode.getAttribute('aria-autocomplete') === 'both'

    // Setup events
    document.body.addEventListener('click', this.handleDocumentClick)
    this.inputNode.addEventListener('keyup', this.handleKeyup)
    this.inputNode.addEventListener('keydown', this.handleKeydown)
    this.inputNode.addEventListener('focus', this.handleFocus)
    this.resultsNode.addEventListener('click', this.handleResultClick)
  }
  
  handleDocumentClick = event => {
    if (event.target === this.inputNode || this.rootNode.contains(event.target)) {
      return
    }
    this.hideResults()
  }

  handleKeyup = event => {
    const { key } = event

    switch (key) {
      case 'ArrowUp':
      case 'ArrowDown':
      case 'Escape':
      case 'Enter':
        event.preventDefault()
        return
      default:
        this.updateResults()
    }
    
    if (this.hasInlineAutocomplete) {
      switch(key) {
        case 'Backspace':
          return
        default:
          this.autocompleteItem()
      }
    }
  }
  
  handleKeydown = event => {
    const { key } = event
    let activeIndex = this.activeIndex
    
    if (key === 'Escape') {
      this.hideResults()
      this.inputNode.value = ''
      return
    }
    
    if (this.resultsCount < 1) {
      if (this.hasInlineAutocomplete && (key === 'ArrowDown' || key === 'ArrowUp')) {
        this.updateResults()
      } else {
        return
      }
    }
    
    const prevActive = this.getItemAt(activeIndex)
    let activeItem
    
    switch(key) {
      case 'ArrowUp':
        if (activeIndex <= 0) {
          activeIndex = this.resultsCount - 1
        } else {
          activeIndex -= 1
        }
        break
      case 'ArrowDown':
        if (activeIndex === -1 || activeIndex >= this.resultsCount - 1) {
          activeIndex = 0
        } else {
          activeIndex += 1
        }
        break
      case 'Enter':
        activeItem = this.getItemAt(activeIndex)
        this.selectItem(activeItem)
        return
      case 'Tab':
        this.checkSelection()
        this.hideResults()
        return
      default:
        return
    }
    
    event.preventDefault()
    activeItem = this.getItemAt(activeIndex)
    this.activeIndex = activeIndex
    
    if (prevActive) {
      prevActive.classList.remove('selected')
      prevActive.setAttribute('aria-selected', 'false')
    }
    
    if (activeItem) {
      this.inputNode.setAttribute('aria-activedescendant', `autocomplete-result-${activeIndex}`)
      activeItem.classList.add('selected')
      activeItem.setAttribute('aria-selected', 'true')
      if (this.hasInlineAutocomplete) {
        this.inputNode.value = activeItem.innerText
      }
    } else {
      this.inputNode.setAttribute('aria-activedescendant', '')
    }
  }
  
  handleFocus = event => {
    this.updateResults()
  }
  
  handleResultClick = event => {
    if (event.target && event.target.nodeName === 'LI') {
      this.selectItem(event.target)
    }
  }
  
  getItemAt = index => {
    return this.resultsNode.querySelector(`#autocomplete-result-${index}`)
  }
  
  selectItem = node => {
    if (node) {
      this.inputNode.value = node.innerText
      this.hideResults()
    }
  }
  
  checkSelection = () => {
    if (this.activeIndex < 0) {
      return
    }
    const activeItem = this.getItemAt(this.activeIndex)
    this.selectItem(activeItem)
  }
  
  autocompleteItem = event => {
    const autocompletedItem = this.resultsNode.querySelector('.selected')
    const input = this.inputNode.value
    if (!autocompletedItem || !input) {
      return
    }
    
    const autocomplete = autocompletedItem.innerText
    if (input !== autocomplete) {
      this.inputNode.value = autocomplete
      this.inputNode.setSelectionRange(input.length, autocomplete.length)
    }
  }
  
  updateResults = () => {
    const input = this.inputNode.value
    const results = this.searchFn(input)
    
    this.hideResults()
    if (results.length === 0) {
      return
    }
    
    this.resultsNode.innerHTML = results.map((result, index) => {
      const isSelected = this.shouldAutoSelect && index === 0
      if (isSelected) {
        this.activeIndex = 0
      }
      return `
        <li
          id='autocomplete-result-${index}'
          class='autocomplete-result${isSelected ? ' selected' : ''}'
          role='option'
          ${isSelected ? "aria-selected='true'" : ''}
        >
          ${result}
        </li>
      `
    }).join('')
    
    this.resultsNode.classList.remove('hidden')
    this.rootNode.setAttribute('aria-expanded', true)
    this.resultsCount = results.length
    this.shown = true
    this.onShow()
  }
  
  hideResults = () => {
    this.shown = false
    this.activeIndex = -1
    this.resultsNode.innerHTML = ''
    this.resultsNode.classList.add('hidden')
    this.rootNode.setAttribute('aria-expanded', 'false')
    this.resultsCount = 0
    this.inputNode.setAttribute('aria-activedescendant', '')
    this.onHide()
  }
}

const search = input => {
  if (input.length < 1) {
    return []
  }
  return data.filter(item => item.toLowerCase().startsWith(input.toLowerCase()))
}

// const autocomplete = new Autocomplete({
//   rootNode: document.querySelector('.autocomplete'),
//   inputNode: document.querySelector('.autocomplete-input'),
//   resultsNode: document.querySelector('.autocomplete-results'),
//   searchFn: search,
//   shouldAutoSelect: true
// })

document.querySelector('form').addEventListener('submit', (event) => {
  event.preventDefault()
  const result = document.querySelector('.search-result')
  // const input = document.querySelector('.autocomplete-input')
  // result.innerHTML = 'Searched for: ' + input.value
  URL = '/schoolsearch/VISTA DEL MONTE ELEMENTARY';
                         
  Table()
});


(function(window, document, undefined) {

  var factory = function($, DataTable) {
    "use strict";

    $('.search-toggle').click(function() {
      if ($('.hiddensearch').css('display') == 'none')
        $('.hiddensearch').slideDown();
      else
        $('.hiddensearch').slideUp();
    });

    /* Set the defaults for DataTables initialisation */
    $.extend(true, DataTable.defaults, {
      dom: "<'hiddensearch'f'>" +
        "tr" +
        "<'table-footer'lip'>",
      renderer: 'material'
    });

    /* Default class modification */
    $.extend(DataTable.ext.classes, {
      sWrapper: "dataTables_wrapper",
      sFilterInput: "form-control input-sm",
      sLengthSelect: "form-control input-sm"
    });

    /* Bootstrap paging button renderer */
    DataTable.ext.renderer.pageButton.material = function(settings, host, idx, buttons, page, pages) {
      var api = new DataTable.Api(settings);
      var classes = settings.oClasses;
      var lang = settings.oLanguage.oPaginate;
      var btnDisplay, btnClass, counter = 0;

      var attach = function(container, buttons) {
        var i, ien, node, button;
        var clickHandler = function(e) {
          e.preventDefault();
          if (!$(e.currentTarget).hasClass('disabled')) {
            api.page(e.data.action).draw(false);
          }
        };

        for (i = 0, ien = buttons.length; i < ien; i++) {
          button = buttons[i];

          if ($.isArray(button)) {
            attach(container, button);
          } else {
            btnDisplay = '';
            btnClass = '';

            switch (button) {

              case 'first':
                btnDisplay = lang.sFirst;
                btnClass = button + (page > 0 ?
                  '' : ' disabled');
                break;

              case 'previous':
                btnDisplay = '<i class="material-icons">chevron_left</i>';
                btnClass = button + (page > 0 ?
                  '' : ' disabled');
                break;

              case 'next':
                btnDisplay = '<i class="material-icons">chevron_right</i>';
                btnClass = button + (page < pages - 1 ?
                  '' : ' disabled');
                break;

              case 'last':
                btnDisplay = lang.sLast;
                btnClass = button + (page < pages - 1 ?
                  '' : ' disabled');
                break;

            }

            if (btnDisplay) {
              node = $('<li>', {
                  'class': classes.sPageButton + ' ' + btnClass,
                  'id': idx === 0 && typeof button === 'string' ?
                    settings.sTableId + '_' + button : null
                })
                .append($('<a>', {
                    'href': '#',
                    'aria-controls': settings.sTableId,
                    'data-dt-idx': counter,
                    'tabindex': settings.iTabIndex
                  })
                  .html(btnDisplay)
                )
                .appendTo(container);

              settings.oApi._fnBindAction(
                node, {
                  action: button
                }, clickHandler
              );

              counter++;
            }
          }
        }
      };

      // IE9 throws an 'unknown error' if document.activeElement is used
      // inside an iframe or frame. 
      var activeEl;

      try {
        // Because this approach is destroying and recreating the paging
        // elements, focus is lost on the select button which is bad for
        // accessibility. So we want to restore focus once the draw has
        // completed
        activeEl = $(document.activeElement).data('dt-idx');
      } catch (e) {}

      attach(
        $(host).empty().html('<ul class="material-pagination"/>').children('ul'),
        buttons
      );

      if (activeEl) {
        $(host).find('[data-dt-idx=' + activeEl + ']').focus();
      }
    };

    /*
     * TableTools Bootstrap compatibility
     * Required TableTools 2.1+
     */
    if (DataTable.TableTools) {
      // Set the classes that TableTools uses to something suitable for Bootstrap
      $.extend(true, DataTable.TableTools.classes, {
        "container": "DTTT btn-group",
        "buttons": {
          "normal": "btn btn-default",
          "disabled": "disabled"
        },
        "collection": {
          "container": "DTTT_dropdown dropdown-menu",
          "buttons": {
            "normal": "",
            "disabled": "disabled"
          }
        },
        "print": {
          "info": "DTTT_print_info"
        },
        "select": {
          "row": "active"
        }
      });

      // Have the collection use a material compatible drop down
      $.extend(true, DataTable.TableTools.DEFAULTS.oTags, {
        "collection": {
          "container": "ul",
          "button": "li",
          "liner": "a"
        }
      });
    }

  }; // /factory

  // Define as an AMD module if possible
  if (typeof define === 'function' && define.amd) {
    define(['jquery', 'datatables'], factory);
  } else if (typeof exports === 'object') {
    // Node/CommonJS
    factory(require('jquery'), require('datatables'));
  } else if (jQuery) {
    // Otherwise simply initialise as normal, stopping multiple evaluation
    factory(jQuery, jQuery.fn.dataTable);
  }

})(window, document);
function Table () {
   $('#datatable').dataTable({
    "ajax": URL,
    "oLanguage": {
      "sStripClasses": "",
      "sSearch": "",
      "sSearchPlaceholder": "Enter any keyword here to filter...",
      "sInfo": "START -END of TOTAL",
      "sLengthMenu": '<span>Rows per page:</span><select class="browser-default">' +
        '<option value="10">10</option>' +
        '<option value="20">20</option>' +
        '<option value="30">30</option>' +
        '<option value="40">40</option>' +
        '<option value="50">50</option>' +
        '<option value="-1">All</option>' +
        '</select></div>'
    },
    bAutoWidth: false,
    destroy: true,
  });
}