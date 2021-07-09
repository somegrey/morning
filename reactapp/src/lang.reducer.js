export default function (lang=null, action){
    if (action.type === "changelang"){
        return action.lang;
    } else {
        return lang
    }
}