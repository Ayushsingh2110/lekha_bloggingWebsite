function storeInSession(key, value){
    sessionStorage.setItem(key, value);
}

function lookInSession(key){
    return sessionStorage.getItem(key);
}

function removeFromSession(key){
    return sessionStorage.removeItem(key);
}

function logout(){
    sessionStorage.clear();
}

export { storeInSession, lookInSession, removeFromSession, logout }