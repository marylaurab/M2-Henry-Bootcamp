var traverseDomAndCollectElements = function (matchFunc, startEl = document.body) {
  var resultSet = [];

  /*if (typeof startEl === "undefined") {
    startEl = document.body;
  }; ESTO VENIA DE ENTRADA, PERO METI EL DEFAULT DENTRO DE LOS PARAMETROS*/
  if(matchFunc(startEl)) {
    resultSet.push(startEl);
  };
  for(let i=0; i<startEl.childElementCount; i++) {
    let almacenar = traverseDomAndCollectElements(matchFunc, startEl.children[i]); //almaceno en una variable
    //el resultado de la recursion, ademas, la recursion la llamo, no se la "aplico como metodo" a ningun elemento.
    resultSet = [...resultSet, ...almacenar] //uso spread operator porque la idea es meter cada
    //elemento del array en una posicion, y no todo el array en 1 sola posicion.
  }
  // recorre el árbol del DOM y recolecta elementos que matchien en resultSet
  // usa matchFunc para identificar elementos que matchien

  // TU CÓDIGO AQUÍ
  return resultSet;
};

// Detecta y devuelve el tipo de selector
// devuelve uno de estos tipos: id, class, tag.class, tag

var selectorTypeMatcher = function (selector) {
  // tu código aquí. Por el primer elemento del string podemos concluir que tipo de elemento es.
  if (selector.charAt(0) === "#") return "id";
  if (selector[0] === ".") return "class";
  if (selector.includes(".")) return "tag.class";
  return "tag";
};
// NOTA SOBRE LA FUNCIÓN MATCH
// recuerda, la función matchFunction devuelta toma un elemento como un
// parametro y devuelve true/false dependiendo si el elemento
// matchea el selector.

var matchFunctionMaker = function (selector) {
  var selectorType = selectorTypeMatcher(selector);
  var matchFunction;
  if (selectorType === "id") {
    matchFunction = (el) => {
      if (`#${el.id}` === selector) {
        return true;
      } else {
        return false;
      }
    };
  } else if (selectorType === "class") {
    matchFunction = (el) => 
     el.classList.contains(selector.slice(1))
       
  } else if (selectorType === "tag.class") {
    matchFunction = el => {
      let array= selector.split(".");
      if(el.classList.contains(array[1]) && el.tagName.toLowerCase()===array[0]) {
        return true;
      } else {
        return false;
      }
    }

  } else if (selectorType === "tag") {
    matchFunction = el => {
      if(el.tagName.toLowerCase() === selector) {
        return true;
      } else {
        return false;
      }
    }
  }
  return matchFunction;
};

var $ = function (selector) {
  var elements;
  var selectorMatchFunc = matchFunctionMaker(selector);
  elements = traverseDomAndCollectElements(selectorMatchFunc);
  return elements;
};
