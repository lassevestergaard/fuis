function init(){
  $('.btnNext').click(function() {
      $('.nav-tabs .active').parent().next('li').find('a').trigger('click');
  });

  $('.btnPrevious').click(function() {
      $('.nav-tabs .active').parent().prev('li').find('a').trigger('click');
  });

  $('a[data-toggle="tab"]').on('shown.bs.tab', function (e) {
    if($(e.target).text() == "Step 5")
      initiativesList($("#criticalsf-islist"), $(".dropOnMe"),2);
    else if($(e.target).text() == "Step 6")
      initiativesList2($("#prioritym-islist"), $("#prioritym-ul"));
  });


  // SWOT
  createSectionDiv($("#swot"), "swot_strengths", "Strengths", ["What gives your organization advantages over others in your industry?","Strategic information systems initiatives"], "Add strength", ["E.g. what does your product or solution offer that your competitors cannot?", "E.g. how can you make better use of your strengths through new information systems?"]);
  createSectionDiv($("#swot"), "swot_weaknesses", "Weaknesses", ["What creates disadvantages for the organization relative to others in its industry?","Strategic information systems initiatives"], "Add weakness", ["E.g. what does the competition see as your biggest weakness?","E.g. how can you reduce your weakness through new information systems?"]);
  createSectionDiv($("#swot"), "swot_opportunities", "Opportunities", ["What activities or factors could help the organization get new advantages over others in its industry?","Strategic information systems initiatives"], "Add opportunity", ["E.g. what do you see as a good opportunity that will strengthen your business?","E.g. how can you exploit your opportunities through new information systems?"]);
  createSectionDiv($("#swot"), "swot_threats", "Threats", ["What activities or factors could create disadvantages or troubles for the organization relative to others in its industry?","Strategic information systems initiatives"], "Add threat", ["E.g. is there a competitor that consistently beats you in the marketplace?","E.g. how can you overcome threats through new information systems?"]);


  // Porter's five competitive forces
  createSectionDiv($("#portersfcf"), "portersfcf_threatEntrants", "Potential threat of new entrants", ["How easy is it for new companies to enter the market in which the organization operates?","How could you use information systems to increase barriers to entry in the organization's market?"], "Add threat", ["",""]);
  createSectionDiv($("#portersfcf"), "portersfcf_bargainingBuyers", "Bargaining power of buyers", ["What is the ability (or market power) of the organization's buyers (customers) to reduce its competitive position (e.g., by bringing prices down)?","How could you use information systems to reduce the buyers' power of negotiation?"], "Add bargaining power", ["",""]);
  createSectionDiv($("#portersfcf"), "portersfcf_bargainingSuppliers", "Bargaining power of suppliers", ["What is the ability (or market power) of the organization's suppliers to reduce its competitive position (e.g., by bringing prices up)?","How could you use information systems to reduce the suppliers' power of negotiation?"], "Add bargaining power", ["",""]);
  createSectionDiv($("#portersfcf"), "portersfcf_threatSubstitution", "Potential threat of substitutes", ["What is the likelihood that other products of equal of superior value will be available?","How could you use information systems to make your products unique or make customers unwilling to use substitutes?"], "Add threat", ["",""]);
  createSectionDiv($("#portersfcf"), "portersfcf_rivalry", "Industry competitive rivalry", ["What is the current level of competition in the industry?","How could you use information systems to ensure that competition is limited in the industry?"], "Add rivalry", ["",""]);

  // Porter's value chain analysis
  createSectionDiv($("#portersvca"), "portersvca_primary", "Primary activities", ["What are your primary activities in the process?","How can I use information systems to lower cost or improve the value added?"], "Add activity", ["",""]);
  createSectionDiv($("#portersvca"), "portersvca_support", "Support activities", ["What are your support activities related to the process?","How can I use information systems to lower cost or improve the value added?"], "Add activity", ["",""]);
  // Virtual value chain
  createSectionDiv($("#virtualvc"), "virtualvc_", "Turn raw data into useful information", ["What activities turn raw data into useful information within the organization?","In what ways can information systems make gathering, organizing, selecting, synthesizing, and distributing less expensive and add more value to the firm's information?"], "Add activity", ["",""]);

  // Critical success factors
  createSectionDiv($("#criticalsf"), "criticalsf_criticalsf", "Development of priorities among the most important factors for the organization's success", ["What are the critical success factors of the organization?","Map identified information system initiatives to relevant critical success factors"], "Add success factor", ["",""], true);
}

