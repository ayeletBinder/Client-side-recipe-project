
export interface Category{
    _id:string
    description?:String,
    recipes?:[RecipeInCategory],//?
}
interface RecipeInCategory{
    _id:string,//{type:mongoose.Types.ObjectId,ref:'recipe'}??
    name?:String,
    images?:String[]
}