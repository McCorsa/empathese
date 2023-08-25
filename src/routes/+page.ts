import type {PageLoad} from "./$types";
// import open ai library after installing

export const load: PageLoad = ({params}) => {
    // perform request to open ai api
    // return result as an object
    /*
    return {
        translation: "",
        suggestions: [
        ]
    }
    */
   return {
    message: "hi there!"
   }
}