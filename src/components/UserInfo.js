export default class UserInfo {
    constructor({nameSelector, infoSelector}) {
        this._nameProfile = document.querySelector(nameSelector);
        this._infoProfile = document.querySelector(infoSelector);
    }

    getInfo() {
        return { nameProfile: this._nameProfile.textContent, infoProfile: this._infoProfile.textContent };
    }

    setUserInfo(inputValue){ 
        //console.log(inputValue);
        this._nameProfile.textContent = inputValue.name; 
        this._infoProfile.textContent = inputValue.job; 
      }
}