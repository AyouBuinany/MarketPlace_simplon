import {combineReducers  } from  "redux";
import signin from "./signinReducer";
import token from "./tokenReducer";
import product from "./productReducer";
import category from "./CategoryReducer";
import verify from "./VerifyReducer"
import cart from "./cartReducer";
import checkout from "./checkoutReducer";
import commandes from "./commandeReducer";
export default combineReducers({
    token,
    signin,
    product,
    category,
    verify,
    cart,
    checkout,
    commandes
  })
