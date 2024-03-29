export default class UserInfo {
    constructor({nameSelector, infoSelector, avatarProfile, api}) {
        this._nameProfile = document.querySelector(nameSelector);
        this._infoProfile = document.querySelector(infoSelector);
        this._avatarProfile = document.querySelector(avatarProfile)
        this._api = api;
    }

    getInfo() {
        return { nameProfile: this._nameProfile.textContent, infoProfile: this._infoProfile.textContent };
    }

    getMyId(id){
        this.myId = id;
    }

    setUserInfo(inputValue){ 
        this._nameProfile.textContent = inputValue.name; 
        this._infoProfile.textContent = inputValue.job;
        //this._sentToServerInfo(inputValue);
      }

    setUserAvatar(avataLink){
        this._avatarProfile.src = avataLink;
    }
}