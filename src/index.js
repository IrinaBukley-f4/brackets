module.exports = function check(str, bracketsConfig) {
  const closeToOpen = new Map();
  const openBrackets = new Set();
  
  for (const [open, close] of bracketsConfig) {
    openBrackets.add(open);
    closeToOpen.set(close, open);
  }
  
  const stack = [];
  let valid = true;
  
  Array.from(str).forEach(char => {
    if (!valid) return;
    
    const isOpen = openBrackets.has(char);
    const isClose = closeToOpen.has(char);
    
    // Только открывающая
    if (isOpen && !isClose) {
      stack.push(char);
    }
    // Только закрывающая
    else if (!isOpen && isClose) {
      if (stack.length === 0 || stack.pop() !== closeToOpen.get(char)) {
        valid = false;
      }
    }
    // И открывающая, и закрывающая (одинаковые символы)
    else if (isOpen && isClose) {
      if (stack.length && stack[stack.length - 1] === char) {
        stack.pop();
      } else {
        stack.push(char);
      }
    }
  });
  
  return valid && stack.length === 0;
};
