import { EventEmitter } from "events";
import dispatcher from "../dispatcher"

class OUStore extends EventEmitter {
  constructor() {
    super()
    this.state = {

      //Som initial data for testing
      organizationUnits: [{id: "GvFqTavdpGE", displayName: "Agape CHP"},
                          {id: "EZPwuUTeIIG", displayName: "Wara Wara Yagalaid"}]
    };
  }
  getAll() {
    return this.state.organizationUnits;
  }

  handleActions(action) {
    console.log("Action received!", action);

    switch(action.type) {
      case "SUBMIT": {
        this.state.organizationUnits = action.orgUnits;
        this.emit("change");
        break;
      }

      //More actions here
    }
  }
}

const ouStore = new OUStore;
dispatcher.register(ouStore.handleActions.bind(ouStore));

export default ouStore;
