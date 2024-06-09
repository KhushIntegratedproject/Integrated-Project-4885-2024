


import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js" 
import{ getDatabase, ref , push, onValue} from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js"

const appSettings = {
    databaseURL: "https://realtime-database-c025c-default-rtdb.firebaseio.com/"  
}

// url of your realtime database

const app = initializeApp(appSettings);
const database = getDatabase(app);

const shoppingListInDB = ref(database, "ShoppingList");
// const booksInDB = ref(database, "books");