// columns is a list of headlines
function createSectionDiv(parent, divid, headline, columns, btnText, placeholders, sortable=false){
  let div = $( "<div/>", {
    "id": divid,
    "class": "border p-2 my-4 border-dark"
  }).appendTo(parent);

  $( "<h4/>", {
    text: headline
  }).appendTo(div);

  let table = $( "<table/>", {
    "class": "table table-bordered"
  }).appendTo(div);

  if(sortable){
    table.css("width","70%");
    table.css("display","inline-block");
  }

  let thead = $( "<thead/>", {}).appendTo(table);
  let tr = $( "<tr/>", {}).appendTo(thead);

  if(sortable) $( "<th/>", {}).appendTo(tr);

  let colWidth = 100 / columns.length;

  columns.forEach(function(item, index){
    $( "<th/>", {
      "class" : "align-top",
      "style" : "width: " + colWidth + "%",
      text : item
    }).appendTo(tr);
  });

  let tbd = $( "<tbody/>", {}).appendTo(table);

  if(sortable){
    tbd.sortable({
      handle: ".handle",
      axis: "y",
      placeholder: "sortable-highlight"
    });

    $( "<div/>", {
      "id": "criticalsf-islist",
      "class": "d-inline-block",
      "style":"float:right;"
    }).appendTo(div);

  }

  addButtonRow("#"+divid, btnText, placeholders, sortable);
}


function addTableRow(parent, placeholders, sortable){
  let tr = $( "<tr/>", {}).appendTo(parent);

  if(sortable){
    let td0 = $( "<td/>", {
      "class":"handle align-middle",
      "style":"background-color:green;"
    }).appendTo(tr);

    $("<img>",{
      "src":"icons/arrow-down-up.svg",
      "width":16,
      "height":16,
    }).appendTo(td0);
  }

  let td1 = $( "<td/>", {}).appendTo(tr);
  let td2 = $( "<td/>").appendTo(tr);

  let btn = null;
  if(!sortable)
    btn = addButton(td2, "Add initiative", placeholders[1]);

  addInputText(td1, placeholders[0], false);

  if(!sortable)
    addInputText(btn, placeholders[1], true);
  else{
    $("<ul/>").appendTo(td2);
    td2.addClass("dropOnMe");
  }
}

// insertBefore is boolean
function addInputText(parent, placeholderText, insertBefore, inputText=""){
    let div = $("<div/>",{
      "class": "input-group mb-2"
    });

    let type = "isInitiative";

    if(insertBefore){
      div.insertBefore(parent);
    }else{
      div.appendTo(parent);
      type = "organization";
    }

    //insertBefore ? div.insertBefore(parent) : div.appendTo(parent);

    let inp = $("<input/>", {
      "type": "text",
      "class": "form-control " + type,
      "placeholder": placeholderText
    }).appendTo(div);

    if(inputText != "")
      inp.val(inputText);

    let divAppend = $("<div/>",{
      "class": "input-group-append"
    }).appendTo(div);

    $("<button/>", {
      "class": "btn btn-danger trashbin",
      "type":"button",
      "placeholder": placeholderText,
      click: function(){
        let ib = insertBefore;
        ib ? $(this).parent().parent().remove() : $(this).closest("tr").remove();
      }
    }).appendTo(divAppend);
}

function addButton(parent, text, placeholderText){
  let btn = $( "<button/>", {
    "type": "button",
    "class": "btn btn-success",
    text: text,
    click: function(){
      addInputText(btn, placeholderText, true);
    }
  }).appendTo(parent);

  return btn;
}

