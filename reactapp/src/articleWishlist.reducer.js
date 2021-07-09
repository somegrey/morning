export default function (articleWishlist=[], action){
    if (action.type === "addArticle"){
        const match = articleWishlist.find( article => article.title === action.article.title);
        console.log("match",match);
        if (match === undefined){
            var newArticleWishlist = [...articleWishlist];
            newArticleWishlist.push(action.article);
            console.log("console log du reducer",articleWishlist);
            return newArticleWishlist    
        } else {
            return articleWishlist
        }
    } else if (action.type === "delete"){
        newArticleWishlist = [...articleWishlist];
        newArticleWishlist.splice(action.index, 1);
        return newArticleWishlist
    } else {
        return articleWishlist
    }
}