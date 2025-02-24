import { AccountSlice } from "./reducers/account.slice";
import { CreditSlice } from "./reducers/credit.slice";
import { MailSlice } from "./reducers/mail.slice";
import { UiSlice } from "./reducers/ui.slice";

export const combineReducers = {
  Ui: UiSlice.reducer,
  Account: AccountSlice.reducer,
  Credit: CreditSlice.reducer,
  Mail: MailSlice.reducer,
};
