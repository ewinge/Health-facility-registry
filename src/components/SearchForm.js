import React from "react";
import OUStore from "../stores/OUStore"
import SearchBar from "./SearchBar"
import { handleQuery } from "../actions/Actions";

var SearchForm = React.createClass({

	getInitialState: function() {
    const query = OUStore.getQuery();
    const name = query.hasOwnProperty('displayName') ? query.displayName : "";
    const code = query.hasOwnProperty('code') ? query.code : "";
    const id = query.hasOwnProperty('id') ? query.id : "";

		return {
			disabled: OUStore.isLoading(),
			advanced: false,

      nameQuery: name,
      codeQuery: code,
      idQuery: id,
		};
	},

	handleNameChange: function(e) {
		this.setState({nameQuery: e.target.value});

    if (!this.state.advanced && e.target.value.length > 1) {
      handleQuery({displayName: e.target.value});
    }
	},

  handleCodeChange: function(e) {
    this.setState({codeQuery: e.target.value});
  },

  handleIdChange: function(e) {
    this.setState({idQuery: e.target.value});
  },

	handleSubmit: function() {
		handleQuery({
			displayName: this.state.nameQuery,
			code: this.state.codeQuery,
			id: this.state.idQuery
		});	
	},

  handleReset: function() {
    this.setState({
      codeQuery: "",
      nameQuery: "",
      idQuery: ""
    });
  },

  toggleAdvanced: function() {
    this.setState({advanced: !this.state.advanced});
  },

	doneLoading: function() {
		this.setState({
			disabled: false
		})
	},

	//Listen to list changes in OUStore
	componentWillMount: function() {
		OUStore.on("listReceived", this.doneLoading);
	},

	//Unlisten upon dismounting
	componentWillUnmount: function() {
		OUStore.removeListener("listReceived", this.doneLoading);
	},

	render() {
		return (
			<form onSubmit={this.handleSubmit}>
        <SearchBar
          placeholder={this.state.disabled ? "Loading..." : "Search by name" }
          value={this.state.nameQuery} onChange={this.handleNameChange}
          disabled={this.state.disabled ? "disabled" : ""}
        />

        {this.state.advanced &&
          <SearchBar
            placeholder={this.state.disabled ? "Loading..." : "Search by ID" }
            value={this.state.idQuery} onChange={this.handleIdChange}
            disabled={this.state.disabled ? "disabled" : ""}
          />}

        {this.state.advanced &&
          <SearchBar
            placeholder={this.state.disabled ? "Loading..." : "Search by code" }
            value={this.state.codeQuery} onChange={this.handleCodeChange}
            disabled={this.state.disabled ? "disabled" : ""}
          />}

        {this.state.advanced &&
          <div style={{align: "right"}}>
          <button className="button"
                  style={{marginTop: "0px", width: "70%", padding: "7px"}}>
                  submit
          </button>
          <button className="button"
                  type="button" onClick={this.handleReset}
                  style={{marginBottom: "10px", marginTop: "0px", width: "30%", padding: "7px"}}>
                  reset
          </button>
          </div>
        }

        <div style={{textAlign: "right"}}>
          <button className="button"
                  type="button" onClick={this.toggleAdvanced}
                  style={{marginBottom: "10px", marginTop: "0", width: "100%"}}>
                  Advanced
          </button>
        </div>
      </form>
		);

	}
});

module.exports = SearchForm;
