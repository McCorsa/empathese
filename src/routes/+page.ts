import type {PageLoad} from "./$types";

export const load: PageLoad = ({params}) => {
    // perform request to open ai api
    // return result as an object

   return {
    translation: "She's not okay with your comment, but she's trying to downplay it. She's surprised that you would say something like that.",
    suggestions: [
        {
            "title": "Apologize and explain",
            "response": "I'm really sorry for what I said, it was thoughtless of me. I didn't mean to hurt you."
        },
        {
            "title": "Acknowledge your mistake",
            "response": "You're right, my comment was inappropriate and hurtful. I want to be more considerate in the future."
        },
        {
            "title": "Express understanding",
            "response": "I understand why my comment hurt you, and I'll be more careful with my words from now on."
        }
    ],
   }
}