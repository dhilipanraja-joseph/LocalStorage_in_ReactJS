const StoredData = React.createClass({
  getInitialState : function(){
    try{
      var sData=JSON.parse(localStorage.cities);
    }catch(e){
      sData = [];
    }
    return {

      cities : sData,
      //seletedCity : ''
    }
  },
  addData : function(dataObj) {
      console.log(dataObj);
      console.log("cities",this.state.cities);
      this.setState({
        cities : this.state.cities.concat(dataObj)
      },
        ()=>{

          console.log("cities",this.state.cities);
          localStorage.cities = JSON.stringify(this.state.cities);
        }
      );
    //  this.setState({selectedCity : dataObj});
  },
  deleteCity : function(id){
    this.setState({
      cities : this.state.cities.filter(city => city.id !== id)
    },
      ()=>{
        localStorage.cities = JSON.stringify(this.state.cities);
      }
    );
  },
  modifyCity : function(id){
    let i = this.state.cities.findIndex(x => x.id ===id);
    let mcity = this.state.cities;
    let city = prompt("Change City",mcity[i].city);
    let state = prompt("Change State",mcity[i].state);
    let population = prompt("Change Population",mcity[i].population);
    //let cityObj = {city,state,population};
    mcity[i] = {id:uuid(),city,state,population};
    this.setState({
      cities : mcity
    },
      ()=>{
        localStorage.cities = JSON.stringify(this.state.cities);
      }
    );
  },
  render: function () {
    return (
        <div>
          <h1>City Info</h1>
          <AddForm addData={this.addData}/>
          <CityTable cities={this.state.cities} deleteCity={this.deleteCity} modifyCity={this.modifyCity}/>
        </div>

    );
  }
});

const CityTable = React.createClass({
  delete : function(e){
    //var id = e.target.value;
    // console.log('cities',this.props.cities);
    //let newData = this.props.cities.filter(city => city.id !== id);
    this.props.deleteCity(e.target.value);

  },
  modify : function(e){
    this.props.modifyCity(e.target.value);
    //var city = prompt("Change City name","");
  },
  render : function(){
    let cities = this.props.cities.map(city =>{
      return (
        <tr key={city.id}>
          <td>{city.city}</td>
          <td>{city.state}</td>
          <td>{city.population}</td>
          <td>
            <button onClick={this.delete} value={city.id}>-</button>
            <button onClick={this.modify} value={city.id}>?</button>
          </td>
        </tr>
      );
    });
    return (
      <table>
        <thead>
          <tr>
            <th>City</th>
            <th>State</th>
            <th>Population</th>
            <th>Edit</th>
          </tr>
        </thead>
          <tbody>
            {cities}
          </tbody>
      </table>
    );
  }
});

const AddForm = React.createClass({
  getInitialState : function(){
    return {
      City : '',
      State : '',
      Population : ''
    }
  },
  addCity : function(e){
    e.preventDefault();
    if(this.state.City === ''){
      return;
    }
    let cityObj = {id : uuid(),city : this.state.City,state : this.state.State, population : this.state.Population};
    //console.log(cityObj);
    this.props.addData(cityObj);
    this.setState({City : '',State : '',Population : ''});

  },
  resetForm : function(e){
    e.preventDefault();
    this.setState({City : '',State : '',Population : ''});
  },
  render : function(){
    return (
      <form>
        <input type="text" placeholder="city" value={this.state.City} onChange={e => this.setState({City : e.target.value})}/><br/>
        <input type="text" placeholder="state" value={this.state.State} onChange={e => this.setState({State : e.target.value})}/><br/>
        <input type="number" placeholder="population" value={this.state.Population} onChange={e => this.setState({Population : e.target.value})}/><br/>
        <button onClick={this.addCity}>Add</button>
        <button onClick={this.resetForm} >Reset</button>
      </form>
    );
  },
});
ReactDOM.render(
  <StoredData/>,
  document.getElementById('root')
);
