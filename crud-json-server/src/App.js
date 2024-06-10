import React from "react";
import Lists from "./Lists";
import CreateList from "./CreateList";

class App extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        loading: false,
        alldata: [],
        singledata: {
          title: "",
          author: "",
          id: null
        }
      };
    }

    getLists = async () => {
      await fetch('http://localhost:8080/api/books')
      .then(res => res.json())
      .then(result =>
        this.setState({
          loading: false,
          alldata: result
        })
      )
      .catch(console.log);
    }

    handleChange = (event) => {
      let title = this.state.singledata.title;
      let author = this.state.singledata.author;
      if (event.target.name === "title") title = event.target.value;
      else author = event.target.value;

      this.setState({
        singledata: {
          title: title,
          author: author,
          id: this.state.alldata.length + 1
        }
      });
    }

    createList = async () => {
      await fetch("http://localhost:8080/api/book", {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          "Content-Type": "application/json"
        },
        body: JSON.stringify(this.state.singledata)
      }).then(
        this.setState({
          singledata: {
            title: "",
            author: "",
            id: null
          }
        }),
        window.location.href = '/books'
      )
    }

    getList = (event, id) => {
      this.setState(
        {
          singledata: {
            title: "Loading...",
            author: "Loading..."
          }
        },
        () => {
          fetch(`http://localhost:8080/api/book/${id}`)
          .then(res => res.json())
          .then(result => {
            this.setState({
              singledata: {
                title: result.title,
                author: result.author ? result.author : ""
              }
            });
          });
        }
      );
    }

    updateList = async (event, id) => { 
      const bookToUpdate = {...this.state.singledata, _id: id}
      console.log(bookToUpdate);
      await fetch("http://localhost:8080/api/book", {
        method: "PUT",
        headers: {
          'Accept': 'application/json',
          "Content-Type": "application/json"
        },
        body: JSON.stringify(bookToUpdate)
      })
      .then(res => res.json())
      .then(result => {
        this.setState({
          singledata: {
            title: "",
            author: ""
          }
        });
        this.getLists();
      });
    }

    deleteList = (event, id) => { 
      fetch(`http://localhost:8080/api/book/${id}`, {
        method: "DELETE",
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
      })
      .then(res => res.json())
      .then(result => {
        this.setState({
          singledata: {
            title: "",
            author: ""
          }
        });
        this.getLists();
      });
    }

    render() {
      const listTable = this.state.loading ? (
        <span>Loading Data.....Please be patient.</span>
      ) : (
        <Lists 
          alldata={this.state.alldata} 
          singledata={this.state.singledata}
          getList={this.getList}
          updateList={this.updateList}
          deleteList={this.deleteList}
          handleChange={this.handleChange}
        />
      );
      return (
        <div className="container mt-3">
          <span className="title-bar">
            <button type="button" className="btn btn-primary" onClick={this.getLists}>
              Get Lists
            </button>
            <CreateList 
              singledata={this.state.singledata} 
              handleChange={this.handleChange} 
              createList={this.createList}
              />
          </span>
          {listTable}
        </div>
      )
    }
  }

export default App;