function addButtonRow(parentid, btnText, placeholders, sortable){
  let btn = $( "<button/>", {
    "type": "button",
    "class": "btn btn-success",
    text: btnText,
    click: function(){
      addTableRow($(parentid + " table tbody"), placeholders, sortable);
    }
  }).appendTo($(parentid));
}

function initiativesList(parent, dropContainer, mode=1){
  parent.empty();

  let div = $("<div />", {
    "class":"card",
    "style":"width:18rem;"
  }).appendTo(parent);

  $("<div />", {
    "class":"card-header",
    text:"IS initiatives"
  }).appendTo(div);

  let ul = $("<ul />",{
    "class":"list-group list-group-flush"
  }).appendTo(div);

  $(".isInitiative").each(function( index ) {
    $("<li />",{
      "class": "list-group-item",
      text: $(this).val()
    }).appendTo(ul);
  });

  if(mode == 1)
    priorityMDND(parent, dropContainer);
  else if(mode == 2)
    dndBtwLi(parent, dropContainer);
}

function initiativesList2(parent, dropContainer, mode=1){
  parent.empty();

  let div = $("<div />", {
    "class":"card",
    "style":"width:18rem;"
  }).appendTo(parent);

  $("<div />", {
    "class":"card-header",
    text:"IS initiatives"
  }).appendTo(div);

  let ul = $("<ul />",{
    "class":"list-group list-group-flush"
  }).appendTo(div);

  $(".dropOnMe").each(function( index) {
    $(this).find("li").each(function(i,e){
      $("<li />",{
        "class": "list-group-item",
        text: $(e).text()
      }).appendTo(ul);
    });
  });

  if(mode == 1)
    priorityMDND(parent, dropContainer);
  else if(mode == 2)
    dndBtwLi(parent, dropContainer);
}

function priorityMDND(from, to){
    $( "li", from).draggable({
      revert: "invalid", // when not dropped, the item will revert back to its initial position
      containment: "document",
      helper: function( event ) {
        return $("<div/>",{
          text:$(this).text(),
          "class": "border p-2 border-dark bg-light"
        });
      },
      cursor: "move"
    });

    to.droppable({
      accept: "#" + from.attr('id') + " li",
      classes: {
        "ui-droppable-active": "ui-state-highlight"
      },
      drop: function( event, ui ) {
        let newDiv = $(ui.helper).clone().removeClass('ui-draggable-dragging');
        newDiv.css(ui.helper.offset());
        newDiv.css("z-index",100);
        $(this).append(newDiv);

        newDiv.draggable();

        ui.draggable.remove();
      }
    });

    from.droppable({
      accept: "#" + to.attr('id') + " div",
      classes: {
        "ui-droppable-active": "custom-state-active"
      },
      drop: function( event, ui ) {
        let l = $("<li />",{
          "class": "list-group-item",
          text: ui.draggable.text()
        }).appendTo($( "ul", from));

        l.draggable({
          revert: "invalid", // when not dropped, the item will revert back to its initial position
          containment: "document",
          helper: function( event ) {
            return $("<div/>",{
              text:$(this).text(),
              "class": "border p-2 border-dark bg-light"
            });
          },
          cursor: "move"
        });

        ui.draggable.remove();
      }
    });
}

function dndBtwLi(from, to){
    $( "li", from).draggable({
      revert: "invalid", // when not dropped, the item will revert back to its initial position
      containment: "document",
      helper: "clone",
      cursor: "move"
    });

    to.droppable({
      classes: {
        "ui-droppable-active": "ui-state-highlight"
      },
      drop: function( event, ui ) {
        //let pos = ui.draggable.offset();
        let d = ui.draggable.appendTo($("ul", $(this)));
        //d.css(pos);
      }
    });

    from.droppable({
      classes: {
        "ui-droppable-active": "custom-state-active"
      },
      drop: function( event, ui ) {
        //let pos = ui.draggable.offset();
        let d = ui.draggable.appendTo(from);
        //d.css(pos);
      }
    });
}
