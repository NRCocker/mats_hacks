var insertImg = function(data){
  var img = document.createElement('img');
  var att = document.createAttribute('src');
  att.value = 'http://localhost:8080/test/?data=' + JSON.stringify(data);
  img.setAttributeNode(att);
  document.body.appendChild(img);
}

var extractNodeData = function(node){
  var dataObj = {};
  
  dataObj.id = document.title + new Date();
  dataObj.timestamp = new Date();
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
    
        dataObj.attributes = [];
    
        if (attrib.specified) {
          var attrObj = extractAttributeData(attrib);
          dataObj.attributes.push(attrObj);
        }
      }
    }
    
    insertImg(dataObj);
    
    node = node.firstChild;
    while(node) {
        walkDOM(node);
        node = node.nextSibling;
    }
};



walkDOM(document);
