export interface Recipe{
        _id?:string,
        name?:String,
        description?:String,
        category?:String,
        preparationTime?:Number,
        DifficultyLevel?:Number,
        Addeddate?:Date,
        layers?:[{description?:String,products?:String}],//?
        instructions?:String,
        images?:String,
        IsPrivate?:Boolean,
        user?:userInRecipe//?
}

interface userInRecipe{
    _id?:string,//{type?:mongoose.Types.ObjectId,ref?:'recipe'}??
    name?:String,
    images?:[String]
}