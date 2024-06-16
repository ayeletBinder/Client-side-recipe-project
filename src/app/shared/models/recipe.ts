export interface Recipe{
        _id?:string,
        name?:string,
        description?:string,
        category?:string,
        preparationTime?:number,
        DifficultyLevel?:number,
        Addeddate?:Date,
        layers?:[{description?:string,products?:string}],//?
        instruction?:string,
        images?:string,
        IsPrivate?:Boolean,
        user?:userInRecipe//?
}

interface userInRecipe{
    _id?:string,//{type?:mongoose.Types.ObjectId,ref?:'recipe'}??
    name?:String,
    images?:[String]
}