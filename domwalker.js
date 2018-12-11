
var body = {};

var extractNodeData = function(node){
  var dataObj = {};
  
  dataObj.id = node.id;
  dataObj.name = node.nodeName;
  dataObj.type = node.nodeType;
  dataObj.value = node.nodeValue;
  dataObj.tag = node.tagName;
  
  return dataObj;
}

var extractAttributeData = function(attribute){
  var attrib = [];
  attrib.name = attribute.name;
  attrib.value = attribute.value;
  
  return attrib;
}

var walkDOM = function (node) {
    var dataObj = extractNodeData(node); // Will be called on every DOM element 
    
    if(typeof node.attributes !== 'undefined'){
      for (var i = 0; i < node.attributes.length; i++) {
        var attrib = node.attributes[i];
    
        dataObj.attibutes = [];
    
        if (attrib.specified) {
          var attrObj = extractAttributeData(attrib);
          dataObj.attributes.push(attrObj);
        }
      }
    }
    
    body.elements.push(dataObj);
    
    node = node.firstChild;
    while(node) {
        walkDOM(node,func);
        node = node.nextSibling;
    }
};

body.id = document.title + new Date();
body.timestamp = new Date();

walkDOM(document);

$.ajax({
  url: "http://localhost:9200/web_data",
  method: "PUT"
}).done(function(){
  $.ajax({
    url: "http://localhost:9200/webdata/_doc/" + body.id,
    method: "PUT",
    data: JSON.stringify(body)
  });
});
