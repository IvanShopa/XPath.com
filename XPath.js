document.addEventListener("DOMContentLoaded", () => {
  const xmlInput = document.getElementById("xmlInput");
  const xpathInput = document.getElementById("xpathInput");
  const resultOutput = document.getElementById("resultOutput");

  function XPath() {
    try {
      const parser = new DOMParser();
      const xmlDoc = parser.parseFromString(xmlInput.value, 'application/xml');

      const xpathResult = xmlDoc.evaluate(xpathInput.value, xmlDoc, null, XPathResult.ANY_TYPE, null);
      let result = "";

      if (xpathResult.resultType == XPathResult.NUMBER_TYPE) {
        result = xpathResult.numberValue;
      }
      else if (xpathResult.resultType == XPathResult.STRING_TYPE) {
        result = xpathResult.stringValue;
      }     
      else if (xpathResult.resultType == XPathResult.BOOLEAN_TYPE) {
        result = xpathResult.booleanValue ? "true" : "false";
      }
      else if ((xpathResult.resultType == XPathResult.UNORDERED_NODE_ITERATOR_TYPE) || (xpathResult.resultType == XPathResult.ORDERED_NODE_ITERATOR_TYPE)) {
        let node = xpathResult.iterateNext();
        while (node) {
          if (node.nodeType == Node.ELEMENT_NODE) {
            result = result + node.textContent + "\n";
          }
          else if (node.nodeType == Node.ATTRIBUTE_NODE) {
            result = result + node.value + "\n";
          }
          else {
            result = result + node.nodeValue + "\n";
          }
          node = xpathResult.iterateNext();
        }
      }
      else if ((xpathResult.resultType == XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE) || (xpathResult.resultType == XPathResult.ORDERED_NODE_SNAPSHOT_TYPE)) {
        for (let i = 0; i < xpathResult.snapshotLength; i++) {
          const node = xpathResult.snapshotItem(i);
          if (node.nodeType == Node.ELEMENT_NODE) {
            result = result + node.textContent + "\n";
          }
          else if (node.nodeType == Node.ATTRIBUTE_NODE) {
            result = result + node.value + "\n";
          }
          else {
            result = result + node.nodeValue + "\n";
          }
        }
      }
      resultOutput.innerHTML = result || "Немає збігів.";
    }
    catch (error) {
      resultOutput.innerHTML = "Помилка: " + error.message;
    }
  }

  xmlInput.addEventListener("input", XPath);
  xpathInput.addEventListener("input", XPath);
});