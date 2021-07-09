export default function (user={}, action){
    if (action.type === "connection"){
        var newUser = action.user;
        return newUser
    } else {
        return user
    }
}