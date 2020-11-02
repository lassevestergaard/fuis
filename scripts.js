function init(){
  $('.btnNext').click(function() {
      $('.nav-tabs .active').parent().next('li').find('a').trigger('click');
  });

  $('.btnPrevious').click(function() {
      $('.nav-tabs .active').parent().prev('li').find('a').trigger('click');
  });


  // SWOT
  createSectionDiv($("#swot"), "swot_strengths", "Strengths", ["What gives your organization advantages over others in your industry?","Strategic information systems initiatives"], "Add advantage", ["E.g. what does your product or solution offer that your competitors cannot?", "E.g. how can you make better use of your strengths through new information systems?"], "Add initiative");
  createSectionDiv($("#swot"), "swot_weaknesses", "Weaknesses", ["test","test"], "btnText", ["placeholders","placeholders"], "subBtnText");
  createSectionDiv($("#swot"), "swot_opportunities", "Opportunities", ["test","test"], "btnText", ["placeholders","placeholders"], "subBtnText");
  createSectionDiv($("#swot"), "swot_threats", "Threats", ["test","test"], "btnText", ["placeholders","placeholders"], "subBtnText");


  // Porter's five competitive forces
  createSectionDiv($("#portersfcf"), "portersfcf_threatEntrants", "Potential threat of new entrants", ["test","test"], "btnText", ["placeholders","placeholders"], "subBtnText");
  createSectionDiv($("#portersfcf"), "portersfcf_bargainingBuyers", "Bargaining power of buyers", ["test","test"], "btnText", ["placeholders","placeholders"], "subBtnText");
  createSectionDiv($("#portersfcf"), "portersfcf_bargainingSuppliers", "Bargaining power of suppliers", ["test","test"], "btnText", ["placeholders","placeholders"], "subBtnText");
  createSectionDiv($("#portersfcf"), "portersfcf_threatSubstitution", "Potential threat of substitutes", ["test","test"], "btnText", ["placeholders","placeholders"], "subBtnText");
  createSectionDiv($("#portersfcf"), "portersfcf_rivalry", "Industry competitive rivalry", ["test","test"], "btnText", ["placeholders","placeholders"], "subBtnText");


  // Critical success factors
  createSectionDiv($("#criticalsf"), "criticalsf_criticalsf", "Critical success factors", ["test","test"], "Add success factor", ["placeholders","placeholders"], "Add IS initiative", true);
}

// columns is a list of headlines
function createSectionDiv(parent, divid, headline, columns, btnText, placeholders, subBtnText, sortable=false){
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

  let thead = $( "<thead/>", {}).appendTo(table);
  let tr = $( "<tr/>", {}).appendTo(thead);

  if(sortable) $( "<th/>", {"class":"border-top-0 border-left-0"}).appendTo(tr);

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
  }

  addButtonRow("#"+divid, btnText, placeholders, subBtnText, sortable);
}


function addTableRow(parent, placeholders, btnText, sortable){
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
  let td2 = $( "<td/>", {}).appendTo(tr);

  let btn = addButton(td2, btnText, placeholders[1]);

  addInputText(td1, placeholders[0], false);

  addInputText(btn, placeholders[1], true);
}

// insertBefore is boolean
function addInputText(parent, placeholderText, insertBefore, inputText=""){
    let div = $("<div/>",{
      "class": "input-group mb-2"
    });

    insertBefore ? div.insertBefore(parent) : div.appendTo(parent);

    let inp = $("<input/>", {
      "type": "text",
      "class": "form-control initiative",
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
          ib ? $(this).closest("input").remove() : $(this).closest("tr").remove();
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

function addButtonRow(parentid, btnText, placeholders, subBtnText, sortable){
  let btn = $( "<button/>", {
    "type": "button",
    "class": "btn btn-success",
    text: btnText,
    click: function(){
      addTableRow($(parentid + " table tbody"), placeholders, subBtnText, sortable);
    }
  }).appendTo($(parentid));
}
