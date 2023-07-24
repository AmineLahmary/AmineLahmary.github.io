
export function validate(valueToCheck) {
    if(valueToCheck === "") {
      return false;
    }
    return true;
}

export function escape(htmlStr) {
  return htmlStr.replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#39;");        
}

export function makeid(length) {
  let result = 'amine__';
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  const charactersLength = characters.length;
  let counter = 0;
  while (counter < length) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
    counter += 1;
  }
  return result;
}

export function alertMessage(message,type) {
  const alertBox = document.querySelector(".alert")
  alertBox.classList.remove("alert--success","alert--error");
  alertBox.classList.add("alert--"+type);
  document.querySelector(".alert-message").textContent = message;

}

export function search(data, searchItem) {
  searchItem = new RegExp(`^${searchItem}`, 'i')
  return data.filter(item => item.name.match(searchItem))
}